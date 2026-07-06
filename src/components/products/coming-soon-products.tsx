import Image from "next/image";
import { Clock3, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { comingSoonProducts } from "@/data/products";

export function ComingSoonProducts() {
  return (
    <section
      id="cok-yakinda"
      className="mt-16 scroll-mt-28 rounded-md border border-obsidian/10 bg-obsidian p-5 text-cream md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Çok Yakında"
          title="Sıradaki gizli mekanizmalar hazırlanıyor."
          description="Şu an aktif NOVA ürünleri listeleniyor. Sehpa, TV ünitesi, konsol, ofis ve villa proje ürünleri çok yakında katalogda yerini alacak."
          dark
        />
        <WhatsAppButton
          variant="outline"
          customMessage="Merhaba, GİZLİ HOME çok yakında çıkacak gizli mobilya ürünleri hakkında bilgi almak istiyorum."
          className="shrink-0"
        >
          <Sparkles className="h-4 w-4 text-bronze" />
          Ön Bilgi Al
        </WhatsAppButton>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {comingSoonProducts.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-md border border-white/10 bg-white/[0.055]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
              <Image
                src={item.image}
                alt={`${item.name} çok yakında GİZLİ HOME`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-72 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md border border-bronze/35 bg-obsidian/82 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-bronze">
                <Clock3 className="h-3.5 w-3.5" />
                Çok Yakında
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                {item.collection} / {item.category}
              </p>
              <h3 className="mt-3 font-serif text-3xl font-semibold leading-none">
                {item.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-stone/74">
                {item.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-md border border-bronze/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-stone/72"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
