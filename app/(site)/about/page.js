import Link from "next/link";
import IconMedallion from "../../../components/site/IconMedallion.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import PageHero from "../../../components/site/PageHero.js";
import PremiumCard from "../../../components/site/PremiumCard.js";
import SectionHeading from "../../../components/site/SectionHeading.js";
import styles from "../../../components/site/site.module.css";

export const metadata = {
  title: "About | One Small Seed",
  description: "Learn how One Small Seed uses education, honest reflection and clear boundaries to help people find a more thoughtful financial starting point.",
};

const principles = [
  ["book", "Education Before Decisions", "Understand the purpose and context before considering a direction."],
  ["branch", "Questions Before Products", "Begin with the concern, responsibility or goal already on your mind."],
  ["gate", "Progress Before Perfection", "A useful next step matters more than pretending every answer is already known."],
  ["shield", "Protection Alongside Growth", "Building and protecting are connected parts of the same picture."],
  ["tree", "What Continues Matters", "Legacy includes structure, preparation, communication and teaching—not only assets."],
];

const journey = [
  "Recognize the question",
  "Use the educational assessment or resources",
  "Understand what may deserve attention",
  "Choose whether to continue learning or request a conversation",
];

const expectations = [
  {
    title: "What One Small Seed Provides",
    items: ["General educational information", "A question-led assessment", "Educational stage and topic frameworks", "Real One Small Seed video resources", "Access to request a conversation", "Licensed-service discussion only where properly licensed"],
  },
  {
    title: "What It Does Not Replace",
    items: ["Individualized financial advice", "Investment advice", "Tax advice", "Legal advice", "A full professional financial plan", "Advice from qualified tax or legal professionals"],
  },
];

const pathways = [
  ["seed", "Find a Starting Point", "Play to Know Yourself", "/sow-pow-quiz"],
  ["book", "Explore Real Questions", "Explore Resources", "/resources"],
  ["branch", "Talk Through a Concern", "Request a Conversation", "/contact"],
];

export default function AboutPage() {
  return <>
    <PageHero eyebrow="About One Small Seed" title="Clearer questions can lead to more thoughtful decisions." copy="One Small Seed is an educational platform designed to help people think more clearly about financial structure, protection, growth and what they want to continue beyond themselves." primary={{ label: "Play to Know Yourself", href: "/sow-pow-quiz", event: "about_quiz_cta", page: "about", section: "hero" }} secondary={{ label: "Explore Resources", href: "/resources", event: "about_resources_cta", page: "about", section: "hero" }} />

    <section className={styles.section}><div className={`${styles.content} ${styles.aboutWhy}`}>
      <MotionGroup className={styles.aboutWhyCopy} variant="fadeUp"><p className={styles.eyebrow}>Why It Exists</p><h2>Financial conversations often begin too late—or with the wrong question.</h2><p>People are frequently asked to choose products, strategies or goals before they have clearly understood their current situation. One Small Seed begins earlier: with education, honest reflection and a clearer starting point.</p></MotionGroup>
      <MotionGroup className={styles.aboutWhyVisual} variant="fadeIn" aria-hidden="true"><IconMedallion name="seed" label="" tone="gold" /><span className={styles.aboutPathLine}></span></MotionGroup>
    </div></section>

    <section className={`${styles.section} ${styles.sectionSoft}`}><div className={styles.content}>
      <SectionHeading eyebrow="What Guides the Work" title="A calm approach to complicated questions." />
      <MotionGroup className={styles.aboutPrinciples} stagger>{principles.map(([icon, title, copy], index) => <PremiumCard variant={index % 2 ? "inset" : "soft"} className={`${styles.infoCard} ${styles.aboutPrincipleCard}`} key={title}><IconMedallion name={icon} label="" tone={index % 2 ? "gold" : "sage"} size="small" /><h3>{title}</h3><p>{copy}</p></PremiumCard>)}</MotionGroup>
    </div></section>

    <section className={styles.section}><div className={styles.content}>
      <SectionHeading eyebrow="A Useful Starting Journey" title="Recognize. Understand. Explore. Decide." />
      <MotionGroup as="ol" className={styles.aboutJourney} stagger>{journey.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span><p>{step}</p></li>)}</MotionGroup>
      <p className={styles.aboutJourneyNote}>The assessment and resources are educational starting points. They do not automatically generate individualized advice.</p>
    </div></section>

    <section className={`${styles.section} ${styles.sectionSoft}`}><div className={styles.content}>
      <SectionHeading title="What visitors can expect" copy="Clear expectations make it easier to choose a useful next step." />
      <MotionGroup className={styles.aboutExpectations} stagger>{expectations.map((expectation, index) => <PremiumCard variant={index ? "inset" : "soft"} className={styles.aboutExpectationCard} key={expectation.title}><h3>{expectation.title}</h3><ul>{expectation.items.map((item) => <li key={item}>{item}</li>)}</ul></PremiumCard>)}</MotionGroup>
    </div></section>

    <section className={styles.section}><div className={styles.content}><MotionGroup className={styles.aboutBoundary} variant="fadeUp"><p className={styles.eyebrow}>Clear Boundaries Build Trust</p><h2>Know what the website is—and what it is not.</h2><p>The website and assessment provide educational information. Licensed services may be discussed only where properly licensed and only after appropriate context is understood.</p><Link className={styles.lightOutlineButton} href="/disclosures" data-analytics-event="about_disclosures_clicked" data-analytics-page="about">Read Full Disclosures <span aria-hidden="true">→</span></Link></MotionGroup></div></section>

    <section className={`${styles.section} ${styles.sectionSoft}`}><div className={styles.content}>
      <SectionHeading title="Choose a useful next step" copy="Begin where the question feels most relevant." />
      <MotionGroup className={styles.aboutPathways} stagger>{pathways.map(([icon, title, label, href], index) => <PremiumCard variant="landscape" className={styles.aboutPathwayCard} key={title}><IconMedallion name={icon} label="" tone="gold" size="small" /><h3>{title}</h3><Link className={styles.secondaryButton} href={href} data-analytics-event={["about_quiz_cta", "about_resources_cta", "about_conversation_cta"][index]} data-analytics-section="pathways">{label}</Link></PremiumCard>)}</MotionGroup>
    </div></section>
  </>;
}
