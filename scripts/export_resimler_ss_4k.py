from __future__ import annotations

import csv
import json
import math
import shutil
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Resimler SS"
OUT = ROOT / "output" / "GIZLI_HOME_4K_URUN_ARSIVI"
STILLS_OUT = OUT / "01_TUM_KAYNAK_GORSELLER_4K"
VIDEO_OUT = OUT / "02_VIDEO_ANA_KARELERI_4K"
PRODUCT_OUT = OUT / "03_URUNLERE_GORE_4K_SETLER"
PREVIEW_OUT = OUT / "04_ONIZLEME_CONTACT_SHEET"
TMP = ROOT / "tmp" / "images" / "gizli-home-4k"


VIDEO_LABELS = {
    "7094f84a20f9908ef8a0be653909386e_7acde840-c063-412d-8d7a-3f3274359fef.MP4": "00_NFC_KART",
    "VIDEO-2026-07-19-16-50-29.mp4": "01_CAM_YUZEYLI_MOTORLU_KOMODIN",
    "VIDEO-2026-08-08-20-16-42.mp4": "02_AHSAP_CEKMECELI_GIZLI_HAZNE",
    "VIDEO-2026-08-08-20-16-43.mp4": "03_AKILLI_CEVIZ_ANTRASIT_KOMODIN",
    "VIDEO-2026-08-08-20-16-44.mp4": "04_SIYAH_BEYAZ_KOMPAKT_MODUL",
    "VIDEO-2026-08-08-20-16-45.mp4": "05_SIYAH_YUKSELEN_UST_MODUL",
    "VIDEO-2026-08-08-20-16-46.mp4": "06_DUVAR_RAFI_GIZLI_HAZNE",
    "VIDEO-2026-08-08-20-16-50 2.mp4": "07_NFC_KONTROL_PANELI_DETAY",
    "VIDEO-2026-08-08-20-16-50.mp4": "08_KARMA_URUN_DEMOSU",
    "VIDEO-2026-08-09-21-00-14.mp4": "09_BEYAZ_KOMPAKT_GIZLI_MODUL",
    "VIDEO-2026-08-12-22-04-47.mp4": "10_SURGULU_DUVAR_MODULU",
}

FRAME_LABELS = ["01_KAPALI_BASLANGIC", "02_ISLEM", "03_ACILMA", "04_ACIK_SONUC"]
FRAME_FRACTIONS = [0.06, 0.34, 0.62, 0.90]

# QuickTime controls sit on top of the photographed frame in these screenshots.
# Trim only that lower UI band; leave product pixels otherwise untouched.
BOTTOM_UI_TRIM = {
    "Ekran Resmi 2026-08-26 14.25.37.png": 0.22,
    "Ekran Resmi 2026-08-26 14.28.16.png": 0.14,
    "Ekran Resmi 2026-08-26 14.28.19.png": 0.14,
    "Ekran Resmi 2026-08-26 14.28.21.png": 0.14,
    "Ekran Resmi 2026-08-26 14.38.36.png": 0.30,
}


def safe_stem(value: str) -> str:
    replacements = {
        " ": "_",
        "-": "_",
        ".": "_",
        "ğ": "g",
        "Ğ": "G",
        "ı": "i",
        "İ": "I",
        "ş": "s",
        "Ş": "S",
        "ü": "u",
        "Ü": "U",
        "ö": "o",
        "Ö": "O",
        "ç": "c",
        "Ç": "C",
    }
    result = "".join(replacements.get(char, char) for char in value)
    return "_".join(part for part in result.split("_") if part)


def font(size: int) -> ImageFont.ImageFont:
    path = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
    return ImageFont.truetype(str(path), size) if path.exists() else ImageFont.load_default()


def longest_run(mask: np.ndarray) -> tuple[int, int] | None:
    best: tuple[int, int] | None = None
    start: int | None = None
    for index, active in enumerate(np.append(mask, False)):
        if active and start is None:
            start = index
        elif not active and start is not None:
            if best is None or index - start > best[1] - best[0]:
                best = (start, index)
            start = None
    return best


def screen_content_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    """Remove player/window black space without touching the photographed product."""
    width, height = image.size
    analysis = image.convert("RGB")
    scale = min(1.0, 900 / max(width, height))
    if scale < 1:
        analysis = analysis.resize((round(width * scale), round(height * scale)), Image.Resampling.BILINEAR)
    array = np.asarray(analysis, dtype=np.uint8)
    gray = array.mean(axis=2)

    column_fraction = (gray > 24).mean(axis=0)
    column_mask = column_fraction > 0.18
    x_run = longest_run(column_mask)
    if x_run is None or x_run[1] - x_run[0] < analysis.width * 0.16:
        return (0, 0, width, height)

    x0s, x1s = x_run
    row_fraction = (gray[:, x0s:x1s] > 24).mean(axis=1)
    row_mask = row_fraction > 0.18
    y_run = longest_run(row_mask)
    if y_run is None or y_run[1] - y_run[0] < analysis.height * 0.35:
        y_run = (0, analysis.height)

    y0s, y1s = y_run
    pad = max(2, round(5 * scale))
    x0s = max(0, x0s - pad)
    y0s = max(0, y0s - pad)
    x1s = min(analysis.width, x1s + pad)
    y1s = min(analysis.height, y1s + pad)
    bbox = (
        round(x0s / scale),
        round(y0s / scale),
        round(x1s / scale),
        round(y1s / scale),
    )
    crop_w, crop_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    if crop_w < width * 0.15 or crop_h < height * 0.35:
        return (0, 0, width, height)
    return bbox


def upscale_4k(image: Image.Image) -> Image.Image:
    """Preserve the crop aspect ratio; make the long edge exactly 3840 px."""
    width, height = image.size
    if max(width, height) == 3840:
        return image
    ratio = 3840 / max(width, height)
    out_w = max(2, round(width * ratio))
    out_h = max(2, round(height * ratio))
    if out_w % 2:
        out_w += 1
    if out_h % 2:
        out_h += 1
    return image.resize((out_w, out_h), Image.Resampling.LANCZOS)


def save_master(image: Image.Image, target: Path, force_png=False) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    if force_png:
        image.save(target.with_suffix(".png"), optimize=True)
    else:
        image.convert("RGB").save(
            target.with_suffix(".jpg"),
            quality=96,
            subsampling=0,
            optimize=True,
            progressive=True,
        )


def process_stills(manifest: list[dict[str, str]]) -> list[Path]:
    outputs: list[Path] = []
    paths = sorted(
        path for path in SOURCE.iterdir() if path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
    )
    for index, path in enumerate(paths, start=1):
        with Image.open(path) as source:
            image = ImageOps.exif_transpose(source)
            has_alpha = image.mode in {"RGBA", "LA"} and image.getextrema()[-1][0] < 255
            image = image.convert("RGBA" if has_alpha else "RGB")
        original_size = image.size
        bbox = screen_content_bbox(image) if path.name.startswith("Ekran Resmi") else (0, 0, *image.size)
        if path.name in BOTTOM_UI_TRIM:
            x0, y0, x1, y1 = bbox
            y1 -= round((y1 - y0) * BOTTOM_UI_TRIM[path.name])
            bbox = (x0, y0, x1, y1)
        cropped = image.crop(bbox)
        upscaled = upscale_4k(cropped)
        stem = f"{index:02d}_{safe_stem(path.stem)}_4K"
        target_base = STILLS_OUT / stem
        save_master(upscaled, target_base, force_png=has_alpha or "ChatGPT Image" in path.name)
        target = target_base.with_suffix(".png" if has_alpha or "ChatGPT Image" in path.name else ".jpg")
        outputs.append(target)
        manifest.append(
            {
                "type": "source_image",
                "group": "all_stills",
                "source": path.name,
                "output": str(target.relative_to(OUT)),
                "original_px": f"{original_size[0]}x{original_size[1]}",
                "crop_bbox": ",".join(map(str, bbox)),
                "output_px": f"{upscaled.width}x{upscaled.height}",
                "operation": "player/black-space crop + deterministic Lanczos upscale; no generative edits",
            }
        )
    return outputs


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        capture_output=True,
        text=True,
        check=True,
    )
    return float(result.stdout.strip())


def extract_frame(video: Path, second: float, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-ss",
            f"{second:.3f}",
            "-i",
            str(video),
            "-frames:v",
            "1",
            "-q:v",
            "1",
            str(target),
        ],
        check=True,
    )


def process_videos(manifest: list[dict[str, str]]) -> list[Path]:
    outputs: list[Path] = []
    videos = sorted(path for path in SOURCE.iterdir() if path.suffix.lower() in {".mp4", ".mov", ".m4v"})
    for video in videos:
        label = VIDEO_LABELS[video.name]
        duration = probe_duration(video)
        video_folder = VIDEO_OUT / label
        curated_folder = PRODUCT_OUT / label
        for frame_label, fraction in zip(FRAME_LABELS, FRAME_FRACTIONS):
            temp = TMP / safe_stem(video.stem) / f"{frame_label}.jpg"
            extract_frame(video, duration * fraction, temp)
            with Image.open(temp) as source:
                frame = ImageOps.exif_transpose(source).convert("RGB")
            original_size = frame.size
            bbox = screen_content_bbox(frame)
            cropped = frame.crop(bbox)
            upscaled = upscale_4k(cropped)
            target = video_folder / f"{frame_label}_4K.jpg"
            save_master(upscaled, target.with_suffix(""), force_png=False)
            target = target.with_suffix(".jpg")
            curated_folder.mkdir(parents=True, exist_ok=True)
            curated_target = curated_folder / target.name
            shutil.copy2(target, curated_target)
            outputs.extend([target, curated_target])
            manifest.append(
                {
                    "type": "video_keyframe",
                    "group": label,
                    "source": video.name,
                    "output": str(target.relative_to(OUT)),
                    "original_px": f"{original_size[0]}x{original_size[1]}",
                    "crop_bbox": ",".join(map(str, bbox)),
                    "output_px": f"{upscaled.width}x{upscaled.height}",
                    "operation": f"frame at {duration * fraction:.2f}s + deterministic Lanczos upscale; no generative edits",
                }
            )
    return outputs


def contact_sheets(paths: list[Path], prefix: str) -> list[Path]:
    PREVIEW_OUT.mkdir(parents=True, exist_ok=True)
    cols, rows = 4, 3
    cell_w, cell_h = 420, 310
    outputs: list[Path] = []
    for page_start in range(0, len(paths), cols * rows):
        page = Image.new("RGB", (cols * cell_w, rows * cell_h), "#202020")
        draw = ImageDraw.Draw(page)
        for index, path in enumerate(paths[page_start : page_start + cols * rows]):
            col, row = index % cols, index // cols
            x, y = col * cell_w, row * cell_h
            with Image.open(path) as source:
                thumb = ImageOps.contain(source.convert("RGB"), (cell_w - 16, cell_h - 54), Image.Resampling.LANCZOS)
            page.paste(thumb, (x + (cell_w - thumb.width) // 2, y + 8 + (cell_h - 54 - thumb.height) // 2))
            draw.text((x + 8, y + cell_h - 34), path.stem[:48], fill="#F2EBDD", font=font(15))
        target = PREVIEW_OUT / f"{prefix}_{page_start // (cols * rows) + 1:02d}.jpg"
        page.save(target, quality=92, subsampling=0)
        outputs.append(target)
    return outputs


def write_manifest(rows: list[dict[str, str]]) -> None:
    fields = ["type", "group", "source", "output", "original_px", "crop_bbox", "output_px", "operation"]
    with (OUT / "MANIFEST.csv").open("w", newline="", encoding="utf-8-sig") as stream:
        writer = csv.DictWriter(stream, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)

    summary = {
        "source_images": sum(row["type"] == "source_image" for row in rows),
        "video_keyframes": sum(row["type"] == "video_keyframe" for row in rows),
        "video_groups": len({row["group"] for row in rows if row["type"] == "video_keyframe"}),
        "upscale": "long edge 3840 px, original aspect ratio preserved",
        "generative_changes": False,
    }
    (OUT / "MANIFEST.json").write_text(json.dumps({"summary": summary, "files": rows}, ensure_ascii=False, indent=2), encoding="utf-8")
    readme = """GİZLİ HOME 4K ÜRÜN ARŞİVİ

01_TUM_KAYNAK_GORSELLER_4K
Resimler SS klasöründeki bütün fotoğraf ve ekran görüntülerinin ayıklanmış 4K masterları.

02_VIDEO_ANA_KARELERI_4K
Her videodan kapalı/başlangıç, işlem, açılma ve açık/sonuç olmak üzere dört ana kare.

03_URUNLERE_GORE_4K_SETLER
Video ve fiziksel ürün grubuna göre düzenlenmiş teslim klasörleri.

04_ONIZLEME_CONTACT_SHEET
Tüm çıktıları hızlı kontrol etmek için düşük çözünürlüklü önizleme paftaları.

TEKNİK NOT
- Ürün geometrisi, renk, ışık, mekanizma, arka plan ve kadraj içeriği generatif olarak değiştirilmedi.
- Yalnızca oynatıcı/siyah boşluklar ayıklandı.
- En-boy oranı korunarak uzun kenar 3840 piksele çıkarıldı.
- Bütün operasyonlar MANIFEST.csv ve MANIFEST.json içinde kayıtlıdır.
"""
    (OUT / "README_TR.txt").write_text(readme, encoding="utf-8")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    manifest: list[dict[str, str]] = []
    still_outputs = process_stills(manifest)
    video_outputs = process_videos(manifest)
    source_video_outputs = [path for path in video_outputs if VIDEO_OUT in path.parents]
    contact_sheets(still_outputs, "01_KAYNAK_GORSELLER")
    contact_sheets(source_video_outputs, "02_VIDEO_KARELERI")
    write_manifest(manifest)
    print(
        json.dumps(
            {
                "output": str(OUT),
                "stills": len(still_outputs),
                "video_keyframes": len(source_video_outputs),
                "product_groups": len(VIDEO_LABELS),
                "manifest_rows": len(manifest),
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
