# Scanner Absensi QR

Halaman scanner khusus untuk **Absensi QR – SMK Muhammadiyah 1 Kota Sukabumi**.
Dipisah dari Google Apps Script supaya **kamera bisa aktif** dan pembacaan QR secepat mungkin.

© 2026 Muhammad Azis Effendy

## Cara pasang di GitHub Pages
1. Buat repository baru di GitHub, mis. `absensi-scanner` (Public).
2. Upload semua file di folder ini (`index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`).
3. Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / folder `/ (root)` → Save.
4. Tunggu ±1 menit. Alamatnya: `https://USERNAME.github.io/absensi-scanner/`
5. Di dashboard Admin (Apps Script) buka **Pengaturan → URL halaman scanner**, tempel alamat tadi, simpan.
6. Di kartu **Scanner Kamera** salin **tautan siap pakai** (atau scan QR-nya dengan HP scanner).
   Kunci scanner tersimpan di perangkat dan dihapus dari bilah alamat.
7. (HP) menu browser → **Tambah ke layar utama** agar terbuka layaknya aplikasi.

Syarat: Web App Apps Script di-deploy dengan **Execute as: Me** dan **Who has access: Anyone**.

## Alur kerja scanner (kenapa cepat)
1. Kamera menyala bersamaan dengan pengambilan data siswa (tidak saling menunggu).
2. QR dibaca **di perangkat** (BarcodeDetector bawaan Chrome/Android; jsQR untuk iPhone/Safari).
3. Tiap siswa punya token QR di daftar lokal, jadi **kartu palsu ditolak seketika tanpa internet**.
4. Nama siswa + status tampil dalam hitungan milidetik. Penyimpanan ke Google Sheet berjalan di latar belakang.
5. Jika internet putus, scan masuk antrean (tersimpan di perangkat) dan dikirim otomatis saat tersambung.

## Tips agar pembacaan cepat
- Cahaya cukup, hindari silau pada kartu laminasi (miringkan sedikit).
- Cetak QR minimal 2,5 cm; jarak kartu 10–25 cm dari kamera.
- Chrome Android / Edge / Chrome desktop memakai BarcodeDetector (tercepat). Safari iPhone memakai jsQR.
- Opsional offline untuk iPhone: unduh `https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js`, simpan sebagai `jsQR.js` di repo yang sama.
