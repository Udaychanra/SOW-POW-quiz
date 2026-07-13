import Link from "next/link";
import MotionGroup from "./MotionGroup.js";
import styles from "./site.module.css";

export default function PageHero({ eyebrow, title, copy, primary, secondary, landscape = true }) {
  return (
    <MotionGroup as="section" variant="fadeIn" className={`${styles.pageHero}${landscape ? ` ${styles.pageHeroLandscape}` : ""}`}>
      <div className={styles.pageHeroCopy}><p className={styles.eyebrow}>{eyebrow}</p><h1>{title}</h1><p>{copy}</p>{(primary || secondary) && <div className={styles.actions}>{primary && <Link className={styles.primaryButton} href={primary.href}>{primary.label}</Link>}{secondary && <Link className={styles.secondaryButton} href={secondary.href}>{secondary.label}</Link>}</div>}</div>
    </MotionGroup>
  );
}
