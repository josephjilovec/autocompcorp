'use client';

import { useEffect, useMemo, useState } from 'react';

const evidenceEvents = [
  { source: 'AWS IAM', control: 'CC6.1', detail: 'Privileged-role inventory reconciled', status: 'Verified' },
  { source: 'Okta', control: 'CC6.2', detail: 'MFA enforcement evidence refreshed', status: 'Captured' },
  { source: 'GitHub', control: 'CC8.1', detail: 'Branch-protection state recorded', status: 'Verified' },
  { source: 'HRIS', control: 'A.6.1', detail: 'Access-review roster synchronized', status: 'Captured' },
  { source: 'Endpoint Fleet', control: 'A.8.1', detail: 'Encryption posture snapshot stored', status: 'Verified' },
  { source: 'Vendor Register', control: 'CC9.2', detail: 'Critical vendor review packet updated', status: 'Review' },
  { source: 'Policy Library', control: 'A.5.1', detail: 'Security policy version hash matched', status: 'Verified' },
];

const frameworkBase = [
  { name: 'SOC 2', score: 94, controls: '72 / 76', note: '4 controls need review' },
  { name: 'HIPAA', score: 89, controls: '53 / 59', note: '6 safeguards in progress' },
  { name: 'ISO 27001', score: 92, controls: '86 / 93', note: '7 controls collecting evidence' },
];

export default function LiveAuditDashboard() {
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 2400);
    return () => window.clearInterval(timer);
  }, [paused]);

  const stream = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const eventIndex = (tick - index + evidenceEvents.length * 20) % evidenceEvents.length;
      return evidenceEvents[eventIndex];
    });
  }, [tick]);

  return (
    <div className="audit-dashboard" aria-label="Interactive AutoComp audit dashboard preview">
      <div className="audit-topbar">
        <div>
          <span className="audit-kicker">AUTOCOMP CONTROL CENTER</span>
          <strong>Continuous Audit Workspace</strong>
        </div>
        <div className="audit-live-state"><i />Evidence stream {paused ? 'paused' : 'live'}</div>
        <button type="button" onClick={() => setPaused((value) => !value)}>{paused ? 'Resume stream' : 'Pause stream'}</button>
      </div>

      <div className="audit-grid">
        <aside className="audit-sidebar" aria-label="Audit dashboard navigation">
          <span className="active">Overview</span>
          <span>Evidence</span>
          <span>Controls</span>
          <span>Audits</span>
          <span>Exceptions</span>
          <span>Approvals</span>
        </aside>

        <div className="audit-main">
          <div className="audit-summary-row">
            <article><span>Evidence objects</span><strong>{(12842 + tick * 3).toLocaleString()}</strong><small>+{18 + (tick % 7)} today</small></article>
            <article><span>Automated tests</span><strong>187</strong><small>181 passing</small></article>
            <article><span>Open exceptions</span><strong>11</strong><small>3 require human review</small></article>
            <article><span>Audit log</span><strong>100%</strong><small>append-only capture</small></article>
          </div>

          <div className="framework-row">
            {frameworkBase.map((framework, index) => {
              const score = Math.min(99, framework.score + ((tick + index) % 3 === 0 ? 1 : 0));
              return <article key={framework.name}>
                <div className="framework-heading"><strong>{framework.name}</strong><span>{score}%</span></div>
                <div className="framework-bar"><i style={{ width: `${score}%` }} /></div>
                <div className="framework-meta"><span>{framework.controls} mapped</span><small>{framework.note}</small></div>
              </article>;
            })}
          </div>

          <div className="audit-lower-grid">
            <section className="evidence-stream-card">
              <div className="audit-card-heading"><div><span>REAL-TIME EVIDENCE</span><strong>Evidence ingestion</strong></div><small>{paused ? 'STREAM PAUSED' : 'STREAMING'}</small></div>
              <div className="evidence-stream-list">
                {stream.map((event, index) => <div className={index === 0 && !paused ? 'fresh' : ''} key={`${tick}-${index}-${event.source}`}>
                  <i />
                  <span><strong>{event.source}</strong><small>{event.detail}</small></span>
                  <code>{event.control}</code>
                  <b className={event.status === 'Review' ? 'review' : ''}>{event.status}</b>
                </div>)}
              </div>
            </section>

            <section className="audit-log-card">
              <div className="audit-card-heading"><div><span>AUDIT TRAIL</span><strong>Recent system events</strong></div><small>IMMUTABLE</small></div>
              <div className="audit-log-list">
                <p><time>10:{String(22 + (tick % 30)).padStart(2, '0')}:14</time><span>Evidence hash sealed</span></p>
                <p><time>10:{String(21 + (tick % 30)).padStart(2, '0')}:48</time><span>Control test completed</span></p>
                <p><time>10:{String(20 + (tick % 30)).padStart(2, '0')}:31</time><span>Reviewer queue updated</span></p>
                <p><time>10:{String(19 + (tick % 30)).padStart(2, '0')}:06</time><span>Source snapshot versioned</span></p>
              </div>
              <div className="audit-integrity"><span>CHAIN INTEGRITY</span><strong>Verified</strong><small>All displayed events are part of this interactive product mockup.</small></div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
