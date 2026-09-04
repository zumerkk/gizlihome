"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { orderStatusLabels, type Order, type OrderStatus } from "@/types/order";

const editableStatuses: OrderStatus[] = ["paid", "preparing", "shipped", "delivered", "cancelled"];

export function AdminOrderBoard({ initialOrders }: { initialOrders: Order[] }) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");

  async function update(id: string, status: OrderStatus, note: string) {
    setBusyId(id);
    setMessage("");
    const response = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, note }),
    });
    const payload = (await response.json()) as { order?: Order; error?: string };
    if (response.ok && payload.order) {
      setOrders((current) => current.map((order) => (order.id === id ? payload.order! : order)));
      setMessage(`${id} güncellendi.`);
    } else {
      setMessage(payload.error || "Güncelleme başarısız.");
    }
    setBusyId("");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/yonetim/giris");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 rounded-md bg-obsidian p-5 text-cream md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-bronze">Canlı Operasyon</p>
          <p className="mt-1 text-sm font-semibold text-stone/65">{orders.length} sipariş kayıtlı</p>
        </div>
        <Button type="button" variant="outline" onClick={logout}><LogOut className="h-4 w-4" /> Çıkış Yap</Button>
      </div>
      {message ? <p className="mb-5 rounded-md border border-bronze/25 bg-white p-3 text-sm font-bold text-obsidian">{message}</p> : null}
      <div className="grid gap-5">
        {orders.map((order) => <AdminOrderCard key={order.id} order={order} busy={busyId === order.id} onUpdate={update} />)}
        {!orders.length ? <div className="rounded-md border border-dashed border-obsidian/15 bg-white p-10 text-center text-sm font-semibold text-muted">Henüz sipariş kaydı yok.</div> : null}
      </div>
    </div>
  );
}

function AdminOrderCard({ order, busy, onUpdate }: { order: Order; busy: boolean; onUpdate: (id: string, status: OrderStatus, note: string) => void }) {
  const [status, setStatus] = useState<OrderStatus>(order.status === "awaiting_payment" || order.status === "payment_failed" ? "paid" : order.status);
  const [note, setNote] = useState("");
  return (
    <article className="rounded-md border border-obsidian/10 bg-white p-5 md:p-6">
      <div className="grid gap-6 xl:grid-cols-[0.72fr_1fr_0.82fr]">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-bronze">{orderStatusLabels[order.status]}</p>
          <h2 className="mt-2 break-all font-mono text-lg font-bold text-obsidian">{order.id}</h2>
          <p className="mt-2 text-xs font-semibold text-muted">{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(order.createdAt))}</p>
          <p className="mt-4 font-serif text-4xl font-semibold text-obsidian">{formatPrice(order.total)}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">Ödeme: {order.paymentStatus}</p>
        </div>
        <div className="grid gap-3">
          {order.items.map((item) => (
            <div key={`${item.sku}-${item.color}`} className="grid grid-cols-[58px_1fr] gap-3">
              <div className="relative aspect-square overflow-hidden rounded-sm bg-stone"><Image src={item.image} alt={item.name} fill sizes="58px" className="object-cover" /></div>
              <div><p className="font-bold text-obsidian">{item.name} × {item.quantity}</p><p className="text-xs font-semibold text-muted">{item.sku} · {item.color} · {item.size}</p></div>
            </div>
          ))}
          <div className="border-t border-obsidian/10 pt-3 text-sm leading-6 text-muted">
            <p className="font-bold text-obsidian">{order.customer.name}</p>
            <p>{order.customer.phone} · {order.customer.email}</p>
            <p>{order.customer.address}, {order.customer.district}/{order.customer.city} {order.customer.postalCode}</p>
            {order.customer.note ? <p className="mt-2 rounded-sm bg-stone p-2">Not: {order.customer.note}</p> : null}
          </div>
        </div>
        <div className="grid content-start gap-3 rounded-md bg-stone p-4">
          <label className="grid gap-2"><span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Yeni Durum</span><select value={status} onChange={(event) => setStatus(event.target.value as OrderStatus)} className="h-11 rounded-md border border-obsidian/10 bg-white px-3 text-sm font-bold">{editableStatuses.map((item) => <option key={item} value={item}>{orderStatusLabels[item]}</option>)}</select></label>
          <label className="grid gap-2"><span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Müşteriye Görünecek Not</span><textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} className="rounded-md border border-obsidian/10 bg-white p-3 text-sm font-semibold" placeholder="Örn. Ürününüz kalite kontrolden geçti." /></label>
          <Button type="button" onClick={() => onUpdate(order.id, status, note)} disabled={busy}><Save className="h-4 w-4" /> {busy ? "Kaydediliyor" : "Durumu Kaydet"}</Button>
        </div>
      </div>
    </article>
  );
}
