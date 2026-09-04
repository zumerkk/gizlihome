"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, CreditCard, MessageCircle, Radio, Sparkles } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 44]);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 22, mass: 0.45 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 22, mass: 0.45 });

  function moveProduct(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rawRotateX.set(y * -2.4);
    rawRotateY.set(x * 3.2);
  }

  function resetProduct() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <section ref={heroRef} className="relative min-h-[calc(100svh-80px)] overflow-hidden bg-obsidian text-cream">
      <div className="hero-aurora hero-aurora-one" aria-hidden="true" />
      <div className="hero-aurora hero-aurora-two" aria-hidden="true" />
      <div className="hero-technical-grid" aria-hidden="true" />
      <div className="site-container grid min-h-[calc(100svh-80px)] items-center gap-8 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.36em] text-bronze"
          >
            <span className="inline-block h-px w-8 bg-bronze" />
            Akıllı Güvenlik Mobilyaları
          </motion.p>
          <h1 className="mt-5 font-serif text-6xl font-semibold leading-[0.86] md:text-8xl">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Görünenden
            </motion.span>
            <motion.span
              className="block text-bronze"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              fazlası.
            </motion.span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-stone/78">
            Dışarıdan kusursuz bir mobilya. İçeride NFC kartınızla açılan, yalnızca size ait sessiz bir alan.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#koleksiyon">
                Modelleri Keşfet
                <ArrowDown className="h-4 w-4" />
              </Link>
            </Button>
            <WhatsAppButton variant="outline" size="lg">
              <MessageCircle className="h-5 w-5 text-bronze" />
              Tasarım Danışmanına Sor
            </WhatsAppButton>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-white/10 py-5">
            {[
              ["4", "İmza model"],
              ["2 yıl", "Ürün garantisi"],
              ["Shopier", "Güvenli ödeme"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`px-4 first:pl-0 ${index ? "border-l border-white/10" : ""}`}
              >
                <p className="font-serif text-2xl font-semibold text-cream md:text-3xl">
                  {value}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-stone/55">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          onPointerMove={moveProduct}
          onPointerLeave={resetProduct}
          style={{ rotateX, rotateY, transformPerspective: 1400 }}
          className="hero-product-stage relative mx-auto aspect-[4/5] w-full max-w-[680px] overflow-hidden rounded-md border border-white/10 bg-charcoal"
        >
          <motion.div style={{ y: reduceMotion ? 0 : imageY }} className="absolute -inset-5">
            <Image
              src="/images/products/studio/nova-cube-v2/antrasit-gizli-bolme.webp"
              alt="GİZLİ HOME NOVA CUBE NFC kartlı gizli bölmeli komodin"
              fill
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/74 via-transparent to-transparent" />
          <div className="hero-frame" />
          <div className="absolute left-5 top-5 rounded-sm border border-white/15 bg-obsidian/70 px-3 py-2 backdrop-blur">
            <Logo href="" tone="dark" className="origin-left scale-[0.72]" />
          </div>
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 top-5 hidden items-center gap-2 rounded-full border border-bronze/30 bg-obsidian/72 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-stone backdrop-blur-md sm:flex"
          >
            <Radio className="h-3.5 w-3.5 text-bronze" />
            NFC Active
          </motion.div>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 rounded-md border border-white/12 bg-obsidian/78 p-5 backdrop-blur-md">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-bronze">
                Lansman / GH-NC-01
              </p>
              <p className="mt-2 font-serif text-4xl font-semibold">NOVA CUBE</p>
              <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-stone/70">
                <CreditCard className="h-4 w-4 text-bronze" />
                10.990 TL · Shopier ile güvenli ödeme
              </p>
            </div>
            <Button asChild size="icon" aria-label="NOVA CUBE detayları">
              <Link href="/urunler/nova-cube-isikli-gizli-bolmeli-komodin">
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 items-center gap-2 text-[9px] font-bold uppercase tracking-[0.24em] text-stone/55 sm:flex">
            <Sparkles className="h-3.5 w-3.5 text-bronze" />
            Silent mechanism
          </div>
        </motion.div>
      </div>
      <motion.a
        href="#koleksiyon"
        aria-label="Koleksiyona kaydır"
        animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] font-bold uppercase tracking-[0.28em] text-stone/45 lg:flex"
      >
        Kaydır
        <span className="h-9 w-px bg-gradient-to-b from-bronze to-transparent" />
      </motion.a>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-bronze/60 to-transparent" />
    </section>
  );
}
