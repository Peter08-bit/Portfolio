import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cvFile from "../../assets/CV-MAHASARO.pdf";
import { FaDownload, FaGithub, FaLinkedin, FaMapMarkerAlt, FaShieldAlt, FaBolt, FaLaptopCode, FaCogs } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineArrowNarrowRight } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const bioRef = useRef(null);
  const pillarsRef = useRef(null);
  const actionsRef = useRef(null);

  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Machine à écrire pour le titre de poste
  useEffect(() => {
    const roles = ["Développeur Full-Stack", "Expert Mobile & APIs", "Architecte d'Automatisation"];
    let roleIdx = 0, charIdx = 0, isDeleting = false, timer;
    const type = () => {
      const currentRole = roles[roleIdx];
      if (!isDeleting && charIdx <= currentRole.length) {
        setDisplayText(currentRole.substring(0, charIdx++));
        timer = setTimeout(type, 75);
      } else if (isDeleting && charIdx >= 0) {
        setDisplayText(currentRole.substring(0, charIdx--));
        timer = setTimeout(type, 35);
      } else if (!isDeleting && charIdx > currentRole.length) {
        setIsTypingComplete(true);
        timer = setTimeout(() => { isDeleting = true; charIdx = currentRole.length; setIsTypingComplete(false); type(); }, 2200);
      } else if (isDeleting && charIdx < 0) {
        isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; charIdx = 0;
        timer = setTimeout(type, 350);
      }
    };
    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  // Animations ScrollTrigger GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Profile Card Slide from Left
      gsap.fromTo(
        cardRef.current,
        { x: -50, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3. Bio text reveal from Right
      gsap.fromTo(
        bioRef.current?.children || [],
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 4. Pillars grid reveal with stagger
      gsap.fromTo(
        pillarsRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 5. Actions buttons reveal
      gsap.fromTo(
        actionsRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: actionsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Effet de Tilt 3D dynamique sur la carte profil via GSAP
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 8;
    const rotateY = (x / (rect.width / 2)) * 8;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power1.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.6,
    });
  };

  const pillars = [
    { icon: <FaLaptopCode className="text-emerald-600" size={16} />, title: "Frontend & Mobile", desc: "React, React Native, Vite, Tailwind CSS — interfaces réactives et ultra-fluides." },
    { icon: <FaBolt className="text-teal-600" size={16} />, title: "Backends & APIs", desc: "APIs REST, microservices et bases de données avec Node.js, Express, PHP, MySQL." },
    { icon: <FaCogs className="text-cyan-600" size={16} />, title: "Automatisation", desc: "Optimisation de processus avec n8n, webhooks et scripts personnalisés." },
    { icon: <FaShieldAlt className="text-emerald-700" size={16} />, title: "Code Propre & Rigueur", desc: "Structuration modulaire, sécurité et performances optimisées." },
  ];

  return (
    <div ref={sectionRef} className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {/* En-tête */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-3">
          <HiOutlineSparkles size={12} className="text-emerald-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Profil & Vision</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
          À Propos de <span className="text-gradient-emerald">Moi</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start w-full">
        {/* Carte Profil avec Tilt 3D */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full glass-panel tilt-card p-5 sm:p-8 rounded-2xl relative overflow-hidden flex flex-col items-center text-center shadow-md transition-shadow"
          >
            <div className="relative mb-5">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-slate-200 shadow-lg p-1 bg-white">
                <img src="/img.jpg" alt="Advin Mahasaro" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-white border border-emerald-300 text-emerald-700 text-xs font-semibold flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>En ligne</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-1">RANDRIAMAHASARO</h3>
            <p className="text-sm font-medium text-emerald-600 mb-3 min-h-[22px]">
              {displayText}
              <span className={`inline-block w-0.5 h-3.5 bg-emerald-600 ml-0.5 ${isTypingComplete ? 'opacity-0' : 'animate-pulse'}`} />
            </p>

            <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 mb-5 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200">
              <FaMapMarkerAlt className="text-emerald-600" size={10} />
              <span>Madagascar • Remote mondial</span>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 mb-6">
              {["React", "Node.js", "React Native", "TypeScript", "n8n", "MySQL"].map((tech) => (
                <span key={tech} className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">{tech}</span>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-5 border-t border-slate-200 w-full justify-center">
              <a href="https://github.com/Peter08-bit" target="_blank" rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all shadow-sm" title="GitHub">
                <FaGithub size={16} />
              </a>
              <a href="https://www.linkedin.com/in/advin-mahasaro-674686290/" target="_blank" rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all shadow-sm" title="LinkedIn">
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bio & Piliers */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div ref={bioRef} className="space-y-3">
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
              Passionné par la création logicielle, j'interviens sur l'ensemble du cycle de vie des applications : modélisation, conception d'interfaces, déploiement et automatisation.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Mon approche privilégie des architectures modulaires, une maintenabilité exemplaire et une expérience utilisateur sans compromis.
            </p>
          </div>

          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {pillars.map((item, idx) => (
              <div key={idx} className="glass-panel glass-panel-hover p-4 rounded-2xl flex flex-col gap-2.5 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">{item.icon}</div>
                  <h4 className="font-display font-semibold text-sm text-slate-900">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div ref={actionsRef} className="flex flex-wrap items-center gap-3 pt-2">
            <a href={cvFile} download="CV-Advin-MAHASARO.pdf"
              className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-[0_2px_12px_rgba(16,185,129,0.3)] hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] transition-all">
              <FaDownload size={12} />
              <span>Télécharger mon CV</span>
            </a>
            <button onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 hover:border-emerald-300 shadow-sm transition-all">
              <span>Discuter d'une opportunité</span>
              <HiOutlineArrowNarrowRight size={14} className="text-emerald-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;