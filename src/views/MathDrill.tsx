import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Btn } from '../components/ui'
import { MATH_GENS, type MathItem } from '../content/mathgen'
import { stats, type Store } from '../lib/store'

/** Sixty seconds a round, exactly as the sheet says on the page. */
const ROUND = 60

type Phase = 'idle' | 'run' | 'done'
type Feed = { ok: boolean; msg: string }

const drawProblem = (): MathItem => MATH_GENS[Math.floor(Math.random() * MATH_GENS.length)]()

/** The sheet's tolerance: two decimal places, or a fifth of a percent on big numbers. */
const close = (guess: number, a: number) => Math.abs(guess - a) < Math.max(0.02, Math.abs(a) * 0.002)

export function MathDrill({ store }: { store: Store }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [left, setLeft] = useState(ROUND)
  const [prob, setProb] = useState<MathItem | null>(null)
  const [raw, setRaw] = useState('')
  const [feed, setFeed] = useState<Feed | null>(null)
  const [score, setScore] = useState(0)
  const [tries, setTries] = useState(0)
  const [best, setBest] = useState(0)
  const [answered, setAnswered] = useState(false)

  const input = useRef<HTMLInputElement>(null)
  const answerId = useId()
  const lifetime = stats(store.data)

  useEffect(() => {
    if (phase !== 'run') return
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'run' || left > 0) return
    setPhase('done')
    setBest((b) => Math.max(b, score))
  }, [phase, left, score])

  useEffect(() => {
    if (phase === 'run') input.current?.focus()
  }, [phase, prob])

  const start = () => {
    setScore(0)
    setTries(0)
    setFeed(null)
    setRaw('')
    setAnswered(false)
    setProb(drawProblem())
    setLeft(ROUND)
    setPhase('run')
  }

  const submit = useCallback(() => {
    if (phase !== 'run' || !prob || answered) return
    const typed = raw.trim()
    if (typed === '') return
    const n = parseFloat(typed.replace(/[,$%\sx]/g, ''))
    const ok = !Number.isNaN(n) && close(n, prob.a)
    setTries((t) => t + 1)
    if (ok) setScore((s) => s + 1)
    setFeed({ ok, msg: ok ? 'Right.' : `It was ${Math.round(prob.a * 100) / 100}.` })
    setAnswered(true)
    store.recordMath(ok)
  }, [phase, prob, raw, answered, store])

  const next = useCallback(() => {
    if (phase !== 'run') return
    setProb(drawProblem())
    setRaw('')
    setAnswered(false)
  }, [phase])

  const clock = phase === 'run' ? `${String(left).padStart(2, '0')}s` : phase === 'done' ? 'time' : '60s'

  const round =
    phase === 'idle' && tries === 0
      ? `best ${best}`
      : `${score} correct / ${tries} attempted · best ${best}`
  const tally =
    lifetime.mathTotal > 0
      ? `${round} · lifetime ${lifetime.math.right} of ${lifetime.mathTotal}`
      : round

  const advice =
    score >= 12
      ? 'That is desk speed. Keep it warm, and move your time to the gym questions.'
      : score >= 7
        ? 'Solid. The gap between here and fluent is usually the multiple and margin questions — run it again and watch which ones cost you time.'
        : 'Slow down and set the numbers up cleanly rather than guessing. Speed comes from structure, not from rushing.'

  return (
    <>
      <div className="mono eyebrow">06 — math</div>
      <h1 className="serif h1">Do the arithmetic out loud, and do it fast.</h1>
      <p className="lede">
        Half of business intuition questions collapse into a two-step calculation. Being able to run
        it in your head, while talking, is what makes a reasoned answer sound like a confident one.
        Sixty seconds a round.
      </p>

      <div className="card sprint">
        <div className="sprint-head">
          <div className="mono clock">{clock}</div>
          <div className="mono sprint-score">{tally}</div>
        </div>

        {phase === 'idle' && (
          <>
            <p className="note">
              Percentages, multiples, margins, the EV bridge, the rule of 72, and break-even volume.
              Type the number and hit enter.
            </p>
            <Btn tone="red" onClick={start}>
              Start the sprint
            </Btn>
          </>
        )}

        {phase === 'run' && prob && (
          <>
            <div className="serif prob">{prob.q}</div>
            {prob.hint && <div className="mono hint">{prob.hint}</div>}
            <div className="answer-row">
              <label htmlFor={answerId} className="hidden">
                Your answer
              </label>
              <input
                id={answerId}
                ref={input}
                className="answer mono"
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== 'Enter') return
                  e.preventDefault()
                  if (answered) next()
                  else submit()
                }}
                inputMode="decimal"
                placeholder="answer"
                autoComplete="off"
              />
              <Btn onClick={() => (answered ? next() : submit())}>Enter</Btn>
            </div>
            {feed && <div className={feed.ok ? 'feed mono good' : 'feed mono bad'}>{feed.msg}</div>}
          </>
        )}

        {phase === 'done' && (
          <>
            <div className="serif big-score">
              {score} <span className="mono">correct in sixty seconds</span>
            </div>
            <p className="note">{advice}</p>
            <Btn tone="red" onClick={start}>
              Run it again
            </Btn>
          </>
        )}
      </div>
    </>
  )
}
