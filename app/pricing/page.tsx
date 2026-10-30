import type { Metadata } from 'next';
import Link from 'next/link';
import Pricing from '../components/Pricing';

export const metadata: Metadata = { title: 'Pilot pricing', description: 'Transparent starting prices for AutoComp readiness reviews, evidence-operations pilots and guided incident-readiness exercises.', alternates: { canonical: '/pricing' } };

export default function PricingPage() {
  return <main id="main-content"><section className="page-intro shell"><p className="overline">Pilot programs / clear scope first</p><h1>Start with one<br /><em>important workflow.</em></h1><p>Choose a focused review, an ongoing evidence pilot or a guided incident exercise. Know what is included before your team commits.</p></section>
    <section className="shell pricing-page"><Pricing /></section>
    <section className="shell included-section"><div><p className="overline">A written scope comes first</p><h2>No mystery<br />around the work.</h2></div><div className="inclusions-list"><article><h3>Defined inputs and deliverables</h3><p>We agree the workflow, entities or service, evidence sources, reviewer, deliverables and review cadence.</p></article><article><h3>Clear commercial terms</h3><p>Your proposal sets the actual price, setup costs, timeline, revisions, payment terms and any recurring commitment. Larger or more complex programs are quoted separately.</p></article><article><h3>The right boundaries</h3><p>Pilot fees do not include certification, legal representation, regulated filings, third-party charges or a production-response SLA.</p></article></div></section>
    <section className="closing-cta shell"><p className="overline">Find the right fit</p><h2>Describe the work.<br />We can define the start.</h2><Link href="/assessment" className="button">Prepare a pilot brief <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
