import React, { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { 
  FaExternalLinkAlt, 
  FaGithub, 
  FaChevronLeft, 
  FaChevronRight,
  FaSearch,
  FaTimes,
  FaPause,
  FaPlay
} from "react-icons/fa";

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

const filters = [
  { id: "All", label: "Tous", icon: "🌟" },
  { id: "Web Apps", label: "Web Apps", icon: "🌐" },
  { id: "Mobile", label: "Mobile", icon: "📱" },
  { id: "Full Stack", label: "Full Stack", icon: "⚡" },
  { id: "N8N", label: "N8N", icon: "🤖" }
];

const Projet = () => {
  const [active, setActive] = useState("All");
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [autoplay, setAutoplay] = useState(true);
  
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const autoRotateRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  const filtered = active === "All" 
    ? projects 
    : projects.filter((p) => p.category === active);

  const totalProjects = filtered.length;
  const angleStep = 360 / totalProjects;
  
  const getRadius = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 250; // Mobile
      if (window.innerWidth < 1024) return 320; // Tablette
      return 400; // Desktop
    }
    return 400;
  };

  const radius = getRadius();

  // Animation des cartes avec rotation pour faire face à la caméra
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const angle = ((index * angleStep + rotation) * Math.PI) / 180;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        // Calculer la rotation Y pour que la carte soit toujours face à l'écran
        // La carte doit tourner sur elle-même pour compenser sa position sur le cercle
        const rotationY = -angle * (180 / Math.PI);
        
        // Calcul de l'opacité et de l'échelle basées sur la position
        const cos = Math.cos(angle);
        const opacity = 0.2 + (cos + 1) * 0.4; // Entre 0.2 et 1
        const scale = 0.7 + (cos + 1) * 0.15; // Entre 0.7 et 1
        
        gsap.to(card, {
          x: x,
          z: z,
          rotationY: rotationY, // Rotation pour faire face à l'écran
          opacity: Math.max(0.3, Math.min(1, opacity)),
          scale: Math.max(0.75, Math.min(1, scale)),
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });
  }, [rotation, filtered, angleStep, radius]);

  // Calculer l'index de la carte la plus proche
  const getActiveIndex = useCallback(() => {
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
  }, [filtered, angleStep, rotation]);

  const activeIndex = getActiveIndex();

  // Rotation automatique
  useEffect(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    
    if (autoplay && !isDragging.current) {
      autoRotateRef.current = setInterval(() => {
        setRotation(prev => prev + 0.4);
      }, 30);
    }
    
    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [filtered, autoplay]);

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
    setRotation(startRotation.current + deltaX * 0.5);
  }, []);

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
    setTimeout(() => setAutoplay(true), 3000);
  }, []);

  // Navigation
  const navigateProject = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAutoplay(false);
    setRotation(prev => prev + angleStep * direction);
    setTimeout(() => {
      setIsAnimating(false);
      setAutoplay(true);
    }, 600);
  }, [isAnimating, angleStep]);

  // Ouvrir les détails du projet
  const openProjectDetails = useCallback((project) => {
    setSelectedProject(project);
    setAutoplay(false);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0a0a1f] py-12 md:py-16 px-4 overflow-hidden">
      {/* Fond moderne */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-pink-900/20" />
        
        {/* Grille décorative */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Portfolio 3D Interactif</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Mes Projets
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            🌟 Les cartes pivotent automatiquement pour rester face à vous
          </p>
        </div>

        {/* Filtres */}
        <div className="flex justify-center mb-8 md:mb-16">
          <div className="inline-flex flex-wrap justify-center gap-2 bg-white/5 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActive(filter.id)}
                className={`
                  relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                  ${active === filter.id
                    ? 'text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 shadow-lg border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{filter.icon}</span>
                  <span className="hidden sm:inline">{filter.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Carrousel 3D avec cartes face caméra */}
        {totalProjects > 0 && (
          <div className="relative">
            {/* Scène 3D */}
            <div 
              className="relative w-full"
              style={{ 
                height: '550px',
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
              {/* Conteneur 3D */}
              <div 
                ref={carouselRef}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(3deg)',
                }}
              >
                {/* Point central */}
                <div style={{ transformStyle: 'preserve-3d' }}>
                  {filtered.map((project, index) => {
                    const angle = ((index * angleStep + rotation) * Math.PI) / 180;
                    const isActive = Math.abs(angle % (2 * Math.PI)) < 0.2 || 
                                    Math.abs(angle % (2 * Math.PI) - 2 * Math.PI) < 0.2;
                    
                    return (
                      <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="absolute"
                        style={{
                          width: '320px',
                          marginLeft: '-160px',
                          marginTop: '-250px',
                          transformStyle: 'preserve-3d',
                          zIndex: Math.round(Math.cos(angle) * 100) + 50,
                        }}
                      >
                        {/* La carte qui tourne pour faire face à l'écran */}
                        <div 
                          onClick={() => isActive && openProjectDetails(project)}
                          className={`
                            relative rounded-3xl overflow-hidden transition-all duration-500
                            ${isActive ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
                          `}
                          style={{
                            background: 'linear-gradient(145deg, rgba(30,30,60,0.95), rgba(20,20,40,0.98))',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            boxShadow: isActive 
                              ? '0 30px 60px -15px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.3), 0 0 80px rgba(168,85,247,0.2)' 
                              : '0 15px 40px -15px rgba(0,0,0,0.4)',
                            transform: isActive ? 'translateZ(30px)' : 'translateZ(0px)',
                          }}
                        >
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" fill="%23111827"%3E%3Crect width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="20"%3E📁 Projet%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1f] via-transparent to-transparent opacity-70" />
                            
                            {/* Badge */}
                            <div className="absolute top-3 left-3">
                              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg">
                                {project.category}
                              </span>
                            </div>

                            {/* Indicateur de carte active */}
                            {isActive && (
                              <div className="absolute top-3 right-3">
                                <span className="flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Contenu */}
                          <div className="p-5 space-y-3">
                            <h3 className={`text-lg font-bold transition-colors duration-300 ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' : 'text-white'}`}>
                              {project.title}
                            </h3>
                            
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                              {project.desc}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-1.5">
                              {project.tech.slice(0, 3).map((tech, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2.5 py-1 rounded-md text-xs transition-colors duration-300 ${
                                    isActive 
                                      ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/30' 
                                      : 'bg-white/5 text-gray-400 border border-white/10'
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.tech.length > 3 && (
                                <span className="px-2.5 py-1 rounded-md text-xs bg-white/5 text-gray-500">
                                  +{project.tech.length - 3}
                                </span>
                              )}
                            </div>

                            {/* Boutons d'action - visibles uniquement sur la carte active */}
                            <div className={`transition-all duration-500 ${
                              isActive ? 'opacity-100 max-h-20 translate-y-0' : 'opacity-0 max-h-0 translate-y-4 overflow-hidden'
                            }`}>
                              <div className="flex gap-2 pt-2">
                                <a
                                  href={project.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl
                                    bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-medium
                                    hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300
                                    hover:from-indigo-400 hover:to-purple-400"
                                >
                                  <FaExternalLinkAlt className="w-3 h-3" />
                                  <span className="hidden sm:inline">Démo</span>
                                </a>
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl
                                    bg-white/5 text-white text-xs font-medium border border-white/10
                                    hover:bg-white/15 transition-all duration-300"
                                >
                                  <FaGithub className="w-3 h-3" />
                                  <span className="hidden sm:inline">Code</span>
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Bordure lumineuse pour la carte active */}
                          {isActive && (
                            <div className="absolute inset-0 rounded-3xl pointer-events-none">
                              <div className="absolute inset-0 rounded-3xl ring-2 ring-indigo-500/50" />
                              <div className="absolute inset-0 rounded-3xl ring-1 ring-purple-500/30 blur-sm" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contrôles */}
            <div className="relative mt-4 md:mt-0 md:absolute md:bottom-8 md:left-0 md:right-0 flex justify-center items-center gap-3">
              <button
                onClick={() => navigateProject(-1)}
                disabled={isAnimating}
                className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                  text-white hover:bg-white/20 transition-all duration-300 hover:scale-110
                  disabled:opacity-50 disabled:hover:scale-100 group"
              >
                <FaChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  title={autoplay ? "Mettre en pause" : "Lecture automatique"}
                >
                  {autoplay ? (
                    <FaPause className="w-3.5 h-3.5 text-gray-300" />
                  ) : (
                    <FaPlay className="w-3.5 h-3.5 text-gray-300" />
                  )}
                </button>
                
                <span className="text-sm text-gray-400 font-mono font-semibold tabular-nums">
                  <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="mx-1 text-gray-600">/</span>
                  {String(totalProjects).padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={() => navigateProject(1)}
                disabled={isAnimating}
                className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                  text-white hover:bg-white/20 transition-all duration-300 hover:scale-110
                  disabled:opacity-50 disabled:hover:scale-100 group"
              >
                <FaChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Indicateurs de progression améliorés */}
            <div className="flex justify-center items-center gap-2 mt-6">
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
                    className="transition-all duration-300 rounded-full relative group"
                    style={{
                      width: `${3 + proximity * 28}px`,
                      height: `${3 + proximity * 2}px`,
                      backgroundColor: proximity > 0.8 
                        ? 'rgb(99, 102, 241)' 
                        : proximity > 0.4 
                          ? 'rgba(255,255,255,0.4)' 
                          : 'rgba(255,255,255,0.15)',
                    }}
                    title={`Projet ${idx + 1}`}
                  >
                    {proximity > 0.8 && (
                      <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Indication de navigation */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                <span>👆 Glissez horizontalement</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>🖱️ Ou utilisez les flèches</span>
              </p>
            </div>
          </div>
        )}

        {/* Message si aucun projet */}
        {totalProjects === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10">
              <FaSearch className="text-gray-400" />
              <span className="text-gray-400">Aucun projet trouvé</span>
            </div>
          </div>
        )}
      </div>

      {/* Modal de détails */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              setSelectedProject(null);
              setAutoplay(true);
            }}
          />
          
          <div className="relative bg-gradient-to-br from-[#1a1a3a] to-[#151530] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto
            border border-white/10 shadow-2xl shadow-indigo-500/10 animate-fadeIn">
            <button
              onClick={() => {
                setSelectedProject(null);
                setAutoplay(true);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 
                transition-colors z-10 backdrop-blur-md"
            >
              <FaTimes className="w-4 h-4 text-white" />
            </button>

            <div className="p-6 md:p-8">
              <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-6">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" fill="%23111827"%3E%3Crect width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="24"%3E📁 Image non disponible%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151530] via-transparent to-transparent" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="px-3 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h2>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.desc}
                </p>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-gray-300 border border-white/10
                          hover:bg-indigo-500/20 hover:text-indigo-200 hover:border-indigo-500/30 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <a
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                      bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium
                      hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300
                      hover:from-indigo-400 hover:to-purple-400 transform hover:scale-[1.02]"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    Voir la démo
                  </a>
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                      bg-white/5 text-white font-medium border border-white/10
                      hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <FaGithub className="w-4 h-4" />
                    Code source
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
      `}</style>
    </section>
  );
};

export default Projet;