"use client";

import React, { useEffect, useState } from 'react';
import { Shield, ShieldAlert, User, MoreVertical, X } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk Tambah Akun
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'ADMIN' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setIsAddModalOpen(false);
        setFormData({ email: '', password: '', role: 'ADMIN' });
        fetchUsers(); // Refresh data tabel
      } else {
        alert(result.error || 'Gagal menambahkan akun');
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan koneksi saat menambah akun');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-prime-white mb-2">Manajemen Tim</h1>
          <p className="text-gray-400 text-sm">Kelola akses dan akun agen properti di sistem ini.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-prime-gold text-prime-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-yellow-600 transition shadow-[0_0_20px_rgba(201,169,97,0.3)] flex items-center gap-2">
          + Tambah Akun
        </button>
      </div>

      <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs uppercase bg-white/5 text-gray-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Email Akun</th>
                <th className="px-6 py-4 font-bold tracking-wider">Hak Akses (Role)</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold tracking-wider">Dibuat Pada</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">Memuat data tim...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">Tidak ada data ditemukan.</td>
                </tr>
              ) : users.map((user, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-prime-gold/20 text-prime-gold flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span className="font-semibold text-white">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === 'SUPERADMIN' ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-prime-gold bg-prime-gold/10 px-2.5 py-1 rounded-full w-max border border-prime-gold/20">
                        <ShieldAlert size={12} /> SUPERADMIN
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full w-max border border-blue-500/20">
                        <Shield size={12} /> ADMIN
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.isActive ? (
                      <span className="text-green-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]"></span> Aktif</span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400"></span> Nonaktif</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-white transition">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH AKUN */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col relative">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-xl font-bold text-white">Tambah Akun Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white transition">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Email Akun Baru</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-prime-gold/50" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Password Sementara</label>
                <input required type="text" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-prime-gold/50" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Hak Akses (Role)</label>
                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-prime-gold/50">
                  <option value="ADMIN">Agent / Admin</option>
                  <option value="SUPERADMIN">Superadmin</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">Superadmin memiliki akses ke manajemen tim. Admin biasa hanya dapat mengelola properti.</p>
              </div>

              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-300 bg-white/5 hover:bg-white/10 transition border border-white/10">Batal</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 rounded-xl text-sm font-bold text-prime-black bg-prime-gold hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Akun'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
