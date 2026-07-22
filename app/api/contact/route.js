import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const SOURCE_LABEL = "One Small Seed Contact Page";
const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

export const CONTACT_REASON_LABELS = Object.freeze({
  "assessment-result": "Assessment Result",
  "family-protection": "Family Protection",
  "retirement-income": "Retirement Income",
  "business-continuity": "Business Continuity",
  "legacy-planning": "Legacy Planning",
  "general-education": "General Education",
});

function json(body, status = 200) {
  return Response.json(body, { status });
}

function safeError(status, code) {
  return json({ success: false, error: code }, status);
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function validateContactPayload(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false, code: "invalid_submission" };

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const reason = typeof body.reason === "string" ? body.reason.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : null;

  if (website === null || website.length > 0) return { ok: false, code: "invalid_submission" };
  if (name.length < 2 || name.length > 100) return { ok: false, code: "invalid_name" };
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return { ok: false, code: "invalid_email" };
  if (!Object.hasOwn(CONTACT_REASON_LABELS, reason)) return { ok: false, code: "invalid_reason" };
  if (message.length < 10 || message.length > 2000) return { ok: false, code: "invalid_message" };

  return { ok: true, value: { name, email, reason, message } };
}

export function buildContactEmail(contact, submittedAt = new Date().toISOString()) {
  const reasonLabel = CONTACT_REASON_LABELS[contact.reason];
  const safeName = escapeHtml(contact.name);
  const safeEmail = escapeHtml(contact.email);
  const safeReason = escapeHtml(reasonLabel);
  const safeMessage = escapeHtml(contact.message).replace(/\r?\n/g, "<br />");
  const safeSubmittedAt = escapeHtml(submittedAt);

  return {
    from: process.env.CONTACT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: contact.email,
    subject: `[One Small Seed] New conversation request — ${reasonLabel}`,
    text: `New One Small Seed conversation request

Name:
${contact.name}

Email:
${contact.email}

Reason:
${reasonLabel}

Message:
${contact.message}

Submitted:
${submittedAt}

Source:
${SOURCE_LABEL}

Reply directly to this email to contact the visitor.`,
    html: `<div style="font-family:Arial,sans-serif;color:#273b31;line-height:1.6"><h1 style="color:#174f3b">New One Small Seed conversation request</h1><p><strong>Name:</strong><br />${safeName}</p><p><strong>Email:</strong><br />${safeEmail}</p><p><strong>Reason:</strong><br />${safeReason}</p><p><strong>Message:</strong><br />${safeMessage}</p><p><strong>Submitted:</strong><br />${safeSubmittedAt}</p><p><strong>Source:</strong><br />${SOURCE_LABEL}</p><p>Reply directly to this email to contact the visitor.</p></div>`,
  };
}

export function getContactConfiguration(environment = process.env) {
  const missing = ["CONTACT_RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"].filter((name) => !environment[name]?.trim());
  return missing.length
    ? { ok: false, missing }
    : { ok: true, apiKey: environment.CONTACT_RESEND_API_KEY, to: environment.CONTACT_TO_EMAIL, from: environment.CONTACT_FROM_EMAIL };
}

export async function sendContactEmail(email) {
  const configuration = getContactConfiguration();
  if (!configuration.ok) {
    console.error("[contact] missing configuration:", configuration.missing.join(","));
    return { ok: false, status: 503, code: "contact_not_configured" };
  }

  try {
    const resend = new Resend(process.env.CONTACT_RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      ...email,
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
    });

    if (error) {
      console.error("[contact] Resend rejected request:", error.name || error.statusCode || "provider_error");
      return { ok: false, status: 502, code: "contact_rejected" };
    }
    if (!data?.id) {
      console.error("[contact] Resend response missing delivery identifier");
      return { ok: false, status: 502, code: "contact_unconfirmed" };
    }
    return { ok: true, id: data.id };
  } catch (error) {
    console.error("[contact] delivery exception:", error?.name || "provider_exception");
    return { ok: false, status: 502, code: "contact_failed" };
  }
}

export function createContactHandler({ deliver = sendContactEmail } = {}) {
  return async function contactPost(request) {
    const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
    if (contentType !== "application/json") return safeError(415, "unsupported_media_type");

    const declaredLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) return safeError(413, "request_too_large");

    let rawBody;
    try {
      rawBody = await request.text();
    } catch {
      return safeError(400, "invalid_request");
    }
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) return safeError(413, "request_too_large");

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return safeError(400, "invalid_json");
    }

    const validation = validateContactPayload(body);
    if (!validation.ok) return safeError(400, validation.code);

    const email = buildContactEmail(validation.value);
    const delivery = await deliver(email);
    if (!delivery?.ok) return safeError(delivery?.status || 502, "send_unavailable");

    return json({ success: true });
  };
}

export const POST = createContactHandler();
