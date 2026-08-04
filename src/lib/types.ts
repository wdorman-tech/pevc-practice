export type Question = {
  id: string
  track: string
  category: string
  number: number
  question: string
  answer: string
  core: boolean
  source: string
}

/** How well you recalled a card, in Leitner terms. */
export type Grade = 'again' | 'shaky' | 'solid' | 'sharp'

export type CardState = {
  box: number // 0..5 — 5 means burned in
  seen: number
  again: number
  solid: number
  due: number // epoch ms
  last: number // epoch ms
}

export type SessionLog = {
  day: string // YYYY-MM-DD
  reviewed: number
  solid: number
  seconds: number
}

export type Progress = {
  cards: Record<string, CardState>
  starred: string[]
  sessions: SessionLog[]
}
