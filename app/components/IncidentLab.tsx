'use client';

import { useState } from 'react';

const scenarios = [
  { id: 'canary', name: 'Failed release', signal: 'A new release shows an error spike.', action: 'Review rollback to the recorded stable release.', outcome: 'Recommendation prepared', detail: 'The exercise asks who can approve a rollback and what evidence would confirm recovery.' },
  { id: 'memory', name: 'Memory pressure', signal: 'A service is approaching its configured memory limit.', action: 'Review the restart runbook and affected dependencies.', outcome: 'Runbook review needed', detail: 'The exercise checks whether the response could create a second outage or hide the underlying cause.' },
  { id: 'node', name: 'Node outage', signal: 'A node is unavailable and workloads need attention.', action: 'Hold evacuation until capacity and protected workloads are reviewed.', outcome: 'Action held for review', detail: 'A blocked action is useful evidence when the prerequisites for safe recovery are missing.' },
] as const;

export default function IncidentLab() {
  const [selected, setSelected] = useState(0);
  const [run, setRun] = useState(false);
  const [fresh, setFresh] = useState(true);
  const scenario = scenarios[selected];
  return <div className="incident-lab">
    <div className="lab-bar"><span><i className="tiny-square" /> Incident Commander</span><span className="demo-tag">Browser illustration · no live connection</span></div>
    <div className="lab-content"><div className="lab-controls"><p className="overline">Choose a rehearsal</p>
      <div className="scenario-options" role="group" aria-label="Incident scenarios">{scenarios.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => { setSelected(index); setRun(false); }}>{item.name}<span aria-hidden="true">↗</span></button>)}</div>
      <label className="freshness-toggle"><input type="checkbox" checked={fresh} onChange={(event) => { setFresh(event.target.checked); setRun(false); }} /> Sample evidence is current</label>
      <button className="button" onClick={() => setRun(true)}>Review this scenario <span aria-hidden="true">↗</span></button>
      <small>Local illustrative output. This is not the private simulation software or a production control panel.</small>
    </div>
    <div className="lab-result" aria-live="polite"><div className="lab-status"><span className="mono">EXERCISE RECORD</span><span className={run && (!fresh || selected === 2) ? 'pill pill-amber' : 'pill'}>{run ? (!fresh ? 'Evidence hold' : scenario.outcome) : 'Ready to review'}</span></div>
      <h3>{!run ? 'Practice the decision before the incident.' : !fresh ? 'Refresh the evidence first.' : scenario.outcome}</h3>
      <dl><div><dt>Observed signal</dt><dd>{scenario.signal}</dd></div><div><dt>Proposed response</dt><dd>{!run ? 'Run the sample to reveal the review.' : !fresh ? 'No response proposed from stale evidence.' : scenario.action}</dd></div><div><dt>Accountable owner</dt><dd>Designated incident lead</dd></div><div><dt>Execution</dt><dd>No infrastructure action executed</dd></div></dl>
      <p>{!run ? 'The sample explains the questions a guided pilot would examine with your team.' : !fresh ? 'A confident-looking recommendation cannot substitute for a current observation.' : scenario.detail}</p>
    </div></div>
  </div>;
}
