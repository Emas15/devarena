export type ResourceDifficulty = "beginner" | "intermediate" | "advanced";

export interface SeedResource {
  title: string;
  description?: string;
  url: string;
  platform?: string;
  difficulty?: ResourceDifficulty;
  is_free?: boolean;
  resource_type?: string;
}

export interface SeedTopic {
  title: string;
  description: string;
  /** Why this topic matters for the role */
  why_it_matters: string;
  project_ideas: string[];
  resources: SeedResource[];
}

export interface SeedStage {
  title: string;
  description: string;
  why_it_matters: string;
  topics: SeedTopic[];
}

export interface SeedRoadmapOverview {
  whatTheyDo: string;
  problemsSolved: string;
  typicalDay: string;
  employers: string;
  fundamentalSkills: string[];
}

export interface SeedPrerequisite {
  title: string;
  description: string;
}

export interface SeedRoadmap {
  slug: string;
  title: string;
  role_name: string;
  category: string;
  summary: string;
  overview: SeedRoadmapOverview;
  prerequisites: SeedPrerequisite[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_months: number;
  is_published?: boolean;
  stages: SeedStage[];
}
