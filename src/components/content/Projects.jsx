import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaExternalLinkAlt, FaGithub, FaEye, FaTimes, FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const projects = [
  {
    id: 1, title: "Location de Résidence", category: "Full Stack", image: "/LDR.jpeg",
    desc: "Plateforme full-stack de gestion locative avec 3 interfaces distinctes, notifications temps réel et 5 modes de paiement.",
    highlights: ["Architecture modulaire 3 tiers", "Notifications temps réel Socket.io", "Paiements sécurisés intégrés"],
    tech: ["React 18", "TypeScript", "Node.js", "Express", "MySQL", "Socket.io"],
    demoLink: "#", githubLink: "#"
  },
  {
    id: 2, title: "Inspection & Gestion Matériels", category: "Web Apps", image: "/GIM.jpeg",
    desc: "Application d'entreprise pour le suivi des équipements industriels avec gestion des rôles (RBAC) et tableau de bord décisionnel.",
    highlights: ["Tableaux de bord décisionnels", "Gestion des rôles & permissions", "Rapports d'audit automatisés"],
    tech: ["PHP", "Laravel", "Firebase", "MySQL", "Tailwind CSS"],
    demoLink: "#", githubLink: "#"
  },
  {
    id: 3, title: "Skynegis — Sécurité & Urgence", category: "Mobile", image: "/Skynegis.png",
    desc: "Application mobile de protection personnelle : détection d'inactivité, cercles de confiance et alerte SOS instantanée.",
    highlights: ["Détection d'inactivité", "Cercles de sécurité temps réel", "Déclencheur d'urgence SOS"],
    tech: ["React Native", "Expo Go", "Geolocation API", "Mobile UX"],
    demoLink: "#", githubLink: "#"
  },
  {
    id: 4, title: "Vérificateur Certificats QR Code", category: "Mobile", image: "/Mob1.jfif",
    desc: "Application mobile d'authentification de certificats académiques via scan de QR codes cryptés.",
    highlights: ["Scan ultra-rapide", "Validation hors-ligne", "Chiffrement des données"],
    tech: ["React Native", "Expo Go", "QR Scanner", "Crypto API"],
    demoLink: "#", githubLink: "#"
  },
  {
    id: 5, title: "Automatisation n8n — Social Media", category: "Automatisation", image: "/N8N1.jpeg",
    desc: "Workflow d'automatisation pour pages sociales avec analyse des messages, réponses intelligentes et synchronisation CRM.",
    highlights: ["Réponses contextuelles", "Routage des demandes critiques", "Webhook n8n temps réel"],
    tech: ["n8n", "JavaScript", "Meta Graph API", "Webhooks"],
    demoLink: "#", githubLink: "#"
  },
  {
    id: 6, title: "Automation n8n — Relances & Emails", category: "Automatisation", image: "/N8N2.jpeg",
    desc: "Système de séquençage d'e-mails transactionnels avec déclencheurs personnalisés et logs d'activité.",
    highlights: ["Segmentation dynamique", "Templates personnalisés", "Statistiques de délivrabilité"],
    tech: ["n8n", "Node.js", "SMTP / API Resend", "JSON"],
    demoLink: "#", githubLink: "#"
  },
  {
    id: 7, title: "E-Commerce Pipeline Automation", category: "Automatisation", image: "/N8N3.jpeg",
    desc: "Pipeline de synchronisation de catalogue, notifications de commandes et mise à jour d'inventaire multi-plateformes.",
    highlights: ["Synchronisation multi-boutiques", "Alertes de stocks faibles", "Intégration d'APIs REST"],
    tech: ["n8n", "REST APIs", "Webhooks", "JavaScript"],
    demoLink: "#", githubLink: "#"
  }
];

const categories = ["Tous", "Full Stack", "Web Apps", "Mobile", "Automatisation"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef(null);

  const filteredProjects = activeCategory === "Tous" ? projects : projects.filter(p => p.category === activeCategory);
  const total = filteredProjects.length;

  useEffect(() => { setCurrentIndex(0); }, [activeCategory]);

  useEffect(() => {
    if (!autoplay || total <= 1) return;
    const interval = setInterval(() => setCurrentIndex(prev => (prev + 1) % total), 4500);
    return () => clearInterval(interval);
  }, [autoplay, total]);

  const prevSlide = useCallback(() => { if (total === 0) return; setCurrentIndex(prev => (prev - 1 + total) % total); }, [total]);
  const nextSlide = useCallback(() => { if (total === 0) return; setCurrentIndex(prev => (prev + 1) % total); }, [total]);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "ArrowLeft") prevSlide(); if (e.key === "ArrowRight") nextSlide(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {/* En-tête */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-3">
          <HiOutlineSparkles size={12} className="text-emerald-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Portfolio & Réalisations</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-2">
          Carrousel de <span className="text-gradient-emerald">Projets</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
          Parcourez mes réalisations interactives grâce au carrousel dynamique.
        </p>

        <div className="flex flex-wrap justify-center gap-1.5 mt-5 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-white text-emerald-700 shadow-sm border border-emerald-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {total > 0 ? (
        <div className="relative w-full">
          <div className="overflow-hidden rounded-2xl w-full">
            <div ref={sliderRef} className="flex transition-transform duration-500 ease-out w-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {filteredProjects.map((project, idx) => (
                <div key={project.id} className="w-full flex-shrink-0 px-1">
                  <div className="glass-panel rounded-2xl overflow-hidden shadow-md border border-slate-200 flex flex-col lg:flex-row w-full">
                    {/* Image */}
                    <div className="relative lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-200 min-h-[220px] sm:min-h-[300px]">
                      <img src={project.image} alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="%23f1f5f9"%3E%3Crect width="600" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="16"%3E' + project.title + '%3C/text%3E%3C/svg%3E'; }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 shadow-sm">{project.category}</span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="lg:w-1/2 p-5 sm:p-7 flex flex-col justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                            Projet #{String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-medium text-slate-400">{idx + 1} / {total}</span>
                        </div>

                        <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 leading-tight">{project.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{project.desc}</p>

                        {project.highlights && (
                          <div className="space-y-1.5">
                            {project.highlights.map((h, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pt-1">
                          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-1.5">Technologies :</span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t, i) => (
                              <span key={i} className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
                        <button onClick={() => setSelectedProject(project)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-[0_2px_10px_rgba(16,185,129,0.3)] hover:bg-emerald-500 transition-all">
                          <FaEye size={11} /><span>Voir les détails</span>
                        </button>
                        <a href={project.demoLink} target="_blank" rel="noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs shadow-sm transition-all" title="Démo">
                          <FaExternalLinkAlt size={11} /><span className="hidden sm:inline">Démo</span>
                        </a>
                        <a href={project.githubLink} target="_blank" rel="noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs shadow-sm transition-all" title="Code">
                          <FaGithub size={12} /><span className="hidden sm:inline">Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contrôles */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-5 px-1">
            <button onClick={prevSlide}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm hover:scale-105 active:scale-95 transition-all" aria-label="Précédent">
              <FaChevronLeft size={13} />
            </button>

            <div className="flex items-center gap-2.5 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
              <button onClick={() => setAutoplay(!autoplay)} className="p-1 rounded-lg text-slate-500 hover:text-slate-900 transition-colors" title={autoplay ? "Pause" : "Play"}>
                {autoplay ? <FaPause size={11} /> : <FaPlay size={11} />}
              </button>
              <div className="flex items-center gap-1.5">
                {filteredProjects.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-6 bg-emerald-600" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
                    aria-label={`Projet ${idx + 1}`} />
                ))}
              </div>
            </div>

            <button onClick={nextSlide}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm hover:scale-105 active:scale-95 transition-all" aria-label="Suivant">
              <FaChevronRight size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-14 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto">
          <p className="text-slate-500 text-sm">Aucun projet dans cette catégorie.</p>
        </div>
      )}

      {/* Modale */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <button onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors" aria-label="Fermer">
                <FaTimes size={13} />
              </button>
              <div className="absolute bottom-4 left-5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500 text-white">{selectedProject.category}</span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">{selectedProject.title}</h3>
              </div>
            </div>

            <div className="p-5 sm:p-7 overflow-y-auto space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">Description</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedProject.desc}</p>
              </div>
              {selectedProject.highlights && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Points forts</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />{h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5 bg-slate-50">
              <button onClick={() => setSelectedProject(null)} className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 font-semibold transition-colors">
                Fermer
              </button>
              <a href={selectedProject.demoLink} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 transition-colors shadow-sm">
                <FaExternalLinkAlt size={11} /><span>Accéder au projet</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;