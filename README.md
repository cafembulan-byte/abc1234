# ☕ Kedai Kopi - Modern Landing Page

Landing page responsif dan modern untuk kedai kopi dan kebun kopi Anda. Dibangun dengan HTML5, CSS3 (Tailwind), dan Vanilla JavaScript - siap diupload langsung ke cPanel tanpa perlu Node.js!

## ✨ Fitur Utama

### 1. 🎨 Hero Section
- Gambar latar belakang full-screen berkualitas tinggi
- CTA button untuk Google Maps integration
- Design modern dengan earthy color scheme

### 2. 📸 Galeri Responsif
- Grid galeri otomatis adjust ke mobile/tablet/desktop
- Modal lightbox vanilla JS (klik gambar untuk zoom)
- Smooth hover animations
- 6 gambar placeholder (ganti dengan foto Anda)

### 3. 🍰 Menu Items
- Kategori menu: Espresso Based, Manual Brew, Non-Coffee, Pastries
- Filter kategori dengan button tabs
- Card design dengan nama, deskripsi, dan harga
- Responsive grid layout

### 4. 📊 Live Store Analytics
- Dashboard penjualan real-time
- Total penjualan + jumlah transaksi
- Top 5 item terlaris
- Data diambil dari Firebase/Supabase (optional)
- Mock data untuk testing tanpa database

### 5. ⭐ Review & Rating Widget
- Form review dengan rating bintang (1-5)
- Real-time submission ke Firebase/Supabase
- Display reviews terbaru
- Anonymous submission support

### 6. 📱 Responsive Design
- Mobile-first approach
- Works perfect di semua ukuran screen
- Touch-friendly buttons dan forms
- Fast loading dengan Tailwind CDN

---

## 📁 Struktur Folder

```
public_html/
├── index.html              ← File utama HTML
├── js/
│   └── app.js              ← Semua logika JavaScript
├── css/
│   └── style.css           ← Custom styling
└── img/
    ├── placeholder-1.jpg   ← Upload gambar Anda di sini
    └── gallery/
        ├── img1.jpg
        ├── img2.jpg
        └── ... (6 gambar total)
```

---

## 🚀 Quick Start

### 1. Upload ke cPanel
```
1. Buka cPanel → File Manager
2. Masuk ke public_html
3. Upload semua file & folder di atas
4. Website siap di akses
```

### 2. Setup Database (Opsional)

Pilih salah satu:

**Option A: Firebase (Recommended)**
- Gratis tier cukup untuk small business
- Real-time database
- Mudah scalable
- Lihat: SETUP_GUIDE.md

**Option B: Supabase (PostgreSQL)**
- Open source Firebase alternative
- SQL database
- Generous free tier
- Lihat: SETUP_GUIDE.md

### 3. Update Konfigurasi
- Edit `js/app.js` → isi API Key
- Update Google Maps link
- Ganti gambar placeholder

---

## 💻 Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS (via CDN)
- **Vanilla JavaScript** - No dependencies
- **Firebase** - Firestore database (optional)
- **Supabase** - PostgreSQL backend (optional)
- **Google Fonts** - Playfair Display & Lato

---

## 🎯 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (single column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3+ columns)

---

## 🔧 Customization Guide

### Warna
Edit `css/style.css`:
```css
:root {
    --primary-color: #78350f;      /* Warna utama */
    --secondary-color: #d97706;    /* Warna aksen */
}
```

### Font
Edit di `index.html` (line 8-9):
```html
<link href="https://fonts.googleapis.com/css2?family=Your-Font:wght@400;700&display=swap" rel="stylesheet">
```

### Menu Items
Edit `js/app.js` (cari `menuData`):
```javascript
espresso: [
    { name: "Item Baru", desc: "Deskripsi", price: 30000 },
]
```

### Google Maps Link
Edit `js/app.js` (line 20):
```javascript
const GOOGLE_MAPS_LINK = "your-maps-link-here";
```

---

## 📖 File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Main page dengan semua section |
| `js/app.js` | Gallery modal, menu filter, review form, analytics |
| `css/style.css` | Custom animations & responsive tweaks |
| `SETUP_GUIDE.md` | Detailed setup instructions |
| `CONFIG_TEMPLATE.md` | Database configuration template |
| `README.md` | File ini |

---

## 🔒 Security Notes

⚠️ **PENTING:**
- API Key disimpan di client-side (sudah umum untuk frontend)
- Gunakan security rules ketat di Firebase/Supabase
- Jangan commit `.env` atau API key ke Git
- Selalu gunakan HTTPS di production

---

## 🐛 Troubleshooting

### Q: Halaman terlihat putih-putih?
**A:** Buka DevTools (F12) → Console. Lihat error messages. Kemungkinan:
- Tailwind CDN belum terload (cek internet)
- Font Google belum terload
- CSS file path salah

### Q: Database tidak bekerja?
**A:** 
- Pastikan API Key sudah diisi dengan benar di `app.js`
- Cek Security Rules di Firebase/Supabase
- Buka DevTools → Network tab, lihat request ke database
- Lihat Firebase/Supabase console untuk logs

### Q: Gambar tidak muncul?
**A:**
- Gunakan URL gambar yang valid (https)
- Pastikan nama file benar
- Cek sumber gambar (cross-origin issues)

### Q: Mobile view berantakan?
**A:**
- Cek viewport meta tag di index.html
- Buka DevTools → Toggle device toolbar
- Scroll test semua section

---

## 📊 Performance Tips

1. **Optimasi gambar**
   - Gunakan tools seperti TinyPNG
   - Ukuran file < 500KB per gambar
   - Gunakan format modern (WebP jika support)

2. **Lazy Loading**
   - Gallery gambar bisa di-lazy load
   - Pakai browser native `loading="lazy"`

3. **Cache**
   - Browser cache static files otomatis
   - Tingkatkan cache time di cPanel

4. **CDN**
   - Tailwind CSS & Google Fonts sudah via CDN
   - Pertimbangkan Cloudflare untuk image CDN

---

## 📈 Scaling & Expansion

### Fitur yang bisa ditambahkan:

1. **E-Commerce**
   - Tambah shopping cart
   - Integrate Stripe/Midtrans
   - Order management system

2. **Booking System**
   - Reserve table untuk event
   - Calendar integration

3. **Loyalty Program**
   - Point system untuk repeat customers
   - QR code untuk tracking

4. **Live Streaming**
   - Product launch atau workshop
   - Integration dengan YouTube/Instagram Live

5. **Analytics Advanced**
   - Google Analytics integration
   - Customer behavior tracking

---

## 📞 Support & Contact

Jika ada yang kurang jelas atau ada bug:
1. Check console browser (F12)
2. Read error messages dengan seksama
3. Cek SETUP_GUIDE.md untuk troubleshooting
4. Verify konfigurasi database

---

## 📜 License

Template ini bebas digunakan untuk keperluan komersial dan personal.

---

## 🎉 Happy Coding!

Semoga landing page Anda sukses! ☕💪

**Tips:** Update content secara berkala, tambah review baru, dan manage analytics untuk maksimalkan konversi!

---

**Last Updated:** 2024-01-15
**Version:** 1.0
