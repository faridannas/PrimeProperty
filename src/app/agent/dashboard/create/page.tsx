"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

// Helper for formatting
const formatRupiahInput = (value: string) => {
  const numberString = value.replace(/[^,\d]/g, '').toString();
  const split = numberString.split(',');
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  return split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
};

export default function CreateProperty() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nama_property: '',
    group: '',
    lebar: '',
    panjang: '',
    hadap: [] as string[],
    tipe: 'Ruko',
    tingkat: '',
    price: '',
    carport: false,
    status: 'in_stock',
    siap: 'siap_huni',
    maps_link: '',
    kawasan: '',
    unit: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // AC-8.4 Validation
    if (!formData.nama_property || formData.nama_property.length < 3 || formData.nama_property.length > 100) {
      newErrors.nama_property = 'Nama properti wajib diisi (3 - 100 karakter).';
    }

    if (!formData.lebar || parseFloat(formData.lebar) <= 0) {
      newErrors.lebar = 'Lebar harus lebih besar dari 0.';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.lebar)) {
      newErrors.lebar = 'Maksimal 2 angka desimal.';
    }

    if (!formData.panjang || parseFloat(formData.panjang) <= 0) {
      newErrors.panjang = 'Panjang harus lebih besar dari 0.';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.panjang)) {
      newErrors.panjang = 'Maksimal 2 angka desimal.';
    }

    const priceInt = parseInt(formData.price.replace(/\./g, ''));
    if (!formData.price || isNaN(priceInt) || priceInt <= 0) {
      newErrors.price = 'Harga harus lebih besar dari 0 (hanya angka).';
    }

    const tingkatVal = parseFloat(formData.tingkat);
    if (!formData.tingkat || isNaN(tingkatVal) || tingkatVal < 1 || tingkatVal > 10) {
      newErrors.tingkat = 'Tingkat harus antara 1 sampai 10.';
    } else if (!/^\d+(\.\d{1})?$/.test(formData.tingkat)) {
      newErrors.tingkat = 'Maksimal 1 angka desimal.';
    }

    if (formData.maps_link && (!formData.maps_link.includes('google.com/maps') && !formData.maps_link.includes('maps.app.goo.gl'))) {
      newErrors.maps_link = 'URL Maps tidak valid (harus mengandung google.com/maps).';
    }

    if (formData.hadap.length === 0) {
      newErrors.hadap = 'Pilih minimal 1 arah hadap.';
    }

    if (!formData.kawasan) {
      newErrors.kawasan = 'Kawasan wajib diisi.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleHadapToggle = (val: string) => {
    setFormData(prev => ({
      ...prev,
      hadap: prev.hadap.includes(val) 
        ? prev.hadap.filter(h => h !== val)
        : [...prev.hadap, val]
    }));
  };

  const handleSubmit = (e: React.FormEvent, stay = false) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API Create
      setTimeout(() => {
        setIsSubmitting(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        
        if (!stay) {
          router.push('/agent/dashboard');
        } else {
          // Reset form for next input
          setFormData({
            nama_property: '', group: '', lebar: '', panjang: '', hadap: [], tipe: 'Ruko', tingkat: '', price: '', carport: false, status: 'in_stock', siap: 'siap_huni', maps_link: '', kawasan: '', unit: ''
          });
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-prime-gray pb-12">
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top-5 fade-in">
          <span className="font-bold">Properti berhasil disimpan!</span>
        </div>
      )}

      {/* Header Dashboard */}
      <div className="bg-prime-black text-prime-white h-16 flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Prime Property" className="h-8 w-auto object-contain bg-white px-2 py-1 rounded" />
          <span className="font-bold border-l border-gray-700 pl-4">Internal Dashboard</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-6">
          <Link href="/agent/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-prime-black font-medium mb-4 transition-colors">
            <ArrowLeft size={18} /> Kembali ke Listing
          </Link>
          <h1 className="text-2xl font-bold text-prime-black">Tambah Properti Baru</h1>
          <p className="text-gray-500 text-sm mt-1">Lengkapi form di bawah ini. Tanda * wajib diisi.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <form className="space-y-8">
            {/* Grid 2 Kolom (AC-8.1) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-prime-black mb-2">Nama Properti *</label>
                <input 
                  type="text" 
                  value={formData.nama_property}
                  onChange={e => setFormData({...formData, nama_property: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${errors.nama_property ? 'border-[#B33A3A]' : 'border-gray-300'} focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none`}
                  placeholder="Contoh: Aston Villas"
                />
                {errors.nama_property && <p className="text-[#B33A3A] text-xs mt-1 font-bold">{errors.nama_property}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-prime-black mb-2">Group / Cluster</label>
                <input 
                  type="text" 
                  value={formData.group}
                  onChange={e => setFormData({...formData, group: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none"
                  placeholder="Contoh: Mentari (opsional)"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-prime-black mb-2">Harga (Rp) *</label>
                <input 
                  type="text" 
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: formatRupiahInput(e.target.value)})}
                  className={`w-full p-3 rounded-lg border ${errors.price ? 'border-[#B33A3A]' : 'border-gray-300'} focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none`}
                  placeholder="1.500.000.000"
                />
                {errors.price && <p className="text-[#B33A3A] text-xs mt-1 font-bold">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-prime-black mb-2">Lebar (meter) *</label>
                <input 
                  type="text" 
                  value={formData.lebar}
                  onChange={e => setFormData({...formData, lebar: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${errors.lebar ? 'border-[#B33A3A]' : 'border-gray-300'} focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none`}
                  placeholder="Contoh: 6.5"
                />
                {errors.lebar && <p className="text-[#B33A3A] text-xs mt-1 font-bold">{errors.lebar}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-prime-black mb-2">Panjang (meter) *</label>
                <input 
                  type="text" 
                  value={formData.panjang}
                  onChange={e => setFormData({...formData, panjang: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${errors.panjang ? 'border-[#B33A3A]' : 'border-gray-300'} focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none`}
                  placeholder="Contoh: 15.25"
                />
                {errors.panjang && <p className="text-[#B33A3A] text-xs mt-1 font-bold">{errors.panjang}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-prime-black mb-2">Tingkat / Lantai *</label>
                <input 
                  type="text" 
                  value={formData.tingkat}
                  onChange={e => setFormData({...formData, tingkat: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${errors.tingkat ? 'border-[#B33A3A]' : 'border-gray-300'} focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none`}
                  placeholder="Contoh: 2.5"
                />
                {errors.tingkat && <p className="text-[#B33A3A] text-xs mt-1 font-bold">{errors.tingkat}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-prime-black mb-2">Tipe *</label>
                <select 
                  value={formData.tipe}
                  onChange={e => setFormData({...formData, tipe: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none"
                >
                  <option value="Ruko">Ruko</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-prime-black mb-2">Arah Hadap *</label>
                <div className="flex gap-3">
                  {['Utara', 'Selatan', 'Timur', 'Barat'].map(h => (
                    <button 
                      key={h} type="button"
                      onClick={() => handleHadapToggle(h)}
                      className={`px-4 py-2 rounded-lg border text-sm font-bold transition-colors ${formData.hadap.includes(h) ? 'bg-prime-gold text-prime-black border-prime-gold' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
                {errors.hadap && <p className="text-[#B33A3A] text-xs mt-1 font-bold">{errors.hadap}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-prime-black mb-2">Status *</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none"
                >
                  <option value="in_stock">In Stock</option>
                  <option value="sold_out">Sold Out</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-prime-black mb-2">Kondisi Siap *</label>
                <select 
                  value={formData.siap}
                  onChange={e => setFormData({...formData, siap: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none"
                >
                  <option value="siap_huni">Siap Huni</option>
                  <option value="siap_kosong">Siap Kosong</option>
                  <option value="siap_huni_renovasi">Siap Huni Renovasi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-prime-black mb-2">Carport *</label>
                <div className="flex items-center gap-2 mt-3">
                  <input 
                    type="checkbox" 
                    id="carport"
                    checked={formData.carport}
                    onChange={e => setFormData({...formData, carport: e.target.checked})}
                    className="w-5 h-5 accent-prime-gold"
                  />
                  <label htmlFor="carport" className="text-sm font-medium text-gray-700">Tersedia Carport</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-prime-black mb-2">Kawasan (pisahkan dengan koma) *</label>
                <input 
                  type="text" 
                  value={formData.kawasan}
                  onChange={e => setFormData({...formData, kawasan: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${errors.kawasan ? 'border-[#B33A3A]' : 'border-gray-300'} focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none`}
                  placeholder="Contoh: Krakatau, Cemara Asri"
                />
                {errors.kawasan && <p className="text-[#B33A3A] text-xs mt-1 font-bold">{errors.kawasan}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-prime-black mb-2">Google Maps Link</label>
                <input 
                  type="url" 
                  value={formData.maps_link}
                  onChange={e => setFormData({...formData, maps_link: e.target.value})}
                  className={`w-full p-3 rounded-lg border ${errors.maps_link ? 'border-[#B33A3A]' : 'border-gray-300'} focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none`}
                  placeholder="https://maps.google.com/..."
                />
                {errors.maps_link && <p className="text-[#B33A3A] text-xs mt-1 font-bold">{errors.maps_link}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-prime-black mb-2">Unit / Keterangan Lain</label>
                <input 
                  type="text" 
                  value={formData.unit}
                  onChange={e => setFormData({...formData, unit: e.target.value})}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-prime-gold focus:ring-1 focus:ring-prime-gold outline-none"
                  placeholder="Contoh: Ready Siap Huni"
                />
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
              <Link href="/agent/dashboard" className="px-6 py-3 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                Batal
              </Link>
              <button 
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e, true)}
                className="px-6 py-3 rounded-lg font-bold text-prime-black border-2 border-prime-black hover:bg-gray-50 transition-colors"
              >
                Simpan & Tambah Lagi
              </button>
              <button 
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e, false)}
                className="px-6 py-3 rounded-lg font-bold bg-prime-black text-prime-gold flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Save size={18} /> Simpan Properti
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
