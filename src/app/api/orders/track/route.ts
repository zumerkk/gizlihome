import { getOrder } from "@/lib/order-store";
import { publicOrder } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = (url.searchParams.get("id") ?? "").trim().toUpperCase().slice(0, 64);
  const email = (url.searchParams.get("email") ?? "")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .slice(0, 100);

  if (!id || !email) {
    return Response.json({ error: "Takip kodu ve e-posta zorunludur." }, { status: 400 });
  }

  const order = await getOrder(id);
  if (!order || order.customer.email !== email) {
    return Response.json({ error: "Bu bilgilerle eşleşen sipariş bulunamadı." }, { status: 404 });
  }

  return Response.json({ order: publicOrder(order) }, { headers: { "Cache-Control": "no-store" } });
}
