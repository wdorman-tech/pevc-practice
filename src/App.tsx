import { useCallback, useState } from 'react'
import type { ModuleId } from './content/concepts'
import { TESTS } from './content/tests'
import { useStore } from './lib/store'
import { Cards } from './views/Cards'
import { Concepts } from './views/Concepts'
import { Gym } from './views/Gym'
import { Home } from './views/Home'
import { Lesson } from './views/Lesson'
import { MathDrill } from './views/MathDrill'
import { Mock } from './views/Mock'
import { Progress } from './views/Progress'
import { TestRunner } from './views/TestRunner'
import { Tests } from './views/Tests'

const NAV = [
  { id: 'home', code: '01', label: 'Brief' },
  { id: 'lesson', code: '02', label: 'The Big Three' },
  { id: 'concepts', code: '03', label: 'Concepts' },
  { id: 'cards', code: '04', label: 'Cards' },
  { id: 'gym', code: '05', label: 'Gym' },
  { id: 'math', code: '06', label: 'Math' },
  { id: 'mock', code: '07', label: 'Mock' },
  { id: 'tests', code: '08', label: 'Tests' },
  { id: 'progress', code: '09', label: 'Progress' },
] as const

type View = (typeof NAV)[number]['id'] | 'running'

export default function App() {
  const store = useStore()
  const [view, setView] = useState<View>('home')
  const [conceptModule, setConceptModule] = useState<ModuleId | undefined>()
  const [runningId, setRunningId] = useState<string | null>(null)
  const [runKey, setRunKey] = useState(0)

  const go = useCallback((v: string, mod?: ModuleId) => {
    setConceptModule(mod)
    setView(v as View)
    window.scrollTo({ top: 0 })
  }, [])

  const startTest = useCallback((id: string) => {
    setRunningId(id)
    setRunKey((k) => k + 1)
    setView('running')
    window.scrollTo({ top: 0 })
  }, [])

  const running = TESTS.find((t) => t.id === runningId)

  return (
    <div className="min-h-screen">
      <nav className="border-line sticky top-0 z-50 border-b bg-[rgba(250,249,245,0.85)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-6 py-3.5">
          <button
            type="button"
            onClick={() => go('home')}
            className="flex flex-none cursor-pointer items-baseline gap-2.5"
          >
            <span className="font-display text-[26px] leading-none tracking-tight">
              The Tick Sheet
            </span>
            <span className="label hidden lg:block">business intuition first</span>
          </button>

          <div className="ml-auto flex items-center gap-0.5 overflow-x-auto">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={`flex-none cursor-pointer rounded-lg px-2.5 py-1.5 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors ${
                  view === item.id
                    ? 'bg-ember-500/10 text-ember-700'
                    : 'text-bone-500 hover:text-bone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {view === 'home' && <Home store={store} go={go} />}
      {view === 'lesson' && <Lesson store={store} />}
      {view === 'concepts' && <Concepts store={store} initialModule={conceptModule} />}
      {view === 'cards' && <Cards />}
      {view === 'gym' && <Gym store={store} />}
      {view === 'math' && <MathDrill store={store} />}
      {view === 'mock' && <Mock store={store} />}
      {view === 'tests' && <Tests store={store} onStart={startTest} />}
      {view === 'progress' && <Progress store={store} />}
      {view === 'running' && running && (
        <TestRunner key={runKey} test={running} store={store} onExit={() => go('tests')} />
      )}

      <footer className="border-line mt-20 border-t">
        <div className="text-bone-500 mx-auto max-w-6xl px-6 py-8 font-mono text-[11px] leading-[1.7]">
          Built from a mentor's note and a conversation with a club president on what these interviews
          actually test. Progress is stored in this browser only.
        </div>
      </footer>
    </div>
  )
}
