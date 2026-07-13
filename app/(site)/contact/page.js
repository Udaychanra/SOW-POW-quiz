import Link from "next/link";
import ContactForm from "../../../components/site/ContactForm.js";
import IconMedallion from "../../../components/site/IconMedallion.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import PageHero from "../../../components/site/PageHero.js";
import PremiumCard from "../../../components/site/PremiumCard.js";
import SectionHeading from "../../../components/site/SectionHeading.js";
import styles from "../../../components/site/site.module.css";

export const metadata = { title: "Contact | One Small Seed" };

const options = [
  ["compass", "Take the quiz", "Best for first-time visitors.", "/sow-pow-quiz"],
  ["conversation", "Book a conversation", "Best for people ready for a deeper planning discussion.", "/licensed-services"],
  ["mail", "Join the newsletter", "Best for ongoing education.", "/resources"],
  ["message", "General inquiry", "Best for partnerships, media or support.", "#contact-form"],
];

export default function ContactPage() {
  return <>
    <PageHero eyebrow="Contact" title="Start with clarity." copy="Whether you are beginning the journey, looking for resources, or ready for a deeper conversation, One Small Seed begins with the right next step." />
    <section className={styles.section}><div className={styles.content}><SectionHeading title="Choose the right next step" copy="A clear starting point keeps the conversation useful and focused." /><div className={styles.contactLayout}><MotionGroup className={styles.contactOptions} stagger>{options.map(([icon,title,copy,href], index) => <PremiumCard as={Link} variant={index % 2 ? "inset" : "soft"} className={styles.contactOption} href={href} key={title}><IconMedallion name={icon} label="" tone={index % 2 ? "gold" : "sage"} floating /><div><h3>{title}</h3><p>{copy}</p></div><span className={styles.contactArrow} aria-hidden="true">→</span></PremiumCard>)}</MotionGroup><MotionGroup id="contact-form" variant="fromRight"><ContactForm /></MotionGroup></div></div></section>
  </>;
}
