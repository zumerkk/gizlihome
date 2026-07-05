"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { CartToggle } from "@/components/cart/cart-toggle";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { navigation } from "@/data/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Button
        variant="dark"
        size="icon"
        aria-label="Mobil menüyü aç"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-obsidian text-cream">
          <div className="flex h-full flex-col p-5">
            <div className="flex items-center justify-between">
              <Logo className="text-cream" />
              <div className="flex items-center gap-2">
                <CartToggle className="bg-white/10 text-cream hover:bg-white/15" />
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Mobil menüyü kapat"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <nav className="mt-10 grid gap-1" aria-label="Mobil menü">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 py-4 font-serif text-3xl text-cream transition hover:text-bronze"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto grid gap-3 border-t border-bronze/25 pt-5">
              <p className="text-sm leading-6 text-stone/75">
                Ürün + fiyat + renk seçimi için doğrudan WhatsApp hattımıza
                yazın.
              </p>
              <WhatsAppButton
                className="w-full"
                aria-label="Mobil menüden WhatsApp'a yaz"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp&apos;tan Yaz
              </WhatsAppButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
