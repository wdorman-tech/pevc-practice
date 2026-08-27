import { useId, useState, type ReactNode } from 'react'

/**
 * Every repeated block in the app lives here once. If two views draw the same
 * thing — a tick, a chip row, a gated model answer, a self-scoring checklist —
 * they call the same function, so there is one place to change it.
 */

export function Tick({ on = true, size = 15 }: { on?: boolean; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={on ? 'tick tick-on' : 'tick'}
      aria-hidden
    >
      <path
        d="M2.5 13 L8.8 20 L21.5 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TickBox({
  on,
  onClick,
  label,
}: {
  on: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      className={on ? 'tickbtn on' : 'tickbtn'}
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
    >
      <Tick on={on} />
    </button>
  )
}

export function Btn({
  children,
  onClick,
  tone,
  disabled,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  tone?: 'red' | 'quiet'
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      className={tone ? `btn ${tone}` : 'btn'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function Chip({
  children,
  on,
  onClick,
}: {
  children: ReactNode
  on: boolean
  onClick: () => void
}) {
  return (
    <button type="button" className={on ? 'chip on' : 'chip'} onClick={onClick}>
      {children}
    </button>
  )
}

/** A row of filter chips: "All", then one per option. Used by concepts and cards. */
export function ChipRow<T extends string>({
  options,
  value,
  onPick,
  allLabel = 'All',
}: {
  options: { id: T; label: string; code?: string }[]
  value: T | 'all'
  onPick: (v: T | 'all') => void
  allLabel?: string
}) {
  return (
    <div className="chips">
      <Chip on={value === 'all'} onClick={() => onPick('all')}>
        {allLabel}
      </Chip>
      {options.map((o) => (
        <Chip key={o.id} on={value === o.id} onClick={() => onPick(o.id)}>
          {o.code && <span className="mono chip-c">{o.code}</span>}
          {o.label}
        </Chip>
      ))}
    </div>
  )
}

/** A labelled disclosure. Closed by default; the label flips when it opens. */
export function Reveal({
  show,
  hide,
  children,
  tone = 'quiet',
}: {
  show: string
  hide?: string
  children: ReactNode
  tone?: 'red' | 'quiet'
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="disc">
      <Btn tone={tone} onClick={() => setOpen(!open)}>
        {open ? (hide ?? 'Hide') : show}
      </Btn>
      {open && <div className="disc-body">{children}</div>}
    </div>
  )
}

/**
 * Commit before you compare. The model answer stays behind this until the
 * learner says they have answered, because reading a model answer you have not
 * attempted teaches almost nothing.
 */
export function Gate({
  prompt,
  action,
  children,
}: {
  prompt: string
  action: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  if (open) return <>{children}</>
  return (
    <div className="gate">
      <div className="gate-t">{prompt}</div>
      <Btn tone="red" onClick={() => setOpen(true)}>
        {action}
      </Btn>
    </div>
  )
}

export function ModelAnswer({
  model,
  follows,
  flags,
  label = 'one strong version',
}: {
  model: string
  follows: string[]
  flags: string[]
  label?: string
}) {
  return (
    <div className="model">
      <div className="mono eyebrow">{label}</div>
      <p className="model-p">{model}</p>
      <div className="two">
        <div>
          <div className="mono eyebrow">they will follow with</div>
          <ul className="list">
            {follows.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mono eyebrow">how candidates lose it</div>
          <ul className="list red-list">
            {flags.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/**
 * Binary self-scoring. Learners judge "did I say this?" reliably and "how good
 * was that?" badly, so every self-assessment in the app is a checklist rather
 * than a rating.
 */
export function Checklist({
  title,
  items,
  hits,
  onToggle,
}: {
  title: string
  items: string[]
  hits: boolean[]
  onToggle: (n: number) => void
}) {
  return (
    <div className="scoring">
      <div className="mono eyebrow">{title}</div>
      {items.map((s, n) => (
        <button
          key={s}
          type="button"
          className={hits[n] ? 'scorebtn on' : 'scorebtn'}
          onClick={() => onToggle(n)}
          aria-pressed={hits[n]}
        >
          <span className="sc-n">{hits[n] ? <Tick size={13} /> : n + 1}</span>
          <span>{s}</span>
        </button>
      ))}
      <div className="mono counter" style={{ marginTop: 10 }}>
        {hits.filter(Boolean).length} of {items.length} · be honest, nobody sees this
      </div>
    </div>
  )
}

/** The question head shared by the gym, the mock and the reason half of a test. */
export function QuestionHead({
  cat,
  ticked,
  question,
  tests,
  big,
}: {
  cat: string
  ticked?: boolean
  question: string
  tests?: string
  big?: boolean
}) {
  return (
    <>
      <div className="q-head">
        <span className="mono q-cat">{cat}</span>
        {ticked && (
          <span className="q-ticked mono">
            <Tick size={13} /> ticked
          </span>
        )}
      </div>
      <div className={big ? 'serif q-text big-q' : 'serif q-text'}>{question}</div>
      {tests && (
        <div className="q-tests">
          <span className="mono edge-tag">testing</span>
          {tests}
        </div>
      )}
    </>
  )
}

export function Clarify({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <div className="q-sec">
      <div className="mono eyebrow">ask first</div>
      <ul className="list">
        {items.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export function Skeleton({ items }: { items: string[] }) {
  return (
    <ol className="list num">
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ol>
  )
}

/** A search box that labels itself. */
export function Search({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  const id = useId()
  return (
    <>
      <label htmlFor={id} className="hidden">
        {placeholder}
      </label>
      <input
        id={id}
        className="search mono"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </>
  )
}
