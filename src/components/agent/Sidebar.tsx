"use client";

import React, { useState } from 'react';
import { Search, Bell, Settings, LayoutDashboard, Building2, LogOut, X, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useNotifications } from './NotificationContext';
import { useUser } from './UserContext';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen?: boolean, setIsOpen?: (v: boolean) => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { unreadCount } = useNotifications();
  const { profile } = useUser();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem('prime_user');
    router.push('/agent/login?logout=success');
  };

  return (
    <>
      <div className={`w-72 bg-[#111111]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col shrink-0 shadow-[4px_0_40px_rgba(0,0,0,0.5)] z-50 fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
      
      {/* Close button for mobile */}
      <button onClick={() => setIsOpen && setIsOpen(false)} className="lg:hidden absolute top-6 right-6 text-gray-400 hover:text-white transition z-50">
        <X size={24} />
      </button>

      <div className="p-6 flex flex-col h-full overflow-y-auto scrollbar-hide">
        
        {/* TOP SECTION */}
        <div className="flex flex-col gap-6 mb-8">
          {/* Logo */}
          <div className="flex items-center px-2">
            <img src="/logo.png" alt="Prime Living Logo" className="h-10 object-contain brightness-200" />
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Cari di dasbor..." className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-prime-gold/50 text-white placeholder-gray-500 shadow-sm transition" />
          </div>
        </div>

        {/* MIDDLE SECTION - Navigation */}
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 mb-2">Menu Utama</p>
          
          <Link href="/agent/dashboard" className={`px-4 py-3.5 rounded-xl text-sm font-bold flex items-center gap-3 transition border ${pathname === '/agent/dashboard' ? 'bg-prime-gold text-prime-black shadow-[0_0_15px_rgba(201,169,97,0.3)] border-transparent' : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent hover:border-white/10'}`}>
            <LayoutDashboard size={18} /> Beranda
          </Link>
          
          <Link href="/agent/properties" className={`px-4 py-3.5 rounded-xl text-sm font-bold flex items-center gap-3 transition border ${pathname.startsWith('/agent/properties') ? 'bg-prime-gold text-prime-black shadow-[0_0_15px_rgba(201,169,97,0.3)] border-transparent' : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent hover:border-white/10'}`}>
            <Building2 size={18} /> Properti
          </Link>

          {/* EKSKLUSIF SUPERADMIN */}
          {profile.role === 'SUPERADMIN' && (
            <Link href="/agent/users" className={`px-4 py-3.5 rounded-xl text-sm font-bold flex items-center gap-3 transition border ${pathname.startsWith('/agent/users') ? 'bg-prime-gold text-prime-black shadow-[0_0_15px_rgba(201,169,97,0.3)] border-transparent' : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent hover:border-white/10'}`}>
              <Users size={18} /> Manajemen Akun
            </Link>
          )}
          
        </div>
        
        {/* BOTTOM SECTION */}
        <div className="mt-auto pt-6 flex flex-col gap-4 border-t border-white/10">
          {/* System Nav */}
          <div className="flex flex-col gap-1">
            <Link href="/agent/notifications" className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition border ${pathname === '/agent/notifications' ? 'bg-white/10 text-white border-white/20 shadow-sm' : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent hover:border-white/10'}`}>
              <div className="flex items-center gap-3"><Bell size={18} /> Notifikasi</div>
              {unreadCount > 0 && (
                <span className="bg-prime-red text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">{unreadCount}</span>
              )}
            </Link>
            <Link href="/agent/settings" className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 transition border ${pathname === '/agent/settings' ? 'bg-white/10 text-white border-white/20 shadow-sm' : 'text-gray-400 hover:bg-white/5 hover:text-white border-transparent hover:border-white/10'}`}>
              <Settings size={18} /> Pengaturan
            </Link>
          </div>

          {/* Profile Card & Logout */}
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-2 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white/10 shadow-sm shrink-0 bg-gray-800">
                <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm text-white truncate">{profile.name}</p>
                <div className="mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${profile.role === 'SUPERADMIN' ? 'bg-prime-gold/20 text-prime-gold border-prime-gold/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                    {profile.role === 'SUPERADMIN' ? '🌟 SUPERADMIN' : '👤 AGENT'}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsLogoutModalOpen(true)} className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-prime-red bg-prime-red/10 hover:bg-prime-red/20 transition text-center flex items-center justify-center gap-2 border border-prime-red/20">
              <LogOut size={14} /> Keluar
            </button>
          </div>
        </div>

      </div>

      </div>

      {/* MODAL KONFIRMASI LOGOUT */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col p-6 text-center relative">
            <button onClick={() => setIsLogoutModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition">
              <X size={18} />
            </button>
            <div className="w-16 h-16 bg-prime-red/10 text-prime-red rounded-full flex items-center justify-center mx-auto mb-4 border border-prime-red/20">
              <LogOut size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Konfirmasi Keluar</h3>
            <p className="text-sm text-gray-400 mb-6">Apakah Anda yakin ingin mengakhiri sesi dan keluar dari sistem?</p>
            <div className="flex gap-3">
              <button onClick={() => setIsLogoutModalOpen(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-gray-300 bg-white/5 hover:bg-white/10 transition border border-white/10">Batal</button>
              <button onClick={handleLogout} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-prime-red hover:bg-red-600 transition shadow-[0_0_15px_rgba(239,68,68,0.3)] border border-transparent">Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
