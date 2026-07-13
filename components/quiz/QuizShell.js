"use client";

import { useEffect, useMemo, useState } from "react";
import { QUESTIONS } from "../../lib/quiz/questions.js";
import { calculateQuizResult } from "../../lib/quiz/scoring.js";
import SiteHeader from "../ui/SiteHeader.js";
import QuizConfirmation from "./QuizConfirmation.js";
import QuizEmailForm from "./QuizEmailForm.js";
import QuizIntro from "./QuizIntro.js";
import QuizPreview from "./QuizPreview.js";
import QuizQuestion from "./QuizQuestion.js";

export default function QuizShell() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const result = useMemo(() => calculateQuizResult(answers), [answers]);

  function startQuiz() {
    setCurrent(0);
    setAnswers([]);
    setScreen("question");
  }

  useEffect(() => {
    if (screen !== "confirmation") return undefined;
    const timer = window.setTimeout(startQuiz, 2000);
    return () => window.clearTimeout(timer);
  }, [screen]);

  function selectOption(index) {
    setAnswers((currentAnswers) => {
      const next = [...currentAnswers];
      next[current] = index;
      return next;
    });
  }

  function next() {
    if (answers[current] === undefined) return;
    if (current < QUESTIONS.length - 1) return setCurrent((value) => value + 1);
    setScreen("preview");
  }

  return (
    <>
      <div className="ambient-bg" aria-hidden="true"><span className="ambient-shape ambient-shape--1"></span><span className="ambient-shape ambient-shape--2"></span><span className="ambient-shape ambient-shape--3"></span></div>
      {screen === "intro" && <SiteHeader onStart={startQuiz} />}
      <main className={`container ${screen === "intro" ? "container--intro" : "container--quiz-active"}`}>
        {screen === "intro" && <QuizIntro onStart={startQuiz} />}
        {screen === "question" && <QuizQuestion question={QUESTIONS[current]} current={current} total={QUESTIONS.length} selected={answers[current]} onSelect={selectOption} onBack={() => setCurrent((value) => Math.max(0, value - 1))} onNext={next} />}
        {screen === "preview" && <QuizPreview result={result} onContinue={() => setScreen("email")} />}
        {screen === "email" && <QuizEmailForm result={result} answers={answers} onSuccess={() => setScreen("confirmation")} />}
        {screen === "confirmation" && <QuizConfirmation result={result} />}
      </main>
    </>
  );
}
