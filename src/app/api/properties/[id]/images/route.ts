import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: 'SELECT * FROM PropertyImage WHERE propertyId = ? ORDER BY createdAt DESC',
      args: [params.id]
    });
    
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah' }, { status: 400 });
    }

    // Siapkan folder /public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Format nama file agar unik
    const fileExt = path.extname(file.name);
    const fileName = `${randomUUID()}${fileExt}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Konversi file ke buffer dan simpan ke disk lokal
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
    
    // Simpan ke database
    const db = getDb();
    const imageId = randomUUID();
    const now = new Date().toISOString();
    const fileUrl = `/uploads/${fileName}`;

    await db.execute({
      sql: `INSERT INTO PropertyImage (id, url, propertyId, createdAt) VALUES (?, ?, ?, ?)`,
      args: [imageId, fileUrl, params.id, now]
    });

    return NextResponse.json({ success: true, data: { id: imageId, url: fileUrl } });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const imageId = searchParams.get('imageId');
    
    if (!imageId) {
      return NextResponse.json({ error: 'ID Gambar tidak ditemukan' }, { status: 400 });
    }

    const db = getDb();
    
    // Cari URL gambar untuk dihapus dari disk
    const result = await db.execute({
      sql: 'SELECT url FROM PropertyImage WHERE id = ?',
      args: [imageId]
    });
    
    if (result.rows.length > 0) {
      const fileUrl = result.rows[0].url as string;
      const fileName = fileUrl.replace('/uploads/', '');
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
      
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.warn("File fisik tidak ditemukan, mengabaikan...");
      }
    }

    // Hapus dari database
    await db.execute({
      sql: 'DELETE FROM PropertyImage WHERE id = ?',
      args: [imageId]
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
