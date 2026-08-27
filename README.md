# The Tick Sheet

Interview prep for Wharton finance-club first rounds, aimed at freshmen about a month into the
degree. Two pieces of teaching and five practice tests over the same material.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build
npm run lint
npm run validate  # checks all 100 test items against the item-writing contract
```

Or double-click **Start The Tick Sheet.command**, which installs, builds and serves
the built app without a terminal.

## What is in it

| Section | What it does |
|---|---|
| **Brief** | What these interviews actually measure, and the four beats to run on every question. |
| **The Big Three** | A four-step lesson on the income statement, balance sheet and cash flow statement, built on one coffee cart and six events. Every number in all four steps comes from those six events. |
| **Concepts** | 72 terms across six modules. Each carries the definition and the one line about it a first-year usually cannot say. |
| **Cards** | The same 72 as recall practice. Term first, definition out loud, then flip. |
| **Gym** | 23 open questions with no formula behind them. Structure before answer, because the structure is what is graded. |
| **Math** | Two-minute mental-arithmetic sprints on the arithmetic that shows up mid-answer. |
| **Mock** | Five drawn questions, a running clock, model answers withheld until you commit. |
| **Tests** | Five practice tests. See below. |
| **Progress** | Local-only record of ticks, scores and sittings. |

## The five tests are parallel forms, not five difficulties

Every test fills the same twenty **shells** — defined in `src/content/tests/types.ts` — in the same
order at the same difficulty. A shell fixes the *radicals* (which statement, which direction a sign
flips, how many arithmetic steps) and leaves the *incidentals* free (the company, the industry, the
numbers). Each test draws its companies from a different sector so five sittings do not feel like one
sitting repeated.

That design is the point: the difference between a learner's first score and their fifth is learning
rather than a lucky draw.

Structure of each test — 20 items, roughly 30 minutes:

- **Part one, know it** — 8 multiple choice on definitions and distinctions.
- **Part two, use it** — 5 numeric, 3 applied multiple choice. Auto-scored, out of 16 with part one.
- **Part three, reason it** — 4 open questions. You write an answer, commit it, then score yourself
  against four binary criteria and a model answer.

## Why the tests behave the way they do

The item and feedback design follows the assessment literature rather than convention:

- **Three options per multiple-choice item, not four.** Rodriguez's meta-analysis of eighty years of
  item data finds three optimal — a fourth distractor is usually non-functioning, and the effort
  saved buys wider coverage.
- **Every distractor encodes a named misconception**, and the feedback names the specific error
  behind the option you picked rather than only the answer (Haladyna, Downing & Rodriguez).
- **Immediate, directive feedback**, in a fixed order: verdict and key, why the key is right, the
  error behind your choice, then one portable rule. The spacing benefit is captured by the five-form
  schedule instead of by withholding feedback (Butler, Karpicke & Roediger; Shute).
- **A confidence tap before each answer.** A high-confidence miss is flagged back to you, because a
  confidently held error is the one most likely to come out of your mouth in the room (Metcalfe's
  hypercorrection effect).
- **Numeric items show a worked-example ledger** with explicit signs, not prose. For a novice
  acquiring a procedure, studying the worked example beats attempting the problem (Sweller & Cooper).
- **Open items use binary analytic checklists, not a rating scale.** Learners self-score usably well
  on "did I say this?" and badly on "how good was that?", and weaker performers overestimate most
  (León, Panadero & García-Martínez).
- **Explanations are capped** at roughly four sentences. Mayer's coherence principle held in 23 of 23
  experiments: interesting-but-irrelevant content actively harms transfer.

## Layout

```
src/
  content/
    lesson.ts        The Big Three, as data
    concepts.ts      72 terms, six modules
    gym.ts           23 open questions with structure and model answers
    brief.ts         principles, the four beats, the summer list
    mathgen.ts       mental-math generators
    tests/
      types.ts       item types + the 20-shell blueprint
      test1..5.ts    the five parallel forms
  views/             one file per section
  lib/store.ts       localStorage progress
  components/bits.tsx
```

Progress lives in `localStorage` under `ticksheet:v2` and nowhere else. No accounts, no backend.

## The validator

`npm run validate` is the guardrail on the content. It settles everything a machine
can settle and stays out of everything it cannot:

- shell coverage, order, and kind against the blueprint
- exactly three options, one key, traps keyed to exactly the two distractors
- option homogeneity, length balance, and that the key is never uniquely longest
- stem, `why` and `rule` word and sentence caps
- worked-example ledgers carry explicit signs
- **the format hint never contains the answer** — this silently voided most of the
  numeric section before it was caught
- **no two forms return the same answer for the same shell** — otherwise the later
  forms measure recall of a number rather than the arithmetic
- no stem repeats across forms

Whether a distractor encodes a misconception a real learner holds, and whether a
model answer is any good, are judgment calls and are deliberately not in there.
