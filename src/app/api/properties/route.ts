import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const db = getDb();
    const result = await db.execute(`
      SELECT * FROM Property WHERE deletedAt IS NULL ORDER BY createdAt DESC
    `);
    
    const rows = result.rows.map(row => {
      const obj: any = {};
      for (const [key, value] of Object.entries(row)) {
        obj[key] = typeof value === 'bigint' ? value.toString() : value;
      }
      return obj;
    });

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDb();
    
    const id = randomUUID();
    const now = new Date().toISOString();
    
    const {
      nama, group, kawasan, l, p, hadap, tipe, tkt, carport, harga, status, siap
    } = body;
    
    const userResult = await db.execute("SELECT id FROM User LIMIT 1");
    const created_by = userResult.rows[0]?.id || "dummy-user-id";

    const priceInt = Number(harga);

    await db.execute({
      sql: `
        INSERT INTO Property (
          id, nama_property, "group", lebar, panjang, hadap, tipe, tingkat, price, carport, status, siap, kawasan, created_by, createdAt, updatedAt
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `,
      args: [
        id, 
        nama, 
        group || '-', 
        Number(l), 
        Number(p), 
        hadap, 
        tipe, 
        Number(tkt), 
        priceInt, 
        carport ? 1 : 0, 
        status === 'In Stock' ? 'in_stock' : 'sold_out', 
        siap === 'Siap Huni' ? 'siap_huni' : 'siap_kosong', 
        kawasan, 
        created_by, 
        now, 
        now
      ]
    });

    return NextResponse.json({ success: true, message: 'Properti berhasil ditambahkan', id });
  } catch (error: any) {
    console.error('Error adding property:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
