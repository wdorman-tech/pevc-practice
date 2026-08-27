import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/bits'
import { BEATS } from '../content/brief'
import { GYM, type GymCat, type GymItem } from '../content/gym'
import type { Store } from '../lib/store'

/**
 * Five questions, a clock you cannot pause, and the model answer withheld until
 * you have said yours. The pressure is the point — the gym is where you learn the
 * structure, this is where you find out whether it survives being watched.
 */
export function Mock({ store }: { store: Store }) {
  const [stage, setStage] = useState<'idle' | 'run' | 'done'>('idle')
  const [set, setSet] = useState<GymItem[]>([])
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [hits, setHits] = useState<boolean[]>([])
  const [tally, setTally] = useState<{ got: number; of: number }[]>([])
  const [elapsed, setElapsed] = useState(0)
  const clock = useRef<number | null>(null)

  useEffect(() => {
    if (stage !== 'run') return
    clock.current = window.setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => {
      if (clock.current) window.clearInterval(clock.current)
    }
  }, [stage, idx])

  const start = () => {
    setSet(drawSet())
    setIdx(0)
    setRevealed(false)
    setTally([])
    setElapsed(0)
    setStage('run')
  }

  const item = set[idx]

  useEffect(() => {
    if (item) setHits(item.skeleton.map(() => false))
  }, [item])

  const advance = () => {
    if (!item) return
    const got = hits.filter(Boolean).length
    const next = [...tally, { got, of: item.skeleton.length }]
    setTally(next)
    store.scoreGym(item.id, got)
    if (idx + 1 < set.length) {
      setIdx(idx + 1)
      setRevealed(false)
      setElapsed(0)
      return
    }
    setStage('done')
  }

  const mmss = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="label">06 — mock</div>
      <h1 className="font-display mt-1 text-4xl leading-[1.05] tracking-tight">
        Five questions, one sitting, no scrolling ahead.
      </h1>

      {stage === 'idle' && (
        <>
          <p className="text-bone-300 mt-4 text-[17px] leading-[1.65]">
            One question about you, two on business intuition, one technical, one on markets — drawn
            fresh each time, in the order a real first round tends to run. Answer out loud, at full
            volume, as if someone were in the room. The clock runs so you learn what ninety seconds
            actually feels like.
          </p>

          <div className="panel mt-7 p-6">
            <div className="label">run these four beats on every question</div>
            <div className="mt-4 space-y-3">
              {BEATS.map((b, n) => (
                <div key={b.n} className="flex gap-3.5">
                  <span className="text-bone-500 font-mono text-[11px] leading-6">{n + 1}</span>
                  <p className="text-bone-300 text-[14.5px] leading-[1.6]">
                    <span className="text-bone-100 font-semibold">{b.n}. </span>
                    {b.p}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <Button variant="solid" onClick={start}>
              Begin the mock
            </Button>
          </div>
        </>
      )}

      {stage === 'run' && item && (
        <div className="mt-7">
          <div className="flex items-baseline justify-between">
            <span className="text-bone-500 font-mono text-[11px]">
              question {idx + 1} of {set.length}
            </span>
            <span className="text-bone-500 font-mono text-[22px]">{mmss}</span>
          </div>

          <p className="text-bone-100 mt-5 text-[22px] leading-[1.4]">{item.q}</p>

          {!revealed ? (
            <div className="panel mt-7 p-6">
              <p className="text-bone-300 text-[15px] leading-[1.65]">
                Answer it out loud, all the way to a position, before you open anything. If you stop
                early you are practising stopping early.
              </p>
              <div className="mt-5">
                <Button variant="solid" onClick={() => setRevealed(true)}>
                  I have answered — show me
                </Button>
              </div>
            </div>
          ) : (
            <div className="rise mt-7 space-y-5">
              <div className="panel p-5">
                <div className="label">tick every move you actually made</div>
                <div className="mt-2.5 space-y-2">
                  {item.skeleton.map((s, n) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setHits((h) => h.map((x, k) => (k === n ? !x : x)))}
                      className={`flex w-full cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[14.5px] leading-[1.5] transition-colors ${
                        hits[n]
                          ? 'border-moss-400/50 bg-moss-400/8 text-bone-100'
                          : 'border-line text-bone-300 hover:border-line-strong'
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid h-4 w-4 flex-none place-items-center rounded border font-mono text-[10px] ${
                          hits[n] ? 'border-moss-400 bg-moss-400 text-white' : 'border-line-strong'
                        }`}
                      >
                        {hits[n] ? '✓' : ''}
                      </span>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-ember-500/30 bg-ember-500/4 rounded-xl border p-5">
                <div className="label text-ember-700">a model answer</div>
                <p className="text-bone-100 mt-2 text-[15px] leading-[1.7]">{item.model}</p>
              </div>

              <div className="flex justify-end">
                <Button variant="solid" onClick={advance}>
                  {idx + 1 < set.length ? 'Next question →' : 'Finish'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {stage === 'done' && (
        <div className="mt-7">
          <div className="font-display text-4xl leading-none tracking-tight">
            {tally.reduce((a, b) => a + b.got, 0)} of {tally.reduce((a, b) => a + b.of, 0)} moves made
          </div>
          <p className="text-bone-300 mt-4 text-[16px] leading-[1.7]">
            The number is less useful than the pattern. Look at which move you keep skipping — for most
            people it is the first one, clarifying, or the last one, landing on a position. Those two
            are the cheapest points on the board.
          </p>
          <div className="mt-6 space-y-2">
            {set.map((s, n) => (
              <div key={s.id} className="border-line flex items-baseline gap-3 rounded-xl border px-4 py-3">
                <span className="text-bone-500 font-mono text-[11px]">
                  {tally[n]?.got ?? 0}/{tally[n]?.of ?? 0}
                </span>
                <span className="text-bone-300 text-[14px] leading-[1.5]">{s.q}</span>
              </div>
            ))}
          </div>
          <div className="mt-7">
            <Button variant="solid" onClick={start}>
              Draw another five
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function drawSet(): GymItem[] {
  const draw = (cat: GymCat, n: number) => {
    const pool = GYM.filter((g) => g.cat === cat)
    const out: GymItem[] = []
    for (let k = 0; k < n && pool.length; k++) {
      out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
    }
    return out
  }
  return [...draw('story', 1), ...draw('intuition', 2), ...draw('technical', 1), ...draw('markets', 1)]
}
