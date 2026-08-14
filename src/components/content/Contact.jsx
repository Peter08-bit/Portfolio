import React, { useState } from "react";
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const N8N_WEBHOOK_URL = "https://peter08.app.n8n.cloud/webhook/9ac40b09-4f2a-4f8b-9f6a-d53313f4f1f2";

const Contact = () => {
  const [form, setForm] = useState({ nom: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", title: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    let errs = {};
    if (!form.nom.trim()) errs.nom = "Votre nom est requis";
    if (!form.email.trim() || !form.email.includes("@")) errs.email = "Email valide requis";
    if (!form.message.trim() || form.message.length < 10) errs.message = "Au moins 10 caractères";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_name: form.nom, from_email: form.email, subject: form.subject || "Contact Portfolio", message: form.message, date: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      setPopup({ show: true, type: "success", title: "Message transmis avec succès", message: "Merci d'avoir pris contact ! Je vous répondrai dans les plus brefs délais." });
      setForm({ nom: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      setPopup({ show: true, type: "error", title: "Échec de l'envoi", message: "Erreur réseau. Contactez-moi directement par e-mail ou WhatsApp." });
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    { icon: <FaEnvelope className="text-emerald-600" size={16} />, label: "Courriel", val: "mahasaroadvin@gmail.com", link: "mailto:mahasaroadvin@gmail.com" },
    { icon: <FaWhatsapp className="text-emerald-600" size={16} />, label: "WhatsApp", val: "+261 34 50 025 48", link: "https://wa.me/261345002548" },
    { icon: <FaMapMarkerAlt className="text-teal-600" size={16} />, label: "Localisation", val: "Madagascar (UTC+3)", link: null },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {/* En-tête */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-3">
          <HiOutlineSparkles size={12} className="text-emerald-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Contact & Collaborations</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight mb-2">
          Démarrons un <span className="text-gradient-emerald">Projet</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
          Une idée d'application, un besoin d'automatisation ou une proposition de mission ? Échangeons ensemble.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
        {/* Coordonnées */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 sm:p-7 rounded-2xl space-y-5 shadow-sm">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-1.5">Canaux directs</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Disponible pour des projets freelance, contrats ou opportunités. Réponse garantie sous 24h.
              </p>
            </div>

            <div className="space-y-3">
              {contactCards.map((card, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 shadow-sm transition-all">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">{card.icon}</div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[11px] text-slate-500 font-medium">{card.label}</span>
                    {card.link ? (
                      <a href={card.link} target="_blank" rel="noreferrer" className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors truncate block">{card.val}</a>
                    ) : (
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 block truncate">{card.val}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span>Actuellement disponible pour de nouveaux mandats.</span>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-5 sm:p-7 rounded-2xl shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Nom & Prénom <span className="text-emerald-600">*</span></label>
                  <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Jean Dupont"
                    className={`w-full bg-white border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all shadow-sm ${errors.nom ? "border-red-400" : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"}`} />
                  {errors.nom && <p className="text-[11px] text-red-500 mt-1">{errors.nom}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Email <span className="text-emerald-600">*</span></label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jean@entreprise.com"
                    className={`w-full bg-white border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all shadow-sm ${errors.email ? "border-red-400" : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"}`} />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Sujet</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Création d'une application / Mission freelance"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all" />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Message <span className="text-emerald-600">*</span></label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                  className={`w-full bg-white border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all resize-none shadow-sm ${errors.message ? "border-red-400" : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"}`} />
                {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs sm:text-sm shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_22px_rgba(16,185,129,0.45)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                {loading ? <span>Transmission en cours...</span> : <><FaPaperPlane size={12} /><span>Envoyer mon message</span></>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modale */}
      {popup.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl text-center flex flex-col items-center">
            <button onClick={() => setPopup({ ...popup, show: false })} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900">
              <FaTimes size={12} />
            </button>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${popup.type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-600" : "bg-red-50 border border-red-200 text-red-600"}`}>
              {popup.type === "success" ? <FaCheckCircle size={22} /> : <FaExclamationCircle size={22} />}
            </div>
            <h3 className="font-display font-bold text-base text-slate-900 mb-2">{popup.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-5">{popup.message}</p>
            <button onClick={() => setPopup({ ...popup, show: false })} className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-900 transition-colors">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;