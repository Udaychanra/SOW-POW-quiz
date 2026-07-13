import { getLatestChannelVideos, YOUTUBE_CHANNEL_URL } from "../../lib/youtube.js";
import MotionGroup from "./MotionGroup.js";
import SectionHeading from "./SectionHeading.js";
import YouTubeVideoCard from "./YouTubeVideoCard.js";
import styles from "./site.module.css";

export default async function LatestYouTubeVideos() {
  const { videos } = await getLatestChannelVideos();
  return <section className={`${styles.section} ${styles.sectionSoft}`}><div className={styles.content}>
    <SectionHeading eyebrow="Watch & Learn" title="Latest from One Small Seed" copy="Watch grounded conversations about wealth, structure, protection and legacy." />
    {videos.length ? <>
      <MotionGroup className={styles.youtubeGrid} stagger>{videos.map((video) => <YouTubeVideoCard video={video} key={video.id} />)}</MotionGroup>
      <MotionGroup className={styles.youtubeChannelCta} variant="scale"><div><p className={styles.eyebrow}>Continue Watching</p><h2>More seeds are waiting on YouTube.</h2><p>Explore the full One Small Seed library for conversations about financial structure, protection and legacy.</p></div><a className={styles.goldButton} href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">Visit the YouTube Channel</a></MotionGroup>
    </> : <MotionGroup className={styles.youtubeFallback} variant="fadeUp"><div className={styles.youtubeFallbackMark} aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M32 54V31m0 11c-9 0-15-6-16-14 9 0 15 5 16 14Zm0-5c9 0 15-6 16-14-9 0-15 5-16 14Z"/><path d="M32 24c-3-6-2-11 1-15 5 5 5 10-1 15Z"/></svg></div><div><h2>More videos are growing.</h2><p>Visit One Small Seed on YouTube for the latest conversations.</p></div><a className={styles.primaryButton} href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">Visit the YouTube Channel</a></MotionGroup>}
  </div></section>;
}
