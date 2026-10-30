import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advancePreview, hasCurrentApproval, initialPreview, isPreviewComplete, previewRecord, previewStatus } from '../lib/action-preview.ts';

function approvedCase() {
  let state = initialPreview('sample-a');
  state = advancePreview(state, { type:'prepare' });
  state = advancePreview(state, { type:'authority', authorized:true });
  return advancePreview(state, { type:'approve' });
}
test('approval requires current sources, a current packet and reviewer authority', () => {
  let state = initialPreview('sample-a');
  assert.equal(hasCurrentApproval(advancePreview(state, { type:'approve' })), false);
  state = advancePreview(state, { type:'prepare' });
  assert.equal(hasCurrentApproval(advancePreview(state, { type:'approve' })), false);
  state = advancePreview(state, { type:'source', current:false });
  state = advancePreview(state, { type:'authority', authorized:true });
  assert.equal(advancePreview(state, { type:'prepare' }).packet, null);
  assert.equal(hasCurrentApproval(advancePreview(state, { type:'approve' })), false);
});
test('only matching completion evidence closes an approved case', () => {
  let state = approvedCase();
  assert.equal(hasCurrentApproval(state), true);
  assert.equal(isPreviewComplete(state), false);
  state = advancePreview(state, { type:'receipt', entityId:'sample-b' });
  assert.equal(previewStatus(state), 'Evidence mismatch');
  assert.equal(isPreviewComplete(state), false);
  state = advancePreview(state, { type:'receipt', entityId:'sample-a' });
  assert.equal(isPreviewComplete(state), true);
  assert.match(previewRecord(state, 'Fictional Co'), /No appointment, signature, filing or external action occurred/);
});
test('source changes invalidate the prepared packet and dependent evidence', () => {
  let state = advancePreview(approvedCase(), { type:'receipt', entityId:'sample-a' });
  state = advancePreview(state, { type:'change-source' });
  assert.equal(state.revision, 2);
  assert.equal(state.packet, null);
  assert.equal(state.approval, null);
  assert.equal(state.receipt, null);
  assert.equal(isPreviewComplete(state), false);
});
test('staleness and revoked authority cannot reuse an earlier approval', () => {
  for (const action of [{ type:'source', current:false }, { type:'authority', authorized:false }]) {
    const state = advancePreview(approvedCase(), action);
    assert.equal(state.approval, null);
    assert.equal(isPreviewComplete(advancePreview(state, { type:'receipt', entityId:'sample-a' })), false);
  }
});
test('a requested revision needs a newly prepared and approved packet', () => {
  let state = advancePreview(approvedCase(), { type:'revise' });
  assert.equal(previewStatus(state), 'Revision requested');
  assert.equal(hasCurrentApproval(advancePreview(state, { type:'approve' })), false);
  state = advancePreview(state, { type:'prepare' });
  state = advancePreview(state, { type:'approve' });
  assert.equal(state.approval.revision, 2);
});
test('one entity cannot reuse another entity packet, approval or receipt', () => {
  const approved = approvedCase();
  assert.equal(hasCurrentApproval({ ...approved, entityId:'sample-b' }), false);
  assert.equal(isPreviewComplete({ ...approved, receipt:{ entityId:'sample-b', revision:1 } }), false);
  assert.equal(isPreviewComplete({ ...approved, receipt:{ entityId:'sample-a', revision:0 } }), false);
});
