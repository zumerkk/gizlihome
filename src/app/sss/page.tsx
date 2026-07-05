import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { JsonLd } from "@/components/common/json-ld";
import { FAQAccordion } from "@/components/home/faq-accordion";
import { seoKeywords } from "@/data/site";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular | Gizli Dolap ve Şifreli Mobilya",
  description:
    "Gizli dolap, gizli mobilya, şifreli dolap, NFC kartlı mobilya, gizli çekmece, teslimat, ödeme ve özel üretim hakkında sık sorulan sorular.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/sss",
  },
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Breadcrumb items={[{ label: "Sık Sorulan Sorular" }]} />
      <FAQAccordion />
      <ContactCTA />
    </>
  );
}
