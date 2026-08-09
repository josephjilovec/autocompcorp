import Image from 'next/image';
import Link from 'next/link';
import OperationsConsole from './components/OperationsConsole';
import { agents, controlRules, lifecycle } from '@/lib/brand';

export const revalidate = 900;

export default function Home() {
  return <main>
    <section className="hero command-hero">
      <Image className="signal-bg" src="/media/autocomp-10-heartbeat-loop.svg" alt="Animated continuous compliance signal" fill unoptimized priority sizes="100vw" />
      <div className="signal-shade"/>
      <div className="hero-copy"><p className="eyebrow">AUTONOMOUS REGTECH / CORPORATE OPERATIONS</p><h1>Compliance operations<br/><span>with a control plane.</span></h1><p>AutoComp Corp continuously monitors obligations, reconciles registry evidence, drafts corporate actions, and escalates what requires an authorized human or professional.</p><div className="hero-actions"><Link className="button" href="/assessment">Run readiness check</Link><a href="#console">Open the console ↓</a></div></div>
      <div className="hero-topology"><Image src="/media/autocomp-03-agent-mesh.svg" alt="AutoComp agent orchestration mesh" fill unoptimized sizes="(max-width: 900px) 90vw, 38vw" /><div className="topology-label"><small>ORCHESTRATION STATE</small><strong>4 specialized agents / permissioned execution</strong></div></div>
    </section>

    <section id="console" className="console-section deferred-section"><div className="section-title"><span>01 / LIVE CONTROL PLANE</span><h2>Switch the system from observation to approval without hiding the handoff.</h2></div><OperationsConsole /></section>

    <section id="system" className="section deferred-section"><div className="section-title"><span>02 / OPERATING LIFECYCLE</span><h2>One operating layer between obligation and execution.</h2></div><div className="system-grid">{lifecycle.map((item,index)=><article key={item.title}><b>{String(index+1).padStart(2,'0')}</b><h3>{item.title}</h3><p>{item.copy}</p><small>{item.output}</small></article>)}</div></section>

    <section className="media-band deferred-section"><div className="media-panel state-panel"><Image src="/media/autocomp-05-state-grid.svg" alt="State registry monitoring grid" fill unoptimized sizes="50vw" /><div><span>STATE REGISTRY COVERAGE</span><strong>Version every source. Never trust stale rules.</strong></div></div><div className="media-panel audit-panel"><Image src="/media/autocomp-07-audit-trail.svg" alt="Immutable compliance audit trail" fill unoptimized sizes="50vw" /><div><span>DECISION RECORD</span><strong>Source → classification → draft → approval.</strong></div></div></section>

    <section id="agents" className="section agents deferred-section"><div className="section-title"><span>03 / AGENT MESH</span><h2>Specialists that disagree before the system acts.</h2></div><div className="agent-layout"><div className="agent-grid">{agents.map((agent)=><article key={agent.name}><div className="agent-code">{agent.code}</div><div><h3>{agent.name}</h3><p>{agent.role}</p><span>{agent.constraint}</span></div></article>)}</div><figure className="topology-art"><Image src="/media/autocomp-09-system-topology.svg" alt="AutoComp compliance system topology" fill unoptimized sizes="42vw" /></figure></div></section>

    <section className="evidence-story deferred-section"><div className="evidence-copy"><span>04 / EVIDENCE & GOVERNANCE</span><h2>Corporate records should show how a decision was made—not just that a file exists.</h2><p>AutoComp links source evidence, rule versions, generated drafts, approvals, and execution events so a human reviewer can reconstruct the operational history.</p></div><div className="evidence-media"><figure><Image src="/media/autocomp-08-board-consent.svg" alt="Board consent and officer approval illustration" fill unoptimized sizes="45vw" /></figure><figure><Image src="/media/autocomp-06-approval-gate.svg" alt="Permissioned execution gate illustration" fill unoptimized sizes="34vw" /></figure></div></section>

    <section id="controls" className="section controls deferred-section"><div className="section-title"><span>05 / CONTROL LEVELS</span><h2>Autonomy has boundaries.</h2></div><div className="control-grid">{controlRules.map((rule)=><article key={rule.title}><span>{rule.level}</span><h3>{rule.title}</h3><p>{rule.copy}</p></article>)}</div></section>

    <section className="cta deferred-section"><div><span>06 / READINESS</span><h2>Map the entity stack before automating it.</h2></div><Link className="button" href="/assessment">Start readiness check</Link></section>
  </main>;
}
