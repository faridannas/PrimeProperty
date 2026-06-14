"use client";

import React, { useState, useRef, useEffect } from 'react';
import { User, Lock, Mail, Phone, Camera, CheckCircle2 } from 'lucide-react';
import { useUser } from '@/components/agent/UserContext';

export default function SettingsPage() {
  const { profile: globalProfile, updateProfile } = useUser();
  
  // State Profile (Form Local)
  const [profile, setProfile] = useState({
    name: globalProfile.name,
    phone: globalProfile.phone,
    avatar: globalProfile.avatar,
    role: globalProfile.role,
    email: globalProfile.email,
    password: ''
  });

  // State Feedback
  const [isSaved, setIsSaved] = useState(false);
  
  // Referensi untuk input file tersembunyi
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Membuat URL sementara dari file gambar lokal yang dipilih
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update Global Context
    updateProfile({
      name: profile.name,
      phone: profile.phone,
      avatar: profile.avatar,
    });

    // Munculkan status "Berhasil Disimpan"
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Hilang dalam 3 detik
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 relative">
      
      {/* Toast Notifikasi Berhasil */}
      {isSaved && (
        <div className="absolute top-0 right-0 bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-xl flex items-center gap-3 animate-pulse">
          <CheckCircle2 size={20} />
          <span className="text-sm font-bold">Perubahan berhasil disimpan!</span>
        </div>
      )}

      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Pengaturan Profil</h2>
        <p className="text-gray-400">Kelola informasi pribadi dan pengaturan keamanan akun Anda.</p>
      </div>

      <div className="bg-[#111111]/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/5 flex flex-col md:flex-row gap-10">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <div 
            onClick={() => fileInputRef.current?.click()} 
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-xl relative group cursor-pointer"
          >
            <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera size={24} className="text-white mb-1" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Ubah Foto</span>
            </div>
          </div>
          
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />

          <button onClick={() => fileInputRef.current?.click()} className="text-xs font-semibold text-prime-gold hover:text-white transition">
            Ubah Foto Profil
          </button>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSave} className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Nama Lengkap</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-prime-gold outline-none transition" 
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Nomor Telepon</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  value={profile.phone}
                  onChange={e => setProfile({...profile, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-prime-gold outline-none transition" 
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">Email Akun</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="email" disabled value={profile.email} className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/5 rounded-xl text-sm text-gray-500 cursor-not-allowed outline-none" />
            </div>
            <p className="text-[10px] text-prime-gold mt-1">Email tidak dapat diubah karena merupakan identitas utama {profile.role}.</p>
          </div>

          <hr className="border-white/5 my-2" />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">Ubah Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="password" 
                placeholder="Masukkan password baru..." 
                value={profile.password}
                onChange={e => setProfile({...profile, password: e.target.value})}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-prime-gold outline-none transition" 
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-prime-gold text-prime-black font-bold px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(201,169,97,0.3)] hover:bg-prime-gold/90 transition flex items-center gap-2">
              {isSaved ? <><CheckCircle2 size={18}/> Tersimpan</> : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
