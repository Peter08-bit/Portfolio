import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import cvFile from "../../assets/CV2.pdf";

const About = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".fade-up",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const words = ["Developer FullStack & Developpeur N8N"];
    let i = 0;
    let j = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = words[i];
      if (textRef.current) {
        textRef.current.textContent = currentWord.substring(0, j);
      }
      if (!isDeleting) {
        j++;
        if (j === currentWord.length) {
          isDeleting = true;
          setTimeout(type, 1000);
          return;
        }
      } else {
        j--;
        if (j === 0) {
          isDeleting = false;
          i = (i + 1) % words.length;
        }
      }
      setTimeout(type, isDeleting ? 50 : 100);
    };

    type();
  }, []);

  const handleMouseMove = (e) => {
    const card = containerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    document.documentElement.style.setProperty("--x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    const rotateX = -(y - rect.height / 2) / 20;
    const rotateY = (x - rect.width / 2) / 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const resetTransform = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = "rotateX(0) rotateY(0) scale(1)";
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = cvFile;
    link.setAttribute("download", "CV2.pdf");
    document.body.appendChild(link);   // ✅ IMPORTANT
    link.click();
    document.body.removeChild(link);   // ✅ nettoyage
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center px-4 sm:px-8 md:px-16 py-16 text-white relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(0,255,150,0.15),transparent_40%)]" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full relative z-10">

        {/* LEFT — texte */}
        <div className="order-2 md:order-1 space-y-6">
          <div className="fade-up inline-block px-4 py-1 text-sm border border-green-400 rounded-full bg-white/5 backdrop-blur">
            ⭐ Mon profile
          </div>

          <h1 className="fade-up text-2xl md:text-3xl font-bold">
            <span className="text-green-400">A propos de moi</span>
          </h1>

          <p className="fade-up text-sm sm:text-base text-white/70 leading-relaxed">
            Développeur logiciel spécialisé dans la conception d'applications robustes et évolutives,
            j'intègre également des solutions d'automatisation avec n8n pour optimiser les processus.
            Rigoureux et orienté résultats, je transforme des idées complexes en solutions performantes,
            du concept au déploiement, tout en garantissant un code propre, maintenable et efficace.
          </p>

          {/* ✅ BOUTON CV CORRIGÉ */}
          <a
            href={cvFile}
            download="CV-Peter-Advin.pdf"
            className="fade-up inline-flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-500 text-sm sm:text-base bg-white/10 border-green-400 hover:bg-green-500/30 hover:shadow-[0_0_25px_rgba(0,255,150,0.4)]"
          >
            ⬇️ Télécharger mon CV
          </a>
        </div>

        {/* RIGHT — carte avatar */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTransform}
          className="order-1 md:order-2 relative flex flex-col items-center justify-center
          w-full max-w-sm sm:max-w-md mx-auto text-center
          bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8
          transition-all duration-200 shadow-[0_0_40px_rgba(0,255,150,0.15)]"
          style={{
            background: `
              radial-gradient(circle at var(--mx) var(--my), rgba(0,255,150,0.25), transparent 60%),
              rgba(255,255,255,0.05)
            `,
          }}
        >
          {/* Dots déco */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>

          {/* Avatar */}
          <div className="relative mb-6 mt-4">
            <div className="absolute w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border border-green-400 animate-ping opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] rounded-full overflow-hidden border-4 border-green-400 shadow-[0_0_30px_rgba(0,255,150,0.6)]">
              <img src="/img.jpg" alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Nom */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            <span className="text-green-400">RANDRIAMAHASARO</span>
            <br />
            <span className="text-green-400">Peter Advin</span>
          </h2>

          {/* Typing */}
          <p ref={textRef} className="mt-4 text-base sm:text-lg text-green-400 min-h-[1.5em]"></p>
        </div>

      </div>
    </section>
  );
};

export default About;