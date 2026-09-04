"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const payload = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(payload.error || "Giriş yapılamadı.");
      setLoading(false);
      return;
    }
    router.push("/yonetim/siparisler");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="rounded-md border border-obsidian/10 bg-white p-7 shadow-[0_30px_100px_rgba(17,17,17,0.08)]">
      <LockKeyhole className="h-8 w-8 text-bronze" />
      <h1 className="mt-5 font-serif text-5xl font-semibold text-obsidian">Yönetim Girişi</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Sipariş ve ödeme durumlarına yalnızca yetkili kullanıcı erişebilir.</p>
      <label className="mt-7 grid gap-2">
        <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted">Yönetici Şifresi</span>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required className="h-12 rounded-md border border-obsidian/10 bg-cream px-4 font-semibold outline-none transition focus:border-bronze" />
      </label>
      {error ? <p role="alert" className="mt-4 text-sm font-bold text-red-700">{error}</p> : null}
      <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
        {loading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
        {loading ? "Doğrulanıyor" : "Giriş Yap"}
      </Button>
    </form>
  );
}
