import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Loation de Residence",
    category: "Full Stack",
    image: "/LDR.jpeg",
    desc: "Location du Résidence est une plateforme web full-stack de gestion locative composée de 3 interfaces distinctes — un site vitrine public, une application client et un panneau admin — connectées à une seule API backend.Le projet couvre tout le cycle de vie d'une location : de la consultation des annonces jusqu'à l'expiration du contrat, avec notifications temps réel, rappels automatiques, et 5 modes de paiement adaptés au marché malgache (MVola, Orange Money, Airtel Money, carte, virement). L'admin dispose d'un tableau de bord avec graphiques Recharts pour piloter l'activité en temps réel.",
    tech: ["React 18", "TypeScript", "SweetAlert2", "Stripe", "Prisma", "Socket.io client", "Node.js", "Express", "Prisma", "MySQL (XAMPP)", "JWT + bcryptjs", "Socket.io", "node-cron", "Multer"],
  },
  {
    title: "Inspection Materiels",
    category: "Web Apps",
    image: "/GIM.jpeg",
    desc: "Application web complète développée avec Laravel 10 et Tailwind CSS,permettant à une entreprise de gérer et suivre l'inspection de ses équipements et matériels, avec un système de rôles Admin/Utilisateur et un tableau de bord interactif.",
    tech: ["PHP", "Laravel backend", "Firebase","MySQL",],
  },
  {
    title: "Component Library",
    category: "Mobile",
    image: "/Mob1.jfif",
    desc: "Application scan QR code securiser du certificat d'un etudiant a l'Université de tulear.",
    tech: ["React Native", "Expo Go"],
  },
    {
    title: "Automatisation Page Facebook",
    category: "N8N",
    image: "/N8N1.jpeg",
    desc: "Une assistance Chatbot dans une page facebook et qui repond des client",
    tech: ["N8N", "JS"],
  },
  {
    title: "Recevoir Email",
    category: "N8N",
    image: "/N8N2.jpeg",
    desc: "Une assistance Chatbot pour envoyer un email automatique",
    tech: ["N8N", "JS"],
  },
    {
    title: "Recevoir Email",
    category: "N8N",
    image: "/N8N3.jpeg",
    desc: "Une workflow  automation avec N8N ce concerner E-commerce",
    tech: ["N8N", "JS"],
  },
];

const filters = ["All", "Web Apps", "Mobile", "Full Stack", "N8N"];

const Projet = () => {
  const [active, setActive] = useState("All");
  const cardsRef = useRef([]);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  // 🎬 Animation
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, [active]);

  // 🟢 GLOBAL GLOW
  const handleGlobalMouseMove = (e) => {
    document.documentElement.style.setProperty("--x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--y", `${e.clientY}px`);
  };

  // 🧲 3D + LOCAL GLOW
  const handleMove = (e, i) => {
    const card = cardsRef.current[i];
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Glow local
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    // Tilt
    const rotateX = -(y - rect.height / 2) / 18;
    const rotateY = (x - rect.width / 2) / 18;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const reset = (i) => {
    const card = cardsRef.current[i];
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <section
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen py-20 px-6 text-white overflow-hidden"
    >

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none 
        bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(0,255,150,0.12),transparent_40%)]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Title */}
        <h1 className="text-center text-4xl md:text-6xl font-bold mb-4 text-green-400">
         Projets en vedette
        </h1>

        <p className="text-center text-gray-400 mb-12">
       Présentation de mes meilleurs travaux et réalisations
        </p>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                active === f
                  ? "bg-green-500 text-black shadow-[0_0_25px_rgba(34,197,94,0.8)]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 perspective">

          {filtered.map((p, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseMove={(e) => handleMove(e, i)}
              onMouseLeave={() => reset(i)}
              className="group relative rounded-2xl overflow-hidden transition-all duration-300
              bg-white/5 backdrop-blur-xl border border-white/10
              shadow-[0_0_40px_rgba(0,255,100,0.05)]
              hover:shadow-[0_0_80px_rgba(0,255,150,0.25)]"
              
              style={{
                background: `
                  radial-gradient(circle at var(--mx) var(--my), rgba(0,255,150,0.25), transparent 60%),
                  rgba(255,255,255,0.05)
                `
              }}
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-56 object-cover transition duration-700 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                  <button className="p-3 bg-white/10 rounded-xl hover:bg-green-500 transition">
                    <FaExternalLinkAlt />
                  </button>
                  <button className="p-3 bg-white/10 rounded-xl hover:bg-green-500 transition">
                    <FaGithub />
                  </button>
                </div>

                {/* CATEGORY */}
                <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-black/60 backdrop-blur text-green-400">
                  {p.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-3 relative z-10">
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-400">{p.desc}</p>

                {/* TECH */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400"
                    >
                      {t}
                    </span>
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

export default Projet;