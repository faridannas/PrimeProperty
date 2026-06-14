"use client";

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpRight, Heart, ChevronLeft, ChevronRight, Edit2, Trash2, X, Plus, Eye, MapPin, Link as LinkIcon, Check } from 'lucide-react';
import Link from 'next/link';

export default function PropertiesPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // STATE MANGEMENT
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    nama: '', group: '', kawasan: '', l: 0, p: 0, hadap: 'Utara', tipe: 'Villa', tkt: 1, carport: true, harga: 0, status: 'In Stock', siap: 'Siap Huni'
  });

  // SCROLL FUNCTION
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // FILTER LOGIC
  const filteredProperties = useMemo(() => {
    return properties.filter(p => 
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.kawasan.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [properties, searchQuery]);

  // FETCH DATA FROM BACKEND
  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      if (data.success) {
        // Mapping schema db ke state ui
        const mapped = data.data.map((p: any) => ({
          id: p.id,
          nama: p.nama_property,
          group: p.group === '-' ? '' : p.group,
          kawasan: p.kawasan,
          l: p.lebar,
          p: p.panjang,
          hadap: p.hadap,
          tipe: p.tipe,
          tkt: p.tingkat,
          carport: p.carport === 1,
          harga: Number(p.price),
          status: p.status === 'in_stock' ? 'In Stock' : 'Sold Out',
          siap: p.siap === 'siap_huni' ? 'Siap Huni' : 'Siap Kosong'
        }));
        setProperties(mapped);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // CRUD ACTIONS
  const handleDelete = async (id: string | number) => {
    if(confirm('Yakin ingin menghapus properti ini?')) {
      await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      fetchProperties();
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ nama: '', group: '', kawasan: '', l: 0, p: 0, hadap: 'Utara', tipe: 'Villa', tkt: 1, carport: true, harga: 0, status: 'In Stock', siap: 'Siap Huni' });
    setIsModalOpen(true);
  };

  const openEditModal = (prop: any) => {
    setEditingId(prop.id);
    setFormData(prop);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/properties/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } else {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    }
    setIsModalOpen(false);
    fetchProperties();
  };

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-8 relative">
      
      {/* Property Object Carousel */}
      <div className="bg-[#111111]/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/5 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-semibold text-gray-300">Highlight Properti</h4>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-prime-gold hover:text-prime-black transition shadow-sm group">
              <ChevronLeft size={16} className="text-white group-hover:text-prime-black transition"/>
            </button>
            <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-prime-gold hover:text-prime-black transition shadow-sm group">
              <ChevronRight size={16} className="text-white group-hover:text-prime-black transition"/>
            </button>
          </div>
        </div>
        
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 items-stretch scroll-smooth">
          {filteredProperties.slice(0, 5).map((item: any) => (
             <div key={item.id} className="min-w-[240px] rounded-[1.25rem] border border-white/10 bg-[#1A1A1A] p-2 flex flex-col relative group cursor-pointer hover:border-prime-gold/30 hover:shadow-[0_0_20px_rgba(201,169,97,0.1)] transition-all duration-300">
             <div className="absolute top-4 right-4 z-10 flex gap-1.5">
               <button 
                 onClick={(e) => {
                   e.preventDefault(); // Prevent navigating if this was inside a link
                   e.stopPropagation();
                   const url = `${window.location.origin}/agent/properties/${item.id}`;
                   navigator.clipboard.writeText(url);
                   
                   // Buat efek visual sementara untuk memberitahu link dicopy
                   const btn = e.currentTarget;
                   const originalHTML = btn.innerHTML;
                   btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                   setTimeout(() => { btn.innerHTML = originalHTML; }, 1500);
                 }}
                 title="Salin Tautan Properti"
                 className="w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center shadow-sm text-white hover:text-prime-gold hover:border-prime-gold/50 transition"
               >
                 <LinkIcon size={14}/>
               </button>
               <Link href={`/agent/properties/${item.id}`} className="w-8 h-8 rounded-full bg-prime-gold text-prime-black flex items-center justify-center shadow-sm hover:scale-110 transition"><ArrowUpRight size={14}/></Link>
             </div>
             <div className="h-36 rounded-2xl overflow-hidden mb-3 border border-white/5 bg-gray-800">
               <img src={item.tipe === "Villa" ? "/villa.png" : "/ruko.png"} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
             </div>
             
             <div className="px-2 flex flex-col gap-1">
               <span className="text-prime-gold text-[10px] uppercase tracking-wider font-bold">{item.tipe}</span>
               <h5 className="font-bold text-sm text-white line-clamp-1">{item.nama}</h5>
               <p className="text-gray-400 text-xs flex items-center gap-1 mb-2"><MapPin size={10}/> {item.kawasan}</p>
               <div className="mt-auto border-t border-white/10 pt-2 flex items-center justify-between">
                 <span className="font-bold text-sm text-white">Rp {(item.harga / 1000000000).toFixed(1)} M</span>
                 <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">{item.l}x{item.p}m</span>
               </div>
             </div>
           </div>
          ))}
        </div>
      </div>

      {/* ROW 3: Table List (Full Width for Spec 7) */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[#111111]/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/5 flex flex-col">
          
          {/* Header Tabel & Pencarian */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-bold text-white text-xl">Daftar Listing Properti</h4>
              <p className="text-sm text-gray-500 mt-1">Total: {filteredProperties.length} Properti ditemukan</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Cari nama, group, kawasan..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-sm text-white focus:border-prime-gold/50 outline-none w-64" 
                />
              </div>
              <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 text-sm text-white bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition">
                <SlidersHorizontal size={16} className="text-gray-400"/> Filter Lengkap
              </button>
              <button onClick={openAddModal} className="flex items-center gap-2 text-sm text-prime-black font-bold bg-prime-gold px-4 py-2 rounded-lg hover:bg-prime-gold/90 transition shadow-[0_0_15px_rgba(201,169,97,0.3)]">
                <Plus size={16}/> Tambah Properti
              </button>
            </div>
          </div>

          {/* Filter Panel (Toggles on button click) */}
          {isFilterOpen && (
            <div className="mb-6 p-4 bg-[#1A1A1A] border border-white/10 rounded-xl flex gap-4 transition-all">
               <div className="flex flex-col gap-1.5 flex-1">
                 <label className="text-xs text-gray-500 font-medium">Tipe Properti</label>
                 <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-prime-gold">
                    <option className="bg-[#1A1A1A]">Semua Tipe</option>
                    <option className="bg-[#1A1A1A]">Villa</option>
                    <option className="bg-[#1A1A1A]">Ruko</option>
                    <option className="bg-[#1A1A1A]">Rumah</option>
                 </select>
               </div>
               <div className="flex flex-col gap-1.5 flex-1">
                 <label className="text-xs text-gray-500 font-medium">Status</label>
                 <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-prime-gold">
                    <option className="bg-[#1A1A1A]">Semua Status</option>
                    <option className="bg-[#1A1A1A]">In Stock</option>
                    <option className="bg-[#1A1A1A]">Sold Out</option>
                 </select>
               </div>
               <div className="flex flex-col gap-1.5 flex-1">
                 <label className="text-xs text-gray-500 font-medium">Kondisi</label>
                 <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-prime-gold">
                    <option className="bg-[#1A1A1A]">Semua Kondisi</option>
                    <option className="bg-[#1A1A1A]">Siap Huni</option>
                    <option className="bg-[#1A1A1A]">Siap Kosong</option>
                 </select>
               </div>
               <div className="flex items-end">
                 <button onClick={() => setIsFilterOpen(false)} className="bg-prime-gold/10 text-prime-gold border border-prime-gold/30 px-5 py-2 rounded-lg text-sm font-bold hover:bg-prime-gold hover:text-prime-black transition">Terapkan Filter</button>
               </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-gray-500 text-xs border-y border-white/10 bg-white/5">
                  <th className="py-3 px-4 font-medium uppercase tracking-wider">Nama & Group</th>
                  <th className="py-3 px-4 font-medium uppercase tracking-wider">Kawasan</th>
                  <th className="py-3 px-4 font-medium uppercase tracking-wider">L × P (m)</th>
                  <th className="py-3 px-4 font-medium uppercase tracking-wider">Hadap</th>
                  <th className="py-3 px-4 font-medium uppercase tracking-wider">Tipe</th>
                  <th className="py-3 px-4 font-medium uppercase tracking-wider">Tkt</th>
                  <th className="py-3 px-4 font-medium uppercase tracking-wider text-center">Harga</th>
                  <th className="py-3 px-4 font-medium uppercase tracking-wider text-center">Status</th>
                  <th className="py-3 px-4 font-medium uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                
                {isLoading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-gray-500">Memuat data dari database...</td>
                  </tr>
                ) : filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-gray-500">Pencarian "{searchQuery}" tidak ditemukan.</td>
                  </tr>
                ) : filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-white/5 transition group">
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-sm">{prop.nama}</span>
                        <span className="text-[11px] text-gray-500">Grup: {prop.group || '-'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{prop.kawasan}</td>
                    <td className="py-4 px-4 text-gray-300">{prop.l} × {prop.p}</td>
                    <td className="py-4 px-4 text-gray-300">{prop.hadap}</td>
                    <td className="py-4 px-4 text-gray-300">{prop.tipe}</td>
                    <td className="py-4 px-4 text-gray-300">{prop.tkt}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-gray-500 text-xs mr-1">Rp</span>
                      <span className="font-bold text-white">{(prop.harga).toLocaleString('id-ID')}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`${prop.status === 'In Stock' ? 'bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20' : 'bg-prime-red/10 text-prime-red border-prime-red/20'} px-3 py-1 rounded-full text-[11px] font-bold border`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/agent/properties/${prop.id}`} className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-white transition"><Eye size={14}/></Link>
                        <button onClick={() => openEditModal(prop)} className="w-8 h-8 rounded-lg bg-prime-gold/10 text-prime-gold flex items-center justify-center hover:bg-prime-gold hover:text-prime-black transition"><Edit2 size={14}/></button>
                        <button onClick={() => handleDelete(prop.id)} className="w-8 h-8 rounded-lg bg-prime-red/10 text-prime-red flex items-center justify-center hover:bg-prime-red hover:text-white transition"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#1A1A1A]">
              <h3 className="font-bold text-lg text-white">{editingId ? 'Edit Properti' : 'Tambah Properti Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-prime-red transition"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-medium">Nama Properti <span className="text-prime-red">*</span></label>
                  <input required value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} type="text" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-prime-gold outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-medium">Grup</label>
                  <input value={formData.group} onChange={e => setFormData({...formData, group: e.target.value})} type="text" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-prime-gold outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-medium">Kawasan <span className="text-prime-red">*</span></label>
                  <input required value={formData.kawasan} onChange={e => setFormData({...formData, kawasan: e.target.value})} type="text" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-prime-gold outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-medium">Tipe</label>
                  <select value={formData.tipe} onChange={e => setFormData({...formData, tipe: e.target.value})} className="w-full px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-sm text-white focus:border-prime-gold outline-none">
                    <option>Villa</option>
                    <option>Ruko</option>
                    <option>Rumah</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-medium">Harga (Rp) <span className="text-prime-red">*</span></label>
                  <input required value={formData.harga} onChange={e => setFormData({...formData, harga: Number(e.target.value)})} type="number" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-prime-gold outline-none" />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10 mt-2 gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 transition">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-lg text-sm font-bold bg-prime-gold text-prime-black hover:bg-prime-gold/90 transition shadow-[0_0_15px_rgba(201,169,97,0.3)]">
                  {editingId ? 'Simpan Perubahan' : 'Simpan Properti'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
