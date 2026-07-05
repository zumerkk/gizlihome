"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-obsidian/10", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-5 text-left text-base font-semibold text-obsidian transition hover:text-walnut",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-bronze transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm leading-7 text-muted data-[state=closed]:animate-none data-[state=open]:animate-none"
      {...props}
    >
      <div className={cn("pb-5", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
