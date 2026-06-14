// Seed script menggunakan libsql langsung (bypass Prisma Client untuk menghindari bug Prisma v7)
import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import path from 'path';

import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbConfig;
if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
  console.log('☁️ Menggunakan Database Cloud (Turso)...');
  dbConfig = {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
  };
} else {
  const dbPath = path.resolve(__dirname, '../dev.db');
  const dbUrl = `file:///${dbPath.replace(/\\/g, '/')}`;
  console.log('📦 Menggunakan Database Lokal:', dbUrl);
  dbConfig = { url: dbUrl };
}

const db = createClient(dbConfig);

async function main() {
  console.log('🌱 Memulai proses inisialisasi & seeding database...');

  // 1. BUAT TABEL OTOMATIS (Bypass Prisma Push)
  console.log('🛠️ Menciptakan struktur tabel (jika belum ada)...');
  await db.execute(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "email" TEXT NOT NULL,
      "password" TEXT NOT NULL,
      "role" TEXT NOT NULL DEFAULT 'ADMIN',
      "isActive" BOOLEAN NOT NULL DEFAULT 1,
      "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
      "lockedUntil" DATETIME,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    );
  `);
  
  await db.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "Property" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "nama_property" TEXT NOT NULL,
      "group" TEXT,
      "lebar" REAL NOT NULL,
      "panjang" REAL NOT NULL,
      "hadap" TEXT NOT NULL,
      "tipe" TEXT NOT NULL,
      "tingkat" REAL NOT NULL,
      "price" INTEGER NOT NULL,
      "carport" BOOLEAN NOT NULL,
      "status" TEXT NOT NULL,
      "siap" TEXT NOT NULL,
      "maps_link" TEXT,
      "kawasan" TEXT NOT NULL,
      "unit" TEXT,
      "created_by" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL,
      "deletedAt" DATETIME,
      CONSTRAINT "Property_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "PropertyImage" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "url" TEXT NOT NULL,
      "propertyId" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "PropertyImage_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  console.log('✅ Struktur tabel berhasil disiapkan!');

  // Cek apakah superadmin sudah ada
  const existingSuperAdmin = await db.execute({
    sql: 'SELECT id FROM User WHERE email = ?',
    args: ['superadmin@primeproperty.com']
  });

  const now = new Date().toISOString();
  let superadminCreated = false;
  const hashedSuperadmin = await bcrypt.hash('PrimeAdmin123!', 10);

  if (existingSuperAdmin.rows.length === 0) {
    const id = crypto.randomUUID();
    await db.execute({
      sql: `INSERT INTO User 
            (id, email, password, role, isActive, failedLoginAttempts, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, 'superadmin@primeproperty.com', hashedSuperadmin, 'SUPERADMIN', 1, 0, now, now]
    });
    superadminCreated = true;
  } else {
    // Reset password jika sudah ada
    await db.execute({
      sql: 'UPDATE User SET password = ? WHERE email = ?',
      args: [hashedSuperadmin, 'superadmin@primeproperty.com']
    });
  }

  // Cek apakah admin biasa sudah ada
  const existingAdmin = await db.execute({
    sql: 'SELECT id FROM User WHERE email = ?',
    args: ['admin@primeproperty.com']
  });

  let adminCreated = false;
  const hashedAdmin = await bcrypt.hash('AdminPrime123!', 10);

  if (existingAdmin.rows.length === 0) {
    const id = crypto.randomUUID();
    await db.execute({
      sql: `INSERT INTO User 
            (id, email, password, role, isActive, failedLoginAttempts, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, 'admin@primeproperty.com', hashedAdmin, 'ADMIN', 1, 0, now, now]
    });
    adminCreated = true;
  } else {
    // Reset password jika sudah ada
    await db.execute({
      sql: 'UPDATE User SET password = ? WHERE email = ?',
      args: [hashedAdmin, 'admin@primeproperty.com']
    });
  }

  console.log('');
  console.log('✅ Akun berhasil dicek dan password telah di-reset ke pengaturan pabrik!');
  console.log('-----------------------------------');
  console.log('[SUPERADMIN]');
  console.log('Email    : superadmin@primeproperty.com');
  console.log('Password : PrimeAdmin123!');
  console.log('-----------------------------------');
  console.log('[ADMIN]');
  console.log('Email    : admin@primeproperty.com');
  console.log('Password : AdminPrime123!');
  console.log('-----------------------------------');
  console.log('⚠️  Silakan gunakan password di atas untuk login.');

  // Ambil ID admin untuk dijadikan pembuat properti
  let adminId;
  const adminQuery = await db.execute({
    sql: 'SELECT id FROM User WHERE email = ?',
    args: ['admin@primeproperty.com']
  });
  if (adminQuery.rows.length > 0) {
    adminId = adminQuery.rows[0].id;
  }

  // Seed Properties jika belum ada
  const existingProperties = await db.execute({ sql: 'SELECT id FROM Property WHERE deletedAt IS NULL LIMIT 1' });
  if (existingProperties.rows.length === 0 && adminId) {
    console.log('🏗️  Menyiapkan 5 data properti contoh ke dalam database...');
    const properties = [
      { id: crypto.randomUUID(), nama: 'Villa Mewah Pantai', group: 'Premium', lebar: 15.0, panjang: 20.0, hadap: 'Selatan', tipe: 'Villa', tingkat: 2.0, price: 3500000000, carport: 1, status: 'in_stock', siap: 'siap_huni', kawasan: 'Seminyak' },
      { id: crypto.randomUUID(), nama: 'Ruko Sudirman Permai', group: 'Komersial', lebar: 5.0, panjang: 15.0, hadap: 'Timur', tipe: 'Ruko', tingkat: 3.0, price: 2100000000, carport: 1, status: 'in_stock', siap: 'siap_kosong', kawasan: 'Sudirman' },
      { id: crypto.randomUUID(), nama: 'Krakatau Residence', group: 'Residensial', lebar: 8.0, panjang: 18.0, hadap: 'Utara', tipe: 'Villa', tingkat: 1.5, price: 1850000000, carport: 1, status: 'sold_out', siap: 'siap_huni', kawasan: 'Krakatau' },
      { id: crypto.randomUUID(), nama: 'Cemara Asri Townhouse', group: 'Townhouse', lebar: 6.0, panjang: 14.0, hadap: 'Barat', tipe: 'Villa', tingkat: 2.0, price: 1250000000, carport: 0, status: 'in_stock', siap: 'siap_huni_renovasi', kawasan: 'Cemara Asri' },
      { id: crypto.randomUUID(), nama: 'Pancing Business Center', group: 'Komersial', lebar: 4.5, panjang: 16.0, hadap: 'Timur', tipe: 'Ruko', tingkat: 3.5, price: 4500000000, carport: 1, status: 'in_stock', siap: 'siap_huni', kawasan: 'Pancing' }
    ];

    for (const p of properties) {
      await db.execute({
        sql: `INSERT INTO Property (id, nama_property, "group", lebar, panjang, hadap, tipe, tingkat, price, carport, status, siap, kawasan, created_by, createdAt, updatedAt) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [p.id, p.nama, p.group, p.lebar, p.panjang, p.hadap, p.tipe, p.tingkat, p.price, p.carport, p.status, p.siap, p.kawasan, adminId, now, now]
      });
    }
    console.log('✅ Berhasil menyuntikkan 5 properti ke dalam database!');
  } else if (existingProperties.rows.length > 0) {
    console.log('✅ Data properti sudah ada di database. Melewati proses seeding properti.');
  }

}

main()
  .catch((e) => {
    console.error('❌ Gagal melakukan seeding:', e.message);
    process.exit(1);
  })
  .finally(() => {
    db.close();
  });
