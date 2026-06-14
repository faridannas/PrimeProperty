import dynamic from 'next/dynamic';
import { Shield, TrendingUp, Clock, Building, Search } from 'lucide-react';
import PublicLayout from '@/components/PublicLayout';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import HeroImageScroll from '@/components/HeroImageScroll';
import Testimonials from '@/components/Testimonials';
import PropertyCarousel from '@/components/PropertyCarousel';
import GsapProvider from '@/components/GsapProvider';

const ShadersBackground = dynamic(() => import('@/components/ShadersBackground'), { ssr: false });

export default function Home() {
  const featuredProperties = [
    { id: 'PRM-001', name: 'Aston Villas', kawasan: 'Pancing', tipe: 'Ruko', lebar: 10.05, panjang: 9.43, tingkat: 3, carport: true, status: 'in_stock', price: 2149000000 },
    { id: 'PRM-002', name: 'Banyan Residence', kawasan: 'Pancing, Mentari', tipe: 'Villa', lebar: 7.56, panjang: 24.25, tingkat: 1.5, carport: false, status: 'in_stock', price: 4602000000 },
    { id: 'PRM-003', name: 'Cendana Park', kawasan: 'Helvetia, Cemara Asri', tipe: 'Ruko', lebar: 9.21, panjang: 32.28, tingkat: 3.5, carport: true, status: 'in_stock', price: 4549000000 },
    { id: 'PRM-004', name: 'Grand Tembung', kawasan: 'Tembung', tipe: 'Villa', lebar: 8, panjang: 20, tingkat: 2, carport: true, status: 'in_stock', price: 1850000000 },
    { id: 'PRM-005', name: 'Mentari Square', kawasan: 'Mentari', tipe: 'Villa', lebar: 6.5, panjang: 15, tingkat: 1, carport: false, status: 'in_stock', price: 980000000 },
    { id: 'PRM-006', name: 'Krakatau Residence', kawasan: 'Krakatau', tipe: 'Ruko', lebar: 5, panjang: 22, tingkat: 4, carport: true, status: 'sold_out', price: 3100000000 },
  ];

  return (
    <PublicLayout>
      <GsapProvider>
        {/* ─── HERO ────────────────────────────────────────────────────── */}
        <section id="beranda" className="relative bg-prime-black text-prime-white py-20 lg:py-32 overflow-hidden">
          <ShadersBackground />

          {/* Glow blob */}
          <div
            data-parallax="0.15"
            className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-prime-gold/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-0"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
            {/* Left */}
            <div className="text-left order-2 lg:order-1">
              {/* Badge */}
              <div data-animate="fade-up" className="relative inline-flex items-center justify-center mb-6 lg:mb-8">
                <div className="absolute inset-0 rounded-full blur-sm bg-prime-gold/20 animate-pulse" />
                <div className="relative inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-prime-gold/40 bg-[#1A1A1A]/80 backdrop-blur-md text-prime-gold text-sm font-medium tracking-wide overflow-hidden shadow-lg">
                  <div className="absolute inset-0 w-8 bg-gradient-to-r from-transparent via-prime-gold/30 to-transparent animate-shimmer" />
                  <Shield size={16} className="relative z-10" />
                  <span className="relative z-10 font-heading">Kepercayaan dan Kualitas</span>
                </div>
              </div>

              <h1 data-animate="fade-up" className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                Temukan Properti Impian<br className="hidden lg:block" /> dengan{' '}
                <span className="text-prime-gold">Prime</span>
              </h1>

              <p data-animate="fade-up" className="text-gray-300 mb-10 max-w-xl text-lg sm:text-xl font-light leading-relaxed">
                Kami menyediakan layanan eksklusif untuk menemukan, berinvestasi, dan mengelola properti premium Anda dengan transparansi penuh.
              </p>

              <div data-animate="fade-up" className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#properti-unggulan"
                  className="bg-prime-gold text-prime-black px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(201,169,97,0.3)] flex items-center justify-center gap-2 w-full sm:w-auto active:scale-95"
                >
                  <Search size={20} /> Lihat Katalog
                </a>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border border-prime-gold text-prime-gold px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-prime-gold/10 transition-all flex items-center justify-center gap-2 w-full sm:w-auto active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  Konsultasi WA
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-1 lg:order-2 h-full z-20">
              <HeroImageScroll>
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-prime-gold/20 to-transparent rounded-[2rem] transform translate-x-4 translate-y-4" />
                  <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] aspect-[4/3] lg:aspect-square bg-[#222]">
                    <img
                      src="/hero.png"
                      alt="Prime Property"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-prime-black/80 via-transparent to-transparent" />
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -left-6 bg-[#1A1A1A]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-12 h-12 bg-prime-gold/20 rounded-full flex items-center justify-center">
                      <Building className="text-prime-gold" size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-prime-white font-heading text-xl">500+</div>
                      <div className="text-xs text-gray-400">Properti Terjual</div>
                    </div>
                  </div>
                </div>
              </HeroImageScroll>
            </div>
          </div>
        </section>

        {/* ─── PROPERTI UNGGULAN — Horizontal Carousel ─────────────────── */}
        <PropertyCarousel properties={featuredProperties} />

        {/* ─── MENGAPA PRIME ───────────────────────────────────────────── */}
        <section className="py-24 bg-prime-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
            <div data-animate="fade-up" className="text-center mb-16">
              <p className="text-prime-gold text-sm font-medium tracking-widest uppercase mb-3 font-sans">Keunggulan Kami</p>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-prime-white">
                Mengapa Prime Property?
              </h2>
              <div data-divider className="w-16 h-1 bg-prime-gold mx-auto rounded-full" />
            </div>

            <div data-stagger-parent className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="text-prime-gold" size={28} />,
                  title: 'Keamanan Terjamin',
                  desc: 'Setiap transaksi dan legalitas properti diverifikasi secara ketat untuk memastikan keamanan investasi Anda.',
                },
                {
                  icon: <TrendingUp className="text-prime-gold" size={28} />,
                  title: 'Investasi Menguntungkan',
                  desc: 'Kami memilih properti di lokasi strategis yang memiliki potensi kenaikan nilai yang tinggi di masa depan.',
                },
                {
                  icon: <Clock className="text-prime-gold" size={28} />,
                  title: 'Proses Cepat & Mudah',
                  desc: 'Layanan end-to-end yang efisien, mulai dari pencarian hingga serah terima kunci tanpa proses yang berbelit.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  data-stagger-child
                  className="group bg-[#111] p-8 rounded-2xl border border-white/8 hover:border-prime-gold/30 transition-all duration-300 hover:bg-[#161616]"
                >
                  <div className="w-14 h-14 bg-prime-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-prime-gold/20 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 text-prime-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ────────────────────────────────────────────── */}
        <Testimonials />

        {/* ─── ABOUT ───────────────────────────────────────────────────── */}
        <AboutSection />

        {/* ─── CONTACT ─────────────────────────────────────────────────── */}
        <ContactSection />
      </GsapProvider>
    </PublicLayout>
  );
}
