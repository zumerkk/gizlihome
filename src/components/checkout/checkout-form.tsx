"use client";

import Image from "next/image";
import Link from "next/link";
import { CreditCard, LoaderCircle, LockKeyhole, MessageCircle, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const initialCustomer = {
  name: "",
  email: "",
  phone: "",
  address: "",
  district: "",
  city: "",
  postalCode: "",
  note: "",
};

export function CheckoutForm({ paymentReady }: { paymentReady: boolean }) {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [customer, setCustomer] = useState(initialCustomer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [payment, setPayment] = useState<{ token: string; orderId: string } | null>(null);

  function setField(field: keyof typeof customer, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) {
      setError("Ödeme için sepetinize ürün ekleyin.");
      return;
    }
    if (!paymentReady) {
      setError("Kartlı ödeme aktivasyonu tamamlanıyor. Sipariş için satış ekibimize ulaşın.");
      return;
    }
    if (!accepted) {
      setError("Ön bilgilendirme ve satış koşullarını onaylayın.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: items.map((item) => ({
            productId: item.productId,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
          })),
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        orderId?: string;
        token?: string;
        mode?: "demo" | "paytr";
      };
      if (!response.ok || !payload.orderId || !payload.mode) {
        throw new Error(payload.error || "Ödeme başlatılamadı.");
      }

      if (payload.mode === "demo") {
        const demoResponse = await fetch(`/api/orders/${payload.orderId}/demo-payment`, {
          method: "POST",
        });
        if (!demoResponse.ok) throw new Error("Lokal demo ödemesi tamamlanamadı.");
        clearCart();
        router.push(`/odeme/basarili?siparis=${payload.orderId}&demo=1`);
        return;
      }

      if (!payload.token) throw new Error("PayTR ödeme ekranı açılamadı.");
      setPayment({ token: payload.token, orderId: payload.orderId });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Ödeme başlatılamadı.");
    } finally {
      setLoading(false);
    }
  }

  if (payment) {
    return (
      <div className="grid gap-5">
        <div className="rounded-md border border-bronze/25 bg-white p-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-bronze">
            Sipariş Kodu
          </p>
          <p className="mt-2 font-mono text-xl font-bold text-obsidian">{payment.orderId}</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Ödeme sonrası durum bu kod ve e-posta adresinizle takip edilebilir. Kesin sipariş onayı, PayTR’nin imzalı sunucu bildirimi geldiğinde oluşur.
          </p>
        </div>
        <div className="overflow-hidden rounded-md border border-obsidian/10 bg-white">
          <iframe
            src={`https://www.paytr.com/odeme/guvenli/${payment.token}`}
            title="PayTR güvenli ödeme formu"
            scrolling="no"
            className="min-h-[720px] w-full border-0"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-start">
      <form onSubmit={submit} className="rounded-md border border-obsidian/10 bg-white p-5 md:p-7">
        <div className="flex items-center gap-3 border-b border-obsidian/10 pb-5">
          <LockKeyhole className="h-6 w-6 text-bronze" />
          <div>
            <h2 className="font-serif text-3xl font-semibold text-obsidian">Teslimat Bilgileri</h2>
            <p className="text-xs font-semibold text-muted">Yıldızlı alanların tamamı zorunludur.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Ad Soyad *" value={customer.name} onChange={(value) => setField("name", value)} autoComplete="name" />
          <Field label="Telefon *" value={customer.phone} onChange={(value) => setField("phone", value)} autoComplete="tel" inputMode="tel" />
          <Field label="E-posta *" value={customer.email} onChange={(value) => setField("email", value)} autoComplete="email" type="email" />
          <Field label="Posta Kodu" value={customer.postalCode} onChange={(value) => setField("postalCode", value)} autoComplete="postal-code" />
          <Field label="İl *" value={customer.city} onChange={(value) => setField("city", value)} autoComplete="address-level1" />
          <Field label="İlçe *" value={customer.district} onChange={(value) => setField("district", value)} autoComplete="address-level2" />
        </div>
        <label className="mt-4 grid gap-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-muted">Açık Adres *</span>
          <textarea
            required
            value={customer.address}
            onChange={(event) => setField("address", event.target.value)}
            autoComplete="street-address"
            rows={4}
            className="rounded-md border border-obsidian/10 bg-cream px-4 py-3 text-sm font-semibold text-obsidian outline-none transition focus:border-bronze"
          />
        </label>
        <label className="mt-4 grid gap-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-muted">Sipariş Notu</span>
          <textarea
            value={customer.note}
            onChange={(event) => setField("note", event.target.value)}
            rows={3}
            placeholder="Teslimat veya kurulum ekibine notunuz"
            className="rounded-md border border-obsidian/10 bg-cream px-4 py-3 text-sm font-semibold text-obsidian outline-none transition focus:border-bronze"
          />
        </label>

        {error ? (
          <p role="alert" className="mt-5 rounded-md border border-red-300 bg-red-50 p-3 text-sm font-bold text-red-800">
            {error}
          </p>
        ) : null}

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-md border border-obsidian/10 bg-cream p-4 text-xs font-semibold leading-5 text-muted">
          <input
            required
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#a8743b]"
          />
          <span>
            <Link href="/mesafeli-satis-odeme-teslimat" target="_blank" className="font-extrabold text-obsidian underline">
              Ön bilgilendirme, ödeme ve teslimat koşullarını
            </Link>{" "}
            okudum ve siparişime uygulanmasını kabul ediyorum.
          </span>
        </label>

        <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading || !items.length || !paymentReady}>
          {loading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <CreditCard className="h-5 w-5" />}
          {loading
            ? "Güvenli ödeme hazırlanıyor"
            : paymentReady
              ? "PayTR ile Ödemeye Geç"
              : "Kartlı Ödeme Aktivasyonu Bekleniyor"}
        </Button>
        {!paymentReady ? (
          <p className="mt-3 text-center text-xs font-bold leading-5 text-walnut">
            Canlı ödeme bilgileri henüz tanımlı değil. Kart bilgisi istemiyoruz; sipariş için WhatsApp hattımızı kullanın.
          </p>
        ) : null}
        <p className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-muted">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
          Kart numarası, son kullanma tarihi ve güvenlik kodu yalnızca PayTR’nin güvenli alanına girilir; GİZLİ HOME bu verileri görmez ve saklamaz.
        </p>
      </form>

      <aside className="rounded-md border border-obsidian/10 bg-obsidian p-5 text-cream lg:sticky lg:top-28">
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-bronze">Sipariş Özeti</p>
        <div className="mt-5 grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-[70px_1fr] gap-3 border-b border-white/10 pb-4 last:border-b-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-charcoal">
                <Image src={item.image} alt={item.name} fill sizes="70px" className="object-cover" />
              </div>
              <div>
                <div className="flex justify-between gap-3">
                  <h3 className="font-serif text-xl font-semibold">{item.name}</h3>
                  <span className="text-sm font-bold">{formatPrice((item.price ?? 0) * item.quantity)}</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-stone/55">{item.color} · {item.size} · {item.quantity} adet</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-stone/55">Toplam</span>
          <span className="font-serif text-4xl font-semibold">{formatPrice(subtotal)}</span>
        </div>
        {!items.length ? (
          <div className="mt-5 rounded-md border border-white/10 p-4 text-sm font-semibold text-stone/65">
            Sepetiniz boş. <Link href="/urunler" className="text-bronze underline">Ürünleri inceleyin.</Link>
          </div>
        ) : null}
        <Button asChild variant="outline" className="mt-5 w-full">
          <Link href="https://wa.me/905413812114" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4 text-bronze" />
            Sipariş Öncesi Danış
          </Link>
        </Button>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "numeric";
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-muted">{label}</span>
      <input
        required={label.endsWith("*")}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="h-12 rounded-md border border-obsidian/10 bg-cream px-4 text-sm font-semibold text-obsidian outline-none transition focus:border-bronze"
      />
    </label>
  );
}
