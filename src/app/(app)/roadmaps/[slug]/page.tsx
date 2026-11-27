import { AiCoachPanel } from "@/components/roadmaps/ai-coach-panel";
import {
  FollowRoadmapButton,
  TopicStatusControls,
} from "@/components/roadmaps/roadmap-progress";
import { Badge } from "@/components/ui/badge";
import { getProfile, requireUser } from "@/lib/auth/session";
import { isStripeConfigured } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { user } = await requireUser();
  const profile = await getProfile(user.id);
  const supabase = await createClient();

  const { data: roadmap } = await supabase
    .from("roadmaps")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!roadmap) notFound();

  const { data: stages } = await supabase
    .from("roadmap_stages")
    .select("*")
    .eq("roadmap_id", roadmap.id)
    .order("stage_order");

  const stageIds = (stages ?? []).map((s) => s.id);
  const { data: topics } = stageIds.length
    ? await supabase
        .from("roadmap_topics")
        .select("*")
        .in("stage_id", stageIds)
        .order("topic_order")
    : { data: [] as Array<Record<string, unknown>> };

  const topicIds = (topics ?? []).map((t) => t.id as string);
  const [{ data: resources }, { data: follow }, { data: progress }] = await Promise.all([
    topicIds.length
      ? supabase.from("roadmap_resources").select("*").in("topic_id", topicIds)
      : Promise.resolve({ data: [] as Array<Record<string, unknown>> }),
    supabase
      .from("user_roadmap_follows")
      .select("*")
      .eq("user_id", user.id)
      .eq("roadmap_id", roadmap.id)
      .maybeSingle(),
    topicIds.length
      ? supabase
          .from("user_topic_progress")
          .select("*")
          .eq("user_id", user.id)
          .in("topic_id", topicIds)
      : Promise.resolve({ data: [] as Array<Record<string, unknown>> }),
  ]);

  const progressMap = new Map((progress ?? []).map((p) => [p.topic_id, p]));
  const completed = (progress ?? []).filter((p) => p.status === "completed").length;
  const total = topicIds.length || 1;
  const percent = Math.round((completed / total) * 100);

  const experience = profile?.experience_level;
  const emphasizeFoundations =
    experience === "complete_beginner" || experience === "beginner";
  const allowSkipHint =
    experience === "advanced" || experience === "professional" || experience === "intermediate";

  const overview = roadmap.overview as {
    whatTheyDo?: string;
    problemsSolved?: string;
    typicalDay?: string;
    employers?: string;
    fundamentalSkills?: string[];
  };

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-4">
        <Badge>{roadmap.category}</Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{roadmap.title}</h1>
        <p className="text-[color:var(--muted-foreground)]">{roadmap.summary}</p>
        <div className="flex flex-wrap items-center gap-4">
          <FollowRoadmapButton roadmapId={roadmap.id} following={Boolean(follow)} />
          <div className="text-sm text-[color:var(--muted-foreground)]">
            Progress: {percent}% ({completed}/{topicIds.length} topics)
          </div>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[color:var(--muted)]">
          <div
            className="h-full rounded-full bg-[color:var(--accent)] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        {emphasizeFoundations ? (
          <p className="text-sm text-[color:var(--accent)]">
            Personalized tip: with your experience level, spend extra time on early foundation stages.
          </p>
        ) : null}
        {allowSkipHint ? (
          <p className="text-sm text-[color:var(--muted-foreground)]">
            Personalized tip: mark topics you already know as Skip to focus on later stages.
          </p>
        ) : null}
      </header>

      <AiCoachPanel
        roadmapSlug={slug}
        unlocked={Boolean(profile?.ai_coach_unlocked)}
        stripeReady={isStripeConfigured()}
      />

      <section className="card-surface space-y-4 p-6">
        <h2 className="text-xl font-semibold">Career overview</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            <strong>What they do:</strong> {overview.whatTheyDo}
          </p>
          <p>
            <strong>Problems they solve:</strong> {overview.problemsSolved}
          </p>
          <p>
            <strong>Typical day:</strong> {overview.typicalDay}
          </p>
          <p>
            <strong>Where they work:</strong> {overview.employers}
          </p>
          {overview.fundamentalSkills?.length ? (
            <p>
              <strong>Fundamentals:</strong> {overview.fundamentalSkills.join(", ")}
            </p>
          ) : null}
        </div>
      </section>

      <section className="card-surface space-y-3 p-6">
        <h2 className="text-xl font-semibold">Prerequisites</h2>
        <ul className="space-y-2">
          {(roadmap.prerequisites as Array<{ title: string; description: string }>).map((p) => (
            <li key={p.title}>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-[color:var(--muted-foreground)]">{p.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Learning path</h2>
        {(stages ?? []).map((stage) => {
          const stageTopics = (topics ?? []).filter((t) => t.stage_id === stage.id);
          return (
            <div key={stage.id} className="card-surface p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--accent)]">
                Stage {stage.stage_order}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{stage.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{stage.description}</p>
              {stage.why_it_matters ? (
                <p className="mt-2 text-sm">
                  <strong>Why it matters:</strong> {stage.why_it_matters}
                </p>
              ) : null}

              <div className="mt-6 space-y-5">
                {stageTopics.map((topic) => {
                  const status = (progressMap.get(topic.id)?.status as string) || "not_started";
                  const topicResources = (resources ?? []).filter((r) => r.topic_id === topic.id);
                  return (
                    <div
                      key={topic.id}
                      className="rounded-xl border border-[color:var(--border)] p-4"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h4 className="font-semibold">{topic.title}</h4>
                          <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                            {topic.description}
                          </p>
                        </div>
                        <TopicStatusControls topicId={topic.id} status={status} />
                      </div>
                      {topic.why_it_matters ? (
                        <p className="mt-3 text-sm">
                          <strong>Why:</strong> {topic.why_it_matters}
                        </p>
                      ) : null}
                      {topic.project_ideas?.length ? (
                        <div className="mt-3">
                          <p className="text-sm font-medium">Build</p>
                          <ul className="mt-1 list-disc pl-5 text-sm text-[color:var(--muted-foreground)]">
                            {topic.project_ideas.map((idea: string) => (
                              <li key={idea}>{idea}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      <div className="mt-4 space-y-2">
                        {topicResources.map((resource) => (
                          <a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start justify-between gap-3 rounded-lg bg-[color:var(--muted)]/60 px-3 py-2 text-sm hover:bg-[color:var(--muted)]"
                          >
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-[color:var(--muted-foreground)]">
                                {resource.platform}
                                {resource.is_free != null
                                  ? resource.is_free
                                    ? " · Free"
                                    : " · Paid"
                                  : ""}
                                {resource.difficulty ? ` · ${resource.difficulty}` : ""}
                              </p>
                            </div>
                            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
