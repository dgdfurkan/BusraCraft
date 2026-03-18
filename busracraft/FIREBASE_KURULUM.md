# Firebase Kurulum Adımları

## 1. Firestore Indexes (Zorunlu)

Keşfet sayfası ve koleksiyonlar için composite index gerekiyor.

**Firebase Console** → **Firestore** → **Indexes** → **Create Index**

Veya aşağıdaki linklere tıkla (proje ID'n ile değiştir):

- **socialPosts** (isPublic + createdAt):  
  https://console.firebase.google.com/v1/r/project/busracraft-b594f/firestore/indexes?create_composite=ClRwcm9qZWN0cy9idXNyYWNyYWZ0LWI1OTRmL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9zb2NpYWxQb3N0cy9pbmRleGVzL18QARoMCghpc1B1YmxpYxABGg0KCWNyZWF0ZWRBdBACGgwKCF9fbmFtZV9fEAI

- **collections** (userId + createdAt):  
  https://console.firebase.google.com/v1/r/project/busracraft-b594f/firestore/indexes?create_composite=ClRwcm9qZWN0cy9idXNyYWNyYWZ0LWI1OTRmL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9jb2xsZWN0aW9ucy9pbmRleGVzL18QARoKCgZ1c2VySWQQARoNCgljcmVhdGVkQXQQAhoMCghfX25hbWVfXxAC

Indexler oluşturulduktan sonra birkaç dakika sürebilir.

---

## 2. Authorized Domains (Storage CORS için)

**Firebase Console** → **Authentication** → **Settings** → **Authorized domains**

Şu domain'i ekle:
- `dgdfurkan.github.io`

Böylece GitHub Pages üzerinden Storage'a yükleme yapılabilir.

---

## 3. Storage Rules

**Firebase Console** → **Storage** → **Rules**

`storage.rules` dosyasındaki kuralları kullan veya şunu yapıştır:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /recipes/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /users/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 4. Google Sign-In (Redirect)

Google ile giriş artık popup yerine redirect kullanıyor. COOP (Cross-Origin-Opener-Policy) uyarıları bu şekilde ortadan kalkar.
