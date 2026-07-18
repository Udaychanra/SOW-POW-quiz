"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import IconMedallion from "./IconMedallion.js";
import MotionGroup from "./MotionGroup.js";
import PremiumCard from "./PremiumCard.js";
import SectionHeading from "./SectionHeading.js";
import YouTubeThumbnail from "./YouTubeThumbnail.js";
import { trackEvent } from "../../lib/analytics.js";
import styles from "./site.module.css";

const topics = [
  {
    key: "relationships",
    icon: "conversation",
    title: "Money & Relationships",
    question: "How can we talk about money without turning it into a fight?",
    keywords: ["money conversation", "money relationship", "spouse", "partner", "marriage"],
    videoIds: ["Qgt8sU9mweU"],
    actions: [{ label: "Explore Resources", href: "#watch" }],
  },
  {
    key: "stability",
    icon: "layers",
    title: "Debt & Stability",
    question: "What needs stabilizing before I try to grow?",
    keywords: ["debt", "stability", "stable foundation", "financially safe", "financial safety", "poisoned ground", "unexpected expense"],
    videoIds: ["Ihg0fpQMWpw", "DjiGuWl4MnU"],
    actions: [{ label: "Play to Know Yourself", href: "/sow-pow-quiz" }],
  },
  {
    key: "income",
    icon: "compass",
    title: "Jobs & Salary",
    question: "Is earning more enough—or does my money need better structure?",
    keywords: ["salary", "earning more", "lack of income", "hours get cut", "working adults"],
    videoIds: ["Ihg0fpQMWpw"],
    actions: [{ label: "Play to Know Yourself", href: "/sow-pow-quiz" }],
  },
  {
    key: "saving",
    icon: "lock",
    title: "Saving & Emergency Funds",
    question: "How much stability would an unexpected expense require?",
    keywords: ["emergency fund", "unexpected expense", "car breaks down", "save more", "saving", "liquid"],
    videoIds: ["Ihg0fpQMWpw", "DjiGuWl4MnU"],
    actions: [{ label: "Play to Know Yourself", href: "/sow-pow-quiz" }],
  },
  {
    key: "investing",
    icon: "tree",
    title: "Investing",
    question: "What should be in place before I focus on growth?",
    keywords: ["invest", "stocks", "compound interest", "wealth plan", "financial future"],
    videoIds: ["Ihg0fpQMWpw", "9uXx8Smh0qE"],
    actions: [{ label: "Play to Know Yourself", href: "/sow-pow-quiz" }],
  },
  {
    key: "protection",
    icon: "shield",
    title: "Protecting Family",
    question: "What would the people who depend on me need if life changed?",
    keywords: ["if you’re not around", "if you're not around", "family protection", "life insurance", "people who depend"],
    videoIds: ["QWakLwhbEOo"],
    actions: [
      { label: "Explore Services", href: "/licensed-services" },
      { label: "Start a Conversation", href: "/contact" },
    ],
  },
  {
    key: "business",
    icon: "home",
    title: "Business & Succession",
    question: "Could the business continue without me?",
    keywords: ["business continuity", "succession", "buy-sell", "key-person", "key person"],
    videoIds: [],
    actions: [
      { label: "Explore Services", href: "/licensed-services" },
      { label: "Start a Conversation", href: "/contact" },
    ],
  },
  {
    key: "retirement",
    icon: "water",
    title: "Retirement",
    question: "Am I preparing for future income, not only an account balance?",
    keywords: ["retire", "retirement", "future income", "income in retirement"],
    videoIds: ["QWakLwhbEOo", "DjiGuWl4MnU"],
    actions: [
      { label: "Explore Services", href: "/licensed-services" },
      { label: "Start a Conversation", href: "/contact" },
    ],
  },
  {
    key: "legacy",
    icon: "book",
    title: "Legacy & Teaching",
    question: "What am I passing on besides assets?",
    keywords: ["next generation", "generational wealth", "wealth transfer", "teaching", "legacy"],
    videoIds: [],
    actions: [{ label: "Explore Resources", href: "#watch" }],
  },
];

function matchingVideos(topic, videos) {
  return videos.filter((video) => {
    if (topic.videoIds.includes(video.id)) return true;
    const searchable = `${video.title} ${video.description}`.toLocaleLowerCase();
    return topic.keywords.some((keyword) => searchable.includes(keyword.toLocaleLowerCase()));
  }).slice(0, 3);
}

function PlayIcon({ compact = false }) {
  return <svg className={compact ? styles.youtubePlaySmall : styles.youtubePlayIcon} viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22"/><path d="m20 16 13 8-13 8V16Z"/></svg>;
}

function VideoCard({ video, position }) {
  return (
    <PremiumCard as="article" variant="beveled" className={`${styles.resourceCard} ${styles.youtubeCard}`}>
      <a className={styles.youtubeCardLink} href={video.videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${video.title} on YouTube (opens in a new tab)`} data-analytics-event="resources_video_clicked" data-analytics-video-id={video.id} data-analytics-video-position={position} data-analytics-destination="external">
        <div className={styles.youtubeThumbnail}>
          <YouTubeThumbnail src={video.thumbnailUrl} title={video.title} className={styles.youtubeThumbnailImage} />
          <span className={styles.youtubeThumbnailOverlay} aria-hidden="true"></span>
          <span className={styles.youtubePlay} aria-hidden="true"><PlayIcon /></span>
        </div>
        <div className={styles.youtubeCardBody}>
          <div className={styles.youtubeMeta}><span>Video</span>{video.publishedLabel && <time dateTime={video.publishedAt}>{video.publishedLabel}</time>}</div>
          <h3>{video.title}</h3>
          {video.description && <p className={styles.youtubeDescription}>{video.description}</p>}
          <div className={styles.youtubeAttribution}><span><PlayIcon compact />{video.channelTitle}</span><span className={styles.youtubeWatch}>Watch on YouTube <b aria-hidden="true">→</b></span></div>
        </div>
      </a>
    </PremiumCard>
  );
}

function VideoFallback({ title = "More videos are growing.", copy = "Visit One Small Seed on YouTube for the latest conversations." }) {
  return (
    <div className={styles.youtubeFallback} role="status">
      <div className={styles.youtubeFallbackMark} aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M32 54V31m0 11c-9 0-15-6-16-14 9 0 15 5 16 14Zm0-5c9 0 15-6 16-14-9 0-15 5-16 14Z"/><path d="M32 24c-3-6-2-11 1-15 5 5 5 10-1 15Z"/></svg></div>
      <div><h2>{title}</h2><p>{copy}</p></div>
    </div>
  );
}

export default function ResourcesTopicExplorer({ videos }) {
  const [selectedKey, setSelectedKey] = useState("stability");
  const selectedTopic = topics.find((topic) => topic.key === selectedKey) || topics[0];
  const selectedVideos = useMemo(() => matchingVideos(selectedTopic, videos), [selectedTopic, videos]);
  const featuredVideo = videos.find((video) => /\b(why|how|what|are you|do you)\b|\?/i.test(video.title)) || videos[0];

  return (
    <>
      <section id="questions" className={styles.section}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Start With What Is On Your Mind" title="What would you like to understand better?" copy="Choose a topic to discover relevant One Small Seed videos and educational resources." />
          <MotionGroup className={styles.resourcesTopicGrid} stagger role="list" aria-label="Money topics">
            {topics.map((topic, index) => {
              const selected = topic.key === selectedKey;
              return (
                <div role="listitem" key={topic.key}>
                  <button
                    type="button"
                    className={`${styles.resourcesTopicButton}${selected ? ` ${styles.resourcesTopicButtonSelected}` : ""}`}
                    aria-pressed={selected}
                    aria-controls="topic-results"
                    onClick={() => { setSelectedKey(topic.key); trackEvent("resources_topic_selected", { page: "resources", topic_slug: topic.key }); }}
                  >
                    <IconMedallion name={topic.icon} label="" tone={index % 2 ? "gold" : "sage"} size="small" />
                    <span><strong>{topic.title}</strong><small>{topic.question}</small></span>
                    <i aria-hidden="true">{selected ? "Selected" : "Explore"}</i>
                  </button>
                </div>
              );
            })}
          </MotionGroup>
          <p className={styles.resourcesSelectionStatus} aria-live="polite">Selected: {selectedTopic.title}. Relevant videos appear in Explore by Question below.</p>
          <div className={styles.centeredAction}><a className={styles.secondaryButton} href="#topic-results">View selected topic</a></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Featured Conversation</p>
          {featuredVideo ? (
            <MotionGroup as="article" variant="fadeUp" className={styles.resourcesFeatured}>
              <a className={styles.resourcesFeaturedMedia} href={featuredVideo.videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${featuredVideo.title} on YouTube (opens in a new tab)`} data-analytics-event="resources_featured_video_clicked" data-analytics-video-id={featuredVideo.id} data-analytics-video-position="1" data-analytics-destination="external">
                <YouTubeThumbnail src={featuredVideo.thumbnailUrl} title={featuredVideo.title} className={styles.youtubeThumbnailImage} eager />
                <span className={styles.youtubePlay} aria-hidden="true"><PlayIcon /></span>
              </a>
              <div className={styles.resourcesFeaturedCopy}>
                <div className={styles.youtubeMeta}><span>Video</span>{featuredVideo.publishedLabel && <time dateTime={featuredVideo.publishedAt}>{featuredVideo.publishedLabel}</time>}</div>
                <h2>{featuredVideo.title}</h2>
                {featuredVideo.description && <p>{featuredVideo.description}</p>}
                <p className={styles.resourcesFeaturedAttribution}><PlayIcon compact /> {featuredVideo.channelTitle}</p>
                <a className={styles.primaryButton} href={featuredVideo.videoUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="resources_featured_video_clicked" data-analytics-video-id={featuredVideo.id} data-analytics-video-position="1" data-analytics-destination="external">Watch on YouTube</a>
              </div>
            </MotionGroup>
          ) : <VideoFallback />}
        </div>
      </section>

      <section id="watch" className={styles.section}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Latest From One Small Seed" title="Watch the latest conversations." copy="New videos explore practical questions involving financial structure, protection, decision-making and legacy." />
          {videos.length ? <MotionGroup className={styles.youtubeGrid} stagger>{videos.slice(0, 6).map((video, index) => <VideoCard video={video} position={index + 1} key={video.id} />)}</MotionGroup> : <VideoFallback />}
        </div>
      </section>

      <section id="topic-results" className={`${styles.section} ${styles.sectionSoft}`} aria-labelledby="topic-results-title">
        <div className={styles.content}>
          <SectionHeading eyebrow="Explore By Question" title="Follow the topic that feels most relevant today." />
          <MotionGroup variant="fadeUp" className={styles.resourcesTopicResults} key={selectedTopic.key}>
            <div className={styles.resourcesTopicSummary}>
              <p className={styles.eyebrow}>Selected Topic</p>
              <h2 id="topic-results-title">{selectedTopic.title}</h2>
              <p>{selectedTopic.question}</p>
            </div>
            {selectedVideos.length ? (
              <>
                <div className={styles.youtubeGrid}>{selectedVideos.map((video, index) => <VideoCard video={video} position={index + 1} key={video.id} />)}</div>
                <div className={styles.resourcesTopicActions}>
                  <a className={styles.primaryButton} href={selectedVideos[0].videoUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="resources_video_clicked" data-analytics-video-id={selectedVideos[0].id} data-analytics-video-position="1" data-analytics-destination="external">Watch Related Videos</a>
                  {selectedTopic.actions.map((action) => <Link className={styles.secondaryButton} href={action.href} key={action.label} data-analytics-event={action.href === "/contact" ? "resources_conversation_cta" : action.href === "/sow-pow-quiz" ? "resources_quiz_cta" : undefined} data-analytics-topic-slug={selectedTopic.key}>{action.label}</Link>)}
                </div>
              </>
            ) : (
              <div className={styles.resourcesEmptyState} role="status">
                <IconMedallion name="seed" label="" tone="gold" />
                <div>
                  <h3>More answers are growing.</h3>
                  <p>We have not published a matching video for this question yet. Explore the latest One Small Seed conversations or begin with the Stage Finder.</p>
                </div>
                <div className={styles.resourcesTopicActions}>
                  <a className={styles.primaryButton} href="#watch">View Latest Videos</a>
                  <Link className={styles.secondaryButton} href="/sow-pow-quiz" data-analytics-event="resources_quiz_cta" data-analytics-section="empty_state">Play to Know Yourself</Link>
                </div>
              </div>
            )}
          </MotionGroup>
        </div>
      </section>
    </>
  );
}
