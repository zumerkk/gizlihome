"use client";

import { Building2, Hotel, Landmark, Sofa } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";
import { whatsappMessages } from "@/lib/whatsapp";

const cards = [
  { title: "Villa", icon: Landmark },
  { title: "Otel", icon: Hotel },
  { title: "Ofis", icon: Building2 },
  { title: "İç Mimarlık Projeleri", icon: Sofa },
];

export function ProjectCTA() {
  return (
    <section className="bg-stone py-20">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Villa ve Proje Çözümleri"
              title="Projeler İçin Görünmeyen Ayrıcalık."
              description="GİZLİ HOME; villa, rezidans, otel, ofis ve özel yaşam alanları için mimari projeye entegre edilen gizli bölmeli güvenlik mobilyaları tasarlar."
            />
            <div className="mt-8">
              <WhatsAppButton
                customMessage={whatsappMessages.project}
                variant="dark"
                size="lg"
              >
                Proje Görüşmesi Başlat
              </WhatsAppButton>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="premium-card group overflow-hidden rounded-md border border-obsidian/10 bg-cream p-6"
              >
                <div className="card-shine" />
                <card.icon className="h-7 w-7 text-bronze" />
                <h3 className="mt-5 font-serif text-3xl font-semibold text-obsidian">
                  {card.title}
                </h3>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
