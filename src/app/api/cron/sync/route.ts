import { syncContent } from "@/lib/adapters/orchestrator";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: Request) {
  const auth = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = await syncContent([
      "data-engineering",
      "machine-learning",
      "devops",
      "backend-development",
      "frontend-development",
      "cybersecurity",
      "system-design",
      "artificial-intelligence",
    ]);
    return NextResponse.json({ ok: true, results });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Cron sync failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return POST(request);
}
