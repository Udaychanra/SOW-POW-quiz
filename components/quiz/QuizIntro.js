import FrameworkIcon from "../site/FrameworkIcon.js";
import styles from "./quizGateway.module.css";

const frameworkCards = [
  {
    icon: "seed",
    family: "stage",
    title: "SOW POW",
    text: "How far along you are. Six stages plus Stage 0 — the preparation phase. A sequence you move through over time.",
    badge: "STAGE 0 → STAGE 6",
  },
  {
    icon: "Trunk",
    family: "part",
    title: "The Five Parts",
    text: "What you tend. Five areas. No order. No ranking. You tend all five at every stage — always.",
  },
];

const fiveParts = [["Light", "Income"], ["Trunk", "Investments"], ["Bark", "Protection"], ["Branches", "Plan"], ["Seeds", "Teaching"]];

export default function QuizIntro({ onStart }) {
  return (
    <section className={`${styles.gateway} stage-view stage-view--intro`} aria-labelledby="gateway-title">
      <span className={styles.botanical} aria-hidden="true"></span>
      <div className={styles.panel}>
        <div className={styles.introBlock}>
          <p className={styles.eyebrow}>One Small Seed</p>
          <h1 id="gateway-title" className={styles.title}><span>Do You Know Which</span><span> Stage You Are In?</span></h1>
          <p className={styles.supportingLine}>The Stage Finder — SOW POW + The Five Parts</p>
          <div className={styles.divider} aria-hidden="true"><span></span></div>
          <h2 className={styles.introduction}>Your personal wealth-building picture —<br /> in 10 honest questions.</h2>
          <p className={styles.description}>This assessment uses two frameworks together to give you a meaningful starting point — not a generic score.</p>
        </div>

        <div className={styles.frameworkGrid}>
          {frameworkCards.map((card) => (
            <article className={styles.frameworkCard} key={card.title}>
              <div className={styles.frameworkIcon}><FrameworkIcon family={card.family} name={card.icon} label="" className={styles.gatewayFrameworkIcon} /></div>
              <div><h3>{card.title}</h3><p>{card.text}</p>{card.badge && <span className={styles.badge}>{card.badge}</span>}</div>
            </article>
          ))}
        </div>

        <section className={styles.partsSection} aria-labelledby="parts-heading">
          <div className={styles.sectionDivider}><span></span><h2 id="parts-heading">The Five Parts You Tend To</h2><span></span></div>
          <div className={styles.partsGrid}>
            {fiveParts.map(([name, meaning]) => (
              <article className={styles.partCard} key={name}>
                <FrameworkIcon family="part" name={name} label={`${name} icon`} className={styles.gatewayFrameworkIcon} />
                <h3>{name}</h3>
                <p>{meaning}</p>
              </article>
            ))}
          </div>
        </section>

        <blockquote className={styles.quoteBand}><span aria-hidden="true">“</span><p>Plant the seed today that shades someone tomorrow.</p><span aria-hidden="true">”</span></blockquote>

        <div className={styles.actionBlock}>
          <button type="button" className={styles.startButton} onClick={onStart}>Find My Stage →</button>
          <p>To know is to plan. To plan is to move.<br />Start with what is true right now.</p>
        </div>
      </div>

      <div className={styles.landscape} aria-hidden="true">
        <img className={styles.hills} src="/site/gateway-landscape.svg" alt="" />
        <img className={styles.tree} src="/site/gateway-tree.svg" alt="" />
      </div>
    </section>
  );
}
