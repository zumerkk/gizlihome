import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { brand } from "@/data/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shopier Güvenli Ödeme",
  description: "GİZLİ HOME siparişinizi Shopier güvenli ödeme sayfasında tamamlayın.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  redirect(brand.shopierUrl);
}
