export const QUESTIONS = [
  {
    id: 1,
    tag: "Bark — Protection",
    text: "Do you have three to six months of living expenses saved and accessible right now — not in the stock market, not in retirement accounts, just liquid and available?",
    sub: "This is the foundation everything else rests on. No seed survives poisoned ground.",
    type: "scored",
    options: [
      { label: "Yes — I have this in place.", sub: "Liquid, accessible, protected.", value: 2 },
      { label: "I am working on it.", sub: "Started but not complete.", value: 1 },
      { label: "Not yet.", sub: "This has not been addressed.", value: 0 },
    ],
    maps: { sowpow: 1, part: "Bark" },
  },
  {
    id: 2,
    tag: "Branches — Plan",
    text: "Do you have a written will and named beneficiaries on every financial account you own?",
    sub: "The structural layer that protects what has been built.",
    type: "scored",
    options: [
      { label: "Yes — everything is documented.", sub: "Will written. Beneficiaries named on all accounts.", value: 2 },
      { label: "I have started but it is not complete.", sub: "Partial — some gaps remain.", value: 1 },
      { label: "No — I have not done this yet.", sub: "Not in place.", value: 0 },
    ],
    maps: { sowpow: 2, part: "Branches" },
  },
  {
    id: 3,
    tag: "Branches + Bark",
    text: "Do you have a business entity — an LLC or other structure — and have you had a dedicated tax strategy session with a CPA in the last twelve months?",
    sub: "Own differently — not just earn differently. This is the line that separates the corporate executive from the private owner.",
    type: "scored",
    options: [
      { label: "Yes — entity exists and tax strategy is active.", sub: "Both in place and current.", value: 2 },
      { label: "I have one but not both.", sub: "Entity or tax session — not both.", value: 1 },
      { label: "Neither is in place.", sub: "Not yet started.", value: 0 },
    ],
    maps: { sowpow: 2, part: "Branches" },
  },
  {
    id: 4,
    tag: "Light — Income",
    text: "Do you have a source of income outside your primary job or salary — rental income, business income, investment income, or any other stream that would continue if your main job stopped?",
    sub: "One stream is one point of failure. The energy source that feeds everything.",
    type: "scored",
    options: [
      { label: "Yes — I have at least one other stream.", sub: "Income exists beyond my main job.", value: 2 },
      { label: "I am actively building one right now.", sub: "In progress.", value: 1 },
      { label: "No — everything comes from one source.", sub: "Single income stream only.", value: 0 },
    ],
    maps: { sowpow: 3, part: "Light" },
  },
  {
    id: 5,
    tag: "Trunk — Investments",
    text: "Do you understand the difference between tax-deferred and tax-free — and does your current retirement strategy actively account for that difference?",
    sub: "The chapter Babylon never wrote. The tax gap that quietly erodes decades of building.",
    type: "scored",
    options: [
      { label: "Yes — I understand it and my strategy reflects it.", sub: "Tax-free strategy is active.", value: 2 },
      { label: "I know the difference but my strategy does not reflect it.", sub: "Awareness without action yet.", value: 1 },
      { label: "No — I have never looked at this closely.", sub: "Not on my radar yet.", value: 0 },
    ],
    maps: { sowpow: 4, part: "Trunk" },
  },
  {
    id: 6,
    tag: "Trunk + Bark",
    text: "Do you have a liquidity layer — money you can access within thirty days without penalties, taxes, market exposure, or needing to ask anyone's permission?",
    sub: "Access-rich, not just asset-rich. The modern family bank concept.",
    type: "scored",
    options: [
      { label: "Yes — I have this in place.", sub: "Liquid, accessible, no penalties.", value: 2 },
      { label: "I have some access but not as much as I should.", sub: "Partial liquidity.", value: 1 },
      { label: "No — most of my money is tied up or hard to reach.", sub: "Limited access right now.", value: 0 },
    ],
    maps: { sowpow: 3, part: "Trunk" },
  },
  {
    id: 7,
    tag: "Bark — Protection",
    text: "Have you had a specific conversation about protecting your assets from lawsuits, creditors, or estate taxes with a professional whose job is asset protection?",
    sub: "The harvest that gets taken because nobody built the fence.",
    type: "scored",
    options: [
      { label: "Yes — I have done this.", sub: "Asset protection strategy in place.", value: 2 },
      { label: "I have thought about it but not acted.", sub: "Awareness — no action yet.", value: 1 },
      { label: "No — I did not know this was something I needed.", sub: "Not yet explored.", value: 0 },
    ],
    maps: { sowpow: 4, part: "Bark" },
  },
  {
    id: 8,
    tag: "Seeds + Branches",
    text: "Do you have a written plan for what happens to your wealth after you are gone — who receives it, how it is protected, and what conditions govern it?",
    sub: "The shade after you are gone. The generation that stands on what you built.",
    type: "scored",
    options: [
      { label: "Yes — written, documented, and legally structured.", sub: "Legacy plan is complete.", value: 2 },
      { label: "I have thought about it but nothing is in writing.", sub: "Mental plan, not yet documented.", value: 1 },
      { label: "No — this has not been addressed yet.", sub: "Not started.", value: 0 },
    ],
    maps: { sowpow: 6, part: "Seeds" },
  },
  {
    id: 9,
    tag: "All Five Parts",
    text: "Do you have a financial system that runs without your daily attention — automated savings, automated investments, a documented plan that someone else could follow if you were not available?",
    sub: "The farm that runs without the farmer in the field every day.",
    type: "scored",
    options: [
      { label: "Yes — it runs without me.", sub: "Automated, documented, managed.", value: 2 },
      { label: "Parts of it are automated but not all.", sub: "Partially systematized.", value: 1 },
      { label: "No — everything depends on me personally.", sub: "Manual and dependent on you.", value: 0 },
    ],
    maps: { sowpow: 5, part: "All" },
  },
  {
    id: 10,
    tag: "Your Priority — Directional",
    text: "When you think about your financial life right now — which of these feels most urgent?",
    sub: "No right or wrong answer. This personalizes your results.",
    type: "directional",
    options: [
      { label: "I need to get stable.", sub: "Build a cushion. Stop the bleed. Get protected.", value: "A" },
      { label: "I need to grow what I have.", sub: "Make my money work harder. Build more streams.", value: "B" },
      { label: "I need to protect what I have built.", sub: "Taxes. Structure. Access. Make it tax-efficient.", value: "C" },
      { label: "I need to make it last beyond me.", sub: "Legacy. Teaching. The next generation.", value: "D" },
    ],
    maps: { sowpow: null, part: null },
  },
];

export const PARTS = {
  Light: { icon: "☀️", label: "Light", desc: "Income" },
  Trunk: { icon: "🌳", label: "Trunk", desc: "Investments" },
  Bark: { icon: "🛡️", label: "Bark", desc: "Protection" },
  Branches: { icon: "🌿", label: "Branches", desc: "Plan" },
  Seeds: { icon: "🌰", label: "Seeds", desc: "Teaching" },
};

export const PARTS_ORDER = ["Bark", "Branches", "Light", "Trunk", "Seeds"];

export const STAGES = [
  {
    num: 0, name: "Prepare the Ground", phase: "Stage 0 — The Preparation Phase", range: "Applies at every income level and every stage",
    episodeUrl: "https://youtube.com/@1smallseed", episode: "Episode 1 — The Ground The Money Grows In",
    description: "Before any seed goes into the ground — the ground itself has to be ready. The most important work right now is not financial. It is foundational. Three things need to be in place: the belief that you deserve to build, the confidence that you can figure it out, and the understanding that risk is not the enemy — unmanaged risk is.",
    oneSeed: "The next time you make a financial decision — ask yourself: Am I treating this money like it belongs to someone else? Or like a scoreboard I personally play on? That awareness is Stage 0. It runs underneath every stage that follows.",
    fivePartsStatuses: { Light: "building", Trunk: "building", Bark: "priority", Branches: "building", Seeds: "building" },
  },
  {
    num: 1, name: "Secure the Soil", phase: "Phase 1 — SOW — Build the Farm", range: "$0 – $10k",
    episodeUrl: "https://youtube.com/@1smallseed", episode: "Episode 2 — Why Your First £10,000 Is The Most Important Money You Will Ever Have",
    description: "This is where every strong financial life begins. The root system must be secure before anything else grows. A three to six month cushion. High-interest debt stopped. Basic protection in place. Not because you are behind — because this is the order of operations. No seed survives poisoned ground.",
    oneSeed: "Build your cushion before you build anything else. Three months of expenses, liquid and accessible. That one move changes everything that comes after it. That is your one seed.",
    fivePartsStatuses: { Light: "active", Trunk: "building", Bark: "priority", Branches: "building", Seeds: "building" },
  },
  {
    num: 2, name: "Own the Structure", phase: "Phase 1 — SOW — Build the Farm", range: "$10k – $50k",
    episodeUrl: "https://youtube.com/@1smallseed", episode: "Episode 5 — The Tax Secret Your Employer Never Told You",
    description: "The roots are in. Now it is time to build the structure. A written will. Named beneficiaries on every account. A business entity if you are earning independently. One dedicated conversation with a CPA about how your money is structured. The private owner does not just earn differently — they own differently.",
    oneSeed: "Schedule one meeting with a CPA this month — not a tax preparer, a strategist. Ask one question: how should my money be structured given where I want to go? That conversation is worth more than any savings rate. That is your one seed.",
    fivePartsStatuses: { Light: "active", Trunk: "building", Bark: "active", Branches: "priority", Seeds: "building" },
  },
  {
    num: 3, name: "Water the Roots", phase: "Phase 1 — SOW — Build the Farm", range: "$50k – $250k",
    episodeUrl: "https://youtube.com/@1smallseed", episode: "Episode 6 — The Rockefeller Family Bank: Stage 3 Water The Roots",
    description: "The structure is in place. Now it is time to build access. Not investments locked away for thirty years — money you can reach. A liquidity layer. Cash you can access without penalties. A family banking strategy that works like a chit fund but formalized for the American financial landscape. Access-rich, not just asset-rich.",
    oneSeed: "Map your liquidity. Write down how much of your current wealth you can access within thirty days without penalties or taxes. Then ask: is that enough? That question is your one seed.",
    fivePartsStatuses: { Light: "active", Trunk: "priority", Bark: "active", Branches: "active", Seeds: "building" },
  },
  {
    num: 4, name: "Protect the Harvest", phase: "Phase 2 — POW — Make It Unbreakable", range: "$100k – $500k",
    episodeUrl: "https://youtube.com/@1smallseed", episode: "Series 2 — 9 Systems: SOW POW Stages 4 Through 6 (Coming Soon)",
    description: "You have built something real. Now the question is not how to grow more — it is how to keep what you have built. Tax-deferred is not the same as tax-free. And the difference between those two words is the chapter Babylon never wrote. The harvest gets taken not because you did not build enough — because nobody built the fence.",
    oneSeed: "Pull out your retirement account statements. Write one word next to each account: deferred or free. If you cannot answer — that is the gap. That conversation with a tax professional is your one seed.",
    fivePartsStatuses: { Light: "active", Trunk: "priority", Bark: "active", Branches: "active", Seeds: "building" },
  },
  {
    num: 5, name: "Open the Gates", phase: "Phase 2 — POW — Make It Unbreakable", range: "$250k – $1M+",
    episodeUrl: "https://youtube.com/@1smallseed", episode: "Series 2 — 9 Systems: SOW POW Stages 4 Through 6 (Coming Soon)",
    description: "All five parts are developed. Right now the work is systems. The farm should run without the farmer in the field every day. Automated. Documented. Designed with a hundred-year time horizon. The question at Stage 5 is not how to build more — it is how to remove yourself as the bottleneck.",
    oneSeed: "Write down every financial process that depends entirely on you. Savings transfers. Investment contributions. Insurance reviews. Then pick one and automate it this week. That is your one seed.",
    fivePartsStatuses: { Light: "active", Trunk: "active", Bark: "active", Branches: "active", Seeds: "priority" },
  },
  {
    num: 6, name: "Write the Legacy", phase: "Phase 2 — POW — Make It Unbreakable", range: "$500k+",
    episodeUrl: "https://youtube.com/@1smallseed", episode: "Series 2 — 9 Systems: SOW POW Stages 4 Through 6 (Coming Soon)",
    description: "The shade is already there. Now the question is who sits in it after you are gone. The dynasty trust. The family constitution. The conversation that turns wealth from something you built into something that builds the next generation. This is Stage 6 — the entire point of building.",
    oneSeed: "Have one conversation with the next generation about what you are building and why. Not the numbers — the intention. What do you want this wealth to do when you are no longer the one managing it? That conversation is your one seed.",
    fivePartsStatuses: { Light: "active", Trunk: "active", Bark: "active", Branches: "active", Seeds: "priority" },
  },
];

export const DIRECTIONAL_PRIORITIES = {
  A: "Get stable — build a cushion, stop the bleed, and get protected.",
  B: "Grow what you have — make your money work harder and build more streams.",
  C: "Protect what you have built — improve taxes, structure, access, and tax efficiency.",
  D: "Make it last beyond you — focus on legacy, teaching, and the next generation.",
};

export function scoreToStage(rawScore) {
  if (rawScore <= 3) return 0;
  if (rawScore <= 6) return 1;
  if (rawScore <= 9) return 2;
  if (rawScore <= 12) return 3;
  if (rawScore <= 15) return 4;
  if (rawScore <= 17) return 5;
  return 6;
}

export function calculateQuizResult(answerIndexes = []) {
  const rawScore = QUESTIONS.reduce((score, question, index) => {
    if (question.type !== "scored") return score;
    const option = question.options[answerIndexes[index]];
    return score + (typeof option?.value === "number" ? option.value : 0);
  }, 0);

  const directionalQuestionIndex = QUESTIONS.findIndex((question) => question.type === "directional");
  const directionalAnswer = QUESTIONS[directionalQuestionIndex]?.options[answerIndexes[directionalQuestionIndex]]?.value ?? null;
  const numericStage = scoreToStage(rawScore);
  let finalStage = numericStage;
  if (directionalAnswer === "C" && finalStage < 4) finalStage = 4;
  if (directionalAnswer === "D" && finalStage < 5) finalStage = 5;

  const stage = STAGES[finalStage];
  return {
    rawScore,
    directionalAnswer,
    directionalPriority: DIRECTIONAL_PRIORITIES[directionalAnswer] ?? "",
    numericStage,
    finalStage,
    stageTag: `sowpow-stage-${finalStage}`,
    stageName: stage.name,
    phase: stage.phase,
    range: stage.range,
    description: stage.description,
    oneSeed: stage.oneSeed,
    fivePartsStatuses: { ...stage.fivePartsStatuses },
    episodeUrl: stage.episodeUrl,
    episode: stage.episode,
  };
}

export function getStageByNumber(stageNumber) {
  const normalized = Number(stageNumber);
  return STAGES[Number.isInteger(normalized) && normalized >= 0 && normalized <= 6 ? normalized : 0];
}
