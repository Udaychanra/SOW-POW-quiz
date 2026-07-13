import styles from "./site.module.css";

export default function YouTubeSectionSkeleton() {
  return <section className={`${styles.section} ${styles.sectionSoft}`} aria-label="Loading latest One Small Seed videos"><div className={styles.content}><div className={styles.youtubeSkeletonHeading}></div><div className={styles.youtubeGrid}>{[0,1,2].map((item) => <div className={styles.youtubeSkeletonCard} key={item}><span></span><i></i><i></i><i></i></div>)}</div></div></section>;
}
