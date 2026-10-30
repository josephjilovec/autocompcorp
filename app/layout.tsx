import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav, { Brand } from './components/SiteNav';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://autocompcorp.josephjilovec.com'),
  title: { default: 'AutoComp Corp | Compliance Operations & Incident Readiness', template: '%s | AutoComp Corp' },
  description: 'Scoped compliance evidence and corporate-record pilots, with clear ownership and human review. Explore readiness reviews and DevOps Incident Commander.',
  alternates: { canonical: '/' },
  openGraph: { title: 'AutoComp Corp — Keep the work moving. Keep the proof.', description: 'Compliance operations, reviewable evidence and guided incident-readiness pilots.', type: 'website', images: [{ url: '/media/evidence-review-1536.webp', width: 1536, height: 1024, alt: 'Illustrative document review setting' }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preload" href="/media/manrope-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteNav />{children}
    <footer className="site-footer"><div className="footer-top"><div><Brand footer /><p>Compliance operations.<br />Evidence worth keeping.</p></div><div className="footer-links"><Link href="/#solutions">Solutions</Link><Link href="/products/incident-commander">Incident Commander</Link><Link href="/pricing">Pilot pricing</Link><Link href="/assessment">Plan a pilot</Link><Link href="/privacy">Website privacy</Link></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} AutoComp Corp</span><p>Pilot scope and availability are confirmed before work begins. Demonstrations use fictional data. Photography is AI-generated illustrative imagery, not actual staff, clients or facilities. Formal filings, legal advice, certification and production incident response are outside the pilot offers shown here.</p></div>
    </footer>
  </body></html>;
}
