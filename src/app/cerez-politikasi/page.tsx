import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { SectionHeading } from "@/components/common/section-heading";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "GİZLİ HOME zorunlu depolama, oturum ve çerez kullanımı bilgilendirmesi.",
  alternates: {
    canonical: "/cerez-politikasi",
  },
};

const sections = [
  {
    title: "Çerez kullanımı",
    text: "Web sitesi temel kullanım ve güvenlik için sınırlı teknik depolama kullanır. Sepet tercihleri cihazınızın yerel depolama alanında saklanır; kart bilgileri GİZLİ HOME tarafından depolanmaz.",
  },
  {
    title: "Zorunlu çerezler",
    text: "Yetkili yönetim oturumunda, kısa süreli ve yalnız sunucu tarafından okunabilen güvenli bir oturum çerezi kullanılır. Bu çerez pazarlama amacı taşımaz.",
  },
  {
    title: "Analitik ve pazarlama",
    text: "Sitede şu anda analitik veya reklam çerezi aktif değildir. Böyle bir araç eklendiğinde zorunlu olmayan çerezler kullanıcı tercihi alınmadan çalıştırılmaz.",
  },
  {
    title: "Güncelleme",
    text: "Çerez ve depolama uygulamalarında değişiklik olması hâlinde bu sayfa güncellenir ve yürürlük tarihi açıkça belirtilir. Son güncelleme: 25 Ağustos 2026.",
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
            description="Sitede kullanılan zorunlu teknik depolama ve oturum uygulamalarını şeffaf biçimde açıklıyoruz."
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
