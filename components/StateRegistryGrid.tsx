'use client';

import { useState } from 'react';
import { registryStates } from '@/lib/auditEngine';

export default function StateRegistryGrid(){
  const [active,setActive] = useState(registryStates[0].code);
  return <div className="registry-monitor">
    <div className="registry-head"><div><span>STATE REGISTRY MONITOR</span><strong>Six source nodes / versioned evidence</strong></div><small>SIMULATED CONTROL PLANE</small></div>
    <div className="registry-grid">{registryStates.map(state=><button key={state.code} onMouseEnter={()=>setActive(state.code)} onFocus={()=>setActive(state.code)} onClick={()=>setActive(state.code)} className={`registry-card ${state.flagClass} ${active===state.code?'is-active':''}`}>
      <div className="flag-watermark" aria-hidden="true"/>
      <div className="registry-mask"/>
      <div className="registry-copy"><div><b>{state.code}</b><span>{state.name}</span></div><p>{state.source}</p><dl><div><dt>version</dt><dd>{state.version}</dd></div><div><dt>fresh</dt><dd>{state.freshness}</dd></div><div><dt>events</dt><dd>{state.events}</dd></div></dl><small className={`registry-status ${state.status}`}><i/>{state.status}</small></div>
    </button>)}</div>
  </div>
}
