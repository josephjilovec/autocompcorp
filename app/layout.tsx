import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import './performance.css';
import './enhancements.css';

export const metadata: Metadata = {
  title: { default: 'AutoComp Corp', template: '%s | AutoComp Corp' },
  description: 'Autonomous corporate compliance monitoring, evidence capture, document drafting, and permissioned execution workflows.'
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
    <header><Link href="/" className="brand"><b>AutoComp</b><span>Corp</span></Link><nav><Link href="/#system">System</Link><Link href="/#agents">Agents</Link><Link href="/#controls">Controls</Link><Link className="nav-cta" href="/assessment">Run readiness check</Link></nav></header>{children}<footer>
<div><b>AutoComp Corp</b><span>Autonomous monitoring. Permissioned execution.</span></div><p>Software for compliance operations and evidence management. Legal determinations and regulated execution remain with authorized professionals and company officers.</p><div className="jj-venture-nav" style={{borderTop:'1px solid rgba(255,255,255,.10)',padding:'1rem 1.25rem 1.15rem',textAlign:'center',fontSize:'.78rem',letterSpacing:'.045em'}}><a href="https://www.josephjilovec.com/ventures" style={{color:'#E7C45A',textDecoration:'none',fontWeight:700}}>A Joseph Jilovec Venture</a><span aria-hidden="true" style={{color:'#E7C45A',margin:'0 .65rem',opacity:.7}}>•</span><a href="https://www.josephjilovec.com/ventures" style={{color:'#E7C45A',textDecoration:'none',fontWeight:800}}>Explore the Venture Studio →</a></div>
</footer>
  </body></html>;
}