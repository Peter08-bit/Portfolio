import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { 
  FaReact, FaJs, FaNodeJs, FaGitAlt, FaFigma, FaPython, FaPhp,
  FaHtml5, FaCss3Alt, FaVuejs
} from "react-icons/fa";

import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiVite, SiGithub, 
  SiLaravel, SiFlutter, SiMongodb, SiVercel
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const N8nIcon = () => (
  <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="16" fill="#EA4B71" />
    <text x="50" y="68" textAnchor="middle" fontSize="44" fontWeight="bold" fill="white" fontFamily="Arial">n8n</text>
  </svg>
);

const categories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "HTML",         icon: <FaHtml5 />,       color: "text-orange-500", level: "Expert",      progress: 90 },
      { name: "CSS",          icon: <FaCss3Alt />,     color: "text-blue-400",   level: "Expert",      progress: 90 },
      { name: "React.js",     icon: <FaReact />,       color: "text-cyan-400",   level: "Expert",      progress: 90 },
      { name: "JavaScript",   icon: <FaJs />,          color: "text-yellow-400", level: "Expert",      progress: 95 },
      { name: "TypeScript",   icon: <SiTypescript />,  color: "text-blue-500",   level: "Advanced",    progress: 80 },
      { name: "Next.js",      icon: <SiNextdotjs />,   color: "text-white",      level: "Advanced",    progress: 75 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400",   level: "Expert",      progress: 90 },
      { name: "Laravel",      icon: <SiLaravel />,     color: "text-red-500",    level: "Advanced",    progress: 80 },
      { name: "Flutter",      icon: <SiFlutter />,     color: "text-blue-400",   level: "Advanced",    progress: 80 },
      { name: "Vue.js",       icon: <FaVuejs />,       color: "text-green-400",  level: "Advanced",    progress: 80 },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Node.js",   icon: <FaNodeJs />, color: "text-green-500",  level: "Intermediate", progress: 70 },
      { name: "REST APIs", icon: <FaNodeJs />, color: "text-green-400",  level: "Advanced",     progress: 85 },
      { name: "Python",    icon: <FaPython />, color: "text-yellow-400", level: "Advanced",     progress: 85 },
      { name: "PHP",       icon: <FaPhp />,    color: "text-indigo-400", level: "Advanced",     progress: 80 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git",     icon: <FaGitAlt />,  color: "text-orange-500", level: "Advanced",     progress: 85 },
      { name: "GitHub",  icon: <SiGithub />,  color: "text-white",      level: "Advanced",     progress: 85 },
      { name: "Figma",   icon: <FaFigma />,   color: "text-purple-400", level: "Intermediate", progress: 70 },
      { name: "Vite",    icon: <SiVite />,    color: "text-yellow-300", level: "Advanced",     progress: 80 },
      { name: "N8N",     icon: <N8nIcon />,   color: "text-pink-400",   level: "Intermediate", progress: 70 },
      { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500",  level: "Intermediate", progress: 70 },
      { name: "Vercel",  icon: <SiVercel />,  color: "text-white",      level: "Intermediate", progress: 70 },
    ],
  },
];

const Competence = () => {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleGlobalMouseMove = (e) => {
    document.documentElement.style.setProperty("--x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--y", `${e.clientY}px`);
  };

  const handleCardMove = (e, i) => {
    const card = cardsRef.current[i];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    const rotateX = -(y - rect.height / 2) / 16;
    const rotateY =  (x - rect.width  / 2) / 16;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.06,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  };

  const handleHover = (i) => {
    const card = cardsRef.current[i];
    if (!card) return;

    gsap.to(card.querySelector(".card-content"), {
      z: 40,
      y: -10,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(card.querySelector(".card-title"), {
      y: -4,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
    });

    card.querySelectorAll(".progress-bar").forEach((bar) => {
      gsap.to(bar, {
        width: bar.dataset.width,
        duration: 1.2,
        ease: "power3.out",
      });
    });

    gsap.fromTo(
      card.querySelectorAll(".skill-row"),
      { x: -6, opacity: 0.6 },
      { x: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: "power2.out" }
    );
  };

  const handleLeave = (i) => {
    const card = cardsRef.current[i];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(card.querySelector(".card-content"), {
      z: 0,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(card.querySelector(".card-title"), {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    card.querySelectorAll(".progress-bar").forEach((bar) => {
      gsap.to(bar, {
        width: "0%",
        duration: 0.5,
        ease: "power2.in",
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen py-20 px-6 text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(0,255,150,0.15),transparent_40%)]" />

      <div className="max-w-6xl mx-auto relative z-10">

        <h1 className="text-center text-4xl md:text-5xl font-bold mb-4 text-green-400">
         Compétences et technologies
        </h1>

        <p className="text-center text-gray-400 mb-16">
          Un aperçu complet de mes compétences techniques
        </p>

        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: "1200px" }}>
          {categories.map((cat, index) => (
            <div
              key={cat.title}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleLeave(index)}
              onMouseMove={(e) => handleCardMove(e, index)}
              className="relative rounded-2xl p-6 border border-white/10
              shadow-[0_0_40px_rgba(0,255,100,0.08)]
              hover:shadow-[0_0_80px_rgba(0,255,150,0.3)]
              transition-shadow duration-300"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
                background: `
                  radial-gradient(circle at var(--mx, 50%) var(--my, 50%),
                  rgba(0,255,150,0.18), transparent 60%),
                  rgba(255,255,255,0.05)
                `,
              }}
            >
              <div className="card-content">
                <h2 className="card-title text-lg font-semibold mb-6 text-green-400">
                  {cat.title}
                </h2>

                <div className="space-y-5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="skill-row">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <div className="flex items-center gap-3">
                          <div className={"text-xl " + skill.color}>
                            {skill.icon}
                          </div>
                          <span className="text-white/90">{skill.name}</span>
                        </div>
                        <span className="text-green-400 text-xs">{skill.level}</span>
                      </div>

                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="progress-bar h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                          data-width={skill.progress + "%"}
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Competence;