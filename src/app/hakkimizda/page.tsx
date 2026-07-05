import type { Metadata } from "next";
import { Layers, LockKeyhole, Sofa } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { seoKeywords } from "@/data/site";

export const metadata: Metadata = {
  title: "Hakkımızda | Premium Gizli Mobilya Markası",
  description:
    "GİZLİ HOME; gizli dolap, gizli mobilya, şifreli mobilya, NFC kartlı komodin ve özel üretim güvenlik mobilyası çözümleri geliştirir.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/hakkimizda",
  },
};

const values = [
  {
    title: "Mobilya estetiği",
    text: "Ürün önce yaşam alanına yakışmalı, güvenlik hissi tasarımın içinde kalmalıdır.",
    icon: Sofa,
  },
  {
    title: "Gizli katman",
    text: "Gizli bölme dışarıdan bir ipucu vermeden mobilya formuna entegre edilir.",
    icon: Layers,
  },
  {
    title: "Kontrollü erişim",
    text: "NFC kart, şifre veya akıllı kilit seçenekleri kullanım senaryosuna göre seçilir.",
    icon: LockKeyhole,
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Hakkımızda" }]} />
      <section className="bg-cream pb-20 pt-8">
        <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="GİZLİ HOME"
            title="Sıradan Mobilyanın Ötesinde Bir Güvenlik Fikri."
            description="GİZLİ HOME; dışarıdan modern, şık ve kaliteli mobilya gibi görünen; içeride NFC kart, şifreli erişim, gizli bölme ve isteğe bağlı akıllı kilit sistemleri bulunan premium mobilyalar üretir."
          />
          <div className="rounded-md bg-obsidian p-8 text-cream">
            <p className="font-serif text-4xl font-semibold leading-tight">
              Şıklık dışarıda. Güvenlik içeride.
            </p>
            <p className="mt-5 text-sm leading-7 text-stone/75">
              Komodin, TV ünitesi, kitaplık, raf, konsol, sehpa, yatak
              başlığı, vestiyer, ofis mobilyası, villa projeleri ve özel
              üretim güvenlik mobilyaları aynı marka yaklaşımıyla tasarlanır.
            </p>
            <div className="mt-7">
              <WhatsAppButton variant="outline">Markayla İletişime Geç</WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-stone py-20">
        <div className="site-container grid gap-5 md:grid-cols-3">
          {values.map((item) => (
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
