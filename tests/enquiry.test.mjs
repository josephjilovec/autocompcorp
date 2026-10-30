import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildBrief, parseEnquiry } from '../lib/enquiry.ts';

const valid = { name: 'Synthetic Reviewer', email: 'reviewer@example.test', organization: 'Fictional Example Co', entityCount: '1–5', offer: 'readiness', process: 'Review officer records across a small synthetic entity group.', authority: 'yes' };

test('valid scope produces a local brief with accurate boundaries', () => {
  const result = parseEnquiry(valid);
  assert.equal(result.ok, true);
  const text = buildBrief(result.record);
  assert.match(text, /\$1,500/);
  assert.match(text, /Prepared locally/);
  assert.match(text, /not an order/);
});

test('unknown or forged offer identifiers are refused', () => {
  for (const offer of ['unlimited', '<script>', {}, null]) assert.equal(parseEnquiry({ ...valid, offer }).ok, false);
});

test('oversize, object, control-character and empty fields are refused', () => {
  for (const process of ['x'.repeat(1601), {}, 'bad\0data', 'short']) assert.equal(parseEnquiry({ ...valid, process }).ok, false);
  assert.equal(parseEnquiry({ ...valid, name: ' ' }).ok, false);
  assert.equal(parseEnquiry([]).ok, false);
  assert.equal(parseEnquiry(null).ok, false);
});

test('email header injection and invalid emails are refused', () => {
  for (const email of ['not-an-address', 'a@b', 'a@example.test\r\nBcc:other@example.test']) assert.equal(parseEnquiry({ ...valid, email }).ok, false);
});

test('scope acknowledgement and range are required', () => {
  assert.equal(parseEnquiry({ ...valid, authority: false }).ok, false);
  assert.equal(parseEnquiry({ ...valid, entityCount: 'unlimited' }).ok, false);
  assert.equal(parseEnquiry({ ...valid, website: 'spam-filled-field' }).ok, false);
});

test('all offered pilot types retain their own price and scope', () => {
  const result = parseEnquiry({ ...valid, offer: 'incident' });
  assert.equal(result.ok, true);
  assert.equal(result.record.need, 'DevOps incident readiness');
  assert.match(buildBrief(result.record), /Service range: 1–5/);
  assert.match(buildBrief(result.record), /Live remediation and 24\/7 response are excluded/);
});

test('older valid assessment payloads keep their original need', () => {
  const { offer, ...legacy } = valid;
  const result = parseEnquiry({ ...legacy, need: 'State filing calendar' });
  assert.equal(result.ok, true);
  assert.equal(result.record.need, 'State filing calendar');
});
