"use client";

import Link from "next/link";
import type * as React from "react";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { buildProductWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  productName?: string;
  productPrice?: string;
  selectedColor?: string;
  customMessage?: string;
  variant?: "primary" | "dark" | "outline" | "light" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
};

export function WhatsAppButton({
  productName,
  productPrice,
  selectedColor,
  customMessage,
  variant = "primary",
  size = "md",
  className,
  children,
  "aria-label": ariaLabel,
}: WhatsAppButtonProps) {
  const message = buildProductWhatsAppMessage({
    productName,
    productPrice,
    selectedColor,
    customMessage,
  });

  return (
    <Link
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? "GİZLİ HOME WhatsApp hattına yaz"}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children ?? (
        <>
          <MessageCircle className="h-5 w-5" />
          WhatsApp&apos;tan Bilgi Al
        </>
      )}
    </Link>
  );
}
