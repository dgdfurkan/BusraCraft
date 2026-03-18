Tabii, anladım—yeni gereksinimi çok net ifade etmişsin. Önce “auth yok” tasarımını bir kenara bırakıp, tamamen yeni bir kullanıcı hakları + sosyal içerik modeliyle yapılandırmamız gerekiyor. Bu mimari ileriye dönük hedeflerini (paylaşım, ekran görüntüsü, metrics, moderasyon) de çok daha düzgün destekleyecek. Aşağıda yapacağımız işleri detaylı, dökümanla uyumlu ve hata riskini minimize edecek şekilde **madde madde bir yapılacaklar listesi / döküman eklentisi** halinde sunuyorum. Projede taşma, responsive uyumsuzluk ve yetki sızıntısı gibi problemleri minimuma indirmek için her işin kontrol noktaları da belirtiliyor.

---

## BüşraCraft — Güncellenmiş UI/UX & Auth + Sosyal Akış Dökümanı (v1.1)  
**Amaç:** Üye olmayan ziyaretçilerin güvenle “sadece sosyal akışı” izleyebilmesi; seçilmiş kullanıcıların tarif ekleyebilmesi; public tariflerin Instagram benzeri tarzdaki sosyal sayfada paylaşılması; kaliteden ödün vermeden mobil/tablet/desktop uyumu korunması.

---

### 1. Kimlik Doğrulama (Authentication) Modeli: “Boş Üyelik + Rol Kontrolü”
- Projede **Firebase Authentication**’ı aktif et: E-posta + şifre (minimum), opsiyonel Google ile giriş (v1 için e-posta yeterli). Telefon doğrulama opsiyonel hedef olabilir, v1 dışı.
- Her yeni kayıt anında:
  - Kullanıcı kaydını oluştur → Firestore’da `/users/{uid}` dokümanı otomatik oluştur.
  - Bu yeni dokümanda gerekli alanları sıfır/varsayılan olarak tanımla:  
    `role: "visitor"`, `displayName: ""`, `avatarUrl: ""`, `bio: ""`, `createdAt`, `isMember: false`, `stats` boş (tarif sayısı, takipçi vb. v1 için opsiyonel).
- Rol mantığına kesin karar:
  - `visitor`: sosyal akışı görür, beğenir, yorum yapar, kaydeder; tarif ekleyemez, kendi liste/ayar erişimi yapamaz, “Tariflerim/Kategori/Liste” menülerini ve form sayfalarını render etmemezlik/onay dialogu ile block eder.
  - `member`: normal kullanım, tarif ekleyebilir, düzenleyebilir, public/private seçebilir, kendi ayar sayfalarını görür; sosyal akışta kendi paylaşımlarını görür/upsert eder. (Memberlerin de “geçici private” habit’i olacağından UI çok iyi planlanmalı.)
- Admin(me) kontrolü için güvenli bir yöntem:
  - Firestore’da benzeri bir özel alan kullan: `/users/{uid}` içinde manuel `isMember: true` (veya daha yetkili bir `role: "admin|member"`). İleride süper-admin rolleri için ayrı koleksiyon ya da custom claims düşünülebilir (v1 için doküman alanı + güvenli Rules yeterli).
- Geliştirme & test için “rol geçişi” kontrolünü zorunlu hale getir:
  - Ayarlar sayfası içerinde (yalnızca ben erişebilecek şekilde, basit URL/secret ya da konsol geçişi) `Make Member` işlemi: kullanıcı dokümanını günceller → UI anında reaktif olarak yetkileri değiştirir (auth state listener + user doc listener eşleşmeli).
- **Kesin güvenlik & hata kontrolü**
  - Firebase Security Rules’ta tüm tarif/list/kategori/yorum/koleksiyon yollarında kural kümesi yaz:  
    - Okuma: eğer paylaşım public ise herkes; eğer private ise sahibi (uid match).  
    - Yazma: sadece authenticated + member + kendi UID’sine ait işlemler. Visitor’lar tarif/ayar alanına hiçbir yöntemle yazamaz (UI engellese bile backend kesin bloklar).  
    - Sosyal comment/like/save ise authenticated herkes için izin (visitor/member), ama silme/duzenleme sahibi/yaratıcıya kısıtlanmalı; yorum sahibi kontrolü UID eşleşimi ile, yapay sahtecilik engellensin.
  - Rol header’ları olmadan route erişimi yapılmasın; route guard’lar (`ProtectedRoute`, `MemberOnlyRoute`) komponent bazında uygulanmalı, alt component’lerde tekrar tekrar aynı kontrolü çağırmak yerine context/auth hook’undan merkezi karar.
  - Console’da ya da açık kaynak incelemelerde yetki sızıntısı kısa sürede ortaya çıkar—bu nedenle ilk günden Rules’ı unit testi yaklaşımıyla (Firebase Emulator Suite ile) mock kullanıcılar için doğrula. En az “visitor okuma / member CRUD / private erişim yok / public erişim var” test caseleri olsun.

---

### 2. Veritabanı Şeması Değişiklikleri: “Tarifler + SocialPosts + Kullanıcılar + Yorumlar + Koleksiyonlar”
Gerekli yeni/ayrıştırılmış koleksiyonları netleştiriyoruz (mevcut tarif yapısı büyük ölçüde korunabilir, PR yaparken migration kolaylığı gözetelim):

- `/users/{uid}`
  - `displayName`, `avatarUrl`, `bio`, `role`, `isMember`, `createdAt`, `stats` (opsiyonel), ayarlar (tema vb. ayrı tutulabilir)
  - `following` (ileride takipçilik), şimdilik boş bırakılabilir ama yapısı konusuna kararlı olunmalı
- `/recipes/{recipeId}`
  - Önceki tüm alanları koru; ekle:
    - `isPublic`: boolean (varsayılan false/member için)
    - `ownerUid`: auth.uid (iç rigidi, düzenleme filtresi için kritik)
    - Opsiyonel: `socialEnabled`: boolean (bazı tariflerin sosyal görünümle eşleşmesini ayrı kontrol etmek için), başlangıçta public → otomatik sosyal paylaşım
  - Alt not olarak: tarifin herhangi bir anda private yapıldığında, “sosyal akıştan kaldır” akışı otomatik çalışsın (listener/idealde batch update ya da cache invalidation).
- `/socialPosts/{postId}`
  - Bu koleksiyon, sosyal görünümde gösterilecek “post”ları içerir. Her post, genel akış performansı için özet veriyi taşımalı:
    - `recipeId`, `ownerUid`, `ownerName`, `ownerAvatar`, `title`, `coverImageUrl` (thumbnail/hero), `excerpt` (kısa önizleme metni), `createdAt`, `updatedAt`
    - `isPublic`: post’un altta driven olduğu tarif publicse true (konsistens için recipe.isPublic ile senkron gerekli)
    - `likeCount`: number, `saveCount`: number, `commentCount`: number
    - Opsiyonel: etiket listesi (tarif etiketleri senkron), kategori bilgisi (filtre kolaylığı için cache)
  - Tasarım kararları:
    - Bir tarif public yapıldığında otomatik post oluşturmalı (transaction/batch), private olunca post silmeli veya `isPublic=false` çevirmeli. Bu akışda race-condition olmaması için transaction + “recipeId → postId” mapping yapısına ihtiyaç olabilir (ör. aynı recipeId’de tek post politikası; ya da post içinde recipeId global unique— tercih: recipeId tekil post).
    - Sık güncellemelere karşı post alanları “event-based” hesaplanır: like/comment/save işlemleri kendi koleksiyonlardan sayar, post güncellenmez; okunurken aggregate (çoğu durumda Firestore aggregate destek güncel; değilse okuma + küçük in-memory counter). Basitlik için başlangıçta okunurken count mantığı yeterli olabilir; scale olursa counter worker olayı.
- `/likes/{likeId}`
  - `userId`, `postId`, `createdAt`
  - Unique constraint için composite index: `{userId, postId}` ve `postId` için listeleme index’i.
- `/comments/{commentId}`
  - `postId`, `userId`, `authorName`, `authorAvatar`, `text`, `createdAt`, `updatedAt`
  - Silme soft-delete (isDeleted) + UI’de “silindi” gösterimi, ya da hard delete—v1’in sosyal moderasyonu yok; hard delete yeterli olabilir ama ileride raporlama için soft tercih edilir.
  - Uzun metin, multiline, emojili vs için karakter sınırı + scrub (temel XSS filtresi), imla/auto-link önerisi ileride.
- `/saves/{saveId}` (koleksiyon kaydetme)
  - `userId`, `postId`, `collectionId`, `createdAt`
  - Unique: `{userId, postId, collectionId}` index; kullanıcı “genel koleksiyona” da kaydedebilirse collectionId nullable olabilir—ama Instagram usulü “collection seç” daha temiz; nullable yerine “varsayılan ‘Favoriler’ koleksiyonu” oluşturmayı öneririm.
- `/collections/{collectionId}`
  - `userId`, `name`, `description`, `emoji/color`, `createdAt`, `updatedAt`
  - Kullanıcılar kendi koleksiyonlarını CRUD eder; visitor’lar bu koleksiyonu görmesin (menu engelle), ama mevcut oturumda save/collection picker gösterilebilir—UI’dan block etmek yeterli değil, Rules kesin.
- (Opsiyonel ama önerilir) `/postMeta/{postId}`
  - Analytics/debug için (hiçbir kullanıcıya göstermeden, sayfa performansı vs). Şimdilik atlanabilir; ihtiyacınız olursa ekleyelim.

**Migrasyon & uyumluluk notu**
- Eski tariflerin `isPublic` alanı olmayacak → default false. UI’da “public yapınca paylaş” şeklinde progressive disclosure; eski tarifler sosyal akışa otomatik eklenmesin (karışıklık), sadece yeni/public edilenler görülmeli—bu karar dokümana net yazılmalı.

---

### 3. UI/UX: Sosyal Akış (“Medya” Sekmesi) Tasarımı — Instagram Kalitesinde, 3 Ekran Uyumluluğu
Bu kısım nitelik açısından en kritik. Tasarım token’ları (tipografi, spacing, radius, shadow, borders) ve performans kilit noktaları birlikte planlanmalı.

- Sekme yapısı güncellemesi:
  - Mevcut navigasyonda yeni sekme ekle: **“🧵 Sosyal” / “Keşfet”** (isim netleşsin; “Sosyal” iyidir, anlaşılıyor). Mobil bottom nav’a uygun yerleştir; desktop sidebar’da da görünür olmalı.
  - Doğru route guard: `visitor` kullanıcılar sadece bu sekmeye erişebilsin; diğer sekmeler için `MemberOnlyRoute` returning “Erişim engellendi” ekranı + CTA’ya yönlendiren modal (ya da button disabled + tooltip).
- Görünüm seçenekleri (mutlaka iki mod):
  - **Feed View (Aşağı kaydırmalı, kronolojik + en güncel üstte)**:
    - Mobilde tam dikey kart listesi, tablet/desktop’te içerik okuma rahatlığı için makul genişlikte merkezlenmiş sütun (ör. max-w-xl, max-w-2xl). Çok geniş monitörde sola/sağa uçuk “boş alan depresyonu” yaşamadan okunabilir blok.
    - Post kartı üst yapısı: avatar + isim + tarih/saat + opsiyonel kategori badge + üç nokta menü (kendi post’un varsa düzenle/private yap; başkasıysa bildir/incele—v1’de sade tutalım; ileride moderation).
    - Hero görsel: tam kapsayıcı, doğal aspect-ratio koruyan modern düzen (object-cover, rounded-xl). Görsel kalitesini korurken yükleme performansı için `loading="lazy"` + aspect-ratio wrapper + sharp-thumb (firebase storage rule kadar thumb endpoint) tercih et. Çok kırpma/kutu baskını göstermeyin; örgü ürünleri detaylı görünmeli.
    - Başlık + kısa excerpt: metin çok uzun olmamalı, “Devamı için → Tarif Detay” CTA’sı net. Prefer: excerpt tarif adım özetinden üretilebilir (kısa ilk 80–120 karakter), ya da tarif title + tag önizlemesi.
    - Alt aksiyonlar (kesin): Beğen, Kaydet (koleksiyon), Yorum, Paylaş (v2 için buton hazır bulunsun). İkonlar modern, yuvarlak gölgelenmeyen ama hafif yükselen kart tabanı; hover/focus states’e özen (erişilebilirlik).
    - Beğen: anlık feedback veren animasyon (kalp pop), optimistic update + hata durumunda revert; double-tap işlemi opsiyonel ama iyi hissettirir (v1’de buton yeterli, ama altyapıyı hazırlayın).
    - Yorum: inline yorum listesi (ilk 2–3 yorum) + “Tüm yorumları gör” açılır panel/modal. Yorum giriş alanı multiline, tam genişlik, autofocus engellenebilir mobilde, gönder butonu context-aware. Kontrol: yorum listeleme pagination (sayfa başına 10–20) → smooth append/load more; eski yorumlar scroll sync’te lastCommentId cursor mantığı.
    - Kaydet/Koleksiyon: tıklayınca açılır modal/inline picker; mevcut koleksiyonlar listelenir, yeni koleksiyon oluştur seçeneği şık kartlar halinde. Koleksiyon oluşturma modal’da emoji/color önset + isim/desc; kaydetmeden önce hızlı preview (saved badge ile post’ta ikon değişimi).
    - Geri bildirim & boş durum: post yoksa “Henüz kimse paylaşmadı, ilk paylaşan sen ol” motivasyonu taşıyan boş state; görsel hafif yumaşak örgü motifleri, animasyonlu. Arka plan: FloatingYarn çok hafif, reading comfort’ı bozmadan.
  - **Grid View (Pc/tablet’te 3–4 kolon, mobilde 1–2 kolon)**:
    - Performance çok önemli: büyük görsel ve çok kart paralel render yapmamalı. Grid’de image placeholder + transition, col count breakpoint’lere duyarlı. Mobilde masonry gerekebilir ama ilk etapta düzenli grid, aspect-ratio ile kırılma olmadan.
    - Her grid item: kapak görsel, başlık overlay (okunabilir kontrast), badge (if any), beğen sayısı mini gösterim, koleksiyona ekle hızlı buton (ya da tıklanınca detay açılır—tercih: detay açılması standard, grid keşif için; hızlı like/save ise ayrı micro-action alanı).
    - Hızlı filtre/arama bu view’de de olmalı: aşağıda “Filtre” paneli sticky (desktop), mobilde sheet modal.
- Paylaşım (Share) akışı v2’de derinleşecek ama UI placeholder’ı konmalı:
  - Paylaş butonu → “Ekran Görüntüsü al / Paylaş” modal teaser’ı + disabled rule (şimdilik iOS/Android native share, web’de download fallback). v2’de özel post görseli çıktısı planlansın; şimdilik UX’in kırılmaması için copy link + download opsiyonları yeterli.
- Filtreleme sistemi (büyük önem): sosyal sayfada sadece kategori/etiket değil, **public paylaşan member kullanıcıları** da seçilebilmeli.
  - Üst filtre çubuğuna “Paylaşan (Üyeler)” çoklu seçim dropdown eklensin: Firestore’dan unique ownerUid’lerden user isimlerini getir (cache etmeyi unutma; ilk açılışta getUsers meta koleksiyonu, ya da user doc’lardan sterk proje edilir). Bu dropdown scrollable, searchable, chip gösterimli olmalı.
  - Filtreler birleşmeli: kategori + etiket + paylaşan kişi + zaman (son 24h / hafta / ay / tümü). Her seçim değiştiğinde debounced query tetiklensin (client-side filtering mümkün; ancak post sayısı büyüdükçe page + cursor şart—bu büyüklük modeli için pagination altyapısını hazırlayın, ilk 20 sonra “daha fazla”).
  - Filtre sıfırlama butonu + “yanlışlıkla boş ekran”yu koruyan mantık: filtreler sonuç vermediğinde öneri (popüler tag’ler, en aktif üyeler) gösteren yardımcı panel.
- Erişilebilirlik + kontrast + dokunma hedefleri:
  - CTA’lar minimum 44x44px, tap area’lar boşluklarla geniş tutulur. Metin kontrastları tema değişimlerinde de sağlanır; özellikle tile başlık overlay’i WCAG uyumlu olsun.
  - Klavye gezinimi: post listesi içinde tab sırası açık, like/save yorum alanı için ARIA label’ları, modallar escape ile kapanır. Share/Collection modal’ında focus trap.
- Mobil özel dikkatler (tasarımda kırılma olmaması için):
  - Bottom nav aktifken içerik altında fazladan padding, FAB varsa tehlikeli çakışma olmamalı. Sosyal sayfada FAB gerekmiyor; içerik odaklı olması daha doğal.
  - Yorum yaparken klavye açılma anlarında scroll-restore, scroll jump engelle; react-virtual/virtüal list gerekebilir (ilk etap performance basit, 50-150 post’ta sorun olmaz; ileride package hazır bulunsun).
  - Swipe-to-dismiss kullanılabilir (paylaşım detayında history back/close), ancak carousel/swipe’lar oldukça dikkat ister—bu özelliği “sonraki güncelleme” kapsamına yazmak, erken eklersen bug riski yüksek.

---

### 4. Component & Hook Yeniden Düzeni: Post, Like, Comment, Save, Collection Sistemleri
Kod seviyesinde bir “social” modülü oluşturuyoruz, mevcut recipe modülünden mantıksız bağımlılık yaratmadan.

- Yeni component seti:
  - `SocialFeed.jsx`: feed-view container, infinite pagination logic, “load more”/pull-refresh (opsiyonel), state for filter + view toggle.
  - `SocialGrid.jsx`: grid container, responsive cols, lazy images, keystroke navigation.
  - `PostCard.jsx`: üst bilgi, görsel, başlık/excerpt, aksiyon bar (like/save/comment/share), yorum özet, badge. Props: post, isOwner, liked, saved, onLike, onSave, onComment, onShare, onTogglePublic (owner ise).
  - `CommentList.jsx`, `CommentInput.jsx`: yorumlar, sayfalama, silme butonu (sahibi), karakter limit, placeholder’lar, boş states.
  - `LikeButton.jsx`: pulse animasyonu, sayım; optimistic update ile hata rollback; aria-live bildirimi (“Beğenildi”).
  - `SaveButton.jsx`: tıkla → `SaveModal` aç, seçilen collection’a ekle; callback ile saved state güncelle.
  - `SaveModal.jsx`: liste selector + yeni koleksiyon kartları; hızlı emoji/color preset, input states, loading, onSuccess/onClose.
  - `CollectionList.jsx`, `CollectionCard.jsx`, `CollectionDetail.jsx`: kullanıcı kendi saved post’ları koleksiyon bazında görür; koleksiyon düzenleme/silme (visitor ulaşamaz route-level).
  - `UserFilterDropdown.jsx`: kullanıcı isimlerini arayarak seç, chip’ler, “tümünü temizle”; render edilecek item’larda avatar, isim, post sayısı (opsiyonel görsel). Veriyi user doc’lardan ya da users meta cache’den çeker—cache stratejisini hook’ta merkezi yap.
  - `ViewToggle.jsx`: feed/grid icon group; animasyonlu geçiş, persisted choice (localStorage → görünümler kullanıcı tercihi).
- Hook’lar:
  - `useSocialFeed({filters, view, cursor})`: socialPosts listen, pagination cursor, real-time snapshot (opsiyonel; gerçek time stream hoş olabilir ama ilk etap manual refresh/load more yeterli; real-time fazladan maliyet + karmaşık diff riskleri var).
  - `useLikes(postId)`: like count + currentUserLiked; toggleLike optimistic, firestore transaction/batch tercihi (count’lar merkezi aggregate olursa daha temiz).
  - `useComments(postId, pageSize)`: liste + ekle/sil; silmede yetki kontrolü, pagination cursor.
  - `useSaves(postId)`: saved state + save/toggle; collection picker entegrasyonu.
  - `useCollections()`: kullanıcı koleksiyonları CRUD; varsayılan “Favoriler” koleksiyonu ilk çalıştırmada otomatik oluştur (idempotent).
  - `useMembersForFilter()`: public paylaşan kullanıcı listesini getiren cache; ownerUid’lerden user map elde et; düzenli güncellensin (tarif public/privat değişince ya da yeni kullanıcı olunca).
  - `useRecipePublisher()`: tarif oluştur/duzenle sırasında “Public yap” işaretlendiğinde createUpdatePost + isPublic sync; private yapılınca post kaldır (transaction). Bu hook’un hata senaryoları çok önemli: post oluşturulamadıysa tarif rollback, çift post oluşmasın, duplicate prevention logic şart.

---

### 5. Route & Sayfa Yapısı Güncellemesi: Visitor vs Member Güvenli Erişimi
Tam route yapısını yeniden çizmek gerekir; mevcut sayfaları bozmadan yeni sosyal akışı entegre ediyoruz.

- Route haritasına eklemeler:
  - `/sosyal` → `SocialFeedPage` (ya da altında `/sosyal/feed` vs; basitlik için tek route yeterli, URL okunabilir olsun).
    - İçeriğinde view toggle, filtreler, grid/feed renderer, pagination state.
  - `/koleksiyonlarim` → `CollectionsPage` (member-only). Visitor erişmeye çalışırsa redirect veya erişim engelleme ekranı.
  - `/koleksiyon/:collectionId` → `CollectionDetailPage` (member-only). İleride paylaşılabilir profiller düşünülürse bu route “profil/koleksiyon” yapısına evrilebilir; şimdi sadece sahibi görsün.
  - `/profil/:uid` tercihi v1’de opsiyonel (visitor’ların profiller görmesi tamam ama şu an asıl hedef sosyal akış; profil detay paylaşım/istatistik fetch’i yorar). Eğer yapacaksan protected mantığıyla: visitor kendi UID’sini görebilir mi? Karar: visitor kendisini bile (displayName/dolu değilken karmaşık) görmemeli—profil yönlendirmesi member-only kalsın, v2’de takip/istatistikle birlikte.
- Route guard standartları:
  - Her protected sayfa render’ı öncesinde auth + user doc rol/isMember kontrolü; değilse `Navigate` veya `AccessDenied` ekranı göster. “Guard edilmemiş component” hatasını asla bıraktırmayın (lint/ekstra wrapper şart).
  - Menüde de conditional rendering: visitor için sadece 🧵 Sosyal ve Ana Sayfa; member için Tariflerim, Liste, Kategoriler, Koleksiyonlarım, Ayarlar görünür. Bu kontroller client-only değil—mutation çağrılarını backend engelliyor; UI sadece deneyimi düzgünleştirir.
- URL ve deeplinkler:
  - sosyal post detayına özel bir route gerekip gerekmediğine karar ver (şu an recipe detay zaten var; post kartından detay’a giderken recipeId üzerinden yönlenmek çoğu durumda yeterli). Eğer post paylaşım linkleri isteniyorsa `/post/:postId` route’u eklenebilir, post’tan recipeId çözümlenir. v1 için recipeId üzerinden devam tercih edilebilir; UX’de “Tarif Detay” vurgusu daha tutarlı.
- GitHub Pages uyumu:
  - HashRouter kullanıyorsan `/#/sosyal` gibi yapıda bir sorun yok; yapıyı koru, yeni rotaları eklemesi kolay olsun. Menülerde href’leri doğru hash pattern’iyle bağla; link dışına programatik navigate’de de hash-aware tutarlılık.

---

### 6. Performans, Veri Akışı ve Kota Yönetimi (Sosyal Artışa Hazırlık)
Sosyal akış, okunma sayısını ciddi artırır. Firebase bütçesini korumak için önlemler şart.

- İlk açılış verisi stratejisi:
  - Tüm tarifler için eskiden olduğu gibi cache mantığı iyi; sosyal akışta da `socialPosts`’u ilk load → cache → sayfa ilerledikçe cursor. Eğer gerçek time güncellemeler istenirse “snapshot listener” yerine periyodik refresh veya “yeni post varsa bildirim” yaklaşımı daha kontrollüdür (listener sayısı kullanıcı sayısıyla çarpılabilir).
- Görsel iyileştirme pipeline’ı:
  - Tarif oluştururken veya “public yapınca” akışında cover görselini otomatik olarak thumbnail üret: ör. 800x (tablet/desktop), 600x (mobil) thumb(s), ve “çok büyük” orijinalleri ayrı referans olarak tut. Storage download maliyetini düşür, network waterfall’ını azalt. UI’da thumb yükle, scroll yakınken origin’e geç (Progressive Loading) bir pattern uygula; bunun için image skeleton + onLoad transition.
- Sayım (like/save/comment) optimizasyonu:
  - Basit başlangıç: her okunmada aggregation; ölçeklenme olursa Cloud Functions ile “count” dokümanı/field’i güncelleme (event trigger) ya da Firestore Aggregate API kullan. Başlangıçta aggregate yoksa bile, merkezi bir “counter koleksiyonu” modeli eklemek ileride çok yardımı olur; yapıyı bu yönde esnek bırak.
- Pagination & query planı:
  - socialPosts için `createdAt` desc index şart; ayrıca `ownerUid` filtreleri de index gerektirir. Firestore’da compound index’leri planlamadan çalıştırırsan runtime hata gelir—deploy öncesi emulator’da sorguları doğrula. Cursor pagination’ı (lastVisible) mutlaka uygula; offset’li fetch’ler pahalıdır.
- Rate limit & spam koruması (zorunlu olmayan ama gerekli adım):
  - v1 için basit limit: ziyaretçilerin dakikada yorum/like sayısı, duplicate like engelleme, çok kısa “aynı metin” yorum engeli (basit Levenshtein ya da cooldown). Visitor/member ayrımında visitor’ların daha dar davranış penceresi olmalı (Rules zaten çoğu yazmayı engeller; UX’de de kısıt). Spam artarsa Cloud Functions moderation yapılabilir; başlangıç önlemi client-side cooldown + basic validation.
- Monitoring ipuçları (geliştirme sırasında):
  - Sayfa analiz hook’ları (opsiyonel console log, production’da verbose kapalı): toplam fetch, cache hit, image src seçimleri, post count, filtre geçiş süreleri; performans regresyonunu yakalamak için ekran yükleme metrics’i ekleyebilirsin (web-vitals). Burada yanlışlıkla çok sık listener tetikleyen patlar genellikle sosyal akışta çıkar.

---

### 7. Erişilebilirlik, i18n hazırlığı ve “Kalite Kontrolleri” (Taşma, Responsive Olmaması Riski Sıfırlamak İçin)
Bu listeyi “final check” olarak uygulamadan release yapma.

- Responsive audit maddeleri (tüm breakpoint’lerde):
  - Mobil (320–430px): bottom nav görünür, post kartı tam genişlik, görsel kırılmadan aspect, başlık/excerpt okunabilir, aksiyon bar squeeze olmadan, yorum input klavye açıldığında fiske yok (safe-area + min-content padding). Özellikle post başı “avatar + isim” satırında wrap/reflow kontrolü; ad uzunluğunda truncation politikasını belirle.
  - Tablet (744–1024px): grid 2–3 kolon, feed merkez sütun; filtre paneli altında ezilme olmamalı, sticky mantığıyla ekranı parsellemesi yanlışlıkla içerik altına düşmesin (z-index/overflow-test).
  - Desktop (≥1280px): grid 3–4 kolon, sidebar + içerik oranları düzgün, post genişliği ideal okuma blokunda, tooltip/overflow menü ekran dışına taşmıyor (popover portal + flip logic şart).
- Testing checklist (manuel + basit otomasyon):
  - Visitor akışı: sadece sosyal görünür, menüde diğerleri yok, tarif ekleme URL’sine gitmeye kalktığında guard, post üzerindeki like/save/comment çalışıyor, kendi post değil action’larda edit menüsü görünmüyor, koleksiyon modal açılır ama “kaydet” başarılı fakat route redirect’te 403.
  - Member akışı: tarif oluştur → public yap → sosyal akışta görünüyor → private yap → kayboluyor (realtime/refresh sonrası), düzenle menüsü görünür, kendi post’ta edit menüsü çalışıyor, koleksiyon oluştur/ekle/çıkar mantığı, filtre “paylaşan üyeler” listesi güncel, selection değişince sonuç değişiyor.
  - Performans: 100–200 post’lu senaryoda smooth scroll, image lazy-load çalışıyor, filtre değişiminde yükleniyor spinner olmadan debounce, çok hızlı like spam’ında optimistic stabil, yorum pagination sorunsuz.
  - Cross-browser: Safari/iOS klavye davranışı, PWA standalone’da inset, Chrome masaüstünde grid overflow, yön değişikliği (landscape) raporu; özellikle carousel kullanılmayacak (küçük risk azaltma), ama swipe menülerde taşma olmaz.
  - Erişilebilirlik: screen reader label’ları, focus sırası, toast sonrası odak geri dönüşü, renk körü kontrast kontrolü (özellikle kart başlığı overlay’leri), klavye ile modal kapatma/collection seçme.
- Kopya & onboarding:
  - Boş social state, boş koleksiyon state, visitor engelleme ekranı için kısa açıklayıcı metinler hazırla; özellikle “burada diğerlerin paylaşımlarını görürsün” ve “üye olursan tariflerini koyabilirsin” yönlendirmeleri net. Tone: samimi, örgü sohbeti yapısı korunmalı (tasarım dili devam).
- Debug & sanity guardları:
  - Development’da “rol simülatörü” butonu (toolbar ya da özel route) olsun; prod’da gizli kalmalı, yanlışlıkla aktif edilmemeli. Ayrıca log’larda “unauthorized write attempt” gibi olayları izlemek için merkezi error toasty + quota fallback raporları olsun (quota aşımı zaten vardı; sosyal artınca o mantık çok faydalı olur).

---

### 8. Zamanlama & En Çok Dikkat Edilecek Çakışma Noktaları (risk azaltmak için)
- En kritik: **Firestore Rules + route guards + UI disable** üçlüsünü paralel geliştirin. Birinde boşluk kalırsa güvenlik açığı oluşur.
- “Tarif public yapınca post yarat” akışında race/duplicate koşullarına karşı transaction yapmayı planlayın; bu akış olmadan sosyal sayfa tutarsız görür (bazısı yok, bazısı çift vs).
- Sosyal akış performans regresyonu çok kolay çıkar: listener, büyük görseller, fazla render. İlk PR’da feed pagination hazır olsun, grid’de col-count + lazy-image alt yapısı olsun; bunlar sonradan büyük refactor gerektirir.
- Misafir kullanıcıların yorum/like akışında geri bildirim süreci iyi test edilmeli; anlık like spam’ında lokal state bozulmasın, optimistic rollback mekanizması çalışsın.

---

## Sonuç & Sıradaki Adım
Bu güncelleme, projenin “kişisel tarif defteri → toplulukla paylaşılan yavaş yavaş büyüyen bir keşif alanı” dönüşümünü güvenli, performanslı ve premium görünümlü şekilde sağlar. Yukarıdaki madde seti ile birlikte, bir sonraki adımım size tam entegre bir “v1.1 mimarisi” (UI wire + gerekli Firestore sorgu/indeks şablonları + route yapısı + örnek component API’leri) ve şart olan Firebase Rules şablonu sunmak olur. 

Yapmak istediğin özel tercihler var mı: sosyal akışta **takas/satış** konseptine hiç girmeyeceğiz (şimdilik sadece keşif), paylaş butonu v1’de sadece copy link mi yoksa native share mi, avatarları nasıl handle edeceğiz (otorite foto yoksa initials + örgü pattern fallback), yorum moderasyonu düşünmüyorsan hard-delete yeterli mi, grid view’de masonry mi düzenli grid mi? Bu kararlarla listeyi tam “uygulama başlatma reçetesi” haline getirelim.