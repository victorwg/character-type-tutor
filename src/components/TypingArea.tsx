import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { toRadical } from "@/lib/cangjie";

type Props = {
  target: string;
  typed: string;
  onChange: (s: string) => void;
  disabled?: boolean;
};

export function TypingArea({ target, typed, onChange, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  const focus = () => inputRef.current?.focus();

  return (
    <div
      onClick={focus}
      className="relative rounded-3xl bg-card border-2 border-border p-6 sm:p-10 cursor-text shadow-[var(--shadow-fun)]"
    >
      <input
        ref={inputRef}
        value={typed}
        onChange={(e) => {
          if (disabled) return;
          const v = e.target.value.toLowerCase();
          if (v.length <= target.length) onChange(v);
        }}
        onBlur={focus}
        disabled={disabled}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="absolute inset-0 opacity-0"
        aria-label="Typing input"
      />
      <div className="flex flex-wrap gap-x-1 gap-y-3 justify-center select-none">
        {target.split("").map((ch, i) => {
          const isCurrent = i === typed.length;
          const typedCh = typed[i];
          const state =
            typedCh == null
              ? "pending"
              : typedCh === ch
                ? "correct"
                : "wrong";
          const isSpace = ch === " ";
          if (isSpace) {
            return <span key={i} className="w-4" />;
          }
          return (
            <span
              key={i}
              className={cn(
                "relative inline-flex flex-col items-center rounded-lg px-1.5 py-1 transition-colors min-w-[2.25rem]",
                state === "pending" && "text-muted-foreground/60",
                state === "correct" && "text-success bg-success/10",
                state === "wrong" && "text-destructive bg-destructive/10",
                isCurrent && "ring-2 ring-primary bg-accent/30 animate-pulse",
              )}
            >
              <span className="text-3xl sm:text-4xl font-bold leading-none">
                {toRadical(ch)}
              </span>
              <span className="font-mono text-[10px] mt-1 opacity-70 uppercase">
                {ch}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
