import type { SeedRoadmap } from "../types";

export const frontendEngineerRoadmap: SeedRoadmap = {
  slug: "frontend-engineer",
  title: "Complete Frontend Engineering Roadmap",
  role_name: "Frontend Engineer",
  category: "Software Engineering",
  summary:
    "Master HTML, CSS, JavaScript, modern frameworks, accessibility, performance, and product UI craft from first principles to production apps.",
  overview: {
    whatTheyDo:
      "Frontend engineers build the interfaces people use—components, pages, client-side state, and the glue between design systems and APIs.",
    problemsSolved:
      "They solve confusing UX, slow pages, inaccessible UIs, brittle components, and inconsistent experiences across devices.",
    typicalDay:
      "Implementing UI from designs, refining component APIs, fixing performance/a11y issues, writing tests, and collaborating with design and backend.",
    employers:
      "SaaS companies, consumer apps, agencies, e-commerce, media, and design-system-heavy product orgs.",
    fundamentalSkills: [
      "HTML/CSS",
      "JavaScript/TypeScript",
      "React or similar framework",
      "Accessibility",
      "Web performance",
      "Testing",
      "Design systems",
      "Browser APIs",
    ],
  },
  prerequisites: [
    {
      title: "Basic computer skills",
      description: "Comfort installing tools, using a browser DevTools panel, and editing text files.",
    },
    {
      title: "Willingness to learn visual craft",
      description: "Frontend work sits at the intersection of engineering and UX quality.",
    },
  ],
  difficulty: "beginner",
  estimated_months: 8,
  stages: [
    {
      title: "Web foundations",
      description: "Learn semantic HTML, modern CSS, and how browsers render pages.",
      why_it_matters: "Frameworks sit on top of the web platform—foundations transfer forever.",
      topics: [
        {
          title: "Semantic HTML",
          description: "Document structure, forms, landmarks, and accessible markup defaults.",
          why_it_matters: "Good HTML is the cheapest accessibility and SEO win.",
          project_ideas: [
            "Build a multi-page marketing site with semantic landmarks",
            "Recreate a complex form with native validation",
          ],
          resources: [
            {
              title: "MDN HTML Guide",
              url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
              platform: "MDN",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "web.dev Learn HTML",
              url: "https://web.dev/learn/html",
              platform: "web.dev",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
        {
          title: "Modern CSS layout and styling",
          description: "Flexbox, Grid, responsive design, custom properties, and cascade layers basics.",
          why_it_matters: "Most UI polish and responsive bugs are CSS problems.",
          project_ideas: [
            "Build a responsive dashboard layout with CSS Grid",
            "Create a themeable component using CSS variables",
          ],
          resources: [
            {
              title: "MDN CSS Guide",
              url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
              platform: "MDN",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "web.dev Learn CSS",
              url: "https://web.dev/learn/css",
              platform: "web.dev",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "CSS Tricks – A Complete Guide to Flexbox",
              url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
              platform: "CSS-Tricks",
              difficulty: "beginner",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
      ],
    },
    {
      title: "JavaScript and TypeScript",
      description: "Language fundamentals, DOM APIs, async patterns, and typing for safer UI code.",
      why_it_matters: "Frontend application logic and framework code are JavaScript/TypeScript.",
      topics: [
        {
          title: "JavaScript language and DOM",
          description: "ES modules, promises/async, events, fetch, and DOM manipulation.",
          why_it_matters: "You need to debug the runtime beneath React or Vue.",
          project_ideas: [
            "Vanilla JS todo app with localStorage",
            "Infinite scroll list using Intersection Observer",
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
              title: "MDN JavaScript Guide",
              url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
              platform: "MDN",
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
          ],
        },
        {
          title: "TypeScript for UI code",
          description: "Types, generics, narrowing, and typing component props/events.",
          why_it_matters: "TypeScript catches entire classes of UI contract bugs early.",
          project_ideas: [
            "Migrate a JS app to TypeScript",
            "Type a design-system Button/Input API strictly",
          ],
          resources: [
            {
              title: "TypeScript Handbook",
              url: "https://www.typescriptlang.org/docs/handbook/intro.html",
              platform: "typescriptlang.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "TypeScript for JavaScript Programmers",
              url: "https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html",
              platform: "typescriptlang.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Modern UI frameworks",
      description: "Build component-driven apps with React (or equivalent) and routing/state patterns.",
      why_it_matters: "Most product frontends are framework applications, not static pages.",
      topics: [
        {
          title: "React fundamentals",
          description: "Components, props, state, effects, and composition patterns.",
          why_it_matters: "React remains a dominant production UI library.",
          project_ideas: [
            "Build a multi-route SPA with React Router",
            "Create a reusable data table with sorting/filtering",
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
              title: "React Docs – Thinking in React",
              url: "https://react.dev/learn/thinking-in-react",
              platform: "react.dev",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "State, data fetching, and app structure",
          description: "Server/client state boundaries, caching, forms, and folder architecture.",
          why_it_matters: "Poor state boundaries create unmaintainable UI trees.",
          project_ideas: [
            "Build a dashboard that caches API data and handles loading/error states",
            "Implement optimistic updates for a like/bookmark action",
          ],
          resources: [
            {
              title: "TanStack Query Docs",
              url: "https://tanstack.com/query/latest/docs/framework/react/overview",
              platform: "TanStack",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Next.js Documentation",
              url: "https://nextjs.org/docs",
              platform: "nextjs.org",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Accessibility and design systems",
      description: "Ship inclusive interfaces and reusable component libraries aligned with design.",
      why_it_matters: "Accessibility is quality. Design systems multiply team velocity.",
      topics: [
        {
          title: "Web accessibility",
          description: "Keyboard support, ARIA carefully, focus management, contrast, and screen readers.",
          why_it_matters: "Inaccessible products exclude users and create legal/product risk.",
          project_ideas: [
            "Audit a page with Lighthouse/axe and fix critical issues",
            "Build an accessible modal and dropdown from scratch",
          ],
          resources: [
            {
              title: "WAI-ARIA Authoring Practices",
              url: "https://www.w3.org/WAI/ARIA/apg/",
              platform: "W3C",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "web.dev Accessibility",
              url: "https://web.dev/learn/accessibility",
              platform: "web.dev",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
        {
          title: "Components and design tokens",
          description: "Variants, composition, tokens, and documenting a component library.",
          why_it_matters: "Consistent components keep large frontends coherent.",
          project_ideas: [
            "Create a small design system with Button, Input, Dialog",
            "Document components in Storybook with a11y checks",
          ],
          resources: [
            {
              title: "Storybook Docs",
              url: "https://storybook.js.org/docs",
              platform: "Storybook",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Radix Primitives",
              url: "https://www.radix-ui.com/primitives/docs/overview/introduction",
              platform: "Radix",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Performance, testing, and tooling",
      description: "Measure Core Web Vitals, write meaningful tests, and use modern frontend tooling.",
      why_it_matters: "Fast, tested UIs survive real users and real teams.",
      topics: [
        {
          title: "Web performance",
          description: "Bundle size, rendering cost, images, caching, and Core Web Vitals.",
          why_it_matters: "Performance is UX and conversion.",
          project_ideas: [
            "Reduce LCP/CLS on a content-heavy page",
            "Code-split a route and compare bundle reports",
          ],
          resources: [
            {
              title: "web.dev Performance",
              url: "https://web.dev/learn/performance",
              platform: "web.dev",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "Chrome DevTools Performance",
              url: "https://developer.chrome.com/docs/devtools/performance",
              platform: "Chrome Developers",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Testing UI",
          description: "Unit, component, and end-to-end testing with user-centric assertions.",
          why_it_matters: "UI regressions are expensive; good tests protect critical flows.",
          project_ideas: [
            "Add Testing Library coverage for forms and auth-gated UI",
            "Write a Playwright smoke test for checkout or onboarding",
          ],
          resources: [
            {
              title: "Testing Library Docs",
              url: "https://testing-library.com/docs/",
              platform: "Testing Library",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Playwright Documentation",
              url: "https://playwright.dev/docs/intro",
              platform: "Playwright",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Production apps and career prep",
      description: "Ship full product UIs and prepare portfolio/interview materials focused on frontend craft.",
      why_it_matters: "Employers hire people who can own UI quality end to end.",
      topics: [
        {
          title: "Portfolio frontend projects",
          description: "Polished apps with responsive design, a11y, and clear README case studies.",
          why_it_matters: "Visual and interaction quality are immediately visible in hiring.",
          project_ideas: [
            "Build a design-system-backed SaaS settings UI",
            "Create a content reader with offline caching and keyboard navigation",
          ],
          resources: [
            {
              title: "web.dev Patterns",
              url: "https://web.dev/patterns/",
              platform: "web.dev",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "freeCodeCamp Front End Libraries",
              url: "https://www.freecodecamp.org/learn/front-end-development-libraries/",
              platform: "freeCodeCamp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
        {
          title: "Frontend interviews",
          description: "JS fundamentals, CSS layout puzzles, React reasoning, and take-home UIs.",
          why_it_matters: "Frontend interviews test both engineering depth and product taste.",
          project_ideas: [
            "Practice building a widget in 60–90 minutes with tests",
            "Record a walkthrough of accessibility decisions in a project",
          ],
          resources: [
            {
              title: "GreatFrontEnd (interview topics overview)",
              url: "https://www.greatfrontend.com/front-end-interview-handbook",
              platform: "GreatFrontEnd",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
            {
              title: "MDN Web APIs",
              url: "https://developer.mozilla.org/en-US/docs/Web/API",
              platform: "MDN",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
  ],
};
