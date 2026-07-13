"use client";

import { useState } from "react";
import styles from "./site.module.css";

export default function NewsletterForm() {
  const [message, setMessage] = useState("");
  function submit(event) { event.preventDefault(); setMessage("Newsletter signup will be available when the approved newsletter integration is connected."); }
  return <form className={styles.newsletterForm} onSubmit={submit}><label htmlFor="newsletter-email">Email address</label><div><input id="newsletter-email" type="email" required placeholder="Your email address"/><button type="submit">Subscribe</button></div>{message && <p role="status">{message}</p>}</form>;
}
