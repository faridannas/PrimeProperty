import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-prime-black text-prime-white sticky top-0 z-50 border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Prime Property Logo" className="h-10 w-auto object-contain" />
          </Link>
          
          <nav className="hidden md:flex gap-6 border-l border-gray-700 pl-6">
            <Link href="#beranda" className="hover:text-prime-gold transition-colors font-medium text-sm">Beranda</Link>
            <Link href="#tentang-kami" className="hover:text-prime-gold transition-colors font-medium text-sm">Tentang Kami</Link>
            <Link href="#kontak" className="hover:text-prime-gold transition-colors font-medium text-sm">Kontak</Link>
          </nav>
        </div>

        <div>
          <Link href="/agent/login" className="border-2 border-prime-gold text-prime-gold px-4 py-1.5 rounded font-bold text-sm hover:bg-prime-gold hover:text-prime-black transition-colors">
            Login Agent
          </Link>
        </div>
      </div>
    </header>
  );
}
