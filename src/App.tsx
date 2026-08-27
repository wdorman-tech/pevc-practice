import { useCallback, useState } from 'react'
import { CONCEPTS, type ModuleId } from './content/concepts'
import { GYM } from './content/gym'
import { TESTS } from './content/tests'
import { stats, useStore } from './lib/store'
import { Brief } from './views/Brief'
import { Cards } from './views/Cards'
import { Concepts } from './views/Concepts'
import { Gym } from './views/Gym'
import { Lesson } from './views/Lesson'
import { MathDrill } from './views/MathDrill'
import { Mock } from './views/Mock'
import { TestRunner } from './views/TestRunner'
import { Tests } from './views/Tests'

const NAV = [
  { id: 'brief', code: '01', label: 'Brief' },
  { id: 'basics', code: '02', label: 'Basics' },
  { id: 'concepts', code: '03', label: 'Concepts' },
  { id: 'cards', code: '04', label: 'Cards' },
  { id: 'gym', code: '05', label: 'The gym' },
  { id: 'math', code: '06', label: 'Math' },
  { id: 'mock', code: '07', label: 'Mock' },
  { id: 'tests', code: '08', label: 'Tests' },
] as const

export type View = (typeof NAV)[number]['id']

/** Every view navigates the same way, and only the brief passes a module. */
export type Go = (v: View, mod?: ModuleId) => void

const TICKABLE = CONCEPTS.length + GYM.length

export default function App() {
  const store = useStore()
  const [view, setView] = useState<View>('brief')
  const [mod, setMod] = useState<ModuleId | undefined>()
  const [running, setRunning] = useState<string | null>(null)
  const [runKey, setRunKey] = useState(0)

  const go = useCallback<Go>((v, m) => {
    setMod(m)
    setRunning(null)
    setView(v)
    window.scrollTo({ top: 0 })
  }, [])

  const startTest = useCallback((id: string) => {
    setRunning(id)
    setRunKey((k) => k + 1)
    window.scrollTo({ top: 0 })
  }, [])

  const s = stats(store.data)
  const test = TESTS.find((t) => t.id === running)

  return (
    <div className="sheet">
      <header className="head">
        <div>
          <div className="mono eyebrow">prepared for — Wharton first-round club interviews</div>
          <button type="button" className="serif brand" onClick={() => go('brief')}>
            The Tick Sheet
          </button>
          <div className="mono sub">business intuition before finance trivia</div>
        </div>
        <div className="stamp">
          <div className="mono stamp-l">ticked</div>
          <div className="mono stamp-n">
            {s.ticked + s.gym} <span>/ {TICKABLE}</span>
          </div>
        </div>
      </header>

      <div className="shell">
        <nav className="rail" aria-label="Sections">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={view === item.id ? 'nav on' : 'nav'}
              onClick={() => go(item.id)}
            >
              <span className="code mono">{item.code}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <main className="main">
          {view === 'brief' && <Brief store={store} go={go} />}
          {view === 'basics' && <Lesson store={store} />}
          {view === 'concepts' && <Concepts store={store} initialModule={mod} />}
          {view === 'cards' && <Cards />}
          {view === 'gym' && <Gym store={store} />}
          {view === 'math' && <MathDrill store={store} />}
          {view === 'mock' && <Mock store={store} />}
          {view === 'tests' &&
            (test ? (
              <TestRunner
                key={runKey}
                test={test}
                store={store}
                onExit={() => {
                  setRunning(null)
                  window.scrollTo({ top: 0 })
                }}
              />
            ) : (
              <Tests store={store} onStart={startTest} />
            ))}
        </main>
      </div>

      <footer className="foot mono">
        Built from a mentor's note and a conversation with a club president on what these interviews
        actually test. Progress is stored on this device only.
      </footer>
    </div>
  )
}
