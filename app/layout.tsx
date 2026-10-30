import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav, { Brand } from './components/SiteNav';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://autocompcorp.josephjilovec.com'),
  title: { default: 'AutoComp Corp | Entity Governance & Operations', template: '%s | AutoComp Corp' },
  description: 'Corporate records, officer-change workflows, recurring obligations and approval evidence for multi-entity portfolios. Start with a scoped AutoComp assessment or pilot.',
  alternates: { canonical: '/' },
  openGraph: { title: 'AutoComp Corp — Entity Governance & Operations', description: 'A clearer record of corporate changes across your entity portfolio.', type: 'website', images: [{ url: '/media/evidence-review-1536.webp', width: 1536, height: 1024, alt: 'Illustrative corporate-record review setting' }] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preload" href="/media/manrope-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><a className="skip-link" href="#main-content">Skip to content</a><SiteNav />{children}
    <footer className="site-footer"><div className="footer-top"><div><Brand footer /><p>Entity governance.<br />Accountable records.</p></div><div className="footer-links"><Link href="/#solutions">Entity workflows</Link><Link href="/#evidence">Officer-change example</Link><Link href="/pricing">Pilot pricing</Link><Link href="/assessment?offer=operations">Plan a portfolio pilot</Link><Link href="/privacy">Website privacy</Link></div></div><div className="research-link"><span>Separate research project</span><Link href="/products/incident-commander">Incident Commander <span aria-hidden="true">↗</span></Link></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} AutoComp Corp</span><p>Pilot scope and availability are confirmed before work begins. Demonstrations use fictional records. Photography is AI-generated illustrative imagery, not actual staff, clients or facilities. Formal filings, signatures, payments, legal advice and certification are outside the entity pilot.</p></div>
    </footer></body></html>;
}
