// Independent fictional browser demonstration. No private engine code or live integration.
export type RecordLink = { entityId: string; revision: number };
export type ActionPreview = {
  entityId: string; revision: number; sourceCurrent: boolean; reviewerAuthorized: boolean;
  packet: RecordLink | null; approval: RecordLink | null; receipt: RecordLink | null; revisionRequested: boolean;
};
export type PreviewAction =
  | { type: 'source'; current: boolean } | { type: 'change-source' }
  | { type: 'authority'; authorized: boolean } | { type: 'prepare' } | { type: 'approve' }
  | { type: 'revise' } | { type: 'receipt'; entityId: string } | { type: 'reset' };

export function initialPreview(entityId: string): ActionPreview {
  return { entityId, revision: 1, sourceCurrent: true, reviewerAuthorized: false, packet: null, approval: null, receipt: null, revisionRequested: false };
}
function matches(link: RecordLink | null, state: ActionPreview) {
  return link?.entityId === state.entityId && link.revision === state.revision;
}
export function hasCurrentApproval(state: ActionPreview) {
  return state.sourceCurrent && state.reviewerAuthorized && matches(state.packet, state) && matches(state.approval, state);
}
export function isPreviewComplete(state: ActionPreview) { return hasCurrentApproval(state) && matches(state.receipt, state); }
export function previewStatus(state: ActionPreview) {
  if (!state.sourceCurrent) return 'Source hold';
  if (state.revisionRequested) return 'Revision requested';
  if (!matches(state.packet, state)) return 'Packet to prepare';
  if (!state.reviewerAuthorized) return 'Reviewer needed';
  if (!hasCurrentApproval(state)) return 'Decision pending';
  if (!state.receipt) return 'Completion evidence needed';
  if (!matches(state.receipt, state)) return 'Evidence mismatch';
  return 'Complete · sample';
}
export function advancePreview(state: ActionPreview, action: PreviewAction): ActionPreview {
  const link = { entityId: state.entityId, revision: state.revision };
  switch (action.type) {
    case 'reset': return initialPreview(state.entityId);
    case 'source': return action.current ? { ...state, sourceCurrent: true } : { ...state, sourceCurrent: false, packet: null, approval: null, receipt: null };
    case 'change-source': return { ...state, revision: state.revision + 1, sourceCurrent: true, packet: null, approval: null, receipt: null, revisionRequested: false };
    case 'authority': return action.authorized ? { ...state, reviewerAuthorized: true } : { ...state, reviewerAuthorized: false, approval: null, receipt: null };
    case 'prepare': return state.sourceCurrent ? { ...state, packet: link, approval: null, receipt: null, revisionRequested: false } : state;
    case 'approve': return state.sourceCurrent && state.reviewerAuthorized && matches(state.packet, state) ? { ...state, approval: link, receipt: null, revisionRequested: false } : state;
    case 'revise': return matches(state.packet, state) ? { ...state, revision: state.revision + 1, packet: null, approval: null, receipt: null, revisionRequested: true } : state;
    case 'receipt': return hasCurrentApproval(state) ? { ...state, receipt: { ...link, entityId: action.entityId } } : state;
  }
}
export function previewRecord(state: ActionPreview, entityName: string) {
  return [
    'AUTOCOMP — FICTIONAL OFFICER-CHANGE EXAMPLE',
    'Illustrative browser record. No appointment, signature, filing or external action occurred.', '',
    'Entity: ' + entityName, 'Case revision: ' + state.revision,
    'Source: ' + (state.sourceCurrent ? 'Current synthetic source' : 'Source hold'),
    'Review packet: ' + (matches(state.packet, state) ? 'Prepared for this entity and revision' : 'Not current'),
    'Customer-review authority: ' + (state.reviewerAuthorized ? 'Sample authority selected' : 'Not established in sample'),
    'Decision: ' + (hasCurrentApproval(state) ? 'Sample approval for current packet' : 'No current approval'),
    'Completion evidence: ' + (!state.receipt ? 'Not recorded' : matches(state.receipt, state) ? 'Matched synthetic record' : 'Different entity — held'),
    'Status: ' + previewStatus(state), '',
    'This closes only an illustrative internal record. It is not legal compliance, a real officer appointment or a government filing.',
  ].join('\n');
}
