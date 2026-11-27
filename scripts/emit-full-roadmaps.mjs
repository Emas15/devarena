import { readFileSync, writeFileSync } from "fs";

const roadmaps = JSON.parse(readFileSync("scripts/roadmap-seed.json", "utf8"));

function esc(s) {
  return String(s ?? "").replace(/'/g, "''");
}
function lit(v) {
  return `'${esc(typeof v === "string" ? v : JSON.stringify(v))}'`;
}
function textArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return "ARRAY[]::text[]";
  return `ARRAY[${arr.map((x) => lit(String(x))).join(", ")}]::text[]`;
}

for (const r of roadmaps) {
  const parts = [];
  parts.push(`do $$
declare
  rid uuid;
  sid uuid;
  tid uuid;
begin
  select id into rid from public.roadmaps where slug = '${esc(r.slug)}';
  if rid is null then raise exception 'missing roadmap'; end if;
  delete from public.roadmap_resources where topic_id in (
    select t.id from public.roadmap_topics t
    join public.roadmap_stages s on s.id = t.stage_id
    where s.roadmap_id = rid
  );
  delete from public.roadmap_topics where stage_id in (
    select id from public.roadmap_stages where roadmap_id = rid
  );
  delete from public.roadmap_stages where roadmap_id = rid;`);

  for (const [si, stage] of r.stages.entries()) {
    parts.push(`
  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, ${si + 1}, ${lit(stage.title)}, ${lit(stage.description)}, ${lit(stage.why_it_matters)})
  returning id into sid;`);
    for (const [ti, topic] of stage.topics.entries()) {
      parts.push(`
  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, ${ti + 1}, ${lit(topic.title)}, ${lit(topic.description)}, ${lit(topic.why_it_matters)}, ${textArray(topic.project_ideas || [])})
  returning id into tid;`);
      for (const res of topic.resources || []) {
        parts.push(`
  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, ${lit(res.title)}, ${lit(res.description || "")}, ${lit(res.url)}, ${lit(res.platform || "")}, ${res.difficulty ? lit(res.difficulty) : "null"}, ${res.is_free === true ? "true" : res.is_free === false ? "false" : "null"}, ${lit(res.resource_type || "")});`);
      }
    }
  }
  parts.push(`
end $$;`);
  const sql = parts.join("\n");
  writeFileSync(`scripts/full-${r.slug}.sql`, sql);
  console.log(r.slug, Buffer.byteLength(sql));
}
