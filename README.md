# Ember — IB / PE interview trainer

A local practice dashboard built from the *400 Questions Guide for Investment Banking Interviews
(2025 Edition)*, plus a supplemental PE / LBO set for sponsor-side screens.

**428 questions** across five tracks:

| Track | Count | What it covers |
| --- | --- | --- |
| PE / LBO Drills | 32 | Paper LBOs, returns math (MOIC ↔ IRR), capital structure, sponsor process, fund economics |
| Technicals | 176 | Accounting, EV / equity value, valuation, DCF, merger models, LBO models |
| Fit / Behavioral | 55 | Story, strengths, failures, why banking, why our firm |
| Deal Experience | 10 | Walking through a transaction |
| Industry / Group | 155 | FIG, LevFin, restructuring, energy, real estate, TMT, and the rest |

195 of those are tagged **PE core** — the accounting, valuation, DCF, LBO, LevFin, and sponsor
questions worth knowing cold for a PE screen.

## Run it

Double-click **`Start Ember.command`**. It installs dependencies on first run, rebuilds if the
source changed, serves the dashboard, and opens the browser. Close the Terminal window to stop it.

Or from a terminal:

```bash
npm install
npm run dev      # hot-reloading dev server
npm run build    # production build into dist/
node serve.mjs   # serve dist/ on http://localhost:5273
```

## How it works

- **Drill** — question first, answer out loud, reveal, then grade yourself: Blanked / Shaky /
  Solid / Sharp (keys `1` – `4`; `space` reveals, `s` flags).
- **Spaced repetition** — a five-box Leitner schedule (1, 3, 7, 21, 60 days). Blanking resets a
  card to box 0; Sharp jumps it two boxes. Due cards resurface first.
- **Library** — search every question and answer, filter by track or category, flag the ones you
  keep fumbling, drill any category on its own.
- **Trajectory** — reps, recall rate, streak, an activity heatmap, and per-category mastery so
  the weak spots are obvious.

Progress lives in `localStorage` in this browser — no account, no server, nothing leaves the
machine. "Reset all progress" on the Trajectory page wipes it.

## Stack

Vite + React 19 + TypeScript + Tailwind v4. The question set is parsed out of the source PDF into
`src/data/questions.json`; the PE / LBO drills are hand-written.
