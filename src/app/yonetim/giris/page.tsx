import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Yönetim Girişi", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/yonetim/siparisler");
  return <section className="grid min-h-[70svh] place-items-center bg-cream py-20"><div className="w-full max-w-lg px-5"><AdminLoginForm /></div></section>;
}
