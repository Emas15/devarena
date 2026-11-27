do $$
declare
  rid uuid;
  sid uuid;
  tid uuid;
begin
  select id into rid from public.roadmaps where slug = 'backend-engineer';
  if rid is null then raise exception 'missing roadmap'; end if;
  delete from public.roadmap_resources where topic_id in (
    select t.id from public.roadmap_topics t
    join public.roadmap_stages s on s.id = t.stage_id
    where s.roadmap_id = rid
  );
  delete from public.roadmap_topics where stage_id in (
    select id from public.roadmap_stages where roadmap_id = rid
  );
  delete from public.roadmap_stages where roadmap_id = rid;

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 1, 'Language and tooling foundations', 'Pick a primary backend language and master its tooling, modules, testing, and package ecosystem.', 'Backend quality starts with language fluency and disciplined project structure.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Core language skills', 'Types/collections, error handling, concurrency basics, and idiomatic project layout.', 'Service code must be readable, testable, and safe under failure.', ARRAY['Build a CLI task manager with persistence and tests', 'Implement retry/backoff utilities with unit tests']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Node.js Documentation', 'Official Node.js API and guides.', 'https://nodejs.org/docs/latest/api/', 'nodejs.org', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Go Tour', 'Interactive introduction to the Go language.', 'https://go.dev/tour/', 'go.dev', 'beginner', true, 'tutorial');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Python Docs – Tutorial', 'Official Python tutorial for backend scripting and services.', 'https://docs.python.org/3/tutorial/', 'docs.python.org', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Git, testing, and package management', 'Version control, unit/integration tests, dependency management, and linting.', 'Production teams ship through reviews, CI, and automated tests.', ARRAY['Add CI that runs lint + tests on every PR', 'Write table-driven tests for core domain logic']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Git Documentation', '', 'https://git-scm.com/doc', 'git-scm.com', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Jest Documentation', 'Popular JavaScript testing framework docs.', 'https://jestjs.io/docs/getting-started', 'jestjs.io', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 2, 'HTTP, APIs, and web protocols', 'Understand HTTP semantics, REST design, status codes, validation, and API documentation.', 'APIs are the product surface for most backend systems.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'HTTP and REST', 'Methods, headers, status codes, idempotency, pagination, and resource modeling.', 'Correct HTTP design reduces client bugs and integration pain.', ARRAY['Design a versioned REST API for a bookstore', 'Add OpenAPI docs and request validation']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MDN HTTP Guide', '', 'https://developer.mozilla.org/en-US/docs/Web/HTTP', 'MDN', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenAPI Specification', '', 'https://swagger.io/specification/', 'Swagger', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'JSON:API Specification', '', 'https://jsonapi.org/', 'jsonapi.org', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'GraphQL and alternative API styles', 'When GraphQL, RPC, or event-driven APIs fit better than pure REST.', 'Backend engineers choose contracts based on client needs and coupling costs.', ARRAY['Expose a small GraphQL schema over an existing REST domain', 'Compare N+1 risks and fix them with batching']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GraphQL Official Docs', '', 'https://graphql.org/learn/', 'graphql.org', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'gRPC Documentation', '', 'https://grpc.io/docs/', 'grpc.io', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 3, 'Databases and data modeling', 'Model relational data, write efficient SQL, and understand transactions and indexing.', 'Most backend correctness and performance problems live in the database layer.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'SQL and PostgreSQL', 'Schema design, joins, indexes, transactions, and migrations.', 'Relational databases remain the default system of record.', ARRAY['Model users, roles, and orders with migrations and seed data', 'Explain query plans for a slow endpoint and add an index']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'PostgreSQL Documentation', '', 'https://www.postgresql.org/docs/current/', 'postgresql.org', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Use The Index, Luke', '', 'https://use-the-index-luke.com/', 'use-the-index-luke.com', 'intermediate', true, 'article');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'ORMs, migrations, and consistency', 'Use ORMs carefully, manage schema changes, and reason about isolation levels.', 'Schema drift and race conditions create subtle production bugs.', ARRAY['Implement optimistic locking for concurrent updates', 'Add a reversible migration strategy for a live table change']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Prisma Docs', '', 'https://www.prisma.io/docs', 'Prisma', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'PostgreSQL Transaction Isolation', '', 'https://www.postgresql.org/docs/current/transaction-iso.html', 'postgresql.org', 'advanced', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 4, 'Authentication, authorization, and security', 'Secure sessions/tokens, password handling, OAuth, RBAC, and common web vulnerabilities.', 'A broken auth layer can invalidate an otherwise excellent service.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'AuthN and AuthZ patterns', 'Sessions, JWT trade-offs, OAuth 2.0 / OpenID Connect, API keys, and RBAC.', 'Almost every product API needs trustworthy identity and permission checks.', ARRAY['Implement email/password auth with hashed passwords and refresh rotation', 'Add role-based guards to protected routes']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OAuth 2.0 Simplified (Aaron Parecki)', '', 'https://aaronparecki.com/oauth-2-simplified/', 'aaronparecki.com', 'intermediate', true, 'article');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Authentication Cheat Sheet', '', 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', 'OWASP', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Auth0 Docs – OIDC', '', 'https://auth0.com/docs/authenticate/protocols/openid-connect-protocol', 'Auth0', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Application security basics', 'Injection, XSS via APIs, CSRF, secrets management, and dependency hygiene.', 'Security is a backend responsibility, not a later add-on.', ARRAY['Threat-model a public API and document mitigations', 'Scan dependencies and fix high-severity advisories']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Top Ten', '', 'https://owasp.org/www-project-top-ten/', 'OWASP', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP API Security Top 10', '', 'https://owasp.org/API-Security/editions/2023/en/0x00-header/', 'OWASP', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 5, 'Caching, queues, and async work', 'Use Redis, message queues, and background workers for speed and reliability.', 'Not everything belongs in a request/response path.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Caching with Redis', 'Cache-aside patterns, TTLs, invalidation, and avoiding stampeding herds.', 'Caching is the fastest way to cut latency and database load when applied carefully.', ARRAY['Cache hot read endpoints with explicit invalidation', 'Measure p95 latency before and after caching']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Redis Documentation', '', 'https://redis.io/docs/', 'redis.io', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Redis University – RU101', '', 'https://university.redis.com/courses/ru101/', 'Redis University', 'beginner', true, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Background jobs and messaging', 'Queues, retries, dead-letter handling, and at-least-once processing pitfalls.', 'Emails, webhooks, exports, and fan-out work need durable async execution.', ARRAY['Build an email/notification worker with retries and idempotency keys', 'Process webhook events asynchronously with a DLQ']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'RabbitMQ Tutorials', '', 'https://www.rabbitmq.com/tutorials', 'RabbitMQ', 'intermediate', true, 'tutorial');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Apache Kafka Introduction', '', 'https://kafka.apache.org/intro', 'Apache Kafka', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 6, 'Architecture, scalability, and observability', 'Design services that scale, fail gracefully, and can be debugged in production.', 'Senior backend work is about operability as much as features.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Service design and scaling patterns', 'Stateless services, rate limiting, circuit breakers, horizontal scaling, and data partitioning basics.', 'Growth exposes design shortcuts that were invisible at low traffic.', ARRAY['Add rate limiting and structured error budgets to an API', 'Design a read-heavy feed service with caching and pagination']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Microsoft Azure Architecture Patterns', '', 'https://learn.microsoft.com/en-us/azure/architecture/patterns/', 'Microsoft Learn', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Well-Architected Framework', '', 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Logging, metrics, and tracing', 'Structured logs, RED/USE metrics, distributed tracing, and on-call readiness.', 'You cannot fix what you cannot see.', ARRAY['Instrument an API with request IDs, latency metrics, and error rates', 'Add OpenTelemetry tracing across two services']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenTelemetry Documentation', '', 'https://opentelemetry.io/docs/', 'OpenTelemetry', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Prometheus Docs', '', 'https://prometheus.io/docs/introduction/overview/', 'Prometheus', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 7, 'Projects and career preparation', 'Ship portfolio services and prepare for backend interviews and system design.', 'Demonstrable systems and clear explanations convert skills into offers.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Portfolio backend projects', 'End-to-end APIs with auth, persistence, tests, Docker, and docs.', 'Hiring managers look for production judgment, not toy CRUD alone.', ARRAY['URL shortener with analytics, rate limits, and Redis cache', 'Multi-tenant notes API with RBAC, webhooks, and worker jobs']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Twelve-Factor App', '', 'https://12factor.net/', '12factor.net', 'intermediate', true, 'article');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Docker Docs – Get Started', '', 'https://docs.docker.com/get-started/', 'Docker', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Interview and system design prep', 'Practice coding, SQL, and designing APIs/storage under constraints.', 'Backend interviews emphasize trade-offs, failure modes, and clear communication.', ARRAY['Write design docs for a rate limiter and a notification system', 'Timed SQL + coding practice set twice a week']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'System Design Primer', '', 'https://github.com/donnemartin/system-design-primer', 'GitHub', 'intermediate', true, 'repository');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp Backend Development', '', 'https://www.freecodecamp.org/learn/back-end-development-and-apis/', 'freeCodeCamp', 'beginner', true, 'course');

end $$;