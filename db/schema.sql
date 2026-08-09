create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists entities (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  organization_id uuid not null references organizations(id) on delete cascade,
  legal_name text not null,
  jurisdiction text not null,
  entity_type text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists source_snapshots (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  entity_id uuid not null references entities(id) on delete cascade,
  source_type text not null,
  source_ref text not null,
  observed_at timestamptz not null,
  parser_version text not null,
  content_hash text not null,
  confidence numeric(4,3) not null check (confidence >= 0 and confidence <= 1),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists rules (
  id uuid primary key default gen_random_uuid(),
  jurisdiction text not null,
  rule_key text not null,
  version text not null,
  effective_at timestamptz not null,
  superseded_at timestamptz,
  source_ref text not null,
  professional_reviewed boolean not null default false,
  definition jsonb not null,
  unique(jurisdiction, rule_key, version)
);

create table if not exists obligations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  entity_id uuid not null references entities(id) on delete cascade,
  rule_id uuid references rules(id),
  title text not null,
  due_at timestamptz,
  control_level text not null,
  status text not null default 'open',
  source_snapshot_id uuid references source_snapshots(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists draft_artifacts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  obligation_id uuid not null references obligations(id) on delete cascade,
  template_key text not null,
  template_version text not null,
  content_hash text not null,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists approval_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  obligation_id uuid not null references obligations(id) on delete cascade,
  approver_ref text not null,
  approver_role text not null,
  status text not null default 'pending',
  decided_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists execution_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  obligation_id uuid not null references obligations(id) on delete cascade,
  executor_type text not null,
  executor_ref text,
  external_ref text,
  executed_at timestamptz,
  status text not null,
  created_at timestamptz not null default now()
);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  entity_id uuid references entities(id) on delete cascade,
  obligation_id uuid references obligations(id) on delete cascade,
  event_type text not null,
  actor_ref text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table organizations enable row level security;
alter table entities enable row level security;
alter table source_snapshots enable row level security;
alter table obligations enable row level security;
alter table draft_artifacts enable row level security;
alter table approval_requests enable row level security;
alter table execution_events enable row level security;
alter table audit_events enable row level security;

create policy tenant_organizations on organizations using (tenant_id = nullif(current_setting('app.tenant_id', true), '')::uuid);
create policy tenant_entities on entities using (tenant_id = nullif(current_setting('app.tenant_id', true), '')::uuid);
create policy tenant_sources on source_snapshots using (tenant_id = nullif(current_setting('app.tenant_id', true), '')::uuid);
create policy tenant_obligations on obligations using (tenant_id = nullif(current_setting('app.tenant_id', true), '')::uuid);
create policy tenant_drafts on draft_artifacts using (tenant_id = nullif(current_setting('app.tenant_id', true), '')::uuid);
create policy tenant_approvals on approval_requests using (tenant_id = nullif(current_setting('app.tenant_id', true), '')::uuid);
create policy tenant_execution on execution_events using (tenant_id = nullif(current_setting('app.tenant_id', true), '')::uuid);
create policy tenant_audit on audit_events using (tenant_id = nullif(current_setting('app.tenant_id', true), '')::uuid);

create index if not exists entity_org_idx on entities(tenant_id, organization_id);
create index if not exists source_entity_observed_idx on source_snapshots(tenant_id, entity_id, observed_at desc);
create index if not exists obligation_entity_status_idx on obligations(tenant_id, entity_id, status);
create index if not exists audit_entity_created_idx on audit_events(tenant_id, entity_id, created_at desc);
