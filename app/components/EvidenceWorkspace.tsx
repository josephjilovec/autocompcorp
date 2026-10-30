'use client';

import { useRef, useState } from 'react';
import { advancePreview, hasCurrentApproval, initialPreview, isPreviewComplete, previewRecord, previewStatus, type ActionPreview, type PreviewAction } from '@/lib/action-preview';

const entities = [
  { id: 'northline-holdings', name: 'Northline Holdings LLC', short: 'Holdings', officer: 'Morgan Lee', role: 'Treasurer', code: 'NC-042' },
  { id: 'northline-property', name: 'Northline Property LLC', short: 'Property', officer: 'Casey Reed', role: 'Secretary', code: 'NC-043' },
  { id: 'northline-services', name: 'Northline Services Inc.', short: 'Services', officer: 'Taylor Chen', role: 'Treasurer', code: 'NC-044' },
] as const;
const stages = ['Request', 'Sources', 'Review packet', 'Approval', 'Completion'] as const;

export default function EvidenceWorkspace() {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState(0);
  const [cases, setCases] = useState<Record<string, ActionPreview>>(() => Object.fromEntries(entities.map(entity => [entity.id, initialPreview(entity.id)])));
  const [wrongReceipt, setWrongReceipt] = useState(false);
  const [notice, setNotice] = useState('');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const entity = entities[selected];
  const record = cases[entity.id];
  const complete = isPreviewComplete(record);
  const approved = hasCurrentApproval(record);
  const packetCurrent = record.packet?.revision === record.revision && record.packet.entityId === record.entityId && record.sourceCurrent;
  function act(action: PreviewAction, message: string) {
    setCases(previous => ({ ...previous, [entity.id]: advancePreview(previous[entity.id], action) }));
    setNotice(message);
  }
  function next(index: number) { setStage(index); tabs.current[index]?.focus(); }
  function move(event: React.KeyboardEvent, index: number) {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % stages.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index + stages.length - 1) % stages.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = stages.length - 1;
    else return;
    event.preventDefault(); next(nextIndex);
  }
  function download() {
    const url = URL.createObjectURL(new Blob([previewRecord(record, entity.name)], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'autocomp-fictional-officer-change.txt'; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Fictional example downloaded. No corporate action occurred.');
  }
  return <div className="entity-demo">
    <div className="entity-demo-bar"><span><i className="tiny-square" /> AutoComp / Portfolio workspace</span><span className="demo-tag">Interactive example · fictional records</span></div>
    <div className="entity-demo-grid">
      <aside className="portfolio-rail"><p className="overline">Sample portfolio</p><p className="portfolio-caption">Three entities.<br />Separate records.</p><div role="group" aria-label="Fictional portfolio entities">{entities.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => { setSelected(index); setStage(0); setWrongReceipt(false); setNotice(''); }}><span className="entity-initial" aria-hidden="true">{item.short.slice(0,1)}</span><span><strong>{item.short}</strong><small>{previewStatus(cases[item.id])}</small></span><span aria-hidden="true">↗</span></button>)}</div><p className="rail-note">Choose an entity. Work on its sample officer change. Each entity keeps its own review state.</p></aside>
      <div className="entity-case">
        <div className="entity-case-heading"><div><p className="mono">OFFICER CHANGE / {entity.code}</p><h3>{entity.name}</h3><p>Proposed appointment: {entity.officer}, {entity.role.toLowerCase()}.</p></div><span className={'pill ' + (complete ? 'pill-green' : 'pill-amber')}>{previewStatus(record)}</span></div>
        <div className="action-tabs" role="tablist" aria-label="Officer-change workflow">{stages.map((label,index) => <button key={label} ref={element => { tabs.current[index] = element; }} id={'action-tab-' + index} role="tab" aria-selected={stage === index} aria-controls="action-panel" tabIndex={stage === index ? 0 : -1} onClick={() => setStage(index)} onKeyDown={event => move(event,index)}>{label}</button>)}</div>
        <div id="action-panel" role="tabpanel" aria-labelledby={'action-tab-' + stage} className="action-panel">
          {stage === 0 && <><p className="overline">Start with the proposed change</p><h4>One request, tied to one entity.</h4><p>A portfolio operator wants to record a proposed officer appointment. This is an internal record-review exercise; actual requirements depend on the entity and its governing documents.</p><dl className="action-facts"><div><dt>Entity</dt><dd>{entity.name}</dd></div><div><dt>Proposed officer</dt><dd>{entity.officer} · {entity.role}</dd></div><div><dt>Workflow owner</dt><dd>Customer portfolio operations</dd></div><div><dt>Current case revision</dt><dd>v{record.revision} · illustrative</dd></div></dl><button className="button button-outline" onClick={() => next(1)}>Inspect the sample sources <span aria-hidden="true">↗</span></button></>}
          {stage === 1 && <><p className="overline">The record behind the request</p><h4>Check the source before drafting.</h4><p>This example relies on a fictional officer register and a governing-document extract. A file being present does not make it current.</p><div className="source-list"><div><span>Officer register</span><strong>{record.sourceCurrent ? 'Current sample' : 'Refresh required'}</strong></div><div><span>Governing-document extract</span><strong>Fictional review input</strong></div></div><label className="demo-check"><input type="checkbox" checked={record.sourceCurrent} onChange={event => act({ type:'source', current:event.target.checked }, event.target.checked ? 'Source marked current in the sample. Prepare a new review packet.' : 'The source is stale. Any prior packet, approval and completion evidence are cleared.')} /> Use current sample sources</label><div className="action-buttons"><button className="button button-outline" onClick={() => act({ type:'change-source' }, 'The source changed. Earlier review evidence no longer closes this revision.')}>Simulate a source change</button><button className="text-button" onClick={() => next(2)}>Review the packet <span aria-hidden="true">↗</span></button></div></>}
          {stage === 2 && <><p className="overline">Prepare for a person to decide</p><h4>A packet carries its source and version.</h4><p>The sample packet connects the entity, proposed appointment, source references and review questions. Preparing it does not appoint an officer or authorize a filing.</p><div className="action-callout"><strong>{packetCurrent ? 'Review packet v' + record.revision + ' prepared.' : !record.sourceCurrent ? 'Source refresh required.' : 'A current packet has not been prepared.'}</strong><p>{packetCurrent ? 'The packet is tied to this entity and case revision. An authorized customer reviewer still needs to decide.' : 'Missing or stale inputs keep the handoff open.'}</p></div><div className="action-buttons"><button className="button" disabled={!record.sourceCurrent} onClick={() => act({ type:'prepare' }, 'A fictional review packet is prepared. No approval or external action occurred.')}>{packetCurrent ? 'Prepare again' : 'Prepare sample packet'} <span aria-hidden="true">↗</span></button><button className="text-button" onClick={() => next(3)}>Open the approval record <span aria-hidden="true">↗</span></button></div></>}
          {stage === 3 && <><p className="overline">Authority stays with people</p><h4>The reviewer approves an exact packet.</h4><p>An approval belongs to this entity and this version. Changing the source, requesting a revision or removing the reviewer’s authority clears the dependent approval.</p><label className="demo-check"><input type="checkbox" checked={record.reviewerAuthorized} onChange={event => act({ type:'authority', authorized:event.target.checked }, event.target.checked ? 'Sample reviewer authority selected. This is not real identity or authority verification.' : 'Reviewer authority removed. Prior approval and completion evidence are cleared.')} /> Customer reviewer has authority for this entity and action · sample</label><div className="action-callout"><strong>{approved ? 'Sample packet v' + record.revision + ' approved.' : 'Customer decision outstanding.'}</strong><p>{!packetCurrent ? 'Prepare a current packet before a reviewer can approve it.' : !record.reviewerAuthorized ? 'Identify the authorized customer reviewer before recording a decision.' : 'The sample is ready for a reviewer decision.'}</p></div><div className="action-buttons"><button className="button" disabled={!packetCurrent || !record.reviewerAuthorized} onClick={() => act({ type:'approve' }, 'Sample approval recorded for this entity and packet version. No real signature occurred.')}>Approve sample packet</button><button className="button button-outline" disabled={!packetCurrent} onClick={() => act({ type:'revise' }, 'Revision requested. Prepare and review a fresh packet before continuing.')}>Request revision</button><button className="text-button" onClick={() => next(4)}>Check completion evidence <span aria-hidden="true">↗</span></button></div></>}
          {stage === 4 && <><p className="overline">Close the record with evidence</p><h4>{complete ? 'The sample record is complete.' : 'An approval is part of the record.'}</h4><p>Completion evidence must match the entity and approved version. A missing or unrelated record leaves the case open.</p><label className="demo-check"><input type="checkbox" checked={wrongReceipt} onChange={event => { setWrongReceipt(event.target.checked); setNotice('Check the selected sample evidence to update the completion record.'); }} /> Use completion evidence for a different entity</label><div className={'action-callout' + (complete ? ' action-complete' : '')}><strong>{complete ? 'Matched synthetic completion record.' : record.receipt && approved ? 'Entity mismatch. Keep the case open.' : 'No matched completion record yet.'}</strong><p>{complete ? 'The example closes an internal evidence record. It does not verify a real appointment, compliance status or government filing.' : !approved ? 'A current, authorized sample approval is needed first.' : 'Check the evidence and preserve any mismatch as an exception.'}</p></div><div className="action-buttons"><button className="button" disabled={!approved} onClick={() => act({ type:'receipt', entityId:wrongReceipt ? 'different-example-entity' : entity.id }, wrongReceipt ? 'Evidence belongs to a different entity. Completion is held.' : 'Completion evidence matches the sample entity and approved version.')}>Check sample completion</button><button className="text-button" onClick={download}>Download sample record <span aria-hidden="true">↓</span></button></div></>}
        </div>
        <div className="action-demo-footer"><p role="status" aria-live="polite">{notice || 'Explore a complete officer-change example. Nothing is sent, signed or filed.'}</p><button className="text-button" onClick={() => { act({ type:'reset' }, 'This entity’s example has been reset.'); setStage(0); setWrongReceipt(false); }}>Reset this example</button></div>
      </div>
    </div>
    <p className="workspace-footnote">Fictional companies, people and records. This browser illustration is separate from the private operations engine. It has no registry connection, authentication, customer documents or filing capability.</p>
  </div>;
}
