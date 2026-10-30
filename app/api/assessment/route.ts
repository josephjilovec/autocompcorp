import { NextResponse } from 'next/server';
import { parseEnquiry } from '@/lib/enquiry';

export const runtime = 'nodejs';
export const maxDuration = 10;
const headers = { 'Cache-Control': 'no-store' };

function routing() {
  const endpoint = process.env.AUTOCOMP_EVENT_SINK_URL;
  const token = process.env.AUTOCOMP_EVENT_SINK_TOKEN;
  if (!endpoint || !token) return null;
  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    return { endpoint: url.toString(), token };
  } catch { return null; }
}

export async function GET() {
  return NextResponse.json({ available: routing() !== null }, { headers });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'Request origin is not permitted.' }, { status: 403, headers });
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return NextResponse.json({ error: 'Use a JSON request.' }, { status: 415, headers });
  const advertised = request.headers.get('content-length');
  if (advertised && (!/^\d+$/.test(advertised) || Number(advertised) > 8192)) return NextResponse.json({ error: 'Request is too large.' }, { status: 413, headers });
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: 'A request body is required.' }, { status: 400, headers });
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 8192) { await reader.cancel(); return NextResponse.json({ error: 'Request is too large.' }, { status: 413, headers }); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    let body: unknown;
    try { body = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)); }
    catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400, headers }); }
    const parsed = parseEnquiry(body);
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 422, headers });
    const destination = routing();
    if (!destination) return NextResponse.json({ error: 'On-site enquiry sending is unavailable. Keep your local brief; nothing was routed.' }, { status: 503, headers });
    try {
      const upstream = await fetch(destination.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + destination.token }, body: JSON.stringify({ ...parsed.record, authority: true, source: 'autocomp-corp' }), cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(8000) });
      if (!upstream.ok) return NextResponse.json({ error: 'Intake did not acknowledge delivery. Keep your brief and try again later.' }, { status: 502, headers });
      return NextResponse.json({ ok: true }, { status: 202, headers });
    } catch { return NextResponse.json({ error: 'Unable to confirm delivery. Keep your brief before retrying.' }, { status: 502, headers }); }
  } catch { return NextResponse.json({ error: 'Unable to read the request.' }, { status: 400, headers }); }
  finally { reader.releaseLock(); }
}
