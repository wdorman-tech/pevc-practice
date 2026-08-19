import { QUESTIONS } from './data'
import type { Progress, Question } from './types'

/**
 * Four club-shaped sectors. Each one is a mandate — the group's own words about
 * what it does — plus the modules written for it and the slices of the core
 * 400-question deck that belong to that mandate.
 */
export type SpecialSet = {
  id: string
  org: string
  orgLink: string
  title: string
  tagline: string
  mandate: string
  blurb: string
  /** What the group actually does, in their words. */
  doing: string[]
  /** Categories authored for this set. */
  modules: { category: string; blurb: string }[]
  /** Categories pulled in from the core deck, with why they belong here. */
  borrowed: { category: string; why: string }[]
}

export const SPECIAL_SETS: SpecialSet[] = [
  {
    id: 'pevc-analysis',
    org: 'Wharton Undergraduate PEVC Club',
    orgLink: 'https://www.whartonugpevc.com/',
    title: 'Investment Analysis',
    tagline: 'Source it, underwrite it, pitch it',
    mandate: 'Develop pitches for potential PE and VC targets — a keynote pitch and the model underneath it.',
    blurb:
      'The whole pipeline: screen a target, build the thesis, defend the returns. Venture and growth included, since a PEVC pitch can go either way.',
    doing: [
      'Keynote pitch plus an associated financial model, presented to the membership',
      'Case competitions with KKR, Silver Lake, Warburg Pincus',
      'Valuation work across LBOs, DCFs, and merger models',
    ],
    modules: [
      { category: 'PEVC – Sourcing & Screening', blurb: 'Finding a target you can actually model' },
      { category: 'PEVC – Pitching an Investment', blurb: 'Deck structure, returns, defending the bear case' },
      { category: 'PEVC – Venture & Growth', blurb: 'Cap tables, SAFEs, SaaS metrics, power law' },
      { category: 'PEVC – Diligence & Value Creation', blurb: 'QofE, 100-day plan, the returns bridge' },
    ],
    borrowed: [
      { category: 'LBO Models – Concepts', why: 'The engine under every buyout pitch' },
      { category: 'LBO Models – Calculations', why: 'The math a judge will check' },
      { category: 'LBO Mechanics', why: 'Sources and uses, debt schedule, sweep' },
      { category: 'Returns & Math', why: 'IRR, MOIC, and the bridge' },
      { category: 'Paper LBO Drills', why: 'The 60-second synthesis test' },
      { category: 'Valuation Methodologies', why: 'How you put a range on the target' },
      { category: 'Discounted Cash Flow (DCF) – Assumptions and Analysis', why: 'Intrinsic cross-check' },
      { category: 'Private Companies', why: 'Modeling a target without public filings' },
    ],
  },
  {
    id: 'pevc-general',
    org: 'PEVC Club · WITG',
    orgLink: 'https://www.whartonugpevc.com/',
    title: 'General Knowledge',
    tagline: 'The vocabulary both clubs assume you have',
    mandate: 'Fund structure, the alternatives landscape, and how to think like an investor in public markets.',
    blurb:
      'Carry and waterfalls, DPI versus TVPI, why private credit grew, and how to answer "pitch me a stock" in ninety seconds.',
    doing: [
      'PEVC Academy: weekly sessions with board members and alumni, stock pitch competitions',
      'WITG: eleven investment teams, each pitching every semester',
      'Speaker events with Apollo, Blackstone, Carlyle',
    ],
    modules: [
      { category: 'Private Markets – Fund Structure & Economics', blurb: 'LPs, GPs, carry, waterfalls, DPI' },
      { category: 'Private Markets – Landscape & Strategies', blurb: 'Buyout to secondaries, and why credit grew' },
      { category: 'Public Markets & Investing Basics', blurb: 'Edge, catalysts, sizing, pitching a stock' },
    ],
    borrowed: [
      { category: 'PE Process & Fit', why: 'How a sponsor actually runs a deal' },
      { category: 'Financial Sponsors Group (FSG)', why: 'The bank-side view of the same client' },
      { category: 'Private Capital Advisory (Secondaries)', why: 'LP interests and GP-led deals' },
      { category: 'Finance Concepts', why: 'The first-principles layer' },
      { category: 'Valuation Metrics and Multiples', why: 'Which multiple, and why' },
      { category: 'Understanding Banking', why: 'What the sell side does for the buy side' },
    ],
  },
  {
    id: 'witg-tacopps',
    org: 'Penn WITG',
    orgLink: 'https://www.pennwitg.com/investment-team',
    title: 'Tactical Opportunities',
    tagline: 'Wherever the risk is best priced',
    mandate:
      'Global investments across various sectors in alternative and underlooked segments of the capital structure, including distressed credit.',
    blurb:
      'Built around the capital structure: where you sit, what the documents let someone do to you, and what a recovery looks like.',
    doing: [
      'Global, sector-agnostic, all rungs of the capital structure',
      'Alternative and underlooked segments — the paper no single mandate covers',
      'Distressed credit',
    ],
    modules: [
      { category: 'TacOpps – Capital Structure & Credit', blurb: 'Seniority, covenants, spreads, doc holes' },
      { category: 'TacOpps – Distressed & Stressed Credit', blurb: 'Fulcrum, LMEs, DIPs, loan-to-own' },
      { category: 'TacOpps – Global & Alternative Opportunities', blurb: 'EM risk, hybrids, dislocation, cap-structure arb' },
    ],
    borrowed: [
      { category: 'Credit & Capital Structure', why: 'The core credit vocabulary' },
      { category: 'Debt Capital Markets (DCM) & Leveraged Finance (LevFin)', why: 'How the paper gets issued' },
      { category: 'Distressed & Restructuring', why: 'The sell-side view of a restructuring' },
      { category: 'Project Finance & Infrastructure', why: 'Contracted cash flow and structured lending' },
    ],
  },
  {
    id: 'witg-specsits',
    org: 'Penn WITG',
    orgLink: 'https://www.pennwitg.com/investment-team',
    title: 'Special Situations',
    tagline: 'When the seller has a reason that is not value',
    mandate:
      'Corporate spinoffs, mergers and acquisitions, and bankruptcies — where markets misprice the securities involved.',
    blurb:
      'One event at a time: spinoff mechanics and forced selling, merger arb spreads and what breaks them, bankruptcy from first-day motions to post-reorg equity.',
    doing: [
      'Corporate spinoffs and separations',
      'Mergers and acquisitions — arbitrage and deal risk',
      'Bankruptcies and the securities they reprice',
    ],
    modules: [
      { category: 'Special Situations – Spinoffs & Separations', blurb: 'Form 10s, when-issued, SOTP, stranded costs' },
      { category: 'Special Situations – Merger Arbitrage', blurb: 'Spreads, hedging, antitrust, deal protections' },
      { category: 'Special Situations – Bankruptcy & Restructuring Events', blurb: 'APR, cramdown, rights offerings, post-reorg' },
      { category: 'Special Situations – Activism & Corporate Actions', blurb: '13Ds, proxy fights, tenders, index flows' },
    ],
    borrowed: [
      { category: 'Merger Models – Concepts', why: 'What the acquirer is actually buying' },
      { category: 'Merger Models – Calculations', why: 'Accretion / dilution under the hood' },
      { category: 'Distressed & Restructuring', why: 'The restructuring toolkit' },
      { category: 'Equity Value & Enterprise Value – Concepts', why: 'Every event trade is a bridge question' },
      { category: 'Equity Capital Markets (ECM)', why: 'Follow-ons, rights issues, IPO mechanics' },
    ],
  },
]

export function setCategories(set: SpecialSet): string[] {
  return [...set.modules.map((m) => m.category), ...set.borrowed.map((b) => b.category)]
}

export function setPool(set: SpecialSet): Question[] {
  const categories = new Set(setCategories(set))
  return QUESTIONS.filter((q) => categories.has(q.category))
}

export type SetStats = {
  total: number
  seen: number
  due: number
  mastery: number
  authored: number
}

export function setStats(progress: Progress, set: SpecialSet): SetStats {
  return { ...poolStats(progress, setPool(set)), authored: authoredCount(set) }
}

export function authoredCount(set: SpecialSet): number {
  const modules = new Set(set.modules.map((m) => m.category))
  return QUESTIONS.filter((q) => modules.has(q.category)).length
}

/** Mastery / due / seen for an arbitrary slice of the deck. */
export function poolStats(progress: Progress, pool: Question[]) {
  const now = Date.now()
  let box = 0
  let seen = 0
  let due = 0
  for (const q of pool) {
    const card = progress.cards[q.id]
    box += card?.box ?? 0
    if (card) seen += 1
    if (card && card.due <= now) due += 1
  }
  return {
    total: pool.length,
    seen,
    due,
    mastery: pool.length ? box / (pool.length * 5) : 0,
  }
}

export function categoryPool(category: string): Question[] {
  return QUESTIONS.filter((q) => q.category === category)
}
