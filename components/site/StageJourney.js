import { stages } from "../../content/site-content.js";
import FrameworkIcon from "./FrameworkIcon.js";
import IconMedallion from "./IconMedallion.js";
import MotionGroup from "./MotionGroup.js";
import PremiumCard from "./PremiumCard.js";
import styles from "./site.module.css";

export default function StageJourney({ detailed = false }) {
  return (
    <MotionGroup className={`${styles.stageJourney}${detailed ? ` ${styles.stageJourneyDetailed}` : ""}`} variant="line" stagger aria-label="The seven SOW POW stages">
      {!detailed && <svg className={styles.journeyPath} viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden="true"><path className={styles.journeyPathGhost} d="M70 45C190 29 270 59 390 44S620 30 740 47s140 5 190-2"/><path pathLength="1" className={styles.journeyPathDrawn} d="M70 45C190 29 270 59 390 44S620 30 740 47s140 5 190-2"/><g className={styles.journeyNodes}>{stages.map((stage, index) => <circle key={stage.number} className={styles.journeyNode} style={{ "--stage-index": index }} cx={70 + (860 / 6) * index} cy={45} r="4"/>)}</g></svg>}
      {stages.map((stage, index) => (
        <PremiumCard key={stage.number} tabIndex={0} variant={stage.number === 6 ? "landscape" : "arch"} className={styles.stageCard} style={{ "--stage-index": index }}>
          <IconMedallion tone={stage.number % 2 ? "gold" : "sage"}><FrameworkIcon name={stage.icon} label={`${stage.name} icon`} /></IconMedallion>
          <span>Stage {stage.number}</span><h3>{stage.name}</h3>{detailed && <p>{stage.short}</p>}
        </PremiumCard>
      ))}
    </MotionGroup>
  );
}
