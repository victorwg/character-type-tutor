import { cn } from "@/lib/utils";

type Props = {
  length: number;
  onChange: (n: number) => void;
};

const OPTIONS = [30, 60, 120, 200];

export function SessionSettings({ length, onChange }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-center text-sm font-medium text-muted-foreground">
        How many characters?
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {OPTIONS.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-all border-2",
              n === length
                ? "bg-accent text-accent-foreground border-accent shadow-sm"
                : "bg-card text-foreground border-border hover:border-accent/50",
            )}
          >
            {n} chars
          </button>
        ))}
      </div>
    </div>
  );
}
