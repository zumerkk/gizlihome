"use client";

import { CreditCard, LockKeyhole, PanelTopOpen, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";

const steps = [
  { title: "Kartınızı Yaklaştırın", icon: CreditCard },
  { title: "Gizli Mekanizma Aktifleşsin", icon: LockKeyhole },
  { title: "Bölme Sessizce Açılsın", icon: PanelTopOpen },
  { title: "Değer Verdikleriniz Güvende Kalsın", icon: ShieldCheck },
];

export function HowItWorks() {
  return (
    <section className="bg-cream py-20">
      <div className="site-container">
        <SectionHeading
          eyebrow="Nasıl Çalışır?"
          title="Sadece Size Açılır."
          description="Kartlı erişim ve gizli mekanizma, mobilyanın estetiğini bozmadan güvenli alanı kullanıma açar."
          align="center"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="premium-card group relative overflow-hidden rounded-md border border-obsidian/10 bg-white p-6"
            >
              <div className="card-shine" />
              <span className="text-xs font-bold tracking-[0.28em] text-bronze">
                0{index + 1}
              </span>
              <div className="mt-6 grid h-14 w-14 place-items-center rounded-md bg-obsidian text-bronze transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_34px_rgba(181,138,82,0.28)]">
                <step.icon className="h-6 w-6 transition duration-300 group-hover:rotate-6" />
              </div>
              <h3 className="mt-6 font-serif text-3xl font-semibold leading-none text-obsidian">
                {step.title}
              </h3>
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-stone">
                <motion.span
                  className="block h-full bg-bronze"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(index + 1) * 25}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
