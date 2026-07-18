# Privacy technical review — client and legal approval required

This is a factual repository review, not a published Privacy Notice and not legal advice.

## Current data behavior

- The quiz collects a first name, email address and ten answer indexes after the visitor chooses to request the roadmap email.
- The server recalculates the quiz result. It writes first name, email and the canonical stage tag to the existing Supabase `quiz_leads` table, then sends the roadmap through the existing Resend email flow.
- The Contact page has no backend. Text entered there remains in the browser page and is not sent or saved by this project.
- The public Resources and homepage video areas request server-side YouTube metadata and link visitors to YouTube. The YouTube API key remains server-only.
- The site loads its configured Google Fonts stylesheet from Google.
- The analytics wrapper is disabled because no approved provider or measurement ID exists. It makes no analytics network request and stores no event data in its current state.
- No cookie-setting code or consent manager was found in the repository. This review does not make a broader claim about hosting-platform or linked third-party behavior.
- No marketing-signup flow is active, and no separate marketing-consent control is presented.
- No `/privacy` route or approved Privacy Notice exists. The footer therefore does not show a Privacy link.

## Decisions requiring client and legal review

- Approve a Privacy Notice that accurately covers Supabase, Resend, YouTube, Google Fonts, hosting, retention, access/deletion requests and applicable jurisdictional rights.
- Define and approve quiz-lead retention and deletion practices.
- Decide whether the roadmap request also permits marketing follow-up; if so, add separate, explicit consent and supporting records before using it for marketing.
- Choose an analytics provider, lawful basis and consent behavior before analytics activation.
- Approve a verified public contact method or contact-delivery backend and its retention/security requirements.
- Confirm whether externally hosted fonts remain acceptable or should be self-hosted.
