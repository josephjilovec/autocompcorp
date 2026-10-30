'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link href="/" className={'brand' + (footer ? ' brand-footer' : '')} aria-label="AutoComp Corp home">
    <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M5 27V7h16v20H5Zm9-20V3h15v20h-8" /><path d="m10 16 4 4 9-10" /></svg>
    <span>AutoComp<span className="brand-corp">Corp</span></span>
  </Link>;
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) { setOpen(false); button.current?.focus(); }
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header">
    <div className="nav-shell"><Brand />
      <button className="menu-toggle" ref={button} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
      <nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <Link href="/#solutions" onClick={() => setOpen(false)}>Solutions</Link>
        <Link href="/#evidence" onClick={() => setOpen(false)}>Product preview</Link>
        <Link href="/products/incident-commander" aria-current={pathname === '/products/incident-commander' ? 'page' : undefined}>Incident Commander</Link>
        <Link href="/pricing" aria-current={pathname === '/pricing' ? 'page' : undefined}>Pricing</Link>
        <Link className="button button-small" href="/assessment">Plan a pilot <span aria-hidden="true">↗</span></Link>
      </nav>
    </div>
  </header>;
}
