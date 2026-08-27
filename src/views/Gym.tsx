import { useMemo, useState } from 'react'
import { Button, Chip } from '../components/bits'
import { CATS, GYM, type GymCat, type GymItem } from '../content/gym'
import type { Store } from '../lib/store'

export function Gym({ store }: { store: Store }) {
  const [cat, setCat] = useState<GymCat | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const list = useMemo(() => GYM.filter((g) => cat === 'all' || g.cat === cat), [cat])

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="label">04 — the gym</div>
      <h1 className="font-display mt-1 text-4xl leading-[1.05] tracking-tight">
        Reps on the questions that have no formula.
      </h1>
      <p className="text-bone-300 mt-4 text-[17px] leading-[1.65]">
        These are the ones candidates lose. Each gives you the structure before the answer, because
        the structure is what is being graded. Work it out loud first, then open it.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        <Chip active={cat === 'all'} onClick={() => setCat('all')}>
          all {GYM.length}
        </Chip>
        {CATS.map((c) => (
          <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {list.map((g) => (
          <GymCard
            key={g.id}
            item={g}
            open={openId === g.id}
            onToggle={() => setOpenId(openId === g.id ? null : g.id)}
            store={store}
          />
        ))}
      </div>
    </div>
  )
}

function GymCard({
  item,
  open,
  onToggle,
  store,
}: {
  item: GymItem
  open: boolean
  onToggle: () => void
  store: Store
}) {
  const [hits, setHits] = useState<boolean[]>(() => item.skeleton.map(() => false))
  const worked = store.data.gym[item.id]

  return (
    <div className="panel overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start gap-3.5 px-5 py-4 text-left"
      >
        <span
          className={`mt-1 font-mono text-[11px] ${worked !== undefined ? 'text-moss-400' : 'text-bone-500'}`}
        >
          {worked !== undefined ? `${worked}/${item.skeleton.length}` : '—'}
        </span>
        <span className="text-bone-100 flex-1 text-[16px] leading-[1.5]">{item.q}</span>
        <span className="text-bone-500 mt-1 font-mono text-[11px]">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="border-line rise space-y-5 border-t px-5 py-5">
          <p className="text-bone-500 text-[14px] leading-[1.6]">
            <span className="text-ember-700 font-mono text-[10px] tracking-[0.14em] uppercase">
              tests
            </span>{' '}
            {item.tests}
          </p>

          <div>
            <div className="label">ask first</div>
            <ul className="mt-2 space-y-1.5">
              {item.clarify.map((c) => (
                <li key={c} className="text-bone-300 pl-4 -indent-4 text-[14.5px] leading-[1.55]">
                  · {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label">the structure — tick what you actually said</div>
            <div className="mt-2 space-y-2">
              {item.skeleton.map((s, n) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setHits((h) => h.map((x, k) => (k === n ? !x : x)))}
                  className={`flex w-full cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[14.5px] leading-[1.5] transition-colors ${
                    hits[n]
                      ? 'border-moss-400/50 bg-moss-400/8 text-bone-100'
                      : 'border-line text-bone-300 hover:border-line-strong'
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-4 w-4 flex-none place-items-center rounded border font-mono text-[10px] ${
                      hits[n] ? 'border-moss-400 bg-moss-400 text-white' : 'border-line-strong'
                    }`}
                  >
                    {hits[n] ? '✓' : ''}
                  </span>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="border-ember-500/30 bg-ember-500/4 rounded-xl border p-4">
            <div className="label text-ember-700">a model answer</div>
            <p className="text-bone-100 mt-2 text-[15px] leading-[1.7]">{item.model}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="label">they will push with</div>
              <ul className="mt-2 space-y-1.5">
                {item.follows.map((f) => (
                  <li key={f} className="text-bone-300 pl-4 -indent-4 text-[14px] leading-[1.55]">
                    · {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="label">how people lose it</div>
              <ul className="mt-2 space-y-1.5">
                {item.flags.map((f) => (
                  <li key={f} className="text-bone-300 pl-4 -indent-4 text-[14px] leading-[1.55]">
                    · {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => store.scoreGym(item.id, hits.filter(Boolean).length)}>
              Log {hits.filter(Boolean).length} of {item.skeleton.length}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
