import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { FaWhatsapp, FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const WHATSAPP_NUMBER = "261326167599";
const N8N_CHAT_WEBHOOK = "https://peter08.app.n8n.cloud/webhook/0fb4f103-d287-49ab-bcef-328c9dc2abc2";

const ChatPopup = ({ onClose }) => {
  const popupRef = useRef(null);
  const bottomRef = useRef(null);
  const [sessionId] = useState(() => "session_" + Date.now() + "_" + Math.random().toString(36).slice(2));
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! Je suis l'assistant interactif d'Advin Mahasaro. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      popupRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const closePopup = () => {
    gsap.to(popupRef.current, {
      opacity: 0,
      y: 15,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(N8N_CHAT_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          chatInput: text,
          sessionId: sessionId
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: data.output || data.text || data.chatInput || "Merci pour votre message ! Je transmets l'information à Advin.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Désolé, une brève interruption est survenue. N'hésitez pas à utiliser le formulaire ou WhatsApp !",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      ref={popupRef}
      className="w-80 sm:w-96 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col bg-white/95 backdrop-blur-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-emerald-300 p-0.5 bg-white">
            <img src="/img.jpg" alt="avatar" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div>
            <p className="text-slate-900 text-xs font-semibold">Assistant Virtuel</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 text-[10px] font-medium">En ligne</span>
            </div>
          </div>
        </div>
        <button
          onClick={closePopup}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <FaTimes size={12} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 p-4 h-64 overflow-y-auto bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                msg.from === "user"
                  ? "bg-emerald-600 text-white font-medium rounded-br-none shadow-sm"
                  : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-2xl rounded-bl-none flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Votre message..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 text-xs placeholder-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-sm"
        >
          <FaPaperPlane size={11} />
        </button>
      </div>
    </div>
  );
};

const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      {showChat && <ChatPopup onClose={() => setShowChat(false)} />}

      {/* Menu étendu */}
      {open && (
        <div className="flex flex-col items-end gap-2.5 mb-1 animate-fadeIn">
          {/* WhatsApp */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 bg-white/90 backdrop-blur-md shadow-md">
              WhatsApp
            </span>
            <a
              href={"https://wa.me/" + WHATSAPP_NUMBER}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#25D366] text-white shadow-[0_4px_12px_rgba(37,211,102,0.35)] hover:scale-105 transition-transform"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>

          {/* Chat assistant */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 bg-white/90 backdrop-blur-md shadow-md">
              Assistant IA
            </span>
            <button
              onClick={() => {
                setShowChat(true);
                setOpen(false);
              }}
              className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_4px_12px_rgba(16,185,129,0.35)] hover:scale-105 transition-transform"
              aria-label="Assistant IA"
            >
              <FaComments size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Bouton Trigger Principal */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-[0_4px_16px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_22px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 transition-all"
        aria-label="Ouvrir le menu d'assistance"
      >
        {open ? <FaTimes size={16} /> : <HiOutlineSparkles size={20} />}
      </button>
    </div>
  );
};

export default FloatingContact;