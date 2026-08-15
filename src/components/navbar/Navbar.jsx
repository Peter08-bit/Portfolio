import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Home, User, Briefcase, Mail, Code, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { NavbarMenu } from "../../mockData/data.js";

gsap.registerPlugin(ScrollToPlugin);

const iconMap = {
  home:    <Home size={15} />,
  user:    <User size={15} />,
  code:    <Code size={15} />,
  project: <Briefcase size={15} />,
  contact: <Mail size={15} />,
};

const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [active, setActive]     = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const menuRef      = useRef(null);
  const navRef       = useRef(null);
  const progressRef  = useRef(null);
  const linksRef     = useRef([]);

  /* ── Scroll spy ───────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    NavbarMenu.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ── Scroll progress bar ──────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrolled(scrollTop > 20);
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Entrée cinématique de la navbar ─────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 }
      )
      .fromTo(linksRef.current.filter(Boolean),
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07 },
        "-=0.45"
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  /* ── Mobile dropdown ──────────────────────────── */
  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { y: -14, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: "power2.out" }
      );
      /* Stagger des items du menu mobile */
      const items = menuRef.current.querySelectorAll("button, a");
      gsap.fromTo(items,
        { x: -16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.28, stagger: 0.06, ease: "power2.out", delay: 0.05 }
      );
    }
  }, [isOpen]);

  /* ── Hover élastique sur les liens desktop ──── */
  const handleLinkEnter = (el) => {
    if (!el) return;
    gsap.to(el, { scale: 1.04, duration: 0.25, ease: "back.out(2)" });
  };
  const handleLinkLeave = (el) => {
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  const scrollTo = (section) => {
    const el = document.getElementById(section);
    if (!el) return;
    setActive(section);
    setIsOpen(false);
    gsap.to(window, {
      duration: 0.95,
      scrollTo: { y: el, offsetY: 70 },
      ease: "power3.inOut",
    });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-3 left-1/2 -translate-x-1/2 w-[98%] max-w-[1600px] z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.10)] py-2 px-4 sm:px-8 rounded-2xl"
          : "bg-white/78 backdrop-blur-lg border border-slate-200/70 shadow-[0_4px_20px_rgba(15,23,42,0.05)] py-3 px-4 sm:px-8 rounded-2xl"
      }`}
    >
      {/* Barre de progression scroll */}
      <div ref={progressRef} className="scroll-progress-bar" />

      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center p-1 group-hover:border-emerald-400 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.25)] transition-all duration-300">
              <img src="/AM.png" alt="logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-sm tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                ADVIN<span className="text-emerald-500">.</span>M
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                Portfolio
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Disponible</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1 bg-slate-100/80 border border-slate-200/80 p-1 rounded-xl">
          {NavbarMenu.map((item, i) => {
            const isActive = active === item.section;
            return (
              <li key={item.id}>
                <button
                  ref={(el) => (linksRef.current[i] = el)}
                  onClick={() => scrollTo(item.section)}
                  onMouseEnter={(e) => handleLinkEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleLinkLeave(e.currentTarget)}
                  className={`flex items-center gap-1.5 py-1.5 px-4 rounded-lg text-xs font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-emerald-700 bg-white font-semibold shadow-sm border border-emerald-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  <span className={isActive ? "text-emerald-600" : "text-slate-400"}>
                    {iconMap[item.icon]}
                  </span>
                  {item.title}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right CTA */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => scrollTo("contact")}
            className="btn-shimmer hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs shadow-[0_2px_10px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_18px_rgba(16,185,129,0.45)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
          >
            <Sparkles size={13} className="text-white" />
            <span>Me Contacter</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden mt-3 pt-3 border-t border-slate-200 flex flex-col gap-1"
        >
          {NavbarMenu.map((item) => {
            const isActive = active === item.section;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.section)}
                className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className={isActive ? "text-emerald-600" : "text-slate-400"}>
                  {iconMap[item.icon]}
                </span>
                {item.title}
              </button>
            );
          })}

          <div className="pt-2 mt-1 border-t border-slate-100">
            <button
              onClick={() => scrollTo("contact")}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs shadow-[0_2px_10px_rgba(16,185,129,0.3)]"
            >
              <Sparkles size={14} />
              Me Contacter
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;