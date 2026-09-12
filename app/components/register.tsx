"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, riseIn, stagger } from "./motion-primitives";
import { SignupCard } from "./signup-card";

export function Register() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["22%", "-22%"]);
  const squareY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const squareRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section className="register section-grid" id="registro" ref={ref}>
      <motion.div className="register-blob" style={{ y: blobY }} aria-hidden="true" />
      <motion.div className="register-square" style={{ y: squareY, rotate: squareRotate }} aria-hidden="true" />

      <div className="section-label">03 / quién se apunta</div>
      <div className="register-panel">
        <motion.div
          className="register-heading"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.p className="eyebrow" variants={riseIn}>Para organizar la fiesta</motion.p>
          <motion.h2 variants={riseIn}>¿Te<br /><i>apuntas?</i></motion.h2>
          <motion.p className="register-date" variants={riseIn}>
            <span>Sábado</span>
            <strong>22<br />mayo</strong>
            <span>Casa Vieja · Ávila</span>
          </motion.p>
        </motion.div>

        <div className="register-signup">
          <Reveal className="register-card-wrap" amount={0.15}>
            <SignupCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
