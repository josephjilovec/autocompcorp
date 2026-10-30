import { NextResponse } from 'next/server';
import { parseEnquiry } from '@/lib/enquiry';
import { approvedPublicContact, readPublicContact } from '@/lib/contact';
import { forwardEnquiry, resolveIntake } from '@/lib/intake';
export const runtime = 'nodejs';
export const maxDuration = 10;
const headers = { 'Cache-Control':'no-store' };
function routing() { return resolveIntake(process.env.AUTOCOMP_EVENT_SINK_URL, process.env.AUTOCOMP_EVENT_SINK_TOKEN); }
export async function GET() {
  const contact = readPublicContact({ email:process.env.AUTOCOMP_CONTACT_EMAIL || approvedPublicContact.email, bookingUrl:process.env.AUTOCOMP_BOOKING_URL || approvedPublicContact.bookingUrl });
  return NextResponse.json({ available:routing() !== null, contact }, { headers });
}
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error:'Request origin is not permitted.' }, { status:403, headers });
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return NextResponse.json({ error:'Use a JSON request.' }, { status:415, headers });
  const advertised = request.headers.get('content-length');
  if (advertised && (!/^\d+$/.test(advertised) || Number(advertised) > 8192)) return NextResponse.json({ error:'Request is too large.' }, { status:413, headers });
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error:'A request body is required.' }, { status:400, headers });
  const chunks: Uint8Array[] = []; let length = 0;
  try {
    while (true) {
      const { value,done } = await reader.read(); if (done) break;
      length += value.byteLength;
      if (length > 8192) { await reader.cancel(); return NextResponse.json({ error:'Request is too large.' }, { status:413, headers }); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.length; }
    let body: unknown;
    try { body = JSON.parse(new TextDecoder('utf-8',{ fatal:true }).decode(bytes)); }
    catch { return NextResponse.json({ error:'Invalid request.' }, { status:400, headers }); }
    const parsed = parseEnquiry(body);
    if (!parsed.ok) return NextResponse.json({ error:parsed.error }, { status:422, headers });
    const destination = routing();
    if (!destination) return NextResponse.json({ error:'Online enquiry sending is unavailable. Keep your local brief; nothing was routed.' }, { status:503, headers });
    try {
      await forwardEnquiry(parsed.record,destination);
      return NextResponse.json({ ok:true }, { status:202, headers });
    } catch { return NextResponse.json({ error:'Unable to confirm delivery. Keep your brief before retrying.' }, { status:502, headers }); }
  } catch { return NextResponse.json({ error:'Unable to read the request.' }, { status:400, headers }); }
  finally { reader.releaseLock(); }
}
