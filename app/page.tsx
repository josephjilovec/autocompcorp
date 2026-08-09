import Link from 'next/link';
import { agents, controlRules, lifecycle } from '@/lib/brand';

export default function Home() {
  return <main>
    <section className="hero"><div className="scan"/><div className="hero-copy"><p className="eyebrow">AUTONOMOUS REGTECH / CORPORATE OPERATIONS</p><h1>Compliance that keeps moving<br/><span>when your team sleeps.</span></h1><p>AutoComp Corp continuously monitors obligations, reconciles registry evidence, drafts corporate actions, and escalates what requires an authorized human or professional.</p><div className="hero-actions"><Link className="button" href="/assessment">Run readiness check</Link><a href="#system">Inspect the system ↓</a></div></div><div className="telemetry"><div><small>SYSTEM STATE</small><strong>MONITORING</strong></div><div><small>REGISTRY SOURCES</small><strong>VERSIONED</strong></div><div><small>EXECUTION MODE</small><strong>PERMISSIONED</strong></div><i/></div></section>

    <section id="system" className="section"><div className="section-title"><span>01 / SYSTEM</span><h2>One operating layer between obligations and execution.</h2></div><div className="system-grid">{lifecycle.map((item,index)=><article key={item.title}><b>{String(index+1).padStart(2,'0')}</b><h3>{item.title}</h3><p>{item.copy}</p><small>{item.output}</small></article>)}</div></section>

    <section id="agents" className="section agents"><div className="section-title"><span>02 / AGENT MESH</span><h2>Specialists that disagree before the system acts.</h2></div><div className="agent-terminal"><div className="terminal-head"><span>AUTOCOMP / LIVE ORCHESTRATION</span><i>● online</i></div><div className="agent-grid">{agents.map((agent)=><article key={agent.name}><div className="agent-code">{agent.code}</div><div><h3>{agent.name}</h3><p>{agent.role}</p><span>{agent.constraint}</span></div></article>)}</div></div></section>

    <section className="section matrix"><div className="section-title"><span>03 / EVIDENCE GRAPH</span><h2>Every obligation gets a source, state, owner, and proof trail.</h2></div><div className="matrix-frame"><div className="matrix-row head"><span>Obligation</span><span>Source</span><span>State</span><span>Next action</span></div>{[['Annual report','State registry','MONITORED','Reconcile due date'],['Board consent','Corporate record','DRAFT READY','Officer approval'],['Registered agent','Provider evidence','VERIFIED','Renewal watch'],['Foreign qualification','Jurisdiction map','REVIEW','Counsel classification']].map((row)=><div className="matrix-row" key={row[0]}>{row.map((cell)=><span key={cell}>{cell}</span>)}</div>)}</div></section>

    <section id="controls" className="section controls"><div className="section-title"><span>04 / CONTROL PLANE</span><h2>Autonomy has boundaries.</h2></div><div className="control-grid">{controlRules.map((rule)=><article key={rule.title}><span>{rule.level}</span><h3>{rule.title}</h3><p>{rule.copy}</p></article>)}</div></section>

    <section className="cta"><div><span>05 / READINESS</span><h2>Map the entity stack before automating it.</h2></div><Link className="button" href="/assessment">Start readiness check</Link></section>
  </main>;
}
