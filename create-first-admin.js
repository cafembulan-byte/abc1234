#!/usr/bin/env node

/**
 * 🔐 CREATE FIRST ADMIN ACCOUNT
 * Script ini membuat admin pertama di Firebase menggunakan Admin SDK
 * 
 * Cara menjalankan:
 * 1. Install dependencies: npm install firebase-admin
 * 2. Buat service account key di Firebase Console (Project Settings → Service Accounts)
 * 3. Download JSON key dan simpan di folder ini dengan nama: serviceAccountKey.json
 * 4. Jalankan: node create-first-admin.js
 */

const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Setup readline interface untuk input user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fungsi untuk prompt pertanyaan
function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

async function createFirstAdmin() {
    try {
        console.log('\n========================================');
        console.log('🔐 CREATE FIRST ADMIN ACCOUNT');
        console.log('========================================\n');

        // Check if service account key exists
        const keyPath = path.join(__dirname, 'serviceAccountKey.json');
        if (!fs.existsSync(keyPath)) {
            console.error('❌ Error: serviceAccountKey.json tidak ditemukan!');
            console.log('\n📝 Cara mendapatkan serviceAccountKey.json:');
            console.log('1. Buka Firebase Console: https://console.firebase.google.com');
            console.log('2. Pilih project Anda (mbulan-86894)');
            console.log('3. Klik ⚙️ (Settings) → Project Settings');
            console.log('4. Tab "Service Accounts"');
            console.log('5. Klik "Generate New Private Key"');
            console.log('6. Simpan file JSON di folder ini dengan nama: serviceAccountKey.json\n');
            process.exit(1);
        }

        // Initialize Firebase Admin SDK
        console.log('📋 Loading service account...');
        const serviceAccountData = fs.readFileSync(keyPath, 'utf8');
        const serviceAccount = JSON.parse(serviceAccountData);
        console.log('✅ Service account loaded');
        console.log('🔧 Initializing Firebase Admin SDK...');
        admin.initializeApp({
            credential: admin.cert(serviceAccount),
            projectId: serviceAccount.project_id
        });

        const auth = getAuth();
        const db = getFirestore();

        console.log('✅ Firebase Admin SDK initialized\n');

        // Get user input
        const email = await question('📧 Email admin: ');
        const password = await question('🔑 Password (minimal 6 karakter): ');
        const displayName = await question('👤 Nama lengkap (opsional): ');

        // Validate input
        if (!email || !password || password.length < 6) {
            console.error('❌ Email dan password diperlukan! Password minimal 6 karakter.');
            rl.close();
            process.exit(1);
        }

        console.log('\n⏳ Membuat akun admin...\n');

        // Create user in Firebase Authentication
        const userRecord = await auth.createUser({
            email: email,
            password: password,
            displayName: displayName || email,
            emailVerified: true
        });

        console.log(`✅ User dibuat di Firebase Auth`);
        console.log(`   UID: ${userRecord.uid}`);
        console.log(`   Email: ${userRecord.email}\n`);

        // Create admin document in Firestore
        await db.collection('admins').doc(userRecord.uid).set({
            uid: userRecord.uid,
            email: email,
            role: 'admin',
            displayName: displayName || email,
            createdAt: new Date(),
            status: 'active'
        });

        console.log(`✅ Admin document dibuat di Firestore`);
        console.log(`   Collection: admins`);
        console.log(`   Document ID: ${userRecord.uid}\n`);

        console.log('========================================');
        console.log('✅ ADMIN BERHASIL DIBUAT!');
        console.log('========================================\n');
        console.log('📝 Informasi Login:');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);
        console.log('\n🌐 Login di: http://localhost:8000/admin.html\n');
        console.log('⚠️  PENTING:');
        console.log('   • Ganti password setelah login pertama kali');
        console.log('   • Jangan share email/password dengan orang lain');
        console.log('   • Simpan serviceAccountKey.json di tempat aman\n');

        rl.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        rl.close();
        process.exit(1);
    }
}

// Run the script
createFirstAdmin();
