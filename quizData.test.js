import test from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS, calculateQuizResult, scoreToStage } from "./quizData.js";
import { STAGE_ICONS, getStageIcon } from "./stageIcons.js";
import { prepareEmailPayload } from "./emailDelivery.js";

test("all score boundaries map to the required numeric stage", () => {
  const cases = [[0,0],[3,0],[4,1],[6,1],[7,2],[9,2],[10,3],[12,3],[13,4],[15,4],[16,5],[17,5],[18,6]];
  cases.forEach(([score, stage]) => assert.equal(scoreToStage(score), stage));
});

function answersForScore(score, direction) {
  const answers = Array(QUESTIONS.length).fill(2);
  let remaining = score;
  for (let index = 0; index < 9; index += 1) {
    const value = Math.min(2, remaining);
    answers[index] = value === 2 ? 0 : value === 1 ? 1 : 2;
    remaining -= value;
  }
  answers[9] = { A: 0, B: 1, C: 2, D: 3 }[direction];
  return answers;
}

test("directions A and B never alter the numeric stage", () => {
  for (const direction of ["A", "B"]) {
    for (const score of [0, 4, 7, 10, 13, 16, 18]) {
      const result = calculateQuizResult(answersForScore(score, direction));
      assert.equal(result.finalStage, result.numericStage);
    }
  }
});

test("direction C raises stages below 4 and never lowers a later stage", () => {
  for (const [score, expected] of [[0,4],[4,4],[7,4],[10,4],[13,4],[16,5],[18,6]]) {
    assert.equal(calculateQuizResult(answersForScore(score, "C")).finalStage, expected);
  }
});

test("direction D raises stages below 5 and never lowers stage 6", () => {
  for (const [score, expected] of [[0,5],[4,5],[7,5],[10,5],[13,5],[16,5],[18,6]]) {
    assert.equal(calculateQuizResult(answersForScore(score, "D")).finalStage, expected);
  }
});

test("question 10 is directional and never adds numeric points", () => {
  const results = ["A", "B", "C", "D"].map((direction) => calculateQuizResult(answersForScore(9, direction)));
  results.forEach((result) => assert.equal(result.rawScore, 9));
});

test("all seven stages have distinct accessible local SVG artwork", () => {
  const icons = Array.from({ length: 7 }, (_, stage) => getStageIcon(stage));
  assert.equal(new Set(icons).size, 7);
  icons.forEach((icon, stage) => {
    assert.equal(icon, STAGE_ICONS[stage]);
    assert.match(icon, /<svg/);
    assert.match(icon, /role="img"/);
    assert.match(icon, new RegExp(`stage-icon-${stage}-title`));
  });
});

test("quiz option labels and supporting text contain no emoji artwork", () => {
  const renderedCopy = QUESTIONS.flatMap((question) => question.options.flatMap((option) => [option.label, option.sub])).join(" ");
  assert.doesNotMatch(renderedCopy, /✅|🌱|○|🛡️|🌳|🔒|🌰/u);
});

test("stored stage tag and email stage come from the same canonical result", () => {
  for (const [score, direction] of [[0,"A"],[4,"B"],[7,"C"],[10,"D"],[13,"A"],[16,"B"],[18,"D"]]) {
    const result = calculateQuizResult(answersForScore(score, direction));
    const payload = prepareEmailPayload(result, { firstName: "Test", email: "test@example.com" });
    assert.equal(result.stageTag, `sowpow-stage-${payload.stage.num}`);
    assert.equal(result.finalStage, payload.meta.finalStage);
  }
});
