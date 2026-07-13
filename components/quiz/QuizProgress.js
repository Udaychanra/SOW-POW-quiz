export default function QuizProgress({ current, total }) {
  const completedThroughCurrent = current + 1;
  const percentage = (completedThroughCurrent / total) * 100;

  return (
    <div className="progress-section botanical-progress" role="progressbar" aria-label={`Quiz progress: question ${completedThroughCurrent} of ${total}`} aria-valuemin={1} aria-valuemax={total} aria-valuenow={completedThroughCurrent} aria-valuetext={`Question ${completedThroughCurrent} of ${total}`}>
      <span className="progress-label">Your progress</span>
      <svg className="progress-branch" viewBox="0 0 400 48" aria-hidden="true">
        <defs><linearGradient id="quiz-progress-gradient" x1="0" x2="1"><stop offset="0" stopColor="#c8a96b"/><stop offset="1" stopColor="#1f4d3a"/></linearGradient></defs>
        <path className="progress-branch-track" d="M8 29C70 17 112 36 170 26S286 18 392 28" pathLength="100" />
        <path className="progress-branch-fill" d="M8 29C70 17 112 36 170 26S286 18 392 28" pathLength="100" style={{ strokeDasharray: `${percentage} ${100 - percentage}` }} />
        {Array.from({ length: total }, (_, index) => {
          const x = 14 + (372 / Math.max(total - 1, 1)) * index;
          const isCurrent = index === current;
          const isComplete = index < current;
          const state = isCurrent ? "current" : isComplete ? "complete" : "future";
          return index === total - 1 ? (
            <g key={index} className={`progress-leaf progress-leaf--${state} progress-blossom`} transform={`translate(${x} 27)`}><circle cx="0" cy="0" r="5"/><path d="M0-5V-10M-5 0h-5M5 0h5M-3-4l-4-4M3-4l4-4"/></g>
          ) : (
            <g key={index} className={`progress-leaf progress-leaf--${state}`} transform={`translate(${x} 28) rotate(${index % 2 === 0 ? -28 : 152})`}><path className="progress-leaf-stem" d="M0 0h7"/><path className="progress-leaf-shape" d="M7 0c4-6 10-6 14-2-2 7-8 9-14 2Z"/></g>
          );
        })}
      </svg>
      <p className="q-number">Question {completedThroughCurrent} of {total}</p>
    </div>
  );
}
