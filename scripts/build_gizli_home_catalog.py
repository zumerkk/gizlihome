#!/usr/bin/env python3
"""Build the GIZLI HOME 2026 trade/retail catalog and branded product cards."""

from __future__ import annotations

import math
from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode import qr
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT_PDF = ROOT / "output" / "pdf" / "GIZLI_HOME_2026_Katalog.pdf"
OUT_CARDS = ROOT / "output" / "catalog-assets" / "branded-product-cards"
TMP = ROOT / "tmp" / "pdfs" / "gizli-home-catalog"

PAGE_W, PAGE_H = A4
INK = HexColor("#101011")
CHARCOAL = HexColor("#19191A")
PANEL = HexColor("#242426")
GOLD = HexColor("#C99549")
GOLD_LIGHT = HexColor("#E2BE7A")
PAPER = HexColor("#F3F0EA")
MUTED = HexColor("#716D67")
LINE = HexColor("#D8D1C6")
GREEN = HexColor("#56715B")

FONT_REG_PATH = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD_PATH = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_ITALIC_PATH = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"

LOGO_LIGHT = ROOT / "public" / "images" / "brand" / "gizli-home-logo-light.png"
LOGO_DARK = ROOT / "public" / "images" / "brand" / "gizli-home-logo-dark.png"
COVER_HERO = ROOT / "output" / "catalog-assets" / "cover-hero-v1.png"


PRODUCTS = [
    {
        "index": "01",
        "name": "NOVA CUBE",
        "sku": "GH-NC-01",
        "category": "Işıklı Gizli Bölmeli Komodin",
        "price": 10990,
        "wholesale": 9340,
        "dimensions": "50 G x 42 D x 58 Y cm",
        "hidden": "Yaklaşık 44 x 35 x 9 cm",
        "colors": "Antrasit / Siyah / Kırık Beyaz",
        "lead": "3-10 iş günü",
        "image": ROOT / "public" / "images" / "products" / "nova-cube-studio.png",
        "tagline": "Gizli katmanı yükselten imza form.",
        "description": "NFC kartla çalışan motor destekli üst modül, LED aydınlatmalı özel hacim ve iki geniş çekmeceyi tek bir sakin formda buluşturur.",
        "features": [
            "NFC kartlı kontrollü erişim",
            "Motor destekli yükselen üst modül",
            "LED aydınlatmalı gizli alan",
            "İki geniş çekmece",
            "2 yetkilendirilmiş kart",
            "Kurulu, kullanıma hazır teslim",
        ],
        "use": "Premium oda / yönetici süiti / villa",
    },
    {
        "index": "02",
        "name": "NOVA AURA 01",
        "sku": "GH-NA-01",
        "category": "Akıllı Gizli Bölmeli Komodin",
        "price": 15000,
        "wholesale": 12750,
        "dimensions": "48 G x 42 D x 62 Y cm",
        "hidden": "Yaklaşık 42 x 35 x 10 cm",
        "colors": "Ceviz & Antrasit / Antrasit / Kum Beji",
        "lead": "10-20 iş günü",
        "image": ROOT / "public" / "images" / "generated" / "product-nova-03-pulse-5.webp",
        "tagline": "Akıllı yüzey. Kontrollü erişim.",
        "description": "Kablosuz şarj, Bluetooth hoparlör, dokunmatik kontrol, çevresel LED ve NFC erişimli motorlu gizli bölüm aynı yüzeyde çalışır.",
        "features": [
            "NFC kartlı motorlu erişim",
            "Kablosuz telefon şarjı",
            "Entegre Bluetooth hoparlör",
            "Dokunmatik kontrol paneli",
            "Çevresel LED aydınlatma",
            "Geniş alt çekmece",
        ],
        "use": "Executive oda / akıllı süit / rezidans",
    },
    {
        "index": "03",
        "name": "NOVA AURA 02",
        "sku": "GH-NA-02",
        "category": "Akıllı Gizli Bölmeli Komodin",
        "price": 18000,
        "wholesale": 15300,
        "dimensions": "48 G x 42 D x 62 Y cm",
        "hidden": "Yaklaşık 42 x 35 x 10 cm",
        "colors": "Füme & Doğal Meşe / Antrasit & Ceviz / Siyah & Ceviz",
        "lead": "10-20 iş günü",
        "image": ROOT / "public" / "images" / "products" / "nova-aura-02-studio.webp",
        "tagline": "Cam yüzeyde sessiz teknoloji.",
        "description": "Füme cam akıllı yüzey, sıcak LED çerçeve, kablosuz şarj, Bluetooth ses ve motorlu gizli erişimi güçlü bir ceviz-antrasit mimariyle tamamlar.",
        "features": [
            "NFC kartlı motorlu üst modül",
            "Kablosuz telefon şarjı",
            "Entegre Bluetooth hoparlör",
            "Cam yüzeyde dokunmatik kontrol",
            "Sıcak çevresel LED ışık",
            "Ceviz ve antrasit premium yüzey",
        ],
        "use": "Signature süit / villa / premium mağaza",
    },
    {
        "index": "04",
        "name": "NOVA NIGHT 01",
        "sku": "GH-NN-01",
        "category": "Gizli Bölmeli Komodin",
        "price": 9990,
        "wholesale": 8490,
        "dimensions": "45 G x 40 D x 55 Y cm",
        "hidden": "Yaklaşık 39 x 33 x 8 cm",
        "colors": "Kırık Beyaz / Antrasit / Safir Meşe",
        "lead": "5-12 iş günü",
        "image": ROOT / "public" / "images" / "generated" / "product-nova-night-01-5.webp",
        "tagline": "Dışarıdan sade. İçeride size ait.",
        "description": "Klasik iki çekmeceli komodin formu içinde NFC kartla açılan, LED destekli ayrı bir kişisel saklama katmanı sunar.",
        "features": [
            "NFC kartlı üst gizli bölüm",
            "LED iç aydınlatma",
            "İki çekmeceli gövde",
            "Sessiz ray sistemi",
            "Düşük pil uyarısı",
            "Kurulu teslim",
        ],
        "use": "Standart oda / butik otel / konut",
    },
    {
        "index": "05",
        "name": "NOVA WALL 01",
        "sku": "GH-NW-01",
        "category": "Gizli Bölmeli Duvar Rafı",
        "price": 8490,
        "wholesale": 7220,
        "dimensions": "80 G x 25 D x 16 Y cm",
        "hidden": "Yaklaşık 72 x 20 x 8 cm",
        "colors": "Kırık Beyaz / Antrasit / Safir Meşe",
        "lead": "5-12 iş günü",
        "image": ROOT / "public" / "images" / "generated" / "product-nova-wall-01-5.webp",
        "tagline": "Duvar yüzeyinde görünmeyen alan.",
        "description": "Minimal duvar rafının içinde NFC erişimli, LED aydınlatmalı saklama hacmi bulunur. Gizli sabitleme, mimari yüzeyi temiz bırakır.",
        "features": [
            "NFC kartlı erişim",
            "LED aydınlatmalı iç hacim",
            "Gizli duvar sabitlemesi",
            "Sessiz kapak mekanizması",
            "Üç yüzey seçeneği",
            "Montaj kiti",
        ],
        "use": "Otel odası / ofis / mimari niş",
    },
    {
        "index": "06",
        "name": "NOVA LITE",
        "sku": "GH-NL-01",
        "category": "NFC'li Gizli Bölmeli Komodin",
        "price": 12490,
        "wholesale": 10620,
        "dimensions": "45 G x 40 D x 55 Y cm",
        "hidden": "Yaklaşık 39 x 33 x 9 cm",
        "colors": "Antrasit / Siyah / Kum Beji",
        "lead": "10-15 iş günü",
        "image": ROOT / "public" / "images" / "generated" / "product-nova-lite-5.webp",
        "tagline": "Kompakt hacimde katmanlı güvenlik.",
        "description": "Dar planlı odalar için tasarlanan kompakt gövde; NFC erişimli üst hacim, LED aydınlatma ve günlük kullanım çekmecelerini bir araya getirir.",
        "features": [
            "NFC kartlı gizli üst hacim",
            "Katmanlı LED aydınlatma",
            "Kompakt gövde",
            "Sessiz çekmece rayı",
            "Düşük pil uyarısı",
            "Kurulu teslim",
        ],
        "use": "Kompakt oda / apart / mağaza projesi",
    },
    {
        "index": "07",
        "name": "NOVA SLIDE",
        "sku": "GH-NS-01",
        "category": "Sürgü Kapaklı Gizli Modül",
        "price": 13490,
        "wholesale": 11470,
        "dimensions": "60 G x 35 D x 45 Y cm",
        "hidden": "İki katmanlı, bölünebilir iç hacim",
        "colors": "Ceviz & Antrasit / Safir Meşe & Antrasit",
        "lead": "12-20 iş günü",
        "image": ROOT / "public" / "images" / "products" / "nova-slide-studio.png",
        "tagline": "Ceviz doku. Asimetrik saklama mimarisi.",
        "description": "Duvara asılı gövde; çıtalı ceviz kapak, mat antrasit sürgü panel ve iki seviyeli iç hacimle mobilyayı heykelsi bir duvar öğesine dönüştürür.",
        "features": [
            "Duvara asılı yalın form",
            "Antrasit sürgü panel",
            "Çıtalı ceviz kapak",
            "Katmanlı iç raflar",
            "Gizli sabitleme sistemi",
            "Özel yüzey seçeneği",
        ],
        "use": "Yönetici ofisi / mağaza / villa",
    },
]


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Arial", FONT_REG_PATH))
    pdfmetrics.registerFont(TTFont("Arial-Bold", FONT_BOLD_PATH))
    pdfmetrics.registerFont(TTFont("Arial-Italic", FONT_ITALIC_PATH))


def money(value: int) -> str:
    return f"{value:,.0f}".replace(",", ".") + " TL"


def ensure_dirs() -> None:
    OUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    OUT_CARDS.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)


def pil_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD_PATH if bold else FONT_REG_PATH, size=size)


def prepare_logo(path: Path, target_w: int) -> Image.Image:
    logo = Image.open(path).convert("RGBA")
    bbox = logo.getbbox()
    if bbox:
        logo = logo.crop(bbox)
    ratio = target_w / logo.width
    return logo.resize((target_w, max(1, int(logo.height * ratio))), Image.Resampling.LANCZOS)


def darken(image: Image.Image, factor: float = 0.72) -> Image.Image:
    return ImageEnhance.Brightness(image.convert("RGB")).enhance(factor)


def make_branded_cards() -> dict[str, Path]:
    cards: dict[str, Path] = {}
    logo = prepare_logo(LOGO_LIGHT, 270)
    for product in PRODUCTS:
        canvas_img = Image.new("RGB", (1600, 2000), "#0E0E0F")
        product_img = Image.open(product["image"]).convert("RGB")
        product_img = ImageOps.fit(product_img, (1600, 2000), method=Image.Resampling.LANCZOS, centering=(0.5, 0.48))
        product_img = ImageEnhance.Contrast(product_img).enhance(1.03)
        canvas_img.paste(product_img, (0, 0))

        overlay = Image.new("RGBA", canvas_img.size, (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        for y in range(0, 520):
            alpha = int(190 * (1 - y / 520) ** 1.35)
            od.line((0, y, 1600, y), fill=(5, 5, 6, alpha))
        for y in range(1370, 2000):
            alpha = int(225 * ((y - 1370) / 630) ** 0.82)
            od.line((0, y, 1600, y), fill=(5, 5, 6, alpha))
        canvas_img = Image.alpha_composite(canvas_img.convert("RGBA"), overlay)
        canvas_img.alpha_composite(logo, (90, 78))

        draw = ImageDraw.Draw(canvas_img)
        draw.text((90, 1515), product["index"], font=pil_font(30, True), fill="#D7A654")
        draw.text((90, 1580), product["name"], font=pil_font(92, True), fill="white")
        draw.text((94, 1700), product["category"], font=pil_font(31), fill="#DED9D0")
        draw.line((92, 1778, 1508, 1778), fill="#B88642", width=2)
        draw.text((92, 1820), product["sku"], font=pil_font(28, True), fill="#D7A654")
        price_text = money(product["price"])
        price_bbox = draw.textbbox((0, 0), price_text, font=pil_font(38, True))
        draw.text((1508 - (price_bbox[2] - price_bbox[0]), 1810), price_text, font=pil_font(38, True), fill="white")
        draw.text((92, 1900), "gizlihome.com.tr  |  +90 541 381 21 14", font=pil_font(24), fill="#D0C9BE")

        out = OUT_CARDS / f"{product['sku']}-{product['name'].lower().replace(' ', '-')}.png"
        canvas_img.convert("RGB").save(out, quality=95, optimize=True)
        cards[product["sku"]] = out
    return cards


def draw_image_cover(c: canvas.Canvas, path: Path, x: float, y: float, w: float, h: float, dark: float = 1.0) -> None:
    image = Image.open(path).convert("RGB")
    target_ratio = w / h
    source_ratio = image.width / image.height
    if source_ratio > target_ratio:
        crop_w = int(image.height * target_ratio)
        left = (image.width - crop_w) // 2
        image = image.crop((left, 0, left + crop_w, image.height))
    else:
        crop_h = int(image.width / target_ratio)
        top = (image.height - crop_h) // 2
        image = image.crop((0, top, image.width, top + crop_h))
    if dark != 1.0:
        image = ImageEnhance.Brightness(image).enhance(dark)
    key = f"{path.stem}-{int(x)}-{int(y)}-{int(w)}-{int(h)}-{dark:.2f}.jpg"
    prepared = TMP / key
    image.save(prepared, quality=91, optimize=True)
    c.drawImage(ImageReader(prepared), x, y, w, h, mask="auto")


def draw_image_contain(c: canvas.Canvas, path: Path, x: float, y: float, w: float, h: float) -> None:
    image = Image.open(path)
    iw, ih = image.size
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(ImageReader(path), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, mask="auto")


def text(c: canvas.Canvas, value: str, x: float, y: float, size: float, color=INK, font: str = "Arial") -> None:
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, value)


def text_right(c: canvas.Canvas, value: str, x: float, y: float, size: float, color=INK, font: str = "Arial") -> None:
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawRightString(x, y, value)


def paragraph(c: canvas.Canvas, value: str, x: float, y: float, w: float, size: float = 10.5, leading: float = 14, color=INK, font: str = "Arial", max_lines: int | None = None) -> float:
    words = value.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
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
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def label(c: canvas.Canvas, value: str, x: float, y: float, fill=GOLD, text_color=INK) -> None:
    c.setFont("Arial-Bold", 7.5)
    width = pdfmetrics.stringWidth(value.upper(), "Arial-Bold", 7.5) + 14
    c.setFillColor(fill)
    c.roundRect(x, y - 2, width, 17, 3, fill=1, stroke=0)
    c.setFillColor(text_color)
    c.drawString(x + 7, y + 3, value.upper())


def line(c: canvas.Canvas, x1: float, y1: float, x2: float, y2: float, color=LINE, width: float = 0.6) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y1, x2, y2)


def footer(c: canvas.Canvas, page_no: int, dark: bool = False) -> None:
    color = HexColor("#BCB6AB") if dark else MUTED
    text(c, "GİZLİ HOME  |  2026 KATALOG", 36, 24, 7.5, color, "Arial-Bold")
    text_right(c, f"{page_no:02d}", PAGE_W - 36, 24, 8, GOLD, "Arial-Bold")


def header_logo(c: canvas.Canvas, dark: bool = False, w: float = 62) -> None:
    logo = LOGO_LIGHT if dark else LOGO_DARK
    draw_image_contain(c, logo, PAGE_W - 36 - w, PAGE_H - 55, w, 31)


def draw_qr(c: canvas.Canvas, value: str, x: float, y: float, size: float, fill=INK) -> None:
    widget = qr.QrCodeWidget(value)
    bounds = widget.getBounds()
    width = bounds[2] - bounds[0]
    height = bounds[3] - bounds[1]
    from reportlab.graphics.shapes import Drawing

    drawing = Drawing(size, size, transform=[size / width, 0, 0, size / height, 0, 0])
    widget.barFillColor = fill
    drawing.add(widget)
    renderPDF.draw(drawing, c, x, y)


def cover_page(c: canvas.Canvas) -> None:
    draw_image_cover(c, COVER_HERO, 0, 0, PAGE_W, PAGE_H, dark=0.84)
    c.setFillColor(Color(0, 0, 0, alpha=0.38))
    c.rect(0, PAGE_H - 240, PAGE_W, 240, fill=1, stroke=0)
    draw_image_contain(c, LOGO_LIGHT, 36, PAGE_H - 100, 112, 66)
    label(c, "2026 Koleksiyonu", 36, PAGE_H - 138, GOLD, INK)
    text(c, "Görünmeyen", 36, PAGE_H - 185, 34, white, "Arial-Bold")
    text(c, "güvenlik.", 36, PAGE_H - 223, 34, GOLD_LIGHT, "Arial-Bold")
    paragraph(c, "Akıllı gizli bölmeli mobilyalar | Perakende, proje ve toptan satış kataloğu", 36, 76, 360, 11, 15, white, "Arial")
    text(c, "gizlihome.com.tr", 36, 44, 9, GOLD_LIGHT, "Arial-Bold")
    c.showPage()


def brand_page(c: canvas.Canvas, page_no: int) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    header_logo(c)
    label(c, "Marka yaklaşımı", 36, PAGE_H - 70)
    text(c, "Mobilyanın görünmeyen", 36, PAGE_H - 126, 28, INK, "Arial-Bold")
    text(c, "tarafına tasarım ekliyoruz.", 36, PAGE_H - 159, 28, GOLD, "Arial-Bold")
    paragraph(c, "GİZLİ HOME; güvenlik fikrini evin, otelin ve çalışma alanının estetiğine zarar vermeden mobilyanın içine yerleştirir. Odak; kontrollü erişim, sakin yüzey dili ve projeye uyarlanabilen gerçek mekanizmadır.", 36, PAGE_H - 205, 520, 11.2, 16, MUTED)

    stats = [("7", "İmza model"), ("2 YIL", "Ürün garantisi"), ("3-20 GÜN", "Model bazlı termin"), ("TÜRKİYE", "Geneli sevkiyat")]
    y = PAGE_H - 325
    box_w = 123
    for i, (big, small) in enumerate(stats):
        x = 36 + i * (box_w + 9)
        c.setFillColor(white)
        c.roundRect(x, y, box_w, 82, 6, fill=1, stroke=0)
        text(c, big, x + 12, y + 45, 16, GOLD, "Arial-Bold")
        paragraph(c, small, x + 12, y + 24, box_w - 24, 8.5, 11, MUTED, "Arial")

    c.setFillColor(INK)
    c.roundRect(36, 115, 523, 285, 8, fill=1, stroke=0)
    label(c, "Konumlandırma", 58, 365, GOLD, INK)
    text(c, "Ulaşılabilir premium.", 58, 324, 22, white, "Arial-Bold")
    paragraph(c, "Pazardaki temel NFC komodinlerin üzerine; motorlu açılım, akıllı cam yüzey, ışık, ses ve mimari uyarlama değeri ekleyen bir ürün ailesi.", 58, 296, 280, 10.5, 15, HexColor("#D1CCC3"))
    benefits = [
        "Gerçek ürün ve mekanizma videosu",
        "Kurulu ve kullanıma hazır teslim",
        "Otel, mağaza, ofis ve villa projelerine uyarlama",
        "NFC kart, yüzey ve ölçü seçenekleri",
    ]
    yy = 228
    for benefit in benefits:
        c.setFillColor(GOLD)
        c.circle(62, yy + 3, 2.4, fill=1, stroke=0)
        paragraph(c, benefit, 73, yy, 290, 9.5, 13, white, "Arial")
        yy -= 35
    c.setFillColor(white)
    c.roundRect(414, 184, 112, 112, 5, fill=1, stroke=0)
    draw_qr(c, "https://www.gizlihome.com.tr", 424, 194, 92, fill=INK)
    text(c, "KOLEKSİYONU", 414, 170, 8, GOLD, "Arial-Bold")
    text(c, "İNCELEYİN", 430, 158, 8, white, "Arial-Bold")
    footer(c, page_no)
    c.showPage()


def collection_page(c: canvas.Canvas, page_no: int, cards: dict[str, Path]) -> None:
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    header_logo(c, dark=True)
    label(c, "Koleksiyon", 36, PAGE_H - 70, GOLD, INK)
    text(c, "Yedi form. Tek marka dili.", 36, PAGE_H - 123, 27, white, "Arial-Bold")
    paragraph(c, "Kompakt odadan signature süite, duvar rafından yönetici ofisine uzanan NOVA ailesi.", 36, PAGE_H - 153, 480, 10.5, 15, HexColor("#C9C3B9"))

    thumb_w, thumb_h = 160, 188
    gap_x, gap_y = 18, 20
    start_y = 455
    for idx, product in enumerate(PRODUCTS):
        row, col = divmod(idx, 3)
        if row == 2:
            x = 126 + col * (thumb_w + gap_x)
        else:
            x = 36 + col * (thumb_w + gap_x)
        y = start_y - row * (thumb_h + gap_y)
        c.setFillColor(PANEL)
        c.roundRect(x, y, thumb_w, thumb_h, 7, fill=1, stroke=0)
        draw_image_cover(c, cards[product["sku"]], x, y + 52, thumb_w, thumb_h - 52)
        text(c, product["index"], x + 10, y + 34, 7.5, GOLD, "Arial-Bold")
        text(c, product["name"], x + 10, y + 19, 9.5, white, "Arial-Bold")
        text(c, money(product["price"]), x + 10, y + 7, 7.2, HexColor("#C7C0B5"), "Arial")
    footer(c, page_no, dark=True)
    c.showPage()


def technology_page(c: canvas.Canvas, page_no: int) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    header_logo(c)
    label(c, "Sistem", 36, PAGE_H - 70)
    text(c, "Sadece size açılır.", 36, PAGE_H - 122, 28, INK, "Arial-Bold")
    text(c, "Mobilya gibi görünür.", 36, PAGE_H - 154, 28, GOLD, "Arial-Bold")

    steps = [
        ("01", "Kartı yaklaştırın", "Yetkilendirilmiş NFC kart erişimi başlatır."),
        ("02", "Mekanizma çalışsın", "Modeline göre kilit veya motorlu modül devreye girer."),
        ("03", "Bölme açılsın", "Gizli alan aydınlatmalı ve düzenli bir hacim sunar."),
        ("04", "Tekrar gizlensin", "Mobilya formu kapanınca dış görünüm korunur."),
    ]
    yy = PAGE_H - 292
    for num, title_v, desc in steps:
        c.setFillColor(white)
        c.roundRect(36, yy, 252, 84, 6, fill=1, stroke=0)
        c.setFillColor(GOLD)
        c.roundRect(49, yy + 18, 42, 48, 4, fill=1, stroke=0)
        text(c, num, 60, yy + 36, 12, INK, "Arial-Bold")
        text(c, title_v, 105, yy + 51, 11, INK, "Arial-Bold")
        paragraph(c, desc, 105, yy + 33, 165, 8.2, 11, MUTED)
        yy -= 100

    c.setFillColor(INK)
    c.roundRect(310, PAGE_H - 614, 249, 436, 7, fill=1, stroke=0)
    text(c, "ÖZELLİK MATRİSİ", 328, PAGE_H - 207, 8, GOLD, "Arial-Bold")
    features = [
        ("NFC erişim", [1, 1, 1, 1, 1, 1, 0]),
        ("LED aydınlatma", [1, 1, 1, 1, 1, 1, 0]),
        ("Motorlu açılım", [1, 1, 1, 0, 0, 0, 0]),
        ("Kablosuz şarj", [0, 1, 1, 0, 0, 0, 0]),
        ("Bluetooth ses", [0, 1, 1, 0, 0, 0, 0]),
        ("Duvar montajı", [0, 0, 0, 0, 1, 0, 1]),
    ]
    short_names = ["CU", "A1", "A2", "NI", "WA", "LI", "SL"]
    x0 = 328
    text(c, "MODEL", x0, PAGE_H - 242, 7.5, HexColor("#AFA89D"), "Arial-Bold")
    for i, name in enumerate(short_names):
        text(c, name, x0 + 93 + i * 20, PAGE_H - 242, 7, GOLD_LIGHT, "Arial-Bold")
    y = PAGE_H - 276
    for fname, flags in features:
        text(c, fname, x0, y, 7.5, white, "Arial")
        for i, flag in enumerate(flags):
            c.setFillColor(GOLD if flag else HexColor("#4A4845"))
            c.circle(x0 + 101 + i * 20, y + 2, 3.2, fill=1, stroke=0)
        line(c, x0, y - 12, 541, y - 12, HexColor("#343336"), 0.4)
        y -= 41

    text(c, "GÜVENLİK NOTU", 328, 294, 8, GOLD, "Arial-Bold")
    paragraph(c, "NFC erişim görünür ve izinsiz erişimi sınırlar. Ürünler sertifikalı çelik kasa, yangın kasası veya otel kasası değildir; yüksek riskli değerler için ilgili standarda sahip kasa kullanılmalıdır.", 328, 273, 208, 8.6, 12, HexColor("#D6D0C7"))
    footer(c, page_no)
    c.showPage()


def product_page(c: canvas.Canvas, product: dict, page_no: int, card_path: Path) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    header_logo(c)
    text(c, product["index"], 36, PAGE_H - 65, 9, GOLD, "Arial-Bold")
    text(c, product["name"], 36, PAGE_H - 110, 30, INK, "Arial-Bold")
    text(c, product["category"].upper(), 38, PAGE_H - 134, 8, MUTED, "Arial-Bold")

    image_x, image_y, image_w, image_h = 36, 268, 330, 404
    c.setFillColor(INK)
    c.roundRect(image_x, image_y, image_w, image_h, 8, fill=1, stroke=0)
    draw_image_cover(c, card_path, image_x, image_y, image_w, image_h)

    right_x = 388
    label(c, product["sku"], right_x, 645, GOLD, INK)
    paragraph(c, product["tagline"], right_x, 606, 171, 15, 18, INK, "Arial-Bold")
    paragraph(c, product["description"], right_x, 548, 171, 9.5, 13.5, MUTED, "Arial")

    c.setFillColor(INK)
    c.roundRect(right_x, 393, 171, 91, 6, fill=1, stroke=0)
    text(c, "PERAKENDE", right_x + 13, 460, 7.2, GOLD, "Arial-Bold")
    text(c, money(product["price"]), right_x + 13, 436, 17, white, "Arial-Bold")
    text(c, "10+ ADET PROJE", right_x + 13, 416, 7.2, GOLD, "Arial-Bold")
    text(c, money(product["wholesale"]), right_x + 13, 399, 11, HexColor("#D7D1C8"), "Arial-Bold")

    specs = [
        ("DIŞ ÖLÇÜ", product["dimensions"]),
        ("GİZLİ HACİM", product["hidden"]),
        ("RENKLER", product["colors"]),
        ("TERMİN", product["lead"]),
        ("ÖNERİLEN", product["use"]),
    ]
    sy = 367
    for spec_label, spec_value in specs:
        text(c, spec_label, right_x, sy, 6.7, GOLD, "Arial-Bold")
        sy = paragraph(c, spec_value, right_x, sy - 12, 171, 8.3, 10.5, INK, "Arial") - 10

    c.setFillColor(INK)
    c.roundRect(36, 45, 523, 145, 8, fill=1, stroke=0)
    text(c, "ÖNE ÇIKANLAR", 57, 166, 8, GOLD, "Arial-Bold")
    for idx, feature in enumerate(product["features"]):
        col = idx % 2
        row = idx // 2
        x = 57 + col * 247
        y = 137 - row * 36
        c.setFillColor(GOLD)
        c.circle(x + 3, y + 3, 2.2, fill=1, stroke=0)
        paragraph(c, feature, x + 13, y, 215, 8.8, 12, white, "Arial")
    text(c, "Fiyatlar KDV dahil tavsiye edilen liste fiyatıdır. Proje kapsamı ve yüzey seçimi teklif ile kesinleşir.", 57, 55, 6.7, HexColor("#AFA89D"), "Arial")
    footer(c, page_no)
    c.showPage()


def solutions_page(c: canvas.Canvas, page_no: int) -> None:
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    header_logo(c, dark=True)
    label(c, "Proje çözümleri", 36, PAGE_H - 70, GOLD, INK)
    text(c, "Otel, mağaza ve mimari", 36, PAGE_H - 122, 27, white, "Arial-Bold")
    text(c, "projeler için hazır.", 36, PAGE_H - 154, 27, GOLD_LIGHT, "Arial-Bold")
    paragraph(c, "Standart ürün tedarikinden ölçüye göre proje üretimine kadar tek temas noktası.", 36, PAGE_H - 188, 470, 10.5, 15, HexColor("#C9C3B9"))

    columns = [
        ("OTEL & KONAKLAMA", "NIGHT 01 ve LITE kompakt oda; CUBE premium oda; AURA serisi executive ve signature süit için.", ["Oda bazlı renk standardı", "Yedek NFC kart planı", "Toplu teslimat programı"]),
        ("MAĞAZA & SHOWROOM", "WALL 01 ve SLIDE; kontrollü saklama, danışma alanı ve premium ürün sunumu için mimari yüzeye entegre edilir.", ["Kurumsal yüzey seçimi", "Gizli sabitleme", "Numune üretim seçeneği"]),
        ("OFİS & VİLLA", "Belge, kişisel eşya ve günlük değerler için mobilya estetiğini bozmayan kontrollü saklama katmanları.", ["Ölçüye uyarlama", "Mekanizma seçimi", "İç hacim bölümlendirme"]),
    ]
    y = 495
    for title_v, desc, bullets in columns:
        c.setFillColor(PANEL)
        c.roundRect(36, y, 523, 142, 7, fill=1, stroke=0)
        text(c, title_v, 54, y + 112, 10, GOLD, "Arial-Bold")
        paragraph(c, desc, 54, y + 88, 280, 9.2, 13, white, "Arial")
        by = y + 92
        for bullet in bullets:
            c.setFillColor(GOLD)
            c.circle(372, by + 2, 2, fill=1, stroke=0)
            paragraph(c, bullet, 382, by, 150, 8.3, 11, HexColor("#D5CFC6"))
            by -= 28
        y -= 158

    c.setFillColor(GOLD)
    c.roundRect(36, 72, 523, 72, 6, fill=1, stroke=0)
    text(c, "PROJE NOTU", 54, 117, 8, INK, "Arial-Bold")
    paragraph(c, "Akıllı yüzeyli modellerde elektrik/priz planı; duvar modellerinde taşıyıcı yüzey ve montaj noktaları keşif veya uygulama çiziminde doğrulanır.", 54, 96, 476, 8.8, 12, INK, "Arial")
    footer(c, page_no, dark=True)
    c.showPage()


def custom_page(c: canvas.Canvas, page_no: int) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    header_logo(c)
    label(c, "Yüzey & özel üretim", 36, PAGE_H - 70)
    text(c, "Projeye uyarlanır.", 36, PAGE_H - 122, 29, INK, "Arial-Bold")
    text(c, "Marka dili korunur.", 36, PAGE_H - 155, 29, GOLD, "Arial-Bold")
    paragraph(c, "Ölçü, yüzey, mekanizma ve gizli hacim mimarisi; numune ve teknik onayla proje için özelleştirilebilir.", 36, PAGE_H - 190, 500, 10.5, 15, MUTED)

    finishes = [
        ("ANTRASİT", "#353638"),
        ("SİYAH", "#111214"),
        ("KIRIK BEYAZ", "#E8E4DA"),
        ("KUM BEJİ", "#B7A58B"),
        ("CEVİZ", "#8A5E37"),
        ("SAFİR MEŞE", "#C2A477"),
    ]
    x, y = 36, 535
    for idx, (name, color) in enumerate(finishes):
        col, row = idx % 3, idx // 3
        xx, yy = x + col * 174, y - row * 90
        c.setFillColor(HexColor(color))
        c.roundRect(xx, yy, 154, 58, 5, fill=1, stroke=0)
        border = white if name in {"SİYAH", "ANTRASİT", "CEVİZ"} else INK
        text(c, name, xx + 10, yy + 12, 8, border, "Arial-Bold")

    c.setFillColor(white)
    c.roundRect(36, 220, 523, 190, 8, fill=1, stroke=0)
    text(c, "PROJE AKIŞI", 57, 382, 8, GOLD, "Arial-Bold")
    process = [
        ("01", "İhtiyaç", "Adet, kullanım alanı ve hedef bütçe alınır."),
        ("02", "Teknik seçim", "Model, ölçü, yüzey ve mekanizma netleşir."),
        ("03", "Numune/onay", "Gerekli projelerde numune veya malzeme onayı yapılır."),
        ("04", "Üretim", "Termin planı sipariş ve proje kapsamına göre açılır."),
        ("05", "Sevk/montaj", "Paketleme, teslim ve kurulum sorumlulukları planlanır."),
    ]
    py = 350
    for num, title_v, desc in process:
        text(c, num, 57, py, 9, GOLD, "Arial-Bold")
        text(c, title_v, 91, py, 9, INK, "Arial-Bold")
        paragraph(c, desc, 177, py, 345, 8.3, 11, MUTED)
        py -= 31

    c.setFillColor(INK)
    c.roundRect(36, 62, 523, 128, 8, fill=1, stroke=0)
    text(c, "ÖZEL ÜRETİMDE NETLİK", 57, 164, 8, GOLD, "Arial-Bold")
    paragraph(c, "Standart katalog dışı ölçü ve yüzeyler teknik çizim/proforma onayı ile üretime girer. Özel istek doğrultusunda hazırlanan ürünlerde cayma hakkı mevzuattaki istisnalara tabidir; üretim öncesi kapsam yazılı olarak kesinleştirilir.", 57, 142, 470, 8.8, 12, white)
    paragraph(c, "Ekran ve baskı renkleri gerçek yüzeyden farklı görünebilir; proje siparişinde fiziksel numune onayı önerilir.", 57, 91, 470, 7.8, 10, HexColor("#BEB8AE"))
    footer(c, page_no)
    c.showPage()


def pricing_page(c: canvas.Canvas, page_no: int) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    header_logo(c)
    label(c, "Fiyat listesi", 36, PAGE_H - 70)
    text(c, "Perakende ve proje fiyatları.", 36, PAGE_H - 122, 28, INK, "Arial-Bold")
    paragraph(c, "26 Ağustos 2026 itibarıyla KDV dahil tavsiye edilen fiyatlar. 10+ adet proje fiyatı aynı model veya karma NOVA siparişinde uygulanır.", 36, PAGE_H - 158, 510, 9.8, 14, MUTED)

    table_x, table_y, table_w = 36, 602, 523
    c.setFillColor(INK)
    c.roundRect(table_x, table_y, table_w, 36, 5, fill=1, stroke=0)
    headers = [("MODEL", 48), ("SKU", 255), ("PERAKENDE", 346), ("10+ ADET", 464)]
    for h, x in headers:
        text(c, h, x, table_y + 13, 7.5, GOLD, "Arial-Bold")
    y = table_y - 35
    for idx, product in enumerate(PRODUCTS):
        c.setFillColor(white if idx % 2 == 0 else HexColor("#EBE6DD"))
        c.rect(table_x, y, table_w, 35, fill=1, stroke=0)
        text(c, product["name"], 48, y + 13, 8.5, INK, "Arial-Bold")
        text(c, product["sku"], 255, y + 13, 8, MUTED, "Arial")
        text_right(c, money(product["price"]), 430, y + 13, 8.5, INK, "Arial-Bold")
        text_right(c, money(product["wholesale"]), 548, y + 13, 8.5, GOLD, "Arial-Bold")
        y -= 35

    text(c, "ADET İSKONTO MİMARİSİ", 36, 297, 8, GOLD, "Arial-Bold")
    tiers = [
        ("1-4", "Liste fiyatı", "Perakende / numune"),
        ("5-9", "%10 iskonto", "Karma sipariş uygun"),
        ("10-24", "%15 iskonto", "Tablodaki proje fiyatı"),
        ("25-49", "%20'ye kadar", "Proje ve termin onayı"),
        ("50+", "Özel teklif", "Sözleşme ve üretim planı"),
    ]
    ty = 253
    for idx, (qty, discount, note) in enumerate(tiers):
        x = 36 + idx * 105
        c.setFillColor(INK if idx == 2 else white)
        c.roundRect(x, 147, 94, 98, 5, fill=1, stroke=0)
        text(c, qty, x + 11, 218, 13, GOLD, "Arial-Bold")
        text(c, discount, x + 11, 194, 8.2, white if idx == 2 else INK, "Arial-Bold")
        paragraph(c, note, x + 11, 175, 72, 7.2, 9, HexColor("#C5BFB5") if idx == 2 else MUTED)
    paragraph(c, "Fiyatlara sevkiyat, saha montajı, keşif, özel ambalaj, özel ölçü/yüzey ve elektrik altyapı işleri dahil değildir. Nihai fiyat ve vergi kırılımı proforma faturada kesinleşir.", 36, 112, 520, 8.2, 11, MUTED)
    footer(c, page_no)
    c.showPage()


def terms_page(c: canvas.Canvas, page_no: int) -> None:
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    header_logo(c, dark=True)
    label(c, "Ticari koşullar", 36, PAGE_H - 70, GOLD, INK)
    text(c, "Siparişten teslimata net süreç.", 36, PAGE_H - 122, 27, white, "Arial-Bold")
    paragraph(c, "Katalog bir teklif çerçevesidir; model, adet, yüzey, teslim yeri ve ödeme planı proforma/sözleşme ile kesinleşir.", 36, PAGE_H - 158, 500, 10, 14, HexColor("#C8C2B8"))

    sections = [
        ("ÖDEME", "Perakende siparişlerde PayTR kartlı ödeme veya havale/EFT. Proje siparişlerinde önerilen plan: %50 sipariş avansı, %50 sevk öncesi; farklı plan yazılı teklif ile belirlenir."),
        ("TERMİN & TESLİM", "Stoklu modeller 3-12, ön sipariş modelleri 10-20 iş gününde sevke hazırlanır. Büyük adetli ve özel üretim projelerinde üretim takvimi ayrıca paylaşılır. Taşıma ve montaj kapsamı teklifte belirtilir."),
        ("GARANTİ", "Mekanizma ve üretim kaynaklı kusurlara karşı teslim tarihinden itibaren 2 yıl garanti. Kullanım hatası, darbe, sıvı teması, yetkisiz müdahale ve uygun olmayan duvar/elektrik altyapısı garanti dışı değerlendirilebilir."),
        ("CAYMA & İADE", "Standart ürünlerin mesafeli satışında yürürlükteki tüketici mevzuatı uygulanır. Tüketicinin isteği veya kişisel ihtiyacı doğrultusunda hazırlanan özel ölçü/yüzey ürünler cayma hakkı istisnasına tabidir. B2B iadeleri sözleşmeye göre yönetilir."),
        ("GÜVENLİ KULLANIM", "NFC kartlar yetkili kullanıcıya teslim edilir; kayıp kartta yeniden yetkilendirme yapılmalıdır. Ürünler sertifikalı çelik kasa değildir. Duvara monte ürünlerde taşıyıcı yüzey ve bağlantı ekipmanı uygulama öncesi doğrulanır."),
    ]
    y = 620
    for title_v, body in sections:
        c.setFillColor(PANEL)
        c.roundRect(36, y, 523, 94, 6, fill=1, stroke=0)
        text(c, title_v, 54, y + 66, 8.5, GOLD, "Arial-Bold")
        paragraph(c, body, 54, y + 45, 472, 8.4, 11.5, white, "Arial")
        y -= 108

    text(c, "YASAL NOT", 36, 62, 7.2, GOLD, "Arial-Bold")
    paragraph(c, "Bu sayfa genel bilgilendirme niteliğindedir; tüketici haklarını sınırlandırmaz. Sipariş tarihindeki sözleşme, mevzuat ve garanti belgesi esas alınır.", 101, 62, 430, 7.2, 9.5, HexColor("#BFB8AE"))
    footer(c, page_no, dark=True)
    c.showPage()


def back_page(c: canvas.Canvas) -> None:
    c.setFillColor(INK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_image_contain(c, LOGO_LIGHT, 171, 594, 252, 150)
    text(c, "Görünmeyen güvenlik.", 151, 548, 25, white, "Arial-Bold")
    text(c, "Şıklık dışarıda. Güvenlik içeride.", 140, 516, 15, GOLD_LIGHT, "Arial-Bold")

    c.setFillColor(white)
    c.roundRect(108, 302, 124, 124, 6, fill=1, stroke=0)
    c.roundRect(362, 302, 124, 124, 6, fill=1, stroke=0)
    draw_qr(c, "https://www.gizlihome.com.tr", 116, 310, 108, fill=INK)
    draw_qr(c, "https://wa.me/905413812114", 370, 310, 108, fill=INK)
    text(c, "WEB SİTESİ", 134, 288, 8, GOLD, "Arial-Bold")
    text(c, "WHATSAPP", 391, 288, 8, GOLD, "Arial-Bold")

    text(c, "+90 541 381 21 14", 205, 224, 16, white, "Arial-Bold")
    text(c, "@gizlihome  |  gizlihome.com.tr", 191, 195, 10, HexColor("#D2CCC2"), "Arial")
    paragraph(c, "Yenidoğan Mahallesi Hürriyet Caddesi No: 6/50, Merkez / Kırıkkale", 126, 154, 345, 9, 13, HexColor("#BEB8AE"), "Arial")
    text(c, "Ziyaret için randevu alınız.", 220, 112, 8, GOLD_LIGHT, "Arial-Italic")
    text(c, "© 2026 GİZLİ HOME. Tüm hakları saklıdır.", 189, 36, 7.5, HexColor("#8E8982"), "Arial")
    c.showPage()


def build_pdf(cards: dict[str, Path]) -> None:
    c = canvas.Canvas(str(OUT_PDF), pagesize=A4, pageCompression=1)
    c.setTitle("GİZLİ HOME 2026 Katalog")
    c.setAuthor("GİZLİ HOME")
    c.setSubject("Akıllı gizli bölmeli mobilyalar - perakende, proje ve toptan satış")
    cover_page(c)
    brand_page(c, 2)
    collection_page(c, 3, cards)
    technology_page(c, 4)
    for offset, product in enumerate(PRODUCTS, start=5):
        product_page(c, product, offset, cards[product["sku"]])
    solutions_page(c, 12)
    custom_page(c, 13)
    pricing_page(c, 14)
    terms_page(c, 15)
    back_page(c)
    c.save()


def main() -> None:
    ensure_dirs()
    register_fonts()
    if not COVER_HERO.exists():
        raise FileNotFoundError(f"Cover hero not found: {COVER_HERO}")
    cards = make_branded_cards()
    build_pdf(cards)
    print(OUT_PDF)
    print(f"cards={len(cards)}")


if __name__ == "__main__":
    main()
