import { INTEREST_KEYWORDS } from "@/lib/constants";
import type { ContentItem } from "@/lib/types";

export interface RankOptions {
  interestSlugs: string[];
  learningPreferenceSlugs: string[];
  /** Sources the user hid via feedback (optional; feed may pre-filter) */
  hiddenSources?: string[] | Set<string>;
  /** Recently seen content ids — slightly demoted / excluded from top */
  recentContentIds?: string[] | Set<string>;
  /** Alias used by feed.ts */
  recentIds?: string[] | Set<string>;
  /** Optional override of source → quality (0–1) */
  sourceQuality?: Record<string, number>;
  /** Content ids the user asked to see more of */
  showMoreIds?: string[] | Set<string>;
  /** Content ids / topics the user asked to see fewer of */
  showFewerIds?: string[] | Set<string>;
  /** Optional generic feedback signals (−1…1) by content id / topic / source */
  feedbackSignals?: Record<string, number>;
}

const DEFAULT_SOURCE_QUALITY: Record<string, number> = {
  devarena: 1.0,
  hackernews: 0.9,
  engineering_blog: 0.88,
  devto: 0.85,
  youtube: 0.8,
  hashnode: 0.8,
  medium: 0.75,
  substack: 0.75,
  reddit: 0.7,
};

/** Learning preference slug → phrases that boost preference score */
const PREFERENCE_KEYWORDS: Record<string, string[]> = {
  "technical-tutorials": [
    "tutorial",
    "how to",
    "guide",
    "step by step",
    "getting started",
    "learn",
    "walkthrough",
  ],
  "engineering-case-studies": [
    "case study",
    "how we",
    "at scale",
    "production",
    "postmortem",
    "architecture at",
  ],
  "real-world-projects": [
    "project",
    "built",
    "building",
    "shipped",
    "side project",
    "from scratch",
  ],
  "industry-trends": [
    "trend",
    "state of",
    "2024",
    "2025",
    "2026",
    "future of",
    "landscape",
    "report",
  ],
  "personal-experiences": [
    "my experience",
    "i learned",
    "lessons learned",
    "story",
    "journey",
    "what i",
  ],
  "career-advice": [
    "career",
    "interview",
    "hiring",
    "promotion",
    "job",
    "resume",
    "salary",
  ],
  "research-deep-dives": [
    "deep dive",
    "research",
    "paper",
    "internals",
    "under the hood",
    "analysis",
  ],
  "opinion-discussions": [
    "opinion",
    "why i",
    "hot take",
    "discussion",
    "debate",
    "thoughts on",
  ],
  "interview-preparation": [
    "interview",
    "leetcode",
    "system design interview",
    "coding interview",
    "prep",
  ],
};

const W_TOPIC = 0.4;
const W_FRESHNESS = 0.25;
const W_PREFERENCE = 0.15;
const W_SOURCE = 0.1;
const W_ENGAGEMENT = 0.1;

const MS_DAY = 86_400_000;

function toSet(value?: string[] | Set<string>): Set<string> {
  if (!value) return new Set();
  return value instanceof Set ? value : new Set(value);
}

function clamp01(n: number): number {
  if (Number.isNaN(n) || !Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function itemText(item: ContentItem): string {
  return [
    item.title,
    item.description,
    item.body_preview,
    ...(item.tags ?? []),
    ...(item.topics ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/** Expand interest slugs via INTEREST_KEYWORDS (shared helper for adapters/HN) */
export function expandInterestKeywords(interestSlugs: string[]): string[] {
  const out = new Set<string>();
  for (const slug of interestSlugs) {
    out.add(slug.replace(/-/g, " "));
    for (const kw of INTEREST_KEYWORDS[slug] ?? []) {
      out.add(kw.toLowerCase());
    }
  }
  return [...out];
}

/** 0.40 — overlap between item topics/tags/text and user interests */
export function scoreTopicOverlap(
  item: ContentItem,
  interestSlugs: string[],
): number {
  if (interestSlugs.length === 0) return 0.35;

  const topics = new Set((item.topics ?? []).map((t) => t.toLowerCase()));
  const text = itemText(item);
  let hits = 0;
  let weight = 0;

  for (const slug of interestSlugs) {
    weight += 1;
    const slugNorm = slug.toLowerCase();
    if (topics.has(slugNorm)) {
      hits += 1;
      continue;
    }

    const keywords = INTEREST_KEYWORDS[slug] ?? [slug.replace(/-/g, " ")];
    const matched = keywords.some((kw) => text.includes(kw.toLowerCase()));
    if (matched || text.includes(slug.replace(/-/g, " "))) {
      hits += 0.7;
    }
  }

  return clamp01(hits / weight);
}

/** 0.25 — newer content scores higher (~30-day half-life) */
export function scoreFreshness(item: ContentItem, now = Date.now()): number {
  const raw = item.published_at || item.retrieved_at || item.created_at;
  if (!raw) return 0.2;
  const ts = new Date(raw).getTime();
  if (Number.isNaN(ts)) return 0.2;
  const ageDays = Math.max(0, (now - ts) / MS_DAY);
  return clamp01(Math.exp(-ageDays / 43));
}

/** 0.15 — learning preference keyword match */
export function scorePreference(
  item: ContentItem,
  learningPreferenceSlugs: string[],
): number {
  if (learningPreferenceSlugs.length === 0) return 0.4;

  const text = itemText(item);
  let hits = 0;

  for (const slug of learningPreferenceSlugs) {
    const phrases = PREFERENCE_KEYWORDS[slug] ?? [slug.replace(/-/g, " ")];
    if (phrases.some((p) => text.includes(p.toLowerCase()))) {
      hits += 1;
    }
  }

  return clamp01(0.25 + (hits / learningPreferenceSlugs.length) * 0.75);
}

/** 0.10 — curated source quality */
export function scoreSourceQuality(
  item: ContentItem,
  sourceQuality?: Record<string, number>,
): number {
  const table = { ...DEFAULT_SOURCE_QUALITY, ...sourceQuality };
  const q = table[item.source];
  return clamp01(typeof q === "number" ? q : 0.65);
}

/**
 * 0.10 — engagement metrics + show_more / show_fewer / feedback signals
 */
export function scoreEngagementFeedback(
  item: ContentItem,
  options: Pick<
    RankOptions,
    "showMoreIds" | "showFewerIds" | "feedbackSignals"
  >,
): number {
  const eng = item.engagement ?? {};
  const numeric = Object.values(eng).filter(
    (v): v is number => typeof v === "number" && Number.isFinite(v),
  );
  const raw = numeric.reduce((a, b) => a + Math.max(0, b), 0);
  const engagementPart = clamp01(Math.log10(1 + raw) / 4);

  let feedbackPart = 0.5;
  const showMore = toSet(options.showMoreIds);
  const showFewer = toSet(options.showFewerIds);

  if (showMore.has(item.id)) feedbackPart += 0.35;
  if (showFewer.has(item.id)) feedbackPart -= 0.35;

  if (options.feedbackSignals && Object.keys(options.feedbackSignals).length) {
    const keys = [item.id, item.source, ...(item.topics ?? [])];
    let sum = 0;
    let n = 0;
    for (const key of keys) {
      if (key in options.feedbackSignals) {
        sum += options.feedbackSignals[key];
        n += 1;
      }
    }
    if (n > 0) feedbackPart = clamp01(feedbackPart + sum / n / 2);
  }

  return clamp01(0.6 * engagementPart + 0.4 * clamp01(feedbackPart));
}

export function scoreItem(item: ContentItem, options: RankOptions): number {
  const topic = scoreTopicOverlap(item, options.interestSlugs);
  const freshness = scoreFreshness(item);
  const preference = scorePreference(item, options.learningPreferenceSlugs);
  const source = scoreSourceQuality(item, options.sourceQuality);
  const engagement = scoreEngagementFeedback(item, options);

  let score =
    W_TOPIC * topic +
    W_FRESHNESS * freshness +
    W_PREFERENCE * preference +
    W_SOURCE * source +
    W_ENGAGEMENT * engagement;

  // Soft demote recently seen items (still allow re-surface lower in feed)
  const recent = toSet(options.recentContentIds ?? options.recentIds);
  if (recent.has(item.id)) {
    score *= 0.55;
  }

  return score;
}

interface ScoredItem {
  item: ContentItem;
  score: number;
}

/**
 * Greedy diversity injection: avoid consecutive same source / primary topic
 * when alternatives exist within a score band.
 */
function injectDiversity(scored: ScoredItem[]): ContentItem[] {
  if (scored.length <= 2) return scored.map((s) => s.item);

  const remaining = [...scored];
  const out: ContentItem[] = [];
  let lastSource: string | null = null;
  let lastTopic: string | null = null;

  while (remaining.length > 0) {
    let pickIdx = 0;

    if (out.length > 0) {
      const topScore = remaining[0].score;
      const band = topScore * 0.85;
      let bestIdx = 0;
      let bestPenalty = Number.POSITIVE_INFINITY;

      for (let i = 0; i < remaining.length; i++) {
        const cand = remaining[i];
        if (cand.score < band && i > 0) break;

        const topic = cand.item.topics?.[0] ?? null;
        let penalty = 0;
        if (lastSource && cand.item.source === lastSource) penalty += 2;
        if (lastTopic && topic && topic === lastTopic) penalty += 1;
        const adjusted = penalty - cand.score * 0.01;
        if (adjusted < bestPenalty) {
          bestPenalty = adjusted;
          bestIdx = i;
        }
      }
      pickIdx = bestIdx;
    }

    const [picked] = remaining.splice(pickIdx, 1);
    out.push(picked.item);
    lastSource = picked.item.source;
    lastTopic = picked.item.topics?.[0] ?? null;
  }

  return out;
}

/**
 * Rank ContentItem[] for a user.
 * Weights: 0.40 topic + 0.25 freshness + 0.15 preference + 0.10 source + 0.10 engagement.
 * Filters hidden sources, demotes recent ids, applies diversity injection.
 */
export function rankContent(
  items: ContentItem[],
  options: RankOptions,
): ContentItem[] {
  const hidden = new Set(
    [...toSet(options.hiddenSources)].map((s) => s.toLowerCase()),
  );

  const scored: ScoredItem[] = [];

  for (const item of items) {
    if (!item?.id) continue;
    if (hidden.has(String(item.source).toLowerCase())) continue;

    scored.push({ item, score: scoreItem(item, options) });
  }

  scored.sort((a, b) => b.score - a.score);
  return injectDiversity(scored);
}
