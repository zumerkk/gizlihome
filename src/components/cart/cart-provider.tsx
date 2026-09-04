"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/types/product";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

const STORAGE_KEY = "gizli-home-cart";

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  color: string;
  size: string;
  price: number | null;
  priceLabel: string;
  isCustomQuote: boolean;
  quantity: number;
};

type AddItemInput = {
  product: Product;
  color?: string;
  size?: string;
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddItemInput) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  checkoutUrl: string;
};

const CartContext = createContext<CartContextValue | null>(null);

function createCartItem({ product, color, size, quantity = 1 }: AddItemInput): CartItem {
  const selectedColor = color ?? product.colors[0] ?? "Henüz seçilmedi";
  const selectedSize = size ?? product.sizes?.[0] ?? "Standart";
  const priceLabel = formatPrice(product.price, product.isCustomQuote);

  return {
    id: `${product.id}-${selectedColor}-${selectedSize}`,
    productId: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    image: product.colorImages?.[selectedColor]?.[0] ?? product.images[0],
    color: selectedColor,
    size: selectedSize,
    price: product.price,
    priceLabel,
    isCustomQuote: product.isCustomQuote,
    quantity,
  };
}

function buildCheckoutMessage(items: CartItem[], subtotal: number) {
  if (!items.length) {
    return "Merhaba, GİZLİ HOME ürünleri hakkında bilgi almak istiyorum.";
  }

  const lines = items
    .map(
      (item) =>
        `- ${item.quantity} adet ${item.name} (${item.category}) | Renk: ${item.color} | Ölçü/Varyasyon: ${item.size} | Fiyat: ${item.priceLabel}`,
    )
    .join("\n");

  return `Merhaba, GİZLİ HOME web sitesinde oluşturduğum sipariş/teklif listesi için bilgi almak istiyorum.\n\n${lines}\n\nGörünen ara toplam: ${formatPrice(subtotal)}.\nTeslimat, ödeme ve üretim planını paylaşabilir misiniz?`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        setItems(stored ? (JSON.parse(stored) as CartItem[]) : []);
      } catch {
        setItems([]);
      } finally {
        setHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((input: AddItemInput) => {
    const nextItem = createCartItem(input);

    setItems((current) => {
      const existing = current.find((item) => item.id === nextItem.id);
      if (!existing) {
        return [...current, nextItem];
      }

      return current.map((item) =>
        item.id === nextItem.id
          ? { ...item, quantity: Math.min(item.quantity + nextItem.quantity, 9) }
          : item,
      );
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, Math.min(quantity, 9)) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () =>
      items.reduce((total, item) => {
        if (item.price === null) return total;
        return total + item.price * item.quantity;
      }, 0),
    [items],
  );

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const checkoutUrl = buildWhatsAppUrl(buildCheckoutMessage(items, subtotal));

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      checkoutUrl,
    }),
    [addItem, checkoutUrl, clearCart, count, isOpen, items, removeItem, subtotal, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used within CartProvider");
  }

  return value;
}
