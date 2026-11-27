import { writeFileSync } from "fs";
import { pathToFileURL } from "url";
import { createRequire } from "module";
import { register } from "node:module";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Load TS seeds via tsx if available, else dynamic import compiled path
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

async function main() {
  let allSeedRoadmaps;
  try {
    const mod = await import("tsx/esm/api");
    // fallback below
  } catch {
    // ignore
  }

  try {
    const { register: registerTsx } = await import("tsx/esm/api");
    registerTsx();
  } catch {
    // continue
  }

  const seed = await import(pathToFileURL(join(root, "src/lib/roadmaps/seed/index.ts")).href);
  allSeedRoadmaps = seed.allSeedRoadmaps;

  const statements = [];

  for (const r of allSeedRoadmaps) {
    const overview = JSON.stringify(r.overview).replace(/'/g, "''");
    const prerequisites = JSON.stringify(r.prerequisites).replace(/'/g, "''");
    statements.push(`
with upserted as (
  insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
  values (
    '${r.slug}',
    '${r.title.replace(/'/g, "''")}',
    '${r.role_name.replace(/'/g, "''")}',
    '${r.category.replace(/'/g, "''")}',
    '${r.summary.replace(/'/g, "''")}',
    '${overview}'::jsonb,
    '${prerequisites}'::jsonb,
    '${r.difficulty}',
    ${r.estimated_months},
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
    updated_at = now()
  returning id, slug
)
select id from upserted;
`);
  }

  writeFileSync(join(root, "scripts/.roadmap-seed-meta.json"), JSON.stringify(allSeedRoadmaps.map((r) => r.slug)));
  console.log(JSON.stringify({ count: allSeedRoadmaps.length, slugs: allSeedRoadmaps.map((r) => r.slug) }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
