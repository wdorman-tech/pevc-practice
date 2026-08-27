import { Button } from '../components/bits'
import { BEATS, PRINCIPLES, READING } from '../content/brief'
import { CONCEPTS, type ModuleId } from '../content/concepts'
import { GYM } from '../content/gym'
import { STEPS } from '../content/lesson'
import { TESTS } from '../content/tests'
import type { Store } from '../lib/store'

export type Go = (v: string, mod?: ModuleId) => void

export function Home({ store, go }: { store: Store; go: Go }) {
  const d = store.data
  const attempts = d.attempts.length
  const lastScore = d.attempts.at(-1)

  const path = [
    {
      n: '01',
      label: 'The Big Three',
      blurb:
        'One coffee cart, four steps, and the three statements it produces. Start here even if you think you know it — everything downstream assumes it.',
      done: `${d.lesson.length} of ${STEPS.length} steps`,
      cta: 'Open the lesson',
      to: 'lesson',
    },
    {
      n: '02',
      label: 'Concepts and cards',
      blurb:
        'Seventy-two terms, each with the definition and the one line about it a first-year usually cannot say. Read them once, then drill them as cards.',
      done: `${d.ticked.length} of ${CONCEPTS.length} ticked`,
      cta: 'Open concepts',
      to: 'concepts',
    },
    {
      n: '03',
      label: 'The gym and the mock',
      blurb:
        'The questions with no formula behind them. Structure first, answer second, because the structure is what is being graded.',
      done: `${Object.keys(d.gym).length} of ${GYM.length} worked`,
      cta: 'Open the gym',
      to: 'gym',
    },
    {
      n: '04',
      label: 'Five practice tests',
      blurb:
        'Five sittings built to the same blueprint, so the score difference between your first and your fifth is learning rather than luck. Take them days apart.',
      done: `${attempts} of ${TESTS.length} taken`,
      cta: 'Open the tests',
      to: 'tests',
    },
  ]

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="label">01 — the brief</div>
      <h1 className="font-display mt-1 max-w-3xl text-5xl leading-[1.03] tracking-tight">
        They are grading how you think, not what you have memorised.
      </h1>
      <p className="text-bone-300 mt-5 max-w-2xl text-[17px] leading-[1.7]">
        Built from two conversations: a member of WITG Tac Opps and co-chair of the JWS Professional
        Committee, who came into Wharton without a finance background, and the president of the club
        running the interviews. Both said a version of the same thing.
      </p>

      <blockquote className="border-ember-500/40 mt-7 max-w-2xl border-l-2 pl-5">
        <p className="font-display text-bone-100 text-[21px] leading-[1.5]">
          “The main thing isn’t crazy technical knowledge but rather an interesting mind that can bring
          fresh ideas to the scene. And at the end of the day the people on your team are not just your
          club mates, they’re your friends — so we want someone we can vibe with in addition to being
          locked in with.”
        </p>
        <cite className="text-bone-500 mt-2.5 block font-mono text-[11px] not-italic">
          — the club president
        </cite>
      </blockquote>

      <p className="text-bone-300 mt-6 max-w-2xl text-[16px] leading-[1.7]">
        Read that as a scope limit, not as permission to skip the work. You need enough command of the
        basics that you are not spending the conversation retrieving definitions — which is exactly
        what this is for. What it buys you is the room to have an actual opinion.
      </p>

      <section className="mt-14">
        <div className="label">the path</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {path.map((p) => (
            <div key={p.n} className="panel flex flex-col p-6">
              <div className="flex items-baseline gap-3">
                <span className="text-bone-500 font-mono text-[11px]">{p.n}</span>
                <span className="font-display text-[24px] leading-none tracking-tight">{p.label}</span>
              </div>
              <p className="text-bone-300 mt-3 flex-1 text-[14.5px] leading-[1.65]">{p.blurb}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-bone-500 font-mono text-[11px]">{p.done}</span>
                <Button onClick={() => go(p.to)}>{p.cta}</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <div className="label">what they are actually testing</div>
          <div className="mt-4 space-y-5">
            {PRINCIPLES.map((p, n) => (
              <div key={p.h} className="flex gap-4">
                <span className="text-bone-500 font-mono text-[11px] leading-6">
                  {String(n + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="text-bone-100 text-[15.5px] font-semibold">{p.h}</div>
                  <p className="text-bone-300 mt-1 text-[14.5px] leading-[1.65]">{p.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="label">the method</div>
          <h2 className="font-display mt-1 text-2xl tracking-tight">Four beats, every question</h2>
          <p className="text-bone-300 mt-3 text-[14.5px] leading-[1.65]">
            Almost every candidate loses points in the same place: they start answering before they
            have said what they are going to do. Run these four out loud and the interviewer can follow
            your reasoning even when you land somewhere they disagree with.
          </p>
          <div className="mt-4 space-y-3">
            {BEATS.map((b, n) => (
              <div key={b.n} className="flex gap-3.5">
                <span className="text-bone-500 font-mono text-[11px] leading-6">{n + 1}</span>
                <p className="text-bone-300 text-[14.5px] leading-[1.6]">
                  <span className="text-bone-100 font-semibold">{b.n}. </span>
                  {b.p}
                </p>
              </div>
            ))}
          </div>

          <div className="border-ember-500/35 bg-ember-500/4 mt-6 rounded-xl border p-5">
            <div className="label text-ember-700">say this when you are lost</div>
            <p className="font-display text-bone-100 mt-2 text-[19px] leading-[1.45]">
              “I have not come across that one — could you tell me what it means and I will reason
              through it.”
            </p>
          </div>

          <div className="mt-8">
            <div className="label">the summer list</div>
            <p className="text-bone-300 mt-2 text-[14.5px] leading-[1.65]">
              The exact list the mentor gave, wired to the modules. One layer deeper than everyone else
              is the whole edge.
            </p>
            <div className="panel mt-3 overflow-hidden">
              {READING.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => go('concepts', r.to as ModuleId)}
                  className="border-line hover:bg-well flex w-full cursor-pointer items-center justify-between gap-3 border-b px-4 py-2.5 text-left transition-colors last:border-0"
                >
                  <span className="text-bone-300 text-[14px]">{r.t}</span>
                  <span className="text-bone-500 font-mono text-[10px] tracking-[0.14em] uppercase">
                    open
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {attempts > 0 && lastScore && (
        <section className="border-line mt-14 border-t pt-8">
          <div className="label">where you are</div>
          <p className="text-bone-300 mt-2 max-w-2xl text-[16px] leading-[1.7]">
            Last sitting: {lastScore.scored} of {lastScore.scoredOf} on the scored half. You have{' '}
            {TESTS.length - attempts} {TESTS.length - attempts === 1 ? 'form' : 'forms'} left. Leave a
            few days between them — the gap is what makes the next one stick.
          </p>
        </section>
      )}
    </div>
  )
}
