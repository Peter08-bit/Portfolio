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
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const navRef = useRef(null);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    NavbarMenu.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { y: -10, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const scrollTo = (section) => {
    const el = document.getElementById(section);
    if (!el) return;
    setActive(section);
    setIsOpen(false);
    gsap.to(window, {
      duration: 0.9,
      scrollTo: { y: el, offsetY: 70 },
      ease: "power3.inOut",
    });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-3 left-1/2 -translate-x-1/2 w-[98%] max-w-[1600px] z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.08)] py-2.5 px-4 sm:px-8 rounded-2xl"
          : "bg-white/75 backdrop-blur-lg border border-slate-200/70 shadow-[0_4px_20px_rgba(15,23,42,0.05)] py-3 px-4 sm:px-8 rounded-2xl"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo & Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center p-1 group-hover:border-emerald-400 transition-colors">
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

          {/* Badge Disponible */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Disponible</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1.5 bg-slate-100/80 border border-slate-200/80 p-1 rounded-xl">
          {NavbarMenu.map((item) => {
            const isActive = active === item.section;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.section)}
                  className={`flex items-center gap-2 py-1.5 px-4 rounded-lg text-xs font-medium transition-all duration-200 ${
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

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => scrollTo("contact")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs shadow-[0_2px_10px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles size={13} className="text-white" />
            <span>Me Contacter</span>
          </button>

          {/* Mobile Menu Button */}
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
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs"
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