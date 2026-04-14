import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Home, User, Briefcase, Mail, Code } from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { NavbarMenu } from "../../mockData/data.js";

gsap.registerPlugin(ScrollToPlugin);

const iconMap = {
  home:    <Home size={18} />,
  user:    <User size={18} />,
  code:    <Code size={18} />,
  project: <Briefcase size={18} />,
  contact: <Mail size={18} />,
};

const Navbar = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [active, setActive]       = useState("hero");
  const menuRef                   = useRef(null);
  const navRef                    = useRef(null);

  // ── Scroll spy : détecte la section visible ──────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    NavbarMenu.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Animation entrée Navbar ───────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // ── Animation menu mobile ─────────────────────────────────────
  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { y: -20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        menuRef.current.querySelectorAll("li"),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, delay: 0.15, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  // ── Scroll vers section avec GSAP ────────────────────────────
  const scrollTo = (section) => {
    const el = document.getElementById(section);
    if (!el) return;
    setActive(section);
    setIsOpen(false);
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: el, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] z-50
      bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-3xl
      transition-all duration-300"
    >
      <div className="flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 font-bold uppercase text-white hover:opacity-80 transition"
        >
        <img src="/AM.png" alt="logo" className="w-13 h-10" />
          <p className="text-green-400">MAHASARO</p>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-2 text-white">
          {NavbarMenu.map((item) => {
            const isActive = active === item.section;
            return (
              <li key={item.id} className="relative group">
                <button
                  onClick={() => scrollTo(item.section)}
                  className={`flex items-center gap-2 py-2 px-4 rounded-xl font-semibold
                  transition-all duration-300 ${
                    isActive
                      ? "text-green-400 bg-green-400/10"
                      : "hover:text-green-400 hover:bg-white/5"
                  }`}
                >
                  <span className={`transition-colors duration-300 ${isActive ? "text-green-400" : "text-white/60 group-hover:text-green-400"}`}>
                    {iconMap[item.icon]}
                  </span>
                  {item.title}
                  <span className={`absolute left-4 -bottom-0.5 h-0.5 bg-green-400 rounded-full transition-all duration-300 ${isActive ? "w-[calc(100%-2rem)]" : "w-0 group-hover:w-[calc(100%-2rem)]"}`} />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 hover:scale-110 transition-transform cursor-pointer">
            <img src="/img.jpg" alt="avatar" className="w-full h-full object-cover" />
          </div>

          {/* Mobile Btn */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-green-400 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex justify-center pb-4 px-4">
          <ul
            ref={menuRef}
            className="bg-white/10 backdrop-blur-xl w-full rounded-2xl shadow-lg p-4 flex flex-col gap-2"
          >
            {NavbarMenu.map((item) => {
              const isActive = active === item.section;
              return (
                <li key={item.id} className="w-full">
                  <button
                    onClick={() => scrollTo(item.section)}
                    className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-green-400/20 text-green-400 border border-green-400/30"
                        : "hover:bg-white/10 text-white"
                    }`}
                  >
                    <span className={isActive ? "text-green-400" : "text-white/60"}>
                      {iconMap[item.icon]}
                    </span>
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;