"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Collection } from "@/types/product";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -7 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="premium-card group overflow-hidden rounded-md border border-obsidian/10 bg-white"
    >
      <Link href={collection.href} data-tilt="true" className="relative block">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone">
          <Image
            src={collection.image}
            alt={`${collection.name} koleksiyonu görseli`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="card-shine" />
          <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-bronze transition duration-500 group-hover:scale-x-100" />
        </div>
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-bronze">
            {collection.eyebrow}
          </p>
          <h3 className="mt-3 font-serif text-4xl font-semibold text-obsidian">
            {collection.name}
          </h3>
          <p className="mt-3 min-h-20 text-sm leading-7 text-muted">
            {collection.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-obsidian">
            Koleksiyonu İncele
            <ArrowUpRight className="h-4 w-4 text-bronze" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
