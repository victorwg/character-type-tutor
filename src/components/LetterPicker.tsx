import { ALL_LETTERS, PRESETS } from "@/lib/typing";
import { CANGJIE } from "@/lib/cangjie";
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
          ["all", "全部 26"],
          ["home", "基本鍵"],
          ["top", "上排"],
          ["bottom", "下排"],
          ["vowels", "元音鍵"],
          ["clear", "清除"],
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
                    "relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl font-display transition-all flex flex-col items-center justify-center",
                    "border-2 shadow-sm",
                    on
                      ? "bg-primary text-primary-foreground border-primary scale-105"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:scale-105",
                  )}
                >
                  <span className="text-2xl sm:text-3xl font-bold leading-none">
                    {CANGJIE[l]}
                  </span>
                  <span className="text-[10px] mt-0.5 uppercase opacity-70 font-mono">
                    {l}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        已選 {selected.size} / {ALL_LETTERS.length} 個倉頡字母
      </p>
    </div>
  );
}
