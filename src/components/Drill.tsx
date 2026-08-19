import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Grade, Question } from '../lib/types'
import { shortCategory } from '../lib/data'
import { formatDuration, isSolid, useKey } from '../lib/store'
import { Answer, Bar, Button, Chip } from './bits'

const GRADES: {
  key: Grade
  label: string
  note: string
  hint: string
  color: string
  stroke: string
}[] = [
  {
    key: 'again',
    label: "Didn't know",
    note: 'see again today',
    hint: '1',
    color: 'text-clay-400',
    stroke: 'hover:border-clay-400/60',
  },
  {
    key: 'shaky',
    label: 'Shaky',
    note: 'partial recall',
    hint: '2',
    color: 'text-gold-400',
    stroke: 'hover:border-gold-400/60',
  },
  {
    key: 'solid',
    label: 'Got it',
    note: 'answered right',
    hint: '3',
    color: 'text-bone-100',
    stroke: 'hover:border-ember-500/60',
  },
  {
    key: 'sharp',
    label: 'Know it cold',
    note: 'instant, no gaps',
    hint: '4',
    color: 'text-moss-400',
    stroke: 'hover:border-moss-400/60',
  },
]

export type DrillMeta = { title: string; subtitle: string }

export function Drill({
  queue,
  meta,
  starred,
  onRecord,
  onUndo,
  onStar,
  onExit,
}: {
  queue: Question[]
  meta: DrillMeta
  starred: string[]
  onRecord: (id: string, g: Grade, seconds: number) => void
  onUndo: () => boolean
  onStar: (id: string) => void
  onExit: () => void
}) {
  // the queue grows: anything you blank on comes back at the end of the session
  const [cards, setCards] = useState<Question[]>(queue)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [tally, setTally] = useState({ reviewed: 0, solid: 0 })
  const [done, setDone] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const startedAt = useRef(Date.now())
  const cardAt = useRef(Date.now())
  const [cardSeconds, setCardSeconds] = useState(0)
  const history = useRef<{ index: number; solid: boolean; requeued: boolean }[]>([])
  const requeued = useRef(new Set<string>())

  useEffect(() => {
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000))
      setCardSeconds(Math.floor((Date.now() - cardAt.current) / 1000))
    }, 500)
    return () => clearInterval(t)
  }, [])

  const card = cards[index]

  const grade = useCallback(
    (g: Grade) => {
      if (!card || done) return
      const wasSolid = isSolid(g)
      // log every rep as it happens, so quitting early never loses progress
      onRecord(card.id, g, Math.max(1, Math.round((Date.now() - cardAt.current) / 1000)))

      // a blanked card comes back once this session — you should not leave without seeing it again
      const requeue = g === 'again' && !requeued.current.has(card.id)
      const list = requeue ? [...cards, card] : cards
      if (requeue) {
        requeued.current.add(card.id)
        setCards(list)
      }
      history.current.push({ index, solid: wasSolid, requeued: requeue })

      setTally({
        reviewed: tally.reviewed + 1,
        solid: tally.solid + (wasSolid ? 1 : 0),
      })
      if (index + 1 >= list.length) {
        setDone(true)
      } else {
        setIndex(index + 1)
        setRevealed(false)
        cardAt.current = Date.now()
        setCardSeconds(0)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [card, cards, done, index, onRecord, tally],
  )

  /** Step back to the previous card and reverse its grade everywhere. */
  const undo = useCallback(() => {
    const last = history.current[history.current.length - 1]
    if (!last) return
    if (!onUndo()) return
    history.current.pop()
    if (last.requeued) {
      setCards((prev) => prev.slice(0, -1))
      requeued.current.delete(cards[last.index].id)
    }
    setTally((t) => ({
      reviewed: Math.max(0, t.reviewed - 1),
      solid: Math.max(0, t.solid - (last.solid ? 1 : 0)),
    }))
    setDone(false)
    setIndex(last.index)
    setRevealed(true)
    cardAt.current = Date.now()
    setCardSeconds(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [cards, onUndo])

  useKey(
    useCallback(
      (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === 'u') {
          e.preventDefault()
          undo()
          return
        }
        if (done) return
        // space/enter only ever reveals — grading is always an explicit choice
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          setRevealed(true)
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
      [card, done, grade, onStar, revealed, undo],
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
          {history.current.length > 0 && (
            <Button onClick={undo}>
              Undo last rating <span className="kbd ml-2">u</span>
            </Button>
          )}
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
            {index + 1} / {cards.length}
          </div>
          <div className="mt-1 text-bone-300">{formatDuration(elapsed)}</div>
        </div>
      </header>

      <div className="mt-5">
        <Bar value={cards.length ? index / cards.length : 0} />
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
              Answer out loud — {cardSeconds}s
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
              <Answer short={card.short} long={card.answer} />
            </div>
            <div className="mt-6 font-mono text-[10px] tracking-[0.16em] text-bone-500 uppercase">
              {card.source}
            </div>
          </div>
        )}
      </article>

      {revealed && (
        <div className="border-line fixed inset-x-0 bottom-0 z-40 border-t bg-[rgba(250,249,245,0.9)] backdrop-blur-xl">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="label">Rate it honestly</span>
              {history.current.length > 0 && (
                <button
                  type="button"
                  onClick={undo}
                  className="text-bone-500 hover:text-bone-100 ml-auto cursor-pointer font-mono text-[10px] tracking-[0.16em] uppercase transition-colors"
                >
                  ↩ undo last (u)
                </button>
              )}
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {GRADES.map((g) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => grade(g.key)}
                  className={`border-line bg-ash-900 cursor-pointer rounded-xl border px-3 py-2.5 text-left transition-all active:translate-y-px ${g.stroke}`}
                >
                  <div className={`font-mono text-[11px] tracking-[0.12em] uppercase ${g.color}`}>
                    {g.label}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-bone-500">
                    {g.hint} · {g.note}
                  </div>
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
