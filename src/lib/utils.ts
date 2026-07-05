import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product } from "@/types/product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: Product["price"],
  isCustomQuote = false,
): string {
  if (isCustomQuote || price === null) {
    return "Teklif Al";
  }

  return `${new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 0,
  }).format(price)} TL`;
}

export function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
