'use client';

import { useState } from 'react';
import { lifecycle } from '@/lib/brand';

const diagnostics = [
  { score:99, source:'DE registry', event:'source delta received', trace:'SRC-8842 / v4' },
  { score:94, source:'entity scope', event:'obligation candidate', trace:'CLS-4401 / policy 7' },
  { score:96, source:'approved template', event:'draft packet generated', trace:'DOC-2188 / rev 2' },
  { score:100, source:'control policy', event:'human gate asserted', trace:'GATE-0312 / L2' },
  { score:100, source:'evidence chain', event:'decision record sealed', trace:'AUD-9914 / append-only' }
] as const;

export default function LifecycleSimulator(){
  const [active,setActive]=useState(1);
  const item=lifecycle[active];
  const diagnostic=diagnostics[active];
  return <div className="lifecycle-sim">
    <div className="lifecycle-steps">{lifecycle.map((entry,index)=><button key={entry.title} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>setActive(index)} className={active===index?'is-active':''}><b>{String(index+1).padStart(2,'0')}</b><span>{entry.title}</span><small>{entry.output.replace('OUTPUT / ','')}</small></button>)}</div>
    <div className="diagnostic-panel">
      <div className="diag-header"><span>DIAGNOSTIC TERMINAL</span><i>LIVE</i></div>
      <div className="diag-score"><strong>{diagnostic.score}</strong><span>% confidence</span></div>
      <div className="diag-meter"><i style={{width:`${diagnostic.score}%`}}/></div>
      <p>{item.copy}</p>
      <dl><div><dt>source</dt><dd>{diagnostic.source}</dd></div><div><dt>event</dt><dd>{diagnostic.event}</dd></div><div><dt>trace</dt><dd>{diagnostic.trace}</dd></div></dl>
      <div className="diag-wave" aria-hidden="true">{Array.from({length:24}).map((_,index)=><i key={index} style={{height:`${20 + ((index*17 + active*11)%62)}%`}}/>)}</div>
    </div>
  </div>
}
