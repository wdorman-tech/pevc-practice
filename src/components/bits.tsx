import { useState, type ReactNode } from 'react'

export function Ring({
  value,
  size = 168,
  stroke = 10,
  children,
}: {
  value: number
  size?: number
  stroke?: number
  children?: ReactNode
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value))
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-well)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-ember-500)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
          style={{ transition: 'stroke-dasharray 900ms cubic-bezier(.2,.7,.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  )
}

export function Bar({ value, tone = 'ember' }: { value: number; tone?: 'ember' | 'moss' | 'bone' }) {
  const pct = Math.max(0, Math.min(1, value)) * 100
  const fill =
    tone === 'moss'
      ? 'var(--color-moss-400)'
      : tone === 'bone'
        ? 'var(--color-line-strong)'
        : 'var(--color-ember-500)'
  return (
    <div className="bg-well h-1.5 w-full overflow-hidden rounded-full">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: fill, transition: 'width 800ms cubic-bezier(.2,.7,.2,1)' }}
      />
    </div>
  )
}

export function Chip({
  children,
  active,
  onClick,
  tone = 'default',
}: {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  tone?: 'default' | 'core'
}) {
  const base =
    'font-mono text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border transition-colors'
  const cls = active
    ? 'border-ember-500/45 bg-ember-500/10 text-ember-700'
    : tone === 'core'
      ? 'border-gold-400/35 bg-gold-400/8 text-gold-400'
      : 'border-line text-bone-500 hover:text-bone-300 hover:border-line-strong'
  return onClick ? (
    <button type="button" onClick={onClick} className={`${base} ${cls} cursor-pointer`}>
      {children}
    </button>
  ) : (
    <span className={`${base} ${cls}`}>{children}</span>
  )
}

export function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: ReactNode
  sub?: string
  accent?: boolean
}) {
  return (
    <div className="panel px-5 py-4">
      <div className="label">{label}</div>
      <div
        className={`mt-2 font-display text-4xl leading-none ${accent ? 'text-ember-600' : 'text-bone-100'}`}
      >
        {value}
      </div>
      {sub && <div className="mt-1.5 font-mono text-[11px] text-bone-500">{sub}</div>}
    </div>
  )
}

export function Button({
  children,
  onClick,
  variant = 'ghost',
  full,
  title,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'solid' | 'ghost' | 'quiet'
  full?: boolean
  title?: string
}) {
  const styles: Record<string, string> = {
    solid: 'bg-ember-500 text-white border-ember-500 hover:bg-ember-600 hover:border-ember-600',
    ghost: 'bg-ash-900 text-bone-300 border-line hover:border-ember-500/50 hover:text-bone-100',
    quiet: 'bg-transparent text-bone-500 border-transparent hover:text-bone-300',
  }
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`cursor-pointer rounded-xl border px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-all active:translate-y-px ${styles[variant]} ${full ? 'w-full' : ''}`}
    >
      {children}
    </button>
  )
}

/**
 * The short answer, then the long one on demand. The short version is the thing
 * you say out loud; the rest is only there when it didn't land.
 */
export function Answer({ short, long }: { short: string; long: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <p className="text-bone-100 text-[17px] leading-[1.6]">{short}</p>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-bone-500 hover:text-ember-600 mt-5 cursor-pointer font-mono text-[10px] tracking-[0.16em] uppercase transition-colors"
      >
        {open ? '− Hide the long version' : '+ Long version'}
      </button>
      {open && (
        <div className="mt-5">
          <AnswerBody text={long} />
        </div>
      )}
    </div>
  )
}

/** Renders an answer's paragraphs, giving numbered / dashed lines a hanging indent. */
export function AnswerBody({ text }: { text: string }) {
  const blocks = text.split('\n').filter((line) => line.trim().length > 0)
  return (
    <div className="space-y-3.5 text-[15px] leading-[1.75] text-bone-300">
      {blocks.map((line, i) => {
        const listish = /^(\d+\)|\d+\.|-|•)\s/.test(line.trim())
        const quote = line.trim().startsWith('"')
        return (
          <p
            key={i}
            className={
              quote
                ? 'border-l-2 border-ember-500/50 pl-4 text-bone-100 italic'
                : listish
                  ? 'pl-4 -indent-4 text-bone-300'
                  : ''
            }
          >
            {line}
          </p>
        )
      })}
    </div>
  )
}
