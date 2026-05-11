import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LetterPicker } from "@/components/LetterPicker";
import { SessionSettings } from "@/components/SessionSettings";
import {
  PlayfulBackground,
  FloatingLetters,
} from "@/components/PlayfulBackground";
import { ALL_LETTERS } from "@/lib/typing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TypeBuddy — Playful Typing Trainer" },
      {
        name: "description",
        content:
          "Pick the letters you want to practice and improve your typing speed with fun, colorful drills.",
      },
      { property: "og:title", content: "TypeBuddy — Playful Typing Trainer" },
      {
        property: "og:description",
        content:
          "Pick the letters you want to practice and improve your typing speed with fun, colorful drills.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<string>>(
    new Set("asdfjkl;".split("").filter((c) => ALL_LETTERS.includes(c))),
  );
  const [length, setLength] = useState(60);

  const canStart = selected.size >= 2;

  const start = () => {
    if (!canStart) return;
    const letters = Array.from(selected).sort().join("");
    navigate({ to: "/train", search: { letters, length } });
  };

  return (
    <div className="relative min-h-screen">
      <PlayfulBackground />

      <main className="mx-auto max-w-3xl px-5 py-12 sm:py-20">
        <section className="relative text-center pb-12">
          <FloatingLetters />
          <span className="relative inline-block rounded-full bg-card border-2 border-border px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Playful typing trainer
          </span>
          <h1 className="relative mt-4 font-display text-5xl sm:text-6xl font-bold leading-tight">
            Train the keys{" "}
            <span className="bg-[var(--gradient-fun)] bg-clip-text text-transparent">
              you choose
            </span>
          </h1>
          <p className="relative mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Pick any letters from a to z, then crush a colorful drill with live
            WPM and accuracy.
          </p>
        </section>

        <div className="space-y-10 rounded-3xl bg-card/80 backdrop-blur border-2 border-border p-6 sm:p-10 shadow-[var(--shadow-fun)]">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-center">
              1. Pick your letters
            </h2>
            <LetterPicker selected={selected} onChange={setSelected} />
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-center">
              2. Choose drill length
            </h2>
            <SessionSettings length={length} onChange={setLength} />
          </div>

          <div className="flex justify-center">
            <button
              onClick={start}
              disabled={!canStart}
              className="rounded-full bg-[var(--gradient-primary)] px-10 py-4 font-display text-xl font-bold text-primary-foreground shadow-[var(--shadow-fun)] hover:scale-105 transition disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
            >
              Start training →
            </button>
          </div>
          {!canStart && (
            <p className="text-center text-sm text-muted-foreground -mt-6">
              Select at least 2 letters to begin
            </p>
          )}
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          Made with ❤️ for happy fingers
        </footer>
      </main>
    </div>
  );
}
