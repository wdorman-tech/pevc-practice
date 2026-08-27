import { Button } from '../components/bits'
import { SHELLS } from '../content/tests/types'
import { TESTS } from '../content/tests'
import type { Store } from '../lib/store'

const DAY = 86_400_000

export function Tests({ store, onStart }: { store: Store; onStart: (id: string) => void }) {
  const attempts = store.data.attempts
  const last = attempts.at(-1)
  const sinceLast = last ? Math.floor((Date.now() - last.at) / DAY) : null

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="label">practice tests</div>
      <h1 className="font-display mt-1 text-4xl leading-[1.05] tracking-tight">
        Five sittings, one blueprint.
      </h1>
      <p className="text-bone-300 mt-4 max-w-2xl text-[17px] leading-[1.7]">
        Each test fills the same twenty slots in the same order at the same difficulty. Only the
        companies and the numbers change. That is deliberate: it means the difference between your
        first score and your fifth is learning, not a lucky draw.
      </p>
      <p className="text-bone-300 mt-3 max-w-2xl text-[16px] leading-[1.7]">
        Twenty questions, about thirty minutes. Eight on definitions, eight applied, and four you
        answer in your own words and score yourself against a model. Take them days apart, not in one
        afternoon.
      </p>

      {sinceLast !== null && sinceLast < 1 && attempts.length < TESTS.length && (
        <div className="border-line bg-well mt-6 rounded-xl border p-4">
          <p className="text-bone-300 text-[14.5px] leading-[1.6]">
            You took one today. Come back to the next form in a couple of days — spacing the sittings
            is most of where the benefit comes from, and doing two back to back mostly measures your
            short-term memory.
          </p>
        </div>
      )}

      <div className="mt-8 space-y-3">
        {TESTS.map((t) => {
          const mine = attempts.filter((a) => a.testId === t.id)
          const best = mine.length ? Math.max(...mine.map((a) => a.scored)) : null
          return (
            <div key={t.id} className="panel flex flex-wrap items-center gap-5 p-6">
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-bone-500 font-mono text-[11px]">
                    {String(t.n).padStart(2, '0')}
                  </span>
                  <span className="font-display text-[24px] leading-none tracking-tight">
                    {t.title}
                  </span>
                </div>
                <p className="text-bone-300 mt-2 text-[14.5px] leading-[1.6]">{t.blurb}</p>
              </div>
              <div className="text-right">
                <div className="text-bone-500 font-mono text-[11px]">
                  {best === null ? 'not taken' : `best ${best} / 16`}
                </div>
                <div className="mt-2">
                  <Button variant={mine.length ? 'ghost' : 'solid'} onClick={() => onStart(t.id)}>
                    {mine.length ? 'Retake' : 'Start'}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <section className="border-line mt-12 border-t pt-8">
        <div className="label">what every form covers</div>
        <p className="text-bone-300 mt-2 max-w-2xl text-[14.5px] leading-[1.65]">
          The twenty slots, in order. If one of these reads like a foreign language, that is the thing
          to go back and read rather than the thing to guess at.
        </p>
        <div className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {SHELLS.map((s) => (
            <div key={s.code} className="flex gap-3">
              <span className="text-bone-500 font-mono text-[10px] leading-6">{s.code}</span>
              <span className="text-bone-300 text-[13.5px] leading-[1.5]">{s.skill}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
