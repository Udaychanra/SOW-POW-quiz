import styles from "./site.module.css";

const stageIcons = {
  seed: <><path className={styles.iconPrimary} d="M9 49c13-7 33-7 46 0M14 55c11-5 25-5 36 0"/><g className={styles.iconSprout}><path className={styles.iconPrimary} d="M32 48V27"/><path className={styles.iconSecondary} d="M32 37c-9 0-15-6-16-14 9 0 15 5 16 14Zm0-5c9 0 15-6 16-14-9 0-15 5-16 14Z"/><path className={styles.iconAccent} d="M31 21c-3-5-2-9 1-13 4 4 4 9-1 13Z"/></g></>,
  lock: <><rect className={styles.iconPrimary} x="15" y="26" width="34" height="25" rx="6"/><path className={`${styles.iconPrimary} ${styles.iconShackle}`} d="M22 26v-8a10 10 0 0 1 20 0v8"/><path className={styles.iconAccent} d="M32 35v8m0 8v7m0-3-8 4m8-4 8 4"/></>,
  home: <><path className={`${styles.iconPrimary} ${styles.iconRoof}`} d="m9 30 23-19 23 19"/><path className={styles.iconPrimary} d="M16 28v22h32V28M27 50V36h10v14"/><path className={styles.iconAccent} d="M11 54h42M18 59h28"/></>,
  water: <><path className={styles.iconPrimary} d="M32 7C22 21 16 29 16 38a16 16 0 0 0 32 0c0-9-6-17-16-31Z"/><path className={styles.iconSecondary} d="M23 39c1 5 4 8 9 9"/><g className={styles.iconRipple}><path className={styles.iconAccent} d="M32 52c-8 0-14 2-18 5M32 52c8 0 14 2 18 5"/></g></>,
  shield: <><path className={`${styles.iconPrimary} ${styles.iconShield}`} d="M32 7c8 7 16 8 23 10v13c0 14-8 22-23 28C17 52 9 44 9 30V17c7-2 15-3 23-10Z"/><path className={styles.iconAccent} d="M32 19v27m0-12c-7 0-11-4-12-10 7 0 11 4 12 10Zm0-5c7 0 11-4 12-10-7 0-11 4-12 10Z"/></>,
  gate: <><path className={styles.iconPrimary} d="M8 57V17h17v40M39 57V17h17v40"/><g className={styles.iconGateLeft}><path className={styles.iconSecondary} d="M25 23 13 28v22l12 6"/></g><g className={styles.iconGateRight}><path className={styles.iconSecondary} d="m39 23 12 5v22l-12 6"/></g><path className={styles.iconAccent} d="M29 33h6M32 30v6"/></>,
  quill: <><path className={`${styles.iconPrimary} ${styles.iconQuill}`} d="M13 49c8-19 19-32 39-42-1 21-11 35-34 39M17 45l26-28"/><path className={`${styles.iconAccent} ${styles.iconWrittenLine}`} d="M11 55h40M18 50v5"/></>,
};

const partIcons = {
  Light: <><g className={styles.iconSunRays}><path className={styles.iconPrimary} d="M32 7v7M32 44v7M10 29h7M47 29h7M16 13l5 5M43 40l5 5M48 13l-5 5M21 40l-5 5"/></g><circle className={styles.iconSecondary} cx="32" cy="29" r="11"/><path className={styles.iconAccent} d="M20 56h24"/></>,
  Trunk: <><path className={styles.iconPrimary} d="M32 57V30m0 15-12-11m12 4 13-13"/><g className={styles.iconCanopy}><path className={styles.iconSecondary} d="M17 36C6 27 11 12 24 15c5-11 20-8 21 3 13 0 16 16 6 23-10 7-29 6-34-5Z"/></g><path className={styles.iconAccent} d="M21 57h22"/></>,
  Bark: <><path className={`${styles.iconPrimary} ${styles.iconShield}`} d="M32 7c8 7 16 8 23 10v13c0 14-8 22-23 28C17 52 9 44 9 30V17c7-2 15-3 23-10Z"/><path className={styles.iconAccent} d="M32 19v27m0-12c-7 0-11-4-12-10 7 0 11 4 12 10Zm0-5c7 0 11-4 12-10-7 0-11 4-12 10Z"/></>,
  Branches: <><path className={styles.iconPrimary} d="M12 54c13-18 25-32 41-43"/><g className={styles.iconBranchLeaves}><path className={styles.iconSecondary} d="M23 39c-8 0-13-4-14-11 8 0 13 3 14 11ZM35 29c0-8 4-13 11-14 0 8-3 13-11 14ZM36 31c8 0 13 4 14 11-8 0-13-3-14-11Z"/></g><circle className={styles.iconAccent} cx="14" cy="51" r="3"/></>,
  Seeds: <><path className={`${styles.iconPrimary} ${styles.iconSeedShell}`} d="M32 51c-11-7-17-15-16-24 1-8 8-14 16-14s15 6 16 14c1 9-5 17-16 24Z"/><path className={styles.iconAccent} d="M32 18v27"/><path className={styles.iconSecondary} d="M32 28c-7 0-11-4-12-10 7 0 11 4 12 10Zm0-4c7 0 11-4 12-10-7 0-11 4-12 10Z"/></>,
};

export default function FrameworkIcon({ name, family = "stage", label = "", className = "" }) {
  const collection = family === "part" ? partIcons : stageIcons;
  const icon = collection[name] || stageIcons.seed;
  const token = String(name).toLowerCase();

  return (
    <svg
      viewBox="0 0 64 64"
      className={[
        styles.frameworkIcon,
        styles[`frameworkIcon_${family}`],
        styles[`frameworkIcon_${token}`],
        className,
      ].filter(Boolean).join(" ")}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : "true"}
      focusable="false"
    >
      {icon}
    </svg>
  );
}
