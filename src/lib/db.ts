// Helper: koneksi langsung ke SQLite via libsql (bypass Prisma v7 adapter issues)
import { createClient, type Client } from '@libsql/client';
import path from 'path';

let _db: Client | null = null;

export function getDb(): Client {
  if (!_db) {
    const dbPath = path.resolve(process.cwd(), 'dev.db');
    const dbUrl = `file:///${dbPath.replace(/\\/g, '/')}`;
    _db = createClient({ url: dbUrl });
  }
  return _db;
}
