"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-obsidian/75 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[min(calc(100%-24px),920px)] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-md border border-bronze/20 bg-cream p-5 shadow-2xl focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-obsidian text-cream transition hover:bg-charcoal"
          aria-label="Kapat"
        >
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
