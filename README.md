# Prime Property - Admin Dashboard 🏢

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white) ![Turso](https://img.shields.io/badge/Turso-Database-blue)

Sistem Informasi Manajemen Properti eksklusif yang dirancang untuk agen real estate. Dilengkapi dengan antarmuka yang elegan, mode gelap (Dark Mode), dan fitur animasi transisi yang mulus.

## ✨ Fitur Utama
- **Role-Based Access Control (RBAC):** Pemisahan hak akses antara Superadmin (Perusahaan) dan Admin (Agen Individu).
- **Manajemen Properti:** Tambah, Edit, dan Hapus (Soft Delete) properti dengan mudah.
- **Galeri Foto Dinamis:** Mengelola foto spesifik untuk setiap properti.
- **Dashboard Analitik:** Visualisasi pendapatan dan performa penjualan properti secara dinamis berdasarkan hak akses pengguna.
- **GSAP Animations:** Transisi antar halaman dan interaksi elemen yang sangat mulus (Smooth Scrolling).

## 🔑 Demo Credentials (Akun Uji Coba)

Bagi Anda yang ingin menguji coba aplikasi ini (misalnya *recruiter* atau dosen), Anda dapat masuk menggunakan akun demo berikut:

| Role | Email | Password | Hak Akses |
| :--- | :--- | :--- | :--- |
| **Superadmin** | `superadmin@primeproperty.com` | `PrimeAdmin123!` | Melihat statistik perusahaan & edit semua properti. |
| **Admin (Agen)** | `admin@primeproperty.com` | `AdminPrime123!` | Hanya melihat performa pribadi & edit properti miliknya. |

## 🚀 Cara Menjalankan di Komputer Lokal (Localhost)

Jika Anda men-*clone* repositori ini, ikuti langkah berikut untuk menjalankannya:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Pengaturan Database (Turso / SQLite)**
   Aplikasi ini menggunakan Turso (Cloud SQLite). Buat file `.env` di folder utama dan isi dengan:
   ```env
   TURSO_DATABASE_URL="libsql://url-database-anda.turso.io"
   TURSO_AUTH_TOKEN="token_rahasia_anda"
   ```

3. **Inisialisasi & Seeding Data**
   Jalankan perintah ini untuk otomatis membuat tabel dan mengisi akun demo beserta data dummy:
   ```bash
   node scripts/seed.mjs
   ```

4. **Jalankan Server**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser Anda!

---
*Dibuat untuk portofolio pengembangan web profesional.*
