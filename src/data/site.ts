export const brand = {
  name: "GİZLİ HOME",
  slogan: "Görünmeyen Güvenlik.",
  subSlogan: "Şıklık dışarıda. Güvenlik içeride.",
  instagram: "@gizlihome",
  instagramUrl: "https://www.instagram.com/gizlihome",
  whatsappDisplay: "+90 541 381 21 14",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905413812114",
  whatsappBaseUrl: "https://wa.me/905413812114",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gizlihome.com.tr",
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
    "Ürünlerimiz özenle paketlenir ve kullanıma hazır şekilde gönderilir. Teslimat süresi bulunduğunuz konuma ve stok durumuna göre satış temsilcimiz tarafından paylaşılır.",
  payment:
    "Kapıda ödeme, havale/EFT ve mağaza teslim seçenekleri için WhatsApp üzerinden bilgi alabilirsiniz.",
  warranty:
    "Garanti ve servis kapsamı ürün tipine ve seçilen mekanizmaya göre satış temsilcimiz tarafından netleştirilir.",
  leadTime:
    "Stoklu ürünlerde teslimat planı WhatsApp görüşmesinde paylaşılır. Özel üretimlerde süre ölçü, renk ve mekanizma seçimine göre değişir.",
  legalPaymentNotice:
    "Online kredi kartı tahsilatı bu aşamada aktif değildir. Ödeme ve sipariş süreçleri WhatsApp üzerinden paylaşılacak bilgiler doğrultusunda yürütülür.",
};

export const navigation = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Koleksiyonlar", href: "/koleksiyonlar" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Nasıl Çalışır?", href: "/nasil-calisir" },
  { label: "Özel Üretim", href: "/ozel-uretim" },
  { label: "Proje Çözümleri", href: "/proje-cozumleri" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export const legalLinks = [
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  {
    label: "Ödeme ve Teslimat Bilgilendirme",
    href: "/mesafeli-satis-odeme-teslimat",
  },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
];
