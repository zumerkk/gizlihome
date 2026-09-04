# GİZLİ HOME — Pazarlama & Büyüme Stratejisi
### "Görünmeyen Güvenlik" — şıklık dışarıda, güvenlik içeride.

> Bu belge, repo'nun gerçek durumu incelenerek hazırlandı. Amaç: 7–8 NOVA
> modelini sürdürülebilir, ölçeklenebilir ve **net satışa dönüşen** bir işe
> çevirmek. "Sinsice/zekice" isteğini, müşteriyi kandırmadan rakipleri geçen
> **guerrilla (gerilla) büyüme taktikleri** olarak yorumluyorum — çünkü premium
> bir markada güven, en yüksek fiyat gücü ve tekrar satış demektir.

---

## 0. Tek cümlelik özet

GİZLİ HOME'un asıl varlığı bir "mobilya" değil, **videoya çekilince kendi
kendini pazarlayan bir mekanizma**. Kart değiyor → gizli bölme açılıyor → izleyen
kaydediyor/etiketliyor. Bu "reveal" içeriği TikTok/Reels/Shorts'ta algoritmanın
en çok ödüllendirdiği formattır. Yani iki motor kuracağız:

1. **D2C Viral Motor:** reveal videoları + SEO + influencer → aylık düzenli ciro.
2. **B2B Proje Motoru:** villa/otel/ofis + iç mimar/iş ortağı ağı → az adet, dev fatura (asıl servet burada).

---

## 1. Mevcut durum (projede gerçekten ne var)

**Güçlü yanlar (zaten hazır):**
- Premium Next.js mağaza: sepet, ödeme (Shopier/PayTR), sipariş takibi, yönetim paneli.
- SEO altyapısı iyi: `seoTitle`/`seoDescription`, JSON-LD, sitemap, robots, canonical.
- Gerçek ürün video ve 4K görselleri; mekanizma demoları ürün sayfalarında.
- Kurumsal içerik: Hakkımızda, Nasıl Çalışır, Proje Çözümleri, Özel Üretim, SSS.
- Koleksiyon hikâyesi (NOX/VAULT/NOVA/ATLAS/PRIVATE/CUSTOM LAB) ve B2B toptan katalog PDF'i.
- WhatsApp entegrasyonu (Türkiye'de kritik satış kanalı).

**Net ürün serisi (katalog + README'ye göre 7 model):**

| Model | Fiyat (TL) | Konum |
|---|---|---|
| NOVA NIGHT 01 | 6.499 (kampanya, 9.990'dan) | Giriş / yatak odası |
| NOVA WALL 01 | 8.490 | Duvar rafı |
| NOVA CUBE | 10.990 | İmza komodin |
| NOVA LITE | 12.490 | (katalogda, siteye eklenmeli) |
| NOVA SLIDE | 13.490 | (katalogda, siteye eklenmeli) |
| NOVA AURA 01 | 15.000 | (katalogda, siteye eklenmeli) |
| NOVA AURA 02 | 18.000 | Amiral gemisi / akıllı |

**Tespit edilen kritik boşluklar (önce bunlar kapanmalı):**
1. `src/data/products.ts` içinde **sadece 4 ürün canlı** (CUBE, AURA 02, NIGHT 01, WALL 01).
   README ve koleksiyonlar **AURA 01, LITE, SLIDE**'ı da sayıyor ama sayfada yok.
   → Ya yayınla ya da "Yakında" olarak işaretle. **7 modeli de canlıya almak ciro ve SEO
   yüzeyini neredeyse 2 katına çıkarır.**
2. Ödeme geçiş dönemi: sitede "Shopier geçici", README'de PayTR. **Tek ve net bir ödeme
   yolu + canlı callback testi** olmadan ölçeklenemez.
3. README'de açıkça yazıyor: **yasal unvan, vergi, MERSİS, iade adresi** henüz
   kesinleşmemiş. Premium satışta bu, güveni (ve dönüşümü) doğrudan etkiler. İlk hafta kapat.

---

## 2. Pazar ve fırsat

- **Globalde gerçek bir pazar var:** gizli duvar kasası / diversion safe pazarları
  büyüyor ([Global Hidden Wall Safe Market](https://www.marketresearch.com/GlobalInfoResearch-v4117/Global-Hidden-Wall-Safe-Manufacturers-42325577/#1)),
  akıllı mobilya pazarı da yükselişte ([Europe Smart Furniture Market](https://www.marketresearch.com/Next-Move-Strategy-Consulting-v4226/Europe-Smart-Furniture-Product-Type-45396028/#1)).
- **Türkiye'de "gizli mobilya" premium segmenti neredeyse boş.** Aramalar ("gizli kasa",
  "gizli bölmeli komodin", "şifreli dolap") var ama karşılarında ya ucuz plastik "kutu kasa"
  ya da vasıfsız doğrama var. **Tasarım + NFC mekanizma + kurulu teslim + 2 yıl garanti**
  kombinasyonu bir "mavi okyanus".
- **Asıl fark:** rakiplerin çoğu ürünü anlatıyor; GİZLİ HOME ürünü **video ile kanıtlıyor**.
  Bu, dönüşümün en güçlü silahı.

---

## 3. Kimlere satacağız (öncelik sırasına göre)

### A. Bireysel premium alıcı (D2C çekirdek)
- 30–55 yaş, yüksek gelir, ev sahibi; tasarım + mahremiyet duyarlılığı yüksek.
- Alt segmentler: **saat/takı/mücevher koleksiyoncuları**, belge/nakit saklayanlar,
  çocuktan/yardımcıdan değerli eşya gizleyenler, **kripto donanım cüzdanı (hardware wallet)
  saklayanlar**, "sigorta kapsamı dışında değerli eşya" bilinci olanlar.

### B. Yasal silah sahipleri (Türkiye'de bakir, yüksek niyet)
- Ruhsatlı silah saklamada "kasa" zorunluluğu bilinci var; görünür kasa yerine **tasarım
  mobilya içinde saklama** güçlü bir hikâye. *(Yasal çerçevede "saklama mobilyası" olarak
  konumlan, "sertifikalı kasa" iddiasında bulunma.)*

### C. B2B / Proje (asıl servet motoru)
- **Villa & rezidans geliştiricileri**, lüks iç mimarlık ofisleri, **otel süitleri**
  (kasa alternatifi), **ofis/yönetici odaları** (belge güvenliği), silah/av bayileri, poligonlar.
- Toptan katalog zaten var (`output/pdf/GIZLI_HOME_Toptan_Katalog_2026.pdf`) — kullan.

### D. Kurumsal hediye / PR
- Yönetici ve iş ortağı hediyeleri, "açılış hediyesi" olarak premium konumlandırma.

### E. İhracat (uzun vade, katlayıcı)
- **Körfez (BAE/Suudi)** — mahremiyet kültürü + lüks harcama.
- **Avrupa (Almanca konuşulan ülkeler)** — kalite/garanti beklentisi.
- **ABD/İngiltere** — prepper + gun-safe kültürü, yüksek sepet değeri.

---

## 4. Konumlandırma ve mesaj

**Tek cümle:** *"Sıradan mobilya gibi görünen, sadece sizin açabildiğiniz premium güvenlik mobilyası."*

**Değer merdiveni (upsell sırası):**
NIGHT 01 (giriş, 6.5k) → WALL 01 (8.5k) → CUBE (11k) → LITE (12.5k) → SLIDE (13.5k) → AURA 01 (15k) → AURA 02 (18k) → **Özel üretim / proje (sınırsız bilet)**.

**Her içerikte tekrar eden 3 kanıt:**
1. Gerçek ürün videosu (mekanizma açılış).
2. 2 yıl mekanizma/üretim garantisi + kurulu teslim.
3. "Yetkilendirilebilir" NFC — kayıp kart yeniden tanımlanabilir (satışta güven unsuru).

---

## 5. Büyüme motoru — "zekice" taktikler (yasal & sürdürülebilir)

### T1. Viral "reveal" içerik sistemi (birinci öncelik)
Ürün kendi reklamını yapar; yeter ki açılış anını doğru kurgula.
- Formatlar: *"3 saniyede gizli bölmeyi bulabilir misin?"*, *"Eşim bu komodinin sırrını bilmiyor"*,
  *"Odamdaki 3 şey göründüğü gibi değil"*, hırsızlık senaryolu POV, üretim/atölye (craft) görüntüleri.
- Kural: ilk **1,5 saniyede merak kancası**, dikey video, her gün 3–5 paylaşım
  (TikTok + Instagram Reels + YouTube Shorts aynı içerik, üç platform).
- Ölç: hangi model/hook en çok kaydetme + link tıklaması alıyorsa ona bütçe bas.

### T2. SEO uzun-kuyruk flywheel
- Hedef kelimeler: "gizli kasa", "gizli bölmeli komodin", "nfc kartlı mobilya", "şifreli dolap",
  "silah saklama mobilyası", "değerli eşya saklama".
- Rehber içerik (blog): *"Evde değerli eşyalarınızı güvenle saklamanın 5 yolu"*,
  *"Gizli kasa nasıl seçilir"*, *"NFC kartlı mobilya nasıl çalışır"*.
- Her ürün sayfası zaten SEO'lu; **7 modelin de canlı olması** bu yüzeyi ikiye katlar.

### T3. Yaratıcı/creator tohumlama (influencer)
- Giriş ürününü (NIGHT 01) 20–50 **mikro-yaratıcıya** gönder: güvenlik/tech kanalları,
  iç mimari/oda dönüşümü, av/survival, lüks yaşam.
- **Satış odaklı kupon kodu (%10–15 komisyon)** ver → para kazandıkça senin için satar.
- Bir tane viral içerik = binlerce ziyaret; bu üründe virallik eşiği düşük.

### T4. Kıtlık ve "drop" modeli (dürüst olmak şartıyla)
- "Sınırlı Üretim" zaten var → **numaralı seri** ("ilk 100 adet"), bir sonraki parti için
  bekleme listesi, erken alana gerçek lansman fiyatı.
- *Dikkat:* sahte indirim ("9.990'dan 6.499") sürekli gösterilirse tüketici hukukunda
  "aldatıcı indirim" sayılabilir. Kampanyayı **zaman ve adet sınırlı** tut, gerçek kıl.

### T5. B2B dışa dönük satış (servetin asıl kaynağı)
- İç mimar/mimarlara **%10–20 komisyon** ortaklığı; numune indirimi.
- Villa geliştiricileri, rezidans yönetimleri, otel zincirleri, silah bayileri/poligonlara
  doğrudan ulaş (toptan katalog + mekanizma videosu + numune).
- Fuarlar: mobilya (İMOB/Casa d'Esca) + güvenlik fuarları → proje lead'i.
- **Bir villa projesi = onlarca D2C siparişine eşdeğer** ciro ve çok daha yüksek kâr.

### T6. Pazar yerleri + kanal genişletme
- Trendyol & Hepsiburada (TR erişimi), Amazon (ihracat), Shopier zaten bağlı.
- Her kanalda **aynı reveal videosu** + gerçek stok yönetimi.

### T7. E-posta / WhatsApp / retargeting
- Bülten zaten var → **sepeti terk etme + WhatsApp hatırlatma + "gizli avantaj" serisi**.
- Meta/TikTok reklamlarını **en iyi performans veren reveal videosuna** kur (retargeting).

### T8. Referans döngüsü
- "Bir arkadaşına öner, ikinize de indirim." Güvenlik ürünlerinde kulaktan kulağa güçlü.

### T9. Otorite & PR
- Yaşam/teknoloji/güvenlik medyasına ürün gönder, "basında biz" bölümü, YouTube inceleme birimleri.
- Bir "güvenlik mobilyası rehberi" e-kitabı → e-posta listesi büyüt.

---

## 6. 90 günlük yol haritası

**Hafta 1–2 — Temel (bloklayıcıları kapat):**
- [ ] Yasal unvan, vergi, MERSİS, iade adresi, KVKK metinleri kesinleştir.
- [ ] Ödeme kanalını tek ve test edilmiş hale getir (canlı callback).
- [ ] 7 modeli de `products.ts`'e ekle / eksikleri "yakında" işaretle.
- [ ] AOV hesapla, maliyet & marj tablosunu gerçek veriyle doldur (bkz. Bölüm 7).

**Hafta 2–4 — İçerik motorunu ateşle:**
- [ ] 30 reveal videosu çek (model başına 4–5 varyasyon).
- [ ] Günlük 3–5 paylaşım akışını başlat.
- [ ] 20–50 mikro-yaratıcıya tohum ürün + kupon gönder.

**Ay 2 — Talep ve satış:**
- [ ] En iyi videoya Meta/TikTok reklam bütçesi (küçük başla, ROAS'a göre ölçekle).
- [ ] SEO blog yazılarını yayınla.
- [ ] Trendyol/Hepsiburada listelemeleri.

**Ay 3 — B2B ve tekrar satış:**
- [ ] 50 iç mimar/mimar + 20 villa geliştiricisi + 10 otel/güvenlik iş ortağına ulaş.
- [ ] İlk villa/proje teklifini kapat.
- [ ] E-posta/WhatsApp retargeting ve referans programını aç.

**Her hafta ölç:** CAC, AOV, dönüşüm oranı, ROAS, brüt kâr, nitelikli B2B lead sayısı.

---

## 7. Birim ekonomisi ve "milyoner" matematiği (dürüst tablo)

> Aşağıdaki rakamlar varsayımdır; **gerçek maliyetle doğrulanmalı.** Premium/özel
> üretim mobilyada brüt marj tipik olarak %55–65'tir.

**D2C senaryosu (aylık):**

| Metrik | Hedef |
|---|---|
| Ortalama sepet (AOV) | ~11.000 TL |
| Brüt kâr/adet (%60 varsayım) | ~6.600 TL |
| 100 adet/ay | ~660.000 TL brüt |
| 300 adet/ay | ~2.000.000 TL brüt |

**B2B senaryosu (katlayıcı):**

| Metrik | Hedef |
|---|---|
| Villa/proje başına fatura | 500.000 – 2.000.000+ TL |
| Ayda 3–5 proje | 1.5 – 10 M TL ciro |
| Ortak ağı (mimar/tasarımcı) | sürekli lead kaynağı |

**"Milyoner" gerçeği:** Tek başına D2C ile zenginleşmek için **yüzlerce adet/ay**
istikrar gerekir; **B2B proje motoru ise birkaç anlaşmayla aynı ciroya ulaşır.**
Gerçek yol ikisini birlikte yürütmek: D2C = nakit akışı + marka kanıtı, B2B = büyük kâr.

---

## 8. Etik ve yasal sınırlar (markayı koruyan kurallar)

1. **"Sertifikalı kasa" deme.** Bu bir mobilya içi gizli bölme; yanmaz/çelik kasa
   sertifikası yoksa öyle iddia etme.
2. **Sahte indirim/fiyat yapma** — Türkiye'de aldatıcı indirim yasak; kampanyayı adet/zaman
   sınırlı ve gerçek tut.
3. **Güvenlik seviyesini abartma** — sigorta/garanti iddialarını yazılı doğrulanabilir tut.
4. **Yasa dışı kullanıma yönlendirme** (gizli saklama = suç unsuru gizleme) içeriklerinde
   asla hedefleme; konumlandırma **değerli eşya, belge, yasal silah, mahremiyet** olmalı.
5. **KVKK + mesafeli satış + iade** metinlerini eksiksiz yayınla — premium alıcı bunu kontrol eder.

Bu kurallar "fırsat kaçırmak" değil; premium fiyatlandırmanın ve B2B anlaşmalarının teminatıdır.

---

## 9. Şimdi yapılacak ilk 10 iş

1. 7 modelin tamamını katalogda canlıya al (AURA 01, LITE, SLIDE eksik).
2. Yasal unvan + vergi + MERSİS + iade + KVKK'yi kesinleştir.
3. Ödemeyi tek kanalda canlı test et (PayTR tercihse callback'i doğrula).
4. Maliyet/marj tablosunu gerçek veriyle çıkar.
5. 30 reveal videosu çek ve günlük paylaşım akışını başlat.
6. 20–50 mikro-yaratıcıya tohum ürün + kupon gönder.
7. En iyi videoya küçük bütçeli Meta/TikTok reklamı aç.
8. SEO blog yazılarını yayınla (gizli kasa / gizli bölmeli komodin / NFC mobilya).
9. 50 mimar/iç mimar + 20 villa geliştiricisine B2B e-postası gönder (toptan katalog ekli).
10. Haftalık KPI panosu kur (CAC, AOV, dönüşüm, ROAS, B2B lead).

---

*Kaynaklar: [Global Hidden Wall Safe Market](https://www.marketresearch.com/GlobalInfoResearch-v4117/Global-Hidden-Wall-Safe-Manufacturers-42325577/#1),
[Europe Smart Furniture Market](https://www.marketresearch.com/Next-Move-Strategy-Consulting-v4226/Europe-Smart-Furniture-Product-Type-45396028/#1),
[Soulfa — showroom'suz online mobilya büyümesi](https://www.soulfa.com/blogs/news/how-soulfa-won-the-cloud-couch-market-without-a-single-showroom),
[Zorora — creator co-creation ile mobilya pazarlama](https://webfluential.com/press/case-study-how-zorora-and-misha-levin-redefined-furniture-marketing-through-creator-co-creation).*
