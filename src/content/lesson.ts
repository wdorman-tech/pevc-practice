/**
 * "The Big Three" — one tiny business, four steps.
 *
 * Every number in every step comes from the same six events, so the learner is
 * never holding a second story in working memory while trying to learn the
 * first. Each step ends with two retrieval questions that hide their answers
 * until the learner commits.
 */

export type Event = { n: string; text: string; value: string }

export type LedgerRow = {
  label: string
  amount?: string
  why?: string
  /** 'sub' = running subtotal, 'tot' = final total, 'head' = section header, 'gap' = spacer, 'hi' = the linking line */
  tone?: 'sub' | 'tot' | 'head' | 'gap' | 'hi'
  neg?: boolean
}

export type Ledger = { title: string; caption: string; rows: LedgerRow[] }

export type Check = { q: string; a: string }

export type Note = { t: string; d: string }

export type Step = {
  id: string
  code: string
  nav: string
  eyebrow: string
  h1: string
  lede: string
  ledger?: Ledger
  notes?: { h: string; items: Note[] }
  takeaway?: string
  checks: Check[]
  nextLabel: string
}

export const EVENTS: Event[] = [
  { n: '01', text: 'Maya put her own savings into the business.', value: '$2,000' },
  { n: '02', text: 'Her uncle lent the business money, at 10% interest.', value: '$1,000' },
  { n: '03', text: 'She bought a coffee cart that should last 3 years.', value: '$2,400' },
  {
    n: '04',
    text: 'She bought beans and cups. She used $1,000 worth and still has $200 sitting in the storage closet.',
    value: '$1,200',
  },
  {
    n: '05',
    text: 'She sold coffee all year. Customers paid cash for $4,800 of it, and a nearby office runs a tab and still owes $200.',
    value: '$5,000',
  },
  { n: '06', text: 'She paid a helper $1,200 and paid $300 to rent her spot on the sidewalk.', value: '$1,500' },
]

export const THREE = [
  {
    label: 'income statement',
    q: 'Did we make money?',
    p: 'Everything we earned over the year, minus everything it cost us. What is left is profit.',
  },
  {
    label: 'balance sheet',
    q: 'What do we own and owe?',
    p: 'A snapshot of everything the business has and everything it owes, as of today.',
  },
  {
    label: 'cash flow statement',
    q: 'Where did the cash go?',
    p: 'Actual money in and out of the bank account over the year. No opinions, just the bank.',
  },
]

export const HOW_TO_READ: Note[] = [
  {
    t: 'Each step has one job',
    d: 'One statement per step. Finish one before starting the next, since each one uses the one before it.',
  },
  {
    t: 'Same six events every time',
    d: 'You will see the same story from three angles. Nothing new gets added.',
  },
  {
    t: 'Answer before you peek',
    d: 'Every step ends with two questions. Try to answer them in your head first, then reveal the answer. Trying to recall it is what makes it stick.',
  },
]

export const STEPS: Step[] = [
  {
    id: 't1',
    code: '01',
    nav: 'Start here',
    eyebrow: '01 · start here',
    h1: 'Three reports, three questions.',
    lede:
      'Every business, from a coffee cart to Apple, reports on itself with the same three documents. Each one answers a different question, and you need all three because a business can look good on one and bad on another.',
    takeaway:
      'You record something when it happens, not when the money moves. The office drank $200 of coffee in December and will pay in January, so Maya earned that $200 in December even though the cash is not there yet. This is called accrual accounting, and it is the whole reason the cash flow statement has to exist separately: profit and cash are two different things on two different schedules.',
    checks: [
      {
        q: 'The office drinks $200 of coffee in December and pays in January. Which year counts it as a sale?',
        a: 'December, the year Maya actually served the coffee. The cash arriving in January is a separate event, and it will show up on the cash flow statement instead.',
      },
      {
        q: 'You want to know whether the business owns anything valuable right now. Which of the three do you open?',
        a: 'The balance sheet. It is the only one that lists what the business owns and owes, and it describes this moment rather than the year that just passed.',
      },
    ],
    nextLabel: 'Next: did the coffee cart make money?',
  },
  {
    id: 't2',
    code: '02',
    nav: 'Income',
    eyebrow: '02 · income statement',
    h1: 'Did we make money this year?',
    lede:
      'Start with everything you sold. Subtract every cost of selling it. Whatever survives at the bottom is profit. That is the entire statement, and the only difficulty is remembering which costs come off in which order.',
    ledger: {
      title: 'Income statement',
      caption: "Maya's coffee cart · year one",
      rows: [
        { label: 'Sales', amount: '$5,000', why: 'All the coffee she served, paid for or not' },
        { label: 'Cost of coffee supplies', amount: '($1,000)', neg: true, why: 'Only the beans and cups she actually used' },
        { label: 'Gross profit', amount: '$4,000', tone: 'sub', why: 'What each cup earns before the other bills' },
        { label: "Helper's wages", amount: '($1,200)', neg: true, why: 'Cost of running the cart' },
        { label: 'Rent for the spot', amount: '($300)', neg: true, why: 'Cost of running the cart' },
        { label: 'Cart wear (depreciation)', amount: '($800)', neg: true, why: 'One third of the $2,400 cart, used up this year' },
        { label: 'Operating profit', amount: '$1,700', tone: 'sub', why: 'Profit from selling coffee' },
        { label: 'Interest on the loan', amount: '($100)', neg: true, why: 'The cost of borrowing from her uncle' },
        { label: 'Profit before tax', amount: '$1,600', tone: 'sub', why: 'What the tax is calculated on' },
        { label: 'Tax at 25%', amount: '($400)', neg: true, why: "The government's share" },
        { label: 'Net income (profit)', amount: '$1,200', tone: 'tot', why: 'Hers to keep or reinvest' },
      ],
    },
    notes: {
      h: 'The two lines beginners trip on',
      items: [
        {
          t: 'Cart wear, $800',
          d: 'The cart cost $2,400 and will last three years, so one third of it gets used up each year. Accountants call that depreciation. No money left the bank this year for it, because Maya paid the full $2,400 up front. It appears here anyway, because the cart really is a third more worn out than when she bought it.',
        },
        {
          t: 'Coffee supplies, $1,000',
          d: 'She spent $1,200 on beans and cups but only used $1,000 worth. The leftover $200 is still hers, sitting in the closet, so it is not a cost yet. It waits on the balance sheet until she brews it.',
        },
      ],
    },
    takeaway:
      'The income statement counts sales she has earned and costs she has used up. Neither of those has to match what happened in the bank account this year, which is why $1,200 of profit does not mean $1,200 more cash.',
    checks: [
      {
        q: 'The cart cost $2,400 and lasts three years. How much of it is a cost this year, and where does the rest go?',
        a: '$800 this year. The other $1,600 becomes a cost in years two and three, $800 at a time. Until then it sits on the balance sheet as something the business owns.',
      },
      {
        q: 'She sold $5,000 of coffee. Why is her profit only $1,200?',
        a: 'Because $3,800 of it went to costs: $1,000 of supplies, $1,500 for the helper and the rent, $800 of cart wear, $100 of interest, and $400 of tax. Sales are what came in the door, and profit is what survives all of that.',
      },
    ],
    nextLabel: 'Next: what does the business own after all that?',
  },
  {
    id: 't3',
    code: '03',
    nav: 'Balance',
    eyebrow: '03 · balance sheet',
    h1: 'What do we own, and what do we owe?',
    lede:
      'A photograph taken on the last day of the year. The left side lists everything the business has. The right side explains who paid for it: the people it borrowed from, and the owner. The two sides always come to the same total, which is where the name comes from.',
    ledger: {
      title: 'Balance sheet',
      caption: "Maya's coffee cart · last day of year one",
      rows: [
        { label: 'What the business owns', tone: 'head' },
        { label: 'Cash in the bank', amount: '$2,200', why: 'Straight from the cash flow statement' },
        { label: 'Money owed by the office', amount: '$200', why: 'The tab from December, still unpaid' },
        { label: 'Supplies in the closet', amount: '$200', why: 'Beans and cups not yet used' },
        { label: 'Cart, after one year of wear', amount: '$1,600', why: '$2,400 cost less $800 used up' },
        { label: 'Total', amount: '$4,200', tone: 'tot' },
        { label: '', tone: 'gap' },
        { label: "What it owes, and what is the owner's", tone: 'head' },
        { label: 'Loan from her uncle', amount: '$1,000', why: 'Has to be paid back' },
        { label: "Maya's money in", amount: '$2,000', why: 'What she put in at the start' },
        { label: 'Profit kept in the business', amount: '$1,200', tone: 'hi', why: 'The bottom line of the income statement' },
        { label: 'Total', amount: '$4,200', tone: 'tot' },
      ],
    },
    notes: {
      h: 'Two things to understand about it',
      items: [
        {
          t: 'It always balances',
          d: 'Everything the business owns was paid for by somebody: a lender or the owner. So the list of things owned and the list of claims on them are two ways of counting the same pile. If they do not match, something was recorded wrong.',
        },
        {
          t: 'Equity is what is left over',
          d: "Maya's share, called equity, is $4,200 of stuff minus $1,000 of debt, which is $3,200. It is a leftover, not a bank balance. She has $3,200 in the business and only $2,200 of it is cash.",
        },
      ],
    },
    takeaway:
      'The income statement covers a year, and this covers a single day. Take it again tomorrow and every number can be different.',
    checks: [
      {
        q: 'The business owns $4,200 of things and owes $1,000. What is Maya’s equity, and how did you get it?',
        a: '$3,200, from $4,200 minus $1,000. Equity is whatever is left for the owner after everyone the business owes has been paid.',
      },
      {
        q: 'Maya’s equity is $3,200. Does that mean she can take $3,200 out of the bank today?',
        a: 'No. Only $2,200 is cash. The rest of her $3,200 is the cart, the supplies in the closet, and the $200 the office still owes. She would have to sell or collect those first.',
      },
    ],
    nextLabel: 'Next: profit was $1,200, so why is there $2,200 in the bank?',
  },
  {
    id: 't4',
    code: '04',
    nav: 'Cash flow',
    eyebrow: '04 · cash flow statement',
    h1: 'Where did the money actually go?',
    lede:
      'This one ignores earning and owing. It tracks the bank account: money in, money out, in three groups. Businesses fail when they run out of cash even while showing a profit, so this is the statement that keeps everyone honest.',
    ledger: {
      title: 'Cash flow statement',
      caption: "Maya's coffee cart · year one",
      rows: [
        { label: 'From running the business', tone: 'head', why: 'Day to day coffee selling' },
        { label: 'Profit for the year', amount: '$1,200', why: 'Start with the income statement' },
        { label: 'Add back cart wear', amount: '$800', why: 'A cost, but no money left the bank' },
        { label: 'Money the office still owes', amount: '($200)', neg: true, why: 'Counted as a sale, never collected' },
        { label: 'Supplies still in the closet', amount: '($200)', neg: true, why: 'Paid for, not used yet' },
        { label: 'Cash from running the business', amount: '$1,600', tone: 'sub' },
        { label: '', tone: 'gap' },
        { label: 'From buying things that last', tone: 'head', why: 'Equipment, not everyday supplies' },
        { label: 'Bought the cart', amount: '($2,400)', neg: true, why: 'Paid in full, up front' },
        { label: 'Cash used on equipment', amount: '($2,400)', neg: true, tone: 'sub' },
        { label: '', tone: 'gap' },
        { label: 'From funding the business', tone: 'head', why: 'Money from the owner and lenders' },
        { label: "Maya's savings put in", amount: '$2,000', why: 'Not a sale, so it is not income' },
        { label: 'Loan from her uncle', amount: '$1,000', why: 'Borrowing is not income either' },
        { label: 'Cash from funding', amount: '$3,000', tone: 'sub' },
        { label: '', tone: 'gap' },
        { label: 'Cash at the start of the year', amount: '$0', why: 'Brand new business' },
        { label: 'Cash at the end of the year', amount: '$2,200', tone: 'tot', why: 'Matches the balance sheet' },
      ],
    },
    notes: {
      h: 'Why profit was $1,200 but cash from the business was $1,600',
      items: [
        { t: 'Cart wear, add $800', d: 'It was subtracted as a cost on the income statement, but no money moved. Add it back.' },
        { t: 'The office tab, subtract $200', d: 'Counted as a sale, but the cash has not arrived yet.' },
        {
          t: 'Leftover supplies, subtract $200',
          d: 'She paid for them, and they are not a cost yet because she has not used them.',
        },
        {
          t: 'The cart and the loan, kept separate',
          d: 'Buying equipment and borrowing money are real cash movements, so they get their own sections instead of being mixed into the everyday running of the business.',
        },
      ],
    },
    takeaway:
      'Profit of $1,200 is the first line of the cash flow statement and the addition to the owner’s side of the balance sheet. Ending cash of $2,200 is the cash line at the top of the balance sheet. Those three links are the whole model.',
    checks: [
      {
        q: 'Profit was $1,200 but the business brought in $1,600 of cash from selling coffee. Give the biggest single reason.',
        a: 'The $800 of cart wear. It was subtracted to work out profit, but no money actually left the bank for it this year, so it gets added back when you are counting cash.',
      },
      {
        q: 'Where else in the three statements does the $2,200 of ending cash appear?',
        a: 'As the first line of the balance sheet, under what the business owns. Those two numbers are always the same, and checking that they match is the fastest way to catch a mistake.',
      },
    ],
    nextLabel: 'Three sentences to carry out of here',
  },
]

export const CLOSER =
  'The income statement says whether a year was profitable. The balance sheet says what the business owns and owes on one day. The cash flow statement says what happened in the bank account, which is not the same thing as profit.'
