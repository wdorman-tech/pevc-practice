import { useCallback, useEffect, useRef, useState } from 'react'

const KEY = 'ticksheet:v2'

export type TestAttempt = {
  testId: string
  /** epoch ms */
  at: number
  /** auto-graded score on the recall + apply parts */
  scored: number
  scoredOf: number
  /** criteria hit per open item, keyed by shell code */
  self: Record<string, number>
  /** criteria available across the open items, so history stays readable if the tests change */
  selfOf: number
  seconds: number
}

export type Persisted = {
  /** concept ids the learner has ticked off */
  ticked: string[]
  /** lesson step ids completed */
  lesson: string[]
  /** gym item ids self-scored, id -> 0..4 */
  gym: Record<string, number>
  /** finished test attempts, newest last */
  attempts: TestAttempt[]
  /** running mental-math tally */
  math: { right: number; wrong: number }
}

const EMPTY: Persisted = { ticked: [], lesson: [], gym: {}, attempts: [], math: { right: 0, wrong: 0 } }

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Persisted>
    return {
      ...EMPTY,
      ...parsed,
      math: { ...EMPTY.math, ...(parsed.math ?? {}) },
      gym: { ...(parsed.gym ?? {}) },
    }
  } catch {
    return EMPTY
  }
}

export function useStore() {
  const [data, setData] = useState<Persisted>(load)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(data))
    } catch {
      /* private browsing, quota — the app still works, it just forgets */
    }
  }, [data])

  const toggleTick = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      ticked: d.ticked.includes(id) ? d.ticked.filter((x) => x !== id) : [...d.ticked, id],
    }))
  }, [])

  const completeStep = useCallback((id: string) => {
    setData((d) => (d.lesson.includes(id) ? d : { ...d, lesson: [...d.lesson, id] }))
  }, [])

  const scoreGym = useCallback((id: string, score: number) => {
    setData((d) => ({ ...d, gym: { ...d.gym, [id]: score } }))
  }, [])

  const recordAttempt = useCallback((attempt: TestAttempt) => {
    setData((d) => ({ ...d, attempts: [...d.attempts, attempt] }))
  }, [])

  const recordMath = useCallback((right: boolean) => {
    setData((d) => ({
      ...d,
      math: { right: d.math.right + (right ? 1 : 0), wrong: d.math.wrong + (right ? 0 : 1) },
    }))
  }, [])

  const reset = useCallback(() => {
    setData(EMPTY)
    try {
      localStorage.removeItem(KEY)
    } catch {
      /* nothing to clean up */
    }
  }, [])

  return { data, toggleTick, completeStep, scoreGym, recordAttempt, recordMath, reset }
}

export type Store = ReturnType<typeof useStore>

/** Deterministic shuffle so a reload does not silently regrade a test in progress. */
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = arr.slice()
  let s = seed || 1
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
