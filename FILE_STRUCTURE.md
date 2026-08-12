# 📂 STRUKTUR FILE LENGKAP & PENJELASAN

Panduan lengkap tentang setiap file dan folder di project ini.

---

## 🎯 OVERVIEW STRUKTUR

```
web-coffee-shop/                 ← Root project folder
├── public_html/                 ← Folder yang diupload ke cPanel
│   ├── index.html               ← File HTML utama (paling penting)
│   ├── js/
│   │   └── app.js               ← Logika JavaScript semua fitur
│   ├── css/
│   │   └── style.css            ← Custom CSS & animations
│   ├── img/
│   │   ├── hero-bg.jpg          ← Gambar hero (ganti ini!)
│   │   └── gallery/             ← Folder untuk 6 gambar galeri
│   │       ├── img1.jpg
│   │       ├── img2.jpg
│   │       └── ... (sampai 6 images)
│   └── README.md                ← Quick reference di production
│
├── SETUP_GUIDE.md               ← Panduan setup Firebase/Supabase (READ THIS!)
├── CONFIG_TEMPLATE.md           ← Template konfigurasi database
├── DEPLOYMENT_CHECKLIST.md      ← Checklist sebelum production
├── FILE_STRUCTURE.md            ← File ini
├── .gitignore                   ← Git ignore sensitive files
└── README.md                    ← Project overview
```

---

## 📄 FILE-BY-FILE EXPLANATION

### 1. `public_html/index.html` (MAIN FILE)
**Ukuran:** ~15KB
**Deskripsi:** File HTML utama yang berisi struktur seluruh halaman.

**Struktur:**
```
<!DOCTYPE html>
<html>
<head>
  - Metadata & SEO tags
  - Tailwind CSS CDN
  - Google Fonts
  - Link ke custom CSS
</head>
<body>
  1. Navigation bar (sticky)
  2. Hero section (full screen)
  3. Gallery section (modal lightbox)
  4. Menu section (dengan tabs kategori)
  5. Analytics section (dashboard)
  6. Review section (form + display)
  7. Footer (links & info)
  
  <script src="js/app.js"></script> ← Load JavaScript di akhir
</body>
</html>
```

**Bagian Penting:**
- Line 1-15: DOCTYPE & Meta tags
- Line 20: Tailwind CSS CDN (internet required!)
- Line 52: Hero section dimulai
- Line 92: Gallery section dimulai
- Line 156: Menu section dimulai
- Line 225: Analytics section dimulai
- Line 295: Review section dimulai
- Line 365: Footer

**Yang Perlu Diubah di File Ini:**
- Hero background image URL (line ~60)
- Gallery image URLs (line ~108-138)
- Google Maps link (line ~59)
- Nama kedai di navigation (line ~45)
- Social media links di footer (line ~364-368)

---

### 2. `public_html/js/app.js` (LOGIC FILE)
**Ukuran:** ~20KB
**Deskripsi:** Semua JavaScript logic untuk fitur-fitur interaktif.

**Section Breakdown:**

| Bagian | Lines | Fungsi |
|--------|-------|--------|
| Database Config | 1-25 | API Key & database selection |
| Gallery Modal | 30-60 | Lightbox functionality |
| Menu System | 65-120 | Menu filter & rendering |
| Analytics | 125-170 | Display sales data |
| Firebase Init | 175-210 | Setup Firebase connection |
| Supabase Init | 215-240 | Setup Supabase connection |
| Review Firebase | 245-310 | Firebase review operations |
| Review Supabase | 315-380 | Supabase review operations |
| Analytics Firebase | 385-430 | Firebase analytics |
| Analytics Supabase | 435-480 | Supabase analytics |
| Rating System | 485-530 | Star rating interaction |
| Form Handling | 535-580 | Review form submission |
| Initialization | 585-620 | Auto-load SDK & init |
| Smooth Scroll | 625-635 | Navigation smooth scroll |

**Yang Perlu Diubah:**
- Line 4-11: `FIREBASE_CONFIG` - Isi dengan API Key Firebase Anda
- Line 14-18: `SUPABASE_CONFIG` - Isi dengan URL & Key Supabase Anda
- Line 20: `DB_TYPE` - Ubah ke 'firebase' atau 'supabase'
- Line 23: `GOOGLE_MAPS_LINK` - Ubah dengan lokasi Anda

---

### 3. `public_html/css/style.css` (CUSTOM STYLES)
**Ukuran:** ~5KB
**Deskripsi:** Custom CSS untuk styling lebih advanced dari Tailwind.

**Bagian:**
- CSS Variables (color scheme)
- Hero section styling
- Button effects & animations
- Gallery hover effects
- Analytics card animations
- Modal animations
- Rating stars styling
- Responsive tweaks
- Scrollbar styling

**Yang Bisa Diubah:**
- Line 6-11: `:root` variables - warna tema
- Keseluruhan file untuk customize animasi & effects

---

### 4. `public_html/img/` (IMAGES FOLDER)
**Struktur:**
```
img/
├── hero-bg.jpg                  ← Background hero (upload gambar Anda!)
└── gallery/
    ├── img1.jpg (interior)      ← Ganti dengan foto fasilitas
    ├── img2.jpg (outdoor)       ← Ganti dengan foto outdoor
    ├── img3.jpg (garden)        ← Ganti dengan foto kebun
    ├── img4.jpg (morning)       ← Ganti dengan foto morning vibes
    ├── img5.jpg (beans)         ← Ganti dengan foto biji kopi
    └── img6.jpg (brewing)       ← Ganti dengan foto brewing
```

**Rekomendasi:**
- Format: JPG untuk foto, PNG untuk graphics
- Ukuran: < 500KB per file (optimasi dengan TinyPNG)
- Resolution: Min 1920x1280px untuk hero (high quality)
- Aspect ratio untuk gallery: 1:1 (square) untuk konsistensi

**Current: Menggunakan URL Unsplash (placeholder) - GANTI INI**

---

### 5. `public_html/README.md`
**Deskripsi:** Quick reference guide untuk production (jika butuh debugging di server).

**Isi:**
- Project overview
- File descriptions
- Customization tips
- Troubleshooting

---

### 6. `SETUP_GUIDE.md` (ROOT LEVEL)
**Deskripsi:** **BACAAN PALING PENTING!** Panduan lengkap setup database.

**Bagian:**
1. Quick start (upload ke cPanel)
2. Firebase setup (lengkap step-by-step)
3. Supabase setup (lengkap step-by-step)
4. Google Maps integration
5. Image customization
6. Security best practices
7. Testing guide
8. Troubleshooting

---

### 7. `CONFIG_TEMPLATE.md`
**Deskripsi:** Template & checklist untuk mengisi konfigurasi.

**Isi:**
- Firebase config template
- Supabase config template
- Google Maps instruction
- Pre-deploy checklist

---

### 8. `DEPLOYMENT_CHECKLIST.md`
**Deskripsi:** Checklist sebelum deploy ke production.

**Bagian:**
- Pre-deployment checks (content, branding, database)
- Testing checklist (functionality, responsive, browser)
- Deployment steps
- Monitoring & optimization

---

### 9. `.gitignore`
**Deskripsi:** Tell Git apa yang tidak perlu di-track.

**Ignored:**
- `.env` files (sensitive data)
- `node_modules/` (jika ada)
- IDE folders (`.vscode`, `.idea`)
- OS files (`.DS_Store`, `Thumbs.db`)
- Log files

**PENTING:** API Key Anda tidak akan terakses orang di GitHub!

---

## 🔄 DATA FLOW

### Hero Section Flow
```
User sees hero section
    ↓
Clicks "Kunjungi Kebun Kopi Kami" button
    ↓
Opens Google Maps (external link)
```

### Gallery Flow
```
User sees gallery grid
    ↓
Hovers/clicks image
    ↓
JavaScript: gallery-item click handler (app.js line ~40)
    ↓
Sets modal image source
    ↓
Shows modal (#imageModal)
    ↓
User clicks X / ESC / outside
    ↓
Modal closes
```

### Menu Flow
```
Page loads
    ↓
JavaScript: renderMenu('espresso') - default category
    ↓
Fills #menuContainer dengan Espresso items
    ↓
User clicks category tab
    ↓
JavaScript: category-tab click handler (app.js line ~80)
    ↓
renderMenu(category_name)
    ↓
Grid updated dengan items baru
```

### Review Submission Flow (dengan Firebase)
```
User fills form & clicks submit
    ↓
JavaScript: reviewForm submission handler (app.js line ~540)
    ↓
Validates input (name, rating, comment)
    ↓
Sends data ke Firebase (submitReviewFirebase)
    ↓
Firebase saves ke collection "reviews"
    ↓
Success message shown
    ↓
Form cleared
    ↓
JavaScript: loadReviewsFromFirebase
    ↓
Fetches latest reviews dari Firebase
    ↓
Updates review display
```

### Analytics Flow (dengan Firebase)
```
Page loads
    ↓
JavaScript: startAnalyticsFirebase (app.js line ~400)
    ↓
Sets real-time listener ke Firestore documents
    ↓
Document "sales/today" updates
    ↓
Listener triggers
    ↓
Updates totalSales & totalOrders di DOM
    ↓
Top items also updated real-time
```

---

## 🔐 API KEY LOCATIONS

**JANGAN SHARE INI KE PUBLIK!**

### Firebase API Key
- **Lokasi:** `public_html/js/app.js` baris 4-11
- **Diperoleh dari:** Firebase Console → Project Settings
- **Digunakan untuk:** Authentication ke Firestore Database

### Supabase API Key
- **Lokasi:** `public_html/js/app.js` baris 14-18
- **Diperoleh dari:** Supabase Dashboard → Settings → API
- **Digunakan untuk:** Authentication ke Supabase Database

### Google Maps Link
- **Lokasi:** `public_html/js/app.js` baris 23
- **Public:** Aman dibagikan (hanya link Maps biasa)
- **Alternative:** Bisa langsung di-edit di `index.html` baris 59

---

## 📦 INSTALLATION SUMMARY

Langkah-langkah memasang di cPanel:

1. **Siapkan files:**
   ```
   - index.html (update konfigurasi)
   - js/app.js (update API Key)
   - css/style.css (copy as-is)
   - img/hero-bg.jpg (upload gambar Anda)
   - img/gallery/* (upload 6 gambar)
   ```

2. **Upload ke cPanel:**
   ```
   File Manager → public_html
   Upload semua files & folders
   ```

3. **Verify:**
   ```
   Buka https://domain-anda.com
   Test semua fitur
   Check console (F12) untuk errors
   ```

4. **Monitor:**
   ```
   Watch Firebase/Supabase console
   Check cPanel error logs
   Collect user feedback
   ```

---

## 🎓 LEARNING RESOURCES

Jika ingin belajar lebih dalam:

- **HTML/CSS:** [MDN Web Docs](https://developer.mozilla.org)
- **JavaScript:** [JavaScript.info](https://javascript.info)
- **Tailwind CSS:** [Tailwind Docs](https://tailwindcss.com/docs)
- **Firebase:** [Firebase Docs](https://firebase.google.com/docs)
- **Supabase:** [Supabase Docs](https://supabase.com/docs)

---

**Sudah siap? Mulai dari SETUP_GUIDE.md! 🚀**
