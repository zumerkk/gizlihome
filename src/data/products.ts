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
      "/images/generated/product-nova-cube-5.webp",
      "/images/generated/product-nova-cube-6.webp",
      "/images/generated/product-nova-cube-7.webp",
      "/images/generated/product-nova-cube-8.webp",
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
      "/images/generated/product-nova-lite-5.webp",
      "/images/generated/product-nova-lite-6.webp",
      "/images/generated/product-nova-lite-7.webp",
      "/images/generated/product-nova-lite-8.webp",
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
      "/images/generated/product-nova-slide-5.webp",
      "/images/generated/product-nova-slide-6.webp",
      "/images/generated/product-nova-slide-7.webp",
      "/images/generated/product-nova-slide-8.webp",
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
  {
    id: "nova-night-01",
    slug: "nova-night-01-gizli-bolmeli-komodin",
    name: "NOVA NIGHT 01",
    collection: "NOVA",
    category: "Gizli Bölmeli Komodin",
    price: null,
    oldPrice: null,
    currency: "TRY",
    shortDescription:
      "Üst kapaklı gizli bölmesi, NFC erişim opsiyonu ve sade beyaz gövdesiyle premium komodin.",
    description:
      "NOVA NIGHT 01, dışarıdan modern ve sakin bir komodin gibi görünür. Üst kapağı açıldığında LED destekli gizli saklama alanı ortaya çıkar; saat, takı, belge ve kişisel eşyalarınızı görünmeden korumak için tasarlanır.",
    features: [
      "Üst kapaklı gizli bölme",
      "NFC kartlı erişim opsiyonu",
      "LED iç aydınlatma",
      "İki çekmeceli komodin gövdesi",
      "Sessiz ray sistemi",
      "Beyaz ve antrasit renk seçenekleri",
    ],
    colors: ["Beyaz", "Antrasit", "Siyah", "Safir Meşe"],
    sizes: ["Standart", "Geniş", "Özel Ölçü"],
    images: [
      "/images/generated/product-nova-night-01-5.webp",
      "/images/generated/product-nova-night-01-6.webp",
      "/images/generated/product-nova-night-01-7.webp",
      "/images/generated/product-nova-night-01-8.webp",
      "/images/generated/product-nova-night-01-1.webp",
      "/images/generated/product-nova-night-01-2.webp",
      "/images/generated/product-nova-night-01-3.webp",
      "/images/generated/product-nova-night-01-4.webp",
    ],
    isFeatured: true,
    isNew: false,
    isCustomQuote: true,
    stockStatus: "Sınırlı Üretim",
    technicalSpecs: [
      { label: "Form", value: "İki çekmeceli modern yatak odası komodini" },
      { label: "Gizli Alan", value: "Üst kapak altında LED aydınlatmalı saklama bölmesi" },
      { label: "Erişim", value: "NFC kartlı veya projeye göre özel erişim opsiyonu" },
      { label: "Kullanım", value: "Takı, saat, belge ve kişisel eşyalar için gizli alan" },
    ],
    whatsappMessage:
      "Merhaba, GİZLİ HOME web sitesinden NOVA NIGHT 01 hakkında bilgi almak istiyorum.",
    deliveryInfo: businessInfo.delivery,
    paymentInfo: businessInfo.payment,
    seoTitle:
      "NOVA NIGHT 01 Gizli Bölmeli Komodin | NFC Kartlı Gizli Mobilya",
    seoDescription:
      "NOVA NIGHT 01; üst kapaklı gizli bölme, NFC kartlı erişim opsiyonu, LED iç aydınlatma ve iki çekmeceli premium komodin tasarımı sunar.",
  },
  {
    id: "nova-wall-01",
    slug: "nova-wall-01-gizli-bolmeli-raf",
    name: "NOVA WALL 01",
    collection: "NOVA",
    category: "Gizli Bölmeli Raf",
    price: null,
    oldPrice: null,
    currency: "TRY",
    shortDescription:
      "Duvarda minimal raf görünümü, içinde LED aydınlatmalı gizli saklama alanı.",
    description:
      "NOVA WALL 01, dışarıdan dekoratif ve minimal bir duvar rafı gibi görünür. Açıldığında sıcak LED aydınlatmalı ahşap iç hacim, NFC kart erişimi ve güvenli saklama alanı sunar.",
    features: [
      "Duvar tipi gizli raf tasarımı",
      "NFC kartlı erişim opsiyonu",
      "LED aydınlatmalı iç hacim",
      "Sessiz ve güvenli mekanizma",
      "Dekoratif raf görünümü",
      "Kolay montaj aparatı",
    ],
    colors: ["Beyaz", "Antrasit", "Safir Meşe"],
    sizes: ["Standart", "Geniş", "Özel Ölçü"],
    images: [
      "/images/generated/product-nova-wall-01-5.webp",
      "/images/generated/product-nova-wall-01-6.webp",
      "/images/generated/product-nova-wall-01-7.webp",
      "/images/generated/product-nova-wall-01-8.webp",
      "/images/generated/product-nova-wall-01-1.webp",
      "/images/generated/product-nova-wall-01-2.webp",
      "/images/generated/product-nova-wall-01-3.webp",
      "/images/generated/product-nova-wall-01-4.webp",
    ],
    isFeatured: true,
    isNew: false,
    isCustomQuote: true,
    stockStatus: "Sınırlı Üretim",
    technicalSpecs: [
      { label: "Form", value: "Minimal yatay duvar rafı gövdesi" },
      { label: "İç Hacim", value: "LED aydınlatmalı ahşap saklama bölmesi" },
      { label: "Erişim", value: "Yetkilendirilmiş NFC kart ile açılış opsiyonu" },
      { label: "Montaj", value: "Duvar tipine göre sabitleme aparatı" },
    ],
    whatsappMessage:
      "Merhaba, GİZLİ HOME web sitesinden NOVA WALL 01 hakkında bilgi almak istiyorum.",
    deliveryInfo: businessInfo.delivery,
    paymentInfo: businessInfo.payment,
    seoTitle:
      "NOVA WALL 01 Gizli Bölmeli Raf | Gizli Dolap ve Duvar Rafı",
    seoDescription:
      "NOVA WALL 01; duvarda minimal raf görünümü, LED aydınlatmalı gizli iç hacim ve NFC kartlı erişim opsiyonuyla premium gizli raf çözümüdür.",
  },
  {
    id: "nova-03-pulse",
    slug: "nova-03-pulse-akilli-gizli-bolmeli-komodin",
    name: "NOVA 03 PULSE",
    collection: "NOVA",
    category: "Akıllı Gizli Bölmeli Komodin",
    price: null,
    oldPrice: null,
    currency: "TRY",
    shortDescription:
      "LED cam yüzeyli, akıllı erişimli ve geniş gizli saklama hacimli premium komodin.",
    description:
      "NOVA 03 PULSE, akıllı teknoloji ve estetik tasarımı bir araya getirir. LED cam üst yüzey, NFC erişim opsiyonu, geniş çekmeceler ve gizli güvenlik alanı ile modern yatak odaları için güçlü bir modeldir.",
    features: [
      "LED aydınlatmalı cam üst yüzey",
      "NFC kartlı erişim opsiyonu",
      "Geniş ve derin çekmeceler",
      "Gizli güvenlik mekanizması",
      "Kablosuz şarj opsiyonu",
      "Hoparlör opsiyonu",
    ],
    colors: ["Antrasit", "Kum Beji", "Kırık Beyaz"],
    sizes: ["Standart", "Geniş", "Özel Ölçü"],
    images: [
      "/images/generated/product-nova-03-pulse-5.webp",
      "/images/generated/product-nova-03-pulse-6.webp",
      "/images/generated/product-nova-03-pulse-7.webp",
      "/images/generated/product-nova-03-pulse-8.webp",
      "/images/generated/product-nova-03-pulse-1.webp",
      "/images/generated/product-nova-03-pulse-2.webp",
      "/images/generated/product-nova-03-pulse-3.webp",
      "/images/generated/product-nova-03-pulse-4.webp",
    ],
    isFeatured: true,
    isNew: false,
    isCustomQuote: true,
    stockStatus: "Özel Üretim",
    technicalSpecs: [
      { label: "Üst Yüzey", value: "LED çizgili temperli cam görünüm" },
      { label: "Erişim", value: "NFC kartlı ve projeye özel akıllı erişim opsiyonu" },
      { label: "Depolama", value: "Geniş çekmece ve gizli güvenlik alanı kombinasyonu" },
      { label: "Opsiyonlar", value: "Kablosuz şarj, hoparlör ve özel ölçü seçenekleri" },
    ],
    whatsappMessage:
      "Merhaba, GİZLİ HOME web sitesinden NOVA 03 PULSE hakkında bilgi almak istiyorum.",
    deliveryInfo: businessInfo.delivery,
    paymentInfo: businessInfo.payment,
    seoTitle:
      "NOVA 03 PULSE Akıllı Gizli Bölmeli Komodin | Şifreli Mobilya",
    seoDescription:
      "NOVA 03 PULSE; LED cam yüzey, NFC kartlı erişim opsiyonu, geniş çekmeceler ve gizli güvenlik alanı sunan premium akıllı komodindir.",
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
