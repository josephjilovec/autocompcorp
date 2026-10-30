'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { buildBrief, parseEnquiry, type Enquiry } from '@/lib/enquiry';
import { getOffer, offers, type OfferId } from '@/lib/offers';

export default function AssessmentForm({ initialOffer }: { initialOffer: OfferId }) {
  const [offer, setOffer] = useState<OfferId>(initialOffer);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [prepared, setPrepared] = useState<Enquiry | null>(null);
  const [brief, setBrief] = useState('');
  const [status, setStatus] = useState('');
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const preview = useRef<HTMLTextAreaElement>(null);
  const result = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    fetch('/api/assessment', { cache: 'no-store', signal: controller.signal })
      .then((response) => response.ok ? response.json() : { available: false })
      .then((data) => setAvailable(data.available === true))
      .catch(() => setAvailable(false))
      .finally(() => window.clearTimeout(timeout));
    return () => { controller.abort(); window.clearTimeout(timeout); };
  }, []);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseEnquiry(Object.fromEntries(new FormData(event.currentTarget).entries()));
    if (!parsed.ok) { setFailed(true); setStatus(parsed.error); return; }
    setPrepared(parsed.record); setBrief(buildBrief(parsed.record)); setFailed(false);
    setStatus('Your brief is prepared in this browser. Nothing has been sent.');
    window.requestAnimationFrame(() => { result.current?.scrollIntoView({ block: 'start', behavior: 'auto' }); preview.current?.focus({ preventScroll: true }); });
  }
  async function copy() {
    try { await navigator.clipboard.writeText(brief); setStatus('Brief copied. Nothing has been sent.'); setFailed(false); }
    catch { preview.current?.focus(); preview.current?.select(); setStatus('Select and copy the brief below. Nothing has been sent.'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'autocomp-pilot-brief.txt'; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Brief downloaded to your device. Nothing has been sent.'); setFailed(false);
  }
  async function send() {
    if (!prepared || !available || busy) return;
    setBusy(true); setStatus('Sending the displayed scope fields…'); setFailed(false);
    try {
      const response = await fetch('/api/assessment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(prepared), signal: AbortSignal.timeout(10000) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Intake did not acknowledge the request.');
      setStatus('Your request was accepted for scoping review.'); setPrepared(null);
    } catch (error) { setFailed(true); setStatus(error instanceof Error ? error.message : 'Unable to confirm delivery. You can still copy or download the brief.'); }
    finally { setBusy(false); }
  }
  return <div className="pilot-planner"><div className="planner-heading"><p className="overline">Your pilot planner</p><span>{available === null ? 'Checking enquiry routing…' : available ? 'Enquiry sending available' : 'Local brief preparation'}</span></div>
    <form className="planner-form" onSubmit={prepare} onChange={() => { setPrepared(null); setBrief(''); setStatus(''); }}>
      <label className="full-field">Starting offer<select name="offer" value={offer} onChange={(event) => setOffer(event.target.value as OfferId)}>{offers.map((item) => <option value={item.id} key={item.id}>{item.name} — {item.id === 'readiness' ? '' : 'from '}{item.price}</option>)}</select></label>
      <label>Your name<input name="name" autoComplete="name" required maxLength={120} /></label>
      <label>Work email<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
      <label>Organization<input name="organization" autoComplete="organization" required maxLength={160} /></label>
      <label>{offer === 'incident' ? 'Service count' : 'Entity count'}<select name="entityCount" required defaultValue=""><option value="" disabled>Select a range</option><option>1–5</option><option>6–25</option><option>26–100</option><option>100+</option></select></label>
      <label className="full-field">What workflow or incident do you want to examine?<textarea name="process" rows={4} required minLength={10} maxLength={1600} placeholder={offer === 'incident' ? 'For example, who decides what to do when a release causes an outage?' : 'For example, keeping officer changes and approval records consistent across entities.'} /></label>
      <label className="full-field check-field"><input name="authority" type="checkbox" value="yes" required /><span>I understand this is a scoping request. It does not authorize filings, signatures, payments or infrastructure changes.</span></label>
      <button className="button" type="submit">Prepare my project brief <span aria-hidden="true">↗</span></button>
    </form>
    <p className="delivery-note">{available ? 'Preparing a brief does not send it. Review it below, then choose whether to send the displayed scope fields to AutoComp.' : 'You can prepare, copy and download a brief here. On-site enquiry sending is currently unavailable; this page does not transmit the information you enter.'} Do not include confidential records, credentials or patient information.</p>
    {brief && <div className="brief-preview" ref={result}><h2>Your {getOffer(offer).name.toLowerCase()} brief.</h2><p>Review the prepared scope. To revise it, update the form and prepare a new brief.</p><label className="sr-only" htmlFor="pilot-brief">Prepared project brief</label><textarea id="pilot-brief" ref={preview} value={brief} readOnly /><div className="brief-actions"><button type="button" className="button button-outline" onClick={copy}>Copy brief</button><button type="button" className="button button-outline" onClick={download}>Download brief</button>{available && prepared && <button type="button" className="button" disabled={busy} onClick={send}>{busy ? 'Sending…' : 'Send scope to AutoComp'} <span aria-hidden="true">↗</span></button>}</div></div>}
    <p className={'form-status' + (failed ? ' is-error' : '')} role="status" aria-live="polite">{status}</p>
  </div>;
}
