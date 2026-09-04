import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Order } from "@/types/order";

const indexKey = "gizlihome:orders:index";
const localDirectory = path.join(process.cwd(), ".data");
const localFile = path.join(localDirectory, "orders.json");
let fileQueue: Promise<unknown> = Promise.resolve();

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function redisCommand<T>(command: Array<string | number>): Promise<T> {
  const config = redisConfig();
  if (!config) throw new Error("Sipariş veri deposu yapılandırılmamış.");

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Sipariş veri deposuna ulaşılamadı.");
  const payload = (await response.json()) as { result?: T; error?: string };
  if (payload.error) throw new Error(payload.error);
  return payload.result as T;
}

async function readLocalOrders(): Promise<Order[]> {
  try {
    return JSON.parse(await readFile(localFile, "utf8")) as Order[];
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw error;
  }
}

async function writeLocalOrders(orders: Order[]) {
  await mkdir(localDirectory, { recursive: true });
  const temporaryFile = `${localFile}.${process.pid}.tmp`;
  await writeFile(temporaryFile, JSON.stringify(orders, null, 2), "utf8");
  await rename(temporaryFile, localFile);
}

function withLocalQueue<T>(task: () => Promise<T>) {
  const run = fileQueue.then(task, task);
  fileQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function canUseLocalStore() {
  return process.env.NODE_ENV !== "production" || process.env.ALLOW_LOCAL_ORDER_STORE === "1";
}

export async function saveOrder(order: Order) {
  if (redisConfig()) {
    await redisCommand(["SET", `gizlihome:order:${order.id}`, JSON.stringify(order)]);
    await redisCommand(["LPUSH", indexKey, order.id]);
    return order;
  }
  if (!canUseLocalStore()) throw new Error("Canlı sipariş veri deposu yapılandırılmamış.");

  return withLocalQueue(async () => {
    const orders = await readLocalOrders();
    orders.unshift(order);
    await writeLocalOrders(orders);
    return order;
  });
}

export async function getOrder(id: string) {
  if (redisConfig()) {
    const value = await redisCommand<string | null>(["GET", `gizlihome:order:${id}`]);
    return value ? (JSON.parse(value) as Order) : null;
  }
  if (!canUseLocalStore()) return null;
  const orders = await readLocalOrders();
  return orders.find((order) => order.id === id) ?? null;
}

export async function updateOrder(id: string, mutate: (order: Order) => Order) {
  if (redisConfig()) {
    const current = await getOrder(id);
    if (!current) return null;
    const updated = mutate(current);
    await redisCommand(["SET", `gizlihome:order:${id}`, JSON.stringify(updated)]);
    return updated;
  }
  if (!canUseLocalStore()) return null;

  return withLocalQueue(async () => {
    const orders = await readLocalOrders();
    const index = orders.findIndex((order) => order.id === id);
    if (index < 0) return null;
    const updated = mutate(orders[index]);
    orders[index] = updated;
    await writeLocalOrders(orders);
    return updated;
  });
}

export async function listOrders(limit = 200) {
  const safeLimit = Math.min(Math.max(limit, 1), 500);
  if (redisConfig()) {
    const ids = await redisCommand<string[]>(["LRANGE", indexKey, 0, safeLimit - 1]);
    const orders = await Promise.all(ids.map((id) => getOrder(id)));
    return orders.filter((order): order is Order => Boolean(order));
  }
  if (!canUseLocalStore()) return [];
  return (await readLocalOrders()).slice(0, safeLimit);
}
