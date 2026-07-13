import { NextResponse } from "next/server";
import { prepareEmailPayload } from "../../../lib/email/emailDelivery.js";
import { sendRoadmapEmail } from "../../../lib/email/sendRoadmapEmail.js";
import { calculateQuizResult } from "../../../lib/quiz/scoring.js";
import { QUESTIONS } from "../../../lib/quiz/questions.js";
import { createQuizSupabaseClient } from "../../../lib/supabase.js";
import { validateEmailPayload } from "../../../lib/validateEmailPayload.js";

export const runtime = "nodejs";

function safeError(code, status) {
  return NextResponse.json({ success: false, error: code }, { status });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return safeError("invalid_json", 400);
  }

  const firstName = typeof body?.firstName === "string" ? body.firstName.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const answers = Array.isArray(body?.answers) ? body.answers : null;
  if (firstName.length < 2) return safeError("invalid_first_name", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return safeError("invalid_email", 400);
  if (!answers || answers.length !== QUESTIONS.length || answers.some((answer, index) => !Number.isInteger(answer) || answer < 0 || answer >= QUESTIONS[index].options.length)) return safeError("invalid_answers", 400);

  const result = calculateQuizResult(answers);
  const payload = prepareEmailPayload(result, { firstName, email });
  const payloadValidation = validateEmailPayload(payload);
  if (!payloadValidation.ok) return safeError("invalid_result", 400);

  try {
    const supabase = createQuizSupabaseClient();
    const { error } = await supabase.from("quiz_leads").insert([{ first_name: firstName, email, stage: result.stageTag }]);
    if (error) {
      console.error("Quiz lead insert failed:", error.code || "database_error");
      return safeError("lead_save_failed", 502);
    }

    const delivery = await sendRoadmapEmail(payloadValidation.payload);
    if (!delivery.ok) return safeError(delivery.code, 502);

    return NextResponse.json({ success: true, stage: result.finalStage });
  } catch (error) {
    console.error("Quiz submission failed:", error?.name || "submission_exception");
    return safeError("submission_failed", 500);
  }
}
