import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AdminOrderBoard } from "@/components/admin/admin-order-board";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listOrders } from "@/lib/order-store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Sipariş Yönetimi", robots: { index: false, follow: false } };

export default async function AdminOrdersPage() {
  if (!(await isAdminAuthenticated())) redirect("/yonetim/giris");
  const orders = await listOrders();
  return <section className="bg-cream py-16"><div className="site-container"><p className="text-xs font-extrabold uppercase tracking-[0.28em] text-bronze">GİZLİ HOME Yönetim</p><h1 className="mt-3 font-serif text-5xl font-semibold text-obsidian md:text-7xl">Siparişler</h1><div className="mt-10"><AdminOrderBoard initialOrders={orders} /></div></div></section>;
}
