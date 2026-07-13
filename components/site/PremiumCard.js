import styles from "./site.module.css";

const variants = {
  soft: styles.cardSoft,
  arch: styles.cardArch,
  inset: styles.cardInset,
  beveled: styles.cardBeveled,
  landscape: styles.cardLandscape,
};

export default function PremiumCard({ as: Tag = "article", variant = "soft", className = "", children, ...props }) {
  return <Tag className={`${styles.premiumCard} ${variants[variant] || variants.soft}${className ? ` ${className}` : ""}`} {...props}>{children}</Tag>;
}
