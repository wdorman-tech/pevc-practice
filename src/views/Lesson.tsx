import { useEffect, useState } from 'react'
import { Button } from '../components/bits'
import { CLOSER, EVENTS, HOW_TO_READ, STEPS, THREE, type Check, type Ledger } from '../content/lesson'
import type { Store } from '../lib/store'

export function Lesson({ store }: { store: Store }) {
  const [i, setI] = useState(0)
  const step = STEPS[i]
  const done = store.data.lesson

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [i])

  const go = (n: number) => {
    store.completeStep(STEPS[i].id)
    setI(n)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8">
        <div className="label">the basics · one small business · four steps</div>
        <h1 className="font-display mt-1 text-5xl leading-none tracking-tight">The Big Three</h1>
        <p className="text-bone-500 mt-2 font-mono text-[11px] tracking-[0.14em] uppercase">
          income statement · balance sheet · cash flow
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[180px_1fr]">
        <nav className="flex gap-1.5 overflow-x-auto md:sticky md:top-24 md:h-fit md:flex-col md:overflow-visible">
          {STEPS.map((s, n) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(n)}
              className={`flex flex-none cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left font-mono text-[11px] tracking-[0.1em] uppercase transition-colors ${
                n === i ? 'bg-ember-500/10 text-ember-700' : 'text-bone-500 hover:text-bone-300'
              }`}
            >
              <span className={n === i ? 'text-ember-600' : 'text-bone-500/60'}>{s.code}</span>
              {s.nav}
              {done.includes(s.id) && n !== i && <span className="text-moss-400 ml-auto">✓</span>}
            </button>
          ))}
        </nav>

        <main key={step.id} className="rise min-w-0">
          <div className="label">{step.eyebrow}</div>
          <h2 className="font-display mt-2 text-4xl leading-[1.1] tracking-tight">{step.h1}</h2>
          <p className="text-bone-300 mt-4 text-[17px] leading-[1.65]">{step.lede}</p>

          {i === 0 && <StartHere />}

          {step.ledger && <LedgerTable ledger={step.ledger} />}
          {i === 1 && <IncomeFigure />}
          {i === 2 && <BalanceFigure />}
          {i === 3 && <CashFigure />}

          {step.notes && (
            <section className="mt-9">
              <h3 className="font-display text-2xl tracking-tight">{step.notes.h}</h3>
              <div className="mt-4 space-y-4">
                {step.notes.items.map((n) => (
                  <div key={n.t} className="border-line border-l-2 pl-4">
                    <div className="text-bone-100 text-[15px] font-semibold">{n.t}</div>
                    <p className="text-bone-300 mt-1 text-[15px] leading-[1.7]">{n.d}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {step.takeaway && (
            <div className="bg-well border-line mt-8 rounded-2xl border p-6">
              <div className="label">the takeaway</div>
              <p className="text-bone-100 mt-2 text-[16px] leading-[1.7]">{step.takeaway}</p>
            </div>
          )}

          <section className="mt-10">
            <div className="label">check yourself</div>
            <div className="mt-3 space-y-3">
              {step.checks.map((c, n) => (
                <CheckCard key={`${step.id}-${n}`} check={c} n={n} />
              ))}
            </div>
          </section>

          {i === 3 && (
            <div className="border-ember-500/40 bg-ember-500/5 mt-10 rounded-2xl border p-6">
              <div className="label text-ember-700">if you remember three sentences</div>
              <p className="font-display text-bone-100 mt-2 text-[22px] leading-[1.45]">{CLOSER}</p>
            </div>
          )}

          <div className="border-line mt-10 flex items-center justify-between gap-4 border-t pt-6">
            <div className="text-bone-500 font-mono text-[11px]">{step.nextLabel}</div>
            {i < STEPS.length - 1 ? (
              <Button variant="solid" onClick={() => go(i + 1)}>
                Continue →
              </Button>
            ) : (
              <Button onClick={() => go(0)}>Start over</Button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function StartHere() {
  return (
    <>
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {THREE.map((t) => (
          <div key={t.label} className="panel p-5">
            <div className="label">{t.label}</div>
            <div className="font-display mt-1.5 text-[22px] leading-tight">{t.q}</div>
            <p className="text-bone-300 mt-2 text-[14px] leading-[1.6]">{t.p}</p>
          </div>
        ))}
      </div>

      <section className="mt-9">
        <h3 className="font-display text-2xl tracking-tight">Meet the business</h3>
        <p className="text-bone-300 mt-2 text-[15px] leading-[1.7]">
          We will use one tiny business for all four steps: Maya's coffee cart, first year. Six
          things happened. Every number in this whole lesson comes from these six lines, so read them
          once and the rest will follow.
        </p>
        <div className="panel mt-4 overflow-hidden">
          <div className="border-line bg-well label border-b px-5 py-2.5">
            Maya's coffee cart · year one
          </div>
          {EVENTS.map((e) => (
            <div
              key={e.n}
              className="border-line grid grid-cols-[28px_1fr_auto] items-start gap-3 border-b px-5 py-3 last:border-0"
            >
              <span className="text-bone-500 font-mono text-[11px] leading-6">{e.n}</span>
              <span className="text-bone-300 text-[15px] leading-[1.6]">{e.text}</span>
              <span className="text-bone-100 font-mono text-[13px] leading-6">{e.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-9">
        <h3 className="font-display text-2xl tracking-tight">How to read the next three steps</h3>
        <div className="mt-4 space-y-4">
          {HOW_TO_READ.map((n) => (
            <div key={n.t} className="border-line border-l-2 pl-4">
              <div className="text-bone-100 text-[15px] font-semibold">{n.t}</div>
              <p className="text-bone-300 mt-1 text-[15px] leading-[1.7]">{n.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function LedgerTable({ ledger }: { ledger: Ledger }) {
  return (
    <div className="panel mt-7 overflow-hidden">
      <div className="border-line bg-well flex items-baseline justify-between gap-3 border-b px-5 py-2.5">
        <span className="label">{ledger.title}</span>
        <span className="text-bone-500 font-mono text-[10px]">{ledger.caption}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-[14px]">
          <tbody>
            {ledger.rows.map((r, n) => {
              if (r.tone === 'gap') return <tr key={n} className="h-3" />
              const strong = r.tone === 'tot' || r.tone === 'sub' || r.tone === 'head'
              return (
                <tr
                  key={n}
                  className={
                    r.tone === 'tot'
                      ? 'border-bone-100 border-t-2'
                      : r.tone === 'sub'
                        ? 'border-line-strong border-t'
                        : r.tone === 'hi'
                          ? 'bg-ember-500/6'
                          : ''
                  }
                >
                  <td
                    className={`py-2 pl-5 ${strong ? 'text-bone-100 font-semibold' : 'text-bone-300'}`}
                  >
                    {r.label}
                  </td>
                  <td
                    className={`py-2 text-right font-mono text-[13px] whitespace-nowrap ${
                      r.neg ? 'text-clay-400' : strong ? 'text-bone-100' : 'text-bone-300'
                    }`}
                  >
                    {r.amount ?? ''}
                  </td>
                  <td className="text-bone-500 hidden py-2 pr-5 pl-6 text-[12.5px] leading-snug sm:table-cell">
                    {r.why ?? ''}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CheckCard({ check, n }: { check: Check; n: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="panel p-5">
      <div className="label">question {n + 1}</div>
      <p className="text-bone-100 mt-1.5 text-[16px] leading-[1.55]">{check.q}</p>
      {open ? (
        <p className="border-ember-500/40 text-bone-300 mt-4 border-l-2 pl-4 text-[15px] leading-[1.7]">
          {check.a}
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-bone-500 hover:text-ember-600 mt-4 cursor-pointer font-mono text-[10px] tracking-[0.16em] uppercase transition-colors"
        >
          + Show answer
        </button>
      )}
    </div>
  )
}

const INK = 'var(--color-bone-100)'
const MUTE = 'var(--color-bone-500)'
const EMBER = 'var(--color-ember-500)'
const MOSS = 'var(--color-moss-400)'

function Figure({
  children,
  cap,
  label,
  height,
}: {
  children: React.ReactNode
  cap: string
  label: string
  height: number
}) {
  return (
    <figure className="mt-7">
      <div className="panel overflow-x-auto p-5">
        <svg
          viewBox={`0 0 660 ${height}`}
          role="img"
          aria-label={label}
          className="h-auto w-full min-w-[520px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="text-bone-500 mt-2 text-[12.5px] leading-snug">{cap}</figcaption>
    </figure>
  )
}

function IncomeFigure() {
  // The last two blocks are narrow, so their labels are anchored to the right edge
  // of the bar instead of the left edge of their own block, which would collide.
  const bands = [
    { x: 30, w: 120, v: '$1,000', l: 'coffee supplies', f: 'var(--color-ash-700)', tx: 30, anchor: 'start' },
    { x: 150, w: 180, v: '$1,500', l: 'helper and rent', f: 'var(--color-ash-600)', tx: 150, anchor: 'start' },
    { x: 330, w: 96, v: '$800', l: 'cart wear', f: 'var(--color-line-strong)', tx: 330, anchor: 'start' },
    { x: 426, w: 60, v: '$500', l: 'interest and tax', f: 'var(--color-bone-500)', tx: 426, anchor: 'start' },
    { x: 486, w: 144, v: '$1,200', l: 'profit kept', f: EMBER, tx: 630, anchor: 'end' },
  ] as const
  return (
    <Figure
      height={140}
      label="Bar showing where each part of Maya's 5,000 dollars of sales went: 1,000 to coffee supplies, 1,500 to wages and rent, 800 to cart wear, 500 to interest and tax, and 1,200 left as profit."
      cap="Every dollar of sales either paid for something or stayed in the business as profit. The ember block is what was left."
    >
      <text x="30" y="26" fill={MUTE} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6">
        WHERE THE $5,000 OF SALES WENT
      </text>
      {bands.map((b) => (
        <g key={b.l}>
          <rect x={b.x} y={40} width={b.w} height={44} fill={b.f} />
          <text
            x={b.tx}
            y={106}
            textAnchor={b.anchor}
            fill={b.f === EMBER ? EMBER : INK}
            fontFamily="var(--font-mono)"
            fontSize="10"
          >
            {b.v}
          </text>
          <text x={b.tx} y={121} textAnchor={b.anchor} fill={b.f === EMBER ? EMBER : MUTE} fontSize="11">
            {b.l}
          </text>
        </g>
      ))}
    </Figure>
  )
}

function BalanceFigure() {
  return (
    <Figure
      height={252}
      label="Two columns of equal height. Assets total 4,200 dollars: cash 2,200, cart 1,600, money owed 200, supplies 200. The other side totals the same 4,200: a 1,000 dollar loan plus 3,200 of owner's equity."
      cap="The ember block is the profit from the last step. Profit the business keeps becomes part of what the owner has in it."
    >
      <text x="30" y="24" fill={MUTE} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6">
        WHAT IT OWNS
      </text>
      <text x="420" y="24" fill={MUTE} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6">
        WHO PAID FOR IT
      </text>

      <rect x="30" y="32" width="180" height="98" fill="var(--color-ash-700)" />
      <text x="42" y="86" fill={INK} fontSize="13">Cash</text>
      <text x="198" y="86" textAnchor="end" fill={INK} fontFamily="var(--font-mono)" fontSize="13">$2,200</text>
      <rect x="30" y="130" width="180" height="70" fill="var(--color-ash-600)" />
      <text x="42" y="170" fill={INK} fontSize="13">Cart</text>
      <text x="198" y="170" textAnchor="end" fill={INK} fontFamily="var(--font-mono)" fontSize="13">$1,600</text>
      <rect x="30" y="200" width="180" height="18" fill="var(--color-line-strong)" />
      <text x="218" y="208" fill={MUTE} fontSize="10.5">owed by the office $200</text>
      <text x="218" y="221" fill={MUTE} fontSize="10.5">supplies $200</text>

      <text x="380" y="132" textAnchor="middle" fill={EMBER} fontFamily="var(--font-display)" fontSize="26">=</text>

      <rect x="420" y="32" width="180" height="44" fill="var(--color-bone-500)" />
      <text x="432" y="59" fill="#fff" fontSize="13">Loan from uncle</text>
      <text x="588" y="59" textAnchor="end" fill="#fff" fontFamily="var(--font-mono)" fontSize="13">$1,000</text>
      <rect x="420" y="76" width="180" height="88" fill="var(--color-ash-700)" />
      <text x="432" y="125" fill={INK} fontSize="13">Maya's money in</text>
      <text x="588" y="125" textAnchor="end" fill={INK} fontFamily="var(--font-mono)" fontSize="13">$2,000</text>
      <rect x="420" y="164" width="180" height="54" fill={EMBER} />
      <text x="432" y="196" fill="#fff" fontSize="13">Profit kept</text>
      <text x="588" y="196" textAnchor="end" fill="#fff" fontFamily="var(--font-mono)" fontSize="13">$1,200</text>

      <text x="30" y="240" fill={INK} fontFamily="var(--font-mono)" fontSize="11">TOTAL $4,200</text>
      <text x="600" y="240" textAnchor="end" fill={INK} fontFamily="var(--font-mono)" fontSize="11">TOTAL $4,200</text>
    </Figure>
  )
}

function CashFigure() {
  return (
    <Figure
      height={252}
      label="Waterfall chart. Cash starts at zero, rises 3,000 dollars from money put in and borrowed, falls 2,400 dollars for the cart, rises 1,600 dollars from selling coffee, and ends at 2,200 dollars."
      cap="Start at zero, follow the money, end at $2,200. That last figure is the cash line on the balance sheet."
    >
      <line x1="30" y1="200" x2="640" y2="200" stroke="var(--color-line-strong)" />
      <text x="30" y="216" fill={MUTE} fontFamily="var(--font-mono)" fontSize="10">$0</text>

      <rect x="70" y="50" width="90" height="150" fill={MOSS} />
      <text x="115" y="42" textAnchor="middle" fill={MOSS} fontFamily="var(--font-mono)" fontSize="11">+$3,000</text>
      <text x="115" y="232" textAnchor="middle" fill={MUTE} fontSize="11.5">money put in</text>
      <text x="115" y="245" textAnchor="middle" fill={MUTE} fontSize="11.5">and borrowed</text>

      <line x1="160" y1="50" x2="230" y2="50" stroke="var(--color-line-strong)" strokeDasharray="3 3" />
      <rect x="230" y="50" width="90" height="120" fill="var(--color-clay-400)" />
      <text x="275" y="42" textAnchor="middle" fill="var(--color-clay-400)" fontFamily="var(--font-mono)" fontSize="11">-$2,400</text>
      <text x="275" y="232" textAnchor="middle" fill={MUTE} fontSize="11.5">bought the cart</text>

      <line x1="320" y1="170" x2="390" y2="170" stroke="var(--color-line-strong)" strokeDasharray="3 3" />
      <rect x="390" y="90" width="90" height="80" fill={MOSS} />
      <text x="435" y="82" textAnchor="middle" fill={MOSS} fontFamily="var(--font-mono)" fontSize="11">+$1,600</text>
      <text x="435" y="232" textAnchor="middle" fill={MUTE} fontSize="11.5">selling coffee</text>

      <line x1="480" y1="90" x2="550" y2="90" stroke="var(--color-line-strong)" strokeDasharray="3 3" />
      <rect x="550" y="90" width="90" height="110" fill={INK} />
      <text x="595" y="82" textAnchor="middle" fill={INK} fontFamily="var(--font-mono)" fontSize="11">$2,200</text>
      <text x="595" y="232" textAnchor="middle" fill={MUTE} fontSize="11.5">left in the bank</text>
    </Figure>
  )
}
