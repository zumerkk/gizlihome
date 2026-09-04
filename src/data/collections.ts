import type { Collection } from "@/types/product";

export const collections: Collection[] = [
  {
    id: "nox",
    slug: "nox",
    name: "NOX",
    eyebrow: "Gece Koleksiyonu",
    description:
      "NOVA NIGHT 01, CUBE ve LITE ile yatak odasında görünmeyen, kontrollü saklama çözümleri.",
    image: "/images/generated/collection-nox.webp",
    href: "/urunler?category=Komodin",
  },
  {
    id: "vault",
    slug: "vault",
    name: "VAULT",
    eyebrow: "Güvenlik Koleksiyonu",
    description:
      "Duvar, raf ve mobilya yüzeyine entegre edilen kontrollü erişim çözümleri.",
    image: "/images/generated/collection-vault.webp",
    href: "/urunler?category=Duvar%20Raf%C4%B1",
  },
  {
    id: "nova",
    slug: "nova",
    name: "NOVA",
    eyebrow: "Modern Yaşam Koleksiyonu",
    description:
      "NOVA CUBE, AURA 01, AURA 02, NIGHT 01, WALL 01, LITE ve SLIDE ile modern gizli mobilya çizgisi.",
    image: "/images/generated/collection-nova.webp",
    href: "/urunler?collection=NOVA",
  },
  {
    id: "atlas",
    slug: "atlas",
    name: "ATLAS",
    eyebrow: "Villa & Büyük Yaşam Alanları",
    description:
      "Villa, rezidans ve büyük yaşam alanlarında projeye entegre edilen özel güvenlik mobilyaları.",
    image: "/images/generated/collection-atlas.webp",
    href: "/proje-cozumleri",
  },
  {
    id: "private",
    slug: "private",
    name: "PRIVATE",
    eyebrow: "Ofis ve Yönetici Çözümleri",
    description:
      "Yönetici odası, özel çalışma alanı ve belge güvenliği için projeye özel premium çözümler.",
    image: "/images/generated/collection-private.webp",
    href: "/proje-cozumleri",
  },
  {
    id: "custom-lab",
    slug: "custom-lab",
    name: "CUSTOM LAB",
    eyebrow: "Kişiye Özel Tasarım",
    description:
      "Ölçü, renk, mekanizma ve gizli bölme mimarisi tamamen size göre tasarlanan üretim hattı.",
    image: "/images/generated/collection-custom-lab.webp",
    href: "/ozel-uretim",
  },
];
