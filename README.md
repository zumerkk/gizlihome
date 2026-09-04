# GİZLİ HOME

GİZLİ HOME için hazırlanan premium Next.js mağazası. Yedi NOVA modelini gerçek
ürün görselleri ve videolarıyla sunar; sepet, PayTR iFrame ödeme, sipariş takibi
ve korumalı yönetim paneli içerir.

## Teknoloji

- Next.js 16.2.9, React 19 ve TypeScript
- App Router ve Tailwind CSS v4
- Yerel, optimize ürün görselleri ve H.264 videolar
- PayTR iFrame API ve imzalı sunucu callback doğrulaması
- Upstash Redis REST uyumlu sipariş deposu
- JSON-LD, Open Graph, sitemap ve robots

## Yerelde çalıştırma

```bash
npm install
cp .env.example .env.local
npm run dev
```

Uygulama `http://localhost:3000` adresinde açılır. Gerçek PayTR bilgileri
tanımlanmadan ödeme akışını test etmek için yalnızca geliştirme ortamında
`DEMO_PAYMENTS_ENABLED=1` kullanılabilir. Demo hiçbir gerçek kart verisi almaz.

Kalite kontrolleri:

```bash
npm run lint
npm run build
```

## Katalog

Katalog `src/data/products.ts` dosyasındadır:

- NOVA CUBE — 10.990 TL
- NOVA AURA 01 — 15.000 TL
- NOVA AURA 02 — 18.000 TL
- NOVA NIGHT 01 — 9.990 TL
- NOVA WALL 01 — 8.490 TL
- NOVA LITE — 12.490 TL
- NOVA SLIDE — 13.490 TL

Ürün modeli SKU, fiyat, renk, ölçü, garanti, termin, teknik özellik, görseller,
videolar ve SEO alanlarını içerir. PayTR'ye gönderilen ürün adı, varyasyon,
adet ve fiyat bilgileri istemciden kabul edilmez; sunucuda katalogdan yeniden
hesaplanır.

## Sipariş ve ödeme akışı

1. Müşteri sepet ve teslimat bilgilerini gönderir.
2. `/api/orders` siparişi sunucuda doğrular ve kaydeder.
3. PayTR token'ı sunucuda HMAC-SHA256 ile üretilir.
4. Kart alanları yalnızca PayTR iFrame içinde açılır.
5. `/api/paytr/callback` imzayı, sipariş kodunu ve tahsilat tutarını doğrular.
6. Sipariş ancak imzalı callback sonrasında `paid` durumuna geçer.
7. Müşteri `/siparis/takip` sayfasında sipariş kodu ve e-posta ile ilerlemeyi
   görür; yetkili kullanıcı `/yonetim/siparisler` ekranından durumu günceller.

## Ortam değişkenleri

Tüm alanlar `.env.example` içinde açıklanmıştır. Canlı kullanım için zorunlu
gruplar:

```bash
NEXT_PUBLIC_SITE_URL=https://www.gizlihome.com.tr
PAYTR_MERCHANT_ID=
PAYTR_MERCHANT_KEY=
PAYTR_MERCHANT_SALT=
PAYTR_TEST_MODE=1
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

PayTR panelindeki bildirim URL'si:

```text
https://www.gizlihome.com.tr/api/paytr/callback
```

Üretimde yerel dosya deposuna geri düşülmez. Upstash/Vercel KV uyumlu REST
bilgileri yoksa sipariş oluşturma güvenli biçimde reddedilir. Yönetim parolası
ve oturum sırrı uzun, benzersiz değerler olmalıdır.

## Medya

Kullanılan seçilmiş ürün dosyaları:

```text
public/images/products
public/videos/products
```

Kaynak videolar H.264, web uyumlu boyut ve `faststart` ayarıyla optimize
edilmiştir. Ürün geometrisi korunarak hazırlanan stüdyo görselleri katalogda
yerel dosya olarak sunulur.

## Canlıya alma

Vercel projesinde production ortam değişkenleri tanımlandıktan sonra önce
Preview deploy üzerinde gerçek PayTR test modu ve callback doğrulanmalı; ardından
production deploy yapılmalıdır. Yasal satıcı unvanı, vergi ve MERSİS bilgileri
ile iade adresi işletmenin hukuk/mali müşaviri tarafından kesinleştirilmelidir.
