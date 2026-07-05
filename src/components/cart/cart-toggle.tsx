"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";

export function CartToggle({ className }: { className?: string }) {
  const { count, openCart } = useCart();

  return (
    <Button
      type="button"
      variant="light"
      size="icon"
      className={cn("relative border-bronze/25 bg-white/80", className)}
      onClick={openCart}
      aria-label="Sepet panelini aç"
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-bronze px-1 text-[0.68rem] font-extrabold text-obsidian">
          {count}
        </span>
      ) : null}
    </Button>
  );
}
