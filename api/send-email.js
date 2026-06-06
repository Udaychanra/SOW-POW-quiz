import { Resend } from "resend";
import { buildEmailHtml } from "../lib/buildEmailHtml.js";
import { loadLocalEnv } from "../lib/loadLocalEnv.js";
import { validateEmailPayload } from "../lib/validateEmailPayload.js";

loadLocalEnv();

/** Resend blocks non-owner recipients until a domain is verified (403). */
function isResendDomainVerificationBlock(error) {
  if (!error) return false;
  const statusCode = error.statusCode ?? error.status;
  const message = String(error.message ?? "");
  return statusCode === 403 && message.toLowerCase().includes("verify a domain");
}

function respondDevDomainFallback(response, resendError) {
  console.error(
    "Resend domain verification block (dev fallback):",
    JSON.stringify(resendError, null, 2)
  );
  return response.status(200).json({
    success: false,
    devMode: true,
    message: "Domain not verified in Resend yet",
  });
}

/**
 * POST /api/send-email
 * Sends a personalized SOW POW stage result email via Resend.
 */
export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("EMAIL_FROM exists:", !!process.env.EMAIL_FROM);
  console.log("Using EMAIL_FROM:", process.env.EMAIL_FROM);

  if (!apiKey || !from) {
    console.error("Missing RESEND_API_KEY or EMAIL_FROM");
    return response.status(500).json({ error: "Email service not configured" });
  }

  const validation = validateEmailPayload(request.body);
  if (!validation.ok) {
    return response.status(400).json({ error: validation.error });
  }

  const { payload } = validation;

  try {
    const resend = new Resend(apiKey);
    const html = buildEmailHtml(payload);

    const { data, error } = await resend.emails.send({
      from,
      to: payload.to,
      subject: payload.subject,
      html,
    });

    if (error) {
      if (isResendDomainVerificationBlock(error)) {
        return respondDevDomainFallback(response, error);
      }
      console.error("Resend API error:", error);
      return response.status(502).json({ error: "Failed to send email" });
    }

    return response.status(200).json({
      success: true,
      id: data?.id ?? null,
    });
  } catch (err) {
    if (isResendDomainVerificationBlock(err)) {
      return respondDevDomainFallback(response, err);
    }
    console.error("send-email handler error:", err);
    return response.status(500).json({ error: "Internal server error" });
  }
}
