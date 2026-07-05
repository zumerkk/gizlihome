import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";
import { ComingSoonProducts } from "@/components/products/coming-soon-products";
import { ProductFilters } from "@/components/products/product-filters";
import { seoKeywords } from "@/data/site";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Ürünler | Gizli Dolap, Gizli Mobilya ve Şifreli Komodin",
  description:
    "GİZLİ HOME üretimdeki NOVA CUBE, NOVA LITE ve NOVA SLIDE gizli bölmeli komodin ürünlerini inceleyin. Gizli dolap, gizli mobilya ve NFC kartlı çözümler.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/urunler",
  },
};

export default function ProductsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Ürünler" }]} />
      <section className="bg-cream pb-20 pt-8">
        <div className="site-container">
          <SectionHeading
            eyebrow="Ürünler"
            title="Üretimdeki Üç NOVA Ürünü."
            description="NOVA CUBE, NOVA LITE ve NOVA SLIDE için renk, ölçü, gizli mekanizma ve teslimat detaylarını inceleyin. Online kart tahsilatı yok; teklif ve sipariş süreci WhatsApp üzerinden tamamlanır."
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
