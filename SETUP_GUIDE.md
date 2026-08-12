# 📋 PANDUAN LENGKAP SETUP KEDAI KOPI LANDING PAGE

Terima kasih telah menggunakan template landing page Kedai Kopi! Dokumen ini menjelaskan cara mengonfigurasi dan mengunggah website Anda ke cPanel.

---

## 🎯 QUICK START

### 1. Struktur Folder
```
public_html/
├── index.html              (File utama)
├── js/
│   └── app.js              (Logika JavaScript)
├── css/
│   └── style.css           (Styling custom)
└── img/
    ├── hero-bg.jpg         (Gambar hero - silahkan ganti)
    └── gallery/            (Folder untuk foto galeri)
        ├── img1.jpg
        ├── img2.jpg
        └── ...
```

### 2. Upload ke cPanel
1. Buka cPanel → File Manager
2. Masuk ke folder `public_html`
3. Upload semua file dan folder di atas
4. Website siap diakses di `https://domain-anda.com`

---

## 🔥 FIREBASE SETUP (RECOMMENDED)

### Langkah 1: Buat Project Firebase
1. Kunjungi [Firebase Console](https://console.firebase.google.com)
2. Klik "Add Project"
3. Masukkan nama project (contoh: "kedai-kopi")
4. Pilih "Web" sebagai platform
5. Copy konfigurasi yang diberikan

### Langkah 2: Setup Firestore Database
1. Di Firebase Console, pilih "Firestore Database"
2. Klik "Create Database"
3. Pilih "Start in production mode"
4. Pilih lokasi region terdekat (contoh: asia-southeast1)

### Langkah 3: Buat Koleksi
Buat dua koleksi dengan struktur berikut:

**Koleksi 1: `reviews`**
```
{
  name: "Nama Pelanggan",
  rating: 5,
  comment: "Kopi enak banget!",
  timestamp: 2024-01-15T10:30:00Z
}
```

**Koleksi 2: `sales`** (Opsional - untuk real-time analytics)
```
Document ID: "today"
{
  totalAmount: 2450000,
  totalOrders: 46
}
```

### Langkah 4: Setup Security Rules
Di Firestore → Rules, gunakan konfigurasi ini:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reviews dapat dibaca oleh semua, ditulis jika ada email
    match /reviews/{document=**} {
      allow read: if true;
      allow create: if true; // Izinkan anonim submit
      allow update, delete: if false;
    }
    
    // Sales hanya bisa dibaca (read-only)
    match /sales/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Top Items hanya bisa dibaca
    match /topItems/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

### Langkah 5: Update Konfigurasi di app.js
Buka `public_html/js/app.js` dan temukan bagian ini:

```javascript
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyD...",                    // ← Ubah ini
    projectId: "kedai-kopi-12345",           // ← Ubah ini
    storageBucket: "kedai-kopi-12345.appspot.com",  // ← Ubah ini
    messagingSenderId: "123456789",          // ← Ubah ini
    appId: "1:123456789:web:abcd1234..."     // ← Ubah ini
};

const DB_TYPE = 'firebase'; // ← Pastikan ini 'firebase'
```

Dapatkan nilai-nilai ini dari Firebase Console:
- Klik "Project Settings" (ikon gear)
- Scroll ke "Your Apps" → Web App
- Copy seluruh konfigurasi

---

## ☁️ SUPABASE SETUP (ALTERNATIF)

### Langkah 1: Buat Project Supabase
1. Kunjungi [Supabase](https://supabase.com)
2. Klik "New Project"
3. Masukkan nama project dan password
4. Pilih region terdekat
5. Tunggu project selesai dibuat

### Langkah 2: Buat Tabel Reviews
Di Supabase SQL Editor, jalankan query ini:

```sql
CREATE TABLE reviews (
  id bigint PRIMARY KEY generated always as identity,
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Buat index untuk performa
CREATE INDEX reviews_created_at_idx ON reviews(created_at DESC);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa baca
CREATE POLICY "Enable read access for all users" ON reviews
  FOR SELECT USING (true);

-- Policy: Semua orang bisa insert
CREATE POLICY "Enable insert for all users" ON reviews
  FOR INSERT WITH CHECK (true);
```

### Langkah 3: Buat Tabel Sales (Opsional)
```sql
CREATE TABLE sales (
  id bigint PRIMARY KEY generated always as identity,
  total_amount integer DEFAULT 0,
  total_orders integer DEFAULT 0,
  updated_at timestamp DEFAULT now()
);

-- Insert data awal
INSERT INTO sales (total_amount, total_orders) 
VALUES (2450000, 46);

-- Enable RLS
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

-- Policy: Hanya bisa baca
CREATE POLICY "Enable read access for all users" ON sales
  FOR SELECT USING (true);
```

### Langkah 4: Buat Tabel Top Items (Opsional)
```sql
CREATE TABLE top_items (
  id bigint PRIMARY KEY generated always as identity,
  name text NOT NULL,
  count integer DEFAULT 0
);

-- Insert sample data
INSERT INTO top_items (name, count) VALUES 
  ('Cappuccino', 14),
  ('Espresso', 11),
  ('Americano', 8),
  ('Latte', 7),
  ('Pour Over', 6);

ALTER TABLE top_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON top_items
  FOR SELECT USING (true);
```

### Langkah 5: Update Konfigurasi di app.js
Buka `public_html/js/app.js` dan update:

```javascript
const SUPABASE_CONFIG = {
    url: "https://your-project.supabase.co",      // ← Ubah ini
    anonKey: "eyJhbGciOiJIUzI1N..."                 // ← Ubah ini
};

const DB_TYPE = 'supabase'; // ← Ubah ke 'supabase'
```

Dapatkan URL dan API Key dari:
- Supabase Dashboard → Settings → API
- Copy `Project URL` dan `anon public key`

---

## 🗺️ GOOGLE MAPS INTEGRATION

Untuk mengubah link Google Maps di tombol "Kunjungi Kebun Kopi Kami":

1. Buka [Google Maps](https://maps.google.com)
2. Cari lokasi kedai kopi Anda
3. Klik "Share" → Copy link
4. Edit `public_html/js/app.js`:

```javascript
const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=kedai+kopi+saya"; 
// Ubah dengan link Anda
```

Atau langsung ubah di `index.html` pada baris 58:
```html
<a href="https://maps.google.com/?q=kedai+kopi+kami" target="_blank">
```

---

## 📸 MENGUBAH GAMBAR

### Hero Background
Buka `index.html` dan cari baris ~60. Ubah URL gambar:
```html
<section id="beranda" class="hero-section relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden" style="background-image: url('UBAH_URL_INI_DENGAN_GAMBAR_ANDA'); background-position: center;">
```

Gunakan URL gambar berkualitas tinggi dari:
- [Unsplash](https://unsplash.com) - gratis
- [Pexels](https://pexels.com) - gratis
- [Canva Pro](https://canva.com) - hasil desain Anda

### Gambar Galeri
Edit `index.html` di sekitar baris 100. Setiap gambar galeri memiliki:
```html
<div class="gallery-item cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition" data-image="URL_GAMBAR_BESAR">
    <img src="URL_GAMBAR_KECIL" alt="Deskripsi">
```

Ganti `URL_GAMBAR_KECIL` dan `URL_GAMBAR_BESAR` dengan URL gambar Anda sendiri.

---

## 🔒 KEAMANAN

⚠️ **PENTING**: API Key Anda adalah rahasia!

### Best Practices:
1. **Jangan** commit API Key ke Git (gunakan .gitignore)
2. Gunakan **Anonymous Mode** untuk database rules
3. Batasi access dengan **Security Rules** yang ketat
4. Monitor usage di console Firebase/Supabase
5. Rotate API Key secara berkala

### Contoh .gitignore:
```
# Ignore sensitive files
js/config.js
.env
.env.local
```

---

## 🚀 TESTING SEBELUM PRODUCTION

1. **Test Lokal**: Buka `index.html` di browser
   - Seharusnya semua fitur bekerja (menu, galeri, dll)
   - Analytics menampilkan mock data

2. **Test Database**:
   - Submit review → Cek apakah masuk ke database
   - Refresh halaman → Review harus tetap ada

3. **Test Mobile**: Gunakan DevTools (F12) → Toggle mobile view
   - Hero section responsive
   - Menu card rapi di mobile
   - Form review mudah diakses

4. **Test Performance**:
   - Buka Chrome DevTools → Lighthouse
   - Optimasi gambar jika score rendah

---

## 📱 CUSTOMIZATION TIPS

### Ubah Warna Tema
Edit `css/style.css` di bagian root:
```css
:root {
    --primary-color: #78350f;      /* Warna utama */
    --secondary-color: #d97706;    /* Warna aksen */
    --accent-color: #f59e0b;       /* Highlight */
    --text-light: #f5f1e8;         /* Background terang */
}
```

### Tambah Menu Item
Di `js/app.js`, cari `menuData` dan tambahkan:
```javascript
espresso: [
    // ... existing items ...
    { name: "Cappuccino Spesial", desc: "Dengan karya seni latte", price: 45000 },
]
```

### Ubah Font
Di `index.html` line 8-9, ubah font dari Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Your-Font:wght@400;700&display=swap" rel="stylesheet">
```

---

## 🐛 TROUBLESHOOTING

| Problem | Solusi |
|---------|--------|
| Database tidak terkoneksi | Pastikan API Key benar di app.js |
| Reviews tidak tersimpan | Cek Security Rules di Firebase/Supabase |
| Gambar tidak muncul | Gunakan URL gambar yang valid (https) |
| Halaman lambat | Kompres gambar atau gunakan lazy loading |
| Mobile view berantakan | Periksa viewport meta tag di index.html |

---

## 📞 SUPPORT

Jika ada pertanyaan atau masalah:
1. Buka console browser (F12) → Console tab untuk error messages
2. Check Firebase/Supabase logs untuk server-side errors
3. Cek documentation resmi:
   - [Firebase Docs](https://firebase.google.com/docs)
   - [Supabase Docs](https://supabase.com/docs)

---

## ✨ FITUR BONUS

### Live Chat Integration
Tambahkan script Intercom atau Drift di akhir `index.html`:
```html
<script>
  window.intercomSettings = { api_base: "https://api-iam.intercom.io", app_id: "YOUR_APP_ID" };
</script>
```

### Email Newsletter
Integrasikan dengan Mailchimp atau ConvertKit untuk email capture

### Payment Integration
Tambahkan Stripe atau Midtrans untuk fitur e-commerce

---

**Selamat! Website Anda siap diluncurkan! 🎉☕**
