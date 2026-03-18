"use client";

import { useEffect, useState, useRef } from "react";

/* ───────── Animated Counter Hook ───────── */
function useCounter(end: number, duration = 2000, suffix = "") {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count: `${count.toLocaleString("fr-FR")}${suffix}`, ref };
}

/* ───────── Scroll Reveal Hook ───────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ───────── Icons (inline SVG) ───────── */
const icons = {
  document: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9 9 0 0 1 3 12c0-1.47.353-2.856.978-4.082" />
    </svg>
  ),
  bolt: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  ),
  code: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  ),
  chart: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  ),
  sparkle: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
};

/* ───────── Features Data ───────── */
const features = [
  {
    icon: icons.document,
    title: "Création de Documents",
    desc: "Générez des rapports Word, présentations PowerPoint, tableurs Excel et PDF en quelques secondes. Formatage professionnel automatique.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: icons.globe,
    title: "Navigation Web Intelligente",
    desc: "Recherchez, naviguez et extrayez des informations du web. Remplissez des formulaires et automatisez vos tâches en ligne.",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: icons.bolt,
    title: "Automatisation Avancée",
    desc: "Planifiez des tâches récurrentes, créez des workflows automatisés et laissez Claude travailler pour vous 24h/24.",
    color: "from-amber-500 to-orange-400",
  },
  {
    icon: icons.code,
    title: "Génération de Code",
    desc: "Applications web, scripts, APIs — Claude écrit, teste et déploie du code production-ready directement depuis votre bureau.",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: icons.chart,
    title: "Analyse de Données",
    desc: "Transformez vos données brutes en insights actionnables avec des visualisations, tableaux et analyses statistiques.",
    color: "from-rose-500 to-pink-400",
  },
  {
    icon: icons.sparkle,
    title: "Plugins & Intégrations",
    desc: "Connectez Slack, Google Drive, Jira et des dizaines d'autres services. Étendez les capacités de Claude sans limites.",
    color: "from-violet-500 to-indigo-400",
  },
];

/* ───────── Use Cases Data ───────── */
const useCases = [
  {
    quote: "J'ai demandé à Cowork de créer un deck de 20 slides pour mon pitch investisseur. En 3 minutes, c'était prêt — avec des graphiques, un design pro et des speaker notes. Bluffant.",
    author: "Marie L.",
    role: "Fondatrice de startup",
    avatar: "ML",
  },
  {
    quote: "Je lance Cowork chaque matin pour qu'il me fasse un résumé de mes emails, prépare mon agenda et compile les KPIs du jour. C'est comme avoir un assistant personnel surpuissant.",
    author: "Thomas R.",
    role: "Directeur Commercial",
    avatar: "TR",
  },
  {
    quote: "En tant que développeur, Cowork me fait gagner des heures chaque semaine. Il génère du code, écrit les tests, et peut même déployer directement. Révolutionnaire.",
    author: "Sophie M.",
    role: "Lead Developer",
    avatar: "SM",
  },
];

/* ═══════════════════════════════════════════ */
/*                 MAIN PAGE                  */
/* ═══════════════════════════════════════════ */
export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Stats */
  const stat1 = useCounter(50, 2000, "+");
  const stat2 = useCounter(10, 2000, "x");
  const stat3 = useCounter(500, 2500, "K");
  const stat4 = useCounter(99, 1800, "%");

  /* Section reveals */
  const featuresReveal = useReveal();
  const statsReveal = useReveal();
  const useCasesReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ───────── NAV ───────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Claude <span className="gradient-text">Cowork</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
            <a href="#features" className="hover:text-text-primary transition-colors">Fonctionnalités</a>
            <a href="#stats" className="hover:text-text-primary transition-colors">Chiffres</a>
            <a href="#usecases" className="hover:text-text-primary transition-colors">Cas d&apos;usage</a>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium hover:shadow-lg hover:shadow-accent-purple/25 transition-all duration-300 hover:scale-105"
            >
              Essayer Cowork
            </a>
          </div>
        </div>
      </nav>

      {/* ───────── HERO ───────── */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient pt-20">
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-blue/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-coral/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-text-secondary mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Propulsé par Claude Opus 4.6
            </div>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-8 animate-slide-up"
          >
            Votre bureau,
            <br />
            <span className="gradient-text">réinventé par l&apos;IA</span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Claude Cowork transforme votre ordinateur en espace de travail intelligent.
            Créez des documents, naviguez le web, générez du code et analysez vos données —
            le tout par simple conversation.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-lg hover:shadow-xl hover:shadow-accent-purple/30 transition-all duration-300 hover:scale-105"
            >
              Commencer gratuitement
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full border border-border text-text-secondary hover:text-text-primary hover:border-accent-blue/50 transition-all duration-300"
            >
              Découvrir les fonctionnalités
            </a>
          </div>

          {/* Terminal-like preview */}
          <div
            className="mt-16 max-w-2xl mx-auto glass-card rounded-2xl p-1 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="bg-bg-primary rounded-xl p-6 font-mono text-sm text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-text-secondary text-xs">Claude Cowork</span>
              </div>
              <div className="space-y-2">
                <p><span className="text-accent-purple">Tom →</span> <span className="text-text-secondary">Crée-moi une landing page Next.js et déploie-la sur Vercel</span></p>
                <p><span className="text-accent-blue">Claude →</span> <span className="text-green-400">✓</span> <span className="text-text-secondary">Projet créé, page construite, déployé sur</span> <span className="text-accent-warm">cowork-demo.vercel.app</span></p>
                <div className="w-3 h-5 bg-accent-blue/60 animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-text-secondary">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* ───────── FEATURES ───────── */}
      <section id="features" className="relative py-32 section-gradient" ref={featuresReveal.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-20 transition-all duration-1000 ${featuresReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tout ce dont vous avez besoin,
              <br />
              <span className="gradient-text">dans une seule conversation</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Claude Cowork combine la puissance de l&apos;IA avec un accès direct à votre ordinateur
              pour accomplir des tâches complexes en autonomie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`glass-card rounded-2xl p-8 transition-all duration-700 hover:scale-[1.02] cursor-default ${
                  featuresReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 text-white`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── STATS ───────── */}
      <section id="stats" className="relative py-32" ref={statsReveal.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Des résultats qui <span className="gradient-text">parlent d&apos;eux-mêmes</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { ref: stat1.ref, count: stat1.count, label: "Types de fichiers supportés", icon: "📄" },
              { ref: stat2.ref, count: stat2.count, label: "Gain de productivité", icon: "⚡" },
              { ref: stat3.ref, count: stat3.count, label: "Tâches automatisées", icon: "🤖" },
              { ref: stat4.ref, count: stat4.count, label: "Satisfaction utilisateur", icon: "💜" },
            ].map((s, i) => (
              <div
                key={i}
                ref={s.ref}
                className={`glass-card rounded-2xl p-8 text-center transition-all duration-700 ${
                  statsReveal.visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{s.count}</div>
                <div className="text-text-secondary text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── USE CASES ───────── */}
      <section id="usecases" className="relative py-32 section-gradient" ref={useCasesReveal.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-20 transition-all duration-1000 ${useCasesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ils utilisent <span className="gradient-text">Cowork au quotidien</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Des professionnels de tous horizons font confiance à Claude Cowork
              pour transformer leur façon de travailler.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className={`glass-card rounded-2xl p-8 transition-all duration-700 hover:scale-[1.02] ${
                  useCasesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-center gap-1 mb-6">
                  {Array(5).fill(0).map((_, j) => (
                    <svg key={j} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-8 italic">&ldquo;{uc.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-sm">
                    {uc.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{uc.author}</div>
                    <div className="text-text-secondary text-sm">{uc.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-6">
<div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple comme <span className="gradient-text">bonjour</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Trois étapes suffisent pour transformer votre productivité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Ouvrez Cowork", desc: "Lancez Claude Desktop et activez le mode Cowork. Votre assistant est prêt.", color: "from-accent-blue to-cyan-400" },
              { step: "02", title: "Décrivez votre tâche", desc: "Expliquez ce que vous voulez en langage naturel. Pas de syntaxe compliquée.", color: "from-accent-purple to-pink-400" },
              { step: "03", title: "Laissez Claude agir", desc: "Claude travaille en autonomie et vous livre le résultat. Révisez et validez.", color: "from-accent-coral to-orange-400" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} text-white text-2xl font-bold mb-6 shadow-lg`}>
                  {s.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="relative py-32" ref={ctaReveal.ref}>
        <div className="max-w-4xl mx-auto px-6">
          <div
            className={`cta-gradient rounded-3xl p-12 md:p-16 text-center border border-border transition-all duration-1000 ${
              ctaReveal.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-ring" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Prêt à transformer votre
                <br />
                <span className="gradient-text">façon de travailler ?</span>
              </h2>
              <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
                Rejoignez des milliers de professionnels qui ont adopté Claude Cowork
                pour décupler leur productivité.
              </p>
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-lg hover:shadow-2xl hover:shadow-accent-purple/30 transition-all duration-300 hover:scale-105"
              >
                Démarrer maintenant
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Claude Cowork</span>
              </div>
              <p className="text-text-secondary max-w-md leading-relaxed">
                L&apos;assistant IA qui travaille à vos côtés.
                Propulsé par Anthropic, conçu pour les professionnels exigeants.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <div className="space-y-3 text-text-secondary text-sm">
                <a href="#features" className="block hover:text-text-primary transition-colors">Fonctionnalités</a>
                <a href="#stats" className="block hover:text-text-primary transition-colors">Performances</a>
                <a href="#usecases" className="block hover:text-text-primary transition-colors">Cas d&apos;usage</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <div className="space-y-3 text-text-secondary text-sm">
                <a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer" className="block hover:text-text-primary transition-colors">Documentation</a>
                <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer" className="block hover:text-text-primary transition-colors">Anthropic</a>
                <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="block hover:text-text-primary transition-colors">Claude.ai</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-text-secondary text-sm">
            <p>© 2026 Claude Cowork — Propulsé par Anthropic</p>
            <p>Construit avec ❤️ par Claude Cowork lui-même</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
