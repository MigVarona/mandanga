"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from "motion/react";

const COPIES = 4;

/**
 * Cinta infinita que reacciona al scroll: acelera al bajar y se da la vuelta al subir.
 */
export function Marquee({ text, baseVelocity = 3, className = "", repeat = 1 }: {
  text: string;
  baseVelocity?: number;
  className?: string;
  /** Veces que se repite el texto dentro de cada copia, para que nunca se vea el hueco. */
  repeat?: number;
}) {
  const baseX = useMotionValue(0);
  const direction = useRef(1);
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], { clamp: false });
  const x = useTransform(baseX, (value) => `${wrap(-100 / COPIES, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`marquee ${className}`.trim()}>
      <motion.div className="marquee-track" style={{ x }}>
        {Array.from({ length: COPIES }, (_, index) => (
          <span key={index} aria-hidden={index > 0 || undefined}>{text.repeat(repeat)}</span>
        ))}
      </motion.div>
    </div>
  );
}
