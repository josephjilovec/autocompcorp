'use client';

import { useRef, useState } from 'react';

const examples = [
  {
    id: 'entity', label: 'Corporate records', title: 'Officer appointment review',
    entity: 'Northline Group · fictional entity', code: 'RECORD / NR-042',
    summary: 'A proposed officer change needs the current record, a named reviewer and evidence of the final decision.',
    source: 'Current officer register', artifact: 'Appointment review packet',
    reviewer: 'Authorized company officer', receipt: 'Reviewed record update',
    rows: [['Source record', 'Version available'], ['Draft packet', 'Prepared for review'], ['Officer approval', 'Not yet recorded']],
  },
  {
    id: 'control', label: 'Control evidence', title: 'Quarterly access review',
    entity: 'Northline Group · fictional control', code: 'CONTROL / AC-018',
    summary: 'An access list becomes useful evidence when its date, scope, reviewer and follow-up are clear.',
    source: 'Dated access inventory', artifact: 'Access review worksheet',
    reviewer: 'Named control owner', receipt: 'Review decision and exceptions',
    rows: [['Inventory date', 'Source attached'], ['Review scope', 'Owner assigned'], ['Exceptions', 'Awaiting decision']],
  },
  {
    id: 'incident', label: 'Incident readiness', title: 'Service recovery rehearsal',
    entity: 'Northline Group · fictional exercise', code: 'EXERCISE / IR-007',
    summary: 'A rehearsal should show what was observed, why a response was proposed and who owns the next decision.',
    source: 'Synthetic incident snapshot', artifact: 'Runbook review record',
    reviewer: 'Incident exercise lead', receipt: 'Observed simulation outcome',
    rows: [['Environment', 'Simulation only'], ['Response', 'Recommendation prepared'], ['Next decision', 'Reviewer required']],
  },
] as const;

export default function EvidenceWorkspace() {
  const [selected, setSelected] = useState(0);
  const [stale, setStale] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const example = examples[selected];
  function choose(index: number) { setSelected(index); setStale(false); }
  function move(event: React.KeyboardEvent, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % examples.length;
    else if (event.key === 'ArrowLeft') next = (index + examples.length - 1) % examples.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = examples.length - 1;
    else return;
    event.preventDefault(); choose(next); buttons.current[next]?.focus();
  }
  return <div className="evidence-workspace">
    <div className="workspace-top"><span><i className="tiny-square" /> AutoComp / Evidence workspace</span><span className="demo-tag">Interactive illustration</span></div>
    <div className="workspace-tabs" role="tablist" aria-label="Example evidence workflows">
      {examples.map((item, index) => <button key={item.id} role="tab" id={'workflow-tab-' + item.id} aria-controls="workflow-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} ref={(element) => { buttons.current[index] = element; }} onClick={() => choose(index)} onKeyDown={(event) => move(event, index)}>{item.label}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div id="workflow-panel" role="tabpanel" aria-labelledby={'workflow-tab-' + example.id} className="workspace-body">
      <div className="record-main">
        <div className="record-title"><span className="mono">{example.code}</span><span className={stale ? 'pill pill-red' : 'pill pill-amber'}>{stale ? 'Source needs refresh' : 'Review required'}</span></div>
        <h3>{example.title}</h3><p className="record-entity">{example.entity}</p><p className="record-summary">{example.summary}</p>
        <div className="record-rows">{example.rows.map(([label, value], rowIndex) => <div key={label}><span>{label}</span><strong>{rowIndex === 0 && stale ? 'Out of date' : value}</strong></div>)}</div>
        <div className={'record-decision' + (stale ? ' decision-held' : '')} role="status" aria-live="polite"><span aria-hidden="true">{stale ? '!' : '↗'}</span><div><strong>{stale ? 'Hold the handoff.' : 'A complete record still needs a decision.'}</strong><p>{stale ? 'Refresh the source before the reviewer relies on this packet. A file being present does not make it current.' : 'A prepared draft is not an approval. The designated reviewer remains responsible for the decision.'}</p></div></div>
        <button className="text-button" aria-pressed={stale} onClick={() => setStale(!stale)}>{stale ? 'Restore the sample source' : 'See what happens when the source is stale'} <span aria-hidden="true">↗</span></button>
      </div>
      <aside className="record-aside"><p className="overline">The record behind the status</p>
        <dl><div><dt>Source</dt><dd>{example.source}</dd></div><div><dt>Working artifact</dt><dd>{example.artifact}</dd></div><div><dt>Decision owner</dt><dd>{example.reviewer}</dd></div><div><dt>Completion evidence</dt><dd>{example.receipt}</dd></div></dl>
        <div className="sample-stamp"><svg viewBox="0 0 34 34" aria-hidden="true"><path d="M7 3h13l7 7v21H7zM20 3v8h7M12 18h10M12 23h7" /></svg><span>Traceable work.<br /><strong>Accountable decisions.</strong></span></div>
      </aside>
    </div>
    <p className="workspace-footnote">Fictional records and illustrative behavior. This preview does not connect to registries, certify compliance, submit filings or change infrastructure.</p>
  </div>;
}
