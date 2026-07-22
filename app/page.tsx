import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-page">
      <div className="ambient-glow ambient-glow-one" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-two" aria-hidden="true" />

      <section className="hero" aria-labelledby="landing-title">
        <p className="eyebrow">Tua nova comunidade para adultos</p>

        <h1 id="landing-title" className="brand-name">
          Fervo<span>Social</span>
        </h1>

        <p className="tagline">
          Conexões reais. <span>No seu ritmo.</span>
        </p>

        <Link className="primary-action" href="/login">
          Entrar
        </Link>

        <p className="coming-soon" aria-live="polite">
          Em breve
        </p>
      </section>

      <p className="age-note">Exclusivo para maiores de 18 anos</p>
    </main>
  );
}
