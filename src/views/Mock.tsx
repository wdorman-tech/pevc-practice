import { useEffect, useState } from 'react'
import {
  Btn,
  Checklist,
  Gate,
  ModelAnswer,
  QuestionHead,
  Reveal,
  Skeleton,
  Tick,
} from '../components/ui'
import { GYM, catLabel, type GymCat, type GymItem } from '../content/gym'
import { shuffle, type Store } from '../lib/store'

type Scored = { cat: GymCat; got: number; of: number }

/**
 * Five questions, a clock you cannot pause, and the strong version withheld
 * until you have said yours. The gym is where you learn the structure; this is
 * where you find out whether it survives being watched.
 */
export function Mock({ store }: { store: Store }) {
  const [stage, setStage] = useState<'idle' | 'run' | 'done'>('idle')
  const [set, setSet] = useState<GymItem[]>([])
  const [idx, setIdx] = useState(0)
  const [hits, setHits] = useState<boolean[]>([])
  const [scores, setScores] = useState<Scored[]>([])
  const [elapsed, setElapsed] = useState(0)

  /* One clock, restarted for each question, running whether or not you are talking. */
  useEffect(() => {
    if (stage !== 'run') return
    setElapsed(0)
    const t = window.setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => window.clearInterval(t)
  }, [stage, idx])

  const start = () => {
    const drawn = drawSet()
    if (!drawn.length) return
    setSet(drawn)
    setIdx(0)
    setHits(drawn[0].skeleton.map(() => false))
    setScores([])
    setStage('run')
  }

  const item = set[idx]

  const advance = () => {
    if (!item) return
    const got = hits.filter(Boolean).length
    setScores([...scores, { cat: item.cat, got, of: item.skeleton.length }])
    store.scoreGym(item.id, got)
    if (idx + 1 < set.length) {
      const next = set[idx + 1]
      setHits(next.skeleton.map(() => false))
      setIdx(idx + 1)
      return
    }
    setStage('done')
  }

  if (stage === 'run' && item) {
    return (
      <>
        <div className="mono eyebrow">07 — mock in progress</div>

        <div className="mock-bar">
          <span className="mono">
            question {idx + 1} of {set.length} · {catLabel(item.cat)}
          </span>
          <span className="mono clock">{mmss(elapsed)}</span>
        </div>

        <div className="card q-card">
          <QuestionHead cat={catLabel(item.cat)} question={item.q} big />

          <Gate
            key={item.id}
            prompt="Answer it now, aloud, all the way to a position. Then check yourself."
            action="I have answered — show the strong version"
          >
            <ModelAnswer model={item.model} follows={item.follows} flags={item.flags} />

            <Reveal show="Show the skeleton it follows">
              <Skeleton items={item.skeleton} />
            </Reveal>

            <Checklist
              title="tick every move you actually made"
              items={item.skeleton}
              hits={hits}
              onToggle={(n) => setHits((h) => h.map((x, k) => (k === n ? !x : x)))}
            />

            <Btn tone="red" onClick={advance}>
              {idx + 1 < set.length ? 'Next question' : 'Finish'}
            </Btn>
          </Gate>
        </div>
      </>
    )
  }

  if (stage === 'done') {
    const got = scores.reduce((a, s) => a + s.got, 0)
    const of = scores.reduce((a, s) => a + s.of, 0)
    const rate = of ? got / of : 0
    const worstLabel = weakest(scores)
    const advice =
      rate >= 0.8
        ? 'You are landing positions, not just listing considerations. Rotate in questions you have not seen and keep the clock on.'
        : rate >= 0.6
          ? 'The reasoning is there and the structure is the gap. Say your frame out loud before you start reasoning — that one habit moves most threes to fours.'
          : 'Work the skeletons first. Read the structure, close it, and rebuild it aloud from memory before you attempt the question cold.'

    return (
      <>
        <div className="mono eyebrow">07 — signed off</div>
        <h1 className="serif h1">Round complete.</h1>

        <div className="card">
          <div className="signoff-grid">
            <div>
              <div className="mono eyebrow">moves made</div>
              <div className="serif big-score">
                {got} <span className="mono">/ {of}</span>
              </div>
            </div>
            <div>
              <div className="mono eyebrow">weakest area</div>
              <div className="serif worst">{worstLabel}</div>
            </div>
            <div className="signoff-stamp">
              <div className="mono">reviewed</div>
              <Tick size={26} />
              <div className="mono">{new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <p className="note">
            {advice}
            {worstLabel
              ? ` Your weakest set this round was ${worstLabel.toLowerCase()} — start there.`
              : ''}
          </p>

          <Btn tone="red" onClick={start}>
            Run another round
          </Btn>
          <Btn tone="quiet" onClick={() => setStage('idle')}>
            Back
          </Btn>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mono eyebrow">07 — mock</div>
      <h1 className="serif h1">Five questions. No pausing. Speak every answer aloud.</h1>
      <p className="lede">
        One question about you, two on business intuition, one technical, one on markets — the shape
        of a real first round. The clock runs while you talk, and you score yourself honestly at the
        end of each one. Honest threes teach you more than generous fives.
      </p>

      <div className="card">
        <div className="mono eyebrow">the rules</div>
        <ul className="list">
          <li>Out loud, standing up if you can. Silent reading does not transfer to a room.</li>
          <li>Aim for ninety seconds to two minutes per answer.</li>
          <li>Clarify, frame, reason, land. If you skip the frame, that is a two at best.</li>
          <li>Score after you hear the strong version, not before.</li>
        </ul>
        <Btn tone="red" onClick={start}>
          Begin the mock
        </Btn>
      </div>
    </>
  )
}

function mmss(s: number): string {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/** Lowest hit rate across the categories drawn. Ties go to the earliest category asked. */
function weakest(scores: Scored[]): string {
  const by = new Map<GymCat, { got: number; of: number }>()
  for (const s of scores) {
    const cur = by.get(s.cat) ?? { got: 0, of: 0 }
    by.set(s.cat, { got: cur.got + s.got, of: cur.of + s.of })
  }
  let worst: { cat: GymCat; rate: number } | null = null
  for (const [cat, t] of by) {
    const rate = t.of ? t.got / t.of : 0
    if (!worst || rate < worst.rate) worst = { cat, rate }
  }
  return worst ? catLabel(worst.cat) : ''
}

/** The shape of a real first round: you, two on intuition, one technical, one on markets. */
function drawSet(): GymItem[] {
  const draw = (cat: GymCat, n: number) => shuffle(GYM.filter((g) => g.cat === cat)).slice(0, n)
  return [
    ...draw('story', 1),
    ...draw('intuition', 2),
    ...draw('technical', 1),
    ...draw('markets', 1),
  ]
}
