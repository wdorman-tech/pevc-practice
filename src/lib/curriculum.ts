import { QUESTIONS } from './data'
import type { Progress, Question } from './types'

/**
 * The course: an ordered ladder from first principles to the hard stuff.
 * Categories inside a stage are listed in teaching order too — concepts
 * before the calculations that depend on them.
 */
export type Stage = {
  id: string
  title: string
  blurb: string
  teaches: string
  categories: string[]
}

export const CURRICULUM: Stage[] = [
  {
    id: 'orientation',
    title: 'Orientation',
    blurb: 'What the job actually is, and why you want it',
    teaches: 'The vocabulary and the story you open every interview with.',
    categories: [
      '"Why Banking?" and "Why Our Firm?"',
      'Understanding Banking',
      'The "Big 5" Fit Questions',
      'Resume/CV',
      'Recruiting Process',
    ],
  },
  {
    id: 'accounting',
    title: 'Accounting Foundations',
    blurb: 'Three statements, and how a dollar moves through them',
    teaches: 'Everything downstream is built on this. Nothing else works until it does.',
    categories: ['Finance Concepts', 'Accounting – Concepts', 'Accounting – Calculations'],
  },
  {
    id: 'value',
    title: 'Equity Value & Enterprise Value',
    blurb: 'What you are actually buying, and what it costs',
    teaches: 'The bridge between the two, and why every multiple picks one or the other.',
    categories: [
      'Equity Value & Enterprise Value – Concepts',
      'Equity Value & Enterprise Value – Calculations',
    ],
  },
  {
    id: 'valuation',
    title: 'Valuation Toolkit',
    blurb: 'Comps, precedents, and the multiples that drive them',
    teaches: 'How to put a range on a company before you build a single model.',
    categories: ['Valuation Methodologies', 'Valuation Metrics and Multiples'],
  },
  {
    id: 'dcf',
    title: 'Discounted Cash Flow',
    blurb: 'Intrinsic value from the ground up',
    teaches: 'Free cash flow, terminal value, and the discount rate that ties it together.',
    categories: [
      'Discounted Cash Flow (DCF) – Assumptions and Analysis',
      'Discounted Cash Flow (DCF) – The Discount Rate',
    ],
  },
  {
    id: 'lbo',
    title: 'LBO Foundations',
    blurb: 'Buy with debt, pay it down, sell',
    teaches: 'The sponsor model in its simplest honest form, then the mechanics.',
    categories: ['LBO Models – Concepts', 'LBO Models – Calculations', 'LBO Mechanics'],
  },
  {
    id: 'leverage',
    title: 'Leverage, Credit & Returns',
    blurb: 'Capital structure and what it does to IRR',
    teaches: 'Where the debt comes from, what it costs, and how returns decompose.',
    categories: [
      'Credit & Capital Structure',
      'Returns & Math',
      'Debt Capital Markets (DCM) & Leveraged Finance (LevFin)',
    ],
  },
  {
    id: 'paper-lbo',
    title: 'Paper LBO',
    blurb: 'No spreadsheet, no calculator, sixty seconds',
    teaches: 'The synthesis drill. If the earlier stages stuck, this is where it shows.',
    categories: ['Paper LBO Drills'],
  },
  {
    id: 'ma',
    title: 'M&A and Merger Models',
    blurb: 'Accretion, dilution, and deal structure',
    teaches: 'Two companies into one, and whether the buyer should want that.',
    categories: ['Merger Models – Concepts', 'Merger Models – Calculations'],
  },
  {
    id: 'sponsor',
    title: 'Sponsor Process & Deal Talk',
    blurb: 'How PE firms actually operate, and how you discuss a live deal',
    teaches: 'Diligence, funds, secondaries, and walking through your own transaction.',
    categories: [
      'PE Process & Fit',
      'Financial Sponsors Group (FSG)',
      'Private Capital Advisory (Secondaries)',
      'Private Companies',
      'Discussing Transaction Experience',
    ],
  },
  {
    id: 'behavioral',
    title: 'Behavioral Depth',
    blurb: 'The questions designed to find the seams',
    teaches: 'Failures, weaknesses, conflict, and the curveballs.',
    categories: [
      'Strengths & Weaknesses',
      'Flaws & Failures',
      'Teamwork/Leadership',
      '"Outside the Box" Questions',
    ],
  },
  {
    id: 'sectors',
    title: 'Sector Specializations',
    blurb: 'Where the general rules stop applying',
    teaches: 'Group-specific technicals — FIG, RE, energy, distressed, and the rest.',
    categories: [
      'Distressed & Restructuring',
      'Financial Institutions Group (FIG)',
      'Real Estate (Properties)',
      'Real Estate Investment Trusts (REITs)',
      'Oil & Gas',
      'Power & Utilities',
      'Renewables',
      'Project Finance & Infrastructure',
      'Metals & Mining',
      'Technology, Media & Telecommunications (TMT)',
      'Equity Capital Markets (ECM)',
      'Healthcare & Biotech',
      'Consumer/Retail',
      'Industrials',
    ],
  },
]

/** Mastery you need in a stage before the next one opens. */
export const UNLOCK_AT = 0.5

/**
 * Global teaching order: stage order, then category order inside the stage,
 * then the question's own number. Used to serve a course queue simple-first.
 */
export const COURSE_RANK: Record<string, number> = (() => {
  const byCategory = new Map<string, Question[]>()
  for (const q of QUESTIONS) {
    const list = byCategory.get(q.category)
    if (list) list.push(q)
    else byCategory.set(q.category, [q])
  }

  const rank: Record<string, number> = {}
  let n = 0
  for (const stage of CURRICULUM) {
    for (const category of stage.categories) {
      const list = (byCategory.get(category) ?? []).slice().sort((a, b) => a.number - b.number)
      for (const q of list) rank[q.id] = n++
    }
  }
  // anything not placed in a stage sorts to the very end
  for (const q of QUESTIONS) if (rank[q.id] === undefined) rank[q.id] = n++
  return rank
})()

export const STAGE_OF: Record<string, string> = (() => {
  const map: Record<string, string> = {}
  for (const stage of CURRICULUM) {
    for (const category of stage.categories) map[category] = stage.id
  }
  return map
})()

export function courseOrder(a: Question, b: Question): number {
  return (COURSE_RANK[a.id] ?? 0) - (COURSE_RANK[b.id] ?? 0)
}

export type StageProgress = {
  stage: Stage
  index: number
  total: number
  seen: number
  due: number
  mastery: number
  unlocked: boolean
  complete: boolean
}

export function stageProgress(progress: Progress): StageProgress[] {
  const now = Date.now()
  const out: StageProgress[] = []
  let previousMastery = 1 // stage 0 is always open

  CURRICULUM.forEach((stage, index) => {
    const pool = QUESTIONS.filter((q) => stage.categories.includes(q.category))
    let box = 0
    let seen = 0
    let due = 0
    for (const q of pool) {
      const card = progress.cards[q.id]
      box += card?.box ?? 0
      if (card) seen += 1
      if (card && card.due <= now) due += 1
    }
    const mastery = pool.length ? box / (pool.length * 5) : 0
    out.push({
      stage,
      index,
      total: pool.length,
      seen,
      due,
      mastery,
      unlocked: previousMastery >= UNLOCK_AT,
      complete: mastery >= UNLOCK_AT,
    })
    previousMastery = mastery
  })

  return out
}

/** The stage the user should be working on right now. */
export function activeStage(rows: StageProgress[]): StageProgress {
  return rows.find((r) => r.unlocked && !r.complete) ?? rows[rows.length - 1]
}
