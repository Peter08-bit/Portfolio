import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const WHATSAPP_NUMBER = "261345002548";

const IcoWhatsapp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IcoSend = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="black" style={{ transform: "rotate(-40deg) translateX(2px)" }}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const IcoClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="black">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const IcoChat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </svg>
);

const IcoSendMsg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const IcoX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const ChatPopup = ({ onClose }) => {
  const popupRef = useRef(null);
  const bottomRef = useRef(null);
  const [sessionId] = useState(() => "session_" + Date.now() + "_" + Math.random().toString(36).slice(2));
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! 👋 Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      popupRef.current,
      { opacity: 0, y: 30, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
    );
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const closePopup = () => {
    gsap.to(popupRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.92,
      duration: 0.25,
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
      const res = await fetch("https://peter08.app.n8n.cloud/webhook/0fb4f103-d287-49ab-bcef-328c9dc2abc2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          chatInput: text,
          sessionId: sessionId
        }),
      });

      const data = await res.json();
      console.log("Réponse n8n :", data);

      setMessages((prev) => [
        ...prev,
      {
        from: "bot",
        text: data.output          // ✅ champ principal
          || data.text            // ✅ variante
          || data.chatInput         // ✅ variante
          || JSON.stringify(data) // 🔍 debug si rien ne marche
          || "Réponse vide 😅",
      },
    ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Erreur de connexion au serveur 😢",
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
      className="w-80 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,255,150,0.15)]"
      style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-green-500/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-green-400">
            <img src="/img.jpg" alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Peter Advin</p>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">En ligne</span>
            </div>
          </div>
        </div>
        <button
          onClick={closePopup}
          className="text-white/50 hover:text-white transition-colors"
        >
          <IcoX />
        </button>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={"flex " + (msg.from === "user" ? "justify-end" : "justify-start")}>
            <div
              className={
                "max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed " +
                (msg.from === "user"
                  ? "bg-green-500 text-black rounded-br-sm"
                  : "bg-white/10 text-white rounded-bl-sm")
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-3 py-3 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Écrire un message..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-white/30 outline-none focus:border-green-400 transition-colors"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl bg-green-400 flex items-center justify-center text-black hover:bg-green-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <IcoSendMsg />
        </button>
      </div>
    </div>
  );
};

const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const mainRef = useRef(null);
  const waRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (open && waRef.current && chatRef.current) {
      gsap.fromTo(
        [waRef.current, chatRef.current],
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: -0.08, ease: "back.out(1.7)" }
      );
    }
  }, [open]);

  const toggle = () => {
    if (!open) {
      gsap.to(mainRef.current, { rotate: 45, scale: 1.05, duration: 0.3, ease: "power2.out" });
      setOpen(true);
    } else {
      gsap.to(mainRef.current, { rotate: 0, scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to([chatRef.current, waRef.current].filter(Boolean), {
        opacity: 0,
        y: 16,
        scale: 0.85,
        duration: 0.25,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          setOpen(false);
          setShowChat(false);
        },
      });
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">

      {showChat && <ChatPopup onClose={() => setShowChat(false)} />}

      {open && (
        <div ref={waRef} className="flex items-center gap-3">
          <span className="text-green-400 text-xs px-3 py-1 rounded-full border border-green-400/30 bg-black/70 backdrop-blur whitespace-nowrap">
            WhatsApp
          </span>

          <a
            href={"https://wa.me/" + WHATSAPP_NUMBER}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[#25D366] shadow-[0_0_14px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform duration-200"
            aria-label="WhatsApp"
          >
            <IcoWhatsapp />
          </a>
        </div>
      )}

      {open && (
        <div ref={chatRef} className="flex items-center gap-3">
          <span className="text-green-400 text-xs px-3 py-1 rounded-full border border-green-400/30 bg-black/70 backdrop-blur whitespace-nowrap">
            Chat
          </span>
          <button
            onClick={() => setShowChat(true)}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-green-400 shadow-[0_0_14px_rgba(74,222,128,0.5)] hover:scale-110 transition-transform duration-200"
            aria-label="Chat"
          >
            <IcoChat />
          </button>
        </div>
      )}

      <button
        ref={mainRef}
        onClick={toggle}
        className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-green-400 to-emerald-500 shadow-[0_0_20px_rgba(74,222,128,0.5)] hover:shadow-[0_0_35px_rgba(74,222,128,0.7)] transition-shadow duration-300"
        aria-label="Ouvrir le menu contact"
      >
        {open ? <IcoClose /> : <IcoSend />}
      </button>

    </div>
  );
};

export default FloatingContact;