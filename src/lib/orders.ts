import "server-only";

import { randomBytes } from "node:crypto";
import { getProductById } from "@/data/products";
import type { CreateOrderInput, Order, OrderCustomer, OrderItem } from "@/types/order";

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

function sanitizeCustomer(value: unknown): OrderCustomer {
  const input = (value ?? {}) as Partial<Record<keyof OrderCustomer, unknown>>;
  const customer: OrderCustomer = {
    name: text(input.name, 60),
    email: text(input.email, 100).toLocaleLowerCase("tr-TR"),
    phone: text(input.phone, 20),
    address: text(input.address, 400),
    district: text(input.district, 80),
    city: text(input.city, 80),
    postalCode: text(input.postalCode, 12),
    note: text(input.note, 500),
  };

  if (customer.name.length < 3) throw new Error("Ad soyad alanını kontrol edin.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    throw new Error("Geçerli bir e-posta adresi girin.");
  }
  if (customer.phone.replace(/\D/g, "").length < 10) {
    throw new Error("Geçerli bir telefon numarası girin.");
  }
  if (customer.address.length < 10 || !customer.city || !customer.district) {
    throw new Error("Teslimat adresi, il ve ilçe alanlarını kontrol edin.");
  }

  return customer;
}

function sanitizeItems(value: unknown): OrderItem[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > 20) {
    throw new Error("Sepetiniz boş veya geçersiz.");
  }

  return value.map((raw) => {
    const input = raw as Record<string, unknown>;
    const productId = text(input.productId, 80);
    const product = getProductById(productId);
    const quantity = Math.floor(Number(input.quantity));
    const color = text(input.color, 80);
    const size = text(input.size, 80);

    if (!product || product.price === null || product.isCustomQuote) {
      throw new Error("Sepette satışa açık olmayan bir ürün var.");
    }
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 9) {
      throw new Error(`${product.name} için adet bilgisi geçersiz.`);
    }
    if (!product.colors.includes(color) || !product.sizes.includes(size)) {
      throw new Error(`${product.name} varyasyonu güncellendi; lütfen yeniden seçin.`);
    }

    return {
      productId: product.id,
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      color,
      size,
      quantity,
      unitPrice: product.price,
      lineTotal: product.price * quantity,
      image: product.images[0],
    };
  });
}

function createOrderId() {
  const time = Date.now().toString(36).toUpperCase();
  const random = randomBytes(4).toString("hex").toUpperCase();
  return `GH${time}${random}`;
}

export function buildOrder(value: unknown): Order {
  const input = (value ?? {}) as Partial<CreateOrderInput>;
  const customer = sanitizeCustomer(input.customer);
  const items = sanitizeItems(input.items);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const now = new Date().toISOString();
  const id = createOrderId();

  return {
    id,
    trackingCode: id,
    createdAt: now,
    updatedAt: now,
    status: "awaiting_payment",
    paymentStatus: "pending",
    currency: "TRY",
    subtotal,
    total: subtotal,
    customer,
    items,
    events: [
      {
        at: now,
        status: "awaiting_payment",
        note: "Sipariş oluşturuldu; güvenli ödeme sonucu bekleniyor.",
      },
    ],
  };
}

export function publicOrder(order: Order) {
  return {
    id: order.id,
    trackingCode: order.trackingCode,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    status: order.status,
    paymentStatus: order.paymentStatus,
    total: order.total,
    currency: order.currency,
    items: order.items.map(({ sku, name, color, size, quantity, image }) => ({
      sku,
      name,
      color,
      size,
      quantity,
      image,
    })),
    events: order.events,
  };
}
