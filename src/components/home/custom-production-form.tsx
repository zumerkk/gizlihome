"use client";

import { useState } from "react";
import type * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function CustomProductionForm({
  context = "özel üretim mobilya",
}: {
  context?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = `Merhaba, GİZLİ HOME için ${context} talebim var. Adım: ${name || "-"}. Telefon: ${phone || "-"}. Mesajım: ${message || "Projem hakkında bilgi paylaşmak istiyorum."}`;
    window.location.href = buildWhatsAppUrl(text);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-md border border-obsidian/10 bg-white p-5"
    >
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-obsidian">Adınız</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-12 rounded-md border border-obsidian/10 bg-cream px-4"
          autoComplete="name"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-obsidian">Telefon</span>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="h-12 rounded-md border border-obsidian/10 bg-cream px-4"
          autoComplete="tel"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-obsidian">Mesaj</span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="min-h-28 rounded-md border border-obsidian/10 bg-cream px-4 py-3"
        />
      </label>
      <Button type="submit" variant="dark">
        <Send className="h-4 w-4 text-bronze" />
        WhatsApp Mesajı Oluştur
      </Button>
    </form>
  );
}
