import { isAdminAuthenticated } from "@/lib/admin-auth";
import { updateOrder } from "@/lib/order-store";
import type { OrderStatus } from "@/types/order";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedStatuses: OrderStatus[] = [
  "paid",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    status?: unknown;
    note?: unknown;
  };
  const status = body.status as OrderStatus;
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 240) : "";
  if (!allowedStatuses.includes(status)) {
    return Response.json({ error: "Sipariş durumu geçersiz." }, { status: 400 });
  }

  const { id } = await params;
  const now = new Date().toISOString();
  const order = await updateOrder(id, (current) => ({
    ...current,
    status,
    paymentStatus: status === "paid" ? "paid" : current.paymentStatus,
    updatedAt: now,
    events: [
      ...current.events,
      {
        at: now,
        status,
        note: note || "Sipariş durumu yönetim panelinden güncellendi.",
      },
    ],
  }));

  if (!order) return Response.json({ error: "Sipariş bulunamadı." }, { status: 404 });
  return Response.json({ success: true, order });
}
