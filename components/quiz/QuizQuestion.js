import Logo from "../ui/Logo.js";
import QuizProgress from "./QuizProgress.js";

export default function QuizQuestion({ question, current, total, selected, onSelect, onBack, onNext }) {
  return (
    <section className="stage-view stage-view--quiz">
      <div className="quiz-shell">
        <header className="quiz-header">
          <Logo light compact />
          <button type="button" className="quiz-menu-btn" aria-label="Menu"><span></span><span></span><span></span></button>
        </header>
        <div className="card card--quiz">
          <QuizProgress current={current} total={total} />
          <p className="q-tag">{question.tag}</p>
          <p className="q-text">{question.text}</p>
          <p className="q-subtext">{question.sub}</p>
          <div className="opts">
            {question.options.map((option, index) => (
              <button key={`${question.id}-${index}`} type="button" className={`opt${selected === index ? " selected" : ""}`} onClick={() => onSelect(index)}>
                <span className="opt-copy"><span className="opt-label">{option.label}</span><span className="opt-subtext">{option.sub}</span></span>
              </button>
            ))}
          </div>
          <div className="question-navigation">
            {current > 0 && <button type="button" className="btn-gold btn-back" onClick={onBack}>← Back</button>}
            {selected !== undefined && <button type="button" className="btn-next" onClick={onNext}>{current === total - 1 ? "See My Results →" : "Next →"}</button>}
          </div>
        </div>
      </div>
    </section>
  );
}
