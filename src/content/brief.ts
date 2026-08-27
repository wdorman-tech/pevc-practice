export type Principle = { h: string; p: string }

export const PRINCIPLES: Principle[] = [
  {
    h: "Potential is the grade, not knowledge",
    p: "They know you are a freshman and they are not expecting a built model. What they are measuring is critical thinking and logic under mild pressure.",
  },
  {
    h: "Business intuition is on the test",
    p: "Expect questions with no formula behind them — a hundred more of revenue against a hundred less of cost, or whether you would build an airport. These are pure reasoning, and they are where most candidates fall apart.",
  },
  {
    h: "Know what the instruments are",
    p: "Options, futures, swaps: what they are and why the logic works. You will be pushed on the mechanism, not the dictionary definition.",
  },
  {
    h: "Depth is the differentiator, not the requirement",
    p: "Going one layer deeper than the median freshman — CAPM and its critics, moats, why a multiple is what it is — is what separates you. It is not required. That is exactly why it works.",
  },
  {
    h: "You are allowed to ask",
    p: "If something comes up that you do not know, ask the interviewer to explain it and reason from there. Composure beats a bluff every single time, and bluffs are detected immediately.",
  },
  {
    h: "An angle they had not thought of",
    p: "The club president's words: they are looking for people who come at a question from a direction the room did not expect. Not a better-rehearsed answer — a different one. If you have a real opinion about a business, bring it, even if it is contrarian.",
  },
  {
    h: "They are picking teammates, not employees",
    p: "The same president again: these people are your friends as well as your club. Being someone they want in the room for two years is doing half the work. Warmth is not a substitute for thinking, but thinking without it does not get you in either.",
  },
]

export const BEATS: { n: string; p: string }[] = [
  { n: "Clarify", p: "One or two questions, then stop. 'Am I building it or buying one that already operates?' Clarifying is scored. Stalling is not." },
  { n: "Frame", p: "Say your structure out loud before you use it. 'I will look at revenue, then cost, then competitive position, then risks.' Now the interviewer can follow you." },
  { n: "Reason", p: "Walk the frame aloud. Label assumptions as assumptions. Do arithmetic out loud when there are numbers in the question." },
  { n: "Land", p: "Take a position. A defended stance with one named weakness beats a balanced list every time." },
]

export const SCORE_LABELS = [
  "Froze, or never built a structure",
  "Rambled and eventually arrived",
  "Got there, messy in the middle",
  "Clean structure, clear reasoning",
  "Structure, reasoning, and a defended position",
]

/** The summer list the mentor gave, wired to the concept modules. */
export const READING: { id: string; t: string; to: string }[] = [
  { id: 'r1', t: "Porter's Five Forces", to: 'ba' },
  { id: 'r2', t: 'Economic moats', to: 'ba' },
  { id: 'r3', t: 'The CAPM model', to: 'rr' },
  { id: 'r4', t: 'Beta and alpha', to: 'rr' },
  { id: 'r5', t: 'Financial derivatives', to: 'dv' },
  { id: 'r6', t: 'Core accounting terms', to: 'ac' },
  { id: 'r7', t: 'Enterprise value and earnings', to: 'va' },
  { id: 'r8', t: 'EV/EBITDA and P/E', to: 'va' },
]
