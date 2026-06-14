"use client";

import { useState, useEffect } from 'react';
import { Lock, Mail, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AgentLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('logout') === 'success') {
        setSuccessMsg('Anda telah berhasil keluar dari sistem.');
        // Hapus query parameter dari URL agar notifikasi tidak menetap saat direfresh
        window.history.replaceState(null, '', '/agent/login');
        
        // Sembunyikan notifikasi setelah 3 detik
        setTimeout(() => {
          setSuccessMsg('');
        }, 3000);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login gagal. Coba lagi.');
        return;
      }

      // Sukses — simpan ke localStorage dan redirect ke dashboard
      localStorage.setItem('prime_user', JSON.stringify({
        name: data.user.role === 'SUPERADMIN' ? 'CEO Prime' : 'Agent Properti',
        email: data.user.email,
        role: data.user.role,
        phone: '0812-3456-7890',
        avatar: data.user.role === 'SUPERADMIN' ? 'https://i.pravatar.cc/150?img=12' : 'https://i.pravatar.cc/150?img=11',
      }));
      router.push('/agent/dashboard');
    } catch {
      setError('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-prime-gray flex items-center justify-center p-4">
      <div className="bg-prime-white w-full max-w-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header Login */}
        <div className="bg-prime-black p-8 text-center relative">
          <div className="flex items-center justify-center mx-auto mb-6">
            <img src="/logo.png" alt="Prime Property" className="h-16 w-auto object-contain bg-white px-4 py-2 rounded" />
          </div>
          <h1 className="text-2xl font-bold text-prime-white">Agent Portal</h1>
          <p className="text-gray-400 mt-2 text-sm">Masuk ke sistem manajemen internal</p>
        </div>

        {/* Form Login */}
        <div className="p-8">
          {successMsg && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-green-500 font-medium">{successMsg}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-prime-red/10 border border-prime-red/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-prime-red shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-prime-red font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-prime-black mb-2">Email Agent</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prime-gold/50 focus:border-prime-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-prime-black mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-11 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prime-gold/50 focus:border-prime-gold transition-colors"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-prime-gold text-prime-black font-bold py-3.5 rounded-lg hover:bg-yellow-600 transition-colors flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Memeriksa Kredensial...' : 'Masuk ke Dashboard'}
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}
