// ============================================================================
// ADMIN PANEL JAVASCRIPT
// ============================================================================

// ⚠️ CONFIGURATION - Update these for production
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAoEluQ_FRjTAdJKiskuP-WhOshDxV-9wY",
    authDomain: "mbulan-86894.firebaseapp.com",
    projectId: "mbulan-86894",
    storageBucket: "mbulan-86894.firebasestorage.app",
    messagingSenderId: "1065694671961",
    appId: "1:1065694671961:web:8d892222af95f2df48ed48",
    measurementId: "G-Z4WB0T83ME"
};

// Firebase Initialization (for production setup)
let firebaseInitialized = false;
let db = null;
let auth = null;

async function updateAdminSessionFromFirebase(user) {
    if (!user || !db) {
        localStorage.removeItem('adminSession');
        return false;
    }

    try {
        const adminDoc = await db.collection('admins').doc(user.uid).get();
        const role = adminDoc.exists ? adminDoc.data().role || 'admin' : 'user';

        const session = {
            username: user.email,
            uid: user.uid,
            role: role,
            loginTime: new Date().getTime(),
            token: btoa(user.email + ':' + new Date().getTime())
        };

        localStorage.setItem('adminSession', JSON.stringify(session));
        return role === 'admin';
    } catch (error) {
        console.error('Error checking admin role:', error);
        localStorage.removeItem('adminSession');
        return false;
    }
}

function initializeFirebaseAdmin() {
    if (typeof firebase === 'undefined') {
        console.warn('⚠️  Firebase SDK not loaded. Add Firebase scripts to admin.html');
        return false;
    }

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE_CONFIG);
        }
        db = firebase.firestore();
        auth = firebase.auth();
        firebaseInitialized = true;
        console.log('✅ Firebase initialized for Admin Panel!');

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const isAdmin = await updateAdminSessionFromFirebase(user);
                if (isAdmin) {
                    showAdminPanel();
                    initializeDashboard();
                } else {
                    localStorage.removeItem('adminSession');
                    showLoginPage();
                    if (auth.currentUser) {
                        auth.signOut().catch((err) => console.error('Logout failed:', err));
                    }
                }
            } else {
                localStorage.removeItem('adminSession');
                showLoginPage();
            }
        });

        return true;
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        return false;
    }
}

initializeFirebaseAdmin();

// Session Management
const AdminSession = {
    isLoggedIn: () => {
        const session = JSON.parse(localStorage.getItem('adminSession') || 'null');
        if (session && session.role === 'admin') return true;
        return false;
    },
    login: (username, role = 'admin') => {
        localStorage.setItem('adminSession', JSON.stringify({
            username: username,
            role: role,
            loginTime: new Date().getTime(),
            token: btoa(username + ':' + new Date().getTime())
        }));
    },
    logout: () => {
        localStorage.removeItem('adminSession');
    },
    getSession: () => JSON.parse(localStorage.getItem('adminSession') || 'null')
};

// Menu Data Management
const MenuManager = {
    getAll: () => {
        return JSON.parse(localStorage.getItem('adminMenuData') || 'null') || generateDefaultMenuData();
    },
    save: (menuData) => {
        localStorage.setItem('adminMenuData', JSON.stringify(menuData));
    },
    add: async (item) => {
        const payload = {
            name: item.name,
            category: item.category,
            desc: item.desc || '',
            description: item.desc || '',
            price: Number(item.price) || 0
        };

        if (db) {
            try {
                const docRef = await db.collection('menu').add(payload);
                const data = MenuManager.getAll();
                if (!data[item.category]) data[item.category] = [];
                data[item.category].push({ ...payload, id: docRef.id, name: payload.name, category: payload.category, desc: payload.desc, price: payload.price });
                MenuManager.save(data);
                return { ...payload, id: docRef.id };
            } catch (error) {
                console.error('Error saving menu to Firebase:', error);
            }
        }

        const data = MenuManager.getAll();
        if (!data[item.category]) data[item.category] = [];
        item.id = Date.now();
        data[item.category].push(item);
        MenuManager.save(data);
        return item;
    },
    update: async (category, id, updatedItem) => {
        const payload = {
            name: updatedItem.name,
            category: updatedItem.category,
            desc: updatedItem.desc || '',
            description: updatedItem.desc || '',
            price: Number(updatedItem.price) || 0
        };

        if (db && id) {
            try {
                await db.collection('menu').doc(id).update(payload);
                const data = MenuManager.getAll();
                const targetCategory = payload.category || category;
                const categoryItems = data[targetCategory] || [];
                const index = categoryItems.findIndex(item => String(item.id) === String(id));
                if (index !== -1) {
                    categoryItems[index] = { ...categoryItems[index], ...payload, id };
                    MenuManager.save(data);
                }
                return true;
            } catch (error) {
                console.error('Error updating menu in Firebase:', error);
            }
        }

        const data = MenuManager.getAll();
        const currentCategory = data[category] || [];
        const index = currentCategory.findIndex(item => String(item.id) === String(id));
        if (index !== -1) {
            currentCategory[index] = { ...currentCategory[index], ...updatedItem, id };
            MenuManager.save(data);
        }
        return true;
    },
    delete: async (category, id) => {
        if (db && id) {
            try {
                await db.collection('menu').doc(id).delete();
            } catch (error) {
                console.error('Error deleting menu in Firebase:', error);
            }
        }

        const data = MenuManager.getAll();
        if (data[category]) {
            data[category] = data[category].filter(item => String(item.id) !== String(id));
            MenuManager.save(data);
        }
        return true;
    }
};

async function syncMenuFromFirebase() {
    if (!db) return MenuManager.getAll();

    try {
        const snapshot = await db.collection('menu').get();
        const grouped = {};

        snapshot.forEach(doc => {
            const item = doc.data();
            const category = item.category || 'espresso';
            if (!grouped[category]) grouped[category] = [];
            grouped[category].push({
                id: doc.id,
                name: item.name,
                category,
                desc: item.desc || item.description || '',
                description: item.desc || item.description || '',
                price: Number(item.price) || 0
            });
        });

        if (Object.keys(grouped).length > 0) {
            MenuManager.save(grouped);
            return grouped;
        }
    } catch (error) {
        console.error('Error syncing menu from Firebase:', error);
    }

    return MenuManager.getAll();
}

// Generate default menu data
function generateDefaultMenuData() {
    return {
        espresso: [
            { id: 1, name: "Espresso", desc: "Kopi hitam pekat dengan crema kaya", price: 25000 },
            { id: 2, name: "Americano", desc: "Espresso dengan air panas", price: 30000 },
            { id: 3, name: "Cappuccino", desc: "Espresso, susu, dan foam", price: 35000 },
            { id: 4, name: "Latte", desc: "Espresso dengan susu hangat", price: 35000 },
            { id: 5, name: "Macchiato", desc: "Espresso dengan sedikit milk foam", price: 32000 },
            { id: 6, name: "Flat White", desc: "Espresso dengan microfoam susu", price: 38000 },
        ],
        manual: [
            { id: 7, name: "Pour Over", desc: "Metode tradisional Vietnam", price: 40000 },
            { id: 8, name: "French Press", desc: "Full body kopi yang kaya", price: 38000 },
            { id: 9, name: "Mocha Pot", desc: "Kopi pekat Italia klasik", price: 35000 },
            { id: 10, name: "AeroPress", desc: "Smooth dan balance sempurna", price: 38000 },
            { id: 11, name: "Kalita Wave", desc: "Precision brewing untuk hasil terbaik", price: 42000 },
        ],
        noncoffee: [
            { id: 12, name: "Hot Chocolate", desc: "Coklat premium yang lezat", price: 32000 },
            { id: 13, name: "Chai Latte", desc: "Teh rempah hangat dengan susu", price: 30000 },
            { id: 14, name: "Matcha Latte", desc: "Teh hijau tradisional Jepang", price: 35000 },
            { id: 15, name: "Iced Tea", desc: "Teh dingin segar", price: 20000 },
            { id: 16, name: "Fresh Juice", desc: "Jus buah segar pilihan", price: 25000 },
        ],
        pastries: [
            { id: 17, name: "Croissant Mentega", desc: "Renyah dan berlapis", price: 18000 },
            { id: 18, name: "Donut Coklat", desc: "Empuk dengan topping coklat", price: 15000 },
            { id: 19, name: "Baguette Keju", desc: "Roti bergarpu dengan keju leleh", price: 20000 },
            { id: 20, name: "Muffin Blueberry", desc: "Muffin dengan buah segar", price: 22000 },
            { id: 21, name: "Cookie Coklat", desc: "Cookies homemade kami", price: 12000 },
        ]
    };
}

// Promo Code Management
const PromoManager = {
    getAll: () => JSON.parse(localStorage.getItem('adminPromoData') || '[]'),
    save: (promoData) => localStorage.setItem('adminPromoData', JSON.stringify(promoData)),
    add: (promo) => {
        const data = PromoManager.getAll();
        promo.id = Date.now();
        promo.createdAt = new Date();
        data.push(promo);
        PromoManager.save(data);
    },
    delete: (id) => {
        const data = PromoManager.getAll();
        PromoManager.save(data.filter(p => p.id !== id));
    }
};

// ============================================================================
// PAGE INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {
    initializeFirebaseAdmin();

    // Cek apakah user sudah login
    if (AdminSession.isLoggedIn()) {
        showAdminPanel();
        await initializeDashboard();
    } else {
        showLoginPage();
    }

    // Event Listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Tab Navigation
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });

    const createAdminBtn = document.getElementById('createAdminBtn');
    if (createAdminBtn) {
        createAdminBtn.addEventListener('click', createAdminUser);
    }

    // Menu Buttons
    document.getElementById('addMenuBtn').addEventListener('click', openMenuModal);
    document.getElementById('menuForm').addEventListener('submit', handleMenuSubmit);
    
    // Promo Buttons
    document.getElementById('addPromoBtn').addEventListener('click', openPromoModal);

    // Menu Filter
    document.querySelectorAll('.menu-filter').forEach(btn => {
        btn.addEventListener('click', filterMenuByCategory);
    });

    // Review Filter
    document.querySelectorAll('.review-filter').forEach(btn => {
        btn.addEventListener('click', filterReviews);
    });
});

// ============================================================================
// LOGIN & LOGOUT
// ============================================================================

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('loginError');

    if (!email || !password) {
        errorDiv.textContent = '❌ Email dan password wajib diisi!';
        errorDiv.classList.remove('hidden');
        return;
    }

    if (!auth) {
        errorDiv.textContent = '❌ Firebase Authentication belum siap. Cek konfigurasi Firebase.';
        errorDiv.classList.remove('hidden');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(async () => {
            const user = auth.currentUser;
            const isAdmin = user ? await updateAdminSessionFromFirebase(user) : false;

            if (!isAdmin) {
                errorDiv.textContent = '❌ Akun ini bukan admin terdaftar.';
                errorDiv.classList.remove('hidden');
                auth.signOut().catch((err) => console.error('Logout failed:', err));
                return;
            }

            errorDiv.classList.add('hidden');
            showAdminPanel();
            initializeDashboard();
        })
        .catch((error) => {
            console.error('Login error:', error);
            errorDiv.textContent = '❌ Email atau password salah, atau akun belum dibuat di Firebase Auth.';
            errorDiv.classList.remove('hidden');
        });
}

function handleLogout() {
    if (confirm('Yakin ingin logout?')) {
        if (auth) {
            auth.signOut().catch((error) => console.error('Logout error:', error));
        }
        AdminSession.logout();
        showLoginPage();
    }
}

function showLoginPage() {
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('adminPage').classList.add('hidden');
}

function showAdminPanel() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminPage').classList.remove('hidden');

    const session = AdminSession.getSession();
    const currentUserEmail = auth && auth.currentUser ? auth.currentUser.email : session?.username;
    document.getElementById('adminName').textContent = `${currentUserEmail || 'Admin'} (Admin)`;

    const createAdminSection = document.getElementById('createAdminSection');
    if (createAdminSection) {
        const isAdminAuthorized = session && session.role === 'admin';
        createAdminSection.style.display = isAdminAuthorized ? 'block' : 'none';
    }
}

// ============================================================================
// TAB SWITCHING
// ============================================================================

function switchTab(e) {
    const tabName = e.target.getAttribute('data-tab');
    
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active', 'border-b-2', 'border-amber-500', 'text-amber-500');
        btn.classList.add('text-gray-400');
    });
    e.target.classList.add('active', 'border-b-2', 'border-amber-500', 'text-amber-500');
    e.target.classList.remove('text-gray-400');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    document.getElementById(tabName).classList.remove('hidden');

    // Load specific tab data
    if (tabName === 'menu') {
        renderMenuTable();
    } else if (tabName === 'reviews') {
        renderReviews();
    } else if (tabName === 'promo') {
        renderPromoTable();
    }
}

// ============================================================================
// DASHBOARD
// ============================================================================

async function initializeDashboard() {
    if (firebaseInitialized || initializeFirebaseAdmin()) {
        await syncMenuFromFirebase();
    }

    // Load stats
    updateDashboardStats();
    renderTopItems();
    renderMenuTable();
}

function updateDashboardStats() {
    const menuData = MenuManager.getAll();
    const totalMenuItems = Object.values(menuData).reduce((sum, arr) => sum + arr.length, 0);
    const promoData = PromoManager.getAll();

    document.getElementById('statMenuItems').textContent = totalMenuItems;
    document.getElementById('statTotalReviews').textContent = '28';  // Mock data
    document.getElementById('statTotalSales').textContent = 'Rp 2.450.000';  // Mock data
    document.getElementById('statTotalOrders').textContent = '46';  // Mock data
}

function renderTopItems() {
    const topItems = [
        { name: 'Cappuccino', sales: 14, revenue: 490000 },
        { name: 'Espresso', sales: 11, revenue: 275000 },
        { name: 'Americano', sales: 8, revenue: 240000 },
        { name: 'Latte', sales: 7, revenue: 245000 },
        { name: 'Pour Over', sales: 6, revenue: 240000 }
    ];

    const topItemsList = document.getElementById('topItemsList');
    topItemsList.innerHTML = topItems.map((item, index) => `
        <div class="flex justify-between items-center p-3 bg-gray-700 rounded">
            <div>
                <div class="font-semibold text-gray-100">${index + 1}. ${item.name}</div>
                <div class="text-sm text-gray-400">${item.sales} terjual • Rp ${item.revenue.toLocaleString('id-ID')}</div>
            </div>
            <div class="text-2xl font-bold text-amber-500">#${index + 1}</div>
        </div>
    `).join('');
}

// ============================================================================
// MENU MANAGEMENT
// ============================================================================

function renderMenuTable() {
    const menuData = MenuManager.getAll();
    const menuTable = document.getElementById('menuTable');
    let html = '';

    Object.entries(menuData).forEach(([category, items]) => {
        items.forEach(item => {
            html += `
                <tr>
                    <td class="px-4 py-3">${item.name}</td>
                    <td class="px-4 py-3"><span class="bg-amber-600 text-white text-xs px-2 py-1 rounded">${category}</span></td>
                    <td class="px-4 py-3 font-semibold">Rp ${item.price.toLocaleString('id-ID')}</td>
                    <td class="px-4 py-3"><span class="text-green-500">✅ Aktif</span></td>
                    <td class="px-4 py-3 text-center">
                        <button class="text-blue-500 hover:text-blue-400 mr-3" onclick="editMenuItem('${category}', ${item.id})">✏️ Edit</button>
                        <button class="text-red-500 hover:text-red-400" onclick="deleteMenuItem('${category}', ${item.id})">🗑️ Hapus</button>
                    </td>
                </tr>
            `;
        });
    });

    menuTable.innerHTML = html || '<tr><td colspan="5" class="px-4 py-3 text-center text-gray-400">Tidak ada menu items</td></tr>';
}

function filterMenuByCategory(e) {
    const category = e.target.getAttribute('data-category');
    const menuData = MenuManager.getAll();
    const menuTable = document.getElementById('menuTable');
    
    // Update filter buttons
    document.querySelectorAll('.menu-filter').forEach(btn => {
        btn.classList.remove('bg-amber-600', 'text-white');
        btn.classList.add('bg-gray-700', 'text-gray-300');
    });
    e.target.classList.add('bg-amber-600', 'text-white');
    e.target.classList.remove('bg-gray-700', 'text-gray-300');

    let html = '';
    if (category === 'all') {
        Object.entries(menuData).forEach(([cat, items]) => {
            items.forEach(item => {
                html += renderMenuRow(cat, item);
            });
        });
    } else {
        menuData[category].forEach(item => {
            html += renderMenuRow(category, item);
        });
    }

    menuTable.innerHTML = html;
}

function renderMenuRow(category, item) {
    return `
        <tr>
            <td class="px-4 py-3">${item.name}</td>
            <td class="px-4 py-3"><span class="bg-amber-600 text-white text-xs px-2 py-1 rounded">${category}</span></td>
            <td class="px-4 py-3 font-semibold">Rp ${item.price.toLocaleString('id-ID')}</td>
            <td class="px-4 py-3"><span class="text-green-500">✅ Aktif</span></td>
            <td class="px-4 py-3 text-center">
                <button class="text-blue-500 hover:text-blue-400 mr-3" onclick="editMenuItem('${category}', ${item.id})">✏️ Edit</button>
                <button class="text-red-500 hover:text-red-400" onclick="deleteMenuItem('${category}', ${item.id})">🗑️ Hapus</button>
            </td>
        </tr>
    `;
}

function closeMenuModal() {
    document.getElementById('menuModal').classList.add('hidden');
    document.getElementById('menuForm').reset();
    document.getElementById('menuDocId').value = '';
    document.getElementById('menuModalTitle').textContent = 'Tambah/Edit Menu Item';
    document.getElementById('menuSubmitBtn').textContent = '✅ Simpan';
}

function openMenuModal(item = null) {
    document.getElementById('menuModal').classList.remove('hidden');
    document.getElementById('menuForm').reset();

    if (item) {
        document.getElementById('menuDocId').value = item.id;
        document.getElementById('menuName').value = item.name || '';
        document.getElementById('menuCategory').value = item.category || 'espresso';
        document.getElementById('menuDesc').value = item.desc || item.description || '';
        document.getElementById('menuPrice').value = item.price || 0;
        document.getElementById('menuModalTitle').textContent = 'Edit Menu Item';
        document.getElementById('menuSubmitBtn').textContent = '✅ Update';
    } else {
        document.getElementById('menuDocId').value = '';
        document.getElementById('menuModalTitle').textContent = 'Tambah Menu Item';
        document.getElementById('menuSubmitBtn').textContent = '✅ Simpan';
    }
}

async function handleMenuSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('menuDocId').value;
    const item = {
        name: document.getElementById('menuName').value.trim(),
        category: document.getElementById('menuCategory').value,
        desc: document.getElementById('menuDesc').value.trim(),
        price: parseInt(document.getElementById('menuPrice').value, 10)
    };

    if (!item.name || !item.desc || Number.isNaN(item.price) || item.price <= 0) {
        showNotification('⚠️ Isi semua field menu dengan benar!');
        return;
    }

    if (id) {
        await MenuManager.update(item.category, id, item);
        showNotification('✅ Menu item berhasil diupdate!');
    } else {
        await MenuManager.add(item);
        showNotification('✅ Menu item berhasil ditambahkan!');
    }

    closeMenuModal();
    await syncMenuFromFirebase();
    renderMenuTable();
    updateDashboardStats();
}

function editMenuItem(category, id) {
    const menuData = MenuManager.getAll();
    const items = menuData[category] || [];
    const item = items.find(entry => String(entry.id) === String(id));

    if (item) {
        openMenuModal(item);
    } else {
        showNotification('⚠️ Item menu tidak ditemukan.');
    }
}

async function deleteMenuItem(category, id) {
    if (confirm('Yakin ingin menghapus item ini?')) {
        await MenuManager.delete(category, id);
        await syncMenuFromFirebase();
        renderMenuTable();
        updateDashboardStats();
        showNotification('✅ Menu item berhasil dihapus!');
    }
}

// ============================================================================
// REVIEW MANAGEMENT
// ============================================================================

function renderReviews() {
    const mockReviews = [
        { id: 1, name: 'Budi Santoso', rating: 5, comment: 'Kopi terbaik! Rasanya authentic dan pelayanannya ramah', flagged: false, date: '2024-01-15' },
        { id: 2, name: 'Siti Nurhaliza', rating: 5, comment: 'Tempatnya nyaman dan bersih, bakal datang lagi!', flagged: false, date: '2024-01-14' },
        { id: 3, name: 'Ahmad Wijaya', rating: 4, comment: 'Kopi enak tapi agak mahal', flagged: false, date: '2024-01-13' },
        { id: 4, name: 'Rina Kusuma', rating: 2, comment: 'Pelayanan lambat, kopi tidak sesuai order', flagged: true, date: '2024-01-12' }
    ];

    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = mockReviews.map(review => `
        <div class="bg-gray-800 rounded-lg p-4 border ${review.flagged ? 'border-red-500' : 'border-gray-700'}">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="font-bold text-gray-100">${review.name}</h4>
                    <p class="text-sm text-gray-400">${review.date}</p>
                </div>
                <div class="flex gap-2">
                    <span class="text-yellow-500">${'⭐'.repeat(review.rating)}</span>
                    ${review.flagged ? '<span class="text-red-500 text-sm font-bold">🚩 FLAGGED</span>' : ''}
                </div>
            </div>
            <p class="text-gray-300 mb-3">${review.comment}</p>
            <div class="flex gap-2">
                <button class="text-green-500 hover:text-green-400 text-sm" onclick="approveReview(${review.id})">✅ Approve</button>
                <button class="text-red-500 hover:text-red-400 text-sm" onclick="deleteReview(${review.id})">🗑️ Hapus</button>
            </div>
        </div>
    `).join('');
}

function filterReviews(e) {
    const filter = e.target.getAttribute('data-filter');
    alert('Filter: ' + filter);
    
    document.querySelectorAll('.review-filter').forEach(btn => {
        btn.classList.remove('bg-amber-600', 'text-white');
        btn.classList.add('bg-gray-700', 'text-gray-300');
    });
    e.target.classList.add('bg-amber-600', 'text-white');
    e.target.classList.remove('bg-gray-700', 'text-gray-300');
}

function approveReview(id) {
    showNotification('✅ Review approved!');
}

function deleteReview(id) {
    if (confirm('Hapus review ini?')) {
        showNotification('✅ Review deleted!');
        renderReviews();
    }
}

// ============================================================================
// PROMO MANAGEMENT
// ============================================================================

function openPromoModal() {
    alert('Buat promo baru - coming soon!');
}

function renderPromoTable() {
    const promoData = PromoManager.getAll();
    const mockPromos = [
        { id: 1, code: 'OLAHRAYA', discount: 20, maxUse: 50, used: 35, status: 'Active' },
        { id: 2, code: 'KEDAI50', discount: 50, maxUse: 100, used: 72, status: 'Active' },
        { id: 3, code: 'WELCOME10', discount: 10, maxUse: 999, used: 125, status: 'Active' },
        { id: 4, code: 'EXPIRED', discount: 15, maxUse: 100, used: 100, status: 'Expired' }
    ];

    const promoTable = document.getElementById('promoTable');
    promoTable.innerHTML = mockPromos.map(promo => `
        <tr>
            <td class="px-4 py-3 font-bold text-amber-500">${promo.code}</td>
            <td class="px-4 py-3">${promo.discount}%</td>
            <td class="px-4 py-3">${promo.maxUse}</td>
            <td class="px-4 py-3">${promo.used}</td>
            <td class="px-4 py-3">
                <span class="px-2 py-1 rounded text-xs ${promo.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'}">
                    ${promo.status}
                </span>
            </td>
            <td class="px-4 py-3 text-center">
                <button class="text-blue-500 hover:text-blue-400 mr-3">✏️</button>
                <button class="text-red-500 hover:text-red-400" onclick="deletePromo(${promo.id})">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function deletePromo(id) {
    if (confirm('Hapus promo ini?')) {
        PromoManager.delete(id);
        renderPromoTable();
        showNotification('✅ Promo deleted!');
    }
}

// ============================================================================
// UTILITIES
// ============================================================================

async function createAdminUser() {
    const session = AdminSession.getSession();
    if (!session || session.role !== 'admin') {
        showNotification('⚠️ Hanya admin yang sudah login yang bisa membuat akun admin baru.');
        return;
    }

    const email = document.getElementById('newAdminEmail').value.trim();
    const password = document.getElementById('newAdminPassword').value;

    if (!email || !password) {
        showNotification('⚠️ Email dan password wajib diisi!');
        return;
    }

    if (!auth) {
        showNotification('⚠️ Firebase Auth belum siap. Periksa konfigurasi Firebase.');
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);

        if (db) {
            await db.collection('admins').doc(userCredential.user.uid).set({
                email: email,
                role: 'admin',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        document.getElementById('newAdminEmail').value = '';
        document.getElementById('newAdminPassword').value = '';
        showNotification('✅ Akun admin berhasil dibuat!');
    } catch (error) {
        console.error('Error creating admin:', error);
        showNotification('❌ Gagal membuat akun admin: ' + (error.message || 'Unknown error'));
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
