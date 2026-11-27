import { getLiveCacheItems, getLiveSourceStatus } from "@/lib/demo/live-cache";
import { allSeedRoadmaps } from "@/lib/roadmaps/seed";
import { DEMO_INTERESTS, DEMO_PROFILE, DEMO_STATS, DEMO_USER_ID } from "@/lib/demo/mode";

type Filter = { column: string; op: string; value: unknown };

function roadmapRows() {
  return allSeedRoadmaps.map((r, i) => ({
    id: `demo-roadmap-${i + 1}`,
    slug: r.slug,
    title: r.title,
    role_name: r.role_name,
    category: r.category,
    summary: r.summary,
    overview: r.overview,
    prerequisites: r.prerequisites,
    difficulty: r.difficulty,
    estimated_months: r.estimated_months,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

function stageRows(roadmapId: string, slug: string) {
  const seed = allSeedRoadmaps.find((r) => r.slug === slug);
  if (!seed) return [];
  return seed.stages.map((stage, i) => ({
    id: `${roadmapId}-stage-${i + 1}`,
    roadmap_id: roadmapId,
    stage_order: i + 1,
    title: stage.title,
    description: stage.description,
    why_it_matters: stage.why_it_matters,
  }));
}

function topicRows(stages: ReturnType<typeof stageRows>, slug: string) {
  const seed = allSeedRoadmaps.find((r) => r.slug === slug);
  if (!seed) return [];
  const out: Array<Record<string, unknown>> = [];
  seed.stages.forEach((stage, si) => {
    const stageId = stages[si]?.id;
    stage.topics.forEach((topic, ti) => {
      out.push({
        id: `${stageId}-topic-${ti + 1}`,
        stage_id: stageId,
        topic_order: ti + 1,
        title: topic.title,
        description: topic.description,
        why_it_matters: topic.why_it_matters,
        project_ideas: topic.project_ideas,
      });
    });
  });
  return out;
}

function resourceRows(topics: Array<Record<string, unknown>>, slug: string) {
  const seed = allSeedRoadmaps.find((r) => r.slug === slug);
  if (!seed) return [];
  const out: Array<Record<string, unknown>> = [];
  let topicIdx = 0;
  seed.stages.forEach((stage) => {
    stage.topics.forEach((topic) => {
      const topicId = topics[topicIdx]?.id;
      topicIdx += 1;
      topic.resources.forEach((resource, ri) => {
        out.push({
          id: `${topicId}-res-${ri + 1}`,
          topic_id: topicId,
          title: resource.title,
          description: resource.description ?? null,
          url: resource.url,
          platform: resource.platform ?? null,
          difficulty: resource.difficulty ?? null,
          is_free: resource.is_free ?? null,
          resource_type: resource.resource_type ?? null,
        });
      });
    });
  });
  return out;
}

function applyFilters(rows: Array<Record<string, unknown>>, filters: Filter[]) {
  return rows.filter((row) =>
    filters.every((f) => {
      const value = row[f.column];
      if (f.op === "eq") return value === f.value;
      if (f.op === "neq") return value !== f.value;
      if (f.op === "in") return Array.isArray(f.value) && f.value.includes(value);
      if (f.op === "contains") {
        const arr = value as unknown[];
        const needle = f.value as unknown[];
        return Array.isArray(arr) && needle.every((n) => arr.includes(n));
      }
      return true;
    })
  );
}

class MockQuery {
  private table: string;
  private filters: Filter[] = [];
  private orderCol: string | null = null;
  private ascending = true;
  private limitCount: number | null = null;
  private mode: "many" | "single" | "maybe" = "many";
  private payload: Record<string, unknown> | null = null;
  private action: "select" | "insert" | "update" | "upsert" | "delete" = "select";

  constructor(table: string) {
    this.table = table;
  }

  select(_columns?: string, _opts?: unknown) {
    return this;
  }

  insert(payload: Record<string, unknown> | Array<Record<string, unknown>>) {
    this.action = "insert";
    this.payload = Array.isArray(payload) ? payload[0] ?? null : payload;
    return this;
  }

  update(payload: Record<string, unknown>) {
    this.action = "update";
    this.payload = payload;
    return this;
  }

  upsert(payload: Record<string, unknown> | Array<Record<string, unknown>>) {
    this.action = "upsert";
    this.payload = Array.isArray(payload) ? payload[0] ?? null : payload;
    return this;
  }

  delete() {
    this.action = "delete";
    return this;
  }

  eq(column: string, value: unknown) {
    this.filters.push({ column, op: "eq", value });
    return this;
  }

  neq(column: string, value: unknown) {
    this.filters.push({ column, op: "neq", value });
    return this;
  }

  in(column: string, value: unknown[]) {
    this.filters.push({ column, op: "in", value });
    return this;
  }

  contains(column: string, value: unknown[]) {
    this.filters.push({ column, op: "contains", value });
    return this;
  }

  or(_expr: string) {
    return this;
  }

  order(column: string, opts?: { ascending?: boolean; nullsFirst?: boolean }) {
    this.orderCol = column;
    this.ascending = opts?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  single() {
    this.mode = "single";
    return this.execute();
  }

  maybeSingle() {
    this.mode = "maybe";
    return this.execute();
  }

  then<TResult1 = unknown, TResult2 = never>(
    onfulfilled?: ((value: { data: unknown; error: null; count?: number | null }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ) {
    return this.execute().then(onfulfilled, onrejected);
  }

  private async execute() {
    if (this.action !== "select") {
      return { data: this.payload ?? { ok: true }, error: null, count: 1 };
    }

    let rows = this.tableData();
    rows = applyFilters(rows, this.filters);

    if (this.orderCol) {
      const col = this.orderCol;
      rows = [...rows].sort((a, b) => {
        const av = a[col];
        const bv = b[col];
        if (av === bv) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        return (av > bv ? 1 : -1) * (this.ascending ? 1 : -1);
      });
    }

    if (this.limitCount != null) rows = rows.slice(0, this.limitCount);

    if (this.mode === "single" || this.mode === "maybe") {
      return { data: rows[0] ?? null, error: null };
    }

    return { data: rows, error: null, count: rows.length };
  }

  private tableData(): Array<Record<string, unknown>> {
    switch (this.table) {
      case "profiles":
        return [{ ...DEMO_PROFILE }];
      case "user_stats":
        return [{ ...DEMO_STATS }];
      case "user_interests":
        return DEMO_INTERESTS.map((slug, i) => ({
          user_id: DEMO_USER_ID,
          interest_id: `interest-${i}`,
          interests: { slug },
        }));
      case "user_learning_preferences":
        return [
          {
            user_id: DEMO_USER_ID,
            learning_preference_id: "pref-1",
            learning_preferences: { slug: "technical-tutorials" },
          },
          {
            user_id: DEMO_USER_ID,
            learning_preference_id: "pref-2",
            learning_preferences: { slug: "engineering-case-studies" },
          },
        ];
      case "roadmaps":
        return roadmapRows();
      case "roadmap_stages": {
        const roadmapFilter = this.filters.find((f) => f.column === "roadmap_id");
        const roadmapId = String(roadmapFilter?.value ?? "");
        const roadmap = roadmapRows().find((r) => r.id === roadmapId);
        return roadmap ? stageRows(roadmap.id, roadmap.slug) : [];
      }
      case "roadmap_topics": {
        const inFilter = this.filters.find((f) => f.column === "stage_id" && f.op === "in");
        const stageIds = (inFilter?.value as string[]) ?? [];
        const roadmap = roadmapRows().find((r) =>
          stageIds.some((id) => id.startsWith(r.id))
        );
        if (!roadmap) return [];
        const stages = stageRows(roadmap.id, roadmap.slug);
        return topicRows(stages, roadmap.slug).filter((t) =>
          stageIds.includes(String(t.stage_id))
        );
      }
      case "roadmap_resources": {
        const inFilter = this.filters.find((f) => f.column === "topic_id" && f.op === "in");
        const topicIds = (inFilter?.value as string[]) ?? [];
        const roadmap = roadmapRows().find((r) =>
          topicIds.some((id) => id.startsWith(r.id))
        );
        if (!roadmap) return [];
        const stages = stageRows(roadmap.id, roadmap.slug);
        const topics = topicRows(stages, roadmap.slug);
        return resourceRows(topics, roadmap.slug).filter((r) =>
          topicIds.includes(String(r.topic_id))
        );
      }
      case "content_sources": {
        const status = getLiveSourceStatus();
        const defaults = [
          { key: "devto", name: "DEV Community", quality_score: 0.85 },
          { key: "hashnode", name: "Hashnode", quality_score: 0.8 },
          { key: "hackernews", name: "Hacker News", quality_score: 0.9 },
          { key: "medium", name: "Medium", quality_score: 0.75 },
          { key: "substack", name: "Substack", quality_score: 0.75 },
          { key: "reddit", name: "Reddit", quality_score: 0.7 },
          { key: "youtube", name: "YouTube", quality_score: 0.8 },
        ];
        return defaults.map((s) => ({
          ...s,
          last_synced_at: status[s.key]?.last_synced_at ?? null,
          last_sync_status: status[s.key]?.last_sync_status ?? "idle",
          last_sync_error: status[s.key]?.last_sync_error ?? null,
        }));
      }
      case "content_items":
        return getLiveCacheItems() as unknown as Array<Record<string, unknown>>;
      case "achievements":
        return [
          { id: "a1", slug: "first-article-read", name: "First Article Read", description: "Read your first article", icon: "BookOpen", xp_reward: 20 },
          { id: "a2", slug: "roadmap-beginner", name: "Roadmap Beginner", description: "Followed a roadmap", icon: "Map", xp_reward: 40 },
        ];
      case "user_achievements":
        return [
          {
            user_id: DEMO_USER_ID,
            achievement_id: "a1",
            unlocked_at: new Date().toISOString(),
            achievements: {
              name: "First Article Read",
              description: "Read your first article",
              slug: "first-article-read",
            },
          },
        ];
      case "blogs":
      case "bookmarks":
      case "reading_history":
      case "content_feedback":
      case "followed_communities":
      case "followed_authors":
      case "followed_topics":
      case "user_roadmap_follows":
      case "user_topic_progress":
      case "learning_activity":
      case "blog_comments":
      case "blog_reactions":
      case "interests":
      case "career_roles":
      case "learning_preferences":
      default:
        return [];
    }
  }
}

export function createMockSupabase() {
  return {
    auth: {
      async getUser() {
        return {
          data: {
            user: {
              id: DEMO_USER_ID,
              email: DEMO_PROFILE.email,
              user_metadata: { full_name: DEMO_PROFILE.full_name },
              app_metadata: {},
              aud: "authenticated",
              created_at: DEMO_PROFILE.created_at,
            },
          },
          error: null,
        };
      },
      async signOut() {
        return { error: null };
      },
      async exchangeCodeForSession() {
        return { data: { session: null, user: null }, error: null };
      },
      async signInWithOAuth() {
        return { data: { url: null, provider: "google" }, error: { message: "Supabase is not configured" } };
      },
    },
    from(table: string) {
      return new MockQuery(table);
    },
    rpc() {
      return Promise.resolve({ data: null, error: null });
    },
  };
}
