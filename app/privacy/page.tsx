import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Website privacy', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return <main id="main-content" className="shell legal-page"><p className="overline">Website information / updated October 30, 2026</p><h1>Website privacy.</h1>
    <h2>Public demonstrations</h2><p>The evidence workspace and incident scenarios run in your browser with fictional data. They do not connect to your business systems or request credentials. No advertising or analytics tracker is added by this website.</p>
    <h2>Preparing a brief</h2><p>The pilot planner uses the information you enter to prepare a local brief that you can revise through the planner. It does not upload files and does not automatically save the brief to browser storage. You can choose to copy or download it.</p>
    <h2>Submitting an enquiry</h2><p>If secure enquiry routing is available, the form offers a separate send action. Clicking that action sends the displayed business-contact and scope fields through this website to AutoComp’s configured intake service. Preparing a draft alone does not send an enquiry. The form reports an acknowledged submission only after that service accepts it.</p><p>If routing is unavailable, no send action is offered. Do not include health information, credentials, tax IDs, privileged legal material or confidential records. This public enquiry form is not a client evidence vault.</p>
    <h2>Hosting</h2><p>The website is hosted using Vercel. Hosting and infrastructure providers may process ordinary request information needed to deliver and protect the site. Do not place sensitive information in a URL. Any client engagement needs separate data-handling and commercial terms.</p>
    <Link className="button button-outline" href="/assessment">Back to the pilot planner <span aria-hidden="true">↗</span></Link>
  </main>;
}
