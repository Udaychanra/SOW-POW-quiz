import SiteIcon from "./SiteIcon.js";
import styles from "./site.module.css";

export default function IconMedallion({ name, label = "", tone = "sage", size = "medium", floating = false, children }) {
  const className = [
    styles.iconMedallion,
    styles[`medallion_${tone}`],
    styles[`medallion_${size}`],
    floating && styles.medallionFloating,
  ].filter(Boolean).join(" ");

  return <span className={className}>{children || <SiteIcon name={name} label={label} size={size === "small" ? "small" : "medium"} />}</span>;
}
