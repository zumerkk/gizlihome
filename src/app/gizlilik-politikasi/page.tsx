import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";
import { businessInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "GİZLİ HOME gizlilik politikası taslak metni.",
  alternates: {
    canonical: "/gizlilik-politikasi",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Gizlilik Politikası" }]} />
      <LegalShell
        eyebrow="Yasal"
        title="Gizlilik Politikası"
        intro="Bu sayfa, GİZLİ HOME web sitesinden iletişime geçen kullanıcıların kişisel verilerinin nasıl işlenebileceğine dair profesyonel taslak bilgilendirme metnidir."
        sections={[
          {
            title: "Toplanan bilgiler",
            text: "Ad, telefon, mesaj içeriği, ürün tercihi, renk tercihi ve WhatsApp üzerinden gönüllü olarak paylaşılan proje bilgileri sipariş ve teklif süreçlerini yürütmek amacıyla kullanılabilir.",
          },
          {
            title: "Kullanım amacı",
            text: "Bilgiler ürün bilgilendirmesi, teklif hazırlığı, teslimat planlaması, satış sonrası destek ve müşteri iletişimi için işlenir.",
          },
          {
            title: "Ödeme bilgileri",
            text: businessInfo.legalPaymentNotice,
          },
          {
            title: "Güncelleme",
            text: "Bu taslak metin, marka tüzel bilgileri ve yasal danışmanlık doğrultusunda yayın öncesinde güncellenmelidir.",
          },
        ]}
      />
      <ContactCTA />
    </>
  );
}

function LegalShell({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{ title: string; text: string }>;
}) {
  return (
    <section className="bg-cream pb-20 pt-8">
      <div className="site-container max-w-4xl">
        <SectionHeading eyebrow={eyebrow} title={title} description={intro} />
        <div className="mt-10 grid gap-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-md border border-obsidian/10 bg-white p-6">
              <h2 className="font-serif text-3xl font-semibold text-obsidian">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{section.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
