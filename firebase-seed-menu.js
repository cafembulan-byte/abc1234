// Firebase Seed Script untuk collection `menu`
// Jalankan di browser console di Firebase project, atau pindahkan ke file JS yang di-run di proyek Anda.

const menuData = [
  {
    category: 'espresso',
    name: 'Espresso',
    desc: 'Kopi hitam pekat dengan crema kaya',
    price: 25000
  },
  {
    category: 'espresso',
    name: 'Americano',
    desc: 'Espresso dengan air panas',
    price: 30000
  },
  {
    category: 'espresso',
    name: 'Cappuccino',
    desc: 'Espresso, susu, dan foam',
    price: 35000
  },
  {
    category: 'espresso',
    name: 'Latte',
    desc: 'Espresso dengan susu hangat',
    price: 35000
  },
  {
    category: 'espresso',
    name: 'Macchiato',
    desc: 'Espresso dengan sedikit milk foam',
    price: 32000
  },
  {
    category: 'espresso',
    name: 'Flat White',
    desc: 'Espresso dengan microfoam susu',
    price: 38000
  },
  {
    category: 'manual',
    name: 'Pour Over',
    desc: 'Metode tradisional Vietnam',
    price: 40000
  },
  {
    category: 'manual',
    name: 'French Press',
    desc: 'Full body kopi yang kaya',
    price: 38000
  },
  {
    category: 'manual',
    name: 'Mocha Pot',
    desc: 'Kopi pekat Italia klasik',
    price: 35000
  },
  {
    category: 'manual',
    name: 'AeroPress',
    desc: 'Smooth dan balance sempurna',
    price: 38000
  },
  {
    category: 'manual',
    name: 'Kalita Wave',
    desc: 'Precision brewing untuk hasil terbaik',
    price: 42000
  },
  {
    category: 'noncoffee',
    name: 'Hot Chocolate',
    desc: 'Coklat premium yang lezat',
    price: 32000
  },
  {
    category: 'noncoffee',
    name: 'Chai Latte',
    desc: 'Teh rempah hangat dengan susu',
    price: 30000
  },
  {
    category: 'noncoffee',
    name: 'Matcha Latte',
    desc: 'Teh hijau tradisional Jepang',
    price: 35000
  },
  {
    category: 'noncoffee',
    name: 'Iced Tea',
    desc: 'Teh dingin segar',
    price: 20000
  },
  {
    category: 'noncoffee',
    name: 'Fresh Juice',
    desc: 'Jus buah segar pilihan',
    price: 25000
  },
  {
    category: 'pastries',
    name: 'Croissant Mentega',
    desc: 'Renyah dan berlapis',
    price: 18000
  },
  {
    category: 'pastries',
    name: 'Donut Coklat',
    desc: 'Empuk dengan topping coklat',
    price: 15000
  },
  {
    category: 'pastries',
    name: 'Baguette Keju',
    desc: 'Roti bergarpu dengan keju leleh',
    price: 20000
  },
  {
    category: 'pastries',
    name: 'Muffin Blueberry',
    desc: 'Muffin dengan buah segar',
    price: 22000
  },
  {
    category: 'pastries',
    name: 'Cookie Coklat',
    desc: 'Cookies homemade kami',
    price: 12000
  }
];

async function seedMenu() {
  const firebaseConfig = {
    apiKey: "AIzaSyAoEluQ_FRjTAdJKiskuP-WhOshDxV-9wY",
    authDomain: "mbulan-86894.firebaseapp.com",
    projectId: "mbulan-86894",
    storageBucket: "mbulan-86894.firebasestorage.app",
    messagingSenderId: "1065694671961",
    appId: "1:1065694671961:web:8d892222af95f2df48ed48",
    measurementId: "G-Z4WB0T83ME"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();

  for (const item of menuData) {
    await db.collection('menu').add(item);
    console.log('✅ Added:', item.name);
  }

  console.log('🎉 Semua menu berhasil di-seed ke Firestore.');
}

seedMenu().catch(err => {
  console.error('❌ Gagal menambahkan data menu:', err);
});
