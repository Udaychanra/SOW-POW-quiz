import "server-only";
import { Resend } from "resend";
import { buildEmailHtml } from "./buildEmailHtml.js";
import { buildEmailText } from "./buildEmailText.js";

export async function sendRoadmapEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return { ok: false, code: "email_not_configured" };

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: payload.to,
      subject: payload.subject,
      html: buildEmailHtml(payload),
      text: buildEmailText(payload),
    });
    if (error) {
      console.error("Resend rejected roadmap email:", error.name || error.statusCode || "provider_error");
      return { ok: false, code: "email_rejected" };
    }
    return { ok: true, id: data?.id ?? null };
  } catch (error) {
    console.error("Roadmap email delivery failed:", error?.name || "provider_exception");
    return { ok: false, code: "email_failed" };
  }
}
