from __future__ import annotations

import hashlib
import textwrap
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

from build_gizli_home_catalog import PRODUCTS, money


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "GIZLI_HOME_2026_REVEAL_EDITION.pdf"
TMP = ROOT / "tmp" / "pdfs" / "gizli-home-reveal" / "prepared"
ASSET = ROOT / "output" / "catalog-assets" / "reveal-edition"
DOC = ASSET / "documentary"

LOGO_LIGHT = ROOT / "public" / "images" / "brand" / "gizli-home-logo-light.png"
LOGO_DARK = ROOT / "public" / "images" / "brand" / "gizli-home-logo-dark.png"
MARK = ROOT / "public" / "images" / "brand" / "gizli-home-door-mark.png"

NFC_APPROACH = ASSET / "01-nfc-approach.png"
MOTOR_REVEAL = ASSET / "02-motorized-reveal.png"
NIGHT_REVEAL = ASSET / "03-night-hidden-compartment.png"
WALL_REVEAL = ASSET / "04-wall-reveal.png"

MOOD_OFFICE = ROOT / "public" / "images" / "generated" / "banner-private-office.webp"
MOOD_VILLA = ROOT / "public" / "images" / "generated" / "banner-villa-project.webp"
MOOD_LIVING = ROOT / "public" / "images" / "generated" / "banner-living-collection.webp"

PW, PH = A4

INK = HexColor("#0A0A0A")
PAPER = HexColor("#F2EBDD")
BLUE = HexColor("#315CFF")
BLUE_DARK = HexColor("#19368F")
GOLD = HexColor("#C4944B")
ASH = HexColor("#77736D")
LINE = HexColor("#D2C8B8")
SMOKE = HexColor("#1B1B1A")
PALE = HexColor("#DCD4C6")


def register_fonts() -> None:
    fonts = {
        "DIN": "/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf",
        "Arial": "/System/Library/Fonts/Supplemental/Arial.ttf",
        "Arial-Bold": "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "Georgia": "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "Georgia-Italic": "/System/Library/Fonts/Supplemental/Georgia Italic.ttf",
    }
    for name, path in fonts.items():
        pdfmetrics.registerFont(TTFont(name, path))


def t(c: canvas.Canvas, value: str, x: float, y: float, size: float, color=INK, font="Arial") -> None:
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def tr(c: canvas.Canvas, value: str, x: float, y: float, size: float, color=INK, font="Arial") -> None:
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawRightString(x, y, value)


def rule(c: canvas.Canvas, x1: float, y1: float, x2: float, y2: float, color=LINE, width=0.6) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y1, x2, y2)


def para(
    c: canvas.Canvas,
    value: str,
    x: float,
    y: float,
    w: float,
    size=8.5,
    leading=12,
    color=INK,
    font="Arial",
    max_lines: int | None = None,
) -> float:
    words = value.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(candidate, font, size) <= w:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    if max_lines:
        lines = lines[:max_lines]
    for line in lines:
        t(c, line, x, y, size, color, font)
        y -= leading
    return y


def prepared_cover(path: Path, w: int, h: int, anchor="center", darken=1.0) -> Path:
    TMP.mkdir(parents=True, exist_ok=True)
    key = hashlib.sha1(f"{path}-{w}-{h}-{anchor}-{darken}".encode()).hexdigest()[:12]
    target = TMP / f"{path.stem}-{key}.jpg"
    if target.exists():
        return target
    with Image.open(path) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
    source_ratio = image.width / image.height
    target_ratio = w / h
    if source_ratio > target_ratio:
        crop_w = round(image.height * target_ratio)
        if anchor == "left":
            left = 0
        elif anchor == "right":
            left = image.width - crop_w
        else:
            left = (image.width - crop_w) // 2
        image = image.crop((left, 0, left + crop_w, image.height))
    else:
        crop_h = round(image.width / target_ratio)
        if anchor == "top":
            top = 0
        elif anchor == "bottom":
            top = image.height - crop_h
        else:
            top = (image.height - crop_h) // 2
        image = image.crop((0, top, image.width, top + crop_h))
    if darken != 1:
        image = ImageEnhance.Brightness(image).enhance(darken)
    image = image.resize((w, h), Image.Resampling.LANCZOS)
    image.save(target, quality=92, optimize=True)
    return target


def image_cover(
    c: canvas.Canvas,
    path: Path,
    x: float,
    y: float,
    w: float,
    h: float,
    anchor="center",
    darken=1.0,
) -> None:
    scale = 2.25
    prepared = prepared_cover(path, max(8, round(w * scale)), max(8, round(h * scale)), anchor, darken)
    c.drawImage(str(prepared), x, y, w, h, preserveAspectRatio=False, mask="auto")


def image_contain(c: canvas.Canvas, path: Path, x: float, y: float, w: float, h: float) -> None:
    with Image.open(path) as image:
        iw, ih = image.size
    ratio = min(w / iw, h / ih)
    dw, dh = iw * ratio, ih * ratio
    c.drawImage(str(path), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, preserveAspectRatio=True, mask="auto")


def logo(c: canvas.Canvas, x: float, y: float, w: float, light=True) -> None:
    path = LOGO_LIGHT if light else LOGO_DARK
    image_contain(c, path, x, y, w, w * 0.55)


def footer(c: canvas.Canvas, page: int, label: str, dark=False) -> None:
    color = PALE if dark else ASH
    rule(c, 34, 27, PW - 34, 27, HexColor("#363635") if dark else LINE, 0.45)
    t(c, "GİZLİ HOME", 34, 12, 5.8, color, "Arial-Bold")
    t(c, label.upper(), 108, 12, 5.8, BLUE if dark else BLUE_DARK, "Arial-Bold")
    tr(c, f"{page:02d}", PW - 34, 12, 6.2, color, "DIN")


def kicker(c: canvas.Canvas, value: str, x=34, y=790, dark=False) -> None:
    t(c, value.upper(), x, y, 6.3, BLUE if dark else BLUE_DARK, "Arial-Bold")
    rule(c, x, y - 9, x + 58, y - 9, BLUE, 1.4)


def product_info(c: canvas.Canvas, product: dict, x: float, y: float, w: float, dark=False) -> None:
    primary = PAPER if dark else INK
    muted = PALE if dark else ASH
    t(c, product["name"], x, y, 31, primary, "DIN")
    t(c, f'{product["index"]} / {product["sku"]}', x, y - 22, 6.5, BLUE, "Arial-Bold")
    y = para(c, product["tagline"], x, y - 59, w, 15, 20, GOLD, "Georgia-Italic", max_lines=2)
    y = para(c, product["description"], x, y - 16, w, 7.7, 11.5, muted, "Arial", max_lines=4)
    rule(c, x, y - 4, x + w, y - 4, HexColor("#393938") if dark else LINE, 0.55)
    specs = [
        ("ÖLÇÜ", product["dimensions"]),
        ("GİZLİ HACİM", product["hidden"]),
        ("YÜZEY", product["colors"]),
        ("TERMİN", product["lead"]),
    ]
    sy = y - 27
    for label, value in specs:
        t(c, label, x, sy, 5.8, BLUE, "Arial-Bold")
        para(c, value, x + 72, sy, w - 72, 6.7, 9, muted, "Arial", max_lines=2)
        sy -= 25
    rule(c, x, sy + 7, x + w, sy + 7, HexColor("#393938") if dark else LINE, 0.55)
    t(c, "PERAKENDE", x, sy - 13, 5.5, muted, "Arial-Bold")
    t(c, money(product["price"]), x, sy - 34, 15, primary, "DIN")
    t(c, "PROJE 10+", x + w - 102, sy - 13, 5.5, muted, "Arial-Bold")
    tr(c, money(product["wholesale"]), x + w, sy - 34, 15, GOLD, "DIN")


def cover(c: canvas.Canvas) -> None:
    image_cover(c, MOTOR_REVEAL, 0, 0, PW, PH, "center", 0.68)
    c.setFillColor(HexColor("#050505"))
    c.setFillAlpha(0.76)
    c.rect(0, 0, PW, 290, fill=1, stroke=0)
    c.setFillAlpha(1)
    logo(c, 36, PH - 107, 106, light=True)
    t(c, "REVEAL", 34, 152, 75, PAPER, "DIN")
    t(c, "/ 2026", 371, 161, 31, BLUE, "DIN")
    para(c, "NFC erişimli gizli mobilya koleksiyonu", 38, 123, 350, 11.5, 16, PAPER, "Georgia-Italic")
    rule(c, 38, 97, PW - 38, 97, BLUE, 1.1)
    t(c, "GERÇEK ÜRÜN REFERANSI + STÜDYO GÖRSELLEŞTİRMESİ", 38, 73, 6.1, PALE, "Arial-Bold")
    t(c, "OTEL / REZİDANS / OFİS / MAĞAZA", 38, 53, 6.1, PALE, "Arial-Bold")
    c.showPage()


def truth_page(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    image_cover(c, DOC / "nfc-card-real.jpg", 0, 0, 228, PH, "center", 0.86)
    t(c, "GERÇEK KART", 18, 38, 6.1, white, "Arial-Bold")
    t(c, "01", 255, 754, 74, BLUE, "DIN")
    t(c, "Bu kez", 255, 687, 34, INK, "Georgia")
    t(c, "sır görünür.", 255, 647, 34, INK, "Georgia-Italic")
    para(
        c,
        "Koleksiyonun kapalı formu kadar erişim anı da tasarımın parçası. Bu yayında gerçek video karelerinden okunan NFC kart, kaldırma hareketi ve gizli hacimler ürün referansına sadık yeni sahnelerle birlikte gösterilir.",
        257,
        578,
        286,
        9,
        14,
        ASH,
        "Arial",
    )
    rule(c, 257, 455, 548, 455, LINE, 0.7)
    for i, (n, head, body) in enumerate(
        [
            ("36", "FOTOĞRAF", "Ürün ve ekran görüntüsü incelendi."),
            ("11", "VİDEO", "Açılma sekansları kare kare karşılaştırıldı."),
            ("04", "YENİ SAHNE", "Referanslara dayalı stüdyo görselleri üretildi."),
        ]
    ):
        y = 410 - i * 92
        t(c, n, 257, y, 25, BLUE_DARK, "DIN")
        t(c, head, 322, y + 5, 6.2, INK, "Arial-Bold")
        para(c, body, 322, y - 14, 218, 7.4, 10.5, ASH, "Arial", max_lines=2)
    para(c, "Not: Üretilmiş sahneler ürün geometrisi ve mekanizma referanslarına dayanır; renk, aksesuar ve ortam uygulaması temsilidir.", 257, 92, 282, 6.4, 9, ASH, "Arial")
    footer(c, 2, "Evidence")
    c.showPage()


def nfc_page(c: canvas.Canvas) -> None:
    c.setFillColor(INK)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    image_cover(c, NFC_APPROACH, 0, 322, PW, PH - 322, "center", 0.9)
    kicker(c, "Erişim anı", 34, 285, dark=True)
    t(c, "Kartı yaklaştır.", 34, 230, 34, PAPER, "Georgia")
    t(c, "Mekanizma sizi tanısın.", 34, 191, 34, GOLD, "Georgia-Italic")
    steps = [
        ("01", "YAKLAŞTIR", "Yetkilendirilmiş NFC kartı okuyucu bölgeye getir."),
        ("02", "DOĞRULA", "Sistem kartı tanır ve kilidi tetikler."),
        ("03", "AÇ", "Motor veya menteşe kontrollü hacmi erişime açar."),
    ]
    for i, (num, head, body) in enumerate(steps):
        x = 34 + i * 178
        t(c, num, x, 128, 22, BLUE, "DIN")
        t(c, head, x, 103, 6.2, PAPER, "Arial-Bold")
        para(c, body, x, 84, 152, 6.6, 9.4, PALE, "Arial", max_lines=3)
    footer(c, 3, "NFC", dark=True)
    c.showPage()


def sequence_page(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    kicker(c, "Gerçek video sekansı")
    t(c, "Dört karede", 34, 728, 37, INK, "Georgia")
    t(c, "açılma anı.", 34, 684, 37, BLUE_DARK, "Georgia-Italic")
    frames = [
        (DOC / "aura-closed-real.jpg", "00", "KAPALI", "Yüzey mobilya formuna karışır."),
        (DOC / "aura-auth-real.jpg", "01", "YETKİ", "Kart okuyucuya yaklaştırılır."),
        (DOC / "aura-lift-real.jpg", "02", "HAREKET", "Üst modül sessizce yükselir."),
        (DOC / "aura-open-real.jpg", "03", "ERİŞİM", "Gizli katman kullanıma açılır."),
    ]
    image_y = [442, 442, 146, 146]
    image_x = [34, 303, 34, 303]
    for (path, num, head, body), x, y in zip(frames, image_x, image_y):
        image_cover(c, path, x, y, 258, 214, "center", 0.96)
        c.setFillColor(INK)
        c.rect(x, y - 54, 258, 54, fill=1, stroke=0)
        t(c, num, x + 11, y - 29, 22, BLUE, "DIN")
        t(c, head, x + 58, y - 21, 6.2, PAPER, "Arial-Bold")
        para(c, body, x + 58, y - 39, 185, 6.4, 8.5, PALE, "Arial", max_lines=2)
    footer(c, 4, "Sequence")
    c.showPage()


def aura_reveal_product(c: canvas.Canvas) -> None:
    product = PRODUCTS[2]
    image_cover(c, MOTOR_REVEAL, 0, 0, PW, PH, "center", 0.82)
    c.setFillColor(INK)
    c.setFillAlpha(0.88)
    c.rect(0, 0, 258, PH, fill=1, stroke=0)
    c.setFillAlpha(1)
    product_info(c, product, 34, 746, 194, dark=True)
    footer(c, 5, "Aura 02", dark=True)
    c.showPage()


def standard_product_page(c: canvas.Canvas, product: dict, page: int, image_path: Path, dark: bool, image_side="top") -> None:
    bg = INK if dark else PAPER
    c.setFillColor(bg)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    if image_side == "top":
        image_cover(c, image_path, 0, 430, PW, PH - 430, "center", 0.96 if not dark else 0.86)
        c.setFillColor(bg)
        c.rect(0, 0, PW, 442, fill=1, stroke=0)
        product_info(c, product, 34, 397, 527, dark=dark)
    elif image_side == "left":
        image_cover(c, image_path, 0, 0, 330, PH, "center", 0.94)
        product_info(c, product, 355, 746, 206, dark=dark)
    else:
        image_cover(c, image_path, 265, 0, PW - 265, PH, "center", 0.94)
        product_info(c, product, 34, 746, 206, dark=dark)
    footer(c, page, product["name"], dark=dark)
    c.showPage()


def night_product_page(c: canvas.Canvas) -> None:
    product = PRODUCTS[3]
    image_cover(c, NIGHT_REVEAL, 0, 0, PW, PH, "center", 0.86)
    c.setFillColor(INK)
    c.setFillAlpha(0.86)
    c.rect(0, 0, 258, PH, fill=1, stroke=0)
    c.setFillAlpha(1)
    product_info(c, product, 34, 746, 194, dark=True)
    footer(c, 8, "Night 01", dark=True)
    c.showPage()


def wall_product_page(c: canvas.Canvas) -> None:
    product = PRODUCTS[4]
    c.setFillColor(PAPER)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    image_cover(c, WALL_REVEAL, 0, 398, PW, PH - 398, "center", 0.94)
    c.setFillColor(PAPER)
    c.rect(0, 0, PW, 410, fill=1, stroke=0)
    product_info(c, product, 34, 363, 527, dark=False)
    footer(c, 9, "Wall 01")
    c.showPage()


def mechanism_matrix_page(c: canvas.Canvas) -> None:
    c.setFillColor(INK)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    kicker(c, "Mekanizma haritası", dark=True)
    t(c, "Dört hareket.", 34, 724, 36, PAPER, "Georgia")
    t(c, "Tek tasarım ilkesi.", 34, 681, 36, GOLD, "Georgia-Italic")
    items = [
        (DOC / "aura-open-real.jpg", "MOTORLU YÜKSELME", "CUBE / AURA 01 / AURA 02"),
        (DOC / "night-open-real.jpg", "MENTEŞELİ ÜST HAZNE", "NIGHT 01 / LITE"),
        (DOC / "wall-open-real.jpg", "AŞAĞI AÇILAN PANEL", "WALL 01"),
        (DOC / "slide-open-real.jpg", "SÜRGÜLÜ KATMAN", "SLIDE"),
    ]
    for i, (path, head, models) in enumerate(items):
        col = i % 2
        row = i // 2
        x = 34 + col * 270
        y = 425 - row * 265
        image_cover(c, path, x, y, 252, 190, "center", 0.84)
        t(c, f"0{i + 1}", x, y - 31, 20, BLUE, "DIN")
        t(c, head, x + 45, y - 22, 7, PAPER, "Arial-Bold")
        t(c, models, x + 45, y - 40, 6.1, PALE, "Arial")
    footer(c, 12, "Mechanism", dark=True)
    c.showPage()


def documentary_page(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    kicker(c, "Atölye doğrulaması")
    t(c, "Görselleştirme önce", 34, 725, 33, INK, "Georgia")
    t(c, "gerçeği dinledi.", 34, 685, 33, BLUE_DARK, "Georgia-Italic")
    tiles = [
        (DOC / "nfc-card-real.jpg", 34, 387, 165, 255, "NFC KART / GERÇEK KARE"),
        (DOC / "aura-lift-real.jpg", 210, 387, 351, 255, "MOTORLU AÇILIM / GERÇEK KARE"),
        (DOC / "night-open-real.jpg", 34, 103, 165, 238, "ÜST HAZNE / GERÇEK KARE"),
        (DOC / "wall-open-real.jpg", 210, 103, 165, 238, "DUVAR MODÜLÜ / GERÇEK KARE"),
        (DOC / "slide-open-real.jpg", 386, 103, 175, 238, "SÜRGÜ PANEL / GERÇEK KARE"),
    ]
    for path, x, y, w, h, label in tiles:
        image_cover(c, path, x, y, w, h, "center", 0.96)
        c.setFillColor(INK)
        c.rect(x, y, w, 24, fill=1, stroke=0)
        t(c, label, x + 7, y + 8, 5.4, PAPER, "Arial-Bold")
    para(c, "Bu kareler ürünlerin gerçek prototip ve test videolarından alınmıştır. Nihai proje ölçüleri, yüzeyleri ve aksesuarları sipariş proformasıyla kesinleşir.", 34, 72, 520, 6.4, 9, ASH, "Arial")
    footer(c, 13, "Real frames")
    c.showPage()


def finishes_page(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    kicker(c, "Yüzey laboratuvarı")
    t(c, "Gizlenen hacim.", 34, 724, 36, INK, "Georgia")
    t(c, "Görünen karakter.", 34, 681, 36, BLUE_DARK, "Georgia-Italic")
    colors = [
        ("01", "ANTRASİT", HexColor("#323334")),
        ("02", "SİYAH", HexColor("#0C0D0E")),
        ("03", "KIRIK BEYAZ", HexColor("#E6E0D4")),
        ("04", "KUM BEJİ", HexColor("#B6A58B")),
        ("05", "CEVİZ", HexColor("#8B5C37")),
        ("06", "SAFİR MEŞE", HexColor("#B89A6A")),
    ]
    for i, (num, name, color) in enumerate(colors):
        col, row = i % 3, i // 3
        x, y = 34 + col * 176, 442 - row * 176
        c.setFillColor(color)
        c.rect(x, y, 158, 128, fill=1, stroke=0)
        label_color = PAPER if i in {0, 1, 4} else INK
        t(c, num, x + 8, y + 12, 6.2, label_color, "Arial-Bold")
        t(c, name, x + 32, y + 12, 6.2, label_color, "Arial-Bold")
    rule(c, 34, 210, PW - 34, 210, LINE, 0.7)
    steps = [
        ("01", "BRIEF", "Alan, adet, kullanım"),
        ("02", "NUMUNE", "Yüzey ve teknik onay"),
        ("03", "ÜRETİM", "Ölçü, kalite, test"),
        ("04", "TESLİM", "Sevk ve montaj planı"),
    ]
    for i, (num, head, body) in enumerate(steps):
        x = 34 + i * 132
        t(c, num, x, 171, 19, BLUE_DARK, "DIN")
        t(c, head, x, 147, 6.1, INK, "Arial-Bold")
        para(c, body, x, 128, 108, 6.4, 9, ASH, "Arial", max_lines=2)
    footer(c, 14, "Finishes")
    c.showPage()


def hospitality_page(c: canvas.Canvas) -> None:
    c.setFillColor(INK)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    image_cover(c, MOOD_OFFICE, 0, 500, 296, 342, "center", 0.68)
    image_cover(c, MOOD_VILLA, 296, 500, 299, 342, "center", 0.68)
    image_cover(c, MOOD_LIVING, 0, 310, PW, 190, "center", 0.62)
    kicker(c, "Otel ve proje seçkisi", 34, 273, dark=True)
    t(c, "Doğru model,", 34, 220, 34, PAPER, "Georgia")
    t(c, "doğru oda.", 34, 180, 34, GOLD, "Georgia-Italic")
    cases = [
        ("STANDART ODA", "NIGHT 01 / LITE"),
        ("PREMIUM ODA", "CUBE / WALL 01"),
        ("EXECUTIVE SÜİT", "AURA 01 / AURA 02"),
        ("OFİS / MAĞAZA", "SLIDE / ÖZEL ÜRETİM"),
    ]
    for i, (head, models) in enumerate(cases):
        x = 34 + i * 132
        rule(c, x, 128, x + 112, 128, BLUE, 0.8)
        t(c, head, x, 106, 5.7, PALE, "Arial-Bold")
        para(c, models, x, 86, 112, 6.6, 9, PAPER, "Arial-Bold", max_lines=2)
    footer(c, 15, "Hospitality", dark=True)
    c.showPage()


def pricing_page(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    kicker(c, "Ticari fiyat eki")
    t(c, "Perakende ve", 34, 724, 34, INK, "Georgia")
    t(c, "proje fiyatları.", 34, 683, 34, BLUE_DARK, "Georgia-Italic")
    para(c, "26 Ağustos 2026 itibarıyla KDV dahil tavsiye edilen fiyatlardır.", 34, 646, 390, 7.4, 10, ASH, "Arial")
    y = 589
    headers = [("MODEL", 34), ("SKU", 246), ("PERAKENDE", 442), ("PROJE 10+", 561)]
    rule(c, 34, y + 23, PW - 34, y + 23, INK, 1)
    for head, x in headers[:2]:
        t(c, head, x, y, 6, BLUE_DARK, "Arial-Bold")
    tr(c, headers[2][0], headers[2][1], y, 6, BLUE_DARK, "Arial-Bold")
    tr(c, headers[3][0], headers[3][1], y, 6, BLUE_DARK, "Arial-Bold")
    y -= 43
    for product in PRODUCTS:
        rule(c, 34, y + 22, PW - 34, y + 22, LINE, 0.5)
        t(c, product["name"], 34, y, 10.5, INK, "DIN")
        t(c, product["sku"], 246, y, 6.7, ASH, "Arial")
        tr(c, money(product["price"]), 442, y, 8.1, INK, "Arial-Bold")
        tr(c, money(product["wholesale"]), 561, y, 8.1, GOLD, "Arial-Bold")
        t(c, product["dimensions"], 34, y - 14, 5.9, ASH, "Arial")
        tr(c, product["lead"], 561, y - 14, 5.9, ASH, "Arial")
        y -= 55
    rule(c, 34, 184, PW - 34, 184, INK, 1)
    tiers = [("1-4", "LİSTE"), ("5-9", "-%10"), ("10-24", "-%15"), ("25-49", "-%20'YE KADAR"), ("50+", "ÖZEL TEKLİF")]
    for i, (qty, disc) in enumerate(tiers):
        x = 34 + i * 106
        t(c, qty, x, 151, 17, BLUE_DARK, "DIN")
        t(c, disc, x, 131, 5.7, INK, "Arial-Bold")
    para(c, "Sevkiyat, keşif, montaj, özel ambalaj ve özel ölçü/yüzey fiyatlara dahil değildir; proforma ile kesinleşir.", 34, 91, 500, 6.3, 9, ASH, "Arial")
    footer(c, 16, "Trade")
    c.showPage()


def terms_page(c: canvas.Canvas) -> None:
    c.setFillColor(INK)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    kicker(c, "Ticari notlar", dark=True)
    t(c, "Net süreç.", 34, 724, 36, PAPER, "Georgia")
    t(c, "Yazılı onay.", 34, 682, 36, GOLD, "Georgia-Italic")
    sections = [
        ("01 / ÖDEME", "Perakendede PayTR veya havale/EFT. Proje siparişinde önerilen plan yüzde 50 sipariş avansı, yüzde 50 sevk öncesidir; farklı plan yazılı teklifle belirlenir."),
        ("02 / TERMİN", "Stok ve sipariş durumuna göre 3-20 iş günü. Büyük adet ve özel üretimde proje takvimi ayrıca açılır."),
        ("03 / GARANTİ", "Mekanizma ve üretim kaynaklı kusurlara karşı teslimden itibaren 2 yıl. Kullanım hatası, sıvı teması ve yetkisiz müdahale kapsam dışıdır."),
        ("04 / MONTAJ", "Duvar ürünlerinde taşıyıcı yüzey, akıllı yüzeyli modellerde priz ve elektrik planı uygulama öncesi doğrulanır."),
        ("05 / GÜVENLİK", "NFC kartlar yetkili kullanıcıya teslim edilir. Ürünler sertifikalı çelik kasa, yangın kasası veya otel kasası değildir."),
        ("06 / ÖZEL ÜRETİM", "Özel ölçü, yüzey ve proje ürünleri numune veya teknik çizim/proforma onayıyla kesinleşir ve cayma hakkı istisnasına tabi olabilir."),
    ]
    for i, (head, body) in enumerate(sections):
        col, row = i % 2, i // 2
        x, y = 34 + col * 270, 566 - row * 180
        rule(c, x, y + 29, x + 246, y + 29, BLUE, 0.8)
        t(c, head, x, y, 6.2, PAPER, "Arial-Bold")
        para(c, body, x, y - 26, 242, 7, 11, PALE, "Arial", max_lines=7)
    para(c, "Bu katalog teklif çerçevesidir; ürün kapsamı, teslim yeri, ödeme planı ve yasal satış bilgileri proforma/sözleşme ile kesinleşir.", 34, 66, 520, 6, 8.5, ASH, "Arial")
    footer(c, 17, "Terms", dark=True)
    c.showPage()


def draw_qr(c: canvas.Canvas, data: str, x: float, y: float, size: float) -> None:
    widget = QrCodeWidget(data)
    x1, y1, x2, y2 = widget.getBounds()
    drawing = Drawing(size, size, transform=[size / (x2 - x1), 0, 0, size / (y2 - y1), 0, 0])
    drawing.add(widget)
    c.setFillColor(white)
    c.rect(x - 7, y - 7, size + 14, size + 14, fill=1, stroke=0)
    renderPDF.draw(drawing, c, x, y)


def back_cover(c: canvas.Canvas) -> None:
    c.setFillColor(INK)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    image_contain(c, MARK, 34, 315, 220, 330)
    rule(c, 286, 204, 286, 659, HexColor("#363635"), 0.7)
    logo(c, 326, 646, 116, light=True)
    t(c, "Görünmeyen", 326, 556, 27, PAPER, "Georgia")
    t(c, "güvenlik.", 326, 524, 27, PAPER, "Georgia-Italic")
    t(c, "gizlihome.com.tr", 326, 424, 7, PAPER, "Arial-Bold")
    t(c, "+90 541 381 21 14", 326, 393, 15, PAPER, "DIN")
    t(c, "@gizlihome", 326, 364, 7, PALE, "Arial")
    draw_qr(c, "https://gizlihome.com.tr", 430, 292, 105)
    para(c, "Yenidoğan Mahallesi Hürriyet Caddesi No: 6/50, Merkez / Kırıkkale", 326, 252, 225, 6.2, 9, ASH, "Arial")
    t(c, "Ziyaret için randevu alınız.", 326, 203, 7, GOLD, "Georgia-Italic")
    tr(c, "© 2026 GİZLİ HOME", PW - 34, 28, 5.5, ASH, "Arial")
    c.showPage()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    register_fonts()
    c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
    c.setTitle("GİZLİ HOME 2026 REVEAL EDITION")
    c.setAuthor("GİZLİ HOME")
    c.setSubject("NFC erişimli gizli mobilyalar - ürün, mekanizma, perakende ve proje kataloğu")
    cover(c)
    truth_page(c)
    nfc_page(c)
    sequence_page(c)
    aura_reveal_product(c)
    standard_product_page(c, PRODUCTS[1], 6, PRODUCTS[1]["image"], dark=True, image_side="top")
    standard_product_page(c, PRODUCTS[0], 7, PRODUCTS[0]["image"], dark=False, image_side="left")
    night_product_page(c)
    wall_product_page(c)
    standard_product_page(c, PRODUCTS[5], 10, PRODUCTS[5]["image"], dark=True, image_side="top")
    standard_product_page(c, PRODUCTS[6], 11, PRODUCTS[6]["image"], dark=False, image_side="right")
    mechanism_matrix_page(c)
    documentary_page(c)
    finishes_page(c)
    hospitality_page(c)
    pricing_page(c)
    terms_page(c)
    back_cover(c)
    c.save()
    return OUT


if __name__ == "__main__":
    print(build())
