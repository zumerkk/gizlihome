"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { brand } from "@/data/site";
import { formatPrice } from "@/lib/utils";

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
  const shopierCheckoutUrl = items.length === 1
    ? products.find((product) => product.id === items[0].productId)?.shopierUrl ?? brand.shopierUrl
    : brand.shopierUrl;

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
                <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-bronze">
                  GİZLİ HOME
                </p>
                <h2 className="mt-1 font-serif text-4xl font-semibold text-obsidian">
                  Sepet
                </h2>
              </div>
              <Button type="button" variant="dark" size="icon" onClick={closeCart} aria-label="Kapat">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length ? (
                <div className="grid gap-4">
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
                              {item.color} · {item.size}
                            </p>
                            {products.find((product) => product.id === item.productId)?.shopierUrl ? (
                              <Link
                                href={products.find((product) => product.id === item.productId)!.shopierUrl!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-block text-xs font-bold text-walnut underline underline-offset-4"
                              >
                                Ürünü Shopier&apos;de aç
                              </Link>
                            ) : null}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="grid h-9 w-9 place-items-center rounded-md border border-obsidian/10 text-muted transition hover:border-bronze hover:text-obsidian"
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
                            {formatPrice((item.price ?? 0) * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border border-dashed border-obsidian/18 bg-white p-8 text-center">
                  <ShoppingBag className="mx-auto h-7 w-7 text-bronze" />
                  <p className="mt-3 font-serif text-3xl font-semibold text-obsidian">
                    Sepetiniz boş.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Model ve yüzey seçerek güvenli ödeme adımına geçebilirsiniz.
                  </p>
                </div>
              )}

              <div className="mt-5 grid gap-3 rounded-md border border-bronze/25 bg-white p-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 text-bronze" />
                  <div>
                    <p className="text-sm font-extrabold text-obsidian">Shopier güvenli ödeme</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-muted">
                      Kart bilgileriniz Shopier&apos;in güvenli ödeme alanında işlenir; GİZLİ HOME sunucularında saklanmaz.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-obsidian/10 pt-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-bronze" />
                  <p className="text-xs font-semibold leading-5 text-muted">
                    Sipariş ve kargo durumunuzu Shopier sipariş ekranından takip edebilirsiniz.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-obsidian/10 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-muted">
                  Toplam
                </span>
                <span className="font-serif text-4xl font-semibold text-obsidian">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {items.length ? (
                <div className="grid gap-2">
                  <p className="mb-1 text-xs leading-5 text-muted">
                    Sepetiniz otomatik aktarılmaz. Ürün, renk ve adet seçiminizi Shopier&apos;de yeniden yapın.
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <Link href={shopierCheckoutUrl} target="_blank" rel="noopener noreferrer" onClick={closeCart}>
                      Shopier&apos;de Ödemeye Geç
                    </Link>
                  </Button>
                  <Button asChild variant="light" className="w-full">
                    <Link href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                      WhatsApp&apos;tan Danış
                    </Link>
                  </Button>
                </div>
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
