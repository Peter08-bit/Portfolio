import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cvFile from "../../assets/CV-Peter-AdvinN8N.pdf";
import { 
  FaDownload, 
  FaCode, 
  FaRocket, 
  FaBrain, 
  FaArrowRight,
  FaStar,
  FaCheckCircle,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaBriefcase,
  FaHeart
} from "react-icons/fa";
import { HiOutlineLightningBolt } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const statsRef = useRef(null);
  const textContainerRef = useRef(null);
  
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Marquer le composant comme monté
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Animation d'entrée avec ScrollTrigger
  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animation du conteneur principal
      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animation des éléments avec classe .fade-up
      const fadeElements = document.querySelectorAll('.fade-up');
      if (fadeElements.length > 0) {
        gsap.fromTo(fadeElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textContainerRef.current || sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animation de la carte avatar
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { scale: 0.8, opacity: 0, rotateY: 15 },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animation des statistiques
      if (statsRef.current && statsRef.current.children.length > 0) {
        gsap.fromTo(statsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Effet de typing optimisé
  useEffect(() => {
    if (!isMounted) return;
    
    const words = ["Developer FullStack", "N8N Automation Expert", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;
    let isCancelled = false;

    const type = () => {
      if (isCancelled) return;
      
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
          if (!isCancelled) {
            isDeleting = true;
            charIndex = currentWord.length;
            setIsTypingComplete(false);
            type();
          }
        }, 2000);
        return;
      }
      else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
        timeoutId = setTimeout(type, 500);
        return;
      }
    };

    timeoutId = setTimeout(type, 500);

    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isMounted]);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    document.documentElement.style.setProperty("--x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--y", `${e.clientY}px`);
  }, []);

  const handleCardMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    const rotateX = -(y - rect.height / 2) / 25;
    const rotateY = (x - rect.width / 2) / 25;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const resetCard = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, []);

  const handleDownloadCV = useCallback(() => {
    try {
      const link = document.createElement("a");
      link.href = cvFile;
      link.download = "CV-Peter-Advin.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur de téléchargement:", error);
    }
  }, []);

  const highlights = [
    { icon: <FaRocket />, label: "3+ ans d'expérience" },
    { icon: <FaCode />, label: "50+ projets réalisés" },
    { icon: <HiOutlineLightningBolt />, label: "100+ automatisations" },
    { icon: <FaBrain />, label: "Veille technologique" },
  ];

  const stats = [
    { 
      icon: <FaStar className="text-yellow-400" />, 
      value: "50+", 
      label: "Projets Réalisés",
      description: "Applications web & mobile",
      gradient: "from-yellow-500/20 to-amber-500/20",
      borderColor: "border-yellow-500/30",
      shadowColor: "rgba(234, 179, 8, 0.3)"
    },
    { 
      icon: <FaHeart className="text-red-400" />, 
      value: "20+", 
      label: "Clients Satisfaits",
      description: "Dans le monde entier",
      gradient: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      shadowColor: "rgba(239, 68, 68, 0.3)"
    },
    { 
      icon: <FaCheckCircle className="text-emerald-400" />, 
      value: "100%", 
      label: "Satisfaction",
      description: "Qualité garantie",
      gradient: "from-emerald-500/20 to-green-500/20",
      borderColor: "border-emerald-500/30",
      shadowColor: "rgba(16, 185, 129, 0.3)"
    },
    { 
      icon: <FaRocket className="text-blue-400" />, 
      value: "24/7", 
      label: "Support",
      description: "Maintenance continue",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      shadowColor: "rgba(59, 130, 246, 0.3)"
    },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center px-4 sm:px-8 lg:px-16 py-20 overflow-hidden bg-[#0a0a1a]"
    >
      {/* Fond dynamique */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-emerald-950/30" />
        <div className="absolute top-0 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '2s' }} />
      </div>

      {/* Effet de lumière suivant la souris */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16,185,129,0.08), transparent 40%)`
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT — Contenu textuel */}
          <div ref={textContainerRef} className="about-content space-y-8 order-2 lg:order-1">
            {/* Badge */}
            <div className="fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full 
              bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm text-emerald-300 font-medium">À propos de moi</span>
            </div>

            {/* Titre */}
            <div className="fade-up space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                <span className="text-white">Passionné par le </span>
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Développement
                </span>
                <br />
                <span className="text-white">& l'</span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Automatisation
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="fade-up text-gray-300 text-base sm:text-lg leading-relaxed">
              Développeur Full-Stack créatif avec une passion pour la création d'applications 
              web performantes et l'automatisation intelligente des processus. 
              Je transforme des concepts complexes en solutions élégantes et efficaces.
            </p>

            {/* Highlights */}
            <div className="fade-up grid grid-cols-2 gap-3">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]
                    hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all duration-300 group"
                >
                  <span className="text-emerald-400 text-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Boutons d'action */}
            <div className="fade-up flex flex-wrap gap-4">
              <button
                onClick={handleDownloadCV}
                className="group relative px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 
                  text-white font-semibold rounded-xl overflow-hidden
                  shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]
                  hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.7)]
                  transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaDownload className="group-hover:-translate-y-0.5 transition-transform" />
                  Télécharger CV
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => {
                  const contactEl = document.getElementById('contact');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group px-6 py-3.5 border-2 border-white/10 text-white font-semibold rounded-xl
                  hover:border-emerald-400/50 hover:bg-emerald-500/10
                  transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Me contacter
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Statistiques intégrées dans le contenu */}
            <div 
              ref={statsRef}
              className="fade-up grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative p-4 rounded-2xl bg-white/[0.02] backdrop-blur-sm 
                    border border-white/[0.05] hover:bg-white/[0.04]
                    transition-all duration-500 hover:scale-105 cursor-default text-center"
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                  
                  <div className="relative z-10 space-y-2">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-xl font-bold text-white group-hover:text-white transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Carte avatar 3D */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleCardMove}
              onMouseLeave={resetCard}
              className="relative w-full max-w-md"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Carte principale */}
              <div 
                className="relative rounded-3xl overflow-hidden
                  bg-gradient-to-br from-white/[0.05] to-white/[0.02]
                  backdrop-blur-xl border border-white/10
                  shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]
                  p-8 space-y-6"
                style={{
                  background: `
                    radial-gradient(circle at var(--mx, 50%) var(--my, 50%), 
                    rgba(16,185,129,0.2), transparent 60%),
                    linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))
                  `,
                }}
              >
                {/* Points de décoration */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                {/* Avatar avec effets */}
                <div className="relative flex justify-center pt-4">
                  <div className="absolute w-[240px] h-[240px] rounded-full border border-emerald-500/20 animate-spin-slow" />
                  <div className="absolute w-[220px] h-[220px] rounded-full border border-emerald-500/15 animate-spin-slow" 
                    style={{ animationDelay: '1s' }} />
                  <div className="absolute w-[180px] h-[180px] rounded-full bg-emerald-500/20 blur-2xl animate-pulse" />
                  
                  <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden 
                    ring-4 ring-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.3)]
                    group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src="/img.jpg" 
                      alt="Peter Advin" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Informations */}
                <div className="text-center space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      RANDRIAMAHASARO
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      Peter Advin
                    </span>
                  </h2>

                  {/* Typing effect */}
                  <div className="min-h-[2rem] flex items-center justify-center">
                    <p className="text-base sm:text-lg text-emerald-400 font-medium">
                      {displayText}
                      <span className={`inline-block w-0.5 h-5 bg-emerald-400 ml-1 ${isTypingComplete ? 'animate-pulse' : 'animate-blink'}`}></span>
                    </p>
                  </div>

                  {/* Localisation */}
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <FaMapMarkerAlt className="text-emerald-400 w-4 h-4" />
                    <span className="text-sm">Madagascar</span>
                  </div>

                  {/* Tags technologies */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {["React", "Node.js", "N8N", "TypeScript", "Python"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium
                          bg-emerald-500/10 text-emerald-300 border border-emerald-500/20
                          hover:bg-emerald-500/20 hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Réseaux sociaux */}
                  <div className="flex justify-center gap-4 pt-2">
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 p-2"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-125 p-2"
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-emerald-400 transition-all duration-300 hover:scale-125 p-2"
                    >
                      <FaBriefcase className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </section>
  );
};

export default About;