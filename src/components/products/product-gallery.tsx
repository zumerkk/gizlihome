"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="grid content-start gap-4 self-start">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group relative aspect-[4/4.6] overflow-hidden rounded-md bg-stone"
            aria-label={`${productName} görselini büyüt`}
          >
            <Image
              src={active}
              alt={`${productName} büyük ürün görseli`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/18 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <span className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-obsidian text-cream opacity-90 transition group-hover:bg-bronze group-hover:text-obsidian">
              <ZoomIn className="h-5 w-5" />
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="bg-obsidian p-3">
          <DialogTitle className="sr-only">{productName} galeri</DialogTitle>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src={active}
              alt={`${productName} yakın görünüm`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(image)}
            aria-label={`${productName} ${index + 1}. görseli seç`}
            className={cn(
              "relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-md border bg-stone md:w-auto",
              active === image ? "border-bronze" : "border-obsidian/10",
            )}
          >
            <Image
              src={image}
              alt={`${productName} küçük ürün görseli ${index + 1}`}
              fill
              sizes="(max-width: 768px) 30vw, 12vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
