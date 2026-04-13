import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    document.documentElement.style.setProperty("--x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--y", `${e.clientY}px`);
  };

  // ✅ animation intro
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(textRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    )
    .fromTo(btnRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 },
      "-=0.5"
    );
  }, []);

  // ✅ scroll function (comme Navbar)
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: el, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center px-6 text-center relative"
    >
      <div className="max-w-4xl space-y-6 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(0,255,150,0.15),transparent_40%)]">

        {/* Badge */}
        <div className="inline-block px-4 py-1 border border-green-400/30 rounded-full text-green-400 text-sm bg-green-500/10 backdrop-blur">
          🚀 Available for freelance
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          <span className="text-white">Créez des applications intelligentes</span>
          <br />
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Automatisez tout
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={textRef}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Prêt à créer des solutions intelligentes ? Je suis développeur logiciel passionné,
          spécialisé dans la conception d’applications performantes et dans l’automatisation de processus avec n8n.
          Discutons de la manière dont mes compétences peuvent optimiser vos flux de travail et accélérer la réussite de vos projets.
        </p>

        {/* ✅ BUTTONS CORRIGÉS */}
        <div ref={btnRef} className="flex justify-center gap-4 flex-wrap">

          <button
            onClick={() => scrollToSection("projet")}
            className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg
            shadow-[0_0_25px_rgba(34,197,94,0.6)]
            hover:scale-105 transition"
          >
            Voir mes projets
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-6 py-3 border border-green-400 text-green-400 rounded-lg
            hover:bg-green-500/10 transition"
          >
            Me contacter
          </button>

        </div>

      </div>
    </section>
  );
};

export default Hero;