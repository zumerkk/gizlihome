"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, MessageCircle, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ColorSelector } from "@/components/products/color-selector";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

const favoriteKey = "gizli-home-favorites";

export function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  const price = formatPrice(product.price, product.isCustomQuote);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const favorites = JSON.parse(window.localStorage.getItem(favoriteKey) ?? "[]") as string[];
        setIsFavorite(favorites.includes(product.id));
      } catch {
        setIsFavorite(false);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [product.id]);

  function toggleFavorite() {
    try {
      const favorites = JSON.parse(window.localStorage.getItem(favoriteKey) ?? "[]") as string[];
      const next = favorites.includes(product.id)
        ? favorites.filter((item) => item !== product.id)
        : [...favorites, product.id];
      window.localStorage.setItem(favoriteKey, JSON.stringify(next));
      setIsFavorite(next.includes(product.id));
    } catch {
      setIsFavorite((current) => !current);
    }
  }

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="premium-card group flex h-full flex-col overflow-hidden rounded-md border border-obsidian/10 bg-white shadow-[0_20px_60px_rgba(17,17,17,0.06)]"
    >
      <div className="relative aspect-[4/4.5] overflow-hidden bg-stone">
        <Link
          href={`/urunler/${product.slug}`}
          className="absolute inset-0"
          aria-label={`${product.name} detaylarını gör`}
        >
          <Image
            src={product.images[0]}
            alt={`${product.name} ürün görseli`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/68 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="card-shine" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.isNew ? (
              <span className="rounded-md bg-cream px-3 py-1 text-xs font-bold text-obsidian">
                Yeni
              </span>
            ) : null}
            <span className="rounded-md bg-obsidian px-3 py-1 text-xs font-bold text-cream">
              {product.stockStatus}
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={toggleFavorite}
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-md border border-white/15 bg-obsidian/72 text-cream backdrop-blur transition hover:border-bronze hover:text-bronze"
          aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
        >
          <Heart
            className={cn(
              "h-5 w-5",
              isFavorite && "fill-bronze text-bronze",
            )}
          />
        </button>

        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="absolute bottom-4 left-4 right-4 z-10 inline-flex h-11 translate-y-3 items-center justify-center gap-2 rounded-md border border-bronze/35 bg-obsidian/80 px-4 text-sm font-semibold text-cream opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              aria-label={`${product.name} hızlı incele`}
            >
              <Eye className="h-4 w-4 text-bronze" />
              Hızlı Bakış
            </button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <DialogTitle className="sr-only">{product.name} hızlı bakış</DialogTitle>
            <DialogDescription className="sr-only">
              Ürün görseli, renk, ölçü ve sipariş seçenekleri
            </DialogDescription>
            <div className="grid overflow-hidden rounded-md bg-cream md:grid-cols-[0.94fr_1.06fr]">
              <div className="relative min-h-[360px] bg-stone md:min-h-[560px]">
                <Image
                  src={product.images[0]}
                  alt={`${product.name} hızlı bakış görseli`}
                  fill
                  sizes="(max-width: 768px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-bronze">
                  {product.collection}
                </p>
                <h2 className="mt-3 font-serif text-5xl font-semibold leading-none text-obsidian">
                  {product.name}
                </h2>
                <p className="mt-3 text-sm font-semibold text-walnut">
                  {product.category}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {product.description}
                </p>
                <p className="mt-5 font-serif text-4xl font-semibold text-obsidian">
                  {price}
                </p>

                <div className="mt-6">
                  <ColorSelector
                    colors={product.colors}
                    selectedColor={selectedColor}
                    onChange={setSelectedColor}
                    compact
                  />
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    Ölçü / Varyasyon
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "rounded-md border px-3 py-2 text-xs font-bold transition",
                          selectedSize === size
                            ? "border-bronze bg-obsidian text-cream"
                            : "border-obsidian/10 bg-white text-obsidian hover:border-bronze/45",
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <AddToCartButton
                    product={product}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                    className="w-full"
                  >
                    <ShoppingBag className="h-4 w-4 text-bronze" />
                    Sepete Ekle
                  </AddToCartButton>
                  <WhatsAppButton
                    productName={product.name}
                    productPrice={price}
                    selectedColor={selectedColor}
                    variant="light"
                    className="w-full"
                  >
                    <MessageCircle className="h-4 w-4 text-bronze" />
                    WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-bronze">
              {product.collection}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-obsidian">
              {product.name}
            </h3>
          </div>
          <p className="shrink-0 font-serif text-2xl font-semibold text-obsidian">
            {price}
          </p>
        </div>
        <p className="mt-1 text-sm font-semibold text-walnut">
          {product.category}
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          {product.shortDescription}
        </p>

        <div className="mt-5">
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onChange={setSelectedColor}
            compact
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-bold transition",
                selectedSize === size
                  ? "border-bronze bg-obsidian text-cream"
                  : "border-obsidian/10 bg-cream text-obsidian hover:border-bronze/45",
              )}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-end gap-3">
          {product.oldPrice ? (
            <p className="pb-1 text-sm text-muted line-through">
              {formatPrice(product.oldPrice)}
            </p>
          ) : null}
        </div>

        <div className="mt-auto grid gap-3 pt-6">
          <AddToCartButton
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            className="w-full"
          >
            <ShoppingBag className="h-4 w-4 text-bronze" />
            Sepete Ekle
          </AddToCartButton>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild variant="light" size="md">
              <Link href={`/urunler/${product.slug}`}>
                <Eye className="h-4 w-4" />
                Detay
              </Link>
            </Button>
          <WhatsAppButton
            productName={product.name}
            productPrice={price}
            selectedColor={selectedColor}
            size="md"
            aria-label={`${product.name} için WhatsApp'tan bilgi al`}
          >
            <MessageCircle className="h-4 w-4" />
            {product.isCustomQuote ? "Teklif Al" : "Bilgi Al"}
          </WhatsAppButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
