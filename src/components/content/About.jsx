import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import cvFile from "../../assets/CV-Peter-AdvinN8N.pdf";

const About = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".fade-up",
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  // Effet de typing amélioré et stable
  useEffect(() => {
    const words = ["Developer FullStack", "Workflow Automation N8N"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentWord = words[wordIndex];
      
      if (!isDeleting && charIndex <= currentWord.length) {
        setDisplayText(currentWord.substring(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(type, 100);
      } 
      else if (isDeleting && charIndex >= 0) {
        setDisplayText(currentWord.substring(0, charIndex));
        charIndex--;
        timeoutId = setTimeout(type, 50);
      }
      else if (!isDeleting && charIndex > currentWord.length) {
        setIsTypingComplete(true);
        timeoutId = setTimeout(() => {
          isDeleting = true;
          charIndex = currentWord.length;
          setIsTypingComplete(false);
          timeoutId = setTimeout(type, 50);
        }, 2000);
      }
      else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
        timeoutId = setTimeout(type, 200);
      }
    };

    type();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
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

  // Téléchargement du CV
  const handleDownloadCV = () => {
    try {
      const link = document.createElement("a");
      link.href = cvFile;
      link.download = "CV-Peter-Advin.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("Téléchargement démarré");
    } catch (error) {
      console.error("Erreur de téléchargement:", error);
    }
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

          {/* Bouton CV */}
          <button
            onClick={handleDownloadCV}
            className="fade-up inline-flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-500 text-sm sm:text-base bg-white/10 border-green-400 hover:bg-green-500/30 hover:shadow-[0_0_25px_rgba(0,255,150,0.4)] cursor-pointer group"
          >
            <span className="text-lg group-hover:animate-bounce">⬇️</span>
            Télécharger mon CV
          </button>
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

          {/* Typing - Version stable */}
          <div className="mt-4 min-h-[3rem]">
            <p className="text-base sm:text-lg text-green-400 font-medium">
              {displayText}
              {!isTypingComplete && (
                <span className="inline-block w-[2px] h-5 bg-green-400 ml-1 animate-pulse"></span>
              )}
            </p>
          </div>

          {/* Badge supplémentaire pour stabilité */}
          <div className="mt-3 flex gap-2 justify-center flex-wrap">
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
              React
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
              Node.js
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
              n8n
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;