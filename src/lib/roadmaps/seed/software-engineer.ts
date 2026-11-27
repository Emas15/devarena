import type { SeedRoadmap } from "../types";

export const softwareEngineerRoadmap: SeedRoadmap = {
  slug: "software-engineer",
  title: "Complete Software Engineering Roadmap",
  role_name: "Software Engineer",
  category: "Software Engineering",
  summary:
    "A role-agnostic path covering CS fundamentals, programming, software design, collaboration, systems thinking, and career readiness.",
  overview: {
    whatTheyDo:
      "Software engineers design, implement, test, and maintain software systems that solve user and business problems across many domains.",
    problemsSolved:
      "They turn ambiguous requirements into reliable programs, reduce complexity through design, and keep systems evolvable as needs change.",
    typicalDay:
      "Writing and reviewing code, clarifying requirements, debugging, testing, documenting trade-offs, and collaborating in an engineering team.",
    employers:
      "Technology companies of all sizes, banks, governments, startups, and any organization building software products or internal tools.",
    fundamentalSkills: [
      "Programming",
      "Data structures & algorithms",
      "Software design",
      "Testing",
      "Version control",
      "Debugging",
      "Communication",
      "System fundamentals",
    ],
  },
  prerequisites: [
    {
      title: "Motivation to build",
      description: "Willingness to practice by writing real programs, not only watching tutorials.",
    },
    {
      title: "Basic computer literacy",
      description: "Installing tools, using files/folders, and learning from documentation.",
    },
  ],
  difficulty: "beginner",
  estimated_months: 12,
  stages: [
    {
      title: "Programming fundamentals",
      description: "Learn one language deeply: syntax, problem decomposition, and debugging habits.",
      why_it_matters: "Everything else in software engineering builds on writing correct programs.",
      topics: [
        {
          title: "Core programming skills",
          description: "Variables, control flow, functions, data structures, and modular code.",
          why_it_matters: "Clear fundamentals transfer across languages and stacks.",
          project_ideas: [
            "Build a CLI expense tracker with tests",
            "Implement classic utilities (todo, parser, file organizer)",
          ],
          resources: [
            {
              title: "Python Tutorial",
              url: "https://docs.python.org/3/tutorial/",
              platform: "docs.python.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "freeCodeCamp JavaScript Algorithms",
              url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
              platform: "freeCodeCamp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "Go Tour",
              url: "https://go.dev/tour/",
              platform: "go.dev",
              difficulty: "beginner",
              is_free: true,
              resource_type: "tutorial",
            },
          ],
        },
        {
          title: "Git and professional workflow",
          description: "Commits, branches, pull requests, code review etiquette, and issue tracking.",
          why_it_matters: "Software is a team sport; Git is the collaboration backbone.",
          project_ideas: [
            "Contribute a small fix to an open-source repo",
            "Maintain a personal project with PR-based workflow",
          ],
          resources: [
            {
              title: "Pro Git Book",
              url: "https://git-scm.com/book/en/v2",
              platform: "git-scm.com",
              difficulty: "beginner",
              is_free: true,
              resource_type: "book",
            },
            {
              title: "GitHub Docs",
              url: "https://docs.github.com/en",
              platform: "GitHub Docs",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Computer science essentials",
      description: "Data structures, algorithms, complexity, and how computers execute programs.",
      why_it_matters: "CS foundations improve design quality and interview readiness.",
      topics: [
        {
          title: "Data structures and algorithms",
          description: "Arrays, hash maps, trees/graphs, sorting/searching, and Big-O reasoning.",
          why_it_matters: "Choosing the right structure prevents performance and correctness bugs.",
          project_ideas: [
            "Implement core data structures from scratch with tests",
            "Solve curated algorithm problems with written explanations",
          ],
          resources: [
            {
              title: "VisuAlgo",
              url: "https://visualgo.net/en",
              platform: "VisuAlgo",
              difficulty: "beginner",
              is_free: true,
              resource_type: "tutorial",
            },
            {
              title: "CP-Algorithms",
              url: "https://cp-algorithms.com/",
              platform: "cp-algorithms.com",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "LeetCode Problemset",
              url: "https://leetcode.com/problemset/",
              platform: "LeetCode",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "exercise",
            },
          ],
        },
        {
          title: "How computers and networks work",
          description: "Memory, processes, filesystems, OS basics, and HTTP/networking overview.",
          why_it_matters: "Debugging production systems requires systems intuition.",
          project_ideas: [
            "Trace a web request from browser to server logs",
            "Write a short explainer of processes vs threads",
          ],
          resources: [
            {
              title: "Operating Systems: Three Easy Pieces",
              url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
              platform: "OSTEP",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "book",
            },
            {
              title: "MDN How the Web Works",
              url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works",
              platform: "MDN",
              difficulty: "beginner",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
      ],
    },
    {
      title: "Building applications",
      description: "Apply fundamentals to web/backend/mobile-adjacent app building with databases.",
      why_it_matters: "Employers hire engineers who can ship working software.",
      topics: [
        {
          title: "Application architecture basics",
          description: "Layering, APIs, MVC-like patterns, configuration, and dependency boundaries.",
          why_it_matters: "Structure keeps growing codebases maintainable.",
          project_ideas: [
            "Build a small web app with clear UI/API/data layers",
            "Refactor a spaghetti script into modules with interfaces",
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
              title: "MariaDB / SQL learning via PostgreSQL docs",
              url: "https://www.postgresql.org/docs/current/tutorial.html",
              platform: "postgresql.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Testing and quality",
          description: "Unit tests, integration tests, assertions, and debugging methodology.",
          why_it_matters: "Untested software becomes unchangeable software.",
          project_ideas: [
            "Achieve meaningful test coverage on a core module",
            "Practice bisecting a regression with Git",
          ],
          resources: [
            {
              title: "Martin Fowler – TestPyramid",
              url: "https://martinfowler.com/articles/practical-test-pyramid.html",
              platform: "martinfowler.com",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
            {
              title: "Jest Getting Started",
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
      title: "Software design and collaboration",
      description: "Write readable code, design for change, and work effectively on a team.",
      why_it_matters: "Senior impact comes from design and collaboration, not only coding speed.",
      topics: [
        {
          title: "Clean code and design principles",
          description: "Naming, cohesion, SOLID-inspired principles, and pragmatic abstraction.",
          why_it_matters: "Readable design reduces bugs and onboarding time.",
          project_ideas: [
            "Refactor a project using clearer boundaries and names",
            "Write ADRs for two non-trivial design decisions",
          ],
          resources: [
            {
              title: "Architecture Decision Records (ADR) guidance",
              url: "https://adr.github.io/",
              platform: "adr.github.io",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Refactoring Guru – Design Patterns",
              url: "https://refactoring.guru/design-patterns",
              platform: "refactoring.guru",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
        {
          title: "Team engineering practices",
          description: "Code review, documentation, agile rituals done usefully, and estimation basics.",
          why_it_matters: "Most software is built by teams with shared ownership.",
          project_ideas: [
            "Create a contribution guide for your project",
            "Run a mock code review checklist on a friend's PR",
          ],
          resources: [
            {
              title: "Google Engineering Practices – Code Review",
              url: "https://google.github.io/eng-practices/review/",
              platform: "Google",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Atlassian Git Tutorials",
              url: "https://www.atlassian.com/git/tutorials",
              platform: "Atlassian",
              difficulty: "beginner",
              is_free: true,
              resource_type: "tutorial",
            },
          ],
        },
      ],
    },
    {
      title: "Systems, security, and production awareness",
      description: "Learn enough about systems, security, and operations to build responsible software.",
      why_it_matters: "Modern engineers cannot ignore how software runs and fails in production.",
      topics: [
        {
          title: "Reliability and observability basics",
          description: "Logging, metrics, failure modes, retries, and graceful degradation.",
          why_it_matters: "Real users experience outages and latency, not only happy paths.",
          project_ideas: [
            "Add structured logging and health checks to an app",
            "Document failure modes for a feature you built",
          ],
          resources: [
            {
              title: "Google SRE Book",
              url: "https://sre.google/sre-book/table-of-contents/",
              platform: "Google SRE",
              difficulty: "advanced",
              is_free: true,
              resource_type: "book",
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
          title: "Security hygiene for engineers",
          description: "OWASP basics, secrets handling, dependency updates, and least privilege.",
          why_it_matters: "Every engineer shares security responsibility.",
          project_ideas: [
            "Audit a project for hardcoded secrets and fix them",
            "Enable dependency scanning and resolve critical issues",
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
              title: "OWASP Cheat Sheet Series",
              url: "https://cheatsheetseries.owasp.org/",
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
      title: "Specialization bridge and career preparation",
      description: "Choose a focus area (frontend, backend, mobile, data, etc.) and prepare for hiring.",
      why_it_matters: "Software engineer is broad; depth in a direction accelerates employment.",
      topics: [
        {
          title: "Pick a specialization path",
          description: "Explore frontend, backend, mobile, data, or infrastructure and deepen deliberately.",
          why_it_matters: "General foundations plus one sharp edge is a strong career combo.",
          project_ideas: [
            "Ship two portfolio projects in your chosen specialization",
            "Write a learning plan for the next 90 days with milestones",
          ],
          resources: [
            {
              title: "roadmap.sh",
              url: "https://roadmap.sh/",
              platform: "roadmap.sh",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "freeCodeCamp Curriculum",
              url: "https://www.freecodecamp.org/learn/",
              platform: "freeCodeCamp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
        {
          title: "Interviews, portfolio, and storytelling",
          description: "Coding interviews, behavioral stories, resume projects, and system design intro.",
          why_it_matters: "Getting hired requires communicating impact clearly.",
          project_ideas: [
            "Prepare STAR stories for teamwork, conflict, and debugging",
            "Publish polished READMEs with architecture diagrams",
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
              title: "Tech Interview Handbook",
              url: "https://www.techinterviewhandbook.org/",
              platform: "techinterviewhandbook.org",
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
