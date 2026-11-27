import type { SeedRoadmap } from "../types";

export const backendEngineerRoadmap: SeedRoadmap = {
  slug: "backend-engineer",
  title: "Complete Backend Engineering Roadmap",
  role_name: "Backend Engineer",
  category: "Software Engineering",
  summary:
    "Learn to design and ship reliable APIs, databases, auth, messaging, and production services that power applications at scale.",
  overview: {
    whatTheyDo:
      "Backend engineers build server-side systems: APIs, business logic, data storage, authentication, background jobs, and integrations that clients and other services depend on.",
    problemsSolved:
      "They solve slow endpoints, inconsistent data, auth gaps, brittle integrations, and reliability issues that appear when traffic and complexity grow.",
    typicalDay:
      "Designing API contracts, writing service code and tests, tuning SQL, reviewing PRs, investigating production incidents, and collaborating with frontend and platform teams.",
    employers:
      "Product companies, startups, banks, SaaS platforms, marketplaces, and any org building multi-user applications.",
    fundamentalSkills: [
      "A backend language (Node, Go, Java, Python, etc.)",
      "HTTP and REST/GraphQL",
      "SQL databases",
      "Caching",
      "Auth and security basics",
      "Testing",
      "Observability",
      "System design",
    ],
  },
  prerequisites: [
    {
      title: "Programming basics",
      description: "Comfort with variables, functions, data structures, and debugging in at least one language.",
    },
    {
      title: "How the web works",
      description: "High-level understanding of browsers, HTTP requests, and client/server roles.",
    },
  ],
  difficulty: "beginner",
  estimated_months: 9,
  stages: [
    {
      title: "Language and tooling foundations",
      description: "Pick a primary backend language and master its tooling, modules, testing, and package ecosystem.",
      why_it_matters: "Backend quality starts with language fluency and disciplined project structure.",
      topics: [
        {
          title: "Core language skills",
          description: "Types/collections, error handling, concurrency basics, and idiomatic project layout.",
          why_it_matters: "Service code must be readable, testable, and safe under failure.",
          project_ideas: [
            "Build a CLI task manager with persistence and tests",
            "Implement retry/backoff utilities with unit tests",
          ],
          resources: [
            {
              title: "Node.js Documentation",
              description: "Official Node.js API and guides.",
              url: "https://nodejs.org/docs/latest/api/",
              platform: "nodejs.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Go Tour",
              description: "Interactive introduction to the Go language.",
              url: "https://go.dev/tour/",
              platform: "go.dev",
              difficulty: "beginner",
              is_free: true,
              resource_type: "tutorial",
            },
            {
              title: "Python Docs – Tutorial",
              description: "Official Python tutorial for backend scripting and services.",
              url: "https://docs.python.org/3/tutorial/",
              platform: "docs.python.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Git, testing, and package management",
          description: "Version control, unit/integration tests, dependency management, and linting.",
          why_it_matters: "Production teams ship through reviews, CI, and automated tests.",
          project_ideas: [
            "Add CI that runs lint + tests on every PR",
            "Write table-driven tests for core domain logic",
          ],
          resources: [
            {
              title: "Git Documentation",
              url: "https://git-scm.com/doc",
              platform: "git-scm.com",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Jest Documentation",
              description: "Popular JavaScript testing framework docs.",
              url: "https://jestjs.io/docs/getting-started",
              platform: "jestjs.io",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "HTTP, APIs, and web protocols",
      description: "Understand HTTP semantics, REST design, status codes, validation, and API documentation.",
      why_it_matters: "APIs are the product surface for most backend systems.",
      topics: [
        {
          title: "HTTP and REST",
          description: "Methods, headers, status codes, idempotency, pagination, and resource modeling.",
          why_it_matters: "Correct HTTP design reduces client bugs and integration pain.",
          project_ideas: [
            "Design a versioned REST API for a bookstore",
            "Add OpenAPI docs and request validation",
          ],
          resources: [
            {
              title: "MDN HTTP Guide",
              url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
              platform: "MDN",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "OpenAPI Specification",
              url: "https://swagger.io/specification/",
              platform: "Swagger",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "JSON:API Specification",
              url: "https://jsonapi.org/",
              platform: "jsonapi.org",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "GraphQL and alternative API styles",
          description: "When GraphQL, RPC, or event-driven APIs fit better than pure REST.",
          why_it_matters: "Backend engineers choose contracts based on client needs and coupling costs.",
          project_ideas: [
            "Expose a small GraphQL schema over an existing REST domain",
            "Compare N+1 risks and fix them with batching",
          ],
          resources: [
            {
              title: "GraphQL Official Docs",
              url: "https://graphql.org/learn/",
              platform: "graphql.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "gRPC Documentation",
              url: "https://grpc.io/docs/",
              platform: "grpc.io",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Databases and data modeling",
      description: "Model relational data, write efficient SQL, and understand transactions and indexing.",
      why_it_matters: "Most backend correctness and performance problems live in the database layer.",
      topics: [
        {
          title: "SQL and PostgreSQL",
          description: "Schema design, joins, indexes, transactions, and migrations.",
          why_it_matters: "Relational databases remain the default system of record.",
          project_ideas: [
            "Model users, roles, and orders with migrations and seed data",
            "Explain query plans for a slow endpoint and add an index",
          ],
          resources: [
            {
              title: "PostgreSQL Documentation",
              url: "https://www.postgresql.org/docs/current/",
              platform: "postgresql.org",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Use The Index, Luke",
              url: "https://use-the-index-luke.com/",
              platform: "use-the-index-luke.com",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
        {
          title: "ORMs, migrations, and consistency",
          description: "Use ORMs carefully, manage schema changes, and reason about isolation levels.",
          why_it_matters: "Schema drift and race conditions create subtle production bugs.",
          project_ideas: [
            "Implement optimistic locking for concurrent updates",
            "Add a reversible migration strategy for a live table change",
          ],
          resources: [
            {
              title: "Prisma Docs",
              url: "https://www.prisma.io/docs",
              platform: "Prisma",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "PostgreSQL Transaction Isolation",
              url: "https://www.postgresql.org/docs/current/transaction-iso.html",
              platform: "postgresql.org",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Authentication, authorization, and security",
      description: "Secure sessions/tokens, password handling, OAuth, RBAC, and common web vulnerabilities.",
      why_it_matters: "A broken auth layer can invalidate an otherwise excellent service.",
      topics: [
        {
          title: "AuthN and AuthZ patterns",
          description: "Sessions, JWT trade-offs, OAuth 2.0 / OpenID Connect, API keys, and RBAC.",
          why_it_matters: "Almost every product API needs trustworthy identity and permission checks.",
          project_ideas: [
            "Implement email/password auth with hashed passwords and refresh rotation",
            "Add role-based guards to protected routes",
          ],
          resources: [
            {
              title: "OAuth 2.0 Simplified (Aaron Parecki)",
              url: "https://aaronparecki.com/oauth-2-simplified/",
              platform: "aaronparecki.com",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
            {
              title: "OWASP Authentication Cheat Sheet",
              url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
              platform: "OWASP",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Auth0 Docs – OIDC",
              url: "https://auth0.com/docs/authenticate/protocols/openid-connect-protocol",
              platform: "Auth0",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Application security basics",
          description: "Injection, XSS via APIs, CSRF, secrets management, and dependency hygiene.",
          why_it_matters: "Security is a backend responsibility, not a later add-on.",
          project_ideas: [
            "Threat-model a public API and document mitigations",
            "Scan dependencies and fix high-severity advisories",
          ],
          resources: [
            {
              title: "OWASP Top Ten",
              url: "https://owasp.org/www-project-top-ten/",
              platform: "OWASP",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "OWASP API Security Top 10",
              url: "https://owasp.org/API-Security/editions/2023/en/0x00-header/",
              platform: "OWASP",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Caching, queues, and async work",
      description: "Use Redis, message queues, and background workers for speed and reliability.",
      why_it_matters: "Not everything belongs in a request/response path.",
      topics: [
        {
          title: "Caching with Redis",
          description: "Cache-aside patterns, TTLs, invalidation, and avoiding stampeding herds.",
          why_it_matters: "Caching is the fastest way to cut latency and database load when applied carefully.",
          project_ideas: [
            "Cache hot read endpoints with explicit invalidation",
            "Measure p95 latency before and after caching",
          ],
          resources: [
            {
              title: "Redis Documentation",
              url: "https://redis.io/docs/",
              platform: "redis.io",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Redis University – RU101",
              url: "https://university.redis.com/courses/ru101/",
              platform: "Redis University",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
        {
          title: "Background jobs and messaging",
          description: "Queues, retries, dead-letter handling, and at-least-once processing pitfalls.",
          why_it_matters: "Emails, webhooks, exports, and fan-out work need durable async execution.",
          project_ideas: [
            "Build an email/notification worker with retries and idempotency keys",
            "Process webhook events asynchronously with a DLQ",
          ],
          resources: [
            {
              title: "RabbitMQ Tutorials",
              url: "https://www.rabbitmq.com/tutorials",
              platform: "RabbitMQ",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "tutorial",
            },
            {
              title: "Apache Kafka Introduction",
              url: "https://kafka.apache.org/intro",
              platform: "Apache Kafka",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Architecture, scalability, and observability",
      description: "Design services that scale, fail gracefully, and can be debugged in production.",
      why_it_matters: "Senior backend work is about operability as much as features.",
      topics: [
        {
          title: "Service design and scaling patterns",
          description: "Stateless services, rate limiting, circuit breakers, horizontal scaling, and data partitioning basics.",
          why_it_matters: "Growth exposes design shortcuts that were invisible at low traffic.",
          project_ideas: [
            "Add rate limiting and structured error budgets to an API",
            "Design a read-heavy feed service with caching and pagination",
          ],
          resources: [
            {
              title: "Microsoft Azure Architecture Patterns",
              url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/",
              platform: "Microsoft Learn",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "AWS Well-Architected Framework",
              url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Logging, metrics, and tracing",
          description: "Structured logs, RED/USE metrics, distributed tracing, and on-call readiness.",
          why_it_matters: "You cannot fix what you cannot see.",
          project_ideas: [
            "Instrument an API with request IDs, latency metrics, and error rates",
            "Add OpenTelemetry tracing across two services",
          ],
          resources: [
            {
              title: "OpenTelemetry Documentation",
              url: "https://opentelemetry.io/docs/",
              platform: "OpenTelemetry",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Prometheus Docs",
              url: "https://prometheus.io/docs/introduction/overview/",
              platform: "Prometheus",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Projects and career preparation",
      description: "Ship portfolio services and prepare for backend interviews and system design.",
      why_it_matters: "Demonstrable systems and clear explanations convert skills into offers.",
      topics: [
        {
          title: "Portfolio backend projects",
          description: "End-to-end APIs with auth, persistence, tests, Docker, and docs.",
          why_it_matters: "Hiring managers look for production judgment, not toy CRUD alone.",
          project_ideas: [
            "URL shortener with analytics, rate limits, and Redis cache",
            "Multi-tenant notes API with RBAC, webhooks, and worker jobs",
          ],
          resources: [
            {
              title: "Twelve-Factor App",
              url: "https://12factor.net/",
              platform: "12factor.net",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
            {
              title: "Docker Docs – Get Started",
              url: "https://docs.docker.com/get-started/",
              platform: "Docker",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Interview and system design prep",
          description: "Practice coding, SQL, and designing APIs/storage under constraints.",
          why_it_matters: "Backend interviews emphasize trade-offs, failure modes, and clear communication.",
          project_ideas: [
            "Write design docs for a rate limiter and a notification system",
            "Timed SQL + coding practice set twice a week",
          ],
          resources: [
            {
              title: "System Design Primer",
              url: "https://github.com/donnemartin/system-design-primer",
              platform: "GitHub",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "repository",
            },
            {
              title: "freeCodeCamp Backend Development",
              url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/",
              platform: "freeCodeCamp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
      ],
    },
  ],
};
