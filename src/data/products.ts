import { businessInfo } from "@/data/site";
import type { Product } from "@/types/product";

export const productCategories = [
  "Gizli Bölmeli Komodinler",
  "Akıllı Komodinler",
  "Gizli Bölmeli Raflar",
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

const common = {
  currency: "TRY" as const,
  warranty: "2 yıl mekanizma ve üretim garantisi",
  deliveryInfo: businessInfo.delivery,
  paymentInfo: businessInfo.payment,
};

export const products: Product[] = [
  {
    ...common,
    id: "nova-cube",
    sku: "GH-NC-01",
    slug: "nova-cube-isikli-gizli-bolmeli-komodin",
    name: "NOVA CUBE",
    shopierUrl: "https://www.shopier.com/gizlihome/50512326",
    collection: "NOVA",
    category: "Işıklı Gizli Bölmeli Komodin",
    price: 10990,
    oldPrice: null,
    shortDescription:
      "Kart kontrollü gizli bölmesi ve çift çekmecesiyle markanın imza komodini.",
    description:
      "NOVA CUBE, çift çekmeceli yalın gövdeyi kart kontrollü gizli saklama alanı ve katmanlı LED aydınlatmayla birleştirir. Kısa orta kaide üzerindeki geniş üst kutunun menteşeli kapağı NFC kartla açıldığında yalnızca yetkilendirilmiş kullanıcının erişebildiği düzenli iç hacim ortaya çıkar.",
    features: [
      "NFC kartlı erişim",
      "Menteşeli gizli bölme kapağı",
      "Sabit kaideli LED üst platform",
      "İki geniş çekmece",
      "2 adet yetkilendirilmiş kart",
      "Kurulu ve kullanıma hazır teslimat",
    ],
    colors: ["Antrasit", "Siyah", "Kırık Beyaz"],
    sizes: ["50 × 42 × 58 cm"],
    images: [
      "/images/products/studio/nova-cube-v2/antrasit-kapak.webp",
      "/images/products/studio/nova-cube-v2/antrasit-gizli-bolme.webp",
      "/images/products/nova-cube-v2/gercek-urun-led-kapak.webp",
      "/images/products/nova-cube-v2/gercek-urun-genel.webp",
    ],
    colorImages: {
      Antrasit: [
        "/images/products/studio/nova-cube-v2/antrasit-kapak.webp",
        "/images/products/studio/nova-cube-v2/antrasit-gizli-bolme.webp",
        "/images/products/nova-cube-v2/gercek-urun-led-kapak.webp",
        "/images/products/nova-cube-v2/gercek-urun-genel.webp",
      ],
      Siyah: [
        "/images/products/studio/nova-cube-v2/siyah-kapak.webp",
        "/images/products/studio/nova-cube-v2/siyah-gizli-bolme.webp",
      ],
      "Kırık Beyaz": [
        "/images/products/studio/nova-cube-v2/kirik-beyaz-kapak.webp",
        "/images/products/studio/nova-cube-v2/kirik-beyaz-gizli-bolme.webp",
      ],
    },
    videos: [
      {
        src: "/videos/products/nova-cube-yeni-tanitim.mp4",
        poster: "/images/products/nova-cube-v2/gercek-urun-led-kapak.webp",
        label: "NOVA CUBE gerçek ürün ve NFC erişim videosu",
      },
    ],
    dimensions: {
      width: 50,
      depth: 42,
      height: 58,
      hiddenCompartment: "Yaklaşık 44 × 35 × 9 cm",
    },
    leadTime: "Stok durumuna göre 3–10 iş günü",
    isFeatured: true,
    isNew: false,
    isCustomQuote: false,
    stockStatus: "Sınırlı Üretim",
    technicalSpecs: [
      { label: "Dış ölçü", value: "50 G × 42 D × 58 Y cm" },
      { label: "Gizli alan", value: "Yaklaşık 44 × 35 × 9 cm" },
      { label: "Erişim", value: "Yetkilendirilebilir NFC kartlı kapak kilidi" },
      { label: "Aydınlatma", value: "Sabit üst platformda nötr beyaz LED" },
      { label: "Gövde", value: "Premium MDF yüzey, mat antrasit bitiş" },
      { label: "Paket", value: "Komodin, 2 NFC kart ve kullanım kılavuzu" },
    ],
    whatsappMessage:
      "Merhaba, GİZLİ HOME NOVA CUBE için sipariş ve teslimat bilgisi almak istiyorum.",
    seoTitle: "NOVA CUBE NFC Kartlı Gizli Bölmeli Komodin",
    seoDescription:
      "NOVA CUBE; NFC kartlı menteşeli gizli bölme, LED aydınlatmalı sabit üst platform ve çift çekmeceli premium komodin tasarımı sunar.",
  },
  {
    ...common,
    id: "nova-aura-02",
    sku: "GH-NA-02",
    slug: "nova-aura-02-akilli-gizli-bolmeli-komodin",
    name: "NOVA AURA 02",
    shopierUrl: "https://www.shopier.com/gizlihome/50538291",
    collection: "NOVA",
    category: "Akıllı Gizli Bölmeli Komodin",
    price: 18000,
    oldPrice: null,
    shortDescription:
      "Cam akıllı yüzey, kablosuz şarj, Bluetooth ses ve motorlu gizli erişimin yeni yorumu.",
    description:
      "NOVA AURA 02, füme cam üst yüzeyindeki kablosuz şarj alanı, ön yüzdeki dairesel Bluetooth hoparlörü ve dokunmatik kontrolleri sıcak çevresel LED ışıkla tamamlar. NFC kartla çalışan cam üst modül öne doğru kayarak arkasındaki özel saklama alanına kontrollü erişim sağlar.",
    features: [
      "NFC kartlı motorlu kayar erişim",
      "Kablosuz telefon şarjı",
      "Ön yüzde dairesel Bluetooth hoparlör",
      "Cam yüzeyde dokunmatik kontrol",
      "Sıcak çevresel LED aydınlatma",
      "Geniş alt çekmece",
    ],
    colors: ["Füme & Doğal Meşe", "Antrasit & Ceviz", "Siyah & Ceviz"],
    sizes: ["48 × 42 × 62 cm"],
    images: [
      "/images/products/studio/nova-aura-02-v2/fume-dogal-mese-kapak.webp",
      "/images/products/studio/nova-aura-02-v2/fume-dogal-mese-mekanizma.webp",
      "/images/products/nova-aura-02-v2/gercek-urun-on.webp",
      "/images/products/nova-aura-02-v2/gercek-urun-salon.webp",
    ],
    colorImages: {
      "Füme & Doğal Meşe": [
        "/images/products/studio/nova-aura-02-v2/fume-dogal-mese-kapak.webp",
        "/images/products/studio/nova-aura-02-v2/fume-dogal-mese-mekanizma.webp",
        "/images/products/nova-aura-02-v2/gercek-urun-on.webp",
        "/images/products/nova-aura-02-v2/gercek-urun-salon.webp",
      ],
      "Antrasit & Ceviz": [
        "/images/products/studio/nova-aura-02-v2/antrasit-ceviz-kapak.webp",
        "/images/products/studio/nova-aura-02-v2/antrasit-ceviz-mekanizma.webp",
      ],
      "Siyah & Ceviz": [
        "/images/products/studio/nova-aura-02-v2/siyah-ceviz-kapak.webp",
        "/images/products/studio/nova-aura-02-v2/siyah-ceviz-mekanizma.webp",
      ],
    },
    videos: [
      {
        src: "/videos/products/nova-aura-02-production.mp4",
        poster:
          "/images/products/studio/nova-aura-02-v2/fume-dogal-mese-kapak.webp",
        label: "NOVA AURA 02 gerçek ürün ve üretim demosu",
      },
      {
        src: "/videos/products/nova-aura-02-mechanism.mp4",
        poster:
          "/images/products/studio/nova-aura-02-v2/fume-dogal-mese-mekanizma.webp",
        label: "NOVA AURA 02 mekanizma ve akıllı yüzey demosu",
      },
    ],
    dimensions: {
      width: 48,
      depth: 42,
      height: 62,
      hiddenCompartment: "Yaklaşık 42 × 35 × 10 cm",
    },
    leadTime: "Ön siparişlerde 10–20 iş günü",
    isFeatured: true,
    isNew: true,
    isCustomQuote: false,
    stockStatus: "Ön Sipariş",
    technicalSpecs: [
      { label: "Dış ölçü", value: "48 G × 42 D × 62 Y cm" },
      { label: "Gizli alan", value: "Yaklaşık 42 × 35 × 10 cm" },
      { label: "Akıllı yüzey", value: "Kablosuz şarj ve dokunmatik kontrol" },
      { label: "Ses", value: "Ön yüzde entegre dairesel Bluetooth hoparlör" },
      { label: "Erişim", value: "NFC kartla öne kayan motorlu cam üst modül" },
      { label: "Aydınlatma", value: "Sıcak çevresel LED ışık" },
    ],
    whatsappMessage:
      "Merhaba, GİZLİ HOME NOVA AURA 02 için sipariş ve teslimat bilgisi almak istiyorum.",
    seoTitle: "NOVA AURA 02 Akıllı NFC Gizli Bölmeli Komodin",
    seoDescription:
      "NOVA AURA 02; NFC motorlu erişim, kablosuz şarj, Bluetooth hoparlör, dokunmatik cam yüzey ve sıcak LED aydınlatmalı premium akıllı komodindir.",
  },
  {
    ...common,
    id: "nova-night-01",
    sku: "GH-NN-01",
    slug: "nova-night-01-gizli-bolmeli-komodin",
    name: "NOVA NIGHT 01",
    shopierUrl: "https://www.shopier.com/gizlihome/50538342",
    collection: "NOVA",
    category: "Gizli Bölmeli Komodin",
    price: 6499,
    oldPrice: 9990,
    campaignLabel: "Lansmana Özel",
    campaignNote: "İlk 100 adet için 6.499 ₺ özel fiyat",
    shortDescription:
      "Sade komodin görünümünün altında LED destekli, kart kontrollü özel alan.",
    description:
      "NOVA NIGHT 01, yatak odasında dikkat çekmeden çalışan sessiz bir güvenlik katmanı sunar. Üst kapak NFC kartla açılır; aydınlatmalı iç hacim saat, takı, belge ve kişisel eşyalar için düzenli bir alan oluşturur.",
    features: [
      "NFC kartlı üst kapak",
      "LED iç aydınlatma",
      "İki çekmeceli gövde",
      "Sessiz ray sistemi",
      "Düşük pil uyarısı",
      "Kurulu teslimat",
    ],
    colors: ["Safir Meşe", "Kırık Beyaz", "Antrasit", "Siyah"],
    sizes: ["45 × 40 × 55 cm"],
    images: [
      "/images/products/nova-night/nova-night-safir-mese-closed.webp",
      "/images/products/nova-night/nova-night-safir-mese-open.webp",
      "/images/products/nova-night/nova-night-safir-mese-nfc.webp",
      "/images/products/nova-night/nova-night-safir-mese-drawers.webp",
      "/images/products/nova-night/nova-night-nfc-cards.webp",
    ],
    colorImages: {
      "Safir Meşe": [
        "/images/products/nova-night/nova-night-safir-mese-closed.webp",
        "/images/products/nova-night/nova-night-safir-mese-open.webp",
        "/images/products/nova-night/nova-night-safir-mese-nfc.webp",
        "/images/products/nova-night/nova-night-safir-mese-drawers.webp",
        "/images/products/nova-night/nova-night-nfc-cards.webp",
      ],
      "Kırık Beyaz": [
        "/images/products/studio/nova-night/kirik-beyaz-kapak.webp",
        "/images/products/studio/nova-night/kirik-beyaz-mekanizma.webp",
      ],
      Antrasit: [
        "/images/products/studio/nova-night/antrasit-kapak.webp",
        "/images/products/studio/nova-night/antrasit-mekanizma.webp",
      ],
      Siyah: [
        "/images/products/studio/nova-night/siyah-kapak.webp",
        "/images/products/studio/nova-night/siyah-mekanizma.webp",
      ],
    },
    videos: [
      {
        src: "/videos/products/nova-night-launch-01.mp4",
        poster: "/images/products/nova-night/nova-night-safir-mese-closed.webp",
        label: "NOVA NIGHT 01 lansman filmi",
      },
      {
        src: "/videos/products/nova-night-launch-02.mp4",
        poster: "/images/products/nova-night/nova-night-safir-mese-nfc.webp",
        label: "NOVA NIGHT 01 NFC erişim filmi",
      },
    ],
    dimensions: {
      width: 45,
      depth: 40,
      height: 55,
      hiddenCompartment: "Yaklaşık 39 × 33 × 8 cm",
    },
    leadTime: "Stok durumuna göre 5–12 iş günü",
    isFeatured: true,
    isNew: true,
    isCustomQuote: false,
    stockStatus: "Sınırlı Üretim",
    technicalSpecs: [
      { label: "Dış ölçü", value: "45 G × 40 D × 55 Y cm" },
      { label: "Gizli alan", value: "Yaklaşık 39 × 33 × 8 cm" },
      { label: "Erişim", value: "NFC kartlı elektronik kilit" },
      { label: "Enerji", value: "Değiştirilebilir pil ve düşük pil uyarısı" },
      { label: "Çekmece", value: "2 adet sessiz raylı çekmece" },
    ],
    whatsappMessage:
      "Merhaba, GİZLİ HOME NOVA NIGHT 01 için sipariş ve teslimat bilgisi almak istiyorum.",
    seoTitle: "NOVA NIGHT 01 NFC Kartlı Gizli Bölmeli Komodin",
    seoDescription:
      "NOVA NIGHT 01; NFC kartlı üst gizli bölme, LED iç aydınlatma ve iki çekmeceli sade premium komodin tasarımı sunar.",
  },
  {
    ...common,
    id: "nova-wall-01",
    sku: "GH-NW-01",
    slug: "nova-wall-01-gizli-bolmeli-raf",
    name: "NOVA WALL 01",
    shopierUrl: "https://www.shopier.com/gizlihome/50538370",
    collection: "NOVA",
    category: "Gizli Bölmeli Duvar Rafı",
    price: 8490,
    oldPrice: null,
    shortDescription:
      "Minimal duvar rafının içinde NFC erişimli, LED aydınlatmalı saklama hacmi.",
    description:
      "NOVA WALL 01, salon, çalışma odası ve yatak odasında dekoratif raf gibi görünür. Yetkilendirilmiş kartla sessizce açılan iç hacmi, duvar yüzeyinde yer kaybetmeden görünmeyen saklama sağlar.",
    features: [
      "NFC kartlı erişim",
      "LED aydınlatmalı iç hacim",
      "Gizli duvar sabitlemesi",
      "Sessiz kapak mekanizması",
      "Dört yüzey seçeneği",
      "Montaj kiti",
    ],
    colors: ["Kırık Beyaz", "Siyah", "Antrasit", "Safir Meşe"],
    sizes: ["80 × 25 × 16 cm"],
    images: [
      "/images/products/studio/nova-wall/kirik-beyaz-kapak.webp",
      "/images/products/studio/nova-wall/kirik-beyaz-mekanizma.webp",
    ],
    colorImages: {
      "Kırık Beyaz": [
        "/images/products/studio/nova-wall/kirik-beyaz-kapak.webp",
        "/images/products/studio/nova-wall/kirik-beyaz-mekanizma.webp",
      ],
      Siyah: [
        "/images/products/studio/nova-wall/siyah-kapak.webp",
        "/images/products/studio/nova-wall/siyah-mekanizma.webp",
      ],
      Antrasit: [
        "/images/products/studio/nova-wall/antrasit-kapak.webp",
        "/images/products/studio/nova-wall/antrasit-mekanizma.webp",
      ],
      "Safir Meşe": [
        "/images/products/studio/nova-wall/safir-mese-kapak.webp",
        "/images/products/studio/nova-wall/safir-mese-mekanizma.webp",
      ],
    },
    videos: [
      {
        src: "/videos/products/nova-wall-demo.mp4",
        poster:
          "/images/products/studio/nova-wall/kirik-beyaz-mekanizma.webp",
        label: "NOVA WALL 01 açılım ve montaj demosu",
      },
    ],
    dimensions: {
      width: 80,
      depth: 25,
      height: 16,
      hiddenCompartment: "Yaklaşık 72 × 20 × 8 cm",
    },
    leadTime: "Stok durumuna göre 5–12 iş günü",
    isFeatured: true,
    isNew: false,
    isCustomQuote: false,
    stockStatus: "Sınırlı Üretim",
    technicalSpecs: [
      { label: "Dış ölçü", value: "80 G × 25 D × 16 Y cm" },
      { label: "Gizli alan", value: "Yaklaşık 72 × 20 × 8 cm" },
      { label: "Erişim", value: "NFC kartlı elektronik kilit" },
      { label: "Montaj", value: "Duvar tipine uygun gizli sabitleme kiti" },
      { label: "Taşıma", value: "Duvar yapısına göre montajda doğrulanır" },
    ],
    whatsappMessage:
      "Merhaba, GİZLİ HOME NOVA WALL 01 için sipariş ve duvar montajı bilgisi almak istiyorum.",
    seoTitle: "NOVA WALL 01 NFC Kartlı Gizli Bölmeli Duvar Rafı",
    seoDescription:
      "NOVA WALL 01; NFC kartlı erişim, LED aydınlatmalı gizli hacim ve minimal duvar rafı tasarımı sunar.",
  },
];

export const comingSoonProducts: ComingSoonProduct[] = [];

export function getFeaturedProducts() {
  return products.filter((product) => product.isFeatured);
}

export function getNewProducts() {
  return products.filter((product) => product.isNew);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
