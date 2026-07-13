import { fiveParts } from "../../content/site-content.js";
import FivePartIcon from "./FivePartIcon.js";
import IconMedallion from "./IconMedallion.js";
import MotionGroup from "./MotionGroup.js";
import PremiumCard from "./PremiumCard.js";
import styles from "./site.module.css";

export default function FivePartsGrid({ showCopy = true }) {
  return <MotionGroup className={styles.fivePartsGrid} variant="fadeUp" stagger>{fiveParts.map((part, index) => <PremiumCard key={part.name} tabIndex={0} variant={index === 2 ? "inset" : "soft"} className={styles.partCard}><IconMedallion tone={index % 2 ? "gold" : "sage"} floating><FivePartIcon name={part.name} label={`${part.name} icon`} /></IconMedallion><span className={styles.cardGoldDetail} aria-hidden="true"></span><h3>{part.name} — {part.meaning}</h3>{showCopy && <p>{part.copy}</p>}</PremiumCard>)}</MotionGroup>;
}
