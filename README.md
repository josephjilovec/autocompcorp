# AutoComp Corp

**Positioning:** an autonomous RegTech operating layer that monitors corporate obligations, reconciles evidence, drafts routine corporate artifacts, and routes consequential execution through permissioned human and professional controls.

The brand name is locked. Alternate naming work is intentionally omitted.

## Value proposition

**Hook:** Compliance that keeps moving when your team sleeps.

The product addresses a structural operations problem: corporate compliance is often distributed across calendars, registered agents, email, counsel, spreadsheets, state portals, and institutional memory. AutoComp turns those fragments into source-stamped obligations with owners, deadlines, draft artifacts, approvals, and evidence.

**Ideal customer:** multi-entity founders, finance and operations teams, legal-operations groups, venture studios, registered-agent networks, and professional-service firms that value control and auditability more than superficial automation.

## Visual system

**Direction:** Obsidian Registry Grid — dark operational software with machine-readable telemetry rather than generic corporate SaaS styling.

- Obsidian: `#050709`
- Panel black: `#0A0E11`
- Matrix green: `#A8FF60`
- Signal cyan: `#70E7FF`
- Steel: `#2A3941`
- Display type: bold neo-grotesk/system sans
- Telemetry type: system monospace

## Agent architecture

1. **Registry Sentinel** — monitors public and authorized registry sources and provider evidence.
2. **Records Steward** — reconciles internal corporate records, entity relationships, approvals, and document versions.
3. **Risk Classifier** — scores uncertainty, consequence, jurisdiction complexity, stale-data exposure, and conflict between sources.
4. **Execution Router** — sends approved actions to officers, registered agents, filing services, or counsel.

The agents are deliberately separated. A single model should not observe, interpret, authorize, and certify its own work.

## Control levels

- **L0 Observe:** read and normalize source events automatically.
- **L1 Draft:** generate routine artifacts from approved templates and verified facts.
- **L2 Approve:** signatures, payments, filings, officer actions, and external record changes require authorized execution.
- **L3 Professional review:** ambiguous legal classification, disputes, enforcement matters, foreign qualification, and material governance changes route to qualified counsel.

## Technical architecture

### Frontend

- Next.js App Router + TypeScript.
- Server-rendered public product surface.
- Authenticated operations workspace for entity state, obligation queues, evidence, approvals, and audit history.

### Services

- PostgreSQL for tenants, entities, obligations, source snapshots, approval records, and evidence metadata.
- Row-level security for tenant isolation.
- Redis for rate limiting, workflow locks, and short-lived agent state.
- Python/FastAPI workers for source adapters, parsing, classification, and document assembly.
- Object storage for evidence artifacts with hash verification and envelope encryption.
- Queue infrastructure for scheduled registry polling and retries.

### Core schema

`Organization → Entity → Jurisdiction → Obligation → SourceSnapshot → Finding → DraftArtifact → Approval → ExecutionEvent → EvidenceArtifact → AuditEvent`

Each `SourceSnapshot` should record source URL or provider identifier, observed timestamp, parser version, content hash, and confidence. Rules must be versioned so the system can explain which rule set produced each obligation.

## Integrations

- Secretary-of-state and agency sources through versioned adapters; do not assume a universal public API exists.
- Registered-agent and filing-service provider APIs where contractually available.
- DocuSign or Dropbox Sign for permissioned signatures.
- Stripe for subscription billing and approved filing-fee workflows.
- Law-firm APIs or secure matter-routing endpoints for legal review.
- Calendar/email integrations for human escalation only; they are not authoritative compliance sources.

## Legal and operational boundaries

AutoComp is compliance operations software, not an autonomous law firm or corporate officer. It may monitor, reconcile, draft, and recommend automatically, but consequential filings and legal execution remain permissioned. The product should display source freshness, confidence, and unresolved conflicts rather than presenting uncertain regulatory conclusions as facts.

The rules engine must support effective dates, superseded rules, jurisdiction scope, source provenance, reviewer identity, and immutable execution receipts. That is essential for a system intended to operate over many years of changing requirements.

## Deployment

1. `npm install`
2. `npm run typecheck`
3. `npm run build`
4. Configure `AUTOCOMP_EVENT_SINK_URL` and `AUTOCOMP_EVENT_SINK_TOKEN` server-side.
5. Deploy the Next.js application.

The readiness endpoint intentionally refuses production submissions until secure routing is configured.
