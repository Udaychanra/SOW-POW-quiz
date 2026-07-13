import CTASection from "../../../components/site/CTASection.js";
import IconMedallion from "../../../components/site/IconMedallion.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import PageHero from "../../../components/site/PageHero.js";
import PremiumCard from "../../../components/site/PremiumCard.js";
import SectionHeading from "../../../components/site/SectionHeading.js";
import styles from "../../../components/site/site.module.css";

export const metadata = { title: "About | One Small Seed" };

const principles = [
  ["layers", "Building systems", "Repeatable structures that compound quietly, year after year."],
  ["shield", "Protecting wealth", "Guarding what you have built before seeking to grow further."],
  ["gate", "Creating access", "Opening doors to opportunity without sacrificing stability."],
  ["book", "Developing financial literacy", "Understanding the language of money well enough to teach it."],
  ["tree", "Preserving family legacy", "Passing down values, stories and structures — not only accounts."],
  ["branch", "Thinking in generations", "Measuring progress in decades and lineages, not paychecks."],
];

export default function AboutPage() {
  return <>
    <PageHero eyebrow="About One Small Seed" title="Plant The Seed Today That Shades Someone Tomorrow." copy="One Small Seed exists to help people build lasting wealth, intentional legacy, and financial wisdom that grows across generations." />
    <section className={styles.section}><div className={styles.content}><SectionHeading title="The Philosophy Behind One Small Seed" copy="One Small Seed is not about getting rich quickly. It is about building a life where wealth serves purpose, family and time — not the other way around." /><MotionGroup className={styles.cardGrid3} stagger>{principles.map(([icon,title,copy], index) => <PremiumCard tabIndex={0} variant={index % 3 === 1 ? "inset" : index % 3 === 2 ? "arch" : "soft"} className={`${styles.infoCard} ${styles.philosophyCard}`} key={title}><IconMedallion name={icon} label="" tone={index % 2 ? "gold" : "sage"} floating /><span className={styles.cardGoldDetail} aria-hidden="true"></span><h3>{title}</h3><p>{copy}</p></PremiumCard>)}</MotionGroup></div></section>
    <section className={`${styles.section} ${styles.sectionSoft}`}><div className={styles.content}><SectionHeading title="A different measure of progress" /><MotionGroup className={styles.comparison} variant="fadeUp" stagger><PremiumCard variant="soft" className={`${styles.comparisonColumn} ${styles.comparisonCommon}`}><h3>Common Approach</h3><ul><li>Short-term wins</li><li>Quick fixes</li><li>Consumption disguised as success</li><li>Wealth measured by what you show</li><li>Planning that ends at retirement</li></ul></PremiumCard><div className={styles.comparisonVs} aria-hidden="true">VS</div><PremiumCard variant="inset" className={`${styles.comparisonColumn} ${styles.comparisonSeed}`}><h3>One Small Seed</h3><ul><li>Generational thinking</li><li>Wealth architecture</li><li>Financial education</li><li>Long-term systems</li><li>Legacy planning</li><li>Access over consumption</li></ul></PremiumCard></MotionGroup></div></section>
    <blockquote className={styles.quote}>“Wealth is not what you spend. It is what continues growing after you are gone.”</blockquote>
    <div className={`${styles.content} ${styles.ctaWrap}`}><CTASection title="Discover Your SOW POW Stage" copy="Start with a clear picture of where you are now." primary={{ label: "Take The Stage Finder", href: "/sow-pow-quiz" }} dark /></div>
  </>;
}
