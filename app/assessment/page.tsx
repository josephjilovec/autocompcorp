'use client';

import { FormEvent, useState } from 'react';

export default function AssessmentPage() {
  const [status,setStatus] = useState('');
  const [busy,setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setStatus('');
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/assessment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const result = await response.json();
      if(!response.ok) throw new Error(result.error || 'Request failed');
      form.reset(); setStatus('Readiness request received. The next step is source verification and entity-scope confirmation.');
    } catch(error) { setStatus(error instanceof Error ? error.message : 'Unable to submit request.'); }
    finally { setBusy(false); }
  }
  return <main className="assessment"><section><p className="eyebrow">READINESS CHECK</p><h1>What should AutoComp<br/><span>watch first?</span></h1><p>Use this form for operational scope only. Do not submit tax IDs, credentials, privileged legal material, or confidential corporate records.</p></section><form onSubmit={submit}><label>Name<input name="name" required maxLength={120}/></label><label>Work email<input name="email" type="email" required maxLength={160}/></label><label>Organization<input name="organization" required maxLength={160}/></label><label>Entity count<select name="entityCount" required defaultValue=""><option value="" disabled>Select range</option><option>1–5</option><option>6–25</option><option>26–100</option><option>100+</option></select></label><label>Primary need<select name="need" required defaultValue=""><option value="" disabled>Select one</option><option>State filing calendar</option><option>Corporate record maintenance</option><option>Multi-entity compliance operations</option><option>Registered-agent oversight</option><option>Compliance evidence and audit trail</option></select></label><label>Current process<textarea name="process" rows={5} required maxLength={1600}/></label><label className="check"><input type="checkbox" name="authority" value="yes" required/><span>I understand that monitoring and drafting can be automated, while formal filings and legal execution may require an authorized officer, registered agent, or licensed professional.</span></label><button className="button" disabled={busy}>{busy?'Sending…':'Request readiness review'}</button><p role="status" className="status">{status}</p></form></main>;
}
