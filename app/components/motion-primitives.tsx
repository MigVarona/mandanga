"use client";

import { CSSProperties, ReactNode, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, type Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const SPRING = { type: "spring" as const, stiffness: 240, damping: 28, mass: 0.9 };
export const SOFT_SPRING = { type: "spring" as const, stiffness: 90, damping: 22, mass: 1.1 };

/** Contenedor que escalona la entrada de sus hijos cuando entra en pantalla. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};

/** Hijo estándar: sube, aparece y se desenfoca. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(14px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
};

/** Línea de texto que sube desde detrás de una máscara. */
export const maskUp: Variants = {
  hidden: { y: "115%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  style?: CSSProperties;
};

/** Bloque que se revela una sola vez al entrar en el viewport. */
export function Reveal({ children, className, delay = 0, amount = 0.2, style }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export type Part = { text: string; className?: string };

/** Titular que entra palabra a palabra, cada una con su propia máscara. */
export function SplitWords({ parts, className, delay = 0, stagger: step = 0.045 }: {
  parts: Part[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = parts.flatMap((part, partIndex) =>
    part.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, className: part.className, key: `${partIndex}-${word}` })),
  );

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      {words.map((entry, index) => (
        <span className="word" key={`${entry.key}-${index}`}>
          <motion.span
            className={entry.className}
            variants={maskUp}
            transition={{ duration: 1, ease: EASE, delay: delay + index * step }}
          >
            {entry.word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}

/** Elemento que persigue al cursor con un muelle: el hover de toda la vida en Framer. */
export function Magnetic({ children, className, strength = 0.4, block = false }: {
  children: ReactNode;
  className?: string;
  strength?: number;
  block?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const reduced = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: block ? "block" : "inline-block" }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        x.set((event.clientX - (box.left + box.width / 2)) * strength);
        y.set((event.clientY - (box.top + box.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
