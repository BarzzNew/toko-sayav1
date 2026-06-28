// ============================================
// API PROMO
// Endpoint: /api/promo
// Method: GET, POST
// ============================================

// Simulasi database promo
let promos = [
    { code: "DISKON10", discount: 10, description: "Diskon 10% untuk semua produk", active: true },
    { code: "GRATIS25", discount: 25, description: "Diskon 25% minimal beli 100rb", active: true },
    { code: "WELCOME", discount: 5, description: "Diskon 5% untuk member baru", active: true }
];

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // GET: Ambil semua promo (untuk admin)
    if (req.method === 'GET') {
        res.status(200).json({
            success: true,
            promos: promos
        });
        return;
    }

    // POST: Validasi kode promo
    if (req.method === 'POST') {
        const { code } = req.body;
        
        if (!code) {
            res.status(400).json({
                success: false,
                message: 'Kode promo wajib diisi!'
            });
            return;
        }

        const promo = promos.find(p => 
            p.code.toUpperCase() === code.toUpperCase() && p.active === true
        );

        if (promo) {
            res.status(200).json({
                success: true,
                valid: true,
                discount: promo.discount,
                message: `✅ Diskon ${promo.discount}% berhasil!`,
                description: promo.description
            });
        } else {
            res.status(200).json({
                success: false,
                valid: false,
                message: '❌ Kode promo tidak valid atau sudah expired'
            });
        }
        return;
    }

    // DELETE: Hapus promo (admin)
    if (req.method === 'DELETE') {
        const { code } = req.body;
        const index = promos.findIndex(p => p.code.toUpperCase() === code.toUpperCase());
        
        if (index === -1) {
            res.status(404).json({
                success: false,
                message: 'Promo tidak ditemukan'
            });
            return;
        }

        const removed = promos.splice(index, 1)[0];
        res.status(200).json({
            success: true,
            message: `Promo ${removed.code} berhasil dihapus!`
        });
        return;
    }

    res.status(405).json({
        success: false,
        message: 'Method not allowed'
    });
}