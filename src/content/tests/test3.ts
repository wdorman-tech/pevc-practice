import type { PracticeTest } from './types'

export const TEST_3: PracticeTest = {
  id: 't3',
  n: 3,
  title: 'Platforms and Subscriptions',
  blurb:
    'Twenty items to test whether you can reason out loud under mild pressure, not whether you memorised the words.',
  items: [
    /* ---- S01 · recall · accounting ---- */
    {
      shell: 'S01',
      kind: 'mc',
      stem: "You want to know whether a streaming service's subscription income covered its costs over the last twelve months. Which statement answers that?",
      choices: [
        'The income statement, covering the full period',
        'The balance sheet, as of the closing date',
        'The cash flow statement, covering the full period',
      ],
      answer: 0,
      why: 'Profit is measured over a window, so you need the statement that spans one rather than the one dated to a single day. The cash flow statement covers the same window but reports the bank account, which accrual accounting deliberately keeps separate from profit.',
      traps: {
        1: 'You picked this if you think a snapshot of what a company owns can tell you whether a year was profitable.',
        2: 'You picked this if you are treating cash collected in the period as the same thing as profit earned in it.',
      },
      rule: 'Match the question to the window: a span for profit and cash, a single date for what you own.',
    },

    /* ---- S02 · recall · accounting ---- */
    {
      shell: 'S02',
      kind: 'mc',
      stem: 'A cybersecurity vendor signs a monitoring contract in October, delivers the work in December, and is paid in February. Which month books the revenue?',
      choices: [
        'October, when both sides signed the contract',
        'December, when the vendor delivered the work',
        'February, when the cash reached the bank',
      ],
      answer: 1,
      why: 'Revenue is earned when you deliver, so the December work is a December sale. February settles it in cash; nothing new is earned, and the sale is not recorded twice.',
      traps: {
        0: 'You picked this if you treat signing a contract as earning revenue, when nothing has been delivered yet.',
        2: 'You picked this if you are booking revenue when the cash lands, which is cash accounting rather than accrual.',
      },
      rule: 'Book the sale when you deliver it; the cash arriving later is a separate event.',
    },

    /* ---- S03 · recall · accounting ---- */
    {
      shell: 'S03',
      kind: 'mc',
      stem: 'A design-tool startup holds its prices unchanged and triples its marketing spend. Which margin falls first?',
      choices: [
        'Gross margin, measured before any running costs',
        'Operating margin, measured after the running costs',
        'Net margin, measured after interest and tax',
      ],
      answer: 1,
      why: 'Marketing is a cost of running the company, not a cost of delivering the product, so it lands below gross profit. Gross margin is untouched, which is exactly why you read gross margin to judge the product and operating margin to judge the business.',
      traps: {
        0: 'You picked this if you are filing sales and marketing salaries into the direct cost of delivering the product.',
        2: 'You picked this if you jumped to the bottom line; net margin falls too, but only because operating margin fell first.',
      },
      rule: 'Read gross margin to judge the product, operating margin to judge the business, net margin to judge the financing.',
    },

    /* ---- S04 · recall · business analysis ---- */
    {
      shell: 'S04',
      kind: 'mc',
      stem: "A payroll platform holds every client's employee records, tax history and bank details. Clients renew year after year and absorb annual price rises. Which moat is that?",
      choices: [
        'Network effects, since each user helps the others',
        'Switching costs, since leaving is expensive and risky',
        'Efficient scale, since the market supports few players',
      ],
      answer: 1,
      why: 'The evidence here is behavioural: customers stay and swallow price increases. That pattern comes from what it would cost them to move their records and refile their taxes elsewhere, not from other users making the product better.',
      traps: {
        0: "You picked this if you assume any software with many customers has network effects; one client's payroll does not improve another client's.",
        2: 'You picked this if you read a crowded software market as one the economics only allow a couple of players into.',
      },
      rule: 'A moat you can see in low churn plus absorbed price rises is a switching-cost moat.',
    },

    /* ---- S05 · recall · business analysis ---- */
    {
      shell: 'S05',
      kind: 'mc',
      stem: 'A food delivery platform earns 6% on the capital it invests, while that capital costs 9%. It plans to double its city count. What happens to value?',
      choices: [
        'Value falls, since each dollar earns below cost',
        'Value rises, since revenue and scale both increase',
        'Value holds, since growth and capital cost offset',
      ],
      answer: 0,
      why: 'Growth multiplies whatever return you earn on the capital you put in. When that return sits under the cost of the capital, every additional city destroys value, so growing faster destroys it faster.',
      traps: {
        1: 'You picked this if you treat growth as value creation on its own, without asking what return the growth earns.',
        2: 'You picked this if you expect a gap between return and cost of capital to cancel itself out at scale.',
      },
      rule: 'Growth creates value only when the return on invested capital beats the cost of that capital.',
    },

    /* ---- S06 · recall · valuation ---- */
    {
      shell: 'S06',
      kind: 'mc',
      stem: 'You are buying a streaming service outright. Why does its cash come out when you build enterprise value?',
      choices: [
        'The cash comes with the company, cutting your price',
        'The cash earns little, so valuation methods exclude it',
        'The cash belongs to lenders ahead of the shareholders',
      ],
      answer: 0,
      why: 'Enterprise value is what the operating business costs free of its financing. The cash arrives in your hands the day you buy, so it works as a rebate on the price rather than as part of what you bought.',
      traps: {
        1: 'You picked this if you think a low-yielding asset gets dropped from the count rather than credited against the price.',
        2: 'You picked this if you are confusing who ranks first in a claim on cash with a reduction in the purchase price.',
      },
      rule: 'Cash comes out of enterprise value because buying the company hands that cash straight back to you.',
    },

    /* ---- S07 · recall · risk and return ---- */
    {
      shell: 'S07',
      kind: 'mc',
      stem: 'A cybersecurity vendor might lose its largest customer to a rival. Under CAPM, how does that risk affect the return investors demand?',
      choices: [
        'It leaves the required return unchanged, being diversifiable',
        'It lifts the required return, being a real threat',
        'It lifts the required return through a higher beta',
      ],
      answer: 0,
      why: 'CAPM pays you only for risk you cannot escape by owning other things alongside it. Losing one customer is specific to this company, so an investor holding thirty other positions is not compensated for carrying it.',
      traps: {
        1: 'You picked this if you assume any risk that could hurt profit must therefore be paid for in extra return.',
        2: 'You picked this if you read beta as a measure of business risk rather than of co-movement with the market.',
      },
      rule: 'You are paid for the risk you cannot diversify away, and for nothing else.',
    },

    /* ---- S08 · recall · derivatives ---- */
    {
      shell: 'S08',
      kind: 'mc',
      stem: "You pay a premium for a three-month put on a ticketing marketplace's shares. What exactly have you bought?",
      choices: [
        'The right to sell at the strike, loss capped',
        'The right to buy at the strike, loss capped',
        'The duty to sell at the strike, loss uncapped',
      ],
      answer: 0,
      why: 'A put gains value as the shares fall, and you can simply walk away if they rise. The premium is the entire cost of finding out, which is the asymmetry that makes it behave like insurance on a position.',
      traps: {
        1: 'You picked this if you swapped the two options over; the right to buy at a strike is a call.',
        2: "You picked this if you read the put as an obligation to sell rather than a right to sell; a contract you must honour is a forward, and it is the option's seller who carries the duty.",
      },
      rule: 'Buying an option buys a right and caps your loss at the premium; selling one takes on the obligation.',
    },

    /* ---- S09 · apply · accounting ---- */
    {
      shell: 'S09',
      kind: 'num',
      stem: "A streaming service's depreciation on its servers rises by $60M. The tax rate is 25% and nothing else changes. How much does cash from operations rise, in $M?",
      answer: 15,
      unit: '$M',
      format: 'Answer as a number, e.g. 6',
      work: [
        { label: 'Operating profit falls by the charge', value: '($60M)' },
        { label: 'Tax saved at 25%', value: '+$15M', running: 'Net income ($45M)' },
        { label: 'Add back depreciation, no cash moved', value: '+$60M', running: 'Cash from operations +$15M' },
      ],
      why: 'Cash rises even though profit falls, because the charge itself moved no money while the tax it saved is real money not paid. That $15M is the tax shield and nothing else.',
      rule: 'A non-cash charge leaves you with only its tax saving in cash.',
    },

    /* ---- S10 · apply · accounting ---- */
    {
      shell: 'S10',
      kind: 'num',
      stem: 'A payroll software company reports $60M of net income. Depreciation is $15M, receivables rise $30M and payables rise $10M. What is cash from operations, in $M?',
      answer: 55,
      unit: '$M',
      format: 'Answer as a number, e.g. 40',
      work: [
        { label: 'Net income', value: '+$60M', running: '$60M' },
        { label: 'Add back depreciation, non-cash', value: '+$15M', running: '$75M' },
        { label: 'Receivables rise, billed but not collected', value: '($30M)', running: '$45M' },
        { label: 'Payables rise, incurred but not yet paid', value: '+$10M', running: '$55M' },
      ],
      why: 'Profit counts what you earned and used up; cash counts what actually moved through the bank. Working capital is the whole gap between the two.',
      rule: 'A rise in receivables is cash out; a rise in payables is cash still sitting in your account.',
    },

    /* ---- S11 · apply · valuation ---- */
    {
      shell: 'S11',
      kind: 'num',
      stem: 'A ticketing marketplace has a market cap of $700M, debt of $250M and cash of $50M. EBITDA is $100M. What is its EV/EBITDA multiple?',
      answer: 9,
      unit: 'x',
      format: 'Answer as a number, e.g. 12',
      work: [
        { label: 'Equity value, the market cap', value: '+$700M', running: '$700M' },
        { label: 'Add debt, a claim on the same business', value: '+$250M', running: '$950M' },
        { label: 'Subtract cash, it comes with the deal', value: '($50M)', running: 'EV $900M' },
        { label: 'Divide by EBITDA', value: '÷ $100M', running: '9.0x' },
      ],
      why: 'The multiple prices the whole operating business against the profit it throws off, with financing stripped out of both halves. That is why debt goes in and cash comes out before you divide.',
      rule: 'Build enterprise value first, adding debt and subtracting cash, then divide by an operating profit figure.',
    },

    /* ---- S12 · apply · business analysis ---- */
    {
      shell: 'S12',
      kind: 'num',
      stem: 'A design-tool startup charges $30 a month per subscriber and spends $6 a month serving each one. Fixed costs are $120,000 a month. How many subscribers to break even?',
      answer: 5000,
      format: 'Answer as a number, e.g. 3500',
      work: [
        { label: 'Price per subscriber, monthly', value: '+$30' },
        { label: 'Cost to serve one subscriber', value: '($6)', running: 'Contribution $24' },
        { label: 'Fixed costs to cover each month', value: '($120,000)' },
        { label: '$120,000 divided by $24 of contribution', value: '= 5,000 subs', running: 'Breakeven 5,000' },
      ],
      why: 'Below 5,000 subscribers every dollar of contribution is still paying off the fixed base. Above it the base is covered, so $24 of each new subscription falls to profit, which is why a subscription business looks hopeless right up until it does not.',
      rule: 'Divide fixed costs by contribution per unit, not by price, to find breakeven.',
    },

    /* ---- S13 · apply · markets ---- */
    {
      shell: 'S13',
      kind: 'num',
      stem: 'A subscription business grows revenue 12% a year while inflation runs at 4%. Using the rule of 72, roughly how many years until revenue doubles in real terms?',
      answer: 9,
      tol: 0.5,
      unit: ' years',
      format: 'Answer as a number, e.g. 14',
      work: [
        { label: 'Nominal growth rate', value: '+12%' },
        { label: 'Less inflation', value: '(4%)', running: 'Real growth +8%' },
        { label: '72 divided by real growth of 8', value: '= 9 years', running: 'Doubles in about 9 years' },
      ],
      why: 'Doubling in name is not doubling in what the money buys. Take inflation out before you compound, or you will overstate the pace by years.',
      rule: 'Strip inflation out first, then divide 72 by the growth rate.',
    },

    /* ---- S14 · apply · accounting ---- */
    {
      shell: 'S14',
      kind: 'mc',
      stem: 'A ticketing marketplace books $500M of sales this year and collects $440M in cash. No other item changed. Which balance sheet line must have risen?',
      choices: [
        'Money owed by customers, up sixty million',
        'Cash in the bank, up sixty million',
        'Money owed to suppliers, up sixty million',
      ],
      answer: 0,
      why: 'A sale you have earned but not collected parks on the balance sheet as a claim on the customer. It converts to cash only when they pay, which is a separate event in a later period.',
      traps: {
        1: 'You picked this if you are recording the uncollected sixty million as cash that is already in the account.',
        2: 'You picked this if you flipped the direction of the debt; the customers owe you, you do not owe them.',
      },
      rule: 'Sales you have earned but not collected sit as receivables until the cash actually arrives.',
    },

    /* ---- S15 · apply · valuation ---- */
    {
      shell: 'S15',
      kind: 'mc',
      stem: 'A design-tool startup grows fast, spends everything on hiring, and shows a loss at every line from EBITDA down. Which multiple can you defend using?',
      choices: [
        'EV/Sales, with a view on mature margins',
        'EV/EBITDA, which strips out depreciation and leverage',
        'P/E, which prices earnings after interest and tax',
      ],
      answer: 0,
      why: 'With no profit line left to divide by, sales is the only denominator available. It only means something once you can say what margin the business earns at maturity, otherwise the number is decoration.',
      traps: {
        1: 'You picked this if you reached for the workhorse multiple without checking there is any EBITDA to divide by.',
        2: 'You picked this if you are dividing by earnings that a loss-making company does not currently have.',
      },
      rule: 'Use the highest income line you can defend, and if it is sales, say what margin you expect.',
    },

    /* ---- S16 · apply · markets ---- */
    {
      shell: 'S16',
      kind: 'mc',
      stem: 'Rates rise one percentage point across the curve. You hold a loss-making startup valued on far-off profits, a mature payroll company generating cash today, and a two-year government note held to maturity. Which falls the most in price?',
      choices: [
        'The loss-making startup',
        'The mature payroll company',
        'The two-year government note',
      ],
      answer: 0,
      why: "A higher discount rate bites in proportion to how far away the cash sits. Nearly all of the startup's value lives in distant years, which makes it the longest-duration asset in the set.",
      traps: {
        1: 'You picked this if you assume every equity is hit harder than every bond, without asking when the cash arrives.',
        2: 'You picked this if you think government paper is most rate-sensitive; a short maturity caps the damage.',
      },
      rule: 'Rates hurt long-dated cash flows hardest, whether the asset is a bond or a stock.',
    },

    /* ---- S17 · reason · business analysis ---- */
    {
      shell: 'S17',
      kind: 'open',
      stem: 'Would you rather own a national ticketing marketplace or a food delivery platform? Pick one and defend it.',
      tests: 'Whether you test the strength of a network effect rather than accepting the label at face value.',
      clarify: [
        "Am I buying the whole platform, or one city's operation of it?",
        'Does the ticketing business hold exclusive venue contracts, or does it bid for each event?',
      ],
      skeleton: [
        'Name what each one sells and who actually pays the fee.',
        'Test the network on both: is it national, or rebuilt city by city?',
        'Compare the cost of serving one more transaction on each.',
        'Ask what a rival would have to spend to copy each position.',
        'Commit to one, then name the assumption that would flip you.',
      ],
      criteria: [
        'Said a delivery network is local and rebuilds city by city, not nationally',
        'Named the venue contracts as the thing a ticketing rival must displace',
        'Compared the cost of one extra transaction on both platforms',
        'Picked one without hedging, and named one thing that would change the answer',
      ],
      model:
        "I would take the ticketing marketplace. Both get called network businesses, but only one of the networks is national. A delivery platform has to build its network city by city, because the restaurants and the drivers are local, so winning Chicago tells you very little about Houston and a rival can attack one city at a time with discounts you then have to match. Ticketing is different, because the scarce thing is the exclusive contract with the venue. If I hold the arena, every buyer has to come through me and a competitor cannot enter halfway. The economics follow: I take a fee on someone else's inventory, I carry no drivers and no food, and one more ticket sold costs me almost nothing. The weakness in my answer is that those venue contracts expire. My moat renews on the venues' schedule, not mine, so the first number I would ask for is how much of volume sits under contracts coming up in the next three years.",
      follows: [
        'What would a delivery platform have to change to make you switch?',
        'Where does the profit actually sit in ticketing, the buyer fee or the venue fee?',
        'Who has more power in your answer, the venue or the marketplace?',
      ],
      flags: [
        'Calling both of them network effects and stopping there.',
        'Listing pros and cons for each and never choosing one.',
        'Judging on growth rate alone, with no view on who can be copied.',
      ],
      rule: 'Before you call something a network effect, ask whether the network is national or has to be rebuilt locally.',
    },

    /* ---- S18 · reason · accounting ---- */
    {
      shell: 'S18',
      kind: 'open',
      stem: 'A payroll software company has reported a profit every quarter for two years and is weeks from running out of cash. Walk me through how.',
      tests: 'Whether accrual accounting is something you reason from, or a definition you can repeat.',
      clarify: [
        'Is it growing, and how fast?',
        'Does it carry debt with principal repayments coming due?',
      ],
      skeleton: [
        'Name the root cause first: profit is accrual, cash is not.',
        'Working capital: receivables growing faster than sales as clients get bigger.',
        'Capital spending above depreciation, so cash left faster than the charge.',
        'Debt principal repayments, which never touch the income statement.',
        'Non-cash gains flattering the profit line itself.',
        'Say which one you would check first, and how.',
      ],
      criteria: [
        'Said profit is measured on accruals and cash is not, before listing causes',
        'Named a working capital build, such as receivables, as a leading candidate',
        'Named spending that never hits the income statement, such as capex or debt principal',
        'Said you would compare cash from operations to net income over several periods',
      ],
      model:
        'Profit is measured on accruals and cash is not, so the two can drift apart for years. The first place I would look is working capital. The company books revenue as it runs the payroll, but if it has moved upmarket to larger clients who pay on ninety-day terms, receivables grow faster than sales and every new client consumes cash before it returns any. Second is spending that never appears on the income statement: capital spending above depreciation, where the money left the bank this year while the charge is spread over five, and repayment of loan principal, which shows up nowhere on the income statement at all. Third, the profit itself could be flattered by non-cash gains. What I would actually do is put cash from operations next to net income for the last eight quarters. If that gap is persistent and widening, the profit is not the kind that pays anybody. One bad quarter proves nothing on its own, so I need the pattern across all eight, not a single reading.',
      follows: [
        'Which of those would worry you most as an owner?',
        'If you ran the company, what would you fix first?',
        'How could a subscription business collecting up front still end up here?',
      ],
      flags: [
        'Saying "receivables" and stopping, with no second or third cause.',
        'Listing causes without ever naming the accrual-versus-cash root.',
        'Never saying which one you would check first.',
      ],
      rule: 'When profit and cash disagree, go to the cash flow statement and compare the two over several years.',
    },

    /* ---- S19 · reason · valuation ---- */
    {
      shell: 'S19',
      kind: 'open',
      stem: 'A design-tool startup has 40,000 users, no revenue, and no comparable public company. How would you put a value on it?',
      tests: 'Whether you will build a number from assumptions you name, instead of refusing because the data is missing.',
      clarify: [
        'Am I buying the whole company, or a minority stake alongside the founders?',
        'Do the users pay nothing because the product is free by design, or because it is still in testing?',
      ],
      skeleton: [
        'Say what you are buying: users, a product, and the team.',
        'Build revenue from the bottom: how many users could pay, at what price.',
        'Apply a margin you can defend, then discount for the risk of never getting there.',
        'Cross-check against what an acquirer would pay for the users.',
        'Cross-check against replacement cost: what rebuilding the product would take.',
        'Give a range, and name the one assumption it hangs on.',
      ],
      criteria: [
        'Built revenue from a user count times a price you stated out loud',
        'Named the margin you expect the business to earn at maturity',
        'Used at least one cross-check, such as replacement cost or acquirer value',
        'Gave a range and named the single assumption the number depends on',
      ],
      model:
        'I would build it from the bottom and check it two other ways, and I would give a range rather than a point. Start with the users. Forty thousand today, of whom some share would ever pay: if I assume a tenth convert at ten dollars a month, that is about half a million of revenue a year, and at a mature margin of, say, thirty percent that is roughly a hundred and fifty thousand of profit. Then I discount that hard, because the business has never charged anybody, so the conversion rate is my assumption rather than a fact. First cross-check: what would a rival pay to buy forty thousand users rather than acquire them one at a time, at whatever it costs to win one. Second cross-check: replacement cost, meaning what it would take in engineering time to rebuild the product. Together those put me at one to three million, which is forty thousand users at twenty-five to seventy-five dollars each. The weakness is plain. The whole answer hangs on that conversion rate, and moving it from a tenth to a thirtieth cuts the value by two thirds, so that is the number I would test first.',
      follows: [
        'Which of your three methods do you trust most, and why?',
        'What would make the value zero?',
        'How would you sanity-check the price you assumed users would pay?',
      ],
      flags: [
        'Quoting a multiple of sales when there are no sales to multiply.',
        'Refusing to give a number because the data is not there.',
        'Naming a value with no stated assumption behind it.',
      ],
      rule: 'With no comparables, build the number from assumptions you say out loud, then cross-check it twice.',
    },

    /* ---- S20 · reason · markets ---- */
    {
      shell: 'S20',
      kind: 'open',
      stem: 'A streaming service adds record subscribers and the shares fall 15% the same morning. Talk me through what could have happened.',
      tests: 'Whether you reach for expectations and a mechanism rather than calling the market irrational.',
      clarify: [
        'Did they give guidance for the next quarter alongside the subscriber number?',
        'Did the whole sector fall that morning, or only this one name?',
      ],
      skeleton: [
        'Open with the frame: prices move against expectations, not against facts.',
        'Check the line below: subscribers beat while margin or profit missed.',
        'Check guidance: the next quarter or the full year was cut.',
        'Check quality: the adds came from discounting or free trials.',
        'Check outside the company: rates or a sector move compressed the multiple.',
        'Say which one you would look at first, and why.',
      ],
      criteria: [
        'Said prices respond to the gap between results and expectations',
        'Named margin or profit missing while the headline subscriber number beat',
        'Named guidance as a cause separate from the quarter just reported',
        'Named at least one cause outside the company, such as rates or a sector move',
      ],
      model:
        'Prices move against expectations rather than against facts, so a record number can still be a disappointment. The first thing I would check is the line below the headline. They may have bought those subscribers with discounting or extended free trials, so revenue per subscriber and margin came in short even though the count beat. Second is guidance, because the market prices the next four quarters and not the last one; if management cut the outlook on the call, the good print is already history. Third is the quality of the additions themselves, since promotional subscribers who leave in three months are worth far less than the market had been assuming each one was worth. And it may have nothing to do with the company. Any move splits into a change in earnings and a change in the multiple, so if rates rose that morning or the whole sector sold off, the business did not change and only the price of it did. I would want the margin line and the guidance before choosing between them. Until I have both, my ranking is a preference rather than a conclusion.',
      follows: [
        'Which of those would worry you most as an owner?',
        'How would you check the discounting story from outside the company?',
        'What would have made the same number send the stock up?',
      ],
      flags: [
        'Saying the market is irrational, which ends the conversation.',
        'Listing causes in the order they occur to you, with no ranking.',
        'Never separating a change in earnings from a change in the multiple.',
      ],
      rule: 'A stock moves on the gap between results and expectations; split any move into earnings and multiple.',
    },
  ],
}
