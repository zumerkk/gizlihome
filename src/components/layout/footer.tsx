import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";
import { AgencySignature } from "@/components/layout/agency-signature";
import { Logo } from "@/components/common/logo";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { brand, legalLinks } from "@/data/site";

const footerLinks = [
  { label: "Koleksiyonlar", href: "/koleksiyonlar" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Özel Üretim", href: "/ozel-uretim" },
  { label: "Villa & Proje", href: "/proje-cozumleri" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "S.S.S.", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal pb-24 pt-16 text-cream md:pb-10">
      <div className="site-container">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-stone/72">
              {brand.slogan} Şıklık dışarıda, güvenlik içeride.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 text-bronze" />
                WhatsApp
              </WhatsAppButton>
              <Link
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-bronze/35 px-4 text-sm font-semibold text-cream transition hover:bg-bronze/10"
              >
                <Camera className="h-4 w-4 text-bronze" />
                {brand.instagram}
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.28em] text-bronze">
              Menü
            </h2>
            <nav className="mt-5 grid gap-3 text-sm text-stone/78">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-cream"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.28em] text-bronze">
              İletişim
            </h2>
            <div className="mt-5 grid gap-3 text-sm leading-7 text-stone/78">
              <p>WhatsApp: {brand.whatsappDisplay}</p>
              <p>Instagram: {brand.instagram}</p>
              <p>Adres: {brand.address}</p>
              <p>Online kredi kartı tahsilatı şu an aktif değildir.</p>
            </div>
          </div>
        </div>

        <AgencySignature />

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-stone/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 GİZLİ HOME. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
