"use client";

import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { EASE, Magnetic, Reveal, SPRING, riseIn, stagger } from "./motion-primitives";
import { IncludesDialog } from "./includes-dialog";
import { STAY_OPTIONS } from "./stay-options";

const CONFETTI = [
  { x: -140, y: -120, rotate: -35, color: "var(--acid)", size: 26 },
  { x: 150, y: -90, rotate: 28, color: "var(--pink)", size: 18 },
  { x: -90, y: 130, rotate: 48, color: "var(--blue)", size: 22 },
  { x: 120, y: 140, rotate: -18, color: "var(--acid)", size: 14 },
  { x: 190, y: 30, rotate: 12, color: "var(--ink)", size: 16 },
  { x: -180, y: 20, rotate: -52, color: "var(--pink)", size: 20 },
];

export function Register() {
  const ref = useRef<HTMLElement>(null);
  const [registered, setRegistered] = useState(false);
  const [stay, setStay] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const infoTrigger = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["22%", "-22%"]);
  const squareY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const squareRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegistered(true);
  }

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
            <AnimatePresence mode="wait" initial={false}>
              {registered ? (
                <motion.div
                  key="success"
                  className="success-message"
                  role="status"
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -18 }}
                  transition={SPRING}
                >
                  {CONFETTI.map((piece, index) => (
                    <motion.span
                      key={index}
                      className="confetti"
                      aria-hidden="true"
                      style={{ background: piece.color, width: piece.size, height: piece.size }}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                      animate={{ x: piece.x, y: piece.y, rotate: piece.rotate, scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.08 + index * 0.04 }}
                    />
                  ))}
                  <span className="success-number">¡EH!</span>
                  <h3>Qué alegría.</h3>
                  <p>Ya estás en la lista. Gracias por ayudarnos a saber cuántos seremos.</p>
                  <p className="success-note">Ahora ponte en contacto con nosotros para hacer el Bizum, así podemos ir gestionando las compras. ¡Gracias!</p>
                  <Magnetic strength={0.2} block>
                    <button type="button" onClick={() => setRegistered(false)}>Apuntar a otra persona</button>
                  </Magnetic>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -18 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="form-intro">
                    <h3>Apúntate aquí</h3>
                    <p>Confirma si vienes para que podamos organizar la fiesta.</p>
                  </div>

                  <fieldset className="stay-options">
                    <legend>Elige tu opción</legend>
                    <p className="stay-schedule">La fiesta es el sábado. Puedes llegar desde el viernes y pasar una o dos noches.</p>
                    <p className="stay-beds">Hay <strong>26 plazas en cama</strong>. Furgo y tienda, las que hagan falta.</p>
                    <div className="stay-info">
                      <p className="stay-includes">Alojamiento, paella del sábado, comida del domingo, DJs y, según cuántos nos apuntemos, también la bebida.</p>
                      <button ref={infoTrigger} className="info-button" type="button" onClick={() => setInfoOpen(true)}>
                        qué incluye <span>↗</span>
                      </button>
                    </div>
                    {STAY_OPTIONS.map((option) => (
                      <label className="stay-option" key={option.value}>
                        {stay === option.value && (
                          <motion.span className="stay-highlight" layoutId="stay-highlight" transition={SPRING} aria-hidden="true" />
                        )}
                        <input
                          type="radio"
                          name="stay"
                          value={option.value}
                          checked={stay === option.value}
                          onChange={() => setStay(option.value)}
                          required
                        />
                        <span><strong>{option.label}</strong></span>
                      </label>
                    ))}
                  </fieldset>

                  <label htmlFor="name">¿Cómo te llamamos?</label>
                  <input id="name" name="name" type="text" placeholder="Tu nombre" required />
                  <label htmlFor="guests">¿Cuántas personas venís?</label>
                  <input id="guests" name="guests" type="number" min="1" step="1" placeholder="1" required />
                  <label className="check-row"><input type="checkbox" required /> <span>Sí, cuenta conmigo (salvo catástrofe mayor)</span></label>

                  <Magnetic strength={0.2} block>
                    <motion.button className="submit-button" type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={SPRING}>
                      cuenta conmigo <span>↗</span>
                    </motion.button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>

      <IncludesDialog
        open={infoOpen}
        onClose={() => {
          setInfoOpen(false);
          infoTrigger.current?.focus();
        }}
      />
    </section>
  );
}
