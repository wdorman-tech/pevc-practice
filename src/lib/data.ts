import raw from '../data/questions.json'
import type { Question } from './types'

export const QUESTIONS = raw as Question[]

export const BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
)

export const TRACK_ORDER = [
  'PE / LBO Drills',
  'Technicals',
  'Fit / Behavioral',
  'Deal Experience',
  'Industry / Group',
] as const

export type Track = (typeof TRACK_ORDER)[number]

export const TRACK_BLURB: Record<string, string> = {
  'PE / LBO Drills': 'Paper LBOs, returns math, capital structure, sponsor process',
  Technicals: 'Accounting, valuation, DCF, merger models, LBO models',
  'Fit / Behavioral': 'Story, strengths, failures, why banking, why us',
  'Deal Experience': 'Walking through a transaction without getting cornered',
  'Industry / Group': 'Sector-specific technicals from FIG to renewables',
}

export const CATEGORIES: { track: string; category: string; count: number; core: boolean }[] =
  (() => {
    const map = new Map<string, { track: string; category: string; count: number; core: boolean }>()
    for (const q of QUESTIONS) {
      const hit = map.get(q.category)
      if (hit) hit.count += 1
      else map.set(q.category, { track: q.track, category: q.category, count: 1, core: q.core })
    }
    return [...map.values()].sort(
      (a, b) => TRACK_ORDER.indexOf(a.track as Track) - TRACK_ORDER.indexOf(b.track as Track),
    )
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
