"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../../lib/analytics.js";
import MotionGroup from "./MotionGroup.js";
import styles from "./site.module.css";

const REASONS = [
  ["assessment-result", "Talk through my assessment result"],
  ["family-protection", "Protecting my family"],
  ["retirement-income", "Retirement and future income"],
  ["business-continuity", "Business continuity or succession"],
  ["legacy-planning", "Legacy planning"],
  ["general-education", "General educational question"],
];

const SAFE_QUERY_REASONS = new Map([
  ...REASONS.map(([value]) => [value, value]),
  ["assessment", "assessment-result"],
  ["protection", "family-protection"],
  ["retirement", "retirement-income"],
  ["business", "business-continuity"],
  ["legacy", "legacy-planning"],
  ["general", "general-education"],
  ["topic", "general-education"],
]);

export default function ContactForm() {
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("initial");
  const [notice, setNotice] = useState("");
  const started = useRef(false);
  const submitting = useRef(false);
  const noticeRef = useRef(null);

  useEffect(() => {
    const queryReason = new URLSearchParams(window.location.search).get("reason");
    if (queryReason && SAFE_QUERY_REASONS.has(queryReason)) setReason(SAFE_QUERY_REASONS.get(queryReason));
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") noticeRef.current?.focus();
  }, [status]);

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    setStatus("validating");
    if (!form.checkValidity()) {
      trackEvent("contact_validation_error", { page: "contact", topic_slug: reason || "unselected", status: "failure" });
      setNotice("Please complete the required fields and check that each entry is within the stated limits.");
      setStatus("error");
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    submitting.current = true;
    setStatus("sending");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error("contact_request_failed");

      trackEvent("contact_submission_success", { page: "contact", topic_slug: reason, status: "success" });
      form.reset();
      setReason("");
      setNotice("Thank you for sharing what is on your mind. One Small Seed has received your request at its official contact inbox.");
      setStatus("success");
    } catch {
      trackEvent("contact_submission_error", { page: "contact", topic_slug: reason, status: "failure" });
      setNotice("We could not send your request right now. Please check your connection and try again.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  function startRequest() {
    if (started.current) return;
    started.current = true;
    trackEvent("contact_request_started", { page: "contact", section: "request_form" });
  }

  if (status === "success") return <MotionGroup as="section" className={`${styles.contactForm} ${styles.contactPreparationForm} ${styles.contactSuccess}`} variant="fadeUp" aria-labelledby="contact-success-heading">
    <div ref={noticeRef} role="status" tabIndex="-1">
      <p className={styles.eyebrow}>Request Received</p>
      <h2 id="contact-success-heading">Your request has been sent.</h2>
      <p>{notice}</p>
      <p className={styles.contactPrivacy}>A request begins a conversation. It does not create a commitment or guarantee a service recommendation.</p>
    </div>
  </MotionGroup>;

  const busy = status === "validating" || status === "sending";

  return <MotionGroup as="form" className={`${styles.contactForm} ${styles.contactPreparationForm}`} stagger onSubmit={submit} onFocus={startRequest} noValidate aria-describedby="contact-delivery-note contact-privacy-note contact-commitment-note" aria-busy={busy}>
    <div className={styles.contactFormHeading}>
      <p className={styles.eyebrow}>Request Context</p>
      <h2>Request a Conversation</h2>
      <p id="contact-delivery-note" className={styles.contactDeliveryNote}><strong>Share general context.</strong> Your request will be sent to the official One Small Seed contact inbox.</p>
    </div>
    {notice && <div ref={noticeRef} className={styles.contactError} role="alert" tabIndex="-1">{notice}</div>}
    <div><label htmlFor="contact-name">Full name <span>(required, 2–100 characters)</span></label><input id="contact-name" name="name" autoComplete="name" required minLength="2" maxLength="100" placeholder="Your full name" /></div>
    <div><label htmlFor="contact-email">Email address <span>(required)</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength="254" placeholder="name@example.com" /></div>
    <div><label htmlFor="contact-reason">Reason for conversation <span>(required)</span></label><select id="contact-reason" name="reason" required value={reason} onChange={(event) => { setReason(event.target.value); trackEvent("contact_reason_selected", { page: "contact", topic_slug: event.target.value }); }}><option value="" disabled>Select a reason</option>{REASONS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div>
    <div><label htmlFor="contact-message">Message or context <span>(required, 10–2,000 characters)</span></label><textarea id="contact-message" name="message" required minLength="10" maxLength="2000" rows="6" placeholder="Share the general question or context you would like to discuss." /></div>
    <div className={styles.contactHoneypot} aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" type="text" tabIndex="-1" autoComplete="off" /></div>
    <p id="contact-privacy-note" className={styles.contactPrivacy}>Use this form only for general context. Do not include sensitive financial, account, tax, medical or identification information.</p>
    <p id="contact-commitment-note" className={styles.contactPrivacy}>A request begins a conversation. It does not create a commitment or guarantee a service recommendation.</p>
    <button type="submit" disabled={busy}>{status === "sending" ? "Sending Request…" : status === "validating" ? "Checking Request…" : "Request a Conversation"}</button>
  </MotionGroup>;
}
