# AutoComp Corp

Public website for compliance-operations and incident-readiness pilots.

Canonical URL: https://autocompcorp.josephjilovec.com/

## Public experience

- / — offer overview, illustrative evidence workspace, product introduction and pilot pricing.
- /pricing — starting prices, inclusions and scoping boundaries.
- /products/incident-commander — guided incident-readiness offer and a fictional browser illustration.
- /assessment — local pilot-brief preparation, plus optional configured enquiry submission.
- /privacy — website data-handling explanation.

The examples use fictional data. No demonstration connects to a registry, client account or live infrastructure. Current product foundations support synthetic/offline workflows; the site does not claim certification, live cloud remediation, managed response or customer outcomes.

Private product code and commercial research are maintained separately and are not imported or bundled into this site.

## Development

Next.js App Router, React and TypeScript; Node 24.

~~~bash
npm ci
npm test
npm run typecheck
npm run build
npm run dev
~~~

Keep the existing Vercel project and root deployment settings. The package lock pins the installed dependency graph.

## Enquiry routing

The planner prepares a brief locally without sending or persisting the form fields. Users may copy/download it.

GET /api/assessment exposes only a no-store availability boolean. A send button is offered only when the server has an HTTPS AUTOCOMP_EVENT_SINK_URL and AUTOCOMP_EVENT_SINK_TOKEN configured. Preparing a draft never sends it.

POST validates a bounded JSON request, same-origin browser requests, supported offer/range values, contact-field limits and the scope acknowledgement. It preserves the existing server-side bearer-token handoff, refuses redirects, uses a timeout and acknowledges only a successful upstream response. Missing configuration or an unavailable sink never produces a success message. The intake provider still needs appropriate operational controls, including abuse prevention, data handling and tested delivery.

Do not commit live secrets. The public scoping form is not a client evidence vault. No payment or subscription is created by this website.

## Assets

Three original AI-generated editorial photographs are delivered as responsive WebP images. Manrope is self-hosted under its included OFL license. Prompts and export paths are documented in public/media/IMAGE_NOTES.md.

No third-party customer logos, testimonials, certifications, competitor screenshots or unsupported savings claims are used.
