## Typing Trainer — Plan

A bright, gamified typing training platform. Users pick which letters (a–z) they want to drill, then type randomly generated sequences while live WPM and accuracy are displayed.

### Screens / Routes

- `/` — Landing + character picker + start button
- `/train` — Active drill session with live metrics and results

### Home page (`/`)

- Playful hero: bold heading, colorful gradient background, animated floating letters.
- **Character selector**: 26 toggleable letter tiles (a–z) arranged in a keyboard-like grid. Tap to include/exclude. Quick presets: All, Home row, Top row, Bottom row, Vowels, Clear.
- Session length selector: 30s / 60s / 120s, or fixed character count (e.g. 50 / 100 / 200).
- "Start training" CTA (disabled until ≥2 letters selected).
- Selected letters and settings passed to `/train` via search params.

### Training page (`/train`)

- Generates a random string from the selected letters (grouped into chunks of 3–5 for readability).
- Large monospace display showing:
  - Already-typed chars dimmed (green if correct, red if wrong)
  - Current char highlighted with a bouncing cursor
  - Upcoming chars in normal weight
- Hidden input captures keystrokes (focus restored automatically).
- **Live metrics bar**: WPM (chars-typed/5 ÷ minutes), Accuracy %, Time remaining or progress.
- Confetti / playful animation on completion.
- Results card: final WPM, accuracy, correct/incorrect counts, per-letter accuracy mini-chart, "Try again" and "Change letters" buttons.
- No persistence — session-only state.

### Visual style — Playful & colorful

- Vibrant token palette in `src/styles.css` (oklch): primary purple, secondary pink/coral, accent yellow/teal, success green, destructive red — plus gradient tokens (`--gradient-primary`, `--gradient-fun`) and a soft shadow token.
- Rounded-2xl corners, generous spacing, soft shadows.
- Display font for headings (e.g. Fredoka or Baloo via Google Fonts), Inter for body, JetBrains Mono for the typing surface.
- Subtle motion: letter tiles scale/wiggle on toggle, cursor pulse, confetti on finish, animated gradient background blobs.

### Technical details

- TanStack Start routes: `src/routes/index.tsx`, `src/routes/train.tsx`, each with its own `head()` metadata.
- State kept local with React hooks (no backend, no Lovable Cloud needed).
- New components under `src/components/`:
  - `LetterPicker.tsx` — grid of toggle tiles + presets
  - `SessionSettings.tsx` — duration / length picker
  - `TypingArea.tsx` — text display + hidden input + keystroke handling
  - `MetricsBar.tsx` — WPM, accuracy, timer
  - `Results.tsx` — end-of-session summary
- Utility `src/lib/typing.ts`: `generateSequence(letters, length)`, `computeStats(state)`.
- Reuse shadcn `Button`, `Card`, `Toggle`, `Badge`, `Progress`.
- Add design tokens + gradients to `src/styles.css`; no hard-coded colors in components.
- Replace the placeholder home page; remove the blank-app placeholder.
- Add `head()` meta on both routes (title, description, og:*).

### Out of scope (per answers)

- Numbers, symbols, words, multi-language
- Accounts, cloud sync, history
- Server functions / database
