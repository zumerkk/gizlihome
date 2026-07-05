"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="premium-dark-band bg-obsidian py-18 text-cream md:py-20">
      <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-bronze">
            E-bülten
          </p>
          <h2 className="mt-3 font-serif text-5xl font-semibold leading-none md:text-6xl">
            Yeni koleksiyonları ilk siz görün.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-stone/74">
            Gizli mekanizma, yeni yüzey ve proje duyuruları için sade bir bülten.
            Kampanya baskısı yok, sadece iyi tasarlanmış güncellemeler.
          </p>
        </div>

        <form
          className="rounded-md border border-bronze/20 bg-white/[0.06] p-4 backdrop-blur md:p-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone/72">
              E-posta adresiniz
            </span>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <span className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-bronze" />
                <input
                  type="email"
                  required
                  placeholder="ornek@mail.com"
                  className="h-14 w-full rounded-md border border-white/12 bg-obsidian/55 pl-12 pr-4 text-sm font-semibold text-cream placeholder:text-stone/46"
                />
              </span>
              <Button type="submit" size="lg">
                Kaydol
              </Button>
            </div>
          </label>
          <p className="mt-3 text-xs leading-5 text-stone/60">
            {submitted
              ? "Kaydınız alındı. Bülten entegrasyonu için alan hazır."
              : "KVKK ve pazarlama izinleri production entegrasyonunda genişletilebilir."}
          </p>
        </form>
      </div>
    </section>
  );
}
