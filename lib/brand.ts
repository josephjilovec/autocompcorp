export const lifecycle = [
  { title:'Observe', copy:'Collect source-stamped changes from registries, internal records, provider evidence, and approved regulatory feeds.', output:'OUTPUT / normalized event' },
  { title:'Interpret', copy:'Classify the event against entity scope, jurisdiction, deadlines, and known obligations with confidence scoring.', output:'OUTPUT / obligation candidate' },
  { title:'Draft', copy:'Generate minutes, resolutions, notices, checklists, and filing packets from approved templates and verified facts.', output:'OUTPUT / reviewable artifact' },
  { title:'Escalate', copy:'Route consequential, ambiguous, stale, or jurisdiction-specific matters to an authorized officer or professional.', output:'OUTPUT / permission gate' },
  { title:'Evidence', copy:'Record source, version, reviewer, execution event, receipt, and next renewal date in an append-only audit trail.', output:'OUTPUT / evidence chain' }
] as const;

export const agents = [
  { code:'REG', name:'Registry Sentinel', role:'Monitors filing sources and provider evidence for changes, deadlines, and mismatches.', constraint:'Never treats a missing source as proof of compliance.' },
  { code:'REC', name:'Records Steward', role:'Reconciles corporate records, approvals, entity relationships, and document versions.', constraint:'Drafts from verified facts only.' },
  { code:'RISK', name:'Risk Classifier', role:'Scores ambiguity, consequence, jurisdiction complexity, and stale-data exposure.', constraint:'High-consequence uncertainty forces escalation.' },
  { code:'EXEC', name:'Execution Router', role:'Routes approved actions to officers, registered agents, filing services, or counsel.', constraint:'Cannot self-authorize formal execution.' }
] as const;

export const controlRules = [
  { level:'L0', title:'Observe automatically', copy:'Read public or authorized sources, normalize events, and create internal evidence without changing external records.' },
  { level:'L1', title:'Draft automatically', copy:'Prepare routine corporate artifacts from approved templates when source facts and scope are verified.' },
  { level:'L2', title:'Require approval', copy:'Any filing, signature, payment, officer action, or state-record change requires an authorized execution path.' },
  { level:'L3', title:'Require professional review', copy:'Ambiguous legal classification, foreign qualification, disputes, enforcement matters, or material governance changes route to qualified counsel.' }
] as const;
