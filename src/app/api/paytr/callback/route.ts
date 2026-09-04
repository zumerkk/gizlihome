import { getOrder, updateOrder } from "@/lib/order-store";
import { verifyPaytrCallback } from "@/lib/paytr";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function field(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const form = await request.formData();
  const merchantOid = field(form, "merchant_oid");
  const status = field(form, "status");
  const totalAmount = field(form, "total_amount");
  const hash = field(form, "hash");

  if (!verifyPaytrCallback({ merchantOid, status, totalAmount, hash })) {
    return new Response("PAYTR notification failed: bad hash", { status: 400 });
  }

  const order = await getOrder(merchantOid);
  if (!order) return new Response("PAYTR notification failed: order not found", { status: 404 });
  if (order.paymentStatus !== "pending") return new Response("OK");

  const now = new Date().toISOString();
  const originalPaymentAmount = Number(field(form, "payment_amount"));
  const expectedPaymentAmount = Math.round(order.total * 100);
  const amountMatches =
    status !== "success" ||
    (Number.isFinite(originalPaymentAmount) && originalPaymentAmount === expectedPaymentAmount);

  await updateOrder(order.id, (current) => {
    if (current.paymentStatus !== "pending") return current;

    if (status === "success" && amountMatches) {
      return {
        ...current,
        status: "paid",
        paymentStatus: "paid",
        updatedAt: now,
        paytr: {
          ...current.paytr,
          callbackAt: now,
          collectedAmount: Number(totalAmount) / 100,
        },
        events: [
          ...current.events,
          { at: now, status: "paid", note: "PayTR tarafından ödeme onaylandı." },
        ],
      };
    }

    const reason = amountMatches
      ? field(form, "failed_reason_msg").slice(0, 240) || "Ödeme banka veya PayTR tarafından onaylanmadı."
      : "Ödeme tutarı sipariş toplamıyla eşleşmedi.";
    return {
      ...current,
      status: "payment_failed",
      paymentStatus: "failed",
      updatedAt: now,
      paytr: {
        ...current.paytr,
        callbackAt: now,
        failedReasonCode: field(form, "failed_reason_code").slice(0, 40),
        failedReasonMessage: reason,
      },
      events: [...current.events, { at: now, status: "payment_failed", note: reason }],
    };
  });

  return new Response("OK", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
