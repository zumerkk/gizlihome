"use client";

import { Fingerprint, KeyRound, Ruler, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";

const items = [
  {
    title: "Gizli Bölme",
    description:
      "Mobilya formuna entegre edilen saklama alanı dışarıdan fark edilmez.",
    icon: Fingerprint,
  },
  {
    title: "NFC Kartlı Erişim",
    description:
      "Yetkilendirilen kart veya akıllı erişim sistemiyle sessiz açılış sağlar.",
    icon: KeyRound,
  },
  {
    title: "Özel Üretim",
    description:
      "Ölçü, renk, mekanizma ve gizli bölme mimarisi ihtiyaca göre planlanır.",
    icon: Ruler,
  },
  {
    title: "Montajlı Teslimat",
    description:
      "Ürünler güvenli paketleme ve teslimat planıyla kullanıma hazırlanır.",
    icon: Truck,
  },
];

export function TrustFeatures() {
  return (
    <section id="icerik" className="bg-cream py-20">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Fark Yaratan Alan"
            title="Bir Mobilyadan Fazlası."
            description="GİZLİ HOME ürünleri, yaşam alanınızın estetiğini bozmadan değer verdiklerinize görünmeyen bir güvenlik alanı sunar."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="premium-card group overflow-hidden rounded-md border border-obsidian/10 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.05)]"
              >
                <div className="card-shine" />
                <div className="grid h-12 w-12 place-items-center rounded-md bg-obsidian text-bronze">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-3xl font-semibold text-obsidian">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
