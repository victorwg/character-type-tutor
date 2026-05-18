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
      { title: "倉頡鍵位練習 — Cangjie Typing Trainer" },
      {
        name: "description",
        content: "選擇想練習的倉頡字母鍵位，配合即時 WPM 與準確率，輕鬆熟練倉頡輸入法。",
      },
      { property: "og:title", content: "倉頡鍵位練習" },
      {
        property: "og:description",
        content: "選擇想練習的倉頡字母鍵位，配合即時 WPM 與準確率，輕鬆熟練倉頡輸入法。",
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
            倉頡鍵位練習
          </span>
          <h1 className="relative mt-4 font-display text-5xl sm:text-6xl font-bold leading-tight">
            練熟你的{" "}
            <span className="bg-[var(--gradient-fun)] bg-clip-text text-transparent">
              倉頡字母
            </span>
          </h1>
          <p className="relative mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            從 24 個倉頡字根中挑選想加強的鍵位，配合即時 WPM 與準確率，色彩繽紛地練到精熟。
          </p>
        </section>

        <div className="space-y-10 rounded-3xl bg-card/80 backdrop-blur border-2 border-border p-6 sm:p-10 shadow-[var(--shadow-fun)]">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-center">
              1. 選擇要練的倉頡字母
            </h2>
            <LetterPicker selected={selected} onChange={setSelected} />
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-center">
              2. 選擇練習長度
            </h2>
            <SessionSettings length={length} onChange={setLength} />
          </div>

          <div className="flex justify-center">
            <button
              onClick={start}
              disabled={!canStart}
              className="rounded-full bg-[var(--gradient-primary)] px-10 py-4 font-display text-xl font-bold text-primary-foreground shadow-[var(--shadow-fun)] hover:scale-105 transition disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
            >
              開始練習 →
            </button>
          </div>
          {!canStart && (
            <p className="text-center text-sm text-muted-foreground -mt-6">
              至少選擇 2 個字母才能開始
            </p>
          )}
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          為快樂手指 ❤️ 而做
        </footer>
      </main>
    </div>
  );
}
