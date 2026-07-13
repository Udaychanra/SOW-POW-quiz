import CTASection from "../../../components/site/CTASection.js";
import IconMedallion from "../../../components/site/IconMedallion.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import PageHero from "../../../components/site/PageHero.js";
import PremiumCard from "../../../components/site/PremiumCard.js";
import SectionHeading from "../../../components/site/SectionHeading.js";
import styles from "../../../components/site/site.module.css";

export const metadata = { title: "Licensed Services | One Small Seed" };

const services = [
  ["shield", "Insurance Strategy", "Term life, whole life, IUL and annuity conversations."],
  ["home", "Business Owner Protection", "Key-man insurance, buy-sell funding, succession risk and protection planning."],
  ["tree", "Family Legacy Planning", "Protection structures, estate coordination and long-term wealth-transfer education."],
  ["water", "Retirement Protection", "Income protection, tax-aware strategy conversations and long-term liquidity planning."],
];

const process = ["Take the Stage Finder", "Understand your current stage", "Learn the relevant framework", "Book a licensed conversation if appropriate", "Build only what fits your situation"];

export default function LicensedServicesPage() {
  return <>
    <PageHero eyebrow="Licensed Services" title="When education turns into action." copy="Licensed guidance for the stages where protection, liquidity and legacy become real decisions." primary={{ label: "Start With The Quiz", href: "/sow-pow-quiz" }} secondary={{ label: "Book A Conversation", href: "/contact" }} />
    <section className={styles.section}><div className={styles.content}><SectionHeading title="Our licensed services" copy="Focused conversations for decisions that require appropriate professional guidance." /><MotionGroup className={styles.cardGrid4} stagger>{services.map(([icon,title,copy], index) => <PremiumCard tabIndex={0} variant={index % 2 ? "inset" : "arch"} className={styles.serviceCard} key={title}><IconMedallion name={icon} label="" tone={index % 2 ? "gold" : "forest"} floating /><span className={styles.cardGoldDetail} aria-hidden="true"></span><h3>{title}</h3><p>{copy}</p></PremiumCard>)}</MotionGroup></div></section>
    <section className={`${styles.section} ${styles.sectionSoft}`}><div className={styles.content}><SectionHeading title="A careful path, not a rushed sale." /><MotionGroup className={styles.process} variant="line" stagger>{process.map((step) => <article key={step}><h3>{step}</h3></article>)}</MotionGroup><MotionGroup className={styles.compliance} variant="fadeIn">One Small Seed provides educational content. Licensed services are available only where properly licensed. This website does not provide individualized financial, investment, tax or legal advice.</MotionGroup></div></section>
    <div className={`${styles.content} ${styles.ctaWrap}`}><CTASection title="Start with a clearer picture." copy="Use the Stage Finder before deciding what kind of conversation may be useful." primary={{ label: "Take The Quiz", href: "/sow-pow-quiz" }} secondary={{ label: "Contact One Small Seed", href: "/contact" }} /></div>
  </>;
}
