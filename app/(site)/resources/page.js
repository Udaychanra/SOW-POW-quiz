import { Suspense } from "react";
import IconMedallion from "../../../components/site/IconMedallion.js";
import LatestYouTubeVideos from "../../../components/site/LatestYouTubeVideos.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import NewsletterForm from "../../../components/site/NewsletterForm.js";
import PageHero from "../../../components/site/PageHero.js";
import PremiumCard from "../../../components/site/PremiumCard.js";
import SectionHeading from "../../../components/site/SectionHeading.js";
import YouTubeSectionSkeleton from "../../../components/site/YouTubeSectionSkeleton.js";
import styles from "../../../components/site/site.module.css";

export const metadata = { title: "Resources | One Small Seed" };
export const revalidate = 21600;

const categories = [
  ["seed", "Foundation", "Budgeting, debt, reserves and money mindset."],
  ["home", "Structure", "Legal, tax, planning and financial systems."],
  ["shield", "Protection", "Insurance, liquidity and retirement protection."],
  ["tree", "Legacy", "Estate planning, family wealth and teaching the next generation."],
];

export default function ResourcesPage() {
  return <>
    <PageHero eyebrow="Resources" title="Financial wisdom you can build with." copy="Simple, grounded education for building structure, protecting wealth and thinking beyond the next transaction." />
    <section className={styles.section}><div className={styles.content}><SectionHeading title="Browse by topic" /><MotionGroup className={styles.cardGrid4} stagger>{categories.map(([icon,title,copy], index) => <PremiumCard tabIndex={0} variant={index % 2 ? "inset" : "soft"} className={styles.infoCard} key={title}><IconMedallion name={icon} label="" tone={index % 2 ? "gold" : "sage"} /><h3>{title}</h3><p>{copy}</p></PremiumCard>)}</MotionGroup></div></section>
    <Suspense fallback={<YouTubeSectionSkeleton />}><LatestYouTubeVideos /></Suspense>
    <section className={styles.section}><div className={styles.content}><MotionGroup variant="scale" className={styles.newsletter}><div><h2>Grow one layer at a time.</h2><p>Get grounded financial education from One Small Seed.</p></div><NewsletterForm /></MotionGroup></div></section>
  </>;
}
