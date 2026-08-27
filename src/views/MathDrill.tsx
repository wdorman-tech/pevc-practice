import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../components/bits'
import { MATH_GENS, type MathItem } from '../content/mathgen'
import type { Store } from '../lib/store'

const SPRINT = 120

export function MathDrill({ store }: { store: Store }) {
  const [item, setItem] = useState<MathItem | null>(null)
  const [raw, setRaw] = useState('')
  const [verdict, setVerdict] = useState<'right' | 'wrong' | null>(null)
  const [left, setLeft] = useState(SPRINT)
  const [running, setRunning] = useState(false)
  const [round, setRound] = useState({ right: 0, asked: 0 })
  const input = useRef<HTMLInputElement>(null)

  const draw = useCallback(() => {
    const gen = MATH_GENS[Math.floor(Math.random() * MATH_GENS.length)]
    setItem(gen())
    setRaw('')
    setVerdict(null)
  }, [])

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [running])

  useEffect(() => {
    if (running) input.current?.focus()
  }, [running, item])

  const start = () => {
    setRound({ right: 0, asked: 0 })
    setLeft(SPRINT)
    setRunning(true)
    draw()
  }

  const submit = () => {
    if (!item || verdict !== null || !running) return
    const guess = Number(raw.replace(/[$,%\sx]/g, ''))
    const ok = Number.isFinite(guess) && Math.abs(guess - item.a) < 0.51
    setVerdict(ok ? 'right' : 'wrong')
    setRound((r) => ({ right: r.right + (ok ? 1 : 0), asked: r.asked + 1 }))
    store.recordMath(ok)
  }

  const mmss = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`
  const lifetime = store.data.math

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="label">05 — math</div>
      <h1 className="font-display mt-1 text-4xl leading-[1.05] tracking-tight">
        Do the arithmetic out loud, and be right.
      </h1>
      <p className="text-bone-300 mt-4 text-[17px] leading-[1.65]">
        Nobody is impressed by mental math. They are unimpressed by someone who stalls on 15% of 400
        while explaining a business. Two minutes, as many as you can.
      </p>

      {!running && (
        <div className="panel mt-8 p-6 text-center">
          <div className="text-bone-500 font-mono text-[11px]">
            {round.asked > 0
              ? `Last sprint: ${round.right} of ${round.asked}`
              : `Lifetime: ${lifetime.right} right, ${lifetime.wrong} wrong`}
          </div>
          <div className="mt-4">
            <Button variant="solid" onClick={start}>
              {round.asked > 0 ? 'Go again' : 'Start a two-minute sprint'}
            </Button>
          </div>
        </div>
      )}

      {running && item && (
        <div className="panel mt-8 p-6">
          <div className="flex items-baseline justify-between">
            <span className="text-bone-500 font-mono text-[11px]">
              {round.right} / {round.asked}
            </span>
            <span
              className={`font-mono text-[22px] ${left <= 15 ? 'text-clay-400' : 'text-bone-500'}`}
            >
              {mmss}
            </span>
          </div>

          <p className="text-bone-100 mt-5 text-[19px] leading-[1.45]">{item.q}</p>
          {item.hint && <p className="text-bone-500 mt-1.5 font-mono text-[11px]">{item.hint}</p>}

          <div className="mt-5 flex gap-3">
            <input
              ref={input}
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return
                if (verdict === null) submit()
                else draw()
              }}
              inputMode="decimal"
              placeholder="answer"
              aria-label="Your answer"
              className="border-line focus:border-ember-500/60 bg-ash-900 text-bone-100 w-40 rounded-xl border px-4 py-3 font-mono text-[16px] outline-none"
            />
            {verdict === null ? (
              <Button variant="solid" onClick={submit}>
                Check
              </Button>
            ) : (
              <Button variant="solid" onClick={draw}>
                Next →
              </Button>
            )}
          </div>

          {verdict && (
            <p
              className={`rise mt-4 font-mono text-[13px] ${
                verdict === 'right' ? 'text-moss-400' : 'text-clay-400'
              }`}
            >
              {verdict === 'right' ? 'Right.' : `No — it is ${item.a}.`}
            </p>
          )}
        </div>
      )}

      {!running && left === 0 && (
        <p className="text-bone-300 mt-5 text-center text-[15px] leading-[1.6]">
          Time. {round.right} of {round.asked}. The ones you missed are worth redoing on paper, slowly,
          before you sprint again.
        </p>
      )}
    </div>
  )
}
