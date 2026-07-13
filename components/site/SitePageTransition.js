"use client";

import { usePathname } from "next/navigation";
import styles from "./motion.module.css";

export default function SitePageTransition({ children }) {
  const pathname = usePathname();
  return <div key={pathname} className={styles.pageTransition}>{children}</div>;
}
