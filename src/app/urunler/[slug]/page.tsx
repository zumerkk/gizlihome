import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ContactCTA } from "@/components/common/contact-cta";
import { JsonLd } from "@/components/common/json-ld";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInfo } from "@/components/products/product-info";
import { ProductCard } from "@/components/products/product-card";
import { RecentlyViewed } from "@/components/products/recently-viewed";
import { seoKeywords } from "@/data/site";
import { products, getProductBySlug } from "@/data/products";
import { breadcrumbSchema, productSchema } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
    };
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: [
      product.name,
      product.category,
      product.collection,
      ...product.features,
      ...seoKeywords,
    ],
    alternates: {
      canonical: `/urunler/${product.slug}`,
    },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      type: "website",
      url: `/urunler/${product.slug}`,
      images: [
        {
          url: product.images[0],
          width: 1100,
          height: 1250,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((item) => item.id !== product.id && item.collection === product.collection)
    .slice(0, 3);
  const fallbackRelated = related.length
    ? related
    : products.filter((item) => item.id !== product.id).slice(0, 3);
  const bundled = products
    .filter((item) => item.id !== product.id)
    .slice(0, 2);

  return (
    <>
      <JsonLd data={productSchema(product)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", href: "/" },
          { name: "Ürünler", href: "/urunler" },
          { name: product.name, href: `/urunler/${product.slug}` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Ürünler", href: "/urunler" },
          { label: product.name },
        ]}
      />

      <section className="bg-cream pb-20 pt-8">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>
      </section>

      <section className="bg-stone py-20">
        <div className="site-container">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-walnut">
              Benzer Seçimler
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-obsidian md:text-5xl">
              Aynı Güvenlik Dilinden.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {fallbackRelated.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="site-container grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-walnut">
              Ürün Açıklaması
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-none text-obsidian md:text-5xl">
              Teknik detay, günlük kullanımda sessiz kalır.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              {product.description} Gizli bölme mimarisi; renk, ölçü, mekanizma
              ve teslimat planına göre satış temsilcisiyle netleştirilir.
            </p>
          </div>
          <div className="grid gap-3">
            {product.technicalSpecs.map((spec) => (
              <div
                key={spec.label}
                className="premium-card grid gap-2 rounded-md border border-obsidian/10 bg-white p-5 sm:grid-cols-[150px_1fr]"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                  {spec.label}
                </span>
                <span className="text-sm font-semibold leading-6 text-obsidian">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone py-20">
        <div className="site-container">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-walnut">
              Birlikte Satın Alınanlar
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-obsidian md:text-5xl">
              Aynı alanda birlikte düşünün.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {bundled.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian py-20 text-cream">
        <div className="site-container grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-bronze">
              Kullanıcı Yorumları
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-none md:text-5xl">
              Gerçek deneyimler için hazır alan.
            </h2>
          </div>
          <div className="rounded-md border border-bronze/20 bg-white/[0.06] p-6">
            <p className="text-base leading-8 text-stone/78">
              Bu bölüm sahte yorum üretmeden hazırlandı. Gerçek müşteri
              yorumları, onaylı fotoğraflar ve puanlama entegrasyonu geldiğinde
              burada yayınlanabilir.
            </p>
          </div>
        </div>
      </section>

      <RecentlyViewed currentSlug={product.slug} />

      <ContactCTA />
    </>
  );
}
