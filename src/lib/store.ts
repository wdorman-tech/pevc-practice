import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CardState, Grade, Progress, Question } from './types'
import { QUESTIONS } from './data'
import { courseOrder } from './curriculum'

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

export function isSolid(g: Grade): boolean {
  return g === 'solid' || g === 'sharp'
}

/** Enough state to put a single rep back the way it was. */
type UndoEntry = {
  id: string
  card: CardState | undefined
  day: string
  solid: number
  seconds: number
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)
  // mirror of the latest progress, so a rep can snapshot the pre-grade card synchronously
  const latest = useRef(progress)
  const undoStack = useRef<UndoEntry[]>([])

  useEffect(() => {
    latest.current = progress
    localStorage.setItem(KEY, JSON.stringify(progress))
  }, [progress])

  /** Grade one card and log the rep. Atomic so undo can reverse both halves. */
  const record = useCallback((id: string, g: Grade, seconds: number) => {
    const solid = isSolid(g) ? 1 : 0
    const day = today()
    undoStack.current.push({ id, card: latest.current.cards[id], day, solid, seconds })

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
        solid: card.solid + solid,
        due: now + INTERVALS[box] * DAY,
        last: now,
      }

      const sessions = prev.sessions.slice()
      const idx = sessions.findIndex((s) => s.day === day)
      if (idx >= 0) {
        sessions[idx] = {
          day,
          reviewed: sessions[idx].reviewed + 1,
          solid: sessions[idx].solid + solid,
          seconds: sessions[idx].seconds + seconds,
        }
      } else {
        sessions.push({ day, reviewed: 1, solid, seconds })
      }

      return {
        ...prev,
        cards: { ...prev.cards, [id]: updated },
        sessions: sessions.slice(-180),
      }
    })
  }, [])

  /** Reverse the most recent rep. Returns false when there is nothing left to undo. */
  const undo = useCallback(() => {
    const last = undoStack.current.pop()
    if (!last) return false
    setProgress((prev) => {
      const cards = { ...prev.cards }
      if (last.card) cards[last.id] = last.card
      else delete cards[last.id]

      const sessions = prev.sessions.slice()
      const idx = sessions.findIndex((s) => s.day === last.day)
      if (idx >= 0) {
        const s = sessions[idx]
        const reviewed = s.reviewed - 1
        if (reviewed <= 0) sessions.splice(idx, 1)
        else
          sessions[idx] = {
            day: s.day,
            reviewed,
            solid: Math.max(0, s.solid - last.solid),
            seconds: Math.max(0, s.seconds - last.seconds),
          }
      }
      return { ...prev, cards, sessions }
    })
    return true
  }, [])

  const toggleStar = useCallback((id: string) => {
    setProgress((prev) => ({
      ...prev,
      starred: prev.starred.includes(id)
        ? prev.starred.filter((s) => s !== id)
        : [...prev.starred, id],
    }))
  }, [])

  const reset = useCallback(() => {
    undoStack.current = []
    setProgress(EMPTY)
  }, [])

  return { progress, record, undo, toggleStar, reset }
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
  mode: 'due' | 'new' | 'weak' | 'mixed' | 'all' | 'course',
): Question[] {
  const now = Date.now()
  const cards = progress.cards
  const dueList = pool.filter((q) => cards[q.id] && cards[q.id].due <= now)
  const newList = pool.filter((q) => !cards[q.id])
  const weakList = pool
    .filter((q) => cards[q.id] && cards[q.id].box <= 2)
    .sort((a, b) => (cards[a.id]?.box ?? 0) - (cards[b.id]?.box ?? 0))

  const pick = (list: Question[]) => list.slice().sort(() => Math.random() - 0.5)
  const taught = (list: Question[]) => list.slice().sort(courseOrder)

  let queue: Question[] = []
  if (mode === 'due') queue = pick(dueList)
  else if (mode === 'new') queue = pick(newList)
  else if (mode === 'weak') queue = weakList.length ? weakList : pick(newList)
  else if (mode === 'all') queue = pick(pool)
  // course mode never shuffles: simplest unseen material first, then repair work
  else if (mode === 'course') queue = [...taught(newList), ...taught(weakList), ...taught(dueList)]
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
    for (const q of mode === 'course' ? taught(pool) : pick(pool)) {
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
