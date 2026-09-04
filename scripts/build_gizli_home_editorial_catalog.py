#!/usr/bin/env python3
"""Build a radically different, landscape editorial GIZLI HOME catalog."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageEnhance
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from build_gizli_home_catalog import PRODUCTS, money  # noqa: E402

OUT = ROOT / "output" / "pdf" / "GIZLI_HOME_2026_Editorial_Lookbook.pdf"
TMP = ROOT / "tmp" / "pdfs" / "gizli-home-editorial"

PW, PH = landscape(A4)

BLACK = HexColor("#0A0A0A")
COAL = HexColor("#171717")
IVORY = HexColor("#EFEAE1")
PAPER = HexColor("#F8F6F1")
BRONZE = HexColor("#A87839")
SAND = HexColor("#CEB98F")
ASH = HexColor("#7A756D")
HAIRLINE = HexColor("#CFC8BC")
PALE = HexColor("#D8D1C6")

ARIAL = "/System/Library/Fonts/Supplemental/Arial.ttf"
ARIAL_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
GEORGIA = "/System/Library/Fonts/Supplemental/Georgia.ttf"
GEORGIA_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
GEORGIA_ITALIC = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
DIN = "/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf"

LOGO_LIGHT = ROOT / "public" / "images" / "brand" / "gizli-home-logo-light.png"
LOGO_DARK = ROOT / "public" / "images" / "brand" / "gizli-home-logo-dark.png"
DOOR_MARK = ROOT / "public" / "images" / "brand" / "gizli-home-door-mark.png"
COVER = ROOT / "output" / "catalog-assets" / "cover-hero-v1.png"

MOOD_OFFICE = ROOT / "public" / "images" / "generated" / "banner-private-office.webp"
MOOD_VILLA = ROOT / "public" / "images" / "generated" / "banner-villa-project.webp"
MOOD_LIVING = ROOT / "public" / "images" / "generated" / "banner-living-collection.webp"


def fonts() -> None:
    pdfmetrics.registerFont(TTFont("Arial", ARIAL))
    pdfmetrics.registerFont(TTFont("Arial-Bold", ARIAL_BOLD))
    pdfmetrics.registerFont(TTFont("Georgia", GEORGIA))
    pdfmetrics.registerFont(TTFont("Georgia-Bold", GEORGIA_BOLD))
    pdfmetrics.registerFont(TTFont("Georgia-Italic", GEORGIA_ITALIC))
    pdfmetrics.registerFont(TTFont("DIN", DIN))


def prepared_crop(path: Path, w: float, h: float, anchor=(0.5, 0.5), brightness=1.0) -> Path:
    image = Image.open(path).convert("RGB")
    target_ratio = w / h
    source_ratio = image.width / image.height
    ax, ay = anchor
    if source_ratio > target_ratio:
        crop_w = max(1, int(image.height * target_ratio))
        left = int((image.width - crop_w) * ax)
        left = max(0, min(left, image.width - crop_w))
        image = image.crop((left, 0, left + crop_w, image.height))
    else:
        crop_h = max(1, int(image.width / target_ratio))
        top = int((image.height - crop_h) * ay)
        top = max(0, min(top, image.height - crop_h))
        image = image.crop((0, top, image.width, top + crop_h))
    if brightness != 1.0:
        image = ImageEnhance.Brightness(image).enhance(brightness)
    key = f"{path.stem}-{int(w)}x{int(h)}-{int(ax*100)}-{int(ay*100)}-{int(brightness*100)}.jpg"
    out = TMP / key
    image.save(out, quality=93, optimize=True)
    return out


def image_cover(c: canvas.Canvas, path: Path, x: float, y: float, w: float, h: float, anchor=(0.5, 0.5), brightness=1.0) -> None:
    crop = prepared_crop(path, w, h, anchor, brightness)
    c.drawImage(ImageReader(crop), x, y, w, h, mask="auto")


def image_contain(c: canvas.Canvas, path: Path, x: float, y: float, w: float, h: float) -> None:
    image = Image.open(path)
    iw, ih = image.size
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(ImageReader(path), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, mask="auto")


def t(c: canvas.Canvas, value: str, x: float, y: float, size: float, color=BLACK, font="Arial") -> None:
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def tr(c: canvas.Canvas, value: str, x: float, y: float, size: float, color=BLACK, font="Arial") -> None:
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawRightString(x, y, value)


def para(c: canvas.Canvas, value: str, x: float, y: float, w: float, size=9, leading=13, color=BLACK, font="Arial", max_lines=None) -> float:
    words = value.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = (current + " " + word).strip()
        if pdfmetrics.stringWidth(trial, font, size) <= w:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    if max_lines:
        lines = lines[:max_lines]
    c.setFillColor(color)
    c.setFont(font, size)
    for line_value in lines:
        c.drawString(x, y, line_value)
        y -= leading
    return y


def rule(c: canvas.Canvas, x1: float, y1: float, x2: float, y2: float, color=HAIRLINE, width=0.45) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y1, x2, y2)


def logo(c: canvas.Canvas, x: float, y: float, w: float, dark=False) -> None:
    image_contain(c, LOGO_LIGHT if dark else LOGO_DARK, x, y, w, w * 0.58)


def qr_code(c: canvas.Canvas, value: str, x: float, y: float, size: float) -> None:
    widget = qr.QrCodeWidget(value)
    bounds = widget.getBounds()
    width = bounds[2] - bounds[0]
    height = bounds[3] - bounds[1]
    widget.barFillColor = BLACK
    drawing = Drawing(size, size, transform=[size / width, 0, 0, size / height, 0, 0])
    drawing.add(widget)
    renderPDF.draw(drawing, c, x, y)


def folio(c: canvas.Canvas, page: int, section: str, dark=False) -> None:
    color = PALE if dark else ASH
    line_color = HexColor("#343434") if dark else HAIRLINE
    rule(c, 36, 25, PW - 36, 25, line_color, 0.45)
    t(c, "GİZLİ HOME", 36, 11, 6.6, color, "Arial-Bold")
    t(c, section.upper(), 115, 11, 6.6, BRONZE, "Arial-Bold")
    tr(c, f"{page:02d}", PW - 36, 11, 7, color, "DIN")


def section_kicker(c: canvas.Canvas, value: str, x: float, y: float, dark=False) -> None:
    color = SAND if dark else BRONZE
    t(c, value.upper(), x, y, 7.2, color, "Arial-Bold")
    rule(c, x, y - 7, x + 58, y - 7, color, 1.2)


def cover_page(c: canvas.Canvas) -> None:
    image_cover(c, COVER, 0, 0, PW, PH, anchor=(0.5, 0.48), brightness=0.82)
    c.setFillColor(BLACK)
    c.rect(PW * 0.69, 0, PW * 0.31, PH, fill=1, stroke=0)
    logo(c, PW * 0.73, PH - 104, 108, dark=True)
    t(c, "NOVA", PW * 0.73, 248, 72, white, "DIN")
    t(c, "COLLECTION / 2026", PW * 0.73 + 3, 220, 8.5, SAND, "Arial-Bold")
    rule(c, PW * 0.73 + 3, 202, PW - 45, 202, BRONZE, 0.8)
    para(c, "Akıllı gizli bölmeli mobilyalar", PW * 0.73 + 3, 179, 170, 10, 14, PALE, "Georgia-Italic")
    t(c, "PERAKENDE", PW * 0.73 + 3, 77, 6.5, ASH, "Arial-Bold")
    t(c, "PROJE", PW * 0.73 + 78, 77, 6.5, ASH, "Arial-Bold")
    t(c, "TOPTAN", PW * 0.73 + 132, 77, 6.5, ASH, "Arial-Bold")
    t(c, "gizlihome.com.tr", PW * 0.73 + 3, 45, 7.2, SAND, "Arial-Bold")
    c.showPage()


def manifesto_page(c: canvas.Canvas) -> None:
    c.setFillColor(IVORY)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    image_cover(c, MOOD_OFFICE, 0, 0, 486, PH, anchor=(0.18, 0.5), brightness=0.87)
    c.setFillColor(IVORY)
    c.rect(486, 0, PW - 486, PH, fill=1, stroke=0)
    section_kicker(c, "Marka manifestosu", 525, 535)
    t(c, "Güvenlik", 525, 468, 36, BLACK, "Georgia")
    t(c, "görünmek", 525, 424, 36, BLACK, "Georgia")
    t(c, "zorunda değil.", 525, 380, 36, BRONZE, "Georgia-Italic")
    para(c, "GİZLİ HOME, kontrollü erişimi mobilyanın estetiğine zarar vermeden günlük yaşamın içine yerleştirir.", 525, 320, 255, 10.5, 15, ASH, "Arial")
    rule(c, 525, 256, 786, 256, HAIRLINE, 0.7)
    t(c, "07", 525, 218, 24, BRONZE, "DIN")
    t(c, "imza model", 562, 219, 7, ASH, "Arial-Bold")
    t(c, "02", 650, 218, 24, BRONZE, "DIN")
    t(c, "yıl garanti", 687, 219, 7, ASH, "Arial-Bold")
    para(c, "Ev, otel, mağaza, ofis ve villa projeleri için standart veya ölçüye uyarlanabilen çözümler.", 525, 152, 255, 8.8, 13, BLACK, "Arial")
    folio(c, 2, "Manifesto")
    c.showPage()


def index_page(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    logo(c, PW - 112, PH - 70, 72)
    section_kicker(c, "Koleksiyon indeksi", 36, 535)
    t(c, "NOVA / 07", 36, 455, 76, BLACK, "DIN")
    t(c, "Bir aile. Yedi farklı kullanım senaryosu.", 40, 420, 13, ASH, "Georgia-Italic")

    y = 365
    for product in PRODUCTS:
        rule(c, 36, y + 22, 440, y + 22, HAIRLINE, 0.45)
        t(c, product["index"], 36, y, 10, BRONZE, "DIN")
        t(c, product["name"], 76, y, 13, BLACK, "DIN")
        t(c, product["category"].upper(), 228, y + 1, 6.3, ASH, "Arial-Bold")
        tr(c, money(product["price"]), 440, y, 8.4, BLACK, "Arial-Bold")
        y -= 46

    image_cover(c, PRODUCTS[0]["image"], 478, 64, 108, 398, anchor=(0.52, 0.5), brightness=0.9)
    image_cover(c, PRODUCTS[2]["image"], 598, 64, 108, 398, anchor=(0.5, 0.48), brightness=0.9)
    image_cover(c, PRODUCTS[6]["image"], 718, 64, 88, 398, anchor=(0.5, 0.45), brightness=0.9)
    t(c, "01", 484, 48, 7, BRONZE, "DIN")
    t(c, "03", 604, 48, 7, BRONZE, "DIN")
    t(c, "07", 724, 48, 7, BRONZE, "DIN")
    folio(c, 3, "Index")
    c.showPage()


def system_page(c: canvas.Canvas) -> None:
    c.setFillColor(BLACK)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    image_cover(c, PRODUCTS[2]["image"], 500, 0, PW - 500, PH, anchor=(0.48, 0.38), brightness=0.78)
    c.setFillColor(BLACK)
    c.rect(0, 0, 500, PH, fill=1, stroke=0)
    logo(c, 36, PH - 72, 72, dark=True)
    section_kicker(c, "Erişim sistemi", 36, 485, dark=True)
    t(c, "Sadece size", 36, 425, 38, white, "Georgia")
    t(c, "açılan katman.", 36, 382, 38, SAND, "Georgia-Italic")
    para(c, "NFC erişim, modeline göre elektronik kilit veya motorlu hareketi tetikler. Mobilya kapandığında form ve yüzey bütünlüğü korunur.", 36, 330, 380, 9.5, 14, PALE, "Arial")

    steps = [
        ("01", "YAKLAŞTIR", "Yetkilendirilmiş kart"),
        ("02", "AKTİFLEŞTİR", "Kilit veya motor"),
        ("03", "ERİŞ", "Aydınlatılmış hacim"),
        ("04", "GİZLE", "Sakin mobilya formu"),
    ]
    line_y = 190
    rule(c, 48, line_y, 452, line_y, BRONZE, 1.0)
    for i, (num, title_v, desc) in enumerate(steps):
        x = 48 + i * 112
        c.setFillColor(BLACK)
        c.setStrokeColor(BRONZE)
        c.setLineWidth(1)
        c.circle(x, line_y, 12, fill=1, stroke=1)
        t(c, num, x - 7, line_y - 4, 8, SAND, "DIN")
        t(c, title_v, x - 2, 151, 7, white, "Arial-Bold")
        para(c, desc, x - 2, 132, 95, 6.8, 9, ASH, "Arial")
    t(c, "NOT / Ürünler sertifikalı çelik kasa veya yangın kasası değildir.", 36, 61, 6.5, ASH, "Arial")
    folio(c, 4, "System", dark=True)
    c.showPage()


def product_page(c: canvas.Canvas, product: dict, page_no: int) -> None:
    image_left = page_no % 2 == 1
    side_w = 304
    image_w = PW - side_w
    text_dark = not image_left
    text_bg = BLACK if text_dark else IVORY
    text_color = white if text_dark else BLACK
    muted = PALE if text_dark else ASH
    line_color = HexColor("#393939") if text_dark else HAIRLINE

    c.setFillColor(text_bg)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    if image_left:
        image_cover(c, product["image"], 0, 0, image_w, PH, anchor=(0.5, 0.48), brightness=0.93)
        sx = image_w
    else:
        sx = 0
        image_cover(c, product["image"], side_w, 0, image_w, PH, anchor=(0.5, 0.48), brightness=0.9)

    x = sx + 30
    inner_w = side_w - 60
    logo(c, sx + side_w - 82, PH - 60, 52, dark=text_dark)
    t(c, f"PRODUCT {product['index']} / {product['sku']}", x, 548, 6.7, BRONZE if not text_dark else SAND, "Arial-Bold")
    t(c, product["name"], x, 501, 35, text_color, "DIN")
    t(c, product["category"].upper(), x + 1, 480, 6.7, muted, "Arial-Bold")
    rule(c, x, 463, x + inner_w, 463, line_color, 0.65)
    para(c, product["tagline"], x, 433, inner_w, 13.8, 17, BRONZE if not text_dark else SAND, "Georgia-Italic", max_lines=2)
    para(c, product["description"], x, 380, inner_w, 8.7, 12.2, muted, "Arial", max_lines=5)

    t(c, "KEY /", x, 315, 6.7, BRONZE if not text_dark else SAND, "Arial-Bold")
    feature_y = 291
    for idx, feature in enumerate(product["features"][:4]):
        col, row = idx % 2, idx // 2
        fx = x + col * 124
        fy = feature_y - row * 43
        t(c, f"0{idx + 1}", fx, fy, 6.8, BRONZE if not text_dark else SAND, "DIN")
        para(c, feature, fx + 20, fy, 98, 7.1, 9.2, text_color, "Arial", max_lines=2)

    rule(c, x, 216, x + inner_w, 216, line_color, 0.65)
    specs = [
        ("SIZE", product["dimensions"]),
        ("HIDDEN", product["hidden"]),
        ("FINISH", product["colors"]),
        ("LEAD", product["lead"]),
    ]
    sy = 196
    for label_v, value in specs:
        t(c, label_v, x, sy, 6.2, BRONZE if not text_dark else SAND, "Arial-Bold")
        para(c, value, x + 54, sy, inner_w - 54, 7.2, 9.1, muted, "Arial", max_lines=2)
        sy -= 30

    rule(c, x, 75, x + inner_w, 75, line_color, 0.65)
    t(c, "RETAIL", x, 54, 6.2, muted, "Arial-Bold")
    t(c, money(product["price"]), x, 32, 16.5, text_color, "DIN")
    t(c, "PROJECT 10+", x + 132, 54, 6.2, muted, "Arial-Bold")
    tr(c, money(product["wholesale"]), x + inner_w, 32, 14, BRONZE if not text_dark else SAND, "DIN")
    c.showPage()


def hospitality_page(c: canvas.Canvas) -> None:
    c.setFillColor(BLACK)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    strip_h = 216
    image_cover(c, MOOD_OFFICE, 0, PH - strip_h, PW / 3, strip_h, anchor=(0.18, 0.5), brightness=0.82)
    image_cover(c, MOOD_VILLA, PW / 3, PH - strip_h, PW / 3, strip_h, anchor=(0.55, 0.5), brightness=0.82)
    image_cover(c, MOOD_LIVING, 2 * PW / 3, PH - strip_h, PW / 3, strip_h, anchor=(0.45, 0.5), brightness=0.82)
    t(c, "HOSPITALITY", 36, 317, 58, HexColor("#242424"), "DIN")
    section_kicker(c, "Otel & proje seçkisi", 40, 337, dark=True)
    t(c, "Doğru model, doğru oda.", 40, 280, 28, white, "Georgia")

    columns = [
        ("STANDARD ROOM", "NIGHT 01 / LITE", "Kompakt ölçü, iki çekmece ve kontrollü kişisel saklama."),
        ("PREMIUM ROOM", "CUBE / WALL 01", "İmza açılım hareketi veya duvar yüzeyine entegre çözüm."),
        ("EXECUTIVE SUITE", "AURA 01 / AURA 02", "Kablosuz şarj, Bluetooth ses, dokunmatik yüzey ve motorlu erişim."),
        ("OFFICE & RETAIL", "SLIDE / CUSTOM", "Yönetici alanı, showroom ve mimari nişler için yüzey uyarlaması."),
    ]
    base_x = 40
    col_w = 186
    for i, (title_v, models, body) in enumerate(columns):
        x = base_x + i * 198
        rule(c, x, 238, x + col_w, 238, BRONZE, 1.0)
        t(c, title_v, x, 216, 7.2, SAND, "Arial-Bold")
        t(c, models, x, 190, 12.5, white, "DIN")
        para(c, body, x, 163, col_w - 10, 7.8, 11, PALE, "Arial", max_lines=4)
    para(c, "Akıllı yüzeyli modellerde elektrik/priz planı; duvar modellerinde taşıyıcı yüzey ve montaj noktaları uygulama öncesi doğrulanır.", 40, 68, 590, 7, 10, ASH, "Arial")
    folio(c, 12, "Hospitality", dark=True)
    c.showPage()


def material_page(c: canvas.Canvas) -> None:
    c.setFillColor(IVORY)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    logo(c, PW - 110, PH - 67, 66)
    section_kicker(c, "Finishes / Custom Lab", 36, 535)
    t(c, "Yüzey bir seçenek değil,", 36, 480, 31, BLACK, "Georgia")
    t(c, "projenin parçasıdır.", 36, 442, 31, BRONZE, "Georgia-Italic")
    para(c, "Standart renkler fiziksel numune ile; özel ölçü ve yüzeyler teknik çizim/proforma onayıyla kesinleşir.", 36, 398, 500, 9.2, 13, ASH, "Arial")

    finishes = [
        ("01 / ANTRASİT", "#343536", white),
        ("02 / SİYAH", "#101112", white),
        ("03 / KIRIK BEYAZ", "#E6E0D5", BLACK),
        ("04 / KUM BEJİ", "#B5A48B", BLACK),
        ("05 / CEVİZ", "#8D6038", white),
        ("06 / SAFİR MEŞE", "#C3A677", BLACK),
    ]
    sw = (PW - 72) / 6
    for i, (name, color, text_color) in enumerate(finishes):
        x = 36 + i * sw
        c.setFillColor(HexColor(color))
        c.rect(x, 258, sw, 92, fill=1, stroke=0)
        t(c, name, x + 8, 272, 6.5, text_color, "Arial-Bold")

    steps = [
        ("01", "BRIEF", "Alan, adet, kullanım"),
        ("02", "SPEC", "Ölçü, yüzey, mekanizma"),
        ("03", "SAMPLE", "Numune ve teknik onay"),
        ("04", "BUILD", "Üretim ve kalite kontrol"),
        ("05", "DELIVER", "Sevk ve montaj planı"),
    ]
    rule(c, 36, 184, PW - 36, 184, HAIRLINE, 0.6)
    for i, (num, title_v, body) in enumerate(steps):
        x = 36 + i * 153
        t(c, num, x, 153, 18, BRONZE, "DIN")
        t(c, title_v, x + 32, 156, 7, BLACK, "Arial-Bold")
        para(c, body, x + 32, 137, 107, 7, 9.5, ASH, "Arial", max_lines=2)
    para(c, "Özel istek doğrultusunda hazırlanan ürünler, yürürlükteki cayma hakkı istisnalarına tabidir. Ekran ve baskı renkleri gerçek yüzeyden farklı görünebilir.", 36, 71, 620, 6.8, 9.5, ASH, "Arial")
    folio(c, 13, "Finishes")
    c.showPage()


def pricing_page(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    t(c, "TRADE / 2026", 464, 430, 62, HexColor("#E7E1D8"), "DIN")
    logo(c, PW - 107, PH - 64, 62)
    section_kicker(c, "Ticari fiyat eki", 36, 535)
    t(c, "Liste ve proje fiyatları.", 36, 483, 31, BLACK, "Georgia")
    para(c, "26 Ağustos 2026 itibarıyla KDV dahil tavsiye edilen fiyatlar.", 36, 448, 360, 8.5, 12, ASH, "Arial")

    x0, y0 = 36, 397
    cols = [36, 270, 405]
    value_rights = [641, 720, PW - 36]
    headers = ["MODEL", "SKU", "ÖLÇÜ"]
    rule(c, x0, y0 + 22, PW - 36, y0 + 22, BLACK, 1.0)
    for h, x in zip(headers, cols):
        t(c, h, x, y0, 6.5, BRONZE, "Arial-Bold")
    for h, x in zip(["PERAKENDE", "PROJE 10+", "TERMİN"], value_rights):
        tr(c, h, x, y0, 6.5, BRONZE, "Arial-Bold")
    y = y0 - 35
    for product in PRODUCTS:
        rule(c, 36, y + 23, PW - 36, y + 23, HAIRLINE, 0.45)
        t(c, product["name"], cols[0], y, 10.5, BLACK, "DIN")
        t(c, product["sku"], cols[1], y, 7.3, ASH, "Arial")
        t(c, product["dimensions"], cols[2], y, 7.1, ASH, "Arial")
        tr(c, money(product["price"]), value_rights[0], y, 8.5, BLACK, "Arial-Bold")
        tr(c, money(product["wholesale"]), value_rights[1], y, 8.5, BRONZE, "Arial-Bold")
        tr(c, product["lead"], value_rights[2], y, 7.1, ASH, "Arial")
        y -= 42

    rule(c, 36, 87, PW - 36, 87, BLACK, 1.0)
    tiers = [("1-4", "LISTE"), ("5-9", "-%10"), ("10-24", "-%15"), ("25-49", "-%20'YE KADAR"), ("50+", "ÖZEL TEKLİF")]
    for i, (qty, disc) in enumerate(tiers):
        x = 36 + i * 155
        t(c, qty, x, 61, 18, BRONZE, "DIN")
        t(c, disc, x + 44, 63, 6.8, BLACK, "Arial-Bold")
    para(c, "Sevkiyat, saha montajı, keşif, özel ambalaj ve özel ölçü/yüzey fiyatlara dahil değildir; proforma ile kesinleşir.", 36, 38, 620, 6.4, 8.5, ASH, "Arial")
    folio(c, 14, "Trade")
    c.showPage()


def terms_page(c: canvas.Canvas) -> None:
    c.setFillColor(BLACK)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    logo(c, PW - 107, PH - 64, 62, dark=True)
    section_kicker(c, "Commercial notes", 36, 535, dark=True)
    t(c, "Net süreç. Yazılı onay.", 36, 482, 31, white, "Georgia")
    t(c, "Kontrollü teslim.", 36, 445, 31, SAND, "Georgia-Italic")

    sections = [
        ("01 / ÖDEME", "Perakendede PayTR veya havale/EFT. Proje siparişinde önerilen plan: yüzde 50 sipariş avansı, yüzde 50 sevk öncesi; farklı plan yazılı teklifle belirlenir."),
        ("02 / TERMİN", "Stoklu modeller 3-12, ön sipariş modelleri 10-20 iş gününde sevke hazırlanır. Büyük adet ve özel üretimde proje takvimi ayrıca açılır."),
        ("03 / GARANTİ", "Mekanizma ve üretim kaynaklı kusurlara karşı teslimden itibaren 2 yıl. Kullanım hatası, darbe, sıvı teması ve yetkisiz müdahale kapsam dışı değerlendirilebilir."),
        ("04 / İADE", "Standart mesafeli satışlarda yürürlükteki tüketici mevzuatı uygulanır. Özel ölçü ve yüzeyler cayma hakkı istisnasına tabidir. B2B iadeleri sözleşmeye göre yönetilir."),
        ("05 / MONTAJ", "Duvar ürünlerinde taşıyıcı yüzey; akıllı yüzeyli modellerde priz ve elektrik planı uygulama öncesi doğrulanır. Kapsam teklifte ayrıca belirtilir."),
        ("06 / GÜVENLİK", "NFC kartlar yetkili kullanıcıya teslim edilir. Ürünler sertifikalı çelik kasa, yangın kasası veya otel kasası değildir; yüksek riskli değerler için uygun standartta kasa kullanılmalıdır."),
    ]
    col_w = 238
    for i, (title_v, body) in enumerate(sections):
        col, row = i % 3, i // 3
        x = 36 + col * 266
        y = 365 - row * 168
        rule(c, x, y + 25, x + col_w, y + 25, BRONZE, 0.85)
        t(c, title_v, x, y, 7.2, SAND, "Arial-Bold")
        para(c, body, x, y - 27, col_w, 8.2, 12, PALE, "Arial", max_lines=8)
    para(c, "Bu katalog teklif çerçevesidir; model, adet, yüzey, teslim yeri, ödeme planı ve yasal satıcı bilgileri proforma/sözleşme ile kesinleşir. Tüketici haklarını sınırlandırmaz.", 36, 55, 680, 6.8, 9.5, ASH, "Arial")
    folio(c, 15, "Terms", dark=True)
    c.showPage()


def back_page(c: canvas.Canvas) -> None:
    c.setFillColor(BLACK)
    c.rect(0, 0, PW, PH, fill=1, stroke=0)
    image_contain(c, DOOR_MARK, 48, 110, 220, 365)
    rule(c, 310, 80, 310, 515, HexColor("#303030"), 0.7)
    logo(c, 354, 428, 122, dark=True)
    t(c, "Görünmeyen güvenlik.", 354, 347, 26, white, "Georgia")
    t(c, "Şıklık dışarıda. Güvenlik içeride.", 354, 312, 12, SAND, "Georgia-Italic")

    c.setFillColor(white)
    c.rect(650, 354, 94, 94, fill=1, stroke=0)
    qr_code(c, "https://www.gizlihome.com.tr", 658, 362, 78)
    t(c, "gizlihome.com.tr", 354, 214, 8.5, PALE, "Arial-Bold")
    t(c, "+90 541 381 21 14", 354, 187, 16, white, "DIN")
    t(c, "@gizlihome", 354, 160, 8.5, PALE, "Arial")
    para(c, "Yenidoğan Mahallesi Hürriyet Caddesi No: 6/50, Merkez / Kırıkkale", 354, 122, 340, 7.5, 11, ASH, "Arial")
    t(c, "Ziyaret için randevu alınız.", 354, 76, 7.2, SAND, "Georgia-Italic")
    t(c, "© 2026 GİZLİ HOME", 700, 38, 6.5, ASH, "Arial")
    c.showPage()


def build() -> None:
    TMP.mkdir(parents=True, exist_ok=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    fonts()
    c = canvas.Canvas(str(OUT), pagesize=(PW, PH), pageCompression=1)
    c.setTitle("GİZLİ HOME 2026 Editorial Lookbook")
    c.setAuthor("GİZLİ HOME")
    c.setSubject("NOVA Collection - retail, project and wholesale catalog")
    cover_page(c)
    manifesto_page(c)
    index_page(c)
    system_page(c)
    for page_no, product in enumerate(PRODUCTS, start=5):
        product_page(c, product, page_no)
    hospitality_page(c)
    material_page(c)
    pricing_page(c)
    terms_page(c)
    back_page(c)
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
