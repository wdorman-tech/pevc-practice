import type { Question } from '../../lib/types'

/** Authoring shape for the special sets — answers written as template literals. */
export type RawItem = { q: string; s?: string; a: string; core?: boolean }
export type RawGroup = { category: string; items: RawItem[] }

export const SET_TRACK = 'Special Sets'

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Turns authored groups into Question records with stable ids. */
export function buildBank(groups: RawGroup[], source: string): Question[] {
  const out: Question[] = []
  for (const group of groups) {
    const base = slug(group.category)
    group.items.forEach((item, i) => {
      out.push({
        id: `${base}-${i + 1}`,
        track: SET_TRACK,
        category: group.category,
        number: i + 1,
        question: item.q,
        short: (item.s ?? '').trim(),
        answer: item.a.trim(),
        core: item.core ?? false,
        source,
      })
    })
  }
  return out
}
