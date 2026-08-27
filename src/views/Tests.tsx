import { Btn } from '../components/ui'
import { TESTS } from '../content/tests'
import { SHELLS, scoredCount } from '../content/tests/types'
import { stats, type Store } from '../lib/store'

const DAY = 86_400_000

export function Tests({ store, onStart }: { store: Store; onStart: (id: string) => void }) {
  const s = stats(store.data)
  const tookOneToday = s.last ? Date.now() - s.last.at < DAY : false
  const formsRemain = s.bestByTest.size < TESTS.length

  return (
    <>
      <div className="mono eyebrow">08 — tests</div>
      <h1 className="serif h1">Five sittings, one blueprint.</h1>
      <p className="lede">
        Each test fills the same twenty slots in the same order at the same difficulty. Only the
        companies and the numbers change. That is deliberate: it means the difference between your
        first score and your fifth is learning, not a lucky draw.
      </p>
      <p className="note">
        Twenty questions, about thirty minutes. Eight on definitions, eight applied, and four you
        answer in your own words and score yourself against a model. Take them days apart, not in one
        afternoon.
      </p>

      {tookOneToday && formsRemain && (
        <div className="card band">
          <p style={{ margin: 0 }}>
            You took one today. Come back to the next form in a couple of days — spacing the sittings
            is most of where the benefit comes from, and doing two back to back mostly measures your
            short-term memory.
          </p>
        </div>
      )}

      <div className="rows bordered">
        {TESTS.map((t) => {
          const best = s.bestByTest.get(t.id)
          const taken = best !== undefined
          return (
            <div key={t.id} className="test-row">
              <div className="mono test-n">{String(t.n).padStart(2, '0')}</div>
              <div>
                <div className="serif test-t">{t.title}</div>
                <div className="test-b">{t.blurb}</div>
              </div>
              <div>
                <div className="mono test-score">{taken ? `best ${best} / ${scoredCount(t)}` : 'not taken'}</div>
                <Btn tone={taken ? 'quiet' : undefined} onClick={() => onStart(t.id)}>
                  {taken ? 'Retake' : 'Start'}
                </Btn>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mono h3">what every form covers</div>
      <p className="note">
        The twenty slots, in order. If one of these reads like a foreign language, that is the thing
        to go back and read rather than the thing to guess at.
      </p>
      <div className="two">
        {SHELLS.map((shell) => (
          <div key={shell.code} className="beat">
            <div className="mono beat-n">{shell.code}</div>
            <div className="beat-p">{shell.skill}</div>
          </div>
        ))}
      </div>
    </>
  )
}
