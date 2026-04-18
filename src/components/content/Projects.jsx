import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft, FaArrowRight, FaCode, FaHandPaper, FaHandPeace } from "react-icons/fa";

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
  },
];

const filters = ["All", "Web Apps", "Mobile", "Full Stack", "N8N"];

const Projet = () => {
  const [active, setActive] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Drag state - support mobile et desktop
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  const [dragProgress, setDragProgress] = useState(0);
  
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const dragAnimationRef = useRef(null);
  
  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  const currentProject = filtered[currentIndex];
  const totalProjects = filtered.length;

  // Fonction d'animation fluide
  const animateCard = (direction, newIndex) => {
    if (isAnimating || !cardRef.current) return;
    
    setIsAnimating(true);
    
    if (animationRef.current) {
      animationRef.current.kill();
    }
    
    const isNext = direction === 'next';
    const startX = isNext ? 200 : -200;
    const startRotate = isNext ? 30 : -30;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        gsap.set(cardRef.current, { 
          x: startX, 
          opacity: 0, 
          rotationY: startRotate,
          scale: 0.95
        });
        gsap.to(cardRef.current, {
          x: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(0.7)",
          onComplete: () => setIsAnimating(false)
        });
      }
    });
    
    tl.to(cardRef.current, {
      x: isNext ? -200 : 200,
      opacity: 0,
      rotationY: isNext ? -30 : 30,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in"
    });
  };

  const nextProject = () => {
    if (isAnimating) return;
    const newIndex = (currentIndex + 1) % totalProjects;
    animateCard('next', newIndex);
  };

  const prevProject = () => {
    if (isAnimating) return;
    const newIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    animateCard('prev', newIndex);
  };

  const goToProject = (index) => {
    if (isAnimating || index === currentIndex) return;
    const direction = index > currentIndex ? 'next' : 'prev';
    animateCard(direction, index);
  };

  // Récupérer la position X (souris ou tactile)
  const getClientX = (e) => {
    if (e.touches) {
      return e.touches[0].clientX;
    }
    return e.clientX;
  };

  // Drag handlers avec support mobile
  const handleDragStart = (e) => {
    if (isAnimating) return;
    e.preventDefault();
    
    const clientX = getClientX(e);
    
    setIsDragging(true);
    setDragStartX(clientX);
    setDragCurrentX(clientX);
    setDragProgress(0);
    
    if (dragAnimationRef.current) {
      dragAnimationRef.current.kill();
    }
    
    if (cardRef.current) {
      cardRef.current.style.cursor = 'grabbing';
      cardRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging || isAnimating) return;
    e.preventDefault();
    
    const currentX = getClientX(e);
    const deltaX = currentX - dragStartX;
    setDragCurrentX(currentX);
    
    const maxDrag = 300;
    let progress = deltaX / maxDrag;
    progress = Math.min(Math.max(progress, -1), 1);
    setDragProgress(progress);
    
    if (cardRef.current) {
      requestAnimationFrame(() => {
        if (cardRef.current) {
          const moveX = deltaX;
          const rotation = deltaX * 0.15;
          const opacity = 1 - Math.abs(progress) * 0.5;
          const scale = 1 - Math.abs(progress) * 0.05;
          
          cardRef.current.style.transform = `translateX(${moveX}px) rotateY(${rotation}deg) scale(${scale})`;
          cardRef.current.style.opacity = opacity;
          
          const intensity = Math.min(Math.abs(progress), 0.6);
          if (deltaX > 0) {
            cardRef.current.style.boxShadow = `0 0 ${intensity * 80}px rgba(34, 197, 94, ${intensity})`;
          } else if (deltaX < 0) {
            cardRef.current.style.boxShadow = `0 0 ${intensity * 80}px rgba(139, 92, 246, ${intensity})`;
          }
        }
      });
    }
  };

  const handleDragEnd = (e) => {
    if (!isDragging || isAnimating) return;
    e.preventDefault();
    setIsDragging(false);
    
    const threshold = 0.3;
    const shouldChange = Math.abs(dragProgress) > threshold;
    
    if (cardRef.current) {
      cardRef.current.style.cursor = '';
      
      if (shouldChange && dragProgress !== 0) {
        const targetX = dragProgress > 0 ? 400 : -400;
        const targetRotate = dragProgress > 0 ? 40 : -40;
        
        gsap.to(cardRef.current, {
          x: targetX,
          rotationY: targetRotate,
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            if (dragProgress > 0) {
              prevProject();
            } else {
              nextProject();
            }
          }
        });
      } else {
        gsap.to(cardRef.current, {
          x: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            if (cardRef.current) {
              cardRef.current.style.boxShadow = '';
            }
          }
        });
      }
    }
    
    setTimeout(() => {
      setDragProgress(0);
      setDragStartX(0);
      setDragCurrentX(0);
    }, 100);
  };

  // Nettoyage global
  useEffect(() => {
    const handleWindowMouseUp = () => {
      if (isDragging) {
        handleDragEnd({ preventDefault: () => {} });
      }
    };
    
    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('touchend', handleWindowMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('touchend', handleWindowMouseUp);
    };
  }, [isDragging, dragProgress]);

  useEffect(() => {
    setCurrentIndex(0);
    if (cardRef.current) {
      gsap.killTweensOf(cardRef.current);
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(0.5)", delay: 0.1 }
      );
    }
    setIsAnimating(false);
  }, [active]);

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const techRef = useRef(null);

  useEffect(() => {
    if (!isAnimating && cardRef.current && !isDragging) {
      const elements = [
        { ref: titleRef, y: -20 },
        { ref: descRef, y: 30 },
        { ref: techRef, y: 20 }
      ];
      
      elements.forEach(({ ref, y }) => {
        if (ref.current) {
          gsap.fromTo(ref.current,
            { opacity: 0, y: y },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
          );
        }
      });
    }
  }, [currentIndex]);

  const handleGlobalMouseMove = (e) => {
    document.documentElement.style.setProperty("--x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--y", `${e.clientY}px`);
  };

  const handleMouseMove = (e) => {
    if (isDragging || isAnimating) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty("--mx", `${x}px`);
    cardRef.current.style.setProperty("--my", `${y}px`);
    
    const rotateX = (y - rect.height / 2) / 25;
    const rotateY = (x - rect.width / 2) / 25;
    
    cardRef.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (isDragging || isAnimating) return;
    if (!cardRef.current) return;
    cardRef.current.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <section
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 text-white overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 "></div>
      
      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Dynamic Glow */}
      <div className="absolute inset-0 pointer-events-none 
        bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(0,255,150,0.08),transparent_50%)]" />

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
              <FaCode className="text-green-400 animate-pulse" />
              Mon Portfolio
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Projets en vedette
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Découvrez une sélection de mes meilleures réalisations
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${active === f
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-105"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-105 backdrop-blur-sm"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        {totalProjects > 0 && (
          <div className="relative" ref={containerRef}>
            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 lg:-translate-x-28 z-20
                p-5 rounded-full bg-black/60 backdrop-blur-xl border border-white/30
                hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 
                hover:scale-110 hover:border-transparent transition-all duration-300 
                disabled:opacity-50 disabled:hover:scale-100 group shadow-2xl"
            >
              <FaArrowLeft className="w-6 h-6 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={nextProject}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 lg:translate-x-28 z-20
                p-5 rounded-full bg-black/60 backdrop-blur-xl border border-white/30
                hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 
                hover:scale-110 hover:border-transparent transition-all duration-300 
                disabled:opacity-50 disabled:hover:scale-100 group shadow-2xl"
            >
              <FaArrowRight className="w-6 h-6 group-hover:text-white transition-colors" />
            </button>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-3 mb-8">
              {filtered.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToProject(idx)}
                  className={`transition-all duration-300
                    ${idx === currentIndex 
                      ? "w-10 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" 
                      : "w-2 h-2 bg-white/30 rounded-full hover:bg-white/50 hover:scale-125"
                    }`}
                />
              ))}
            </div>

            {/* Drag Instruction - Version mobile et desktop */}
            <div className="text-center mb-4">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                <span className="hidden sm:inline-block animate-pulse">🖱️</span>
                <span className="sm:hidden inline-block animate-pulse">👆</span>
                {window.innerWidth < 640 ? 'Glissez avec le doigt' : 'Glissez avec la souris'} pour naviguer
                <span className="hidden sm:inline-block animate-pulse">👉</span>
                <span className="sm:hidden inline-block animate-pulse">👉</span>
              </p>
            </div>

            {/* Card Container avec support tactile */}
            <div 
              className="min-h-[600px] lg:min-h-[550px] perspective-1000 touch-none"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300
                  hover:shadow-[0_0_60px_rgba(0,255,150,0.4)] select-none"
                style={{
                  transformStyle: "preserve-3d",
                  backgroundImage: `url(${currentProject.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                  touchAction: 'none'
                }}
              >
                {/* Overlay sombre avec gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 backdrop-blur-[2px]"></div>
                
                {/* Overlay lumineux au survol */}
                <div 
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), 
                      rgba(0,255,150,0.2), transparent 60%)`
                  }}
                ></div>

                {/* Contenu de la carte */}
                <div className="relative z-10 p-8 lg:p-10 flex flex-col min-h-[600px] lg:min-h-[550px]">
                  {/* Category Badge */}
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                      bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold
                      shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      {currentProject.category}
                    </span>
                  </div>

                  {/* Contenu principal centré */}
                  <div className="flex-1 flex flex-col justify-center items-center text-center">
                    {/* Title */}
                    <h2 ref={titleRef} className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                      {currentProject.title}
                    </h2>

                    {/* Description */}
                    <div ref={descRef} className="max-w-2xl mx-auto mb-8">
                      <p className="text-gray-200 text-base lg:text-lg leading-relaxed">
                        {currentProject.desc}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div ref={techRef} className="mb-8">
                      <h3 className="text-sm font-semibold text-green-400 mb-4 uppercase tracking-wider">
                        Technologies utilisées
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {currentProject.tech.slice(0, 8).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm 
                              text-green-300 border border-green-500/30 
                              hover:bg-green-500/30 hover:scale-105 transition-all duration-300 cursor-default"
                          >
                            {t}
                          </span>
                        ))}
                        {currentProject.tech.length > 8 && (
                          <span className="text-xs px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-gray-300">
                            +{currentProject.tech.length - 8}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 flex-col sm:flex-row">
                      <a
                        href={currentProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                          bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm
                          hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300
                          hover:scale-105 transform group"
                      >
                        <FaExternalLinkAlt className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Voir le projet
                      </a>
                      <a
                        href={currentProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                          bg-black/50 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm
                          hover:bg-white/20 hover:scale-105 transition-all duration-300 group"
                      >
                        <FaGithub className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Code source
                      </a>
                    </div>
                  </div>
                </div>

                {/* Effet de bordure lumineuse */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/20"></div>
                
                {/* Indicateur de progression de drag */}
                {isDragging && Math.abs(dragProgress) > 0.15 && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                    <div className={`backdrop-blur-md rounded-full px-6 py-3 text-lg font-bold transition-all duration-150
                      ${dragProgress > 0 ? 'bg-green-500/80' : 'bg-purple-500/80'} text-white shadow-2xl transform scale-110`}>
                      {dragProgress > 0 ? '◀◀  PRÉCÉDENT' : 'SUIVANT  ▶▶'}
                    </div>
                  </div>
                )}
                
                {/* Barre de progression du drag */}
                {isDragging && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 z-20">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-50"
                      style={{ 
                        width: `${Math.abs(dragProgress) * 100}%`,
                        marginLeft: dragProgress > 0 ? '0' : `${100 - Math.abs(dragProgress) * 100}%`
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Counter */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-400 flex items-center justify-center gap-3">
                <span className="w-12 h-px bg-gradient-to-r from-transparent to-green-500"></span>
                <span className="font-mono">
                  <span className="text-green-400 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
                  <span className="text-gray-500"> / {String(totalProjects).padStart(2, '0')}</span>
                </span>
                <span className="w-12 h-px bg-gradient-to-l from-transparent to-green-500"></span>
              </p>
            </div>
          </div>
        )}

        {/* No Projects Message */}
        {totalProjects === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucun projet trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          
          .perspective-1000 {
            perspective: 1000px;
          }
          
          .select-none {
            user-select: none;
          }
          
          .touch-none {
            touch-action: none;
          }
          
          /* Custom scrollbar */
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: rgba(34, 197, 94, 0.5);
            border-radius: 10px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(34, 197, 94, 0.8);
          }
          
          button:active {
            transform: scale(0.95);
          }
        `
      }} />
    </section>
  );
};

export default Projet;