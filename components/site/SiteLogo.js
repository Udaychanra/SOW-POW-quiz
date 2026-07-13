import OfficialLogo from "../ui/OfficialLogo.js";
import styles from "./site.module.css";

export default function SiteLogo({ surface = "dark", priority = false, className = "" }) {
  return (
    <span className={`${styles.officialLogo}${className ? ` ${className}` : ""}`}>
      <OfficialLogo
        surface={surface}
        priority={priority}
        sizes="(max-width: 820px) 66px, 75px"
        className={styles.officialLogoImage}
      />
    </span>
  );
}
