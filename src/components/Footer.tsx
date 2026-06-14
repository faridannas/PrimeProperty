import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-prime-black text-prime-white pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="mb-4">
             <img src="/logo.png" alt="Prime Property Logo" className="h-10 w-auto object-contain bg-white px-2 py-1 rounded" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Mitra terpercaya untuk menemukan dan mengelola properti idaman Anda dengan proses yang transparan dan efisien.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-prime-gold mb-4 uppercase tracking-wider text-sm">Tautan Cepat</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-prime-gold transition-colors">Beranda</Link></li>
            <li><Link href="/about" className="hover:text-prime-gold transition-colors">Tentang Kami</Link></li>
            <li><Link href="/contact" className="hover:text-prime-gold transition-colors">Kontak Kami</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-prime-gold mb-4 uppercase tracking-wider text-sm">Hubungi Kami</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-prime-gold" />
              <span>+62 812 3456 7890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-prime-gold" />
              <span>info@primeproperty.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-prime-gold shrink-0 mt-0.5" />
              <span className="leading-relaxed">Jl. Sudirman No. 123, Jakarta Pusat, Indonesia</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Prime Property. All rights reserved.
      </div>
    </footer>
  );
}
