'use client';

import { useState } from 'react';

const steps = [
  {
    id: 'capture',
    number: '01',
    actor: 'AUTONOMOUS AGENT',
    title: 'Capture evidence',
    body: 'Connectors observe approved systems and store source-stamped evidence with timestamps, hashes, and provenance.',
    state: 'Automatic',
    risk: 'Read-only',
  },
  {
    id: 'classify',
    number: '02',
    actor: 'AUTONOMOUS AGENT',
    title: 'Map evidence to controls',
    body: 'AutoComp maps new evidence to relevant controls, flags gaps, and scores uncertainty before proposing an action.',
    state: 'Automatic',
    risk: 'Explainable',
  },
  {
    id: 'review',
    number: '03',
    actor: 'HUMAN CONTROL GATE',
    title: 'Review consequential decisions',
    body: 'A designated officer, compliance lead, or qualified professional reviews exceptions, signatures, filings, and material policy decisions.',
    state: 'Human required',
    risk: 'Consequential',
  },
  {
    id: 'execute',
    number: '04',
    actor: 'PERMISSIONED EXECUTION',
    title: 'Execute and preserve receipt',
    body: 'Only approved actions move forward. The approval identity, rule version, evidence package, and execution receipt remain attached to the audit trail.',
    state: 'Permissioned',
    risk: 'Auditable',
  },
];

export default function HumanWorkflowVisualizer() {
  const [active, setActive] = useState(2);
  const step = steps[active];

  return (
    <div className="hitl-visualizer">
      <div className="hitl-flow" role="tablist" aria-label="Human-in-the-loop compliance workflow">
        {steps.map((item, index) => <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={active === index}
          className={`${active === index ? 'active ' : ''}${item.id === 'review' ? 'human-step' : ''}`}
          onClick={() => setActive(index)}
        >
          <span>{item.number}</span>
          <i aria-hidden="true" />
          <div><small>{item.actor}</small><strong>{item.title}</strong></div>
        </button>)}
      </div>

      <div className="hitl-detail" role="tabpanel">
        <div className="hitl-detail-head">
          <div><span>{step.actor}</span><h3>{step.title}</h3></div>
          <b className={step.state === 'Human required' ? 'human-badge' : ''}>{step.state}</b>
        </div>
        <p>{step.body}</p>
        <div className="hitl-detail-grid">
          <div><small>CONTROL MODE</small><strong>{step.state}</strong></div>
          <div><small>DECISION PROFILE</small><strong>{step.risk}</strong></div>
          <div><small>TRACEABILITY</small><strong>Source + rule + reviewer</strong></div>
        </div>
        <div className="signature-gate">
          <span className="signature-icon">✓</span>
          <div><strong>Human signature authority stays outside the agent.</strong><small>AutoComp can prepare, route, and record. It does not silently assume officer or professional authority.</small></div>
        </div>
      </div>
    </div>
  );
}
