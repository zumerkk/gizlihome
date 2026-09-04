"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/common/empty-state";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

type Sort = "featured" | "price-asc" | "price-desc" | "new";

export function ProductFilters({ products }: { products: Product[] }) {
  const categories = useMemo(
    () => ["Tümü", ...Array.from(new Set(products.map((item) => item.category)))],
    [products],
  );
  const [category, setCategory] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const requestedCategory = params.get("category");
      const requestedSort = params.get("sort") as Sort | null;
      const requestedSearch = params.get("search");

      if (requestedCategory && categories.includes(requestedCategory)) {
        setCategory(requestedCategory);
      }
      if (requestedSort && ["featured", "price-asc", "price-desc", "new"].includes(requestedSort)) {
        setSort(requestedSort);
      }
      if (requestedSearch) setSearch(requestedSearch);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [categories]);

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("tr-TR");
    return products
      .filter((product) => category === "Tümü" || product.category === category)
      .filter((product) => {
        if (!term) return true;
        return [
          product.name,
          product.sku,
          product.category,
          product.shortDescription,
          ...product.features,
        ]
          .join(" ")
          .toLocaleLowerCase("tr-TR")
          .includes(term);
      })
      .toSorted((a, b) => {
        if (sort === "price-asc") return (a.price ?? Infinity) - (b.price ?? Infinity);
        if (sort === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
        if (sort === "new") return Number(b.isNew) - Number(a.isNew);
        return Number(b.isFeatured) - Number(a.isFeatured);
      });
  }, [category, products, search, sort]);

  return (
    <div>
      <div className="grid gap-3 rounded-md border border-obsidian/10 bg-white p-4 md:grid-cols-[1fr_auto] md:items-end">
        <label className="grid gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">
            Koleksiyonda ara
          </span>
          <span className="relative block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-bronze" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Model, özellik veya SKU"
              className="h-12 w-full rounded-md border border-obsidian/10 bg-cream pl-12 pr-4 text-sm font-semibold text-obsidian outline-none transition focus:border-bronze"
            />
          </span>
        </label>
        <label className="grid gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">
            Sırala
          </span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
            className="h-12 rounded-md border border-obsidian/10 bg-cream px-4 text-sm font-semibold text-obsidian"
          >
            <option value="featured">İmza modeller</option>
            <option value="new">Yeni modeller</option>
            <option value="price-asc">Fiyat: artan</option>
            <option value="price-desc">Fiyat: azalan</option>
          </select>
        </label>
      </div>

      <div className="my-6 flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
              category === item
                ? "border-obsidian bg-obsidian text-cream"
                : "border-obsidian/10 bg-white text-obsidian hover:border-bronze"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              sharedTransition
              eagerImage={index === 0}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
