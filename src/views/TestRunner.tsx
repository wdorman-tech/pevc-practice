import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../components/bits'
import { SHELL_BY_CODE, type Item, type McItem, type NumItem, type OpenItem, type PracticeTest } from '../content/tests/types'
import { seededShuffle, type Store } from '../lib/store'

type Confidence = 'low' | 'med' | 'high'

type Result = {
  shell: string
  correct: boolean
  confidence: Confidence | null
}

const PART_LABEL: Record<string, string> = {
  recall: 'Part one · know it',
  apply: 'Part two · use it',
  reason: 'Part three · reason it',
}

const PART_NOTE: Record<string, string> = {
  recall: 'Definitions and distinctions. If you can only recite the words, these will catch you.',
  apply: 'Numbers and short scenarios. Work them the way you would out loud in a room.',
  reason:
    'No right answer to click. Commit to an answer first, then check yourself against the model and the criteria.',
}

export function TestRunner({
  test,
  store,
  onExit,
}: {
  test: PracticeTest
  store: Store
  onExit: () => void
}) {
  const [i, setI] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [selfHits, setSelfHits] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)
  const started = useRef(Date.now())

  const item = test.items[i]
  const part = SHELL_BY_CODE[item?.shell]?.part ?? 'recall'
  const openTotal = test.items.reduce((n, x) => n + (x.kind === 'open' ? x.criteria.length : 0), 0)
  const isFirstOfPart = i === 0 || SHELL_BY_CODE[test.items[i - 1].shell]?.part !== part

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [i])

  const advance = (r: Result | null, hits?: { shell: string; n: number }) => {
    if (r) setResults((xs) => [...xs, r])
    if (hits) setSelfHits((h) => ({ ...h, [hits.shell]: hits.n }))
    if (i + 1 < test.items.length) {
      setI(i + 1)
      return
    }
    const auto = r ? [...results, r] : results
    const finalHits = hits ? { ...selfHits, [hits.shell]: hits.n } : selfHits
    store.recordAttempt({
      testId: test.id,
      at: Date.now(),
      scored: auto.filter((x) => x.correct).length,
      scoredOf: auto.length,
      self: finalHits,
      selfOf: openTotal,
      seconds: Math.round((Date.now() - started.current) / 1000),
    })
    setDone(true)
  }

  if (done) {
    return <Report test={test} results={results} selfHits={selfHits} onExit={onExit} />
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <div>
          <div className="label">
            {test.title} · question {i + 1} of {test.items.length}
          </div>
          <div className="text-bone-500 mt-1 font-mono text-[11px]">{PART_LABEL[part]}</div>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="text-bone-500 hover:text-bone-300 cursor-pointer font-mono text-[10px] tracking-[0.16em] uppercase"
        >
          Leave
        </button>
      </div>

      <div className="bg-well mb-8 h-1 w-full overflow-hidden rounded-full">
        <div
          className="bg-ember-500 h-full rounded-full"
          style={{ width: `${(i / test.items.length) * 100}%`, transition: 'width 400ms ease' }}
        />
      </div>

      {isFirstOfPart && (
        <div className="border-line bg-well mb-6 rounded-xl border p-4">
          <div className="label">{PART_LABEL[part]}</div>
          <p className="text-bone-300 mt-1.5 text-[14px] leading-[1.6]">{PART_NOTE[part]}</p>
        </div>
      )}

      <ItemCard key={item.shell} item={item} onNext={advance} />
    </div>
  )
}

function ItemCard({
  item,
  onNext,
}: {
  item: Item
  onNext: (r: Result | null, hits?: { shell: string; n: number }) => void
}) {
  if (item.kind === 'mc') return <McCard item={item} onNext={onNext} />
  if (item.kind === 'num') return <NumCard item={item} onNext={onNext} />
  return <OpenCard item={item} onNext={onNext} />
}

/** The confidence tap. A wrong answer given confidently is the one worth interrupting. */
function ConfidenceRow({ value, onPick }: { value: Confidence | null; onPick: (c: Confidence) => void }) {
  const opts: { id: Confidence; label: string }[] = [
    { id: 'low', label: 'Guessing' },
    { id: 'med', label: 'Fairly sure' },
    { id: 'high', label: 'Certain' },
  ]
  return (
    <div className="mt-6">
      <div className="label">how sure are you</div>
      <div className="mt-2 flex gap-2">
        {opts.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o.id)}
            className={`cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors ${
              value === o.id
                ? 'border-ember-500/50 bg-ember-500/10 text-ember-700'
                : 'border-line text-bone-500 hover:text-bone-300'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Feedback in the order the evidence supports: verdict and the key, then why the
 * key is right, then the specific error behind the option you chose, then the one
 * rule to carry. Nothing else.
 */
function Feedback({
  correct,
  overconfident,
  keyLine,
  why,
  trap,
  rule,
  children,
}: {
  correct: boolean
  overconfident: boolean
  keyLine: string
  why: string
  trap?: string
  rule: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={`rise mt-6 rounded-2xl border p-5 ${
        correct ? 'border-moss-400/40 bg-moss-400/6' : 'border-clay-400/40 bg-clay-400/5'
      }`}
    >
      <div className={`label ${correct ? 'text-moss-400' : 'text-clay-400'}`}>
        {correct ? 'correct' : overconfident ? 'you were certain — here is the break' : 'not this one'}
      </div>
      <p className="text-bone-100 mt-1.5 text-[16px] leading-[1.5] font-semibold">{keyLine}</p>
      <p className="text-bone-300 mt-3 text-[15px] leading-[1.65]">{why}</p>
      {trap && (
        <p className="border-clay-400/40 text-bone-300 mt-3 border-l-2 pl-3.5 text-[14.5px] leading-[1.6]">
          {trap}
        </p>
      )}
      {children}
      <p className="border-line mt-4 border-t pt-3 font-mono text-[12px] leading-[1.55] text-bone-500">
        <span className="text-ember-700">carry this →</span> {rule}
      </p>
    </div>
  )
}

function McCard({ item, onNext }: { item: McItem; onNext: (r: Result) => void }) {
  const [conf, setConf] = useState<Confidence | null>(null)
  const [picked, setPicked] = useState<number | null>(null)

  // Shuffle presentation, but keep the mapping back to the authored index for traps.
  const order = useMemo(() => {
    const seed = item.shell.split('').reduce((a, c) => a + c.charCodeAt(0), item.stem.length)
    return seededShuffle(
      item.choices.map((_, n) => n),
      seed,
    )
  }, [item])

  const submit = (authoredIndex: number) => {
    if (picked !== null) return
    setPicked(authoredIndex)
  }

  const correct = picked !== null && picked === item.answer

  return (
    <div>
      <p className="text-bone-100 text-[19px] leading-[1.5]">{item.stem}</p>

      <div className="mt-6 space-y-2.5">
        {order.map((authored) => {
          const isKey = authored === item.answer
          const isPicked = picked === authored
          const shown = picked !== null
          return (
            <button
              key={authored}
              type="button"
              disabled={picked !== null || conf === null}
              onClick={() => submit(authored)}
              className={`w-full rounded-xl border px-4 py-3.5 text-left text-[15.5px] leading-[1.5] transition-colors ${
                !shown
                  ? conf === null
                    ? 'border-line text-bone-500 cursor-not-allowed'
                    : 'border-line text-bone-300 hover:border-ember-500/50 hover:text-bone-100 cursor-pointer'
                  : isKey
                    ? 'border-moss-400/60 bg-moss-400/8 text-bone-100'
                    : isPicked
                      ? 'border-clay-400/60 bg-clay-400/6 text-bone-100'
                      : 'border-line text-bone-500'
              }`}
            >
              {item.choices[authored]}
            </button>
          )
        })}
      </div>

      {picked === null && conf === null && (
        <ConfidenceRow value={conf} onPick={setConf} />
      )}
      {picked === null && conf !== null && (
        <p className="text-bone-500 mt-4 font-mono text-[11px]">Pick an answer.</p>
      )}

      {picked !== null && (
        <>
          <Feedback
            correct={correct}
            overconfident={!correct && conf === 'high'}
            keyLine={correct ? item.choices[item.answer] : `The answer is: ${item.choices[item.answer]}`}
            why={item.why}
            trap={!correct ? item.traps[picked] : undefined}
            rule={item.rule}
          />
          <div className="mt-5 flex justify-end">
            <Button
              variant="solid"
              onClick={() => onNext({ shell: item.shell, correct, confidence: conf })}
            >
              Next →
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

function NumCard({ item, onNext }: { item: NumItem; onNext: (r: Result) => void }) {
  const [conf, setConf] = useState<Confidence | null>(null)
  const [raw, setRaw] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const parsed = Number(raw.replace(/[$,%\sx]/g, ''))
  const valid = raw.trim().length > 0 && Number.isFinite(parsed)
  const tol = item.tol ?? 0
  const correct = valid && Math.abs(parsed - item.answer) <= tol

  const fmt = (n: number) => {
    const u = item.unit ?? ''
    if (u === '$M') return `$${n}M`
    return `${n}${u}`
  }

  return (
    <div>
      <p className="text-bone-100 text-[19px] leading-[1.5]">{item.stem}</p>
      {item.format && <p className="text-bone-500 mt-2 font-mono text-[11px]">{item.format}</p>}

      <div className="mt-6 flex items-center gap-3">
        <input
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && valid && conf !== null && !submitted) setSubmitted(true)
          }}
          disabled={submitted}
          inputMode="decimal"
          placeholder="your answer"
          aria-label="Your answer"
          className="border-line focus:border-ember-500/60 bg-ash-900 text-bone-100 w-44 rounded-xl border px-4 py-3 font-mono text-[16px] outline-none disabled:opacity-60"
        />
        {item.unit && <span className="text-bone-500 font-mono text-[13px]">{item.unit.trim()}</span>}
      </div>

      {!submitted && conf === null && <ConfidenceRow value={conf} onPick={setConf} />}
      {!submitted && conf !== null && (
        <div className="mt-5">
          <Button variant="solid" onClick={() => valid && setSubmitted(true)}>
            Check
          </Button>
        </div>
      )}

      {submitted && (
        <>
          <Feedback
            correct={correct}
            overconfident={!correct && conf === 'high'}
            keyLine={correct ? fmt(item.answer) : `The answer is ${fmt(item.answer)}. You said ${raw.trim()}.`}
            why={item.why}
            rule={item.rule}
          >
            <div className="border-line bg-ash-900/60 mt-4 overflow-hidden rounded-xl border">
              <div className="border-line label border-b px-4 py-2">the arithmetic</div>
              {item.work.map((w, n) => (
                <div key={n} className="border-line border-b px-4 py-2.5 last:border-0">
                  <div className="flex items-baseline justify-between gap-5">
                    <span className="text-bone-300 text-[14px] leading-snug">{w.label}</span>
                    <span className="text-bone-100 font-mono text-[13px] whitespace-nowrap">
                      {w.value}
                    </span>
                  </div>
                  {w.running && (
                    <div className="text-bone-500 mt-1 text-right font-mono text-[11px]">
                      {w.running}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Feedback>
          <div className="mt-5 flex justify-end">
            <Button
              variant="solid"
              onClick={() => onNext({ shell: item.shell, correct, confidence: conf })}
            >
              Next →
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

/**
 * Open items gate the model answer behind a written commitment, then score with a
 * binary checklist rather than a rating. Weak self-assessors are reliable about
 * "did I say this?" and unreliable about "how good was that?".
 */
function OpenCard({
  item,
  onNext,
}: {
  item: OpenItem
  onNext: (r: null, hits: { shell: string; n: number }) => void
}) {
  const [draft, setDraft] = useState('')
  const [committed, setCommitted] = useState(false)
  const [hits, setHits] = useState<boolean[]>(() => item.criteria.map(() => false))

  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0
  const enough = words >= 25

  return (
    <div>
      <p className="text-bone-100 text-[19px] leading-[1.5]">{item.stem}</p>
      <p className="text-bone-500 mt-3 text-[14px] leading-[1.6]">
        <span className="text-ember-700 font-mono text-[11px] tracking-[0.12em] uppercase">tests</span>{' '}
        {item.tests}
      </p>

      {!committed && (
        <>
          <div className="panel mt-6 p-5">
            <div className="label">before you answer</div>
            <p className="text-bone-300 mt-2 text-[14.5px] leading-[1.6]">
              Ask one or two of these, then say your structure out loud, then reason. Write what you
              would actually say — not notes.
            </p>
            <ul className="mt-3 space-y-1.5">
              {item.clarify.map((c) => (
                <li key={c} className="text-bone-300 pl-4 -indent-4 text-[14.5px] leading-[1.55]">
                  · {c}
                </li>
              ))}
            </ul>
          </div>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={7}
            placeholder="Your answer, out loud, in writing."
            aria-label="Your answer"
            className="border-line focus:border-ember-500/60 bg-ash-900 text-bone-100 mt-5 w-full resize-y rounded-xl border px-4 py-3.5 text-[15.5px] leading-[1.6] outline-none"
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <span className="text-bone-500 font-mono text-[11px]">
              {words} words{enough ? '' : ' · at least 25 before you can compare'}
            </span>
            <Button variant="solid" onClick={() => enough && setCommitted(true)}>
              Commit and compare
            </Button>
          </div>
        </>
      )}

      {committed && (
        <div className="rise mt-6 space-y-5">
          <div className="panel p-5">
            <div className="label">the structure that scores</div>
            <ol className="mt-2.5 space-y-1.5">
              {item.skeleton.map((s, n) => (
                <li key={s} className="text-bone-300 flex gap-3 text-[14.5px] leading-[1.55]">
                  <span className="text-bone-500 font-mono text-[11px] leading-6">{n + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border-ember-500/30 bg-ember-500/4 rounded-2xl border p-5">
            <div className="label text-ember-700">a model answer</div>
            <p className="text-bone-100 mt-2 text-[15.5px] leading-[1.7]">{item.model}</p>
          </div>

          <div className="panel p-5">
            <div className="label">score yourself — did you actually say this?</div>
            <div className="mt-3 space-y-2">
              {item.criteria.map((c, n) => (
                <button
                  key={c}
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
                  {c}
                </button>
              ))}
            </div>
            <p className="text-bone-500 mt-3 font-mono text-[11px]">
              {hits.filter(Boolean).length} of {item.criteria.length} · be honest, nobody sees this
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel p-5">
              <div className="label">they will push with</div>
              <ul className="mt-2 space-y-1.5">
                {item.follows.map((f) => (
                  <li key={f} className="text-bone-300 pl-4 -indent-4 text-[14px] leading-[1.55]">
                    · {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel p-5">
              <div className="label">how people lose this one</div>
              <ul className="mt-2 space-y-1.5">
                {item.flags.map((f) => (
                  <li key={f} className="text-bone-300 pl-4 -indent-4 text-[14px] leading-[1.55]">
                    · {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="border-line rounded-xl border px-4 py-3 font-mono text-[12px] leading-[1.55] text-bone-500">
            <span className="text-ember-700">carry this →</span> {item.rule}
          </p>

          <div className="flex justify-end">
            <Button
              variant="solid"
              onClick={() => onNext(null, { shell: item.shell, n: hits.filter(Boolean).length })}
            >
              Next →
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function Report({
  test,
  results,
  selfHits,
  onExit,
}: {
  test: PracticeTest
  results: Result[]
  selfHits: Record<string, number>
  onExit: () => void
}) {
  const right = results.filter((r) => r.correct).length
  const pct = results.length ? Math.round((right / results.length) * 100) : 0
  const openTotal = test.items.reduce((n, x) => n + (x.kind === 'open' ? x.criteria.length : 0), 0)
  const openHit = Object.values(selfHits).reduce((a, b) => a + b, 0)

  const missed = results.filter((r) => !r.correct)
  const blindSpots = missed.filter((r) => r.confidence === 'high')

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="label">{test.title} · finished</div>
      <h1 className="font-display mt-1 text-5xl leading-none tracking-tight">
        {right} of {results.length} scored, {openHit} of {openTotal} criteria hit
      </h1>

      <p className="text-bone-300 mt-5 text-[16px] leading-[1.7]">
        {results.length === 0
          ? 'You left before the scored questions, so there is nothing to read here. The written questions are the ones that decide an interview, but the first sixteen are what tell you whether the basics are in place.'
          : pct >= 80
            ? 'The scored half is solid. The reasoning questions are where the interview is actually decided, so read the criteria you missed rather than the ones you hit.'
            : pct >= 55
              ? 'A normal first pass. The gap is almost never the definitions — go back to the items you missed and read the trap line, not the answer.'
              : 'Low, and that is information rather than a verdict. Work through The Big Three again before the next form; most misses at this level trace back to profit-versus-cash.'}
      </p>

      {blindSpots.length > 0 && (
        <div className="border-clay-400/40 bg-clay-400/5 mt-8 rounded-2xl border p-5">
          <div className="label text-clay-400">
            {blindSpots.length} confident {blindSpots.length === 1 ? 'miss' : 'misses'}
          </div>
          <p className="text-bone-300 mt-2 text-[15px] leading-[1.65]">
            You were certain and wrong on{' '}
            {blindSpots.map((b) => SHELL_BY_CODE[b.shell]?.skill.toLowerCase()).join('; ')}. These are
            the ones worth rereading — an error you held confidently is the one most likely to come out
            of your mouth in the room.
          </p>
        </div>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {results.map((r) => (
          <div
            key={r.shell}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
              r.correct ? 'border-line' : 'border-clay-400/40 bg-clay-400/4'
            }`}
          >
            <span
              className={`mt-0.5 font-mono text-[11px] ${r.correct ? 'text-moss-400' : 'text-clay-400'}`}
            >
              {r.correct ? '✓' : '✕'}
            </span>
            <span className="text-bone-300 text-[13.5px] leading-[1.5]">
              {SHELL_BY_CODE[r.shell]?.skill}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-3">
        <Button variant="solid" onClick={onExit}>
          Back to the tests
        </Button>
      </div>
    </div>
  )
}
