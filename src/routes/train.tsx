import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { TypingArea } from "@/components/TypingArea";
import { MetricsBar } from "@/components/MetricsBar";
import { Results } from "@/components/Results";
import { PlayfulBackground } from "@/components/PlayfulBackground";
import { computeStats, generateSequence } from "@/lib/typing";
import { CANGJIE } from "@/lib/cangjie";

const searchSchema = z.object({
  letters: fallback(z.string().regex(/^[a-z]+$/), "asdfjkl").default("asdfjkl"),
  length: fallback(z.number().int().min(10).max(500), 60).default(60),
});

export const Route = createFileRoute("/train")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Training — TypeBuddy" },
      {
        name: "description",
        content: "Active typing drill with live WPM and accuracy tracking.",
      },
    ],
  }),
  component: Train,
});

function Train() {
  const { letters, length } = Route.useSearch();
  const letterArr = useMemo<string[]>(
    () => Array.from(new Set(letters.split(""))),
    [letters],
  );

  const [seed, setSeed] = useState(0);
  const target = useMemo(
    () => generateSequence(letterArr, length),
    [letterArr, length, seed],
  );

  const [typed, setTyped] = useState("");
  const startRef = useRef<number | null>(null);
  const [now, setNow] = useState(Date.now());

  const done = typed.length >= target.length && target.length > 0;

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [done]);

  useEffect(() => {
    if (typed.length === 1 && startRef.current === null) {
      startRef.current = Date.now();
    }
  }, [typed]);

  const elapsed = startRef.current ? now - startRef.current : 0;
  const stats = computeStats(target, typed, elapsed);
  const progress = target.length ? typed.length / target.length : 0;

  const restart = () => {
    setTyped("");
    startRef.current = null;
    setNow(Date.now());
    setSeed((s) => s + 1);
  };

  return (
    <div className="relative min-h-screen">
      <PlayfulBackground />

      <main className="mx-auto max-w-3xl px-5 py-10">
        <header className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="rounded-full bg-card border-2 border-border px-4 py-2 text-sm font-semibold hover:border-primary/50 transition"
          >
            ← Back
          </Link>
          <div className="flex flex-wrap gap-1 justify-end">
            {letterArr.map((l) => (
              <span
                key={l}
                className="inline-flex h-8 min-w-8 px-1 items-center justify-center rounded-md bg-primary/10 text-primary text-base font-bold"
                title={l.toUpperCase()}
              >
                {CANGJIE[l] ?? l}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-6">
          <MetricsBar stats={stats} progress={progress} />

          {done ? (
            <Results stats={stats} onRestart={restart} />
          ) : (
            <>
              <TypingArea
                target={target}
                typed={typed}
                onChange={setTyped}
              />
              <div className="flex justify-center gap-3">
                <button
                  onClick={restart}
                  className="rounded-full bg-card border-2 border-border px-5 py-2 text-sm font-semibold hover:border-primary/50 transition"
                >
                  ↻ Reset
                </button>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Click the box and start typing. Use these letters:{" "}
                <span className="font-mono font-bold">{letterArr.join(" ")}</span>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
