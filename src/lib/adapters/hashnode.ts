import { INTEREST_KEYWORDS } from "@/lib/constants";
import type { NormalizedContent } from "@/lib/types";
import {
  type ContentAdapter,
  expandInterestKeywords,
  inferTopics,
  withDefaults,
} from "@/lib/adapters/base";

const HASHNODE_GQL = "https://gql.hashnode.com";

interface HashnodePost {
  id: string;
  title: string;
  brief?: string | null;
  url: string;
  publishedAt?: string | null;
  readTimeInMinutes?: number | null;
  coverImage?: { url?: string | null } | null;
  author?: {
    name?: string | null;
    username?: string | null;
    profilePicture?: string | null;
  } | null;
  tags?: Array<{ name?: string | null; slug?: string | null }> | null;
}

const SEARCH_QUERY = `
  query SearchPosts($query: String!, $first: Int!) {
    searchPosts(first: $first, filter: { query: $query }) {
      edges {
        node {
          id
          title
          brief
          url
          publishedAt
          readTimeInMinutes
          coverImage { url }
          author { name username profilePicture }
          tags { name slug }
        }
      }
    }
  }
`;

const TAG_QUERY = `
  query TagPosts($slug: String!, $first: Int!) {
    tag(slug: $slug) {
      posts(first: $first, filter: { sortBy: recent }) {
        edges {
          node {
            id
            title
            brief
            url
            publishedAt
            readTimeInMinutes
            coverImage { url }
            author { name username profilePicture }
            tags { name slug }
          }
        }
      }
    }
  }
`;

function resolveSlugs(interestSlugs: string[]): string[] {
  return interestSlugs.length > 0 ? interestSlugs : Object.keys(INTEREST_KEYWORDS);
}

function mapPost(post: HashnodePost, slugs: string[]): NormalizedContent | null {
  if (!post?.title || !post?.url) return null;
  const tags =
    post.tags?.map((t) => t.name || t.slug || "").filter(Boolean).map(String) ??
    [];

  return withDefaults({
    externalId: post.id,
    title: post.title,
    description: post.brief || undefined,
    bodyPreview: post.brief || undefined,
    contentType: "article",
    source: "hashnode",
    authorName: post.author?.name || post.author?.username || undefined,
    authorUrl: post.author?.username
      ? `https://hashnode.com/@${post.author.username}`
      : undefined,
    authorAvatarUrl: post.author?.profilePicture || undefined,
    originalUrl: post.url,
    thumbnailUrl: post.coverImage?.url || undefined,
    publishedAt: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : undefined,
    accessStatus: "public",
    topics: inferTopics([post.title, post.brief ?? "", tags.join(" ")], slugs),
    tags,
    readingTimeMinutes: post.readTimeInMinutes ?? undefined,
  });
}

async function gql<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(HASHNODE_GQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error(`Hashnode GraphQL HTTP ${res.status}`);

  const json = (await res.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) throw new Error("Hashnode GraphQL returned no data");
  return json.data;
}

function edges(
  connection:
    | { edges?: Array<{ node?: HashnodePost | null }> | null }
    | null
    | undefined,
): HashnodePost[] {
  return (
    connection?.edges
      ?.map((e) => e.node)
      .filter((n): n is HashnodePost => Boolean(n?.title && n?.url)) ?? []
  );
}

function searchQueries(slugs: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const slug of slugs) {
    for (const kw of (INTEREST_KEYWORDS[slug] ?? [slug.replace(/-/g, " ")]).slice(
      0,
      3,
    )) {
      const q = kw.toLowerCase().trim();
      if (q.length < 2 || seen.has(q)) continue;
      seen.add(q);
      out.push(q);
    }
  }
  return out.slice(0, 8);
}

export const hashnodeAdapter: ContentAdapter = {
  key: "hashnode",

  async fetch(interestSlugs) {
    const slugs = resolveSlugs(interestSlugs);
    const items: NormalizedContent[] = [];
    const errors: string[] = [];
    const seen = new Set<string>();

    const add = (posts: HashnodePost[]) => {
      for (const post of posts) {
        if (seen.has(post.id)) continue;
        const mapped = mapPost(post, slugs);
        if (!mapped) continue;
        seen.add(post.id);
        items.push(mapped);
      }
    };

    for (const query of searchQueries(slugs)) {
      try {
        const data = await gql<{
          searchPosts?: { edges?: Array<{ node?: HashnodePost | null }> };
        }>(SEARCH_QUERY, { query, first: 10 });
        add(edges(data.searchPosts));
      } catch (e) {
        errors.push(
          `search "${query}": ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }

    if (items.length < 5) {
      const tagSlugs = [
        ...new Set(
          expandInterestKeywords(slugs).map((kw) =>
            kw
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, ""),
          ),
        ),
      ]
        .filter((s) => s.length >= 2)
        .slice(0, 8);

      for (const tag of tagSlugs) {
        try {
          const data = await gql<{
            tag?: {
              posts?: { edges?: Array<{ node?: HashnodePost | null }> };
            } | null;
          }>(TAG_QUERY, { slug: tag, first: 10 });
          add(edges(data.tag?.posts));
        } catch (e) {
          errors.push(
            `tag "${tag}": ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }
    }

    return {
      items,
      error:
        items.length === 0 && errors.length
          ? errors.slice(0, 3).join("; ")
          : errors.length
            ? errors.slice(0, 2).join("; ")
            : undefined,
    };
  },
};
