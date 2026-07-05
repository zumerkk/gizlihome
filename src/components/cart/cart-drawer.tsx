"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Gift,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { products } from "@/data/products";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const shippingGoal = 15000;

export function CartDrawer() {
  const {
    items,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    checkoutUrl,
  } = useCart();

  const progress = Math.min((subtotal / shippingGoal) * 100, 100);
  const remaining = Math.max(shippingGoal - subtotal, 0);
  const suggestions = products
    .filter((product) => !items.some((item) => item.productId === product.id))
    .slice(0, 2);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Sepet panelini kapat"
            className="fixed inset-0 z-50 bg-obsidian/72 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Sepet paneli"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-[460px] flex-col border-l border-bronze/25 bg-cream shadow-[0_30px_120px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center justify-between border-b border-obsidian/10 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-bronze">
                  Sipariş Paneli
                </p>
                <h2 className="mt-1 font-serif text-4xl font-semibold text-obsidian">
                  Sepetiniz
                </h2>
              </div>
              <Button type="button" variant="dark" size="icon" onClick={closeCart} aria-label="Kapat">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="rounded-md border border-bronze/25 bg-white p-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-bronze" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-obsidian">
                      {remaining === 0
                        ? "Kargo avantajı hedefi tamamlandı."
                        : `${formatPrice(remaining)} daha ekleyin, kargo avantajı hedefini yakalayın.`}
                    </p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone">
                      <div
                        className="h-full rounded-full bg-bronze transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {items.length ? (
                <div className="mt-5 grid gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[86px_1fr] gap-4 rounded-md border border-obsidian/10 bg-white p-3"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-stone">
                        <Image
                          src={item.image}
                          alt={`${item.name} sepet görseli`}
                          fill
                          sizes="86px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-serif text-2xl font-semibold leading-none text-obsidian">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-xs font-semibold text-muted">
                              {item.color} / {item.size}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="grid h-9 w-9 place-items-center rounded-md border border-obsidian/10 text-muted transition hover:border-bronze/45 hover:text-obsidian"
                            aria-label={`${item.name} ürününü sepetten çıkar`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-md border border-obsidian/10">
                            <button
                              type="button"
                              className="grid h-9 w-9 place-items-center"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Adedi azalt"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-8 text-center text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="grid h-9 w-9 place-items-center"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Adedi artır"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="font-serif text-2xl font-semibold text-obsidian">
                            {item.priceLabel}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-md border border-dashed border-obsidian/18 bg-white p-6 text-center">
                  <Sparkles className="mx-auto h-7 w-7 text-bronze" />
                  <p className="mt-3 font-serif text-3xl font-semibold text-obsidian">
                    Sepetiniz henüz boş.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Ürünleri inceleyip renk ve ölçü seçimiyle sipariş paneline ekleyin.
                  </p>
                </div>
              )}

              <div className="mt-5 rounded-md border border-obsidian/10 bg-white p-4">
                <label className="grid gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    Kupon / Proje Kodu
                  </span>
                  <input
                    type="text"
                    placeholder="Varsa kodunuzu yazın"
                    className="h-11 rounded-md border border-obsidian/10 bg-cream px-3 text-sm font-semibold text-obsidian"
                  />
                </label>
              </div>

              {suggestions.length ? (
                <div className="mt-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Gift className="h-4 w-4 text-bronze" />
                    <p className="text-sm font-bold text-obsidian">
                      Akıllı Öneriler
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {suggestions.map((product) => (
                      <div
                        key={product.id}
                        className="grid grid-cols-[74px_1fr] gap-3 rounded-md border border-obsidian/10 bg-white p-3"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-md bg-stone">
                          <Image
                            src={product.images[0]}
                            alt={`${product.name} öneri görseli`}
                            fill
                            sizes="74px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-serif text-2xl font-semibold text-obsidian">
                            {product.name}
                          </p>
                          <p className="text-xs font-semibold text-muted">
                            {formatPrice(product.price, product.isCustomQuote)}
                          </p>
                          <AddToCartButton
                            product={product}
                            variant="light"
                            size="sm"
                            className="mt-3 w-full"
                          >
                            Sepete Ekle
                          </AddToCartButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-obsidian/10 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-muted">
                  Ara Toplam
                </span>
                <span className="font-serif text-4xl font-semibold text-obsidian">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="mb-4 flex items-start gap-3 rounded-md bg-cream p-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-bronze" />
                <p className="text-xs font-semibold leading-5 text-muted">
                  Online kredi kartı tahsilatı aktif değildir. Sipariş, ödeme ve teslimat
                  bilgileri WhatsApp görüşmesinde netleştirilir.
                </p>
              </div>
              {items.length ? (
                <Button asChild size="lg" className="w-full">
                  <Link href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                    WhatsApp ile Siparişi Tamamla
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" variant="dark" className="w-full">
                  <Link href="/urunler" onClick={closeCart}>
                    Ürünleri İncele
                  </Link>
                </Button>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
