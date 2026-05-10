import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaReact, FaJs, FaNodeJs, FaGitAlt, FaFigma, FaPython, FaPhp,
  FaHtml5, FaCss3Alt, FaVuejs, FaSearch, FaStar, FaTrophy,
  FaRocket, FaLayerGroup
} from "react-icons/fa";
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiVite, SiGithub, 
  SiLaravel, SiFlutter, SiMongodb, SiVercel, SiGraphql
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const N8nIcon = () => (
  <svg width="20" height="20" viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <rect width="100" height="100" rx="16" fill="#EA4B71" />
    <text x="50" y="68" textAnchor="middle" fontSize="44" fontWeight="bold" fill="white" fontFamily="Arial">n8n</text>
  </svg>
);

const categories = [
  {
    title: "Frontend Development",
    icon: <FaLayerGroup className="w-5 h-5" />,
    color: "from-emerald-400 to-cyan-400",
    bgColor: "from-emerald-500/10 to-cyan-500/10",
    borderColor: "border-emerald-500/30",
    skills: [
      { name: "HTML", icon: <FaHtml5 />, color: "text-orange-500", bgColor: "bg-orange-500/10", level: "Expert", progress: 95 },
      { name: "CSS", icon: <FaCss3Alt />, color: "text-blue-400", bgColor: "bg-blue-500/10", level: "Expert", progress: 92 },
      { name: "React.js", icon: <FaReact />, color: "text-cyan-400", bgColor: "bg-cyan-500/10", level: "Expert", progress: 90 },
      { name: "JavaScript", icon: <FaJs />, color: "text-yellow-400", bgColor: "bg-yellow-500/10", level: "Expert", progress: 95 },
      { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500", bgColor: "bg-blue-500/10", level: "Advanced", progress: 85 },
      { name: "Next.js", icon: <SiNextdotjs />, color: "text-white", bgColor: "bg-white/10", level: "Advanced", progress: 80 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400", bgColor: "bg-cyan-500/10", level: "Expert", progress: 90 },
      { name: "Vue.js", icon: <FaVuejs />, color: "text-green-400", bgColor: "bg-green-500/10", level: "Advanced", progress: 82 },
    ],
  },
  {
    title: "Backend & APIs",
    icon: <FaRocket className="w-5 h-5" />,
    color: "from-purple-400 to-pink-400",
    bgColor: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/30",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500", bgColor: "bg-green-500/10", level: "Advanced", progress: 78 },
      { name: "REST APIs", icon: <SiGraphql />, color: "text-pink-400", bgColor: "bg-pink-500/10", level: "Advanced", progress: 85 },
      { name: "Python", icon: <FaPython />, color: "text-yellow-400", bgColor: "bg-yellow-500/10", level: "Advanced", progress: 82 },
      { name: "PHP", icon: <FaPhp />, color: "text-indigo-400", bgColor: "bg-indigo-500/10", level: "Advanced", progress: 80 },
      { name: "Laravel", icon: <SiLaravel />, color: "text-red-500", bgColor: "bg-red-500/10", level: "Advanced", progress: 78 },
      { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500", bgColor: "bg-green-500/10", level: "Intermediate", progress: 72 },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: <FaStar className="w-5 h-5" />,
    color: "from-amber-400 to-orange-400",
    bgColor: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/30",
    skills: [
      { name: "Git", icon: <FaGitAlt />, color: "text-orange-500", bgColor: "bg-orange-500/10", level: "Advanced", progress: 88 },
      { name: "GitHub", icon: <SiGithub />, color: "text-white", bgColor: "bg-white/10", level: "Advanced", progress: 85 },
      { name: "Figma", icon: <FaFigma />, color: "text-purple-400", bgColor: "bg-purple-500/10", level: "Intermediate", progress: 75 },
      { name: "Vite", icon: <SiVite />, color: "text-yellow-300", bgColor: "bg-yellow-500/10", level: "Advanced", progress: 82 },
      { name: "N8N", icon: <N8nIcon />, color: "text-pink-400", bgColor: "bg-pink-500/10", level: "Intermediate", progress: 72 },
      { name: "Flutter", icon: <SiFlutter />, color: "text-blue-400", bgColor: "bg-blue-500/10", level: "Advanced", progress: 78 },
      { name: "Vercel", icon: <SiVercel />, color: "text-white", bgColor: "bg-white/10", level: "Intermediate", progress: 75 },
    ],
  },
];

const SkillCard = ({ skill, isActive, index }) => {
  const progressRef = useRef(null);
  const rowRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      gsap.to(progressRef.current, {
        width: `${skill.progress}%`,
        duration: 1.5,
        delay: index * 0.1,
        ease: "power3.out",
      });
      
      gsap.fromTo(rowRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, delay: index * 0.1, ease: "power2.out" }
      );
    }
  }, [isActive, skill.progress, index]);

  return (
    <div ref={rowRef} className="group relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`relative p-2 rounded-xl ${skill.bgColor} backdrop-blur-sm 
            border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
            <span className={`text-lg ${skill.color}`}>
              {skill.icon}
            </span>
            <div className={`absolute inset-0 rounded-xl ${skill.bgColor} opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
          </div>
          <div>
            <span className="text-sm font-medium text-white/90 block">
              {skill.name}
            </span>
            <span className={`text-xs ${skill.color} opacity-80`}>
              {skill.level}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-white/50">{skill.progress}%</span>
          {skill.progress >= 90 && (
            <FaTrophy className="w-3 h-3 text-yellow-400 animate-pulse" />
          )}
        </div>
      </div>

      <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div
          ref={progressRef}
          className="h-full rounded-full relative transition-all duration-1000"
          style={{ 
            width: "0%",
            background: `linear-gradient(90deg, ${getProgressColor(skill.progress)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 
            animate-shimmer" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white 
            shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        </div>
      </div>
    </div>
  );
};

const getProgressColor = (progress) => {
  if (progress >= 90) return '#10b981, #059669';
  if (progress >= 80) return '#3b82f6, #2563eb';
  if (progress >= 70) return '#8b5cf6, #7c3aed';
  return '#ec4899, #db2777';
};

const Competence = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);
  const [activeCards, setActiveCards] = useState({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Animation des cartes
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, rotateX: 5 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleGlobalMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    document.documentElement.style.setProperty("--x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--y", `${e.clientY}px`);
  }, []);

  const handleCardHover = useCallback((index) => {
    setActiveCards(prev => ({ ...prev, [index]: true }));
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1.03,
      rotateX: -2,
      rotateY: 3,
      duration: 0.5,
      ease: "power3.out",
      transformPerspective: 1000,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 80px rgba(16, 185, 129, 0.2)",
    });
  }, []);

  const handleCardLeave = useCallback((index) => {
    setActiveCards(prev => ({ ...prev, [index]: false }));
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(16, 185, 129, 0.05)",
    });
  }, []);

  const handleCardMove = useCallback((e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a1a]"
    >
      {/* Fond dynamique */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-pink-950/20" />
        
        {/* Grille décorative */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* Particules lumineuses */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>
      </div>

      {/* Effet de lumière suivant la souris */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16,185,129,0.08), transparent 40%)`
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header modernisé */}
        <div ref={headerRef} className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full 
            bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] 
            hover:border-emerald-500/30 transition-colors duration-500">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Stack Technique</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
              Compétences & Technologies
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Un aperçu détaillé de mon arsenal technique, 
            <span className="text-emerald-400"> constamment enrichi </span> 
            pour rester à la pointe de l'innovation
          </p>
        </div>

        {/* Grille de cartes 3D */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8" style={{ perspective: "1200px" }}>
          {categories.map((cat, index) => (
            <div
              key={cat.title}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
              onMouseMove={(e) => handleCardMove(e, index)}
              className={`relative rounded-2xl p-6 border transition-all duration-500
                cursor-default group ${cat.borderColor}
                hover:border-opacity-50`}
              style={{
                transformStyle: "preserve-3d",
                background: `
                  radial-gradient(circle at var(--mx, 50%) var(--my, 50%), 
                  rgba(16, 185, 129, 0.15), transparent 50%),
                  linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))
                `,
                backdropFilter: 'blur(10px)',
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(16, 185, 129, 0.05)",
              }}
            >
              {/* Effet de bordure lumineuse */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cat.color} opacity-0 
                group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
              
              <div className="relative z-10">
                {/* En-tête de carte */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`relative p-3 rounded-2xl bg-gradient-to-br ${cat.bgColor} 
                    backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-white text-xl">{cat.icon}</span>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cat.color} 
                      opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg`} />
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold bg-gradient-to-r ${cat.color} 
                      bg-clip-text text-transparent`}>
                      {cat.title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {cat.skills.length} technologies
                    </p>
                  </div>
                </div>

                {/* Liste des compétences */}
                <div className="space-y-5">
                  {cat.skills.map((skill, skillIndex) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      isActive={activeCards[index]}
                      index={skillIndex}
                    />
                  ))}
                </div>
              </div>

              {/* Coin décoratif */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 
                transition-opacity duration-500 pointer-events-none">
                <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${cat.color} 
                  opacity-10 rounded-bl-3xl`} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer statistiques */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Technologies", value: "21+", icon: <FaLayerGroup className="w-4 h-4" /> },
            { label: "Années d'XP", value: "3+", icon: <FaRocket className="w-4 h-4" /> },
            { label: "Projets", value: "15+", icon: <FaStar className="w-4 h-4" /> },
            { label: "Certifications", value: "5+", icon: <FaTrophy className="w-4 h-4" /> },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="relative p-4 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05]
                hover:bg-white/[0.04] transition-all duration-300 group cursor-default"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </span>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Competence;