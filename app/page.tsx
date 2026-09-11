"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [registered, setRegistered] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegistered(true);
  }

  return (
    <main>
      <nav className="site-nav">
        <a className="wordmark" href="#inicio" aria-label="Tunkashila 2027, inicio">
          tunkashila<span>®</span>
        </a>
        <div className="nav-links">
          <a href="#info">la fiesta</a>
          <a href="#registro">me apunto</a>
          <a href="#contacto">di hola</a>
        </div>
        <a className="nav-ticket" href="#registro">me apunto ↗</a>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Casa Vieja, Ávila · 22 de mayo de 2027</p>
          <h1>TUNKASHILA<br /><i>2027</i></h1>
          <p className="hero-note">Un día para vernos, compartir<br />y pasarlo bien.</p>
        </div>
        <div className="sunburst" aria-hidden="true"><span>una fiesta<br />hecha<br />con amigos<br />para<br />amigos</span></div>
        <div className="hero-sticker" aria-hidden="true">edición<br /><strong>01</strong></div>
        <div className="hero-footer">
          <span>paella · DJs · bailoteo</span>
          <span>© tunkashila</span>
          <span>desliza y apúntate ↓</span>
        </div>
      </section>

      <section className="ticker" aria-label="Anuncio">
        <div>JUNTOS SE ESTÁ MEJOR · VEN CON GANAS · JUNTOS SE ESTÁ MEJOR · VEN CON GANAS · </div>
      </section>

      <section className="intro section-grid" id="info">
        <div className="section-label">01 / el plan</div>
        <div className="intro-content">
          <p className="big-copy">Un fin de semana para <span>juntarnos sin prisa</span> y celebrar que seguimos aquí.</p>
          <div className="intro-details">
            <p>No hace falta saberlo todo todavía. Habrá paella, DJs, mesa larga y tiempo de sobra para ponernos al día. El resto saldrá sobre la marcha.</p>
            <a className="text-link" href="#registro">apúntame a la lista <span>↘</span></a>
          </div>
        </div>
      </section>

      <section className="register section-grid" id="registro">
        <div className="section-label">02 / quién se apunta</div>
        <div className="register-panel">
          <div className="register-heading">
            <p className="eyebrow">Para contar contigo</p>
            <h2>¿Te vienes<br /><i>a celebrarlo?</i></h2>
          </div>
          {registered ? (
            <div className="success-message" role="status">
              <span className="success-number">¡EH!</span>
              <h3>Qué alegría.</h3>
              <p>Ya estás en la lista. En breve te contamos todo lo que falta.</p>
              <button type="button" onClick={() => setRegistered(false)}>Apuntar a otra persona</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">¿Cómo te llamamos?</label>
              <input id="name" name="name" type="text" placeholder="Tu nombre" required />
              <label htmlFor="email">Tu correo</label>
              <input id="email" name="email" type="email" placeholder="para mandarte todos los detalles" required />
              <label className="check-row"><input type="checkbox" required /> <span>Sí, cuenta conmigo (salvo catástrofe mayor)</span></label>
              <button className="submit-button" type="submit">cuenta conmigo <span>↗</span></button>
            </form>
          )}
        </div>
      </section>

      <footer id="contacto">
        <div className="footer-mark">tunkashila<span>®</span></div>
        <p>Nos vemos por allí.<br /><a href="mailto:hola@mandanga2027.com">hola@mandanga2027.com</a></p>
        <p className="footer-small">instagram ↗<br />privacidad · cookies</p>
      </footer>
    </main>
  );
}
