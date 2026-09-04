"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { LoaderCircle, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { orderStatusLabels, type OrderEvent, type OrderStatus, type PaymentStatus } from "@/types/order";

type PublicOrder = {
  id: string;
  trackingCode: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  currency: "TRY";
  items: Array<{
    sku: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    image: string;
  }>;
  events: OrderEvent[];
};

export function OrderTracker({ initialCode = "" }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode);
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const params = new URLSearchParams({ id: code.trim(), email: email.trim() });
      const response = await fetch(`/api/orders/track?${params}`, { cache: "no-store" });
      const payload = (await response.json()) as { order?: PublicOrder; error?: string };
      if (!response.ok || !payload.order) throw new Error(payload.error || "Sipariş bulunamadı.");
      setOrder(payload.order);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sipariş sorgulanamadı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-7">
      <form onSubmit={submit} className="grid gap-4 rounded-md border border-obsidian/10 bg-white p-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <Field label="Sipariş / Takip Kodu" value={code} onChange={setCode} />
        <Field label="Sipariş E-postası" value={email} onChange={setEmail} type="email" />
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <PackageSearch className="h-5 w-5" />}
          Sorgula
        </Button>
      </form>

      {error ? (
        <p role="alert" className="rounded-md border border-red-300 bg-red-50 p-4 text-sm font-bold text-red-800">{error}</p>
      ) : null}

      {order ? (
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-md bg-obsidian p-6 text-cream">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-bronze">Güncel Durum</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold">{orderStatusLabels[order.status]}</h2>
            <p className="mt-2 font-mono text-sm text-stone/65">{order.trackingCode}</p>
            <div className="mt-6 grid gap-3">
              {order.items.map((item) => (
                <div key={`${item.sku}-${item.color}`} className="grid grid-cols-[64px_1fr] gap-3 border-t border-white/10 pt-3">
                  <div className="relative aspect-square overflow-hidden rounded-sm bg-charcoal">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-serif text-xl font-semibold">{item.name}</p>
                    <p className="text-xs font-semibold text-stone/55">{item.color} · {item.size} · {item.quantity} adet</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-stone/55">Sipariş Toplamı</span>
              <span className="font-serif text-3xl font-semibold">{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="rounded-md border border-obsidian/10 bg-white p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-bronze">Sipariş Hareketleri</p>
            <div className="mt-6 grid gap-0">
              {[...order.events].reverse().map((event, index) => (
                <div key={`${event.at}-${index}`} className="relative grid grid-cols-[20px_1fr] gap-4 pb-7 last:pb-0">
                  <span className="relative z-10 mt-1.5 h-3 w-3 rounded-full bg-bronze ring-4 ring-stone" />
                  {index < order.events.length - 1 ? <span className="absolute bottom-0 left-[5px] top-4 w-px bg-obsidian/10" /> : null}
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-bold text-obsidian">{orderStatusLabels[event.status]}</p>
                      <time className="text-xs font-semibold text-muted">{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(event.at))}</time>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted">{event.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-muted">{label}</span>
      <input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="h-12 rounded-md border border-obsidian/10 bg-cream px-4 text-sm font-semibold text-obsidian outline-none transition focus:border-bronze" />
    </label>
  );
}
