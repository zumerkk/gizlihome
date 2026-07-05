"use client";

import Link from "next/link";
import { CreditCard, MessageCircle, PackageCheck, Ruler, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ColorSelector } from "@/components/products/color-selector";
import { FeatureList } from "@/components/common/feature-list";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductInfo({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const price = formatPrice(product.price, product.isCustomQuote);

  return (
    <aside className="lg:sticky lg:top-28">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-bronze">
        {product.collection} Koleksiyonu
      </p>
      <h1 className="mt-3 font-serif text-5xl font-semibold leading-none text-obsidian md:text-6xl">
        {product.name}
      </h1>
      <p className="mt-4 text-lg font-semibold text-walnut">
        {product.category}
      </p>
      <p className="mt-5 text-base leading-8 text-muted">
        {product.description}
      </p>

      <div className="mt-7 flex flex-wrap items-end gap-3 border-y border-obsidian/10 py-6">
        <p className="font-serif text-5xl font-semibold text-obsidian">
          {price}
        </p>
        {product.oldPrice ? (
          <p className="pb-2 text-base text-muted line-through">
            {formatPrice(product.oldPrice)}
          </p>
        ) : null}
        <span className="rounded-md border border-bronze/35 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-walnut">
          {product.stockStatus}
        </span>
      </div>

      <div className="mt-7">
        <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-obsidian">
          Renk Seçimi
        </h2>
        <div className="mt-3">
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onChange={setSelectedColor}
          />
        </div>
      </div>

      <div className="mt-7">
        <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-obsidian">
          Ölçü / Varyasyon
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm font-bold transition",
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

      <div className="mt-7">
        <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-obsidian">
          Öne Çıkan Özellikler
        </h2>
        <div className="mt-4">
          <FeatureList items={product.features} />
        </div>
      </div>

      <div className="mt-7">
        <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-obsidian">
          Teknik Özellikler
        </h2>
        <div className="mt-4 grid gap-2 rounded-md border border-obsidian/10 bg-white p-4">
          {product.technicalSpecs.map((spec) => (
            <div
              key={spec.label}
              className="grid gap-1 border-b border-obsidian/10 py-3 last:border-b-0 sm:grid-cols-[130px_1fr]"
            >
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                {spec.label}
              </span>
              <span className="text-sm font-semibold leading-6 text-obsidian">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {[
          {
            icon: Truck,
            title: "Kargo",
            text: "Teslimat planı konuma ve stok durumuna göre paylaşılır.",
          },
          {
            icon: PackageCheck,
            title: "İade / Değişim",
            text: "Ürün tipi ve özel üretim durumuna göre temsilci bilgilendirir.",
          },
          {
            icon: ShieldCheck,
            title: "Güvenli Süreç",
            text: "Sipariş ve ödeme bilgileri yazılı WhatsApp görüşmesinde netleşir.",
          },
          {
            icon: CreditCard,
            title: "Ödeme",
            text: "Online kredi kartı tahsilatı bu aşamada aktif değildir.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="premium-card rounded-md border border-obsidian/10 bg-white p-4"
          >
            <item.icon className="h-5 w-5 text-bronze" />
            <h3 className="mt-3 font-semibold text-obsidian">{item.title}</h3>
            <p className="mt-1 text-xs font-semibold leading-5 text-muted">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-4 rounded-md border border-obsidian/10 bg-white p-5">
        <div>
          <h2 className="font-semibold text-obsidian">Teslimat</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {product.deliveryInfo}
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-obsidian">Ödeme</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {product.paymentInfo}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_1fr]">
        <AddToCartButton
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          size="lg"
          className="w-full"
        >
          <ShoppingBag className="h-5 w-5 text-bronze" />
          Sepete Ekle
        </AddToCartButton>
        <WhatsAppButton
          productName={`${product.name} ${product.category}`}
          productPrice={price}
          selectedColor={selectedColor}
          size="lg"
          className="w-full"
          aria-label={`${product.name} için WhatsApp'tan sipariş ver`}
        >
          <MessageCircle className="h-5 w-5" />
          {product.isCustomQuote ? "WhatsApp'tan Teklif Al" : "WhatsApp'tan Sipariş Ver"}
        </WhatsAppButton>
      </div>
      <div className="mt-3">
        <Link
          href="/ozel-uretim"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-obsidian/10 bg-white px-5 text-sm font-semibold text-obsidian transition hover:border-bronze/45"
        >
          <Ruler className="h-4 w-4 text-bronze" />
          Özel ölçü ister misiniz?
        </Link>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bronze/25 bg-obsidian/96 p-3 text-cream backdrop-blur lg:hidden">
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold uppercase tracking-[0.16em] text-stone/68">
              {product.name}
            </p>
            <p className="font-serif text-2xl font-semibold leading-none">
              {price}
            </p>
          </div>
          <div className="flex gap-2">
            <AddToCartButton
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              size="sm"
              variant="light"
            >
              <ShoppingBag className="h-4 w-4" />
              Ekle
            </AddToCartButton>
            <WhatsAppButton
              productName={`${product.name} ${product.category}`}
              productPrice={price}
              selectedColor={selectedColor}
              size="sm"
            >
              <MessageCircle className="h-4 w-4" />
              Sor
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </aside>
  );
}
