import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { MotionSystem } from "@/components/common/motion-system";
import { FloatingWhatsAppButton } from "@/components/whatsapp/floating-whatsapp-button";
import { JsonLd } from "@/components/common/json-ld";
import { brand, seoKeywords } from "@/data/site";
import { organizationSchema } from "@/lib/seo";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = brand.siteUrl;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "GİZLİ HOME",
  title: {
    default: "GİZLİ HOME | Gizli Dolap, Gizli Mobilya ve Şifreli Mobilya",
    template: "%s | GİZLİ HOME",
  },
  description:
    "Gizli dolap, gizli mobilya, şifreli dolap ve NFC kartlı komodin çözümleri. GİZLİ HOME premium gizli bölmeli mobilyaları keşfedin.",
  keywords: seoKeywords,
  authors: [{ name: "GİZLİ HOME", url: siteUrl }],
  creator: "GİZLİ HOME",
  publisher: "GİZLİ HOME",
  category: "Mobilya, Akıllı Mobilya, Güvenlik Mobilyası",
  classification:
    "Gizli bölmeli mobilya, şifreli mobilya, NFC kartlı komodin, gizli dolap",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "GİZLİ HOME | Gizli Dolap ve Gizli Mobilyada Premium Çözümler",
    description:
      "Gizli çekmece, gizli mekanizma, şifreli dolap ve NFC kartlı premium mobilya çözümleri.",
    url: siteUrl,
    siteName: "GİZLİ HOME",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/images/generated/og-premium.webp",
        width: 1200,
        height: 630,
        alt: "GİZLİ HOME premium gizli bölmeli mobilya görseli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GİZLİ HOME | Gizli Dolap, Gizli Mobilya ve Şifreli Mobilya",
    description:
      "NFC kartlı, gizli bölmeli ve özel üretim premium güvenlik mobilyaları.",
    images: ["/images/generated/og-premium.webp"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "tr-TR": siteUrl,
    },
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <CartProvider>
          <JsonLd data={organizationSchema()} />
          <ScrollProgress />
          <Header />
          <main className="flex-1">
            <MotionSystem>{children}</MotionSystem>
          </main>
          <Footer />
          <FloatingWhatsAppButton />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
