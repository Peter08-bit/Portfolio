import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import cvFile from "../../assets/CV-MAHASARO.pdf";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/* ── Helpers ──────────────────────────────────────────── */
/** Découpe un string en <span> par mot pour l'animation */
const splitWords = (el) => {
  if (!el) return [];
  const words = el.innerText.split(" ");
  el.innerHTML = "";
  return words.map((word) => {
    const outer = document.createElement("span");
    outer.className = "word-reveal";
    const inner = document.createElement("span");
    inner.textContent = word + "\u00A0";
    outer.appendChild(inner);
    el.appendChild(outer);
    return inner;
  });
};

const metrics = [
  { label: "Années d'expérience", value: 3,   suffix: "+",  id: "stat-exp" },
  { label: "Projets délivrés",    value: 20,  suffix: "+",  id: "stat-proj" },
  { label: "Technologies",        value: 15,  suffix: "+",  id: "stat-tech" },
  { label: "Engagement qualité",  value: 100, suffix: "%",  id: "stat-qual" },
];

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef     = useRef(null);
  const textRef      = useRef(null);
  const btnRef       = useRef(null);
  const badgeRef     = useRef(null);
  const statsRef     = useRef(null);
  const canvasRef    = useRef(null);

  /* ── Canvas particules ───────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x       = Math.random() * canvas.width;
        this.y       = Math.random() * canvas.height;
        this.size    = Math.random() * 1.4 + 0.4;
        this.speedX  = (Math.random() - 0.5) * 0.22;
        this.speedY  = (Math.random() - 0.5) * 0.22;
        this.opacity = Math.random() * 0.22 + 0.04;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16,185,129,${0.055 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    /* Parallax canvas au scroll */
    const parallaxTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        if (canvas) canvas.style.transform = `translateY(${self.progress * 60}px)`;
      },
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      parallaxTrigger.kill();
    };
  }, []);

  /* ── Timeline d'entrée cinématique ───────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1. Split le titre en mots */
      const wordSpans = splitWords(titleRef.current);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* Badge */
      tl.fromTo(badgeRef.current,
        { y: 24, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7 }
      )
      /* Mots du titre — reveal par clip-path */
      .fromTo(wordSpans,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.75, stagger: 0.06, ease: "expo.out" },
        "-=0.3"
      )
      /* Texte de description */
      .fromTo(textRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        "-=0.4"
      )
      /* Boutons */
      .fromTo(Array.from(btnRef.current?.children || []),
        { y: 18, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
        "-=0.4"
      )
      /* Cartes stats */
      .fromTo(Array.from(statsRef.current?.children || []),
        { y: 28, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.09, ease: "back.out(1.4)" },
        "-=0.35"
      );

      /* Counter-up sur les valeurs des métriques */
      metrics.forEach(({ id, value }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 1.8,
          ease: "power2.out",
          delay: 1.1,
          snap: { val: 1 },
          onUpdate: () => { el.textContent = Math.round(obj.val); },
        });
      });

      /* Floating subtle sur les cartes stats */
      Array.from(statsRef.current?.children || []).forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -7 : -4,
          duration: 2.8 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ── Scroll smooth ───────────────────────────────── */
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    gsap.to(window, { duration: 0.95, scrollTo: { y: el, offsetY: 70 }, ease: "power3.inOut" });
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[88vh] w-full flex items-center justify-center px-4 sm:px-6 pt-10 pb-14 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />

      {/* Halos d'ambiance */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-emerald-500/[0.07] via-teal-500/[0.04] to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] -left-48 w-[450px] h-[450px] bg-emerald-500/[0.03] blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center">

        {/* Badge */}
        <div ref={badgeRef} className="mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium tracking-wide text-slate-700">
              Développeur Full-Stack &amp; Mobile — Disponible pour nouveaux projets
            </span>
          </div>
        </div>

        {/* Titre — words splitté par JS */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-5"
        >
          Concevoir des architectures{" "}
          <span className="text-gradient-emerald">élégantes &amp; performantes</span>
        </h1>

        {/* Description */}
        <p ref={textRef} className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8">
          Je suis <span className="text-slate-900 font-semibold">Advin Mahasaro</span>, ingénieur logiciel
          spécialisé en React, Node.js, React Native et automatisation n8n.
        </p>

        {/* Boutons */}
        <div ref={btnRef} className="flex flex-wrap items-center justify-center gap-3 mb-14 w-full max-w-sm">
          <button
            onClick={() => scrollToSection("projet")}
            className="btn-shimmer flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-[0_4px_16px_rgba(16,185,129,0.32)] hover:shadow-[0_6px_22px_rgba(16,185,129,0.48)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Explorer mes projets</span>
            <FaArrowRight size={12} />
          </button>
          <a
            href={cvFile}
            download="CV-Advin-MAHASARO.pdf"
            className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-emerald-300 hover:shadow-[0_0_12px_rgba(16,185,129,0.12)] shadow-sm transition-all"
          >
            <FaDownload size={12} className="text-emerald-600" />
            <span>Télécharger CV</span>
          </a>
        </div>

        {/* Métriques avec counter */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
          {metrics.map((item) => (
            <div
              key={item.id}
              className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center"
            >
              <span className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight mb-1">
                <span id={item.id}>0</span>
                <span className="text-emerald-600">{item.suffix}</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;