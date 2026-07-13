import OfficialLogo from "./OfficialLogo.js";

export default function Logo({ light = false, compact = false }) {
  return (
    <OfficialLogo
      surface={light ? "dark" : "light"}
      priority
      sizes={compact ? "56px" : "72px"}
      className={compact ? "quiz-shell-logo quiz-shell-logo--compact" : "quiz-shell-logo"}
    />
  );
}
