import Link from "next/link";
import IconMedallion from "../../../components/site/IconMedallion.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import PageHero from "../../../components/site/PageHero.js";
import PremiumCard from "../../../components/site/PremiumCard.js";
import SectionHeading from "../../../components/site/SectionHeading.js";
import styles from "../../../components/site/site.module.css";

export const metadata = {
  title: "Licensed Services | One Small Seed",
  description: "Explore educational and licensed conversations involving protection, retirement, business continuity and legacy, available only where properly licensed.",
};

const concerns = [
  {
    icon: "shield",
    title: "How do I protect the people who depend on me?",
    copy: "Understand the questions that can arise when income, responsibilities or family circumstances change.",
    href: "#service-categories",
    action: "Explore related areas",
  },
  {
    icon: "compass",
    title: "How should I prepare for retirement income?",
    copy: "Explore the difference between accumulating assets and preparing for future income needs.",
    href: "#service-categories",
    action: "Explore related areas",
  },
  {
    icon: "home",
    title: "What happens to my business if I am not there?",
    copy: "Consider continuity, succession and the people or systems the business depends on.",
    href: "#service-categories",
    action: "Explore related areas",
  },
  {
    icon: "tree",
    title: "How do I transfer wealth intentionally?",
    copy: "Begin thinking about protection, coordination, teaching and what should continue beyond you.",
    href: "#service-categories",
    action: "Explore related areas",
  },
  {
    icon: "water",
    title: "How do I create flexibility without disturbing everything else?",
    copy: "Explore questions around protection, access and liquidity within a broader financial picture.",
    href: "/sow-pow-quiz",
    action: "Take the assessment first",
  },
];

const decisions = [
  {
    icon: "compass",
    title: "Start with the Assessment",
    copy: "Use 10 honest questions to receive a clearer educational picture of where you are and what may deserve attention next.",
    label: "Play to Know Yourself",
    href: "/sow-pow-quiz",
    note: "About 2 minutes · No perfect answers · Personalized educational result",
  },
  {
    icon: "conversation",
    title: "Start with a Conversation",
    copy: "Use this option when you already have a specific concern involving protection, retirement, business continuity or legacy.",
    label: "Request a Conversation",
    href: "/contact",
    note: "A request begins a discussion. It does not create a commitment or guarantee a service recommendation.",
  },
];

const services = [
  {
    icon: "shield",
    title: "Insurance Strategy",
    copy: "Educational and licensed conversations involving protection needs and available insurance approaches, where appropriate.",
    topics: ["Term life", "Permanent life", "Indexed universal life", "Annuities"],
  },
  {
    icon: "home",
    title: "Business Owner Protection",
    copy: "Questions involving business continuity, key-person risk, buy-sell planning and succession preparation.",
    topics: ["Key-person protection", "Buy-sell funding", "Continuity planning", "Succession risk"],
  },
  {
    icon: "tree",
    title: "Family Legacy Planning",
    copy: "Educational discussions around family protection, coordination, wealth-transfer considerations and teaching the next generation.",
    topics: ["Family protection", "Estate coordination", "Beneficiary preparation", "Legacy education"],
  },
  {
    icon: "water",
    title: "Retirement Protection",
    copy: "Questions involving retirement-income protection, tax-aware education and long-term financial flexibility.",
    topics: ["Income protection", "Long-term liquidity", "Retirement considerations", "Tax-aware educational discussions"],
  },
];

const process = [
  ["Recognize the question", "Begin with the concern that is already on your mind."],
  ["Take the assessment or request a conversation", "Choose the starting point that feels most relevant."],
  ["Understand the context", "Discuss goals, responsibilities, priorities and the areas requiring attention."],
  ["Explore appropriate education or options", "Review relevant concepts and, where licensed and suitable, available service categories."],
  ["Decide what fits", "Move forward only after understanding the purpose, limitations and considerations involved."],
];

const trustCards = [
  ["book", "Educational Content", "Website content and the SOW POW assessment provide general educational information and are not individualized advice."],
  ["shield", "Licensed Services", "Licensed conversations and services are available only where properly licensed and only after an appropriate discussion."],
  ["layers", "Tax and Legal Matters", "Tax and legal decisions should be reviewed with qualified tax or legal professionals."],
];

export default function LicensedServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Licensed Services"
        title={<><span>You have questions.</span><br /><span>Let’s make the next step clearer.</span></>}
        copy="Protection, retirement, business continuity and legacy can become difficult to navigate alone. One Small Seed begins with the questions already on your mind—not with a product."
        primary={{ label: "Request a Conversation", href: "/contact", event: "services_conversation_cta", page: "licensed_services", section: "hero" }}
        secondary={{ label: "Take the Assessment First", href: "/sow-pow-quiz", event: "services_quiz_cta", page: "licensed_services", section: "hero" }}
        microcopy="A conversation begins with context, not a commitment."
        note="Educational information only. Licensed services are available only where properly licensed."
      />

      <section className={styles.section}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Start With What Is On Your Mind" title="Which question feels closest to yours?" copy="Choose the concern that best reflects what you are trying to understand. You do not need to know a product name before beginning." />
          <MotionGroup className={styles.servicesConcernGrid} stagger>
            {concerns.map((concern, index) => (
              <PremiumCard as={Link} href={concern.href} variant={index % 2 ? "inset" : "soft"} className={styles.servicesConcernCard} key={concern.title} data-analytics-event="services_concern_selected" data-analytics-card-id={`concern-${index + 1}`} data-analytics-destination="internal">
                <IconMedallion name={concern.icon} label="" tone={index % 2 ? "gold" : "sage"} />
                <h3>{concern.title}</h3>
                <p>{concern.copy}</p>
                <span className={styles.servicesCardAction}>{concern.action}<b aria-hidden="true">→</b></span>
              </PremiumCard>
            ))}
          </MotionGroup>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Choose A Useful Starting Point" title="Not sure whether to begin with the assessment or a conversation?" />
          <MotionGroup className={styles.servicesDecisionGrid} stagger>
            {decisions.map((decision, index) => (
              <PremiumCard variant={index ? "inset" : "landscape"} className={styles.servicesDecisionCard} key={decision.title}>
                <IconMedallion name={decision.icon} label="" tone={index ? "gold" : "forest"} />
                <div>
                  <h3>{decision.title}</h3>
                  <p>{decision.copy}</p>
                </div>
                <Link className={index ? styles.secondaryButton : styles.primaryButton} href={decision.href} data-analytics-event={index ? "services_conversation_cta" : "services_quiz_cta"} data-analytics-section="decision_cards">{decision.label}</Link>
                <small>{decision.note}</small>
              </PremiumCard>
            ))}
          </MotionGroup>
        </div>
      </section>

      <section id="service-categories" className={styles.section}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Areas We Can Discuss" title="Education first. Licensed discussion where appropriate." copy="These categories describe the areas that may be discussed after understanding your goals, concerns and circumstances." />
          <MotionGroup className={styles.servicesCategoryGrid} stagger>
            {services.map((service, index) => (
              <PremiumCard variant={index % 2 ? "inset" : "arch"} className={`${styles.serviceCard} ${styles.servicesCategoryCard}`} key={service.title}>
                <IconMedallion name={service.icon} label="" tone={index % 2 ? "gold" : "forest"} floating />
                <span className={styles.cardGoldDetail} aria-hidden="true"></span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <p className={styles.servicesTopicsLabel}>Topics may include</p>
                <ul>{service.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                <Link className={styles.servicesInlineLink} href="/contact" data-analytics-event="services_conversation_cta" data-analytics-section="service_categories" data-analytics-card-id={`service-${index + 1}`}>Discuss this concern <span aria-hidden="true">→</span></Link>
              </PremiumCard>
            ))}
          </MotionGroup>
          <p className={styles.servicesCategoryNote}>Available approaches depend on individual circumstances, suitability and licensing. No category is appropriate for every visitor.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.content}>
          <SectionHeading eyebrow="A Careful Process" title="Start with understanding—not a rushed recommendation." />
          <MotionGroup className={`${styles.process} ${styles.servicesProcess}`} variant="line" stagger>
            {process.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </MotionGroup>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.content}>
          <SectionHeading eyebrow="Clear Information" title="Education and licensed services have different roles." />
          <MotionGroup className={styles.servicesTrustGrid} variant="fadeIn">
            {trustCards.map(([icon, title, copy], index) => (
              <PremiumCard variant={index % 2 ? "inset" : "soft"} className={styles.servicesTrustCard} key={title}>
                <IconMedallion name={icon} label="" tone={index % 2 ? "gold" : "quiet"} size="small" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </PremiumCard>
            ))}
          </MotionGroup>
          <div className={styles.servicesDisclosureLink}><Link className={styles.secondaryButton} href="/disclosures" data-analytics-event="services_disclosures_clicked" data-analytics-page="licensed_services">Read Full Disclosures <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <div className={`${styles.content} ${styles.ctaWrap}`}>
        <MotionGroup as="section" variant="scale" className={`${styles.ctaSection} ${styles.ctaDark} ${styles.finalCta} ${styles.servicesFinalCta}`}>
          <div>
            <p className={styles.eyebrow}>When You Are Ready</p>
            <h2>Start with the question.<br />The next step can grow from there.</h2>
            <p>Request a conversation about the concern already on your mind—or begin with the 10-question assessment.</p>
          </div>
          <div className={styles.actions}>
            <Link className={styles.goldButton} href="/contact" data-analytics-event="services_conversation_cta" data-analytics-section="final_cta">Request a Conversation</Link>
            <Link className={styles.lightOutlineButton} href="/sow-pow-quiz" data-analytics-event="services_quiz_cta" data-analytics-section="final_cta">Play to Know Yourself</Link>
          </div>
        </MotionGroup>
      </div>
    </>
  );
}
