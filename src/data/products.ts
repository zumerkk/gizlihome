import { businessInfo } from "@/data/site";
import type { Product } from "@/types/product";

export const productCategories = [
  "Gizli Bölmeli Komodinler",
  "Gizli Bölmeli Raflar",
  "Gizli Bölmeli Sehpalar",
  "TV Üniteleri",
  "Konsollar",
  "Ofis Mobilyaları",
  "Villa & Proje Ürünleri",
  "Özel Üretim",
];

export type ComingSoonProduct = {
  id: string;
  name: string;
  collection: string;
  category: string;
  description: string;
  image: string;
  keywords: string[];
};

export const products: Product[] = [
  {
    id: "nova-cube",
    slug: "nova-cube-isikli-gizli-bolmeli-komodin",
    name: "NOVA CUBE",
    collection: "NOVA",
    category: "Işıklı Gizli Bölmeli Komodin",
    price: null,
    oldPrice: null,
    currency: "TRY",
    shortDescription:
      "Küp formunda, LED ambiyanslı ve gizli bölmeli premium komodin.",
    description:
      "NOVA CUBE, sade küp formunu mavi LED ambiyans, gizli saklama alanı ve modern yatak odası estetiğiyle birleştirir. Dışarıdan şık bir komodin, içeride yalnızca size ait kontrollü bir alan sunar.",
    features: [
      "Gizli bölmeli tasarım",
      "LED ambiyans aydınlatma",
      "NFC erişim opsiyonu",
      "İki çekmeceli saklama",
      "Modern küp gövde",
      "Premium MDF lam yüzey",
    ],
    colors: ["Kırık Beyaz", "Antrasit", "Kum Beji", "Safir Meşe"],
    sizes: ["Standart", "Geniş", "Özel Ölçü"],
    images: [
      "/images/generated/product-nova-cube-1.webp",
      "/images/generated/product-nova-cube-2.webp",
      "/images/generated/product-nova-cube-3.webp",
      "/images/generated/product-nova-cube-4.webp",
    ],
    isFeatured: true,
    isNew: true,
    isCustomQuote: true,
    stockStatus: "Sınırlı Üretim",
    technicalSpecs: [
      { label: "Form", value: "Küp görünümlü iki çekmeceli komodin gövdesi" },
      { label: "Aydınlatma", value: "Ara katmanda mavi LED ambiyans ışığı" },
      { label: "Erişim", value: "NFC kart veya projeye göre özel erişim opsiyonu" },
      { label: "Gizli Alan", value: "Gövde içinde görünmeyen saklama bölmesi" },
    ],
    whatsappMessage:
      "Merhaba, GİZLİ HOME web sitesinden NOVA CUBE hakkında bilgi almak istiyorum.",
    deliveryInfo: businessInfo.delivery,
    paymentInfo: businessInfo.payment,
    seoTitle:
      "NOVA CUBE Işıklı Gizli Bölmeli Komodin | Gizli Mobilya",
    seoDescription:
      "NOVA CUBE; LED ambiyanslı, gizli bölmeli, NFC erişim opsiyonlu ve modern küp formlu premium komodin modelidir.",
  },
  {
    id: "nova-lite",
    slug: "nova-lite-nfcli-gizli-bolmeli-akilli-komodin",
    name: "NOVA LITE",
    collection: "NOVA",
    category: "NFC'li Gizli Bölmeli Akıllı Komodin",
    price: null,
    oldPrice: null,
    currency: "TRY",
    shortDescription:
      "NFC kartlı, LED aydınlatmalı ve gizli bölmeli koyu komodin.",
    description:
      "NOVA LITE, koyu premium gövdesi, mavi LED iç aydınlatması, iki çekmecesi ve NFC kartlı gizli bölmesiyle modern yatak odaları için kompakt ama güçlü bir güvenlik mobilyasıdır.",
    features: [
      "NFC kartlı erişim",
      "Gizli üst bölme",
      "LED aydınlatmalı iç hacim",
      "İki çekmeceli kullanım",
      "Modern koyu gövde",
      "Sessiz ray sistemi",
    ],
    colors: ["Antrasit", "Koyu Gri", "Siyah", "Kum Beji"],
    sizes: ["Standart", "Geniş", "Özel Ölçü"],
    images: [
      "/images/generated/product-nova-lite-1.webp",
      "/images/generated/product-nova-lite-2.webp",
      "/images/generated/product-nova-lite-3.webp",
      "/images/generated/product-nova-lite-4.webp",
    ],
    isFeatured: true,
    isNew: true,
    isCustomQuote: true,
    stockStatus: "Sınırlı Üretim",
    technicalSpecs: [
      { label: "Erişim", value: "NFC kart ile yetkilendirilmiş gizli açılış" },
      { label: "Aydınlatma", value: "Mavi LED aydınlatmalı açık iç hacim" },
      { label: "Depolama", value: "İki çekmece ve üst gizli bölme kombinasyonu" },
      { label: "Gövde", value: "Koyu tonlu premium komodin formu" },
    ],
    whatsappMessage:
      "Merhaba, GİZLİ HOME web sitesinden NOVA LITE hakkında bilgi almak istiyorum.",
    deliveryInfo: businessInfo.delivery,
    paymentInfo: businessInfo.payment,
    seoTitle:
      "NOVA LITE NFC'li Gizli Bölmeli Akıllı Komodin | Şifreli Mobilya",
    seoDescription:
      "NOVA LITE; NFC kartlı erişim, LED aydınlatmalı iç hacim, gizli üst bölme ve iki çekmeceli premium akıllı komodin modelidir.",
  },
  {
    id: "nova-slide",
    slug: "nova-slide-nfcli-gizli-bolmeli-komodin",
    name: "NOVA SLIDE",
    collection: "NOVA",
    category: "NFC'li Gizli Bölmeli Komodin",
    price: null,
    oldPrice: null,
    currency: "TRY",
    shortDescription:
      "Ceviz dokulu, NFC erişimli ve sürgülü gizli bölmeli komodin.",
    description:
      "NOVA SLIDE, sıcak ceviz dokusunu antrasit yüzeylerle birleştiren, NFC kartlı erişim ve iç aydınlatmalı gizli bölme sunan premium komodindir. Tek dokunuşla açılan gizli alan, günlük yaşamda görünmeden çalışır.",
    features: [
      "NFC kartlı erişim",
      "Sürgülü / kapaklı gizli bölme",
      "LED iç aydınlatma",
      "Ceviz çıtalı yan detay",
      "Antrasit çekmece yüzeyi",
      "Modern ve sıcak tasarım",
    ],
    colors: ["Ceviz", "Antrasit", "Siyah", "Kum Beji"],
    sizes: ["Standart", "Geniş", "Özel Ölçü"],
    images: [
      "/images/generated/product-nova-slide-1.webp",
      "/images/generated/product-nova-slide-2.webp",
      "/images/generated/product-nova-slide-3.webp",
      "/images/generated/product-nova-slide-4.webp",
    ],
    isFeatured: true,
    isNew: true,
    isCustomQuote: true,
    stockStatus: "Özel Üretim",
    technicalSpecs: [
      { label: "Malzeme", value: "Ceviz dokulu yüzey ve antrasit çekmece dili" },
      { label: "Erişim", value: "NFC kartlı veya projeye özel erişim seçeneği" },
      { label: "Gizli Alan", value: "Yan bölümde LED aydınlatmalı saklama hacmi" },
      { label: "Tasarım", value: "Çıtalı yan yüzey, yükseltilmiş ayak ve modern gövde" },
    ],
    whatsappMessage:
      "Merhaba, GİZLİ HOME web sitesinden NOVA SLIDE hakkında bilgi almak istiyorum.",
    deliveryInfo: businessInfo.delivery,
    paymentInfo: businessInfo.payment,
    seoTitle:
      "NOVA SLIDE NFC'li Gizli Bölmeli Komodin | Gizli Çekmece",
    seoDescription:
      "NOVA SLIDE; ceviz dokulu, antrasit yüzeyli, NFC erişimli, LED aydınlatmalı gizli bölme sunan premium gizli çekmeceli komodindir.",
  },
];

export const comingSoonProducts: ComingSoonProduct[] = [
  {
    id: "hidden-coffee-table",
    name: "Gizli Bölmeli Sehpa",
    collection: "NOVA",
    category: "Gizli Bölmeli Sehpalar",
    description:
      "Salon için gizli çekmece, şifreli mekanizma ve akıllı açılma seçenekleriyle geliştirilen yeni sehpa ailesi.",
    image: "/images/generated/product-gizli-arc-01.webp",
    keywords: ["gizli çekmece", "gizli mekanizma", "akıllı sehpa"],
  },
  {
    id: "hidden-tv-unit",
    name: "Gizli Bölmeli TV Ünitesi",
    collection: "VAULT",
    category: "TV Üniteleri",
    description:
      "Villa ve salon projeleri için kablo yönetimli, geniş saklama alanlı ve kartlı erişimli TV ünitesi çözümleri.",
    image: "/images/generated/product-gizli-vault-tv.webp",
    keywords: ["gizli dolap", "şifreli dolap", "villa mobilyası"],
  },
  {
    id: "hidden-console",
    name: "Gizli Bölmeli Konsol",
    collection: "VAULT",
    category: "Konsollar",
    description:
      "Antre, salon ve özel yaşam alanları için dışarıdan konsol, içeride güvenli saklama alanı hissi veren seri.",
    image: "/images/generated/collection-vault.webp",
    keywords: ["gizli mobilya", "gizli saklama alanı", "kartlı kilitli mobilya"],
  },
  {
    id: "private-office",
    name: "Ofis ve Yönetici Mobilyaları",
    collection: "PRIVATE",
    category: "Ofis Mobilyaları",
    description:
      "Belge, cihaz ve değerli eşya güvenliği için şifreli mobilya ve özel ölçü yönetici odası çözümleri.",
    image: "/images/generated/product-gizli-private-desk.webp",
    keywords: ["şifreli mobilya", "güvenlik mobilyası", "ofis mobilyası"],
  },
  {
    id: "villa-projects",
    name: "Villa & Proje Ürünleri",
    collection: "ATLAS",
    category: "Villa & Proje Ürünleri",
    description:
      "Villa, rezidans, otel ve özel proje alanları için mimari plana entegre edilen gizli güvenlik mobilyaları.",
    image: "/images/generated/banner-villa-project.webp",
    keywords: ["villa mobilyası", "gizli dolap", "özel üretim mobilya"],
  },
  {
    id: "custom-lab",
    name: "Özel Üretim Gizli Mobilya",
    collection: "CUSTOM LAB",
    category: "Özel Üretim",
    description:
      "Ölçü, renk, NFC, şifre, akıllı kilit ve gizli mekanizma seçenekleriyle tamamen projeye özel üretim.",
    image: "/images/generated/collection-custom-lab.webp",
    keywords: ["özel üretim mobilya", "şifreli mobilya", "gizli mekanizma"],
  },
];

export function getFeaturedProducts() {
  return products.filter((product) => product.isFeatured);
}

export function getNewProducts() {
  return products.filter((product) => product.isNew);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
