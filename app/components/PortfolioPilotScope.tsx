import Link from 'next/link';
import { portfolioPilot } from '@/lib/offers';

export default function PortfolioPilotScope({ compact = false }: { compact?: boolean }) {
  return <section id="portfolio-pilot" className={'pilot-scope shell' + (compact ? ' pilot-scope-compact' : '')}>
    <div className="pilot-scope-intro"><p className="overline">The first entity operations pilot</p><h2>Know what is in.<br /><em>Know what is done.</em></h2><p>One officer-appointment and corporate-record-update workflow, with one authorized customer reviewer.</p><div className="pilot-limits"><span><strong>{portfolioPilot.entities}</strong> entities maximum</span><span><strong>{portfolioPilot.cases}</strong> officer-change cases</span><span><strong>{portfolioPilot.days}</strong> initial pilot days</span></div></div>
    <div className="pilot-scope-details"><div><h3>What your team receives</h3><ul>{portfolioPilot.outputs.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>How delivery is reviewed</h3><ul>{portfolioPilot.acceptance.map(item => <li key={item}>{item}</li>)}</ul></div><p className="pilot-scope-note">The agreed start date follows kickoff and receipt of required inputs. Exceptions remain open until resolved. Actual appointments, signatures, filings, payments and legal advice are outside this pilot. Customer documents require a separately agreed secure intake.</p>{compact && <Link className="text-link" href="/pricing#portfolio-pilot">Read the scope and commercial boundaries <span aria-hidden="true">↗</span></Link>}</div>
  </section>;
}
