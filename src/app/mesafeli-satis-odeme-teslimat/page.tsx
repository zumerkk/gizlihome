import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";
import { businessInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Mesafeli Satış / Ödeme ve Teslimat Bilgilendirme",
  description:
    "GİZLİ HOME ödeme, teslimat, WhatsApp sipariş ve özel üretim bilgilendirme taslağı.",
  alternates: {
    canonical: "/mesafeli-satis-odeme-teslimat",
  },
};

const sections = [
  {
    title: "Online ödeme durumu",
    text: businessInfo.legalPaymentNotice,
  },
  {
    title: "Sipariş akışı",
    text: "Kullanıcı ürünü seçer, fiyat ve renk bilgisini görür, WhatsApp butonuyla satış temsilcisine yönlenir. Sipariş onayı, teslimat ve ödeme seçenekleri temsilci tarafından paylaşılır.",
  },
  {
    title: "Ödeme seçenekleri",
    text: "Kapıda ödeme, havale/EFT, mağaza teslim veya proje bazlı ödeme planı ürün ve teslimat koşullarına göre WhatsApp görüşmesinde netleştirilebilir.",
  },
  {
    title: "Teslimat",
    text: businessInfo.delivery,
  },
  {
    title: "Özel üretim",
    text: "Özel ölçü, özel renk ve proje ürünlerinde teslim süresi, fiyat ve kapsam teklif aşamasında belirlenir.",
  },
];

export default function SalesDeliveryPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Ödeme ve Teslimat Bilgilendirme" }]} />
      <section className="bg-cream pb-20 pt-8">
        <div className="site-container max-w-4xl">
          <SectionHeading
            eyebrow="Yasal"
            title="Mesafeli Satış / Ödeme ve Teslimat Bilgilendirme"
            description="Bu sayfa, GİZLİ HOME sipariş modelini ve ödeme-teslimat akışını netleştiren profesyonel taslak metindir."
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
