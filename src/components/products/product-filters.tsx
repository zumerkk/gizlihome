"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/common/empty-state";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { productCategories } from "@/data/products";
import type { Product } from "@/types/product";

const sortOptions = [
  { label: "Öne çıkanlar", value: "featured" },
  { label: "Fiyat artan", value: "price-asc" },
  { label: "Fiyat azalan", value: "price-desc" },
  { label: "Yeni ürünler", value: "new" },
];

type Filters = {
  category: string;
  collection: string;
  color: string;
  size: string;
  price: string;
  status: string;
  sort: string;
  search: string;
};

const initialFilters: Filters = {
  category: "Tümü",
  collection: "Tümü",
  color: "Tümü",
  size: "Tümü",
  price: "Tümü",
  status: "Tümü",
  sort: "featured",
  search: "",
};

const categoryTerms: Record<string, string> = {
  "Gizli Bölmeli Komodinler": "Komodin",
  "Gizli Bölmeli Raflar": "Raf",
  "Gizli Bölmeli Sehpalar": "Sehpa",
  "TV Üniteleri": "TV Ünitesi",
  Konsollar: "Konsol",
  "Ofis Mobilyaları": "Yönetici",
  "Villa & Proje Ürünleri": "TV Ünitesi",
  "Özel Üretim": "Yönetici",
};

export function ProductFilters({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const collections = useMemo(
    () => Array.from(new Set(products.map((item) => item.collection))),
    [products],
  );
  const colors = useMemo(
    () => Array.from(new Set(products.flatMap((item) => item.colors))),
    [products],
  );
  const sizes = useMemo(
    () => Array.from(new Set(products.flatMap((item) => item.sizes))),
    [products],
  );
  const statuses = useMemo(
    () => Array.from(new Set(products.map((item) => item.stockStatus))),
    [products],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const collectionParam = params.get("collection");
      setFilters((prev) => ({
        ...prev,
        category: params.get("category") ?? prev.category,
        collection:
          collectionParam && collections.includes(collectionParam)
            ? collectionParam
            : prev.collection,
        sort: params.get("sort") ?? prev.sort,
        search: params.get("search") ?? prev.search,
      }));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [collections]);

  const filtered = useMemo(() => {
    const searchTerm = filters.search.trim().toLocaleLowerCase("tr-TR");
    const result = products
      .filter((product) => {
        if (!searchTerm) return true;
        return [product.name, product.category, product.collection, product.shortDescription]
          .join(" ")
          .toLocaleLowerCase("tr-TR")
          .includes(searchTerm);
      })
      .filter((product) =>
        filters.category === "Tümü"
          ? true
          : product.category.includes(categoryTerms[filters.category] ?? filters.category),
      )
      .filter((product) =>
        filters.collection === "Tümü"
          ? true
          : product.collection === filters.collection,
      )
      .filter((product) =>
        filters.color === "Tümü" ? true : product.colors.includes(filters.color),
      )
      .filter((product) =>
        filters.size === "Tümü" ? true : product.sizes.includes(filters.size),
      )
      .filter((product) =>
        filters.status === "Tümü" ? true : product.stockStatus === filters.status,
      )
      .filter((product) => {
        if (filters.price === "Tümü" || product.price === null) return true;
        if (filters.price === "0-5000") return product.price <= 5000;
        if (filters.price === "5000-8000") return product.price >= 5000 && product.price <= 8000;
        return product.price >= 8000;
      });

    return result.sort((a, b) => {
      if (filters.sort === "price-asc") return (a.price ?? 999999) - (b.price ?? 999999);
      if (filters.sort === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      if (filters.sort === "new") return Number(b.isNew) - Number(a.isNew);
      return Number(b.isFeatured) - Number(a.isFeatured);
    });
  }, [filters, products]);

  const filterPanel = (
    <div className="grid gap-4">
      <Select label="Kategori" value={filters.category} onChange={(category) => setFilters((prev) => ({ ...prev, category }))} options={["Tümü", ...productCategories]} />
      <Select label="Koleksiyon" value={filters.collection} onChange={(collection) => setFilters((prev) => ({ ...prev, collection }))} options={["Tümü", ...collections]} />
      <Select label="Renk" value={filters.color} onChange={(color) => setFilters((prev) => ({ ...prev, color }))} options={["Tümü", ...colors]} />
      <Select label="Ölçü / Beden" value={filters.size} onChange={(size) => setFilters((prev) => ({ ...prev, size }))} options={["Tümü", ...sizes]} />
      <Select label="Fiyat Aralığı" value={filters.price} onChange={(price) => setFilters((prev) => ({ ...prev, price }))} options={["Tümü", "0-5000", "5000-8000", "8000+"]} />
      <Select label="Stok Durumu" value={filters.status} onChange={(status) => setFilters((prev) => ({ ...prev, status }))} options={["Tümü", ...statuses]} />
      <Button variant="light" onClick={() => setFilters(initialFilters)}>
        Filtreleri Temizle
      </Button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="hidden rounded-md border border-obsidian/10 bg-white p-5 lg:block">
        <h2 className="font-serif text-3xl font-semibold text-obsidian">
          Filtreler
        </h2>
        <div className="mt-5">{filterPanel}</div>
      </aside>

      <div className="min-w-0">
        <div className="mb-5 grid gap-3 xl:grid-cols-[1fr_auto] xl:items-end">
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Arama önerileri
            </span>
            <span className="relative block">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-bronze" />
              <input
                value={filters.search}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, search: event.target.value }))
                }
                placeholder="Komodin, raf, ofis, NFC..."
                className="h-12 w-full rounded-md border border-obsidian/10 bg-white pl-12 pr-4 text-sm font-semibold text-obsidian"
              />
            </span>
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3 xl:justify-end">
            <p className="text-sm font-semibold text-muted">
              {filtered.length} ürün gösteriliyor
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="light" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtrele
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[min(calc(100%-24px),420px)]">
                <DialogTitle className="font-serif text-3xl text-obsidian">
                  Filtreler
                </DialogTitle>
                <div className="mt-6">{filterPanel}</div>
              </DialogContent>
            </Dialog>
            <Select
              label="Sıralama"
              value={filters.sort}
              onChange={(sort) => setFilters((prev) => ({ ...prev, sort }))}
              options={sortOptions.map((item) => item.value)}
              optionLabels={Object.fromEntries(sortOptions.map((item) => [item.value, item.label]))}
              compact
            />
          </div>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {["Tümü", ...collections].map((collection) => (
            <button
              key={collection}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, collection }))}
              className={`shrink-0 rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
                filters.collection === collection
                  ? "border-bronze bg-obsidian text-cream"
                  : "border-obsidian/10 bg-white text-obsidian hover:border-bronze/45"
              }`}
            >
              {collection}
            </button>
          ))}
        </div>

        {filtered.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  optionLabels = {},
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  optionLabels?: Record<string, string>;
  compact?: boolean;
}) {
  return (
    <label className={compact ? "grid gap-1" : "grid gap-2"}>
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-obsidian/10 bg-cream px-3 text-sm font-semibold text-obsidian"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {optionLabels[option] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}
