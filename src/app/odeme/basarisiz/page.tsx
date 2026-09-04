import Link from "next/link";
import type { Metadata } from "next";
import { CircleX, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Ödeme Tamamlanamadı",
  robots: { index: false, follow: false },
};

export default async function PaymentFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ siparis?: string }>;
}) {
  const { siparis } = await searchParams;
  return (
    <section className="grid min-h-[70svh] place-items-center bg-cream py-20">
      <div className="site-container w-full">
        <div className="mx-auto max-w-2xl rounded-md border border-obsidian/10 bg-white p-8 text-center md:p-12">
          <CircleX className="mx-auto h-14 w-14 text-bronze" />
          <h1 className="mt-5 font-serif text-5xl font-semibold text-obsidian">
            Ödeme tamamlanamadı.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted">
            Kartınızdan tahsilat yapılmadıysa sepetinize dönüp yeniden deneyebilir veya sipariş kodunuzla satış ekibimize ulaşabilirsiniz.
          </p>
          {siparis ? <p className="mt-4 font-mono text-sm font-bold text-obsidian">{siparis}</p> : null}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/odeme">Yeniden Dene</Link></Button>
            <Button asChild variant="light" size="lg">
              <Link href="https://wa.me/905413812114" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> WhatsApp Destek
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
