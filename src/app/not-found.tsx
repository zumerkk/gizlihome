import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-cream py-20">
      <div className="site-container max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-walnut">
          404
        </p>
        <h1 className="mt-4 font-serif text-6xl font-semibold text-obsidian">
          Bu alan açılmadı.
        </h1>
        <p className="mt-5 text-base leading-8 text-muted">
          Aradığınız sayfa taşınmış veya henüz yayına alınmamış olabilir.
          Ürünler için katalog alanına dönebilir ya da WhatsApp&apos;tan bize
          yazabilirsiniz.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="dark">
            <Link href="/urunler">Ürünlere Dön</Link>
          </Button>
          <WhatsAppButton variant="light">WhatsApp&apos;tan Yaz</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
