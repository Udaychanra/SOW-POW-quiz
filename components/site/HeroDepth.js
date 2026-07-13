"use client";

import { useRef } from "react";

export default function HeroDepth({ className, children }) {
  const ref = useRef(null);

  function move(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
    ref.current.style.setProperty("--depth-x", `${(x * 4).toFixed(2)}px`);
    ref.current.style.setProperty("--depth-y", `${(y * 3).toFixed(2)}px`);
  }

  function reset() {
    ref.current.style.setProperty("--depth-x", "0px");
    ref.current.style.setProperty("--depth-y", "0px");
  }

  return <div ref={ref} className={className} onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}
