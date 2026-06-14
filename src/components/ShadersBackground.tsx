"use client"

import { LiquidMetal } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

export default function ShadersBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-80">
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ opacity: 0.6, scale: 1.05, rotate: 2 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      >
        <LiquidMetal
          style={{ width: "100%", height: "100%", filter: "blur(20px)" }}
          colorBack="hsl(0, 0%, 10%)"
          colorTint="hsl(42, 60%, 25%)"
          repetition={3}
          softness={0.8}
          shiftRed={0.3}
          shiftBlue={0.1}
          distortion={0.15}
          contour={1.2}
          shape="none"
          offsetX={0}
          offsetY={0}
          scale={1.5}
          rotation={25}
          speed={1.5}
        />
      </motion.div>
    </div>
  )
}
