import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { OrderTracker } from "@/components/orders/order-tracker";

export const metadata: Metadata = {
  title: "Sipariş Takip",
  description: "GİZLİ HOME siparişinizi takip kodunuz ve e-posta adresinizle görüntüleyin.",
  robots: { index: false, follow: false },
};

export default async function OrderTrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ kod?: string }>;
}) {
  const { kod } = await searchParams;
  return (
    <>
      <Breadcrumb items={[{ label: "Sipariş Takip" }]} />
      <section className="bg-cream pb-20 pt-8">
        <div className="site-container">
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-bronze">Sipariş Takip</p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl font-semibold leading-none text-obsidian md:text-7xl">Ürününüzün yolculuğunu izleyin.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">Ödeme sırasında kullandığınız e-posta ile sipariş kodunu birlikte girin. Adres ve iletişim bilgileriniz bu ekranda gösterilmez.</p>
          <div className="mt-10"><OrderTracker initialCode={kod ?? ""} /></div>
        </div>
      </section>
    </>
  );
}
