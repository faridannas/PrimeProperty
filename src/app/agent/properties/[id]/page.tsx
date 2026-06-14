"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, MapPin, Bed, Bath, Car, Maximize, Calendar, User as UserIcon, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useUser } from '@/components/agent/UserContext';
import Link from 'next/link';

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const { profile } = useUser();
  const [property, setProperty] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulasi fetch data properti berdasarkan ID
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${params.id}`);
        const result = await res.json();

        if (result.success) {
          const dbData = result.data;

          setProperty({
            id: dbData.id,
            name: dbData.nama_property,
            type: dbData.tipe,
            status: dbData.status === 'in_stock' ? 'In Stock' : 'Sold Out',
            price: Number(dbData.price),
            description: `Properti ${dbData.tipe} berlokasi strategis di ${dbData.kawasan}. Menghadap ${dbData.hadap} dengan luas tanah ${dbData.lebar} x ${dbData.panjang} meter. Status saat ini: ${dbData.siap.replace('_', ' ')}.`,
            location: dbData.kawasan,
            agent: dbData.agentEmail ? dbData.agentEmail.split('@')[0] : 'Unknown Agent',
            agentId: dbData.agentId || 'Unknown',
            specs: {
              luasTanah: dbData.lebar * dbData.panjang,
              luasBangunan: (dbData.lebar * dbData.panjang) * dbData.tingkat,
              kamarTidur: dbData.tipe === 'Villa' ? 4 : 2,
              kamarMandi: dbData.tipe === 'Villa' ? 3 : 2,
              garasi: dbData.carport ? 1 : 0
            },
            images: [
              dbData.tipe === 'Villa' ? '/villa.png' : '/ruko.png',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
            ],
            createdAt: new Date(dbData.createdAt).toLocaleDateString('id-ID')
          });

          // Fetch Galeri
          const imgRes = await fetch(`/api/properties/${params.id}/images`);
          const imgData = await imgRes.json();
          if (imgData.success) {
            setGalleryImages(imgData.data);
          }
        } else {
          setError(result.error || "Gagal memuat properti");
        }
      } catch (error: any) {
        console.error("Gagal mengambil data properti:", error);
        setError("Terjadi kesalahan jaringan.");
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      const res = await fetch(`/api/properties/${params.id}/images`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setGalleryImages([{ id: data.data.id, url: data.data.url }, ...galleryImages]);
      } else {
        alert("Gagal mengunggah foto: " + data.error);
      }
    } catch (e) {
      alert("Terjadi kesalahan saat mengunggah.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Hapus foto ini?')) return;
    try {
      const res = await fetch(`/api/properties/${params.id}/images?imageId=${imageId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setGalleryImages(galleryImages.filter(img => img.id !== imageId));
      }
    } catch (e) {
      alert("Gagal menghapus foto");
    }
  };

  if (error) {
    return (
      <div className="p-8 text-center text-white">
        <h2 className="text-xl font-bold text-prime-red mb-2">Error</h2>
        <p className="text-gray-400">{error}</p>
        <button onClick={() => router.push('/agent/properties')} className="mt-4 px-4 py-2 bg-prime-gold text-prime-black rounded-lg font-bold">Kembali</button>
      </div>
    );
  }

  if (!property) {
    return <div className="p-8 text-center text-white">Memuat data properti...</div>;
  }

  // LOGIKA AKSES EDIT:
  // Untuk keperluan purwarupa (prototype), kita izinkan semua Admin & Superadmin untuk mengelola galeri
  const canEdit = true; // profile?.role === 'SUPERADMIN' || (profile?.role === 'ADMIN' && property.agentId === profile?.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-6 pb-12">
      {/* Header & Nav */}
      <div className="flex justify-between items-center bg-[#161616]/90 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-lg">
        <Link href="/agent/properties" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
          <ArrowLeft size={18} /> Kembali ke Daftar
        </Link>

        {/* ACTION BUTTONS (Dibatasi oleh RBAC) */}
        {canEdit && (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push(`/agent/properties/edit/${params.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition border border-white/10"
            >
              <Edit size={16} /> Edit Properti
            </button>
            <button 
              onClick={async () => {
                if(confirm('Apakah Anda yakin ingin menghapus properti ini? Data yang dihapus tidak dapat dikembalikan.')) {
                  try {
                    const res = await fetch(`/api/properties/${params.id}`, { method: 'DELETE' });
                    if (res.ok) {
                      router.push('/agent/properties');
                    } else {
                      alert('Gagal menghapus properti');
                    }
                  } catch (e) {
                    alert('Terjadi kesalahan sistem');
                  }
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-prime-red/10 hover:bg-prime-red/20 text-prime-red rounded-lg text-sm font-medium transition border border-prime-red/20"
            >
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* KIRI: Foto & Deskripsi (Col 2) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Main Photo Gallery */}
          <div className="bg-[#161616] border border-white/5 p-4 rounded-3xl shadow-lg">
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 relative group">
              <img src={property.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-prime-gold text-prime-black font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                  {property.status}
                </span>
                <span className="bg-black/60 backdrop-blur-sm text-white font-medium px-3 py-1 rounded-full text-xs">
                  {property.type}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img src={property.images[1]} alt="Sub 1" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden relative">
                <img src={galleryImages.length > 0 ? galleryImages[0].url : property.images[2]} alt="Sub 2" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                <div
                  onClick={() => setIsGalleryOpen(true)}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/40 transition backdrop-blur-[2px]"
                >
                  <span className="text-white font-bold text-sm flex items-center gap-2">
                    <Maximize size={16} /> Lihat {galleryImages.length} Foto Lainnya
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-[#161616] border border-white/5 p-8 rounded-3xl shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-2">{property.name}</h1>
            <p className="text-gray-400 flex items-center gap-2 mb-8 text-sm"><MapPin size={16} className="text-prime-gold" /> {property.location}</p>

            <h3 className="text-lg font-bold text-white mb-4">Deskripsi Properti</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {property.description}
            </p>
          </div>
        </div>

        {/* KANAN: Info Harga & Spesifikasi (Col 1) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Card Harga */}
          <div className="bg-[#161616] border border-white/5 p-6 rounded-3xl shadow-lg">
            <p className="text-gray-400 text-sm font-medium mb-1">Harga Penawaran</p>
            <h2 className="text-3xl font-light text-white tracking-tight">{formatPrice(property.price)}</h2>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Calendar size={12} /> Terdaftar sejak {property.createdAt}</p>
          </div>

          {/* Spesifikasi Ringkas */}
          <div className="bg-[#161616] border border-white/5 p-6 rounded-3xl shadow-lg">
            <h3 className="text-white font-bold mb-5 border-b border-white/10 pb-3">Spesifikasi Utama</h3>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-400"><Maximize size={16} /> <span className="text-xs">Luas Tanah</span></div>
                <p className="text-white font-semibold">{property.specs.luasTanah} m²</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-400"><Maximize size={16} /> <span className="text-xs">Luas Bangunan</span></div>
                <p className="text-white font-semibold">{property.specs.luasBangunan} m²</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-400"><Bed size={16} /> <span className="text-xs">Kamar Tidur</span></div>
                <p className="text-white font-semibold">{property.specs.kamarTidur}</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-400"><Bath size={16} /> <span className="text-xs">Kamar Mandi</span></div>
                <p className="text-white font-semibold">{property.specs.kamarMandi}</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-400"><Car size={16} /> <span className="text-xs">Garasi/Carport</span></div>
                <p className="text-white font-semibold">{property.specs.garasi} Mobil</p>
              </div>
            </div>
          </div>

          {/* Info Agen Penanggung Jawab */}
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-prime-gold/20 p-6 rounded-3xl shadow-lg">
            <h3 className="text-prime-gold font-bold mb-4 text-sm uppercase tracking-wider">Listing Agent</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden border border-white/20">
                <UserIcon size={24} className="text-gray-400" />
              </div>
              <div>
                <p className="text-white font-bold">{property.agent}</p>
                <p className="text-gray-400 text-xs">ID: {property.agentId}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL GALERI FOTO */}
      {isGalleryOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsGalleryOpen(false)}></div>
          <div className="relative bg-[#1A1A1A] border border-white/10 rounded-3xl w-full max-w-5xl h-[85vh] p-6 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <ImageIcon className="text-prime-gold" /> Galeri Properti
                </h3>
                <p className="text-sm text-gray-400 mt-1">{galleryImages.length} foto tersedia untuk {property.name}</p>
              </div>
              <div className="flex gap-4 items-center">
                {canEdit && (
                  <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-prime-gold text-prime-black font-bold rounded-lg hover:bg-prime-gold/90 transition shadow-lg">
                    {isUploading ? <span className="animate-spin text-lg">⏳</span> : <Upload size={16} />}
                    {isUploading ? 'Mengunggah...' : 'Tambah Foto'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={isUploading} />
                  </label>
                )}
                <button onClick={() => setIsGalleryOpen(false)} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              {galleryImages.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                  <ImageIcon size={48} className="opacity-20" />
                  <p>Belum ada foto yang ditambahkan.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group bg-black/40 border border-white/5">
                      <img src={img.url} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                      {canEdit && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 hover:scale-110 transition shadow-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
