import { useMemo, useState } from 'react'
import { shortCategory } from '../lib/data'
import {
  SPECIAL_SETS,
  categoryPool,
  poolStats,
  setCategories,
  setPool,
  setStats,
} from '../lib/sets'
import type { SpecialSet } from '../lib/sets'
import type { Progress } from '../lib/types'
import { Bar, Button, Chip } from './bits'
import { SectionHead } from './Dashboard'
import type { StartSpec } from './Dashboard'

export function SpecialSets({
  progress,
  onStart,
}: {
  progress: Progress
  onStart: (spec: StartSpec) => void
}) {
  const rows = useMemo(
    () => SPECIAL_SETS.map((set) => ({ set, stats: setStats(progress, set) })),
    [progress],
  )
  const authored = rows.reduce((s, r) => s + r.stats.authored, 0)

  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-24">
      <div className="rise">
        <div className="label">Four sectors, four mandates</div>
        <h1 className="font-display text-bone-100 mt-3 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02]">
          Practice for the room
          <br />
          you are actually walking into.
        </h1>
        <p className="text-bone-300 mt-4 max-w-2xl text-[15px] leading-relaxed">
          {authored} questions written for these mandates, plus the slices of the core deck that
          belong to each one.
        </p>
      </div>

      <section className="mt-10">
        <SectionHead title="The sets" note={`${SPECIAL_SETS.length} sectors`} />
        <div className="mt-5 space-y-2.5">
          {rows.map(({ set, stats }) => (
            <SetCard key={set.id} set={set} progress={progress} onStart={onStart} stats={stats} />
          ))}
        </div>
      </section>
    </div>
  )
}

function SetCard({
  set,
  progress,
  onStart,
  stats,
}: {
  set: SpecialSet
  progress: Progress
  onStart: (spec: StartSpec) => void
  stats: ReturnType<typeof setStats>
}) {
  const [open, setOpen] = useState(false)

  const categories = useMemo(() => new Set(setCategories(set)), [set])
  const inSet = (q: { category: string }) => categories.has(q.category)

  const drillSet = (mode: StartSpec['mode'], size: number, subtitle: string) =>
    onStart({
      label: `${set.org.replace('Penn ', '').replace('Wharton Undergraduate ', '')} · ${set.title}`,
      subtitle,
      filter: inSet,
      mode,
      size,
    })

  const drillCategory = (category: string) => {
    const pool = categoryPool(category)
    onStart({
      label: shortCategory(category),
      subtitle: `${set.title} · ${pool.length} questions`,
      filter: (q) => q.category === category,
      mode: 'mixed',
      size: Math.min(pool.length, 20),
    })
  }

  const modulesOnly = () =>
    onStart({
      label: `${set.title} · written for this set`,
      subtitle: `${stats.authored} purpose-written questions`,
      filter: (q) => set.modules.some((m) => m.category === q.category),
      mode: 'mixed',
      size: Math.min(stats.authored, 20),
    })

  return (
    <div className="panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-start gap-4 px-5 py-5 text-left"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-bone-500 font-mono text-[10px] tracking-[0.16em] uppercase">
              {set.org}
            </span>
          </div>
          <div className="font-display text-bone-100 mt-1 text-2xl">{set.title}</div>
          <div className="text-ember-600/90 mt-0.5 font-mono text-[11px] tracking-[0.08em]">
            {set.tagline}
          </div>
          <div className="text-bone-300 mt-2 text-[14px] leading-relaxed">{set.blurb}</div>

          <div className="mt-3 max-w-md">
            <Bar value={stats.mastery} tone={stats.mastery >= 0.5 ? 'moss' : 'ember'} />
          </div>
          <div className="text-bone-500 mt-2 flex flex-wrap gap-4 font-mono text-[10px] tracking-[0.14em] uppercase">
            <span>{Math.round(stats.mastery * 100)}% mastery</span>
            <span>
              {stats.seen}/{stats.total} touched
            </span>
            <span>{stats.authored} written for this set</span>
            {stats.due > 0 && <span className="text-ember-600">{stats.due} due</span>}
          </div>
        </div>

        <span className="text-bone-500 font-mono text-[11px]">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="px-5 pb-6">
          <div className="hairline mb-5" />

          <blockquote className="border-ember-500/50 text-bone-100 border-l-2 pl-4 text-[15px] leading-relaxed italic">
            {set.mandate}
          </blockquote>
          <a
            href={set.orgLink}
            target="_blank"
            rel="noreferrer"
            className="text-bone-500 hover:text-ember-600 mt-2 inline-block font-mono text-[10px] tracking-[0.14em] uppercase"
          >
            {set.orgLink.replace('https://www.', '').replace(/\/$/, '')} ↗
          </a>

          <ul className="text-bone-300 mt-4 space-y-1.5 text-[14px]">
            {set.doing.map((line) => (
              <li key={line} className="-indent-4 pl-4">
                — {line}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <div className="label">Written for this set</div>
            <div className="mt-3 space-y-2">
              {set.modules.map((m) => (
                <ModuleRow
                  key={m.category}
                  category={m.category}
                  blurb={m.blurb}
                  progress={progress}
                  onDrill={() => drillCategory(m.category)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="label">Folded in from the core deck</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {set.borrowed.map((b) => (
                <Chip key={b.category} onClick={() => drillCategory(b.category)}>
                  {shortCategory(b.category)}
                </Chip>
              ))}
            </div>
            <div className="text-bone-500 mt-2 font-mono text-[10px] leading-relaxed">
              {set.borrowed.map((b) => `${shortCategory(b.category)} — ${b.why}`).join(' · ')}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="solid"
              onClick={() => drillSet('mixed', 20, `${set.org} · ${stats.total} questions in set`)}
            >
              Drill the set
            </Button>
            <Button onClick={modulesOnly}>Set-specific only</Button>
            <Button onClick={() => drillSet('new', 10, 'Questions you have never seen')}>
              Fresh 10
            </Button>
            {stats.due > 0 && (
              <Button onClick={() => drillSet('due', 20, `${stats.due} resurfacing in this set`)}>
                Review {stats.due} due
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ModuleRow({
  category,
  blurb,
  progress,
  onDrill,
}: {
  category: string
  blurb: string
  progress: Progress
  onDrill: () => void
}) {
  const stats = useMemo(() => poolStats(progress, categoryPool(category)), [category, progress])

  return (
    <button
      type="button"
      onClick={onDrill}
      className="border-line hover:border-ember-500/45 grid w-full cursor-pointer grid-cols-1 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors md:grid-cols-[1.2fr_1fr_auto]"
    >
      <div>
        <div className="text-bone-100 text-[14px]">{shortCategory(category)}</div>
        <div className="text-bone-500 mt-0.5 font-mono text-[10px] tracking-[0.08em]">{blurb}</div>
      </div>
      <div>
        <Bar value={stats.mastery} tone={stats.mastery >= 0.5 ? 'moss' : 'ember'} />
        <div className="text-bone-500 mt-1.5 flex gap-3 font-mono text-[10px] tracking-[0.12em] uppercase">
          <span>{Math.round(stats.mastery * 100)}%</span>
          <span>
            {stats.seen}/{stats.total}
          </span>
          {stats.due > 0 && <span className="text-ember-600">{stats.due} due</span>}
        </div>
      </div>
      <div className="text-bone-500 font-mono text-[10px] tracking-[0.16em] uppercase md:text-right">
        drill →
      </div>
    </button>
  )
}

/** Compact rail for the dashboard. */
export function SpecialSetRail({
  progress,
  onOpen,
}: {
  progress: Progress
  onOpen: () => void
}) {
  const rows = useMemo(
    () => SPECIAL_SETS.map((set) => ({ set, stats: poolStats(progress, setPool(set)) })),
    [progress],
  )

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {rows.map(({ set, stats }) => (
        <button
          key={set.id}
          type="button"
          onClick={onOpen}
          className="panel group hover:border-ember-500/45 cursor-pointer px-5 py-5 text-left transition-all hover:-translate-y-0.5"
        >
          <div className="text-bone-500 font-mono text-[10px] tracking-[0.16em] uppercase">
            {set.org.replace('Wharton Undergraduate ', '').replace('Penn ', '')}
          </div>
          <div className="font-display text-bone-100 group-hover:text-ember-600 mt-1 text-2xl">
            {set.title}
          </div>
          <div className="text-bone-500 mt-2 font-mono text-[11px] leading-relaxed">
            {set.tagline}
          </div>
          <div className="mt-4">
            <Bar value={stats.mastery} tone={stats.mastery >= 0.5 ? 'moss' : 'ember'} />
          </div>
          <div className="text-bone-500 mt-2 font-mono text-[10px] tracking-[0.14em] uppercase">
            {stats.total} questions · {Math.round(stats.mastery * 100)}%
          </div>
        </button>
      ))}
    </div>
  )
}
