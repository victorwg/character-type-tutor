export function PlayfulBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div
        className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-3xl animate-blob"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-blob"
        style={{ animationDelay: "-8s" }}
      />
    </div>
  );
}

export function FloatingLetters() {
  const letters = ["日", "月", "金", "木", "水", "火", "土", "竹"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {letters.map((l, i) => (
        <span
          key={i}
          className="absolute font-display font-bold text-primary/15 select-none animate-float-y"
          style={{
            left: `${(i * 13 + 5) % 95}%`,
            top: `${(i * 17 + 10) % 80}%`,
            fontSize: `${2 + (i % 4)}rem`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {l}
        </span>
      ))}
    </div>
  );
}
