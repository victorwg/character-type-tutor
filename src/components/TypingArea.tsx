import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
          const v = e.target.value;
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
      <div className="font-mono text-2xl sm:text-3xl leading-relaxed tracking-wider break-all select-none">
        {target.split("").map((ch, i) => {
          const isCurrent = i === typed.length;
          const typedCh = typed[i];
          const state =
            typedCh == null
              ? "pending"
              : typedCh === ch
                ? "correct"
                : "wrong";
          return (
            <span
              key={i}
              className={cn(
                "relative transition-colors",
                state === "pending" && "text-muted-foreground/60",
                state === "correct" && "text-success",
                state === "wrong" && "text-destructive underline decoration-wavy",
                isCurrent &&
                  "text-foreground bg-accent/40 rounded-md px-0.5 animate-pulse",
                ch === " " && "mr-1",
              )}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          );
        })}
      </div>
    </div>
  );
}
