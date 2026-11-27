import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const roadmaps = JSON.parse(readFileSync(join("scripts", "roadmap-seed.json"), "utf8"));
const index = Number(process.argv[2] ?? 0);
const r = roadmaps[index];
if (!r) {
  console.error("No roadmap at index", index);
  process.exit(1);
}

function esc(s) {
  return String(s ?? "").replace(/'/g, "''");
}

function lit(v) {
  return `'${esc(typeof v === "string" ? v : JSON.stringify(v))}'`;
}

const parts = [];
parts.push(`-- seed ${r.slug}`);
parts.push(`delete from public.roadmap_resources where topic_id in (
  select t.id from public.roadmap_topics t
  join public.roadmap_stages s on s.id = t.stage_id
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = '${esc(r.slug)}'
);`);
parts.push(`delete from public.roadmap_topics where stage_id in (
  select s.id from public.roadmap_stages s
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = '${esc(r.slug)}'
);`);
parts.push(`delete from public.roadmap_stages where roadmap_id in (
  select id from public.roadmaps where slug = '${esc(r.slug)}'
);`);
parts.push(`insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
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
  updated_at = now();`);

parts.push(`do $$
declare
  rid uuid;
  sid uuid;
  tid uuid;
begin
  select id into rid from public.roadmaps where slug = '${esc(r.slug)}';`);

r.stages.forEach((stage, si) => {
  parts.push(`
  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, ${si + 1}, ${lit(stage.title)}, ${lit(stage.description)}, ${lit(stage.why_it_matters)})
  returning id into sid;`);

  stage.topics.forEach((topic, ti) => {
    const ideas = lit(topic.project_ideas || []);
    parts.push(`
  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, ${ti + 1}, ${lit(topic.title)}, ${lit(topic.description)}, ${lit(topic.why_it_matters)}, ${ideas}::text[])
  returning id into tid;`);

    (topic.resources || []).forEach((res) => {
      parts.push(`
  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, ${lit(res.title)}, ${lit(res.description || "")}, ${lit(res.url)}, ${lit(res.platform || "")}, ${res.difficulty ? lit(res.difficulty) : "null"}, ${res.is_free === true ? "true" : res.is_free === false ? "false" : "null"}, ${lit(res.resource_type || "")});`);
    });
  });
});

parts.push(`end $$;`);

const sql = parts.join("\n");
const out = join("scripts", `roadmap-${index}-${r.slug}.sql`);
writeFileSync(out, sql);
console.log(out);
console.log(`bytes=${Buffer.byteLength(sql)}`);
