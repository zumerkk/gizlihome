import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Clock, MapPin, MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";
import { CustomProductionForm } from "@/components/home/custom-production-form";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { brand, seoKeywords } from "@/data/site";

export const metadata: Metadata = {
  title: "İletişim | WhatsApp, Mağaza ve Proje Görüşmesi",
  description:
    "GİZLİ HOME WhatsApp hattı, Instagram profili, çalışma saatleri ve Yenidoğan mağaza randevu bilgileri.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/iletisim",
  },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "İletişim" }]} />
      <section className="bg-cream pb-20 pt-8">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <SectionHeading
              eyebrow="İletişim"
              title="Ürün, Fiyat ve Proje Detayları İçin Yazın."
              description="Online sepet ve kredi kartı tahsilatı şu an aktif değildir. Sipariş ve teklif süreçleri WhatsApp üzerinden satış temsilcimizle yürütülür."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-md border border-obsidian/10 bg-white p-6">
                <MessageCircle className="h-7 w-7 text-bronze" />
                <h2 className="mt-5 font-serif text-3xl font-semibold">WhatsApp</h2>
                <p className="mt-2 text-sm text-muted">{brand.whatsappDisplay}</p>
                <div className="mt-5">
                  <WhatsAppButton variant="dark" size="sm">
                    WhatsApp&apos;tan Yaz
                  </WhatsAppButton>
                </div>
              </article>
              <article className="rounded-md border border-obsidian/10 bg-white p-6">
                <Camera className="h-7 w-7 text-bronze" />
                <h2 className="mt-5 font-serif text-3xl font-semibold">Instagram</h2>
                <p className="mt-2 text-sm text-muted">{brand.instagram}</p>
                <Link
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-10 items-center rounded-md border border-obsidian/10 px-4 text-sm font-semibold"
                >
                  Profili Aç
                </Link>
              </article>
              <article className="rounded-md border border-obsidian/10 bg-white p-6">
                <Clock className="h-7 w-7 text-bronze" />
                <h2 className="mt-5 font-serif text-3xl font-semibold">Çalışma Saatleri</h2>
                <p className="mt-2 text-sm text-muted">{brand.workingHours}</p>
              </article>
              <article className="rounded-md border border-obsidian/10 bg-white p-6">
                <MapPin className="h-7 w-7 text-bronze" />
                <h2 className="mt-5 font-serif text-3xl font-semibold">Mağaza</h2>
                <p className="mt-2 text-sm text-muted">{brand.address}</p>
                <p className="mt-3 text-sm font-semibold text-walnut">
                  Mağazayı ziyaret etmek için WhatsApp&apos;tan randevu alın.
                </p>
              </article>
            </div>
            <div className="mt-5 grid min-h-72 place-items-center rounded-md border border-dashed border-obsidian/20 bg-stone text-center text-sm font-semibold text-muted">
              Google Maps alanı hazır. Embed bilgisi yayın öncesi harita
              hesabından eklenebilir.
            </div>
          </div>
          <CustomProductionForm context="iletişim ve ürün bilgisi" />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
