import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseEnquiry } from '../lib/enquiry.ts';
import { forwardEnquiry, resolveIntake } from '../lib/intake.ts';
const parsed=parseEnquiry({ name:'Synthetic Reviewer',email:'reviewer@example.test',organization:'Fictional Co',entityCount:'6–25',offer:'operations',process:'Officer changes need a clear source and review handoff.',authority:'yes' });
test('intake requires an HTTPS endpoint and token without userinfo or fragment', () => {
  for(const endpoint of [undefined,'http://example.test/intake','https://u:p@example.test/intake','https://example.test/intake#fragment','invalid']) assert.equal(resolveIntake(endpoint,'synthetic-test-token'),null);
  assert.equal(resolveIntake('https://example.test/intake',''),null);
});
test('accepted intake preserves scope and keeps routing credentials server-side', async () => {
  let observed;
  await forwardEnquiry(parsed.record,resolveIntake('https://example.test/intake','synthetic-test-token'),async (url,options) => { observed={url,options}; return new Response(null,{status:202}); });
  assert.equal(observed.url,'https://example.test/intake');
  assert.equal(observed.options.redirect,'error');
  assert.equal(observed.options.headers.Authorization,'Bearer synthetic-test-token');
  assert.equal(JSON.parse(observed.options.body).offer,'operations');
  assert.equal(JSON.parse(observed.options.body).authority,true);
  assert.equal(JSON.parse(observed.options.body).scopeAcknowledged,true);
  assert.equal(JSON.parse(observed.options.body).executionAuthorized,false);
  assert.equal(JSON.parse(observed.options.body).email,'reviewer@example.test');
});
test('failed receiver and network failure never acknowledge delivery', async () => {
  const destination=resolveIntake('https://example.test/intake','synthetic-test-token');
  await assert.rejects(forwardEnquiry(parsed.record,destination,async()=>new Response(null,{status:503})),/did not acknowledge/);
  await assert.rejects(forwardEnquiry(parsed.record,destination,async()=>{throw new Error('synthetic network failure');}),/network failure/);
});
