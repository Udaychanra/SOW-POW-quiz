import MotionGroup from "./MotionGroup.js";
import styles from "./site.module.css";

export default function SectionHeading({ eyebrow, title, copy, align = "center" }) {
  return <MotionGroup className={`${styles.sectionHeading} ${align === "left" ? styles.alignLeft : ""}`} variant="fadeUp">{eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}<h2>{title}</h2>{copy && <p>{copy}</p>}</MotionGroup>;
}
