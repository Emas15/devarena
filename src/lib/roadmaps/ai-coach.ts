import type { Profile } from "@/lib/types";

type TopicLite = {
  title: string;
  description?: string | null;
  why_it_matters?: string | null;
};

type StageLite = {
  title: string;
  description?: string | null;
  topics: TopicLite[];
};

export type AiCoachPlan = {
  headline: string;
  focusThisWeek: string[];
  skipOrSkim: string[];
  studyRoutine: string[];
  nextMilestone: string;
  generatedAt: string;
  mode: "rules" | "llm";
};

export function buildAiCoachPlan(input: {
  roadmapTitle: string;
  experience?: Profile["experience_level"] | null;
  interests?: string[];
  stages: StageLite[];
  completedTopicTitles?: string[];
}): AiCoachPlan {
  const experience = input.experience || "beginner";
  const completed = new Set(
    (input.completedTopicTitles ?? []).map((t) => t.toLowerCase()),
  );

  const openTopics = input.stages.flatMap((s) =>
    s.topics
      .filter((t) => !completed.has(t.title.toLowerCase()))
      .map((t) => ({ stage: s.title, topic: t })),
  );

  const foundationHeavy =
    experience === "complete_beginner" || experience === "beginner";
  const advanced =
    experience === "advanced" || experience === "professional";

  const focusPool = foundationHeavy
    ? openTopics.slice(0, 4)
    : openTopics.slice(Math.min(2, openTopics.length), Math.min(6, openTopics.length));

  const skipPool = advanced
    ? input.stages
        .slice(0, 2)
        .flatMap((s) => s.topics)
        .slice(0, 3)
        .map((t) => t.title)
    : [];

  const routine = foundationHeavy
    ? [
        "45–60 min deep work on one focus topic (notes + one small exercise).",
        "15 min reviewing why the topic matters for your target role.",
        "End with a 5-bullet summary you could explain in an interview.",
      ]
    : [
        "Build or extend a mini-project that forces the next open topic into production-shaped code.",
        "Write a short design note (trade-offs, failure modes) for what you built.",
        "Compare your approach against one resource from the current stage.",
      ];

  const interests =
    input.interests?.slice(0, 3).map((s) => s.replace(/-/g, " ")).join(", ") ||
    "your selected interests";

  const next = focusPool[0]?.topic.title
    ? `Complete “${focusPool[0].topic.title}” under ${focusPool[0].stage}, then mark it done in DevArena.`
    : "All mapped topics look complete — follow a later stage project or revisit weak spots.";

  return {
    headline: `Personalized plan for ${input.roadmapTitle} (${experience.replace(/_/g, " ")})`,
    focusThisWeek: focusPool.map(
      (f) => `${f.topic.title} — ${f.stage}${f.topic.why_it_matters ? `: ${f.topic.why_it_matters}` : ""}`,
    ),
    skipOrSkim: skipPool.length
      ? skipPool.map((t) => `Skim or skip if already solid: ${t}`)
      : [
          "Don’t skip foundations unless you can teach them — mark Skip only when you can demo the skill.",
        ],
    studyRoutine: [
      `Bias content toward: ${interests}.`,
      ...routine,
    ],
    nextMilestone: next,
    generatedAt: new Date().toISOString(),
    mode: "rules",
  };
}
