"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={10}
        className="z-50 rounded-md border border-bronze/25 bg-obsidian px-3 py-2 text-xs font-medium text-cream shadow-xl"
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-obsidian" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
