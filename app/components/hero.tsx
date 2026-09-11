"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { EASE, maskUp, riseIn, SOFT_SPRING, stagger } from "./motion-primitives";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const sunSpin = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const stickerY = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);

  // Paralaje de ratón: los adornos flotan por detrás del puntero.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const floatX = useSpring(pointerX, SOFT_SPRING);
  const floatY = useSpring(pointerY, SOFT_SPRING);
  const sunDriftX = useTransform(floatX, (v) => v * -30);
  const sunDriftY = useTransform(floatY, (v) => v * -22);
  const stickerDriftX = useTransform(floatX, (v) => v * 44);
  const stickerDriftY = useTransform(floatY, (v) => v * 30);

  return (
    <section
      className="hero"
      id="inicio"
      ref={ref}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - box.left) / box.width - 0.5);
        pointerY.set((event.clientY - box.top) / box.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.div
        className="hero-copy"
        style={{ y: copyY, opacity: copyOpacity, scale: copyScale }}
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.p className="eyebrow" variants={riseIn}>Casa Vieja, Ávila</motion.p>
        <h1>
          <span className="line"><motion.span variants={maskUp}>TUNKASHILA</motion.span></span>
          <span className="line line-mandanga"><motion.span variants={maskUp}>MANDANGA</motion.span></span>
          <span className="line line-year"><motion.i variants={maskUp}>2027</motion.i></span>
        </h1>
        <motion.p className="hero-date" variants={riseIn}>Sábado 22 de mayo</motion.p>
        <motion.p className="hero-note" variants={riseIn}>Un día para vernos, compartir<br />y pasarlo bien.</motion.p>
      </motion.div>

      <motion.div className="sunburst" aria-hidden="true" style={{ y: sunY }}>
        <motion.div
          className="sunburst-inner"
          style={{ x: sunDriftX, y: sunDriftY }}
          initial={{ scale: 0.35, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
        >
          <motion.div className="sunburst-rot" style={{ rotate: sunSpin }}>
            <div className="sunburst-rays" />
          </motion.div>
          <span>una fiesta<br />hecha<br />con amigos<br />para<br />amigos</span>
        </motion.div>
      </motion.div>

      <motion.div className="hero-sticker" aria-hidden="true" style={{ y: stickerY }}>
        <motion.div
          className="hero-sticker-inner"
          style={{ x: stickerDriftX, y: stickerDriftY }}
          initial={{ scale: 0, rotate: 28 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ type: "spring", stiffness: 190, damping: 12, delay: 0.7 }}
          whileHover={{ scale: 1.14, rotate: 5 }}
        >
          edición<br /><strong>01</strong>
        </motion.div>
      </motion.div>

      <motion.div className="hero-footer" initial="hidden" animate="show" variants={stagger} transition={{ delayChildren: 0.6 }}>
        <motion.span variants={riseIn}>paella · DJs · bailoteo</motion.span>
        <motion.span variants={riseIn}>© tunkashila</motion.span>
        <motion.span className="hero-scroll" variants={riseIn}>
          desliza y apúntate
          <motion.i animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>↓</motion.i>
        </motion.span>
      </motion.div>
    </section>
  );
}
