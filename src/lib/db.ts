// Helper: koneksi langsung ke SQLite via libsql (bypass Prisma v7 adapter issues)
import { createClient, type Client } from '@libsql/client';
import path from 'path';

let _db: Client | null = null;

export function getDb(): Client {
  if (!_db) {
    const isProduction = process.env.NODE_ENV === 'production' && process.env.TURSO_DATABASE_URL;
    
    if (isProduction) {
      // Koneksi ke Database Cloud (Turso) untuk Vercel
      _db = createClient({ 
        url: process.env.TURSO_DATABASE_URL as string,
        authToken: process.env.TURSO_AUTH_TOKEN as string
      });
    } else {
      // Koneksi ke Database Lokal untuk mode Pengembangan
      const dbPath = path.resolve(process.cwd(), 'dev.db');
      const dbUrl = `file:///${dbPath.replace(/\\/g, '/')}`;
      _db = createClient({ url: dbUrl });
    }
  }
  return _db;
}
