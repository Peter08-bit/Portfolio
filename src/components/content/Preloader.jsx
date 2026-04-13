import { useEffect, useState } from "react";
import { gsap } from "gsap";

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);

        // Délai puis animation de sortie
        setTimeout(() => {
          gsap.to("#preloader-overlay", {
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: onFinish,
          });
        }, 500);
      } else {
        setProgress(Math.round(p));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      id="preloader-overlay"
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center flex-col gap-8"
    >
      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[150px] top-[-100px] left-[-200px] rounded-full" />
      <div className="absolute w-[400px] h-[400px] bg-emerald-400/10 blur-[120px] bottom-[-80px] right-[-80px] rounded-full" />

      {/* Logo + Nom */}
      <div className="flex items-center gap-3 z-10">
        <img src="/AM.png" alt="logo" className="w-20 h-15" />
        {/*<p className="font-bold uppercase tracking-widest text-2xl text-white">
          Advin <span className="text-green-400">MAHASARO</span>
        </p>*/}
      </div>

      {/* Pourcentage */}
      <p className="z-10 text-xs text-white/40 tracking-[0.15em] uppercase">
        {progress < 100 ? `Chargement... ${progress}%` : "Bienvenue !"}
      </p>

      {/* Barre de progression */}
      <div className="z-10 w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-400 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Preloader;