import { useCallback, useEffect, useMemo, useState } from 'react'
import { GROUPS, IRR_TABLE, RULES, TECHNICALS } from '../lib/technicals'
import type { GroupId, Step, Table, Technical } from '../lib/technicals'
import { Bar, Button, Chip } from './bits'
import { SectionHead } from './Dashboard'

type Mark = 'nailed' | 'missed'
type Marks = Record<string, Mark>

const KEY = 'ember-technicals-v1'

function loadMarks(): Marks {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Marks) : {}
  } catch {
    return {}
  }
}

function useMarks() {
  const [marks, setMarks] = useState<Marks>(loadMarks)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(marks))
  }, [marks])

  const mark = useCallback((id: string, value: Mark) => {
    setMarks((prev) => {
      const next = { ...prev }
      if (next[id] === value) delete next[id]
      else next[id] = value
      return next
    })
  }, [])

  const clear = useCallback(() => setMarks({}), [])

  return { marks, mark, clear }
}

export function Technicals() {
  const { marks, mark, clear } = useMarks()
  const [group, setGroup] = useState<GroupId | 'all'>('all')

  const shown = useMemo(
    () => (group === 'all' ? TECHNICALS : TECHNICALS.filter((t) => t.group === group)),
    [group],
  )

  const nailed = TECHNICALS.filter((t) => marks[t.id] === 'nailed').length
  const missed = TECHNICALS.filter((t) => marks[t.id] === 'missed').length
  const minutes = TECHNICALS.reduce((s, t) => s + t.minutes, 0)

  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-24">
      <div className="rise">
        <div className="label">Blank sheet, no Excel</div>
        <h1 className="font-display text-bone-100 mt-3 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02]">
          The modeling questions
          <br />
          they ask out loud.
        </h1>
        <p className="text-bone-300 mt-4 max-w-2xl text-[15px] leading-relaxed">
          {TECHNICALS.length} worked problems, {minutes} minutes of paper. Work each one yourself
          first, then reveal a step at a time and find where you diverged.
        </p>
      </div>

      <section className="panel mt-8 px-6 py-6">
        <div className="flex items-baseline justify-between gap-4">
          <div className="label">Self-marked</div>
          <div className="text-bone-500 font-mono text-[11px]">
            {nailed} nailed · {missed} to redo · {TECHNICALS.length - nailed - missed} untouched
          </div>
        </div>
        <div className="mt-3">
          <Bar value={nailed / TECHNICALS.length} tone={nailed >= 8 ? 'moss' : 'ember'} />
        </div>
        {(nailed > 0 || missed > 0) && (
          <div className="mt-4">
            <Button variant="quiet" onClick={clear}>
              Clear marks
            </Button>
          </div>
        )}
      </section>

      <div className="mt-8 flex flex-wrap gap-1.5">
        <Chip active={group === 'all'} onClick={() => setGroup('all')}>
          All {TECHNICALS.length}
        </Chip>
        {GROUPS.map((g) => (
          <Chip key={g.id} active={group === g.id} onClick={() => setGroup(g.id)}>
            {g.label}
          </Chip>
        ))}
      </div>
      {group !== 'all' && (
        <p className="text-bone-500 mt-3 font-mono text-[11px]">
          {GROUPS.find((g) => g.id === group)?.blurb}
        </p>
      )}

      <section className="mt-6 space-y-2.5">
        {shown.map((t) => (
          <ProblemCard key={t.id} problem={t} mark={marks[t.id]} onMark={(m) => mark(t.id, m)} />
        ))}
      </section>

      <section className="mt-14">
        <SectionHead title="Money multiple to IRR" note="Memorize the middle column" />
        <p className="text-bone-300 mt-3 max-w-2xl text-[15px] leading-relaxed">
          Anchor off these and interpolate: "2.7x over five years, so low-twenties."
        </p>
        <div className="panel mt-5 overflow-x-auto px-5 py-4">
          <table className="w-full min-w-[24rem] font-mono text-[12px]">
            <thead>
              <tr className="text-bone-500 text-[10px] tracking-[0.16em] uppercase">
                <th className="py-2 text-left font-normal">MoM</th>
                <th className="py-2 text-right font-normal">3-year hold</th>
                <th className="py-2 text-right font-normal">5-year hold</th>
                <th className="py-2 text-right font-normal">7-year hold</th>
              </tr>
            </thead>
            <tbody>
              {IRR_TABLE.map((r) => (
                <tr key={r.mom} className="border-line border-t">
                  <td className="text-bone-100 py-2">{r.mom}</td>
                  <td className="text-bone-300 py-2 text-right">{r.y3}</td>
                  <td className="text-ember-600 py-2 text-right">{r.y5}</td>
                  <td className="text-bone-300 py-2 text-right">{r.y7}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <SectionHead title="Shortcuts worth saying out loud" note={`${RULES.length} rules`} />
        <div className="mt-5 space-y-2">
          {RULES.map((r) => (
            <div key={r.rule} className="panel px-5 py-4">
              <div className="text-bone-100 text-[15px] leading-snug">{r.rule}</div>
              <div className="text-bone-500 mt-1.5 font-mono text-[11px] leading-relaxed">
                {r.detail}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function ProblemCard({
  problem,
  mark,
  onMark,
}: {
  problem: Technical
  mark: Mark | undefined
  onMark: (m: Mark) => void
}) {
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(0)

  const total = problem.steps.length
  const done = revealed >= total

  return (
    <div
      className={`panel overflow-hidden transition-colors ${
        mark === 'nailed' ? 'border-moss-400/45' : mark === 'missed' ? 'border-ember-500/45' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-start gap-4 px-5 py-5 text-left"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-bone-500 font-mono text-[10px] tracking-[0.16em] uppercase">
              {GROUPS.find((g) => g.id === problem.group)?.label}
            </span>
            <span className="text-bone-500 font-mono text-[10px] tracking-[0.16em] uppercase">
              {problem.level} · {problem.minutes} min
            </span>
            {mark === 'nailed' && (
              <span className="text-moss-400 font-mono text-[10px] tracking-[0.16em] uppercase">
                nailed
              </span>
            )}
            {mark === 'missed' && (
              <span className="text-ember-600 font-mono text-[10px] tracking-[0.16em] uppercase">
                redo
              </span>
            )}
          </div>
          <div className="font-display text-bone-100 mt-1 text-2xl">{problem.title}</div>
          <div className="text-ember-600/90 mt-0.5 font-mono text-[11px] tracking-[0.08em]">
            {problem.tag}
          </div>
        </div>
        <span className="text-bone-500 font-mono text-[11px]">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="px-5 pb-6">
          <div className="hairline mb-5" />

          <div className="label">The prompt</div>
          <blockquote className="border-ember-500/50 text-bone-100 mt-2 border-l-2 pl-4 text-[15px] leading-relaxed italic">
            {problem.prompt}
          </blockquote>

          <div className="mt-6">
            <div className="label">What they give you</div>
            <div className="mt-3 grid gap-x-6 gap-y-0 sm:grid-cols-2">
              {problem.givens.map((g) => (
                <div
                  key={g.label}
                  className="border-line flex items-baseline justify-between gap-4 border-b py-2"
                >
                  <span className="text-bone-300 text-[13px]">{g.label}</span>
                  <span className="text-bone-100 shrink-0 text-right font-mono text-[12px]">
                    {g.value}
                    {g.note && (
                      <span className="text-bone-500 block text-[10px]">{g.note}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {revealed === 0 ? (
            <div className="bg-well mt-6 rounded-xl px-5 py-5">
              <div className="text-bone-100 text-[15px] leading-relaxed">
                Work it on paper before you reveal anything. Give yourself {problem.minutes}{' '}
                minutes and say each step out loud — the talking is the part being graded.
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="solid" onClick={() => setRevealed(1)}>
                  Reveal step 1 of {total}
                </Button>
                <Button onClick={() => setRevealed(total)}>Show full solution</Button>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {problem.steps.slice(0, revealed).map((s, i) => (
                <StepBlock key={s.title} step={s} n={i + 1} total={total} />
              ))}

              {!done && (
                <div className="flex flex-wrap gap-3">
                  <Button variant="solid" onClick={() => setRevealed(revealed + 1)}>
                    Reveal step {revealed + 1} of {total}
                  </Button>
                  <Button onClick={() => setRevealed(total)}>Show the rest</Button>
                </div>
              )}
            </div>
          )}

          {done && (
            <>
              <div className="border-moss-400/35 bg-moss-400/6 mt-6 rounded-xl border px-5 py-4">
                <div className="text-moss-400 font-mono text-[10px] tracking-[0.16em] uppercase">
                  The answer
                </div>
                <div className="text-bone-100 mt-2 space-y-2 text-[15px] leading-relaxed">
                  {problem.answer.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="label">Where people lose the question</div>
                <ul className="text-bone-300 mt-3 space-y-2 text-[14px] leading-relaxed">
                  {problem.traps.map((t) => (
                    <li key={t} className="-indent-4 pl-4">
                      — {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <div className="label">What they ask next</div>
                <ul className="text-bone-300 mt-3 space-y-2 text-[14px] leading-relaxed">
                  {problem.followups.map((f) => (
                    <li key={f} className="-indent-4 pl-4">
                      — {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-line mt-6 flex flex-wrap items-center gap-3 border-t pt-5">
                <span className="label">How did you do?</span>
                <Button variant={mark === 'nailed' ? 'solid' : 'ghost'} onClick={() => onMark('nailed')}>
                  Nailed it
                </Button>
                <Button variant={mark === 'missed' ? 'solid' : 'ghost'} onClick={() => onMark('missed')}>
                  Redo this
                </Button>
                <Button variant="quiet" onClick={() => setRevealed(0)}>
                  Reset steps
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function StepBlock({ step, n, total }: { step: Step; n: number; total: number }) {
  return (
    <div className="rise">
      <div className="flex items-baseline gap-3">
        <span className="text-ember-600 font-mono text-[10px] tracking-[0.16em] uppercase">
          Step {n} / {total}
        </span>
        <span className="hairline flex-1" />
      </div>
      <div className="text-bone-100 mt-2 text-[17px] leading-snug">{step.title}</div>

      <div className="text-bone-300 mt-2 space-y-2 text-[14px] leading-[1.7]">
        {step.body.map((line) => (
          <p key={line} className="-indent-4 pl-4">
            {line}
          </p>
        ))}
      </div>

      {step.table && <NumTable table={step.table} />}

      {step.say && (
        <div className="border-line bg-ash-850 mt-3 rounded-xl border px-4 py-3">
          <div className="text-bone-500 font-mono text-[10px] tracking-[0.16em] uppercase">
            Say it like this
          </div>
          <div className="text-bone-100 mt-1.5 text-[14px] leading-relaxed italic">
            “{step.say}”
          </div>
        </div>
      )}
    </div>
  )
}

function NumTable({ table }: { table: Table }) {
  return (
    <div className="panel mt-3 overflow-x-auto px-4 py-3">
      <table className="w-full min-w-[30rem] font-mono text-[12px]">
        <thead>
          <tr className="text-bone-500 text-[10px] tracking-[0.14em] uppercase">
            {table.head.map((h, i) => (
              <th key={h + i} className={`py-2 font-normal ${i === 0 ? 'text-left' : 'text-right'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => {
            const emphasize = /total|net income|enterprise value|available|equity/i.test(row[0])
            return (
              <tr key={row.join('|') + r} className="border-line border-t">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`py-2 ${i === 0 ? 'text-left' : 'text-right'} ${
                      emphasize ? 'text-bone-100' : 'text-bone-300'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
