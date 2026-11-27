-- Optional SQL stub for career roadmaps.
-- Primary seeding lives in TypeScript:
--   src/lib/roadmaps/seed/*.ts
--   src/lib/roadmaps/seed-db.ts (seedRoadmapsToDatabase)
--
-- Prefer running the TypeScript seeder so stages, topics, project ideas,
-- and resource URLs stay maintainable in one place.
--
-- Below is a minimal overview insert for the Data Engineer roadmap only,
-- useful for smoke-testing the roadmaps table without the full child graph.

insert into public.roadmaps (
  slug,
  title,
  role_name,
  category,
  summary,
  overview,
  prerequisites,
  difficulty,
  estimated_months,
  is_published
) values (
  'data-engineer',
  'Complete Data Engineering Roadmap',
  'Data Engineer',
  'Data and AI',
  'A structured path from programming and SQL foundations through pipelines, Spark, Kafka, Airflow, and cloud data platforms to portfolio-ready projects.',
  jsonb_build_object(
    'whatTheyDo', 'Data engineers design, build, and maintain reliable systems that move, transform, and store data so analysts, scientists, and products can use it with confidence.',
    'problemsSolved', 'They solve broken pipelines, inconsistent schemas, slow warehouse queries, late-arriving events, and the gap between raw source systems and trustworthy analytics tables.',
    'typicalDay', 'A typical day includes reviewing failed DAG runs, improving SQL or Spark jobs, modeling warehouse tables, coordinating with analysts on data contracts, and hardening monitoring and backfills.',
    'employers', 'Tech companies, fintech, e-commerce, healthcare, media, consulting firms, and any organization running a modern data stack or lakehouse.',
    'fundamentalSkills', jsonb_build_array(
      'Python',
      'SQL',
      'Data modeling',
      'ETL/ELT',
      'Distributed processing',
      'Cloud data services',
      'Orchestration',
      'Data quality'
    )
  ),
  jsonb_build_array(
    jsonb_build_object(
      'title', 'Basic programming comfort',
      'description', 'Ability to write simple scripts, use variables, loops, and functions. Prior Python experience helps but is not required.'
    ),
    jsonb_build_object(
      'title', 'Computer literacy',
      'description', 'Comfort with files, folders, installing software, and using a terminal or command prompt.'
    )
  ),
  'beginner',
  10,
  true
)
on conflict (slug) do update set
  title = excluded.title,
  role_name = excluded.role_name,
  category = excluded.category,
  summary = excluded.summary,
  overview = excluded.overview,
  prerequisites = excluded.prerequisites,
  difficulty = excluded.difficulty,
  estimated_months = excluded.estimated_months,
  is_published = excluded.is_published,
  updated_at = now();
