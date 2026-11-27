export type ExperienceLevel =
  | "complete_beginner"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "professional";

export type ContentType = "article" | "reddit" | "youtube" | "blog" | "newsletter";
export type AccessStatus = "public" | "preview" | "paywalled" | "external_only";
export type ContentSourceKey =
  | "medium"
  | "substack"
  | "devto"
  | "hashnode"
  | "hackernews"
  | "reddit"
  | "youtube"
  | "devarena"
  | "engineering_blog";

export type TopicProgressStatus = "not_started" | "learning" | "completed" | "skipped";
export type BlogStatus = "draft" | "published" | "unpublished";
export type FeedbackType = "not_interested" | "show_more" | "show_fewer" | "hide_source";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  experience_level: ExperienceLevel | null;
  onboarding_completed: boolean;
  theme_preference: string | null;
  show_gamification: boolean;
  website_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentItem {
  id: string;
  external_id: string | null;
  content_hash: string;
  title: string;
  description: string | null;
  body_preview: string | null;
  body_html: string | null;
  content_type: ContentType;
  source: ContentSourceKey | string;
  author_name: string | null;
  author_url: string | null;
  author_avatar_url: string | null;
  original_url: string;
  thumbnail_url: string | null;
  published_at: string | null;
  retrieved_at: string;
  access_status: AccessStatus;
  topics: string[];
  tags: string[];
  reading_time_minutes: number | null;
  engagement: Record<string, number | string | null>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NormalizedContent {
  externalId?: string;
  title: string;
  description?: string;
  bodyPreview?: string;
  bodyHtml?: string;
  contentType: ContentType;
  source: ContentSourceKey;
  authorName?: string;
  authorUrl?: string;
  authorAvatarUrl?: string;
  originalUrl: string;
  thumbnailUrl?: string;
  publishedAt?: string;
  accessStatus?: AccessStatus;
  topics?: string[];
  tags?: string[];
  readingTimeMinutes?: number;
  engagement?: Record<string, number | string | null>;
}

export interface BlogPost {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_html: string;
  content_json: unknown;
  cover_image_url: string | null;
  tags: string[];
  status: BlogStatus;
  published_at: string | null;
  reading_time_minutes: number | null;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  profiles?: Pick<Profile, "id" | "full_name" | "username" | "avatar_url" | "bio">;
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  role_name: string;
  category: string;
  summary: string;
  overview: {
    whatTheyDo?: string;
    problemsSolved?: string;
    typicalDay?: string;
    employers?: string;
    fundamentalSkills?: string[];
  };
  prerequisites: Array<{ title: string; description: string }>;
  difficulty: string | null;
  estimated_months: number | null;
  is_published: boolean;
}

export interface RoadmapStage {
  id: string;
  roadmap_id: string;
  stage_order: number;
  title: string;
  description: string;
  why_it_matters: string | null;
}

export interface RoadmapTopic {
  id: string;
  stage_id: string;
  topic_order: number;
  title: string;
  description: string;
  why_it_matters: string | null;
  project_ideas: string[];
}

export interface RoadmapResource {
  id: string;
  topic_id: string;
  title: string;
  description: string | null;
  url: string;
  platform: string | null;
  difficulty: "beginner" | "intermediate" | "advanced" | null;
  is_free: boolean | null;
  resource_type: string | null;
}

export interface UserStats {
  user_id: string;
  xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
  articles_read: number;
  videos_discovered: number;
  blogs_published: number;
  topics_completed: number;
}

export interface SyncResult {
  source: string;
  fetched: number;
  upserted: number;
  skipped: number;
  error?: string;
}
