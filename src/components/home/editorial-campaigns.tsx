import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blocks = [
  {
    title: "Özel üretim, yüzeyin altında başlar.",
    eyebrow: "Custom Lab",
    image: "/images/generated/banner-private-office.webp",
    href: "/ozel-uretim",
    cta: "Özel Üretimi İncele",
  },
  {
    title: "Villa projelerinde mobilya, güvenlik mimarisine dönüşür.",
    eyebrow: "Proje Çözümleri",
    image: "/images/generated/banner-villa-project.webp",
    href: "/proje-cozumleri",
    cta: "Proje Başlat",
  },
];

export function EditorialCampaigns() {
  return (
    <section className="bg-obsidian py-20 text-cream">
      <div className="site-container grid gap-5 lg:grid-cols-2">
        {blocks.map((block) => (
          <article
            key={block.title}
            data-reveal="up"
            data-tilt="true"
            className="premium-card group relative min-h-[480px] overflow-hidden rounded-md border border-bronze/20 bg-charcoal"
          >
            <Image
              src={block.image}
              alt={`${block.title} görseli`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
            <div className="card-shine" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-bronze">
                {block.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-none md:text-5xl">
                {block.title}
              </h2>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link href={block.href}>
                    {block.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
