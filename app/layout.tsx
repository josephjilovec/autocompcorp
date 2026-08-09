import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import './performance.css';

export const metadata: Metadata = {
  title: { default: 'AutoComp Corp', template: '%s | AutoComp Corp' },
  description: 'Autonomous corporate compliance monitoring, evidence capture, document drafting, and permissioned execution workflows.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header><Link href="/" className="brand"><b>AutoComp</b><span>Corp</span></Link><nav><Link href="/#system">System</Link><Link href="/#agents">Agents</Link><Link href="/#controls">Controls</Link><Link className="nav-cta" href="/assessment">Run readiness check</Link></nav></header>{children}<footer><div><b>AutoComp Corp</b><span>Autonomous monitoring. Permissioned execution.</span></div><p>Software for compliance operations and evidence management. Legal determinations and regulated execution remain with authorized professionals and company officers.</p></footer></body></html>;
}
