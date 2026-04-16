import { useEffect, useRef } from "react";

// Dark-only aurora/mesh background. Blobs drift slowly using sin/cos phases
// and are composited with "screen" over the backdrop color.
const CONFIG = {
  bg: "#0a0e1a",
  blobs: [
    { x: 0.3, y: 0.2, r: 0.45, color: [34, 211, 238], phase: 0, speed: 0.004 },
    { x: 0.7, y: 0.8, r: 0.4, color: [168, 85, 247], phase: 2, speed: 0.003 },
    { x: 0.8, y: 0.3, r: 0.35, color: [59, 130, 246], phase: 4, speed: 0.005 },
    { x: 0.2, y: 0.7, r: 0.38, color: [251, 146, 60], phase: 1, speed: 0.0035 },
  ],
  opacity: [0.6, 0.2, 0],
  composite: "screen",
};

export default function NeuralCanvas({ className = "" }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w, h, dpr;
    const blobs = CONFIG.blobs.map((b) => ({ ...b }));

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = CONFIG.bg;
      ctx.fillRect(0, 0, w, h);

      for (const blob of blobs) {
        if (!prefersReduced) {
          blob.phase += blob.speed;
        }

        const cx = (blob.x + Math.sin(blob.phase) * 0.15) * w;
        const cy = (blob.y + Math.cos(blob.phase * 0.8) * 0.15) * h;
        const r = blob.r * Math.max(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const [cr, cg, cb] = blob.color;
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${CONFIG.opacity[0]})`);
        grad.addColorStop(0.4, `rgba(${cr},${cg},${cb},${CONFIG.opacity[1]})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},${CONFIG.opacity[2]})`);

        ctx.globalCompositeOperation = CONFIG.composite;
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.globalCompositeOperation = "source-over";
      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    animRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        borderRadius: "inherit",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
