import React from "react";
import useInViewport from "../hooks/useInViewport";

export default function RevealItem({ delay = 0, className = "", children }) {
  const [ref, isVisible] = useInViewport();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""} reveal-delay-${delay} ${className}`}
    >
      {children}
    </div>
  );
}
