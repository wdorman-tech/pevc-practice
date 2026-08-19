import type { RawGroup } from './bank'

/**
 * The shared vocabulary. What every PEVC Club and WITG member is expected to
 * know regardless of which committee or investment team they sit on.
 */
export const PEVC_GENERAL: RawGroup[] = [
  {
    category: 'Private Markets – Fund Structure & Economics',
    items: [
      {
        q: 'How is a private equity fund structured?',
        core: true,
        a: `A closed-end limited partnership. The GP — the firm — manages it; LPs — pensions, endowments, sovereign wealth funds, insurers, family offices, fund-of-funds — provide the capital. The limited partnership agreement governs everything: strategy limits, concentration caps, fees, the waterfall, key-person provisions, and removal rights.

LPs do not wire money at the start. They make commitments, and the GP draws capital down as deals close, usually over a three-to-five-year investment period. Uncalled commitments are dry powder; failure to fund a capital call carries harsh penalties.

The GP also invests its own money — the GP commitment, typically 1–5% of the fund — so that partners have real capital at risk alongside LPs. Funds are usually ten years with two one-year extensions.`,
      },
      {
        q: 'Explain "2 and 20."',
        core: true,
        a: `Management fee and carried interest.

The management fee — historically 2% — is charged on committed capital during the investment period and typically steps down to invested capital afterwards, which prevents a GP from being paid on money it never deployed. Larger funds have compressed toward 1.25–1.75%. It pays salaries and overhead; it is not meant to be the profit.

Carried interest — 20% of profits — is the actual economics. It is paid only after LPs receive their capital back plus the preferred return, and it is the reason a GP cares about MOIC rather than fee income.

Carry is taxed as capital gains if the holding period is met, which is the source of the long-running "carried interest loophole" argument.`,
      },
      {
        q: 'Walk through the distribution waterfall, including the hurdle and the catch-up.',
        core: true,
        a: `Four tiers, in order:

1. Return of capital — LPs receive 100% of distributions until they have their contributed capital back.
2. Preferred return (hurdle) — LPs receive distributions until they have earned an 8% IRR, the market standard.
3. GP catch-up — the GP then receives most or all distributions (often 80–100%) until it holds 20% of the profits distributed so far.
4. Split — everything after that is 80/20 LP/GP.

European (whole-of-fund) waterfall: carry is paid only after every LP has been made whole across the entire fund. American (deal-by-deal): carry can be paid as individual deals exit, which pulls GP economics forward and is friendlier to the GP. European is standard in Europe and increasingly common in the US.`,
      },
      {
        q: 'What is a clawback and when does it bite?',
        a: `A provision requiring the GP to return previously distributed carry if, at the end of the fund's life, it turns out to have received more than its 20% share of total profits.

It exists because of deal-by-deal waterfalls: a fund exits three winners early, pays carry on them, and then the remaining portfolio disappoints. Without a clawback the GP keeps carry on a fund that never cleared the hurdle overall.

Mechanically it is usually calculated at the end of the fund, net of taxes the GP already paid, and often backstopped by escrow accounts holding a portion of carry distributions or by personal guarantees from the partners. Clawbacks are rare in practice and unpleasant when they happen — which is why LPs push for European waterfalls instead.`,
      },
      {
        q: 'What is the J-curve?',
        a: `The shape of a fund's net return over its life. Early years show negative returns because management fees and deal expenses are drawn immediately while portfolio companies are carried at cost and no exits have occurred. As holdings are marked up and realizations begin, the curve turns positive and steepens.

A typical buyout fund is underwater for roughly the first three years and reaches peak performance around years seven to ten.

Two implications. For LPs, early IRRs are meaningless and a new manager cannot be judged on them. For GPs, this is why subscription credit facilities are used — delaying the capital call shortens the measured holding period and lifts reported IRR, without changing a dollar of underlying value, which is why sophisticated LPs ask for IRR both with and without the credit line.`,
      },
      {
        q: 'Define TVPI, DPI, and RVPI, and say which one an LP trusts most.',
        core: true,
        a: `• DPI (distributions to paid-in) — realized cash returned ÷ capital called. Cash in hand. Cannot be argued with.
• RVPI (residual value to paid-in) — the GP's mark on what is still held ÷ capital called. Unrealized and self-reported.
• TVPI (total value to paid-in) = DPI + RVPI. The headline multiple.

An LP trusts DPI. A fund reporting 2.1x TVPI with 0.3x DPI in year eight is telling you that almost all of the return is still a mark, in an exit environment that has not validated it.

Also distinguish gross from net. Gross is deal-level before fees and carry; net is what an LP actually receives. The spread is usually 5–8 percentage points of IRR, and any manager quoting gross without offering net is doing so deliberately.`,
      },
      {
        q: 'Why is IRR a flattering metric, and how do managers manage it?',
        a: `IRR assumes interim distributions are reinvested at the IRR itself, and it rewards speed more than magnitude. That makes it manipulable in three legitimate-looking ways.

1. Subscription lines. The GP funds a deal with a credit facility and calls LP capital months later. The clock starts late, so the same profit over a shorter measured period produces a higher IRR.
2. Early exits and dividend recaps. Pulling cash forward raises IRR even when it lowers total value.
3. Holding losers. An unrealized position marked at cost does not drag the IRR the way a realized loss does.

The defenses LPs use: net DPI, TVPI, and public market equivalent (PME) benchmarks that compare fund cash flows against investing the same amounts in an index.`,
      },
      {
        q: 'Who are the LPs and what do they actually care about?',
        a: `Public pensions, corporate pensions, endowments and foundations, sovereign wealth funds, insurers, funds-of-funds, and increasingly private wealth channels.

Their concerns are not identical to a GP's. They care about: net returns relative to public markets (the PME test); pacing and vintage diversification so they are not concentrated in one entry environment; the denominator effect, where a public market drawdown pushes their private allocation above policy limits and forces them to slow commitments or sell in the secondary market; liquidity, because they have spending obligations and distributions have slowed; team stability and key-person risk; and fee transparency.

A GP raising a fund is selling against those constraints, not just presenting a track record.`,
      },
      {
        q: 'What is a continuation vehicle and why has it become common?',
        a: `A GP-led secondary in which a sponsor moves one or more portfolio companies out of an ageing fund into a new vehicle, backed by new secondary investors, while existing LPs choose between cashing out and rolling into the new structure.

The stated rationale: the asset still has runway, the fund is out of time, and forcing a sale would destroy value. The uncomfortable part: the GP is on both sides — setting the price at which it sells to itself — so LP advisory committee approval, third-party fairness opinions, and a competitive bid process matter.

They now make up a large share of secondary volume, driven by the slow M&A and IPO environment. The honest read is that they are a legitimate tool for genuinely good assets, and a way to defer bad news everywhere else.`,
      },
      {
        q: 'What happens to the fee structure and the fund when a GP raises the next vintage?',
        a: `Funds are raised on a two-to-four-year cycle, so a firm always has one fund investing, one harvesting, and one being marketed.

At a new fund's first close, the prior fund's management fee typically steps down from committed to invested capital, which is why the timing of successor fundraises matters to LPs — an overlapping investment period means paying full fees twice.

The successor also inherits scrutiny: LPs re-underwrite the team, examine attribution (which partners actually generated the returns), test whether strategy drift has occurred, and negotiate terms. Strong performers raise larger funds faster; weak ones extend, cut targets, or fail to raise at all.

Fund size growth is itself a risk factor: the strategy that generated returns at $500M may not exist at $3B.`,
      },
    ],
  },
  {
    category: 'Private Markets – Landscape & Strategies',
    items: [
      {
        q: 'Map the alternatives universe.',
        core: true,
        a: `• Buyout — control, leverage, mature cash flows. Target 2–3x, 20%+ IRR.
• Growth equity — minority, little leverage, proven product, funding expansion.
• Venture — minority, no leverage, power-law outcomes.
• Private credit — direct lending, mezzanine, opportunistic and distressed. Contractual return, downside protection, less upside.
• Real estate — core through opportunistic, valued on cap rates and NOI.
• Infrastructure — long-duration, contracted or regulated cash flows, lower return and lower volatility.
• Secondaries — buying existing LP interests or GP-led vehicles, often at a discount, with a shorter J-curve.
• Hedge funds — liquid strategies: long/short, event-driven, macro, quant, credit.

The useful axis is not asset class but where the return comes from: operational improvement, financial structuring, contractual yield, or mispricing.`,
      },
      {
        q: 'Why has private credit grown so quickly?',
        core: true,
        a: `Supply and demand met at the right moment.

Supply of borrowers: post-2008 bank capital rules pushed leveraged lending off bank balance sheets, and sponsors wanted execution certainty, speed, and confidentiality that a syndicated process cannot promise.

Demand from investors: floating-rate, senior-secured paper yielding high single digits to low double digits, with contractual cash return, is attractive to insurers and pensions that need yield without duration risk.

The structural advantages: a single lender or small club can be negotiated with in a downturn, covenants are tighter than cov-lite broadly syndicated loans, and there is no mark-to-market volatility.

The risks now debated: marks are model-based rather than traded, PIK income is rising as borrowers conserve cash, and the asset class has never been through a full default cycle at this size.`,
      },
      {
        q: 'Megafund versus middle market versus lower middle market — how do the strategies differ?',
        a: `Megafund ($10B+ funds, $1B+ equity checks): large, often public-to-private, competitively auctioned, priced efficiently. Returns come from scale operating platforms, sector expertise, and financing sophistication. Multiple expansion is rare because the entry price is set by a broad auction.

Middle market ($1–5B funds, $50–300M checks): companies with $20–100M EBITDA, some proprietary sourcing, real room for professionalization, and add-on programs. The historical sweet spot for returns.

Lower middle market (sub-$1B funds): founder-owned businesses under $20M EBITDA, bought at 5–8x, where the value creation is basic — a CFO, a pricing study, systems, an acquisition program — and the exit is often to a middle-market sponsor at a higher multiple simply because the business is now bigger and more professional.

Smaller means less efficient pricing and more operational work.`,
      },
      {
        q: 'What is driving take-private activity, and what makes one hard to finance?',
        a: `Drivers: small- and mid-cap public companies trading below where a sponsor would value them, the cost and distraction of public listing for sub-scale issuers, and sponsors holding record dry powder with pressure to deploy.

The mechanics that make it hard: you must pay a control premium of 20–35% over an unaffected price, you inherit a fiduciary process (Revlon duties, go-shop provisions, shareholder litigation), and financing must be committed before signing.

Financing is hardest when the target is cyclical, when the equity check needed to keep leverage at 5x is very large relative to fund concentration limits, or when rate levels mean the interest burden consumes free cash flow. In a high-rate environment sponsors respond with more equity, seller paper, PIK, preferred, or club deals with other sponsors.`,
      },
      {
        q: 'How do you talk about the current exit and fundraising environment without dating yourself?',
        a: `Frame it structurally rather than as a news recap.

The mechanism: exits slowed because bid-ask spreads widened after a rate repricing — sellers anchored to prior marks, buyers underwrote higher discount rates. Slower exits means less DPI back to LPs; less DPI means LPs have less capital to recycle into new commitments; that slows fundraising and concentrates it in the largest managers. Sponsors respond with continuation vehicles, NAV loans, dividend recaps, and longer holds.

Then give your current read with dates attached — "as of my last check on X" — and state what you are watching: the IPO window, syndicated loan issuance, spread levels, and secondary market pricing relative to NAV.

Interviewers are testing whether you understand the plumbing, not whether you memorized a headline.`,
      },
      {
        q: 'Direct lending versus broadly syndicated loans — when does a sponsor pick each?',
        a: `Broadly syndicated: a bank underwrites and sells the loan to CLOs and institutional investors. Cheapest pricing at scale, but the sponsor takes market risk between commitment and syndication, terms are set by market appetite, and the deal becomes public. Typically for larger, well-known credits.

Direct lending: one fund or a small club holds the paper. Pricing is wider — historically 200–400bps more — but the sponsor gets certainty of execution, speed, confidentiality, delayed-draw facilities for add-ons, and a lender it can renegotiate with if things go wrong.

Sponsors pay up for certainty on competitive processes and on smaller or more complicated credits. In stressed markets, direct lending takes share because syndication risk becomes unacceptable; in benign markets, syndicated pricing wins back the large end.`,
      },
      {
        q: 'How does infrastructure differ from private equity in return profile?',
        a: `Infrastructure sells duration and predictability rather than growth.

Cash flows are contracted (take-or-pay, availability payments, long-term offtake) or regulated (utility rate base), often inflation-linked, with high barriers and low demand elasticity. That supports much higher leverage — 60–80% versus 50–60% in a buyout — at cheaper rates and longer tenor.

Returns: core infrastructure targets 6–10% with a large cash yield component; core-plus 10–14%; value-add and greenfield 14–20%, where you take construction, permitting, or merchant price risk. Fund lives are longer, sometimes open-ended, because the assets are meant to be held.

The main risks are not operational but political and regulatory — a rate case, a concession renegotiation, a subsidy change — plus interest rate sensitivity, since these are long-duration bond-like cash flows.`,
      },
      {
        q: 'What is a search fund, and what is an independent sponsor?',
        a: `A search fund is a vehicle in which one or two operators raise a small amount of capital from investors to fund a two-year search for a single business to buy — typically $5–30M enterprise value, family-owned, boring and profitable — which the searcher then runs as CEO. Investors get the right to fund the acquisition and the searcher earns equity through vesting and performance hurdles. It is the most direct path from business school to running a company.

An independent (or fundless) sponsor sources and negotiates a deal first, then raises the equity deal-by-deal from family offices, funds, and high-net-worth investors. No management fee on committed capital, no dry powder, more time pressure — but full economics on the deals that close.

Both exist for the same reason: capital is plentiful, proprietary deals are not.`,
      },
      {
        q: 'How do private equity and hedge funds differ in how they actually make money?',
        core: true,
        a: `PE buys control and changes the business. The return comes from operating improvement, leverage, and time. Capital is locked up for a decade, positions are illiquid and few, and marks are model-based. You are paid for being right slowly.

Hedge funds buy securities and are paid for being right about price. Positions are liquid, can be short, can be levered through financing rather than at the company, and are marked daily. Strategies range from fundamental long/short to event-driven, credit, macro, and systematic. Fees are typically 1.5–2% and 20% with a high-water mark rather than a hurdle-and-carry structure over a fund life.

The cultural difference follows: PE is a diligence-and-execution business measured in years; hedge funds are a research-and-risk business measured in months, sometimes days.`,
      },
    ],
  },
  {
    category: 'Public Markets & Investing Basics',
    items: [
      {
        q: 'What makes a good stock pitch?',
        core: true,
        a: `A variant perception with a reason it exists and a reason it resolves.

The four components: (1) what the market believes, stated specifically — usually visible in consensus estimates or the multiple; (2) what you believe and why, with evidence; (3) why the gap exists — an underfollowed name, a misunderstood segment, an accounting artifact, a time horizon mismatch, forced selling; and (4) what closes it — a catalyst with a date, or a cash flow that compounds until the market cannot ignore it.

Then the risk/reward: target price and downside price with the assumptions behind both, and what would make you wrong.

"Great company, good management, growing market" is not a pitch. It is a description, and it is already in the price.`,
      },
      {
        q: 'What is your edge? Name the three types.',
        core: true,
        a: `Informational — you know something others do not. Rare and mostly illegal at the margin; legitimately available only in under-covered small caps, channel checks, and primary research nobody else bothers to do.

Analytical — you have the same facts and interpret them better. Building the segment model nobody builds, understanding the accounting, decomposing a number the sell side takes at face value.

Behavioral / structural — you can hold a position others cannot. Time arbitrage (owning through two bad quarters), taking the other side of forced selling (index deletion, spinoff dumping, tax-loss selling, ratings-driven bond sales), or being willing to underwrite complexity that screens cannot capture.

For a student, analytical and behavioral are the honest answers. Say which one your pitch relies on — it is the fastest way to sound like an investor rather than a researcher.`,
      },
      {
        q: 'How do you value a company you cannot LBO?',
        a: `Same toolkit, different weighting.

Multiples against the right comp set — right meaning similar growth, margin, and capital intensity, not merely the same SIC code. Choose the metric the business is actually valued on: EV/EBITDA for industrials, EV/Sales or EV/gross profit for unprofitable software, P/E and P/TBV for banks, EV/EBITDAR for lease-heavy retail, FFO and cap rates for REITs.

DCF when cash flows are forecastable, primarily to test what the current price implies rather than to produce a point estimate. Reverse-DCF is often the better use: solve for the growth rate embedded in today's price and ask whether it is plausible.

Sum-of-the-parts when segments deserve different multiples. Asset value or replacement cost as a floor.

Then triangulate and say which method you weight and why.`,
      },
      {
        q: 'Why do catalysts matter, and what counts as one?',
        a: `Because being right about value and wrong about timing is indistinguishable from being wrong, especially in a fund that is marked monthly.

Hard catalysts have dates: earnings, an investor day, a product approval, a contract award, a court ruling, a spinoff completion, index inclusion, debt maturity, the end of a lockup.

Soft catalysts are directional: margin inflection as a cost program annualizes, a mix shift crossing a threshold, capex rolling off into free cash flow, an activist accumulating, insider buying.

A pitch should name the catalyst and the window. "This is cheap and will re-rate eventually" is a position, not a trade. Note that the catalyst can also be the absence of one: if free cash flow yield is 12% and the company is buying back 8% of shares a year, time itself is the catalyst.`,
      },
      {
        q: 'How do you think about position sizing and risk/reward?',
        a: `Size to conviction and to downside, not to upside.

The basic frame: estimate a base, bull, and bear price with rough probabilities, and compute expected value. Then look at the ratio of upside to downside — most investors want at least 3:1 before taking a full position, and demand more when the downside is estimated with less confidence.

Sizing rules of thumb in a concentrated fund: highest-conviction ideas 5–10%, standard positions 2–5%, starter positions 1%. Constraints on top: liquidity (days to exit at some share of volume), correlation with the rest of the book, and hard limits on single-name and sector exposure.

The discipline that matters most is asymmetry. A portfolio of 3:1 setups can be wrong more often than right and still compound.`,
      },
      {
        q: 'How do you construct a short thesis, and what are the specific risks?',
        a: `Shorts need a mechanism, not just an opinion about valuation. Expensive can stay expensive for years; the durable short theses are: accounting irregularity, structural demand decline, a broken balance sheet with a maturity wall, a fad reverting, or a business whose unit economics never worked.

The asymmetry is against you: upside is capped at 100%, downside is unlimited, and you pay borrow costs and dividends while you wait.

The specific risks: borrow cost and recall, which can force you out at the worst moment; short interest and days-to-cover creating squeeze potential; index inclusion or a large buyback; an acquisition at a premium; and a capital raise that removes the very balance sheet stress you were shorting.

Position sizing is therefore smaller and stops are real.`,
      },
      {
        q: 'A stock is up 8% on a good print. What actually changed?',
        a: `The market's expectation, not the reported quarter. Prices move on the delta versus what was already discounted — the whisper number, the buy-side bar, the positioning.

Decompose it: was it revenue or margin? Was the beat quality (volume, price, mix) or noise (a tax rate, a one-off contract, a currency tailwind)? Did guidance change, and did the multiple move or just the estimates? A stock that rallies on a raise to guidance is repricing forward earnings; one that rallies on an in-line quarter with heavy short interest is repricing positioning.

Also separate equity value from enterprise value effects: a buyback announcement changes share count and leverage, not operating value. A refinancing changes the cost of capital, not EBITDA. Say which line of the value chain moved.`,
      },
      {
        q: 'How do you read a 10-K quickly?',
        a: `A first pass in 45 minutes, in this order:

1. Business section — what they sell, to whom, through what channel, and the segment breakdown.
2. Risk factors — skim for the specific ones (a named customer, a contract renewal, a covenant) and skip the boilerplate.
3. MD&A — management's own bridge for revenue and margin changes. This is where the real explanation lives.
4. Financial statements — three years of revenue, margin, cash flow versus net income, and the trajectory of receivables and inventory relative to sales.
5. The notes that matter: revenue recognition, segments, debt (maturities, rates, covenants), leases, stock comp, and commitments and contingencies.
6. The proxy for compensation metrics — what management is paid on tells you what they will do.

Then compare against last year's 10-K. Changed language is the highest-signal thing in the document.`,
      },
      {
        q: '"Pitch me a stock." How do you answer live?',
        core: true,
        a: `Ninety seconds, structured, then stop and let them dig.

"I would buy X at $Y. It is a [one-line business description] trading at [multiple] versus [comp benchmark]. The market believes [consensus view]. I think that is wrong because [your evidence — one or two specific, verifiable facts]. The gap closes when [catalyst and rough timing]. I see [upside] to $Z and [downside] to $W, so roughly 3:1. The main risk is [real risk], and I would monitor [tripwire]."

Then be ready for: how did you find it, what does the market miss, who is on the other side, what are the unit economics, what would make you sell.

Pick a name you genuinely know — a small cap you researched beats a mega-cap you read about. Know the share price, the market cap, and the last quarter cold.`,
      },
    ],
  },
]
