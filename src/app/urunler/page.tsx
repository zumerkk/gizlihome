import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { JsonLd } from "@/components/common/json-ld";
import { SectionHeading } from "@/components/common/section-heading";
import { ProductFilters } from "@/components/products/product-filters";
import { seoKeywords } from "@/data/site";
import { products } from "@/data/products";
import { breadcrumbSchema, productListSchema, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ürünler | Gizli Dolap, Gizli Mobilya ve Şifreli Komodin",
  description:
    "GİZLİ HOME NOVA koleksiyonunu inceleyin: NOVA CUBE, NOVA AURA 02, NOVA NIGHT 01 ve NOVA WALL 01.",
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
            eyebrow="NOVA Koleksiyonu"
            title="Dört model. Tek bir tasarım dili."
            description="Fiyat, standart ölçü, yüzey, teslim süresi ve gerçek mekanizma videolarıyla karşılaştırın. Kartlı siparişler geçici olarak Shopier güvenli ödeme ekranında tamamlanır."
          />
          <div className="mt-10">
            <ProductFilters products={products} />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
