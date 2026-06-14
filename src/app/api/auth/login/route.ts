import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password harus diisi' }, { status: 400 });
    }

    const db = getDb();
    
    // Cari user berdasarkan email
    const result = await db.execute({
      sql: 'SELECT * FROM User WHERE email = ?',
      args: [email]
    });

    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ error: 'Email tidak terdaftar di sistem' }, { status: 401 });
    }

    // Bandingkan password yang di-hash dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Password yang Anda masukkan salah' }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: 'Login berhasil', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
