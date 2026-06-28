// ============================================
// API HAPUS PRODUK BY ID
// Endpoint: /api/products/[id]
// Method: DELETE
// ============================================

// Import products dari file lain (simulasi)
// Di real, pake database
let products = [
    { id: 1, name: "Panel Pterodactyl", category: "Hosting", price: 50000 },
    { id: 2, name: "Bot Multi Device", category: "Bot WhatsApp", price: 100000 },
    { id: 3, name: "Desain Logo", category: "Creative Design", price: 75000 }
];

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'DELETE') {
        // Ambil ID dari URL
        const id = parseInt(req.query.id);
        
        const index = products.findIndex(p => p.id === id);
        
        if (index === -1) {
            res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
            return;
        }

        const removed = products.splice(index, 1)[0];
        
        res.status(200).json({
            success: true,
            message: `Produk "${removed.name}" berhasil dihapus!`
        });
        return;
    }

    res.status(405).json({
        success: false,
        message: 'Method not allowed'
    });
}
