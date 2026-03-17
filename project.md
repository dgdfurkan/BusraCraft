

# 📋 BüşraCraft — Proje Dökümanı v1.0

---

## 1. 🎯 Proje Özeti

| Bilgi | Detay |
|---|---|
| **Proje Adı** | BüşraCraft |
| **Slogan** | _"İlmek ilmek, dijital defterim"_ |
| **Amaç** | El örgüsü tariflerini dijital ortamda saklama, düzenleme ve yönetme |
| **Kullanıcı** | Tek kişi (Büşra) — Bireysel kullanım |
| **Platformlar** | MacBook (Safari/Chrome), iPhone (PWA), iPad (PWA) |
| **Hosting** | GitHub Pages (statik) |
| **Backend** | Firebase Firestore + Firebase Storage |
| **Hedef** | 1 günde tamamlama |

---

## 2. 🏗️ Teknik Mimari

### 2.1 Teknoloji Yığını

```
┌─────────────────────────────────────────────────┐
│                   BüşraCraft                     │
├─────────────────────────────────────────────────┤
│  Frontend                                        │
│  ├── React 18 (UI framework)                     │
│  ├── Vite (build tool — hızlı geliştirme)        │
│  ├── React Router (HashRouter — GitHub Pages)     │
│  ├── Tailwind CSS (styling + responsive)          │
│  ├── Framer Motion (animasyonlar)                 │
│  └── Vite PWA Plugin (service worker + manifest)  │
├─────────────────────────────────────────────────┤
│  Backend (BaaS)                                   │
│  ├── Firebase Firestore (veritabanı)              │
│  ├── Firebase Storage (fotoğraf depolama)          │
│  └── Firestore Offline Persistence (cache)        │
├─────────────────────────────────────────────────┤
│  AI / OCR                                         │
│  └── Pollinations.ai Vision API (fotoğraftan yazı)│
├─────────────────────────────────────────────────┤
│  Deployment                                       │
│  └── GitHub Pages (gh-pages branch)               │
└─────────────────────────────────────────────────┘
```

### 2.2 Neden Bu Teknolojiler?

| Teknoloji | Neden? |
|---|---|
| **React + Vite** | Hızlı geliştirme, component tabanlı, PWA desteği kolay |
| **HashRouter** | GitHub Pages SPA uyumluluğu (`/#/tarifler` şeklinde) |
| **Tailwind CSS** | Tema sistemi için CSS değişkenleri, responsive utility sınıfları |
| **Framer Motion** | Performanslı, gesture destekli, React-native animasyonlar |
| **Firebase** | Auth gerektirmez, hızlı kurulum, ücretsiz kota yeterli |
| **Pollinations.ai** | Ücretsiz, API key gereksiz, vision model desteği |

---

## 3. 📱 Ekran Çözünürlükleri & Responsive Tasarım

### 3.1 Breakpoint Sistemi

```
┌──────────────────────────────────────────────────┐
│  iPhone SE/Mini    │  320px - 375px   │ mobile    │
│  iPhone 14/15      │  390px - 430px   │ mobile    │
│  iPad Mini         │  744px           │ tablet    │
│  iPad Air/Pro      │  820px - 1024px  │ tablet    │
│  MacBook Air 13"   │  1280px          │ desktop   │
│  MacBook Pro 14"   │  1512px          │ desktop   │
│  MacBook Pro 16"   │  1728px          │ desktop   │
└──────────────────────────────────────────────────┘
```

### 3.2 Layout Stratejisi

```
📱 Mobile (< 768px)
┌─────────────────┐
│     Header      │
├─────────────────┤
│                 │
│   Content       │
│   (tek kolon)   │
│                 │
├─────────────────┤
│   Bottom Nav    │
│ 🏠 📖 ➕ 📁 ⚙️ │
└─────────────────┘

📱 Tablet (768px - 1024px)
┌─────────────────────────┐
│        Header           │
├─────────────────────────┤
│                         │
│   Content               │
│   (2 kolon grid)        │
│                         │
├─────────────────────────┤
│      Bottom Nav         │
└─────────────────────────┘

💻 Desktop (> 1024px)
┌────┬────────────────────┐
│    │      Header        │
│ S  ├────────────────────┤
│ i  │                    │
│ d  │   Content          │
│ e  │   (3-4 kolon grid) │
│ b  │                    │
│ a  │                    │
│ r  │                    │
└────┴────────────────────┘
```

---

## 4. 🎨 Tema Sistemi

### 4.1 Hazır Temalar (6 adet)

```
🌸 Pembe Bahçe (Varsayılan)
   Primary: #F472B6  Bg: #FFF1F2  Card: #FFFFFF  Accent: #EC4899

💜 Lavanta Rüyası
   Primary: #A78BFA  Bg: #F5F3FF  Card: #FFFFFF  Accent: #8B5CF6

🌿 Mint Ferahlık
   Primary: #34D399  Bg: #ECFDF5  Card: #FFFFFF  Accent: #10B981

🍂 Sıcak Sonbahar
   Primary: #F59E0B  Bg: #FFFBEB  Card: #FFFFFF  Accent: #D97706

🌊 Okyanus Mavisi
   Primary: #38BDF8  Bg: #F0F9FF  Card: #FFFFFF  Accent: #0EA5E9

🌹 Gül Kurusu
   Primary: #FB7185  Bg: #FFF1F2  Card: #FFFFFF  Accent: #E11D48
```

### 4.2 Tema Teknik Implementasyonu

```css
/* CSS Değişkenleri ile tema yönetimi */
:root[data-theme="pembe"] {
  --color-primary: #F472B6;
  --color-primary-hover: #EC4899;
  --color-bg: #FFF1F2;
  --color-card: #FFFFFF;
  --color-text: #1F2937;
  --color-text-secondary: #6B7280;
  --color-border: #FCE7F3;
  --color-accent: #EC4899;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
}
```

```
Tema tercihi → localStorage'da saklanır
Firebase'e yazılmaz → kota korunur
```

---

## 5. 🗄️ Veritabanı Şeması (Firestore)

### 5.1 Koleksiyon Yapısı

```
firestore/
├── recipes/                    ← Tarifler
│   └── {recipeId}/
│       ├── title: string              "Amigurumi Ayıcık"
│       ├── category: string           "amigurumi"
│       ├── difficulty: string         "easy" | "medium" | "hard"
│       ├── yarnInfo: object
│       │   ├── brand: string          "Alize"
│       │   ├── color: string          "Pembe"
│       │   └── thickness: string      "2mm"
│       ├── needleSize: string         "3.5mm Tığ"
│       ├── steps: array
│       │   └── [{ order: 1, text: "...", imageUrl: "" }]
│       ├── photos: array              ["url1", "url2"]
│       ├── notes: string              "Serbest notlar..."
│       ├── tags: array                ["#hediye", "#kolay"]
│       ├── createdAt: timestamp
│       ├── updatedAt: timestamp
│       └── ...(gelecekte eklenecek alanlar)
│
├── categories/                 ← Kategoriler
│   └── {categoryId}/
│       ├── name: string               "Amigurumi"
│       ├── emoji: string              "🧸"
│       ├── isDefault: boolean         true/false
│       ├── order: number              1
│       └── createdAt: timestamp
│
├── lists/                      ← Özel Listeler
│   └── {listId}/
│       ├── name: string               "Hediye Fikirleri"
│       ├── description: string        "Doğum günleri için..."
│       ├── emoji: string              "🎁"
│       ├── color: string              "#F472B6"
│       ├── recipeIds: array           ["id1", "id2", "id3"]
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
└── tags/                       ← Etiketler (autocomplete için)
    └── {tagId}/
        ├── name: string               "kışlık"
        └── count: number              15
```

### 5.2 Genişletilebilirlik Prensibi

```
🔑 ALTIN KURAL: Firestore schema-less'tir.

Durum: 300 tarif var, sonra "ücret" alanı eklenmek isteniyor.

1. RecipeForm'a "ücret" alanı eklenir
2. Yeni tarifler → ücret alanıyla kaydedilir
3. Eski tarifler → ücret alanı undefined/null gelir
4. RecipeDetail → ücret varsa gösterir, yoksa göstermez
5. Eski tarif düzenlendiğinde → form boş ücret alanı gösterir
6. Kaydet → artık ücret alanı da eklenir

Kod mantığı:
  {recipe.price && <PriceField value={recipe.price} />}

Hiçbir eski veri bozulmaz ✅
Hiçbir migration gerekmez ✅
```

---

## 6. 🔥 Firebase Kota Yönetimi

### 6.1 Ücretsiz Kota Limitleri

```
┌────────────────────┬──────────────┬──────────────────┐
│ Kaynak             │ Günlük Limit │ Bizim Tahmini    │
├────────────────────┼──────────────┼──────────────────┤
│ Firestore Okuma    │ 50.000       │ ~500/gün max     │
│ Firestore Yazma    │ 20.000       │ ~50/gün max      │
│ Firestore Silme    │ 20.000       │ ~10/gün max      │
│ Storage Depolama   │ 5 GB         │ ~1-2 GB (sıkışt.)│
│ Storage İndirme    │ 1 GB/gün     │ ~100 MB/gün max  │
└────────────────────┴──────────────┴──────────────────┘
```

### 6.2 Optimizasyon Stratejileri

```
1️⃣  FIRESTORE OFFLINE PERSISTENCE
    → enableIndexedDbPersistence(db)
    → İlk yüklemede tüm veriler indirilir
    → Sonraki açılışlarda sadece değişenler senkronize edilir
    → Çevrimdışı kullanım mümkün

2️⃣  GÖRSEL SIKIŞTURMA (Upload Öncesi)
    → Orijinal: 5-10 MB (iPhone fotoğrafı)
    → Sıkıştırılmış: 150-300 KB
    → Max boyut: 1200x1200px
    → Format: JPEG %75 kalite
    → Thumbnail: 400x400px (kart görünümü için)
    → 5 GB ≈ 15.000-30.000 sıkıştırılmış fotoğraf ✅

3️⃣  LOCAL CACHE STRATEJİSİ
    → Tema/Ayarlar → localStorage (Firebase'e gitmez)
    → Arama geçmişi → localStorage
    → Son görüntülenen → localStorage
    → Kategori/Liste listesi → Firestore cache

4️⃣  AKILLI SORGULAMA
    → Sayfalama yok (tek kullanıcı, 300-500 tarif yönetilebilir)
    → Tüm tarifler ilk açılışta çekilir → cache'lenir
    → Filtreleme/arama → client-side yapılır (ekstra okuma yok!)
    → Yeni tarif eklenince → sadece 1 write
```

### 6.3 Kota Aşım Koruma Mekanizması

```javascript
// Basit rate limiter
const DAILY_LIMITS = {
  reads: 40000,   // 50K limitin %80'i (güvenli bölge)
  writes: 15000,  // 20K limitin %75'i
};

// Günlük sayaçlar localStorage'da tutulur
// Limit yaklaşınca uyarı gösterilir
// Limit aşılırsa offline modda çalışmaya devam eder
```

---

## 7. 📸 OCR — Fotoğraftan Tarif Okuma

### 7.1 Akış Diyagramı

```
┌──────────┐    ┌──────────────┐    ┌─────────────────┐
│ 📸 Foto  │───▶│ Base64'e     │───▶│ Pollinations.ai │
│ Çek/Seç  │    │ Dönüştür     │    │ Vision API      │
└──────────┘    └──────────────┘    └────────┬────────┘
                                              │
                                              ▼
┌──────────┐    ┌──────────────┐    ┌─────────────────┐
│ 💾 Kaydet│◀───│ ✏️ Düzenle   │◀───│ 📝 Adımlara     │
│ Tarif    │    │ Kontrol Et   │    │ Yerleştir        │
└──────────┘    └──────────────┘    └─────────────────┘
```

### 7.2 Pollinations.ai API Kullanımı

```javascript
// Vision API çağrısı
const ocrResponse = await fetch(
  'https://text.pollinations.ai/openai/chat/completions',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'openai',
      messages: [{
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Bu fotoğraftaki el yazısı örgü tarifini oku.
                   Yanıtını şu JSON formatında ver:
                   {
                     "title": "Tarif adı",
                     "steps": [
                       {"order": 1, "text": "Adım açıklaması"},
                       ...
                     ],
                     "notes": "Varsa ek notlar"
                   }
                   Sadece JSON döndür, başka açıklama ekleme.`
          },
          {
            type: 'image_url',
            image_url: { url: 'data:image/jpeg;base64,/9j/...' }
          }
        ]
      }]
    })
  }
);

const result = await ocrResponse.json();
const parsedRecipe = JSON.parse(result.choices[0].message.content);
// → Form alanlarına otomatik yerleştir
```

### 7.3 OCR Kullanıcı Deneyimi

```
1. Tarif ekle sayfasında "📸 Fotoğraftan Oku" butonu
2. Kamera açılır veya galeri seçilir
3. Fotoğraf seçilir → önizleme gösterilir
4. "Tarifi Oku" butonuna basılır
5. Yükleniyor animasyonu (yün yumağı dönme 🧶)
6. AI sonuç döndürür → form alanları otomatik dolar
7. Kullanıcı kontrol eder, düzenler
8. Kaydet
```

---

## 8. 📄 Sayfa Yapısı & Kullanıcı Akışları

### 8.1 Sayfa Haritası

```
🏠 Ana Sayfa (/)
├── Hoş geldin mesajı + günün sözü
├── İstatistikler (toplam tarif, kategori, son eklenen)
├── Son Eklenen Tarifler (son 6)
├── Hızlı Erişim Butonları
└── Favori Liste önizleme

📖 Tarifler (/tarifler)
├── Arama Çubuğu (üstte, sticky)
├── Filtre Çubuğu (kategori, zorluk, etiket)
├── Sıralama (yeni→eski, A→Z, zorluk)
├── Tarif Grid/List görünümü (toggle)
└── "Tarif Ekle" FAB butonu

📝 Tarif Detay (/tarif/:id)
├── Başlık + Kategori badge
├── Fotoğraf Galerisi (swipeable)
├── Bilgi kartları (ip, tığ no, zorluk)
├── Adım adım yapılış
├── Notlar
├── Etiketler
├── Listeye ekle / Düzenle / Sil butonları
└── Paylaş butonu (ilerde PDF)

➕ Tarif Ekle (/tarif-ekle)
├── 📸 Fotoğraftan Oku butonu (OCR)
├── Tarif Adı
├── Kategori seçimi (dropdown + yeni ekle)
├── İp/Yün Bilgileri
├── Tığ/Şiş Numarası
├── Zorluk Seviyesi (3 buton)
├── Adım Adım Yapılış (dinamik ekleme)
│   └── Her adım: sıra no + metin + opsiyonel foto
├── Fotoğraf Yükleme (çoklu, drag & drop)
├── Etiketler (chip input)
├── Notlar (textarea)
└── Kaydet / İptal

✏️ Tarif Düzenle (/tarif-duzenle/:id)
└── (Tarif Ekle ile aynı form, veriler dolu gelir)
    └── Gelecekte eklenen yeni alanlar boş görünür ✅

📁 Listeler (/listeler)
├── Liste Grid görünümü
├── Her liste kartı: emoji + isim + tarif sayısı
├── "Yeni Liste" butonu
└── Liste düzenle / sil

📁 Liste Detay (/liste/:id)
├── Liste başlığı + açıklama
├── Listedeki tarifler (grid)
├── Tariflerden çıkar butonu
└── Listeyi düzenle

🏷️ Kategoriler (/kategoriler)
├── Varsayılan kategoriler
├── Özel kategoriler
├── Yeni kategori ekle
└── Kategori düzenle / sil (varsayılanlar silinemez)

🔍 Arama (/arama) — Mobilde ayrı sayfa
├── Arama kutusu (auto-focus)
├── Son aramalar
├── Popüler etiketler
└── Sonuçlar (anlık filtreleme)

⚙️ Ayarlar (/ayarlar)
├── Tema Seçici (6 tema grid)
├── Görünüm (grid/list varsayılanı)
├── Hakkında (BüşraCraft v1.0)
└── (İlerde: Dışa/İçe aktarma)
```

### 8.2 Navigasyon

```
📱 Mobil — Bottom Navigation Bar
┌─────┬─────┬─────┬─────┬─────┐
│ 🏠  │ 📖  │ ✨➕ │ 📁  │ ⚙️  │
│ Ana  │Tarif│Ekle │Liste│Ayar │
└─────┴─────┴─────┴─────┴─────┘
   ➕ butonu ortada, büyük, vurgulu, örgü iğnesi animasyonlu

💻 Desktop — Sol Sidebar
┌──────────────────┐
│  🧶 BüşraCraft   │
│                  │
│  🏠 Ana Sayfa    │
│  📖 Tariflerim   │
│  ➕ Tarif Ekle    │
│  📁 Listelerim   │
│  🏷️ Kategoriler  │
│  🔍 Arama        │
│                  │
│  ─────────────   │
│  ⚙️ Ayarlar      │
└──────────────────┘
```

---

## 9. ✨ Animasyon Tasarımı

### 9.1 Örgü Temalı Animasyonlar

```
🧶 YÜN YUMAĞI — Loading Spinner
   → Yün yumağı dönüyor + iplik çözülüyor efekti
   → Kullanım: Sayfa yükleme, OCR bekleme, kaydetme

🪡 TIĞ İĞNESİ — FAB Butonu
   → Hover'da tığ iğnesi hafifçe sallanır
   → Tıklamada iğneden iplik çıkar efekti

🧵 İPLİK — Page Transitions
   → Sayfalar arası geçişte iplik çizgisi süzülür
   → Subtle, 300ms, ease-in-out

🫧 İLMEK — Card Hover
   → Tarif kartı hover'da ilmek pattern border belirir
   → Scale: 1.02, shadow artışı, 200ms

❤️ KALBİM — Listeye Ekleme
   → Listeye eklenince kalp + yün yumağı confetti
   → 1 saniyelik micro-animation

✅ DİKİŞ — Kayıt Başarılı
   → Başarı mesajında dikiş izi çizilir (checkmark animasyonu)
   → Yeşil iplikle checkmark

🗑️ SÖK — Silme
   → Silmede örgü sökülen iplik animasyonu
   → Kartın "çözülerek" kaybolması

📸 TARAMA — OCR İşlemi
   → Fotoğraf üzerinde tarama çizgisi geçer
   → Bulunan yazılar parıldayarak belirir
```

### 9.2 Micro Interactions

```
Buton Hover     → Scale 1.05 + gölge artışı (150ms)
Buton Tıklama   → Scale 0.95 → 1.0 (spring bounce)
Kart Girişi     → Aşağıdan yukarı fade-in (staggered, 50ms delay)
Modal Açılış    → Backdrop blur + scale 0.9 → 1.0 (300ms spring)
Modal Kapanış   → Scale 1.0 → 0.9 + fade out (200ms)
Toast Bildirimi → Sağdan kayarak gelir + 3sn sonra kayarak gider
Sayfa Geçişi    → Fade + hafif slide (200ms)
Pull to Refresh → Yün yumağı aşağı uzar (mobil)
Swipe Silme     → Sola kaydırınca kırmızı alan + çöp kutusu
Switch/Toggle   → İplik yumağı bir taraftan diğerine yuvarlanır
```

### 9.3 Dekoratif Animasyonlar

```
Ana Sayfa Arka Plan  → Çok hafif yüzen yün yumağı parçacıkları
                        (opacity: 0.05, çok subtle)

Boş Durum            → Üzgün yün yumağı ilustrasyonu + 
                        "Henüz tarif eklenmemiş" mesajı
                        Yumak hafifçe sallanır

Sayfa Üst Kenar      → İnce örgü deseni bordür (CSS pattern)

Kategori Emojileri   → Hover'da hafif zıplama (bounce)
```

---

## 10. 🧩 Component Mimarisi

### 10.1 Klasör Yapısı

```
busracraft/
├── public/
│   ├── icons/
│   │   ├── icon-192x192.png
│   │   ├── icon-512x512.png
│   │   └── apple-touch-icon.png
│   └── 404.html                    ← GitHub Pages SPA fix
│
├── src/
│   ├── main.jsx                    ← Entry point
│   ├── App.jsx                     ← Router + Layout
│   ├── firebase.js                 ← Firebase config + init
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx       ← Ana layout wrapper
│   │   │   ├── Header.jsx          ← Üst bar (logo + arama)
│   │   │   ├── Sidebar.jsx         ← Desktop sol menü
│   │   │   ├── BottomNav.jsx       ← Mobil alt navigasyon
│   │   │   └── PageTransition.jsx  ← Sayfa geçiş animasyonu
│   │   │
│   │   ├── recipe/
│   │   │   ├── RecipeCard.jsx      ← Tarif kartı (grid item)
│   │   │   ├── RecipeGrid.jsx      ← Tarif grid container
│   │   │   ├── RecipeForm.jsx      ← Tarif ekleme/düzenleme formu
│   │   │   ├── RecipeDetail.jsx    ← Tarif detay görünümü
│   │   │   ├── RecipeSteps.jsx     ← Adım adım görünüm
│   │   │   ├── StepEditor.jsx      ← Tek adım düzenleme
│   │   │   ├── PhotoGallery.jsx    ← Fotoğraf galerisi (swipe)
│   │   │   └── RecipeActions.jsx   ← Düzenle/Sil/Listele butonları
│   │   │
│   │   ├── category/
│   │   │   ├── CategoryBadge.jsx   ← Kategori etiketi
│   │   │   ├── CategoryPicker.jsx  ← Kategori seçici
│   │   │   ├── CategoryGrid.jsx    ← Kategori yönetim grid
│   │   │   └── CategoryForm.jsx    ← Kategori ekleme modalı
│   │   │
│   │   ├── lists/
│   │   │   ├── ListCard.jsx        ← Liste kartı
│   │   │   ├── ListGrid.jsx        ← Listeler grid
│   │   │   ├── ListForm.jsx        ← Liste oluşturma modalı
│   │   │   ├── AddToListModal.jsx  ← Tarifi listeye ekle modalı
│   │   │   └── ListDetail.jsx      ← Liste içeriği
│   │   │
│   │   ├── search/
│   │   │   ├── SearchBar.jsx       ← Arama çubuğu
│   │   │   ├── FilterBar.jsx       ← Filtre seçenekleri
│   │   │   ├── TagChip.jsx         ← Etiket chip'i
│   │   │   └── SearchResults.jsx   ← Arama sonuçları
│   │   │
│   │   ├── ocr/
│   │   │   ├── OcrButton.jsx       ← "Fotoğraftan Oku" butonu
│   │   │   ├── OcrModal.jsx        ← OCR işlem modalı
│   │   │   └── OcrPreview.jsx      ← OCR sonuç önizleme
│   │   │
│   │   ├── settings/
│   │   │   ├── ThemeSelector.jsx   ← Tema seçici grid
│   │   │   └── SettingsPanel.jsx   ← Ayarlar paneli
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx          ← Genel buton
│   │       ├── Modal.jsx           ← Genel modal
│   │       ├── Toast.jsx           ← Bildirim toast'u
│   │       ├── EmptyState.jsx      ← Boş sayfa durumu
│   │       ├── ConfirmDialog.jsx   ← Onay dialogu
│   │       ├── ImageUploader.jsx   ← Fotoğraf yükleme
│   │       ├── DifficultyBadge.jsx ← Zorluk seviyesi badge
│   │       └── animations/
│   │           ├── YarnBallSpinner.jsx   ← Yükleniyor animasyonu
│   │           ├── StitchBorder.jsx      ← Örgü deseni bordür
│   │           ├── FloatingYarn.jsx      ← Yüzen yün parçacıkları
│   │           └── SuccessStitch.jsx     ← Başarı animasyonu
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── RecipesPage.jsx
│   │   ├── RecipeDetailPage.jsx
│   │   ├── AddRecipePage.jsx
│   │   ├── EditRecipePage.jsx
│   │   ├── CategoriesPage.jsx
│   │   ├── ListsPage.jsx
│   │   ├── ListDetailPage.jsx
│   │   ├── SearchPage.jsx
│   │   └── SettingsPage.jsx
│   │
│   ├── hooks/
│   │   ├── useRecipes.js           ← Tarif CRUD operasyonları
│   │   ├── useCategories.js        ← Kategori CRUD
│   │   ├── useLists.js             ← Liste CRUD
│   │   ├── useSearch.js            ← Arama & filtreleme
│   │   ├── useTheme.js             ← Tema yönetimi
│   │   ├── useImageUpload.js       ← Fotoğraf yükleme + sıkıştırma
│   │   ├── useOCR.js               ← Pollinations.ai OCR
│   │   └── useToast.js             ← Toast bildirimleri
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx         ← Tema context provider
│   │   └── ToastContext.jsx         ← Toast context provider
│   │
│   ├── utils/
│   │   ├── imageCompressor.js       ← Görsel sıkıştırma
│   │   ├── pollinationsApi.js       ← AI API helper
│   │   ├── searchUtils.js           ← Arama algoritması
│   │   ├── constants.js             ← Sabitler (kategoriler, vs.)
│   │   ├── firebaseHelpers.js       ← Firebase utility fonksiyonları
│   │   └── quotaTracker.js          ← Firebase kota takibi
│   │
│   └── styles/
│       ├── themes.js                ← Tema tanımları
│       ├── animations.css           ← Keyframe animasyonlar
│       └── patterns.css             ← Örgü deseni CSS pattern'ları
│
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 11. 📱 PWA Yapılandırması

### 11.1 manifest.json

```json
{
  "name": "BüşraCraft - Örgü Tarif Defterim",
  "short_name": "BüşraCraft",
  "description": "İlmek ilmek, dijital tarif defterim 🧶",
  "start_url": "/busracraft/",
  "display": "standalone",
  "background_color": "#FFF1F2",
  "theme_color": "#F472B6",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### 11.2 iOS Özel Meta Tag'leri

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="BüşraCraft">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
```

---

## 12. 🔍 Arama & Filtreleme Sistemi

### 12.1 Arama Stratejisi

```
⚡ TÜM ARAMA CLIENT-SIDE YAPILIR
   → Firebase'den ekstra okuma SIFIR!
   → Tüm tarifler zaten cache'de

Arama alanları:
  ✅ Tarif adı
  ✅ Notlar
  ✅ Etiketler
  ✅ Adım metinleri
  ✅ İp/Yün bilgisi
  ✅ Kategori adı

Arama özellikleri:
  ✅ Türkçe karakter desteği (ş, ç, ğ, ı, ö, ü)
  ✅ Case-insensitive
  ✅ Anlık sonuç (debounced 300ms)
  ✅ Highlight eşleşen metin
```

### 12.2 Filtre Seçenekleri

```
📂 Kategori     → Çoklu seçim (checkbox)
⭐ Zorluk       → Kolay / Orta / Zor (toggle)
🏷️ Etiketler   → Chip seçimi
📅 Tarih        → En yeni / En eski
🔤 Sıralama    → A-Z / Z-A / Yeni→Eski / Eski→Yeni
```

---

## 13. 📦 Deployment — GitHub Pages

### 13.1 Adımlar

```bash
# 1. Repo oluştur: github.com/kullanici/busracraft
# 2. Vite config'de base ayarla
# 3. Build al
# 4. gh-pages branch'ine deploy et

# vite.config.js
export default defineConfig({
  base: '/busracraft/',
  // ...
})

# Deploy komutu
npm run build
npx gh-pages -d dist
```

### 13.2 GitHub Pages SPA Çözümü

```
HashRouter kullanarak → /#/tarifler, /#/tarif/123
404 sorunu olmaz ✅
```

---

## 14. 🗓️ Geliştirme Planı (1 Gün)

```
⏰ SEANS 1 — Temel Altyapı (İlk Adım)
   ├── Proje oluşturma (Vite + React + Tailwind)
   ├── Firebase kurulumu + config
   ├── Tema sistemi + CSS değişkenleri
   ├── Layout componentleri (Header, Sidebar, BottomNav)
   ├── Router yapısı
   └── PWA manifest + icons

⏰ SEANS 2 — Tarif CRUD
   ├── Firestore hooks (useRecipes, useCategories)
   ├── Tarif ekleme formu (RecipeForm)
   ├── Tarif kartı (RecipeCard)
   ├── Tarif grid (RecipesPage)
   ├── Tarif detay (RecipeDetailPage)
   ├── Tarif düzenleme
   └── Fotoğraf yükleme + sıkıştırma

⏰ SEANS 3 — Kategoriler, Listeler, Arama
   ├── Kategori yönetimi
   ├── Liste CRUD
   ├── Listeye tarif ekleme
   ├── Arama & filtreleme
   └── Etiket sistemi

⏰ SEANS 4 — OCR, Animasyonlar, Polish
   ├── Pollinations.ai OCR entegrasyonu
   ├── Tüm animasyonlar
   ├── Boş durumlar (empty states)
   ├── Son rötuşlar + test
   └── GitHub Pages deploy
```

---

## 15. 🔮 Gelecek Güncellemeler (v2, v3...)

```
📋 Backlog (İlerde eklenecekler):
   □ PDF/Görsel dışa aktarma (BüşraCraft markalı)
   □ Ücret alanı
   □ Malzeme maliyet hesaplayıcı
   □ Tarif paylaşma linki
   □ Dark mode tema
   □ İlmek sayacı (interaktif)
   □ Yün stok takibi
   □ Proje durumu (başlanmadı / devam ediyor / bitti)
   □ Tahmini süre alanı
   □ Video ekleme desteği
   □ Tarif şablonları
   □ İstatistik dashboard (en çok kullanılan ip, vs.)
```

---

## 16. ⚠️ Dikkat Edilecekler

```
🔴 KRİTİK
   → Firebase config bilgileri .env dosyasında saklanmalı
   → GitHub Pages public repo ise config görünür — 
     Firestore Security Rules ile koruma şart!
   → Firestore Rules: Sadece okuma/yazma izni (auth yok)

🟡 ÖNEMLİ  
   → iPhone PWA'da kamera erişimi HTTPS gerektirir 
     (GitHub Pages HTTPS ✅)
   → iOS Safari'de bazı animasyonlar farklı çalışabilir → test et
   → Görsel sıkıştırma mobilde yavaş olabilir → web worker düşün

🟢 İYİ PRATİK
   → Her component lazy-load (React.lazy + Suspense)
   → Görseller lazy-load (Intersection Observer)
   → Console.log'ları production'da kaldır
```

---

## 🎀 Sonuç

```
BüşraCraft; tatlı, kullanışlı, hızlı ve genişletilebilir
bir dijital örgü tarif defteri olacak.

Tek kullanıcılı yapısı sayesinde basit ama premium hissettiren,
örgü temalı animasyonlarıyla keyifli,
Firebase ile güvenilir ve ücretsiz,
PWA ile telefonda uygulama gibi çalışan
harika bir proje! 🧶✨
```

---

**Döküman onayın varsa kodlamaya başlıyorum! 🚀**

Bir değişiklik, ekleme veya çıkarma var mı?