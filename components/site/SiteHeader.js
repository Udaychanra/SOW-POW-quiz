"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNav } from "../../content/site-content.js";
import SiteLogo from "./SiteLogo.js";
import styles from "./site.module.css";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    function closeOnEscape(event) { if (event.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  useEffect(() => {
    function updateShadow() { setScrolled(window.scrollY > 18); }
    updateShadow();
    window.addEventListener("scroll", updateShadow, { passive: true });
    return () => window.removeEventListener("scroll", updateShadow);
  }, []);

  return (
    <header className={`${styles.header}${scrolled ? ` ${styles.headerScrolled}` : ""}`}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logoLink} aria-label="One Small Seed home"><SiteLogo surface="dark" priority /></Link>
        <button type="button" className={styles.menuButton} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}>
          <span></span><span></span><span></span>
        </button>
        <nav id="site-navigation" className={`${styles.nav}${open ? ` ${styles.navOpen}` : ""}`} aria-label="Primary navigation">
          {siteNav.map((item) => <Link key={item.href} href={item.href} className={`${styles.navLink}${pathname === item.href ? ` ${styles.navActive}` : ""}`}>{item.label}</Link>)}
          <Link href="/sow-pow-quiz" className={`${styles.quizButton} ${styles.mobileQuizButton}`}>Take The Quiz</Link>
        </nav>
        <Link href="/sow-pow-quiz" className={`${styles.quizButton} ${styles.desktopQuizButton}`}>Take The Quiz</Link>
      </div>
    </header>
  );
}
