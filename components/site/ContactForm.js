"use client";

import { useState } from "react";
import MotionGroup from "./MotionGroup.js";
import styles from "./site.module.css";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setMessage("Message delivery is not connected yet. Please use the quiz or licensed-services path while the contact backend is pending approval.");
  }
  return <MotionGroup as="form" className={styles.contactForm} stagger onSubmit={submit}><div><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" required placeholder="Your full name" /></div><div><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" required placeholder="Your email address" /></div><div><label htmlFor="contact-reason">Reason for reaching out</label><select id="contact-reason" name="reason" required defaultValue=""><option value="" disabled>Select a reason</option><option>Book a conversation</option><option>Partnership or media</option><option>General support</option></select></div><div><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required rows="6" placeholder="How can we help?" /></div><button type="submit">Send Message</button>{message && <p className={styles.pendingNotice} role="status">{message}</p>}</MotionGroup>;
}
