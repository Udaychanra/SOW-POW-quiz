import { PARTS, PARTS_ORDER, getStageByNumber } from "../quiz/stages.js";

export function buildEmailText(payload) {
  const stage = getStageByNumber(payload.stage?.num);
  const firstName = payload.recipient?.firstName || "Friend";
  const parts = PARTS_ORDER.map((key) => {
    const status = stage.fivePartsStatuses[key];
    const label = status === "priority" ? "Focus Here" : status === "active" ? "Active" : "Building";
    return `${PARTS[key].label} — ${PARTS[key].desc}: ${label}`;
  }).join("\n");

  return `${firstName}, your SOW POW stage awaits.

${stage.phase} · Stage ${stage.num} · ${stage.range}
${stage.name}
${payload.content?.headline || ""}

${stage.description}

YOUR FOCUS THIS WEEK
${stage.oneSeed}
${payload.content?.directionalPriority ? `\nDirectional priority: ${payload.content.directionalPriority}` : ""}

YOUR FIVE PARTS PICTURE
${parts}

RECOMMENDED LISTENING
${stage.episode}
${stage.episodeUrl}

Follow @1smallseed for everything that comes next.
© One Small Seed · SOW POW Framework`;
}
