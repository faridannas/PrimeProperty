"use client";
import { useGsapPageAnimations } from "@/hooks/useGsapPageAnimations";

export default function GsapProvider({ children }: { children: React.ReactNode }) {
  useGsapPageAnimations();
  return <>{children}</>;
}
