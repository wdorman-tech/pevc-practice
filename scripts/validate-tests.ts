/**
 * Mechanical checks on the five practice tests.
 *
 * Everything here is a rule a machine can settle: shell coverage, option counts,
 * trap alignment, word caps, sign conventions. Judgment calls (is this distractor
 * a real misconception? is the model answer any good?) are not in here.
 *
 * Run with: npx tsx scripts/validate-tests.ts
 */
import { TESTS } from '../src/content/tests'
import { SHELLS, type Item, type PracticeTest } from '../src/content/tests/types'

type Fail = { test: string; shell: string; rule: string; detail: string }

const fails: Fail[] = []
const warns: Fail[] = []

const words = (s: string) => s.trim().split(/\s+/).length
const sentences = (s: string) => s.split(/[.!?]+(?:\s|$)/).filter((x) => x.trim().length > 0).length

function check(cond: boolean, f: Fail, list: Fail[] = fails) {
  if (!cond) list.push(f)
}

for (const test of TESTS) {
  const at = (shell: string, rule: string, detail: string): Fail => ({
    test: `T${test.n}`,
    shell,
    rule,
    detail,
  })

  // ---- form-level ----
  check(test.items.length === SHELLS.length, at('—', 'item-count', `${test.items.length} items, expected ${SHELLS.length}`))
  check(words(test.blurb) < 25, at('—', 'blurb-length', `${words(test.blurb)} words`))
  check(words(test.title) <= 4, at('—', 'title-length', `"${test.title}"`))

  const codes = test.items.map((i) => i.shell)
  SHELLS.forEach((s, n) => {
    check(codes[n] === s.code, at(s.code, 'shell-order', `slot ${n} holds ${codes[n] ?? 'nothing'}`))
  })

  const kindForShell: Record<string, Item['kind']> = {}
  for (const item of test.items) {
    kindForShell[item.shell] = item.kind

    // ---- every item ----
    check(item.rule.length > 0, at(item.shell, 'rule-present', 'empty rule'))
    check(words(item.rule) <= 26, at(item.shell, 'rule-length', `${words(item.rule)} words`))
    check(sentences(item.rule) === 1, at(item.shell, 'rule-one-sentence', `${sentences(item.rule)} sentences`), warns)

    if (item.kind === 'mc') {
      check(item.choices.length === 3, at(item.shell, 'three-options', `${item.choices.length} options`))
      check(
        item.answer >= 0 && item.answer < item.choices.length,
        at(item.shell, 'answer-in-range', `answer=${item.answer}`),
      )
      check(words(item.stem) <= 45, at(item.shell, 'stem-length', `${words(item.stem)} words`))
      check(
        !/\b(NOT|EXCEPT|LEAST)\b/.test(item.stem),
        at(item.shell, 'positive-stem', 'stem contains NOT / EXCEPT / LEAST'),
      )

      // traps must cover exactly the distractors
      const distractors = item.choices.map((_, n) => n).filter((n) => n !== item.answer)
      const trapKeys = Object.keys(item.traps).map(Number).sort()
      check(
        JSON.stringify(trapKeys) === JSON.stringify(distractors.sort()),
        at(item.shell, 'trap-alignment', `traps for [${trapKeys}], distractors are [${distractors}]`),
      )
      for (const k of distractors) {
        check(!!item.traps[k]?.trim(), at(item.shell, 'trap-present', `no trap for option ${k}`))
      }

      // option hygiene
      const lens = item.choices.map(words)
      const lo = Math.min(...lens)
      const hi = Math.max(...lens)
      check(hi <= 12, at(item.shell, 'option-length', `longest option is ${hi} words`), warns)
      check(
        hi <= lo * 1.25 + 1,
        at(item.shell, 'option-balance', `word counts ${lens.join('/')} — key is index ${item.answer}`),
        warns,
      )
      check(
        lens[item.answer] !== hi || lens.filter((l) => l === hi).length > 1,
        at(item.shell, 'key-not-longest', `key is the longest option (${lens.join('/')})`),
      )
      for (const c of item.choices) {
        check(
          !/\b(always|never|only|completely)\b/i.test(c),
          at(item.shell, 'no-absolutes', `"${c}"`),
          warns,
        )
        check(
          !/^(all|none) of the above/i.test(c.trim()),
          at(item.shell, 'no-all-of-the-above', `"${c}"`),
        )
      }
      const dupes = new Set(item.choices.map((c) => c.toLowerCase().trim()))
      check(dupes.size === item.choices.length, at(item.shell, 'distinct-options', 'duplicate option text'))

      check(words(item.why) <= 60, at(item.shell, 'why-length', `${words(item.why)} words`))
      check(sentences(item.why) <= 4, at(item.shell, 'why-sentences', `${sentences(item.why)} sentences`))
    }

    if (item.kind === 'num') {
      check(Number.isFinite(item.answer), at(item.shell, 'answer-numeric', `${item.answer}`))
      check(item.work.length >= 3 && item.work.length <= 6, at(item.shell, 'work-steps', `${item.work.length} steps`))
      for (const w of item.work) {
        check(!!w.label.trim(), at(item.shell, 'work-label', 'empty label'))
        check(
          /[+(-]|^\$?[\d,]/.test(w.value.trim()) || /[a-z]/i.test(w.value),
          at(item.shell, 'work-sign', `"${w.value}" has no explicit sign`),
          warns,
        )
      }
      check(words(item.why) <= 60, at(item.shell, 'why-length', `${words(item.why)} words`))
      check(sentences(item.why) <= 4, at(item.shell, 'why-sentences', `${sentences(item.why)} sentences`))
      check(words(item.stem) <= 60, at(item.shell, 'stem-length', `${words(item.stem)} words`), warns)
    }

    if (item.kind === 'open') {
      check(item.criteria.length === 4, at(item.shell, 'four-criteria', `${item.criteria.length} criteria`))
      check(
        item.clarify.length >= 2,
        at(item.shell, 'clarify-count', `${item.clarify.length} clarifying questions`),
      )
      check(
        item.skeleton.length >= 4 && item.skeleton.length <= 6,
        at(item.shell, 'skeleton-length', `${item.skeleton.length} lines`),
      )
      const mw = words(item.model)
      check(mw >= 110 && mw <= 200, at(item.shell, 'model-length', `${mw} words`))
      check(item.follows.length >= 2, at(item.shell, 'follows-count', `${item.follows.length}`))
      check(item.flags.length >= 1, at(item.shell, 'flags-count', `${item.flags.length}`))
      for (const c of item.criteria) {
        check(
          !/\b(good|strong|clear|well|effective|solid)\b/i.test(c),
          at(item.shell, 'criteria-not-judgment', `"${c}" reads as a rating, not a content point`),
          warns,
        )
      }
    }
  }

  // ---- kinds must match the blueprint ----
  for (const s of SHELLS) {
    const want =
      s.part === 'reason' ? 'open' : ['S09', 'S10', 'S11', 'S12', 'S13'].includes(s.code) ? 'num' : 'mc'
    check(
      kindForShell[s.code] === want,
      at(s.code, 'kind-matches-blueprint', `is ${kindForShell[s.code]}, blueprint says ${want}`),
    )
  }
}

// ---- the format hint must never contain the answer ----
for (const test of TESTS) {
  for (const item of test.items) {
    if (item.kind !== 'num' || !item.format) continue
    const shown = [...item.format.matchAll(/[\d][\d,.]*/g)].map((m) => Number(m[0].replace(/,/g, '')))
    if (shown.includes(item.answer)) {
      fails.push({
        test: `T${test.n}`,
        shell: item.shell,
        rule: 'format-leaks-answer',
        detail: `the worked example in "${item.format}" is the answer`,
      })
    }
  }
}

// ---- cross-form parallelism ----
for (const s of SHELLS) {
  const siblings = TESTS.map((t) => ({ t, item: t.items.find((i) => i.shell === s.code) }))
  const kinds = new Set(siblings.map((x) => x.item?.kind))
  if (kinds.size > 1) {
    fails.push({ test: 'ALL', shell: s.code, rule: 'sibling-kind', detail: `kinds differ: ${[...kinds].join(', ')}` })
  }
  const numSteps = siblings
    .map((x) => (x.item?.kind === 'num' ? x.item.work.length : null))
    .filter((n): n is number => n !== null)
  if (numSteps.length && Math.max(...numSteps) - Math.min(...numSteps) > 2) {
    warns.push({
      test: 'ALL',
      shell: s.code,
      rule: 'sibling-step-count',
      detail: `worked steps range ${Math.min(...numSteps)}–${Math.max(...numSteps)}; a wide gap breaks parallelism`,
    })
  }
}

// ---- siblings must not share a numeric answer ----
// A learner takes all five forms. If S11 returns 8x every time, the later forms
// measure recall of the answer rather than the arithmetic.
for (const s of SHELLS) {
  const answers = TESTS.map((t) => t.items.find((i) => i.shell === s.code)).flatMap((i) =>
    i && i.kind === 'num' ? [i.answer] : [],
  )
  const seen = new Map<number, number>()
  for (const a of answers) seen.set(a, (seen.get(a) ?? 0) + 1)
  for (const [a, n] of seen) {
    if (n > 1) {
      fails.push({
        test: 'ALL',
        shell: s.code,
        rule: 'sibling-answer-collision',
        detail: `${n} forms return ${a} — vary the incidentals, not just the wording`,
      })
    }
  }
}

// ---- the key must not be the same proposition on every form ----
// A learner takes all five. If four forms key to "the balance sheet", the last
// three are free marks for anyone who remembers Test 1, and the distractors on
// them stop functioning. Same for an option that is offered five times and is
// never correct: "never pick that one" becomes a scoring heuristic.
const bag = (t: string) =>
  new Set(
    t
      .toLowerCase()
      .replace(/[^a-z/ ]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2),
  )
const overlap = (a: Set<string>, b: Set<string>) => {
  const shared = [...a].filter((w) => b.has(w)).length
  return shared / Math.max(1, Math.min(a.size, b.size))
}

for (const shell of SHELLS) {
  const mcs = TESTS.map((t) => t.items.find((i) => i.shell === shell.code)).flatMap((i) =>
    i && i.kind === 'mc' ? [i] : [],
  )
  if (mcs.length < 2) continue

  // how many forms key to the same idea as some other form
  const keyText = mcs.map((m) => m.choices[m.answer])
  const keys = keyText.map(bag)
  // Word overlap cannot separate antonyms — "creates value" and "destroys value"
  // share every other word — so it is backed up by the option's opening noun: the
  // statement, the multiple, the margin being named. That signal is only usable
  // when the option actually opens on a name rather than a pronoun.
  const VAGUE = new Set(['it', 'they', 'value', 'price', 'this', 'that', 'you', 'is', 'are'])
  const lead = (t: string) => {
    const w = t.toLowerCase().replace(/[^a-z/ ]/g, '').split(/\s+/).filter(Boolean)
    if (w[0] === 'the' || w[0] === 'a' || w[0] === 'an') w.shift()
    return w[0] ?? ''
  }
  // "It creates value" and "It destroys value" differ by one word out of ten, so
  // word overlap calls them the same proposition. They are opposites. Options
  // that disagree on polarity are never the same key.
  const POLARITY: [RegExp, string][] = [
    [/\b(creates?|rises?|gains?|above|higher|increases?|more)\b/, '+'],
    [/\b(destroys?|falls?|loses?|below|lower|decreases?|less)\b/, '-'],
    [/\b(unchanged|flat|neutral|same)\b/, '0'],
  ]
  const polarity = (t: string) => {
    const low = t.toLowerCase()
    return POLARITY.filter(([re]) => re.test(low))
      .map(([, sign]) => sign)
      .join('')
  }
  const samePolarity = (a: string, b: string) => {
    const [pa, pb] = [polarity(a), polarity(b)]
    return !pa || !pb || pa === pb
  }

  let biggest = 1
  for (let i = 0; i < keys.length; i++) {
    const byWords = keys.filter(
      (k, n) => overlap(keys[i], k) >= 0.6 && samePolarity(keyText[i], keyText[n]),
    ).length
    const head = lead(keyText[i])
    const byLead = VAGUE.has(head)
      ? 0
      : keyText.filter((t) => lead(t) === head && samePolarity(keyText[i], t)).length
    const n = Math.max(byWords, byLead)
    if (n > biggest) biggest = n
  }
  if (biggest >= 4) {
    warns.push({
      test: 'ALL',
      shell: shell.code,
      rule: 'key-repeats-across-forms',
      detail: `${biggest} of ${mcs.length} forms key to the same idea — rotate one onto an untested case`,
    })
  }

  // an option offered on every form that is never the key
  const nonKeys = mcs.map((m) => m.choices.filter((_, n) => n !== m.answer).map(bag))
  for (const candidate of nonKeys[0]) {
    const onEveryForm = nonKeys.every((form) => form.some((o) => overlap(candidate, o) >= 0.6))
    const everKeyed = keys.some((k) => overlap(candidate, k) >= 0.6)
    if (onEveryForm && !everKeyed && mcs.length === TESTS.length) {
      warns.push({
        test: 'ALL',
        shell: shell.code,
        rule: 'dead-distractor',
        detail: `one option appears on all ${mcs.length} forms and is never correct — ruling it out becomes a free heuristic`,
      })
      break
    }
  }
}

// ---- key position balance across a form ----
for (const test of TESTS) {
  const mc = test.items.filter((i): i is Extract<Item, { kind: 'mc' }> => i.kind === 'mc')
  const counts = [0, 0, 0]
  for (const m of mc) counts[m.answer]++
  const worst = Math.max(...counts) / mc.length
  if (worst > 0.6) {
    warns.push({
      test: `T${test.n}`,
      shell: '—',
      rule: 'key-position-balance',
      detail: `authored key sits at one index ${Math.round(worst * 100)}% of the time (runtime shuffles, so cosmetic)`,
    })
  }
}

// ---- duplicate stems across forms ----
const stems = new Map<string, string[]>()
for (const test of TESTS) {
  for (const item of test.items) {
    const norm = item.stem.toLowerCase().replace(/[^a-z ]/g, '').slice(0, 70)
    stems.set(norm, [...(stems.get(norm) ?? []), `T${test.n}/${item.shell}`])
  }
}
for (const [, where] of stems) {
  if (where.length > 1) {
    fails.push({ test: 'ALL', shell: where.join(' '), rule: 'duplicate-stem', detail: 'same stem in two forms' })
  }
}

// ---- report ----
const show = (list: Fail[], head: string) => {
  if (!list.length) return
  console.log(`\n${head} (${list.length})`)
  for (const f of list) console.log(`  ${f.test.padEnd(4)} ${f.shell.padEnd(4)} ${f.rule.padEnd(24)} ${f.detail}`)
}

const counts = TESTS.map((t: PracticeTest) => `T${t.n}: ${t.items.length}`).join('  ')
console.log(`Forms: ${TESTS.length}   Items — ${counts}`)
show(warns, 'WARN')
show(fails, 'FAIL')

if (fails.length === 0) {
  console.log(`\nAll hard checks pass across ${TESTS.reduce((n, t) => n + t.items.length, 0)} items.`)
} else {
  console.log(`\n${fails.length} hard failures.`)
  process.exitCode = 1
}
