import Link from "next/link";
import ContactForm from "../../../components/site/ContactForm.js";
import IconMedallion from "../../../components/site/IconMedallion.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import PageHero from "../../../components/site/PageHero.js";
import PremiumCard from "../../../components/site/PremiumCard.js";
import SectionHeading from "../../../components/site/SectionHeading.js";
import styles from "../../../components/site/site.module.css";

export const metadata = {
  title: "Contact | One Small Seed",
  description: "Share general context and request a conversation with One Small Seed.",
};

const beforeYouBegin = [
  "The conversation begins with context, not commitment",
  "Educational content is not individualized advice",
  "Licensed services are available only where properly licensed",
  "Tax and legal questions should be discussed with qualified professionals",
];

export default function ContactPage() {
  return <>
    <PageHero eyebrow="Start a Conversation" title="What question is already on your mind?" copy="Share a little context about what you would like to understand. A request begins a conversation—it does not create a commitment." note="Educational information only. Licensed services are available only where properly licensed." />
    <section className={styles.section}><div className={styles.content}>
      <SectionHeading title="Prepare the context for a conversation" copy="Choose the reason that best matches the question already on your mind." />
      <div className={styles.contactPreparationLayout}>
        <MotionGroup id="contact-form" variant="fromLeft"><ContactForm /></MotionGroup>
        <MotionGroup className={styles.contactBefore} variant="fromRight">
          <PremiumCard variant="landscape" className={styles.contactBeforeCard}>
            <IconMedallion name="conversation" label="" tone="gold" />
            <p className={styles.eyebrow}>Before You Begin</p>
            <h2>Clarity comes before commitment.</h2>
            <ul>{beforeYouBegin.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link className={styles.secondaryButton} href="/disclosures">Read Full Disclosures <span aria-hidden="true">→</span></Link>
          </PremiumCard>
          <p className={styles.contactAlternative}>You can also begin with the <Link href="/sow-pow-quiz">educational assessment</Link> or <Link href="/resources">explore resources</Link>. Neither creates an advisory relationship.</p>
        </MotionGroup>
      </div>
    </div></section>
  </>;
}
