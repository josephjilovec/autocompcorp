import type { Enquiry } from './enquiry.ts';
export type IntakeDestination = { endpoint: string; token: string };
export function resolveIntake(endpoint?: string, token?: string): IntakeDestination | null {
  if (!endpoint || !token?.trim()) return null;
  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:' || url.username || url.password || url.hash) return null;
    return { endpoint: url.toString(), token };
  } catch { return null; }
}
export async function forwardEnquiry(record: Enquiry, destination: IntakeDestination, sender: typeof fetch = fetch) {
  const response = await sender(destination.endpoint, {
    method:'POST', headers:{ 'Content-Type':'application/json', Authorization:'Bearer ' + destination.token },
    body:JSON.stringify({ ...record, authority:true, scopeAcknowledged:true, executionAuthorized:false, source:'autocomp-corp' }),
    cache:'no-store', redirect:'error', signal:AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('Intake did not acknowledge delivery. Keep your brief and try again later.');
}
