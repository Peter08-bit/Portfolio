import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

// ✅ Remplacez par l'URL Webhook de votre workflow n8n
const N8N_WEBHOOK_URL = "https://peter08.app.n8n.cloud/webhook/9ac40b09-4f2a-4f8b-9f6a-d53313f4f1f2";

const Contact = () => {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [sendError, setSendError] = useState(false);

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
    if (form.message.length < 10) newErrors.message = "Message trop court";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Envoi vers le Webhook n8n ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSendError(false);

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

      // Succès
      setShowPopup(true);
      setForm({ nom: "", email: "", message: "" });
      setErrors({});

    } catch (error) {
      console.error("Erreur n8n webhook :", error);
      setSendError(true);
    } finally {
      setLoading(false);
    }
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
          Let's Work Together
        </h1>

        <p className="fade-in text-center text-white mb-12">
          Have a project in mind? Let's discuss how we can bring your ideas to life.
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

              {/* Erreur d'envoi */}
              {sendError && (
                <p className="text-red-400 text-sm text-center">
                  ❌ Une erreur est survenue. Vérifiez votre connexion et réessayez.
                </p>
              )}

              {/* Button */}
              <button
                type="submit"
                onClick={handleRipple}
                disabled={loading}
                className="relative overflow-hidden py-3 rounded-lg font-semibold text-black
                  bg-gradient-to-r from-green-400 to-emerald-500
                  hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-60"
              >
                {loading ? "Envoi en cours..." : "Send Message ✈️"}
              </button>

            </form>
          </div>

          {/* ───── RIGHT SIDE ───── */}
          <div className="fade-in flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Let's Connect</h2>
              <p className="text-gray-400 text-sm">
                I'm always open to discussing new projects or opportunities.
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

      {/* ───── POPUP DE SUCCÈS ───── */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-[#0d1117] border border-green-400/40 rounded-2xl p-8 text-center max-w-sm w-full mx-4 shadow-2xl"
            style={{ animation: "popupIn 0.3s ease forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-full border-2 border-green-400 bg-green-400/10 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h3 className="text-green-400 text-xl font-semibold mb-2">
              Message envoyé !
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Merci de m'avoir contacté. Je vous répondrai très bientôt. 🙏
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold px-8 py-2.5 rounded-lg hover:scale-105 transition-all duration-300"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* CSS */}
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
        @keyframes popupIn {
          from { transform: scale(0.8); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Contact;