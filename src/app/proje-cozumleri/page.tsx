import type { Metadata } from "next";
import { Building2, Hotel, Landmark, Sofa } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";
import { CustomProductionForm } from "@/components/home/custom-production-form";
import { ProjectCTA } from "@/components/home/project-cta";
import { seoKeywords } from "@/data/site";

export const metadata: Metadata = {
  title: "Villa & Proje Çözümleri | Gizli Mobilya Projeleri",
  description:
    "GİZLİ HOME villa, rezidans, otel, ofis ve iç mimarlık projeleri için gizli dolap, gizli mobilya ve şifreli güvenlik mobilyaları tasarlar.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/proje-cozumleri",
  },
};

const projectTypes = [
  {
    title: "Villa",
    text: "Yatak odası, vestiyer, TV ünitesi ve özel oda senaryolarına entegre gizli alanlar.",
    icon: Landmark,
  },
  {
    title: "Otel",
    text: "Süit, özel kasa alternatifi ve yönetim alanları için mobilyaya entegre güvenlik.",
    icon: Hotel,
  },
  {
    title: "Ofis",
    text: "Yönetici masası, belge saklama ve toplantı odası çözümleri.",
    icon: Building2,
  },
  {
    title: "İç Mimarlık Projeleri",
    text: "Mimar ve iç mimarlarla ölçü, malzeme ve mekanizma koordinasyonu.",
    icon: Sofa,
  },
];

export default function ProjectSolutionsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Villa & Proje Çözümleri" }]} />
      <section className="bg-obsidian py-20 text-cream">
        <div className="site-container">
          <SectionHeading
            eyebrow="Proje Çözümleri"
            title="Mimari Projeye Entegre Güvenlik Mobilyaları."
            description="GİZLİ HOME; villa, rezidans, otel, ofis ve özel yaşam alanları için dışarıdan premium mobilya gibi görünen, içeride güvenli saklama alanı sunan çözümler geliştirir."
            dark
          />
        </div>
      </section>
      <section className="bg-cream py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-4 md:grid-cols-2">
            {projectTypes.map((item) => (
              <article key={item.title} className="rounded-md border border-obsidian/10 bg-white p-6">
                <item.icon className="h-7 w-7 text-bronze" />
                <h2 className="mt-5 font-serif text-3xl font-semibold text-obsidian">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
          <CustomProductionForm context="villa veya proje çözümü" />
        </div>
      </section>
      <ProjectCTA />
      <ContactCTA />
    </>
  );
}
