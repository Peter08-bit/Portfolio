import React, { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaExternalLinkAlt, 
  FaGithub, 
  FaChevronLeft, 
  FaChevronRight,
  FaSearch,
  FaTimes,
  FaPause,
  FaPlay,
  FaEye,
  FaCode,
  FaArrowRight,
  FaStar
} from "react-icons/fa";
import { HiOutlineLightningBolt } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Location de Résidence",
    category: "Full Stack",
    image: "/LDR.jpeg",
    desc: "Plateforme full-stack de gestion locative avec 3 interfaces distinctes, notifications temps réel et 5 modes de paiement adaptés au marché malgache.",
    tech: ["React 18", "TypeScript", "Node.js", "Express", "MySQL", "Socket.io"],
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Inspection Matériels",
    category: "Web Apps",
    image: "/GIM.jpeg",
    desc: "Application Laravel pour la gestion d'inspection d'équipements avec système de rôles et tableau de bord interactif.",
    tech: ["PHP", "Laravel", "Firebase", "MySQL", "Tailwind CSS"],
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Component Library",
    category: "Mobile",
    image: "/Mob1.jfif",
    desc: "Application React Native de scan QR code sécurisé pour certificats étudiants.",
    tech: ["React Native", "Expo Go", "QR Code Scanner"],
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Automatisation Facebook",
    category: "N8N",
    image: "/N8N1.jpeg",
    desc: "Chatbot automatisé pour page Facebook avec réponses intelligentes aux clients.",
    tech: ["N8N", "JavaScript", "Facebook API"],
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Email Automatique",
    category: "N8N",
    image: "/N8N2.jpeg",
    desc: "Workflow d'automatisation d'envoi d'emails basé sur des déclencheurs spécifiques.",
    tech: ["N8N", "JavaScript", "SMTP"],
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "E-commerce Automation",
    category: "N8N",
    image: "/N8N3.jpeg",
    desc: "Automation complète pour e-commerce : commandes, inventaires et notifications.",
    tech: ["N8N", "JavaScript", "REST APIs"],
    demoLink: "#",
    githubLink: "#"
  }
];

const categories = [
  { id: "All", label: "Tous", icon: "🌟", color: "from-indigo-500 to-purple-500" },
  { id: "Web Apps", label: "Web", icon: "🌐", color: "from-blue-500 to-cyan-500" },
  { id: "Mobile", label: "Mobile", icon: "📱", color: "from-green-500 to-emerald-500" },
  { id: "Full Stack", label: "Full Stack", icon: "⚡", color: "from-orange-500 to-red-500" },
  { id: "N8N", label: "N8N", icon: "🤖", color: "from-pink-500 to-rose-500" },
];

const Projet = () => {
  const [active, setActive] = useState("All");
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [autoplay, setAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const autoRotateRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const sectionRef = useRef(null);

  // Détection du mobile et resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filtered = active === "All" 
    ? projects 
    : projects.filter((p) => p.category === active);

  const totalProjects = filtered.length;
  const angleStep = totalProjects > 0 ? 360 / totalProjects : 0;
  
  // Rayon adaptatif selon la taille d'écran
  const getRadius = useCallback(() => {
    if (windowWidth < 480) return 180; // Très petit mobile
    if (windowWidth < 640) return 220; // Mobile
    if (windowWidth < 768) return 260; // Tablette portrait
    if (windowWidth < 1024) return 320; // Tablette paysage
    return 400; // Desktop
  }, [windowWidth]);

  const radius = getRadius();

  // Animation d'entrée de la section
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animation des cartes avec rotation pour faire face à la caméra
  useEffect(() => {
    if (totalProjects === 0) return;
    
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const angle = ((index * angleStep + rotation) * Math.PI) / 180;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const rotationY = -angle * (180 / Math.PI);
        
        const cos = Math.cos(angle);
        const opacity = 0.3 + (cos + 1) * 0.35;
        const scale = isMobile 
          ? 0.75 + (cos + 1) * 0.125 
          : 0.8 + (cos + 1) * 0.1;
        
        gsap.to(card, {
          x,
          z,
          rotationY,
          opacity: Math.max(0.25, Math.min(1, opacity)),
          scale: Math.max(0.7, Math.min(1, scale)),
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });
  }, [rotation, filtered, angleStep, radius, isMobile]);

  // Calculer l'index de la carte active
  const getActiveIndex = useCallback(() => {
    if (totalProjects === 0) return 0;
    let closestIndex = 0;
    let maxCos = -Infinity;
    
    filtered.forEach((_, index) => {
      const angle = ((index * angleStep + rotation) * Math.PI) / 180;
      const cos = Math.cos(angle);
      if (cos > maxCos) {
        maxCos = cos;
        closestIndex = index;
      }
    });
    
    return closestIndex;
  }, [filtered, angleStep, rotation, totalProjects]);

  const activeIndex = getActiveIndex();

  // Rotation automatique
  useEffect(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    
    if (autoplay && !isDragging.current && totalProjects > 0) {
      autoRotateRef.current = setInterval(() => {
        setRotation(prev => prev + 0.3);
      }, 30);
    }
    
    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [filtered, autoplay, totalProjects]);

  // Réinitialiser la rotation lors du changement de filtre
  useEffect(() => {
    setRotation(0);
  }, [active]);

  // Gestion du drag
  const handleDragStart = useCallback((clientX) => {
    isDragging.current = true;
    startX.current = clientX;
    startRotation.current = rotation;
    setAutoplay(false);
  }, [rotation]);

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging.current) return;
    const deltaX = clientX - startX.current;
    const sensitivity = isMobile ? 0.8 : 0.5;
    setRotation(startRotation.current + deltaX * sensitivity);
  }, [isMobile]);

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
    setTimeout(() => setAutoplay(true), 3000);
  }, []);

  // Navigation
  const navigateProject = useCallback((direction) => {
    if (isAnimating || totalProjects === 0) return;
    setIsAnimating(true);
    setAutoplay(false);
    setRotation(prev => prev + angleStep * direction);
    setTimeout(() => {
      setIsAnimating(false);
      setAutoplay(true);
    }, 600);
  }, [isAnimating, angleStep, totalProjects]);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') navigateProject(-1);
      if (e.key === 'ArrowRight') navigateProject(1);
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
        setAutoplay(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateProject, selectedProject]);

  // Vue mobile alternative
  const MobileProjectCard = ({ project, index }) => {
    const isActive = index === activeIndex;
    
    return (
      <div
        className={`transition-all duration-500 ${
          isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-90'
        }`}
      >
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.02] 
          backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="relative h-40 overflow-hidden">
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" fill="%23111827"%3E%3Crect width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="20"%3E📁 Projet%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1f] to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-white border border-white/20">
                {project.category}
              </span>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            <h3 className="text-base font-bold text-white truncate">
              {project.title}
            </h3>
            <p className="text-gray-400 text-xs line-clamp-2">
              {project.desc}
            </p>
            
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 3).map((tech, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-gray-300 border border-white/10">
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-gray-400">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
            
            {isActive && (
              <div className="flex gap-2 pt-2">
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg
                    bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-medium"
                >
                  <FaEye className="w-3 h-3" />
                  Démo
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg
                    bg-white/5 text-white text-xs font-medium border border-white/10"
                >
                  <FaCode className="w-3 h-3" />
                  Code
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a1f] py-8 sm:py-12 lg:py-16 px-3 sm:px-4 lg:px-8 overflow-hidden"
    >
      {/* Fond moderne amélioré */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-pink-950/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        
        {/* Cercles lumineux */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '2s' }} />
        
        {/* Grille */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Responsive */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full 
            bg-white/5 backdrop-blur-xl border border-white/10 mb-4 sm:mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-300">Portfolio 3D</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Mes Projets
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl sm:max-w-2xl mx-auto px-2">
            {isMobile ? 'Glissez pour explorer les projets' : '🌟 Les cartes pivotent automatiquement pour rester face à vous'}
          </p>
        </div>

        {/* Filtres Responsive */}
        <div className="flex justify-center mb-6 sm:mb-8 lg:mb-16">
          <div className="inline-flex flex-wrap justify-center gap-1.5 sm:gap-2 
            bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-1 sm:p-1.5 border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium 
                  transition-all duration-300 whitespace-nowrap
                  ${active === cat.id
                    ? `text-white bg-gradient-to-r ${cat.color} shadow-lg border border-white/20`
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                  <span>{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Carrousel 3D - Desktop */}
        {totalProjects > 0 && !isMobile && (
          <div className="relative">
            <div 
              className="relative w-full"
              style={{ 
                height: 'clamp(450px, 60vh, 600px)',
                perspective: '1500px',
                perspectiveOrigin: '50% 50%',
              }}
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => {
                e.preventDefault();
                handleDragMove(e.touches[0].clientX);
              }}
              onTouchEnd={handleDragEnd}
            >
              <div 
                ref={carouselRef}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(3deg)',
                }}
              >
                <div style={{ transformStyle: 'preserve-3d' }}>
                  {filtered.map((project, index) => {
                    const angle = ((index * angleStep + rotation) * Math.PI) / 180;
                    const isActive = Math.abs(angle % (2 * Math.PI)) < 0.25 || 
                                    Math.abs(angle % (2 * Math.PI) - 2 * Math.PI) < 0.25;
                    
                    return (
                      <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="absolute"
                        style={{
                          width: 'clamp(280px, 40vw, 360px)',
                          marginLeft: 'clamp(-140px, -20vw, -180px)',
                          marginTop: 'clamp(-200px, -35vh, -280px)',
                          transformStyle: 'preserve-3d',
                          zIndex: Math.round(Math.cos(angle) * 100) + 50,
                        }}
                      >
                        <div 
                          onClick={() => isActive && openProjectDetails(project)}
                          className={`relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500
                            ${isActive ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}`}
                          style={{
                            background: 'linear-gradient(145deg, rgba(30,30,60,0.95), rgba(20,20,40,0.98))',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            boxShadow: isActive 
                              ? '0 30px 60px -15px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.3)' 
                              : '0 15px 40px -15px rgba(0,0,0,0.4)',
                          }}
                        >
                          {/* Image */}
                          <div className="relative h-36 sm:h-48 overflow-hidden">
                            <img 
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" fill="%23111827"%3E%3Crect width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="20"%3E📁 Projet%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1f] via-transparent to-transparent opacity-70" />
                            
                            <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                              <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold 
                                bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg">
                                {project.category}
                              </span>
                            </div>

                            {isActive && (
                              <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                                <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="p-3 sm:p-5 space-y-2 sm:space-y-3">
                            <h3 className={`text-base sm:text-lg font-bold ${
                              isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' : 'text-white'
                            }`}>
                              {project.title}
                            </h3>
                            
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                              {project.desc}
                            </p>

                            <div className="flex flex-wrap gap-1 sm:gap-1.5">
                              {project.tech.slice(0, 3).map((tech, idx) => (
                                <span key={idx} className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs ${
                                  isActive 
                                    ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/30' 
                                    : 'bg-white/5 text-gray-400 border border-white/10'
                                }`}>
                                  {tech}
                                </span>
                              ))}
                              {project.tech.length > 3 && (
                                <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-xs bg-white/5 text-gray-500">
                                  +{project.tech.length - 3}
                                </span>
                              )}
                            </div>

                            <div className={`transition-all duration-500 ${
                              isActive ? 'opacity-100 max-h-24 translate-y-0' : 'opacity-0 max-h-0 translate-y-4 overflow-hidden'
                            }`}>
                              <div className="flex gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                                <a
                                  href={project.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl
                                    bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-medium
                                    hover:shadow-lg transition-all duration-300"
                                >
                                  <FaExternalLinkAlt className="w-3 h-3" />
                                  <span className="hidden sm:inline">Démo</span>
                                </a>
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl
                                    bg-white/5 text-white text-xs font-medium border border-white/10
                                    hover:bg-white/15 transition-all duration-300"
                                >
                                  <FaGithub className="w-3 h-3" />
                                  <span className="hidden sm:inline">Code</span>
                                </a>
                              </div>
                            </div>
                          </div>

                          {isActive && (
                            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none">
                              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-2 ring-indigo-500/50" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contrôles Desktop */}
            <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center items-center gap-2 sm:gap-3">
              <button
                onClick={() => navigateProject(-1)}
                disabled={isAnimating}
                className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                  text-white hover:bg-white/20 transition-all duration-300 hover:scale-110
                  disabled:opacity-50 disabled:hover:scale-100"
              >
                <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full 
                bg-white/5 backdrop-blur-xl border border-white/10">
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  className="p-1 sm:p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  title={autoplay ? "Pause" : "Lecture"}
                >
                  {autoplay ? (
                    <FaPause className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-300" />
                  ) : (
                    <FaPlay className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-300" />
                  )}
                </button>
                
                <span className="text-xs sm:text-sm text-gray-400 font-mono font-semibold">
                  <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="mx-1 text-gray-600">/</span>
                  {String(totalProjects).padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={() => navigateProject(1)}
                disabled={isAnimating}
                className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                  text-white hover:bg-white/20 transition-all duration-300 hover:scale-110
                  disabled:opacity-50 disabled:hover:scale-100"
              >
                <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Indicateurs de progression */}
            <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 absolute bottom-0 left-0 right-0">
              {filtered.map((_, idx) => {
                const angle = ((idx * angleStep + rotation) * Math.PI) / 180;
                const proximity = Math.max(0, Math.cos(angle));
                
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setRotation(idx * angleStep);
                      setAutoplay(false);
                      setTimeout(() => setAutoplay(true), 3000);
                    }}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: `${3 + proximity * 24}px`,
                      height: `${3 + proximity * 2}px`,
                      backgroundColor: proximity > 0.8 
                        ? 'rgb(99, 102, 241)' 
                        : proximity > 0.4 
                          ? 'rgba(255,255,255,0.4)' 
                          : 'rgba(255,255,255,0.15)',
                    }}
                    title={`Projet ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Vue Mobile - Cartes en pile */}
        {totalProjects > 0 && isMobile && (
          <div className="relative px-2">
            {/* Swipe container */}
            <div 
              className="relative overflow-hidden"
              style={{ minHeight: '420px' }}
              onTouchStart={(e) => {
                handleDragStart(e.touches[0].clientX);
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                handleDragMove(e.touches[0].clientX);
              }}
              onTouchEnd={handleDragEnd}
            >
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  {filtered.map((project, index) => {
                    const distance = Math.abs(index - activeIndex);
                    if (distance > 2) return null;
                    
                    return (
                      <div
                        key={index}
                        className={`transition-all duration-300 ${
                          distance === 0 ? 'relative z-20' : 'absolute inset-0 z-10'
                        }`}
                        style={{
                          transform: `scale(${1 - distance * 0.1}) translateY(${distance * 20}px)`,
                          opacity: 1 - distance * 0.3,
                        }}
                      >
                        <MobileProjectCard project={project} index={index} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contrôles Mobile */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => navigateProject(-1)}
                className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                  text-white active:bg-white/20 transition-all duration-200"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 px-4 py-2 rounded-full 
                bg-white/5 backdrop-blur-xl border border-white/10">
                {filtered.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setRotation(idx * angleStep);
                      setAutoplay(false);
                      setTimeout(() => setAutoplay(true), 3000);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      idx === activeIndex 
                        ? 'w-6 h-2 bg-indigo-500' 
                        : 'w-2 h-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigateProject(1)}
                className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                  text-white active:bg-white/20 transition-all duration-200"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                👆 Glissez pour naviguer
              </p>
            </div>
          </div>
        )}

        {/* Aucun projet */}
        {totalProjects === 0 && (
          <div className="text-center py-12 sm:py-20">
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 border border-white/10">
              <FaSearch className="text-gray-400 text-sm sm:text-base" />
              <span className="text-gray-400 text-sm sm:text-base">Aucun projet dans cette catégorie</span>
            </div>
          </div>
        )}
      </div>

      {/* Modal de détails - Responsive */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              setSelectedProject(null);
              setAutoplay(true);
            }}
          />
          
          <div className="relative bg-gradient-to-br from-[#1a1a3a] to-[#151530] rounded-2xl sm:rounded-3xl 
            w-full max-w-lg lg:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto
            border border-white/10 shadow-2xl shadow-indigo-500/10 animate-fadeIn">
            <button
              onClick={() => {
                setSelectedProject(null);
                setAutoplay(true);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 
                transition-colors z-10 backdrop-blur-md"
            >
              <FaTimes className="w-4 h-4 text-white" />
            </button>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="relative h-40 sm:h-56 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" fill="%23111827"%3E%3Crect width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="24"%3E📁 Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151530] via-transparent to-transparent" />
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h2>
                </div>
                
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {selectedProject.desc}
                </p>
                
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProject.tech.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm bg-white/5 text-gray-300 
                          border border-white/10 hover:bg-indigo-500/20 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <a
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl
                      bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm sm:text-base font-medium
                      hover:shadow-lg transition-all duration-300 active:scale-95"
                  >
                    <FaExternalLinkAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                    Démo
                  </a>
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl
                      bg-white/5 text-white text-sm sm:text-base font-medium border border-white/10
                      hover:bg-white/10 transition-all duration-300 active:scale-95"
                  >
                    <FaGithub className="w-3 h-3 sm:w-4 sm:h-4" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 640px) {
          .line-clamp-2 {
            -webkit-line-clamp: 3;
          }
        }
      `}</style>
    </section>
  );
};

export default Projet;