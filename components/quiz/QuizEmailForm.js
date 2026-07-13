import { useState } from "react";
import StageArtwork from "./StageArtwork.js";

export default function QuizEmailForm({ result, answers, onSuccess }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (firstName.trim().length < 2) return setError("Please enter a valid first name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Please enter a valid email address");
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim(), answers }),
      });
      const responseText = await response.text();
      let body = {};
      if (responseText) {
        try { body = JSON.parse(responseText); } catch { /* handled as a safe failure */ }
      }
      if (!response.ok || body.success !== true) throw new Error(body.error || "Failed to send your roadmap email");
      if (body.stage !== result.finalStage) throw new Error("Result consistency check failed");
      onSuccess();
    } catch (submissionError) {
      setError(submissionError.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <section className="stage-view stage-view--results">
      <div className="card card--results anim" id="res-card">
        <StageArtwork stage={result.finalStage} />
        <h2 className="results-title">One step away</h2>
        <p className="results-subtitle">Where should we send your complete personalized breakdown?</p>
        <form className="email-box" onSubmit={submit} noValidate>
          <label className="email-label" htmlFor="lead-first-name">Get Your Personalized Report</label>
          <input type="text" id="lead-first-name" className="email-input" placeholder="First Name" required autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          <input type="email" id="lead-email" className="email-input" placeholder="your@email.com" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <button className="btn-download" disabled={loading}>{loading ? "Preparing Your Roadmap…" : "Get My Personalized SOW POW Roadmap"}</button>
          {error && <div className="error-text" role="alert">{error}</div>}
        </form>
      </div>
    </section>
  );
}
