import Link from "next/link";
import { ArrowUpRight, BadgeCheck, CreditCard, PackageCheck, ShieldCheck } from "lucide-react";
import { ContactCTA } from "@/components/common/contact-cta";
import { JsonLd } from "@/components/common/json-ld";
import { SectionHeading } from "@/components/common/section-heading";
import { BrandStory } from "@/components/home/brand-story";
import { CampaignBanners } from "@/components/home/campaign-banners";
import { FAQAccordion } from "@/components/home/faq-accordion";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { ProjectCTA } from "@/components/home/project-cta";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { faqSchema } from "@/lib/seo";

const serviceSignals = [
  { icon: ShieldCheck, title: "NFC Kontrollü", text: "Yetkilendirilmiş kartla erişim" },
  { icon: BadgeCheck, title: "2 Yıl Garanti", text: "Mekanizma ve üretim garantisi" },
  { icon: PackageCheck, title: "Kurulu Teslim", text: "Montaj gerektirmeden kullanıma hazır" },
  { icon: CreditCard, title: "Shopier Ödeme", text: "Geçici güvenli ödeme kanalımız" },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <HeroSection />
      <CampaignBanners />

      <section className="border-y border-obsidian/10 bg-cream py-5">
        <div className="site-container grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {serviceSignals.map((item) => (
            <div key={item.title} data-reveal="up" className="flex items-center gap-3 px-1 py-2">
              <item.icon className="h-5 w-5 shrink-0 text-bronze" />
              <div>
                <p className="text-sm font-extrabold text-obsidian">{item.title}</p>
                <p className="text-xs font-semibold text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="koleksiyon" className="bg-stone py-20 md:py-28">
        <div className="site-container">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="NOVA / İmza Serisi"
              title="Gizlilik, mobilyanın içinde kalır."
              description="Gerçek ürün, gerçek fiyat, gerçek ölçü. Her modelin mekanizma videosunu ürün sayfasında izleyebilirsiniz."
            />
            <Button asChild variant="dark">
              <Link href="/urunler">
                Koleksiyonun Tamamı
                <ArrowUpRight className="h-4 w-4 text-bronze" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                sharedTransition
                eagerImage={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian py-20 text-cream md:py-28">
        <div className="site-container grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div data-reveal="left">
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-bronze">
              Üretim Arşivi / 01
            </p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-[0.95] md:text-7xl">
              Gördüğünüz form. Bilmediğiniz katman.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone/72">
              NOVA CUBE&apos;un gerçek ürün videosu; sabit LED platformu, kartla açılan menteşeli üst kapağı ve gerçek iç hacmi gösterir. Stüdyo görselleri aynı ürün geometrisi esas alınarak hazırlandı.
            </p>
            <div className="mt-8 flex flex-wrap items-baseline gap-4">
              <span className="font-serif text-5xl font-semibold">10.990 TL</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                Lansman Fiyatı
              </span>
            </div>
            <Button asChild className="mt-8" size="lg">
              <Link href="/urunler/nova-cube-isikli-gizli-bolmeli-komodin">
                NOVA CUBE&apos;u İncele
              </Link>
            </Button>
          </div>
          <div
            data-reveal="right"
            data-tilt="true"
            className="relative mx-auto aspect-[9/16] w-full max-w-[460px] overflow-hidden rounded-md border border-bronze/25 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
          >
            <video
              src="/videos/products/nova-cube-yeni-tanitim.mp4"
              poster="/images/products/nova-cube-v2/gercek-urun-led-kapak.webp"
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              controls
              className="h-full w-full object-cover"
              aria-label="NOVA CUBE gerçek ürün ve NFC erişim videosu"
            />
          </div>
        </div>
      </section>

      <HowItWorks />
      <BrandStory />
      <ProjectCTA />
      <InstagramGrid />
      <FAQAccordion limit={6} />
      <ContactCTA />
    </>
  );
}
