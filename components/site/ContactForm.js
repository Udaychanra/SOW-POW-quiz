"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../../lib/analytics.js";
import MotionGroup from "./MotionGroup.js";
import styles from "./site.module.css";

const REASONS = [
  ["assessment", "Talk through my assessment result"],
  ["protection", "Protecting my family"],
  ["retirement", "Retirement and future income"],
  ["business", "Business continuity or succession"],
  ["legacy", "Legacy planning"],
  ["general", "General educational question"],
];

const SAFE_QUERY_REASONS = new Map([
  ...REASONS.map(([value]) => [value, value]),
  ["topic", "general"],
]);

export default function ContactForm() {
  const [reason, setReason] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeTone, setNoticeTone] = useState("");
  const started = useRef(false);

  useEffect(() => {
    const queryReason = new URLSearchParams(window.location.search).get("reason");
    if (queryReason && SAFE_QUERY_REASONS.has(queryReason)) setReason(SAFE_QUERY_REASONS.get(queryReason));
  }, []);

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      trackEvent("contact_validation_error", { page: "contact", status: "failure" });
      setNotice("Please complete the required fields and check that the email address is valid.");
      setNoticeTone("error");
      form.reportValidity();
      return;
    }

    setNotice("Your request has been reviewed on this page, but it has not been sent or saved. Online delivery is pending approval.");
    setNoticeTone("info");
  }

  function startRequest() {
    if (started.current) return;
    started.current = true;
    trackEvent("contact_request_started", { page: "contact", section: "request_form" });
  }

  return <MotionGroup as="form" className={`${styles.contactForm} ${styles.contactPreparationForm}`} stagger onSubmit={submit} onFocus={startRequest} noValidate aria-describedby="contact-delivery-note contact-privacy-note">
    <div className={styles.contactFormHeading}>
      <p className={styles.eyebrow}>Request Context</p>
      <h2>Prepare My Request</h2>
      <p id="contact-delivery-note" className={styles.contactDeliveryNote}><strong>Online delivery is not connected.</strong> This form prepares context on this page only and does not send or save it.</p>
    </div>
    {notice && <div className={noticeTone === "error" ? styles.contactError : styles.contactInfo} role={noticeTone === "error" ? "alert" : "status"} tabIndex="-1">{notice}</div>}
    <div><label htmlFor="contact-name">Full name <span>(required)</span></label><input id="contact-name" name="name" autoComplete="name" required placeholder="Your full name" /></div>
    <div><label htmlFor="contact-email">Email address <span>(required)</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="name@example.com" /></div>
    <div><label htmlFor="contact-reason">Reason for conversation <span>(required)</span></label><select id="contact-reason" name="reason" required value={reason} onChange={(event) => { setReason(event.target.value); trackEvent("contact_reason_selected", { page: "contact", topic_slug: event.target.value }); }}><option value="" disabled>Select a reason</option>{REASONS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div>
    <div><label htmlFor="contact-message">Message or context <span>(required)</span></label><textarea id="contact-message" name="message" required rows="6" placeholder="Share the general question or context you would like to discuss." /></div>
    <p id="contact-privacy-note" className={styles.contactPrivacy}>Use this form only for general context. Do not include sensitive financial, account, tax, medical or identification information.</p>
    <button type="submit">Prepare My Request</button>
  </MotionGroup>;
}
