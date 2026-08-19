import type { RawGroup } from './bank'

/**
 * Penn WITG — Special Situations Group.
 * The team's mandate: "corporate spinoffs, mergers and acquisitions, and
 * bankruptcies" where markets misprice the securities involved.
 */
export const SPECIAL_SITUATIONS: RawGroup[] = [
  {
    category: 'Special Situations – Spinoffs & Separations',
    items: [
      {
        q: 'Why do spinoffs create mispricing?',
        core: true,
        a: `Because the securities change hands for reasons unrelated to value.

Forced selling: index funds tracking a large-cap benchmark receive shares of a small-cap SpinCo they are not permitted to hold and sell mechanically. Institutional holders sell for the same reason — wrong market cap, wrong sector, too small to justify coverage.

Information vacuum: SpinCo has no research coverage on day one, no earnings history as a standalone, and a Form 10 nobody reads. Management guidance is thin until the first standalone quarter.

Incentives: management of a spun business often receives fresh equity struck at the post-separation price, and has an interest in guiding conservatively at first.

The result is a well-documented pattern of SpinCo underperformance in the first weeks and outperformance over the following one to three years. The edge is real but not free — it requires doing the work the market skipped, in the window before coverage begins.`,
      },
      {
        q: 'Walk me through the mechanics and timeline of a spinoff.',
        a: `1. Announcement — the board declares intent to separate. Usually 9–18 months before completion.
2. Form 10 filing with the SEC — the standalone disclosure document: carve-out financials, capital structure, the separation and tax matters agreements, and the reasons for the split. Amended several times; the final version is the one that matters.
3. Capital structure decisions — how much debt SpinCo takes, often raised and dividended to the parent before the separation.
4. Record date — shareholders of the parent on this date receive SpinCo shares at a set ratio.
5. When-issued trading — both entities trade on a when-issued basis in the days before separation, giving you a price discovery window and often the widest mispricing.
6. Distribution date — shares are distributed, regular-way trading begins, and index changes occur.

The tradable moments are the Form 10 read, the when-issued window, and the forced-selling flush in the first two weeks.`,
      },
      {
        q: 'What makes a spinoff tax-free, and what is a Morris Trust?',
        a: `Section 355 permits a tax-free distribution if the transaction meets several requirements: the parent must have control (80%) of the subsidiary and distribute substantially all of it; both entities must have conducted an active trade or business for five years; there must be a valid corporate business purpose; and the transaction cannot be a device for distributing earnings. Section 355(e) — the anti-Morris Trust rule — taxes the parent if 50% or more of either entity is acquired within two years of the spin as part of a plan.

A Reverse Morris Trust is the structure used to sell a division tax-efficiently anyway: the parent spins the division to its own shareholders, and the division immediately merges with a third party, provided the parent's shareholders end up owning more than 50% of the combined entity.

Practically: a spin that is tax-free is far cheaper to execute, and the two-year restriction is why a newly spun company often cannot be acquired immediately even when it clearly should be.`,
      },
      {
        q: 'Spin, carve-out, split-off, tracking stock — distinguish them.',
        core: true,
        a: `• Spinoff — the parent distributes 100% of a subsidiary's shares to existing shareholders pro rata. No cash to the parent, no valuation set by the market beforehand, usually tax-free.
• Equity carve-out — the parent sells a minority stake (typically 10–20%) in an IPO, keeping control. The parent raises cash and establishes a public valuation; a full spin of the remainder often follows.
• Split-off — shareholders exchange parent shares for subsidiary shares, an exchange offer rather than a dividend. This shrinks the parent's share count, so it is effectively a buyback paid in subsidiary stock and is used when the parent wants to retire equity.
• Tracking stock — a separate class tracking the economics of a division without legally separating it. Rare now, because the discount to a true separation persists — there is no asset claim and no independent board.

Order of separation completeness: tracker < carve-out < split-off ≈ spin < outright sale.`,
      },
      {
        q: 'How do you trade the parent in a separation — what is a stub trade?',
        a: `A stub trade isolates the part of the parent nobody is valuing. If the parent owns a stake in a listed subsidiary, you can buy the parent and short the listed stake in proportion, leaving yourself owning the remaining business — the stub — at whatever implied value the market has assigned.

The trade works when the implied stub value is absurd: negative, or a trivial multiple of a real business's earnings. Historic examples include holding companies trading below the value of their listed holdings alone.

The frictions matter more than the arithmetic: short borrow on the subsidiary can be expensive or unavailable, the discount can persist or widen for years, tax leakage on an eventual monetization is real (the parent may owe tax on the embedded gain), and there may be no catalyst forcing convergence. Ask specifically what collapses the discount and when — otherwise it is a value observation, not a trade.`,
      },
      {
        q: 'How do index and forced-selling dynamics play out around a separation?',
        a: `On the distribution date, index funds must reconcile their holdings to the benchmark's rules. If SpinCo is not eligible for the parent's index, they sell it — irrespective of price, often within a defined window.

That creates a predictable supply overhang, which is why SpinCo shares frequently trade down in the first days. Then the reverse happens: once SpinCo qualifies for a small- or mid-cap index at the next rebalance, index funds must buy it back, sometimes at higher prices.

The parent also sees flows: it may move between indices as its market cap changes, and its weight in existing indices is adjusted.

The trade is to be the liquidity provider at the flush and the seller into the inclusion bid — but with the discipline of only doing so where the business is one you would own anyway. Flow-based edges are small; being wrong on the fundamentals is not.`,
      },
      {
        q: 'How do you model a sum-of-the-parts for a separation?',
        core: true,
        a: `Build each segment as a standalone business, then subtract what the corporate center hides.

Steps: take segment revenue and EBIT from the filings; add back the allocated corporate overhead and instead subtract a realistic standalone cost structure (public company costs, its own finance, legal, IT — usually $20–60M for a mid-cap); assign each segment a multiple from its own comp set, not the parent's blended multiple; sum the enterprise values; allocate the debt the way the Form 10 says it will be allocated, not pro rata; subtract minorities, pensions, and other claims; then apply tax leakage if the separation is not tax-free.

The two numbers people get wrong are stranded costs — overhead that does not disappear when a segment leaves — and dis-synergies, the procurement scale, shared services, and cross-selling that go away. Both make the sum smaller than the naive parts, and both are where the argument with the market usually is.`,
      },
      {
        q: 'What are dis-synergies and stranded costs, and how big are they?',
        a: `Dis-synergies are the value destroyed by separating: lost purchasing scale, duplicated ERP and shared services, separate audit and insurance, two boards, two investor relations functions, and the loss of any genuine cross-selling. Stranded costs are the parent's overhead that used to be allocated to the departing business and does not leave with it.

Magnitude: for a mid-cap separation, standalone public company costs commonly run $20–60M annually per entity, and total one-time separation costs — systems, rebranding, legal, tax structuring, advisory — often run into the hundreds of millions for a large-cap split.

Management always presents these as temporary and quantified precisely. Test the claim: does the transition services agreement expire before the cost is actually eliminated? Who bears the cost after? A separation that only works if $40M of stranded cost disappears within a year usually does not work.`,
      },
      {
        q: 'What separates a good spinoff from a bad one?',
        a: `Good: the businesses genuinely have different economics, capital needs, and investor bases, so the split removes a conglomerate discount and lets each management team be measured properly. SpinCo goes out with a conservative balance sheet, a management team incentivized in the new stock, and disclosure that reveals a business better than the market assumed.

Bad: the spin is a disposal in disguise. The parent loads SpinCo with debt, extracts a dividend, keeps the good assets, and leaves the new entity with legacy liabilities — pensions, asbestos, environmental, or a declining product line. Watch the leverage that SpinCo emerges with, the terms of the tax matters and indemnification agreements, and whether the parent retained a stake it intends to dump.

The diagnostic question: after reading the Form 10, would you want to be the CEO of SpinCo? If the answer is obviously no, the market's initial selling is not a mispricing.`,
      },
    ],
  },
  {
    category: 'Special Situations – Merger Arbitrage',
    items: [
      {
        q: 'Set up a basic cash merger arb trade and compute the return.',
        core: true,
        a: `Acquirer offers $50.00 cash per share; the target trades at $48.00 after announcement. The gross spread is $2.00, or 4.17% on the $48.00 you put up. If the deal is expected to close in four months, the annualized return is roughly 4.17% × 12/4 ≈ 12.5%, before financing and adjusted for any dividends received while you hold.

The spread exists because the deal might not close. The market's implied probability can be backed out: with a $50 deal price, a $48 current price, and an estimated $35 break price, the implied probability of completion is (48 − 35) / (50 − 35) ≈ 87%.

That is the entire trade — you are underwriting the difference between the market's implied probability and your own, and getting paid a small amount to take a large, asymmetric downside if you are wrong.`,
      },
      {
        q: 'What drives the size of a merger spread?',
        core: true,
        a: `• Regulatory risk — antitrust review, CFIUS, sector regulators, and foreign approvals. The largest driver in big deals.
• Financing risk — is the debt committed, is the acquirer stretched, is there a financing condition?
• Shareholder approval — does the target's base support the price, is there an activist pushing for more, is there a controlling holder?
• Time to close — a longer timeline costs carry even if the probability is high.
• Deal terms — break fees, reverse termination fees, MAC definitions, specific performance rights, ticking fees.
• Acquirer intent — strategic buyers with a signed deal rarely walk; sponsors have a history of renegotiating when markets move.
• Market conditions — spreads widen in risk-off periods because arb capital is levered and gets pulled.

The analytical work is deciding which of these the market is pricing wrong, and being specific about it.`,
      },
      {
        q: 'How is a stock deal different, and how do you hedge it?',
        a: `In a stock deal, the target's shareholders receive acquirer shares at a fixed exchange ratio, so the value of the consideration moves with the acquirer's price. Buying the target unhedged is a bet on both deal completion and the acquirer's stock.

To isolate the spread, buy the target and short the acquirer in the exchange ratio. If the ratio is 0.75 acquirer shares per target share, short 0.75 shares of the acquirer for every target share you own. What remains is the spread between the target's price and 0.75 times the acquirer's price — the pure deal risk.

Complications: the borrow on the acquirer may be tight and expensive precisely because every arb is doing the same trade; you must adjust for dividends on both sides; and if the deal breaks, you are long a falling target and short an acquirer that usually rallies on the news — losses on both legs simultaneously.`,
      },
      {
        q: 'What is a collar, and why is one used?',
        a: `A collar adjusts the exchange ratio within a band of the acquirer's share price, so the value delivered to the target is more stable.

Fixed value collar: the target receives a fixed dollar amount as long as the acquirer trades within the band, with the share count flexing. Outside the band, the ratio fixes and the target takes the price risk.

Fixed ratio collar: the ratio is fixed within the band, so the target bears price movement there, and value is capped or floored outside it.

They are used when the acquirer's stock is volatile or when the parties need to share price risk to get a deal signed. For an arbitrageur, they turn a linear hedge into an option-like one: your hedge ratio must change as the acquirer's price moves through the band, so you are effectively delta-hedging and need to model the payoff explicitly rather than shorting a static amount.`,
      },
      {
        q: 'How do you assess antitrust risk on a deal?',
        core: true,
        a: `Start with the overlap. Do the two companies actually compete in a defined product and geographic market, and what is the combined share? A horizontal deal with a high combined share in a concentrated market — measured by HHI — draws scrutiny; a vertical deal is more likely to be challenged on foreclosure theory, which has had a mixed record in court.

Process: HSR filing, then a 30-day initial waiting period. A second request extends the review substantially and is itself a market signal — spreads typically widen on the announcement of one. The parties may then negotiate remedies: divesting overlapping assets to a credible buyer, or behavioral commitments, which enforcers have grown skeptical of.

Also check: political salience, the current enforcement posture of the agencies, foreign regulators (EU, UK CMA, China SAMR) that can block independently, and whether the merger agreement obligates the acquirer to litigate or divest ("hell-or-high-water" provisions).`,
      },
      {
        q: 'What is a CVR and how do you value one?',
        a: `A contingent value right is deal consideration that pays only if a defined event occurs — most commonly in pharma, where a milestone such as an FDA approval or a sales threshold triggers a payment.

CVRs exist to bridge a valuation disagreement: the buyer will not pay for an uncertain asset, and the seller will not give it away, so the payoff is made contingent.

Valuing one: it is an option. Estimate the probability of the milestone, the timing, and the payment, then discount at a rate reflecting both the risk and the credit of the payer — a CVR is an unsecured obligation of the acquirer. Read the terms extremely carefully: whether it is tradable or non-transferable (which destroys much of its value), the precise definition of the milestone, the diligence obligations placed on the acquirer to pursue it, and expiry.

Historically most CVRs have expired worthless, which is why they usually trade at a fraction of their probability-weighted value.`,
      },
      {
        q: 'Explain the deal protections that determine downside: break fee, reverse termination fee, MAC.',
        core: true,
        a: `Break fee — payable by the target if it walks, typically 2–4% of equity value. It compensates the buyer and deters a topping bid, though it rarely stops a determined one.

Reverse termination fee — payable by the acquirer if it fails to close, usually for financing or regulatory reasons. Size signals conviction: a large RTF in a deal with antitrust risk means the acquirer expects to fight for it. Sponsors historically negotiated RTFs that functioned as a cap on liability — an option to walk for a fee.

MAC / MAE — the material adverse change clause, which allows a buyer to terminate if the target's business deteriorates materially. Delaware courts have set an extremely high bar (only Akorn has succeeded), and the carve-outs typically exclude industry-wide, macro, and pandemic effects unless the target is disproportionately affected.

For an arb, these clauses are the downside: they determine whether a wobble becomes a renegotiation or a break.`,
      },
      {
        q: 'What is a topping bid, and what is bumpitrage?',
        a: `A topping bid is a competing offer at a higher price after a deal is signed. It is the merger arb's upside — the reason arbitrageurs prefer targets where the process was not run competitively, where the board acted quickly, or where a go-shop provision exists.

Bumpitrage is the strategy of buying above the deal price, or accumulating a stake and campaigning publicly, on the argument that the offer undervalues the target — pressuring the board and the acquirer into a bump. It works most often on take-privates by controlling shareholders or management buyouts, where the process was conflicted, and in jurisdictions where appraisal or scheme mechanics give minority holders leverage.

The risk is symmetric: you paid above the certain outcome for an uncertain improvement. If no bump comes, you take a loss on a deal that closed exactly as announced — losing money on a successful merger, which is a distinctive way to be wrong.`,
      },
      {
        q: 'A deal breaks. What actually happens to the securities and to your book?',
        a: `The target typically falls to or below its unaffected pre-announcement price, because the market now knows the company was for sale and nobody else bought it, and because event-driven holders who bought only for the deal all exit at once. That last point often makes the break price worse than the pre-announcement level for a period.

The acquirer usually rallies — it avoided a large payment and dilution — which hurts your short leg in a stock deal, so both legs lose simultaneously.

The book effects are what matter for a fund: merger arb is run levered because individual spreads are thin, so a single break can wipe out many successful deals. That is why position sizing is inverse to break risk, why arbs concentrate on deals with high completion probability, and why the discipline is estimating the downside price before entry rather than the annualized return.`,
      },
    ],
  },
  {
    category: 'Special Situations – Bankruptcy & Restructuring Events',
    items: [
      {
        q: 'Chapter 11 versus Chapter 7 — and why do companies choose one?',
        core: true,
        a: `Chapter 11 is reorganization. Existing management usually stays in place as the debtor-in-possession, an automatic stay halts collection efforts, and the company has an exclusive period (120 days, extendable up to 18 months) to propose a plan. The premise is that the business is worth more operating than liquidated.

Chapter 7 is liquidation. A trustee is appointed, the business stops, assets are sold, and proceeds are distributed by priority. Chosen when going-concern value is below liquidation value, or when a Chapter 11 fails and is converted.

The choice is an enterprise value question: is EBITDA positive and sustainable once the balance sheet is fixed? A retailer with negative store-level contribution liquidates. An over-levered but operationally healthy business reorganizes.

Out of court is generally preferable to both — cheaper and faster — but requires near-unanimous consent, which is why bankruptcy exists as the mechanism to bind holdouts.`,
      },
      {
        q: 'Explain the absolute priority rule, and why equity sometimes still gets something.',
        core: true,
        a: `Absolute priority says senior classes must be paid in full before any junior class receives value: administrative and priority claims, then secured, then unsecured, then subordinated, then preferred, then common. A plan that violates it cannot be crammed down over the objection of a dissenting class.

Yet equity frequently receives a small distribution — warrants, a few percent of new stock — through a consensual plan. The reasons are practical: the senior classes want speed and certainty, and equity (or a junior class) can delay confirmation through litigation over valuation, so the tip is a payment for consent. It also keeps management, who often hold equity, cooperative.

The related concept is a new value exception: existing equity contributing fresh money can retain a stake if the contribution is substantial and market-tested.

For an investor, the lesson is that recoveries are negotiated, not merely calculated. Valuation fights determine where the line falls.`,
      },
      {
        q: 'How do you value and trade an unsecured claim?',
        a: `A claim is a right to a distribution, valued as expected recovery discounted for time and process risk.

Start with the estimated pool: total general unsecured claims, including trade payables, rejected lease and contract damages, litigation, pension shortfalls, and any deficiency claim from an undersecured lender — that last one frequently doubles the pool and is the most common analytical mistake.

Then estimate what value flows to the class, divide by the pool, and discount at a rate reflecting a possibly multi-year timeline.

Trading mechanics differ from securities: bond claims trade like bonds, but trade claims transfer by assignment with representations, and buyers demand protection against disallowance, setoff, and preference exposure (a payment received in the 90 days before filing can be clawed back). Pricing reflects that: trade claims often change hands at a discount to bond claims of identical priority purely because of documentation and diligence friction.`,
      },
      {
        q: 'How does plan confirmation work, and what is a cramdown?',
        a: `Claims are sorted into classes of substantially similar claims. Impaired classes vote, and a class accepts if two-thirds by dollar amount and more than half by number of those voting approve. Unimpaired classes are deemed to accept; classes receiving nothing are deemed to reject.

Confirmation requires satisfying the statutory tests, including the best interests test — every dissenting creditor must receive at least what it would in a Chapter 7 liquidation — and feasibility.

Cramdown is confirmation over a dissenting class. It requires at least one impaired class to have accepted, and the plan must be fair and equitable to the dissenter, which reintroduces absolute priority, and must not unfairly discriminate.

For an investor, this is why blocking positions matter: over one-third of a class by amount can defeat acceptance, which buys a seat at the negotiating table and is the cheapest form of influence in a restructuring.`,
      },
      {
        q: 'What happens in the first days of a case, and why do those motions matter?',
        a: `The automatic stay takes effect on filing: creditors cannot collect, foreclose, or enforce judgments. It is what buys the company breathing room and is why filing is sometimes a strategic weapon rather than a last resort.

First-day motions, heard within days: use of cash collateral or approval of a DIP facility; payment of employee wages and benefits; critical vendor payments (which pay some pre-petition unsecured claims in full while others wait — economically significant and often contested); utility adequate assurance; and cash management.

Watch also for section 365, which lets the debtor assume or reject executory contracts and leases. Rejection creates a damage claim, capped for leases, and is the tool that makes retail and restaurant reorganizations possible.

For an investor, the first-day docket tells you the liquidity runway, who is financing the case, and therefore who will control it.`,
      },
      {
        q: 'How does a rights offering work in a restructuring, and how do backstop parties make money?',
        core: true,
        a: `A plan often needs new money to fund emergence — paying administrative claims, repaying the DIP, providing exit liquidity. Rather than sell equity to outsiders, the plan offers existing creditors the right to buy new equity at a discount to plan value, pro rata to their claims.

A group of creditors agrees to backstop the offering: they commit to purchase any unsubscribed shares, and in exchange receive a backstop fee of typically 5–8% of the committed amount, often paid in additional equity at the same discounted price.

That is the profit engine of loan-to-own. You earn on three layers: the debt bought at a discount, the equity subscribed below plan value, and the backstop fee.

Which is why creditors fight to be in the ad hoc group that negotiates the plan — the value is not evenly available to a class, it accrues to the organized part of it.`,
      },
      {
        q: 'Why is post-reorg equity often cheap?',
        a: `Because the natural holders do not want it. It is distributed to creditors — credit funds, CLOs, banks — whose mandates do not permit equity, so they sell into a market with no research coverage.

The shares usually trade over the counter at first, are not in any index, have no analyst estimates, no earnings history in their new form, and unfamiliar fresh-start accounting. There is often no investor relations function for months and a registration process before listing.

Meanwhile the company itself may be genuinely improved: the balance sheet is de-levered, unprofitable leases and contracts were rejected, and cost structure was reset.

The classic sequence is heavy selling for two or three quarters, followed by a re-rating when the company lists, publishes clean financials, and picks up coverage. The offset is that governance can be messy, the board is creditor-appointed, and some businesses filed for operating reasons that a balance sheet fix does not solve.`,
      },
      {
        q: 'What is fresh-start accounting, and why does it complicate analysis?',
        a: `On emergence, if the reorganization value is less than post-petition liabilities and the pre-petition holders end up owning less than 50% of the new equity, the company applies fresh-start reporting: assets and liabilities are restated to fair value, and any excess of reorganization value over identifiable assets is recorded as goodwill.

The consequences for analysis: historical financials are not comparable to post-emergence ones — the presentation splits into predecessor and successor periods; depreciation and amortization change materially because the asset base was revalued, which distorts EBITDA-to-earnings and the tax picture; and prior-year comparisons in the first standalone year are meaningless.

Also examine the NOLs. Section 382 limits the use of net operating losses after an ownership change, though bankruptcy carries special provisions (382(l)(5) and (l)(6)) that can preserve more of them. A large preserved NOL is real value and is frequently ignored by screens.`,
      },
      {
        q: 'Prepack, pre-negotiated, freefall — what is the difference to a security holder?',
        a: `Prepackaged: votes are solicited before filing. The company enters court with an agreed plan and can emerge in 30–60 days. Cheapest, least value destruction, and typically used for a pure balance-sheet problem where trade creditors are paid in full and only funded debt is impaired.

Pre-negotiated: a restructuring support agreement is signed with key creditor groups before filing, but votes come after. A few months in court, some room for other parties to intervene.

Freefall: the company files without an agreement, usually because it ran out of cash. Exclusivity fights, competing plans, contested valuations, months to years, and enormous professional fees that consume recoveries.

For a holder, the ranking is a duration and cost question. In a prepack you can model your recovery from the RSA terms with reasonable confidence; in a freefall your recovery is a negotiation you have to participate in, and the pot shrinks the whole time.`,
      },
    ],
  },
  {
    category: 'Special Situations – Activism & Corporate Actions',
    items: [
      {
        q: 'What is the activist playbook, and how do you spot a likely target?',
        core: true,
        a: `The playbook: accumulate a stake, publish a thesis, demand specific changes, and escalate to a proxy fight if the board resists. The demands cluster into: operational (cut costs, fix margins), financial (buy back stock, cut the dividend, re-lever or de-lever), strategic (sell a division, spin a segment, sell the whole company), and governance (replace directors or the CEO).

Target characteristics: persistent underperformance against a clean peer set; a valuation gap explainable by structure (a conglomerate, a non-core division); a large net cash balance or an under-levered balance sheet; weak governance — a staggered board, long tenures, low insider ownership; a plausible acquirer nearby; and a shareholder register with enough institutional holders to be receptive.

For an investor, the trade is either anticipating an approach or underwriting the value the changes would create, which requires a view on whether the board will actually concede.`,
      },
      {
        q: 'Schedule 13D versus 13G — what do the filings tell you and when?',
        a: `Both are triggered by crossing 5% beneficial ownership of a class of registered equity.

13D is the activist filing: required when the holder intends to influence control. It must be filed within five business days of crossing the threshold (shortened from ten in the 2023 amendments), and material changes — including a 1% change in position — require prompt amendment, now within two business days. Item 4 states the purpose and is the part worth reading closely.

13G is the passive filing, available to institutions and passive holders, filed on a much lighter schedule.

The information value is real: a 13D is a public signal that a campaign is starting, and the market typically reprices immediately. A 13G converting to a 13D is a stronger signal than an initial 13D, because it means a formerly passive holder has decided to fight. Also watch 13F holdings for accumulation and Form 4 for insider transactions.`,
      },
      {
        q: 'How does a proxy fight work, and what changed with the universal proxy card?',
        a: `A dissident nominates directors and solicits shareholder votes against the board's slate. The company files its proxy, the dissident files a competing one, both campaign, ISS and Glass Lewis publish recommendations that heavily influence institutional voting, and the outcome is decided at the annual meeting.

Before 2022, shareholders voting by proxy had to choose one card — the company's or the dissident's — so mixing and matching was effectively impossible. The universal proxy rule now requires a single card listing all nominees, so shareholders can select individual directors from both slates.

The effect: it is meaningfully easier to win one or two board seats, which has increased the number of settlements before a vote, and shifted campaigns toward nominating small, highly credentialed slates rather than full control contests. For an event investor, that raises the probability that an activist achieves something, which raises the value of anticipating the campaign.`,
      },
      {
        q: 'Tender offer versus exchange offer, and why do odd-lot provisions matter?',
        a: `A tender offer is an offer to buy shares directly from holders, at a fixed price or through a range, usually at a premium and subject to a minimum condition and a specified period (at least 20 business days under SEC rules). An exchange offer swaps one security for another — commonly used in debt restructurings and split-offs.

Odd-lot provisions accept holders of fewer than 100 shares in full, ahead of proration. When a tender is expected to be heavily oversubscribed, an odd-lot holder gets 100% acceptance while a large holder might receive 20%. That creates a small, well-known arbitrage for retail-sized accounts and, more importantly, tells you the issuer wants to reduce its small-holder administrative burden.

For analysis, the real signal is the pricing: a tender well above market says the board believes the stock is undervalued and is willing to concentrate the remaining shareholders' ownership.`,
      },
      {
        q: 'How do you handle the math on a rights issue?',
        a: `A rights issue gives existing holders the right to buy new shares at a discount, in proportion to their holding. The mechanical result is that the share price adjusts to a theoretical ex-rights price (TERP).

Example: 100 shares outstanding at $10, so $1,000 of market value. A 1-for-4 rights issue at $6 raises 25 × $6 = $150. New value is $1,150 over 125 shares, so TERP = $9.20. The right itself is worth roughly $9.20 − $6.00 = $3.20 per new share, or $0.80 per existing share.

The key point: a holder who takes up their rights is not diluted in economic terms — the discount is offset by the value of the right. A holder who does nothing is genuinely diluted and loses the value of the right unless it is traded.

That is why deeply discounted rights issues punish inattentive shareholders, and why they are used when a company must raise capital regardless of price.`,
      },
      {
        q: 'What is a Dutch auction tender, and what does it signal?',
        a: `The company announces a price range and invites shareholders to tender at a price of their choosing within it. The company then sets the clearing price — the lowest price at which it can buy the desired quantity — and pays that price to everyone who tendered at or below it, subject to proration.

Compared with an open-market buyback, it repurchases a large block quickly, lets the market reveal the supply curve, and avoids pushing the price up through sustained buying.

Signals to read: the range relative to the current price; the size relative to market capitalization; whether insiders are tendering, which is a negative signal; and how the buyback is funded — cash on hand versus new debt, the latter being a re-leveraging decision.

For event investors, an oversubscribed Dutch auction with heavy proration is often followed by weakness, as holders who wanted out but were prorated sell in the market.`,
      },
      {
        q: 'Dual-class collapses and poison pills — how do they create or destroy opportunity?',
        a: `A dual-class structure gives founders super-voting shares, insulating them from both activists and acquirers. The low-vote class typically trades at a discount. A collapse — converting to one share, one vote, often with a payment to the high-vote holders — removes the insulation and usually closes the discount, so the trade is anticipating the trigger: a sunset provision, a founder's death or departure, index exclusion rules, or shareholder pressure.

A poison pill (shareholder rights plan) allows all shareholders except an acquirer to buy shares cheaply once the acquirer crosses a threshold, typically 10–15%, massively diluting them. Modern pills are adopted on the shelf and triggered when a hostile approach appears; Delaware courts scrutinize them under enhanced standards.

For an event investor both are governance facts to price, not moral judgments: a pill lowers the probability of a hostile bid, a sunset raises the probability of a control event on a known date.`,
      },
      {
        q: 'How does SPAC arbitrage work, and what makes de-SPAC deals worth watching?',
        a: `A SPAC IPOs at $10 per unit and places essentially all of it in a trust invested in Treasuries. Every public shareholder has the right to redeem for their pro rata share of trust — roughly $10 plus accrued interest — at the time of the merger vote, regardless of how they vote.

The arbitrage: buy units or shares below trust value, redeem at trust, and keep the warrant or rights fragment for free. It is a near-riskless Treasury-plus-optionality trade, which is why hedge funds dominated SPAC IPO allocations.

The de-SPAC side is the opposite exposure: redemptions frequently exceed 90%, so the operating company receives far less cash than announced, and the promote — founder shares of typically 20% — plus warrants create heavy dilution against the remaining public float. Post-merger performance has been poor on average.

Watch the trust level, the redemption rate, the PIPE, the lockup expiry, and the deadline, which forces the sponsor to complete a deal or liquidate.`,
      },
      {
        q: 'How do index rebalances and forced flows create tradable events?',
        a: `Index funds must own the index. When a name is added or deleted, or its weight changes because of a float adjustment, share issuance, or a corporate action, passive holders must trade at the rebalance, in size, without price sensitivity.

The pattern historically: additions run up between announcement and effective date, then partially give back; deletions fall and often recover. The effect has compressed over time as more capital front-runs it, but it persists in less liquid names and in less-followed indices.

Related forced-flow events: rating downgrades pushing bonds out of investment grade indices (fallen angels), CLO CCC bucket limits forcing loan sales, lock-up expiries, tax-loss selling in December, and mutual fund redemption-driven liquidation.

The common structure — and the whole special situations premise — is that the seller's reason has nothing to do with the value of the asset. Your job is to be the buyer with a fundamental view when that happens.`,
      },
    ],
  },
]
