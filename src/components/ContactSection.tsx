"use client";

import { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP wajib diisi";
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = "Nomor HP minimal 10 digit";
    }

    if (!formData.message.trim()) newErrors.message = "Pesan wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowToast(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        // Hide toast after 5 seconds
        setTimeout(() => setShowToast(false), 5000);
      }, 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="kontak" className="bg-prime-white relative scroll-mt-16">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top-5 fade-in duration-300">
          <CheckCircleIcon />
          <span className="font-medium">Pesan terkirim, tim kami akan menghubungi Anda.</span>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-prime-black text-prime-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-prime-gold rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 text-center relative z-10">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-6 tracking-tight">Hubungi Kami</h2>
          <div className="w-16 h-1.5 bg-prime-gold mx-auto rounded-full"></div>
          <p className="mt-8 text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Punya pertanyaan seputar properti premium atau ingin berkonsultasi? Jangan ragu untuk menghubungi kami melalui form di bawah ini atau kontak yang tersedia.
          </p>
        </div>
      </div>

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Information */}
        <div>
          <h3 className="font-playfair text-3xl font-bold mb-8 text-prime-black">Informasi Kontak</h3>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-prime-gold/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="text-prime-gold" size={24} />
              </div>
              <div>
                <h4 className="font-playfair font-bold text-lg text-prime-black mb-1">Alamat Kantor</h4>
                <p className="text-gray-600 leading-relaxed">Jl. Sudirman No. 123, SCBD, Jakarta Pusat<br/>DKI Jakarta, Indonesia 12190</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-prime-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Phone className="text-prime-gold" size={24} />
              </div>
              <div>
                <h4 className="font-playfair font-bold text-lg text-prime-black mb-1">Nomor Telepon</h4>
                <p className="text-gray-600">+62 812 3456 7890</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-prime-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Mail className="text-prime-gold" size={24} />
              </div>
              <div>
                <h4 className="font-playfair font-bold text-lg text-prime-black mb-1">Email</h4>
                <p className="text-gray-600">info@primeproperty.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center shrink-0">
                <MessageSquare className="text-[#25D366]" size={24} />
              </div>
              <div>
                <h4 className="font-playfair font-bold text-lg text-prime-black mb-1">WhatsApp</h4>
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-medium hover:underline flex items-center gap-1"
                >
                  Chat via WhatsApp →
                </a>
              </div>
            </div>
          </div>

          {/* Optional Google Maps Embed */}
          <div className="mt-12 h-64 bg-gray-200 rounded-xl overflow-hidden relative">
             <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-2">
               <MapPin size={32} />
               <span>[Google Maps Embed Area]</span>
             </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 p-8 sm:p-10">
          <h3 className="font-playfair text-2xl font-bold mb-6 text-prime-black">Kirim Pesan</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-prime-black mb-2">Nama Lengkap *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-prime-red' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-prime-gold/50 focus:border-prime-gold transition-colors`}
                placeholder="Masukkan nama Anda"
              />
              {errors.name && <p className="text-prime-red text-xs mt-1 font-medium">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-prime-black mb-2">Alamat Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-prime-red' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-prime-gold/50 focus:border-prime-gold transition-colors`}
                placeholder="email@contoh.com"
              />
              {errors.email && <p className="text-prime-red text-xs mt-1 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-prime-black mb-2">Nomor HP / WhatsApp *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-prime-red' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-prime-gold/50 focus:border-prime-gold transition-colors`}
                placeholder="081234567890"
              />
              {errors.phone && <p className="text-prime-red text-xs mt-1 font-medium">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-prime-black mb-2">Pesan *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-prime-red' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-prime-gold/50 focus:border-prime-gold transition-colors resize-none`}
                placeholder="Tuliskan pertanyaan atau pesan Anda di sini..."
              ></textarea>
              {errors.message && <p className="text-prime-red text-xs mt-1 font-medium">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-prime-black text-prime-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Mengirim...' : (
                <>
                  <Send size={18} /> Kirim Pesan
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">
              * Kami menjaga privasi data Anda. Dilengkapi proteksi anti-spam.
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
