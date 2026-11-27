"use client";

import { Button } from "@/components/ui/button";
import {
  CAREER_ROLES,
  EXPERIENCE_LEVELS,
  INTEREST_CATEGORIES,
  LEARNING_PREFERENCES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const STEPS = ["Interests", "Careers", "Experience", "Preferences", "Profile"] as const;

export function OnboardingWizard({
  initialName,
}: {
  initialName?: string | null;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [careers, setCareers] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>("");
  const [prefs, setPrefs] = useState<string[]>([]);
  const [displayName, setDisplayName] = useState(initialName ?? "");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canNext = useMemo(() => {
    if (step === 0) return interests.length > 0;
    if (step === 1) return careers.length > 0;
    if (step === 2) return Boolean(experience);
    if (step === 3) return prefs.length > 0;
    if (step === 4) return displayName.trim().length > 1;
    return false;
  }, [step, interests, careers, experience, prefs, displayName]);

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  async function complete() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interests,
          careers,
          experienceLevel: experience,
          learningPreferences: prefs,
          fullName: displayName.trim(),
          bio: bio.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save onboarding");
      router.push("/home");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-[color:var(--accent)]">
          Step {step + 1} of {STEPS.length}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{STEPS[step]}</h1>
        <div className="mt-4 flex gap-2">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                i <= step ? "bg-[color:var(--accent)]" : "bg-[color:var(--muted)]"
              )}
            />
          ))}
        </div>
      </div>

      <div className="card-surface p-6 md:p-8 animate-fade-up">
        {step === 0 && (
          <div className="space-y-6">
            <p className="text-sm text-[color:var(--muted-foreground)]">
              Select the topics you want in your personalized feed. You can change these later.
            </p>
            {INTEREST_CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--muted-foreground)]">
                  {cat.label}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cat.interests.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => toggle(interests, item.slug, setInterests)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-colors",
                        interests.includes(item.slug)
                          ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                          : "border-[color:var(--border)] hover:border-[color:var(--accent)]/40"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-[color:var(--muted-foreground)]">
              Which technical roles are you exploring?
            </p>
            <div className="flex flex-wrap gap-2">
              {CAREER_ROLES.map((role) => (
                <button
                  key={role.slug}
                  type="button"
                  onClick={() => toggle(careers, role.slug, setCareers)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    careers.includes(role.slug)
                      ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                      : "border-[color:var(--border)] hover:border-[color:var(--accent)]/40"
                  )}
                >
                  {role.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-3">
            {EXPERIENCE_LEVELS.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setExperience(level.value)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-colors",
                  experience === level.value
                    ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)]"
                    : "border-[color:var(--border)] hover:border-[color:var(--accent)]/40"
                )}
              >
                <div className="font-medium">{level.label}</div>
                <div className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                  {level.description}
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-wrap gap-2">
            {LEARNING_PREFERENCES.map((pref) => (
              <button
                key={pref.slug}
                type="button"
                onClick={() => toggle(prefs, pref.slug, setPrefs)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  prefs.includes(pref.slug)
                    ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                    : "border-[color:var(--border)] hover:border-[color:var(--accent)]/40"
                )}
              >
                {pref.name}
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="name">
                Display name
              </label>
              <input
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] px-3 text-sm focus-ring"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="bio">
                Short bio (optional)
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm focus-ring"
                placeholder="What are you learning or building?"
              />
            </div>
          </div>
        )}

        {error ? <p className="mt-4 text-sm text-[color:var(--danger)]">{error}</p> : null}

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            disabled={step === 0 || loading}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
              Continue
            </Button>
          ) : (
            <Button disabled={!canNext || loading} onClick={complete}>
              {loading ? "Building your feed…" : "Go to dashboard"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
