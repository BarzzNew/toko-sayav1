// ============================================
// API PRODUK
// Endpoint: /api/products
// Method: GET, POST
// ============================================

// Simulasi database (nanti pake Vercel Postgres)
let products = [
    { id: 1, name: "Panel Pterodactyl", category: "Hosting", price: 50000, icon: "fa-server", description: "Panel kontrol game server premium" },
    { id: 2, name: "Bot Multi Device", category: "Bot WhatsApp", price: 100000, icon: "fab fa-whatsapp", description: "Bot WhatsApp multi perangkat" },
    { id: 3, name: "Desain Logo", category: "Creative Design", price: 75000, icon: "fa-paint-brush", description: "Logo profesional untuk brand" }
];

export default function handler(req, res) {
    // CORS biar bisa diakses dari mana saja
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // GET: Ambil semua produk
    if (req.method === 'GET') {
        res.status(200).json({
            success: true,
            products: products,
            total: products.length
        });
        return;
    }

    // POST: Tambah produk baru (via admin)
    if (req.method === 'POST') {
        const { name, category, price, icon, description } = req.body;
        
        if (!name || !price) {
            res.status(400).json({
                success: false,
                message: 'Nama dan harga wajib diisi!'
            });
            return;
        }

        const newProduct = {
            id: Date.now(),
            name: name,
            category: category || 'Lainnya',
            price: parseInt(price),
            icon: icon || 'fa-box',
            description: description || ''
        };

        products.push(newProduct);
        
        res.status(201).json({
            success: true,
            message: 'Produk berhasil ditambahkan!',
            product: newProduct
        });
        return;
    }

    // Method lain tidak diizinkan
    res.status(405).json({
        success: false,
        message: 'Method not allowed'
    });
}
