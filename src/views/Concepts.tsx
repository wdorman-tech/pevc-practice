import { useEffect, useMemo, useState } from 'react'
import { ChipRow, Search, TickBox } from '../components/ui'
import { CONCEPTS, MODULES, modCode, type ModuleId } from '../content/concepts'
import type { Store } from '../lib/store'

/**
 * The glossary. Every entry carries a definition and an edge, because the
 * definition is what levels you with the other candidates and the edge is the
 * only half anyone remembers.
 */
export function Concepts({ store, initialModule }: { store: Store; initialModule?: ModuleId }) {
  const [mod, setMod] = useState<ModuleId | 'all'>(initialModule ?? 'all')
  const [q, setQ] = useState('')

  // The brief links straight to a module, and this view stays mounted, so a
  // fresh initialModule has to move the chip row.
  useEffect(() => {
    if (initialModule) setMod(initialModule)
  }, [initialModule])

  const options = useMemo(
    () => MODULES.map((m) => ({ id: m.id, label: m.name, code: m.code })),
    [],
  )

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return CONCEPTS.filter(
      (c) =>
        (mod === 'all' || c.m === mod) &&
        (!needle || c.term.toLowerCase().includes(needle) || c.def.toLowerCase().includes(needle)),
    )
  }, [mod, q])

  return (
    <>
      <div className="mono eyebrow">03 — concepts</div>
      <h1 className="serif h1">The definition gets you level. The edge gets you remembered.</h1>
      <p className="lede">
        Every entry has two lines. The first is what the term means. The second is the thing a
        first-year usually cannot say, which is the line that actually earns you the second round.
      </p>

      <div className="toolbar">
        <ChipRow options={options} value={mod} onPick={setMod} />
        <Search value={q} onChange={setQ} placeholder="search terms" />
      </div>

      {list.length === 0 ? (
        <div className="empty">Nothing matches that. Clear the search or pick another module.</div>
      ) : (
        <div className="rows bordered">
          {list.map((c, i) => {
            const on = store.data.ticked.includes(c.id)
            return (
              <div key={c.id} className={i % 2 ? 'con band' : 'con'}>
                <TickBox on={on} onClick={() => store.toggleTick(c.id)} label={`Tick ${c.term}`} />
                <div className="con-body">
                  <div className="con-head">
                    <span className={on ? 'con-term done' : 'con-term'}>{c.term}</span>
                    <span className="mono con-mod">{modCode(c.m)}</span>
                  </div>
                  <div className="con-def">{c.def}</div>
                  <div className="con-edge">
                    <span className="mono edge-tag">edge</span>
                    {c.edge}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
