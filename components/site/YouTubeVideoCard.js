import PremiumCard from "./PremiumCard.js";
import YouTubeThumbnail from "./YouTubeThumbnail.js";
import { formatYouTubeDate } from "../../lib/youtube.js";
import styles from "./site.module.css";

function PlayIcon({ compact = false }) {
  return <svg className={compact ? styles.youtubePlaySmall : styles.youtubePlayIcon} viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22"/><path d="m20 16 13 8-13 8V16Z"/></svg>;
}

export default function YouTubeVideoCard({ video, analyticsEvent, analyticsPage, position }) {
  const publishedDate = formatYouTubeDate(video.publishedAt);
  return <PremiumCard as="article" variant="beveled" className={`${styles.resourceCard} ${styles.youtubeCard}`}>
    <a className={styles.youtubeCardLink} href={video.videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${video.title} on YouTube (opens in a new tab)`} data-analytics-event={analyticsEvent} data-analytics-page={analyticsPage} data-analytics-video-id={video.id} data-analytics-video-position={position} data-analytics-destination="external">
      <div className={styles.youtubeThumbnail}>
        <YouTubeThumbnail src={video.thumbnailUrl} title={video.title} className={styles.youtubeThumbnailImage} />
        <span className={styles.youtubeThumbnailOverlay} aria-hidden="true"></span>
        <span className={styles.youtubePlay} aria-hidden="true"><PlayIcon /></span>
      </div>
      <div className={styles.youtubeCardBody}>
        <div className={styles.youtubeMeta}><span>Video</span>{publishedDate && <time dateTime={video.publishedAt}>{publishedDate}</time>}</div>
        <h3>{video.title}</h3>
        {video.description && <p className={styles.youtubeDescription}>{video.description}</p>}
        <div className={styles.youtubeAttribution}><span><PlayIcon compact />{video.channelTitle}</span><span className={styles.youtubeWatch}>Watch on YouTube <b aria-hidden="true">→</b></span></div>
      </div>
    </a>
  </PremiumCard>;
}
