export type OfferId = 'readiness' | 'operations' | 'incident';

export const offers = [
  {
    id: 'readiness' as const,
    name: 'Readiness review',
    eyebrow: 'A clear starting point',
    price: '$1,500',
    unit: 'one-time scoped review',
    description: 'Find the gaps in one recurring compliance workflow before you automate it.',
    included: ['One workflow and up to five entities', 'Evidence inventory and ownership map', 'Prioritized gaps and a practical pilot scope'],
    boundary: 'Planning and review. No filings, certification or production changes.',
    cta: 'Plan a readiness review',
  },
  {
    id: 'operations' as const,
    name: 'Evidence operations',
    eyebrow: 'Build a repeatable routine',
    price: '$1,250',
    unit: 'per month, starting price',
    description: 'A scoped pilot to keep a recurring record, reviewer queue and completion evidence organized.',
    included: ['One agreed evidence workflow', 'Named owners and a scheduled review cadence', 'A monthly exception and completion summary'],
    boundary: 'Entity count, setup, source costs and review cadence are quoted before work begins.',
    cta: 'Scope an operations pilot',
  },
  {
    id: 'incident' as const,
    name: 'Incident readiness',
    eyebrow: 'Practice before it matters',
    price: '$2,500',
    unit: 'per guided pilot, starting price',
    description: 'Use DevOps Incident Commander to examine runbooks and rehearse decisions in a simulated environment.',
    included: ['One scoped service or incident workflow', 'Two guided incident simulations', 'Runbook gaps, decision records and a handoff report'],
    boundary: 'Simulation and readiness review. Live remediation and 24/7 response are excluded.',
    cta: 'Explore an incident pilot',
  },
] as const;

export function getOffer(value: unknown) {
  return offers.find((offer) => offer.id === value) ?? offers[0];
}
