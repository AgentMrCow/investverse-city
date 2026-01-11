create extension if not exists "pgcrypto";

create table if not exists regions (
  id text primary key,
  name text not null,
  focus text,
  theme text,
  challenge text,
  gradient text,
  signals text[] default '{}'
);

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  handle text unique not null,
  display_name text,
  avatar text,
  region_id text references regions(id),
  level integer default 1,
  gt_balance integer default 0,
  daily_earned integer default 0,
  streak_days integer default 0,
  total_earned integer default 0,
  quizzes_completed integer default 0,
  global_rank integer default 0,
  created_at timestamptz default now()
);

create table if not exists risk_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade unique,
  risk_score integer default 0,
  risk_level text,
  horizon text,
  liquidity_need text,
  loss_tolerance text,
  experience text,
  recommended_module text,
  updated_at timestamptz default now()
);

create table if not exists learning_tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  focus text,
  next_step text,
  progress integer default 0,
  icon text,
  gradient text
);

create table if not exists practice_sessions (
  id uuid primary key default gen_random_uuid(),
  time_label text,
  title text not null,
  detail text,
  reward text
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  description text,
  max_level integer default 1
);

create table if not exists player_skills (
  profile_id uuid references profiles(id) on delete cascade,
  skill_id uuid references skills(id) on delete cascade,
  level integer default 0,
  completed boolean default false,
  unlocked boolean default false,
  primary key (profile_id, skill_id)
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  options jsonb not null,
  correct_index integer not null,
  difficulty text,
  token_reward integer default 0,
  category text,
  is_active boolean default true
);

create table if not exists daily_challenge_questions (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references questions(id) on delete cascade,
  sequence integer default 1,
  day date default current_date
);

create table if not exists question_submissions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  title text not null,
  status text not null,
  reward integer default 0,
  source text default 'Community',
  content jsonb,
  created_at timestamptz default now()
);

alter table if exists question_submissions
  add column if not exists source text default 'Community';

alter table if exists question_submissions
  add column if not exists content jsonb;

create table if not exists moderation_checks (
  id uuid primary key default gen_random_uuid(),
  label text not null
);

create table if not exists knowledge_gaps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  category text,
  impact text,
  confidence integer default 0,
  evidence jsonb,
  recommended_action text,
  recommended_module text,
  updated_at timestamptz default now()
);

create table if not exists integrity_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  event_type text not null,
  severity text not null,
  detail text,
  action text,
  created_at timestamptz default now()
);

create table if not exists buildings (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  type text not null,
  name text not null,
  level integer default 1,
  value integer default 0,
  growth_rate numeric default 0,
  insured boolean default false
);

create table if not exists portfolios (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  name text not null,
  virtual_funds integer default 0,
  created_at timestamptz default now()
);

create table if not exists portfolio_allocations (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid references portfolios(id) on delete cascade,
  label text not null,
  percent integer default 0,
  change text,
  gradient text
);

create table if not exists simulation_scenarios (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  impact text,
  lesson text,
  priority integer default 1
);

create table if not exists simulation_timeline_events (
  id uuid primary key default gen_random_uuid(),
  date_label text,
  title text not null,
  impact text,
  type text
);

create table if not exists simulation_metrics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text,
  icon text,
  tone text
);

create table if not exists esg_scores (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  score integer default 0,
  volatility_shield text,
  green_dividend text
);

create table if not exists insurance_coverages (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  label text not null,
  status text not null,
  detail text
);

create table if not exists coverage_simulations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  asset_label text,
  asset_value integer default 0,
  deductible integer default 0,
  coverage_limit integer default 0,
  loss_amount integer default 0,
  payout integer default 0,
  out_of_pocket integer default 0,
  created_at timestamptz default now()
);

create table if not exists vault_options (
  id uuid primary key default gen_random_uuid(),
  term text not null,
  apy text,
  bonus text,
  unlocks text
);

create table if not exists token_rules (
  id uuid primary key default gen_random_uuid(),
  rule_type text not null,
  label text not null,
  detail text
);

create table if not exists token_transactions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  amount integer not null,
  category text not null,
  source text,
  created_at timestamptz default now()
);

create table if not exists clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  primary_color text,
  created_at timestamptz default now()
);

create table if not exists club_members (
  club_id uuid references clubs(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  role text,
  joined_at timestamptz default now(),
  primary key (club_id, profile_id)
);

create table if not exists club_wars (
  id uuid primary key default gen_random_uuid(),
  club_a_id uuid references clubs(id) on delete cascade,
  club_b_id uuid references clubs(id) on delete cascade,
  starts_at timestamptz,
  ends_at timestamptz,
  status text,
  reward_pool integer default 0,
  building_value integer default 0,
  weapons_ready integer default 0
);

create table if not exists club_war_loadouts (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references clubs(id) on delete cascade,
  item text not null,
  effect text,
  cost text
);

create table if not exists governance_proposals (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references clubs(id) on delete cascade,
  title text not null,
  detail text,
  status text,
  vote_summary text
);

create table if not exists governance_votes (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references governance_proposals(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  vote boolean,
  created_at timestamptz default now()
);

create table if not exists store_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  detail text,
  cost text,
  category text,
  rarity text
);

create table if not exists reward_tiers (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  rank_label text not null,
  reward text not null
);

create table if not exists competition_events (
  id uuid primary key default gen_random_uuid(),
  cadence text not null,
  title text not null,
  detail text
);

create table if not exists partner_courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  detail text,
  badge text,
  icon text
);

create table if not exists contract_challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text,
  scenario text
);

create table if not exists contract_clauses (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid references contract_challenges(id) on delete cascade,
  title text not null,
  detail text,
  status text
);

create table if not exists hedging_powerups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  effect text,
  unlock_level integer default 0,
  cost text
);

create table if not exists architecture_layers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  order_index integer default 0
);

create table if not exists leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  rank integer default 0,
  season text,
  tokens integer default 0,
  level integer default 1,
  change text,
  display_name text,
  avatar text
);
