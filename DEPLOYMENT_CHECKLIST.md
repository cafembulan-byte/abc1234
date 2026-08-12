# ✅ DEPLOYMENT CHECKLIST

Gunakan checklist ini sebelum mengunggah ke production.

---

## 🏗️ PRE-DEPLOYMENT CHECKS

### Content & Images
- [ ] Hero image diganti dengan gambar berkualitas tinggi
- [ ] Semua 6 galeri image sudah diupload dan bekerja
- [ ] Menu items sudah diupdate dengan item asli
- [ ] Menu prices sudah diupdate dengan harga aktual
- [ ] Deskripsi menu sudah diterjemahkan/disesuaikan

### Branding
- [ ] Nama "Kedai Kopi" diganti dengan nama bisnis Anda
- [ ] Social media links di footer sudah diupdate
- [ ] Alamat dan contact info sudah ada (jika perlu)
- [ ] Logo/icon sudah ditambahkan (opsional)

### Google Maps
- [ ] Google Maps link sudah diupdate dengan lokasi Anda
- [ ] Link valid dan membuka maps dengan lokasi yang benar

### Database (Jika menggunakan Firebase/Supabase)
- [ ] Firebase project sudah dibuat dan dikonfigurasi
- [ ] Firestore/Database sudah ada dengan koleksi yang benar
- [ ] Security rules sudah diatur dengan benar
- [ ] API Key sudah diisi di app.js
- [ ] DB_TYPE sudah diatur ke 'firebase' atau 'supabase'
- [ ] Database sudah di-test dengan submit review

### SEO & Analytics (Opsional)
- [ ] Meta description ditambahkan di index.html
- [ ] OG tags untuk social sharing ditambahkan
- [ ] Google Analytics ID ditambahkan (jika ingin tracking)
- [ ] Favicon ditambahkan

### Performance
- [ ] Semua gambar sudah dioptimasi (< 500KB per image)
- [ ] Page load time < 3 detik (test dengan DevTools)
- [ ] Mobile view sudah di-test (F12 → Toggle device toolbar)
- [ ] Lighthouse score > 70 (test di DevTools → Lighthouse)

### Security
- [ ] API Key TIDAK ada di version control (.gitignore)
- [ ] HTTPS enabled di hosting (cPanel)
- [ ] Security headers sudah dikonfigurasi (di cPanel)
- [ ] Database rules restrict unnecessary access

---

## 📋 TESTING CHECKLIST

### Functionality Testing
- [ ] Hero section muncul dengan gambar dan CTA buttons
- [ ] Menu kategori tabs bekerja (filter items)
- [ ] Galeri images bisa di-klik dan modal muncul
- [ ] Modal bisa di-tutup (X button, ESC key, click outside)
- [ ] Review form bisa di-submit dan data tersimpan
- [ ] Review submit show success/error message
- [ ] Existing reviews ditampilkan dengan benar
- [ ] Navigation links (smooth scroll) bekerja

### Responsive Testing
- [ ] Mobile (375px): all sections readable, buttons clickable
- [ ] Tablet (768px): layout 2-column di mana perlu
- [ ] Desktop (1440px): layout 3+ column, spacing proper
- [ ] Form inputs besar enough untuk mobile keyboard
- [ ] Navigation menu responsive (collapse/expand di mobile)

### Browser Testing
- [ ] Chrome (latest) - semua fitur bekerja
- [ ] Firefox (latest) - semua fitur bekerja
- [ ] Safari (latest) - semua fitur bekerja
- [ ] Edge (latest) - semua fitur bekerja
- [ ] Mobile Safari (iPhone) - semua fitur bekerja
- [ ] Chrome Mobile (Android) - semua fitur bekerja

### Cross-Browser Compatibility
- [ ] No console errors (F12 → Console)
- [ ] Fonts loading correctly
- [ ] Colors rendering correctly
- [ ] Animations smooth di semua browser

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Final Code Review
- [ ] Semua TODO comments sudah diperbaiki
- [ ] Tidak ada console.log yang tidak perlu (debugging only)
- [ ] Code sudah di-format dengan baik
- [ ] No hardcoded paths atau domain names

### Step 2: Prepare Files for Upload
```
public_html/
├── index.html (final version)
├── js/
│   └── app.js (dengan API Key yang benar)
├── css/
│   └── style.css
├── img/
│   ├── hero-bg.jpg (gambar berkualitas tinggi)
│   └── gallery/ (6 gambar galeri)
├── README.md
└── .gitignore
```

### Step 3: Upload ke cPanel
1. Login ke cPanel
2. Buka File Manager
3. Navigate ke `public_html`
4. Upload semua files & folders di atas
5. Verify permissions (644 untuk files, 755 untuk folders)

### Step 4: Verify Online
- [ ] Website accessible via domain Anda
- [ ] All images loading correctly
- [ ] Forms working properly
- [ ] Console tidak ada error (Ctrl+Shift+I)

### Step 5: Post-Launch Monitoring
- [ ] Monitor page load speed (monitor.google.com)
- [ ] Check error logs di cPanel
- [ ] Monitor Firebase/Supabase usage
- [ ] Collect initial feedback dari users

---

## 🔧 BACKUP & RECOVERY

### Before Deployment
- [ ] Create full backup of current site (jika ada)
- [ ] Export konfigurasi database
- [ ] Document semua changes yang dibuat

### Emergency Recovery Plan
- [ ] Keep previous version terpisah
- [ ] Know how to restore dari backup
- [ ] Contact cPanel support number

---

## 📞 TROUBLESHOOTING AT LAUNCH

Jika ada masalah setelah launch:

1. **Page tidak loading**
   - Cek file permissions di cPanel
   - Verify index.html di public_html root
   - Check cPanel error logs

2. **Images tidak muncul**
   - Verify file path di HTML
   - Check image permissions
   - Check image file format & size

3. **Database tidak bekerja**
   - Verify API Key di app.js
   - Check Firebase/Supabase connection
   - Check Security Rules
   - Check browser console untuk error

4. **Styling terlihat aneh**
   - Clear browser cache (Ctrl+Shift+Del)
   - Cek Tailwind CDN loading
   - Verify CSS file path

5. **Slow performance**
   - Optimize images
   - Check server resources
   - Consider CDN untuk images
   - Monitor database queries

---

## ✨ OPTIMIZATION TIPS

Setelah launch, Anda bisa melakukan optimasi:

### Short Term (1-2 weeks)
- Collect user feedback
- Fix any bugs atau usability issues
- Monitor analytics
- Update content jika perlu

### Medium Term (1-3 months)
- Analyze top performing pages
- Optimize SEO untuk target keywords
- Add more features berdasarkan feedback
- Improve conversion rate

### Long Term (3+ months)
- Plan expansion (e-commerce, booking, dll)
- Migrate ke managed hosting jika traffic tinggi
- Setup advanced analytics
- Implement A/B testing

---

## 📊 SUCCESS METRICS

Monitor metrics ini setelah launch:

- **Visitors**: X per hari
- **Average Session Duration**: X minutes
- **Bounce Rate**: < 50% (ideal)
- **Conversion Rate**: Review submission rate
- **Page Load Time**: < 3 seconds
- **Mobile Traffic**: X% dari total traffic

---

**Good luck with your launch! ☕🚀**

Jangan lupa untuk terus update content dan engage dengan customers!
