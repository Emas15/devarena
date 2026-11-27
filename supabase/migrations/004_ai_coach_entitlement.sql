alter table public.profiles
  add column if not exists ai_coach_unlocked boolean not null default false;

alter table public.profiles
  add column if not exists stripe_customer_id text;
