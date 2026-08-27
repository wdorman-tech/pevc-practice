import { useCallback, useMemo, useState } from 'react'
import { Button, Chip } from '../components/bits'
import { CONCEPTS, MODULES, type Concept, type ModuleId } from '../content/concepts'

/**
 * Recall practice, not reading practice. You see the term, you say the definition
 * out loud, and only then do you turn it over. Reading the back first feels like
 * learning and is not.
 */
export function Cards() {
  const [mod, setMod] = useState<ModuleId | 'all'>('all')
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [missed, setMissed] = useState<string[]>([])
  const [seen, setSeen] = useState(0)

  const deck = useMemo(() => {
    const pool = CONCEPTS.filter((c) => mod === 'all' || c.m === mod)
    return shuffle(pool)
  }, [mod])

  const card: Concept | undefined = deck[i]

  const next = useCallback(
    (knew: boolean) => {
      if (!card) return
      if (!knew) setMissed((m) => (m.includes(card.id) ? m : [...m, card.id]))
      setSeen((s) => s + 1)
      setFlipped(false)
      setI((n) => (n + 1) % deck.length)
    },
    [card, deck.length],
  )

  const restartMissed = () => {
    setMissed([])
    setSeen(0)
    setI(0)
    setFlipped(false)
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="label">03 — cards</div>
      <h1 className="font-display mt-1 text-4xl leading-[1.05] tracking-tight">
        Say it before you turn it over.
      </h1>
      <p className="text-bone-300 mt-4 text-[17px] leading-[1.65]">
        Trying to recall the definition and failing does more for you than reading it again. Answer out
        loud, then flip, then be honest about whether you had it.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        <Chip
          active={mod === 'all'}
          onClick={() => {
            setMod('all')
            restartMissed()
          }}
        >
          all
        </Chip>
        {MODULES.map((m) => (
          <Chip
            key={m.id}
            active={mod === m.id}
            onClick={() => {
              setMod(m.id)
              restartMissed()
            }}
          >
            {m.code}
          </Chip>
        ))}
        <span className="text-bone-500 ml-auto font-mono text-[11px] leading-7">
          {seen} seen · {missed.length} to revisit
        </span>
      </div>

      {card && (
        <div className="panel mt-5 min-h-[300px] p-7">
          <div className="label">{MODULES.find((m) => m.id === card.m)?.name}</div>
          <div className="font-display mt-3 text-[32px] leading-[1.15] tracking-tight">
            {card.term}
          </div>

          {!flipped ? (
            <div className="mt-8">
              <p className="text-bone-500 text-[15px] leading-[1.6]">
                Say the definition out loud, then the one thing about it most people cannot say.
              </p>
              <div className="mt-6">
                <Button variant="solid" onClick={() => setFlipped(true)}>
                  Turn over
                </Button>
              </div>
            </div>
          ) : (
            <div className="rise mt-6">
              <p className="text-bone-100 text-[16px] leading-[1.7]">{card.def}</p>
              <p className="text-bone-300 border-ember-500/35 mt-4 border-l-2 pl-3.5 text-[15px] leading-[1.7]">
                <span className="text-ember-700 mr-1.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                  edge
                </span>
                {card.edge}
              </p>
              <div className="mt-7 flex gap-3">
                <Button onClick={() => next(false)}>Did not have it</Button>
                <Button variant="solid" onClick={() => next(true)}>
                  Had it
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
