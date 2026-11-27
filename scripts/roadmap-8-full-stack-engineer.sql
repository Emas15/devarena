-- seed full-stack-engineer
delete from public.roadmap_resources where topic_id in (
  select t.id from public.roadmap_topics t
  join public.roadmap_stages s on s.id = t.stage_id
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = 'full-stack-engineer'
);
delete from public.roadmap_topics where stage_id in (
  select s.id from public.roadmap_stages s
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = 'full-stack-engineer'
);
delete from public.roadmap_stages where roadmap_id in (
  select id from public.roadmaps where slug = 'full-stack-engineer'
);
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'full-stack-engineer',
  'Complete Full-Stack Engineering Roadmap',
  'Full-Stack Engineer',
  'Software Engineering',
  'Learn to ship complete products across UI, APIs, databases, auth, and deployment with a pragmatic full-stack workflow.',
  '{"whatTheyDo":"Full-stack engineers own features end to end—user interface, server APIs, data models, and often deployment—so products move from idea to production quickly.","problemsSolved":"They reduce handoff friction between frontend and backend, close product gaps, and deliver coherent features without waiting on multiple teams.","typicalDay":"Implementing UI flows, writing API handlers, migrating schemas, wiring auth, fixing bugs across the stack, and deploying previews.","employers":"Startups, product squads in larger companies, agencies, and teams that value end-to-end ownership.","fundamentalSkills":["HTML/CSS/JS","A frontend framework","Backend APIs","SQL databases","Authentication","Testing","Deployment","Product sense"]}'::jsonb,
  '[{"title":"Basic programming","description":"Comfort writing small programs and using the command line."},{"title":"Curiosity about product UX","description":"Full-stack work benefits from caring about both interface and data correctness."}]'::jsonb,
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
  is_published = true,
  updated_at = now();
do $$
declare
  rid uuid;
  sid uuid;
  tid uuid;
begin
  select id into rid from public.roadmaps where slug = 'full-stack-engineer';

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 1, 'Web and JavaScript foundations', 'Build confidence with HTML, CSS, JavaScript, and Git before frameworks.', 'Full-stack debugging constantly returns to web platform fundamentals.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'HTML, CSS, and responsive UI', 'Semantic markup, Flexbox/Grid, and mobile-friendly layouts.', 'Users experience your backend through the UI first.', '["Build a responsive marketing page and dashboard shell","Recreate a settings form with accessible labels"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MDN Learn Web Development', '', 'https://developer.mozilla.org/en-US/docs/Learn', 'MDN', 'beginner', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'web.dev Learn CSS', '', 'https://web.dev/learn/css', 'web.dev', 'beginner', true, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'JavaScript and Git', 'Language fundamentals, fetch/async, modules, and version control.', 'One language often spans both sides of a modern full-stack app.', '["Vanilla JS app that calls a public API","GitHub repo with meaningful commits and README"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'JavaScript.info', '', 'https://javascript.info/', 'javascript.info', 'beginner', true, 'tutorial');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Git Documentation', '', 'https://git-scm.com/doc', 'git-scm.com', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 2, 'Frontend application development', 'Build interactive UIs with React/Next.js and solid state/data-fetching habits.', 'Most full-stack roles expect strong client application skills.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'React and component-driven UI', 'Components, hooks, forms, routing, and composition.', 'Component models dominate product frontends.', '["Multi-page React app with authenticated routes stub","Reusable form components with validation"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'React Docs', '', 'https://react.dev/learn', 'react.dev', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'TypeScript Handbook', '', 'https://www.typescriptlang.org/docs/handbook/intro.html', 'typescriptlang.org', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Full-stack frameworks (Next.js)', 'Routing, server/client components, and deploying app-router style projects.', 'Modern full-stack JS often lives in one framework codebase.', '["Build a Next.js CRUD app with server actions or route handlers","Add loading/error states and basic SEO metadata"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Next.js Documentation', '', 'https://nextjs.org/docs', 'nextjs.org', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Vercel Deployment Docs', '', 'https://vercel.com/docs', 'Vercel', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 3, 'Backend APIs and databases', 'Design APIs, model data in SQL, and keep server logic secure and tested.', 'Without solid data and API design, UIs become fragile.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'HTTP APIs and server logic', 'REST handlers, validation, error shapes, and authorization checks.', 'The API is the contract between UI and data.', '["Build a notes API with ownership checks","Document endpoints with OpenAPI"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MDN HTTP Guide', '', 'https://developer.mozilla.org/en-US/docs/Web/HTTP', 'MDN', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Node.js Docs', '', 'https://nodejs.org/docs/latest/api/', 'nodejs.org', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'PostgreSQL and migrations', 'Schema design, SQL queries, indexes, and migration tooling.', 'Full-stack features almost always involve durable data.', '["Model users/projects/tasks with foreign keys","Write migrations and seed scripts"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'PostgreSQL Tutorial', '', 'https://www.postgresql.org/docs/current/tutorial.html', 'postgresql.org', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Prisma Docs', '', 'https://www.prisma.io/docs', 'Prisma', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 4, 'Auth, security, and product quality', 'Add authentication, protect routes, and raise quality with tests and accessibility.', 'Shipping full features includes login, permissions, and trustworthiness.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Authentication and sessions', 'Email/password or OAuth, session cookies vs tokens, and route protection.', 'Most products are useless without identity.', '["Add Google OAuth and protected dashboard routes","Implement role-based UI and API guards"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Auth.js Documentation', '', 'https://authjs.dev/', 'Auth.js', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Authentication Cheat Sheet', '', 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', 'OWASP', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Testing and accessibility', 'Unit/integration/E2E tests and basic a11y checks across the stack.', 'Full-stack ownership means preventing regressions yourself.', '["Add Playwright coverage for signup → create → logout","Fix keyboard navigation issues in primary flows"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Playwright Docs', '', 'https://playwright.dev/docs/intro', 'Playwright', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Testing Library Docs', '', 'https://testing-library.com/docs/', 'Testing Library', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 5, 'Deployment, DevOps lite, and observability', 'Deploy apps, manage env vars, and watch production health at a practical level.', 'A feature is not done until it runs reliably for users.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Deploying full-stack apps', 'Hosting, databases-as-a-service, CI checks, and preview environments.', 'Full-stack engineers frequently own release plumbing on small teams.', '["Deploy an app with managed Postgres and environment secrets","Add CI for lint/test before deploy"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Docker Get Started', '', 'https://docs.docker.com/get-started/', 'Docker', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GitHub Actions Docs', '', 'https://docs.github.com/en/actions', 'GitHub Docs', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Basic monitoring and error tracking', 'Logging, error reporting, and simple uptime checks.', 'You need visibility when production breaks after a full-stack change.', '["Add structured logs and an error tracker to your app","Create a simple status endpoint and uptime monitor"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Sentry Docs', '', 'https://docs.sentry.io/', 'Sentry', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenTelemetry JS Docs', '', 'https://opentelemetry.io/docs/languages/js/', 'OpenTelemetry', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 6, 'Capstone projects and career prep', 'Ship portfolio products that prove end-to-end ownership.', 'Full-stack hiring strongly favors complete shipped applications.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'End-to-end product projects', 'Auth, CRUD, payments stub or teams features, polish, and deployment.', 'Portfolio apps should look and behave like real products.', '["SaaS-style project manager with members, roles, and activity feed","Content platform with blogging, bookmarks, and search"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp Full Stack Curriculum', '', 'https://www.freecodecamp.org/learn/', 'freeCodeCamp', 'beginner', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Supabase Documentation', '', 'https://supabase.com/docs', 'Supabase', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Interview preparation', 'JS/TS, React, SQL, system design for small apps, and take-home projects.', 'Interviews test breadth plus the ability to connect layers.', '["Practice explaining architecture of your best app in 10 minutes","Timed SQL + React bugfix drills"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'System Design Primer', '', 'https://github.com/donnemartin/system-design-primer', 'GitHub', 'intermediate', true, 'repository');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GreatFrontEnd Interview Handbook', '', 'https://www.greatfrontend.com/front-end-interview-handbook', 'GreatFrontEnd', 'intermediate', true, 'article');
end $$;