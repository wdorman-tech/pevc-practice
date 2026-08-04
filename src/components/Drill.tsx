import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Grade, Question } from '../lib/types'
import { shortCategory } from '../lib/data'
import { formatDuration, useKey } from '../lib/store'
import { AnswerBody, Bar, Button, Chip } from './bits'

const GRADES: { key: Grade; label: string; hint: string; color: string; stroke: string }[] = [
  { key: 'again', label: 'Blanked', hint: '1', color: 'text-[#e2685a]', stroke: 'hover:border-[#e2685a]/60' },
  { key: 'shaky', label: 'Shaky', hint: '2', color: 'text-gold-400', stroke: 'hover:border-gold-400/60' },
  { key: 'solid', label: 'Solid', hint: '3', color: 'text-bone-100', stroke: 'hover:border-ember-500/60' },
  { key: 'sharp', label: 'Sharp', hint: '4', color: 'text-moss-400', stroke: 'hover:border-moss-400/60' },
]

export type DrillMeta = { title: string; subtitle: string }

export function Drill({
  queue,
  meta,
  starred,
  onGrade,
  onStar,
  onLog,
  onExit,
}: {
  queue: Question[]
  meta: DrillMeta
  starred: string[]
  onGrade: (id: string, g: Grade) => void
  onStar: (id: string) => void
  onLog: (reviewed: number, solid: number, seconds: number) => void
  onExit: () => void
}) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [tally, setTally] = useState({ reviewed: 0, solid: 0 })
  const [done, setDone] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const startedAt = useRef(Date.now())
  const cardAt = useRef(Date.now())
  const [cardSeconds, setCardSeconds] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000))
      setCardSeconds(Math.floor((Date.now() - cardAt.current) / 1000))
    }, 500)
    return () => clearInterval(t)
  }, [])

  const card = queue[index]

  const grade = useCallback(
    (g: Grade) => {
      if (!card || done) return
      const wasSolid = g === 'solid' || g === 'sharp'
      onGrade(card.id, g)
      // log every rep as it happens, so quitting early never loses progress
      onLog(1, wasSolid ? 1 : 0, Math.max(1, Math.round((Date.now() - cardAt.current) / 1000)))
      const next = {
        reviewed: tally.reviewed + 1,
        solid: tally.solid + (wasSolid ? 1 : 0),
      }
      setTally(next)
      if (index + 1 >= queue.length) {
        setDone(true)
      } else {
        setIndex(index + 1)
        setRevealed(false)
        cardAt.current = Date.now()
        setCardSeconds(0)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [card, done, index, onGrade, onLog, queue.length, tally],
  )

  useKey(
    useCallback(
      (e: KeyboardEvent) => {
        if (done) return
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          if (!revealed) setRevealed(true)
          else grade('solid')
          return
        }
        if (!revealed) return
        const hit = GRADES.find((g) => g.hint === e.key)
        if (hit) {
          e.preventDefault()
          grade(hit.key)
        }
        if (e.key.toLowerCase() === 's' && card) onStar(card.id)
      },
      [card, done, grade, onStar, revealed],
    ),
  )

  const accuracy = tally.reviewed ? tally.solid / tally.reviewed : 0

  if (done || !card) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center rise">
        <div className="label">Session complete</div>
        <h2 className="mt-4 font-display text-6xl text-bone-100">
          {tally.solid}
          <span className="text-bone-500">/{tally.reviewed}</span>
        </h2>
        <p className="mt-3 font-mono text-xs tracking-widest text-bone-500 uppercase">
          {Math.round(accuracy * 100)}% solid · {formatDuration(elapsed)} ·{' '}
          {tally.reviewed ? Math.round(elapsed / tally.reviewed) : 0}s per question
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button variant="solid" onClick={onExit}>
            Back to dashboard
          </Button>
        </div>
      </div>
    )
  }

  const isStarred = starred.includes(card.id)

  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-32">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label">{meta.title}</div>
          <h2 className="mt-1 font-display text-3xl text-bone-100">{meta.subtitle}</h2>
        </div>
        <div className="text-right font-mono text-[11px] tracking-widest text-bone-500 uppercase">
          <div>
            {index + 1} / {queue.length}
          </div>
          <div className="mt-1 text-bone-300">{formatDuration(elapsed)}</div>
        </div>
      </header>

      <div className="mt-5">
        <Bar value={queue.length ? index / queue.length : 0} />
      </div>

      <article key={card.id} className="panel mt-8 px-8 py-9 rise">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone={card.core ? 'core' : 'default'}>{shortCategory(card.category)}</Chip>
          {card.core && <Chip tone="core">PE core</Chip>}
          <button
            type="button"
            onClick={() => onStar(card.id)}
            className={`ml-auto cursor-pointer font-mono text-[10px] tracking-[0.16em] uppercase transition-colors ${
              isStarred ? 'text-gold-400' : 'text-bone-500 hover:text-bone-300'
            }`}
          >
            {isStarred ? '★ flagged' : '☆ flag'}
          </button>
        </div>

        <h3 className="mt-6 font-display text-[34px] leading-[1.22] text-bone-100">
          {card.question}
        </h3>

        {!revealed ? (
          <div className="mt-10">
            <div className="hairline" />
            <p className="mt-8 text-center font-mono text-[11px] tracking-[0.2em] text-bone-500 uppercase">
              Answer out loud first — {cardSeconds}s
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="solid" onClick={() => setRevealed(true)}>
                Reveal answer <span className="kbd ml-2">space</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-8 rise">
            <div className="hairline" />
            <div className="mt-7">
              <AnswerBody text={card.answer} />
            </div>
            <div className="mt-6 font-mono text-[10px] tracking-[0.16em] text-bone-500 uppercase">
              {card.source}
            </div>
          </div>
        )}
      </article>

      {revealed && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(147,128,111,0.16)] bg-[rgba(10,8,7,0.86)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-6 py-4">
            <span className="label hidden sm:block">How did it go?</span>
            <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
              {GRADES.map((g) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => grade(g.key)}
                  className={`cursor-pointer rounded-xl border border-[rgba(147,128,111,0.22)] bg-[rgba(29,22,19,0.7)] px-3 py-2.5 transition-all active:translate-y-px ${g.stroke}`}
                >
                  <div className={`font-mono text-[11px] tracking-[0.12em] uppercase ${g.color}`}>
                    {g.label}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-bone-500">{g.hint}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function useDrillMeta(title: string, subtitle: string): DrillMeta {
  return useMemo(() => ({ title, subtitle }), [title, subtitle])
}
