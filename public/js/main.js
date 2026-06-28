// ============================================
// MAIN.JS - Logika Utama Website
// ============================================

// ============================================
// STATE
// ============================================
let products = [];
let user = { uid: null, name: 'Guest', balance: 0 };
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedPromo = null;

// ============================================
// DOM ELEMENTS
// ============================================
const productsContainer = document.getElementById('productsContainer');
const userDisplay = document.getElementById('userDisplay');
const loginBtn = document.getElementById('loginBtn');
const cartBadge = document.getElementById('cartBadge');
const promoInput = document.getElementById('promoInput');
const applyPromoBtn = document.getElementById('applyPromoBtn');
const promoResult = document.getElementById('promoResult');

// ============================================
// FUNGSI LOAD PRODUCTS
// ============================================
async function loadProducts() {
    try {
        const res = await fetch('/api/products');
        const data = await res.json();
        
        if (data.success) {
            products = data.products;
            renderProducts(products);
        } else {
            productsContainer.innerHTML = '<div class="loading">Gagal memuat produk</div>';
        }
    } catch (error) {
        productsContainer.innerHTML = '<div class="loading">Error: Gagal koneksi ke server</div>';
        console.error('Error load products:', error);
    }
}

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(products) {
    if (!products || products.length === 0) {
        productsContainer.innerHTML = `
            <div class="loading" style="grid-column:1/-1; padding:40px;">
                <i class="fas fa-box-open" style="font-size:3rem; color:#f0a500; display:block; margin-bottom:10px;"></i>
                Belum ada produk. <br>
                <span style="font-size:0.8rem; color:#666;">Login ke admin panel untuk tambah produk</span>
            </div>
        `;
        return;
    }
    
    productsContainer.innerHTML = products.map(p => `
        <div class="product-card" onclick="buyProduct(${p.id})">
            <i class="${p.icon || 'fa-box'}"></i>
            <h4>${p.name}</h4>
            <div class="price">Rp ${(p.price || 0).toLocaleString('id-ID')}</div>
            <div class="category">${p.category || 'Lainnya'}</div>
        </div>
    `).join('');
}

// ============================================
// FUNGSI BELI
// ============================================
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (!user.uid) {
        alert('Silakan login terlebih dahulu!');
        return;
    }
    
    if (user.balance < product.price) {
        alert('❌ Saldo tidak mencukupi! Silakan top up.');
        return;
    }
    
    if (confirm(`Beli ${product.name} seharga Rp ${product.price.toLocaleString('id-ID')}?`)) {
        // Proses pembelian
        user.balance -= product.price;
        updateUserDisplay();
        
        // Simpan riwayat
        cart.push({
            ...product,
            date: new Date().toISOString(),
            pricePaid: product.price
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        
        alert(`✅ ${product.name} berhasil dibeli!`);
    }
}

// ============================================
// FUNGSI PROMO
// ============================================
applyPromoBtn.addEventListener('click', async () => {
    const code = promoInput.value.trim();
    if (!code) {
        promoResult.innerHTML = '❌ Masukkan kode promo!';
        return;
    }
    
    try {
        const res = await fetch('/api/promo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });
        const data = await res.json();
        
        if (data.valid) {
            appliedPromo = data;
            promoResult.innerHTML = `✅ ${data.message} (${data.discount}%)`;
            promoResult.style.color = '#2ecc71';
        } else {
            appliedPromo = null;
            promoResult.innerHTML = `❌ ${data.message}`;
            promoResult.style.color = '#e74c3c';
        }
    } catch (error) {
        promoResult.innerHTML = '❌ Error validasi promo';
        console.error(error);
    }
});

// ============================================
// COPY PROMO CODE
// ============================================
document.getElementById('copyPromoBtn')?.addEventListener('click', () => {
    const code = document.getElementById('promoCode').textContent;
    navigator.clipboard.writeText(code);
    alert('✅ Kode promo disalin!');
});

// ============================================
// LOGIN
// ============================================
loginBtn.addEventListener('click', () => {
    const name = prompt('Masukkan nama Anda:') || 'User';
    const uid = 'user_' + Date.now();
    user = { uid, name, balance: 100000 }; // Bonus saldo awal
    updateUserDisplay();
    loginBtn.textContent = 'Logout';
    alert(`✅ Selamat datang, ${name}! Saldo awal Rp 100.000`);
});

function updateUserDisplay() {
    userDisplay.textContent = `👤 ${user.name} | 💰 Rp ${user.balance.toLocaleString('id-ID')}`;
    document.getElementById('userBalance')?.textContent = `Rp ${user.balance.toLocaleString('id-ID')}`;
}

// ============================================
// CART
// ============================================
function updateCartBadge() {
    cartBadge.textContent = cart.length;
}

// ============================================
// INIT
// ============================================
loadProducts();
updateCartBadge();

// Auto refresh setiap 30 detik
setInterval(() => {
    loadProducts();
}, 30000);