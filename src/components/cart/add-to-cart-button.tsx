"use client";

import { ShoppingBag } from "lucide-react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/types/product";

type AddToCartButtonProps = {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "dark" | "outline" | "light" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
};

export function AddToCartButton({
  product,
  selectedColor,
  selectedSize,
  children,
  className,
  variant = "dark",
  size = "md",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() =>
        addItem({
          product,
          color: selectedColor,
          size: selectedSize,
        })
      }
      aria-label={`${product.name} ürünü sepete ekle`}
    >
      {children ?? (
        <>
          <ShoppingBag className="h-4 w-4 text-bronze" />
          Sepete Ekle
        </>
      )}
    </Button>
  );
}
