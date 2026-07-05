"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Layers, MessageCircle, ShieldCheck, Truck, Wifi } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

const trustItems = [
  { label: "NFC Kartlı Sistem", icon: Wifi },
  { label: "Gizli Bölmeli Tasarım", icon: Layers },
  { label: "Özel Üretim Seçeneği", icon: ShieldCheck },
  { label: "Türkiye Geneli Teslimat", icon: Truck },
];

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 0.32], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 0.24], [0, -34]);

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-obsidian text-cream">
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image
          src="/images/generated/hero-premium.webp"
          alt="GİZLİ HOME gizli bölmeli premium mobilya atmosferi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right opacity-62"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.92),rgba(17,17,17,0.62),rgba(17,17,17,0.22))]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-obsidian to-transparent" />
      <div className="hero-scan" />
      <div className="hero-frame hidden md:block" />

      <motion.div
        className="site-container relative z-10 flex min-h-[calc(100vh-80px)] flex-col justify-center py-20"
        style={{ y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.36em] text-bronze">
            GİZLİ HOME
          </p>
          <h1 className="mt-5 font-serif text-6xl font-semibold leading-[0.86] text-balance md:text-8xl">
            Görünmeyen Güvenlik.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone/82 md:text-xl">
            GİZLİ HOME; gizli dolap, gizli mobilya, şifreli mobilya ve
            NFC kartlı komodin çözümlerini premium tasarımla buluşturur.
            Dışarıdan bir mobilya. İçeride sadece size ait bir alan.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/koleksiyonlar">Koleksiyonları Keşfet</Link>
            </Button>
            <WhatsAppButton variant="outline" size="lg">
              <MessageCircle className="h-5 w-5 text-bronze" />
              WhatsApp&apos;tan Bilgi Al
            </WhatsAppButton>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["NFC", "Kartlı erişim"],
              ["0", "Online ödeme"],
              ["TR", "Türkiye geneli"],
            ].map(([value, label]) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3 }}
                className="rounded-md border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
              >
                <p className="font-serif text-3xl font-semibold text-bronze">
                  {value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone/70">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 + index * 0.07 }}
              className="flex min-h-16 items-center gap-3 rounded-md border border-white/10 bg-white/6 px-4 backdrop-blur"
            >
              <item.icon className="h-5 w-5 text-bronze" />
              <span className="text-sm font-semibold text-stone">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <a
          href="#icerik"
          className="absolute bottom-7 left-0 hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-stone/72 md:flex"
        >
          Aşağı Kaydır
          <ArrowDown className="h-4 w-4 animate-bounce text-bronze" />
        </a>
      </motion.div>
    </section>
  );
}
