// ============================================
// API TOP UP
// Endpoint: /api/topup
// Method: POST
// ============================================

// Simulasi database user & saldo
let users = [
    { uid: "user_001", name: "Andi", balance: 50000 },
    { uid: "user_002", name: "Budi", balance: 100000 }
];

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        const { userId, amount } = req.body;

        // Validasi input
        if (!userId || !amount) {
            res.status(400).json({
                success: false,
                message: 'User ID dan nominal wajib diisi!'
            });
            return;
        }

        if (amount < 1000) {
            res.status(400).json({
                success: false,
                message: 'Minimal top up Rp 1.000'
            });
            return;
        }

        // Cari user
        let user = users.find(u => u.uid === userId);
        if (!user) {
            // Buat user baru jika belum ada
            user = { uid: userId, name: 'User', balance: 0 };
            users.push(user);
        }

        // Generate QRIS (simulasi)
        const transactionId = `TRX-${Date.now()}`;
        const qrisUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${transactionId}`;

        // Simulasi: setelah bayar, saldo akan ditambah via webhook
        // Untuk demo, kita langsung tambah saldo (di real pakai callback PAKASIR)
        user.balance += amount;

        res.status(200).json({
            success: true,
            transaction_id: transactionId,
            qris_image: qrisUrl,
            amount: amount,
            new_balance: user.balance,
            message: `✅ QRIS berhasil dibuat. Bayar Rp ${amount.toLocaleString('id-ID')}`,
            expires_at: new Date(Date.now() + 15 * 60000).toISOString()
        });

        return;
    }

    res.status(405).json({
        success: false,
        message: 'Method not allowed'
    });
}