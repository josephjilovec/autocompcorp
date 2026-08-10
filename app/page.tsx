import Image from 'next/image';
import Link from 'next/link';
import OperationsConsole from './components/OperationsConsole';
import ComplianceGraph from '@/components/ComplianceGraph';
import StateRegistryGrid from '@/components/StateRegistryGrid';
import LifecycleSimulator from '@/components/LifecycleSimulator';
import { agents, controlRules } from '@/lib/brand';

export const revalidate = 900;

export default function Home() {
  return <main>
    <section className="hero command-hero">
      <Image className="signal-bg" src="/media/autocomp-10-heartbeat-loop.svg" alt="Animated continuous compliance signal" fill unoptimized priority sizes="100vw" />
      <Image className="hero-texture" src="/media/autocomp-09-system-topology.svg" alt="" fill unoptimized priority sizes="100vw" />
      <div className="hero-atmosphere" aria-hidden="true"/>
      <div className="signal-shade"/>
      <div className="hero-copy"><p className="eyebrow">AUTONOMOUS REGTECH / CORPORATE OPERATIONS</p><h1>Compliance operations<br/><span>with a control plane.</span></h1><p>AutoComp Corp continuously monitors obligations, reconciles registry evidence, drafts corporate actions, and escalates what requires an authorized human or professional.</p><div className="hero-actions"><Link className="button" href="/assessment">Run readiness check</Link><a href="#console">Open the console ↓</a></div><div className="hero-metrics"><span><i/>REGISTRY FEEDS<strong>VERSIONED</strong></span><span>POLICY ENGINE<strong>ACTIVE</strong></span><span>EXECUTION<strong>PERMISSIONED</strong></span></div></div>
      <div className="hero-topology"><Image src="/media/autocomp-03-agent-mesh.svg" alt="AutoComp agent orchestration mesh" fill unoptimized sizes="(max-width: 900px) 90vw, 38vw" /><div className="topology-scan" aria-hidden="true"/><div className="topology-label"><small>ORCHESTRATION STATE</small><strong>4 specialized agents / permissioned execution</strong></div></div>
    </section>

    <section id="console" className="console-section deferred-section"><div className="section-title"><span>01 / LIVE CONTROL PLANE</span><h2>Switch the system from observation to approval without hiding the handoff.</h2></div><OperationsConsole /></section>

    <section id="system" className="section deferred-section"><div className="section-title"><span>02 / OPERATING LIFECYCLE</span><h2>One operating layer between obligation and execution.</h2></div><LifecycleSimulator /></section>

    <section className="registry-section deferred-section"><div className="section-title"><span>STATE / SOURCE COVERAGE</span><h2>Every registry node carries its own version, freshness, and evidence state.</h2></div><StateRegistryGrid /></section>

    <section id="agents" className="section agents deferred-section"><div className="section-title"><span>03 / AGENT MESH</span><h2>Specialists that disagree before the system acts.</h2></div><div className="agent-layout"><div className="agent-grid">{agents.map((agent,index)=><article key={agent.name}>
      <div className={`agent-visual agent-visual-${index+1}`} aria-hidden="true"><i/><i/><i/><span>{agent.code}</span></div>
      <div><h3>{agent.name}</h3><p>{agent.role}</p><span>{agent.constraint}</span></div>
    </article>)}</div><figure className="topology-art"><Image src="/media/autocomp-09-system-topology.svg" alt="AutoComp compliance system topology" fill unoptimized sizes="42vw" /><div className="topology-grid-overlay" aria-hidden="true"/></figure></div></section>

    <section className="evidence-story deferred-section"><div className="evidence-copy"><span>04 / EVIDENCE & GOVERNANCE</span><h2>Corporate records should show how a decision was made—not just that a file exists.</h2><p>AutoComp links source evidence, rule versions, generated drafts, approvals, and execution events so a human reviewer can reconstruct the operational history.</p><div className="evidence-points"><span>APPEND-ONLY EVENT CHAIN</span><span>VERSIONED SOURCE EVIDENCE</span><span>EXPLICIT HUMAN AUTHORITY</span></div></div><div className="evidence-media"><ComplianceGraph /></div></section>

    <section id="controls" className="section controls deferred-section"><div className="section-title"><span>05 / CONTROL LEVELS</span><h2>Autonomy has boundaries.</h2></div><div className="control-grid">{controlRules.map((rule)=><article key={rule.title}><span>{rule.level}</span><h3>{rule.title}</h3><p>{rule.copy}</p><div className="control-pulse" aria-hidden="true"><i/><i/><i/></div></article>)}</div></section>

    <section className="cta deferred-section"><div><span>06 / READINESS</span><h2>Map the entity stack before automating it.</h2><p>Start with entity scope, jurisdiction, source quality, approval authority, and evidence readiness.</p></div><Link className="button" href="/assessment">Start readiness check</Link></section>
  </main>;
}
