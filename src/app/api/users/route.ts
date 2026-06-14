import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const db = getDb();
    // Ambil data user, jangan bawa passwordnya
    const result = await db.execute('SELECT id, email, role, isActive, createdAt FROM User ORDER BY createdAt DESC');
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();
    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const db = getDb();

    // Cek email ganda
    const existing = await db.execute({
      sql: 'SELECT id FROM User WHERE email = ?',
      args: [email]
    });

    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = randomUUID();
    const now = new Date().toISOString();

    await db.execute({
      sql: `INSERT INTO User (id, email, password, role, isActive, failedLoginAttempts, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, email, hashedPassword, role, 1, 0, now, now]
    });

    return NextResponse.json({ success: true, message: 'Akun berhasil ditambahkan' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
