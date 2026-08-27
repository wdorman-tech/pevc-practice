import { useCallback, useState } from 'react'
import { Btn, Chip, ChipRow } from '../components/ui'
import { CONCEPTS, MODULES, modName, type ModuleId } from '../content/concepts'
import { shuffle } from '../lib/store'

/**
 * Recall practice, not reading practice. You see the term, you say the definition
 * out loud, and only then do you turn it over. Reading the back first feels like
 * learning and is not.
 *
 * The deck order is fixed when you change module, toggle the filter or shuffle —
 * never when you mark a card, so flagging the card in front of you does not pull
 * the ground out from under the run you are in.
 */
export function Cards() {
  const [mod, setMod] = useState<ModuleId | 'all'>('all')
  const [flagOnly, setFlagOnly] = useState(false)
  const [flagged, setFlagged] = useState<string[]>([])
  const [order, setOrder] = useState<string[]>(() => shuffle(CONCEPTS).map((c) => c.id))
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const rebuild = useCallback(
    (nextMod: ModuleId | 'all', nextFlag: boolean, flags: string[]) => {
      const pool = CONCEPTS.filter(
        (c) => (nextMod === 'all' || c.m === nextMod) && (!nextFlag || flags.includes(c.id)),
      )
      setOrder(shuffle(pool).map((c) => c.id))
      setIdx(0)
      setFlipped(false)
    },
    [],
  )

  const pickMod = (v: ModuleId | 'all') => {
    setMod(v)
    rebuild(v, flagOnly, flagged)
  }

  const toggleFlagOnly = () => {
    const next = !flagOnly
    setFlagOnly(next)
    rebuild(mod, next, flagged)
  }

  /** Both answers move you on; the only difference is whether the card comes back. */
  const mark = (review: boolean) => {
    const id = order[idx]
    setFlagged((f) => (review ? (f.includes(id) ? f : [...f, id]) : f.filter((x) => x !== id)))
    setIdx((n) => (n + 1 < order.length ? n + 1 : 0))
    setFlipped(false)
  }

  const card = order.length ? CONCEPTS.find((c) => c.id === order[idx]) : undefined

  return (
    <>
      <div className="mono eyebrow">04 — cards</div>
      <h1 className="serif h1">Say it out loud before you flip it.</h1>
      <p className="lede">
        Recognising a definition is not the same as producing one under pressure. Answer aloud, in a
        full sentence, then check yourself.
      </p>

      <div className="toolbar">
        <ChipRow
          options={MODULES.map((m) => ({ id: m.id, label: m.name, code: m.code }))}
          value={mod}
          onPick={pickMod}
        />
        <div className="tools">
          <Chip on={flagOnly} onClick={toggleFlagOnly}>
            Flagged only
          </Chip>
          <Btn tone="quiet" onClick={() => rebuild(mod, flagOnly, flagged)}>
            Shuffle
          </Btn>
        </div>
      </div>

      {!card ? (
        <div className="empty">
          {flagOnly
            ? 'Nothing flagged for review in this module yet. Work a few cards first.'
            : 'No cards in this module.'}
        </div>
      ) : (
        <>
          <div className="counter mono">
            {idx + 1} / {order.length}
          </div>
          <div className={flipped ? 'flash open' : 'flash'}>
            {/* The source wraps the front in a plain block box; index.css has no rule
                for it, so an unclassed div keeps the Flip button from stretching as
                a flex child of .flash. */}
            <div>
              <div className="mono flash-mod">{modName(card.m)}</div>
              <div className="serif flash-term">{card.term}</div>
              {!flipped && <Btn onClick={() => setFlipped(true)}>Flip</Btn>}
            </div>
            {flipped && (
              <div className="flash-back">
                <div className="con-def">{card.def}</div>
                <div className="con-edge">
                  <span className="mono edge-tag">edge</span>
                  {card.edge}
                </div>
                <div className="flash-actions">
                  <Btn tone="red" onClick={() => mark(false)}>
                    I said that
                  </Btn>
                  <Btn tone="quiet" onClick={() => mark(true)}>
                    Flag for review
                  </Btn>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
