export type ModuleId = 'ba' | 'ac' | 'va' | 'rr' | 'dv' | 'mk'

export type Concept = { id: string; m: ModuleId; term: string; def: string; edge: string }

export const MODULES: { id: ModuleId; code: string; name: string }[] = [
  { id: "ba", code: "BA", name: "Business analysis" },
  { id: "ac", code: "AC", name: "Accounting" },
  { id: "va", code: "VA", name: "Valuation" },
  { id: "rr", code: "RR", name: "Risk and return" },
  { id: "dv", code: "DV", name: "Derivatives" },
  { id: "mk", code: "MK", name: "Markets" },
]

export const CONCEPTS: Concept[] = [
  /* ---- Business analysis ---- */
  {
    id: "ba1", m: "ba", term: "Porter's Five Forces",
    def: "Five structural forces that decide how much profit an industry can sustain: rivalry among existing players, threat of new entrants, threat of substitutes, buyer power, supplier power.",
    edge: "It describes the industry, not the company. Never recite all five — name the two that actually bind in this business and say why the other three are slack.",
  },
  {
    id: "ba2", m: "ba", term: "Economic moat",
    def: "A durable structural advantage that lets a company earn returns above its cost of capital for years without competition eroding them.",
    edge: "The test is not 'do they have a good brand.' The test is whether returns on capital stayed high through a full cycle while competitors tried to take share.",
  },
  {
    id: "ba3", m: "ba", term: "Moat: intangible assets",
    def: "Brands, patents, and regulatory licenses that competitors cannot copy or are not allowed to copy. Airport slots, an approved drug, a gaming license.",
    edge: "Regulatory moats are the strongest and the most fragile — the same regulator that granted the license can cap what you charge with it.",
  },
  {
    id: "ba4", m: "ba", term: "Moat: switching costs",
    def: "The money, time, retraining, or risk a customer eats to move to a competitor. Core banking software, an ERP system, a Bloomberg terminal on every desk.",
    edge: "Switching costs show up in the numbers as low churn plus steady price increases that customers absorb without leaving.",
  },
  {
    id: "ba5", m: "ba", term: "Moat: network effects",
    def: "Each new user makes the product more valuable to every other user. Exchanges, marketplaces, payment networks.",
    edge: "The rarest and most powerful moat, and the one candidates over-claim. Ask whether the network is global or local — food delivery networks are city-by-city, so they are far weaker than they look.",
  },
  {
    id: "ba6", m: "ba", term: "Moat: cost advantage",
    def: "A structurally lower cost to serve, from process, scale, location, or owning a cheap resource. GEICO selling direct, a producer sitting on the lowest-cost acreage.",
    edge: "Ask whether the advantage is repeatable or a one-time gift. Scale advantages compound; a lucky input contract expires.",
  },
  {
    id: "ba7", m: "ba", term: "Moat: efficient scale",
    def: "The market is only big enough for one or two players to earn a return, so nobody rational enters. Pipelines, regional airports, rural utilities.",
    edge: "This moat protects the incumbent but caps growth — the same thing that keeps rivals out keeps the market small.",
  },
  {
    id: "ba8", m: "ba", term: "ROIC vs WACC",
    def: "Return on invested capital against the cost of that capital. Earning 15% on capital that costs 8% creates value; earning 6% on it destroys value no matter how fast you grow.",
    edge: "This is the single sentence that makes a freshman sound serious: growth only creates value when ROIC exceeds WACC. Below the hurdle, growth burns money faster.",
  },
  {
    id: "ba9", m: "ba", term: "Operating leverage",
    def: "A cost base that is mostly fixed, so profit swings much harder than revenue in both directions. Airlines, airports, software, cinemas.",
    edge: "High operating leverage is why the same business can look like a compounder in an expansion and a bankruptcy candidate two years later.",
  },
  {
    id: "ba10", m: "ba", term: "Unit economics",
    def: "The profit of one customer or one unit: contribution margin, cost to acquire a customer (CAC), lifetime value (LTV), and payback period.",
    edge: "The question that cuts through a growth story: does the customer pay back the acquisition cost before they churn, and is CAC rising as they scale?",
  },
  {
    id: "ba11", m: "ba", term: "Pricing power",
    def: "The ability to raise price without losing volume.",
    edge: "It is the cleanest evidence a moat is real, because it is a live experiment the company runs every year and you can see the result in gross margin.",
  },
  {
    id: "ba12", m: "ba", term: "Commodity vs differentiated",
    def: "If the customer's only question is price, you sell a commodity, and returns get competed down to the cost of capital.",
    edge: "Most 'bad business' answers reduce to this. Airlines, dry bulk shipping, and generic manufacturing all fail the same test at the same place.",
  },

  /* ---- Accounting ---- */
  {
    id: "ac1", m: "ac", term: "Income statement",
    def: "Profitability over a period, on an accrual basis: revenue, minus COGS gives gross profit, minus operating expenses gives EBIT, minus interest and tax gives net income.",
    edge: "It is an opinion assembled under accounting rules. That is not cynicism, it is the reason interviewers push you to the cash flow statement.",
  },
  {
    id: "ac2", m: "ac", term: "Balance sheet",
    def: "What the company owns and owes at a single moment. Assets equal liabilities plus equity, always.",
    edge: "It is a photograph, not a film. Two companies with identical balance sheets on December 31 can have behaved completely differently all year.",
  },
  {
    id: "ac3", m: "ac", term: "Cash flow statement",
    def: "Actual cash movement in three buckets — operating, investing, financing — reconciling net income to the change in cash.",
    edge: "Say the line and mean it: the income statement tells you the story, the cash flow statement tells you the truth, the balance sheet tells you whether you survive.",
  },
  {
    id: "ac4", m: "ac", term: "How the three statements link",
    def: "Net income flows into the top of the cash flow statement and into retained earnings on the balance sheet. Ending cash on the cash flow statement becomes the cash line on the balance sheet. Balance sheet changes drive the adjustments in between.",
    edge: "If you can explain the linkage in three sentences without a diagram, you are ahead of most people interviewing you.",
  },
  {
    id: "ac5", m: "ac", term: "The depreciation walkthrough",
    def: "Depreciation rises $10, tax rate 25%. Income statement: EBIT down 10, net income down 7.5. Cash flow: start at minus 7.5, add back the 10 non-cash charge, cash up 2.5. Balance sheet: cash up 2.5, PP&E down 10, so assets fall 7.5; equity falls 7.5 through retained earnings. It balances.",
    edge: "The most-asked technical in existence. Rehearse it until you can say it in twenty seconds, then be ready for the follow-up: why did cash go up? Because the charge is non-cash but the tax saving is real.",
  },
  {
    id: "ac6", m: "ac", term: "Accrual vs cash accounting",
    def: "Revenue is booked when it is earned, not when the cash arrives; expenses when incurred, not when paid.",
    edge: "This gap is exactly why a profitable company can go bankrupt — it explains growing receivables, inventory builds, and most accounting blowups.",
  },
  {
    id: "ac7", m: "ac", term: "Working capital",
    def: "Receivables plus inventory minus payables — the cash tied up in operating the business day to day.",
    edge: "Growth in working capital consumes cash. A fast-growing distributor can be profitable on paper and still need to keep raising money.",
  },
  {
    id: "ac8", m: "ac", term: "Cash conversion cycle",
    def: "Days of receivables plus days of inventory minus days of payables. How long your cash is locked up before it comes back.",
    edge: "A negative cycle means customers fund the business before suppliers get paid. Gyms, Costco, and early Amazon all ran on this, and it is a real structural advantage.",
  },
  {
    id: "ac9", m: "ac", term: "EBITDA",
    def: "Earnings before interest, taxes, depreciation, and amortisation. A rough proxy for operating cash generation before capital structure and accounting policy.",
    edge: "Know the criticism before you are handed it: EBITDA ignores capex, working capital, and stock compensation. For a capital-intensive business it is close to fiction, which is why EV/EBIT is often the fairer multiple.",
  },
  {
    id: "ac10", m: "ac", term: "Depreciation and amortisation",
    def: "Spreading the cost of a long-lived asset across the years it is used. Non-cash in the period it is charged.",
    edge: "Non-cash does not mean unreal. The plane wears out, the truck gets replaced. Depreciation is the accountant's estimate of a bill that arrives later.",
  },
  {
    id: "ac11", m: "ac", term: "Gross, operating, and net margin",
    def: "Gross margin is after the direct cost of the product. Operating margin is after running the company. Net margin is after interest and tax.",
    edge: "Use gross margin to judge the product, operating margin to judge the business, and net margin to judge the whole capital structure. Mixing them up is the tell of someone who memorised definitions.",
  },
  {
    id: "ac12", m: "ac", term: "Goodwill",
    def: "The premium paid over the fair value of the net assets acquired in an acquisition, parked on the balance sheet.",
    edge: "Impairments are a paper trail of bad deals. A company with huge goodwill and repeated write-downs is telling you something about management.",
  },
  {
    id: "ac13", m: "ac", term: "Free cash flow",
    def: "Cash from operations minus capital expenditure — the cash left after keeping the business running.",
    edge: "This is what an owner actually receives. When someone quotes you EBITDA growth, ask what happened to free cash flow.",
  },

  /* ---- Valuation ---- */
  {
    id: "va1", m: "va", term: "Equity value (market cap)",
    def: "Diluted share count times share price. The value of the ownership stake in the business.",
    edge: "It is what the shareholders own after the lenders are satisfied, which is why it moves more violently than enterprise value for a levered company.",
  },
  {
    id: "va2", m: "va", term: "Enterprise value",
    def: "Equity value plus debt plus preferred plus minority interest, minus cash. The value of the operating business regardless of how it was financed.",
    edge: "Say it as an idea, not a formula: what it would cost to own the whole business outright, free and clear of its financing.",
  },
  {
    id: "va3", m: "va", term: "Why cash is subtracted",
    def: "The moment you buy the company you also own its cash, so it reduces the effective price you paid for the operating business.",
    edge: "Common follow-up: is all cash subtractable? No — some is operating cash the business needs to function, and you should not treat it as a rebate.",
  },
  {
    id: "va4", m: "va", term: "P/E ratio",
    def: "Price per dollar of earnings. Because it sits below interest and tax, it is affected by leverage and by tax rate.",
    edge: "Two companies with identical operations and different debt loads will show different P/Es. That is a feature for banks and a bug almost everywhere else.",
  },
  {
    id: "va5", m: "va", term: "EV/EBITDA",
    def: "Enterprise value over EBITDA. Neutral to capital structure and to depreciation policy, so it compares companies with different leverage.",
    edge: "The workhorse multiple for most operating businesses. Its weakness is exactly EBITDA's weakness — it pretends capex does not exist.",
  },
  {
    id: "va6", m: "va", term: "EV/EBIT",
    def: "Like EV/EBITDA but after depreciation, so the company is charged for consuming its assets.",
    edge: "Reach for this whenever capex is heavy and real: manufacturers, telecoms, airlines, anything with steel in the ground.",
  },
  {
    id: "va7", m: "va", term: "EV/Sales",
    def: "Used when there are no earnings to divide by, mostly for early or high-growth companies.",
    edge: "It is only meaningful with a view on terminal margins. Saying '8x sales' without saying 'because mature margins should be 30%' means nothing.",
  },
  {
    id: "va8", m: "va", term: "What actually drives a multiple",
    def: "Three things: expected growth, returns on capital, and the risk or durability of the cash flows.",
    edge: "Keep this in your pocket. Any 'why does A trade richer than B' question is answered by walking those three, then adding leverage, cyclicality, and accounting quality.",
  },
  {
    id: "va9", m: "va", term: "Discounted cash flow",
    def: "Value equals the present value of the cash the business will generate, discounted at the cost of capital, plus a terminal value for everything beyond the forecast.",
    edge: "The honest version: a DCF is a way of making your assumptions explicit, not a way of finding the truth. Small changes in the discount rate move the answer enormously.",
  },
  {
    id: "va10", m: "va", term: "WACC",
    def: "Weighted average cost of capital — the blended after-tax cost of debt and cost of equity, weighted by their share of the capital structure.",
    edge: "Debt is cheaper than equity partly because interest is tax-deductible and partly because lenders get paid first. That second reason is the one people forget.",
  },
  {
    id: "va11", m: "va", term: "Terminal value",
    def: "The value of all cash flows past the forecast window, usually via a perpetuity growth rate or an exit multiple.",
    edge: "It is often 60 to 80 percent of a DCF's total value, which is the strongest argument against pretending a DCF is precise.",
  },
  {
    id: "va12", m: "va", term: "Rule of 72",
    def: "Seventy-two divided by the growth rate gives roughly the years to double. At 9%, about 8 years.",
    edge: "Use it live in an interview to sanity-check a growth claim. It signals you compute rather than accept.",
  },
  {
    id: "va13", m: "va", term: "Comparable companies",
    def: "Valuing a business against the multiples of similar public companies or recent transactions.",
    edge: "The whole game is what counts as comparable. Interviewers push on this: same industry is not the same business if growth, margin, and capital intensity differ.",
  },

  /* ---- Risk and return ---- */
  {
    id: "rr1", m: "rr", term: "CAPM",
    def: "Expected return equals the risk-free rate plus beta times the equity risk premium, that premium being the market return minus the risk-free rate.",
    edge: "The point of the model, not the algebra: you are only compensated for risk you cannot diversify away. Diversifiable risk earns you nothing.",
  },
  {
    id: "rr2", m: "rr", term: "Beta",
    def: "How much a stock has moved relative to the market. A beta of 1.3 means it has historically moved about 1.3% for a 1% market move.",
    edge: "Beta measures co-movement, not business risk. A stable company whose shares happen to swing with the index gets a high beta and a high implied cost of capital — which is the core complaint against CAPM.",
  },
  {
    id: "rr3", m: "rr", term: "Alpha",
    def: "Return above what the risk taken should have produced.",
    edge: "Beating the index with a 1.6 beta in a rising market is not alpha, it is leverage. If you can make that distinction cleanly you will stand out.",
  },
  {
    id: "rr4", m: "rr", term: "Risk-free rate",
    def: "The yield on short-dated government debt, used as the floor under every other expected return.",
    edge: "It is the gravity in every valuation. When it rises, every risk asset must clear a higher bar, and long-dated cash flows fall hardest.",
  },
  {
    id: "rr5", m: "rr", term: "Equity risk premium",
    def: "The extra return investors demand for holding equities rather than government bonds.",
    edge: "It is not observable, it is estimated — which means every cost of equity in every model rests on an assumption someone chose.",
  },
  {
    id: "rr6", m: "rr", term: "Systematic vs idiosyncratic risk",
    def: "Systematic risk hits the whole market — rates, recessions, war. Idiosyncratic risk is specific to a company — a recall, a fraud, a lost contract.",
    edge: "Diversification removes the second and never the first. That asymmetry is the entire logic behind CAPM's structure.",
  },
  {
    id: "rr7", m: "rr", term: "Diversification",
    def: "Holding assets that do not move together, reducing portfolio volatility without giving up proportional return.",
    edge: "Correlations rise in crises. The diversification you were counting on tends to disappear exactly when you need it.",
  },
  {
    id: "rr8", m: "rr", term: "Sharpe ratio",
    def: "Return above the risk-free rate divided by volatility — return earned per unit of risk taken.",
    edge: "It is how you compare a 20% return with wild swings to a 12% return with none. It also punishes upside volatility, which is the standard objection to it.",
  },
  {
    id: "rr9", m: "rr", term: "Volatility as a risk proxy",
    def: "Standard deviation of returns, used across finance as the working definition of risk.",
    edge: "Value investors reject it: volatility is the chance of a bumpy ride, while risk is the chance of permanent loss of capital. Holding both views in your head is the sophisticated answer.",
  },
  {
    id: "rr10", m: "rr", term: "Criticisms of CAPM",
    def: "One factor cannot explain returns; betas are unstable and backward-looking; volatility is treated as risk; it assumes everyone holds the market portfolio and can borrow at the risk-free rate.",
    edge: "Being able to state the model and then critique it is precisely the depth that separates a prepared freshman from a memorised one.",
  },
  {
    id: "rr11", m: "rr", term: "Efficient market hypothesis",
    def: "Weak form: prices reflect past prices. Semi-strong: prices reflect all public information. Strong: prices reflect everything, including private information.",
    edge: "Do not argue markets are dumb. Argue where they are least efficient and why — small caps, forced sellers, complex spin-offs, time-horizon mismatch.",
  },

  /* ---- Derivatives ---- */
  {
    id: "dv1", m: "dv", term: "Derivative",
    def: "A contract whose value comes from something else — a stock, an index, a rate, a barrel of oil. You take exposure without owning the underlying.",
    edge: "Every derivative question reduces to three questions: what is the payoff, who is on the other side, and what happens if the market moves against them?",
  },
  {
    id: "dv2", m: "dv", term: "Forward",
    def: "A private agreement to buy or sell an asset at a set price on a set future date.",
    edge: "Customisable, off-exchange, and carrying counterparty risk — if your counterparty fails, your hedge fails with them.",
  },
  {
    id: "dv3", m: "dv", term: "Future",
    def: "The standardised, exchange-traded cousin of a forward, with daily mark-to-market and margin posted to a clearing house.",
    edge: "The mark-to-market is the whole point: it converts one big credit risk at maturity into a daily settlement, so the clearing house replaces your counterparty.",
  },
  {
    id: "dv4", m: "dv", term: "Call option",
    def: "The right, not the obligation, to buy the underlying at a set strike price before expiry, in exchange for a premium.",
    edge: "Frame it as asymmetry: your loss is capped at the premium, your upside is not. That shape is why options exist at all.",
  },
  {
    id: "dv5", m: "dv", term: "Put option",
    def: "The right to sell at a set strike price. It gains value as the underlying falls.",
    edge: "Describe it as insurance on a position you own — you pay a premium, and you claim only if the bad outcome happens.",
  },
  {
    id: "dv6", m: "dv", term: "Buying vs selling an option",
    def: "The buyer pays a premium for a right. The seller collects the premium and takes on an obligation.",
    edge: "The seller's payoff is a small, steady gain against a rare large loss. Explaining why anyone accepts that trade — premium income, hedged books, a view on volatility — shows you understand both sides.",
  },
  {
    id: "dv7", m: "dv", term: "Intrinsic vs extrinsic value",
    def: "Intrinsic value is what the option is worth if exercised right now. Extrinsic value is everything you pay above that, for the time and volatility remaining.",
    edge: "At expiry extrinsic value is zero by definition. Every option is a decaying asset for the buyer and a decaying liability for the seller.",
  },
  {
    id: "dv8", m: "dv", term: "What drives an option's price",
    def: "Price of the underlying versus the strike, time to expiry, volatility, interest rates, and dividends.",
    edge: "The one to internalise: more time and more volatility raise the value of calls and puts alike, because both increase the chance of finishing deep in the money while the downside stays capped at the premium.",
  },
  {
    id: "dv9", m: "dv", term: "Moneyness",
    def: "In the money, at the money, or out of the money — whether exercising right now would produce a gain.",
    edge: "At-the-money options carry the most extrinsic value, because that is where uncertainty about the final outcome is greatest.",
  },
  {
    id: "dv10", m: "dv", term: "Swap",
    def: "An exchange of cash flow streams. Most commonly a company swaps a floating interest rate for a fixed one.",
    edge: "Explain the motive, not the mechanics: a borrower with floating-rate debt and fixed-rate revenue uses a swap to stop a rate move from wrecking its budget.",
  },
  {
    id: "dv11", m: "dv", term: "Hedging vs speculating",
    def: "The same instrument does both. What makes a trade a hedge is that it offsets an exposure you already carry.",
    edge: "An airline buying oil futures is hedging. A fund buying the same contract with no fuel exposure is speculating. The contract cannot tell you which.",
  },
  {
    id: "dv12", m: "dv", term: "Leverage and margin",
    def: "Derivatives let you control a large notional exposure with a small amount of capital posted as margin.",
    edge: "The risk is not just the loss, it is the timing — margin calls arrive precisely when the market has moved against you and cash is hardest to find.",
  },

  /* ---- Markets ---- */
  {
    id: "mk1", m: "mk", term: "Bond prices and yields move inversely",
    def: "If newly issued bonds pay more, an existing bond paying less must fall in price until its yield is competitive.",
    edge: "Explain the mechanism, not the rule. The coupon is fixed, so the only thing that can adjust to a new market yield is the price.",
  },
  {
    id: "mk2", m: "mk", term: "Duration",
    def: "Roughly how much a bond's price moves for a one-percent change in rates. Longer maturity and lower coupon mean more sensitivity.",
    edge: "The intuition generalises to equities: a company whose cash flows arrive far in the future is a long-duration asset and gets hit hardest when rates rise.",
  },
  {
    id: "mk3", m: "mk", term: "Yield curve",
    def: "Yields plotted across maturities. Normally upward sloping; inverted when short-term yields exceed long-term.",
    edge: "Inversion is not magic. It says the market expects rates — and therefore growth — to be lower later, and it also squeezes banks that borrow short and lend long.",
  },
  {
    id: "mk4", m: "mk", term: "Why rates matter for stocks",
    def: "Every asset is priced against the risk-free rate, so a higher discount rate lowers the present value of future cash flows.",
    edge: "The effect is uneven: profitless growth companies fall much harder than mature cash generators, because more of their value sits in distant years.",
  },
  {
    id: "mk5", m: "mk", term: "Real vs nominal",
    def: "Real return is nominal return minus inflation. A 5% return with 4% inflation is a 1% real return.",
    edge: "Whenever someone quotes a return or a growth rate, ask silently whether it is real or nominal. Half of bad macro arguments live in that gap.",
  },
  {
    id: "mk6", m: "mk", term: "Price equals earnings times multiple",
    def: "Any move in a stock decomposes into a change in earnings and a change in what the market will pay for them.",
    edge: "This is the most useful decomposition you own. When asked why a stock moved, separate 'the business changed' from 'sentiment changed' before you say anything else.",
  },
  {
    id: "mk7", m: "mk", term: "Buy side vs sell side",
    def: "The buy side invests capital — funds, asset managers, endowments. The sell side sells research, execution, and deals — banks and brokers.",
    edge: "Know which one the club you are joining is simulating. A trading club and a value investing club will ask you to think in different time horizons.",
  },
  {
    id: "mk8", m: "mk", term: "Long/short equity",
    def: "Owning the stronger business and shorting the weaker one in the same industry, isolating the company view from the market's direction.",
    edge: "Explain what the short is for: it strips out the sector and market moves so what is left is your judgement about the two companies.",
  },
  {
    id: "mk9", m: "mk", term: "Short selling",
    def: "Borrowing shares, selling them, and hoping to buy them back cheaper. Losses are theoretically unlimited.",
    edge: "The asymmetry matters: a stock can only fall to zero but can rise forever, so position sizing and borrow cost are as important as the thesis.",
  },
  {
    id: "mk10", m: "mk", term: "Liquidity",
    def: "How quickly you can exit a position at a fair price.",
    edge: "It is the risk nobody prices until they need it. In a panic, the asset you can sell is not the one you want to sell, it is the one that still has a bid.",
  },
  {
    id: "mk11", m: "mk", term: "Market cap vs float",
    def: "Market cap is total value; float is the portion of shares actually available to trade.",
    edge: "Low float explains violent moves that have nothing to do with fundamentals — a small amount of buying pressure hits a thin supply of shares.",
  },
]

const BY_ID = new Map(MODULES.map((m) => [m.id, m]))

export function modCode(id: ModuleId): string {
  return BY_ID.get(id)?.code ?? ''
}

export function modName(id: ModuleId): string {
  return BY_ID.get(id)?.name ?? ''
}
