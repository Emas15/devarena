import fs from "fs";
import path from "path";

const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const name = process.argv[2];
if (!name) {
  console.error("usage: node mcp-apply-payload.mjs <migration_name>");
  process.exit(1);
}
const p = JSON.parse(fs.readFileSync(path.join(dir, `_payload_${name}.json`), "utf8"));
process.stdout.write(JSON.stringify({ project_id: p.project_id, name: p.name, query: p.query }));