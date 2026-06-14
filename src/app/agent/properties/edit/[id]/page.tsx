"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Building, MapPin, DollarSign, Layout, Key, Box } from 'lucide-react';
import Link from 'next/link';

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nama: '',
    group: '',
    kawasan: '',
    l: 0,
    p: 0,
    hadap: '',
    tipe: 'Ruko',
    tkt: 1,
    carport: false,
    harga: 0,
    status: 'In Stock',
    siap: 'Siap Kosong'
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${params.id}`);
        const result = await res.json();
        if (result.success) {
          const dbData = result.data;
          setFormData({
            nama: dbData.nama_property,
            group: dbData.group === '-' ? '' : dbData.group,
            kawasan: dbData.kawasan,
            l: dbData.lebar,
            p: dbData.panjang,
            hadap: dbData.hadap,
            tipe: dbData.tipe,
            tkt: dbData.tingkat,
            carport: dbData.carport === 1,
            harga: Number(dbData.price),
            status: dbData.status === 'in_stock' ? 'In Stock' : 'Sold Out',
            siap: dbData.siap === 'siap_huni' ? 'Siap Huni' : 'Siap Kosong'
          });
        } else {
          setError(result.error || "Gagal memuat properti");
        }
      } catch (e) {
        setError("Kesalahan jaringan saat memuat data.");
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) fetchProperty();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        l: Number(formData.l),
        p: Number(formData.p),
        tkt: Number(formData.tkt),
        harga: Number(formData.harga)
      };

      const res = await fetch(`/api/properties/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        alert("Properti berhasil diperbarui!");
        router.push(`/agent/properties/${params.id}`);
      } else {
        alert("Gagal memperbarui: " + data.error);
      }
    } catch (e) {
      alert("Kesalahan sistem saat menyimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-white">Memuat formulir edit...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-white">
        <h2 className="text-xl font-bold text-prime-red mb-2">Error</h2>
        <p className="text-gray-400">{error}</p>
        <button onClick={() => router.push('/agent/properties')} className="mt-4 px-4 py-2 bg-prime-gold text-prime-black rounded-lg font-bold">Kembali</button>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/agent/properties/${params.id}`} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Properti</h1>
          <p className="text-gray-400 text-sm mt-1">Perbarui informasi detail untuk {formData.nama}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#161616] border border-white/5 p-8 rounded-3xl shadow-xl flex flex-col gap-6">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Building size={16}/> Nama Properti</label>
            <input required type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition" placeholder="Contoh: Ruko Sudirman Permai" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><MapPin size={16}/> Kawasan / Lokasi</label>
            <input required type="text" name="kawasan" value={formData.kawasan} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition" placeholder="Contoh: Krakatau, Medan" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Box size={16}/> Grup Properti (Opsional)</label>
            <input type="text" name="group" value={formData.group} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition" placeholder="Contoh: Premium" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><DollarSign size={16}/> Harga (Rupiah)</label>
            <input required type="number" name="harga" value={formData.harga} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition" placeholder="Contoh: 1500000000" />
          </div>
        </div>

        <hr className="border-white/10 my-2" />

        {/* Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Layout size={16}/> Tipe</label>
            <select name="tipe" value={formData.tipe} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition">
              <option value="Ruko">Ruko</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Tingkat</label>
            <input required type="number" step="0.5" name="tkt" value={formData.tkt} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Lebar (m)</label>
            <input required type="number" step="0.1" name="l" value={formData.l} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Panjang (m)</label>
            <input required type="number" step="0.1" name="p" value={formData.p} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Arah Hadap</label>
            <input required type="text" name="hadap" value={formData.hadap} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition" placeholder="Contoh: Utara" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Key size={16}/> Kondisi Siap</label>
            <select name="siap" value={formData.siap} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition">
              <option value="Siap Huni">Siap Huni</option>
              <option value="Siap Kosong">Siap Kosong</option>
              <option value="Siap Huni Renovasi">Siap Huni Renovasi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Status Penjualan</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-prime-gold transition">
              <option value="In Stock">Tersedia (In Stock)</option>
              <option value="Sold Out">Terjual (Sold Out)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#1A1A1A] p-4 rounded-xl border border-white/10 mt-2">
          <input type="checkbox" name="carport" id="carport" checked={formData.carport} onChange={handleChange} className="w-5 h-5 accent-prime-gold" />
          <label htmlFor="carport" className="text-white font-medium cursor-pointer">Properti ini memiliki Garasi / Carport</label>
        </div>

        <button 
          type="submit" 
          disabled={isSaving}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-prime-gold hover:bg-prime-gold/90 text-prime-black font-bold py-4 rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? <span className="animate-spin text-xl">⏳</span> : <Save size={20} />}
          {isSaving ? 'Menyimpan Perubahan...' : 'Simpan Perubahan'}
        </button>

      </form>
    </div>
  );
}
