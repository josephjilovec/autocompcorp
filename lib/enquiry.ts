import { allOffers, getOffer, portfolioPilot, type OfferId } from './offers.ts';

export const segments = ['Multi-entity operating or holding company', 'Private investment or portfolio group', 'Corporate-services or legal-operations firm', 'Real-estate holding group', 'Other organization'] as const;
export const trackingMethods = ['Spreadsheets and shared folders', 'Existing entity-management software', 'External counsel or corporate-services provider', 'A mixture of systems', 'Not yet established'] as const;
export const reviewerRoles = ['Finance or portfolio operations', 'Corporate secretary or authorized officer', 'Legal or corporate-services team', 'Reviewer not yet assigned'] as const;
export type Enquiry = {
  name: string; email: string; organization: string; entityCount: string; offer: OfferId;
  need: string; process: string; authority: 'yes'; segment: string; tracking: string; reviewerRole: string;
};
type Result = { ok: true; record: Enquiry } | { ok: false; error: string };
const ranges = new Set(['1–5', '6–25', '26–100', '100+']);
const legacyNeeds = new Set(['State filing calendar', 'Corporate record maintenance', 'Multi-entity compliance operations', 'Registered-agent oversight', 'Compliance evidence and audit trail']);
const needs = { readiness: 'Portfolio workflow assessment', operations: 'Entity operations pilot', incident: 'DevOps incident readiness' } as const;

export function parseEnquiry(value: unknown): Result {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { ok: false, error: 'Please provide the required scope fields.' };
  const body = value as Record<string, unknown>;
  if (body.website) return { ok: false, error: 'Unable to accept this request.' };
  const limits = { name: 120, email: 160, organization: 160, process: 1600 } as const;
  const text: Record<string,string> = {};
  for (const [key,max] of Object.entries(limits)) {
    if (typeof body[key] !== 'string') return { ok: false, error: 'Please complete your name, work email, organization and scope.' };
    const field = (body[key] as string).trim();
    if (!field || field.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(field)) return { ok: false, error: 'A field is empty, too long or contains unsupported characters.' };
    if (key !== 'process' && /[\r\n]/.test(field)) return { ok: false, error: 'Contact fields must use a single line.' };
    text[key] = field;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.email)) return { ok: false, error: 'Enter a valid work email address.' };
  if (text.process.length < 10) return { ok: false, error: 'Add a little more detail about the workflow.' };
  if (typeof body.entityCount !== 'string' || !ranges.has(body.entityCount)) return { ok: false, error: 'Select an entity or service-count range.' };
  if (body.authority !== 'yes') return { ok: false, error: 'Please acknowledge the scoping and execution boundaries.' };
  const selected = body.offer === undefined && typeof body.need === 'string' && legacyNeeds.has(body.need) ? 'readiness' : body.offer;
  if (!allOffers.some(offer => offer.id === selected)) return { ok: false, error: 'Select a supported pilot offer.' };
  const qualification: Record<string,string> = {};
  for (const [key,allowed] of [['segment',segments],['tracking',trackingMethods],['reviewerRole',reviewerRoles]] as const) {
    if (body[key] === undefined) qualification[key] = 'Not specified';
    else if (typeof body[key] === 'string' && (allowed as readonly string[]).includes(body[key] as string)) qualification[key] = body[key] as string;
    else return { ok: false, error: 'Choose a supported organization, tracking method and reviewer role.' };
  }
  const offer = selected as OfferId;
  return { ok: true, record: { name:text.name, email:text.email, organization:text.organization, process:text.process, entityCount:body.entityCount, authority:'yes', offer, need:body.offer === undefined ? body.need as string : needs[offer], segment:qualification.segment, tracking:qualification.tracking, reviewerRole:qualification.reviewerRole } };
}
export function buildBrief(record: Enquiry): string {
  const offer = getOffer(record.offer);
  return [
    'AUTOCOMP CORP — ' + (record.offer === 'incident' ? 'INCIDENT RESEARCH ENQUIRY' : 'PORTFOLIO PILOT BRIEF'), '',
    'Prepared locally. This document is not an order, engagement agreement or authorization to act.', '',
    'Offer: ' + offer.name,
    'Indicative price: ' + (record.offer === 'readiness' ? '' : 'from ') + offer.price + ' — ' + offer.unit,
    'Organization: ' + record.organization, 'Contact: ' + record.name, 'Work email: ' + record.email,
    (record.offer === 'incident' ? 'Service range: ' : 'Organization entity range: ') + record.entityCount,
    ...(record.offer === 'incident' ? [] : ['Organization type: ' + record.segment, 'Current tracking: ' + record.tracking, 'Customer reviewer role: ' + record.reviewerRole]),
    '', 'Workflow to discuss:', record.process, '', 'Proposed starting deliverables:',
    ...offer.included.map(item => '- ' + item),
    ...(record.offer === 'operations' ? ['', 'Initial pilot limits: up to ' + portfolioPilot.entities + ' entities, ' + portfolioPilot.cases + ' officer-change cases, ' + portfolioPilot.days + ' days after agreed kickoff and required inputs.', 'Organization size does not expand the pilot cap. Larger scopes need a separate proposal.', '', 'Delivery review:', ...portfolioPilot.acceptance.map(item => '- ' + item)] : []),
    '', 'Boundaries: ' + offer.boundary,
    'Actual scope, availability, timing, fees and terms require a written proposal.',
  ].join('\n');
}
