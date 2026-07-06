"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

const campaigns = [
  {
    id: "nova-night-01",
    eyebrow: "NOVA NIGHT 01",
    title: "Komodin gibi görünür. Size özel açılır.",
    description:
      "Üst kapaklı gizli bölme, LED iç aydınlatma ve NFC erişim opsiyonuyla yatak odasında görünmeyen güvenlik.",
    image: "/images/generated/banner-nova-night-01.webp",
    href: "/urunler/nova-night-01-gizli-bolmeli-komodin",
    cta: "NOVA NIGHT 01'i İncele",
  },
  {
    id: "nova-wall-01",
    eyebrow: "NOVA WALL 01",
    title: "Duvarda raf. İçeride güvenli alan.",
    description:
      "Minimal raf görünümü, sıcak LED iç hacim ve gizli mekanizma ile duvar dekorasyonunu güvenlikle birleştirir.",
    image: "/images/generated/banner-nova-wall-01.webp",
    href: "/urunler/nova-wall-01-gizli-bolmeli-raf",
    cta: "NOVA WALL 01'i İncele",
  },
  {
    id: "nova-03-pulse",
    eyebrow: "NOVA 03 PULSE",
    title: "Akıllı teknoloji. Estetik tasarım.",
    description:
      "LED cam üst yüzey, NFC erişim opsiyonu ve geniş gizli güvenlik alanıyla premium akıllı komodin.",
    image: "/images/generated/banner-nova-03-pulse.webp",
    href: "/urunler/nova-03-pulse-akilli-gizli-bolmeli-komodin",
    cta: "NOVA 03 PULSE'u İncele",
  },
  {
    id: "nova-cube",
    eyebrow: "NOVA CUBE",
    title: "Işıklı form. Gizli alan. Sade güç.",
    description:
      "LED ambiyanslı küp komodin formunda, gizli bölme ve kontrollü erişim hissini premium yatak odasına taşır.",
    image: "/images/generated/banner-nova-cube.webp",
    href: "/urunler/nova-cube-isikli-gizli-bolmeli-komodin",
    cta: "NOVA CUBE'u İncele",
  },
  {
    id: "nova-lite",
    eyebrow: "NOVA LITE",
    title: "NFC erişim. LED hacim. Koyu zarafet.",
    description:
      "Kompakt komodin gövdesinde NFC kartlı gizli bölme, mavi LED iç hacim ve iki çekmeceli kullanım.",
    image: "/images/generated/banner-nova-lite.webp",
    href: "/urunler/nova-lite-nfcli-gizli-bolmeli-akilli-komodin",
    cta: "NOVA LITE'ı İncele",
  },
  {
    id: "nova-slide",
    eyebrow: "NOVA SLIDE",
    title: "Ceviz sıcaklığı. Gizli teknoloji.",
    description:
      "Ceviz çıtalı yan yüzey, antrasit çekmece dili ve LED aydınlatmalı gizli bölme tek gövdede buluşur.",
    image: "/images/generated/banner-nova-slide.webp",
    href: "/urunler/nova-slide-nfcli-gizli-bolmeli-komodin",
    cta: "NOVA SLIDE'ı İncele",
  },
];

export function CampaignBanners() {
  const [active, setActive] = useState(0);
  const campaign = campaigns[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % campaigns.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="icerik" className="bg-obsidian py-5 text-cream">
      <div className="wide-container">
        <div className="premium-card relative min-h-[520px] overflow-hidden rounded-md border border-bronze/20 bg-charcoal md:min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={campaign.image}
                alt={`${campaign.title} kampanya görseli`}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.91),rgba(17,17,17,0.48),rgba(17,17,17,0.18))]" />
              <div className="hero-scan opacity-45" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex min-h-[520px] max-w-2xl flex-col justify-center p-6 md:min-h-[460px] md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-bronze">
                  {campaign.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-5xl font-semibold leading-[0.92] md:text-7xl">
                  {campaign.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-stone/78 md:text-lg">
                  {campaign.description}
                </p>
                <div className="mt-8">
                  <Button asChild size="lg">
                    <Link href={campaign.href}>
                      {campaign.cta}
                      <ArrowUpRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-5 left-6 z-10 flex gap-2 md:left-12">
            {campaigns.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:border-bronze/50"
                aria-label={`${item.eyebrow} kampanyasını göster`}
              >
                <Circle
                  className={`h-2.5 w-2.5 ${
                    active === index ? "fill-bronze text-bronze" : "text-stone/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
