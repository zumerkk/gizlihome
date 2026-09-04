export type ProductStatus =
  | "Stokta"
  | "Ön Sipariş"
  | "Sınırlı Üretim"
  | "Özel Üretim"
  | "Teklif Al";

export type ProductVideo = {
  src: string;
  poster: string;
  label: string;
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  shopierUrl?: string;
  collection: string;
  category: string;
  price: number | null;
  oldPrice?: number | null;
  campaignLabel?: string;
  campaignNote?: string;
  currency: "TRY";
  description: string;
  shortDescription: string;
  features: string[];
  colors: string[];
  sizes: string[];
  images: string[];
  colorImages?: Record<string, string[]>;
  videos: ProductVideo[];
  dimensions: {
    width: number;
    depth: number;
    height: number;
    hiddenCompartment?: string;
  };
  warranty: string;
  leadTime: string;
  isFeatured: boolean;
  isNew: boolean;
  isCustomQuote: boolean;
  stockStatus: ProductStatus;
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  whatsappMessage: string;
  deliveryInfo: string;
  paymentInfo: string;
  seoTitle: string;
  seoDescription: string;
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  href: string;
};
