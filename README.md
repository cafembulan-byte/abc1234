# ☕ Kedai Kopi - Modern Landing Page (cPanel Ready)

**Status:** ✅ Siap Production | **License:** Free to Use

Landing page modern & responsif untuk kedai kopi dan kebun kopi Anda. Dibangun dengan HTML5, CSS3, dan Vanilla JavaScript - **TIDAK perlu Node.js**, siap diupload ke cPanel standar!

## 🚀 Mulai di Sini

### Untuk Pemula (Step-by-Step)
1. **Baca dulu:** [`SETUP_GUIDE.md`](SETUP_GUIDE.md) ← START HERE! 📖
2. **Siapkan:** [`CONFIG_TEMPLATE.md`](CONFIG_TEMPLATE.md) - Template konfigurasi
3. **Check:** [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) - Sebelum launch
4. **Pahami:** [`FILE_STRUCTURE.md`](FILE_STRUCTURE.md) - Struktur file detail

### Untuk Developer Experienced
- Lihat langsung folder `public_html/` untuk production files
- Edit konfigurasi di `public_html/js/app.js` baris 1-25
- Upload semua file `public_html/*` ke cPanel `public_html/`

---

## ✨ Fitur Utama

| Fitur | Deskripsi | Tech |
|-------|-----------|------|
| 🎨 **Hero Section** | Full-screen hero dengan CTA Google Maps | Vanilla JS |
| 📸 **Galeri Modal** | Responsif gallery dengan lightbox | Vanilla JS |
| 🍰 **Menu Filter** | Menu items dengan kategori tabs | JavaScript |
| 📊 **Analytics** | Dashboard penjualan real-time | Firebase/Supabase |
| ⭐ **Review Widget** | Form review dengan rating bintang | Firebase/Supabase |
| 📱 **Responsive** | Mobile-first design, all devices | Tailwind CSS |
| 🎯 **SEO Ready** | Meta tags, structured data | HTML5 |

---

## 📁 Struktur Project

```
📦 web-coffee-shop/
├── 📄 SETUP_GUIDE.md              ⭐ START HERE - Panduan lengkap
├── 📄 CONFIG_TEMPLATE.md           - Template konfigurasi
├── 📄 DEPLOYMENT_CHECKLIST.md      - Pre-launch checklist
├── 📄 FILE_STRUCTURE.md            - Detail setiap file
├── 📄 .env.example                 - Environment variables template
├── 📄 .gitignore                   - Git ignore config
│
└── 📁 public_html/                 ⬅️ Upload folder ini ke cPanel!
    ├── 📄 index.html               - Main HTML file
    ├── 📁 js/
    │   └── 📄 app.js               - All JavaScript logic
    ├── 📁 css/
    │   └── 📄 style.css            - Custom CSS & animations
    ├── 📁 img/
    │   ├── hero-bg.jpg            - Hero background (ganti ini!)
    │   └── 📁 gallery/            - 6 gallery images (ganti ini!)
    └── 📄 README.md                - Quick reference
```

---

## ⚡ Quick Start (5 Menit)

### 1️⃣ Setup Database (Pilih Salah Satu)

**Option A: Firebase** (recommended)
```
1. Go to: firebase.google.com
2. Create new project
3. Create Firestore database
4. Get API key & paste ke app.js
5. Done! Database ready
```

**Option B: Supabase** (PostgreSQL)
```
1. Go to: supabase.com
2. Create new project  
3. Run SQL queries (lihat SETUP_GUIDE.md)
4. Get API URL & key → paste ke app.js
5. Done! Database ready
```

### 2️⃣ Customize Website

```javascript
// public_html/js/app.js - Baris 1-25
const FIREBASE_CONFIG = { ... }    ← Isi dengan API Key Anda
const DB_TYPE = 'firebase'         ← Atau 'supabase'
const GOOGLE_MAPS_LINK = "..."     ← Ganti dengan lokasi Anda
```

### 3️⃣ Upload ke cPanel

```
cPanel → File Manager → public_html
→ Upload semua files dari public_html/
→ Website siap! 🎉
```

---

## 🎯 Technology Stack

- **Frontend Framework:** Vanilla JavaScript (no dependencies!)
- **CSS:** Tailwind CSS (via CDN)
- **Database:** Firebase Firestore OR Supabase (serverless)
- **Hosting:** cPanel compatible (static files)
- **Browser Support:** All modern browsers + mobile

---

## 📖 Dokumentasi

| Document | Untuk Apa | Baca Dulu? |
|----------|-----------|-----------|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Setup Firebase/Supabase lengkap | ⭐⭐⭐ YES |
| [CONFIG_TEMPLATE.md](CONFIG_TEMPLATE.md) | Template konfigurasi | ⭐⭐ Helpful |
| [FILE_STRUCTURE.md](FILE_STRUCTURE.md) | Penjelasan setiap file | ⭐ Optional |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Checklist sebelum production | ⭐⭐ Important |
| [public_html/README.md](public_html/README.md) | Quick reference di production | For reference |

---

## 🔥 Fitur Unggulan

### ✅ Frontend Statis (Perfect untuk cPanel)
- Tidak perlu Node.js
- Tidak perlu build process
- Copy-paste ke `public_html` → DONE!
- Cepat loading, optimal performance

### ✅ Database Serverless (No Backend Server Needed)
- Firebase atau Supabase
- Real-time sync
- Auto-scaling
- Security rules built-in

### ✅ Responsive Design (All Devices)
- Mobile-first approach
- Tested di semua screen sizes
- Touch-friendly buttons
- Fast performance

### ✅ Developer Friendly
- Vanilla JS (no frameworks)
- Clean, commented code
- Easy to customize
- No build dependencies

---

## 🛠️ Customization Examples

### Ubah Warna Tema
```css
/* css/style.css - Baris 6-11 */
:root {
    --primary-color: #78350f;      /* Warna utama */
    --secondary-color: #d97706;    /* Warna aksen */
}
```

### Tambah Menu Item
```javascript
/* js/app.js - Cari "menuData" */
espresso: [
    { name: "Cappuccino", desc: "...", price: 35000 },
    { name: "Latte", desc: "...", price: 35000 },
    // Tambah di sini!
]
```

### Ubah Google Maps Link
```javascript
/* js/app.js - Baris 23 */
const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=lokasi+anda";
```

---

## ⚠️ Important Notes

### API Keys
- ⚠️ **Jangan share** API key ke publik
- Gunakan security rules yang ketat di database
- Add `.env` ke `.gitignore` (sudah ada)

### Database Rules
Setup security rules di Firebase/Supabase:
```
✅ Allow READ untuk semua
✅ Allow CREATE untuk semua (anonim review)
❌ Block UPDATE/DELETE
```

### Images
- Gunakan format JPG/PNG
- Optimasi ukuran < 500KB
- Min resolution 1920x1280px untuk hero
- Use tools: TinyPNG, Compressor.io

---

## 📊 Performance Metrics

Target performance:
- **Page Load:** < 2 seconds
- **Lighthouse:** > 85 score
- **Responsive:** All screen sizes
- **Browser Support:** 98%+ users

---

## 🚀 Deployment Ke Production

### Step 1: Prepare
- [ ] Baca SETUP_GUIDE.md
- [ ] Setup database (Firebase atau Supabase)
- [ ] Update konfigurasi di app.js
- [ ] Test semua fitur lokal

### Step 2: Upload
- [ ] Login ke cPanel
- [ ] Upload `public_html/*` files
- [ ] Set file permissions (644 files, 755 folders)

### Step 3: Verify
- [ ] Buka website di browser
- [ ] Test gallery, menu, review form
- [ ] Check F12 console untuk errors
- [ ] Test di mobile device

### Step 4: Launch
- [ ] Announce di social media
- [ ] Monitor analytics
- [ ] Collect user feedback
- [ ] Plan improvements

---

## 🐛 Troubleshooting

### "Database tidak terkoneksi"
1. Cek API Key di app.js sudah benar
2. Cek internet connection
3. Lihat Firebase/Supabase console untuk errors
4. Buka DevTools (F12) → Console → lihat error message

### "Gambar tidak muncul"
1. Gunakan URL gambar yang valid (https://)
2. Cek file permissions di cPanel
3. Verify image format & size
4. Try upload ulang image

### "Styling terlihat aneh"
1. Clear browser cache (Ctrl+Shift+Delete)
2. Verify Tailwind CDN loading (F12 → Network)
3. Cek CSS file path di HTML
4. Try different browser

**Lihat troubleshooting lengkap di [SETUP_GUIDE.md](SETUP_GUIDE.md)**

---

## 📞 Support & Contact

- 📖 **Dokumentasi:** Lihat file MD di repo ini
- 🐛 **Issues:** Check console (F12) untuk error messages
- 💡 **Tips:** Lihat SETUP_GUIDE.md → Troubleshooting section
- 🔗 **Resources:** Firebase Docs, Supabase Docs, Tailwind Docs

---

## 📝 Version Info

- **Version:** 1.0.0
- **Release Date:** 2024-01-15
- **Last Updated:** 2024-01-15
- **Status:** Stable ✅

---

## 🎉 Next Steps

1. **Mulai Setup:**
   - Buka `SETUP_GUIDE.md` → ikuti step-by-step
   - Buat Firebase atau Supabase project
   - Konfigurasi API keys

2. **Customize:**
   - Update gambar hero & gallery
   - Customize menu items
   - Update Google Maps link
   - Sesuaikan warna tema

3. **Test:**
   - Ikuti DEPLOYMENT_CHECKLIST.md
   - Test semua fitur
   - Test di mobile & desktop
   - Test di berbagai browser

4. **Launch:**
   - Upload ke cPanel
   - Verify live website
   - Monitor analytics
   - Collect feedback

---

**Ready to launch your coffee shop website? Let's go! ☕🚀**

Jangan lupa: **START dari SETUP_GUIDE.md** untuk panduan lengkap!
