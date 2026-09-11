"use client";

import { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/** Ajustes globales de animación: respetamos la preferencia de movimiento reducido. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
