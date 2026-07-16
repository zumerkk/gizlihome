import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "GİZLİ HOME çerez politikası taslak metni.",
  alternates: {
    canonical: "/cerez-politikasi",
  },
};

const sections = [
  {
    title: "Çerez kullanımı",
    text: "Web sitesi performans, güvenlik, temel kullanım ve ileride eklenebilecek analiz araçları için çerezlerden yararlanabilir.",
  },
  {
    title: "Zorunlu çerezler",
    text: "Site navigasyonu, güvenlik ve temel kullanıcı deneyimi için gerekli teknik çerezler kullanılabilir.",
  },
  {
    title: "Analitik ve pazarlama",
    text: "Analitik veya reklam çerezleri aktif edilirse kullanıcı bilgilendirmesi ve gerekli onay mekanizmaları yayına alınmalıdır.",
  },
  {
    title: "Güncelleme",
    text: "Bu metin, kullanılacak gerçek çerez ve üçüncü taraf araç listesine göre yayın öncesinde güncellenmelidir.",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Çerez Politikası" }]} />
      <section className="bg-cream pb-20 pt-8">
        <div className="site-container max-w-4xl">
          <SectionHeading
            eyebrow="Yasal"
            title="Çerez Politikası"
            description="Bu sayfa, GİZLİ HOME web sitesi için hazırlanmış profesyonel çerez politikası taslağıdır."
          />
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
      <ContactCTA />
    </>
  );
}
