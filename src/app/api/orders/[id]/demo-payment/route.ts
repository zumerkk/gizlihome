import { updateOrder } from "@/lib/order-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (process.env.NODE_ENV === "production" || process.env.DEMO_PAYMENTS_ENABLED !== "1") {
    return Response.json({ error: "Demo ödeme kapalı." }, { status: 404 });
  }

  const { id } = await params;
  const now = new Date().toISOString();
  const updated = await updateOrder(id, (order) => ({
    ...order,
    status: "paid",
    paymentStatus: "paid",
    updatedAt: now,
    paytr: { ...order.paytr, callbackAt: now, collectedAmount: order.total },
    events: [
      ...order.events,
      { at: now, status: "paid", note: "Lokal demo ödemesi onaylandı." },
    ],
  }));

  if (!updated) return Response.json({ error: "Sipariş bulunamadı." }, { status: 404 });
  return Response.json({ success: true });
}
