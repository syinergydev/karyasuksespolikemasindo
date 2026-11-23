# Laporan — Website Demo PT Karya Sukses Polikemasindo (KSP)

## Cara menjalankan (Windows / PowerShell)
```powershell
cd ksp-website-demo
npm install          # sekali saja (hanya untuk build ulang)
npm run dev          # build + buka server lokal (npx serve dist)
```
Folder `dist/` sudah jadi: bisa langsung dibuka (`dist/index.html`) atau di-upload ke GitHub Pages/Vercel.
Edit konten di `src/data.mjs` (produk, kontak, sertifikasi, flag) dan `src/i18n.mjs` (teks ID/EN), lalu `npm run build`.

## 1. Halaman (x2 bahasa: ID di root, EN di /en/) — 22 file
Beranda · Tentang Kami · Produk (katalog + filter + pencarian + dialog detail) · PP · PE · HDPE · Flexible · Custom · Sertifikasi · Artikel · Kontak.

## 2. Gambar yang dipakai (sumber -> file hasil)
| Hasil | Sumber di ZIP | Dipakai di |
|---|---|---|
| hero-gedung | ChatGPT-Image-8-Sep-2026-11.42.52.png | Hero Beranda, hero Tentang/Kontak |
| gedung-lebar | ChatGPT-Image-19-Agu-2026-10.51.15.png | Profil, fasilitas, video, hero Sertifikasi |
| tim | ChatGPT-Image-19-Agu-2026-14.03.30.png | Tentang Kami, galeri, hero Artikel |
| produk-semua + prod-pp/pe/hdpe/flex/custom | ChatGPT-Image-19-Agu-2026-14.59.46.png (di-crop) | Katalog, kategori |
| mesin | KSP.png | CTA, galeri, produk PE |
| roll | Dummy-produk-KSP.jpeg | PP Roll, PE Roll Film |
| Logo | kak-bisa-bantu-buatkan-logo-kah-3.png (horizontal: navbar/footer) · Logo-KSP.png (globe: favicon, JSON-LD) | |
| Sertifikasi | ChatGPT-Image-29-Jun-2026-13.42.11 (Halal) · Screenshot-2024-09-23-* (ISO, OXIUM, InSWA, DLH, Sucofindo/Angler, Tirta Marta) | |
| Mitra (nonaktif) | 1-1.png … 9-1.png | flag `SHOW_PARTNERS` |

**Tidak dipakai:** `ChatGPT-Image-8-Sep-2026-13.25.57.png` (logo "Kantong Plastik Cap Tenis Meja" — merek milik KSP?), `Produk-KSP*.png` (ada teks tertanam di gambar), `Logo-15.png` (logo Truspax Insurance, bukan KSP), `Accent-BG-taxplan.png` (sisa template), 3 thumbnail 150px (resepsionis, gedung, tim AICA — resolusi asli tidak ada).
**Disebut di prompt tapi tidak ada di ZIP:** `KSP-Foto.webp`, dan seluruh `sgplast.zip` (tidak terunggah — struktur halaman mengikuti deskripsi di prompt).

## 3. Fitur berfungsi
Navbar sticky + dropdown produk + menu mobile fullscreen · switcher ID/EN (halaman statis terpisah + hreflang) · filter kategori & pencarian produk · dialog detail produk · tombol Request Quotation (WhatsApp terisi nama produk) · formulir konsultasi (membuka WhatsApp) · video profil (modal, youtube-nocookie) · peta embed · skip-link, label form, fokus keyboard, alt text · sitemap.xml, robots.txt, OG, JSON-LD Organization.

## 4. Animasi (GSAP + ScrollTrigger, hanya transform/opacity)
Hero: text mask reveal, image scale-in, CTA stagger, parallax · tirai reveal gambar · reveal konten saat scroll · stagger kartu produk + transisi filter · hover kartu (angkat + zoom) · galeri horizontal ter-pin (hanya Tentang Kami, desktop) · marquee sertifikasi (CSS, jeda saat hover) · reveal footer · `prefers-reduced-motion` mematikan semuanya.

## 5. Perlu dikonfirmasi owner
1. **Tahun berdiri**: sumber menyebut 2013, 1995, "lebih dari tiga dekade", dan "lebih dari satu dekade". Tidak ditampilkan (`SITE.founded`).
2. **ISO 9001 : 2000** di situs lama: versi itu sudah lama digantikan; tampil tanpa versi/tanggal. Halal BPJPH dan semua sertifikasi: nomor & masa berlaku belum ada.
3. **Telepon**: situs lama `(0343) 842570`, prompt `03438 42570` — dipakai versi situs lama.
4. **Dua nomor WhatsApp**: 0878-5151-6522 (dipakai) dan 6281336099486 (tombol order lama).
5. **Dua link YouTube** (zX1A9mJinP4 dipakai; sEhS83z3XRM juga ada) dan **dua link Maps**.
6. **Jam operasional**: kontradiktif ("24 Jam" vs Sen–Sab 08.00–17.00) — disembunyikan (`SHOW_HOURS`).
7. **Visi**: dua versi berbeda di situs lama; dipakai versi halaman Tentang Kami.
8. **Spesifikasi** (tahan 120°C, 20–200/30–500 mikron, 3-Ply/5-Ply, 8 warna) berasal dari katalog lama — bertanda `*`.
9. **Foto**: nama file `ChatGPT-Image…` mengindikasikan gambar buatan/olahan AI; foto mesin & roll kemungkinan stok. Ganti dengan foto asli sebelum live. Foto produk per item belum ada (20 produk memakai crop representatif).
10. **Logo mitra** (termasuk Bernofarm yang tidak disebut di prompt): perlu persetujuan sebelum `SHOW_PARTNERS=true`.
11. Logo Tirta Marta diidentifikasi dari urutan aset (logo "TM" ungu); "Angled BioChem Lab" di teks lama = **PT Angler BioChemLab** sesuai logo.
12. Klaim situs lama yang sengaja **tidak** dipakai: "tim R&D", "teknologi canggih", "stok terjamin", "24 jam", "tiga dekade".

## 6. Sosial media belum tersedia
Instagram, Facebook, TikTok, LinkedIn: isi URL di `SITE.socials` (`src/data.mjs`) — ikon muncul otomatis di footer & kontak.

## 7. Belum dibangun
Backend formulir (kirim email/simpan lead) · admin/CMS produk & artikel · halaman detail artikel (belum ada artikel asli — halaman menampilkan "segera hadir") · unduh company profile (file tidak ada) · halaman 404 · foto & dokumen sertifikat asli.

## 8. Sebelum go-live
`FLAGS.DEMO_NOTES=false` (hapus catatan kuning + `noindex` + `Disallow: /`), set `FLAGS.SITE_URL` ke domain final, `npm run build`.

## Revisi: Mitra & Relasi Bisnis KSP
- `SHOW_PARTNERS: true` (src/data.mjs); array `PARTNERS` tidak diubah.
- Section tampil di Beranda (setelah Sertifikasi, sebelum Video) dan Tentang Kami (setelah Sertifikasi, sebelum CTA) — 1 komponen `partners()` di build.mjs.
- Teks ID/EN di src/i18n.mjs (`partH`, `partP`, `partNote`). Catatan verifikasi mengikuti flag `DEMO_NOTES`: hilang otomatis saat flag dimatikan untuk live — pastikan konfirmasi owner sudah ada sebelum itu.
- Deploy GitHub Pages: push ke `main`, aktifkan Settings → Pages → Source: GitHub Actions (workflow ada di .github/workflows/pages.yml). `dist/` juga sudah siap dipublikasikan langsung.
