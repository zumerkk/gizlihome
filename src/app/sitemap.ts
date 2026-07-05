import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { brand } from "@/data/site";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "daily" as const },
  { path: "/urunler", priority: 0.95, changeFrequency: "daily" as const },
  { path: "/nasil-calisir", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/ozel-uretim", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/proje-cozumleri", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/koleksiyonlar", priority: 0.75, changeFrequency: "weekly" as const },
  { path: "/hakkimizda", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/sss", priority: 0.75, changeFrequency: "weekly" as const },
  { path: "/iletisim", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/gizlilik-politikasi", priority: 0.35, changeFrequency: "yearly" as const },
  {
    path: "/mesafeli-satis-odeme-teslimat",
    priority: 0.35,
    changeFrequency: "yearly" as const,
  },
  { path: "/cerez-politikasi", priority: 0.35, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${brand.siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      images:
        route.path === ""
          ? [
              `${brand.siteUrl}/images/generated/hero-premium.webp`,
              `${brand.siteUrl}/images/generated/og-premium.webp`,
            ]
          : undefined,
    })),
    ...products.map((product) => ({
      url: `${brand.siteUrl}/urunler/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.92,
      images: product.images.map((image) => `${brand.siteUrl}${image}`),
    })),
  ];
}
