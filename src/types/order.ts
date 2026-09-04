export type OrderStatus =
  | "awaiting_payment"
  | "paid"
  | "preparing"
  | "shipped"
  | "delivered"
  | "payment_failed"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  postalCode: string;
  note: string;
};

export type OrderItem = {
  productId: string;
  sku: string;
  name: string;
  slug: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  image: string;
};

export type OrderEvent = {
  at: string;
  status: OrderStatus;
  note: string;
};

export type Order = {
  id: string;
  trackingCode: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  currency: "TRY";
  subtotal: number;
  total: number;
  customer: OrderCustomer;
  items: OrderItem[];
  events: OrderEvent[];
  paytr?: {
    tokenCreatedAt?: string;
    callbackAt?: string;
    collectedAmount?: number;
    failedReasonCode?: string;
    failedReasonMessage?: string;
  };
};

export type CheckoutItemInput = {
  productId: string;
  color: string;
  size: string;
  quantity: number;
};

export type CreateOrderInput = {
  customer: OrderCustomer;
  items: CheckoutItemInput[];
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  awaiting_payment: "Ödeme Bekleniyor",
  paid: "Ödeme Alındı",
  preparing: "Üretim / Hazırlık",
  shipped: "Kargoya Verildi",
  delivered: "Teslim Edildi",
  payment_failed: "Ödeme Başarısız",
  cancelled: "İptal Edildi",
};
