import { Suspense } from "react";
import Link from "next/link";
import IconMedallion from "../../../components/site/IconMedallion.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import PageHero from "../../../components/site/PageHero.js";
import PremiumCard from "../../../components/site/PremiumCard.js";
import ResourcesVideoHub from "../../../components/site/ResourcesVideoHub.js";
import SectionHeading from "../../../components/site/SectionHeading.js";
import YouTubeSectionSkeleton from "../../../components/site/YouTubeSectionSkeleton.js";
import { YOUTUBE_CHANNEL_URL } from "../../../lib/youtube.js";
import styles from "../../../components/site/site.module.css";

export const metadata = {
  title: "Resources | One Small Seed",
  description: "Explore real One Small Seed conversations about income, debt, protection, relationships, retirement, business and legacy.",
};
export const revalidate = 21600;

const questionCards = [
  {
    icon: "message",
    title: "Suggest a Future Topic",
    copy: "Tell One Small Seed which educational money question you would like to see discussed in future content.",
    label: "Suggest a Question",
    href: "/contact?reason=topic",
  },
  {
    icon: "conversation",
    title: "Start a Conversation",
    copy: "Use this option when your concern involves protection, retirement, business continuity, legacy or a question raised by your assessment.",
    label: "Request a Conversation",
    href: "/contact",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Real Questions"
        title={<>The money questions people avoid<br />still deserve clear answers.</>}
        copy="Explore grounded conversations about income, debt, protection, relationships, retirement, business and legacy—without judgment or unnecessary jargon."
        primary={{ label: "Explore the Questions", href: "#questions" }}
        secondary={{ label: "Play to Know Yourself", href: "/sow-pow-quiz", event: "resources_quiz_cta", page: "resources", section: "hero" }}
      />

      <Suspense fallback={<YouTubeSectionSkeleton />}>
        <ResourcesVideoHub />
      </Suspense>

      <div className={`${styles.content} ${styles.resourcesAssessmentWrap}`}>
        <MotionGroup as="section" variant="scale" className={`${styles.ctaSection} ${styles.ctaDark} ${styles.resourcesAssessment}`}>
          <div>
            <p className={styles.eyebrow}>Not Sure Which Question Comes First?</p>
            <h2>Start with a clearer financial picture.</h2>
            <p>Answer 10 honest questions to identify an educational starting point and what may deserve attention next.</p>
            <ul className={styles.resourcesTrustPoints} aria-label="Assessment details">
              <li>About 2 minutes</li>
              <li>No perfect answers</li>
              <li>Personalized educational result</li>
            </ul>
          </div>
          <Link className={styles.goldButton} href="/sow-pow-quiz" data-analytics-event="resources_quiz_cta" data-analytics-section="assessment">Play to Know Yourself</Link>
        </MotionGroup>
      </div>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Still Have A Question?" title="Some questions are better explored in context." />
          <MotionGroup className={styles.resourcesQuestionGrid} stagger>
            {questionCards.map((card, index) => (
              <PremiumCard variant={index ? "inset" : "landscape"} className={styles.resourcesQuestionCard} key={card.title}>
                <IconMedallion name={card.icon} label="" tone={index ? "gold" : "forest"} />
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <Link className={index ? styles.secondaryButton : styles.primaryButton} href={card.href} data-analytics-event={index ? "resources_conversation_cta" : undefined} data-analytics-card-id={index ? "conversation" : "topic_suggestion"}>{card.label}</Link>
              </PremiumCard>
            ))}
          </MotionGroup>
          <p className={styles.resourcesConversationNote}>A conversation begins with context, not a commitment.</p>
          <p className={styles.resourcesCompliance}>Educational information only. Licensed services are available only where properly licensed.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.content}>
          <MotionGroup className={styles.youtubeChannelCta} variant="scale">
            <div>
              <p className={styles.eyebrow}>Continue Watching</p>
              <h2>More questions are waiting on YouTube.</h2>
              <p>Explore the complete One Small Seed video library for grounded conversations about money, structure, protection and legacy.</p>
            </div>
            <div className={styles.resourcesChannelActions}>
              <a className={styles.goldButton} href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="resources_channel_clicked" data-analytics-destination="external">Visit the YouTube Channel</a>
              <Link className={styles.lightOutlineButton} href="/sow-pow-quiz" data-analytics-event="resources_quiz_cta" data-analytics-section="channel_cta">Play to Know Yourself</Link>
            </div>
          </MotionGroup>
        </div>
      </section>
    </>
  );
}
