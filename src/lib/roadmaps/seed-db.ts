import { createAdminClient } from "@/lib/supabase/admin";
import { allSeedRoadmaps } from "./seed";
import type { SeedRoadmap } from "./types";

export interface SeedRoadmapsResult {
  roadmaps: number;
  stages: number;
  topics: number;
  resources: number;
}

/**
 * Upserts curated career roadmaps into Supabase.
 * Roadmaps are upserted by slug; stages/topics/resources are replaced per roadmap
 * so re-seeding stays idempotent without orphaned children.
 */
export async function seedRoadmapsToDatabase(
  roadmaps: SeedRoadmap[] = allSeedRoadmaps,
): Promise<SeedRoadmapsResult> {
  const supabase = createAdminClient();
  const counts: SeedRoadmapsResult = {
    roadmaps: 0,
    stages: 0,
    topics: 0,
    resources: 0,
  };

  for (const roadmap of roadmaps) {
    const { data: upserted, error: roadmapError } = await supabase
      .from("roadmaps")
      .upsert(
        {
          slug: roadmap.slug,
          title: roadmap.title,
          role_name: roadmap.role_name,
          category: roadmap.category,
          summary: roadmap.summary,
          overview: roadmap.overview,
          prerequisites: roadmap.prerequisites,
          difficulty: roadmap.difficulty,
          estimated_months: roadmap.estimated_months,
          is_published: roadmap.is_published ?? true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();

    if (roadmapError || !upserted) {
      throw new Error(
        `Failed to upsert roadmap "${roadmap.slug}": ${roadmapError?.message ?? "unknown error"}`,
      );
    }

    const roadmapId = upserted.id as string;
    counts.roadmaps += 1;

    // Replace children so stage/topic/resource content tracks the TypeScript seed source of truth.
    const { data: existingStages, error: stagesQueryError } = await supabase
      .from("roadmap_stages")
      .select("id")
      .eq("roadmap_id", roadmapId);

    if (stagesQueryError) {
      throw new Error(
        `Failed to load stages for "${roadmap.slug}": ${stagesQueryError.message}`,
      );
    }

    if (existingStages && existingStages.length > 0) {
      const stageIds = existingStages.map((s) => s.id);
      const { error: deleteError } = await supabase
        .from("roadmap_stages")
        .delete()
        .in("id", stageIds);

      if (deleteError) {
        throw new Error(
          `Failed to clear stages for "${roadmap.slug}": ${deleteError.message}`,
        );
      }
    }

    for (let stageIndex = 0; stageIndex < roadmap.stages.length; stageIndex++) {
      const stage = roadmap.stages[stageIndex];
      const { data: insertedStage, error: stageError } = await supabase
        .from("roadmap_stages")
        .insert({
          roadmap_id: roadmapId,
          stage_order: stageIndex + 1,
          title: stage.title,
          description: stage.description,
          why_it_matters: stage.why_it_matters,
        })
        .select("id")
        .single();

      if (stageError || !insertedStage) {
        throw new Error(
          `Failed to insert stage "${stage.title}" on "${roadmap.slug}": ${stageError?.message ?? "unknown error"}`,
        );
      }

      counts.stages += 1;
      const stageId = insertedStage.id as string;

      for (let topicIndex = 0; topicIndex < stage.topics.length; topicIndex++) {
        const topic = stage.topics[topicIndex];
        const { data: insertedTopic, error: topicError } = await supabase
          .from("roadmap_topics")
          .insert({
            stage_id: stageId,
            topic_order: topicIndex + 1,
            title: topic.title,
            description: topic.description,
            why_it_matters: topic.why_it_matters,
            project_ideas: topic.project_ideas,
          })
          .select("id")
          .single();

        if (topicError || !insertedTopic) {
          throw new Error(
            `Failed to insert topic "${topic.title}" on "${roadmap.slug}": ${topicError?.message ?? "unknown error"}`,
          );
        }

        counts.topics += 1;
        const topicId = insertedTopic.id as string;

        if (topic.resources.length === 0) continue;

        const resourceRows = topic.resources.map((resource) => ({
          topic_id: topicId,
          title: resource.title,
          description: resource.description ?? null,
          url: resource.url,
          platform: resource.platform ?? null,
          difficulty: resource.difficulty ?? null,
          is_free: resource.is_free ?? null,
          resource_type: resource.resource_type ?? null,
        }));

        const { error: resourceError } = await supabase
          .from("roadmap_resources")
          .insert(resourceRows);

        if (resourceError) {
          throw new Error(
            `Failed to insert resources for topic "${topic.title}" on "${roadmap.slug}": ${resourceError.message}`,
          );
        }

        counts.resources += resourceRows.length;
      }
    }
  }

  return counts;
}
