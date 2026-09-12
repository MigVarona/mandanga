"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE, Magnetic, Reveal, SplitWords, stagger } from "./motion-primitives";

type Day = { day: string; date: string; title: string; copy: string; note?: string };

const DAYS: Day[] = [
  { day: "Viernes", date: "21 mayo", title: "Llegada", copy: "Quien pueda, que caiga pronto. Furgos, tiendas y las primeras cervezas mientras se monta todo." },
  { day: "Sábado", date: "22 mayo", title: "La fiesta", copy: "Paella al mediodía y DJs toda la tarde, hasta que el cuerpo aguante.", note: "Si te apetece pinchar, dínoslo para organizarlo." },
  { day: "Domingo", date: "23 mayo", title: "Comida tranquila", copy: "Sin prisa: nos levantamos cuando salga, comemos todos juntos y estiramos el domingo lo que haga falta." },
];

export function Plan() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.55], [0, 1]);

  return (
    <section className="intro section-grid" id="info">
      <div className="section-label">01 / el plan</div>
      <div className="intro-content" ref={ref}>
        <SplitWords
          className="big-copy"
          parts={[
            { text: "Un fin de semana para " },
            { text: "juntarnos", className: "accent" },
            { text: " y celebrar que seguimos aquí." },
          ]}
        />

        <div className="intro-details">
          <Reveal delay={0.1}>
            <p>No hace falta saberlo todo todavía. Habrá paella, DJs y tiempo de sobra para ponernos al día. El resto saldrá sobre la marcha.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <Magnetic strength={0.25}>
              <a className="text-link" href="#registro">apúntame a la lista <span>↘</span></a>
            </Magnetic>
          </Reveal>
        </div>

        <motion.div className="plan-line" style={{ scaleX: lineScale }} aria-hidden="true" />

        <motion.div
          className="plan-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          {DAYS.map((entry) => (
            <motion.article
              key={entry.day}
              className="plan-card"
              variants={{
                hidden: { opacity: 0, y: 60, rotate: -1.5 },
                show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.9, ease: EASE } },
              }}
              whileHover={{ y: -10, rotate: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <span className="plan-index">{entry.date}</span>
              <h3>{entry.day}</h3>
              <p className="plan-title">{entry.title}</p>
              <p>{entry.copy}</p>
              {entry.note && <p className="plan-note">{entry.note}</p>}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
