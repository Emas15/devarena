import { INTEREST_KEYWORDS, INTEREST_SUBREDDITS } from "@/lib/constants";
import type { NormalizedContent } from "@/lib/types";
import {
  type ContentAdapter,
  inferTopics,
  withDefaults,
} from "@/lib/adapters/base";

interface RedditTokenResponse {
  access_token?: string;
  expires_in?: number;
  error?: string;
  message?: string;
}

interface RedditChild {
  data?: {
    id?: string;
    name?: string;
    title?: string;
    selftext?: string;
    url?: string;
    permalink?: string;
    author?: string;
    created_utc?: number;
    score?: number;
    ups?: number;
    num_comments?: number;
    thumbnail?: string;
    subreddit?: string;
    subreddit_name_prefixed?: string;
    link_flair_text?: string | null;
    over_18?: boolean;
    upvote_ratio?: number;
  };
}

let cachedToken: { value: string; expiresAt: number } | null = null;

function resolveSlugs(interestSlugs: string[]): string[] {
  return interestSlugs.length > 0
    ? interestSlugs
    : Object.keys(INTEREST_SUBREDDITS);
}

function collectSubreddits(slugs: string[]): string[] {
  const set = new Set<string>();
  for (const slug of slugs) {
    for (const sub of INTEREST_SUBREDDITS[slug] ?? []) {
      set.add(sub.replace(/^r\//i, ""));
    }
  }
  return [...set].slice(0, 12);
}

function userAgent(): string {
  return (
    process.env.REDDIT_USER_AGENT?.trim() ||
    // Reddit blocks many datacenter UAs; browser-like UA helps public JSON/RSS.
    "Mozilla/5.0 (compatible; DevArena/1.0; +https://devarena-emas15s-projects.vercel.app)"
  );
}

async function getAccessToken(
  clientId: string,
  clientSecret: string,
): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.value;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": userAgent(),
    },
    body: "grant_type=client_credentials",
    next: { revalidate: 0 },
  });

  const json = (await res.json()) as RedditTokenResponse;
  if (!res.ok || !json.access_token) {
    throw new Error(
      json.message ||
        json.error ||
        `Reddit OAuth failed: HTTP ${res.status}`,
    );
  }

  cachedToken = {
    value: json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  };
  return json.access_token;
}

async function fetchListingOAuth(
  token: string,
  subreddit: string,
  sort: "hot" | "new",
): Promise<RedditChild[]> {
  const url = `https://oauth.reddit.com/r/${encodeURIComponent(subreddit)}/${sort}?limit=25&raw_json=1`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": userAgent(),
      Accept: "application/json",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error(`r/${subreddit}/${sort} HTTP ${res.status}`);

  const json = (await res.json()) as {
    data?: { children?: RedditChild[] };
  };
  return json.data?.children ?? [];
}

/** Public JSON / RSS — no Reddit OAuth app required. */
async function fetchListingPublic(
  subreddit: string,
  sort: "hot" | "new",
): Promise<RedditChild[]> {
  const headers = {
    "User-Agent": userAgent(),
    Accept: "application/json,text/html;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
  };

  const endpoints = [
    `https://www.reddit.com/r/${encodeURIComponent(subreddit)}/${sort}.json?limit=25&raw_json=1`,
    `https://old.reddit.com/r/${encodeURIComponent(subreddit)}/${sort}.json?limit=25&raw_json=1`,
  ];

  let lastStatus = 0;
  for (const url of endpoints) {
    const res = await fetch(url, { headers, next: { revalidate: 0 } });
    lastStatus = res.status;
    if (!res.ok) continue;
    const json = (await res.json()) as {
      data?: { children?: RedditChild[] };
    };
    const children = json.data?.children ?? [];
    if (children.length) return children;
  }

  // RSS often still works when JSON is blocked from cloud IPs.
  const rssUrl = `https://www.reddit.com/r/${encodeURIComponent(subreddit)}/${sort}/.rss?limit=25`;
  const rssRes = await fetch(rssUrl, {
    headers: { "User-Agent": userAgent(), Accept: "application/rss+xml,application/xml,text/xml,*/*" },
    next: { revalidate: 0 },
  });
  if (!rssRes.ok) {
    throw new Error(`r/${subreddit}/${sort} HTTP ${lastStatus || rssRes.status}`);
  }

  const xml = await rssRes.text();
  return parseRedditRss(xml, subreddit);
}

function parseRedditRss(xml: string, subreddit: string): RedditChild[] {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
  const children: RedditChild[] = [];

  for (const match of entries.slice(0, 25)) {
    const block = match[1] ?? "";
    const get = (tag: string) => {
      const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
      return m?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim() ?? "";
    };
    const linkMatch =
      block.match(/<link[^>]*href="([^"]+)"/i) ||
      block.match(/<link>([^<]+)<\/link>/i);
    const idRaw = get("id") || get("link") || linkMatch?.[1] || "";
    const id =
      idRaw.match(/\/comments\/([a-z0-9]+)/i)?.[1] ||
      idRaw.split("/").filter(Boolean).pop() ||
      "";
    const title = get("title");
    const author = get("name") || get("author") || "reddit";
    const updated = get("updated") || get("published");
    const content = get("content") || get("summary");
    const permalink = linkMatch?.[1]?.includes("reddit.com")
      ? linkMatch[1].replace(/^https?:\/\/(www\.)?reddit\.com/, "")
      : undefined;

    if (!id || !title) continue;
    children.push({
      kind: "t3",
      data: {
        id,
        title,
        selftext: content.replace(/<[^>]+>/g, " ").slice(0, 2000),
        author,
        permalink,
        url: linkMatch?.[1],
        created_utc: updated ? Date.parse(updated) / 1000 : undefined,
        over_18: false,
        thumbnail: undefined,
        score: undefined,
        ups: undefined,
        num_comments: undefined,
        subreddit,
        subreddit_name_prefixed: `r/${subreddit}`,
        link_flair_text: undefined,
      },
    });
  }

  return children;
}

function mapPost(child: RedditChild, slugs: string[]): NormalizedContent | null {
  const data = child.data;
  if (!data?.id || !data.title || data.over_18) return null;

  const permalink = data.permalink
    ? `https://www.reddit.com${data.permalink}`
    : undefined;
  const originalUrl = permalink || data.url;
  if (!originalUrl) return null;

  const tags = [
    data.subreddit_name_prefixed ||
      (data.subreddit ? `r/${data.subreddit}` : null),
    data.link_flair_text,
  ].filter(Boolean) as string[];

  const thumb =
    typeof data.thumbnail === "string" && data.thumbnail.startsWith("http")
      ? data.thumbnail
      : undefined;

  return withDefaults({
    externalId: data.name || data.id,
    title: data.title,
    description: data.selftext?.slice(0, 400) || undefined,
    bodyPreview: data.selftext?.slice(0, 800) || undefined,
    contentType: "reddit",
    source: "reddit",
    authorName:
      data.author && data.author !== "[deleted]" ? data.author : undefined,
    authorUrl:
      data.author && data.author !== "[deleted]"
        ? `https://www.reddit.com/user/${encodeURIComponent(data.author)}`
        : undefined,
    originalUrl,
    thumbnailUrl: thumb,
    publishedAt: data.created_utc
      ? new Date(data.created_utc * 1000).toISOString()
      : undefined,
    accessStatus: "public",
    topics: inferTopics(
      [data.title, data.selftext, data.subreddit, data.link_flair_text],
      slugs.length ? slugs : Object.keys(INTEREST_KEYWORDS),
    ),
    tags,
    engagement: {
      score: data.score ?? data.ups ?? 0,
      comments: data.num_comments ?? 0,
      upvote_ratio: data.upvote_ratio ?? null,
      subreddit: data.subreddit ?? null,
    },
  });
}

export const redditAdapter: ContentAdapter = {
  key: "reddit",

  async fetch(interestSlugs) {
    const clientId = process.env.REDDIT_CLIENT_ID?.trim();
    const clientSecret = process.env.REDDIT_CLIENT_SECRET?.trim();
    const useOAuth = Boolean(clientId && clientSecret);

    const slugs = resolveSlugs(interestSlugs);
    const subreddits = collectSubreddits(slugs);

    if (subreddits.length === 0) {
      return {
        items: [],
        error: "No INTEREST_SUBREDDITS mapped for the given interests.",
      };
    }

    try {
      const token = useOAuth
        ? await getAccessToken(clientId!, clientSecret!)
        : null;
      const items: NormalizedContent[] = [];
      const errors: string[] = [];
      const seen = new Set<string>();

      // Cap work so Hobby cron (60s) can finish without keys.
      const limitedSubs = subreddits.slice(0, 8);
      for (const sub of limitedSubs) {
        try {
          const children = token
            ? await fetchListingOAuth(token, sub, "hot")
            : await fetchListingPublic(sub, "hot");
          for (const child of children) {
            const mapped = mapPost(child, slugs);
            if (!mapped) continue;
            const key = mapped.externalId || mapped.originalUrl;
            if (seen.has(key)) continue;
            seen.add(key);
            items.push(mapped);
          }
        } catch (e) {
          errors.push(
            `r/${sub}/hot: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }

      return {
        items,
        error: errors.length ? errors.slice(0, 3).join("; ") : undefined,
      };
    } catch (e) {
      return {
        items: [],
        error: e instanceof Error ? e.message : String(e),
      };
    }
  },
};
