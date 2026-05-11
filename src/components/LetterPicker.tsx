import { ALL_LETTERS, PRESETS } from "@/lib/typing";
import { cn } from "@/lib/utils";

type Props = {
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
};

const ROWS = [
  "qwertyuiop".split(""),
  "asdfghjkl".split(""),
  "zxcvbnm".split(""),
];

export function LetterPicker({ selected, onChange }: Props) {
  const toggle = (l: string) => {
    const next = new Set(selected);
    if (next.has(l)) next.delete(l);
    else next.add(l);
    onChange(next);
  };

  const applyPreset = (key: keyof typeof PRESETS | "clear") => {
    if (key === "clear") onChange(new Set());
    else onChange(new Set(PRESETS[key]));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          ["all", "All 26"],
          ["home", "Home row"],
          ["top", "Top row"],
          ["bottom", "Bottom row"],
          ["vowels", "Vowels"],
          ["clear", "Clear"],
        ].map(([k, label]) => (
          <button
            key={k}
            onClick={() => applyPreset(k as never)}
            className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {ROWS.map((row, i) => (
          <div
            key={i}
            className="flex justify-center gap-2"
            style={{ paddingLeft: i * 16 }}
          >
            {row.map((l) => {
              const on = selected.has(l);
              return (
                <button
                  key={l}
                  onClick={() => toggle(l)}
                  className={cn(
                    "h-12 w-12 sm:h-14 sm:w-14 rounded-2xl font-display text-xl font-bold uppercase transition-all",
                    "border-2 shadow-sm",
                    on
                      ? "bg-primary text-primary-foreground border-primary scale-105"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:scale-105",
                  )}
                >
                  {l}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {selected.size} of {ALL_LETTERS.length} letters selected
      </p>
    </div>
  );
}
