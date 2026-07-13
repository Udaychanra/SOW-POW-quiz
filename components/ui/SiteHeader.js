"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteLogo from "../site/SiteLogo.js";
import styles from "../quiz/quizGateway.module.css";

const links = [
  ["Home", "/"],
  ["SOW Method", "/sow-method"],
  ["Resources", "/resources"],
  ["About", "/about"],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event) { if (event.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logoLink} aria-label="One Small Seed home"><SiteLogo surface="dark" priority className={styles.gatewayLogo} /></Link>
        <button type="button" className={styles.menuButton} aria-controls="quiz-gateway-navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}><span></span><span></span><span></span></button>
        <nav id="quiz-gateway-navigation" className={`${styles.navigation}${open ? ` ${styles.navigationOpen}` : ""}`} aria-label="Quiz gateway navigation">
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className={styles.mobileHomeLink} href="/" onClick={() => setOpen(false)}>Back to Home</Link>
        </nav>
        <Link className={styles.homeLink} href="/">Back to Home</Link>
      </div>
    </header>
  );
}
