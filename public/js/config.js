// ============================================
// KONFIGURASI TOKO
// ============================================

const CONFIG = {
    // Info Toko
    nama: "Toko Saya",
    tagline: "Marketplace Terpercaya",
    deskripsi: "Toko online untuk produk digital dan jasa kreatif",
    
    // Kontak
    alamat: "Jl. Contoh No. 123, Jakarta",
    whatsapp: "6281234567890",
    email: "toko@email.com",
    
    // Social Media
    sosial_media: {
        youtube: "https://youtube.com",
        instagram: "https://instagram.com",
        tiktok: "https://tiktok.com"
    },
    
    // Promo Default
    promo_default: {
        code: "PROMO10",
        discount: 10,
        description: "Diskon 10% untuk semua produk!"
    }
};

// ============================================
// FAQ (Pertanyaan Umum)
// ============================================
const FAQ_DATA = [
    {
        question: "Bagaimana cara melakukan pemesanan?",
        answer: "Pilih produk yang ingin dibeli, lalu klik pada produk untuk melihat detail dan varian."
    },
    {
        question: "Berapa lama waktu pengiriman?",
        answer: "Pengiriman dalam kota 1-2 hari, luar kota 2-5 hari kerja."
    },
    {
        question: "Apakah produk dijamin original?",
        answer: "Ya, semua produk 100% original dan bergaransi resmi."
    }
];

// ============================================
// TESTIMONIAL
// ============================================
const TESTIMONIAL_DATA = [
    {
        name: "Ahmad R.",
        location: "Bandung",
        text: "Pelayanan sangat cepat dan ramah. Produk original!",
        date: "12 Juni 2026",
        rating: 5
    },
    {
        name: "Sinta W.",
        location: "Jakarta",
        text: "Barang sampai dengan cepat dan packing aman.",
        date: "5 Juli 2026",
        rating: 5
    }
];

// ============================================
// ADVANTAGES (Keunggulan)
// ============================================
const ADVANTAGE_DATA = [
    { icon: "fa-shipping-fast", title: "Pengiriman Cepat", desc: "Pesanan diproses maksimal 1x24 jam" },
    { icon: "fa-shield-alt", title: "Garansi Resmi", desc: "Semua produk bergaransi resmi" },
    { icon: "fa-headset", title: "Dukungan 24/7", desc: "Customer service siap membantu Anda" },
    { icon: "fa-medal", title: "Terpercaya", desc: "Ribuan pelanggan telah mempercayai kami" }
];
