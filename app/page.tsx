import { Hero } from "./components/hero";
import { Marquee } from "./components/marquee";
import { Crew } from "./components/crew";
import { Plan } from "./components/plan";
import { Register } from "./components/register";
import { SiteFooter } from "./components/site-footer";
import { Cursor, Grain, ScrollProgress, SiteNav } from "./components/site-chrome";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Grain />
      <Cursor />
      <SiteNav />

      <Hero />

      <div className="stack">
        <section className="ticker" aria-label="Paella, DJs, amigos, Casa Vieja">
          <Marquee text="PAELLA · DJS · AMIGOS · CASA VIEJA · " baseVelocity={4} repeat={4} />
        </section>
        <Plan />
        <Crew />
        <Register />
        <SiteFooter />
      </div>
    </main>
  );
}
