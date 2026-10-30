# AutoComp Corp

Public website for Entity Governance & Operations pilots.

Canonical URL: https://autocompcorp.josephjilovec.com/

## Public routes

- / — multi-entity buyer positioning, fictional officer-change workspace and core offers.
- /pricing — portfolio assessment, defined entity operations pilot and delivery criteria.
- /assessment — qualified portfolio enquiry and local brief preparation.
- /products/incident-commander — separate technical-readiness research project.
- /privacy — website data handling.

Core pricing covers entity governance only. Incident Commander is absent from the main navigation and core offer cards; its legacy product URL and separate research enquiry remain available through the footer.

The public demonstration is independently authored, fictional browser code. It does not import the private operations engine, authenticate an officer, sign an appointment, contact a registry or file a document. Private business plans and product implementations remain outside this repository.

## Development and checks

Node 24, Next.js App Router, React and TypeScript.

~~~bash
npm ci
npm test
npm run build
npm run typecheck
npm run dev
~~~

The tests exercise the example's source/version/authority/completion boundaries, enquiry validation, optional contact routes and acknowledged intake handoff. They use synthetic data and mocked network delivery.

## Enquiry delivery

Keep the existing GitHub/Vercel project. The site supports three optional contact paths; none is invented when configuration is absent.

1. Existing intake service: set AUTOCOMP_EVENT_SINK_URL (HTTPS) and AUTOCOMP_EVENT_SINK_TOKEN in Vercel. The server sends a bounded, validated JSON payload with a bearer token, refuses redirects, times out and acknowledges only an accepted upstream response.
2. Business inbox: set AUTOCOMP_CONTACT_EMAIL to the approved public business address. After reviewing a brief, visitors can open an email draft and send it in their email app. This is an email handoff, not website-confirmed delivery.
3. Public booking page: set AUTOCOMP_BOOKING_URL to the approved public HTTPS scheduling URL. No form fields are appended to that URL.

Approved public email/booking choices can also be supplied in lib/contact.ts when production environment access is unavailable. Keep real tokens and the private intake endpoint in server settings only.

Redeploy after changing production settings. GET /api/assessment returns only the configured availability flag and approved public contact choices. It never exposes the intake endpoint or token. Configuration presence is not an end-to-end receiver-health test.

Without a configured route, the page clearly offers local brief/copy/download only. Before directing prospects to it, configure an actual destination and verify delivery with an explicitly designated test enquiry. Do not use confidential documents, real case evidence or credentials in this form.

The receiver needs its own appropriate access, retention and abuse controls. No payment, subscription or binding engagement is created by the website.

## Assets

Three original AI-generated editorial photographs are retained as responsive WebP assets. Corporate-review imagery supports the core pages; infrastructure photography is used on the separate research page. Manrope is self-hosted under the included OFL license. Image prompts and export paths remain in public/media/IMAGE_NOTES.md.

No client logos, testimonials, certification claims or unsupported market statistics are used.
