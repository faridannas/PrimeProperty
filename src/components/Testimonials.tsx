"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Prime Property sangat profesional. Kami menemukan villa impian kami 5x lebih cepat.",
    by: "Alex, Pengusaha",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "Saya sangat yakin investasi saya aman bersama Prime. Pelayanan mereka tidak ada duanya.",
    by: "Dan, Investor",
    imgSrc: "https://i.pravatar.cc/150?img=2"
  },
  {
    tempId: 2,
    testimonial: "Kami sempat bingung mencari ruko strategis sebelum bertemu tim Prime. Terima kasih banyak!",
    by: "Stephanie, Pemilik Bisnis",
    imgSrc: "https://i.pravatar.cc/150?img=3"
  },
  {
    tempId: 3,
    testimonial: "Platform Prime Property membuat perencanaan masa depan keluarga menjadi sangat mulus.",
    by: "Marie, Ibu Rumah Tangga",
    imgSrc: "https://i.pravatar.cc/150?img=4"
  },
  {
    tempId: 4,
    testimonial: "Jika saya bisa memberi 11 bintang, saya akan berikan 12 untuk kualitas propertinya.",
    by: "Andre, Arsitek",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 5,
    testimonial: "SANGAT PUAS!!!! Mereka telah menghemat ratusan jam waktu saya untuk riset lokasi.",
    by: "Jeremy, Ekspatriat",
    imgSrc: "https://i.pravatar.cc/150?img=6"
  },
  {
    tempId: 6,
    testimonial: "Awalnya ragu, tapi setelah transaksi pertama, kami tidak mau pindah ke agen lain.",
    by: "Pam, Direktur Marketing",
    imgSrc: "https://i.pravatar.cc/150?img=7"
  },
  {
    tempId: 7,
    testimonial: "Analisis pasar dari Prime sangat mendalam. ROI yang saya dapatkan luar biasa tinggi.",
    by: "Daniel, Konsultan Finansial",
    imgSrc: "https://i.pravatar.cc/150?img=8"
  },
  {
    tempId: 8,
    testimonial: "Cukup satu kata: Sempurna.",
    by: "Fernando, Seniman",
    imgSrc: "https://i.pravatar.cc/150?img=9"
  },
  {
    tempId: 9,
    testimonial: "Saya beralih ke Prime 5 tahun lalu dan tidak pernah menyesal sedikitpun.",
    by: "Andy, Developer Properti",
    imgSrc: "https://i.pravatar.cc/150?img=10"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out font-playfair",
        isCenter 
          ? "z-10 bg-prime-gold text-prime-black border-prime-gold shadow-[0px_0px_30px_rgba(201,169,97,0.3)]" 
          : "z-0 bg-[#222222] text-gray-300 border-gray-800 hover:border-prime-gold/50 opacity-60 hover:opacity-100"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(0,0,0,0.5)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-prime-gold" : "bg-[#222222]"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-gray-800 object-cover object-top"
        style={{
          boxShadow: isCenter ? "3px 3px 0px rgba(0,0,0,0.2)" : "3px 3px 0px rgba(0,0,0,0.5)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-bold leading-relaxed",
        isCenter ? "text-prime-black" : "text-gray-200"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic font-sans",
        isCenter ? "text-prime-black/80 font-semibold" : "text-gray-500"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="py-24 bg-prime-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 text-center mb-16">
        <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-4 text-prime-white tracking-tight">Apa Kata Klien Kami</h2>
        <div className="w-16 h-1.5 bg-prime-gold mx-auto rounded-full"></div>
      </div>
      
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 500 }}
      >
        {testimonialsList.map((testimonial, index) => {
          const position = testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4">
          <button
            onClick={() => handleMove(-1)}
            className="flex h-12 w-12 items-center justify-center text-xl transition-all rounded-full bg-transparent border border-gray-600 text-gray-400 hover:bg-prime-gold hover:text-prime-black hover:border-prime-gold hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleMove(1)}
            className="flex h-12 w-12 items-center justify-center text-xl transition-all rounded-full bg-transparent border border-gray-600 text-gray-400 hover:bg-prime-gold hover:text-prime-black hover:border-prime-gold hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StaggerTestimonials;
