import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function useInViewport(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (isVisible) return;
    const el = ref.current;
    if (!el) return;

    // Re-evaluate breakpoint on each observer creation. Recreate the observer
    // when the viewport crosses the mobile threshold so DevTools-driven
    // resizes don't leave stale rootMargin/threshold values in effect.
    const mql = window.matchMedia("(max-width: 699px)");
    let observer;

    const setup = () => {
      observer?.disconnect();
      const isMobile = mql.matches;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: options.threshold ?? (isMobile ? 0.02 : 0.15),
          rootMargin: isMobile ? "0px 0px 60px 0px" : "0px",
        }
      );
      observer.observe(el);
    };

    setup();
    mql.addEventListener("change", setup);

    return () => {
      observer?.disconnect();
      mql.removeEventListener("change", setup);
    };
  }, [options.threshold, isVisible]);

  return [ref, isVisible];
}
