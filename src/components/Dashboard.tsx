import { useMemo } from 'react'
import { CATEGORIES, CORE_COUNT, QUESTIONS, TRACK_BLURB, TRACK_ORDER, shortCategory } from '../lib/data'
import type { Progress } from '../lib/types'
import { categoryStats, deriveStats } from '../lib/store'
import { CURRICULUM, activeStage, stageProgress } from '../lib/curriculum'
import { SPECIAL_SETS } from '../lib/sets'
import { Bar, Button, Ring, Stat } from './bits'
import { SpecialSetRail } from './SpecialSets'

export type StartSpec = {
  label: string
  subtitle: string
  filter: (q: (typeof QUESTIONS)[number]) => boolean
  mode: 'due' | 'new' | 'weak' | 'mixed' | 'all' | 'course'
  size: number
}

export function Dashboard({
  progress,
  onStart,
  onOpenLibrary,
  onOpenCourse,
  onOpenSets,
}: {
  progress: Progress
  onStart: (spec: StartSpec) => void
  onOpenLibrary: () => void
  onOpenCourse: () => void
  onOpenSets: () => void
}) {
  const stats = useMemo(() => deriveStats(progress), [progress])
  const cats = useMemo(() => categoryStats(progress), [progress])
  const stages = useMemo(() => stageProgress(progress), [progress])
  const active = useMemo(() => activeStage(stages), [stages])

  const weakest = useMemo(
    () =>
      cats
        .filter((c) => c.total >= 5)
        .sort((a, b) => a.mastery - b.mastery)
        .slice(0, 6),
    [cats],
  )

  const trackRows = useMemo(
    () =>
      TRACK_ORDER.map((track) => {
        const inTrack = cats.filter((c) => c.track === track)
        const total = inTrack.reduce((s, c) => s + c.total, 0)
        const mastery = total
          ? inTrack.reduce((s, c) => s + c.mastery * c.total, 0) / total
          : 0
        const due = inTrack.reduce((s, c) => s + c.due, 0)
        const seen = inTrack.reduce((s, c) => s + c.seen, 0)
        return { track, total, mastery, due, seen }
      }),
    [cats],
  )

  const quickStarts: StartSpec[] = [
    {
      label: 'Due now',
      subtitle: `${stats.due} cards resurfacing`,
      filter: () => true,
      mode: 'due',
      size: 20,
    },
    {
      label: 'PE / LBO core',
      subtitle: `${CORE_COUNT} questions worth knowing cold`,
      filter: (q) => q.core,
      mode: 'mixed',
      size: 15,
    },
    {
      label: 'Weak spots',
      subtitle: 'Everything you have fumbled',
      filter: () => true,
      mode: 'weak',
      size: 15,
    },
    {
      label: 'Fresh 10',
      subtitle: 'Questions you have never seen',
      filter: () => true,
      mode: 'new',
      size: 10,
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 pb-24">
      {/* hero */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.35fr_auto]">
        <div className="rise">
          <div className="label">Investment banking · private equity · 2025 edition</div>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.98] text-bone-100">
            {QUESTIONS.length} questions.
            <br />
            <span className="text-ember-500 italic">One</span> hurdle rate.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-bone-300">
            The 400 Questions guide plus a PE / LBO set and four club sectors, on spaced
            repetition. Answer out loud, then grade yourself honestly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="solid"
              onClick={() =>
                onStart({
                  label: `Stage ${active.index + 1} · ${active.stage.title}`,
                  subtitle: active.stage.blurb,
                  filter: (q) => active.stage.categories.includes(q.category),
                  mode: 'course',
                  size: Math.min(active.total, 15),
                })
              }
            >
              {active.seen ? 'Continue course' : 'Start the course'} · stage {active.index + 1}
            </Button>
            {stats.due > 0 && (
              <Button onClick={() => onStart(quickStarts[0])}>Review {stats.due} due</Button>
            )}
            <Button onClick={onOpenLibrary}>Browse the library</Button>
          </div>
        </div>

        <div className="flex justify-center rise lg:justify-end">
          <Ring value={stats.mastery} size={210} stroke={12}>
            <div>
              <div className="font-display text-6xl text-bone-100">
                {Math.round(stats.mastery * 100)}
                <span className="text-2xl text-bone-500">%</span>
              </div>
              <div className="label mt-1">deck mastery</div>
            </div>
          </Ring>
        </div>
      </section>

      {/* stat strip */}
      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Due now" value={stats.due} sub={`${stats.newCards} never seen`} accent />
        <Stat
          label="Burned in"
          value={stats.mastered}
          sub={`${stats.learning} still in rotation`}
        />
        <Stat
          label="Day streak"
          value={stats.streak}
          sub={`${stats.todayReviewed} reviewed today`}
        />
        <Stat
          label="Recall rate"
          value={`${Math.round(stats.accuracy * 100)}%`}
          sub={`${stats.reviewedTotal} total reps`}
        />
      </section>

      {/* course rail */}
      <section className="mt-14">
        <SectionHead
          title="Your course"
          note={`stage ${active.index + 1} of ${CURRICULUM.length}`}
        />
        <button
          type="button"
          onClick={onOpenCourse}
          className="panel hover:border-ember-500/45 mt-5 block w-full cursor-pointer px-6 py-6 text-left transition-all"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="label">Currently on</div>
              <div className="font-display text-bone-100 mt-1 text-3xl">{active.stage.title}</div>
              <div className="text-bone-300 mt-1 text-[14px]">{active.stage.blurb}</div>
            </div>
            <div className="text-bone-500 font-mono text-[11px] tracking-[0.16em] uppercase">
              view ladder →
            </div>
          </div>

          <div className="mt-5 flex items-center gap-[3px]">
            {stages.map((s) => (
              <div
                key={s.stage.id}
                title={`${s.index + 1}. ${s.stage.title} — ${Math.round(s.mastery * 100)}%`}
                className={`h-1.5 flex-1 rounded-full ${
                  s.complete
                    ? 'bg-moss-400'
                    : s.index === active.index
                      ? 'bg-ember-500'
                      : s.unlocked
                        ? 'bg-ember-500/25'
                        : 'bg-well'
                }`}
              />
            ))}
          </div>
          <div className="text-bone-500 mt-2.5 flex flex-wrap gap-4 font-mono text-[10px] tracking-[0.14em] uppercase">
            <span>{Math.round(active.mastery * 100)}% this stage</span>
            <span>
              {active.seen}/{active.total} touched
            </span>
            <span>{stages.filter((s) => s.complete).length} stages cleared</span>
          </div>
        </button>
      </section>

      {/* quick starts */}
      <section className="mt-14">
        <SectionHead title="Jump in" note="4 ways to run a set" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickStarts.map((spec) => (
            <button
              key={spec.label}
              type="button"
              onClick={() => onStart(spec)}
              className="panel group cursor-pointer px-5 py-5 text-left transition-all hover:-translate-y-0.5 hover:border-ember-500/45"
            >
              <div className="font-display text-2xl text-bone-100 group-hover:text-ember-600">
                {spec.label}
              </div>
              <div className="mt-2 font-mono text-[11px] leading-relaxed text-bone-500">
                {spec.subtitle}
              </div>
              <div className="mt-4 font-mono text-[10px] tracking-[0.18em] text-ember-600/70 uppercase">
                {spec.size} cards →
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* club sets */}
      <section className="mt-14">
        <SectionHead
          title="Special sets"
          note={`${SPECIAL_SETS.length} club mandates · click for the full set`}
        />
        <SpecialSetRail progress={progress} onOpen={onOpenSets} />
      </section>

      {/* tracks */}
      <section className="mt-14">
        <SectionHead title="Tracks" note="Click to drill the whole track" />
        <div className="mt-5 space-y-3">
          {trackRows.map((row) => (
            <button
              key={row.track}
              type="button"
              onClick={() =>
                onStart({
                  label: row.track,
                  subtitle: TRACK_BLURB[row.track],
                  filter: (q) => q.track === row.track,
                  mode: 'mixed',
                  size: 20,
                })
              }
              className="panel grid w-full cursor-pointer grid-cols-1 items-center gap-4 px-6 py-5 text-left transition-all hover:border-ember-500/45 md:grid-cols-[1.1fr_2fr_auto]"
            >
              <div>
                <div className="font-display text-2xl text-bone-100">{row.track}</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.1em] text-bone-500">
                  {TRACK_BLURB[row.track]}
                </div>
              </div>
              <div>
                <Bar value={row.mastery} />
                <div className="mt-2 flex gap-4 font-mono text-[10px] tracking-[0.14em] text-bone-500 uppercase">
                  <span>{Math.round(row.mastery * 100)}% mastery</span>
                  <span>
                    {row.seen}/{row.total} touched
                  </span>
                  {row.due > 0 && <span className="text-ember-600">{row.due} due</span>}
                </div>
              </div>
              <div className="font-mono text-[11px] tracking-[0.16em] text-bone-500 uppercase md:text-right">
                drill →
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* weak spots */}
      <section className="mt-14">
        <SectionHead title="Softest categories" note="Lowest mastery, 5+ questions" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {weakest.map((c) => (
            <button
              key={c.category}
              type="button"
              onClick={() =>
                onStart({
                  label: shortCategory(c.category),
                  subtitle: c.track,
                  filter: (q) => q.category === c.category,
                  mode: 'mixed',
                  size: Math.min(c.total, 15),
                })
              }
              className="panel flex cursor-pointer items-center gap-4 px-5 py-4 text-left transition-all hover:border-ember-500/45"
            >
              <div className="flex-1">
                <div className="text-[15px] text-bone-100">{shortCategory(c.category)}</div>
                <div className="mt-2">
                  <Bar value={c.mastery} tone={c.mastery < 0.25 ? 'ember' : 'moss'} />
                </div>
              </div>
              <div className="font-mono text-xs text-bone-500">
                {Math.round(c.mastery * 100)}%
              </div>
            </button>
          ))}
        </div>
      </section>

      <footer className="mt-16 text-center font-mono text-[10px] tracking-[0.2em] text-bone-500 uppercase">
        {CATEGORIES.length} categories · {CORE_COUNT} PE-core questions · progress saved in this
        browser
      </footer>
    </div>
  )
}

export function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <h2 className="font-display text-3xl text-bone-100">{title}</h2>
      {note && <span className="label">{note}</span>}
    </div>
  )
}
