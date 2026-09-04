"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { brand } from "@/data/site";

const images = [
  {
    id: "security",
    src: "/images/generated/social-01.webp",
    alt: "NFC kartlı gizli mobilya detay görseli",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "furniture",
    src: "/images/generated/social-02.webp",
    alt: "Bronz ışıklı gizli bölme yakın planı",
  },
  {
    id: "access",
    src: "/images/generated/social-03.webp",
    alt: "Premium yatak odasında kapalı komodin",
  },
  {
    id: "shelf",
    src: "/images/generated/social-04.webp",
    alt: "Duvar panelinde gizli raf açılışı",
  },
  {
    id: "feature",
    src: "/images/generated/social-05.webp",
    alt: "Yönetici masası gizli belge alanı",
  },
  {
    id: "security-detail",
    src: "/images/generated/social-06.webp",
    alt: "Koyu ahşap bronz detay ve NFC cihazı malzeme çekimi",
  },
];

export function InstagramGrid() {
  return (
    <section className="bg-cream py-20">
      <div className="site-container">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-walnut">
              Instagram
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-none text-obsidian md:text-6xl">
              GİZLİ HOME&apos;u Yakından Keşfedin.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              Üretimden gizli açılış anlarına, yeni koleksiyonlardan özel
              projelere kadar tüm detaylar Instagram&apos;da.
            </p>
          </div>
          <Button asChild variant="dark">
            <Link href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">
              <Camera className="h-4 w-4 text-bronze" />
              Instagram&apos;da Takip Et
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid auto-rows-[minmax(160px,1fr)] grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -7 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className={image.className}
            >
              <Link
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-tilt="true"
                className="premium-card group relative block aspect-square overflow-hidden rounded-md bg-stone"
                aria-label={`${brand.instagram} Instagram profilini aç`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-obsidian/0 transition duration-500 group-hover:bg-obsidian/20" />
                <div className="card-shine" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
