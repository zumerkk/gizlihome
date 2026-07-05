import type { Metadata } from "next";
import { CreditCard, LockKeyhole, PanelTopOpen, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { seoKeywords } from "@/data/site";

export const metadata: Metadata = {
  title: "Nasıl Çalışır? | Gizli Mekanizma ve NFC Kartlı Mobilya",
  description:
    "GİZLİ HOME gizli bölmeli mobilyalarda NFC kart, şifreli erişim, gizli çekmece ve gizli mekanizma çalışma mantığını inceleyin.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/nasil-calisir",
  },
};

const details = [
  {
    title: "Tanımlı erişim",
    text: "NFC kart veya seçilen kilit sistemi ürüne özel olarak planlanır.",
    icon: CreditCard,
  },
  {
    title: "Gizli mekanizma",
    text: "Kapak, çekmece veya panel çizgisi mobilya tasarımına entegre edilir.",
    icon: LockKeyhole,
  },
  {
    title: "Sessiz açılış",
    text: "Mekanizma, kullanım anında dikkat çekmeyen yumuşak bir hareket sunar.",
    icon: PanelTopOpen,
  },
  {
    title: "Güvenli alan",
    text: "Değer verdiğiniz eşyalar görünmeyen bir saklama alanında tutulur.",
    icon: ShieldCheck,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Nasıl Çalışır?" }]} />
      <section className="bg-obsidian py-20 text-cream">
        <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Sistem"
            title="Kart Yaklaşır. Panel Açılır. İz Bırakmaz."
            description="GİZLİ HOME ürünlerinde amaç teknolojiyi sergilemek değil, güvenliği mobilyanın içinde görünmez kılmaktır."
            dark
          />
          <div className="rounded-md border border-bronze/20 bg-white/5 p-6">
            <p className="text-sm leading-7 text-stone/78">
              Ürün seçimine göre NFC kartlı sistem, şifreli erişim veya akıllı
              kilit opsiyonu planlanabilir. Mekanizma seçimi teslimat, kullanım
              sıklığı ve gizli bölmenin konumuna göre netleştirilir.
            </p>
            <div className="mt-6">
              <WhatsAppButton variant="outline">
                Hemen WhatsApp&apos;tan Sor
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
      <HowItWorks />
      <section className="bg-stone py-20">
        <div className="site-container grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {details.map((item) => (
            <article key={item.title} className="rounded-md bg-cream p-6">
              <item.icon className="h-7 w-7 text-bronze" />
              <h2 className="mt-5 font-serif text-3xl font-semibold text-obsidian">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
