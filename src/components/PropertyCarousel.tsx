"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Property {
  id: string;
  name: string;
  kawasan: string;
  tipe: string;
  lebar: number;
  panjang: number;
  tingkat: number;
  carport: boolean;
  status: string;
  price: number;
}

interface PropertyCarouselProps {
  properties: Property[];
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  in_stock: { label: "Tersedia", color: "bg-emerald-400 text-emerald-950 shadow-md" },
  indent: { label: "Inden", color: "bg-amber-400 text-amber-950 shadow-md" },
  sold_out: { label: "Terjual", color: "bg-[#B33A3A] text-white shadow-md" },
};

const PROPERTY_IMAGES: Record<string, string> = {
  Ruko: "/ruko.png",
  Villa: "/villa.png",
};

export default function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const track = trackRef.current;
    if (!section || !title || !track) return;

    // Title reveal animation
    gsap.fromTo(
      title,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cards stagger animation on scroll
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 80, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: track,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleCardHover = (card: HTMLDivElement | null, enter: boolean) => {
    if (!card) return;
    gsap.to(card, {
      y: enter ? -8 : 0,
      scale: enter ? 1.015 : 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const scrollTrack = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 320 : 350;
      trackRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="properti-unggulan"
      className="py-24 bg-prime-black overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 mb-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-prime-gold text-sm font-medium tracking-widest uppercase mb-3 font-sans">
              Koleksi Pilihan
            </p>
            <h2
              ref={titleRef}
              className="font-playfair text-4xl sm:text-5xl font-bold text-prime-white leading-tight opacity-0"
            >
              Properti Unggulan
            </h2>
          </div>
          <Link
            href="/agent/login"
            className="hidden sm:inline-flex items-center gap-2 text-prime-gold border border-prime-gold/30 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-prime-gold/10 transition-all shrink-0"
          >
            Lihat Semua
          </Link>
        </div>
        {/* Gold divider */}
        <div data-divider className="mt-6 w-16 h-1 bg-prime-gold rounded-full" />
      </div>

      {/* Horizontal Scroll Track Wrapper */}
      <div className="relative group">
        <button 
          onClick={() => scrollTrack('left')}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#111111]/80 backdrop-blur-md border border-white/40 hover:bg-white/10 hover:border-white text-white rounded-full hidden sm:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        
        <button 
          onClick={() => scrollTrack('right')}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#111111]/80 backdrop-blur-md border border-white/40 hover:bg-white/10 hover:border-white text-white rounded-full hidden sm:flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
        </button>

        {/* Scroll Track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto px-4 sm:px-8 md:px-16 pb-6 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
        {properties.map((item, i) => {
          const statusInfo = STATUS_LABELS[item.status] || {
            label: item.status,
            color: "bg-gray-500/20 text-gray-400",
          };
          const imgSrc = PROPERTY_IMAGES[item.tipe] || "/hero.png";

          return (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              onMouseEnter={(e) =>
                handleCardHover(e.currentTarget as HTMLDivElement, true)
              }
              onMouseLeave={(e) =>
                handleCardHover(e.currentTarget as HTMLDivElement, false)
              }
              style={{ scrollSnapAlign: "start", minWidth: "300px" }}
              className="group relative bg-[#111111] border border-white/8 rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 w-[300px] sm:w-[320px]"
            >
              <Link href="/agent/login" className="block">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                  {/* Status badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full ${statusInfo.color}`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-prime-gold/20 text-prime-gold border border-prime-gold/30 backdrop-blur-sm">
                      {item.tipe}
                    </span>
                  </div>

                  {/* ID on bottom of image */}
                  <div className="absolute bottom-3 left-3 text-xs text-white/50 font-mono">
                    #{item.id}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="font-playfair text-lg font-bold text-prime-white mb-1 group-hover:text-prime-gold transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                    <MapPin size={13} />
                    <span>{item.kawasan}</span>
                  </div>

                  {/* Specs row */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-5 border-t border-white/5 pt-4">
                    <span className="flex flex-col items-center gap-0.5">
                      <span className="text-white font-semibold text-sm">
                        {item.lebar}m
                      </span>
                      <span>Lebar</span>
                    </span>
                    <div className="w-px h-8 bg-white/10" />
                    <span className="flex flex-col items-center gap-0.5">
                      <span className="text-white font-semibold text-sm">
                        {item.panjang}m
                      </span>
                      <span>Panjang</span>
                    </span>
                    <div className="w-px h-8 bg-white/10" />
                    <span className="flex flex-col items-center gap-0.5">
                      <span className="text-white font-semibold text-sm">
                        {item.tingkat}
                      </span>
                      <span>Lantai</span>
                    </span>
                    {item.carport && (
                      <>
                        <div className="w-px h-8 bg-white/10" />
                        <span className="flex flex-col items-center gap-0.5">
                          <span className="text-prime-gold text-sm">✓</span>
                          <span>Carport</span>
                        </span>
                      </>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <p className="font-playfair text-prime-gold font-bold text-xl">
                      {formatPrice(item.price)}
                    </p>
                    <div className="w-8 h-8 rounded-full border border-prime-gold/30 flex items-center justify-center group-hover:bg-prime-gold group-hover:border-prime-gold transition-all">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-prime-gold group-hover:text-prime-black transition-colors rotate-[-45deg]"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="mt-8 text-center sm:hidden px-4">
        <Link
          href="/agent/login"
          className="inline-flex items-center gap-2 text-prime-gold border border-prime-gold/30 px-6 py-3 rounded-full text-sm font-medium hover:bg-prime-gold/10 transition-all"
        >
          Lihat Semua Properti
        </Link>
      </div>
    </section>
  );
}
