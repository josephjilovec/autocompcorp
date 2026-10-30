'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { buildBrief, parseEnquiry, reviewerRoles, segments, trackingMethods, type Enquiry } from '@/lib/enquiry';
import { emailDraftHref, readPublicContact, type PublicContact } from '@/lib/contact';
import { getOffer, incidentOffer, offers, type OfferId } from '@/lib/offers';

export default function AssessmentForm({ initialOffer }: { initialOffer:OfferId }) {
  const [offer,setOffer] = useState<OfferId>(initialOffer);
  const [available,setAvailable] = useState<boolean | null>(null);
  const [contact,setContact] = useState<PublicContact>({});
  const [prepared,setPrepared] = useState<Enquiry | null>(null);
  const [brief,setBrief] = useState('');
  const [status,setStatus] = useState('');
  const [failed,setFailed] = useState(false);
  const [busy,setBusy] = useState(false);
  const preview = useRef<HTMLTextAreaElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const incident = initialOffer === 'incident';
  const choices = incident ? [incidentOffer] : offers;
  const mailHref = contact.email && prepared ? emailDraftHref(contact.email, 'AutoComp — ' + getOffer(offer).name + ' enquiry',brief) : null;
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(),5000);
    fetch('/api/assessment',{ cache:'no-store',signal:controller.signal })
      .then(response => response.ok ? response.json() : { available:false })
      .then(data => { setAvailable(data.available === true); setContact(readPublicContact(data.contact)); })
      .catch(() => setAvailable(false)).finally(() => window.clearTimeout(timeout));
    return () => { controller.abort(); window.clearTimeout(timeout); };
  },[]);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseEnquiry(Object.fromEntries(new FormData(event.currentTarget).entries()));
    if (!parsed.ok) { setFailed(true); setStatus(parsed.error); return; }
    setPrepared(parsed.record); setBrief(buildBrief(parsed.record)); setFailed(false);
    setStatus('Your brief is prepared in this browser. Nothing has been sent.');
    window.requestAnimationFrame(() => { result.current?.scrollIntoView({ block:'start',behavior:'auto' }); preview.current?.focus({ preventScroll:true }); });
  }
  async function copy() {
    try { await navigator.clipboard.writeText(brief); setStatus('Brief copied. Nothing has been sent.'); setFailed(false); }
    catch { preview.current?.focus(); preview.current?.select(); setStatus('Select and copy the brief below. Nothing has been sent.'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([brief],{ type:'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = incident ? 'incident-readiness-brief.txt' : 'autocomp-portfolio-brief.txt'; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url),1000);
    setStatus('Brief downloaded to your device. Nothing has been sent.'); setFailed(false);
  }
  async function send() {
    if (!prepared || !available || busy) return;
    setBusy(true); setStatus('Sending the displayed scope fields…'); setFailed(false);
    try {
      const response = await fetch('/api/assessment',{ method:'POST',headers:{ 'Content-Type':'application/json' },body:JSON.stringify(prepared),signal:AbortSignal.timeout(10000) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Intake did not acknowledge the request.');
      setStatus('Your request was accepted for scoping review.'); setPrepared(null);
    } catch(error) { setFailed(true); setStatus(error instanceof Error ? error.message : 'Unable to confirm delivery. You can still copy or download the brief.'); }
    finally { setBusy(false); }
  }
  const deliveryLabel = available === null ? 'Checking contact options…' : available ? 'Online enquiry sending available' : contact.email ? 'Email enquiry available' : contact.bookingUrl ? 'Scoping calls available' : 'Local brief preparation';
  return <div className="pilot-planner"><div className="planner-heading"><p className="overline">{incident ? 'Incident research enquiry' : 'Your portfolio enquiry'}</p><span>{deliveryLabel}</span></div>
    {(contact.email || contact.bookingUrl) && <div className="planner-contact">{contact.email && <a href={'mailto:' + encodeURIComponent(contact.email)}>{contact.email}</a>}{contact.bookingUrl && <a className="text-link" href={contact.bookingUrl} target="_blank" rel="noopener noreferrer">Book a scoping call <span aria-hidden="true">↗</span></a>}</div>}
    <p className="delivery-note delivery-note-top">{available === null ? 'Checking the available contact options. Preparing a brief stays local.' : available ? 'Prepare and review the brief, then choose Send. Delivery is confirmed only after the intake service accepts the request.' : contact.email ? 'Prepare a brief, then open an email draft. Review and send it from your email app; this page cannot confirm email delivery.' : contact.bookingUrl ? 'Prepare a brief, then book a scoping call using the link above. The booking link does not receive your form fields.' : 'Online enquiries are not connected yet. You can prepare, copy and download a brief, but this page cannot deliver it to AutoComp.'} Do not include confidential corporate records, identification numbers, credentials or health information.</p>
    <form className="planner-form" onSubmit={prepare} onChange={() => { setPrepared(null); setBrief(''); setStatus(''); }}>
      <label className="full-field">Starting offer<select name="offer" value={offer} onChange={event => setOffer(event.target.value as OfferId)}>{choices.map(item => <option value={item.id} key={item.id}>{item.name} — {item.id === 'readiness' ? '' : 'from '}{item.price}</option>)}</select></label>
      <label>Your name<input name="name" autoComplete="name" required maxLength={120} /></label><label>Work email<input name="email" type="email" autoComplete="email" required maxLength={160} /></label><label>Organization<input name="organization" autoComplete="organization" required maxLength={160} /></label>
      <label>{incident ? 'Service count' : 'Total entities managed'}<select name="entityCount" required defaultValue=""><option value="" disabled>Select a range</option><option>1–5</option><option>6–25</option><option>26–100</option><option>100+</option></select></label>
      {!incident && <><label className="full-field">Organization type<select name="segment" required defaultValue=""><option value="" disabled>Select an organization type</option>{segments.map(item => <option key={item}>{item}</option>)}</select></label><label className="full-field">How do you track entity work today?<select name="tracking" required defaultValue=""><option value="" disabled>Select your current process</option>{trackingMethods.map(item => <option key={item}>{item}</option>)}</select></label><label className="full-field">Who would review this work?<select name="reviewerRole" required defaultValue=""><option value="" disabled>Select the reviewer role</option>{reviewerRoles.map(item => <option key={item}>{item}</option>)}</select></label></>}
      <label className="full-field">{incident ? 'What incident workflow would you like to rehearse?' : 'What happens when a corporate change is requested?'}<textarea name="process" rows={4} required minLength={10} maxLength={1200} placeholder={incident ? 'For example, how your team decides whether to roll back a failed release.' : 'For example, officer changes arrive by email, approval is hard to track and the final register update is unclear.'} /></label>
      <label className="sr-only" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="full-field check-field"><input name="authority" type="checkbox" value="yes" required /><span>I understand this is a scoping enquiry. It does not authorize appointments, filings, signatures, payments or infrastructure changes.</span></label><button className="button" type="submit">Prepare my project brief <span aria-hidden="true">↗</span></button>
    </form>

    {brief && <div className="brief-preview" ref={result}><h2>Your {getOffer(offer).name.toLowerCase()} brief.</h2><p>Review the scope. To revise it, update the form and prepare a new brief.</p><label className="sr-only" htmlFor="pilot-brief">Prepared project brief</label><textarea id="pilot-brief" ref={preview} value={brief} readOnly /><div className="brief-actions"><button type="button" className="button button-outline" onClick={copy}>Copy brief</button><button type="button" className="button button-outline" onClick={download}>Download brief</button>{mailHref && <a className="button button-outline" href={mailHref}>Open email draft <span aria-hidden="true">↗</span></a>}{available && prepared && <button type="button" className="button" disabled={busy} onClick={send}>{busy ? 'Sending…' : 'Send scope to AutoComp'} <span aria-hidden="true">↗</span></button>}</div>{mailHref && <p className="email-handoff-note">Opens your email app. Review and send there. Use Copy brief if your email app cannot open a long draft.</p>}</div>}
    <p className={'form-status' + (failed ? ' is-error' : '')} role="status" aria-live="polite">{status}</p>
  </div>;
}
