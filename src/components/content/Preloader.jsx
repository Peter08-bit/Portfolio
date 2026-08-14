import { useEffect, useState } from "react";
import { gsap } from "gsap";

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 12) + 4;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);

        setTimeout(() => {
          gsap.to("#preloader-overlay", {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: onFinish,
          });
        }, 250);
      } else {
        setProgress(p);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      id="preloader-overlay"
      className="fixed inset-0 z-[99999] bg-[#f8fafc] flex items-center justify-center flex-col gap-6 select-none"
    >
      {/* Halo subtil émeraude */}
      <div className="absolute w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Monogramme / Logo */}
      <div className="relative flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 p-2.5 shadow-lg flex items-center justify-center">
          <img src="/AM.png" alt="logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-display font-bold text-sm tracking-widest text-slate-800">
          ADVIN MAHASARO
        </span>
      </div>

      {/* Barre de progression fine & Compteur */}
      <div className="w-48 flex flex-col gap-2">
        <div className="w-full h-[2px] bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-slate-400">
          <span>Initialisation</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;