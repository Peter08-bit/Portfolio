import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

// ✅ Remplacez par l'URL Webhook de votre workflow n8n
const N8N_WEBHOOK_URL = "https://peter08.app.n8n.cloud/webhook/9ac40b09-4f2a-4f8b-9f6a-d53313f4f1f2";

const Contact = () => {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", title: "", message: "" });

  // ── GSAP Animation ──
  useEffect(() => {
    gsap.fromTo(
      ".fade-in",
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, []);

  // ── Glow souris ──
  const handleMouseMove = (e) => {
    document.documentElement.style.setProperty("--x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--y", `${e.clientY}px`);
  };

  // ── Form handling ──
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.nom) newErrors.nom = "Nom requis";
    if (!form.email.includes("@")) newErrors.email = "Email invalide";
    if (form.message.length < 10) newErrors.message = "Message trop court (min 10 caractères)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Envoi vers le Webhook n8n ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_name: form.nom,
          from_email: form.email,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      // Succès - Afficher popup de confirmation
      setPopup({
        show: true,
        type: "success",
        title: "✅ Message envoyé !",
        message: "Merci de m'avoir contacté. Je vous répondrai très bientôt. 🙏"
      });
      
      setForm({ nom: "", email: "", message: "" });
      setErrors({});

    } catch (error) {
      console.error("Erreur n8n webhook :", error);
      // Erreur - Afficher popup d'erreur
      setPopup({
        show: true,
        type: "error",
        title: "❌ Erreur d'envoi",
        message: "Une erreur est survenue. Vérifiez votre connexion et réessayez."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fermer la popup
  const closePopup = () => {
    setPopup({ ...popup, show: false });
  };

  // ── Ripple effect ──
  const handleRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - diameter / 2}px`;
    circle.style.top = `${e.clientY - button.offsetTop - diameter / 2}px`;
    circle.classList.add("ripple");
    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen text-white px-4 py-24 overflow-hidden"
    >
      {/* Glow dynamique */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(0,255,150,0.15),transparent_40%)]" />

      <div className="relative max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="fade-in text-center text-green-400 text-5xl font-bold mb-4">
         Travaillons ensemble
        </h1>

        <p className="fade-in text-center text-white mb-12">
         Vous avez un projet en tête ? Parlons-en et voyons comment nous pouvons donner vie à vos idées.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* ───── FORM ───── */}
          <div className="fade-in bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* Nom */}
              <div className="relative">
                <input
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border border-white/10 rounded-lg px-4 pt-5 pb-2 outline-none focus:border-green-400"
                />
                <label className="absolute left-4 top-2 text-gray-400 text-sm
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                  peer-focus:top-2 peer-focus:text-sm transition-all">
                  Name
                </label>
                {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border border-white/10 rounded-lg px-4 pt-5 pb-2 outline-none focus:border-green-400"
                />
                <label className="absolute left-4 top-2 text-gray-400 text-sm
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                  peer-focus:top-2 peer-focus:text-sm transition-all">
                  Email
                </label>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder=" "
                  rows={5}
                  className="peer w-full bg-transparent border border-white/10 rounded-lg px-4 pt-5 pb-2 outline-none focus:border-green-400 resize-none"
                />
                <label className="absolute left-4 top-2 text-gray-400 text-sm
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                  peer-focus:top-2 peer-focus:text-sm transition-all">
                  Message
                </label>
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Button */}
              <button
                type="submit"
                onClick={handleRipple}
                disabled={loading}
                className="relative overflow-hidden py-3 rounded-lg font-semibold text-black
                  bg-gradient-to-r from-green-400 to-emerald-500
                  hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-60"
              >
                {loading ? "Envoi en cours..." : "Envoyer un message ✨"}
              </button>

            </form>
          </div>

          {/* ───── RIGHT SIDE ───── */}
          <div className="fade-in flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Connectons-nous</h2>
              <p className="text-gray-400 text-sm">
              Je suis toujours ouvert à la discussion de nouveaux projets ou opportunités.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 hover:border-green-400 transition">
              <div className="text-green-400">📧</div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p>mahasaroadvin@gmail.com</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 hover:border-green-400 transition">
              <div className="text-green-400">📍</div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p>Madagascar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───── SWEET ALERT POPUP CONFIRMATION ───── */}
      {popup.show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn"
          onClick={closePopup}
        >
          <div
            className={`relative bg-gradient-to-br from-[#0d1117] to-[#161b22] 
              border-2 rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl
              ${popup.type === 'success' ? 'border-green-400/60' : 'border-red-400/60'}
              animate-slideIn`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animation confettis pour le succès */}
            {popup.type === 'success' && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <div className="confetti absolute top-0 left-1/4 animate-confetti-1">🎉</div>
                <div className="confetti absolute top-0 left-1/2 animate-confetti-2">✨</div>
                <div className="confetti absolute top-0 left-3/4 animate-confetti-3">🎊</div>
              </div>
            )}

            {/* Icône animée */}
            <div className={`relative z-10 w-20 h-20 mx-auto mb-6 rounded-full 
              flex items-center justify-center animate-bounce-in
              ${popup.type === 'success' 
                ? 'border-2 border-green-400 bg-green-400/20' 
                : 'border-2 border-red-400 bg-red-400/20'}`}>
              {popup.type === 'success' ? (
                <svg
                  className="w-10 h-10 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  className="w-10 h-10 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
            </div>

            {/* Titre */}
            <h3 className={`relative z-10 text-2xl font-bold mb-3
              ${popup.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {popup.title}
            </h3>

            {/* Message */}
            <p className="relative z-10 text-gray-300 text-sm mb-8 leading-relaxed">
              {popup.message}
            </p>

            {/* Bouton de fermeture */}
            <button
              onClick={closePopup}
              className={`relative z-10 font-semibold px-8 py-3 rounded-xl 
                transition-all duration-300 transform hover:scale-105 shadow-lg
                ${popup.type === 'success'
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:shadow-green-500/30'
                  : 'bg-gradient-to-r from-red-400 to-red-500 text-white hover:shadow-red-500/30'}`}
            >
              Super ! ✨
            </button>
          </div>
        </div>
      )}

      {/* CSS avec animations améliorées */}
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          transform: scale(0);
          animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
          to { transform: scale(4); opacity: 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            transform: scale(0.8) translateY(-50px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes bounceIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes confetti1 {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(300px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes confetti2 {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(300px) rotate(-360deg);
            opacity: 0;
          }
        }
        
        @keyframes confetti3 {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(300px) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .animate-confetti-1 {
          animation: confetti1 2s ease-out forwards;
        }
        
        .animate-confetti-2 {
          animation: confetti2 2.5s ease-out forwards;
        }
        
        .animate-confetti-3 {
          animation: confetti3 2s ease-out forwards;
        }
        
        .confetti {
          font-size: 24px;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default Contact;