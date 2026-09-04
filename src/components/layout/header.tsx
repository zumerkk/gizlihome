"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { CartToggle } from "@/components/cart/cart-toggle";
import { Logo } from "@/components/common/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { navigation } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      style={{ viewTransitionName: "site-header" }}
      className={`premium-header top-0 z-40 border-b border-obsidian/10 backdrop-blur-2xl transition-[background-color,box-shadow] duration-500 ${
        scrolled
          ? "bg-cream/94 shadow-[0_14px_50px_rgba(17,17,17,0.08)]"
          : "bg-cream/86"
      }`}
    >
      <div
        className={`wide-container flex items-center justify-between gap-5 transition-[height] duration-500 ${
          scrolled ? "h-[70px]" : "h-20"
        }`}
      >
        <Logo />

        <nav
          className="hidden items-center gap-6 text-sm font-semibold text-obsidian/76 lg:flex"
          aria-label="Ana menü"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              transitionTypes={["nav-forward"]}
              aria-current={
                pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined
              }
              className="group relative py-3 transition hover:text-walnut"
            >
              {item.label}
              <span
                className={`absolute inset-x-0 bottom-1 h-px origin-center bg-bronze transition-transform duration-500 ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CartToggle />
          <WhatsAppButton
            variant="dark"
            className="border border-bronze/35"
            aria-label="WhatsApp'tan yaz"
          >
            <MessageCircle className="h-5 w-5 text-bronze" />
            WhatsApp&apos;tan Yaz
          </WhatsAppButton>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
