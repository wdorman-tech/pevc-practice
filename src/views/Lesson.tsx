import { useEffect, useState, type ReactNode } from 'react'
import { Btn, Chip, Tick } from '../components/ui'
import {
  CLOSER,
  EVENTS,
  HOW_TO_READ,
  STEPS,
  THREE,
  type Check,
  type Ledger,
  type Note,
} from '../content/lesson'
import type { Store } from '../lib/store'

/* The palette, as the figures use it. Never a hex — the sheet owns the colour. */
const INK = 'var(--ink)'
const MUTE = 'var(--pencil)'
const RULE = 'var(--rule)'
const BAND = 'var(--band)'
const AUDIT = 'var(--audit)'
const STAMP = 'var(--stamp)'
const WHITE = 'var(--white)'
const MONO = 'var(--mono)'
const SERIF = 'var(--serif)'

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
    <>
      <div className="toolbar">
        <div className="chips">
          {STEPS.map((s, n) => (
            <Chip key={s.id} on={n === i} onClick={() => go(n)}>
              <span className="mono chip-c">{s.code}</span>
              {s.nav}
              {done.includes(s.id) && <Tick size={12} />}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mono eyebrow">{step.eyebrow}</div>
      <h1 className="serif h1">{step.h1}</h1>
      <p className="lede">{step.lede}</p>

      {i === 0 && <StartHere />}

      {i === 1 && <IncomeFigure />}
      {i === 2 && <BalanceFigure />}
      {i === 3 && <CashFigure />}

      {step.ledger && <LedgerTable ledger={step.ledger} />}

      {step.notes && (
        <>
          <h2 className="serif h2">{step.notes.h}</h2>
          <Plain items={step.notes.items} />
        </>
      )}

      {step.takeaway && (
        <div className="card band">
          <div className="mono eyebrow">the takeaway</div>
          <p style={{ marginBottom: 0 }}>{step.takeaway}</p>
        </div>
      )}

      <div className="h3 mono">check yourself</div>
      {step.checks.map((c, n) => (
        <QA key={`${step.id}-${n}`} check={c} n={n} />
      ))}

      {i === 3 && (
        <div className="card blue">
          <div className="mono stamp-l">if you remember three sentences</div>
          <p className="serif quote" style={{ marginBottom: 0 }}>
            {CLOSER}
          </p>
        </div>
      )}

      <div className="next">
        <div className="next-l">{step.nextLabel}</div>
        {i < STEPS.length - 1 ? (
          <Btn onClick={() => go(i + 1)}>Continue</Btn>
        ) : (
          <Btn tone="quiet" onClick={() => go(0)}>
            Start over
          </Btn>
        )}
      </div>
    </>
  )
}

/* ---------- step 01 ---------- */

function StartHere() {
  return (
    <>
      <div className="three">
        {THREE.map((t) => (
          <div key={t.label}>
            <div className="mono tri-l">{t.label}</div>
            <div className="serif tri-n">{t.q}</div>
            <div className="tri-p">{t.p}</div>
          </div>
        ))}
      </div>

      <h2 className="serif h2">Meet the business</h2>
      <p>
        We will use one tiny business for all four steps: Maya's coffee cart, first year. Six things
        happened. Every number in this whole lesson comes from these six lines, so read them once and
        the rest will follow.
      </p>

      <div className="story">
        <div className="mono story-h">Maya's coffee cart · year one</div>
        {EVENTS.map((e) => (
          <div key={e.n} className="ev">
            <div className="ev-n">{e.n}</div>
            <div>{e.text}</div>
            <div className="ev-v">{e.value}</div>
          </div>
        ))}
      </div>

      <h2 className="serif h2">How to read the next three steps</h2>
      <Plain items={HOW_TO_READ} />
    </>
  )
}

/* ---------- shared blocks ---------- */

function Plain({ items }: { items: Note[] }) {
  return (
    <div className="plain">
      {items.map((n) => (
        <div key={n.t} className="pl">
          <div className="pl-t">{n.t}</div>
          <div className="pl-d">{n.d}</div>
        </div>
      ))}
    </div>
  )
}

function LedgerTable({ ledger }: { ledger: Ledger }) {
  return (
    <div className="ldgr">
      <div className="ldgr-cap">
        <div className="mono ldgr-t">{ledger.title}</div>
        <div className="mono ldgr-u">{ledger.caption}</div>
      </div>
      <table className="lg">
        <tbody>
          <tr className="hd">
            <td>Line</td>
            <td className="n">Amount</td>
            <td className="why">In plain English</td>
          </tr>
          {ledger.rows.map((r, n) => {
            if (r.tone === 'gap')
              return (
                <tr key={n} className="gap">
                  <td colSpan={3} />
                </tr>
              )
            return (
              <tr key={n} className={r.tone && r.tone !== 'head' ? r.tone : undefined}>
                <td>{r.tone === 'head' ? <b>{r.label}</b> : r.label}</td>
                <td className={r.neg ? 'n neg' : 'n'}>{r.amount ?? ''}</td>
                <td className="why">{r.why ?? ''}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/** One retrieval question. The answer replaces the button, matching the sheet. */
function QA({ check, n }: { check: Check; n: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="qa">
      <div className="mono qa-l">question {n + 1}</div>
      <div className="qa-q">{check.q}</div>
      {open ? <div className="qa-a">{check.a}</div> : <Btn onClick={() => setOpen(true)}>Show answer</Btn>}
    </div>
  )
}

/* ---------- figures ---------- */

function Fig({
  children,
  cap,
  label,
  height,
}: {
  children: ReactNode
  cap: string
  label: string
  height: number
}) {
  return (
    <>
      <svg className="fig" viewBox={`0 0 660 ${height}`} role="img" aria-label={label}>
        {children}
      </svg>
      <p className="figcap">{cap}</p>
    </>
  )
}

function IncomeFigure() {
  // The last block is narrow, so its labels are anchored to the right edge of the
  // bar instead of the left edge of its own block, which would collide.
  const bands = [
    { x: 30, w: 120, v: '$1,000', l: 'coffee supplies', f: BAND, tx: 30, anchor: 'start' },
    { x: 150, w: 180, v: '$1,500', l: 'helper and rent', f: RULE, tx: 150, anchor: 'start' },
    { x: 330, w: 96, v: '$800', l: 'cart wear', f: BAND, tx: 330, anchor: 'start' },
    { x: 426, w: 60, v: '$500', l: 'interest and tax', f: RULE, tx: 426, anchor: 'start' },
    { x: 486, w: 144, v: '$1,200', l: 'profit kept', f: AUDIT, tx: 630, anchor: 'end' },
  ] as const
  return (
    <Fig
      height={140}
      label="Bar showing where each part of Maya's 5,000 dollars of sales went: 1,000 to coffee supplies, 1,500 to wages and rent, 800 to cart wear, 500 to interest and tax, and 1,200 left as profit."
      cap="Every dollar of sales either paid for something or stayed in the business as profit. The red block is what was left."
    >
      <text x="30" y="26" fill={MUTE} fontFamily={MONO} fontSize="10" letterSpacing="1.6">
        WHERE THE $5,000 OF SALES WENT
      </text>
      {bands.map((b) => (
        <g key={b.l}>
          <rect x={b.x} y={40} width={b.w} height={44} fill={b.f} stroke={b.f === AUDIT ? AUDIT : RULE} />
          <text
            x={b.tx}
            y={106}
            textAnchor={b.anchor}
            fill={b.f === AUDIT ? AUDIT : INK}
            fontFamily={MONO}
            fontSize="10"
          >
            {b.v}
          </text>
          <text x={b.tx} y={121} textAnchor={b.anchor} fill={b.f === AUDIT ? AUDIT : MUTE} fontSize="11">
            {b.l}
          </text>
        </g>
      ))}
    </Fig>
  )
}

function BalanceFigure() {
  return (
    <Fig
      height={252}
      label="Two columns of equal height. Assets total 4,200 dollars: cash 2,200, cart 1,600, money owed 200, supplies 200. The other side totals the same 4,200: a 1,000 dollar loan plus 3,200 of owner's equity."
      cap="The red block is the profit from the last step. Profit the business keeps becomes part of what the owner has in it."
    >
      <text x="30" y="24" fill={MUTE} fontFamily={MONO} fontSize="10" letterSpacing="1.6">
        WHAT IT OWNS
      </text>
      <text x="420" y="24" fill={MUTE} fontFamily={MONO} fontSize="10" letterSpacing="1.6">
        WHO PAID FOR IT
      </text>

      <rect x="30" y="32" width="180" height="98" fill={BAND} stroke={RULE} />
      <text x="42" y="86" fill={INK} fontSize="13">
        Cash
      </text>
      <text x="198" y="86" textAnchor="end" fill={INK} fontFamily={MONO} fontSize="13">
        $2,200
      </text>
      <rect x="30" y="130" width="180" height="70" fill={RULE} stroke={RULE} />
      <text x="42" y="170" fill={INK} fontSize="13">
        Cart
      </text>
      <text x="198" y="170" textAnchor="end" fill={INK} fontFamily={MONO} fontSize="13">
        $1,600
      </text>
      <rect x="30" y="200" width="180" height="18" fill={MUTE} stroke={RULE} />
      <text x="218" y="208" fill={MUTE} fontSize="10.5">
        owed by the office $200
      </text>
      <text x="218" y="221" fill={MUTE} fontSize="10.5">
        supplies $200
      </text>

      <text x="380" y="132" textAnchor="middle" fill={AUDIT} fontFamily={SERIF} fontSize="26">
        =
      </text>

      <rect x="420" y="32" width="180" height="44" fill={MUTE} stroke={RULE} />
      <text x="432" y="59" fill={WHITE} fontSize="13">
        Loan from uncle
      </text>
      <text x="588" y="59" textAnchor="end" fill={WHITE} fontFamily={MONO} fontSize="13">
        $1,000
      </text>
      <rect x="420" y="76" width="180" height="88" fill={BAND} stroke={RULE} />
      <text x="432" y="125" fill={INK} fontSize="13">
        Maya's money in
      </text>
      <text x="588" y="125" textAnchor="end" fill={INK} fontFamily={MONO} fontSize="13">
        $2,000
      </text>
      <rect x="420" y="164" width="180" height="54" fill={AUDIT} stroke={AUDIT} />
      <text x="432" y="196" fill={WHITE} fontSize="13">
        Profit kept
      </text>
      <text x="588" y="196" textAnchor="end" fill={WHITE} fontFamily={MONO} fontSize="13">
        $1,200
      </text>

      <text x="30" y="240" fill={INK} fontFamily={MONO} fontSize="11">
        TOTAL $4,200
      </text>
      <text x="600" y="240" textAnchor="end" fill={INK} fontFamily={MONO} fontSize="11">
        TOTAL $4,200
      </text>
    </Fig>
  )
}

function CashFigure() {
  return (
    <Fig
      height={252}
      label="Waterfall chart. Cash starts at zero, rises 3,000 dollars from money put in and borrowed, falls 2,400 dollars for the cart, rises 1,600 dollars from selling coffee, and ends at 2,200 dollars."
      cap="Start at zero, follow the money, end at $2,200. That last figure is the cash line on the balance sheet."
    >
      <line x1="30" y1="200" x2="640" y2="200" stroke={RULE} />
      <text x="30" y="216" fill={MUTE} fontFamily={MONO} fontSize="10">
        $0
      </text>

      <rect x="70" y="50" width="90" height="150" fill={STAMP} />
      <text x="115" y="42" textAnchor="middle" fill={STAMP} fontFamily={MONO} fontSize="11">
        +$3,000
      </text>
      <text x="115" y="232" textAnchor="middle" fill={MUTE} fontSize="11.5">
        money put in
      </text>
      <text x="115" y="245" textAnchor="middle" fill={MUTE} fontSize="11.5">
        and borrowed
      </text>

      <line x1="160" y1="50" x2="230" y2="50" stroke={RULE} strokeDasharray="3 3" />
      <rect x="230" y="50" width="90" height="120" fill={AUDIT} />
      <text x="275" y="42" textAnchor="middle" fill={AUDIT} fontFamily={MONO} fontSize="11">
        -$2,400
      </text>
      <text x="275" y="232" textAnchor="middle" fill={MUTE} fontSize="11.5">
        bought the cart
      </text>

      <line x1="320" y1="170" x2="390" y2="170" stroke={RULE} strokeDasharray="3 3" />
      <rect x="390" y="90" width="90" height="80" fill={STAMP} />
      <text x="435" y="82" textAnchor="middle" fill={STAMP} fontFamily={MONO} fontSize="11">
        +$1,600
      </text>
      <text x="435" y="232" textAnchor="middle" fill={MUTE} fontSize="11.5">
        selling coffee
      </text>

      <line x1="480" y1="90" x2="550" y2="90" stroke={RULE} strokeDasharray="3 3" />
      <rect x="550" y="90" width="90" height="110" fill={INK} />
      <text x="595" y="82" textAnchor="middle" fill={INK} fontFamily={MONO} fontSize="11">
        $2,200
      </text>
      <text x="595" y="232" textAnchor="middle" fill={MUTE} fontSize="11.5">
        left in the bank
      </text>
    </Fig>
  )
}
