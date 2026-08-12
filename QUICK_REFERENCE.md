# ⚡ QUICK REFERENCE GUIDE

Ringkasan super cepat - save this page!

---

## 🎯 Where to Find Things

### 📄 Documentation (Baca Sesuai Kebutuhan)

```
Ingin setup database?
  → SETUP_GUIDE.md (Firebase/Supabase step-by-step)

Ingin konfigurasi API key?
  → CONFIG_TEMPLATE.md + buka public_html/js/app.js baris 1-25

Ingin upload ke cPanel?
  → SETUP_GUIDE.md (Upload section) + DEPLOYMENT_CHECKLIST.md

Ingin troubleshoot?
  → SETUP_GUIDE.md (Troubleshooting section)

Ingin pahami struktur?
  → FILE_STRUCTURE.md (file-by-file breakdown)

Ingin summary project?
  → SUMMARY.md (project overview)

Ingin mulai development?
  → public_html/js/app.js (baca code comments)
```

---

## ⚙️ Configuration Quick Start

### 1. Edit `public_html/js/app.js`

**Baris 4-11: Firebase Config**
```javascript
const FIREBASE_CONFIG = {
    apiKey: "YOUR_API_KEY_HERE",           // ← Copy dari Firebase Console
    projectId: "your-project-id",          // ← Copy dari Firebase
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcd1234"
};
```

**Baris 14-18: Supabase Config**
```javascript
const SUPABASE_CONFIG = {
    url: "https://your-project.supabase.co",    // ← Copy URL
    anonKey: "eyJhbGciOiJIUzI1N..."              // ← Copy Key
};
```

**Baris 20: Pilih Database**
```javascript
const DB_TYPE = 'firebase'; // atau 'supabase'
```

**Baris 23: Google Maps Link**
```javascript
const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=lokasi_anda";
```

---

## 🖼️ Upload Gambar

### Folder Structure
```
public_html/
├── img/
│   ├── hero-bg.jpg          ← Hero background (ganti!)
│   └── gallery/
│       ├── img1.jpg         ← Gallery 1 (ganti!)
│       ├── img2.jpg         ← Gallery 2 (ganti!)
│       ├── img3.jpg         ← Gallery 3 (ganti!)
│       ├── img4.jpg         ← Gallery 4 (ganti!)
│       ├── img5.jpg         ← Gallery 5 (ganti!)
│       └── img6.jpg         ← Gallery 6 (ganti!)
```

### Image Requirements
- Format: JPG or PNG
- Size: < 500KB per file (optimize dengan TinyPNG)
- Hero Resolution: Min 1920x1280px
- Gallery Aspect Ratio: Square (1:1) recommended

---

## 🚀 Deployment Steps

### Step 1: Database Setup (10-20 min)

**Firebase Route:**
```
1. firebase.google.com
2. Create Project
3. Create Firestore
4. Get API Key
5. Paste → app.js baris 4-11
```

**Supabase Route:**
```
1. supabase.com
2. Create Project
3. Run SQL queries (SETUP_GUIDE.md)
4. Get URL + Key
5. Paste → app.js baris 14-18
```

### Step 2: Configure & Customize (5-10 min)

```javascript
// 1. Update config di public_html/js/app.js (baris 1-25)
// 2. Update gambar di public_html/img/
// 3. Done!
```

### Step 3: Upload to cPanel (5 min)

```
cPanel File Manager
→ public_html/
→ Upload semua files dari public_html/
→ Done! Website live!
```

### Step 4: Verify (5 min)
- Buka domain Anda
- Test gallery, menu, review
- Check F12 Console (no errors)
- Test mobile view
- Done! 🎉

---

## 📋 Essential Files

| File | Purpose | Edit? |
|------|---------|-------|
| `public_html/index.html` | Main HTML | If needed |
| `public_html/js/app.js` | Logic | YES - update config |
| `public_html/css/style.css` | Styling | If customizing |
| `public_html/img/*` | Images | YES - upload yours |

---

## 🔑 API Key Locations

### Get Firebase API Key
```
firebase.google.com
→ Your Projects → Select project
→ Project Settings (gear icon)
→ Your Apps → Web App (</> icon)
→ Copy the config object
→ Paste into app.js baris 4-11
```

### Get Supabase API Key
```
supabase.com
→ Select your project
→ Settings (left sidebar)
→ API
→ Copy Project URL + anon key
→ Paste into app.js baris 14-18
```

### Get Google Maps Link
```
maps.google.com
→ Search your location
→ Share button
→ Copy link
→ Paste into app.js baris 23
```

---

## ✅ Pre-Launch Checklist

```
□ Database created & configured
□ API keys filled in app.js
□ Images uploaded
□ Google Maps link updated
□ All features tested locally
□ No errors in F12 console
□ Mobile view tested
□ Files uploaded to cPanel
□ Website live and working
□ Database rules set correctly
```

---

## 🐛 Troubleshooting Cheat Sheet

| Problem | Solution |
|---------|----------|
| "Halaman putih" | Open F12 → Console, check errors |
| "Database error" | Check API key di app.js baris 1-25 |
| "Gambar not found" | Verify image URL atau upload file |
| "Review not saving" | Check database rules di Firebase/Supabase |
| "Styling broken" | Clear cache (Ctrl+Shift+Del) |
| "Mobile view bad" | Check viewport meta tag di HTML |

---

## 📞 Where to Get Help

1. **Read Docs:** SETUP_GUIDE.md has most answers
2. **Check Console:** F12 → Console shows error messages
3. **Database Console:** Firebase/Supabase dashboard has logs
4. **Code Comments:** public_html/js/app.js has explanations

---

## 🎓 Learn More

- **Tailwind CSS:** tailwindcss.com/docs
- **Firebase:** firebase.google.com/docs
- **Supabase:** supabase.com/docs
- **JavaScript:** javascript.info
- **Vanilla JS:** youmightnotneedjquery.com

---

## 📊 File Sizes

| File | Size |
|------|------|
| index.html | ~15KB |
| app.js | ~20KB |
| style.css | ~5KB |
| TOTAL (no images) | ~40KB |

---

## ✨ Key Features

- ✅ Hero section dengan CTA
- ✅ Gallery dengan lightbox modal
- ✅ Menu dengan kategori filter
- ✅ Analytics dashboard
- ✅ Review form & display
- ✅ Responsive design
- ✅ No dependencies
- ✅ Production ready

---

## 🎯 Common Customizations

### Change Color Theme
```css
/* css/style.css - Baris 6-11 */
:root {
    --primary-color: #78350f;    ← Update ini
    --secondary-color: #d97706;  ← Update ini
}
```

### Add Menu Item
```javascript
/* js/app.js - Find menuData */
espresso: [
    { name: "Your Item", desc: "Description", price: 30000 },
]
```

### Update Hero Background
```html
<!-- index.html - Baris 60 -->
background-image: url('YOUR_NEW_IMAGE_URL');
```

---

## 💾 Before Uploading

```
public_html/
├── index.html              ✅ Ready
├── js/app.js               ✅ Config updated
├── css/style.css           ✅ Ready
├── img/
│   ├── hero-bg.jpg        ⚠️ Update with your image
│   └── gallery/            ⚠️ Upload 6 images
└── README.md               ✅ Ready
```

---

**Need the full guide? Read SETUP_GUIDE.md**

**Stuck? Check F12 Console for error messages!**

**Good luck! ☕🚀**
