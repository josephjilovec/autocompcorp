'use client';

import Image from 'next/image';
import { useState } from 'react';

const modes = [
  { id: 'observe', label: 'Observe', image: '/media/autocomp-01-registry-grid.svg', title: 'Registry Sentinel', body: 'Watch source changes, due dates, status shifts, and evidence without turning every signal into an automatic action.', metric: 'SOURCE STATE / VERSIONED' },
  { id: 'classify', label: 'Classify', image: '/media/autocomp-04-risk-wave.svg', title: 'Risk Classifier', body: 'Separate routine obligations from ambiguous or consequential events and attach the correct review level.', metric: 'RISK LAYER / ACTIVE' },
  { id: 'draft', label: 'Draft', image: '/media/autocomp-02-document-scan.svg', title: 'Records Steward', body: 'Prepare minutes, resolutions, consents, checklists, and evidence packages without silently executing them.', metric: 'DRAFT STATE / CONTROLLED' },
  { id: 'approve', label: 'Approve', image: '/media/autocomp-06-approval-gate.svg', title: 'Execution Gate', body: 'Require the right officer, registered agent, or professional review before consequential work leaves the system.', metric: 'AUTHORIZATION / REQUIRED' }
] as const;

export default function OperationsConsole() {
  const [active, setActive] = useState<(typeof modes)[number]['id']>('observe');
  const mode = modes.find((item) => item.id === active) ?? modes[0];
  return <div className="ops-console">
    <div className="ops-tabs" role="tablist" aria-label="AutoComp operating modes">{modes.map((item)=><button key={item.id} role="tab" aria-selected={active===item.id} onClick={()=>setActive(item.id)}>{item.label}</button>)}</div>
    <div className="ops-view">
      <div className="ops-media"><Image src={mode.image} alt="" fill unoptimized sizes="(max-width: 900px) 100vw, 55vw" /></div>
      <div className="ops-copy"><span>{mode.metric}</span><h3>{mode.title}</h3><p>{mode.body}</p><div className="ops-status"><i/>Human authority stays explicit</div></div>
    </div>
  </div>;
}
