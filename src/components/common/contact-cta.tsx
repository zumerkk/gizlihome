import { MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

export function ContactCTA() {
  return (
    <section className="premium-dark-band bg-obsidian py-20 text-cream">
      <div className="site-container grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <SectionHeading
          eyebrow="GİZLİ HOME"
          title="Size Ait Olan, Sadece Size Açılsın."
          description="Ürünler, özel üretim seçenekleri ve teslimat detayları için WhatsApp&apos;tan bize yazın."
          dark
        />
        <WhatsAppButton
          customMessage="Merhaba, GİZLİ HOME ürünleri, özel üretim seçenekleri ve teslimat detayları hakkında bilgi almak istiyorum."
          size="lg"
          aria-label="WhatsApp'tan hemen yaz"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp&apos;tan Hemen Yaz
        </WhatsAppButton>
      </div>
    </section>
  );
}
