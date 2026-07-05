# GİZLİ HOME

Premium, dönüşüm odaklı, WhatsApp satış akışına sahip Next.js 16 web sitesi.
Ürün keşfi, hızlı bakış, favoriler, sepet paneli ve teklif/sipariş listesini
WhatsApp'a taşıyan modern bir arayüz içerir.

## Teknoloji

- Next.js 16.2.9
- TypeScript
- App Router
- Tailwind CSS v4
- shadcn/ui yaklaşımıyla Radix primitive bileşenleri
- Lucide Icons
- Framer Motion
- `next/image` ile yerel optimize görseller
- JSON-LD, Open Graph, sitemap ve robots altyapısı

## Kurulum

```bash
npm install
npm run dev
```

Yerel adres:

```bash
http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Environment Variables

Varsayılan olarak WhatsApp yönlendirmeleri `905413812114`
(`+90 541 381 21 14`) numarasına gider.
Değiştirmek için `.env.local` dosyası oluşturun:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=905413812114
NEXT_PUBLIC_SITE_URL=https://gizlihome.com.tr
```

Görünen telefon metni ve sosyal bilgiler için:

```txt
src/data/site.ts
```

Güncel iletişim bilgileri:

```txt
Telefon / WhatsApp: +90 541 381 21 14
Adres: Yenidoğan Mahallesi Hürriyet Caddesi 6/50
Instagram: @gizlihome
```

## Ürün ve İçerik Yönetimi

Ürünler local data olarak tutulur:

```txt
src/data/products.ts
```

Prod katalogda şu an yalnızca üretimdeki 3 ürün aktif listelenir:

```txt
NOVA CUBE
NOVA LITE
NOVA SLIDE
```

Diğer kategori ve ürün aileleri `comingSoonProducts` datasında "Çok Yakında"
alanı olarak tutulur; detay sayfası ve sitemap üretmez.

Her ürün şu alanlarla ileride Supabase, Prisma veya CMS yapısına taşınabilecek şekilde modellenmiştir:

```txt
id, slug, name, collection, category, price, oldPrice, currency,
description, shortDescription, features, colors, sizes, images, isFeatured,
isNew, isCustomQuote, stockStatus, technicalSpecs, whatsappMessage,
deliveryInfo, paymentInfo, seoTitle, seoDescription
```

Koleksiyonlar ve SSS:

```txt
src/data/collections.ts
src/data/faq.ts
```

## WhatsApp Satış Akışı

Online kredi kartı ödeme sistemi bilinçli olarak eklenmemiştir. Kullanıcı
ürünleri sepet paneline ekleyebilir; renk, ölçü ve adet seçimiyle oluşturulan
sipariş/teklif listesi WhatsApp mesajına dönüştürülür.

Reusable component:

```txt
src/components/whatsapp/whatsapp-button.tsx
```

URL ve mesaj üretici:

```txt
src/lib/whatsapp.ts
```

Sepet paneli ve localStorage tabanlı favoriler:

```txt
src/components/cart
src/components/products/product-card.tsx
```

## Görseller

Logo dışındaki premium görsel setleri proje içinde üretilmiş ve WebP olarak
optimize edilmiştir:

```txt
public/images/generated
```

Gerçek ürün fotoğrafları geldiğinde `src/data/products.ts` ve
`src/data/collections.ts` içindeki path'ler güncellenebilir.

## Deploy Önerisi

Vercel önerilir. Deploy öncesi:

```bash
npm run lint
npm run build
```

`NEXT_PUBLIC_SITE_URL` production domain ile güncellenmelidir. Ana domain
şimdilik `https://gizlihome.com.tr` olarak planlanmıştır. Yasal metinlerdeki
placeholder alanlar yayın öncesinde marka tüzel bilgileriyle netleştirilmelidir.
