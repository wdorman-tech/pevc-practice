import { useMemo, useState } from 'react'
import { Chip } from '../components/bits'
import { CONCEPTS, MODULES, type ModuleId } from '../content/concepts'
import type { Store } from '../lib/store'

export function Concepts({ store, initialModule }: { store: Store; initialModule?: ModuleId }) {
  const [mod, setMod] = useState<ModuleId | 'all'>(initialModule ?? 'all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return CONCEPTS.filter(
      (c) =>
        (mod === 'all' || c.m === mod) &&
        (!needle || c.term.toLowerCase().includes(needle) || c.def.toLowerCase().includes(needle)),
    )
  }, [mod, q])

  const code = (m: ModuleId) => MODULES.find((x) => x.id === m)?.code ?? ''

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="label">02 — concepts</div>
      <h1 className="font-display mt-1 text-4xl leading-[1.05] tracking-tight">
        The definition gets you level. The edge gets you remembered.
      </h1>
      <p className="text-bone-300 mt-4 text-[17px] leading-[1.65]">
        Every entry has two lines. The first is what the term means. The second is the thing a
        first-year usually cannot say, which is the line that actually earns you the second round.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-2">
        <Chip active={mod === 'all'} onClick={() => setMod('all')}>
          all {CONCEPTS.length}
        </Chip>
        {MODULES.map((m) => (
          <Chip key={m.id} active={mod === m.id} onClick={() => setMod(m.id)}>
            {m.name}
          </Chip>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search terms"
          aria-label="Search concepts"
          className="border-line focus:border-ember-500/60 bg-ash-900 text-bone-100 ml-auto w-44 rounded-full border px-4 py-1.5 font-mono text-[11px] outline-none"
        />
      </div>

      <div className="panel mt-5 overflow-hidden">
        {list.length === 0 && (
          <div className="text-bone-500 px-5 py-10 text-center text-[14px]">
            Nothing matches that. Clear the search or pick another module.
          </div>
        )}
        {list.map((c) => {
          const on = store.data.ticked.includes(c.id)
          return (
            <div
              key={c.id}
              className="border-line grid grid-cols-[28px_1fr] gap-3.5 border-b px-5 py-4 last:border-0"
            >
              <button
                type="button"
                onClick={() => store.toggleTick(c.id)}
                aria-pressed={on}
                aria-label={`Tick ${c.term}`}
                className={`mt-1 grid h-5 w-5 cursor-pointer place-items-center rounded border font-mono text-[11px] transition-colors ${
                  on
                    ? 'border-moss-400 bg-moss-400 text-white'
                    : 'border-line-strong text-transparent hover:border-ember-500/60'
                }`}
              >
                ✓
              </button>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2.5">
                  <span
                    className={`text-[16px] font-semibold ${on ? 'text-bone-500 line-through' : 'text-bone-100'}`}
                  >
                    {c.term}
                  </span>
                  <span className="text-bone-500 font-mono text-[10px] tracking-[0.14em]">
                    {code(c.m)}
                  </span>
                </div>
                <p className="text-bone-300 mt-1.5 text-[14.5px] leading-[1.65]">{c.def}</p>
                <p className="text-bone-300 border-ember-500/35 mt-2.5 border-l-2 pl-3 text-[14.5px] leading-[1.65]">
                  <span className="text-ember-700 mr-1.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                    edge
                  </span>
                  {c.edge}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
