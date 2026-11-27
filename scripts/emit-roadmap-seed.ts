import { writeFileSync } from "fs";
import { join } from "path";
import { allSeedRoadmaps } from "../src/lib/roadmaps/seed";

const out = join(process.cwd(), "scripts", "roadmap-seed.json");
writeFileSync(out, JSON.stringify(allSeedRoadmaps));
console.log(`Wrote ${allSeedRoadmaps.length} roadmaps to ${out}`);
