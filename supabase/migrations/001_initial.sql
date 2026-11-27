-- DevArena initial schema
-- Run in Supabase SQL editor or via supabase db push

create extension if not exists "pgcrypto";

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  username text unique,
  avatar_url text,
  bio text,
  experience_level text check (experience_level in (
    'complete_beginner','beginner','intermediate','advanced','professional'
  )),
  onboarding_completed boolean not null default false,
  theme_preference text default 'system',
  show_gamification boolean not null default true,
  website_url text,
  github_url text,
  linkedin_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.interests (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_interests (
  user_id uuid not null references public.profiles(id) on delete cascade,
  interest_id uuid not null references public.interests(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, interest_id)
);

create table if not exists public.career_roles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_career_preferences (
  user_id uuid not null references public.profiles(id) on delete cascade,
  career_role_id uuid not null references public.career_roles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, career_role_id)
);

create table if not exists public.learning_preferences (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null
);

create table if not exists public.user_learning_preferences (
  user_id uuid not null references public.profiles(id) on delete cascade,
  learning_preference_id uuid not null references public.learning_preferences(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, learning_preference_id)
);

create table if not exists public.content_sources (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  base_url text,
  quality_score numeric not null default 0.7,
  last_synced_at timestamptz,
  last_sync_status text,
  last_sync_error text,
  enabled boolean not null default true
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  external_id text,
  content_hash text not null,
  title text not null,
  description text,
  body_preview text,
  body_html text,
  content_type text not null check (content_type in (
    'article','reddit','youtube','blog','newsletter'
  )),
  source text not null,
  author_name text,
  author_url text,
  author_avatar_url text,
  original_url text not null,
  thumbnail_url text,
  published_at timestamptz,
  retrieved_at timestamptz not null default now(),
  access_status text not null default 'public' check (access_status in (
    'public','preview','paywalled','external_only'
  )),
  topics text[] not null default '{}',
  tags text[] not null default '{}',
  reading_time_minutes int,
  engagement jsonb not null default '{}'::jsonb,
  search_vector tsvector,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source, content_hash)
);

create index if not exists content_items_published_at_idx on public.content_items (published_at desc nulls last);
create index if not exists content_items_type_idx on public.content_items (content_type);
create index if not exists content_items_source_idx on public.content_items (source);
create index if not exists content_items_topics_idx on public.content_items using gin (topics);
create index if not exists content_items_search_idx on public.content_items using gin (search_vector);

create or replace function public.content_items_search_update() returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(new.topics, ' '), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.author_name, '')), 'C');
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists content_items_search_trigger on public.content_items;
create trigger content_items_search_trigger
  before insert or update on public.content_items
  for each row execute function public.content_items_search_update();

create table if not exists public.followed_communities (
  user_id uuid not null references public.profiles(id) on delete cascade,
  community_key text not null,
  community_name text not null,
  platform text not null default 'reddit',
  created_at timestamptz not null default now(),
  primary key (user_id, community_key)
);

create table if not exists public.followed_authors (
  user_id uuid not null references public.profiles(id) on delete cascade,
  author_user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, author_user_id),
  check (user_id <> author_user_id)
);

create table if not exists public.followed_topics (
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic_slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, topic_slug)
);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  content_item_id uuid references public.content_items(id) on delete cascade,
  blog_id uuid,
  created_at timestamptz not null default now(),
  unique (user_id, content_item_id),
  check (content_item_id is not null or blog_id is not null)
);

create table if not exists public.reading_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  content_item_id uuid references public.content_items(id) on delete cascade,
  blog_id uuid,
  progress_percent int not null default 0,
  completed boolean not null default false,
  last_read_at timestamptz not null default now(),
  unique (user_id, content_item_id)
);

create table if not exists public.content_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  content_item_id uuid references public.content_items(id) on delete cascade,
  feedback_type text not null check (feedback_type in (
    'not_interested','show_more','show_fewer','hide_source'
  )),
  source_key text,
  created_at timestamptz not null default now()
);

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  slug text not null,
  excerpt text,
  content_html text not null default '',
  content_json jsonb,
  cover_image_url text,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','published','unpublished')),
  published_at timestamptz,
  reading_time_minutes int,
  like_count int not null default 0,
  comment_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (author_id, slug)
);

create index if not exists blogs_published_idx on public.blogs (status, published_at desc nulls last);

alter table public.bookmarks
  drop constraint if exists bookmarks_blog_id_fkey;
alter table public.bookmarks
  add constraint bookmarks_blog_id_fkey foreign key (blog_id) references public.blogs(id) on delete cascade;

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.blogs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_reactions (
  blog_id uuid not null references public.blogs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  reaction text not null default 'like',
  created_at timestamptz not null default now(),
  primary key (blog_id, user_id)
);

create table if not exists public.roadmaps (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  role_name text not null,
  category text not null,
  summary text not null,
  overview jsonb not null default '{}'::jsonb,
  prerequisites jsonb not null default '[]'::jsonb,
  difficulty text default 'beginner',
  estimated_months int,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.roadmap_stages (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid not null references public.roadmaps(id) on delete cascade,
  stage_order int not null,
  title text not null,
  description text not null,
  why_it_matters text,
  created_at timestamptz not null default now(),
  unique (roadmap_id, stage_order)
);

create table if not exists public.roadmap_topics (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid not null references public.roadmap_stages(id) on delete cascade,
  topic_order int not null,
  title text not null,
  description text not null,
  why_it_matters text,
  project_ideas text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (stage_id, topic_order)
);

create table if not exists public.roadmap_resources (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.roadmap_topics(id) on delete cascade,
  title text not null,
  description text,
  url text not null,
  platform text,
  difficulty text check (difficulty in ('beginner','intermediate','advanced')),
  is_free boolean,
  resource_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_roadmap_follows (
  user_id uuid not null references public.profiles(id) on delete cascade,
  roadmap_id uuid not null references public.roadmaps(id) on delete cascade,
  started_at timestamptz not null default now(),
  last_active_at timestamptz not null default now(),
  primary key (user_id, roadmap_id)
);

create table if not exists public.user_topic_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic_id uuid not null references public.roadmap_topics(id) on delete cascade,
  status text not null default 'not_started' check (status in (
    'not_started','learning','completed','skipped'
  )),
  notes text,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

create table if not exists public.user_resource_saves (
  user_id uuid not null references public.profiles(id) on delete cascade,
  resource_id uuid not null references public.roadmap_resources(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, resource_id)
);

create table if not exists public.user_stats (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  xp int not null default 0,
  level int not null default 1,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_active_date date,
  articles_read int not null default 0,
  videos_discovered int not null default 0,
  blogs_published int not null default 0,
  topics_completed int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  activity_type text not null,
  xp_earned int not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  icon text,
  xp_reward int not null default 0
);

create table if not exists public.user_achievements (
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

-- Auto-create profile + stats on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, username)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    lower(replace(coalesce(split_part(new.email, '@', 1), 'user'), '.', '_')) || '_' || substr(new.id::text, 1, 4)
  )
  on conflict (id) do nothing;

  insert into public.user_stats (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Seed content sources
insert into public.content_sources (key, name, base_url, quality_score) values
  ('devto', 'DEV Community', 'https://dev.to', 0.85),
  ('hashnode', 'Hashnode', 'https://hashnode.com', 0.8),
  ('hackernews', 'Hacker News', 'https://news.ycombinator.com', 0.9),
  ('medium', 'Medium', 'https://medium.com', 0.75),
  ('substack', 'Substack', 'https://substack.com', 0.75),
  ('reddit', 'Reddit', 'https://www.reddit.com', 0.7),
  ('youtube', 'YouTube', 'https://www.youtube.com', 0.8),
  ('devarena', 'DevArena', null, 1.0)
on conflict (key) do nothing;

-- Seed achievements
insert into public.achievements (slug, name, description, icon, xp_reward) values
  ('first-article-read', 'First Article Read', 'Read your first article on DevArena', 'BookOpen', 20),
  ('first-blog-published', 'First Blog Published', 'Published your first blog post', 'PenSquare', 100),
  ('streak-7', '7-Day Learning Streak', 'Learned for 7 days in a row', 'Flame', 70),
  ('streak-30', '30-Day Learning Streak', 'Learned for 30 days in a row', 'Flame', 300),
  ('roadmap-beginner', 'Roadmap Beginner', 'Followed your first career roadmap', 'Map', 40),
  ('roadmap-explorer', 'Roadmap Explorer', 'Completed 10 roadmap topics', 'Compass', 150),
  ('knowledge-contributor', 'Knowledge Contributor', 'Published 5 blog posts', 'Sparkles', 250),
  ('consistent-learner', 'Consistent Learner', 'Earned 500 XP', 'Trophy', 50)
on conflict (slug) do nothing;

-- RLS
alter table public.profiles enable row level security;
alter table public.interests enable row level security;
alter table public.user_interests enable row level security;
alter table public.career_roles enable row level security;
alter table public.user_career_preferences enable row level security;
alter table public.learning_preferences enable row level security;
alter table public.user_learning_preferences enable row level security;
alter table public.content_sources enable row level security;
alter table public.content_items enable row level security;
alter table public.followed_communities enable row level security;
alter table public.followed_authors enable row level security;
alter table public.followed_topics enable row level security;
alter table public.bookmarks enable row level security;
alter table public.reading_history enable row level security;
alter table public.content_feedback enable row level security;
alter table public.blogs enable row level security;
alter table public.blog_comments enable row level security;
alter table public.blog_reactions enable row level security;
alter table public.roadmaps enable row level security;
alter table public.roadmap_stages enable row level security;
alter table public.roadmap_topics enable row level security;
alter table public.roadmap_resources enable row level security;
alter table public.user_roadmap_follows enable row level security;
alter table public.user_topic_progress enable row level security;
alter table public.user_resource_saves enable row level security;
alter table public.user_stats enable row level security;
alter table public.learning_activity enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;

-- Public read policies
create policy "Public profiles are viewable" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Interests readable" on public.interests for select using (true);
create policy "Careers readable" on public.career_roles for select using (true);
create policy "Learning prefs readable" on public.learning_preferences for select using (true);
create policy "Sources readable" on public.content_sources for select using (true);
create policy "Content readable" on public.content_items for select using (is_active = true);
create policy "Roadmaps readable" on public.roadmaps for select using (is_published = true);
create policy "Stages readable" on public.roadmap_stages for select using (true);
create policy "Topics readable" on public.roadmap_topics for select using (true);
create policy "Resources readable" on public.roadmap_resources for select using (true);
create policy "Achievements readable" on public.achievements for select using (true);
create policy "Published blogs readable" on public.blogs for select using (status = 'published' or author_id = auth.uid());
create policy "Blog comments readable" on public.blog_comments for select using (true);
create policy "Blog reactions readable" on public.blog_reactions for select using (true);
create policy "User stats readable" on public.user_stats for select using (true);
create policy "User achievements readable" on public.user_achievements for select using (true);

-- Own-data policies
create policy "Own interests" on public.user_interests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own careers" on public.user_career_preferences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own learning prefs" on public.user_learning_preferences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own communities" on public.followed_communities for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own authors" on public.followed_authors for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own topics follow" on public.followed_topics for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own bookmarks" on public.bookmarks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own history" on public.reading_history for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own feedback" on public.content_feedback for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own blogs write" on public.blogs for insert with check (auth.uid() = author_id);
create policy "Own blogs update" on public.blogs for update using (auth.uid() = author_id);
create policy "Own blogs delete" on public.blogs for delete using (auth.uid() = author_id);
create policy "Own comments write" on public.blog_comments for insert with check (auth.uid() = user_id);
create policy "Own comments update" on public.blog_comments for update using (auth.uid() = user_id);
create policy "Own comments delete" on public.blog_comments for delete using (auth.uid() = user_id);
create policy "Own reactions" on public.blog_reactions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own roadmap follows" on public.user_roadmap_follows for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own topic progress" on public.user_topic_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own resource saves" on public.user_resource_saves for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Own stats update" on public.user_stats for update using (auth.uid() = user_id);
create policy "Own activity insert" on public.learning_activity for insert with check (auth.uid() = user_id);
create policy "Own activity read" on public.learning_activity for select using (auth.uid() = user_id);
create policy "Own achievements insert" on public.user_achievements for insert with check (auth.uid() = user_id);
