import type { Metadata } from "next";
import { CheckCircle2, ClipboardCheck, Factory, Ruler, Truck } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { FeatureList } from "@/components/common/feature-list";
import { SectionHeading } from "@/components/common/section-heading";
import { CustomProductionForm } from "@/components/home/custom-production-form";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { seoKeywords } from "@/data/site";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Özel Üretim | Gizli Dolap ve Şifreli Mobilya",
  description:
    "GİZLİ HOME özel ölçü, özel renk, NFC, şifreli erişim, akıllı kilit ve gizli mekanizma seçenekleriyle özel üretim güvenlik mobilyası üretir.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/ozel-uretim",
  },
};

const process = [
  { title: "Ölçü ve keşif", icon: Ruler },
  { title: "Tasarım onayı", icon: ClipboardCheck },
  { title: "Üretim", icon: Factory },
  { title: "Kalite kontrol", icon: CheckCircle2 },
  { title: "Teslimat", icon: Truck },
];

const features = [
  "Özel ölçü ve yerleşim planı",
  "Özel renk ve yüzey seçimi",
  "NFC / şifre / akıllı kilit opsiyonu",
  "Projeye özel gizli bölme tasarımı",
  "Mimar ve iç mimar iş birliği",
];

export default function CustomProductionPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Özel Üretim" }]} />
      <section className="bg-cream pb-20 pt-8">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Özel Üretim"
              title="Standart Değil. Size Özel."
              description="GİZLİ HOME, yaşam alanınıza, ihtiyaçlarınıza ve güvenlik beklentinize göre özel üretim yapar."
            />
            <div className="mt-8 rounded-md border border-obsidian/10 bg-white p-6">
              <FeatureList items={features} />
            </div>
            <div className="mt-8">
              <WhatsAppButton
                customMessage={whatsappMessages.custom}
                variant="dark"
                size="lg"
              >
                WhatsApp&apos;tan Proje Başlat
              </WhatsAppButton>
            </div>
          </div>
          <CustomProductionForm context="özel üretim mobilya" />
        </div>
      </section>
      <section className="bg-stone py-20">
        <div className="site-container">
          <SectionHeading
            eyebrow="Süreç"
            title="Nasıl İlerliyoruz?"
            description="Özel üretimde hızlı karar değil, doğru ölçü, doğru mekanizma ve doğru güvenlik senaryosu önemlidir."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {process.map((item, index) => (
              <article key={item.title} className="rounded-md bg-cream p-5">
                <span className="text-xs font-bold text-bronze">0{index + 1}</span>
                <item.icon className="mt-5 h-7 w-7 text-obsidian" />
                <h2 className="mt-5 font-serif text-2xl font-semibold text-obsidian">
                  {item.title}
                </h2>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
