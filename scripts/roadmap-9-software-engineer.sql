-- seed software-engineer
delete from public.roadmap_resources where topic_id in (
  select t.id from public.roadmap_topics t
  join public.roadmap_stages s on s.id = t.stage_id
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = 'software-engineer'
);
delete from public.roadmap_topics where stage_id in (
  select s.id from public.roadmap_stages s
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = 'software-engineer'
);
delete from public.roadmap_stages where roadmap_id in (
  select id from public.roadmaps where slug = 'software-engineer'
);
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'software-engineer',
  'Complete Software Engineering Roadmap',
  'Software Engineer',
  'Software Engineering',
  'A role-agnostic path covering CS fundamentals, programming, software design, collaboration, systems thinking, and career readiness.',
  '{"whatTheyDo":"Software engineers design, implement, test, and maintain software systems that solve user and business problems across many domains.","problemsSolved":"They turn ambiguous requirements into reliable programs, reduce complexity through design, and keep systems evolvable as needs change.","typicalDay":"Writing and reviewing code, clarifying requirements, debugging, testing, documenting trade-offs, and collaborating in an engineering team.","employers":"Technology companies of all sizes, banks, governments, startups, and any organization building software products or internal tools.","fundamentalSkills":["Programming","Data structures & algorithms","Software design","Testing","Version control","Debugging","Communication","System fundamentals"]}'::jsonb,
  '[{"title":"Motivation to build","description":"Willingness to practice by writing real programs, not only watching tutorials."},{"title":"Basic computer literacy","description":"Installing tools, using files/folders, and learning from documentation."}]'::jsonb,
  'beginner',
  12,
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
  select id into rid from public.roadmaps where slug = 'software-engineer';

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 1, 'Programming fundamentals', 'Learn one language deeply: syntax, problem decomposition, and debugging habits.', 'Everything else in software engineering builds on writing correct programs.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Core programming skills', 'Variables, control flow, functions, data structures, and modular code.', 'Clear fundamentals transfer across languages and stacks.', '["Build a CLI expense tracker with tests","Implement classic utilities (todo, parser, file organizer)"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Python Tutorial', '', 'https://docs.python.org/3/tutorial/', 'docs.python.org', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp JavaScript Algorithms', '', 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', 'freeCodeCamp', 'beginner', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Go Tour', '', 'https://go.dev/tour/', 'go.dev', 'beginner', true, 'tutorial');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Git and professional workflow', 'Commits, branches, pull requests, code review etiquette, and issue tracking.', 'Software is a team sport; Git is the collaboration backbone.', '["Contribute a small fix to an open-source repo","Maintain a personal project with PR-based workflow"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Pro Git Book', '', 'https://git-scm.com/book/en/v2', 'git-scm.com', 'beginner', true, 'book');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GitHub Docs', '', 'https://docs.github.com/en', 'GitHub Docs', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 2, 'Computer science essentials', 'Data structures, algorithms, complexity, and how computers execute programs.', 'CS foundations improve design quality and interview readiness.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Data structures and algorithms', 'Arrays, hash maps, trees/graphs, sorting/searching, and Big-O reasoning.', 'Choosing the right structure prevents performance and correctness bugs.', '["Implement core data structures from scratch with tests","Solve curated algorithm problems with written explanations"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'VisuAlgo', '', 'https://visualgo.net/en', 'VisuAlgo', 'beginner', true, 'tutorial');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'CP-Algorithms', '', 'https://cp-algorithms.com/', 'cp-algorithms.com', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'LeetCode Problemset', '', 'https://leetcode.com/problemset/', 'LeetCode', 'intermediate', true, 'exercise');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'How computers and networks work', 'Memory, processes, filesystems, OS basics, and HTTP/networking overview.', 'Debugging production systems requires systems intuition.', '["Trace a web request from browser to server logs","Write a short explainer of processes vs threads"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Operating Systems: Three Easy Pieces', '', 'https://pages.cs.wisc.edu/~remzi/OSTEP/', 'OSTEP', 'intermediate', true, 'book');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MDN How the Web Works', '', 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works', 'MDN', 'beginner', true, 'article');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 3, 'Building applications', 'Apply fundamentals to web/backend/mobile-adjacent app building with databases.', 'Employers hire engineers who can ship working software.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Application architecture basics', 'Layering, APIs, MVC-like patterns, configuration, and dependency boundaries.', 'Structure keeps growing codebases maintainable.', '["Build a small web app with clear UI/API/data layers","Refactor a spaghetti script into modules with interfaces"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Twelve-Factor App', '', 'https://12factor.net/', '12factor.net', 'intermediate', true, 'article');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MariaDB / SQL learning via PostgreSQL docs', '', 'https://www.postgresql.org/docs/current/tutorial.html', 'postgresql.org', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Testing and quality', 'Unit tests, integration tests, assertions, and debugging methodology.', 'Untested software becomes unchangeable software.', '["Achieve meaningful test coverage on a core module","Practice bisecting a regression with Git"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Martin Fowler – TestPyramid', '', 'https://martinfowler.com/articles/practical-test-pyramid.html', 'martinfowler.com', 'intermediate', true, 'article');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Jest Getting Started', '', 'https://jestjs.io/docs/getting-started', 'jestjs.io', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 4, 'Software design and collaboration', 'Write readable code, design for change, and work effectively on a team.', 'Senior impact comes from design and collaboration, not only coding speed.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Clean code and design principles', 'Naming, cohesion, SOLID-inspired principles, and pragmatic abstraction.', 'Readable design reduces bugs and onboarding time.', '["Refactor a project using clearer boundaries and names","Write ADRs for two non-trivial design decisions"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Architecture Decision Records (ADR) guidance', '', 'https://adr.github.io/', 'adr.github.io', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Refactoring Guru – Design Patterns', '', 'https://refactoring.guru/design-patterns', 'refactoring.guru', 'intermediate', true, 'article');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Team engineering practices', 'Code review, documentation, agile rituals done usefully, and estimation basics.', 'Most software is built by teams with shared ownership.', '["Create a contribution guide for your project","Run a mock code review checklist on a friend''s PR"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google Engineering Practices – Code Review', '', 'https://google.github.io/eng-practices/review/', 'Google', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Atlassian Git Tutorials', '', 'https://www.atlassian.com/git/tutorials', 'Atlassian', 'beginner', true, 'tutorial');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 5, 'Systems, security, and production awareness', 'Learn enough about systems, security, and operations to build responsible software.', 'Modern engineers cannot ignore how software runs and fails in production.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Reliability and observability basics', 'Logging, metrics, failure modes, retries, and graceful degradation.', 'Real users experience outages and latency, not only happy paths.', '["Add structured logging and health checks to an app","Document failure modes for a feature you built"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google SRE Book', '', 'https://sre.google/sre-book/table-of-contents/', 'Google SRE', 'advanced', true, 'book');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Well-Architected Framework', '', 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Security hygiene for engineers', 'OWASP basics, secrets handling, dependency updates, and least privilege.', 'Every engineer shares security responsibility.', '["Audit a project for hardcoded secrets and fix them","Enable dependency scanning and resolve critical issues"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Top Ten', '', 'https://owasp.org/www-project-top-ten/', 'OWASP', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Cheat Sheet Series', '', 'https://cheatsheetseries.owasp.org/', 'OWASP', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 6, 'Specialization bridge and career preparation', 'Choose a focus area (frontend, backend, mobile, data, etc.) and prepare for hiring.', 'Software engineer is broad; depth in a direction accelerates employment.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Pick a specialization path', 'Explore frontend, backend, mobile, data, or infrastructure and deepen deliberately.', 'General foundations plus one sharp edge is a strong career combo.', '["Ship two portfolio projects in your chosen specialization","Write a learning plan for the next 90 days with milestones"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'roadmap.sh', '', 'https://roadmap.sh/', 'roadmap.sh', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp Curriculum', '', 'https://www.freecodecamp.org/learn/', 'freeCodeCamp', 'beginner', true, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Interviews, portfolio, and storytelling', 'Coding interviews, behavioral stories, resume projects, and system design intro.', 'Getting hired requires communicating impact clearly.', '["Prepare STAR stories for teamwork, conflict, and debugging","Publish polished READMEs with architecture diagrams"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'System Design Primer', '', 'https://github.com/donnemartin/system-design-primer', 'GitHub', 'intermediate', true, 'repository');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Tech Interview Handbook', '', 'https://www.techinterviewhandbook.org/', 'techinterviewhandbook.org', 'intermediate', true, 'article');
end $$;