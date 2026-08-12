# KONFIGURASI TEMPLATE UNTUK DATABASE

File ini menunjukkan bagaimana mengisi konfigurasi Firebase atau Supabase.

## ⚙️ FIREBASE CONFIGURATION

Setelah membuat project Firebase, copy konfigurasi dari Firebase Console → Project Settings.

Konfigurasi Anda akan terlihat seperti:
```javascript
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "kedai-kopi-xxxxx.firebaseapp.com",
    projectId: "kedai-kopi-xxxxx",
    storageBucket: "kedai-kopi-xxxxx.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};
```

**INSTRUKSI:**
1. Buka `js/app.js`
2. Cari bagian `FIREBASE_CONFIG` (sekitar baris 4-11)
3. Ganti nilai-nilai di atas dengan konfigurasi Firebase Anda
4. Ubah `DB_TYPE` menjadi `'firebase'`
5. Pastikan Firestore Database sudah dibuat

---

## ☁️ SUPABASE CONFIGURATION

Setelah membuat project Supabase, ambil kredensial dari Settings → API.

Konfigurasi Anda akan terlihat seperti:
```javascript
const SUPABASE_CONFIG = {
    url: "https://xxxxxxxxxx.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};
```

**INSTRUKSI:**
1. Buka `js/app.js`
2. Cari bagian `SUPABASE_CONFIG` (sekitar baris 14-18)
3. Ganti `url` dan `anonKey` dengan kredensial Supabase Anda
4. Ubah `DB_TYPE` menjadi `'supabase'`
5. Pastikan tabel `reviews`, `sales`, dan `top_items` sudah dibuat

---

## 🗺️ GOOGLE MAPS LINK

Update link Google Maps dengan lokasi Anda:

```javascript
const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=kedai+kopi+anda";
```

Cara mendapatkan link:
1. Buka Google Maps
2. Cari lokasi kedai kopi Anda
3. Klik "Share" → Copy link

---

## 📝 CHECKLIST BEFORE DEPLOY

- [ ] Konfigurasi Firebase atau Supabase sudah diisi
- [ ] Database rules sudah diatur (izinkan read/create)
- [ ] Tabel/Koleksi sudah dibuat di database
- [ ] Gambar hero dan galeri sudah diupload ke `img/` folder
- [ ] Google Maps link sudah diupdate
- [ ] Semua file sudah di-test lokal terlebih dahulu
- [ ] API Key sudah dihapus dari version control (.gitignore)

---

**PERHATIAN:** Jangan share API Key Anda ke publik!
