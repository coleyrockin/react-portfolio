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

    const isMobile = window.innerWidth < 700;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold ?? (isMobile ? 0.02 : 0.15),
        rootMargin: isMobile ? "0px 0px 60px 0px" : "0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, isVisible]);

  return [ref, isVisible];
}
