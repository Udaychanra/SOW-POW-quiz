import IconMedallion from "../../../components/site/IconMedallion.js";
import MotionGroup from "../../../components/site/MotionGroup.js";
import PageHero from "../../../components/site/PageHero.js";
import PremiumCard from "../../../components/site/PremiumCard.js";
import styles from "../../../components/site/site.module.css";

export const metadata = { title: "Disclosures | One Small Seed" };

const disclosures = [
  ["book", "Educational Content", "Content on this website is for educational and informational purposes only."],
  ["compass", "No Individualized Advice", "Nothing on this website should be interpreted as individualized financial, investment, tax, legal or insurance advice."],
  ["shield", "Licensed Services", "Licensed services are available only where properly licensed and after an appropriate conversation."],
  ["layers", "Insurance Product Disclosures", "Insurance products may involve costs, limitations, exclusions, surrender charges and suitability considerations."],
  ["home", "Tax and Legal Matters", "Tax and legal decisions should be reviewed with qualified tax or legal professionals."],
  ["branch", "Future Advisory Services", "Investment advisory services, if offered in the future, will be provided through the appropriate registered entity and disclosures."],
];

export default function DisclosuresPage() {
  return <>
    <PageHero eyebrow="Disclosures" title="Clear information. Careful guidance." copy="One Small Seed is built on education, transparency and responsible communication." landscape={false} />
    <section className={styles.section}><div className={`${styles.content} ${styles.readableContent}`}><MotionGroup className={styles.disclosureList} stagger>{disclosures.map(([icon,title,copy], index) => <PremiumCard as="section" variant="inset" className={styles.disclosureCard} key={title}><span className={styles.disclosureNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><IconMedallion name={icon} label="" tone="quiet" size="small" /><div><h2>{title}</h2><p>{copy}</p></div></PremiumCard>)}</MotionGroup></div></section>
  </>;
}
