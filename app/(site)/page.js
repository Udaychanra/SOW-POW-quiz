import Image from "next/image";
import Link from "next/link";
import CTASection from "../../components/site/CTASection.js";
import FivePartsGrid from "../../components/site/FivePartsGrid.js";
import HeroDepth from "../../components/site/HeroDepth.js";
import IconMedallion from "../../components/site/IconMedallion.js";
import MotionGroup from "../../components/site/MotionGroup.js";
import PremiumCard from "../../components/site/PremiumCard.js";
import SectionHeading from "../../components/site/SectionHeading.js";
import SiteIcon from "../../components/site/SiteIcon.js";
import StageJourney from "../../components/site/StageJourney.js";
import styles from "../../components/site/site.module.css";

export const metadata = {
  title: "One Small Seed",
  description: "Understand your SOW POW stage, build intentional wealth systems and create a legacy designed to grow beyond you.",
};

const problems = [
  ["compass", "No clear stage", "You do not know where you are, so it is difficult to know what to do next with confidence."],
  ["layers", "No stable structure", "Without the right systems in place, progress can feel uncertain and easy to lose."],
  ["book", "No legacy direction", "Without a plan for what lasts, wealth may not reach the people and purposes that matter most."],
];

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1>Plant the seed today that shades someone tomorrow.</h1>
            <p>One Small Seed helps you understand where you are in your financial journey, build intentional wealth systems, and create a legacy that grows beyond you.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/sow-pow-quiz">Find Your SOW POW Stage</Link>
              <Link className={styles.secondaryButton} href="/sow-method">Explore The SOW Method</Link>
            </div>
          </div>
          <HeroDepth className={styles.heroPicture}>
            <small>Your</small>
            <h2>Wealth-Building<br />Picture</h2>
            <p>SOW POW + The Five Parts</p>
            <Image className={styles.heroLandscape} src="/site/wealth-picture.svg" width={680} height={430} priority alt="A mature tree above layered hills and a winding path" />
          </HeroDepth>
        </div>
      </section>

      <MotionGroup as="section" variant="scale" className={styles.beliefBand} aria-label="One Small Seed belief">
        <div className={styles.beliefBandInner}>Wealth is not what you spend. It is what continues growing after you are gone.</div>
      </MotionGroup>

      <section className={styles.section}>
        <div className={styles.content}>
          <SectionHeading title="Most people try to grow wealth before they prepare the ground." />
          <MotionGroup className={styles.cardGrid3} stagger>
            {problems.map(([icon, title, copy], index) => <PremiumCard tabIndex={0} variant={["landscape", "inset", "arch"][index]} className={`${styles.infoCard} ${styles.problemCard} ${styles[`problemCard${index}`]}`} key={title}><IconMedallion name={icon} label="" tone={index === 1 ? "gold" : "sage"} floating /><span className={styles.cardGoldDetail} aria-hidden="true"></span><h3>{title}</h3><p>{copy}</p></PremiumCard>)}
          </MotionGroup>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.content}>
          <SectionHeading title="The SOW POW Framework" copy="Seven stages of intentional wealth — from preparing the ground to writing what endures." />
          <div className={styles.frameworkPanel}><StageJourney /></div>
          <div className={styles.centeredAction}><Link className={styles.secondaryButton} href="/sow-method">Explore The SOW Method</Link></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.content}>
          <MotionGroup variant="scale" className={styles.quizBand}>
            <div className={styles.quizBandIcon}><SiteIcon name="seed" label="" size="large" /></div>
            <div><h2>Do you know which stage you are in?</h2><p>Take the Stage Finder to see your personal wealth-building picture through SOW POW and The Five Parts.</p></div>
            <Link className={styles.goldButton} href="/sow-pow-quiz">Find My Stage →</Link>
          </MotionGroup>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.content}>
          <SectionHeading title="The Five Parts" copy="At every stage, you tend the same five essential parts of your wealth-building picture." />
          <FivePartsGrid />
        </div>
      </section>

      <div className={`${styles.content} ${styles.ctaWrap}`}>
        <CTASection title="Your next stage starts with one small seed." primary={{ label: "Take The Quiz", href: "/sow-pow-quiz" }} secondary={{ label: "Learn The SOW Method", href: "/sow-method" }} />
      </div>
    </>
  );
}
