import raw from '../data/questions.json'
import shorts from '../data/shorts.json'
import { SET_QUESTIONS, SET_TRACK } from '../data/sets'
import type { Question } from './types'

export { SET_TRACK }

const SHORTS = shorts as Record<string, string>

/** Falls back to the answer's opening sentence for any card without a written short. */
function firstSentence(answer: string): string {
  const flat = answer.replace(/\s+/g, ' ').trim()
  const cut = flat.search(/[.?!]\s/)
  return cut === -1 ? flat : flat.slice(0, cut + 1)
}

function withShort(q: Question): Question {
  return { ...q, short: SHORTS[q.id] || q.short || firstSentence(q.answer) }
}

export const QUESTIONS: Question[] = [
  ...(raw as Question[]).map(withShort),
  ...SET_QUESTIONS.map(withShort),
]

export const BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
)

/** The five tracks of the core deck. The special sets live outside this order. */
export const TRACK_ORDER = [
  'PE / LBO Drills',
  'Technicals',
  'Fit / Behavioral',
  'Deal Experience',
  'Industry / Group',
] as const

export type Track = (typeof TRACK_ORDER)[number]

/** Track chips for the library — core tracks plus the club sets. */
export const LIBRARY_TRACKS: string[] = [...TRACK_ORDER, SET_TRACK]

export const TRACK_BLURB: Record<string, string> = {
  'PE / LBO Drills': 'Paper LBOs, returns math, capital structure, sponsor process',
  Technicals: 'Accounting, valuation, DCF, merger models, LBO models',
  'Fit / Behavioral': 'Story, strengths, failures, why banking, why us',
  'Deal Experience': 'Walking through a transaction without getting cornered',
  'Industry / Group': 'Sector technicals from FIG to renewables',
  [SET_TRACK]: 'PEVC analysis, general knowledge, TacOpps, special situations',
}

function trackRank(track: string): number {
  const i = (TRACK_ORDER as readonly string[]).indexOf(track)
  return i === -1 ? TRACK_ORDER.length : i
}

export const CATEGORIES: { track: string; category: string; count: number; core: boolean }[] =
  (() => {
    const map = new Map<string, { track: string; category: string; count: number; core: boolean }>()
    for (const q of QUESTIONS) {
      const hit = map.get(q.category)
      if (hit) hit.count += 1
      else map.set(q.category, { track: q.track, category: q.category, count: 1, core: q.core })
    }
    return [...map.values()].sort((a, b) => trackRank(a.track) - trackRank(b.track))
  })()

export const CORE_COUNT = QUESTIONS.filter((q) => q.core).length

/** Shortens a category for chips: "Discounted Cash Flow (DCF) – The Discount Rate" -> "DCF – The Discount Rate" */
export function shortCategory(c: string): string {
  return c
    .replace('Discounted Cash Flow (DCF)', 'DCF')
    .replace('Equity Value & Enterprise Value', 'EqV & EV')
    .replace('Debt Capital Markets (DCM) & Leveraged Finance (LevFin)', 'DCM & LevFin')
    .replace('Technology, Media & Telecommunications (TMT)', 'TMT')
    .replace('Real Estate Investment Trusts (REITs)', 'REITs')
    .replace('Financial Institutions Group (FIG)', 'FIG')
    .replace('Financial Sponsors Group (FSG)', 'FSG')
    .replace('Equity Capital Markets (ECM)', 'ECM')
    .replace('Private Capital Advisory (Secondaries)', 'Secondaries')
    .replace('Special Situations –', 'Spec Sits –')
    .replace('Private Markets –', 'Private Mkts –')
    .replace('Public Markets & Investing Basics', 'Public Markets')
}

/** Deterministic-ish shuffle. */
export function shuffle<T>(items: T[]): T[] {
  const out = items.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
