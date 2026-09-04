"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useState, ViewTransition } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Logo } from "@/components/common/logo";
import { ColorSelector } from "@/components/products/color-selector";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  sharedTransition = false,
  eagerImage = false,
}: {
  product: Product;
  sharedTransition?: boolean;
  eagerImage?: boolean;
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const selectedSize = product.sizes[0];
  const selectedImage = product.colorImages?.[selectedColor]?.[0] ?? product.images[0];

  return (
    <article
      data-reveal="up"
      data-tilt="true"
      className="group relative flex h-full flex-col overflow-hidden rounded-md border border-obsidian/10 bg-white shadow-[0_18px_52px_rgba(17,17,17,0.06)] hover:shadow-[0_28px_80px_rgba(17,17,17,0.12)]"
    >
      <Link
        href={`/urunler/${product.slug}`}
        transitionTypes={["product-forward"]}
        className="relative block aspect-[4/4.6] overflow-hidden bg-stone"
        aria-label={`${product.name} detaylarını gör`}
      >
        {sharedTransition ? (
          <ViewTransition
            name={`product-${product.id}`}
            share="product-morph"
            default="none"
          >
            <Image
              src={selectedImage}
              alt={`${product.name} ürün görseli`}
              fill
              loading={eagerImage ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-[1.035]"
            />
          </ViewTransition>
        ) : (
          <Image
            src={selectedImage}
            alt={`${product.name} ürün görseli`}
            fill
            loading={eagerImage ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
          />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-obsidian/54 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.isNew ? (
            <span className="rounded-sm bg-bronze px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-obsidian">
              Yeni
            </span>
          ) : null}
          {product.campaignLabel ? (
            <span className="rounded-sm bg-[#ff6f35] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">
              {product.campaignLabel}
            </span>
          ) : null}
          <span className="rounded-sm border border-white/20 bg-obsidian/72 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cream backdrop-blur">
            {product.stockStatus}
          </span>
        </span>
        <span className="absolute bottom-4 left-4 rounded-sm border border-white/15 bg-obsidian/72 px-2.5 py-1.5 backdrop-blur">
          <Logo href="" tone="dark" className="origin-left scale-[0.58]" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-bronze">
              {product.sku}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-semibold leading-none text-obsidian">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="font-serif text-3xl font-semibold leading-none text-obsidian">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice ? (
              <p className="mt-1 text-xs font-semibold text-muted line-through">
                {formatPrice(product.oldPrice)}
              </p>
            ) : null}
          </div>
        </div>

        <p className="mt-3 text-sm font-bold text-walnut">{product.category}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
          {product.shortDescription}
        </p>
        <p className="mt-3 text-xs font-semibold text-muted">
          Ölçü: {selectedSize}
        </p>

        <div className="mt-5">
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onChange={setSelectedColor}
          />
        </div>

        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-6">
          <AddToCartButton
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            className="w-full"
          >
            <ShoppingBag className="h-4 w-4 text-bronze" />
            Sepete Ekle
          </AddToCartButton>
          <Button asChild variant="light" size="icon">
            <Link
              href={`/urunler/${product.slug}`}
              transitionTypes={["product-forward"]}
              aria-label={`${product.name} detayları`}
            >
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
