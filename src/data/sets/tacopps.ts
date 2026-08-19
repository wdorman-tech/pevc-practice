import type { RawGroup } from './bank'

/**
 * Penn WITG — Tactical Opportunities.
 * The team's mandate: "global investments across various sectors in alternative
 * and underlooked segments of the capital structure," including distressed credit.
 */
export const TACOPPS: RawGroup[] = [
  {
    category: 'TacOpps – Capital Structure & Credit',
    items: [
      {
        q: 'Walk down the capital structure and tell me what you are paid for at each level.',
        core: true,
        a: `Top to bottom, priority falls and expected return rises:

• Revolver / super-senior — first lien, usually secured on working capital, cheapest, often undrawn.
• First lien term loan — secured, floating rate (SOFR + spread), maintenance or incurrence covenants, historically ~70% recovery.
• Second lien — same collateral, subordinated claim on it, +300–500bps over first lien, recovery far more binary.
• Senior unsecured notes — fixed rate, structurally behind anything secured, ~40% average recovery.
• Senior subordinated / mezzanine — contractually junior, often with PIK toggle and warrants, low-to-mid teens all-in.
• Preferred equity — no maturity claim on assets, usually PIK dividend, liquidation preference above common.
• Common equity — residual, unlimited upside, first loss.

The TacOpps question is always which rung is mispriced relative to where the value actually breaks.`,
      },
      {
        q: 'What does "underlooked segments of the capital structure" actually mean as an investment strategy?',
        core: true,
        a: `It means fishing where the natural buyer base is absent, so price is set by constraint rather than by value.

Concrete examples: second lien and mezzanine paper too small for institutional syndication; busted converts, which equity funds cannot hold because they are bonds and credit funds will not hold because of the equity option; preferred stock and hybrids that fall between mandates; post-reorg equity that index funds cannot own and credit holders must sell; small unrated bonds below index inclusion thresholds; and bank loans of borrowers that just lost a rating and must be dumped by CLOs at the CCC bucket limit.

The common thread is a forced or absent holder. Your edge is analytical work on a security nobody is set up to own, plus the mandate flexibility to move down the structure when that is where the risk-adjusted return sits.`,
      },
      {
        q: 'Distinguish structural from contractual subordination.',
        core: true,
        a: `Contractual subordination is written in the documents: subordinated notes agree to be paid after senior notes at the same entity. It is a promise.

Structural subordination is about where the debt sits in the corporate tree. Debt at a holding company is structurally subordinated to debt at the operating subsidiary, because the opco's lenders are paid from the opco's assets first and the holdco is merely an equity holder of the opco — it receives only the residual, if any, dividended up.

This is why a HoldCo PIK note yields far more than an OpCo term loan of the same issuer, and why guarantees matter so much: an unguaranteed holdco note is effectively equity with a coupon. In a restructuring, the first analytical step is drawing the entity diagram and asking which box owns the assets and which box owes the debt.`,
      },
      {
        q: 'Incurrence versus maintenance covenants, and what does cov-lite change?',
        a: `Maintenance covenants are tested every quarter regardless of what the company does — total leverage below 5.5x, interest coverage above 2.0x. Breach them and you have a default, which gives lenders a seat at the table early, while there is still enterprise value to negotiate over.

Incurrence covenants are tested only when the company takes an action: issuing debt, paying a dividend, making an acquisition. Do nothing, and nothing is ever tested.

Cov-lite means no financial maintenance covenant — now the norm in broadly syndicated loans. The consequence for a credit investor is that the company can deteriorate for years before any event of default occurs, so the negotiation begins later, at a lower enterprise value, and recoveries have trended below historical averages. It also pushes lenders to rely on the negative covenant package instead, which is where the document fights of the last decade have happened.`,
      },
      {
        q: 'Yield to maturity versus yield to worst, and why does a distressed investor care about neither?',
        a: `YTM is the discount rate equating price to the remaining coupon and principal payments through final maturity. YTW is the lowest yield across every possible redemption date given the call schedule — the relevant number when a bond trades above a call price.

Related mechanics: call protection (non-call periods, then a declining premium schedule) protects your yield if rates fall; OID means a bond issued below par, so part of the return is accretion; and a make-whole provision means early redemption requires paying the present value of remaining payments at a small spread to Treasuries.

A distressed investor stops using yield entirely once default is likely, because the cash flows in the yield calculation are not going to be paid. You switch to a recovery analysis: what is the enterprise value, where does it break, and what do I own in the reorganized entity — expressed as a multiple of money and an expected timeline, not a yield.`,
      },
      {
        q: 'What is a credit spread, and what moves it?',
        a: `The yield above a risk-free benchmark that compensates for credit risk. For a bond, spread to Treasury or the option-adjusted spread; for loans, quoted as SOFR + margin, with a discount margin adjusting for the price versus par.

It decomposes roughly into expected loss (probability of default × loss given default), a liquidity premium, and a risk premium for the uncertainty around those estimates.

Movements come from: the issuer's own fundamentals; the credit cycle and default expectations; fund flows into and out of high yield, loans, and CLOs; and rate volatility. Note the crucial difference in interest rate exposure — fixed-rate bonds carry duration and lose value when rates rise, while floating-rate loans reset, so their price moves are almost entirely credit. That is the main reason loan funds outperform bond funds in a hiking cycle and why levered borrowers get squeezed at exactly that time.`,
      },
      {
        q: 'How do you estimate a recovery, and what does the waterfall look like in a default?',
        core: true,
        a: `Estimate enterprise value in default, then distribute it by priority.

Step one: value the reorganized business — a distressed multiple on a normalized EBITDA, or a DCF, or liquidation value for asset-heavy businesses (which then needs advance rates: receivables 80%, inventory 50%, PP&E far less).

Step two: pay the waterfall. Administrative and priority claims first (professional fees, DIP), then secured claims up to the value of their collateral, then unsecured claims pari passu, then subordinated, then preferred, then equity.

The security where the value runs out is the fulcrum. Historical averages for the US: first lien loans ~65–70%, senior unsecured bonds ~40%, subordinated ~10–20%, but the dispersion is enormous and averages are close to useless for a specific credit. What matters is collateral coverage, the entity structure, and how much secured debt sits ahead of you.`,
      },
      {
        q: 'Which leverage and coverage metrics do lenders actually use?',
        a: `• Total debt / EBITDA and net debt / EBITDA — the headline. Watch the definition of EBITDA in the credit agreement, which permits add-backs the accounting does not.
• Senior secured leverage and first lien leverage — where you sit matters more than the total.
• Interest coverage — EBITDA / cash interest. Below ~1.5x is a distress signal.
• Fixed charge coverage — (EBITDA − capex) / (interest + scheduled amortization). Better, because it counts money the business cannot avoid spending.
• Free cash flow conversion — FCF / EBITDA. The number that determines whether the debt gets paid.
• Loan-to-value using an enterprise value estimate, common in private credit.

The analytical move is always to rebuild EBITDA yourself, strip the add-backs, subtract maintenance capex, and recompute. Reported leverage of 4.5x is often 6x on a real basis.`,
      },
      {
        q: 'Name the credit agreement loopholes that have defined the last decade of LME activity.',
        core: true,
        a: `• Drop-down (J.Crew, 2016) — transferring collateral, in that case IP, to an unrestricted subsidiary outside the lien, then raising new debt secured by it. Lenders wake up with a claim on less collateral.
• Trapdoor / restricted payment capacity (Chewy–PetSmart, 2018) — moving equity of a valuable subsidiary out to a parent or affiliate using investment and RP baskets.
• Uptiering (Serta Simmons, 2020) — a majority of lenders amends the agreement to permit new super-priority debt, then exchanges their own holdings up while leaving the non-participating minority subordinated. Enabled because only a majority, not all lenders, was required for that amendment.
• Non-pro-rata exchanges (Envision, Incora, Wheel Pros) — combinations of the above.

The lesson for a credit investor: the document is the investment. Read the definitions of Unrestricted Subsidiary, Investments, Restricted Payments, and the sacred-rights list before you underwrite the business.`,
      },
      {
        q: 'Where do preferred equity, converts, and other hybrids fit, and why do they get mispriced?',
        a: `Hybrids sit between debt and equity, and they get mispriced precisely because they belong to no one's mandate.

Preferred equity: liquidation preference senior to common, usually a fixed or PIK dividend, sometimes with a redemption date. In a rescue financing it often carries warrants or a conversion feature. It is junior enough that in a real restructuring it usually receives little, so it must be underwritten as equity with a coupon.

Convertible bonds: a bond plus a call option on the equity. Priced by conversion premium, credit spread, and volatility. A busted convert — one whose equity has collapsed so the option is worthless — trades purely on credit, often at a yield above the company's straight bonds, because convert-arb funds are forced sellers and credit funds do not follow the name.

That structural neglect is the whole opportunity.`,
      },
    ],
  },
  {
    category: 'TacOpps – Distressed & Stressed Credit',
    items: [
      {
        q: 'Stressed versus distressed — where is the line, and does it matter?',
        core: true,
        a: `Convention: stressed paper trades roughly 80–90 cents or at a spread of 700–1000bps, with real deterioration but no imminent default. Distressed is below ~70 cents or above 1000bps, where the market is pricing a restructuring.

The distinction matters because it changes the analysis entirely. In stressed credit you are still underwriting cash flows and a refinancing: can they survive the maturity wall, will the sponsor inject equity, can they sell an asset? Your return comes from the pull to par.

In distressed you stop underwriting the coupon and start underwriting ownership: what is the enterprise value, which class is the fulcrum, what do I receive in a plan, how long does it take, and what are the legal risks. The return is expressed as a multiple over an uncertain timeline, and the skill set shifts from credit analysis to bankruptcy law and negotiation.`,
      },
      {
        q: 'What is the fulcrum security and how do you find it?',
        core: true,
        a: `The class at which enterprise value runs out — the most junior claim that is partially paid, and therefore the one most likely to receive the equity of the reorganized company.

Finding it: estimate reorg enterprise value, then stack the claims by priority and walk down until the value is exhausted.

Example: EV of $600M. Ahead of you sit a $150M revolver and a $400M first lien term loan — both covered, so they are likely reinstated or paid. That leaves $50M against $300M of senior unsecured notes. The unsecureds are the fulcrum: roughly 17 cents of value, likely delivered as most of the new equity rather than cash.

That is why the notes might trade at 20 and still be attractive if you think EV is $750M — and worthless if EV is $500M. The whole trade is your enterprise value estimate, so you stress it hard and buy where you are right under conservative assumptions.`,
      },
      {
        q: 'Explain loan-to-own.',
        a: `Buying the fulcrum debt at a discount with the intention of converting it into control equity through the restructuring, rather than being repaid.

Execution: accumulate a blocking position — over one-third of a class blocks plan confirmation, since confirmation requires two-thirds by amount and a majority by number of the voting class. Then join or lead the ad hoc creditor group, negotiate the plan, often backstop the rights offering that funds the emergence (earning a 5–8% backstop fee), and take equity at a valuation you helped set.

The economics: you bought debt at 40 that converts into equity valued at, say, 60 in the plan, and you believe the reorganized business is worth 90.

The risks: the timeline is long and legal costs are real; the court may adopt a different valuation; competing creditor groups can outmaneuver you; and you end up owning an illiquid private equity position in a company that just failed.`,
      },
      {
        q: 'What is a liability management exercise, and why do lenders hate them?',
        core: true,
        a: `An out-of-court transaction that changes a company's debt without filing for bankruptcy — typically a distressed exchange, a drop-down financing, or an uptier — usually engineered by the sponsor with a cooperating majority of lenders.

Why they proliferate: Chapter 11 is expensive and slow, cov-lite documents leave no early trigger, and loose baskets in credit agreements permit exactly these moves. A sponsor facing a maturity wall would rather buy two years and keep its option value than hand the company to creditors.

Why lenders hate them: they are usually non-pro-rata. Participating lenders move up in priority; non-participants are left subordinated, stripped of collateral, or both, on paper they bought as senior secured. The response has been co-operation agreements — lender groups contractually agreeing to act as a bloc and refuse non-pro-rata deals — plus tighter documents on new issues.

For an investor, LME risk is now a required part of every credit underwrite.`,
      },
      {
        q: 'How does DIP financing work, and what makes it attractive?',
        a: `Debtor-in-possession financing is new money lent to a company already in Chapter 11, approved by the court, with superpriority administrative status — paid ahead of essentially all pre-petition claims.

Terms are lender-friendly: high spreads and fees, tight budgets and milestones, and often priming liens under section 364(d), which prime existing secured lenders if the court finds those lenders are adequately protected.

A roll-up lets the DIP lender convert some of its pre-petition claim into the DIP at par, effectively lifting old paper to superpriority — highly valuable and heavily contested.

The strategic point is control, not yield. Whoever provides the DIP sets the budget, the milestones, and often the path to an eventual plan or 363 sale. Existing lenders frequently provide the DIP defensively to prevent someone else from steering the case.`,
      },
      {
        q: 'Compare a 363 sale to a plan of reorganization.',
        a: `A 363 sale is a court-supervised asset sale, free and clear of liens, with liens attaching to proceeds. It is fast — weeks to a few months — and is used when the asset is deteriorating, when there is a ready buyer, or when the business cannot support any capital structure. It typically involves a stalking horse bidder with break-fee protection, then an auction. Creditors then fight over cash, which at least is unambiguous.

A plan of reorganization restructures the balance sheet and keeps the business intact: classes vote, the court confirms, and claims are exchanged for cash, new debt, and new equity. Slower — often 6–18 months — but preserves going concern value and lets the fulcrum creditors take ownership.

If you own the fulcrum, you generally prefer a plan, because a fast 363 often crystallizes a depressed price. Secured lenders sometimes prefer a sale, since they get paid first either way.`,
      },
      {
        q: 'What does it mean to be restricted, and what is a big boy letter?',
        a: `Distressed investing constantly puts you near material non-public information, because the profitable seat is inside the ad hoc committee where the company shares projections in exchange for confidentiality.

Public side means you only have public information and can trade freely. Private (restricted) means you signed an NDA, received MNPI, and cannot trade that issuer's securities until the information is public or you are cleansed — typically through an agreed cleansing date or a public disclosure required by the NDA.

Firms manage this with information walls between a public trading desk and a private restructuring team, and with a formal restricted list.

A big boy letter is an agreement between two sophisticated counterparties in which the buyer acknowledges that the seller may hold MNPI and waives claims on that basis. Common in claims trading, effective in the market, and not a complete legal shield.`,
      },
      {
        q: 'How do you underwrite a distressed credit?',
        core: true,
        a: `Downside first, then work up.

1. Value the business at a trough, not a normalized level. What is EBITDA in the bad case, and what multiple does a distressed sale get?
2. Draw the corporate structure. Which entity owns the assets, which entity issued your paper, and are there guarantees?
3. Read the documents. Collateral, lien priority, intercreditor agreement, baskets, sacred rights, and what a majority can do to you.
4. Stack the claims, including the ones outside the debt: pensions, leases, litigation, environmental, trade payables.
5. Identify the fulcrum and where you sit relative to it.
6. Map the players — who else owns this, what are their bases and their mandates, who can block, who needs a quick outcome.
7. Estimate the timeline and discount to a return.

Then ask what you need to be true. If your return requires a recovery to normal, you are underwriting a rebound, not a distressed credit.`,
      },
      {
        q: 'What does a rescue financing look like, and how is it priced?',
        a: `Money for a company that cannot access ordinary markets, structured so the lender is compensated for stepping in.

Typical terms: a new super-priority or first-out tranche, priced in the low-to-mid teens all-in, often with part of the coupon paid in kind to preserve cash; large upfront and exit fees; warrants or a conversion feature to capture upside; tight financial covenants and reporting; board observation or consent rights; and milestones — asset sales, refinancing, cost targets — that give the lender leverage if missed.

Often paired with a drop-down or a new collateral package that existing lenders permitted, willingly or otherwise.

The lender's underwriting question is not "will this work" but "if it does not, do I own the company at an attractive basis?" A well-structured rescue makes both outcomes acceptable, which is precisely the TacOpps mandate: structure your way into asymmetry when the fundamental picture is uncertain.`,
      },
      {
        q: 'Coercive exchange versus consensual restructuring — what is the difference to a bondholder?',
        a: `A consensual restructuring is negotiated with a representative creditor group; everyone in a class is treated the same, and the deal is documented so that non-participants are not stripped.

A coercive exchange offers holders a new instrument — often at a discount to par but with better priority — while simultaneously using exit consents to gut the covenants on the old instrument, or moving collateral away from anyone who declines. The economics are engineered so that refusing is worse than accepting, even if accepting means taking a loss.

For a bondholder the practical response is organizational: join a creditor group early, sign a cooperation agreement, and hold enough of a series to block. Individual holders get picked off; blocs get negotiated with.

For the analyst, the lesson is that in modern credit the covenant package and the identity of your fellow holders are as important as the enterprise value.`,
      },
    ],
  },
  {
    category: 'TacOpps – Global & Alternative Opportunities',
    items: [
      {
        q: 'How do you compare an opportunity in Brazil against one in Germany?',
        core: true,
        a: `Convert everything to a common risk-adjusted basis rather than comparing headline yields.

Build up the required return: a local risk-free rate, plus a country risk premium derived from sovereign CDS or the sovereign spread over Treasuries, plus the security-specific credit spread. A 14% yield in local currency where the sovereign trades at 400bps and inflation is 6% may be worse than a 9% yield in a stable jurisdiction.

Then adjust for the things that do not show up in the yield: creditor rights and how long enforcement takes in that legal system; whether the courts have historically respected security interests; capital controls and repatriation risk; currency — hedged or unhedged, and what the hedge costs; accounting quality and auditor; and local ownership structures.

The honest conclusion is often that the extra spread is not enough. That is a real answer for a TacOpps interview.`,
      },
      {
        q: 'What risks are specific to emerging market credit?',
        a: `• Sovereign ceiling — a corporate rarely trades through its sovereign, because government stress transmits through taxes, FX access, and banking systems.
• Transfer and convertibility risk — the company can pay in local currency but cannot obtain dollars to service external debt. This is why it is possible to default on foreign currency debt while remaining solvent locally.
• Currency mismatch — dollar debt against local currency revenue. A 30% devaluation raises effective leverage by roughly the same proportion.
• Legal enforcement — collateral in a jurisdiction whose courts move slowly or unpredictably. Note the difference between New York-law and local-law documentation, and whether there is a collective action clause.
• Political risk — expropriation, price controls, export restrictions, subsidy withdrawal.
• Liquidity — thin secondary markets that gap when a global risk-off event occurs, regardless of the credit itself.`,
      },
      {
        q: 'Should you hedge currency on a foreign investment?',
        a: `Depends on whether the currency exposure is part of the thesis and on what it costs.

The cost of a hedge is set by interest rate differentials — covered interest parity — so hedging a high-yielding currency is expensive, and that cost can consume the spread you were being paid to take. The forward points are not a prediction; they are arithmetic.

Typical practice: credit funds hedge currency because they are underwriting a spread, not a macro view, and an unhedged position turns a credit trade into a currency trade. Equity investors more often leave it unhedged, on the argument that local companies have some natural inflation and currency pass-through over long horizons.

The nuance: hedging notional does not hedge value. If the asset falls, you are over-hedged; if it rises, under-hedged. And in the crisis where you most want the hedge, forward markets widen and local counterparties may fail.`,
      },
      {
        q: 'Name some alternative asset types a tactical mandate can reach, and what makes each attractive.',
        a: `• Specialty finance and asset-backed lending — consumer or SME loan portfolios bought at a discount, or facilities lent against them. Return comes from underwriting the collateral pool rather than a corporate.
• Royalties — pharma, music, mining streams. Contractual cash flow with no operating cost and no capex; the risk is the underlying asset's decay curve.
• Litigation finance — funding claims for a share of the award. Uncorrelated with markets, binary at the case level, diversified at the portfolio level.
• Aviation, shipping, rail leasing — hard assets with residual value, cyclical rates, and financing structure that determines the return.
• NAV lending and fund finance — lending against a private equity portfolio's asset value.
• Insurance-linked securities — cat bonds, genuinely uncorrelated, priced on modeled loss.

The unifying case: these are underwritten by few investors, so pricing reflects capacity rather than consensus.`,
      },
      {
        q: 'What actually happens in a market dislocation, and how does a tactical fund position for it?',
        core: true,
        a: `Mechanics of a dislocation: a shock forces holders to sell for reasons unrelated to value. Mutual funds meet redemptions, CLOs hit CCC bucket limits and must sell downgraded loans, banks reduce risk-weighted assets, levered holders face margin calls, and ratings triggers force insurers out of paper. Prices are set by who must sell, not by who thinks it is cheap.

Positioning before: keep dry powder and unused liquidity lines, keep the book liquid enough to rotate, know a watchlist of names and the levels where you would buy, and avoid being the forced seller yourself — which means matching liability duration to asset liquidity.

Acting during: buy the highest-quality paper first, because it falls in sympathy with everything else and recovers first. The classic mistake is spending capital on the cheapest paper on day one when the best risk-adjusted returns show up in senior instruments of good companies.`,
      },
      {
        q: 'How much do you demand for illiquidity?',
        a: `Enough that you would still be satisfied if you had to hold it to maturity, because that is the realistic outcome.

Rough market conventions: private credit prices 200–400bps above comparable syndicated risk; secondaries buy LP interests at discounts to NAV that widen sharply in stressed markets; small unrated bonds trade wide of index-eligible equivalents for no fundamental reason.

The analytical framing: illiquidity is not a risk premium in the ordinary sense but a compensation for optionality you give up — the option to change your mind, to reallocate when better opportunities appear, and to exit when your thesis breaks. That option is worth most when volatility is high, which is exactly when illiquid marks look best because they are stale.

The discipline: size illiquid positions so that a two-year hold in a bad scenario does not impair the rest of the book.`,
      },
      {
        q: 'What structuring tools give you downside protection without giving up upside?',
        a: `• Seniority — move up the capital structure and take equity-like return through structure rather than through risk.
• PIK toggle — let the coupon accrue when cash is tight, so the borrower survives and you compound at a higher rate.
• Warrants or conversion — participate in the recovery you are financing.
• Original issue discount and fees — pull return forward and improve your basis immediately.
• Amortization and cash sweeps — force deleveraging so your position improves over time.
• Call protection — protect the yield if the credit improves and the borrower wants to refinance.
• Board seats and consent rights — governance, so you can act before value leaks.
• Collateral packages and guarantees from the entities that actually own the assets.

The TacOpps sentence is: when you cannot be confident about the outcome, be confident about your claim on it.`,
      },
      {
        q: 'Describe a capital structure arbitrage trade.',
        core: true,
        a: `Taking opposing positions in two securities of the same issuer when their relative prices imply inconsistent views.

Classic form: the bonds price a high probability of default while the equity still trades with meaningful market cap. Buy the bonds and short the equity. If the company files, the equity goes to zero and the bonds recover something — you win on both legs. If it recovers, the bonds pull toward par while the equity rallies, and the trade's success depends on your hedge ratio.

Other versions: long a first lien and short a second lien when the spread between them does not reflect the collateral gap; long a busted convert and short the underlying equity, isolating credit and volatility; long an opco bond and short a holdco bond of the same issuer.

The risks are real: the legs can move independently for long stretches, borrow can disappear, and financing costs accumulate. Structural mispricings persist because arbitraging them requires holding both legs through the noise.`,
      },
      {
        q: 'What is the flexible mandate worth, and what does it cost?',
        a: `Worth: the ability to go wherever risk is best priced. When high yield is tight you buy structured credit; when credit is expensive you do rescue financings; when a country dislocates you buy its sovereign or its best exporters. You are not forced to deploy into an expensive market simply because your mandate says "US large-cap loans." Over a cycle, that optionality is where a large share of the return comes from.

Cost: no benchmark to hide behind, so performance is entirely attributable to judgment. Every new sector demands a new competence, and the failure mode is being a tourist in six markets rather than an expert in one. Diligence is slower, positions are less liquid, and LP reporting is harder because comparability is poor.

The good answer in interview is that flexibility is a discipline, not a licence: you need a hurdle rate that every idea must clear regardless of what it is.`,
      },
    ],
  },
]
