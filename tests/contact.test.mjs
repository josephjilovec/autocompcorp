import assert from 'node:assert/strict';
import { test } from 'node:test';
import { emailDraftHref, readPublicContact } from '../lib/contact.ts';
test('no invented contact route is created from missing settings', () => { assert.deepEqual(readPublicContact(undefined),{}); assert.deepEqual(readPublicContact({}),{}); });
test('public contact rejects unsafe URLs and header injection', () => {
  for(const bookingUrl of ['javascript:alert(1)','http://example.test/book','https://user:pass@example.test','https://localhost/book','https://127.0.0.1/book','https://example.test?api_key=secret']) assert.equal(readPublicContact({ bookingUrl }).bookingUrl,undefined);
  assert.equal(readPublicContact({ email:'team@example.test\r\nBcc:other@example.test' }).email,undefined);
});
test('public business contact and booking route survive validation', () => {
  assert.deepEqual(readPublicContact({ email:'team@example.test',bookingUrl:'https://example.test/book' }),{ email:'team@example.test',bookingUrl:'https://example.test/book' });
});
test('email handoff encodes subject and body without claiming delivery', () => {
  const href=emailDraftHref('team@example.test','Portfolio & scope','Line one\nLine two');
  assert.match(href,/^mailto:/); assert.match(href,/Portfolio%20%26%20scope/); assert.match(href,/Line%20one%0ALine%20two/);
  assert.equal(emailDraftHref('not-an-email','subject','body'),null);
});
