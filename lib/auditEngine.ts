export type AuditNodeId = 'source' | 'normalize' | 'classify' | 'gate' | 'evidence';

export type RegistryState = {
  code: 'DE' | 'AZ' | 'CA' | 'TX' | 'NY' | 'FL';
  name: string;
  source: string;
  version: string;
  freshness: string;
  events: number;
  status: 'verified' | 'watch' | 'review';
  flagClass: string;
};

export type AuditScenario = {
  id: string;
  label: string;
  jurisdiction: string;
  entity: string;
  event: string;
  confidence: number;
  nodes: Array<{
    id: AuditNodeId;
    label: string;
    status: string;
    detail: string;
    hash: string;
    timestamp: string;
    confidence: number;
    evidence: string;
  }>;
};

export const registryStates: RegistryState[] = [
  { code:'DE', name:'Delaware', source:'Division of Corporations', version:'DE-2026.08.09.4', freshness:'02m', events:3, status:'verified', flagClass:'flag-de' },
  { code:'AZ', name:'Arizona', source:'Corporation Commission', version:'AZ-2026.08.09.2', freshness:'07m', events:1, status:'verified', flagClass:'flag-az' },
  { code:'CA', name:'California', source:'Secretary of State', version:'CA-2026.08.09.7', freshness:'11m', events:5, status:'watch', flagClass:'flag-ca' },
  { code:'TX', name:'Texas', source:'Secretary of State', version:'TX-2026.08.09.3', freshness:'04m', events:2, status:'verified', flagClass:'flag-tx' },
  { code:'NY', name:'New York', source:'Department of State', version:'NY-2026.08.09.5', freshness:'16m', events:4, status:'review', flagClass:'flag-ny' },
  { code:'FL', name:'Florida', source:'Division of Corporations', version:'FL-2026.08.09.1', freshness:'09m', events:2, status:'verified', flagClass:'flag-fl' }
];

export const auditScenarios: AuditScenario[] = [
  {
    id:'delaware-officer', label:'Delaware officer change', jurisdiction:'Delaware', entity:'Meridian Holdings, Inc.', event:'Officer change detected', confidence:94,
    nodes:[
      { id:'source', label:'Source ingestion', status:'received', detail:'Registry event and internal officer roster captured as separate source-stamped objects.', hash:'8f31…c2a9', timestamp:'22:01:12', confidence:99, evidence:'SRC-DE-8842' },
      { id:'normalize', label:'Normalization', status:'normalized', detail:'Names, entity ID, filing date, officer role and source version reconciled into a canonical event.', hash:'b92d…19f4', timestamp:'22:01:13', confidence:98, evidence:'NORM-1187' },
      { id:'classify', label:'Agent classification', status:'material change', detail:'Risk Classifier marks the event as governance-relevant and routes it above autonomous drafting threshold.', hash:'d0a6…77be', timestamp:'22:01:14', confidence:94, evidence:'CLS-4401' },
      { id:'gate', label:'Human gate', status:'approval required', detail:'Execution Router holds external action until an authorized officer confirms the change and counsel path.', hash:'1c8e…4d53', timestamp:'22:01:15', confidence:100, evidence:'GATE-0312' },
      { id:'evidence', label:'Audit trail', status:'sealed', detail:'Source, interpretation, draft state, reviewer gate and resulting receipt are chained into one reconstructable record.', hash:'a48b…0e72', timestamp:'22:01:16', confidence:100, evidence:'AUD-9914' }
    ]
  },
  {
    id:'arizona-agent', label:'Arizona statutory agent shift', jurisdiction:'Arizona', entity:'Copper Signal LLC', event:'Statutory agent mismatch', confidence:89,
    nodes:[
      { id:'source', label:'Source ingestion', status:'received', detail:'Arizona registry record differs from the approved internal statutory-agent profile.', hash:'718e…50d1', timestamp:'22:03:02', confidence:97, evidence:'SRC-AZ-2208' },
      { id:'normalize', label:'Normalization', status:'normalized', detail:'Entity number and agent address match; agent name and effective date do not.', hash:'452a…11c9', timestamp:'22:03:03', confidence:96, evidence:'NORM-6650' },
      { id:'classify', label:'Agent classification', status:'mismatch', detail:'Registry Sentinel and Records Steward agree a current-record discrepancy exists; consequence remains moderate.', hash:'633f…814e', timestamp:'22:03:04', confidence:89, evidence:'CLS-1190' },
      { id:'gate', label:'Human gate', status:'verify before action', detail:'Officer must confirm whether a provider change was intentional before any corrective filing is prepared.', hash:'ec81…a10f', timestamp:'22:03:05', confidence:100, evidence:'GATE-7702' },
      { id:'evidence', label:'Audit trail', status:'open chain', detail:'Evidence chain remains open until officer confirmation closes the discrepancy.', hash:'0b18…cf99', timestamp:'22:03:06', confidence:100, evidence:'AUD-7720' }
    ]
  },
  {
    id:'california-filing', label:'California filing deadline', jurisdiction:'California', entity:'Northstar Systems Corp.', event:'Statement deadline approaching', confidence:92,
    nodes:[
      { id:'source', label:'Source ingestion', status:'received', detail:'State deadline metadata and entity filing history are synchronized.', hash:'cf18…2dd6', timestamp:'22:05:41', confidence:98, evidence:'SRC-CA-6104' },
      { id:'normalize', label:'Normalization', status:'normalized', detail:'Deadline is converted into entity-local calendar state with filing history and responsible officer.', hash:'8a11…b773', timestamp:'22:05:42', confidence:98, evidence:'NORM-0991' },
      { id:'classify', label:'Agent classification', status:'routine obligation', detail:'Interpretation falls inside an approved routine-filing policy, but filing itself remains permissioned.', hash:'449a…9fd0', timestamp:'22:05:43', confidence:92, evidence:'CLS-3094' },
      { id:'gate', label:'Human gate', status:'officer review', detail:'Draft packet may be prepared automatically; authorized officer review is required before filing.', hash:'11d7…844b', timestamp:'22:05:44', confidence:100, evidence:'GATE-0440' },
      { id:'evidence', label:'Audit trail', status:'ready to seal', detail:'Draft, source version and approval requirement are recorded while execution remains pending.', hash:'aa31…0eb5', timestamp:'22:05:45', confidence:100, evidence:'AUD-5007' }
    ]
  }
];
