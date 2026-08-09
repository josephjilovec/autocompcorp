import { NextResponse } from 'next/server';

const needs = new Set(['State filing calendar','Corporate record maintenance','Multi-entity compliance operations','Registered-agent oversight','Compliance evidence and audit trail']);

export async function POST(request: Request) {
  const body = await request.json().catch(()=>null) as Record<string,unknown>|null;
  if(!body) return NextResponse.json({error:'Invalid request.'},{status:400});
  const record = {
    name:String(body.name||'').trim(), email:String(body.email||'').trim(), organization:String(body.organization||'').trim(),
    entityCount:String(body.entityCount||''), need:String(body.need||''), process:String(body.process||'').trim(), authority:String(body.authority||'')
  };
  if(!record.name || !record.email.includes('@') || !record.organization || !record.entityCount || !needs.has(record.need) || record.process.length<10 || record.authority!=='yes') return NextResponse.json({error:'Please complete the required fields and execution-control attestation.'},{status:422});
  if(record.process.length>1600) return NextResponse.json({error:'Please keep the initial process description concise.'},{status:422});
  const endpoint = process.env.AUTOCOMP_EVENT_SINK_URL;
  const token = process.env.AUTOCOMP_EVENT_SINK_TOKEN;
  if(!endpoint || !token) return NextResponse.json({error:'Readiness routing is not configured yet.'},{status:503});
  const upstream = await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({...record,authority:true,source:'autocomp-corp'}),cache:'no-store'});
  if(!upstream.ok) return NextResponse.json({error:'Secure routing is temporarily unavailable.'},{status:502});
  return NextResponse.json({ok:true},{status:202});
}
