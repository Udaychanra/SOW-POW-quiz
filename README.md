# One Small Seed — SOW POW Stage Finder

Production-ready Next.js App Router application for the One Small Seed brand website and protected ten-question SOW POW Stage Finder.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production verification

```bash
npm run check
npm test
npm run build
npm start
```

`npm start` serves the completed production build at `http://localhost:3000`.

## Application architecture

- `app/(site)/` — shared brand-site layout and the homepage, method, about, resources, services, contact, and disclosure pages.
- `app/sow-pow-quiz/` — isolated route layout for the protected quiz at `/sow-pow-quiz`.
- `app/api/quiz-submit/` — secure submission route.
- `components/site/` — shared site header, footer, page patterns, forms, and scoped CSS Module design system.
- `components/quiz/` — interactive quiz, progress, preview, email form, confirmation, and stage artwork.
- `content/site-content.js` — reusable site navigation, SOW POW stages, Five Parts, and resource placeholders.
- `lib/quiz/` — shared questions, stages, scoring, and seven-stage SVG mapping.
- `lib/email/` — approved email template mapping, HTML/plain-text rendering, and Resend delivery.
- `lib/supabase.js` — server-side client for the existing `quiz_leads` table.
- `public/site/` — restrained local SVG icon, botanical, tree, and landscape assets.
- `public/` — existing PDF assets.

The legacy static entry files remain temporarily for migration review. Next.js serves the site through the App Router, not `index.html` or `devServer.js`.

The site shell and site CSS Module do not wrap the quiz. The original quiz stylesheet is loaded only by the `/sow-pow-quiz` route layout.

## Submission flow

The browser sends first name, email, and temporary answer indexes to `POST /api/quiz-submit`. The server:

1. Validates the request.
2. Recalculates the canonical SOW POW stage.
3. Inserts only `first_name`, `email`, and `stage` into `quiz_leads`.
4. Renders the approved stage-specific email.
5. Sends one message through Resend.
6. Returns `{ "success": true, "stage": number }` only after provider acceptance.

No answers or scores are persisted.

## Environment variables

Server-only:

- `RESEND_API_KEY`
- `EMAIL_FROM`

Client-safe Supabase publishable configuration:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The existing Supabase project values remain server-side migration fallbacks so the production connection is preserved. Never place `RESEND_API_KEY` in a `NEXT_PUBLIC_` variable.
