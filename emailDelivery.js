import { emailTemplates } from "./emailTemplates.js";

/** Maps existing quiz result keys (getStage) → SOW POW email template stage 0–6 */
const LEGACY_STAGE_TO_TEMPLATE_NUM = {
  seed: 0,
  sprout: 1,
  growth: 4,
  harvest: 6,
};

/**
 * Resolve the email template for a quiz result stage key from getStage().
 * @param {string} stageKey - e.g. "seed" | "sprout" | "growth" | "harvest"
 * @returns {object} Email template for stages 0–6
 */
export function resolveEmailTemplate(stageKey) {
  const templateNum = LEGACY_STAGE_TO_TEMPLATE_NUM[stageKey] ?? 0;
  return emailTemplates[templateNum];
}

/**
 * Build a delivery-ready payload for personalized SOW POW roadmap email.
 * @param {{ stageKey: string, emoji?: string, title?: string, subtitle?: string, description?: string }} stageResult
 * @param {{ firstName: string, email: string }} userData
 * @returns {object}
 */
export function prepareEmailPayload(stageResult, userData) {
  const template = resolveEmailTemplate(stageResult.stageKey);

  return {
    to: userData.email,
    subject: template.subject,
    recipient: {
      firstName: userData.firstName,
      email: userData.email,
    },
    stage: {
      num: template.num,
      name: template.name,
      phase: template.phase,
      legacyResultKey: stageResult.stageKey,
    },
    quizResult: {
      emoji: stageResult.emoji,
      title: stageResult.title,
      subtitle: stageResult.subtitle,
      description: stageResult.description,
    },
    content: {
      headline: template.headline,
      description: template.description,
      focus: template.focus,
      episode: template.episode,
      episodeLink: template.episodeLink,
    },
    meta: {
      preparedAt: new Date().toISOString(),
      source: "sowpow-quiz",
    },
  };
}
