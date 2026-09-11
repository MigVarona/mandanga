"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Marquee } from "./marquee";
import { Reveal } from "./motion-primitives";

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const markY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  return (
    <footer id="contacto" ref={ref}>
      <motion.div style={{ y: markY }}>
        <Marquee className="footer-marquee" text="tunkashila® mandanga · " baseVelocity={2.2} />
      </motion.div>
      <Reveal className="footer-bottom" amount={0.4}>
        <p>Casa Vieja, Ávila · Sábado 22 de mayo de 2027</p>
        <p className="footer-small">una fiesta hecha con amigos<br />para amigos</p>
      </Reveal>
    </footer>
  );
}
