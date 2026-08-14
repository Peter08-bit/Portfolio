import React, { useState } from "react";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDatabase, FaDocker, FaPhp, FaFigma } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiTailwindcss, SiNextdotjs, SiPostgresql, SiMongodb, SiMysql, SiN8N, SiExpo } from "react-icons/si";
import { HiOutlineSparkles } from "react-icons/hi";

const skillCategories = [
  {
    id: "frontend", title: "Frontend & Mobile",
    skills: [
      { name: "React / Vite", level: 90, icon: <FaReact className="text-cyan-500" /> },
      { name: "React Native / Expo", level: 85, icon: <SiExpo className="text-slate-800" /> },
      { name: "TypeScript", level: 80, icon: <SiTypescript className="text-blue-600" /> },
      { name: "JavaScript (ES6+)", level: 92, icon: <SiJavascript className="text-yellow-500" /> },
      { name: "Tailwind CSS", level: 95, icon: <SiTailwindcss className="text-teal-500" /> },
      { name: "Next.js", level: 75, icon: <SiNextdotjs className="text-slate-900" /> },
    ],
  },
  {
    id: "backend", title: "Backend & Bases de Données",
    skills: [
      { name: "Node.js / Express", level: 88, icon: <FaNodeJs className="text-green-600" /> },
      { name: "PHP / Laravel", level: 80, icon: <FaPhp className="text-indigo-600" /> },
      { name: "MySQL", level: 85, icon: <SiMysql className="text-blue-500" /> },
      { name: "PostgreSQL", level: 80, icon: <SiPostgresql className="text-blue-600" /> },
      { name: "MongoDB", level: 78, icon: <SiMongodb className="text-green-500" /> },
      { name: "Python", level: 75, icon: <FaPython className="text-yellow-600" /> },
    ],
  },
  {
    id: "tools", title: "Automatisation & Outils",
    skills: [
      { name: "n8n Workflow Automation", level: 90, icon: <SiN8N className="text-rose-500" /> },
      { name: "Git / GitHub Actions", level: 85, icon: <FaGitAlt className="text-orange-500" /> },
      { name: "Docker & Containerisation", level: 70, icon: <FaDocker className="text-blue-500" /> },
      { name: "REST APIs & Webhooks", level: 92, icon: <FaDatabase className="text-emerald-600" /> },
      { name: "UI/UX Design & Figma", level: 75, icon: <FaFigma className="text-purple-500" /> },
    ],
  },
];

const Competence = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-3">
          <HiOutlineSparkles size={12} className="text-emerald-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Stack Technique</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-2">
          Compétences & <span className="text-gradient-emerald">Expertise</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
          Une maîtrise globale des technologies modernes pour concevoir des produits fiables et évolutifs.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-6 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200">
          {skillCategories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === cat.id
                  ? "bg-white text-emerald-700 shadow-sm border border-emerald-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}>
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {skillCategories.find((c) => c.id === activeTab)?.skills.map((skill, idx) => (
          <div key={idx} className="glass-panel glass-panel-hover p-4 sm:p-5 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-base">{skill.icon}</div>
                <span className="font-semibold text-sm text-slate-900">{skill.name}</span>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Competence;