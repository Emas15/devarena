import { Button } from "@/components/ui/button";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { ArrowRight, BookOpen, Map, MessageSquare, Video } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(13,148,136,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(15,20,25,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,20,25,0.04)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-20" />
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-semibold tracking-tight text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--accent)] text-[color:var(--accent-foreground)] text-sm">
            DA
          </span>
          {APP_NAME}
        </div>
        <Link href="/login">
          <Button variant="outline">Sign in</Button>
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--accent)]">
            Knowledge · Community · Career
          </p>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl md:leading-[1.05]">
            {APP_NAME}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--muted-foreground)] md:text-xl">
            {APP_TAGLINE}. One personalized feed for engineering articles, Reddit discussions,
            YouTube tutorials, your own blogs, and structured career roadmaps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login">
              <Button size="lg">
                Continue with Google
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Explore the platform
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookOpen,
              title: "Articles",
              body: "Aggregate DEV, Hashnode, HN, Medium, and Substack into one ranked feed.",
            },
            {
              icon: MessageSquare,
              title: "Discussions",
              body: "Follow interest-matched Reddit communities without tab chaos.",
            },
            {
              icon: Video,
              title: "Videos",
              body: "Discover recent technical YouTube lessons tailored to your path.",
            },
            {
              icon: Map,
              title: "Roadmaps",
              body: "Follow stage-by-stage career paths with real resources and progress.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="card-surface p-5 animate-fade-up"
              style={{ animationDelay: `${0.08 * (i + 1)}s` }}
            >
              <item.icon className="mb-4 h-5 w-5 text-[color:var(--accent)]" />
              <h2 className="font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{item.body}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
