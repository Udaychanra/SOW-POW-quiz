import test from "node:test";
import assert from "node:assert/strict";
import {
  buildContactEmail,
  createContactHandler,
  escapeHtml,
  getContactConfiguration,
  validateContactPayload,
} from "./app/api/contact/route.js";

const validPayload = {
  name: "Contact Test",
  email: "visitor@example.com",
  reason: "family-protection",
  message: "This is a controlled contact request test.",
  website: "",
};

function requestWith(body, headers = { "content-type": "application/json" }) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("contact route accepts a valid request only after delivery confirmation", async () => {
  let deliveredEmail;
  const POST = createContactHandler({ deliver: async (email) => { deliveredEmail = email; return { ok: true, id: "test-id" }; } });
  const response = await POST(requestWith(validPayload));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(deliveredEmail.replyTo, validPayload.email);
  assert.match(deliveredEmail.subject, /Family Protection/);
  assert.match(deliveredEmail.text, /One Small Seed Contact Page/);
});

test("contact route returns an honest error when delivery fails", async () => {
  const POST = createContactHandler({ deliver: async () => ({ ok: false, status: 502 }) });
  const response = await POST(requestWith(validPayload));
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { success: false, error: "send_unavailable" });
});

test("contact route accepts JSON only", async () => {
  const POST = createContactHandler({ deliver: async () => ({ ok: true, id: "unused" }) });
  const response = await POST(requestWith("name=Contact", { "content-type": "text/plain" }));
  assert.equal(response.status, 415);
});

test("contact route rejects malformed JSON and oversized bodies", async () => {
  const POST = createContactHandler({ deliver: async () => ({ ok: true, id: "unused" }) });
  assert.equal((await POST(requestWith("{"))).status, 400);
  const oversized = requestWith(validPayload, { "content-type": "application/json", "content-length": "20000" });
  assert.equal((await POST(oversized)).status, 413);
});

test("contact validation enforces all required fields and limits", () => {
  assert.equal(validateContactPayload({ ...validPayload, name: "" }).code, "invalid_name");
  assert.equal(validateContactPayload({ ...validPayload, name: "x".repeat(101) }).code, "invalid_name");
  assert.equal(validateContactPayload({ ...validPayload, email: "invalid" }).code, "invalid_email");
  assert.equal(validateContactPayload({ ...validPayload, reason: "" }).code, "invalid_reason");
  assert.equal(validateContactPayload({ ...validPayload, reason: "other" }).code, "invalid_reason");
  assert.equal(validateContactPayload({ ...validPayload, message: "short" }).code, "invalid_message");
  assert.equal(validateContactPayload({ ...validPayload, message: "x".repeat(2001) }).code, "invalid_message");
  assert.equal(validateContactPayload({ ...validPayload, website: "https://spam.example" }).code, "invalid_submission");
  assert.equal(validateContactPayload(validPayload).ok, true);
});

test("contact HTML escapes every visitor-controlled field", () => {
  const email = buildContactEmail({ ...validPayload, name: "<script>alert('x')</script>", message: "Hello & <b>goodbye</b>" }, "2026-07-22T00:00:00.000Z");
  assert.doesNotMatch(email.html, /<script>|<b>/);
  assert.match(email.html, /&lt;script&gt;/);
  assert.match(email.html, /Hello &amp; &lt;b&gt;goodbye&lt;\/b&gt;/);
  assert.equal(escapeHtml('"<&>\''), "&quot;&lt;&amp;&gt;&#39;");
});

test("contact configuration is isolated from quiz Resend variables", () => {
  const configuration = getContactConfiguration({
    CONTACT_RESEND_API_KEY: "contact-key",
    CONTACT_TO_EMAIL: "onesmallseedofficial@gmail.com",
    CONTACT_FROM_EMAIL: "One Small Seed Website <contact@arkandave.com>",
    RESEND_API_KEY: "quiz-key",
  });
  assert.equal(configuration.ok, true);
  assert.equal(configuration.apiKey, "contact-key");
  assert.equal(getContactConfiguration({ RESEND_API_KEY: "quiz-key" }).ok, false);
});
