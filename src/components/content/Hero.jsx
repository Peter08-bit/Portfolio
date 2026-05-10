import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { 
  FaArrowRight, 
  FaRocket, 
  FaCode, 
  FaRobot, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter,
  FaPlay,
  FaStar,
  FaDownload
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

gsap.registerPlugin(ScrollToPlugin);

const FloatingParticle = ({ delay, duration, size, startX, startY }) => (
  <div
    className="absolute rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 blur-sm"
    style={{
      width: size,
      height: size,
      left: `${startX}%`,
      top: `${startY}%`,
      animation: `float ${duration}s ${delay}s ease-in-out infinite`,
    }}
  />
);

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);
  const badgeRef = useRef(null);
  const statsRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x: e.clientX, y: e.clientY });
    document.documentElement.style.setProperty("--x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    
    // Effet parallaxe sur les particules
    if (containerRef.current) {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      containerRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  }, []);

  // Animation d'intro avancée
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Badge
    tl.fromTo(badgeRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
    // Titre avec effet de révélation
    .fromTo(titleRef.current,
      { y: 100, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "power4.out" },
      "-=0.4"
    )
    // Texte descriptif
    .fromTo(textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    )
    // Boutons avec stagger
    .fromTo(btnRef.current.children,
      { y: 30, opacity: 0, scale: 0.9 },
      { 
        y: 0, opacity: 1, scale: 1, 
        duration: 0.6, 
        stagger: 0.15,
        ease: "back.out(1.5)" 
      },
      "-=0.5"
    )
    // Statistiques
    .fromTo(statsRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      "-=0.3"
    );

    // Animation continue des éléments flottants
    gsap.to(".floating-element", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        each: 0.5,
        from: "random"
      }
    });

  }, []);

  // Canvas particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;
        
        if (this.life >= this.maxLife ||
            this.x < 0 || this.x > canvas.width ||
            this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    // Créer les particules
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Lignes entre particules proches
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      }
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: el, offsetY: 80 },
      ease: "power3.inOut",
    });
  }, []);

  const stats = [
    { icon: <FaCode />, value: "50+", label: "Projets Réalisés" },
    { icon: <FaRocket />, value: "3+", label: "Années d'XP" },
    { icon: <FaRobot />, value: "100+", label: "Automatisations" },
    { icon: <FaStar />, value: "20+", label: "Clients Satisfaits" },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a1a]"
    >
      {/* Canvas pour les particules */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Fond dynamique */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-purple-950/20" />
        
        {/* Cercles lumineux */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        
        {/* Grille */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
      </div>

      {/* Éléments flottants décoratifs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 text-4xl opacity-20">💻</div>
        <div className="floating-element absolute top-40 right-20 text-3xl opacity-20">⚡</div>
        <div className="floating-element absolute bottom-40 left-20 text-3xl opacity-20">🤖</div>
        <div className="floating-element absolute bottom-20 right-10 text-4xl opacity-20">🚀</div>
        <div className="floating-element absolute top-1/3 left-1/4 text-2xl opacity-20">🔧</div>
        <div className="floating-element absolute top-2/3 right-1/4 text-2xl opacity-20">✨</div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="space-y-8">
          {/* Badge animé */}
          <div ref={badgeRef}>
            <div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full 
                bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 
                backdrop-blur-xl border border-emerald-500/30
                hover:border-emerald-400/50 transition-all duration-500
                shadow-[0_0_30px_rgba(16,185,129,0.15)]"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Disponible pour collaborations
              </span>
              <FaArrowRight className={`w-3 h-3 text-emerald-400 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
            </div>
          </div>

          {/* Titre principal */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
          >
            <span className="text-white block">
              Je crée des solutions
            </span>
            <span className="relative inline-block mt-2">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Intelligentes & Automatisées
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p
            ref={textRef}
            className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Développeur full-stack passionné, je transforme vos idées en 
            <span className="text-emerald-400 font-semibold"> applications performantes </span>
            et automatise vos processus avec 
            <span className="text-cyan-400 font-semibold"> n8n </span>
            pour booster votre productivité.
          </p>

          {/* Boutons d'action */}
          <div ref={btnRef} className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection("projet")}
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 
                text-white font-semibold rounded-2xl overflow-hidden
                shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)]
                hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.7)]
                transition-all duration-500 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaRocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Voir mes projets
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-2xl
                backdrop-blur-sm bg-white/5
                hover:border-emerald-400/50 hover:bg-emerald-500/10
                transition-all duration-500 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <HiOutlineMail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Me contacter
              </span>
            </button>

            <button
              onClick={() => scrollToSection("competence")}
              className="group px-8 py-4 border-2 border-white/10 text-gray-400 font-semibold rounded-2xl
                hover:border-white/30 hover:text-white hover:bg-white/5
                transition-all duration-500 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <FaDownload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                Mon CV
              </span>
            </button>
          </div>

          {/* Statistiques */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm 
                  border border-white/[0.05] hover:bg-white/[0.05] 
                  transition-all duration-500 hover:scale-105 cursor-default"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                <div className="relative z-10">
                  <div className="text-emerald-400 text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof / Réseaux sociaux */}
          <div className="flex justify-center gap-6 pt-8">
            {[
              { icon: <FaGithub />, href: "#", label: "GitHub" },
              { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
              { icon: <FaTwitter />, href: "#", label: "Twitter" },
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-all duration-300 
                  hover:scale-125 transform p-2"
                title={social.label}
              >
                <span className="text-2xl">{social.icon}</span>
              </a>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-gray-500 animate-bounce">
              <span className="text-xs">Scroll pour explorer</span>
              <div className="w-5 h-8 rounded-full border-2 border-gray-500 flex justify-center">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 animate-scroll" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-5deg); }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes scroll {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.5; }
        }
        
        .animate-scroll {
          animation: scroll 2s infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;