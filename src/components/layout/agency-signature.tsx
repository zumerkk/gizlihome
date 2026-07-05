import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function AgencySignature() {
  return (
    <Link
      href="https://zmkagency.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ZMK Agency web sitesini aç"
      className="agency-signature group mt-12 block overflow-hidden rounded-md border border-bronze/25 bg-obsidian p-5 text-cream shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
    >
      <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-md border border-bronze/35 bg-white/[0.03]">
            <Sparkles className="h-6 w-6 text-bronze" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-bronze">
              Dijital İmza
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold leading-none md:text-4xl">
              ZMK Agency ürünüdür.
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-stone/68">
              Yazılım, reklam ve dijital dönüşüm üretimi.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Image
            src="/images/brand/zmk-agency-logo.png"
            alt="ZMK Agency"
            width={765}
            height={423}
            sizes="(max-width: 768px) 180px, 240px"
            className="h-16 w-auto object-contain opacity-92 transition duration-300 group-hover:opacity-100 md:h-20"
          />
          <span className="hidden h-12 w-12 place-items-center rounded-md border border-bronze/35 text-bronze transition duration-300 group-hover:translate-x-1 group-hover:border-bronze md:grid">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
