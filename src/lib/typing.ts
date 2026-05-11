export const ALL_LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

export const PRESETS: Record<string, string[]> = {
  all: ALL_LETTERS,
  home: "asdfghjkl".split(""),
  top: "qwertyuiop".split(""),
  bottom: "zxcvbnm".split(""),
  vowels: "aeiou".split(""),
};

export function generateSequence(letters: string[], length: number): string {
  if (letters.length === 0) return "";
  const chunks: string[] = [];
  let produced = 0;
  while (produced < length) {
    const chunkLen = 3 + Math.floor(Math.random() * 3); // 3-5
    let chunk = "";
    for (let i = 0; i < chunkLen && produced < length; i++) {
      chunk += letters[Math.floor(Math.random() * letters.length)];
      produced++;
    }
    chunks.push(chunk);
  }
  return chunks.join(" ");
}

export type Stats = {
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
};

export function computeStats(
  target: string,
  typed: string,
  elapsedMs: number,
): Stats {
  let correct = 0;
  let incorrect = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === target[i]) correct++;
    else incorrect++;
  }
  const minutes = Math.max(elapsedMs / 60000, 1 / 600);
  const wpm = Math.round(correct / 5 / minutes);
  const accuracy = typed.length === 0 ? 100 : Math.round((correct / typed.length) * 100);
  return { wpm, accuracy, correct, incorrect };
}
