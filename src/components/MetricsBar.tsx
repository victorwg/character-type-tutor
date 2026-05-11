import type { Stats } from "@/lib/typing";

type Props = {
  stats: Stats;
  progress: number; // 0-1
};

export function MetricsBar({ stats, progress }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      <Metric label="WPM" value={stats.wpm} tint="primary" />
      <Metric label="Accuracy" value={`${stats.accuracy}%`} tint="success" />
      <Metric
        label="Progress"
        value={`${Math.round(progress * 100)}%`}
        tint="accent"
      />
    </div>
  );
}

function Metric({
  label,
  value,
  tint,
}: {
  label: string;
  value: string | number;
  tint: "primary" | "success" | "accent";
}) {
  const ring =
    tint === "primary"
      ? "from-primary to-secondary"
      : tint === "success"
        ? "from-success to-fun-2"
        : "from-accent to-fun-3";
  return (
    <div className="rounded-2xl bg-card border-2 border-border p-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-1 font-display text-3xl sm:text-4xl font-bold bg-gradient-to-br ${ring} bg-clip-text text-transparent`}
      >
        {value}
      </p>
    </div>
  );
}
