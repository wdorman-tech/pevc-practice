import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CardState, Grade, Progress, Question } from './types'
import { QUESTIONS } from './data'

const KEY = 'ember-ib-trainer-v1'
const DAY = 86_400_000

/** Leitner intervals in days, indexed by box. Box 5 = burned in. */
export const INTERVALS = [0, 1, 3, 7, 21, 60]

const EMPTY: Progress = { cards: {}, starred: [], sessions: [] }

function load(): Progress {
  try {
    const rawValue = localStorage.getItem(KEY)
    if (!rawValue) return EMPTY
    const parsed = JSON.parse(rawValue) as Progress
    return { ...EMPTY, ...parsed }
  } catch {
    return EMPTY
  }
}

export function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function nextBox(box: number, grade: Grade): number {
  if (grade === 'again') return 0
  if (grade === 'shaky') return Math.max(0, box - 1)
  if (grade === 'solid') return Math.min(5, box + 1)
  return Math.min(5, box + 2)
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(progress))
  }, [progress])

  const grade = useCallback((id: string, g: Grade) => {
    setProgress((prev) => {
      const now = Date.now()
      const card: CardState = prev.cards[id] ?? {
        box: 0,
        seen: 0,
        again: 0,
        solid: 0,
        due: now,
        last: 0,
      }
      const box = nextBox(card.box, g)
      const updated: CardState = {
        box,
        seen: card.seen + 1,
        again: card.again + (g === 'again' ? 1 : 0),
        solid: card.solid + (g === 'solid' || g === 'sharp' ? 1 : 0),
        due: now + INTERVALS[box] * DAY,
        last: now,
      }
      return { ...prev, cards: { ...prev.cards, [id]: updated } }
    })
  }, [])

  const logSession = useCallback((reviewed: number, solid: number, seconds: number) => {
    if (!reviewed) return
    setProgress((prev) => {
      const day = today()
      const sessions = prev.sessions.slice()
      const idx = sessions.findIndex((s) => s.day === day)
      if (idx >= 0) {
        sessions[idx] = {
          day,
          reviewed: sessions[idx].reviewed + reviewed,
          solid: sessions[idx].solid + solid,
          seconds: sessions[idx].seconds + seconds,
        }
      } else {
        sessions.push({ day, reviewed, solid, seconds })
      }
      return { ...prev, sessions: sessions.slice(-180) }
    })
  }, [])

  const toggleStar = useCallback((id: string) => {
    setProgress((prev) => ({
      ...prev,
      starred: prev.starred.includes(id)
        ? prev.starred.filter((s) => s !== id)
        : [...prev.starred, id],
    }))
  }, [])

  const reset = useCallback(() => setProgress(EMPTY), [])

  return { progress, grade, logSession, toggleStar, reset }
}

export type Stats = ReturnType<typeof deriveStats>

export function deriveStats(progress: Progress) {
  const now = Date.now()
  const cards = progress.cards
  const touched = Object.keys(cards).length
  let mastered = 0
  let learning = 0
  let due = 0
  for (const q of QUESTIONS) {
    const c = cards[q.id]
    if (!c) continue
    if (c.box >= 4) mastered += 1
    else learning += 1
    if (c.due <= now) due += 1
  }
  const newCards = QUESTIONS.length - touched

  // mastery = weighted average box across the full deck (0..1)
  const totalBox = QUESTIONS.reduce((sum, q) => sum + (cards[q.id]?.box ?? 0), 0)
  const mastery = totalBox / (QUESTIONS.length * 5)

  // streak of consecutive days with a logged session, ending today or yesterday
  const days = new Set(progress.sessions.filter((s) => s.reviewed > 0).map((s) => s.day))
  let streak = 0
  const cursor = new Date()
  if (!days.has(cursor.toISOString().slice(0, 10))) cursor.setDate(cursor.getDate() - 1)
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  const reviewedTotal = progress.sessions.reduce((s, x) => s + x.reviewed, 0)
  const solidTotal = progress.sessions.reduce((s, x) => s + x.solid, 0)
  const todayLog = progress.sessions.find((s) => s.day === today())

  return {
    mastery,
    mastered,
    learning,
    newCards,
    due,
    touched,
    streak,
    reviewedTotal,
    solidTotal,
    accuracy: reviewedTotal ? solidTotal / reviewedTotal : 0,
    todayReviewed: todayLog?.reviewed ?? 0,
  }
}

export function categoryStats(progress: Progress) {
  const now = Date.now()
  const map = new Map<
    string,
    { category: string; track: string; total: number; mastery: number; due: number; seen: number }
  >()
  for (const q of QUESTIONS) {
    const entry = map.get(q.category) ?? {
      category: q.category,
      track: q.track,
      total: 0,
      mastery: 0,
      due: 0,
      seen: 0,
    }
    const card = progress.cards[q.id]
    entry.total += 1
    entry.mastery += (card?.box ?? 0) / 5
    if (card) entry.seen += 1
    if (card && card.due <= now) entry.due += 1
    map.set(q.category, entry)
  }
  return [...map.values()].map((e) => ({ ...e, mastery: e.mastery / e.total }))
}

/** Build a study queue: due cards first (most overdue), then unseen, then weakest. */
export function buildQueue(
  progress: Progress,
  pool: Question[],
  size: number,
  mode: 'due' | 'new' | 'weak' | 'mixed' | 'all',
): Question[] {
  const now = Date.now()
  const cards = progress.cards
  const dueList = pool.filter((q) => cards[q.id] && cards[q.id].due <= now)
  const newList = pool.filter((q) => !cards[q.id])
  const weakList = pool
    .filter((q) => cards[q.id] && cards[q.id].box <= 2)
    .sort((a, b) => (cards[a.id]?.box ?? 0) - (cards[b.id]?.box ?? 0))

  const pick = (list: Question[]) => list.slice().sort(() => Math.random() - 0.5)

  let queue: Question[] = []
  if (mode === 'due') queue = pick(dueList)
  else if (mode === 'new') queue = pick(newList)
  else if (mode === 'weak') queue = weakList.length ? weakList : pick(newList)
  else if (mode === 'all') queue = pick(pool)
  else queue = [...pick(dueList), ...pick(newList), ...pick(weakList)]

  // de-dupe while preserving order, then trim
  const seen = new Set<string>()
  const out: Question[] = []
  for (const q of queue) {
    if (seen.has(q.id)) continue
    seen.add(q.id)
    out.push(q)
    if (out.length >= size) break
  }
  if (out.length < size) {
    for (const q of pick(pool)) {
      if (seen.has(q.id)) continue
      seen.add(q.id)
      out.push(q)
      if (out.length >= size) break
    }
  }
  return out
}

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export function useNow(intervalMs = 1000, active = true) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return
    const t = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(t)
  }, [intervalMs, active])
  return now
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function useKey(handler: (e: KeyboardEvent) => void) {
  const stable = useMemo(() => handler, [handler])
  useEffect(() => {
    window.addEventListener('keydown', stable)
    return () => window.removeEventListener('keydown', stable)
  }, [stable])
}
