"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook GSAP untuk semua animasi global halaman utama:
 * - Fade-up reveal sections
 * - Staggered card animations
 * - Parallax backgrounds
 */
export function useGsapPageAnimations() {
  useEffect(() => {
    // ─── 1. Fade-up reveal untuk semua elemen berdata-animate ───────────
    const fadeEls = document.querySelectorAll("[data-animate='fade-up']");
    fadeEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // ─── 2. Stagger reveal untuk grup elemen berdata-stagger ────────────
    const staggerGroups = document.querySelectorAll("[data-stagger-parent]");
    staggerGroups.forEach((parent) => {
      const children = parent.querySelectorAll("[data-stagger-child]");
      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // ─── 3. Parallax pada glow / decorative blobs ────────────────────────
    const blobs = document.querySelectorAll("[data-parallax]");
    blobs.forEach((blob) => {
      const speed = parseFloat((blob as HTMLElement).dataset.parallax || "0.2");
      gsap.to(blob, {
        y: () => -window.innerHeight * speed,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });

    // ─── 4. Garis divider animasi muncul ────────────────────────────────
    const dividers = document.querySelectorAll("[data-divider]");
    dividers.forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
