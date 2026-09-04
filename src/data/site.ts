function normalizeSiteUrl(value?: string) {
  const fallback = "https://www.gizlihome.com.tr";
  const raw = (value || fallback).replace(/\/$/, "");

  if (raw === "https://gizlihome.com.tr" || raw === "http://gizlihome.com.tr") {
    return fallback;
  }

  return raw.replace(/^http:\/\//, "https://");
}

export const brand = {
  name: "GİZLİ HOME",
  slogan: "Görünmeyen Güvenlik.",
  subSlogan: "Şıklık dışarıda. Güvenlik içeride.",
  instagram: "@gizlihome",
  instagramUrl: "https://www.instagram.com/gizlihome",
  shopierUrl:
    process.env.NEXT_PUBLIC_SHOPIER_STORE_URL || "https://www.shopier.com/gizlihome",
  whatsappDisplay: "+90 541 381 21 14",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905413812114",
  whatsappBaseUrl: "https://wa.me/905413812114",
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  address: "Yenidoğan Mahallesi Hürriyet Caddesi 6/50",
  addressLocality: "Yenidoğan",
  addressRegion: "Türkiye",
  workingHours: "Pazartesi - Cumartesi, 10:00 - 19:00",
};

export const seoKeywords = [
  "gizli dolap",
  "gizli mobilya",
  "şifreli dolap",
  "şifreli mobilya",
  "gizli çekmece",
  "gizli mekanizma",
  "gizli bölmeli mobilya",
  "gizli bölmeli komodin",
  "gizli bölmeli raf",
  "gizli saklama alanı",
  "nfc kartlı komodin",
  "nfc kartlı mobilya",
  "kartlı kilitli mobilya",
  "akıllı mobilya",
  "güvenlik mobilyası",
  "özel üretim mobilya",
  "villa mobilyası",
  "değerli eşya saklama mobilyası",
  "gizli bölmeli yatak odası mobilyası",
  "led aydınlatmalı gizli komodin",
];

export const businessInfo = {
  delivery:
    "Ürünler güvenli ambalajla, kurulu ve kullanıma hazır gönderilir. Stoklu modeller 3–12; ön sipariş modelleri 10–20 iş gününde kargoya hazırlanır.",
  payment:
    "Kartlı ödemeler geçici olarak Shopier güvenli ödeme sayfasında tamamlanır. Kart verileri GİZLİ HOME sunucularında tutulmaz. Havale/EFT için satış ekibimizden bilgi alabilirsiniz.",
  warranty:
    "Standart ürünler, mekanizma ve üretim kaynaklı sorunlara karşı 2 yıl garantilidir.",
  leadTime:
    "Stoklu ürünlerde teslimat planı WhatsApp görüşmesinde paylaşılır. Özel üretimlerde süre ölçü, renk ve mekanizma seçimine göre değişir.",
  legalPaymentNotice:
    "Kartlı ödemeler, yeni sanal POS entegrasyonu tamamlanana kadar Shopier güvenli ödeme altyapısıyla işlenir.",
};

export const navigation = [
  { label: "Ürünler", href: "/urunler" },
  { label: "Nasıl Çalışır?", href: "/nasil-calisir" },
  { label: "Özel Üretim", href: "/ozel-uretim" },
  { label: "Proje Çözümleri", href: "/proje-cozumleri" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Sipariş Takip", href: "/siparis/takip" },
];

export const legalLinks = [
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  {
    label: "Ödeme ve Teslimat Bilgilendirme",
    href: "/mesafeli-satis-odeme-teslimat",
  },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
];
