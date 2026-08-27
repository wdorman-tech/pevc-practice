import { Bar, Button, Stat } from '../components/bits'
import { CONCEPTS, MODULES } from '../content/concepts'
import { GYM } from '../content/gym'
import { STEPS } from '../content/lesson'
import { TESTS } from '../content/tests'
import type { Store } from '../lib/store'

export function Progress({ store }: { store: Store }) {
  const d = store.data
  const attempts = d.attempts
  const gymScores = Object.values(d.gym)
  const mathTotal = d.math.right + d.math.wrong

  const byModule = MODULES.map((m) => {
    const pool = CONCEPTS.filter((c) => c.m === m.id)
    const done = pool.filter((c) => d.ticked.includes(c.id)).length
    return { ...m, done, of: pool.length }
  })

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="label">progress</div>
      <h1 className="font-display mt-1 text-4xl leading-[1.05] tracking-tight">Work done.</h1>
      <p className="text-bone-300 mt-4 max-w-2xl text-[17px] leading-[1.7]">
        Everything here lives in this browser and nowhere else. It is a record of effort, not a
        prediction — the only number on this page that means much is whether your later test scores
        beat your earlier ones.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="lesson"
          value={`${d.lesson.length}/${STEPS.length}`}
          sub="steps of The Big Three"
        />
        <Stat label="concepts" value={`${d.ticked.length}/${CONCEPTS.length}`} sub="ticked off" />
        <Stat label="gym" value={`${Object.keys(d.gym).length}/${GYM.length}`} sub="questions worked" />
        <Stat
          label="tests"
          value={`${attempts.length}`}
          sub={`sittings across ${TESTS.length} forms`}
          accent
        />
      </div>

      <section className="mt-12">
        <div className="label">concepts by module</div>
        <div className="mt-4 space-y-4">
          {byModule.map((m) => (
            <div key={m.id}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-bone-300 text-[14.5px]">{m.name}</span>
                <span className="text-bone-500 font-mono text-[11px]">
                  {m.done}/{m.of}
                </span>
              </div>
              <Bar value={m.of ? m.done / m.of : 0} tone={m.done === m.of ? 'moss' : 'ember'} />
            </div>
          ))}
        </div>
      </section>

      {attempts.length > 0 && (
        <section className="mt-12">
          <div className="label">test history</div>
          <p className="text-bone-300 mt-2 max-w-2xl text-[14.5px] leading-[1.65]">
            The scored half is out of sixteen. The criteria column is the four written questions,
            scored against four checkpoints each, by you.
          </p>
          <div className="panel mt-4 overflow-hidden">
            {attempts
              .slice()
              .reverse()
              .map((a, n) => {
                const t = TESTS.find((x) => x.id === a.testId)
                const crit = Object.values(a.self).reduce((x, y) => x + y, 0)
                const critOf = a.selfOf || Object.keys(a.self).length * 4
                return (
                  <div
                    key={`${a.at}-${n}`}
                    className="border-line grid grid-cols-[1fr_auto_auto_auto] items-baseline gap-4 border-b px-5 py-3 last:border-0"
                  >
                    <span className="text-bone-300 truncate text-[14px]">
                      {t?.title ?? a.testId}
                    </span>
                    <span className="text-bone-500 font-mono text-[11px]">
                      {new Date(a.at).toLocaleDateString()}
                    </span>
                    <span className="text-bone-500 font-mono text-[11px]">
                      {crit}/{critOf} criteria
                    </span>
                    <span className="text-bone-100 w-14 text-right font-mono text-[13px]">
                      {a.scored}/{a.scoredOf}
                    </span>
                  </div>
                )
              })}
          </div>
        </section>
      )}

      {(gymScores.length > 0 || mathTotal > 0) && (
        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          {gymScores.length > 0 && (
            <div className="panel p-5">
              <div className="label">gym</div>
              <p className="text-bone-300 mt-2 text-[14.5px] leading-[1.65]">
                {Object.keys(d.gym).length} questions worked. The number to watch is not the score, it
                is whether you are still skipping the same move — usually clarifying first, or landing
                on a position last.
              </p>
            </div>
          )}
          {mathTotal > 0 && (
            <div className="panel p-5">
              <div className="label">mental math</div>
              <p className="text-bone-300 mt-2 text-[14.5px] leading-[1.65]">
                {d.math.right} right, {d.math.wrong} wrong, {Math.round((d.math.right / mathTotal) * 100)}
                % across {mathTotal} attempts.
              </p>
            </div>
          )}
        </section>
      )}

      <section className="border-line mt-14 border-t pt-8">
        <div className="label">start over</div>
        <p className="text-bone-300 mt-2 max-w-2xl text-[14.5px] leading-[1.65]">
          Clears every tick, score and test result stored in this browser. There is no copy anywhere
          else, so this cannot be undone.
        </p>
        <div className="mt-4">
          <Button
            onClick={() => {
              if (window.confirm('Erase all progress stored in this browser? This cannot be undone.')) {
                store.reset()
              }
            }}
          >
            Erase progress
          </Button>
        </div>
      </section>
    </div>
  )
}
