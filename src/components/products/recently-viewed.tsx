"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";

const storageKey = "gizli-home-recently-viewed";

export function RecentlyViewed({ currentSlug }: { currentSlug: string }) {
  const [slugs, setSlugs] = useState<string[]>([currentSlug]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as string[];
        const next = [currentSlug, ...stored.filter((slug) => slug !== currentSlug)].slice(0, 6);
        window.localStorage.setItem(storageKey, JSON.stringify(next));
        setSlugs(next);
      } catch {
        setSlugs([currentSlug]);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [currentSlug]);

  const recentlyViewed = useMemo(
    () =>
      slugs
        .filter((slug) => slug !== currentSlug)
        .map((slug) => products.find((product) => product.slug === slug))
        .filter(Boolean)
        .slice(0, 3),
    [currentSlug, slugs],
  );

  if (!recentlyViewed.length) {
    return null;
  }

  return (
    <section className="bg-cream py-20">
      <div className="site-container">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-walnut">
            Son Görüntülenenler
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-obsidian md:text-5xl">
            İlginizi Çekenler.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {recentlyViewed.map((product) =>
            product ? <ProductCard key={product.id} product={product} /> : null,
          )}
        </div>
      </div>
    </section>
  );
}
