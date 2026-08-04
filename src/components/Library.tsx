import { useMemo, useState } from 'react'
import { CATEGORIES, QUESTIONS, TRACK_ORDER, shortCategory } from '../lib/data'
import type { Progress, Question } from '../lib/types'
import { AnswerBody, Bar, Button, Chip } from './bits'
import { SectionHead } from './Dashboard'

export function Library({
  progress,
  onStar,
  onDrillCategory,
}: {
  progress: Progress
  onStar: (id: string) => void
  onDrillCategory: (category: string) => void
}) {
  const [query, setQuery] = useState('')
  const [track, setTrack] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [starredOnly, setStarredOnly] = useState(false)
  const [open, setOpen] = useState<string | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return QUESTIONS.filter((item) => {
      if (track && item.track !== track) return false
      if (category && item.category !== category) return false
      if (starredOnly && !progress.starred.includes(item.id)) return false
      if (!q) return true
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
    })
  }, [category, progress.starred, query, starredOnly, track])

  const visibleCategories = useMemo(
    () => CATEGORIES.filter((c) => !track || c.track === track),
    [track],
  )

  return (
    <div className="mx-auto max-w-5xl px-6 pt-10 pb-24">
      <SectionHead title="Library" note={`${results.length} of ${QUESTIONS.length}`} />

      <div className="panel mt-6 px-5 py-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions and answers — try 'IRR', 'goodwill', 'why banking'"
          className="w-full bg-transparent font-sans text-lg text-bone-100 outline-none placeholder:text-bone-500/70"
        />
        <div className="hairline mt-4" />
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip active={!track && !starredOnly} onClick={() => { setTrack(null); setCategory(null); setStarredOnly(false) }}>
            All
          </Chip>
          {TRACK_ORDER.map((t) => (
            <Chip
              key={t}
              active={track === t}
              onClick={() => {
                setTrack(track === t ? null : t)
                setCategory(null)
              }}
            >
              {t}
            </Chip>
          ))}
          <Chip active={starredOnly} onClick={() => setStarredOnly(!starredOnly)}>
            ★ Flagged ({progress.starred.length})
          </Chip>
        </div>
        <div className={`mt-3 flex flex-wrap gap-2 ${track ? '' : 'hidden'}`}>
          {visibleCategories.map((c) => (
            <Chip
              key={c.category}
              active={category === c.category}
              onClick={() => setCategory(category === c.category ? null : c.category)}
            >
              {shortCategory(c.category)} · {c.count}
            </Chip>
          ))}
        </div>
        {category && (
          <div className="mt-4">
            <Button onClick={() => onDrillCategory(category)}>
              Drill {shortCategory(category)}
            </Button>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-2.5">
        {results.map((item) => (
          <Row
            key={item.id}
            item={item}
            open={open === item.id}
            box={progress.cards[item.id]?.box ?? 0}
            starred={progress.starred.includes(item.id)}
            onToggle={() => setOpen(open === item.id ? null : item.id)}
            onStar={() => onStar(item.id)}
          />
        ))}
        {results.length === 0 && (
          <p className="py-16 text-center font-mono text-xs tracking-widest text-bone-500 uppercase">
            Nothing matches that
          </p>
        )}
      </div>
    </div>
  )
}

function Row({
  item,
  open,
  box,
  starred,
  onToggle,
  onStar,
}: {
  item: Question
  open: boolean
  box: number
  starred: boolean
  onToggle: () => void
  onStar: () => void
}) {
  return (
    <div className={`panel overflow-hidden transition-colors ${open ? 'border-ember-500/35' : ''}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start gap-4 px-5 py-4 text-left"
      >
        <div className="mt-1.5 w-14 shrink-0">
          <Bar value={box / 5} tone={box >= 4 ? 'moss' : box === 0 ? 'bone' : 'ember'} />
        </div>
        <div className="flex-1">
          <div className="text-[15px] leading-snug text-bone-100">{item.question}</div>
          <div className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-bone-500 uppercase">
            {shortCategory(item.category)}
            {item.core && <span className="text-gold-400"> · PE core</span>}
          </div>
        </div>
        <span
          onClick={(e) => {
            e.stopPropagation()
            onStar()
          }}
          className={`cursor-pointer text-sm ${starred ? 'text-gold-400' : 'text-bone-500 hover:text-bone-300'}`}
        >
          {starred ? '★' : '☆'}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-6 pl-[4.75rem]">
          <div className="hairline mb-5" />
          <AnswerBody text={item.answer} />
        </div>
      )}
    </div>
  )
}
