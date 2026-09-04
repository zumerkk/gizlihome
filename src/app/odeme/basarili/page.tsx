import Link from "next/link";
import type { Metadata } from "next";
import { CircleCheck, PackageSearch } from "lucide-react";
import { ClearCartOnSuccess } from "@/components/checkout/clear-cart-on-success";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Ödeme Sonucu",
  robots: { index: false, follow: false },
};

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ siparis?: string; demo?: string }>;
}) {
  const { siparis, demo } = await searchParams;

  return (
    <section className="grid min-h-[70svh] place-items-center bg-cream py-20">
      <ClearCartOnSuccess />
      <div className="site-container w-full">
        <div className="mx-auto max-w-2xl rounded-md border border-obsidian/10 bg-white p-8 text-center shadow-[0_30px_100px_rgba(17,17,17,0.08)] md:p-12">
          <CircleCheck className="mx-auto h-14 w-14 text-bronze" />
          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.28em] text-bronze">
            {demo === "1" ? "Lokal Demo" : "Ödeme İşlemi Tamamlandı"}
          </p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-obsidian">
            Teşekkür ederiz.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted">
            Ödemenizin kesin durumu PayTR’nin imzalı sunucu bildirimiyle siparişe yansır. Takip kodunuzu ve ödeme sırasında kullandığınız e-postayı saklayın.
          </p>
          {siparis ? (
            <div className="mt-6 rounded-md bg-stone p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Sipariş / Takip Kodu</p>
              <p className="mt-2 break-all font-mono text-xl font-bold text-obsidian">{siparis}</p>
            </div>
          ) : null}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={`/siparis/takip${siparis ? `?kod=${encodeURIComponent(siparis)}` : ""}`}>
                <PackageSearch className="h-5 w-5" />
                Siparişi Takip Et
              </Link>
            </Button>
            <Button asChild variant="light" size="lg">
              <Link href="/">Ana Sayfa</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
