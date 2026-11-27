do $$
declare
  rid uuid;
  sid uuid;
  tid uuid;
begin
  select id into rid from public.roadmaps where slug = 'frontend-engineer';
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
  values (rid, 1, 'Web foundations', 'Learn semantic HTML, modern CSS, and how browsers render pages.', 'Frameworks sit on top of the web platform—foundations transfer forever.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Semantic HTML', 'Document structure, forms, landmarks, and accessible markup defaults.', 'Good HTML is the cheapest accessibility and SEO win.', ARRAY['Build a multi-page marketing site with semantic landmarks', 'Recreate a complex form with native validation']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MDN HTML Guide', '', 'https://developer.mozilla.org/en-US/docs/Web/HTML', 'MDN', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'web.dev Learn HTML', '', 'https://web.dev/learn/html', 'web.dev', 'beginner', true, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Modern CSS layout and styling', 'Flexbox, Grid, responsive design, custom properties, and cascade layers basics.', 'Most UI polish and responsive bugs are CSS problems.', ARRAY['Build a responsive dashboard layout with CSS Grid', 'Create a themeable component using CSS variables']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MDN CSS Guide', '', 'https://developer.mozilla.org/en-US/docs/Web/CSS', 'MDN', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'web.dev Learn CSS', '', 'https://web.dev/learn/css', 'web.dev', 'beginner', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'CSS Tricks – A Complete Guide to Flexbox', '', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', 'CSS-Tricks', 'beginner', true, 'article');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 2, 'JavaScript and TypeScript', 'Language fundamentals, DOM APIs, async patterns, and typing for safer UI code.', 'Frontend application logic and framework code are JavaScript/TypeScript.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'JavaScript language and DOM', 'ES modules, promises/async, events, fetch, and DOM manipulation.', 'You need to debug the runtime beneath React or Vue.', ARRAY['Vanilla JS todo app with localStorage', 'Infinite scroll list using Intersection Observer']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'JavaScript.info', '', 'https://javascript.info/', 'javascript.info', 'beginner', true, 'tutorial');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MDN JavaScript Guide', '', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', 'MDN', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp JavaScript Algorithms', '', 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', 'freeCodeCamp', 'beginner', true, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'TypeScript for UI code', 'Types, generics, narrowing, and typing component props/events.', 'TypeScript catches entire classes of UI contract bugs early.', ARRAY['Migrate a JS app to TypeScript', 'Type a design-system Button/Input API strictly']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'TypeScript Handbook', '', 'https://www.typescriptlang.org/docs/handbook/intro.html', 'typescriptlang.org', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'TypeScript for JavaScript Programmers', '', 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html', 'typescriptlang.org', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 3, 'Modern UI frameworks', 'Build component-driven apps with React (or equivalent) and routing/state patterns.', 'Most product frontends are framework applications, not static pages.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'React fundamentals', 'Components, props, state, effects, and composition patterns.', 'React remains a dominant production UI library.', ARRAY['Build a multi-route SPA with React Router', 'Create a reusable data table with sorting/filtering']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'React Docs', '', 'https://react.dev/learn', 'react.dev', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'React Docs – Thinking in React', '', 'https://react.dev/learn/thinking-in-react', 'react.dev', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'State, data fetching, and app structure', 'Server/client state boundaries, caching, forms, and folder architecture.', 'Poor state boundaries create unmaintainable UI trees.', ARRAY['Build a dashboard that caches API data and handles loading/error states', 'Implement optimistic updates for a like/bookmark action']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'TanStack Query Docs', '', 'https://tanstack.com/query/latest/docs/framework/react/overview', 'TanStack', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Next.js Documentation', '', 'https://nextjs.org/docs', 'nextjs.org', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 4, 'Accessibility and design systems', 'Ship inclusive interfaces and reusable component libraries aligned with design.', 'Accessibility is quality. Design systems multiply team velocity.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Web accessibility', 'Keyboard support, ARIA carefully, focus management, contrast, and screen readers.', 'Inaccessible products exclude users and create legal/product risk.', ARRAY['Audit a page with Lighthouse/axe and fix critical issues', 'Build an accessible modal and dropdown from scratch']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'WAI-ARIA Authoring Practices', '', 'https://www.w3.org/WAI/ARIA/apg/', 'W3C', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'web.dev Accessibility', '', 'https://web.dev/learn/accessibility', 'web.dev', 'beginner', true, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Components and design tokens', 'Variants, composition, tokens, and documenting a component library.', 'Consistent components keep large frontends coherent.', ARRAY['Create a small design system with Button, Input, Dialog', 'Document components in Storybook with a11y checks']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Storybook Docs', '', 'https://storybook.js.org/docs', 'Storybook', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Radix Primitives', '', 'https://www.radix-ui.com/primitives/docs/overview/introduction', 'Radix', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 5, 'Performance, testing, and tooling', 'Measure Core Web Vitals, write meaningful tests, and use modern frontend tooling.', 'Fast, tested UIs survive real users and real teams.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Web performance', 'Bundle size, rendering cost, images, caching, and Core Web Vitals.', 'Performance is UX and conversion.', ARRAY['Reduce LCP/CLS on a content-heavy page', 'Code-split a route and compare bundle reports']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'web.dev Performance', '', 'https://web.dev/learn/performance', 'web.dev', 'intermediate', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Chrome DevTools Performance', '', 'https://developer.chrome.com/docs/devtools/performance', 'Chrome Developers', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Testing UI', 'Unit, component, and end-to-end testing with user-centric assertions.', 'UI regressions are expensive; good tests protect critical flows.', ARRAY['Add Testing Library coverage for forms and auth-gated UI', 'Write a Playwright smoke test for checkout or onboarding']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Testing Library Docs', '', 'https://testing-library.com/docs/', 'Testing Library', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Playwright Documentation', '', 'https://playwright.dev/docs/intro', 'Playwright', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 6, 'Production apps and career prep', 'Ship full product UIs and prepare portfolio/interview materials focused on frontend craft.', 'Employers hire people who can own UI quality end to end.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Portfolio frontend projects', 'Polished apps with responsive design, a11y, and clear README case studies.', 'Visual and interaction quality are immediately visible in hiring.', ARRAY['Build a design-system-backed SaaS settings UI', 'Create a content reader with offline caching and keyboard navigation']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'web.dev Patterns', '', 'https://web.dev/patterns/', 'web.dev', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp Front End Libraries', '', 'https://www.freecodecamp.org/learn/front-end-development-libraries/', 'freeCodeCamp', 'beginner', true, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Frontend interviews', 'JS fundamentals, CSS layout puzzles, React reasoning, and take-home UIs.', 'Frontend interviews test both engineering depth and product taste.', ARRAY['Practice building a widget in 60–90 minutes with tests', 'Record a walkthrough of accessibility decisions in a project']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GreatFrontEnd (interview topics overview)', '', 'https://www.greatfrontend.com/front-end-interview-handbook', 'GreatFrontEnd', 'intermediate', true, 'article');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MDN Web APIs', '', 'https://developer.mozilla.org/en-US/docs/Web/API', 'MDN', 'intermediate', true, 'documentation');

end $$;