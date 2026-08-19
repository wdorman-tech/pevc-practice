import { useMemo, useState } from 'react'
import { CURRICULUM, UNLOCK_AT, activeStage, stageProgress } from '../lib/curriculum'
import type { StageProgress } from '../lib/curriculum'
import { QUESTIONS, shortCategory } from '../lib/data'
import type { Progress } from '../lib/types'
import { Bar, Button } from './bits'
import { SectionHead } from './Dashboard'
import type { StartSpec } from './Dashboard'

export function Course({
  progress,
  onStart,
}: {
  progress: Progress
  onStart: (spec: StartSpec) => void
}) {
  const rows = useMemo(() => stageProgress(progress), [progress])
  const active = useMemo(() => activeStage(rows), [rows])
  const overall = rows.reduce((s, r) => s + r.mastery * r.total, 0) / QUESTIONS.length

  const drillStage = (row: StageProgress, size?: number) =>
    onStart({
      label: `Stage ${row.index + 1} · ${row.stage.title}`,
      subtitle: row.stage.blurb,
      filter: (q) => row.stage.categories.includes(q.category),
      mode: 'course',
      size: size ?? Math.min(row.total, 15),
    })

  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-24">
      <div className="rise">
        <div className="label">A ladder, not a pile</div>
        <h1 className="font-display text-bone-100 mt-3 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02]">
          Start with the three statements.
          <br />
          End with a paper LBO.
        </h1>
        <p className="text-bone-300 mt-4 max-w-2xl text-[15px] leading-relaxed">
          {CURRICULUM.length} stages in dependency order, simplest question first. Hit{' '}
          {Math.round(UNLOCK_AT * 100)}% mastery and the next stage unlocks.
        </p>
      </div>

      <section className="panel mt-8 px-6 py-6">
        <div className="flex items-baseline justify-between gap-4">
          <div className="label">Course progress</div>
          <div className="text-bone-500 font-mono text-[11px]">
            {Math.round(overall * 100)}% · stage {active.index + 1} of {CURRICULUM.length}
          </div>
        </div>
        <div className="mt-3">
          <Bar value={overall} />
        </div>
        <div className="border-line mt-5 flex flex-wrap items-center gap-3 border-t pt-5">
          <div className="flex-1">
            <div className="text-bone-500 font-mono text-[10px] tracking-[0.16em] uppercase">
              Up next
            </div>
            <div className="font-display text-bone-100 mt-1 text-2xl">{active.stage.title}</div>
          </div>
          <Button variant="solid" onClick={() => drillStage(active)}>
            Continue course
          </Button>
        </div>
      </section>

      <section className="mt-12">
        <SectionHead title="The ladder" note={`${QUESTIONS.length} questions in order`} />
        <div className="mt-5 space-y-2.5">
          {rows.map((row) => (
            <StageCard
              key={row.stage.id}
              row={row}
              isActive={row.stage.id === active.stage.id}
              onDrill={() => drillStage(row)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function StageCard({
  row,
  isActive,
  onDrill,
}: {
  row: StageProgress
  isActive: boolean
  onDrill: () => void
}) {
  const [open, setOpen] = useState(false)
  const locked = !row.unlocked

  return (
    <div
      className={`panel overflow-hidden transition-colors ${
        isActive ? 'border-ember-500/45' : ''
      } ${locked ? 'opacity-55' : ''}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-start gap-4 px-5 py-5 text-left"
      >
        <div
          className={`font-display mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg ${
            row.complete
              ? 'bg-moss-400/12 text-moss-400'
              : isActive
                ? 'bg-ember-500/12 text-ember-600'
                : 'bg-well text-bone-500'
          }`}
        >
          {row.complete ? '✓' : row.index + 1}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-bone-100 text-2xl">{row.stage.title}</span>
            {isActive && (
              <span className="text-ember-600 font-mono text-[10px] tracking-[0.16em] uppercase">
                current
              </span>
            )}
            {locked && (
              <span className="text-bone-500 font-mono text-[10px] tracking-[0.16em] uppercase">
                locked
              </span>
            )}
          </div>
          <div className="text-bone-300 mt-1 text-[14px] leading-relaxed">{row.stage.blurb}</div>

          <div className="mt-3 max-w-md">
            <Bar value={row.mastery} tone={row.complete ? 'moss' : 'ember'} />
          </div>
          <div className="text-bone-500 mt-2 flex flex-wrap gap-4 font-mono text-[10px] tracking-[0.14em] uppercase">
            <span>{Math.round(row.mastery * 100)}% mastery</span>
            <span>
              {row.seen}/{row.total} touched
            </span>
            {row.due > 0 && <span className="text-ember-600">{row.due} due</span>}
          </div>
        </div>

        <span className="text-bone-500 font-mono text-[11px]">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 pl-[4.25rem]">
          <div className="hairline mb-4" />
          <p className="text-bone-300 text-[14px] leading-relaxed">{row.stage.teaches}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {row.stage.categories.map((c, i) => (
              <span
                key={c}
                className="border-line text-bone-500 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase"
              >
                {i + 1}. {shortCategory(c)}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button onClick={onDrill}>
              {locked ? 'Drill anyway' : row.seen ? 'Resume stage' : 'Start stage'}
            </Button>
            {locked && (
              <span className="text-bone-500 font-mono text-[10px] tracking-[0.14em] uppercase">
                Unlocks at {Math.round(UNLOCK_AT * 100)}% in stage {row.index}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
