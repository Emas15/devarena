import { readFileSync, writeFileSync } from "fs";

const roadmaps = JSON.parse(readFileSync("scripts/roadmap-seed.json", "utf8"));

function esc(s) {
  return String(s ?? "").replace(/'/g, "''");
}
function lit(v) {
  return `'${esc(typeof v === "string" ? v : JSON.stringify(v))}'`;
}

let sql = "";
for (const r of roadmaps) {
  sql += `insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  ${lit(r.slug)},
  ${lit(r.title)},
  ${lit(r.role_name)},
  ${lit(r.category)},
  ${lit(r.summary)},
  ${lit(r.overview)}::jsonb,
  ${lit(r.prerequisites)}::jsonb,
  ${lit(r.difficulty)},
  ${Number(r.estimated_months) || "null"},
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
  updated_at = now();\n`;
}

writeFileSync("scripts/roadmap-meta-only.sql", sql);
console.log("bytes", Buffer.byteLength(sql), "roadmaps", roadmaps.length);
