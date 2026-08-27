import { useMemo, useState } from 'react'
import {
  Btn,
  Checklist,
  Clarify,
  Gate,
  ModelAnswer,
  QuestionHead,
  Reveal,
  Skeleton,
  ChipRow,
} from '../components/ui'
import { CATS, GYM, catLabel, type GymCat, type GymItem } from '../content/gym'
import type { Store } from '../lib/store'

export function Gym({ store }: { store: Store }) {
  const [cat, setCat] = useState<GymCat | 'all'>('all')
  const list = useMemo(() => GYM.filter((g) => cat === 'all' || g.cat === cat), [cat])

  return (
    <>
      <div className="mono eyebrow">05 — the gym</div>
      <h1 className="serif h1">Questions with no formula behind them.</h1>
      <p className="lede">
        These are the ones that decide the interview. Read the question, close your eyes, and answer
        it out loud in full sentences before you open anything below it. Reading a model answer you
        have not attempted teaches you almost nothing.
      </p>

      <div className="toolbar">
        <ChipRow options={CATS} value={cat} onPick={setCat} allLabel={`All ${GYM.length}`} />
      </div>

      {list.map((item) => (
        <GymCard key={item.id} item={item} store={store} />
      ))}
    </>
  )
}

/**
 * One card per question, in its own component so the checklist state is per
 * item and resets when the filter swaps the list underneath it.
 */
function GymCard({ item, store }: { item: GymItem; store: Store }) {
  const [hits, setHits] = useState<boolean[]>(() => item.skeleton.map(() => false))
  const scored = hits.filter(Boolean).length

  return (
    <div className="card q-card">
      <QuestionHead
        cat={catLabel(item.cat)}
        ticked={store.data.gym[item.id] !== undefined}
        question={item.q}
        tests={item.tests}
      />

      <Clarify items={item.clarify} />

      <Reveal show="Show the skeleton">
        <Skeleton items={item.skeleton} />
      </Reveal>

      <div className="q-sec">
        <Gate
          prompt="Answer it out loud first. Sixty seconds, no notes, all four beats."
          action="Done — show me"
        >
          <ModelAnswer model={item.model} follows={item.follows} flags={item.flags} />
          <Checklist
            title="tick every move you actually made"
            items={item.skeleton}
            hits={hits}
            onToggle={(n) => setHits((h) => h.map((x, k) => (k === n ? !x : x)))}
          />
          <Btn tone="red" onClick={() => store.scoreGym(item.id, scored)}>
            Log {scored} of {item.skeleton.length}
          </Btn>
        </Gate>
      </div>
    </div>
  )
}
