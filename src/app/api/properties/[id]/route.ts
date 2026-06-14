import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const db = getDb();
    
    const result = await db.execute({
      sql: `SELECT Property.*, User.email as agentEmail, User.id as agentId 
            FROM Property 
            LEFT JOIN User ON Property.created_by = User.id
            WHERE Property.id = ? AND Property.deletedAt IS NULL`,
      args: [id]
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'Properti tidak ditemukan' }, { status: 404 });
    }

    const row = result.rows[0];
    const obj: any = {};
    for (const [key, value] of Object.entries(row)) {
      obj[key] = typeof value === 'bigint' ? value.toString() : value;
    }

    return NextResponse.json({ success: true, data: obj });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    const db = getDb();
    const now = new Date().toISOString();
    
    const {
      nama, group, kawasan, l, p, hadap, tipe, tkt, carport, harga, status, siap
    } = body;

    const priceInt = Number(harga);

    await db.execute({
      sql: `
        UPDATE Property SET 
          nama_property = ?, "group" = ?, lebar = ?, panjang = ?, hadap = ?, tipe = ?, 
          tingkat = ?, price = ?, carport = ?, status = ?, siap = ?, kawasan = ?, updatedAt = ?
        WHERE id = ?
      `,
      args: [
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
        now, 
        id
      ]
    });

    return NextResponse.json({ success: true, message: 'Properti diupdate' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const db = getDb();
    const now = new Date().toISOString();

    await db.execute({
      sql: `UPDATE Property SET deletedAt = ? WHERE id = ?`,
      args: [now, id]
    });

    return NextResponse.json({ success: true, message: 'Properti dihapus' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
