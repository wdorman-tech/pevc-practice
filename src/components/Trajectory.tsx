import { useMemo } from 'react'
import { categoryStats, deriveStats, formatDuration } from '../lib/store'
import type { Progress } from '../lib/types'
import { TRACK_ORDER, shortCategory } from '../lib/data'
import { Bar, Button, Stat } from './bits'
import { SectionHead } from './Dashboard'

const WEEKS = 18

export function Trajectory({
  progress,
  onReset,
  onDrillCategory,
}: {
  progress: Progress
  onReset: () => void
  onDrillCategory: (category: string) => void
}) {
  const stats = useMemo(() => deriveStats(progress), [progress])
  const cats = useMemo(
    () => categoryStats(progress).sort((a, b) => a.mastery - b.mastery),
    [progress],
  )

  const byDay = useMemo(() => {
    const map = new Map(progress.sessions.map((s) => [s.day, s]))
    const cells: { day: string; reviewed: number }[] = []
    const cursor = new Date()
    cursor.setDate(cursor.getDate() - (WEEKS * 7 - 1))
    for (let i = 0; i < WEEKS * 7; i++) {
      const day = cursor.toISOString().slice(0, 10)
      cells.push({ day, reviewed: map.get(day)?.reviewed ?? 0 })
      cursor.setDate(cursor.getDate() + 1)
    }
    return cells
  }, [progress.sessions])

  const totalSeconds = progress.sessions.reduce((s, x) => s + x.seconds, 0)
  const peak = Math.max(1, ...byDay.map((d) => d.reviewed))

  return (
    <div className="mx-auto max-w-5xl px-6 pt-10 pb-24">
      <SectionHead title="Trajectory" note="Everything lives in this browser" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total reps" value={stats.reviewedTotal} sub={`${stats.touched} unique cards`} />
        <Stat label="Recall rate" value={`${Math.round(stats.accuracy * 100)}%`} accent />
        <Stat label="Time drilled" value={formatDuration(totalSeconds)} sub="mm:ss" />
        <Stat label="Streak" value={stats.streak} sub="consecutive days" />
      </div>

      <section className="panel mt-8 px-6 py-6">
        <div className="label">Last {WEEKS} weeks</div>
        <div
          className="mt-4 grid grid-flow-col justify-start gap-[3px] overflow-x-auto"
          style={{ gridTemplateRows: 'repeat(7, 13px)', gridAutoColumns: '13px' }}
        >
          {byDay.map((cell) => {
            const intensity = cell.reviewed ? 0.22 + 0.78 * Math.min(1, cell.reviewed / peak) : 0
            return (
              <div
                key={cell.day}
                title={`${cell.day} · ${cell.reviewed} reviewed`}
                className="rounded-[3px] border border-[rgba(147,128,111,0.08)]"
                style={{
                  background: intensity
                    ? `rgba(242, 96, 26, ${intensity})`
                    : 'rgba(147,128,111,0.07)',
                }}
              />
            )
          })}
        </div>
      </section>

      <section className="mt-12">
        <SectionHead title="Category mastery" note="Weakest first" />
        <div className="mt-5 space-y-2">
          {TRACK_ORDER.map((track) => {
            const rows = cats.filter((c) => c.track === track)
            if (!rows.length) return null
            return (
              <div key={track} className="panel px-5 py-5">
                <div className="label">{track}</div>
                <div className="mt-4 space-y-3">
                  {rows.map((c) => (
                    <button
                      key={c.category}
                      type="button"
                      onClick={() => onDrillCategory(c.category)}
                      className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-4 text-left"
                    >
                      <div>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-[14px] text-bone-300 group-hover:text-bone-100">
                            {shortCategory(c.category)}
                          </span>
                          <span className="font-mono text-[10px] text-bone-500">
                            {c.seen}/{c.total}
                            {c.due > 0 && <span className="text-ember-400"> · {c.due} due</span>}
                          </span>
                        </div>
                        <div className="mt-1.5">
                          <Bar value={c.mastery} tone={c.mastery >= 0.7 ? 'moss' : 'ember'} />
                        </div>
                      </div>
                      <span className="w-10 text-right font-mono text-xs text-bone-500">
                        {Math.round(c.mastery * 100)}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="mt-12 flex justify-center">
        <Button
          variant="quiet"
          onClick={() => {
            if (confirm('Wipe all progress, streaks, and flags? This cannot be undone.')) onReset()
          }}
        >
          Reset all progress
        </Button>
      </div>
    </div>
  )
}
