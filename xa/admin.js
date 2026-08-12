// ============================================================================
// ADMIN PANEL JAVASCRIPT
// ============================================================================

// ⚠️ CONFIGURATION - Update these for production
const FIREBASE_CONFIG = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    projectId: "your-firebase-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Firebase Initialization (for production setup)
let firebaseInitialized = false;

if (typeof firebase !== 'undefined' && FIREBASE_CONFIG.apiKey !== 'YOUR_FIREBASE_API_KEY') {
    try {
        firebase.initializeApp(FIREBASE_CONFIG);
        firebaseInitialized = true;
        console.log('✅ Firebase initialized for Admin Panel!');
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
    }
} else if (typeof firebase === 'undefined') {
    console.warn('⚠️  Firebase SDK not loaded. Add Firebase scripts to admin.html');
}

// Admin Credentials (Ubah di production!)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'kedai2024'  // ⚠️ UBAH PASSWORD INI DI PRODUCTION!
};

// Session Management
const AdminSession = {
    isLoggedIn: () => localStorage.getItem('adminSession') !== null,
    login: (username) => {
        localStorage.setItem('adminSession', JSON.stringify({
            username: username,
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
    add: (item) => {
        const data = MenuManager.getAll();
        item.id = Date.now();
        data[item.category].push(item);
        MenuManager.save(data);
        return item;
    },
    update: (category, id, updatedItem) => {
        const data = MenuManager.getAll();
        const index = data[category].findIndex(item => item.id === id);
        if (index !== -1) {
            data[category][index] = { ...data[category][index], ...updatedItem };
            MenuManager.save(data);
        }
    },
    delete: (category, id) => {
        const data = MenuManager.getAll();
        data[category] = data[category].filter(item => item.id !== id);
        MenuManager.save(data);
    }
};

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

document.addEventListener('DOMContentLoaded', () => {
    // Cek apakah user sudah login
    if (AdminSession.isLoggedIn()) {
        showAdminPanel();
        initializeDashboard();
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
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('loginError');

    // Simple validation (di production, gunakan server-side authentication!)
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        AdminSession.login(username);
        showAdminPanel();
        initializeDashboard();
        errorDiv.classList.add('hidden');
    } else {
        errorDiv.textContent = '❌ Username atau password salah!';
        errorDiv.classList.remove('hidden');
    }
}

function handleLogout() {
    if (confirm('Yakin ingin logout?')) {
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
    document.getElementById('adminName').textContent = `${session.username} (Admin)`;
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

function initializeDashboard() {
    // Load stats
    updateDashboardStats();
    renderTopItems();
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

function openMenuModal() {
    document.getElementById('menuModal').classList.remove('hidden');
    document.getElementById('menuForm').reset();
}

function handleMenuSubmit(e) {
    e.preventDefault();

    const item = {
        name: document.getElementById('menuName').value,
        category: document.getElementById('menuCategory').value,
        desc: document.getElementById('menuDesc').value,
        price: parseInt(document.getElementById('menuPrice').value)
    };

    MenuManager.add(item);
    document.getElementById('menuModal').classList.add('hidden');
    renderMenuTable();
    updateDashboardStats();
    showNotification('✅ Menu item berhasil ditambahkan!');
}

function editMenuItem(category, id) {
    alert('Edit feature coming soon! Menu ID: ' + id);
}

function deleteMenuItem(category, id) {
    if (confirm('Yakin ingin menghapus item ini?')) {
        MenuManager.delete(category, id);
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

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
