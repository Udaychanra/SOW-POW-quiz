import Link from "next/link";
import MotionGroup from "./MotionGroup.js";
import styles from "./site.module.css";

export default function CTASection({ title, copy, primary, secondary, dark = false }) {
  return <MotionGroup as="section" variant="scale" className={`${styles.ctaSection}${dark ? ` ${styles.ctaDark}` : ""}`}><div><h2>{title}</h2>{copy && <p>{copy}</p>}</div><div className={styles.actions}><Link className={dark ? styles.goldButton : styles.primaryButton} href={primary.href}>{primary.label}</Link>{secondary && <Link className={dark ? styles.lightOutlineButton : styles.secondaryButton} href={secondary.href}>{secondary.label}</Link>}</div></MotionGroup>;
}
