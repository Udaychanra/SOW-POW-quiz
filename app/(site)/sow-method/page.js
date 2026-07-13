import CTASection from "../../../components/site/CTASection.js";
import FivePartsGrid from "../../../components/site/FivePartsGrid.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import PageHero from "../../../components/site/PageHero.js";
import SectionHeading from "../../../components/site/SectionHeading.js";
import StageJourney from "../../../components/site/StageJourney.js";
import styles from "../../../components/site/site.module.css";

export const metadata = { title: "The SOW POW Method | One Small Seed" };

export default function SowMethodPage() {
  return <>
    <PageHero eyebrow="The SOW POW Method" title="Seven stages of intentional wealth." copy="From preparing the ground to writing what endures, the SOW POW Method helps you understand where you are and what comes next." primary={{ label: "Find Your Stage", href: "/sow-pow-quiz" }} />
    <section className={styles.section}><div className={styles.content}><SectionHeading title="A complete seven-stage journey" copy="Each stage provides a clearer view of the structures, protections and conversations that matter next." /><StageJourney detailed /></div></section>
    <section className={`${styles.section} ${styles.sectionSoft}`}><div className={styles.content}>
      <SectionHeading title="SOW POW + The Five Parts" copy="Two connected frameworks create one practical wealth-building picture." />
      <MotionGroup className={styles.methodExplanation} stagger><article><h3>SOW POW shows where you are.</h3><p>It is the sequence: seven stages that move from preparation through stability, structure, protection, access and legacy.</p></article><span className={styles.methodPlus} aria-hidden="true">+</span><article><h3>The Five Parts show what you tend.</h3><p>Income, investments, protection, planning and teaching remain active at every stage of the journey.</p></article></MotionGroup>
      <div className={styles.partsSpacing}><FivePartsGrid showCopy={false} /></div>
    </div></section>
    <div className={`${styles.content} ${styles.ctaWrap}`}><CTASection title="Not sure where you are?" copy="Ten honest questions can reveal a clearer starting point." primary={{ label: "Take The Stage Finder", href: "/sow-pow-quiz" }} dark /></div>
  </>;
}
