import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";
import { ContactCTA } from "@/components/common/contact-cta";
import { FeatureList } from "@/components/common/feature-list";
import { JsonLd } from "@/components/common/json-ld";
import { SectionHeading } from "@/components/common/section-heading";
import { BrandStory } from "@/components/home/brand-story";
import { CampaignBanners } from "@/components/home/campaign-banners";
import { CategoryExplore } from "@/components/home/category-explore";
import { CollectionCard } from "@/components/home/collection-card";
import { EditorialCampaigns } from "@/components/home/editorial-campaigns";
import { FAQAccordion } from "@/components/home/faq-accordion";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { Newsletter } from "@/components/home/newsletter";
import { ProjectCTA } from "@/components/home/project-cta";
import { StyleFinder } from "@/components/home/style-finder";
import { TrustFeatures } from "@/components/home/trust-features";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { collections } from "@/data/collections";
import { getFeaturedProducts, getNewProducts } from "@/data/products";
import { faqSchema } from "@/lib/seo";

const customFeatures = [
  "Özel Ölçü",
  "Özel Renk",
  "NFC / Şifre / Akıllı Kilit Seçeneği",
  "Projeye Özel Gizli Bölme Tasarımı",
  "Mimar ve İç Mimar İş Birliği",
];

const trustSignals = [
  "Özel üretim odaklı",
  "Ürünler montajlı teslim edilir",
  "Türkiye geneli gönderim",
  "WhatsApp destek hattı",
  "Proje ve mimar iş birlikleri",
  "Güvenli paketleme",
];

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <>
      <JsonLd data={faqSchema()} />
      <HeroSection />
      <CampaignBanners />
      <TrustFeatures />
      <CategoryExplore />

      <section className="bg-stone py-20">
        <div className="site-container">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Koleksiyonlar"
              title="Yaşam Alanınızın Gizli Tarafı."
              description="Komodinden TV ünitesine, villa projelerinden yönetici odalarına kadar her alan için görünmeyen güvenlik."
            />
            <Button asChild variant="dark">
              <Link href="/koleksiyonlar">
                Tüm Koleksiyonlar
                <ArrowUpRight className="h-4 w-4 text-bronze" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      <StyleFinder />

      <section className="bg-cream py-20">
        <div className="site-container">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Öne Çıkan Ürünler"
              title="En Çok Tercih Edilenler"
              description="Üretimdeki üç NOVA ürününü inceleyin; renk, ölçü ve gizli mekanizma tercihleri WhatsApp satış temsilcisiyle netleşir."
            />
            <Button asChild variant="light">
              <Link href="/urunler">Tüm Ürünleri Gör</Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone py-20">
        <div className="site-container">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Yeni Gelenler"
              title="Yeni Sistemler, Yeni Yüzeyler."
              description="Sınırlı üretim ve yeni koleksiyon ürünleri; renk, ölçü ve teslimat seçenekleriyle WhatsApp üzerinden netleşir."
            />
            <Button asChild variant="dark">
              <Link href="/urunler?sort=new">Yeni Ürünleri Gör</Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <EditorialCampaigns />
      <BrandStory />

      <section className="premium-dark-band bg-obsidian py-24 text-cream">
        <div className="site-container grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-bronze">
              Gizli Katman
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-none md:text-7xl">
              Dışarıdan Sadece Bir Mobilya.
            </h2>
            <p className="mt-6 text-lg leading-8 text-stone/75">
              İçeride ise yalnızca sizin bildiğiniz bir alan.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/urunler">Ürünleri İncele</Link>
              </Button>
            </div>
          </div>
          <div className="premium-card group relative aspect-square overflow-hidden rounded-md border border-bronze/20 bg-charcoal">
            <Image
              src="/images/generated/feature-hidden-nightstand.webp"
              alt="GİZLİ HOME gizli bölmeli komodin Instagram görseli"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="card-shine" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Özel Üretim"
              title="Hayalinizdeki Mobilyayı, Güvenliğinizle Birleştiriyoruz."
              description="Ev, villa, ofis, otel, Airbnb, yönetici odası veya özel proje fark etmeksizin; ölçünüze, renginize, kullanım ihtiyacınıza ve güvenlik beklentinize göre üretim yapıyoruz."
            />
            <div className="mt-8">
              <WhatsAppButton
                customMessage="Merhaba, GİZLİ HOME için özel üretim mobilya talebim var. Projem hakkında bilgi paylaşmak istiyorum."
                variant="dark"
                size="lg"
              >
                <MessageCircle className="h-5 w-5 text-bronze" />
                Özel Üretim İçin WhatsApp&apos;tan Yaz
              </WhatsAppButton>
            </div>
          </div>
          <div className="rounded-md border border-obsidian/10 bg-white p-6">
            <FeatureList items={customFeatures} />
          </div>
        </div>
      </section>

      <ProjectCTA />

      <section className="bg-charcoal py-20 text-cream">
        <div className="site-container">
          <SectionHeading
            eyebrow="Güven Unsurları"
            title="Gerçek yorumlar geldiğinde bu alan hazır."
            description="Şimdilik sahte müşteri yorumu kullanmıyoruz. Bunun yerine satın alma kararını destekleyen operasyonel güven unsurlarını net biçimde gösteriyoruz."
            dark
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {trustSignals.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-5"
              >
                <ShieldCheck className="h-5 w-5 text-bronze" />
                <span className="text-sm font-semibold text-stone">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InstagramGrid />
      <Newsletter />
      <FAQAccordion limit={6} />
      <ContactCTA />
    </>
  );
}
