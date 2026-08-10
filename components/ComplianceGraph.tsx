'use client';

import { useMemo, useState } from 'react';
import { auditScenarios, type AuditNodeId } from '@/lib/auditEngine';

const nodeOrder: AuditNodeId[] = ['source','normalize','classify','gate','evidence'];

export default function ComplianceGraph(){
  const [scenarioId,setScenarioId] = useState(auditScenarios[0].id);
  const [activeNode,setActiveNode] = useState<AuditNodeId>('classify');
  const scenario = useMemo(()=>auditScenarios.find(item=>item.id===scenarioId) ?? auditScenarios[0],[scenarioId]);
  const node = scenario.nodes.find(item=>item.id===activeNode) ?? scenario.nodes[0];

  return <div className="compliance-graph-shell">
    <div className="graph-toolbar">
      <div><span>LIVE SIMULATION</span><strong>{scenario.entity}</strong><small>{scenario.jurisdiction} · {scenario.event}</small></div>
      <label>Scenario<select value={scenarioId} onChange={event=>{setScenarioId(event.target.value);setActiveNode('classify')}}>{auditScenarios.map(item=><option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
    </div>

    <div className="graph-main">
      <div className="graph-track" aria-label="Compliance pipeline">
        {nodeOrder.map((id,index)=>{
          const item=scenario.nodes.find(entry=>entry.id===id)!;
          return <button key={id} onClick={()=>setActiveNode(id)} onMouseEnter={()=>setActiveNode(id)} className={activeNode===id?'is-active':''}>
            <i>{String(index+1).padStart(2,'0')}</i><span>{item.label}</span><small>{item.status}</small><b>{item.confidence}%</b>
          </button>
        })}
      </div>

      <div className="graph-inspector">
        <div className="inspector-head"><span>{node.label}</span><b>{node.status}</b></div>
        <p>{node.detail}</p>
        <div className="confidence-row"><span>confidence</span><strong>{node.confidence}%</strong><div><i style={{width:`${node.confidence}%`}}/></div></div>
        <dl>
          <div><dt>evidence id</dt><dd>{node.evidence}</dd></div>
          <div><dt>content hash</dt><dd>{node.hash}</dd></div>
          <div><dt>version time</dt><dd>{node.timestamp}</dd></div>
          <div><dt>chain state</dt><dd>{activeNode==='gate'?'HUMAN AUTHORITY':'APPEND ONLY'}</dd></div>
        </dl>
      </div>
    </div>

    <div className="audit-ticker" aria-label="Simulated audit ticker"><span><i/>SOURCE VERIFIED</span><span>NORMALIZED / v4.8.2</span><span>CLASSIFIER / {scenario.confidence}%</span><span>HUMAN GATE / {scenario.nodes[3].status.toUpperCase()}</span><span>AUDIT / {scenario.nodes[4].hash}</span></div>
  </div>
}
