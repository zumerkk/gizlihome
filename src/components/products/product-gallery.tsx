"use client";

import Image from "next/image";
import { Play, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, ViewTransition } from "react";
import { Logo } from "@/components/common/logo";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ProductVideo } from "@/types/product";

type ProductGalleryProps = {
  images: string[];
  videos?: ProductVideo[];
  productId: string;
  productName: string;
};

type GalleryItem =
  | { id: string; type: "image"; src: string; label: string }
  | { id: string; type: "video"; src: string; poster: string; label: string };

function BrandStamp() {
  return (
    <span className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-sm border border-white/15 bg-obsidian/76 px-3 py-2 backdrop-blur-md">
      <Logo href="" tone="dark" className="origin-left scale-[0.72]" />
    </span>
  );
}

export function ProductGallery({ images, videos = [], productId, productName }: ProductGalleryProps) {
  const items = useMemo<GalleryItem[]>(
    () => [
      ...images.map((src, index) => ({
        id: `image-${index}`,
        type: "image" as const,
        src,
        label: `${productName} ürün görseli ${index + 1}`,
      })),
      ...videos.map((video, index) => ({
        id: `video-${index}`,
        type: "video" as const,
        ...video,
      })),
    ],
    [images, productName, videos],
  );
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  return (
    <div data-reveal="left" className="grid content-start gap-4 self-start">
      <AnimatePresence mode="wait" initial={false}>
      {active.type === "video" ? (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-md border border-obsidian/10 bg-obsidian"
        >
          <div className="aspect-[4/4.6]">
            <video
              key={active.src}
              src={active.src}
              poster={active.poster}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
              aria-label={active.label}
            >
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-charcoal px-4 py-3 text-cream">
            <Logo href="" tone="dark" className="origin-left scale-[0.58]" />
            <span className="text-right text-[10px] font-bold uppercase tracking-[0.18em] text-stone/60">
              Ürün filmi
            </span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        ><Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative block aspect-[4/4.6] w-full overflow-hidden rounded-md bg-stone"
              aria-label={`${productName} görselini büyüt`}
            >
              <ViewTransition
                name={`product-${productId}`}
                share="product-morph"
                default="none"
              >
                <Image
                  src={active.src}
                  alt={active.label}
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </ViewTransition>
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/24 via-transparent to-transparent" />
              <BrandStamp />
              <span className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-obsidian text-cream opacity-90 transition group-hover:bg-bronze group-hover:text-obsidian">
                <ZoomIn className="h-5 w-5" />
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-obsidian p-3">
            <DialogTitle className="sr-only">{productName} galeri</DialogTitle>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src={active.src}
                alt={`${productName} yakın görünüm`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog></motion.div>
      )}
      </AnimatePresence>

      <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            aria-label={item.label}
            className={cn(
              "relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-md border bg-stone md:w-auto",
              active.id === item.id ? "border-bronze" : "border-obsidian/10",
            )}
          >
            <Image
              src={item.type === "video" ? item.poster : item.src}
              alt={item.label}
              fill
              sizes="(max-width: 768px) 30vw, 12vw"
              className="object-cover"
            />
            {item.type === "video" ? (
              <span className="absolute inset-0 grid place-items-center bg-obsidian/24">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-obsidian shadow-lg">
                  <Play className="h-4 w-4 fill-current" />
                </span>
              </span>
            ) : (
              <span className="absolute bottom-2 right-2 rounded-sm bg-obsidian/70 px-2 py-1 text-[10px] font-bold text-cream">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs font-semibold leading-5 text-muted">
        Ürün ve prototip çekimleri GİZLİ HOME üretim arşivinden; sahne görselleri gerçek model referanslarıyla hazırlanmıştır.
      </p>
    </div>
  );
}
