import styles from "./site.module.css";

export default function SiteIcon({ name, label, size = "medium" }) {
  return (
    <svg viewBox="0 0 64 64" className={`${styles.icon} ${styles[`icon_${size}`]}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : "true"}>
      <use href={`/site/premium-icons.svg#${name}`} width="64" height="64" />
    </svg>
  );
}
