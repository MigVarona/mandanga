"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE, Reveal, riseIn, stagger } from "./motion-primitives";
import crewPhoto from "../../public/images/a509fd40-cb3e-495c-912f-3e415b35c175.jpeg";

export function Crew() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // La foto se mueve más despacio que el marco: paralaje de toda la vida.
  const photoY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.06, 1.12]);

  return (
    <section className="crew section-grid" id="organizadores">
      <div className="section-label">02 / quién lo monta</div>

      <div className="crew-content" ref={ref}>
        <div className="crew-media">
          <motion.div
            className="crew-frame"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="crew-photo" style={{ y: photoY, scale: photoScale }}>
              {/* Duotono a dos tintas, como una serigrafía. */}
              <div className="crew-layer">
                <Image
                  src={crewPhoto}
                  alt="Ana, Cris y Miguel, los organizadores de la fiesta"
                  placeholder="blur"
                  sizes="(max-width: 1000px) 90vw, 40vw"
                />
                <span className="crew-tint" />
                <span className="crew-halftone" />
              </div>
            </motion.div>

            {/* Cortinilla: el marco se destapa de arriba abajo al entrar. */}
            <motion.div
              className="crew-curtain"
              variants={{
                hidden: { scaleY: 1 },
                show: { scaleY: 0, transition: { duration: 1.1, ease: EASE } },
              }}
            />
          </motion.div>

          <div className="crew-badge" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="crew-circle" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" fill="none" />
              </defs>
              <text>
                <textPath href="#crew-circle">organizadores · ana · cris · miguel · </textPath>
              </text>
            </svg>
          </div>
        </div>

        <motion.div
          className="crew-copy"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.p className="eyebrow" variants={riseIn}>Organizadores</motion.p>
          <motion.h2 variants={riseIn}>Ana,<br /><i>Cris</i><br />y Miguel</motion.h2>
          <Reveal delay={0.15}>
            <p>Los tres que se han metido en el lío de montar esto. Cualquier duda, pregúntales.</p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
