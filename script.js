import {
  QUESTIONS,
  calculateQuizResult,
} from "./quizData.js";
import { prepareEmailPayload } from "./emailDelivery.js";
import { getStageIcon } from "./stageIcons.js";

let currentQuestionIndex = 0;
let selectedAnswers = [];
let canonicalResult = null;

function showView(view) {
  document.getElementById("s-intro").style.display = view === "intro" ? "block" : "none";
  document.getElementById("s-question").style.display = view === "question" ? "block" : "none";
  document.getElementById("s-results").style.display = view === "results" ? "block" : "none";
}

function startQuiz() {
  currentQuestionIndex = 0;
  selectedAnswers = [];
  canonicalResult = null;
  showView("question");
  displayQuestion();
}

function displayQuestion() {
  const question = QUESTIONS[currentQuestionIndex];
  if (!question) return;

  document.getElementById("progress-fill").style.width = `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%`;
  document.getElementById("q-number").textContent = `Question ${currentQuestionIndex + 1} of ${QUESTIONS.length}`;
  document.getElementById("q-tag").textContent = question.tag;
  document.getElementById("q-text").textContent = question.text;
  document.getElementById("q-subtext").textContent = question.sub;

  const options = document.getElementById("opts");
  options.innerHTML = "";
  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `opt${selectedAnswers[currentQuestionIndex] === optionIndex ? " selected" : ""}`;

    const copy = document.createElement("span");
    copy.className = "opt-copy";
    const label = document.createElement("span");
    label.className = "opt-label";
    label.textContent = option.label;
    const subtext = document.createElement("span");
    subtext.className = "opt-subtext";
    subtext.textContent = option.sub;
    copy.append(label, subtext);
    button.append(copy);
    button.addEventListener("click", () => selectOption(optionIndex));
    options.appendChild(button);
  });

  const nextButton = document.getElementById("btn-next");
  nextButton.textContent = currentQuestionIndex === QUESTIONS.length - 1 ? "See My Results →" : "Next →";
  nextButton.style.display = selectedAnswers[currentQuestionIndex] === undefined ? "none" : "block";
}

function selectOption(optionIndex) {
  selectedAnswers[currentQuestionIndex] = optionIndex;
  document.querySelectorAll(".opt").forEach((option, index) => {
    option.classList.toggle("selected", index === optionIndex);
  });
  document.getElementById("btn-next").style.display = "block";
}

function nextQ() {
  if (selectedAnswers[currentQuestionIndex] === undefined) return;
  if (currentQuestionIndex < QUESTIONS.length - 1) {
    currentQuestionIndex += 1;
    displayQuestion();
    return;
  }

  canonicalResult = calculateQuizResult(selectedAnswers);
  showPreview();
}

function showPreview() {
  showView("results");
  const result = canonicalResult;
  document.getElementById("res-card").innerHTML = `
    <div class="results-emoji">${getStageIcon(result.finalStage)}</div>
    <h2 class="results-title">Your direction is clear</h2>
    <p class="results-subtitle">You are currently positioned around Stage ${result.finalStage}: ${escapeHtml(result.stageName)}.</p>
    <div class="results-description">
      ${escapeHtml(previewInsight(result))}
      <br><br><strong>Current priority:</strong> ${escapeHtml(result.directionalPriority)}
    </div>
    <button type="button" class="btn-download" id="preview-continue">Get My Personalized SOW POW Roadmap</button>
    <p class="follow-text">Your complete personalized breakdown will be sent after email submission.</p>
  `;
  document.getElementById("preview-continue").addEventListener("click", showEmailCapture);
}

function previewInsight(result) {
  if (result.finalStage === 0) return "Your strongest next move is foundational: prepare the ground beneath every financial decision before adding more complexity.";
  if (result.finalStage <= 2) return "Your strongest next move is to secure and structure the foundations so everything you build has somewhere stable to grow.";
  if (result.finalStage <= 4) return "Your strongest next move is to improve access and protection around what you have already built.";
  return "Your strongest next move is to turn what you have built into a durable system that can work beyond your daily attention.";
}

function showEmailCapture() {
  document.getElementById("res-card").innerHTML = `
    <div class="results-emoji">${getStageIcon(canonicalResult.finalStage)}</div>
    <h2 class="results-title">One step away</h2>
    <p class="results-subtitle">Where should we send your complete personalized breakdown?</p>
    <div class="email-box">
      <label class="email-label" for="lead-first-name">Get Your Personalized Report</label>
      <input type="text" id="lead-first-name" class="email-input" placeholder="First Name" required autocomplete="given-name" />
      <input type="email" id="lead-email" class="email-input" placeholder="your@email.com" required autocomplete="email" />
      <button class="btn-download" id="submit-lead">Get My Personalized SOW POW Roadmap</button>
    </div>
  `;
  document.getElementById("submit-lead").addEventListener("click", submitLead);
}

async function sendRoadmapEmail(emailPayload) {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailPayload),
  });
  const responseText = await response.text();
  let responseBody = {};
  if (responseText) {
    try { responseBody = JSON.parse(responseText); } catch (_) { /* handled below */ }
  }
  if (!response.ok) throw new Error(responseBody.error || "Failed to send your roadmap email");
  if (responseBody.success !== true) throw new Error(responseBody.error || "Email provider did not confirm delivery");
  return responseBody;
}

async function submitLead() {
  const firstName = document.getElementById("lead-first-name")?.value.trim() ?? "";
  const email = document.getElementById("lead-email")?.value.trim() ?? "";

  if (firstName.length < 2) return showError("Please enter a valid first name");
  if (!email || !email.includes("@")) return showError("Please enter a valid email address");
  if (!canonicalResult) return showError("Unable to prepare your roadmap. Please try again.");
  if (typeof supabaseClient === "undefined") return showError("Supabase connection error. Please refresh and try again.");

  const submitButton = document.getElementById("submit-lead");
  submitButton.disabled = true;
  const originalLabel = submitButton.textContent;
  submitButton.textContent = "Preparing Your Roadmap…";

  try {
    const { error } = await supabaseClient.from("quiz_leads").insert([
      {
        first_name: firstName,
        email,
        stage: canonicalResult.stageTag,
      },
    ]);
    if (error) throw new Error(error.message || "Error saving your information");

    const emailPayload = prepareEmailPayload(canonicalResult, { firstName, email });
    window.lastEmailPayload = emailPayload;
    await sendRoadmapEmail(emailPayload);
    showSuccess("Thank you! Your personalized SOW POW roadmap is on its way. Check your inbox.");
    setTimeout(() => startQuiz(), 2000);
  } catch (error) {
    console.error("Submission error:", error);
    showError(error.message || "An unexpected error occurred. Please try again.");
    submitButton.disabled = false;
    submitButton.textContent = originalLabel;
  }
}

function showError(message) {
  document.querySelectorAll(".error-text").forEach((element) => element.remove());
  const error = document.createElement("div");
  error.className = "error-text";
  error.textContent = message;
  const emailInput = document.getElementById("lead-email");
  (emailInput?.parentNode ?? document.getElementById("res-card")).appendChild(error);
  setTimeout(() => error.remove(), 5000);
}

function showSuccess(message) {
  document.querySelectorAll(".success-text").forEach((element) => element.remove());
  const success = document.createElement("div");
  success.className = "success-text";
  success.textContent = message;
  const emailInput = document.getElementById("lead-email");
  (emailInput?.parentNode ?? document.getElementById("res-card")).appendChild(success);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

window.startQuiz = startQuiz;
window.nextQ = nextQ;

window.addEventListener("error", (event) => console.error("Global error caught:", event.error));
window.addEventListener("unhandledrejection", (event) => console.error("Unhandled promise rejection:", event.reason));
