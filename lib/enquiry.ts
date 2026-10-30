import { getOffer, offers, type OfferId } from './offers.ts';

export type Enquiry = {
  name: string;
  email: string;
  organization: string;
  entityCount: string;
  offer: OfferId;
  need: string;
  process: string;
  authority: 'yes';
};

type Result = { ok: true; record: Enquiry } | { ok: false; error: string };
const ranges = new Set(['1–5', '6–25', '26–100', '100+']);
const legacyNeeds = new Set(['State filing calendar', 'Corporate record maintenance', 'Multi-entity compliance operations', 'Registered-agent oversight', 'Compliance evidence and audit trail']);
const needs = {
  readiness: 'Compliance evidence and audit trail',
  operations: 'Multi-entity compliance operations',
  incident: 'DevOps incident readiness',
} as const;

export function parseEnquiry(value: unknown): Result {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { ok: false, error: 'Please provide the required scope fields.' };
  const body = value as Record<string, unknown>;
  if (body.website) return { ok: false, error: 'Unable to accept this request.' };
  const limits = { name: 120, email: 160, organization: 160, process: 1600 } as const;
  const text: Record<string, string> = {};
  for (const [key, max] of Object.entries(limits)) {
    if (typeof body[key] !== 'string') return { ok: false, error: 'Please complete your name, work email, organization and scope.' };
    const field = (body[key] as string).trim();
    if (!field || field.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(field)) return { ok: false, error: 'A field is empty, too long or contains unsupported characters.' };
    text[key] = field;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.email) || /[\r\n]/.test(text.email)) return { ok: false, error: 'Enter a valid work email address.' };
  if (text.process.length < 10) return { ok: false, error: 'Add a little more detail about the workflow.' };
  if (typeof body.entityCount !== 'string' || !ranges.has(body.entityCount)) return { ok: false, error: 'Select an entity-count range.' };
  if (body.authority !== 'yes') return { ok: false, error: 'Please acknowledge the scoping and execution boundaries.' };
  const selected = body.offer === undefined && typeof body.need === 'string' && legacyNeeds.has(body.need) ? 'readiness' : body.offer;
  if (!offers.some((offer) => offer.id === selected)) return { ok: false, error: 'Select a supported pilot offer.' };
  const offer = selected as OfferId;
  return { ok: true, record: { name: text.name, email: text.email, organization: text.organization, process: text.process, entityCount: body.entityCount, authority: 'yes', offer, need: body.offer === undefined ? body.need as string : needs[offer] } };
}

export function buildBrief(record: Enquiry): string {
  const offer = getOffer(record.offer);
  return [
    'AUTOCOMP CORP — PILOT SCOPING BRIEF',
    '',
    'Prepared locally. This document is not an order, engagement agreement or authorization to act.',
    '',
    'Offer: ' + offer.name,
    'Indicative price: ' + (record.offer === 'readiness' ? '' : 'from ') + offer.price + ' — ' + offer.unit,
    'Organization: ' + record.organization,
    'Contact: ' + record.name,
    'Work email: ' + record.email,
    (record.offer === 'incident' ? 'Service range: ' : 'Entity range: ') + record.entityCount,
    '',
    'Workflow to discuss:',
    record.process,
    '',
    'Proposed starting deliverables:',
    ...offer.included.map((item) => '- ' + item),
    '',
    'Boundaries: ' + offer.boundary,
    'Actual scope, availability, timing, fees and terms require a written proposal.',
  ].join('\n');
}
