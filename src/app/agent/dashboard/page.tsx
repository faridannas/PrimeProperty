"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useUser } from '@/components/agent/UserContext';

export default function Dashboard() {
  const { profile } = useUser();
  const [filterType, setFilterType] = useState('Harian');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState<'revenue' | 'transaction' | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const filterOptions = ['Harian', 'Mingguan', 'Bulanan', 'Tahunan'];

  const chartData = profile?.role === 'SUPERADMIN' ? {
    Harian: {
      val: "875 Juta", sub: "Hari ini (Global)",
      rows: [
        { val: '2.5M', w: '85%', grow: '+10%' },
        { val: '1.8M', w: '65%', grow: '+12%' },
        { val: '1.2M', w: '45%', grow: '+8%' },
        { val: '800Jt', w: '35%', grow: '+15%' },
      ],
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
    },
    Mingguan: {
      val: "4,2 Miliar", sub: "Minggu ini (Global)",
      rows: [
        { val: '10M', w: '90%', grow: '+5%' },
        { val: '7M', w: '75%', grow: '+8%' },
        { val: '4M', w: '50%', grow: '+12%' },
        { val: '2M', w: '30%', grow: '+20%' },
      ],
      labels: ['M1', 'M2', 'M3', 'M4']
    },
    Bulanan: {
      val: "15,8 Miliar", sub: "Bulan ini (Global)",
      rows: [
        { val: '30M', w: '95%', grow: '+15%' },
        { val: '20M', w: '70%', grow: '+20%' },
        { val: '15M', w: '55%', grow: '+18%' },
        { val: '8M', w: '35%', grow: '+25%' },
      ],
      labels: ['Jan', 'Mar', 'Mei', 'Jul', 'Sep', 'Nov']
    },
    Tahunan: {
      val: "145 Miliar", sub: "Tahun ini (Global)",
      rows: [
        { val: '200M', w: '80%', grow: '+22%' },
        { val: '150M', w: '60%', grow: '+18%' },
        { val: '100M', w: '40%', grow: '+15%' },
        { val: '50M', w: '25%', grow: '+10%' },
      ],
      labels: ['2020', '2021', '2022', '2023', '2024']
    }
  } : {
    Harian: {
      val: "125 Juta", sub: "Hari ini (Pribadi)",
      rows: [
        { val: '300Jt', w: '85%', grow: '+5%' },
        { val: '150Jt', w: '65%', grow: '+2%' },
        { val: '100Jt', w: '45%', grow: '+0%' },
        { val: '50Jt', w: '35%', grow: '+1%' },
      ],
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
    },
    Mingguan: {
      val: "450 Juta", sub: "Minggu ini (Pribadi)",
      rows: [
        { val: '1M', w: '90%', grow: '+5%' },
        { val: '700Jt', w: '75%', grow: '+3%' },
        { val: '400Jt', w: '50%', grow: '+4%' },
        { val: '200Jt', w: '30%', grow: '+10%' },
      ],
      labels: ['M1', 'M2', 'M3', 'M4']
    },
    Bulanan: {
      val: "1,8 Miliar", sub: "Bulan ini (Pribadi)",
      rows: [
        { val: '3M', w: '95%', grow: '+10%' },
        { val: '2M', w: '70%', grow: '+12%' },
        { val: '1.5M', w: '55%', grow: '+8%' },
        { val: '800Jt', w: '35%', grow: '+15%' },
      ],
      labels: ['Jan', 'Mar', 'Mei', 'Jul', 'Sep', 'Nov']
    },
    Tahunan: {
      val: "12 Miliar", sub: "Tahun ini (Pribadi)",
      rows: [
        { val: '20M', w: '80%', grow: '+12%' },
        { val: '15M', w: '60%', grow: '+10%' },
        { val: '10M', w: '40%', grow: '+5%' },
        { val: '5M', w: '25%', grow: '+8%' },
      ],
      labels: ['2020', '2021', '2022', '2023', '2024']
    }
  };

  const currentChart = chartData[filterType as keyof typeof chartData];

  const heroImages = [
    '/villa.png',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
      
      {/* ROW 1: Hero Stats (Col 5) & Hero Image (Col 7) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5 flex flex-col justify-end pb-4 xl:pl-4">
          <div className="grid grid-cols-2 gap-8 mb-5">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">
                {profile?.role === 'SUPERADMIN' ? 'Total Penjualan Properti' : 'Pribadi: Properti Terjual'}
              </p>
              <h3 className="text-4xl font-light tracking-tight text-white">
                Rp <span className="font-semibold text-prime-gold">{profile?.role === 'SUPERADMIN' ? '8,5' : '1,2'}</span>M
              </h3>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">
                {profile?.role === 'SUPERADMIN' ? 'Total Nilai Sewa' : 'Pribadi: Properti Disewa'}
              </p>
              <h3 className="text-4xl font-light tracking-tight text-gray-500">
                Rp <span className="font-semibold text-gray-400">{profile?.role === 'SUPERADMIN' ? '2,1' : '0,4'}</span>M
              </h3>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="flex items-center gap-2 h-4">
            <div className="h-full bg-prime-gold rounded-full flex-grow-[1.5] shadow-[0_0_10px_rgba(201,169,97,0.5)]"></div>
            <div className="h-full bg-[#333] rounded-full flex-grow"></div>
            <div className="h-full flex flex-grow items-center gap-1 opacity-20">
              {[...Array(15)].map((_, i) => <div key={i} className="w-1 h-full bg-white rounded-full transform -skew-x-12"></div>)}
            </div>
          </div>
        </div>

        <div className="xl:col-span-7 h-64 lg:h-80 rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative border-4 border-white/5 group">
          <img 
            src={heroImages[currentImageIndex]} 
            alt="Properti Unggulan" 
            className="w-full h-full object-cover object-center transition-opacity duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prime-black/90 via-transparent to-transparent mix-blend-overlay"></div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-transparent border border-white/40 hover:bg-white/10 hover:border-white backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all z-10"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-transparent border border-white/40 hover:bg-white/10 hover:border-white backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all z-10"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroImages.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-prime-gold' : 'w-2 bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Revenue (3) + Chart (4) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5 flex flex-col gap-6">
          <div 
            onClick={() => setModalType('revenue')}
            className="bg-[#161616]/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/5 flex-1 flex flex-col justify-between group cursor-pointer hover:border-prime-gold/30 transition"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-gray-300">
                {profile?.role === 'SUPERADMIN' ? 'Total Pendapatan Perusahaan' : 'Pendapatan Saya'}
              </h4>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-prime-gold group-hover:text-prime-black transition"><ArrowUpRight size={16}/></div>
            </div>
            <div>
              <h2 className="text-3xl font-light tracking-tight mt-4 text-white">
                Rp <span className="font-semibold text-prime-gold">{profile?.role === 'SUPERADMIN' ? '12,5' : '2,1'}</span>M
              </h2>
              <div className="flex justify-between items-end mt-2">
                <p className="text-gray-500 text-sm">Bulan ini</p>
                <div className="flex items-end gap-0.5 opacity-60">
                  {profile?.role === 'SUPERADMIN' 
                    ? [10, 15, 8, 20, 12, 24, 18, 14, 22].map((h, i) => <div key={i} style={{height: h}} className="w-1.5 bg-prime-gold rounded-t-sm"></div>)
                    : [5, 8, 6, 12, 10, 15, 12, 8, 14].map((h, i) => <div key={i} style={{height: h}} className="w-1.5 bg-prime-gold rounded-t-sm"></div>)}
                </div>
              </div>
            </div>
          </div>
          
          <div 
            onClick={() => setModalType('transaction')}
            className="bg-[#161616]/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/5 flex-1 flex flex-col justify-between group cursor-pointer hover:border-prime-gold/30 transition"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-gray-300">
                {profile?.role === 'SUPERADMIN' ? 'Semua Transaksi Selesai' : 'Transaksi Saya'}
              </h4>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-prime-gold group-hover:text-prime-black transition"><ArrowUpRight size={16}/></div>
            </div>
            <div>
              <h2 className="text-4xl font-semibold tracking-tight mt-4 text-white">
                {profile?.role === 'SUPERADMIN' ? '124' : '18'}
              </h2>
              <div className="flex justify-between items-end mt-2">
                <p className="text-gray-500 text-sm">Bulan Ini</p>
                <div className="flex items-end gap-0.5 opacity-60">
                  {profile?.role === 'SUPERADMIN'
                    ? [12, 18, 14, 22, 10, 15, 8, 20, 24].map((h, i) => <div key={i} style={{height: h}} className="w-1.5 bg-prime-gold rounded-t-sm"></div>)
                    : [4, 6, 5, 8, 4, 7, 3, 9, 8].map((h, i) => <div key={i} style={{height: h}} className="w-1.5 bg-prime-gold rounded-t-sm"></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Average Sale Chart */}
        <div className="xl:col-span-7 bg-[#161616]/90 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/5 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h4 className="font-semibold text-gray-300">Rata-rata Nilai Transaksi</h4>
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 shadow-sm px-4 py-2 rounded-full hover:bg-white/10 transition"
              >
                {filterType} <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20">
                  {filterOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setFilterType(opt);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${filterType === opt ? 'text-prime-gold font-semibold' : 'text-gray-300'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <h2 className="text-3xl font-light tracking-tight mb-1 text-white">Rp <span className="font-semibold text-prime-gold">{currentChart.val.split(' ')[0]}</span> {currentChart.val.split(' ')[1]}</h2>
          <p className="text-gray-500 text-sm mb-8">{currentChart.sub}</p>
          
          <div className="flex-1 flex flex-col justify-between relative mt-2">
            {currentChart.rows.map((row, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-gray-500 font-medium transition-all duration-500">
                <span className="w-10 text-right">{row.val}</span>
                <div className="flex-1 h-[2px] bg-white/5 relative flex items-center">
                  <div className="h-6 bg-[#222] border border-white/5 rounded-full absolute left-0 flex items-center pr-2 transition-all duration-1000 ease-out" style={{width: row.w}}>
                     <div className="bg-prime-gold text-prime-black font-bold text-[10px] px-2 py-1 rounded-full absolute right-0 translate-x-1/2">{row.grow}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between text-[10px] text-gray-500 font-medium ml-14 mt-4 border-t border-white/10 pt-3">
              {currentChart.labels.map((lbl, i) => (
                <span key={i}>{lbl}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction & Revenue Details Modal (Dummy) */}
      {modalType && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalType(null)}></div>
          <div className="relative bg-[#1A1A1A] border border-white/10 rounded-3xl w-full max-w-4xl p-6 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {modalType === 'revenue' 
                    ? `Detail ${profile?.role === 'SUPERADMIN' ? 'Pendapatan Perusahaan' : 'Pendapatan Pribadi'}`
                    : `Riwayat ${profile?.role === 'SUPERADMIN' ? 'Semua Transaksi' : 'Transaksi Pribadi'}`}
                </h3>
                <p className="text-sm text-gray-400">
                  {modalType === 'revenue' ? 'Rincian sumber pendapatan bulan ini.' : 'Daftar transaksi properti bulan ini.'}
                </p>
              </div>
              <button onClick={() => setModalType(null)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition">
                <X size={16} />
              </button>
            </div>
            
            <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-[#222] text-xs uppercase text-gray-400 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">ID / Referensi</th>
                    <th className="px-4 py-3">Sumber / Properti</th>
                    {profile?.role === 'SUPERADMIN' && <th className="px-4 py-3">Agen</th>}
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3 rounded-r-lg">{modalType === 'revenue' ? 'Komisi/Nilai (Rp)' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { id: 'TRX-1092', prop: 'Villa Mewah Pantai', agen: 'Budi (Admin)', tgl: '12 Nov 2023', val: '3.500.000.000', komisi: '70.000.000' },
                    { id: 'TRX-1091', prop: 'Ruko Sudirman Permai', agen: 'Budi (Admin)', tgl: '08 Nov 2023', val: '2.100.000.000', komisi: '42.000.000' },
                    { id: 'TRX-1088', prop: 'Aston Villas', agen: 'Siti (Admin)', tgl: '02 Nov 2023', val: '1.250.000.000', komisi: '25.000.000' },
                    { id: 'TRX-1085', prop: 'Mentari Square', agen: 'Budi (Admin)', tgl: '28 Okt 2023', val: '980.000.000', komisi: '19.600.000' },
                    { id: 'TRX-1082', prop: 'Grand Tembung', agen: 'Siti (Admin)', tgl: '15 Okt 2023', val: '1.850.000.000', komisi: '37.000.000' },
                  ].map((trx, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition">
                      <td className="px-4 py-3 font-medium text-prime-gold">{modalType === 'revenue' ? `REV-${trx.id.split('-')[1]}` : trx.id}</td>
                      <td className="px-4 py-3 text-white">{trx.prop}</td>
                      {profile?.role === 'SUPERADMIN' && <td className="px-4 py-3">{trx.agen}</td>}
                      <td className="px-4 py-3">{trx.tgl}</td>
                      <td className="px-4 py-3 font-bold">
                        {modalType === 'revenue' 
                          ? <span className="text-green-400">+ Rp {trx.komisi}</span> 
                          : <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs border border-green-500/20">Selesai (Rp {trx.val})</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-center text-xs text-gray-500 italic">
                *Hanya menampilkan 5 riwayat terakhir untuk purwarupa ini.
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
