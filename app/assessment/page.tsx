import type { Metadata } from 'next';
import Link from 'next/link';
import AssessmentForm from '../components/AssessmentForm';
import { getOffer } from '@/lib/offers';

export const metadata: Metadata = { title: 'Plan a pilot', description: 'Prepare a focused AutoComp pilot brief for corporate records, compliance evidence or incident readiness. No sensitive records or credentials are needed.', alternates: { canonical: '/assessment' } };

export default async function AssessmentPage({ searchParams }: { searchParams: Promise<{ offer?: string | string[] }> }) {
  const params = await searchParams;
  const offer = getOffer(params.offer);
  return <main id="main-content" className="assessment-layout shell"><section className="assessment-intro"><p className="overline">A focused start</p><h1>Bring the work.<br /><em>Define the scope.</em></h1><p>Tell us which recurring record, evidence handoff or incident decision needs attention. Start with the operating question, not a file upload.</p><div className="intake-boundary"><strong>What happens next?</strong><p>Prepare a brief you can review, copy or download. If enquiry sending is available, you can then choose to send the scope for review. A written proposal confirms availability, deliverables, timing and fees before work begins.</p></div><p>Still comparing options? <Link className="text-link" href="/pricing">See pilot pricing <span aria-hidden="true">↗</span></Link></p></section><AssessmentForm initialOffer={offer.id} /></main>;
}
