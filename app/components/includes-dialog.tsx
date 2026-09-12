"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { SPRING } from "./motion-primitives";
import { STAY_OPTIONS } from "./stay-options";

/** Popup con todo lo que hay que saber del precio: qué incluye y a dónde va el dinero. */
export function IncludesDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    // Bloqueamos el scroll de fondo sin que la página pegue un salto al perder la barra.
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="incluye-title"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={SPRING}
            onClick={(event) => event.stopPropagation()}
          >
            <button ref={closeRef} className="dialog-close" type="button" onClick={onClose} aria-label="Cerrar">×</button>

            <p className="eyebrow">Antes de apuntarte</p>
            <h3 id="incluye-title">Qué incluye</h3>

            <div className="dialog-block">
              <h4>Cuándo</h4>
              <p>La fiesta es el sábado 22 de mayo y es de día. Puedes llegar desde el viernes 21 y quedarte una o dos noches.</p>
            </div>

            <div className="dialog-block">
              <h4>Qué incluye el precio</h4>
              <p>Alojamiento, la paella del sábado, la comida del domingo y DJs. Y según cuántos nos apuntemos al final, también entra la bebida del fin de semana.</p>
            </div>

            <div className="dialog-block">
              <h4>Opciones</h4>
              <p>Hay 26 plazas en cama. Furgo y tienda no tienen límite: elige lo que más te apetezca.</p>
              <ul className="dialog-prices">
                {STAY_OPTIONS.map((option) => (
                  <li key={option.value}>{option.label}</li>
                ))}
              </ul>
            </div>

            <div className="dialog-block">
              <h4>A dónde va el dinero</h4>
              <p>Entre todos cubrimos los gastos de la fiesta: alojamiento, comida y DJs.</p>
              <p>Una vez cubiertos, el sobrante se destinará a comprar bebida para el fin de semana.</p>
              <p>Y si después de comprar la bebida queda algún sobrante, se devolverá entre todos los participantes.</p>
              <p className="dialog-highlight">Cuando te apuntes, ponte en contacto con nosotros para hacer el Bizum, así podemos ir gestionando las compras. ¡Gracias!</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
