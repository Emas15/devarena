insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'data-engineer',
  'Complete Data Engineering Roadmap',
  'Data Engineer',
  'Data and AI',
  'A structured path from programming and SQL foundations through pipelines, Spark, Kafka, Airflow, and cloud data platforms to portfolio-ready projects.',
  '{"whatTheyDo":"Data engineers design, build, and maintain reliable systems that move, transform, and store data so analysts, scientists, and products can use it with confidence.","problemsSolved":"They solve broken pipelines, inconsistent schemas, slow warehouse queries, late-arriving events, and the gap between raw source systems and trustworthy analytics tables.","typicalDay":"A typical day includes reviewing failed DAG runs, improving SQL or Spark jobs, modeling warehouse tables, coordinating with analysts on data contracts, and hardening monitoring and backfills.","employers":"Tech companies, fintech, e-commerce, healthcare, media, consulting firms, and any organization running a modern data stack or lakehouse.","fundamentalSkills":["Python","SQL","Data modeling","ETL/ELT","Distributed processing","Cloud data services","Orchestration","Data quality"]}'::jsonb,
  '[{"title":"Basic programming comfort","description":"Ability to write simple scripts, use variables, loops, and functions. Prior Python experience helps but is not required."},{"title":"Computer literacy","description":"Comfort with files, folders, installing software, and using a terminal or command prompt."},{"title":"Optional: intro CS concepts","description":"Familiarity with algorithms, data structures, and how networks/APIs work will accelerate later stages."}]'::jsonb,
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
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'backend-engineer',
  'Complete Backend Engineering Roadmap',
  'Backend Engineer',
  'Software Engineering',
  'Learn to design and ship reliable APIs, databases, auth, messaging, and production services that power applications at scale.',
  '{"whatTheyDo":"Backend engineers build server-side systems: APIs, business logic, data storage, authentication, background jobs, and integrations that clients and other services depend on.","problemsSolved":"They solve slow endpoints, inconsistent data, auth gaps, brittle integrations, and reliability issues that appear when traffic and complexity grow.","typicalDay":"Designing API contracts, writing service code and tests, tuning SQL, reviewing PRs, investigating production incidents, and collaborating with frontend and platform teams.","employers":"Product companies, startups, banks, SaaS platforms, marketplaces, and any org building multi-user applications.","fundamentalSkills":["A backend language (Node, Go, Java, Python, etc.)","HTTP and REST/GraphQL","SQL databases","Caching","Auth and security basics","Testing","Observability","System design"]}'::jsonb,
  '[{"title":"Programming basics","description":"Comfort with variables, functions, data structures, and debugging in at least one language."},{"title":"How the web works","description":"High-level understanding of browsers, HTTP requests, and client/server roles."}]'::jsonb,
  'beginner',
  9,
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
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'frontend-engineer',
  'Complete Frontend Engineering Roadmap',
  'Frontend Engineer',
  'Software Engineering',
  'Master HTML, CSS, JavaScript, modern frameworks, accessibility, performance, and product UI craft from first principles to production apps.',
  '{"whatTheyDo":"Frontend engineers build the interfaces people use—components, pages, client-side state, and the glue between design systems and APIs.","problemsSolved":"They solve confusing UX, slow pages, inaccessible UIs, brittle components, and inconsistent experiences across devices.","typicalDay":"Implementing UI from designs, refining component APIs, fixing performance/a11y issues, writing tests, and collaborating with design and backend.","employers":"SaaS companies, consumer apps, agencies, e-commerce, media, and design-system-heavy product orgs.","fundamentalSkills":["HTML/CSS","JavaScript/TypeScript","React or similar framework","Accessibility","Web performance","Testing","Design systems","Browser APIs"]}'::jsonb,
  '[{"title":"Basic computer skills","description":"Comfort installing tools, using a browser DevTools panel, and editing text files."},{"title":"Willingness to learn visual craft","description":"Frontend work sits at the intersection of engineering and UX quality."}]'::jsonb,
  'beginner',
  8,
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
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'devops-engineer',
  'Complete DevOps Engineering Roadmap',
  'DevOps Engineer',
  'Cloud and Infrastructure',
  'Learn Linux, CI/CD, containers, infrastructure as code, cloud operations, and reliability practices that ship software safely.',
  '{"whatTheyDo":"DevOps engineers connect development and operations—automating builds, deployments, infrastructure, observability, and feedback loops so teams can release frequently with confidence.","problemsSolved":"They reduce manual releases, environment drift, long recovery times, and the wall between writing code and running it in production.","typicalDay":"Improving pipelines, reviewing Terraform/K8s changes, debugging failed deploys, hardening security defaults, and partnering with developers on operability.","employers":"Software companies, cloud-native startups, enterprises modernizing delivery, and managed service providers.","fundamentalSkills":["Linux","CI/CD","Containers","Kubernetes basics","Infrastructure as code","Cloud platforms","Monitoring","Scripting"]}'::jsonb,
  '[{"title":"Basic programming or scripting","description":"Ability to write simple scripts and read application code."},{"title":"Networking fundamentals","description":"IP, DNS, HTTP, and firewalls at a conceptual level help a lot."}]'::jsonb,
  'beginner',
  9,
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
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'machine-learning-engineer',
  'Complete Machine Learning Engineering Roadmap',
  'Machine Learning Engineer',
  'Data and AI',
  'Progress from Python and math foundations through classical ML, deep learning, MLOps, and production model serving.',
  '{"whatTheyDo":"Machine learning engineers turn data and models into reliable production systems—feature pipelines, training jobs, evaluation, deployment, and monitoring.","problemsSolved":"They bridge the gap between notebooks and production: data leakage, brittle training, silent model drift, and unscalable inference.","typicalDay":"Improving datasets/features, running experiments, reviewing metrics, packaging models, debugging serving latency, and partnering with data scientists and platform teams.","employers":"Tech product companies, ads/recommendation orgs, fintech, healthcare AI teams, and ML platform groups.","fundamentalSkills":["Python","Statistics","Classical ML","Deep learning basics","Feature engineering","Experiment tracking","Model serving","MLOps"]}'::jsonb,
  '[{"title":"Programming comfort","description":"Python basics and willingness to write clean, tested code—not only notebooks."},{"title":"Math readiness","description":"High-school algebra plus willingness to learn probability, linear algebra, and calculus intuition."}]'::jsonb,
  'intermediate',
  11,
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
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'ai-engineer',
  'Complete AI Engineering Roadmap',
  'AI Engineer',
  'Data and AI',
  'Learn to build LLM-powered applications: prompting, retrieval, agents, evaluation, safety, and production AI systems.',
  '{"whatTheyDo":"AI engineers design and ship applications that use foundation models—RAG systems, agents, tool-calling workflows, eval harnesses, and productized AI features.","problemsSolved":"They solve brittle prompts, hallucinations, weak retrieval, missing evaluations, high latency/cost, and unsafe model behavior in user-facing products.","typicalDay":"Iterating prompts and retrieval, wiring tools/APIs, measuring evals, optimizing cost/latency, and collaborating with product on AI UX.","employers":"Startups building AI products, enterprise AI platform teams, SaaS companies adding copilots, and applied research engineering groups.","fundamentalSkills":["Python","LLM APIs","Prompt engineering","RAG","Embeddings & vector search","Evaluation","Agents/tools","Production backend skills"]}'::jsonb,
  '[{"title":"Software engineering basics","description":"Comfort building APIs/apps and using Git. AI engineering is applied software work."},{"title":"Python fluency","description":"Ability to write modules, call APIs, and handle async/data processing in Python."}]'::jsonb,
  'intermediate',
  8,
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
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'cloud-engineer',
  'Complete Cloud Engineering Roadmap',
  'Cloud Engineer',
  'Cloud and Infrastructure',
  'Master cloud networking, IAM, compute, storage, IaC, containers, and operational excellence across major cloud platforms.',
  '{"whatTheyDo":"Cloud engineers design, build, and operate cloud infrastructure—networking, identity, compute, storage, and platform services that applications run on.","problemsSolved":"They solve insecure defaults, sprawling accounts, unreliable deployments, cost overruns, and environments that cannot be reproduced.","typicalDay":"Writing Terraform, reviewing IAM policies, designing VPC architectures, automating provisioning, and supporting application teams with cloud landing zones.","employers":"Enterprises migrating to cloud, SaaS companies, consultancies, and cloud center-of-excellence teams.","fundamentalSkills":["Cloud networking","IAM","Compute & storage","Infrastructure as code","Containers","Observability","Cost management","Security baselines"]}'::jsonb,
  '[{"title":"Operating systems and networking basics","description":"Comfort with Linux, IP addressing, DNS, and HTTP helps accelerate cloud learning."},{"title":"Scripting ability","description":"Bash or Python for automation and glue code."}]'::jsonb,
  'beginner',
  9,
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
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'cybersecurity-engineer',
  'Complete Cybersecurity Engineering Roadmap',
  'Cybersecurity Engineer',
  'Security',
  'Build defensive security skills across networking, OS hardening, application security, cloud security, detection, and incident response.',
  '{"whatTheyDo":"Cybersecurity engineers protect systems and data by designing controls, finding weaknesses, detecting threats, and helping organizations recover from incidents.","problemsSolved":"They reduce breach risk from misconfigurations, vulnerable software, weak identity controls, and slow detection/response.","typicalDay":"Reviewing architectures, hardening systems, analyzing alerts, validating remediations, writing detection rules, and advising engineering teams on secure design.","employers":"Enterprises, security consultancies, MSSPs, fintech, healthcare, government contractors, and product security teams.","fundamentalSkills":["Networking","Operating systems","Identity & access","Application security","Cloud security","Threat detection","Incident response","Scripting"]}'::jsonb,
  '[{"title":"IT or programming fundamentals","description":"Comfort with computers, networks, and preferably basic scripting."},{"title":"Ethical mindset","description":"Security skills must be practiced legally on systems you own or have permission to test."}]'::jsonb,
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
