import type { SeedRoadmap } from "../types";

export const fullStackEngineerRoadmap: SeedRoadmap = {
  slug: "full-stack-engineer",
  title: "Complete Full-Stack Engineering Roadmap",
  role_name: "Full-Stack Engineer",
  category: "Software Engineering",
  summary:
    "Learn to ship complete products across UI, APIs, databases, auth, and deployment with a pragmatic full-stack workflow.",
  overview: {
    whatTheyDo:
      "Full-stack engineers own features end to end—user interface, server APIs, data models, and often deployment—so products move from idea to production quickly.",
    problemsSolved:
      "They reduce handoff friction between frontend and backend, close product gaps, and deliver coherent features without waiting on multiple teams.",
    typicalDay:
      "Implementing UI flows, writing API handlers, migrating schemas, wiring auth, fixing bugs across the stack, and deploying previews.",
    employers:
      "Startups, product squads in larger companies, agencies, and teams that value end-to-end ownership.",
    fundamentalSkills: [
      "HTML/CSS/JS",
      "A frontend framework",
      "Backend APIs",
      "SQL databases",
      "Authentication",
      "Testing",
      "Deployment",
      "Product sense",
    ],
  },
  prerequisites: [
    {
      title: "Basic programming",
      description: "Comfort writing small programs and using the command line.",
    },
    {
      title: "Curiosity about product UX",
      description: "Full-stack work benefits from caring about both interface and data correctness.",
    },
  ],
  difficulty: "beginner",
  estimated_months: 10,
  stages: [
    {
      title: "Web and JavaScript foundations",
      description: "Build confidence with HTML, CSS, JavaScript, and Git before frameworks.",
      why_it_matters: "Full-stack debugging constantly returns to web platform fundamentals.",
      topics: [
        {
          title: "HTML, CSS, and responsive UI",
          description: "Semantic markup, Flexbox/Grid, and mobile-friendly layouts.",
          why_it_matters: "Users experience your backend through the UI first.",
          project_ideas: [
            "Build a responsive marketing page and dashboard shell",
            "Recreate a settings form with accessible labels",
          ],
          resources: [
            {
              title: "MDN Learn Web Development",
              url: "https://developer.mozilla.org/en-US/docs/Learn",
              platform: "MDN",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "web.dev Learn CSS",
              url: "https://web.dev/learn/css",
              platform: "web.dev",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
        {
          title: "JavaScript and Git",
          description: "Language fundamentals, fetch/async, modules, and version control.",
          why_it_matters: "One language often spans both sides of a modern full-stack app.",
          project_ideas: [
            "Vanilla JS app that calls a public API",
            "GitHub repo with meaningful commits and README",
          ],
          resources: [
            {
              title: "JavaScript.info",
              url: "https://javascript.info/",
              platform: "javascript.info",
              difficulty: "beginner",
              is_free: true,
              resource_type: "tutorial",
            },
            {
              title: "Git Documentation",
              url: "https://git-scm.com/doc",
              platform: "git-scm.com",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Frontend application development",
      description: "Build interactive UIs with React/Next.js and solid state/data-fetching habits.",
      why_it_matters: "Most full-stack roles expect strong client application skills.",
      topics: [
        {
          title: "React and component-driven UI",
          description: "Components, hooks, forms, routing, and composition.",
          why_it_matters: "Component models dominate product frontends.",
          project_ideas: [
            "Multi-page React app with authenticated routes stub",
            "Reusable form components with validation",
          ],
          resources: [
            {
              title: "React Docs",
              url: "https://react.dev/learn",
              platform: "react.dev",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "TypeScript Handbook",
              url: "https://www.typescriptlang.org/docs/handbook/intro.html",
              platform: "typescriptlang.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Full-stack frameworks (Next.js)",
          description: "Routing, server/client components, and deploying app-router style projects.",
          why_it_matters: "Modern full-stack JS often lives in one framework codebase.",
          project_ideas: [
            "Build a Next.js CRUD app with server actions or route handlers",
            "Add loading/error states and basic SEO metadata",
          ],
          resources: [
            {
              title: "Next.js Documentation",
              url: "https://nextjs.org/docs",
              platform: "nextjs.org",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Vercel Deployment Docs",
              url: "https://vercel.com/docs",
              platform: "Vercel",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Backend APIs and databases",
      description: "Design APIs, model data in SQL, and keep server logic secure and tested.",
      why_it_matters: "Without solid data and API design, UIs become fragile.",
      topics: [
        {
          title: "HTTP APIs and server logic",
          description: "REST handlers, validation, error shapes, and authorization checks.",
          why_it_matters: "The API is the contract between UI and data.",
          project_ideas: [
            "Build a notes API with ownership checks",
            "Document endpoints with OpenAPI",
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
              title: "Node.js Docs",
              url: "https://nodejs.org/docs/latest/api/",
              platform: "nodejs.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "PostgreSQL and migrations",
          description: "Schema design, SQL queries, indexes, and migration tooling.",
          why_it_matters: "Full-stack features almost always involve durable data.",
          project_ideas: [
            "Model users/projects/tasks with foreign keys",
            "Write migrations and seed scripts",
          ],
          resources: [
            {
              title: "PostgreSQL Tutorial",
              url: "https://www.postgresql.org/docs/current/tutorial.html",
              platform: "postgresql.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Prisma Docs",
              url: "https://www.prisma.io/docs",
              platform: "Prisma",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Auth, security, and product quality",
      description: "Add authentication, protect routes, and raise quality with tests and accessibility.",
      why_it_matters: "Shipping full features includes login, permissions, and trustworthiness.",
      topics: [
        {
          title: "Authentication and sessions",
          description: "Email/password or OAuth, session cookies vs tokens, and route protection.",
          why_it_matters: "Most products are useless without identity.",
          project_ideas: [
            "Add Google OAuth and protected dashboard routes",
            "Implement role-based UI and API guards",
          ],
          resources: [
            {
              title: "Auth.js Documentation",
              url: "https://authjs.dev/",
              platform: "Auth.js",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "OWASP Authentication Cheat Sheet",
              url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
              platform: "OWASP",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Testing and accessibility",
          description: "Unit/integration/E2E tests and basic a11y checks across the stack.",
          why_it_matters: "Full-stack ownership means preventing regressions yourself.",
          project_ideas: [
            "Add Playwright coverage for signup → create → logout",
            "Fix keyboard navigation issues in primary flows",
          ],
          resources: [
            {
              title: "Playwright Docs",
              url: "https://playwright.dev/docs/intro",
              platform: "Playwright",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Testing Library Docs",
              url: "https://testing-library.com/docs/",
              platform: "Testing Library",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Deployment, DevOps lite, and observability",
      description: "Deploy apps, manage env vars, and watch production health at a practical level.",
      why_it_matters: "A feature is not done until it runs reliably for users.",
      topics: [
        {
          title: "Deploying full-stack apps",
          description: "Hosting, databases-as-a-service, CI checks, and preview environments.",
          why_it_matters: "Full-stack engineers frequently own release plumbing on small teams.",
          project_ideas: [
            "Deploy an app with managed Postgres and environment secrets",
            "Add CI for lint/test before deploy",
          ],
          resources: [
            {
              title: "Docker Get Started",
              url: "https://docs.docker.com/get-started/",
              platform: "Docker",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "GitHub Actions Docs",
              url: "https://docs.github.com/en/actions",
              platform: "GitHub Docs",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Basic monitoring and error tracking",
          description: "Logging, error reporting, and simple uptime checks.",
          why_it_matters: "You need visibility when production breaks after a full-stack change.",
          project_ideas: [
            "Add structured logs and an error tracker to your app",
            "Create a simple status endpoint and uptime monitor",
          ],
          resources: [
            {
              title: "Sentry Docs",
              url: "https://docs.sentry.io/",
              platform: "Sentry",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "OpenTelemetry JS Docs",
              url: "https://opentelemetry.io/docs/languages/js/",
              platform: "OpenTelemetry",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Capstone projects and career prep",
      description: "Ship portfolio products that prove end-to-end ownership.",
      why_it_matters: "Full-stack hiring strongly favors complete shipped applications.",
      topics: [
        {
          title: "End-to-end product projects",
          description: "Auth, CRUD, payments stub or teams features, polish, and deployment.",
          why_it_matters: "Portfolio apps should look and behave like real products.",
          project_ideas: [
            "SaaS-style project manager with members, roles, and activity feed",
            "Content platform with blogging, bookmarks, and search",
          ],
          resources: [
            {
              title: "freeCodeCamp Full Stack Curriculum",
              url: "https://www.freecodecamp.org/learn/",
              platform: "freeCodeCamp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "Supabase Documentation",
              url: "https://supabase.com/docs",
              platform: "Supabase",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Interview preparation",
          description: "JS/TS, React, SQL, system design for small apps, and take-home projects.",
          why_it_matters: "Interviews test breadth plus the ability to connect layers.",
          project_ideas: [
            "Practice explaining architecture of your best app in 10 minutes",
            "Timed SQL + React bugfix drills",
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
              title: "GreatFrontEnd Interview Handbook",
              url: "https://www.greatfrontend.com/front-end-interview-handbook",
              platform: "GreatFrontEnd",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
      ],
    },
  ],
};
