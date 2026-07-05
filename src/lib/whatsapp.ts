import { brand } from "@/data/site";

export const whatsappMessages = {
  general: "Merhaba, GİZLİ HOME ürünleri hakkında bilgi almak istiyorum.",
  custom:
    "Merhaba, GİZLİ HOME için özel üretim mobilya talebim var. Ölçü, renk ve gizli bölme sistemi hakkında görüşmek istiyorum.",
  project:
    "Merhaba, GİZLİ HOME ile villa veya proje çözümleri hakkında görüşmek istiyorum.",
};

type ProductMessageInput = {
  productName?: string;
  productPrice?: string;
  selectedColor?: string;
  customMessage?: string;
};

export function buildProductWhatsAppMessage({
  productName,
  productPrice,
  selectedColor,
  customMessage,
}: ProductMessageInput) {
  if (customMessage) {
    return customMessage;
  }

  if (!productName) {
    return whatsappMessages.general;
  }

  return `Merhaba, GİZLİ HOME web sitesinden ${productName} ürünü hakkında bilgi almak istiyorum. Renk tercihim: ${selectedColor ?? "Henüz seçmedim"}. Ürün fiyatı: ${productPrice ?? "Teklif Al"}. Teslimat ve ödeme seçenekleri hakkında bilgi alabilir miyim?`;
}

export function buildWhatsAppUrl(message = whatsappMessages.general) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
