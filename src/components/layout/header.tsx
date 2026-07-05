import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CartToggle } from "@/components/cart/cart-toggle";
import { Logo } from "@/components/common/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { navigation } from "@/data/site";

export function Header() {
  return (
    <header className="premium-header top-0 z-40 border-b border-obsidian/10 bg-cream/88 backdrop-blur-xl">
      <div className="wide-container flex h-20 items-center justify-between gap-5">
        <Logo />

        <nav
          className="hidden items-center gap-6 text-sm font-semibold text-obsidian/76 lg:flex"
          aria-label="Ana menü"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-walnut"
            >
              {item.label}
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
