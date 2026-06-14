import { CheckCircle2 } from 'lucide-react';
import PublicLayout from '@/components/PublicLayout';

export default function About() {
  const values = [
    { title: "Integritas", desc: "Menjunjung tinggi kejujuran dan transparansi dalam setiap transaksi." },
    { title: "Kualitas", desc: "Hanya menghadirkan properti dengan standar kualitas terbaik." },
    { title: "Profesionalisme", desc: "Melayani dengan sepenuh hati dan dedikasi tinggi." },
    { title: "Inovasi", desc: "Terus beradaptasi dengan teknologi untuk pengalaman yang lebih baik." }
  ];

  return (
    <PublicLayout>
    <div className="bg-prime-white">
      {/* Page Header */}
      <div className="bg-prime-black text-prime-white py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-prime-gold rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 text-center relative z-10">
          <h1 className="font-playfair text-5xl sm:text-6xl font-bold mb-6 tracking-tight">Tentang Kami</h1>
          <div className="w-16 h-1.5 bg-prime-gold mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Profil Section (2 columns on md/desktop) */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-prime-black">Profil Prime Property</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Prime Property didirikan dengan visi untuk merevolusi industri real estat di Indonesia. Kami bukan sekadar agen properti, melainkan mitra strategis Anda dalam menemukan rumah impian dan investasi properti yang menguntungkan.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Berbekal pengalaman bertahun-tahun, tim kami terdiri dari para ahli yang memahami dinamika pasar properti lokal maupun nasional. Kami berkomitmen memberikan layanan yang efisien, aman, dan berpusat pada kepuasan klien.
            </p>
          </div>
          <div className="bg-prime-gray p-8 sm:p-12 rounded-2xl border-l-4 border-prime-gold relative">
            <div className="text-6xl text-prime-gold/20 absolute top-4 left-6 font-serif">"</div>
            <p className="text-xl sm:text-2xl font-medium text-prime-black leading-snug relative z-10 italic">
              "Kami percaya bahwa setiap orang berhak mendapatkan tempat yang tidak hanya bisa disebut rumah, tetapi juga investasi masa depan yang gemilang."
            </p>
            <div className="mt-6 font-bold text-prime-black">— Founder, Prime Property</div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 bg-prime-black text-prime-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-prime-gold">Visi Kami</h2>
            <p className="text-gray-300 leading-relaxed">
              Menjadi perusahaan properti terdepan di Asia Tenggara yang dikenal karena integritas, inovasi, dan komitmen terhadap kualitas hidup masyarakat.
            </p>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-prime-gold">Misi Kami</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="text-prime-gold font-bold">•</span>
                <span>Menyediakan portfolio properti berkualitas tinggi yang memenuhi beragam kebutuhan masyarakat.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-prime-gold font-bold">•</span>
                <span>Memberikan layanan konsultasi properti yang transparan dan profesional.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-prime-gold font-bold">•</span>
                <span>Membangun hubungan jangka panjang yang saling menguntungkan dengan klien dan mitra kerja.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nilai Perusahaan */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-prime-black">Nilai Perusahaan</h2>
            <div className="w-16 h-1 bg-prime-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-prime-white border border-gray-200 p-6 rounded-xl hover:border-prime-gold hover:shadow-md transition-all">
                <CheckCircle2 className="text-prime-gold mb-4" size={32} />
                <h3 className="font-bold text-xl mb-2 text-prime-black">{val.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </PublicLayout>
  );
}
