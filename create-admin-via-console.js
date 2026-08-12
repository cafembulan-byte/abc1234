/**
 * 🔐 CREATE ADDITIONAL ADMIN ACCOUNTS VIA BROWSER CONSOLE
 * 
 * Script ini untuk membuat admin tambahan setelah admin pertama sudah ada.
 * 
 * Cara menjalankan:
 * 1. Login ke admin panel dengan akun admin pertama
 * 2. Buka browser console: Tekan F12 → Tab "Console"
 * 3. Copy-paste seluruh script ini ke console
 * 4. Tekan Enter untuk jalankan
 * 5. Ikuti instruksi di prompt yang muncul
 * 
 * Requirements:
 * - Firebase SDK harus sudah loaded di halaman
 * - User harus sudah login sebagai admin
 * - Firestore rules harus mengizinkan admin membuat admin baru
 */

async function createAdminViaConsole() {
    console.log('%c🔐 CREATE ADMIN VIA BROWSER CONSOLE', 'color: blue; font-size: 16px; font-weight: bold;');
    
    // Check if Firebase is initialized
    if (typeof firebase === 'undefined' || !window.db || !window.auth) {
        console.error('❌ Firebase tidak terinisialisasi! Pastikan Anda berada di halaman admin.');
        return;
    }

    // Check if user is logged in and is admin
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        console.error('❌ Anda belum login! Silakan login sebagai admin terlebih dahulu.');
        return;
    }

    try {
        const adminDoc = await window.db.collection('admins').doc(currentUser.uid).get();
        if (!adminDoc.exists || adminDoc.data().role !== 'admin') {
            console.error('❌ Anda bukan admin! Hanya admin yang bisa membuat admin baru.');
            return;
        }
    } catch (error) {
        console.error('❌ Error checking admin status:', error.message);
        return;
    }

    // Get input from user
    const email = prompt('📧 Email untuk admin baru:');
    if (!email) {
        console.log('❌ Email diperlukan!');
        return;
    }

    const password = prompt('🔑 Password (minimal 6 karakter):');
    if (!password || password.length < 6) {
        console.log('❌ Password harus minimal 6 karakter!');
        return;
    }

    const displayName = prompt('👤 Nama lengkap (opsional):') || email;

    try {
        console.log('\n⏳ Membuat admin baru...\n');

        // Create user in Firebase Authentication
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + window.firebaseConfig.apiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error.message);
        }

        const data = await response.json();
        const newUserUid = data.localId;

        console.log('✅ User dibuat di Firebase Auth');
        console.log(`   UID: ${newUserUid}`);
        console.log(`   Email: ${email}\n`);

        // Create admin document in Firestore
        await window.db.collection('admins').doc(newUserUid).set({
            uid: newUserUid,
            email: email,
            role: 'admin',
            displayName: displayName,
            createdAt: new Date(),
            createdBy: currentUser.email,
            status: 'active'
        });

        console.log('✅ Admin document dibuat di Firestore\n');
        console.log('%c========================================', 'color: green; font-weight: bold;');
        console.log('%c✅ ADMIN BARU BERHASIL DIBUAT!', 'color: green; font-size: 14px; font-weight: bold;');
        console.log('%c========================================', 'color: green; font-weight: bold;');
        console.log('\n📝 Informasi Login:');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);
        console.log('\n✅ Admin baru sudah bisa login sekarang!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('\n📝 Troubleshooting:');
        if (error.message.includes('EMAIL_EXISTS')) {
            console.log('   • Email sudah terdaftar');
        } else if (error.message.includes('WEAK_PASSWORD')) {
            console.log('   • Password terlalu lemah');
        } else if (error.message.includes('permission')) {
            console.log('   • Firestore rules tidak mengizinkan operasi ini');
            console.log('   • Pastikan Anda adalah admin');
        } else {
            console.log(`   • ${error.message}`);
        }
    }
}

// Run the function
createAdminViaConsole();
