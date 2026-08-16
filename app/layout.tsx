import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import './performance.css';
import './enhancements.css';
import './enterprise.css';
import './assessment-theme.css';

export const metadata: Metadata = {
  title: { default: 'AutoComp Corp | Autonomous Compliance Operations', template: '%s | AutoComp Corp' },
  description: 'Autonomous compliance operations and evidence capture with continuous audit readiness, traceable control mapping, and human-gated execution workflows.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <style>{`
      @media (min-width: 951px) {
        header {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          justify-content: initial;
          column-gap: clamp(30px, 4vw, 64px);
        }
        header .brand {
          grid-column: 1;
          grid-row: 1;
        }
        header nav {
          grid-column: 2;
          grid-row: 1;
          justify-self: stretch;
          justify-content: flex-start;
        }
        header nav .nav-cta {
          margin-left: auto;
        }
      }
    `}</style>
    <header><Link href="/" className="brand"><b>AutoComp</b><span>Corp</span></Link><nav><Link href="/#dashboard">Dashboard</Link><Link href="/#workflow">Human Control</Link><Link href="/#roi">ROI</Link><Link href="/#system">System</Link><Link className="nav-cta" href="/assessment">Run readiness check</Link></nav></header>{children}<footer>
<div><b>AutoComp Corp</b><span>Autonomous compliance operations. Human-controlled execution.</span></div><p>Software for compliance operations, evidence capture, and audit preparation. Legal determinations, signatures, regulated filings, and consequential execution remain with authorized professionals and company officers.</p><div className="jj-venture-nav" style={{borderTop:'1px solid rgba(148,163,184,.16)',padding:'1rem 1.25rem 1.15rem',textAlign:'center',fontSize:'.78rem',letterSpacing:'.045em'}}><a href="https://www.josephjilovec.com/ventures" style={{color:'#93C5FD',textDecoration:'none',fontWeight:700}}>A Joseph Jilovec Venture</a><span aria-hidden="true" style={{color:'#64748B',margin:'0 .65rem',opacity:.8}}>•</span><a href="https://www.josephjilovec.com/ventures" style={{color:'#93C5FD',textDecoration:'none',fontWeight:800}}>Explore the Venture Studio →</a></div>
</footer>
  </body></html>;
}