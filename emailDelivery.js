import { emailTemplates } from "./emailTemplates.js";
import { getStageByNumber } from "./quizData.js";

/**
 * Resolve the email-specific copy for a canonical SOW POW stage number.
 * @param {number} stageNumber
 * @returns {object} Email template for stages 0–6
 */
export function resolveEmailTemplate(stageNumber) {
  return emailTemplates[getStageByNumber(stageNumber).num];
}

/**
 * Build a delivery-ready payload for personalized SOW POW roadmap email.
 * @param {object} quizResult - Output from calculateQuizResult().
 * @param {{ firstName: string, email: string }} userData
 * @returns {object}
 */
export function prepareEmailPayload(quizResult, userData) {
  const stage = getStageByNumber(quizResult.finalStage);
  const template = resolveEmailTemplate(stage.num);

  return {
    to: userData.email,
    subject: template.subject,
    recipient: {
      firstName: userData.firstName,
      email: userData.email,
    },
    stage: {
      num: stage.num,
      name: stage.name,
      phase: stage.phase,
      range: stage.range,
    },
    content: {
      headline: template.headline,
      description: stage.description,
      focus: stage.oneSeed,
      fivePartsStatuses: stage.fivePartsStatuses,
      directionalPriority: quizResult.directionalPriority,
      episode: stage.episode,
      episodeLink: stage.episodeUrl,
    },
    meta: {
      preparedAt: new Date().toISOString(),
      source: "sowpow-quiz",
      rawScore: quizResult.rawScore,
      directionalAnswer: quizResult.directionalAnswer,
      numericStage: quizResult.numericStage,
      finalStage: quizResult.finalStage,
    },
  };
}
