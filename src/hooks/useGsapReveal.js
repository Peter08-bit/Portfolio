import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook générique pour animer un élément ou une liste d'éléments
 * au scroll avec ScrollTrigger.
 *
 * @param {React.RefObject} ref - ref de l'élément conteneur
 * @param {Object} options
 * @param {string}  options.selector      - sélecteur CSS des enfants à animer (défaut : null = le ref lui-même)
 * @param {Object}  options.from          - état initial gsap.fromTo
 * @param {Object}  options.to            - état final gsap.fromTo
 * @param {number}  options.stagger       - délai entre chaque enfant (défaut 0.1)
 * @param {string}  options.start         - ScrollTrigger start (défaut "top 85%")
 * @param {boolean} options.scrub         - activer le scrub (défaut false)
 * @param {string}  options.ease          - ease (défaut "power3.out")
 * @param {number}  options.duration      - durée (défaut 0.8)
 * @param {number}  options.delay         - délai initial (défaut 0)
 */
const useGsapReveal = (ref, options = {}) => {
  const {
    selector = null,
    from = { y: 50, opacity: 0 },
    to = { y: 0, opacity: 1 },
    stagger = 0.1,
    start = "top 85%",
    scrub = false,
    ease = "power3.out",
    duration = 0.8,
    delay = 0,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const targets = selector
      ? ref.current.querySelectorAll(selector)
      : [ref.current];

    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          delay,
          stagger: targets.length > 1 ? stagger : 0,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
            scrub,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);
};

export default useGsapReveal;
