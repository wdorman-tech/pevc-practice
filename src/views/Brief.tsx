import type { Go } from '../App'
import { Btn, TickBox } from '../components/ui'
import { BEATS, PRINCIPLES, READING } from '../content/brief'
import type { ModuleId } from '../content/concepts'
import { stats, type Store } from '../lib/store'

/**
 * 01 — the brief. What the interview is actually grading, the four beats to run
 * on every question, the mentor's summer list, and the tally of work done. The
 * numbers all come from stats() so they cannot drift from the header stamp.
 */
export function Brief({ store, go }: { store: Store; go: Go }) {
  const s = stats(store.data)
  const read = store.data.reading

  return (
    <>
      <div className="mono eyebrow">01 — the brief</div>
      <h1 className="serif h1">They are grading how you think, not what you have memorised.</h1>
      <p className="lede">
        Built from two conversations: a member of WITG Tac Opps and co-chair of the JWS Professional
        Committee, who came into Wharton without a finance background, and the president of the club
        running the interviews. Both said a version of the same thing.
      </p>

      <div className="card blue">
        <div className="mono eyebrow">the club president</div>
        <blockquote className="serif quote">
          “The main thing isn’t crazy technical knowledge but rather an interesting mind that can
          bring fresh ideas to the scene. And at the end of the day the people on your team are not
          just your club mates, they’re your friends — so we want someone we can vibe with in
          addition to being locked in with.”
        </blockquote>
      </div>

      <p className="note">
        Read that as a scope limit, not as permission to skip the work. You need enough command of
        the basics that you are not spending the conversation retrieving definitions — which is
        exactly what this is for. What it buys you is the room to have an actual opinion.
      </p>

      <div className="mono eyebrow">what they are actually testing</div>
      <div className="rows">
        {PRINCIPLES.map((p, i) => (
          <div key={p.h} className={i % 2 ? 'prin band' : 'prin'}>
            <div className="mono prin-n">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <div className="prin-h">{p.h}</div>
              <div className="prin-p">{p.p}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="split">
        <div>
          <div className="mono eyebrow">the method</div>
          <h2 className="serif h2">Four beats, every question</h2>
          <p className="note">
            Almost every candidate loses points in the same place: they start answering before they
            have said what they are going to do. Run these four out loud and the interviewer can
            follow your reasoning even when you land somewhere they disagree with.
          </p>
          {BEATS.map((b, i) => (
            <div key={b.n} className="beat">
              <div className="mono beat-n">{i + 1}</div>
              <div>
                <span className="beat-h">{b.n}. </span>
                <span className="beat-p">{b.p}</span>
              </div>
            </div>
          ))}

          <div className="stamp-box">
            <div className="mono eyebrow">say this when you are lost</div>
            <div className="serif quote">
              I have not come across that one — could you tell me what it means and I will reason
              through it.
            </div>
          </div>
        </div>

        <div>
          <div className="mono eyebrow">summer list</div>
          <h2 className="serif h2">Tick these off</h2>
          <p className="note">
            The exact list the mentor gave, wired to the modules. One layer deeper than everyone
            else is the whole edge.
          </p>
          <div className="rows bordered">
            {READING.map((r, i) => {
              const on = read.includes(r.id)
              return (
                <div key={r.id} className={i % 2 ? 'read band' : 'read'}>
                  <TickBox on={on} onClick={() => store.toggleRead(r.id)} label={`Mark ${r.t} as done`} />
                  <div className={on ? 'read-t done' : 'read-t'}>{r.t}</div>
                  <button
                    type="button"
                    className="mono link"
                    onClick={() => go('concepts', r.to as ModuleId)}
                  >
                    open
                  </button>
                </div>
              )
            })}
          </div>

          <div className="card progress">
            <div className="mono eyebrow">work done</div>
            <div className="pgrid">
              <div>
                <b className="mono big">{s.lesson}</b>
                <span>lesson steps done</span>
              </div>
              <div>
                <b className="mono big">{s.ticked}</b>
                <span>concepts ticked</span>
              </div>
              <div>
                <b className="mono big">{s.gym}</b>
                <span>gym questions worked</span>
              </div>
              <div>
                <b className="mono big">{s.sittings}</b>
                <span>sittings taken</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mono h3">start over</div>
      <p className="note">
        Clears every tick, score and test result stored in this browser. There is no copy anywhere
        else, so this cannot be undone.
      </p>
      <Btn
        tone="quiet"
        onClick={() => {
          if (window.confirm('Erase all progress stored in this browser? This cannot be undone.')) {
            store.reset()
          }
        }}
      >
        Erase progress
      </Btn>
    </>
  )
}
