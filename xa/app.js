// ============================================================================
// KONFIGURASI DATABASE - SILAHKAN PERBARUI DENGAN KREDENSIAL ANDA
// ============================================================================

// ▶ Untuk Firebase:
const FIREBASE_CONFIG = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    projectId: "your-firebase-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// ▶ Untuk Supabase:
const SUPABASE_CONFIG = {
    url: "https://your-project.supabase.co",
    anonKey: "your-supabase-anon-key"
};

// Pilih mana yang ingin digunakan: 'firebase' atau 'supabase'
const DB_TYPE = 'firebase'; // Ubah ke 'supabase' jika ingin menggunakan Supabase

// Tautan Google Maps yang akan digunakan di Hero Section
const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=kedai+kopi+kami"; // Ubah dengan lokasi Anda

// ============================================================================
// FIREBASE INITIALIZATION (for production setup)
// ============================================================================

let firebaseInitialized = false;

// Initialize Firebase if configured and available
if (typeof firebase !== 'undefined' && DB_TYPE === 'firebase') {
    if (FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey !== 'YOUR_FIREBASE_API_KEY') {
        try {
            firebase.initializeApp(FIREBASE_CONFIG);
            firebaseInitialized = true;
            console.log('✅ Firebase initialized successfully!');
            if (document.getElementById('dbStatusText')) {
                document.getElementById('dbStatusText').textContent = '✅ Firebase Firestore Ready';
            }
        } catch (error) {
            console.error('❌ Firebase initialization error:', error);
            if (document.getElementById('dbStatusText')) {
                document.getElementById('dbStatusText').textContent = '❌ Firebase Error - Check credentials';
            }
        }
    } else {
        console.warn('⚠️  Firebase SDK loaded but not configured. Add credentials to app.js (line 5-12)');
        if (document.getElementById('dbStatusText')) {
            document.getElementById('dbStatusText').textContent = '⚠️  Firebase Not Configured';
        }
    }
} else if (DB_TYPE === 'firebase') {
    console.warn('⚠️  Firebase SDK not loaded. Add Firebase scripts to HTML <head>');
    if (document.getElementById('dbStatusText')) {
        document.getElementById('dbStatusText').textContent = '⚠️  Firebase SDK Missing';
    }
}

// ============================================================================
// 1. GALLERY MODAL / LIGHTBOX
// ============================================================================

const galleryItems = document.querySelectorAll('.gallery-item');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imageUrl = item.getAttribute('data-image');
        modalImage.src = imageUrl;
        imageModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    imageModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Tutup modal saat klik luar gambar
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Tutup modal dengan tombol ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        imageModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// ============================================================================
// 2. MENU SYSTEM
// ============================================================================

const menuData = {
    espresso: [
        { name: "Espresso", desc: "Kopi hitam pekat dengan crema kaya", price: 25000 },
        { name: "Americano", desc: "Espresso dengan air panas", price: 30000 },
        { name: "Cappuccino", desc: "Espresso, susu, dan foam", price: 35000 },
        { name: "Latte", desc: "Espresso dengan susu hangat", price: 35000 },
        { name: "Macchiato", desc: "Espresso dengan sedikit milk foam", price: 32000 },
        { name: "Flat White", desc: "Espresso dengan microfoam susu", price: 38000 },
    ],
    manual: [
        { name: "Pour Over", desc: "Metode tradisional Vietnam", price: 40000 },
        { name: "French Press", desc: "Full body kopi yang kaya", price: 38000 },
        { name: "Mocha Pot", desc: "Kopi pekat Italia klasik", price: 35000 },
        { name: "AeroPress", desc: "Smooth dan balance sempurna", price: 38000 },
        { name: "Kalita Wave", desc: "Precision brewing untuk hasil terbaik", price: 42000 },
    ],
    noncoffee: [
        { name: "Hot Chocolate", desc: "Coklat premium yang lezat", price: 32000 },
        { name: "Chai Latte", desc: "Teh rempah hangat dengan susu", price: 30000 },
        { name: "Matcha Latte", desc: "Teh hijau tradisional Jepang", price: 35000 },
        { name: "Iced Tea", desc: "Teh dingin segar", price: 20000 },
        { name: "Fresh Juice", desc: "Jus buah segar pilihan", price: 25000 },
    ],
    pastries: [
        { name: "Croissant Mentega", desc: "Renyah dan berlapis", price: 18000 },
        { name: "Donut Coklat", desc: "Empuk dengan topping coklat", price: 15000 },
        { name: "Baguette Keju", desc: "Roti bergarpu dengan keju leleh", price: 20000 },
        { name: "Muffin Blueberry", desc: "Muffin dengan buah segar", price: 22000 },
        { name: "Cookie Coklat", desc: "Cookies homemade kami", price: 12000 },
    ]
};

const menuContainer = document.getElementById('menuContainer');
const categoryTabs = document.querySelectorAll('.category-tab');

function renderMenu(category) {
    menuContainer.innerHTML = '';
    menuData[category].forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition';
        card.innerHTML = `
            <h3 class="text-xl font-bold text-amber-900 mb-2">${item.name}</h3>
            <p class="text-gray-600 text-sm mb-4">${item.desc}</p>
            <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-amber-600">Rp ${item.price.toLocaleString('id-ID')}</span>
                <button class="add-to-cart bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition" data-name="${item.name}">
                    + Pesan
                </button>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active', 'bg-amber-900', 'text-white'));
        categoryTabs.forEach(t => t.classList.add('bg-gray-300', 'text-gray-800'));
        tab.classList.add('active', 'bg-amber-900', 'text-white');
        tab.classList.remove('bg-gray-300', 'text-gray-800');
        
        const category = tab.getAttribute('data-category');
        renderMenu(category);
    });
});

// Render menu awal dengan kategori Espresso Based
renderMenu('espresso');

// ============================================================================
// 3. FIREBASE INITIALIZATION (Optional)
// ============================================================================

let db = null;

async function initializeFirebase() {
    try {
        // Cek apakah SDK Firebase sudah tersedia
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(FIREBASE_CONFIG);
            db = firebase.firestore();
            console.log('✓ Firebase initialized successfully');
            loadReviewsFromFirebase();
            // Note: Analytics removed from public website (admin only)
        } else {
            console.warn('⚠ Firebase SDK tidak dimuat. Pastikan Anda sudah menambahkan script Firebase di index.html');
        }
    } catch (error) {
        console.error('✗ Firebase initialization error:', error);
    }
}

// ============================================================================
// 4. SUPABASE INITIALIZATION (Optional)
// ============================================================================

let supabase = null;

async function initializeSupabase() {
    try {
        // Cek apakah SDK Supabase sudah tersedia
        if (typeof window.supabase !== 'undefined') {
            supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
            console.log('✓ Supabase initialized successfully');
            loadReviewsFromSupabase();
            // Note: Analytics removed from public website (admin only)
        } else {
            console.warn('⚠ Supabase SDK tidak dimuat. Pastikan Anda sudah menambahkan script Supabase di index.html');
        }
    } catch (error) {
        console.error('✗ Supabase initialization error:', error);
    }
}

// ============================================================================
// 5. REVIEW SYSTEM - FIREBASE
// ============================================================================

async function loadReviewsFromFirebase() {
    if (!db) return;
    
    try {
        const reviewsSnapshot = await db.collection('reviews')
            .orderBy('timestamp', 'desc')
            .limit(20)
            .get();
        
        const reviewsList = document.getElementById('reviewsList');
        if (reviewsSnapshot.empty) {
            reviewsList.innerHTML = '<p class="text-center text-gray-500 py-8">Belum ada review. Jadilah yang pertama!</p>';
            return;
        }

        reviewsList.innerHTML = reviewsSnapshot.docs
            .map(doc => {
                const data = doc.data();
                const stars = '⭐'.repeat(data.rating);
                return `
                    <div class="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="font-bold text-gray-800">${data.name}</h4>
                            <span class="text-yellow-500">${stars}</span>
                        </div>
                        <p class="text-gray-700">${data.comment}</p>
                        <p class="text-xs text-gray-500 mt-2">${new Date(data.timestamp?.toDate()).toLocaleDateString('id-ID')}</p>
                    </div>
                `;
            })
            .join('');
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

async function submitReviewFirebase(reviewData) {
    if (!db) {
        showFormMessage('Database belum dikonfigurasi', 'error');
        return;
    }

    try {
        await db.collection('reviews').add({
            name: reviewData.name,
            rating: reviewData.rating,
            comment: reviewData.comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        showFormMessage('✓ Review berhasil disimpan!', 'success');
        document.getElementById('reviewForm').reset();
        document.getElementById('reviewRating').value = 0;
        updateStarsDisplay();
        loadReviewsFromFirebase();
    } catch (error) {
        console.error('Error submitting review:', error);
        showFormMessage('✗ Gagal menyimpan review', 'error');
    }
}

// ============================================================================
// 6. REVIEW SYSTEM - SUPABASE
// ============================================================================

async function loadReviewsFromSupabase() {
    if (!supabase) return;
    
    try {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) throw error;

        const reviewsList = document.getElementById('reviewsList');
        if (data.length === 0) {
            reviewsList.innerHTML = '<p class="text-center text-gray-500 py-8">Belum ada review. Jadilah yang pertama!</p>';
            return;
        }

        reviewsList.innerHTML = data
            .map(review => {
                const stars = '⭐'.repeat(review.rating);
                const date = new Date(review.created_at).toLocaleDateString('id-ID');
                return `
                    <div class="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="font-bold text-gray-800">${review.name}</h4>
                            <span class="text-yellow-500">${stars}</span>
                        </div>
                        <p class="text-gray-700">${review.comment}</p>
                        <p class="text-xs text-gray-500 mt-2">${date}</p>
                    </div>
                `;
            })
            .join('');
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

async function submitReviewSupabase(reviewData) {
    if (!supabase) {
        showFormMessage('Database belum dikonfigurasi', 'error');
        return;
    }

    try {
        const { error } = await supabase
            .from('reviews')
            .insert([{
                name: reviewData.name,
                rating: reviewData.rating,
                comment: reviewData.comment
            }]);

        if (error) throw error;

        showFormMessage('✓ Review berhasil disimpan!', 'success');
        document.getElementById('reviewForm').reset();
        document.getElementById('reviewRating').value = 0;
        updateStarsDisplay();
        loadReviewsFromSupabase();
    } catch (error) {
        console.error('Error submitting review:', error);
        showFormMessage('✗ Gagal menyimpan review', 'error');
    }
}

// ============================================================================
// 7. RATING STARS INTERACTION
// ============================================================================

const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('reviewRating');

function updateStarsDisplay() {
    const rating = parseInt(ratingInput.value);
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.textContent = '⭐';
            star.classList.add('text-amber-500');
        } else {
            star.textContent = '☆';
            star.classList.remove('text-amber-500');
        }
    });
}

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = star.getAttribute('data-rating');
        ratingInput.value = rating;
        updateStarsDisplay();
    });

    star.addEventListener('mouseover', () => {
        const rating = star.getAttribute('data-rating');
        stars.forEach(s => {
            const sRating = parseInt(s.getAttribute('data-rating'));
            if (sRating <= rating) {
                s.textContent = '⭐';
            } else {
                s.textContent = '☆';
            }
        });
    });
});

document.getElementById('ratingStars').addEventListener('mouseleave', updateStarsDisplay);

// ============================================================================
// 8. REVIEW FORM SUBMISSION
// ============================================================================

const reviewForm = document.getElementById('reviewForm');

reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('reviewName').value.trim();
    const rating = parseInt(document.getElementById('reviewRating').value);
    const comment = document.getElementById('reviewComment').value.trim();

    if (!name || rating === 0 || !comment) {
        showFormMessage('⚠ Silahkan isi semua field dan beri rating', 'warning');
        return;
    }

    const reviewData = { name, rating, comment };

    if (DB_TYPE === 'firebase') {
        await submitReviewFirebase(reviewData);
    } else if (DB_TYPE === 'supabase') {
        await submitReviewSupabase(reviewData);
    } else {
        showFormMessage('⚠ Database belum dikonfigurasi. Lihat console untuk instruksi.', 'warning');
    }
});

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = `text-center text-sm ${
        type === 'success' ? 'text-green-600' :
        type === 'error' ? 'text-red-600' :
        'text-yellow-600'
    }`;
    
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 4000);
}

// ============================================================================
// 9. INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('☕ Kedai Kopi Landing Page Loaded');
    console.log('Database Type:', DB_TYPE);
    
    if (DB_TYPE === 'firebase') {
        // Muat Firebase SDK jika ingin menggunakan Firebase
        const firebaseScript = document.createElement('script');
        firebaseScript.src = 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
        document.head.appendChild(firebaseScript);
        
        const firestoreScript = document.createElement('script');
        firestoreScript.src = 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
        document.head.appendChild(firestoreScript);
        
        setTimeout(initializeFirebase, 1000);
    } else if (DB_TYPE === 'supabase') {
        // Muat Supabase SDK jika ingin menggunakan Supabase
        const supabaseScript = document.createElement('script');
        supabaseScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        document.head.appendChild(supabaseScript);
        
        setTimeout(initializeSupabase, 1000);
    }
});

// ============================================================================
// 10. SMOOTH SCROLLING UNTUK NAVIGATION
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
