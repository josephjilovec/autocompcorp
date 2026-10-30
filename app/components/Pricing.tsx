import Link from 'next/link';
import { offers } from '@/lib/offers';

export default function Pricing() {
  return <div className="pricing-block">
    <div className="pricing-grid">{offers.map((offer) => <article className={'price-card' + (offer.id === 'operations' ? ' price-card-featured' : '')} key={offer.id}>
      <p className="overline">{offer.eyebrow}</p>
      <h3>{offer.name}</h3>
      <div className="price">{offer.id !== 'readiness' && <small>From</small>}<strong>{offer.price}</strong><span>{offer.unit}</span></div>
      <p className="price-description">{offer.description}</p>
      <ul className="check-list">{offer.included.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className="price-boundary">{offer.boundary}</p>
      <Link className={'button ' + (offer.id === 'operations' ? '' : 'button-outline')} href={'/assessment?offer=' + offer.id}>{offer.cta}<span aria-hidden="true">↗</span></Link>
    </article>)}</div>
    <p className="pricing-note">Indicative pilot pricing in USD. Scope, availability, timing and any applicable taxes are confirmed in a written proposal. Third-party fees are separate and disclosed. No purchase or subscription starts on this website.</p>
  </div>;
}
