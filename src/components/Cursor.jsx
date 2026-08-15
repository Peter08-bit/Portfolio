import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Désactiver sur écrans tactiles
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Utilisation de gsap.quickTo pour une fluidité maximale sans saccade
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

    const setRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    // Agrandissement du curseur sur éléments cliquables
    const handleElementHover = () => {
      gsap.to(ring, {
        scale: 1.6,
        borderColor: "rgba(16, 185, 129, 0.8)",
        backgroundColor: "rgba(16, 185, 129, 0.12)",
        duration: 0.25,
      });
      gsap.to(dot, { scale: 0.5, duration: 0.2 });
    };

    const handleElementLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(16, 185, 129, 0.4)",
        backgroundColor: "rgba(16, 185, 129, 0.04)",
        duration: 0.25,
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const interactiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementHover);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
    };
  }, [isVisible]);

  return (
    <>
      {/* Point central */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 bg-emerald-600 rounded-full pointer-events-none z-[9999] opacity-90 will-change-transform"
      />
      {/* Anneau suiveur dynamique */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-emerald-600/40 bg-emerald-600/[0.04] pointer-events-none z-[9998] will-change-transform"
      />
    </>
  );
};

export default Cursor;