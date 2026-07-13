"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./motion.module.css";

const variants = {
  fadeUp: styles.fadeUp,
  fadeIn: styles.fadeIn,
  scale: styles.scaleReveal,
  fromLeft: styles.fromLeft,
  fromRight: styles.fromRight,
  line: styles.lineDraw,
};

export default function MotionGroup({ as: Tag = "div", variant = "fadeUp", stagger = false, className = "", children, once = true, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    element.dataset.motionReady = "true";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        if (once) observer.disconnect();
      } else if (!once) setVisible(false);
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  return <Tag ref={ref} className={`${styles.motionBase} ${variants[variant] || variants.fadeUp}${stagger ? ` ${styles.stagger}` : ""}${className ? ` ${className}` : ""}`} data-visible={visible ? "true" : "false"} {...props}>{children}</Tag>;
}
