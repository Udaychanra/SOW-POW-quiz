import StageArtwork from "./StageArtwork.js";

export default function QuizConfirmation({ result }) {
  return (
    <section className="stage-view stage-view--results">
      <div className="card card--results anim confirmation-box" id="res-card">
        <StageArtwork stage={result.finalStage} />
        <h2 className="results-title">Check your inbox</h2>
        <p className="results-subtitle">Your personalized SOW POW roadmap is on its way.</p>
        <div className="success-text">Thank you! Your personalized SOW POW roadmap is on its way. Check your inbox.</div>
      </div>
    </section>
  );
}
