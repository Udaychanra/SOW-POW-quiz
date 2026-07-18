import Image from "next/image";
import Link from "next/link";
import HeroDepth from "../../components/site/HeroDepth.js";
import IconMedallion from "../../components/site/IconMedallion.js";
import MotionGroup from "../../components/site/MotionGroup.js";
import PremiumCard from "../../components/site/PremiumCard.js";
import SectionHeading from "../../components/site/SectionHeading.js";
import SiteIcon from "../../components/site/SiteIcon.js";
import YouTubeVideoCard from "../../components/site/YouTubeVideoCard.js";
import { getLatestChannelVideos, YOUTUBE_CHANNEL_URL } from "../../lib/youtube.js";
import styles from "../../components/site/site.module.css";

export const metadata = {
  title: "One Small Seed",
  description: "Understand what may deserve your attention next through One Small Seed’s educational assessment, resources and financial conversations.",
};

export const revalidate = 21600;

const topicCards = [
  { icon: "conversation", title: "Money & Relationships", copy: "How do we talk about money without turning it into a fight?", href: "/resources" },
  { icon: "layers", title: "Debt & Stability", copy: "What needs stabilizing before I try to grow?", href: "/resources" },
  { icon: "compass", title: "Jobs & Salary", copy: "Is earning more enough—or does my money need better structure?", href: "/resources" },
  { icon: "lock", title: "Saving & Emergency Funds", copy: "Would an unexpected expense change everything?", href: "/sow-pow-quiz" },
  { icon: "tree", title: "Building Investments", copy: "Am I investing from a stable foundation?", href: "/sow-pow-quiz" },
  { icon: "shield", title: "Protecting Family", copy: "If life changed suddenly, what would my family need?", href: "/licensed-services" },
  { icon: "home", title: "Business & Succession", copy: "Could the business continue without me?", href: "/licensed-services" },
  { icon: "water", title: "Retirement", copy: "Am I preparing for income, not only an account balance?", href: "/resources" },
  { icon: "book", title: "Legacy & Teaching", copy: "What am I passing on besides assets?", href: "/resources" },
];

const recognitionCards = [
  { icon: "lock", title: "I earn, but I still do not feel secure.", copy: "Income can rise while certainty stays behind.", label: "Find My Starting Point", href: "/sow-pow-quiz" },
  { icon: "water", title: "I am saving, but I do not know whether I am doing enough.", copy: "A balance alone may not show what deserves attention next.", label: "Find My Starting Point", href: "/sow-pow-quiz" },
  { icon: "tree", title: "I want to invest, but I am unsure what should come first.", copy: "Growth decisions are easier when the starting point is clearer.", label: "Find My Starting Point", href: "/sow-pow-quiz" },
  { icon: "shield", title: "I have built something, but I am not sure how to protect it.", copy: "Protection begins by understanding what could be interrupted.", label: "Explore Services", href: "/licensed-services" },
  { icon: "branch", title: "I want my decisions to benefit the next generation.", copy: "Legacy includes what you teach, structure and prepare.", label: "Explore Resources", href: "/resources" },
  { icon: "compass", title: "I know I need a plan, but I do not know where to begin.", copy: "The first step is not having every answer—it is finding the right question.", label: "Play to Know Yourself", href: "/sow-pow-quiz" },
];

const trustPoints = ["About 2 minutes", "No perfect answers", "Personalized educational result"];

export default async function HomePage() {
  const { videos } = await getLatestChannelVideos();
  const latestVideos = videos.slice(0, 3);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>A clearer financial starting point</p>
            <h1>You are earning.<br />But are you actually building?</h1>
            <p className={styles.heroSupport}>You probably know what you earn. Knowing what you are building—and what may deserve attention next—is harder. One Small Seed helps you identify a useful starting point without judgment or guesswork.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/sow-pow-quiz" data-analytics-event="homepage_primary_quiz_cta" data-analytics-page="home" data-analytics-section="hero">Play to Know Yourself</Link>
              <Link className={styles.secondaryButton} href="/contact" data-analytics-event="homepage_secondary_conversation_cta" data-analytics-page="home" data-analytics-section="hero">Request a Conversation</Link>
            </div>
            <div className={styles.heroTrust} aria-label="Assessment details">
              <span>10 honest questions</span><span>About 2 minutes</span><span>Personalized educational result</span>
            </div>
          </div>
          <HeroDepth className={styles.heroPicture}>
            <small>Your</small>
            <h2>Wealth-Building<br />Picture</h2>
            <Image className={styles.heroLandscape} src="/site/wealth-picture.svg" width={680} height={430} priority alt="A mature tree above layered hills and a winding path" />
          </HeroDepth>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.content}>
          <MotionGroup as="article" variant="scale" className={styles.curiosityCard}>
            <div>
              <p className={styles.eyebrow}>Questions welcome</p>
              <h2>Money questions should not feel embarrassing.</h2>
              <p>No jargon. No judgment. Start with what is true right now.</p>
              <Link className={styles.goldButton} href="/sow-pow-quiz" data-analytics-event="homepage_primary_quiz_cta" data-analytics-page="home" data-analytics-section="questions_welcome">Find My Starting Point →</Link>
            </div>
            <div className={styles.curiosityVisual} aria-hidden="true"><SiteIcon name="seed" label="" size="large" /></div>
          </MotionGroup>
        </div>
      </section>

      <section id="money-questions" className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Start with the question" title="No money question should feel off-limits." copy="Choose the question closest to what is on your mind. You do not need to know the framework to begin." />
          <MotionGroup className={styles.topicGrid} stagger aria-label="Money questions">
            {topicCards.map((card, index) => (
              <PremiumCard as={Link} href={card.href} variant={index % 3 === 1 ? "inset" : index % 3 === 2 ? "arch" : "soft"} className={styles.topicCard} key={card.title} data-analytics-event="homepage_topic_selected" data-analytics-topic-slug={card.title.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")} data-analytics-destination="internal">
                <IconMedallion name={card.icon} label="" tone={index % 2 ? "gold" : "sage"} size="small" />
                <div><h3>{card.title}</h3><p>{card.copy}</p></div>
                <span className={styles.cardArrow} aria-hidden="true">→</span>
              </PremiumCard>
            ))}
          </MotionGroup>
          <div className={styles.centeredAction}><Link className={styles.secondaryButton} href="/resources" data-analytics-event="homepage_resources_clicked" data-analytics-page="home" data-analytics-section="topics">Explore Resources →</Link></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Recognize your starting point" title="Which of these sounds most like you?" copy="There is no perfect place to begin. Choose the statement that feels closest today." />
          <MotionGroup className={styles.recognitionGrid} stagger>
            {recognitionCards.map((card, index) => (
              <PremiumCard variant={index % 2 ? "inset" : "soft"} className={styles.recognitionCard} key={card.title}>
                <IconMedallion name={card.icon} label="" tone={index % 2 ? "gold" : "sage"} size="small" />
                <div><h3>{card.title}</h3><p>{card.copy}</p></div>
                <Link className={styles.cardAction} href={card.href} data-analytics-event="homepage_recognition_selected" data-analytics-card-id={`recognition-${index + 1}`} data-analytics-destination="internal">{card.label}<span aria-hidden="true">→</span></Link>
              </PremiumCard>
            ))}
          </MotionGroup>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.content}>
          <MotionGroup as="article" variant="scale" className={styles.assessmentCard}>
            <div className={styles.assessmentCopy}>
              <p className={styles.eyebrow}>The One Small Seed assessment</p>
              <h2>One assessment. A clearer picture.</h2>
              <p>Answer 10 honest questions to better understand where you are and what may deserve your attention next.</p>
              <div className={styles.frameworkReassurance}>
                <span>SOW POW helps identify where you are.</span>
                <span>The Five Parts help show what may need attention.</span>
              </div>
              <div className={styles.trustPoints}>{trustPoints.map((point) => <span key={point}>{point}</span>)}</div>
            </div>
            <div className={styles.assessmentAction}>
              <div className={styles.seedPath} aria-hidden="true">
                {Array.from({ length: 10 }, (_, index) => <span key={index} style={{ "--seed-index": index }}></span>)}
                <SiteIcon name="tree" label="" size="large" />
              </div>
              <Link className={styles.goldButton} href="/sow-pow-quiz" data-analytics-event="homepage_primary_quiz_cta" data-analytics-page="home" data-analytics-section="assessment">Play to Know Yourself</Link>
            </div>
          </MotionGroup>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Real answers" title="Real questions deserve clear answers." copy="Watch grounded conversations about the money decisions people often avoid, postpone or struggle to explain." />
          {latestVideos.length ? (
            <MotionGroup className={styles.youtubeGrid} stagger>
              {latestVideos.map((video, index) => <YouTubeVideoCard video={video} analyticsEvent="homepage_youtube_video_clicked" analyticsPage="home" position={index + 1} key={video.id} />)}
            </MotionGroup>
          ) : (
            <MotionGroup className={`${styles.youtubeFallback} ${styles.homeYoutubeFallback}`} variant="fadeUp">
              <div className={styles.youtubeFallbackMark} aria-hidden="true"><SiteIcon name="seed" label="" /></div>
              <div><h2>Real answers are waiting on YouTube.</h2><p>Visit the official One Small Seed channel for the latest grounded financial-education conversations.</p></div>
            </MotionGroup>
          )}
          <MotionGroup className={styles.videoActions} variant="scale">
            <a className={styles.primaryButton} href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">Watch One Small Seed</a>
            <Link className={styles.secondaryButton} href="/resources" data-analytics-event="homepage_resources_clicked" data-analytics-page="home" data-analytics-section="videos">Explore Resources</Link>
          </MotionGroup>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={`${styles.content} ${styles.guidanceSection}`}>
          <MotionGroup variant="fromLeft" className={styles.guidanceCopy}>
            <p className={styles.eyebrow}>When you want to talk it through</p>
            <h2>Sometimes an assessment gives direction. A conversation gives clarity.</h2>
            <p>If your result raises more questions, a conversation can help you identify which areas may deserve a closer look.</p>
            <p className={styles.reassurance}>A conversation begins with context, not a commitment.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/contact" data-analytics-event="homepage_secondary_conversation_cta" data-analytics-page="home" data-analytics-section="guidance">Request a Conversation</Link>
              <Link className={styles.secondaryButton} href="/sow-pow-quiz" data-analytics-event="homepage_primary_quiz_cta" data-analytics-page="home" data-analytics-section="guidance">Play to Know Yourself</Link>
            </div>
            <small>Educational information only. Licensed services are available only where properly licensed.</small>
          </MotionGroup>
          <MotionGroup variant="fromRight" className={styles.guidanceVisual}>
            <Image src="/site/landscape.svg" width={680} height={360} alt="Layered hills, a winding path, and a mature tree" />
            <span className={styles.signpost} aria-hidden="true"></span>
          </MotionGroup>
        </div>
      </section>

      <div className={`${styles.content} ${styles.ctaWrap}`}>
        <MotionGroup as="section" variant="scale" className={`${styles.ctaSection} ${styles.ctaDark} ${styles.finalCta}`}>
          <div>
            <p className={styles.eyebrow}>One useful next step</p>
            <h2>You do not need every answer today.<br />You need the right next question.</h2>
            <p>Begin with 10 honest questions—or talk through what is already on your mind.</p>
          </div>
          <div className={styles.actions}>
            <Link className={styles.goldButton} href="/sow-pow-quiz" data-analytics-event="homepage_primary_quiz_cta" data-analytics-page="home" data-analytics-section="final_cta">Play to Know Yourself</Link>
            <Link className={styles.lightOutlineButton} href="/contact" data-analytics-event="homepage_secondary_conversation_cta" data-analytics-page="home" data-analytics-section="final_cta">Request a Conversation</Link>
          </div>
        </MotionGroup>
      </div>
    </>
  );
}
