export type OfferId = 'readiness' | 'operations' | 'incident';

export const portfolioPilot = {
  entities: 10, cases: 3, days: 30,
  workflow: 'Officer appointment and corporate-record update',
  outputs: ['Entity and source-record inventory', 'A working request and approval queue', 'An exception register with named owners', 'A closing report and available completion evidence'],
  acceptance: [
    'Every scoped case has an entity, owner and current source—or a documented hold.',
    'Review decisions identify the exact packet version and the authorized customer reviewer.',
    'A completed case has matched completion evidence; missing evidence stays open.',
    'The customer receives the queue, exception list and closing report for review.',
  ],
} as const;

export const offers = [
  {
    id: 'readiness' as const, name: 'Portfolio workflow assessment', eyebrow: 'Understand the handoff', price: '$1,500', unit: 'one-time scoped assessment',
    description: 'Examine how one corporate change moves through your portfolio, from the source record to the final handoff.',
    included: ['One corporate-action workflow, up to five entities', 'An entity, source and reviewer inventory', 'An ownership map, gap list and proposed pilot scope'],
    boundary: 'Assessment and planning. Customer documents require an agreed secure intake. Filings and legal advice are excluded.',
    cta: 'Plan a portfolio assessment',
  },
  {
    id: 'operations' as const, name: 'Entity operations pilot', eyebrow: 'Put one workflow to work', price: '$1,250', unit: 'per month, starting price',
    description: 'An initial 30-day managed workflow pilot for a defined entity portfolio, with an accountable customer reviewer.',
    included: ['Up to 10 entities and three officer-change cases', 'One customer reviewer and one corporate-action type', 'Request queue, exceptions, decision records and closing report'],
    boundary: 'Setup, source costs and any continuation are quoted separately. A written scope confirms availability and timing.',
    cta: 'Scope an entity operations pilot',
  },
] as const;

// Separate research offering; excluded from core portfolio pricing.
export const incidentOffer = {
  id: 'incident' as const, name: 'Incident readiness', eyebrow: 'Separate research project', price: '$2,500', unit: 'per guided pilot, starting price',
  description: 'A guided simulation and runbook-review engagement for technical teams.',
  included: ['One scoped service or incident workflow', 'Two guided incident simulations', 'Runbook gaps, decision records and a handoff report'],
  boundary: 'Simulation and readiness review. Live remediation and 24/7 response are excluded.',
  cta: 'Discuss an incident-readiness pilot',
} as const;
export const allOffers = [...offers, incidentOffer] as const;
export function getOffer(value: unknown) { return allOffers.find(offer => offer.id === value) ?? offers[0]; }
