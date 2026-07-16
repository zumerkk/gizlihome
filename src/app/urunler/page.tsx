import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { JsonLd } from "@/components/common/json-ld";
import { SectionHeading } from "@/components/common/section-heading";
import { ComingSoonProducts } from "@/components/products/coming-soon-products";
import { ProductFilters } from "@/components/products/product-filters";
import { seoKeywords } from "@/data/site";
import { products } from "@/data/products";
import { breadcrumbSchema, productListSchema, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ürünler | Gizli Dolap, Gizli Mobilya ve Şifreli Komodin",
  description:
    "GİZLİ HOME aktif NOVA ürünlerini inceleyin: NOVA NIGHT 01, NOVA WALL 01, NOVA 03 PULSE, NOVA CUBE, NOVA LITE ve NOVA SLIDE. Gizli dolap, gizli mobilya ve NFC kartlı çözümler.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/urunler",
  },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={productListSchema(products)} />
      <JsonLd
        data={webPageSchema({
          path: "/urunler",
          name: "GİZLİ HOME Ürünler",
          description:
            "Gizli dolap, gizli mobilya, şifreli mobilya ve NFC kartlı gizli bölmeli ürünler.",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", href: "/" },
          { name: "Ürünler", href: "/urunler" },
        ])}
      />
      <Breadcrumb items={[{ label: "Ürünler" }]} />
      <section className="bg-cream pb-20 pt-8">
        <div className="site-container">
          <SectionHeading
            eyebrow="Ürünler"
            title="Aktif NOVA Ürünleri."
            description="NOVA NIGHT 01, NOVA WALL 01, NOVA 03 PULSE, NOVA CUBE, NOVA LITE ve NOVA SLIDE için renk, ölçü, gizli mekanizma ve teslimat detaylarını inceleyin. Online kart tahsilatı yok; teklif ve sipariş süreci WhatsApp üzerinden tamamlanır."
          />
          <div className="mt-10">
            <ProductFilters products={products} />
          </div>
          <ComingSoonProducts />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
