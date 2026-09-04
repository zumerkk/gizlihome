import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";
import { businessInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Mesafeli Satış / Ödeme ve Teslimat Bilgilendirme",
  description:
    "GİZLİ HOME kartlı ödeme, sipariş, teslimat, cayma ve özel üretim bilgilendirmesi.",
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
    text: "Kullanıcı ürün, renk, ölçü ve adet seçimini sepete ekler. Kartlı ödeme, yeni sanal POS entegrasyonu tamamlanana kadar GİZLİ HOME’un Shopier mağazasında güvenli şekilde tamamlanır.",
  },
  {
    title: "Ödeme seçenekleri",
    text: "Kartlı ödemeler geçici olarak Shopier güvenli ödeme alanında tamamlanır; kart bilgileri GİZLİ HOME tarafından görülmez veya saklanmaz. Havale/EFT ve proje bazlı ödeme planları için satış ekibimizle görüşebilirsiniz. Kapıda ödeme standart bir seçenek değildir.",
  },
  {
    title: "Teslimat",
    text: businessInfo.delivery,
  },
  {
    title: "Özel üretim",
    text: "Özel ölçü, özel renk ve proje ürünlerinde teslim süresi, fiyat ve kapsam teklif aşamasında belirlenir.",
  },
  {
    title: "Cayma, iade ve üretim toleransı",
    text: "Standart ürünlerde yürürlükteki tüketici mevzuatından doğan haklar saklıdır. Kullanıcının özel ölçü, renk veya teknik tercihlerine göre üretilen ürünlerde cayma hakkı mevzuattaki istisnalara tabi olabilir. Hasarlı teslimat ve üretim kaynaklı sorunlar için teslimat belgesi, ambalaj ve ürün fotoğraflarıyla aynı gün iletişime geçilmelidir. Mobilya üretiminde teknik çizimde belirtilen toleranslar geçerlidir.",
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
            description="Sipariş vermeden önce ödeme, üretim ve teslimat koşullarını inceleyin. Siparişe özgü ön bilgilendirme ve sözleşme ödeme adımında onayınıza sunulur."
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
