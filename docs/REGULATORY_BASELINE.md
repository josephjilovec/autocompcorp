# AutoComp Corp — 2026 Regulatory Baseline

This document records product assumptions that must be versioned. It is not a substitute for jurisdiction-specific legal review.

## Beneficial-ownership reporting

Current FinCEN guidance reflects the March 2025 interim final rule under which U.S.-formed entities are exempt from BOI reporting to FinCEN, while the reporting-company definition is focused on certain foreign entities registered to do business in a U.S. state or tribal jurisdiction.

### Architecture rule

Do not encode a permanent boolean such as `domestic_company_boi_required = false`.

Model the requirement as a versioned rule:

- jurisdiction / authority,
- source identifier,
- effective date,
- entity scope,
- exemption logic,
- superseded date,
- professional reviewer,
- source freshness.

If the source is stale or conflicting, the system escalates rather than silently certifying compliance.

## State registries

State corporate registries vary significantly in data format, filing workflow, authentication, availability, and public API support.

### Architecture rule

Every registry is an adapter with its own:

- source method,
- parser version,
- access rules,
- retry policy,
- freshness expectation,
- evidence format,
- failure mode.

A registry outage or parser failure is an unresolved source state, not evidence that an entity is compliant.

## Corporate record automation

The platform may automate source monitoring, evidence reconciliation, calendar calculation, and draft preparation where the underlying rule and facts are verified.

### Execution boundary

The following remain permissioned:

- signatures,
- state filings,
- officer or director actions,
- payments,
- changes to external records,
- legal conclusions requiring professional judgment.

## Rule lifecycle

Every production rule should support:

1. draft,
2. professional review,
3. active,
4. superseded,
5. withdrawn.

Every finding should reference the exact rule version used to generate it.

## Evidence standard

A compliance event should be auditable from:

`source snapshot → parser version → rule version → finding → draft → approval → execution event → receipt / evidence`

If one link is missing, the interface should display the matter as incomplete or unresolved rather than presenting a green status with no proof.

## Re-review triggers

- regulatory source change,
- entity jurisdiction change,
- entity type change,
- registered-agent change,
- officer or director change,
- foreign qualification event,
- material governance change,
- source parser update,
- evidence contradiction,
- enforcement or dispute matter.

## Front-end language rule

Preferred language:

- monitored,
- source verified,
- draft ready,
- approval required,
- professional review,
- execution confirmed,
- evidence complete.

Avoid presenting probabilistic agent output as a legal conclusion or certification.
