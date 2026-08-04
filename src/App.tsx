import { useCallback, useMemo, useState } from 'react'
import { Dashboard, type StartSpec } from './components/Dashboard'
import { Drill, type DrillMeta } from './components/Drill'
import { Library } from './components/Library'
import { Trajectory } from './components/Trajectory'
import { QUESTIONS, shortCategory } from './lib/data'
import { buildQueue, useProgress } from './lib/store'
import type { Question } from './lib/types'

type View = 'dashboard' | 'drill' | 'library' | 'trajectory'

const NAV: { id: View; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'library', label: 'Library' },
  { id: 'trajectory', label: 'Trajectory' },
]

export default function App() {
  const { progress, grade, logSession, toggleStar, reset } = useProgress()
  const [view, setView] = useState<View>('dashboard')
  const [queue, setQueue] = useState<Question[]>([])
  const [meta, setMeta] = useState<DrillMeta>({ title: '', subtitle: '' })
  const [runId, setRunId] = useState(0)

  const start = useCallback(
    (spec: StartSpec) => {
      const pool = QUESTIONS.filter(spec.filter)
      const built = buildQueue(progress, pool, spec.size, spec.mode)
      if (!built.length) return
      setQueue(built)
      setMeta({ title: spec.label, subtitle: spec.subtitle })
      setRunId((n) => n + 1)
      setView('drill')
      window.scrollTo({ top: 0 })
    },
    [progress],
  )

  const drillCategory = useCallback(
    (category: string) => {
      const pool = QUESTIONS.filter((q) => q.category === category)
      start({
        label: shortCategory(category),
        subtitle: `${pool.length} questions in this set`,
        filter: (q) => q.category === category,
        mode: 'mixed',
        size: Math.min(pool.length, 20),
      })
    },
    [start],
  )

  const goHome = useCallback(() => {
    setView('dashboard')
    window.scrollTo({ top: 0 })
  }, [])

  const body = useMemo(() => {
    if (view === 'drill')
      return (
        <Drill
          key={runId}
          queue={queue}
          meta={meta}
          starred={progress.starred}
          onGrade={grade}
          onStar={toggleStar}
          onLog={logSession}
          onExit={goHome}
        />
      )
    if (view === 'library')
      return <Library progress={progress} onStar={toggleStar} onDrillCategory={drillCategory} />
    if (view === 'trajectory')
      return <Trajectory progress={progress} onReset={reset} onDrillCategory={drillCategory} />
    return <Dashboard progress={progress} onStart={start} onOpenLibrary={() => setView('library')} />
  }, [
    drillCategory,
    goHome,
    grade,
    logSession,
    meta,
    progress,
    queue,
    reset,
    runId,
    start,
    toggleStar,
    view,
  ])

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-[rgba(147,128,111,0.14)] bg-[rgba(10,8,7,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
          <button
            type="button"
            onClick={goHome}
            className="flex cursor-pointer items-center gap-2.5"
          >
            <Flame />
            <span className="font-display text-2xl leading-none tracking-wide text-bone-100">
              Ember
            </span>
            <span className="label hidden sm:block">IB · PE trainer</span>
          </button>

          <div className="ml-auto flex items-center gap-1">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setView(item.id)
                  window.scrollTo({ top: 0 })
                }}
                className={`cursor-pointer rounded-lg px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
                  view === item.id
                    ? 'bg-ember-500/12 text-ember-300'
                    : 'text-bone-500 hover:text-bone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {view === 'drill' && (
        <button
          type="button"
          onClick={goHome}
          className="fixed bottom-24 left-6 z-50 cursor-pointer rounded-full border border-[rgba(147,128,111,0.22)] bg-[rgba(16,12,10,0.9)] px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-bone-500 uppercase backdrop-blur transition-colors hover:text-bone-100"
        >
          ← End session
        </button>
      )}

      {body}
    </div>
  )
}

function Flame() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden>
      <path
        d="M10 1c1.6 4.2-1.4 5.6-2.9 7.7C5.4 11 5 12.6 5 14.2 5 18.5 7.9 22 10.6 22 14 22 16 18.9 16 15.2c0-3.4-2-5.3-3.2-7.4-.7-1.2-1-2.3-.8-3.6-1 .7-1.7 1.6-2.1 2.7C9.3 5.2 9.4 3.1 10 1Z"
        fill="url(#flameGrad)"
      />
      <defs>
        <linearGradient id="flameGrad" x1="5" y1="1" x2="16" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8a33d" />
          <stop offset="0.5" stopColor="#f2601a" />
          <stop offset="1" stopColor="#a63505" />
        </linearGradient>
      </defs>
    </svg>
  )
}
