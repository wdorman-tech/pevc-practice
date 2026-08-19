/**
 * Worked modeling problems — the ones an interviewer asks with a blank sheet of paper
 * and no Excel. Every number here is internally consistent; the arithmetic in the steps
 * reproduces the stated answer.
 */

export type GroupId = 'lbo' | 'statements' | 'valuation' | 'ma' | 'vc'

export type Given = { label: string; value: string; note?: string }

export type Table = { head: string[]; rows: string[][] }

export type Step = {
  title: string
  body: string[]
  table?: Table
  /** The sentence you actually say out loud while your pencil moves. */
  say?: string
}

export type Technical = {
  id: string
  group: GroupId
  title: string
  tag: string
  minutes: number
  level: 'warm-up' | 'core' | 'stretch'
  prompt: string
  givens: Given[]
  steps: Step[]
  answer: string[]
  traps: string[]
  followups: string[]
}

export const GROUPS: { id: GroupId; label: string; blurb: string }[] = [
  {
    id: 'lbo',
    label: 'LBO mechanics',
    blurb: 'Paper LBO, sources & uses, the returns bridge, credit stats.',
  },
  {
    id: 'statements',
    label: 'Three statements',
    blurb: 'The linkage questions. Change one line, walk all three.',
  },
  {
    id: 'valuation',
    label: 'Valuation',
    blurb: 'DCF built by hand, WACC, the enterprise-to-equity bridge.',
  },
  { id: 'ma', label: 'M&A math', blurb: 'Accretion / dilution and the yield shortcut.' },
  { id: 'vc', label: 'VC / cap table', blurb: 'Pre vs post, the pool shuffle, preference waterfalls.' },
]

export const TECHNICALS: Technical[] = [
  // ─────────────────────────────────────────────────────────── LBO
  {
    id: 'paper-lbo',
    group: 'lbo',
    title: 'The paper LBO',
    tag: 'No calculator, 10 minutes',
    minutes: 10,
    level: 'core',
    prompt:
      'A sponsor buys a business for 10.0x LTM EBITDA, funds it 50/50 debt and equity, and exits in five years at the same multiple. All free cash flow sweeps the debt. What is the money multiple and IRR?',
    givens: [
      { label: 'Revenue (LTM)', value: '$500M' },
      { label: 'EBITDA margin', value: '20%', note: 'holds flat through the hold' },
      { label: 'LTM EBITDA', value: '$100M' },
      { label: 'Entry multiple', value: '10.0x TEV / EBITDA' },
      { label: 'Revenue growth', value: '10% per year' },
      { label: 'D&A', value: '$25M/yr', note: 'flat' },
      { label: 'Capex', value: '$25M/yr', note: 'flat' },
      { label: 'Change in NWC', value: '$0' },
      { label: 'Debt at close', value: '5.0x = $500M @ 10%' },
      { label: 'Tax rate', value: '25%' },
      { label: 'Exit', value: 'Year 5 at 10.0x, 100% cash sweep' },
    ],
    steps: [
      {
        title: 'Size the entry — TEV, debt, and the equity check',
        body: [
          'TEV = 10.0x × $100M EBITDA = $1,000M.',
          'Debt = 5.0x × $100M = $500M. Sponsor equity = $1,000M − $500M = $500M.',
          'Ignore fees unless the prompt gives them. If it does, fees are a use of funds and the equity check goes up, not the purchase price.',
        ],
        say: 'Thousand of enterprise value, five hundred of debt, five hundred equity check.',
      },
      {
        title: 'Grow EBITDA — margin flat means EBITDA compounds with revenue',
        body: [
          'Margin is constant, so skip revenue entirely and grow EBITDA at 10%.',
          '$100 → 110.0 → 121.0 → 133.1 → 146.4 → 161.1 by Year 5.',
          'Say the compounding out loud in tens: 110, 121, 133, 146, 161. Interviewers will let you round.',
        ],
        say: 'Margin is flat, so I can grow EBITDA directly and skip the revenue line.',
      },
      {
        title: 'Build the cash flow — D&A and capex cancel, so FCF = net income',
        body: [
          'EBIT = EBITDA − $25M D&A. Interest = 10% on the beginning-of-year debt balance.',
          'Net income = (EBIT − interest) × 75%.',
          'FCF = NI + D&A − capex − ΔNWC. D&A and capex are both $25M and NWC is flat, so FCF = net income. Say that — it saves you a line of arithmetic every year.',
        ],
        table: {
          head: ['$M', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5'],
          rows: [
            ['EBITDA', '110.0', '121.0', '133.1', '146.4', '161.1'],
            ['− D&A', '(25.0)', '(25.0)', '(25.0)', '(25.0)', '(25.0)'],
            ['EBIT', '85.0', '96.0', '108.1', '121.4', '136.1'],
            ['− Interest', '(50.0)', '(47.4)', '(43.7)', '(38.9)', '(32.7)'],
            ['Pre-tax', '35.0', '48.6', '64.4', '82.5', '103.4'],
            ['− Tax @ 25%', '(8.8)', '(12.2)', '(16.1)', '(20.6)', '(25.9)'],
            ['Net income = FCF', '26.3', '36.5', '48.3', '61.9', '77.5'],
            ['Debt, end of year', '473.8', '437.3', '389.0', '327.1', '249.6'],
          ],
        },
        say: 'Capex equals D&A and working capital is flat, so free cash flow is just net income.',
      },
      {
        title: 'Exit — value the business, then subtract what is left of the debt',
        body: [
          'Exit TEV = 10.0x × $161.1M = $1,611M.',
          'Net debt at exit = $249.6M. The sweep is 100%, so there is no cash balance to add back.',
          'Exit equity = $1,611M − $250M = $1,361M.',
        ],
        say: 'Same multiple on higher EBITDA, less the debt we paid down.',
      },
      {
        title: 'Returns — multiple first, then IRR off the multiple',
        body: [
          'MoM = $1,361M / $500M = 2.7x.',
          'IRR: 2.7x over five years. Anchor on the marks you have memorized — 2.0x is ~15%, 2.5x is ~20%, 3.0x is ~25%. 2.7x sits just above 2.5x, so call it low-20s.',
          'Exact answer is 22.2%. "About 2.7 times, low-twenties IRR" is a complete answer.',
        ],
        say: 'Two-point-seven times over five years, so roughly a 22% IRR — clears the fund hurdle.',
      },
    ],
    answer: [
      '2.7x MoM and a ~22% IRR ($1,361M of exit equity on a $500M check).',
      'Roughly $611M of the $861M gain comes from EBITDA growth and $250M from debt paydown — no multiple expansion assumed.',
    ],
    traps: [
      'Forgetting that a flat margin lets you compound EBITDA directly — people waste two minutes on a revenue line they never use.',
      'Computing interest on the ending balance. Use the beginning balance, or flat on the original balance if you say so out loud.',
      'Adding back the swept cash at exit. If the sweep is 100%, cash is zero and net debt is the remaining balance.',
      'Taxing EBITDA instead of EBT. Interest is deductible — that is half the point of the structure.',
      'Quoting an IRR to the decimal. Give the multiple precisely and the IRR as a range.',
    ],
    followups: [
      'What if the exit multiple compresses to 8.0x — do you still clear 20%?',
      'How much would EBITDA have to fall before the equity is worth zero?',
      'Rank the three levers of return here and tell me which one you actually control.',
    ],
  },

  {
    id: 'returns-bridge',
    group: 'lbo',
    title: 'The value-creation bridge',
    tag: 'Attribute the return to its three sources',
    minutes: 5,
    level: 'core',
    prompt:
      'Take the same deal. Decompose the equity gain into EBITDA growth, multiple change, and debt paydown — first at a flat 10.0x exit, then at an 9.0x exit.',
    givens: [
      { label: 'Entry equity', value: '$500M' },
      { label: 'Entry EBITDA / multiple', value: '$100M @ 10.0x' },
      { label: 'Exit EBITDA', value: '$161M' },
      { label: 'Net debt: entry → exit', value: '$500M → $250M' },
    ],
    steps: [
      {
        title: 'Know the three buckets before you touch a number',
        body: [
          'EBITDA growth = ΔEBITDA × entry multiple. Hold the multiple constant so growth gets no credit for re-rating.',
          'Multiple change = ΔMultiple × exit EBITDA.',
          'Debt paydown = entry net debt − exit net debt. This is just cumulative free cash flow when there is no dividend.',
          'The three plus entry equity must tie to exit equity. If they do not, you double-counted the multiple.',
        ],
        say: 'Growth at the entry multiple, re-rating on the exit EBITDA, and cash flow as the third leg.',
      },
      {
        title: 'Flat 10.0x exit',
        body: [
          'Growth: ($161M − $100M) × 10.0x = $611M.',
          'Multiple: 0.0x × $161M = $0M.',
          'Deleveraging: $500M − $250M = $250M.',
          'Check: $500 + 611 + 0 + 250 = $1,361M of exit equity. Ties.',
        ],
        table: {
          head: ['Bucket', '$M', '% of gain'],
          rows: [
            ['EBITDA growth', '611', '71%'],
            ['Multiple change', '0', '0%'],
            ['Debt paydown', '250', '29%'],
            ['Total gain', '861', '100%'],
          ],
        },
      },
      {
        title: 'Now compress the exit to 9.0x',
        body: [
          'Multiple: (9.0x − 10.0x) × $161M = −$161M.',
          'Exit equity = $1,449M − $250M = $1,200M. MoM = 2.4x, IRR ≈ 19%.',
          'One turn of compression costs you roughly three points of IRR here — that is the sensitivity worth quoting.',
        ],
        say: 'A turn of compression is 161 of equity, about three points of IRR. That is the number I would stress first.',
      },
    ],
    answer: [
      'Flat exit: 71% of the gain is EBITDA growth, 29% is deleveraging, zero from the multiple.',
      'At 9.0x: gain falls from $861M to $700M, 2.4x and ~19% IRR.',
    ],
    traps: [
      'Multiplying the multiple change by entry EBITDA. It is exit EBITDA — the re-rating applies to the business you are actually selling.',
      'Counting cash flow twice: once as debt paydown and again inside a cash balance.',
      'Calling deleveraging "value creation." It is a transfer from lenders to equity, funded by the operating cash flow you already counted.',
    ],
    followups: [
      'Which bucket does a sponsor actually underwrite to, and which is the market handing you a gift?',
      'If the entry multiple were 12x instead of 10x, does the growth bucket get bigger or smaller?',
    ],
  },

  {
    id: 'sources-uses',
    group: 'lbo',
    title: 'Sources & uses at close',
    tag: 'What the equity check actually is',
    minutes: 6,
    level: 'core',
    prompt:
      'You are buying a company at 9.0x $80M of EBITDA. It has $150M of gross debt and no cash, management rolls $20M, and you need $10M of cash on the balance sheet at close. Build sources and uses and tell me the sponsor check.',
    givens: [
      { label: 'EBITDA', value: '$80M' },
      { label: 'Entry TEV', value: '9.0x = $720M' },
      { label: 'Existing gross debt / cash', value: '$150M / $0M' },
      { label: 'Financing fees', value: '$20M' },
      { label: 'Advisory + other fees', value: '$10M' },
      { label: 'Minimum cash at close', value: '$10M' },
      { label: 'New debt', value: 'TLB 4.0x + notes 1.0x' },
      { label: 'Management rollover', value: '$20M' },
    ],
    steps: [
      {
        title: 'Uses — start from equity purchase price, not TEV',
        body: [
          'Equity purchase price = TEV − net debt = $720M − $150M = $570M. That is the cash to the selling shareholders.',
          'Then add everything else the wire has to cover: repay the existing $150M of debt, $20M of financing fees, $10M of advisory fees, $10M of cash to the balance sheet.',
          'Total uses = 570 + 150 + 20 + 10 + 10 = $760M.',
        ],
        say: 'TEV less net debt is what the sellers get; the fees and the refinancing sit on top.',
      },
      {
        title: 'Sources — debt first, rollover second, sponsor plugs the hole',
        body: [
          'TLB 4.0x × $80M = $320M. Senior notes 1.0x = $80M. Total new debt $400M, so 5.0x leverage.',
          'Management rollover = $20M. It is a source — rolled equity is not cash you have to fund.',
          'Sponsor equity = $760M − $400M − $20M = $340M.',
        ],
        table: {
          head: ['Uses', '$M', 'Sources', '$M'],
          rows: [
            ['Purchase equity', '570', 'Term Loan B (4.0x)', '320'],
            ['Refinance existing debt', '150', 'Senior notes (1.0x)', '80'],
            ['Financing fees', '20', 'Mgmt rollover', '20'],
            ['Advisory / other fees', '10', 'Sponsor equity', '340'],
            ['Cash to balance sheet', '10', '', ''],
            ['Total', '760', 'Total', '760'],
          ],
        },
      },
      {
        title: 'Sanity-check the structure the way a credit committee would',
        body: [
          'Leverage: $400M / $80M = 5.0x. Equity contribution: ($340M + $20M) / $760M = 47% — in the normal 40–50% band for a mid-market deal today.',
          'Fees are $30M, or ~4% of TEV. They are funded by the sponsor, so your effective entry multiple is above the headline 9.0x: $750M of capitalization (ex-cash) on $80M is 9.4x.',
        ],
        say: 'Five turns of leverage, 47% equity, and note that fees push my real entry multiple to about 9.4x.',
      },
    ],
    answer: [
      'Sponsor check = $340M. Total capitalization $760M, 5.0x levered, 47% equity.',
      'The headline 9.0x is really ~9.4x once fees are funded — the sponsor pays for them, the seller does not.',
    ],
    traps: [
      'Using TEV as a use of funds and then also repaying the existing debt. You would be paying for the debt twice.',
      'Treating the rollover as a use. It is a source that shrinks your check.',
      'Netting the minimum cash out of uses. Cash going onto the balance sheet has to be funded at close.',
      'Forgetting that financing fees are capitalized and amortized, while advisory fees are expensed — it matters for the pro forma model, not for the check.',
    ],
    followups: [
      'The seller wants $760M of TEV instead of $720M. How much more equity do you write, holding leverage constant?',
      'Why do lenders care about the equity contribution percentage at all?',
    ],
  },

  {
    id: 'credit-stats',
    group: 'lbo',
    title: 'Credit stats and the covenant',
    tag: 'Can the capital structure take a hit?',
    minutes: 6,
    level: 'stretch',
    prompt:
      'Same structure — $400M of debt on $80M of EBITDA. Interest coverage, cash available for the sweep, and how far EBITDA can fall before you trip a 6.0x net leverage covenant.',
    givens: [
      { label: 'TLB', value: '$320M @ 9%' },
      { label: 'Senior notes', value: '$80M @ 8%' },
      { label: 'EBITDA', value: '$80M' },
      { label: 'Capex', value: '$15M' },
      { label: 'Cash taxes', value: '$5M' },
      { label: 'Change in NWC', value: '$3M use' },
      { label: 'Mandatory amortization', value: '1% of TLB' },
      { label: 'Covenant', value: 'Net leverage ≤ 6.0x' },
    ],
    steps: [
      {
        title: 'Cash interest',
        body: [
          '$320M × 9% = $28.8M. $80M × 8% = $6.4M. Total cash interest = $35.2M.',
          'Interest coverage = EBITDA / interest = $80M / $35.2M = 2.3x.',
          'Fixed charge coverage = (EBITDA − capex) / interest = $65M / $35.2M = 1.8x.',
        ],
        say: 'Two-point-three times covered on EBITDA, 1.8 times after capex.',
      },
      {
        title: 'Cash available to sweep',
        body: [
          '$80M EBITDA − $35.2M interest − $15M capex − $5M cash taxes − $3M working capital = $21.8M.',
          'Less mandatory amortization of 1% × $320M = $3.2M, leaving $18.6M for the sweep.',
          'That is roughly 4.7% of the debt stack per year — a slow deleveraging path, so this deal is underwritten on growth, not paydown.',
        ],
        table: {
          head: ['$M', 'Year 1'],
          rows: [
            ['EBITDA', '80.0'],
            ['− Cash interest', '(35.2)'],
            ['− Capex', '(15.0)'],
            ['− Cash taxes', '(5.0)'],
            ['− ΔNWC', '(3.0)'],
            ['Cash flow before debt service', '21.8'],
            ['− Mandatory amortization', '(3.2)'],
            ['Available for sweep', '18.6'],
          ],
        },
      },
      {
        title: 'The covenant cushion — solve for the EBITDA that trips it',
        body: [
          'Covenant EBITDA = debt / covenant level = $400M / 6.0x = $66.7M.',
          'Cushion = 1 − 66.7 / 80 = 17%. EBITDA can fall about 17% before you breach.',
          'Note what breaks first: at $64M of EBITDA (down 20%) leverage is 6.25x and you are in default, but cash flow is still positive — roughly $11M after debt service. The maintenance covenant bites before liquidity does. That is exactly what it is designed to do.',
        ],
        say: 'Seventeen percent of cushion, and the covenant trips well before the company runs out of cash.',
      },
    ],
    answer: [
      '2.3x interest coverage, ~$18.6M of annual sweep capacity, and a ~17% EBITDA cushion to the 6.0x covenant.',
    ],
    traps: [
      'Using total leverage when the covenant is defined on net leverage. Net of cash — and know whether the credit agreement caps the netting.',
      'Forgetting mandatory amortization before the sweep.',
      'Quoting coverage on EBITDA when the lender tests EBITDA less capex. Ask which definition.',
      'Assuming a breach means the loan is due. It means a negotiation — usually an equity cure or a repricing.',
    ],
    followups: [
      'How large an equity cure would fix a 6.25x reading?',
      'Rates go up 200bps on the floating tranche. What happens to coverage and to the sweep?',
    ],
  },

  // ─────────────────────────────────────────────────── Three statements
  {
    id: 'depreciation-walk',
    group: 'statements',
    title: 'Depreciation increases by $10',
    tag: 'The linkage question, every time',
    minutes: 3,
    level: 'warm-up',
    prompt:
      'Depreciation goes up by $10. Walk me through the three statements. Assume a 25% tax rate.',
    givens: [{ label: 'Tax rate', value: '25%' }],
    steps: [
      {
        title: 'Income statement first — always',
        body: [
          'Operating expenses up $10, so EBIT falls $10 and pre-tax income falls $10.',
          'Taxes fall by $2.50. Net income falls $7.50.',
        ],
        say: 'Pre-tax down ten, taxes down two-fifty, net income down seven-fifty.',
      },
      {
        title: 'Cash flow statement — start from the new net income',
        body: [
          'Begin at net income of −$7.50. Add back the $10 of non-cash depreciation.',
          'Cash from operations is up $2.50. Nothing in investing or financing moves.',
          'Cash increases by $2.50 — the tax shield, and nothing else.',
        ],
        say: 'The only real cash effect is the tax saving: two-fifty.',
      },
      {
        title: 'Balance sheet — prove it balances',
        body: [
          'Assets: cash +$2.50, PP&E −$10. Net assets down $7.50.',
          'Equity: retained earnings −$7.50. Liabilities unchanged.',
          'Both sides down $7.50. Balanced.',
        ],
        say: 'Down seven-fifty on both sides — it balances.',
      },
      {
        title: 'The variants they pivot to',
        body: [
          '$10 of capex: no income statement impact. Investing −$10, cash −$10, PP&E +$10. Balances with no equity change.',
          '$10 of inventory bought on credit: no income statement. Inventory +$10, accounts payable +$10, cash unchanged.',
          '$10 accrued but unpaid expense: pre-tax −$10, net income −$7.50, add back the $10 increase in accrued liabilities, cash +$2.50. Same shape as depreciation.',
          '$100 of new debt at 10%, one year: interest $10, net income −$7.50, cash +$100 from financing less $10 interest paid, debt +$100.',
          'Deferred revenue of $10 collected: no income statement, cash +$10, deferred revenue liability +$10.',
        ],
        say: 'Same three-step order every time — income statement, cash flow from net income, then balance the sheet.',
      },
    ],
    answer: [
      'Net income −$7.50, cash +$2.50, PP&E −$10, retained earnings −$7.50. The sheet balances.',
    ],
    traps: [
      'Saying cash is unchanged because depreciation is non-cash. It changes taxes, so it changes cash.',
      'Skipping the tax line. If they give you a rate, they want to see it used.',
      'Forgetting to reduce PP&E on the balance sheet — the most common way this answer fails to balance.',
      'Starting on the balance sheet. Income statement, then cash flow, then balance sheet, out loud, in that order.',
    ],
    followups: [
      'Now assume the company is loss-making with no taxes payable. What changes?',
      'Why would a buyer prefer higher depreciation here?',
    ],
  },

  {
    id: 'working-capital',
    group: 'statements',
    title: 'Working capital and the cash conversion cycle',
    tag: 'Where growth eats the cash',
    minutes: 5,
    level: 'core',
    prompt:
      'DSO of 60, DIO of 90, DPO of 45 on $730M of revenue and $365M of COGS. Size net working capital, the cash cycle, and the cash impact of growing 10%.',
    givens: [
      { label: 'Revenue', value: '$730M' },
      { label: 'COGS', value: '$365M' },
      { label: 'DSO / DIO / DPO', value: '60 / 90 / 45 days' },
    ],
    steps: [
      {
        title: 'Convert days into balances',
        body: [
          'Accounts receivable = revenue × DSO / 365 = $730M × 60 / 365 = $120M.',
          'Inventory = COGS × DIO / 365 = $365M × 90 / 365 = $90M.',
          'Accounts payable = COGS × DPO / 365 = $365M × 45 / 365 = $45M.',
          'Net working capital = 120 + 90 − 45 = $165M, or about 23% of revenue.',
        ],
        say: 'Receivables off revenue, inventory and payables off COGS — that distinction is the whole question.',
      },
      {
        title: 'The cash conversion cycle',
        body: [
          'CCC = DSO + DIO − DPO = 60 + 90 − 45 = 105 days.',
          'You fund 105 days of operations before a dollar of a sale comes back to you. At $730M of revenue that is $210M of gross funding need, offset by payables to the $165M net figure.',
        ],
      },
      {
        title: 'What growth costs, and what a fix is worth',
        body: [
          'Grow 10% with the same days: NWC goes to $181.5M. The $16.5M increase is a use of cash — it comes straight out of free cash flow.',
          'Rule of thumb: this business consumes about 23 cents of cash for every incremental dollar of revenue.',
          'Now pull DSO from 60 to 45: receivables fall to $90M, a one-time $30M cash release. That is the operating lever a sponsor buys — and it is one-time, not recurring. Say that.',
        ],
        say: 'Twenty-three cents of every growth dollar goes into working capital, and thirty million is sitting in receivables.',
      },
    ],
    answer: [
      'NWC $165M, cash cycle 105 days, ~$16.5M of cash consumed per 10% of growth, and $30M of one-time release from a 15-day DSO improvement.',
    ],
    traps: [
      'Running inventory and payables off revenue. Both are COGS-driven.',
      'Calling the DSO improvement a recurring benefit. The release happens once; only the reduced drag on growth recurs.',
      'Including cash or short-term debt in NWC. Operating working capital excludes both.',
      'Missing the sign: an increase in a working capital asset is a use of cash.',
    ],
    followups: [
      'Which of the three days is easiest to fix in year one, and what does it cost you commercially?',
      'A business with negative working capital — name one and tell me why the model looks different.',
    ],
  },

  // ─────────────────────────────────────────────────────── Valuation
  {
    id: 'dcf-by-hand',
    group: 'valuation',
    title: 'A DCF built by hand',
    tag: 'Unlevered FCF, WACC, terminal value',
    minutes: 10,
    level: 'core',
    prompt:
      'Build a five-year DCF. Give me the WACC, the terminal value both ways, and the value per share.',
    givens: [
      { label: 'Year 5 EBIT', value: '$200M' },
      { label: 'Year 5 D&A / capex / ΔNWC', value: '$40M / $50M / $10M' },
      { label: 'Tax rate', value: '25%' },
      { label: 'Risk-free / ERP', value: '4.0% / 5.5%' },
      { label: 'Unlevered beta', value: '0.90' },
      { label: 'Target capital structure', value: '70% equity / 30% debt' },
      { label: 'Cost of debt', value: '7.0% pre-tax' },
      { label: 'Perpetuity growth', value: '2.5%' },
      { label: 'Exit multiple', value: '8.0x EBITDA' },
      { label: 'Net debt / diluted shares', value: '$300M / 100M' },
    ],
    steps: [
      {
        title: 'WACC — relever the beta first',
        body: [
          'D/E = 30/70 = 0.43. Levered beta = 0.90 × (1 + (1 − 25%) × 0.43) = 0.90 × 1.32 = 1.19.',
          'Cost of equity = 4.0% + 1.19 × 5.5% = 10.6%.',
          'After-tax cost of debt = 7.0% × (1 − 25%) = 5.25%.',
          'WACC = 70% × 10.6% + 30% × 5.25% = 7.4% + 1.6% = 9.0%.',
        ],
        say: 'Unlever, relever at the target structure, then weight — nine percent.',
      },
      {
        title: 'Unlevered free cash flow — no interest anywhere',
        body: [
          'UFCF = EBIT × (1 − t) + D&A − capex − ΔNWC.',
          'Year 5: $200M × 75% = $150M NOPAT, + $40M − $50M − $10M = $130M.',
          'Interest never appears. You are valuing the whole enterprise, and the cost of debt is already inside the WACC — putting it in the cash flow too is double-counting.',
        ],
        table: {
          head: ['$M', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5'],
          rows: [
            ['UFCF', '100', '107', '115', '122', '130'],
            ['Discount factor @ 9%', '0.917', '0.842', '0.772', '0.708', '0.650'],
            ['PV', '91.7', '90.1', '88.8', '86.4', '84.5'],
          ],
        },
        say: 'Unlevered, so no interest — the leverage lives in the discount rate.',
      },
      {
        title: 'Terminal value, both ways, and cross-check them',
        body: [
          'Perpetuity growth: $130M × 1.025 / (9.0% − 2.5%) = $133.3M / 6.5% = $2,050M.',
          'Exit multiple: Year 5 EBITDA = $200M EBIT + $40M D&A = $240M. × 8.0x = $1,920M.',
          'The cross-check is the point of doing both: $1,920M implies a perpetuity growth rate of about 2.1%. That is inside the range of long-run GDP, so the exit multiple is defensible. If it had implied 5%, you would say so and cut the multiple.',
          'Discount the perpetuity-growth TV: $2,050M × 0.650 = $1,332M.',
        ],
        say: 'I always back out the implied growth from the exit multiple — that is the honest test of the terminal assumption.',
      },
      {
        title: 'Enterprise to equity to per share',
        body: [
          'PV of the forecast = $441M. Plus $1,332M of discounted terminal value = $1,774M enterprise value.',
          'Terminal value is 75% of the total. Flag that unprompted — it is why nobody makes a decision on a DCF alone.',
          'Equity value = $1,774M − $300M net debt = $1,474M. Per share = $1,474M / 100M = $14.74.',
        ],
        say: 'About fifteen dollars, but three quarters of it is terminal value, so I would triangulate against comps.',
      },
    ],
    answer: [
      'WACC 9.0%, enterprise value ~$1,774M, equity value ~$1,474M, ~$14.74 per share. Terminal value is 75% of enterprise value.',
    ],
    traps: [
      'Subtracting interest inside unlevered free cash flow.',
      'Taxing EBITDA. NOPAT runs off EBIT.',
      'Using the current capital structure to relever beta when the prompt gives you a target.',
      'A perpetuity growth rate above long-run GDP. Above ~3% in a developed market and you will be challenged.',
      'Forgetting mid-year convention if they ask for it — it lifts value roughly 4-5% at a 9% WACC.',
    ],
    followups: [
      'WACC moves up a point. Roughly what happens to the per-share value?',
      'Why is a DCF usually the highest number in the football field, and when is it not?',
    ],
  },

  {
    id: 'ev-bridge',
    group: 'valuation',
    title: 'Enterprise value and the diluted share count',
    tag: 'Treasury stock method',
    minutes: 4,
    level: 'warm-up',
    prompt:
      'Stock trades at $20 with 100M basic shares. Get me to enterprise value and EV/EBITDA.',
    givens: [
      { label: 'Share price / basic shares', value: '$20.00 / 100M' },
      { label: 'Options', value: '5M struck at $10' },
      { label: 'RSUs', value: '1M unvested' },
      { label: 'Total debt', value: '$500M' },
      { label: 'Cash', value: '$100M' },
      { label: 'Preferred stock', value: '$50M' },
      { label: 'Noncontrolling interest', value: '$30M' },
      { label: 'EBITDA', value: '$300M' },
    ],
    steps: [
      {
        title: 'Dilute the share count with the treasury stock method',
        body: [
          'Options are in the money ($20 > $10), so they exercise. Proceeds = 5M × $10 = $50M.',
          'The company buys back stock at the market price: $50M / $20 = 2.5M shares.',
          'Net new shares = 5.0M − 2.5M = 2.5M. RSUs have no strike, so all 1M count.',
          'Diluted shares = 100 + 2.5 + 1.0 = 103.5M. Equity value = 103.5M × $20 = $2,070M.',
        ],
        say: 'Options net down by the buyback; RSUs come in gross because there are no proceeds.',
      },
      {
        title: 'Bridge to enterprise value',
        body: [
          'EV = equity value + debt + preferred + noncontrolling interest − cash.',
          '= 2,070 + 500 + 50 + 30 − 100 = $2,550M.',
          'The logic: add every other claim on the operating assets, subtract what is not an operating asset.',
        ],
        table: {
          head: ['Bridge', '$M'],
          rows: [
            ['Diluted equity value', '2,070'],
            ['+ Total debt', '500'],
            ['+ Preferred', '50'],
            ['+ Noncontrolling interest', '30'],
            ['− Cash', '(100)'],
            ['Enterprise value', '2,550'],
          ],
        },
      },
      {
        title: 'The multiple, and why the numerator has to match',
        body: [
          'EV / EBITDA = $2,550M / $300M = 8.5x.',
          'EBITDA is pre-interest and belongs to all capital providers, so it pairs with EV. Net income is post-interest and belongs only to equity, so it pairs with equity value. Never cross them.',
          'Noncontrolling interest is added because the consolidated EBITDA includes 100% of a sub you do not fully own. Equity-method investments get subtracted for the mirror-image reason — their earnings are not in EBITDA.',
        ],
        say: 'Eight and a half times. NCI goes in because consolidated EBITDA already includes all of that subsidiary.',
      },
    ],
    answer: ['Diluted equity $2,070M, enterprise value $2,550M, 8.5x EV/EBITDA.'],
    traps: [
      'Using basic shares when options are in the money.',
      'Adding all 5M option shares without the treasury buyback.',
      'Exercising out-of-the-money options. They lapse.',
      'Pairing EV with net income or equity value with EBITDA.',
      'Subtracting all cash without asking whether some of it is operating cash the business needs.',
    ],
    followups: [
      'The stock falls to $9. What is diluted share count now?',
      'Two identical businesses, different leverage. Which multiple do you compare on and why?',
    ],
  },

  // ────────────────────────────────────────────────────────── M&A
  {
    id: 'accretion-dilution',
    group: 'ma',
    title: 'Accretion / dilution, cash versus stock',
    tag: 'And the yield shortcut',
    minutes: 6,
    level: 'core',
    prompt:
      'A 20x P/E acquirer buys a target for $400M — 20x the target\'s $20M of net income. Run it as all-cash debt-funded, then all-stock. Accretive or dilutive?',
    givens: [
      { label: 'Acquirer net income / shares', value: '$100M / 100M' },
      { label: 'Acquirer EPS / P/E', value: '$1.00 / 20.0x' },
      { label: 'Target net income', value: '$20M' },
      { label: 'Purchase price', value: '$400M (20.0x)' },
      { label: 'Debt rate', value: '6.0%' },
      { label: 'Tax rate', value: '25%' },
      { label: 'Synergies', value: 'None' },
    ],
    steps: [
      {
        title: 'All-cash, funded with debt',
        body: [
          'Interest = $400M × 6.0% = $24M pre-tax. After tax = $24M × 75% = $18M.',
          'Pro forma net income = $100M + $20M − $18M = $102M. Share count is unchanged at 100M.',
          'Pro forma EPS = $1.02 versus $1.00 standalone. 2% accretive.',
        ],
        say: 'Two cents of accretion — two percent.',
      },
      {
        title: 'All-stock',
        body: [
          'Shares issued = $400M / $20 per share = 20M.',
          'Pro forma net income = $120M (no interest). Shares = 120M. EPS = $1.00.',
          'Exactly neutral — because the acquirer and the target are both priced at 20x. Paying with equity at the same multiple you are buying at is a wash.',
        ],
        say: 'Neutral, and it has to be — same multiple both sides.',
      },
      {
        title: 'The shortcut — compare yields, skip the model',
        body: [
          'Cash deal: accretive if the after-tax cost of funding is below the target\'s earnings yield. Funding costs 6% × 75% = 4.5%. The target yields $20M / $400M = 5.0%. 4.5% < 5.0%, so accretive.',
          'Stock deal: accretive if the acquirer\'s earnings yield (1 / 20 = 5.0%) is above the target\'s (5.0%). Equal, so neutral.',
          'Size it without a model: accretion in dollars = price × (target yield − funding cost) = $400M × 0.5% = $2M of extra earnings, on 100M shares = $0.02. That reproduces the answer exactly.',
        ],
        say: 'Buy at a lower multiple than you fund at, and it is accretive. That is the whole rule.',
      },
      {
        title: 'What accretion does and does not tell you',
        body: [
          'Accretion is not value creation. Cash is nearly always the most accretive currency simply because after-tax debt is cheap — that says nothing about whether the price was right.',
          'What is missing here: synergies, purchase accounting (D&A step-up on written-up assets, intangible amortization), transaction fees, foregone interest income on cash used.',
          'Say that unprompted. It is the difference between someone who ran the math and someone who understands it.',
        ],
      },
    ],
    answer: [
      'All-cash: EPS $1.02, 2% accretive. All-stock: EPS $1.00, neutral.',
      'The rule: cash is accretive when after-tax funding cost < target earnings yield; stock is accretive when the acquirer P/E exceeds the deal P/E.',
    ],
    traps: [
      'Forgetting to tax-effect the interest.',
      'Dividing the purchase price by the target\'s share price to get shares issued. Use the acquirer\'s.',
      'Treating accretion as proof of a good deal.',
      'Ignoring foregone interest when the deal is funded with balance-sheet cash rather than new debt.',
    ],
    followups: [
      'What debt rate makes the cash deal exactly breakeven?',
      'How much of synergies would you need for the stock deal to be 5% accretive?',
      'Why might a CFO choose the dilutive structure anyway?',
    ],
  },

  // ─────────────────────────────────────────────────────────── VC
  {
    id: 'cap-table',
    group: 'vc',
    title: 'Pre-money, post-money, and the option pool shuffle',
    tag: 'Where the dilution actually lands',
    minutes: 7,
    level: 'core',
    prompt:
      'Founders hold 8M shares. Seed raised $2M on an $8M pre. Now a Series A investor puts in $10M on a $30M pre and requires a 10% post-money option pool. Build the cap table and tell me what the founders own.',
    givens: [
      { label: 'Founder shares', value: '8,000,000' },
      { label: 'Seed', value: '$2M on $8M pre' },
      { label: 'Series A', value: '$10M on $30M pre' },
      { label: 'Option pool', value: '10% post-money, from the pre' },
    ],
    steps: [
      {
        title: 'The seed round',
        body: [
          'Post-money = pre + investment = $8M + $2M = $10M. Investor owns 2/10 = 20%.',
          'Shares issued so the seed owns 20%: 8M / (1 − 20%) × 20% = 2M shares. Total 10M shares.',
          'Price per share = $2M / 2M = $1.00. Cross-check against pre-money per share: $8M / 8M existing = $1.00. They must agree — that is your proof the round is built right.',
        ],
        say: 'Post-money is pre plus the check; ownership is always the check over the post.',
      },
      {
        title: 'Series A — but the pool comes out of the pre',
        body: [
          'The A investor takes 25% ($10M / $40M post). The pool takes 10% post-money. Existing holders are left with 65%.',
          'Total post-round shares = 10M existing / 65% = 15.385M.',
          'A shares = 25% × 15.385M = 3.846M. Pool = 10% × 15.385M = 1.538M.',
          'Price per share = $10M / 3.846M = $2.60.',
        ],
        table: {
          head: ['Holder', 'Shares (M)', 'Post-A %', 'Pre-A %'],
          rows: [
            ['Founders', '8.000', '52.0%', '80.0%'],
            ['Seed', '2.000', '13.0%', '20.0%'],
            ['Option pool (new)', '1.538', '10.0%', '—'],
            ['Series A', '3.846', '25.0%', '—'],
            ['Total', '15.385', '100.0%', '100.0%'],
          ],
        },
      },
      {
        title: 'Name the cost of the shuffle out loud',
        body: [
          'The headline says a $30M pre-money. But existing holders end up with 65% of a $40M post = $26M of value, not $30M.',
          'The $4M gap is the pool, and it is paid for entirely by the founders and the seed. The A investor still owns exactly 25% either way.',
          'That is why "10% post-money pool from the pre" is a real price term, not a housekeeping item. The effective pre-money is $26M.',
        ],
        say: 'Nominal pre is thirty; the effective pre after the pool is twenty-six. The pool is priced entirely to the existing holders.',
      },
      {
        title: 'Founder dilution across rounds',
        body: [
          'Founders: 100% → 80% after seed → 52% after the A.',
          'A useful frame for the answer: two rounds of roughly 20–25% dilution each, plus the pool, and a founding team is at half the company before Series B. That is normal, and the check is whether the value per point is compounding faster than the count is falling.',
        ],
      },
    ],
    answer: [
      'Founders 52.0%, seed 13.0%, pool 10.0%, Series A 25.0%. Price per share $2.60.',
      'The effective pre-money is $26M, not the headline $30M — the pool costs existing holders $4M.',
    ],
    traps: [
      'Computing ownership off the pre-money. Ownership is always investment / post-money.',
      'Creating the pool after the round. If it comes out of the pre, existing holders bear all of it.',
      'Forgetting that the price per share must reconcile to pre-money divided by pre-round fully diluted shares.',
      'Using outstanding rather than fully diluted shares — the unallocated pool counts.',
    ],
    followups: [
      'Negotiate the pool to 5% instead of 10%. What do the founders get back?',
      'Same round done as a $10M SAFE with a $30M cap converting at the A — who is worse off?',
    ],
  },

  {
    id: 'preference-waterfall',
    group: 'vc',
    title: 'The liquidation preference waterfall',
    tag: 'Who gets what at exit',
    minutes: 6,
    level: 'stretch',
    prompt:
      'Same cap table. Series A invested $10M at 25%, seed $2M at 13%, both 1x non-participating. Run the exit waterfall at $12M, $30M, and $60M.',
    givens: [
      { label: 'Series A', value: '$10M invested, 25%, 1x non-part.' },
      { label: 'Seed', value: '$2M invested, 13%, 1x non-part.' },
      { label: 'Founders + pool', value: '62% of common' },
    ],
    steps: [
      {
        title: 'The rule for non-participating preferred',
        body: [
          'Each preferred holder takes the greater of (a) its liquidation preference or (b) its pro-rata share as converted common. Not both — that is what "non-participating" means.',
          'So for each holder, find the exit value where the two are equal. Series A: $10M / 25% = $40M. Below a $40M exit the A takes its preference; above it, the A converts.',
          'Seed: $2M / 13% = $15.4M.',
        ],
        say: 'Greater-of, not both. And the conversion point is just the preference divided by the ownership.',
      },
      {
        title: '$12M exit — the sharp lesson',
        body: [
          'A takes its $10M preference (25% of $12M is only $3M). Seed takes its $2M.',
          'Preferences total $12M. There is nothing left. Founders and the option pool get $0.',
          'The business sold for more than the seed valuation and the common is still worth nothing. That is the structural point of preferred stock.',
        ],
        table: {
          head: ['Exit', 'Series A', 'Seed', 'Common'],
          rows: [
            ['$12M', '$10.0M', '$2.0M', '$0.0M'],
            ['$30M', '$10.0M', '$3.5M', '$16.5M'],
            ['$60M', '$15.0M', '$7.8M', '$37.2M'],
          ],
        },
      },
      {
        title: '$30M — mixed, because the two cross at different points',
        body: [
          'Series A: 25% of $30M = $7.5M, less than its $10M preference. It stays preferred and takes $10M.',
          'Seed: it is above its $15.4M conversion point, so it converts. Remaining after the A preference is $20M, split across all non-A shares (11.538M of the 15.385M). Seed holds 2M of those, or 17.3%, and takes $3.5M.',
          'Common (founders plus pool, 9.538M shares) takes the balance: $16.5M.',
        ],
      },
      {
        title: '$60M — everyone converts',
        body: [
          'Both are above their conversion points, so all preferred converts to common and the proceeds go strictly pro rata.',
          'Series A 25% = $15.0M. Seed 13% = $7.8M. Founders 52% = $31.2M. Pool 10% = $6.0M.',
          'The structure stops mattering entirely once the exit is well above the preference stack. That is the answer to "when do these terms matter?" — only in the downside.',
        ],
        say: 'Above forty million everything converts, and the preference stack is irrelevant.',
      },
      {
        title: 'If the A were participating instead',
        body: [
          'Participating: take the preference and then share pro rata in the remainder. At $30M: $10M + 25% × $20M = $15.0M, versus $10M non-participating.',
          'A 3x cap would limit the A to $30M of total proceeds regardless.',
          'Participating preferred is a real transfer of value in the middle of the distribution — the range where most exits actually land.',
        ],
      },
    ],
    answer: [
      '$12M: A $10.0M, seed $2.0M, common $0. $30M: A $10.0M, seed $3.5M, common $16.5M. $60M: everyone converts — A $15.0M, seed $7.8M, founders $31.2M.',
      'Conversion points: $40M for the A, $15.4M for the seed.',
    ],
    traps: [
      'Giving non-participating preferred both the preference and the pro-rata share.',
      'Forgetting that when one class converts and another does not, the converted class shares only the residual.',
      'Assuming the stack is pari passu. Ask whether it is stacked — senior rounds paid first changes the middle cases.',
      'Ignoring the option pool. Unexercised in-the-money options participate as common.',
    ],
    followups: [
      'At what exit value are founders indifferent between participating and non-participating for the A?',
      'The A has a 2x preference instead of 1x. Where is the new conversion point?',
    ],
  },
]

/** MoM to IRR, memorized. The single highest-leverage table in a PE interview. */
export const IRR_TABLE: { mom: string; y3: string; y5: string; y7: string }[] = [
  { mom: '1.5x', y3: '14%', y5: '8%', y7: '6%' },
  { mom: '2.0x', y3: '26%', y5: '15%', y7: '10%' },
  { mom: '2.5x', y3: '36%', y5: '20%', y7: '14%' },
  { mom: '3.0x', y3: '44%', y5: '25%', y7: '17%' },
  { mom: '4.0x', y3: '59%', y5: '32%', y7: '22%' },
  { mom: '5.0x', y3: '71%', y5: '38%', y7: '26%' },
]

export const RULES: { rule: string; detail: string }[] = [
  {
    rule: 'FCF = net income when capex equals D&A and working capital is flat',
    detail: 'Interviewers set it up this way on purpose. Spot it and you save a line every year.',
  },
  {
    rule: 'Flat margin means you can compound EBITDA and never build a revenue line',
    detail: 'Only build revenue if the margin moves.',
  },
  {
    rule: 'Interest on the beginning-of-year balance',
    detail: 'Or flat on the original balance — either is fine, but say which one you are doing.',
  },
  {
    rule: 'Enterprise metrics with enterprise value, equity metrics with equity value',
    detail: 'EBITDA, EBIT and revenue pair with EV. Net income and book equity pair with equity value.',
  },
  {
    rule: 'Ownership = investment / post-money. Always',
    detail: 'Pre-money only tells you the price per share.',
  },
  {
    rule: 'Cash acquisitions are accretive when after-tax funding cost < target earnings yield',
    detail: 'Stock deals are accretive when the acquirer P/E is above the deal P/E.',
  },
  {
    rule: 'A turn of exit multiple on a 5-year hold is worth roughly 2-3 points of IRR',
    detail: 'Useful for answering sensitivity questions without doing the arithmetic.',
  },
  {
    rule: 'Doubling in 5 years is ~15%; tripling in 5 years is ~25%',
    detail: 'Anchor between them and interpolate. Nobody expects a decimal.',
  },
]
