# 🔐 PANDUAN MEMBUAT ADMIN PERTAMA

Ada 3 cara membuat admin pertama. Pilih sesuai kebutuhan Anda:

---

## 🎯 QUICK CHOICE - PILIH METODE ANDA

| Hosting Anda | Rekomendasi | Alasan |
|---|---|---|
| **Development** (localhost) | CARA 1 (Node.js) | Paling otomatis & professional |
| **cPanel / Shared Hosting** | CARA 3 (Firebase Console) | Tidak perlu Node.js, cepat |
| **VPS / Dedicated Server** | CARA 1 (Node.js) | Ada akses terminal |
| **Lazy & simple** | CARA 3 (Firebase Console) | Hanya perlu browser, tidak install apapun |
| **Sudah ada admin 1** | CARA 4 (Dalam App) | Buat admin lain langsung dari aplikasi |

---

## ✅ CARA 1: MENGGUNAKAN SCRIPT NODE.JS (RECOMMENDED)

Script ini menggunakan Firebase Admin SDK - cara paling aman dan profesional.

### Prasyarat:
- Node.js terinstall di komputer
- Akses ke Firebase Console

### Langkah-langkah:

#### 1️⃣ Setup Firebase Admin SDK
```bash
cd /workspaces/abc1234
npm install firebase-admin
```

#### 2️⃣ Dapatkan Service Account Key
1. Buka Firebase Console: https://console.firebase.google.com
2. Pilih project: **mbulan-86894**
3. Klik ⚙️ **Settings** (gear icon di kiri atas)
4. Pilih tab **"Service Accounts"**
5. Klik tombol **"Generate New Private Key"**
6. File JSON akan ter-download otomatis
7. Rename file menjadi **`serviceAccountKey.json`**
8. Pindahkan ke folder `/workspaces/abc1234/`

```
/workspaces/abc1234/
├── create-first-admin.js
├── serviceAccountKey.json  ← Letakkan di sini
└── ...
```

#### 3️⃣ Jalankan Script
```bash
node create-first-admin.js
```

Script akan meminta:
- 📧 Email admin
- 🔑 Password (minimal 6 karakter)
- 👤 Nama lengkap (opsional)

Contoh output:
```
========================================
🔐 CREATE FIRST ADMIN ACCOUNT
========================================

📧 Email admin: admin@kedaикopi.com
🔑 Password: password123
👤 Nama lengkap: Admin Kedai Kopi

⏳ Membuat akun admin...

✅ User dibuat di Firebase Auth
   UID: JKs8d9FjL2k3M9...
   Email: admin@kedaикopi.com

✅ Admin document dibuat di Firestore
   Collection: admins
   Document ID: JKs8d9FjL2k3M9...

========================================
✅ ADMIN BERHASIL DIBUAT!
========================================

📝 Informasi Login:
   Email: admin@kedaикopi.com
   Password: password123

🌐 Login di: http://localhost:8000/admin.html

⚠️  PENTING:
   • Ganti password setelah login pertama kali
   • Jangan share email/password dengan orang lain
   • Simpan serviceAccountKey.json di tempat aman
```

✅ **Admin pertama sudah bisa login!**

---

## ✅ CARA 2: MEMBUAT ADMIN DI FIREBASE CONSOLE (MANUAL)

Cara manual tanpa script - untuk pengguna yang tidak ingin install Node.js.

### Langkah-langkah:

#### 1️⃣ Buat User di Firebase Authentication
1. Buka Firebase Console: https://console.firebase.google.com
2. Pilih project: **mbulan-86894**
3. Di menu kiri, klik **"Authentication"**
4. Klik tab **"Users"**
5. Klik tombol **"Create User"** (atau ➕ Add user)
6. Isi:
   - **Email**: admin@kedaикopi.com
   - **Password**: password123
7. Klik **"Create"**

✅ User sudah dibuat di Firebase Auth

#### 2️⃣ Buat Admin Document di Firestore
1. Di menu kiri, klik **"Firestore Database"**
2. Klik tombol **"Start Collection"** (atau ➕ di collection yang ada)
3. Nama collection: **`admins`** (persis seperti ini)
4. Klik **"Next"**
5. Document ID: Gunakan **UID dari user yang baru dibuat** (copy dari Authentication tab)
   - Contoh: `JKs8d9FjL2k3M9OmQrStUvWx`
6. Tambahkan fields:
   ```
   Field Name          Type        Value
   ─────────────────────────────────────────────
   uid                 string      JKs8d9FjL2k3M9OmQrStUvWx
   email               string      admin@kedaикopi.com
   role                string      admin
   displayName         string      Admin Kedai Kopi
   createdAt           timestamp   (tanggal hari ini)
   status              string      active
   ```
7. Klik **"Save"**

✅ Admin document sudah dibuat di Firestore

#### 3️⃣ Login Test
1. Buka admin panel: http://localhost:8000/admin.html
2. Isi form login:
   - Email: `admin@kedaикopi.com`
   - Password: `password123`
3. Klik **"🔑 Login"**

✅ Jika berhasil, dashboard admin akan terbuka!

---

## ✅ CARA 3: JIKA CPANEL TIDAK SUPPORT NODE.JS

Jika hosting/cPanel Anda tidak support Node.js, gunakan **Firebase Console** (paling mudah).

### Kelebihan:
- ✅ Tidak perlu install apapun
- ✅ Bisa dikerjakan dari browser saja
- ✅ Tidak perlu akses terminal/SSH
- ✅ Paling cepat

### Langkah-langkah:

#### 1️⃣ Buat User di Firebase Authentication
1. Buka Firefox Console: https://console.firebase.google.com
2. Pilih project: **mbulan-86894**
3. Menu kiri → **Authentication**
4. Klik tab **"Users"**
5. Klik tombol **"Add user"** (atau ➕)
6. Isi:
   - **Email**: admin@kedaикopi.com
   - **Password**: password123
   - Klik **"Create"**

✅ User sudah dibuat di Firebase Auth

#### 2️⃣ Copy UID User Yang Baru Dibuat
1. Di tab **"Users"**, cari user yang baru dibuat
2. Klik user tersebut
3. Copy **UID** (User ID) yang panjang
   - Contoh: `JKs8d9FjL2k3M9OmQrStUvWx`

#### 3️⃣ Buat Admin Document di Firestore
1. Menu kiri → **Firestore Database**
2. Klik **"Start Collection"** (atau ➕)
3. Nama collection: **`admins`** (persis)
4. Document ID: **Paste UID dari step 2**
5. Tambahkan fields:
   ```
   Field Name          Type        Value
   ─────────────────────────────────────────────
   uid                 string      (paste UID)
   email               string      admin@kedaикopi.com
   role                string      admin
   displayName         string      Admin Kedai Kopi
   createdAt           timestamp   (tanggal hari ini)
   status              string      active
   ```
6. Klik **"Save"**

✅ Admin document sudah dibuat

#### 4️⃣ Login Test
1. Buka admin panel: https://yourdomain.com/admin.html
2. Isi:
   - Email: `admin@kedaикopi.com`
   - Password: `password123`
3. Klik **"Login"**
4. Dashboard admin akan terbuka ✅

---

## ✅ CARA 4: BUAT ADMIN TAMBAHAN DARI ADMIN PANEL

Setelah admin pertama berhasil login, admin bisa membuat admin lain dari dalam aplikasi.

### Langkah-langkah:

#### 1️⃣ Login sebagai Admin Pertama
1. Buka admin panel: http://localhost:8000/admin.html
2. Login dengan akun admin pertama

#### 2️⃣ Buka Form Buat Admin Baru
1. Di dashboard, cari section **"👥 Buat Admin Baru"**
2. Isi form:
   - 📧 Email: admin2@kedaикopi.com
   - 🔑 Password: password456
   - 👤 Nama: Admin Kedua
3. Klik tombol **"➕ Buat Admin"**

✅ Admin baru sudah berhasil dibuat!

Admin baru bisa langsung login dengan email dan password yang baru.

---

## ⚠️ PENTING: SECURITY TIPS

### Password
- ✅ Gunakan password yang kuat
- ✅ Minimal 6 karakter (lebih baik 8+)
- ✅ Kombinasi huruf, angka, simbol
- ✅ Ganti password setelah login pertama kali

### Firestore Rules
Pastikan Firestore rules sudah aktif dengan konfigurasi yang benar:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null &&
             exists(/databases/$(database)/documents/admins/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'admin';
    }

    match /admins/{userId} {
      allow read: if isAdmin() || request.auth.uid == userId;
      allow create: if isAdmin();  // ← Hanya admin yang bisa buat admin baru
      allow update, delete: if isAdmin();
    }

    match /menu/{menuId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if isAdmin();
    }
  }
}
```

Lihat file: [firestore-rules.txt](../firestore-rules.txt)

### Service Account Key
- ⚠️ **JANGAN** commit `serviceAccountKey.json` ke Git
- ⚠️ Simpan di tempat aman
- ⚠️ Jika exposed, regenerate segera di Firebase Console

---

## 🆘 TROUBLESHOOTING

### ❌ Error: "EMAIL_EXISTS"
**Solusi**: Email sudah terdaftar di Firebase Auth.
- Gunakan email yang berbeda
- Atau reset password user yang existing

### ❌ Error: "WEAK_PASSWORD"
**Solusi**: Password terlalu lemah.
- Gunakan minimal 6 karakter
- Tambahkan huruf, angka, simbol

### ❌ Error: "Permission denied"
**Solusi**: Firestore rules belum di-set dengan benar.
- Buka Firebase Console → Firestore → Rules
- Update dengan rules yang benar (lihat section "Security Tips" di atas)
- Klik "Publish"

### ❌ Error: "Firebase is not defined"
**Solusi**: Firebase SDK belum loaded.
- Pastikan Anda di halaman yang benar (admin.html)
- Refresh halaman (Ctrl+R)
- Check browser console (F12) untuk error lain

### ❌ Admin login tapi langsung logout
**Solusi**: Admin document tidak ada di Firestore collection `admins`.
- Buka Firebase Console → Firestore
- Buat collection `admins` jika belum ada
- Tambahkan document untuk user yang login
- Document ID harus **sama dengan UID user**

---

## ✅ CHECKLIST

Sebelum deploy ke production, pastikan:

- [ ] ✅ Admin pertama sudah dibuat
- [ ] ✅ Admin bisa login ke admin panel
- [ ] ✅ Dashboard admin tampil dengan benar
- [ ] ✅ Firestore rules sudah published
- [ ] ✅ Menu data sudah di-seed ke Firestore
- [ ] ✅ Halaman publik bisa load menu dari Firestore
- [ ] ✅ `serviceAccountKey.json` tidak di-commit ke Git
- [ ] ✅ Password sudah di-ganti setelah login pertama

---

## 📚 REFERENSI

- [Firebase Authentication](https://console.firebase.google.com/authentication)
- [Firestore Database](https://console.firebase.google.com/firestore)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
