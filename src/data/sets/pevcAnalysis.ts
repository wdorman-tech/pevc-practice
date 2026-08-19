import type { RawGroup } from './bank'

/**
 * Wharton Undergraduate PEVC Club — Investment Analysis committee.
 * The committee's work product is a keynote pitch for a PE or VC target plus
 * the model underneath it, so this set runs sourcing -> thesis -> model -> defense.
 */
export const PEVC_ANALYSIS: RawGroup[] = [
  {
    category: 'PEVC – Sourcing & Screening',
    items: [
      {
        q: 'You have no proprietary deal flow. How do you actually source a target for a club pitch?',
        core: true,
        a: `Work backwards from the constraint: you need a company with public financials or a well-covered private story, otherwise you cannot build a defensible model.

Practical funnels: (1) small- and mid-cap public companies, $200M–$3B equity value, where a take-private is plausible; (2) recent divestiture and carve-out announcements — a parent selling a division tells you the asset is available; (3) sponsor-owned companies approaching year five, visible from press releases and PE firm portfolio pages; (4) founder-owned businesses in fragmented industries with an obvious roll-up angle; (5) sponsors' own theme pages and quarterly letters, which tell you what the market is already hunting.

Then screen the funnel on LBO-ability before you fall in love with a story. A great narrative on a business that cannot carry debt is a wasted month.`,
      },
      {
        q: 'What makes a good LBO candidate?',
        core: true,
        a: `Cash flow first, everything else second. The checklist:

• Stable, predictable revenue — contracted, recurring, or consumable, not project- or cycle-driven.
• Healthy and defensible margins, ideally with room to improve.
• Low capex intensity and modest working capital drag, so EBITDA actually converts to free cash flow.
• Hard assets or receivables to secure debt against, which lowers the cost of the capital structure.
• Non-core assets or an underused balance sheet you can monetize.
• A clean, obvious exit: strategic buyers who have paid up before, or a larger sponsor.
• Low current leverage, so there is room to lever.
• A management team you would keep, or a clear plan to replace them.

The anti-candidate is a cyclical, capex-heavy, customer-concentrated business at peak margins.`,
      },
      {
        q: 'Walk me through the screen you would run to build an initial target list.',
        a: `Start quantitative, end qualitative.

Quantitative cuts: EV of $200M–$3B; EBITDA margin above ~15%; net debt / EBITDA below ~2.5x; capex under ~5% of revenue; positive free cash flow in each of the last three years; EV/EBITDA below the sector median. That takes hundreds of names to twenty.

Qualitative cuts on the twenty: is the revenue actually recurring, or just repeatable-until-it-is-not? Is the customer base concentrated? Is the cheapness explained by a secular decline (retail footprint, hardware in a software transition, one expiring contract)? Is there a controlling holder who will never sell?

Then pick two or three and go deep. The screen is a filter, not a thesis — the pitch lives in the qualitative work you do after it.`,
      },
      {
        q: 'Why is a public company sometimes the easier target than a private one, and what does the take-private math look like?',
        a: `Public companies give you audited financials, a decade of filings, transcripts, and a visible price — everything a pitch needs. A private target forces you to make up the numbers, and judges notice.

The take-private math: start at the unaffected share price, add a control premium — historically 20–35%, wider in a beaten-down name — to get the offer price. Offer price times fully diluted shares (treasury method for options and RSUs) gives equity purchase price; add debt, subtract cash to reach enterprise value. Divide by LTM EBITDA to sanity-check your entry multiple against precedents.

The premium is the part people forget. If you model an entry at the current trading multiple, you have modeled a deal that will never happen.`,
      },
      {
        q: 'How do you tell whether a target is cheap or cheap for a reason?',
        core: true,
        a: `Ask what the market is pricing and then find the specific thing you believe it has wrong. "Trades at 6x versus peers at 10x" is not a thesis; it is an observation.

Run the diagnostic: has the multiple always been low, or did it de-rate? If it de-rated, on what news? Is the discount explained by mix, leverage, governance, or a single customer? Are earnings actually earnings — check cash conversion, receivable days, and capitalized costs. Are consensus estimates already assuming the decline you are worried about?

Value traps share a tell: the cheapness persists because the cash flow is quietly funding a shrinking asset. If your answer to "why is this cheap" is "investors are irrational," keep looking.`,
      },
      {
        q: 'Why do sponsors like founder- and family-owned businesses?',
        a: `Because the seller is usually not optimizing for the last dollar of price. A founder taking chips off the table after thirty years cares about legacy, employees, and staying involved — which gives a sponsor room to negotiate on structure rather than compete purely on headline value.

Operationally, these companies are usually under-managed in exactly the ways private equity is good at fixing: no professional CFO, no pricing discipline, no ERP, no salesforce incentive plan, working capital left on the table, capex decided by feel. That is real, controllable EBITDA improvement rather than multiple hope.

The catch: financials may be unaudited, personal expenses run through the business (hence the add-back fight), and key relationships live entirely in the founder's head. That is why rollovers and earnouts exist.`,
      },
      {
        q: 'How do you size a market from the bottom up?',
        a: `Bottom-up means building the number out of units and price, not taking a consulting slide at face value.

Structure: identify the buying unit (households, hospital beds, trucks, restaurant locations), count them from a credible source, estimate the share that can realistically buy, multiply by annual spend per unit, then sanity-check against the revenue of the known players in the space. If your TAM implies the market leader has 0.4% share, one of your assumptions is wrong.

Then distinguish TAM, SAM, and SOM honestly. The number that matters for the pitch is not the total addressable market — it is the serviceable slice your company can reach with its current channel, and the growth rate of that slice.`,
      },
      {
        q: 'What does an "angle" mean, and why does a pitch need one?',
        core: true,
        a: `The angle is the answer to "why is this opportunity available to us, and why now?" Without it, a judge assumes someone smarter already looked and passed.

Common legitimate angles: the business is a non-core division of a distracted parent; the sponsor owner is at the end of its fund life and needs liquidity; a founder needs a succession solution; the company is too small to be covered and too complicated to be screened; a temporary earnings problem — a lost contract, an inventory cycle, a legal charge — has masked the underlying business; or a regulatory or capital-structure change just made the asset ownable.

Then pair it with "why us": operating expertise, a management relationship, an adjacent portfolio company, a specific buy-and-build path.`,
      },
      {
        q: 'What red flags kill a target before you spend real time on it?',
        a: `The fast disqualifiers: customer concentration above ~20% without a long contract; a single-product business facing a technology transition; margins at an all-time high going into a cycle; heavy capex just to stand still; recurring "one-time" charges; litigation or regulatory exposure that could swamp the equity; pension or environmental liabilities; a controlling shareholder with no reason to sell; auditor changes or restatements; and cash flow that never matches reported earnings.

Two more that are specific to a club pitch: not enough public disclosure to build a real model, and an announced deal that makes your pitch a merger arb trade instead of an investment thesis.

Kill fast. The scarce resource is your time, not ideas.`,
      },
    ],
  },
  {
    category: 'PEVC – Pitching an Investment',
    items: [
      {
        q: 'Structure a fifteen-minute PE investment pitch.',
        core: true,
        a: `Lead with the recommendation, then earn it.

1. Recommendation — buy X at $Y per share, ~Z% premium, entry at A.Ax EBITDA, target 2.5x MOIC / 25% IRR over five years. One slide.
2. Business overview — what it sells, to whom, how it makes money. Two minutes maximum; judges know less than you but care less than you think.
3. Investment thesis — three pillars, each one falsifiable and each one tied to a number in the model.
4. Market and competitive position — why the moat holds for the hold period.
5. Financial profile — historical growth, margins, cash conversion, leverage capacity.
6. Value creation plan — where the EBITDA growth comes from, operator by operator.
7. Returns — sources and uses, capital structure, the bridge, sensitivities.
8. Risks and mitigants — real ones, with your downside case.
9. Exit — buyer universe by name.

Close on the recommendation again.`,
      },
      {
        q: 'What belongs on the one-page investment thesis slide?',
        a: `Three pillars, each phrased as a claim someone could disagree with, each with the evidence and the model line it drives.

Bad pillar: "Strong market position in a growing industry."
Good pillar: "Contracted maintenance revenue is 62% of gross profit and renews at 94%, so the downside case still covers 6.5x of debt service."

Underneath the pillars, put the entry valuation with its comparison set, the return summary, and the one sentence of why-now. Everything else on the page is decoration.

The test: if a judge only reads this slide, do they know what you are recommending, what has to be true, and what you make if you are right?`,
      },
      {
        q: 'How should you present returns so a judge takes them seriously?',
        core: true,
        a: `Show the base case, then immediately show what breaks it.

Present: sources and uses; the entry and exit multiples with the precedent evidence for both; the leverage at entry and at exit; the IRR and MOIC in base, upside, and downside; and a returns bridge decomposing the gain into EBITDA growth, multiple change, and debt paydown.

The credibility move is to show the downside first — "at 5.5x exit and no margin improvement we still make 1.6x" — because the reflex of every experienced investor is to test the floor. And never present an IRR built on multiple expansion; underwriting exit above entry is the fastest way to lose a room.`,
      },
      {
        q: 'Reconcile IRR and MOIC. Why can a high MOIC deal have a mediocre IRR?',
        core: true,
        a: `MOIC is total cash back over cash in and ignores time. IRR is the annualized rate and is enormously sensitive to timing.

The shortcut math over an n-year hold: IRR ≈ MOIC^(1/n) − 1. So 2.0x in 3 years is ~26%; 2.0x in 5 years is ~15%; 3.0x in 7 years is ~17%. A 3.0x that takes seven years underperforms a 2.0x that takes three.

That is why sponsors care about early dividend recaps and partial exits — pulling cash forward lifts IRR without changing the multiple — and why a fund near the end of its life will sell a good asset. If you are pitching, state the hold period explicitly; an IRR without a duration is not a number.`,
      },
      {
        q: 'A judge asks for the bear case. How do you answer?',
        a: `Answer it as if it were your own view, because pretending you have not thought about it is the only wrong answer.

Structure: state the bear case in its strongest form, quantify it in the model, then say what would have to be true for it to happen and what protects you. "The bear case is that the aftermarket attach rate has been drifting down 100bps a year and that continues — that takes 2029 EBITDA from $180M to $148M and the return to 1.4x. What protects us is the entry leverage at 4.2x and the covenant headroom; we do not breach until EBITDA falls 28%."

Then name the tripwire you would monitor. Judges are testing whether you own the downside, not whether the deal is risk-free.`,
      },
      {
        q: 'You have room for one sensitivity table. Which two variables and why?',
        a: `Exit multiple against entry multiple is the default, because it isolates the assumption you control least. Judges want to see returns when the exit is a turn below entry.

The better answer depends on the thesis. If the pitch is an operational improvement story, sensitize exit EBITDA margin against exit multiple. If it is a growth story, revenue CAGR against exit multiple. If leverage is the point, entry leverage against IRR, showing where the covenant breaks.

What matters is that the axes are the two variables your thesis actually rests on. A table that flexes something irrelevant tells the room you did not know what drives your own deal.`,
      },
      {
        q: 'What is the minimum model that can actually support a PE pitch?',
        a: `A five-year operating model driven by real assumptions, a debt schedule with a cash sweep, and a returns page. That is the floor.

Concretely: revenue built from volume and price or from segment detail, not a blended growth rate; EBITDA with stated margin assumptions; D&A, capex, and working capital as separate lines so you get real free cash flow; a sources and uses with fees; a capital structure with tranche-level pricing and amortization; interest on average balances; a sweep of excess cash to revolver and term loan; and an exit at a stated multiple of exit-year EBITDA with the net debt bridge to equity.

Three cases, one toggle. Anything beyond that — quarterly builds, full three-statement integration — is a bonus, not a requirement.`,
      },
      {
        q: 'How do you defend your exit multiple?',
        core: true,
        a: `With evidence, not optimism. The defensible order:

1. Exit at or below entry. This is the standard sponsor convention and the answer that never gets attacked.
2. If you exit above entry, justify it with a mix shift you are actually modeling — recurring revenue up from 40% to 60% of the total, which the comp set values at a premium you can point to.
3. Support both with precedent transactions in the sector at similar scale, and with where the public comps trade through a cycle, not at today's print.

Also state the buyer. "We exit at 9.0x to a strategic" is more credible when you can name three strategics who have paid 9–11x for similar assets in the last four years.`,
      },
      {
        q: 'How is a VC pitch different from a PE pitch?',
        a: `Different question being asked. PE asks "what can go wrong and do I still get paid?" VC asks "if this works, is it big enough to matter?"

So the structure shifts: the market and the founding team lead instead of the financials; the model is a funding and milestone plan rather than a debt schedule; you underwrite an ownership stake through dilution to an exit value, not a levered cash flow; and the downside case is total loss, which you accept explicitly rather than mitigate.

The return math is also different. PE targets 2–3x with a floor; VC targets a distribution where one investment returns the fund. Pitching a venture deal with a 25% IRR base case and a tidy downside misreads the asset class entirely.`,
      },
    ],
  },
  {
    category: 'PEVC – Venture & Growth',
    items: [
      {
        q: 'How do you underwrite a company with no EBITDA?',
        core: true,
        a: `You underwrite the unit economics and the path, not the current P&L.

Build the business down to a single unit — a customer, a location, a cohort — and ask whether that unit is profitable on a contribution basis. Then ask what it costs to acquire the unit and how long the payback is. If contribution margin is positive and CAC payback is under two years, the losses are a function of growth spend and you can underwrite the scale-up. If contribution margin is negative, growth makes it worse, and no revenue multiple saves you.

Then value on forward revenue or gross profit against comparables, discounted for execution risk, and cross-check with a rough DCF on the mature-state margin the business should reach.`,
      },
      {
        q: 'Explain the power law and what it means for how a VC picks investments.',
        core: true,
        a: `Venture returns are not normally distributed. In a typical fund, most positions return less than capital and a very small number return the whole fund and more.

The consequence: a VC cannot optimize for the probability of a positive outcome, only for the magnitude of the good one. A company with a 90% chance of returning 2x is worse for the portfolio than one with a 10% chance of returning 50x. That is why the diligence questions are "how big can this get" and "what does it look like if it works," not "what is my downside."

For a $100M fund targeting 3x gross, you need $300M back. If you own 15% at exit, you need roughly $2B of exit value in the portfolio — which realistically means one company doing it.`,
      },
      {
        q: 'Pre-money versus post-money, and walk me through the dilution math.',
        core: true,
        a: `Post-money = pre-money + new money. Ownership is always calculated on post.

Example: $8M pre, $2M raise. Post-money is $10M, the investor owns 2/10 = 20%, and existing holders are diluted from 100% to 80%.

The trap is the option pool. If the term sheet says "$8M pre-money including a 10% post-money option pool," the pool comes out of the pre-money — founders fund it, not the new investor. Effective founder ownership after that round is 70%, not 80%.

Then run it forward. Founders holding 60% after a seed, diluted 20% at Series A, 15% at B, and 15% at C, own roughly 60% × 0.8 × 0.85 × 0.85 ≈ 35%. Dilution is multiplicative, which is why the exit value has to grow faster than the cap table.`,
      },
      {
        q: 'What is a SAFE and how does it convert?',
        a: `A SAFE — Simple Agreement for Future Equity — is a pre-priced instrument. The investor gives money now and gets stock at the next priced round instead of a valuation today. It is not debt: no interest, no maturity, no repayment.

Two economic terms matter. The valuation cap sets the maximum valuation at which the money converts, and the discount (typically 10–25%) gives conversion below the round price. The investor gets the better of the two.

Example: $500K on a $10M post-money cap. The Series A prices at $30M post. The SAFE converts as if the valuation were $10M, so the investor gets 5% instead of 1.7%.

Post-money SAFEs — now the YC standard — fix the investor's percentage and push all dilution onto founders. Stacked SAFEs are how founders wake up owning far less than they modeled.`,
      },
      {
        q: 'Which SaaS metrics do you look at, and what are the benchmarks?',
        core: true,
        a: `• ARR and its growth rate. At $10M ARR, good is doubling; at $50M, 60–80%; at $100M+, 40% is strong.
• Net dollar retention — revenue from last year's cohort this year, including expansion and churn. Above 120% is excellent, 100–110% acceptable, below 100% means you are filling a leaking bucket.
• Gross margin — 75–85% for real software; 50s means services or infrastructure hiding inside.
• CAC payback — sales and marketing spend divided by new ARR times gross margin, expressed in months. Under 12 is elite, under 24 is fine.
• Magic number — net new ARR over prior-quarter S&M. Above 0.75 means keep spending.
• Rule of 40 — growth rate plus FCF margin ≥ 40.
• Logo versus dollar churn, which diverge when you lose small customers and keep big ones.`,
      },
      {
        q: 'What is burn multiple and why do investors watch it now?',
        a: `Burn multiple = net burn ÷ net new ARR. It asks how many dollars you consume to manufacture a dollar of recurring revenue.

Under 1x is exceptional, 1–1.5x good, 2x acceptable early, above 3x means the growth is bought rather than earned. It has become the standard efficiency test because it works at any scale and cannot be dressed up the way growth-only metrics can.

Pair it with runway — cash ÷ monthly net burn — and the rule of thumb that a company should raise with 12 months left and never operate under 6. A company with 18 months of runway and a 1.2x burn multiple controls its own timing. One with 7 months and a 3x burn multiple is going to take whatever terms it is offered.`,
      },
      {
        q: 'Walk me through liquidation preference math, participating versus non-participating.',
        core: true,
        a: `Preference sets who gets paid first in an exit.

Setup: investor puts in $20M for 20% at a $100M post-money.

1x non-participating (the standard): at exit the investor takes the greater of $20M or 20% of proceeds. At a $200M exit they convert and take $40M. At an $80M exit they take the $20M preference. The indifference point is $100M.

1x participating ("double dip"): the investor takes $20M off the top and then 20% of the remainder. At a $200M exit: $20M + 20% × $180M = $56M. Common holders get $144M instead of $160M.

Participating preferred and multiples above 1x are how a "good" exit still pays founders and employees very little. Always ask about preference structure before you celebrate a headline valuation.`,
      },
      {
        q: 'Distinguish venture, growth equity, and buyout.',
        a: `Where the risk sits.

Venture: product and market risk. Minority stakes, no debt, most positions fail, returns come from the few that compound. Diligence is team, market, and early traction.

Growth equity: execution and scaling risk. Companies already have product-market fit and often $10M+ of revenue; capital funds sales expansion, geographies, or a founder's partial liquidity. Usually minority, little or no leverage, target 3–5x. Loss rates are far lower than venture, upside is capped lower.

Buyout: financing and operating risk. Control, mature cash-generative businesses, meaningful leverage, returns from EBITDA growth, deleveraging, and multiple movement. Losing money is rare but so is 10x.

Say it as a sentence: venture buys optionality, growth buys a proven engine, buyout buys cash flow and financial engineering.`,
      },
      {
        q: 'How do you diligence a seed-stage company that has almost no financials?',
        a: `You diligence the people, the problem, and the earliest evidence.

Team: have they done a hard thing before, do they have unusual insight into this specific problem, and is the founding team complete for the next 18 months?

Problem: is it acute and budgeted, or a nice-to-have? Talk to five potential customers — that is the highest-signal work available at seed, and almost nobody does it.

Evidence: usage frequency and retention curves matter more than revenue. A cohort curve that flattens is worth more than a big pipeline. Look at organic versus paid signups, sales cycle length, and whether early customers expanded.

Then the structural questions: cap table sanity, technical defensibility, and whether the market can support a company big enough to matter.`,
      },
    ],
  },
  {
    category: 'PEVC – Diligence & Value Creation',
    items: [
      {
        q: 'What is a quality of earnings report and which adjustments get fought over?',
        core: true,
        a: `A QofE is third-party accounting diligence that converts reported EBITDA into a run-rate number a buyer will actually underwrite and lenders will accept for leverage.

Standard adjustments: owner compensation above market, personal expenses, one-time legal and settlement costs, non-recurring professional fees, normalized rent for related-party property, and the annualization of price increases or new contracts already in place.

The contested ones: "pro forma synergies" from acquisitions not yet closed; run-rating a partial-year customer win; adding back genuinely recurring restructuring; deferred revenue haircuts in purchase accounting; and capitalized costs that should have been expensed.

The QofE also catches revenue recognition timing, cut-off issues, and working capital seasonality — which is where the net working capital peg in the purchase agreement comes from.`,
      },
      {
        q: 'What does commercial due diligence actually try to answer?',
        a: `Whether the revenue in your model shows up. It is the market-facing counterpart to the QofE.

The questions: how big is the addressable market and how fast is it really growing; what is the company's share and is it gaining or holding; why do customers buy this rather than the alternative; how sticky are they and what is the true churn by cohort; how concentrated is the customer base and are the big contracts up for renewal in your hold period; what is pricing power actually like; and what would a competitor have to do to take the business.

The work is customer interviews, channel checks, win/loss analysis, and third-party market data. If CDD says the market is growing 3% and your model assumes 9%, you either change the model or change your mind.`,
      },
      {
        q: 'What is in a 100-day plan?',
        a: `The first 100 days set the trajectory of the hold, so the plan is written before close, not after.

Governance and people: install the board, confirm or replace the CFO, set the reporting package and the monthly cadence, roll out the management incentive plan.

Reporting: a real 13-week cash flow, a KPI dashboard, and monthly close inside ten days. Most founder-owned businesses cannot do this on day one.

Quick wins: pricing actions, procurement consolidation, ending unprofitable SKUs or customers, working capital — terms, collections, inventory.

Longer arcs started early: systems, sales incentive redesign, the M&A pipeline for the buy-and-build.

Each item gets an owner, a date, and an EBITDA number. The plan is a commitment document, not a slide.`,
      },
      {
        q: 'Decompose a sponsor return into its sources.',
        core: true,
        a: `Three drivers, and every returns bridge separates them:

1. EBITDA growth — revenue growth times margin change. The only source that creates value rather than transferring it.
2. Multiple expansion or contraction — exit multiple versus entry. Market-dependent, which is why underwriting it is frowned upon.
3. Debt paydown and cash generation — free cash flow reduces net debt, so equity grows even if enterprise value is flat.

Illustrative: buy at 10x $100M EBITDA = $1B EV, 5x leverage = $500M debt, $500M equity. Five years later EBITDA is $150M, exit at 10x = $1.5B, debt paid down to $300M, equity = $1.2B. That is 2.4x. Attribution: $500M from EBITDA growth, $0 from multiple, $200M from deleveraging.

A pitch that cannot draw this bridge does not know why it makes money.`,
      },
      {
        q: 'What operational levers do sponsors pull, in order of speed?',
        a: `Fastest to slowest, which is also roughly cheapest to most expensive:

• Pricing — the single highest-return lever in most middle-market businesses because they have never done a structured price study. 1% of price is often 5–10% of EBITDA.
• Customer and SKU rationalization — cut the tail that consumes service cost and produces no margin.
• Procurement — consolidate vendors, renegotiate, insource or outsource freight.
• Working capital — collections discipline, payment terms, inventory turns. Cash, not EBITDA, but it funds the debt.
• Salesforce productivity — territory design, quota, comp, CRM discipline.
• Footprint and network — consolidate plants, close branches. Real money, 18+ months, capex, and disruption.
• Systems — ERP, pricing tools. Slowest, most likely to go wrong, sometimes unavoidable.`,
      },
      {
        q: 'Explain buy-and-build and the multiple arbitrage that makes it work.',
        core: true,
        a: `A platform acquires smaller companies in the same space, so the sponsor gets EBITDA growth without needing the platform's organic growth to accelerate.

The arbitrage: a $50M EBITDA platform trades at 12x; $5M EBITDA add-ons trade at 6–7x. Every dollar of acquired EBITDA is immediately worth roughly double at the platform's multiple, before any synergies. Add cost synergies — overhead elimination, procurement scale, cross-selling — and the effective entry multiple drops further.

The requirements: a fragmented market with real targets, an integration capability that exists rather than being assumed, debt capacity or an equity line to fund the program, and a management team that can run acquisitions alongside the base business.

The failure mode: buying revenue without integrating it, so you end up with a holding company at a conglomerate discount and an inflated leverage number.`,
      },
      {
        q: 'How does a management incentive plan work and how is it sized?',
        a: `The MIP aligns the team with the equity, not with EBITDA alone. Typically 8–15% of the fully diluted equity is set aside for management, concentrated in the CEO and CFO.

Structure is usually a combination of: options or profits interests struck at the sponsor's entry value, so management makes money only above the entry equity; time-vesting over four to five years to retain people; and performance vesting tied to MOIC or IRR hurdles — for example, a tranche vesting at 2.0x and another at 3.0x.

Management is also asked to roll or invest their own money, which is the point: the sponsor wants downside exposure, not just upside participation. Sizing usually gets renegotiated at add-on-heavy platforms because dilution from acquisitions eats the pool.`,
      },
      {
        q: 'How do sponsors think about exit route at entry?',
        a: `The exit is underwritten on day one, because a five-year hold with no natural buyer is an unfunded assumption.

Strategic sale — the highest-value route, since a strategic can pay for synergies a sponsor cannot. Test it by naming acquirers and what they have paid historically.

Sponsor-to-sponsor — the most common outcome. Requires that the asset still has a leverage and growth story for the next owner, which means you cannot strip it during your hold.

IPO — only viable at scale (roughly $100M+ EBITDA), a clean equity story, and a receptive window. Sponsors usually exit over years post-listing, so it is a route to liquidity rather than a sale.

Also increasingly: continuation vehicles for assets a sponsor wants to keep, and dividend recaps as partial de-risking.`,
      },
      {
        q: 'What actually kills returns in practice?',
        a: `Rarely a dramatic blow-up; usually a slow squeeze.

• Overpaying at entry, then needing multiple expansion just to reach a base case.
• Underwriting a peak-cycle EBITDA as normalized.
• Add-backs that never materialize, so real leverage is a turn higher than the model.
• Capex that turns out to be maintenance rather than growth, so free cash flow never arrives.
• A management team the sponsor keeps too long out of politeness.
• Integration of add-ons that consumes the platform's management bandwidth.
• Rate moves on floating-rate debt — a 400bps move on 5x leverage is a large share of cash flow.
• Exit timing forced by fund life rather than chosen.

Notice that most of these are decisions, not events.`,
      },
    ],
  },
]
