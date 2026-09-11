"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Magnetic, SPRING } from "./motion-primitives";

/** Barra de progreso de scroll, arriba del todo. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/** Grano fino sobre todo el sitio: quita el plano digital de la pantalla. */
export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}

/** Cursor propio (solo ratón): anillo que se abre sobre lo que se puede tocar. */
export function Cursor() {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, label, input, .plan-card")));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <>
      <motion.div className="cursor-ring" style={{ x: ringX, y: ringY }} animate={{ scale: hovering ? 2.1 : 1 }} transition={SPRING} aria-hidden="true" />
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: hovering ? 0 : 1 }} transition={SPRING} aria-hidden="true" />
    </>
  );
}

/** Nav fijo que se esconde al bajar y vuelve al subir. */
export function SiteNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 40);
    setHidden(current > previous && current > 260);
  });

  return (
    <motion.nav
      className={`site-nav${scrolled ? " is-scrolled" : ""}`}
      initial={{ y: -110 }}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-links">
        <a href="#info">la fiesta</a>
        <a href="#registro">me apunto</a>
      </div>
      <Magnetic strength={0.5}>
        <a className="nav-ticket" href="#registro">me apunto ↗</a>
      </Magnetic>
    </motion.nav>
  );
}
