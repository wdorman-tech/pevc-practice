import type { ModuleId } from '../concepts'

/**
 * Five practice tests are *parallel forms* of one blueprint. Every test fills the
 * same twenty shells below, in the same order, at the same difficulty — only the
 * surface of each item changes. That is what lets a learner take Test 3 after
 * Test 1 and read the score difference as learning rather than as luck.
 *
 * The vocabulary is Irvine & Kyllonen's: a shell fixes the *radicals* (which
 * statement, which direction the sign flips, how many arithmetic steps) and
 * leaves the *incidentals* free (company, industry, the actual numbers).
 */
export type Part = 'recall' | 'apply' | 'reason'

export type Shell = {
  code: string
  part: Part
  domain: ModuleId
  /** What this slot is testing, stated as the skill rather than the topic. */
  skill: string
}

export const SHELLS: Shell[] = [
  { code: 'S01', part: 'recall', domain: 'ac', skill: 'Which statement answers which question, and over what window' },
  { code: 'S02', part: 'recall', domain: 'ac', skill: 'Accrual timing: when a sale or a cost is booked versus when cash moves' },
  { code: 'S03', part: 'recall', domain: 'ac', skill: 'The margin ladder — what gross, operating and net margin each judge' },
  { code: 'S04', part: 'recall', domain: 'ba', skill: 'Name the moat a described business actually has' },
  { code: 'S05', part: 'recall', domain: 'ba', skill: 'ROIC against WACC — when growth creates value and when it burns it' },
  { code: 'S06', part: 'recall', domain: 'va', skill: 'Enterprise value versus equity value, and why cash comes out' },
  { code: 'S07', part: 'recall', domain: 'rr', skill: 'CAPM, beta, and which risks get paid for' },
  { code: 'S08', part: 'recall', domain: 'dv', skill: 'Instrument mechanics: rights, obligations, and payoff shape' },

  { code: 'S09', part: 'apply', domain: 'ac', skill: 'Numeric — push a non-cash charge through all three statements' },
  { code: 'S10', part: 'apply', domain: 'ac', skill: 'Numeric — reconcile profit to cash through working capital' },
  { code: 'S11', part: 'apply', domain: 'va', skill: 'Numeric — the enterprise value bridge and multiple arithmetic' },
  { code: 'S12', part: 'apply', domain: 'ba', skill: 'Numeric — unit economics, breakeven, price against volume' },
  { code: 'S13', part: 'apply', domain: 'mk', skill: 'Numeric — compounding, the rule of 72, real against nominal' },
  { code: 'S14', part: 'apply', domain: 'ac', skill: 'Read a short set of figures and pick the line that must move' },
  { code: 'S15', part: 'apply', domain: 'va', skill: 'Choose the right multiple for this business and defend the choice' },
  { code: 'S16', part: 'apply', domain: 'mk', skill: 'Rates move — rank the damage across different assets' },

  { code: 'S17', part: 'reason', domain: 'ba', skill: 'Judge business quality between two candidates and commit' },
  { code: 'S18', part: 'reason', domain: 'ac', skill: 'Explain a cash-versus-profit failure from first principles' },
  { code: 'S19', part: 'reason', domain: 'va', skill: 'Explain a valuation gap, or value something with no data' },
  { code: 'S20', part: 'reason', domain: 'mk', skill: 'Explain an instrument or a market move under pressure' },
]

export const SHELL_BY_CODE: Record<string, Shell> = Object.fromEntries(
  SHELLS.map((s) => [s.code, s]),
)

type Base = {
  shell: string
  /**
   * The one portable rule to carry forward, shown last in the feedback. One
   * short sentence, second person. Shute: end elaborated feedback with the
   * reusable rule, not with a summary.
   */
  rule: string
}

export type McItem = Base & {
  kind: 'mc'
  stem: string
  /**
   * Three options. Rodriguez's meta-analysis of eighty years of item data finds
   * three optimal: a fourth distractor is usually non-functioning, and the time
   * saved buys more items and better coverage.
   */
  choices: string[]
  /** Index of the key in `choices` as authored. Presentation order is shuffled. */
  answer: number
  /** Why the key is right, in at most two sentences. Never a restatement. */
  why: string
  /**
   * One line per distractor, keyed by its index in `choices`, naming the
   * misconception that makes someone pick it. Feedback that names your error
   * beats feedback that only names the answer.
   */
  traps: Record<number, string>
}

/** One line of a worked-example ledger. Novices learn more from these than from solving. */
export type WorkLine = {
  label: string
  /** Rendered as written: '+$800', '($200)', '12x'. Signs explicit, always. */
  value: string
  /** Running subtotal after this line, where one makes sense. */
  running?: string
}

export type NumItem = Base & {
  kind: 'num'
  stem: string
  answer: number
  /** Accepted absolute error. Omit for exact answers. */
  tol?: number
  /** Rendered after the number: '%', 'x', '$M', ' years'. */
  unit?: string
  /** A short note on the expected form, e.g. "Answer as a number, e.g. 35". */
  format?: string
  /** The worked example, as a labelled ledger with signs shown. */
  work: WorkLine[]
  /** What the number means, in one or two sentences. Not the arithmetic again. */
  why: string
}

export type OpenItem = Base & {
  kind: 'open'
  stem: string
  /** What the interviewer is actually measuring. Usually a behaviour. */
  tests: string
  /** Clarifying questions that genuinely change the answer. */
  clarify: string[]
  /** The structure to say out loud, not the content. One line per move. */
  skeleton: string[]
  /**
   * Binary self-scoring criteria: "did you say this?". Analytic checklists beat
   * holistic scores for self-assessment, because they remove the global
   * judgment call that weaker performers get wrong (León et al., 2023).
   */
  criteria: string[]
  /** A model answer at the level a strong freshman could actually deliver. */
  model: string
  follows: string[]
  flags: string[]
}

export type Item = McItem | NumItem | OpenItem

export type PracticeTest = {
  id: string
  n: number
  title: string
  /** One line the learner reads before starting. Sets the frame, not the content. */
  blurb: string
  items: Item[]
}

export function isAuto(item: Item): item is McItem | NumItem {
  return item.kind !== 'open'
}

/** How many of a form's items are machine-scored. Derived, never written down. */
export function scoredCount(test: PracticeTest): number {
  return test.items.filter(isAuto).length
}

/** Criteria available across a form's open items, for the self-scored tally. */
export function criteriaCount(test: PracticeTest): number {
  return test.items.reduce((n, x) => n + (x.kind === 'open' ? x.criteria.length : 0), 0)
}
