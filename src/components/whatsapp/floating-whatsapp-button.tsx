"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

export function FloatingWhatsAppButton() {
  const pathname = usePathname();
  const hideMobileBar = pathname.startsWith("/urunler/") && pathname !== "/urunler";

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <WhatsAppButton
                variant="dark"
                className="whatsapp-pulse border border-bronze/45 bg-obsidian text-cream shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
                aria-label="WhatsApp'tan bilgi al"
              >
                <MessageCircle className="h-5 w-5 text-bronze" />
                WhatsApp&apos;tan Bilgi Al
              </WhatsAppButton>
            </TooltipTrigger>
            <TooltipContent>
              Ürün, fiyat ve teslimat bilgisi için yazın
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-bronze/25 bg-obsidian/96 p-3 backdrop-blur md:hidden ${
          hideMobileBar ? "hidden" : ""
        }`}
      >
        <WhatsAppButton
          variant="outline"
          className="h-12 w-full border-bronze/45 text-cream"
          aria-label="WhatsApp'tan bilgi al"
        >
          <MessageCircle className="h-5 w-5 text-bronze" />
          WhatsApp&apos;tan Bilgi Al
        </WhatsAppButton>
      </div>
    </>
  );
}
