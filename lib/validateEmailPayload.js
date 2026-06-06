/**
 * Validates the client-prepared email payload before sending via Resend.
 * @param {unknown} payload
 * @returns {{ ok: true, payload: object } | { ok: false, error: string }}
 */
export function validateEmailPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const to = payload.to;
  const subject = payload.subject;
  const recipient = payload.recipient;
  const content = payload.content;
  const stage = payload.stage;

  if (typeof to !== "string" || !isValidEmail(to)) {
    return { ok: false, error: "Invalid recipient email" };
  }

  if (typeof subject !== "string" || !subject.trim()) {
    return { ok: false, error: "Missing email subject" };
  }

  if (!recipient || typeof recipient.firstName !== "string" || !recipient.firstName.trim()) {
    return { ok: false, error: "Invalid recipient name" };
  }

  if (!content || typeof content.headline !== "string" || typeof content.description !== "string") {
    return { ok: false, error: "Invalid email content" };
  }

  if (!stage || typeof stage.num !== "number") {
    return { ok: false, error: "Invalid stage data" };
  }

  return { ok: true, payload };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
