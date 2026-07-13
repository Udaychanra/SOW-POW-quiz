import StageArtwork from "./StageArtwork.js";

function previewInsight(result) {
  if (result.finalStage === 0) return "Your strongest next move is foundational: prepare the ground beneath every financial decision before adding more complexity.";
  if (result.finalStage <= 2) return "Your strongest next move is to secure and structure the foundations so everything you build has somewhere stable to grow.";
  if (result.finalStage <= 4) return "Your strongest next move is to improve access and protection around what you have already built.";
  return "Your strongest next move is to turn what you have built into a durable system that can work beyond your daily attention.";
}

export default function QuizPreview({ result, onContinue }) {
  return (
    <section className="stage-view stage-view--results">
      <div className="card card--results anim" id="res-card">
        <StageArtwork stage={result.finalStage} />
        <h2 className="results-title">Your direction is clear</h2>
        <p className="results-subtitle">You are currently positioned around Stage {result.finalStage}: {result.stageName}.</p>
        <div className="results-description">{previewInsight(result)}<br /><br /><strong>Current priority:</strong> {result.directionalPriority}</div>
        <button type="button" className="btn-download" onClick={onContinue}>Get My Personalized SOW POW Roadmap</button>
        <p className="follow-text">Your complete personalized breakdown will be sent after email submission.</p>
      </div>
    </section>
  );
}
