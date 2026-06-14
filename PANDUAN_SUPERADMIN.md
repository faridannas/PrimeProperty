# Panduan Superadmin Prime Property

Selamat datang di sistem manajemen internal Prime Property. Dokumen ini adalah panduan singkat bagi **Superadmin** untuk mengelola data properti, sesuai dengan panduan desain dan fungsionalitas (Standard Operating Procedure).

## 1. Konsep Peran (Role & Authorization)
Sistem memiliki 2 jenis pengguna:
- **Superadmin:** Memiliki akses penuh (CRUD) ke seluruh data properti, bisa membuat akun admin baru, reset password, dan melihat audit log.
- **Admin:** Hanya dapat melihat (*read-only*), memfilter, dan mencari properti. Tidak ada tombol Edit atau Hapus di akun Admin.

## 2. Cara Mengakses Dashboard
1. Buka halaman `http://[domain]/agent/login`
2. Masukkan Email dan Password Anda. *(Catatan: Jika lupa password, hanya Superadmin lain yang bisa me-reset password Anda. Sistem ini sengaja tidak memiliki fitur forgot password publik demi keamanan).*
3. Setelah login sukses, Anda akan dialihkan ke `/agent/dashboard`.

## 3. Mencari & Memfilter Properti (Listing)
Halaman utama dashboard menampilkan tabel kompak properti. Untuk mencari data spesifik:
- **Search Bar:** Ketik nama properti, group/cluster, atau kawasan di kotak pencarian. Data akan disaring secara *real-time*.
- **Filter Lanjutan:** Klik tombol **"Filters"**. Anda bisa menyaring berdasarkan Tipe (Ruko/Villa), Status (In Stock/Sold Out), Harga Maksimal, dan lainnya.
- **Share Link:** Setiap filter yang Anda terapkan akan disimpan otomatis di URL peramban Anda (contoh: `?tipe=Ruko`). Anda bisa langsung meng-copy *URL* tersebut dan membagikannya ke admin lain untuk menunjukkan hasil filter yang sama.

## 4. Cara Menambah Properti (Create)
1. Pada halaman Listing Properti, klik tombol **"+ Tambah Properti"** (hitam dengan teks emas) di ujung kanan atas.
2. Anda akan dibawa ke form input 2 kolom.
3. **Isi semua field yang bertanda bintang (*)**. Pastikan:
   - Nama properti tidak kurang dari 3 karakter.
   - Harga diisi dengan angka (sistem akan otomatis memformatnya menjadi Rupiah).
   - Lebar dan Panjang harus akurat (bisa menggunakan koma/titik untuk desimal).
   - Jika memasukkan link *Google Maps*, pastikan link tersebut valid.
4. Klik **"Simpan Properti"** (atau "Simpan & Tambah Lagi" jika ingin menginput banyak data berturut-turut). Data akan disimpan dan Anda akan dikembalikan ke halaman awal.

## 5. Cara Mengubah (Update) & Menghapus (Delete)
1. Di halaman Listing (tabel), **klik salah satu baris properti** yang ingin Anda kelola.
2. Panel detail (Drawer) akan meluncur dari sebelah kanan layar.
3. Di dalam panel tersebut, Anda akan melihat tombol **"Edit"** dan **"Hapus"**.
4. **Untuk Mengubah:** Klik "Edit". Anda akan diarahkan ke form yang mirip dengan form *Tambah Properti*, namun sudah terisi data lama. Silakan ubah data yang perlu diubah.
5. **Untuk Menghapus:** Klik "Hapus". Sistem akan meminta konfirmasi. 
   - *Penting:* Penghapusan di sistem Prime Property menggunakan metode **Soft Delete**. Artinya data tidak benar-benar dihapus dari *database*, namun disembunyikan dari semua tampilan.

---
*Dokumen ini dibuat otomatis sebagai kelengkapan Acceptance Criteria (AC-10.1).*
