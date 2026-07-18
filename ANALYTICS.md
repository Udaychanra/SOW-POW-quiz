# Analytics status

Status: **disabled — no approved provider or measurement ID is configured**.

The public-site layout loads `components/site/AnalyticsEvents.js`, which delegates approved click events to `lib/analytics.js`. The wrapper is a production no-op unless a future approved integration provides `window.__oneSmallSeedAnalytics.track`.

The wrapper:

- does not install or call a third-party vendor;
- does not set cookies or claim to be cookie-free;
- accepts only the metadata keys allowlisted in `lib/analytics.js`;
- does not collect form values, names, emails, messages, quiz answers, stage data or financial details;
- catches provider errors and never blocks navigation or form behavior.

Quiz funnel events remain pending because the relevant quiz components and behavior are protected for this release. Analytics activation also remains pending until a provider, configuration value, privacy review and any required consent control are explicitly approved.
