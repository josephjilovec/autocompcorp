# AutoComp Corp — Operating Model 2026–2041

## Strategic thesis

AutoComp Corp is an autonomous compliance-operations platform for companies that manage legal entities across multiple jurisdictions. Its differentiation is not simply reminders. It converts source changes into structured obligations, drafts operational artifacts, creates approval gates, records evidence, and maintains an audit trail.

The core principle is **autonomous monitoring with permissioned execution**.

## Customer segments

### Primary

- Venture-backed companies with multiple subsidiaries.
- Venture studios and holding companies.
- Finance and operations teams managing annual reports, registered agents, corporate records, and foreign qualifications.
- Legal-operations teams with recurring entity-maintenance work.
- Registered-agent and filing-service networks seeking a software layer for recurring obligations.
- Professional-service firms serving many corporate clients.

### Psychographic fit

The ideal buyer is frustrated by spreadsheet compliance, fragmented calendars, email-driven approvals, and low visibility into whether a filing was actually completed. They value evidence, source provenance, and controlled automation.

## Value proposition

**Hook:** Compliance that keeps moving when your team sleeps.

AutoComp turns regulatory and entity-maintenance work into a continuously updated graph of obligations, owners, deadlines, evidence, and authorized actions.

## Product modules

### Registry Sentinel

Monitors approved public registries and provider feeds. Every observation stores source, observed timestamp, parser version, content hash, and confidence.

### Obligation Engine

Turns source observations and internal entity facts into versioned compliance obligations. Rules carry jurisdiction, effective date, superseded date, source references, reviewer, and confidence.

### Records Steward

Tracks corporate minutes, written consents, resolutions, officers, directors, equity-related corporate records, entity relationships, and document versions.

### Draft Factory

Generates routine draft artifacts from approved templates and verified facts. Drafts are never treated as executed documents.

### Approval Plane

Routes proposed external actions to authorized officers, registered agents, filing providers, or licensed counsel.

### Evidence Graph

Stores filing receipts, signed approvals, provider confirmations, document hashes, source snapshots, and renewal states.

## Autonomy levels

### L0 — Observe

The system may ingest and normalize approved source data without human approval.

### L1 — Draft

The system may prepare routine artifacts from approved templates when the source facts and rules are verified.

### L2 — Approve

Signatures, payments, filings, officer actions, and external record changes require an authorized execution path.

### L3 — Professional review

Ambiguous legal classification, enforcement issues, disputes, foreign qualification questions, material governance changes, and other high-consequence matters route to qualified professionals.

## Revenue model

### Core SaaS

Per-entity subscription with volume discounts. Pricing should scale with entity count, jurisdictions, monitoring frequency, and evidence-retention requirements.

### Operations Pro

Adds workflow automation, custom approval chains, bulk document generation, registered-agent oversight, and advanced evidence exports.

### Enterprise

Includes SSO, SCIM, role-based controls, custom retention, private connectors, contract SLAs, security review, and data-residency options.

### Partner edition

Registered agents, filing services, law firms, and accounting firms can use a multi-client environment with delegated tenant access and branded client reporting.

## Acquisition model

### Direct enterprise

Target CFO, controller, operations, legal operations, and corporate secretary functions at multi-entity companies.

### Professional channel

Develop partner editions for registered agents, law firms, accounting firms, venture studios, and corporate-service providers.

### Product-led wedge

Offer an entity-compliance inventory that imports a company’s entity list, jurisdictions, and known renewal dates, then identifies missing evidence and uncertain obligations without taking external action.

## Technical architecture

### Core services

- Next.js + TypeScript for public and authenticated application surfaces.
- PostgreSQL with row-level security for tenant-scoped data.
- Python/FastAPI workers for registry adapters, parsing, rule evaluation, document assembly, and agent orchestration.
- Redis for rate limiting, distributed locks, short-lived execution state, and deduplication.
- Queue infrastructure for scheduled source polling, retries, and long-running workflows.
- Encrypted object storage for source snapshots and evidence artifacts.

### Core schema

- organizations
- users
- entities
- jurisdictions
- entity_relationships
- officers
- registered_agents
- source_snapshots
- rules
- obligations
- findings
- draft_artifacts
- approval_requests
- execution_events
- evidence_artifacts
- renewals
- audit_events

## Source architecture

Every external source is represented by an adapter with:

- source identifier
- jurisdiction
- authentication method
- rate limits
- parser version
- freshness expectation
- retry policy
- legal terms / access constraints
- confidence level

The system must not assume that every state or agency offers a stable API. Public web sources, structured data feeds, partner APIs, and manual verified evidence should all map into the same source abstraction.

## Agent architecture

Agents should be narrow and independently evaluated.

### Registry Sentinel

Detects new or changed source states.

### Risk Classifier

Determines consequence, ambiguity, stale-data exposure, and whether a matter may proceed automatically.

### Records Steward

Reconciles entity facts and corporate records.

### Draft Agent

Selects an approved template and produces a draft from verified facts.

### Execution Router

Determines which authorized person or professional must approve or complete the external action.

### Audit Agent

Validates that the execution evidence matches the requested action and writes a final event to the evidence graph.

No individual agent is allowed to observe, interpret, authorize, execute, and certify the same external action.

## Security model

- tenant isolation through row-level security
- least-privilege service accounts
- immutable audit events
- short-lived signed document access
- webhook signature verification
- idempotency keys for external actions
- secrets held only in server-side secret storage
- no client-side provider credentials
- role-based approval thresholds
- source freshness displayed in the interface

## Compliance and professional boundaries

AutoComp is operational software. It should not present uncertain rules as definitive legal conclusions.

The interface must display:

- source date
- rule version
- confidence
- unresolved source conflicts
- professional-review requirement
- person or provider authorized to execute

This creates a defensible distinction between automated compliance operations and legal advice.

## Metrics

### Product

- percentage of obligations with current source evidence
- automated observation-to-draft time
- approval-cycle time
- percentage of events escalated for professional review
- false-positive obligation rate
- stale-source rate
- evidence completion rate

### Business

- annual recurring revenue per entity
- net revenue retention
- entities managed per customer
- partner-channel contribution
- gross margin by connector category
- enterprise expansion rate

## 2026–2041 roadmap

### 2026–2028 — Entity maintenance wedge

Start with annual reports, registered agents, corporate record maintenance, evidence capture, and structured approval workflows.

### 2029–2032 — Multi-jurisdiction intelligence

Expand source adapters, rule versioning, state coverage, provider integrations, and entity-relationship intelligence.

### 2033–2036 — Enterprise compliance operations

Add private connectors, policy engines, compliance evidence exports, advanced delegation, and multi-team governance.

### 2037–2041 — Autonomous compliance infrastructure

Become a system of record for continuously monitored corporate obligations, with machine-generated drafts and evidence-driven execution routed through authorized humans and professional networks.
