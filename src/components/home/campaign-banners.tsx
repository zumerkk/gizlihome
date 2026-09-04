import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgePercent, Flame, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CampaignBanners() {
  return (
    <section className="relative overflow-hidden bg-[#3a140c] py-5 text-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background:
            "radial-gradient(circle at 12% 20%, rgba(255,112,53,.42), transparent 34%), radial-gradient(circle at 82% 70%, rgba(181,138,82,.34), transparent 32%)",
        }}
      />
      <div className="wide-container relative">
        <article className="group relative min-h-[560px] overflow-hidden rounded-md border border-[#ff7a3d]/55 bg-obsidian shadow-[0_30px_120px_rgba(107,28,8,0.55)] md:min-h-[500px]">
          <Image
            src="/images/products/nova-night/nova-night-safir-mese-open.webp"
            alt="NOVA NIGHT 01 lansman kampanyası"
            fill
            sizes="100vw"
            className="object-cover object-center transition duration-1000 group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,.97)_0%,rgba(17,17,17,.84)_42%,rgba(17,17,17,.3)_72%,rgba(17,17,17,.15)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff5f1f] via-[#ffb36c] to-[#ff5f1f]" />

          <div className="relative z-10 flex min-h-[560px] max-w-3xl flex-col justify-center p-6 md:min-h-[500px] md:p-12">
            <div className="flex w-fit items-center gap-2 rounded-full border border-[#ff8a4c]/45 bg-[#ff5f1f]/20 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#ffb987] backdrop-blur-md">
              <Flame className="h-4 w-4 fill-current" />
              Lansmana Özel
            </div>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.34em] text-bronze">
              NOVA NIGHT 01 · İlk 100 Adet
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-5xl font-semibold leading-[0.88] md:text-7xl">
              Gizli alan.
              <span className="block text-[#ff9a62]">Çarpıcı lansman fiyatı.</span>
            </h2>

            <div className="mt-7 flex flex-wrap items-end gap-x-5 gap-y-2">
              <span className="font-serif text-6xl font-semibold leading-none text-white md:text-8xl">
                6.499 ₺
              </span>
              <span className="pb-2 text-xl font-bold text-stone/55 line-through">
                9.990 ₺
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-stone/78">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2 backdrop-blur">
                <BadgePercent className="h-4 w-4 text-[#ff9a62]" />
                3.491 ₺ lansman avantajı
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2 backdrop-blur">
                <PackageCheck className="h-4 w-4 text-bronze" />
                100 adetle sınırlı özel fiyat
              </span>
            </div>

            <div className="mt-8">
              <Button asChild size="lg" className="bg-[#ff7a3d] text-white hover:bg-[#ff945f]">
                <Link href="/urunler/nova-night-01-gizli-bolmeli-komodin">
                  Lansman Ürününü İncele
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
