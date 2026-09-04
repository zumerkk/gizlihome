from __future__ import annotations

import json
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Resimler SS"
OUT = ROOT / "tmp" / "pdfs" / "gizli-home-reveal" / "media-review"
FRAMES = OUT / "frames"


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    path = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
    return ImageFont.truetype(str(path), size) if path.exists() else ImageFont.load_default()


def fit(path: Path, size: tuple[int, int]) -> Image.Image:
    with Image.open(path) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
    return ImageOps.contain(image, size, Image.Resampling.LANCZOS)


def image_sheets(paths: list[Path]) -> None:
    cols, rows = 4, 3
    cell_w, cell_h = 430, 300
    for page_index in range(0, len(paths), cols * rows):
        page = Image.new("RGB", (cols * cell_w, rows * cell_h), "#262626")
        draw = ImageDraw.Draw(page)
        for index, path in enumerate(paths[page_index : page_index + cols * rows]):
            col, row = index % cols, index // cols
            x, y = col * cell_w, row * cell_h
            thumb = fit(path, (cell_w - 18, cell_h - 50))
            px = x + (cell_w - thumb.width) // 2
            py = y + 8 + (cell_h - 50 - thumb.height) // 2
            page.paste(thumb, (px, py))
            label = path.name.replace("Ekran Resmi 2026-08-26 ", "")
            draw.text((x + 10, y + cell_h - 32), label[:52], fill="#f2eee7", font=font(17))
        page.save(OUT / f"photos-{page_index // (cols * rows) + 1:02d}.jpg", quality=91)


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


def extract_video_frames(path: Path, duration: float) -> list[Path]:
    safe_stem = "".join(c if c.isalnum() else "_" for c in path.stem)
    times = [duration * fraction for fraction in (0.04, 0.20, 0.38, 0.56, 0.74, 0.92)]
    outputs: list[Path] = []
    for index, second in enumerate(times, start=1):
        target = FRAMES / f"{safe_stem}-{index:02d}.jpg"
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
                str(path),
                "-frames:v",
                "1",
                "-vf",
                "scale=720:-2",
                "-q:v",
                "2",
                str(target),
            ],
            check=True,
        )
        outputs.append(target)
    return outputs


def video_sheets(paths: list[Path]) -> dict[str, float]:
    durations: dict[str, float] = {}
    row_w, row_h = 1740, 320
    rows_per_sheet = 4
    rows: list[Image.Image] = []
    for path in paths:
        duration = probe_duration(path)
        durations[path.name] = duration
        frames = extract_video_frames(path, duration)
        row = Image.new("RGB", (row_w, row_h), "#171717")
        draw = ImageDraw.Draw(row)
        draw.text((16, 10), f"{path.name}  |  {duration:.1f} sn", fill="#d7a754", font=font(20))
        for index, frame_path in enumerate(frames):
            thumb = fit(frame_path, (270, 250))
            x = 15 + index * 287
            y = 46 + (250 - thumb.height) // 2
            row.paste(thumb, (x, y))
            draw.text((x + 6, 290), f"{index + 1}/6", fill="#e9e3d9", font=font(15))
        rows.append(row)

    for sheet_index in range(0, len(rows), rows_per_sheet):
        page_rows = rows[sheet_index : sheet_index + rows_per_sheet]
        page = Image.new("RGB", (row_w, row_h * len(page_rows)), "#171717")
        for index, row in enumerate(page_rows):
            page.paste(row, (0, index * row_h))
        page.save(OUT / f"videos-{sheet_index // rows_per_sheet + 1:02d}.jpg", quality=91)
    return durations


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    FRAMES.mkdir(parents=True, exist_ok=True)
    images = sorted(
        path for path in SOURCE.iterdir() if path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
    )
    videos = sorted(path for path in SOURCE.iterdir() if path.suffix.lower() in {".mp4", ".mov", ".m4v"})
    image_sheets(images)
    durations = video_sheets(videos)
    print(json.dumps({"images": len(images), "videos": len(videos), "durations": durations}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
