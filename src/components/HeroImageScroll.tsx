"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function HeroImageScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Animasi saat di-scroll ke bawah: gambar akan miring ke belakang
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const scaleScroll = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const yScroll = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full" 
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          rotateX,
          scale: scaleScroll,
          y: yScroll,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        <motion.div
          className="w-full h-full"
          initial={isMounted ? false : { opacity: 0, y: 50, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
