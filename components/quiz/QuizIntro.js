import SiteIcon from "../site/SiteIcon.js";
import styles from "./quizGateway.module.css";

const trustPoints = [
  {
    icon: "sun",
    title: "About 2 Minutes",
    text: "A short assessment designed to help you begin.",
  },
  {
    icon: "compass",
    title: "No Perfect Answers",
    text: "Choose what feels most true right now.",
  },
  {
    icon: "tree",
    title: "Personalized Result",
    text: "Receive an educational result based on your answers.",
  },
];

export default function QuizIntro({ onStart }) {
  return (
    <section className={`${styles.gateway} stage-view stage-view--intro`} aria-labelledby="gateway-title">
      <span className={styles.botanical} aria-hidden="true"></span>
      <div className={styles.panel}>
        <div className={styles.introBlock}>
          <p className={styles.eyebrow}>A Clearer Starting Point</p>
          <h1 id="gateway-title" className={styles.title}>What does your financial picture look like right now?</h1>
          <p className={styles.description}>Answer 10 honest questions to uncover a clearer educational picture of where you are and what may deserve your attention next.</p>
          <div className={styles.divider} aria-hidden="true"><span></span></div>
        </div>

        <div className={styles.trustGrid} aria-label="Assessment details">
          {trustPoints.map((point) => (
            <article className={styles.trustItem} key={point.title}>
              <div className={styles.trustIcon} aria-hidden="true"><SiteIcon name={point.icon} label="" size="small" /></div>
              <div><h2>{point.title}</h2><p>{point.text}</p></div>
            </article>
          ))}
        </div>

        <div className={styles.actionBlock}>
          <button type="button" className={styles.startButton} onClick={onStart}>Start My Assessment →</button>
          <p className={styles.startingPoint}>Start with what is true right now.</p>
          <p className={styles.disclaimer}>Your result is educational and is not individualized financial, investment, tax or legal advice.</p>
        </div>
      </div>

      <div className={styles.landscape} aria-hidden="true">
        <img className={styles.hills} src="/site/gateway-landscape.svg" alt="" />
        <img className={styles.tree} src="/site/gateway-tree.svg" alt="" />
      </div>
    </section>
  );
}
