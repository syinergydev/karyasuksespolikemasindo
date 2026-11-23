// Semua fakta diambil dari situs KSP asli (ZIP). Ubah di sini, lalu `npm run build`.
export const FLAGS = {
  DEMO_NOTES: true,      // tampilkan catatan "perlu konfirmasi owner" (matikan sebelum live)
  SHOW_PARTNERS: true,   // section Mitra & Relasi Bisnis aktif (versi demo; konfirmasi owner & izin logo sebelum live)
  SHOW_HOURS: false,     // sumber asli kontradiktif (24 jam vs Sen-Sab 08.00-17.00)
  SITE_URL: 'https://karyasuksespolikemasindo.com',
};
export const SITE = {
  name: 'PT Karya Sukses Polikemasindo', short: 'KSP',
  founded: null,         // 2013 vs 1995 di sumber -> isi setelah owner konfirmasi
  address: 'Jl. Gempol Bypass, Sejo, Winong, Kec. Gempol, Pasuruan, Jawa Timur 67155',
  phone: '(0343) 842570', phoneTel: '+62343842570',
  wa: '6287851516522', waLabel: '0878-5151-6522',
  email: 'karya_sp_marketing2@hotmail.com',
  maps: 'https://maps.app.goo.gl/68Wu5j7uqQmfWudo9',
  mapsEmbed: 'https://www.google.com/maps?q=Jl.%20Gempol%20Bypass%2C%20Sejo%2C%20Winong%2C%20Kec.%20Gempol%2C%20Pasuruan%2C%20Jawa%20Timur%2067155&output=embed',
  youtube: 'https://youtu.be/zX1A9mJinP4', youtubeId: 'zX1A9mJinP4',
  socials: { instagram: '', facebook: '', tiktok: '', linkedin: '' }, // isi URL resmi -> otomatis tampil
};
// k = slug, img = kunci gambar
export const CATS = [
  { k: 'pp', code: 'PP', img: 'prod-pp',
    name: ['PP — Polypropylene', 'PP — Polypropylene'],
    tag: ['Ringan, transparan, tahan panas', 'Lightweight, clear, heat resistant'],
    desc: ['Pilihan ideal untuk kemasan makanan dan farmasi yang membutuhkan kejernihan visual serta ketahanan terhadap suhu tinggi.', 'An ideal choice for food and pharmaceutical packaging that needs visual clarity and resistance to high temperatures.'],
    adv: [['Ringan dan praktis', 'Lightweight and practical'], ['Transparan, menambah nilai jual produk', 'Clear film that adds to product appeal'], ['Tahan panas, tersedia varian food grade', 'Heat resistant, food-grade variants available']],
    specs: [[['Ketebalan', 'Thickness'], ['20–200 mikron', '20–200 microns']], [['Bentuk', 'Format'], ['Roll & pre-cut sheet', 'Roll & pre-cut sheet']], [['Ketahanan panas', 'Heat resistance'], ['Hingga 120°C*', 'Up to 120°C*']]] },
  { k: 'pe', code: 'PE', img: 'prod-pe',
    name: ['PE — Polyethylene', 'PE — Polyethylene'],
    tag: ['Fleksibel, kuat, kedap air', 'Flexible, strong, water resistant'],
    desc: ['Pilihan utama untuk wrapping industri dan kemasan yang membutuhkan ketahanan terhadap sobek dan kelembapan.', 'A leading choice for industrial wrapping and packaging that must resist tearing and moisture.'],
    adv: [['Fleksibel dan lentur', 'Flexible and pliable'], ['Kuat, tahan sobek dan kelembapan', 'Strong, tear and moisture resistant'], ['Cocok untuk makanan beku dan wrapping berat', 'Suited to frozen food and heavy wrapping']],
    specs: [[['Ketebalan', 'Thickness'], ['30–500 mikron', '30–500 microns']], [['Varian', 'Variants'], ['LDPE & LLDPE', 'LDPE & LLDPE']], [['Aplikasi', 'Application'], ['Wrapping berat', 'Heavy wrapping']]] },
  { k: 'hdpe', code: 'HDPE', img: 'prod-hdpe',
    name: ['HDPE — High Density Polyethylene', 'HDPE — High Density Polyethylene'],
    tag: ['Lebih kaku, tahan sobek', 'Stiffer, tear resistant'],
    desc: ['Solusi plastik kuat dan kaku untuk kantong belanja serta kemasan makanan panas, dari kebutuhan rumah tangga hingga UMKM.', 'A strong, rigid plastic solution for shopping bags and hot-food packaging, from household needs to small businesses.'],
    adv: [['Kaku dan tahan sobek', 'Rigid and tear resistant'], ['Tahan suhu ekstrem, termasuk kuah panas', 'Withstands extreme temperatures, including hot broth'], ['Tersedia varian food grade', 'Food-grade variants available']],
    specs: [[['Produk utama', 'Main products'], ['Tas kresek / kantong belanja', 'Carrier and shopping bags']], [['Suhu', 'Temperature'], ['Tahan suhu ekstrem', 'Extreme-temperature tolerant']], [['Varian', 'Variants'], ['Food grade', 'Food grade']]] },
  { k: 'flexible', code: 'Flexible', img: 'prod-flex',
    name: ['Flexible Packaging', 'Flexible Packaging'],
    tag: ['Laminasi multilayer, printing hingga 8 warna', 'Multilayer lamination, up to 8-colour printing'],
    desc: ['Kemasan laminasi multilayer dengan printing hingga 8 warna untuk produk FMCG.', 'Multilayer laminated packaging with up to 8-colour printing for FMCG products.'],
    adv: [['Laminasi multilayer', 'Multilayer lamination'], ['Printing hingga 8 warna', 'Printing up to 8 colours'], ['Dirancang untuk produk FMCG', 'Designed for FMCG products']],
    specs: [[['Struktur', 'Structure'], ['Multilayer (3-Ply, 5-Ply)*', 'Multilayer (3-ply, 5-ply)*']], [['Printing', 'Printing'], ['Hingga 8 warna', 'Up to 8 colours']], [['Segmen', 'Segment'], ['FMCG', 'FMCG']]] },
  { k: 'custom', code: 'Custom', img: 'prod-custom',
    name: ['Custom Packaging', 'Custom Packaging'],
    tag: ['Desain sesuai brand Anda', 'Designed around your brand'],
    desc: ['Kemasan dengan desain sesuai brand Anda, dari konsep hingga produksi di satu tempat.', 'Packaging designed around your brand, from concept to production in one place.'],
    adv: [['Desain sesuai identitas brand', 'Design that fits your brand identity'], ['Dari konsep hingga produksi', 'From concept to production'], ['Konsultasi kebutuhan langsung dengan tim', 'Direct consultation with our team']],
    specs: [[['Layanan', 'Service'], ['Desain & produksi kemasan', 'Packaging design & production']], [['Opsi bahan', 'Material options'], ['PP, PE, HD, multilayer', 'PP, PE, HD, multilayer']], [['Spesifikasi', 'Specifications'], ['Sesuai permintaan*', 'Made to order*']]] },
];
// c = kategori, n = nama [id,en], m = mikron (opsional), pos = fokus gambar
export const PRODUCTS = [
  { c: 'pp', img: 'roll', pos: '50% 50%', n: ['Kemasan PP Roll 20 Mikron', 'PP Packaging Roll 20 Micron'], m: 20 },
  { c: 'pp', img: 'prod-pp', pos: '50% 20%', n: ['Kemasan PP Sheet 50 Mikron', 'PP Packaging Sheet 50 Micron'], m: 50 },
  { c: 'pp', img: 'prod-pp', pos: '50% 70%', n: ['Kemasan PP Transparan 100 Mikron', 'Clear PP Packaging 100 Micron'], m: 100 },
  { c: 'pp', img: 'prod-pp', pos: '30% 45%', n: ['Kemasan PP Food Grade 200 Mikron', 'Food-Grade PP Packaging 200 Micron'], m: 200 },
  { c: 'pe', img: 'prod-pe', pos: '50% 30%', n: ['Kantong PE LDPE 30 Mikron', 'LDPE PE Bag 30 Micron'], m: 30 },
  { c: 'pe', img: 'mesin', pos: '45% 40%', n: ['Wrapping PE LLDPE Industri', 'Industrial LLDPE PE Wrapping'] },
  { c: 'pe', img: 'prod-pe', pos: '50% 80%', n: ['Kantong PE Kedap Air 100 Mikron', 'Waterproof PE Bag 100 Micron'], m: 100 },
  { c: 'pe', img: 'roll', pos: '20% 50%', n: ['PE Roll Film 500 Mikron', 'PE Roll Film 500 Micron'], m: 500 },
  { c: 'hdpe', img: 'prod-hdpe', pos: '20% 50%', n: ['Kantong Belanja HDPE 50 Mikron', 'HDPE Shopping Bag 50 Micron'], m: 50 },
  { c: 'hdpe', img: 'prod-hdpe', pos: '50% 50%', n: ['Kemasan Deterjen HDPE 100 Mikron', 'HDPE Detergent Packaging 100 Micron'], m: 100 },
  { c: 'hdpe', img: 'prod-hdpe', pos: '80% 50%', n: ['Kemasan Pupuk HDPE 200 Mikron', 'HDPE Fertiliser Packaging 200 Micron'], m: 200 },
  { c: 'hdpe', img: 'prod-hdpe', pos: '50% 90%', n: ['HDPE Food Grade 300 Mikron', 'Food-Grade HDPE 300 Micron'], m: 300 },
  { c: 'flexible', img: 'prod-flex', pos: '25% 50%', n: ['Kemasan Kopi Multilayer 3-Ply', 'Multilayer 3-Ply Coffee Packaging'] },
  { c: 'flexible', img: 'prod-flex', pos: '75% 50%', n: ['Pouch Minyak Goreng Standing', 'Standing Cooking-Oil Pouch'] },
  { c: 'flexible', img: 'prod-flex', pos: '50% 20%', n: ['Kemasan FMCG Laminasi 5-Ply', 'FMCG Laminated Packaging 5-Ply'] },
  { c: 'flexible', img: 'prod-flex', pos: '50% 85%', n: ['Flexible Sachet Printing 8 Warna', 'Flexible Sachet, 8-Colour Printing'] },
  { c: 'custom', img: 'prod-custom', pos: '20% 50%', n: ['Custom Kemasan Brand Premium', 'Premium Brand Custom Packaging'] },
  { c: 'custom', img: 'prod-custom', pos: '80% 50%', n: ['Custom Pouch Eco-Friendly', 'Eco-Friendly Custom Pouch'] },
  { c: 'custom', img: 'prod-custom', pos: '50% 20%', n: ['Custom Kemasan Biodegradable', 'Biodegradable Custom Packaging'] },
  { c: 'custom', img: 'prod-custom', pos: '50% 85%', n: ['Custom OEM Full Packaging Solution', 'Custom OEM Full Packaging Solution'] },
];
// Hanya yang teridentifikasi dari aset. Tanpa nomor/tanggal sertifikat.
export const CERTS = [
  { k: 'halal', n: ['Halal BPJPH', 'Halal BPJPH'], d: ['KSP menyatakan telah bersertifikat Halal BPJPH.', 'KSP states it holds Halal BPJPH certification.'] },
  { k: 'iso', n: ['ISO 9001', 'ISO 9001'], d: ['Tercatat sebagai perusahaan terdaftar ISO 9001 (sistem manajemen mutu).', 'Listed as an ISO 9001 registered company (quality management).'] },
  { k: 'oxium', n: ['OXIUM', 'OXIUM'], d: ['Menggunakan resin ramah lingkungan biodegradable dari OXIUM.', 'Uses OXIUM biodegradable, environmentally friendly resin.'] },
  { k: 'inswa', n: ['InSWA', 'InSWA'], d: ['Terdaftar di Asosiasi InSWA (Indonesia Solid Waste Association).', 'Registered with InSWA (Indonesia Solid Waste Association).'] },
  { k: 'dlh', n: ['Dinas Lingkungan Hidup Jatim', 'East Java Environmental Agency'], d: ['Terdaftar dalam daftar perusahaan terpantau DLH Jawa Timur.', 'Listed among companies monitored by DLH East Java.'] },
  { k: 'lab', n: ['Laboratorium Uji', 'Testing Laboratories'], d: ['Bermitra dengan laboratorium seperti Sucofindo, PT Angler BioChemLab, dan BBKKP.', 'Works with laboratories such as Sucofindo, PT Angler BioChemLab and BBKKP.'] },
  { k: 'tirta', n: ['Tirta Marta Lab', 'Tirta Marta Lab'], d: ['Bermitra dengan Laboratorium Tirta Marta untuk validasi bahan biodegradable.', 'Partners with Tirta Marta Laboratory to validate biodegradable materials.'] },
];
export const PARTNERS = ['garudafood', 'ubm', 'bernofarm', 'rosebrand', 'kokola', 'japfa', 'siantartop', 'pokphand', 'finna'];
export const FIVE_R = [
  ['Ringkas', 'Sort', 'Menyingkirkan barang yang tidak diperlukan di area kerja.', 'Removing items that are not needed in the work area.'],
  ['Rapi', 'Set in order', 'Menata barang sesuai fungsi dan posisinya agar mudah ditemukan.', 'Arranging items by function and position so they are easy to find.'],
  ['Resik', 'Shine', 'Menjaga kebersihan area kerja secara konsisten setiap hari.', 'Keeping the work area clean, consistently, every day.'],
  ['Rawat', 'Standardise', 'Mempertahankan standar 3R sebelumnya secara berkelanjutan.', 'Sustaining the first three standards over time.'],
  ['Rajin', 'Sustain', 'Membangun disiplin dan kebiasaan kerja yang baik setiap saat.', 'Building discipline and good working habits at all times.'],
];
