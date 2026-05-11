import { Link } from "@tanstack/react-router";
import type { Stats } from "@/lib/typing";

type Props = {
  stats: Stats;
  onRestart: () => void;
};

export function Results({ stats, onRestart }: Props) {
  return (
    <div className="rounded-3xl bg-card border-2 border-border p-8 text-center shadow-[var(--shadow-fun)] animate-pop">
      <p className="font-display text-2xl">Nice work! 🎉</p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="WPM" value={stats.wpm} />
        <Stat label="Accuracy" value={`${stats.accuracy}%`} />
        <Stat label="Correct" value={stats.correct} />
        <Stat label="Mistakes" value={stats.incorrect} />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={onRestart}
          className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition shadow-md"
        >
          Try again
        </button>
        <Link
          to="/"
          className="rounded-full border-2 border-border bg-card px-6 py-3 font-semibold text-foreground hover:border-primary/50 transition"
        >
          Change letters
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-primary">{value}</p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
