import Image from "next/image";
import Link from "next/link";
import FivePartIcon from "../../../components/site/FivePartIcon.js";
import FrameworkIcon from "../../../components/site/FrameworkIcon.js";
import IconMedallion from "../../../components/site/IconMedallion.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import PageHero from "../../../components/site/PageHero.js";
import PremiumCard from "../../../components/site/PremiumCard.js";
import SectionHeading from "../../../components/site/SectionHeading.js";
import StageExplorer from "../../../components/site/StageExplorer.js";
import { fiveParts, stages } from "../../../content/site-content.js";
import styles from "../../../components/site/site.module.css";

export const metadata = {
  title: "The SOW Method | One Small Seed",
  description: "Explore the educational stages and areas that can help organize clearer financial questions, then use the One Small Seed assessment to identify a useful starting point.",
};

const journeyLabels = ["Prepare", "Stabilize", "Build", "Strengthen", "Protect", "Expand", "Continue"];
const partContexts = ["What supports today", "What grows over time", "What protects", "What creates direction", "What continues through teaching"];

export default function SowMethodPage() {
  return (
    <>
      <PageHero
        eyebrow="The SOW Method"
        title={<><span>Wealth does not grow in one move.</span><br /><span>It grows in stages.</span></>}
        copy="Most financial journeys are not missing effort. They are missing sequence. The SOW Method helps you understand how preparation, stability, growth, protection and legacy connect over time."
        primary={{ label: "Find My Starting Point", href: "/sow-pow-quiz", event: "sow_method_quiz_cta", page: "sow_method", section: "hero" }}
        secondary={{ label: "Start a Conversation", href: "/contact", event: "sow_method_conversation_cta", page: "sow_method", section: "hero" }}
        microcopy="10 honest questions · About 2 minutes · Personalized educational result"
      />

      <section className={styles.section}>
        <div className={styles.content}>
          <SectionHeading eyebrow="The Journey" title="Different priorities become important at different moments." copy="The right next step depends on what has already been prepared, what is being built and what needs protection." />
          <MotionGroup className={styles.methodJourney} variant="line" stagger aria-label="A broad preview of the seven-part journey">
            {journeyLabels.map((label, index) => (
              <article className={styles.methodJourneyMarker} key={label}>
                <IconMedallion tone={index % 2 ? "gold" : "sage"} size="small">
                  <FrameworkIcon name={stages[index].icon} label="" />
                </IconMedallion>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{label}</h3>
              </article>
            ))}
          </MotionGroup>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.content}>
          <MotionGroup as="article" variant="scale" className={styles.methodQuizBand}>
            <div>
              <p className={styles.eyebrow}>Begin With Your Picture</p>
              <h2>The framework becomes more useful when you know where you are.</h2>
              <p>Answer 10 honest questions before exploring the details. Your result can give you a more relevant place to begin.</p>
            </div>
            <div className={styles.actions}>
              <Link className={styles.goldButton} href="/sow-pow-quiz" data-analytics-event="sow_method_quiz_cta" data-analytics-section="method_quiz_band">Play to Know Yourself</Link>
              <Link className={styles.lightOutlineButton} href="#stage-explorer">Continue Exploring the Method</Link>
            </div>
          </MotionGroup>
        </div>
      </section>

      <section id="stage-explorer" className={styles.section}>
        <div className={`${styles.content} ${styles.methodExplorerContent}`}>
          <SectionHeading eyebrow="Explore the Stages" title="Seven stages. One journey that develops over time." copy="Open a stage to understand its broad educational purpose. These descriptions are not a diagnosis of your personal financial situation." />
          <StageExplorer />
          <div className={styles.methodExplorerCta}>
            <p>Not sure which stage is most relevant?</p>
            <Link className={styles.primaryButton} href="/sow-pow-quiz" data-analytics-event="sow_method_quiz_cta" data-analytics-section="stage_explorer">Find My Starting Point</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.content}>
          <SectionHeading eyebrow="What You Tend" title="Where you are is only part of the picture." copy="The Five Parts provide an educational way to think about the areas that may require attention throughout the journey." />
          <MotionGroup className={styles.methodPartsPanel} stagger aria-label="The Five Parts">
            {fiveParts.map((part, index) => (
              <article className={styles.methodPartMarker} key={part.name}>
                <IconMedallion tone={index % 2 ? "gold" : "sage"} size="small">
                  <FivePartIcon name={part.name} label="" />
                </IconMedallion>
                <div><h3>{part.name} — {part.meaning}</h3><p>{partContexts[index]}</p></div>
              </article>
            ))}
          </MotionGroup>
          <p className={styles.methodPartsNote}>The Five Parts are considered throughout the journey rather than completed in a fixed order.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Two Perspectives" title={<>One helps describe the journey.<br />The other helps organize attention.</>} />
          <MotionGroup className={styles.methodPerspectiveGrid} stagger>
            <PremiumCard variant="soft" className={styles.methodPerspectiveCard}>
              <IconMedallion name="seed" label="" tone="sage" />
              <h3>SOW POW</h3>
              <p>An educational sequence for understanding how priorities may develop over time.</p>
            </PremiumCard>
            <PremiumCard variant="inset" className={styles.methodPerspectiveCard}>
              <IconMedallion name="tree" label="" tone="gold" />
              <h3>The Five Parts</h3>
              <p>Five areas that can remain relevant throughout every stage of the journey.</p>
            </PremiumCard>
          </MotionGroup>
          <MotionGroup className={styles.methodEquation} variant="scale" role="img" aria-label="Where you are plus what may need attention equals a clearer educational starting point">
            <span>Where you are</span><b aria-hidden="true">+</b><span>What may need attention</span><b aria-hidden="true">=</b><strong>A clearer educational starting point</strong>
          </MotionGroup>
          <div className={styles.centeredAction}><Link className={styles.primaryButton} href="/sow-pow-quiz" data-analytics-event="sow_method_quiz_cta" data-analytics-section="perspectives">Find My Starting Point</Link></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={`${styles.content} ${styles.guidanceSection}`}>
          <MotionGroup variant="fromLeft" className={styles.guidanceCopy}>
            <p className={styles.eyebrow}>When You Want More Context</p>
            <h2>A framework can organize the questions.<br />A conversation can help you talk them through.</h2>
            <p>If you have questions about protection, retirement, business continuity or legacy, you can request a conversation to discuss the areas on your mind.</p>
            <p className={styles.reassurance}>A conversation begins with context, not a commitment.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/contact" data-analytics-event="sow_method_conversation_cta" data-analytics-section="guidance">Start a Conversation</Link>
              <Link className={styles.secondaryButton} href="/sow-pow-quiz" data-analytics-event="sow_method_quiz_cta" data-analytics-section="guidance">Take the Assessment First</Link>
            </div>
            <small>Educational information only. Licensed services are available only where properly licensed. Nothing on this page is individualized financial, investment, tax or legal advice.</small>
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
            <p className={styles.eyebrow}>Your Next Useful Step</p>
            <h2>Do not start by choosing a stage.<br />Start by answering honestly.</h2>
            <p>The Stage Finder gives you a more relevant educational starting point than guessing from a framework description.</p>
          </div>
          <div className={styles.actions}>
            <Link className={styles.goldButton} href="/sow-pow-quiz" data-analytics-event="sow_method_quiz_cta" data-analytics-section="final_cta">Play to Know Yourself</Link>
            <Link className={styles.lightOutlineButton} href="/contact" data-analytics-event="sow_method_conversation_cta" data-analytics-section="final_cta">Start a Conversation</Link>
          </div>
        </MotionGroup>
      </div>
    </>
  );
}
