import { getPaytrConfig, requestPaytrToken } from "@/lib/paytr";
import { buildOrder } from "@/lib/orders";
import { saveOrder, updateOrder } from "@/lib/order-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function requestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(request: Request) {
  try {
    const demoEnabled =
      process.env.NODE_ENV !== "production" && process.env.DEMO_PAYMENTS_ENABLED === "1";
    const paytrReady = Boolean(getPaytrConfig());
    if (!paytrReady && !demoEnabled) {
      return Response.json(
        { error: "Kartlı ödeme yapılandırması tamamlanmamış. Lütfen WhatsApp hattımızdan ulaşın." },
        { status: 503 },
      );
    }

    const order = buildOrder(await request.json());
    await saveOrder(order);

    if (demoEnabled && !paytrReady) {
      return Response.json({ orderId: order.id, trackingCode: order.trackingCode, mode: "demo" });
    }

    try {
      const token = await requestPaytrToken(order, requestIp(request));
      await updateOrder(order.id, (current) => ({
        ...current,
        updatedAt: new Date().toISOString(),
        paytr: { ...current.paytr, tokenCreatedAt: new Date().toISOString() },
      }));
      return Response.json({
        orderId: order.id,
        trackingCode: order.trackingCode,
        mode: "paytr",
        token,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ödeme başlatılamadı.";
      await updateOrder(order.id, (current) => ({
        ...current,
        updatedAt: new Date().toISOString(),
        events: [
          ...current.events,
          { at: new Date().toISOString(), status: current.status, note: `Ödeme başlatma hatası: ${message}` },
        ],
      }));
      return Response.json({ error: message, orderId: order.id }, { status: 502 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sipariş oluşturulamadı.";
    return Response.json({ error: message }, { status: 400 });
  }
}
