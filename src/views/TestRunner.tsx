import { useEffect, useMemo, useRef, useState } from 'react'
import { Btn, Checklist, Chip, Clarify, ModelAnswer, QuestionHead, Skeleton, Tick } from '../components/ui'
import { modCode, modName } from '../content/concepts'
import {
  SHELL_BY_CODE,
  criteriaCount,
  type Item,
  type McItem,
  type NumItem,
  type OpenItem,
  type PracticeTest,
} from '../content/tests/types'
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

/** The module a shell draws on, written the way the concepts view writes it. */
function shellCat(shell: string): string {
  const s = SHELL_BY_CODE[shell]
  if (!s) return 'question'
  return `${modCode(s.domain)} — ${modName(s.domain)}`
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
  const openTotal = criteriaCount(test)
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
    <>
      <div className="mono eyebrow">08 — test in progress</div>

      <div className="mock-bar">
        <span className="mono">
          {test.title} · question {i + 1} of {test.items.length} · {PART_LABEL[part]}
        </span>
        <button type="button" className="link mono" onClick={onExit}>
          Leave
        </button>
      </div>

      <div className="prog">
        <div style={{ width: `${(i / test.items.length) * 100}%` }} />
      </div>

      {isFirstOfPart && (
        <div className="card band">
          <div className="mono eyebrow">{PART_LABEL[part]}</div>
          <p className="note">{PART_NOTE[part]}</p>
        </div>
      )}

      <div className="card q-card">
        <ItemCard key={item.shell} item={item} onNext={advance} />
      </div>
    </>
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
    <div className="q-sec">
      <div className="mono eyebrow">how sure are you</div>
      <div className="conf">
        {opts.map((o) => (
          <Chip key={o.id} on={value === o.id} onClick={() => onPick(o.id)}>
            {o.label}
          </Chip>
        ))}
      </div>
    </div>
  )
}

/** The one rule to carry forward, shown last in every piece of feedback. */
function Carry({ rule }: { rule: string }) {
  return (
    <p className="carry">
      <b className="mono">carry this</b>
      {rule}
    </p>
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
    <div className={correct ? 'verdict good' : 'verdict bad'}>
      <div className="mono verdict-l">
        {correct ? 'correct' : overconfident ? 'you were certain — here is the break' : 'not this one'}
      </div>
      <div className="verdict-key">{keyLine}</div>
      <p className="verdict-why">{why}</p>
      {trap && <p className="trap">{trap}</p>}
      {children}
      <Carry rule={rule} />
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
      <div className="serif q-text">{item.stem}</div>

      <div className="q-sec">
        {order.map((authored) => {
          const shown = picked !== null
          const cls = !shown
            ? 'opt'
            : authored === item.answer
              ? 'opt key'
              : picked === authored
                ? 'opt wrong'
                : 'opt dim'
          return (
            <button
              key={authored}
              type="button"
              className={cls}
              disabled={picked !== null || conf === null}
              onClick={() => submit(authored)}
            >
              {item.choices[authored]}
            </button>
          )
        })}
      </div>

      {picked === null && conf === null && <ConfidenceRow value={conf} onPick={setConf} />}
      {picked === null && conf !== null && <div className="mono hint">Pick an answer.</div>}

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
          <Btn tone="red" onClick={() => onNext({ shell: item.shell, correct, confidence: conf })}>
            Next question
          </Btn>
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
      <div className="serif q-text">{item.stem}</div>
      {item.format && <div className="mono hint">{item.format}</div>}

      <div className="q-sec">
        <div className="answer-row">
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
            className="answer mono"
          />
          {item.unit && <span className="mono hint">{item.unit.trim()}</span>}
        </div>
      </div>

      {!submitted && conf === null && <ConfidenceRow value={conf} onPick={setConf} />}
      {!submitted && conf !== null && (
        <Btn tone="red" onClick={() => valid && setSubmitted(true)}>
          Check
        </Btn>
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
            <div className="work">
              <div className="mono work-h">the arithmetic</div>
              {item.work.map((w, n) => (
                <div key={n} className="work-r">
                  <span>{w.label}</span>
                  <span className="work-v">{w.value}</span>
                  {w.running && <span className="work-run">{w.running}</span>}
                </div>
              ))}
            </div>
          </Feedback>
          <Btn tone="red" onClick={() => onNext({ shell: item.shell, correct, confidence: conf })}>
            Next question
          </Btn>
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
      <QuestionHead cat={shellCat(item.shell)} question={item.stem} tests={item.tests} big />

      {!committed && (
        <>
          <Clarify items={item.clarify} />
          <div className="q-sec">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={7}
              placeholder="Your answer, out loud, in writing."
              aria-label="Your answer"
              className="draft"
            />
            <div className="draft-bar">
              <span className="mono counter">
                {words} words{enough ? '' : ' · at least 25 before you can compare'}
              </span>
              <Btn tone="red" onClick={() => enough && setCommitted(true)}>
                Commit and compare
              </Btn>
            </div>
          </div>
        </>
      )}

      {committed && (
        <>
          <div className="q-sec">
            <div className="mono eyebrow">the structure that scores</div>
            <Skeleton items={item.skeleton} />
          </div>

          <ModelAnswer model={item.model} follows={item.follows} flags={item.flags} label="a model answer" />

          <Checklist
            title="score yourself — did you actually say this?"
            items={item.criteria}
            hits={hits}
            onToggle={(n) => setHits((h) => h.map((x, k) => (k === n ? !x : x)))}
          />

          <Carry rule={item.rule} />

          <Btn tone="red" onClick={() => onNext(null, { shell: item.shell, n: hits.filter(Boolean).length })}>
            Next question
          </Btn>
        </>
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
  const openTotal = criteriaCount(test)
  const openHit = Object.values(selfHits).reduce((a, b) => a + b, 0)

  const missed = results.filter((r) => !r.correct)
  const blindSpots = missed.filter((r) => r.confidence === 'high')

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <div className="mono eyebrow">08 — {test.title} · finished</div>
      <div className="serif big-score">
        {right} of {results.length} <span className="mono">scored</span> · {openHit} of {openTotal}{' '}
        <span className="mono">criteria hit</span>
      </div>

      <p className="note">
        {results.length === 0
          ? 'You left before the scored questions, so there is nothing to read here. The written questions are the ones that decide an interview, but the first sixteen are what tell you whether the basics are in place.'
          : pct >= 80
            ? 'The scored half is solid. The reasoning questions are where the interview is actually decided, so read the criteria you missed rather than the ones you hit.'
            : pct >= 55
              ? 'A normal first pass. The gap is almost never the definitions — go back to the items you missed and read the trap line, not the answer.'
              : 'Low, and that is information rather than a verdict. Work through The Big Three again before the next form; most misses at this level trace back to profit-versus-cash.'}
      </p>

      {blindSpots.length > 0 && (
        <div className="card red">
          <div className="mono eyebrow">
            {blindSpots.length} confident {blindSpots.length === 1 ? 'miss' : 'misses'}
          </div>
          <p className="note">
            You were certain and wrong on{' '}
            {blindSpots.map((b) => SHELL_BY_CODE[b.shell]?.skill.toLowerCase()).join('; ')}. These are
            the ones worth rereading — an error you held confidently is the one most likely to come out
            of your mouth in the room.
          </p>
        </div>
      )}

      <div className="result-grid">
        {results.map((r) => (
          <div key={r.shell}>
            <span className={r.correct ? 'rm ok' : 'rm'}>{r.correct ? <Tick size={13} /> : '✕'}</span>
            <span>{SHELL_BY_CODE[r.shell]?.skill}</span>
          </div>
        ))}
      </div>

      <Btn tone="red" onClick={onExit}>
        Back to the tests
      </Btn>
    </>
  )
}
