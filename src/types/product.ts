export type ProductStatus =
  | "Stokta"
  | "Sınırlı Üretim"
  | "Özel Üretim"
  | "Teklif Al";

export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: string;
  price: number | null;
  oldPrice?: number | null;
  currency: "TRY";
  description: string;
  shortDescription: string;
  features: string[];
  colors: string[];
  sizes: string[];
  images: string[];
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
