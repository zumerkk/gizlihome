import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const adminCookieName = "gizli_admin";

function secret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createAdminSessionToken() {
  if (!secret()) throw new Error("Admin oturum anahtarı yapılandırılmamış.");
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + 1000 * 60 * 60 * 12 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token || !secret()) return false;
  const [payload, receivedSignature] = token.split(".");
  if (!payload || !receivedSignature) return false;
  const expectedSignature = sign(payload);
  const expected = Buffer.from(expectedSignature);
  const received = Buffer.from(receivedSignature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: number;
    };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(adminCookieName)?.value);
}

export function verifyAdminPassword(password: string) {
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedPassword || !password) return false;
  const expected = Buffer.from(expectedPassword);
  const received = Buffer.from(password);
  return expected.length === received.length && timingSafeEqual(expected, received);
}
