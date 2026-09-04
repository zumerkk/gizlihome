import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";
import { businessInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "GİZLİ HOME gizlilik, sipariş ve ödeme verilerinin işlenmesine ilişkin bilgilendirme.",
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
        intro="Bu sayfa, GİZLİ HOME web sitesini kullanan ve sipariş oluşturan kişilerin verilerinin hangi amaçlarla işlendiğini açıklar."
        sections={[
          {
            title: "Toplanan bilgiler",
            text: "Ad, e-posta, telefon, teslimat adresi, sipariş içeriği, ürün tercihi ve kullanıcı tarafından paylaşılan proje bilgileri sipariş, teslimat ve destek süreçlerini yürütmek amacıyla işlenebilir.",
          },
          {
            title: "Kullanım amacı",
            text: "Bilgiler ürün bilgilendirmesi, ödeme doğrulaması, sipariş kaydı, teslimat planlaması, dolandırıcılığın önlenmesi, satış sonrası destek ve yasal yükümlülüklerin yerine getirilmesi için işlenir.",
          },
          {
            title: "Ödeme bilgileri",
            text: businessInfo.legalPaymentNotice,
          },
          {
            title: "Saklama ve haklar",
            text: "Kişisel veriler işlem amacı ve yasal saklama süreleri boyunca, erişimi sınırlandırılmış sistemlerde tutulur. İlgili kişiler yürürlükteki mevzuat kapsamındaki başvuru haklarını iletişim kanalımız üzerinden kullanabilir.",
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
