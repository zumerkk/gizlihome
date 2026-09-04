import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";
import { CollectionCard } from "@/components/home/collection-card";
import { collections } from "@/data/collections";
import { seoKeywords } from "@/data/site";

export const metadata: Metadata = {
  title: "Koleksiyonlar | Gizli Mobilya ve Güvenlik Mobilyası",
  description:
    "NOVA gizli dolap, NFC kartlı mobilya, villa ve özel üretim güvenlik mobilyası koleksiyonlarını keşfedin.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/koleksiyonlar",
  },
};

export default function CollectionsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Koleksiyonlar" }]} />
      <section className="bg-cream pb-20 pt-8">
        <div className="site-container">
          <SectionHeading
            eyebrow="Koleksiyonlar"
            title="Her Alan İçin Gizli Bir Katman."
            description="Yatak odası, salon, ofis, villa ve özel projelerde estetiği bozmadan güvenlik alanı oluşturan koleksiyonlar."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
