import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { brand } from "@/data/site";
import type { Order } from "@/types/order";

type PaytrConfig = {
  merchantId: string;
  merchantKey: string;
  merchantSalt: string;
  testMode: "0" | "1";
};

export function getPaytrConfig(): PaytrConfig | null {
  const merchantId = process.env.PAYTR_MERCHANT_ID;
  const merchantKey = process.env.PAYTR_MERCHANT_KEY;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT;
  if (!merchantId || !merchantKey || !merchantSalt) return null;

  return {
    merchantId,
    merchantKey,
    merchantSalt,
    testMode: process.env.PAYTR_TEST_MODE === "0" ? "0" : "1",
  };
}

function hmacBase64(value: string, key: string) {
  return createHmac("sha256", key).update(value).digest("base64");
}

export async function requestPaytrToken(order: Order, userIp: string) {
  const config = getPaytrConfig();
  if (!config) throw new Error("PayTR mağaza bilgileri yapılandırılmamış.");

  const paymentAmount = String(Math.round(order.total * 100));
  const basket = Buffer.from(
    JSON.stringify(
      order.items.map((item) => [item.name, item.unitPrice.toFixed(2), item.quantity]),
    ),
  ).toString("base64");
  const noInstallment = "0";
  const maxInstallment = "0";
  const currency = "TL";
  const hashValue =
    config.merchantId +
    userIp +
    order.id +
    order.customer.email +
    paymentAmount +
    basket +
    noInstallment +
    maxInstallment +
    currency +
    config.testMode;
  const token = hmacBase64(hashValue + config.merchantSalt, config.merchantKey);
  const siteUrl = brand.siteUrl;

  const body = new URLSearchParams({
    merchant_id: config.merchantId,
    user_ip: userIp,
    merchant_oid: order.id,
    email: order.customer.email,
    payment_amount: paymentAmount,
    paytr_token: token,
    user_basket: basket,
    debug_on: config.testMode,
    no_installment: noInstallment,
    max_installment: maxInstallment,
    user_name: order.customer.name,
    user_address: `${order.customer.address}, ${order.customer.district}/${order.customer.city}`,
    user_phone: order.customer.phone,
    merchant_ok_url: `${siteUrl}/odeme/basarili?siparis=${order.id}`,
    merchant_fail_url: `${siteUrl}/odeme/basarisiz?siparis=${order.id}`,
    timeout_limit: "30",
    currency,
    test_mode: config.testMode,
    lang: "tr",
  });

  const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!response.ok) throw new Error("PayTR ödeme servisine ulaşılamadı.");
  const payload = (await response.json()) as
    | { status: "success"; token: string }
    | { status: "failed"; reason: string };
  if (payload.status !== "success") throw new Error(payload.reason || "PayTR token üretilemedi.");
  return payload.token;
}

export function verifyPaytrCallback(fields: {
  merchantOid: string;
  status: string;
  totalAmount: string;
  hash: string;
}) {
  const config = getPaytrConfig();
  if (!config) return false;
  const expected = hmacBase64(
    fields.merchantOid + config.merchantSalt + fields.status + fields.totalAmount,
    config.merchantKey,
  );
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(fields.hash);
  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}
