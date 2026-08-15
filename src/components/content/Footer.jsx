import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import { HiOutlineArrowUp } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power3.inOut" });
  };

  const navLinks = [
    { label: "Accueil", id: "hero" },
    { label: "À propos", id: "about" },
    { label: "Compétences", id: "competence" },
    { label: "Projets", id: "projet" },
    { label: "Contact", id: "contact" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      gsap.to(window, { duration: 0.9, scrollTo: { y: el, offsetY: 70 }, ease: "power3.inOut" });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-slate-200 bg-white text-slate-600 text-xs mt-16 w-full"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-6 w-full">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 p-1.5 flex items-center justify-center shadow-sm">
                <img src="/AM.png" alt="AM Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-bold text-sm text-slate-900 tracking-wide">
                ADVIN MAHASARO
              </span>
            </div>
            <p className="text-slate-500 text-xs max-w-xs">
              Développement web &amp; mobile, architectures cloud et automatisation.
            </p>
          </div>

          {/* Navigation */}
          <ul className="flex flex-wrap justify-center gap-4 text-xs">
            {navLinks.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Réseaux & Haut */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/Peter08-bit"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all shadow-sm"
              title="GitHub"
            >
              <FaGithub size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/advin-mahasaro-674686290/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all shadow-sm"
              title="LinkedIn"
            >
              <FaLinkedin size={14} />
            </a>
            <a
              href="https://wa.me/261326167599"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all shadow-sm"
              title="WhatsApp"
            >
              <FaWhatsapp size={14} />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:scale-110 active:scale-95 transition-all ml-1.5 shadow-sm"
              title="Retour en haut"
            >
              <HiOutlineArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-500 text-[11px]">
          <p>© {currentYear} Advin Mahasaro. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            <span>Conçu avec précision &amp; passion</span>
            <span className="text-emerald-500">•</span>
            <span>React, GSAP &amp; Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;