import Link from "next/link";
import MotionGroup from "./MotionGroup.js";
import styles from "./site.module.css";

export default function PageHero({ eyebrow, title, copy, primary, secondary, microcopy, note, landscape = true }) {
  return (
    <MotionGroup as="section" variant="fadeIn" className={`${styles.pageHero}${landscape ? ` ${styles.pageHeroLandscape}` : ""}`}>
      <div className={`${styles.pageHeroCopy}${microcopy ? ` ${styles.pageHeroCopyWithTrust}` : ""}`}><p className={styles.eyebrow}>{eyebrow}</p><h1>{title}</h1><p>{copy}</p>{(primary || secondary) && <div className={styles.actions}>{primary && <Link className={styles.primaryButton} href={primary.href} data-analytics-event={primary.event} data-analytics-page={primary.page} data-analytics-section={primary.section} data-analytics-label={primary.label}>{primary.label}</Link>}{secondary && <Link className={styles.secondaryButton} href={secondary.href} data-analytics-event={secondary.event} data-analytics-page={secondary.page} data-analytics-section={secondary.section} data-analytics-label={secondary.label}>{secondary.label}</Link>}</div>}{microcopy && <p className={styles.pageHeroTrust}>{microcopy}</p>}{note && <small className={styles.pageHeroNote}>{note}</small>}</div>
    </MotionGroup>
  );
}
