"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

const options = [
  {
    id: "bedroom",
    label: "Yatak Odası",
    result: "NOVA CUBE, NOVA LITE ve NOVA SLIDE yatak odası için en güçlü seçenekler.",
    href: "/urunler?collection=NOVA",
  },
  {
    id: "living",
    label: "Salon",
    result: "NOVA SLIDE ve yakında gelecek salon çözümleri bu akışa daha iyi oturur.",
    href: "/urunler?collection=NOVA",
  },
  {
    id: "office",
    label: "Ofis",
    result: "PRIVATE ofis çözümleri çok yakında. Şimdiden proje görüşmesi başlatabilirsiniz.",
    href: "/ozel-uretim",
  },
  {
    id: "project",
    label: "Villa / Proje",
    result: "ATLAS ve CUSTOM LAB tarafında proje görüşmesi önerilir.",
    href: "/proje-cozumleri",
  },
];

export function StyleFinder() {
  const [selected, setSelected] = useState(options[0].id);
  const active = useMemo(
    () => options.find((option) => option.id === selected) ?? options[0],
    [selected],
  );

  return (
    <section className="bg-stone py-20">
      <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-walnut">
            Koleksiyonunu Keşfet
          </p>
          <h2 className="mt-3 font-serif text-5xl font-semibold leading-none text-obsidian md:text-6xl">
            Tarzını seç. Gizli katmanını bul.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            Kullanıcıyı yormadan doğru ürün grubuna yönlendiren hızlı öneri alanı.
            Seçim sonrası ürünleri inceleyebilir veya doğrudan WhatsApp&apos;tan danışabilirsiniz.
          </p>
        </div>

        <div className="premium-card overflow-hidden rounded-md border border-obsidian/10 bg-white p-5 shadow-[0_20px_70px_rgba(17,17,17,0.08)]">
          <div className="grid gap-3 sm:grid-cols-2">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelected(option.id)}
                className={`flex min-h-16 items-center justify-between rounded-md border px-4 text-left text-sm font-bold transition ${
                  selected === option.id
                    ? "border-bronze bg-obsidian text-cream"
                    : "border-obsidian/10 bg-cream text-obsidian hover:border-bronze/45"
                }`}
              >
                {option.label}
                {selected === option.id ? <Check className="h-4 w-4 text-bronze" /> : null}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-md border border-bronze/25 bg-obsidian p-5 text-cream">
            <div className="flex items-center gap-2 text-bronze">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.24em]">
                Öneri
              </span>
            </div>
            <p className="mt-4 font-serif text-4xl font-semibold leading-none">
              {active.result}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={active.href}>
                  Önerilenleri Gör
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <WhatsAppButton
                variant="outline"
                customMessage={`Merhaba, GİZLİ HOME web sitesinde ${active.label} için ürün önerisi almak istiyorum.`}
              >
                WhatsApp&apos;tan Danış
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
