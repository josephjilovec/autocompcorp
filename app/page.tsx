import Image from 'next/image';
import Link from 'next/link';
import OperationsConsole from './components/OperationsConsole';
import LiveAuditDashboard from './components/LiveAuditDashboard';
import HumanWorkflowVisualizer from './components/HumanWorkflowVisualizer';
import ComplianceROICalculator from './components/ComplianceROICalculator';
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
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="signal-shade" />
      <div className="hero-copy">
        <p className="eyebrow">AUTOCOMP CORP / AUTONOMOUS COMPLIANCE OPERATIONS &amp; EVIDENCE CAPTURE</p>
        <h1>Audit readiness that updates itself.<br /><span>Authority stays human.</span></h1>
        <p>AutoComp continuously captures control evidence, maps it to compliance requirements, records an explainable audit trail, and routes consequential decisions to the right human reviewer across SOC 2, HIPAA, ISO 27001, and evolving internal control programs.</p>
        <div className="hero-actions"><a className="button" href="#dashboard">Explore the live dashboard</a><Link href="/assessment">Run readiness check →</Link></div>
        <div className="hero-metrics"><span><i />EVIDENCE CAPTURE<strong>CONTINUOUS</strong></span><span><i />CONTROL MAPPING<strong>TRACEABLE</strong></span><span><i />EXECUTION<strong>HUMAN-GATED</strong></span></div>
      </div>
      <div className="hero-topology"><Image src="/media/autocomp-03-agent-mesh.svg" alt="AutoComp agent orchestration mesh" fill unoptimized sizes="(max-width: 900px) 90vw, 38vw" /><div className="topology-scan" aria-hidden="true" /><div className="topology-label"><small>COMPLIANCE OPERATING STATE</small><strong>Continuous evidence / human-controlled execution</strong></div></div>
    </section>

    <section className="product-proof-strip" aria-label="AutoComp platform capabilities"><div className="product-proof-inner"><span>DESIGNED FOR AUDITABLE CONTROL ENVIRONMENTS</span><div className="product-proof-items"><span><i />SOC 2</span><span><i />HIPAA</span><span><i />ISO 27001</span><span>Evidence provenance</span><span>Human approval gates</span></div></div></section>

    <section id="dashboard" className="regtech-section dark">
      <div className="regtech-heading"><div><span className="regtech-eyebrow">01 / LIVE AUDIT DASHBOARD</span></div><div><h2>See evidence arrive before the auditor asks for it.</h2><p>An interactive product preview of continuous evidence capture, framework posture, exception queues, and append-only audit logging. The data shown below is a simulated AutoComp workspace—not a claim about a live customer environment.</p></div></div>
      <LiveAuditDashboard />
    </section>

    <section id="workflow" className="regtech-section alt">
      <div className="regtech-heading"><div><span className="regtech-eyebrow">02 / HUMAN-IN-THE-LOOP CONTROL</span></div><div><h2>Autonomous evidence work. Explicit human authority.</h2><p>AutoComp can observe, reconcile, classify, draft, and route. Signatures, filings, material exceptions, and other consequential actions remain permissioned so the audit trail shows exactly where machine work ended and accountable human judgment began.</p></div></div>
      <HumanWorkflowVisualizer />
    </section>

    <section id="roi" className="regtech-section">
      <div className="regtech-heading"><div><span className="regtech-eyebrow">03 / COMPLIANCE ROI MODEL</span></div><div><h2>Estimate how much audit preparation can move out of spreadsheets and inboxes.</h2><p>Adjust organization size and target frameworks to model the workload that can potentially be reclaimed through automated evidence collection, reconciliation, and audit preparation. The calculator states its assumptions so the estimate stays transparent.</p></div></div>
      <ComplianceROICalculator />
    </section>

    <section id="console" className="console-section deferred-section"><div className="section-title"><span>04 / CONTROL PLANE</span><h2>Switch the system from observation to approval without hiding the handoff.</h2></div><OperationsConsole /></section>

    <section id="system" className="section deferred-section"><div className="section-title"><span>05 / OPERATING LIFECYCLE</span><h2>One operating layer between obligation and execution.</h2></div><LifecycleSimulator /></section>

    <section className="registry-section deferred-section"><div className="section-title"><span>STATE / SOURCE COVERAGE</span><h2>Every registry node carries its own version, freshness, and evidence state.</h2></div><StateRegistryGrid /></section>

    <section id="agents" className="section agents deferred-section"><div className="section-title"><span>06 / AGENT MESH</span><h2>Specialists that disagree before the system acts.</h2></div><div className="agent-layout"><div className="agent-grid">{agents.map((agent, index) => <article key={agent.name}>
      <div className={`agent-visual agent-visual-${index + 1}`} aria-hidden="true"><i /><i /><i /><span>{agent.code}</span></div>
      <div><h3>{agent.name}</h3><p>{agent.role}</p><span>{agent.constraint}</span></div>
    </article>)}</div><figure className="topology-art"><Image src="/media/autocomp-09-system-topology.svg" alt="AutoComp compliance system topology" fill unoptimized sizes="42vw" /><div className="topology-grid-overlay" aria-hidden="true" /></figure></div></section>

    <section className="evidence-story deferred-section"><div className="evidence-copy"><span>07 / EVIDENCE &amp; GOVERNANCE</span><h2>Corporate records should show how a decision was made—not just that a file exists.</h2><p>AutoComp links source evidence, rule versions, generated drafts, approvals, and execution events so a human reviewer can reconstruct the operational history.</p><div className="evidence-points"><span>APPEND-ONLY EVENT CHAIN</span><span>VERSIONED SOURCE EVIDENCE</span><span>EXPLICIT HUMAN AUTHORITY</span></div></div><div className="evidence-media"><ComplianceGraph /></div></section>

    <section id="controls" className="section controls deferred-section"><div className="section-title"><span>08 / CONTROL LEVELS</span><h2>Autonomy has boundaries.</h2></div><div className="control-grid">{controlRules.map((rule) => <article key={rule.title}><span>{rule.level}</span><h3>{rule.title}</h3><p>{rule.copy}</p><div className="control-pulse" aria-hidden="true"><i /><i /><i /></div></article>)}</div></section>

    <section className="cta deferred-section"><div><span>09 / READINESS</span><h2>Map the control environment before automating it.</h2><p>Start with entity scope, frameworks, source quality, evidence readiness, approval authority, and the decisions that must stay human-controlled.</p></div><Link className="button" href="/assessment">Start readiness check</Link></section>
  </main>;
}
