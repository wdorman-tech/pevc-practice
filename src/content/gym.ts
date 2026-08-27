export type GymCat = 'intuition' | 'technical' | 'markets' | 'story'

export type GymItem = {
  id: string
  cat: GymCat
  q: string
  tests: string
  clarify: string[]
  skeleton: string[]
  model: string
  follows: string[]
  flags: string[]
}

export const CATS: { id: GymCat; label: string }[] = [
  { id: "intuition", label: "Business intuition" },
  { id: "technical", label: "Technical" },
  { id: "markets", label: "Markets" },
  { id: "story", label: "Your story" },
]

export const GYM: GymItem[] = [
  {
    id: "g1", cat: "intuition",
    q: "On a one-time basis, would you rather have $100 more in revenue or $100 less in COGS?",
    tests: "Whether you know how the income statement flows, and whether you interrogate the assumption instead of guessing.",
    clarify: [
      "Is the $100 of revenue truly incremental, or does it carry cost to deliver?",
      "One-time really means one-time — no effect on future periods?",
    ],
    skeleton: [
      "Trace both to the same line: gross profit.",
      "$100 less COGS is $100 of gross profit, full stop.",
      "$100 more revenue is only gross profit net of whatever it cost to earn it.",
      "They tie only in the special case where the revenue is completely costless.",
      "Then add the second-order differences: cash timing and risk.",
      "Land on the cost saving, and name the condition under which you would switch.",
    ],
    model:
      "I would take the $100 reduction in COGS. A dollar of cost removed drops straight through to gross profit, whereas a dollar of revenue only contributes its gross margin — at a 40% margin, $100 of sales is $40 of profit. They would only be equal if that revenue were entirely costless. There is also a cash and risk difference: revenue is recognised before it is collected, so it comes with receivable and returns risk, while the cost saving is realised immediately and with certainty. The one case that flips my answer is if the $100 is recurring rather than one-time — then revenue can be worth more, because the market capitalises a growing revenue stream at a multiple, and operating leverage lets it compound.",
    follows: [
      "What if it were recurring instead of one-time?",
      "At what gross margin would you be indifferent?",
      "Would your answer change for a software company versus a grocer?",
    ],
    flags: [
      "Answering 'revenue, because growth' without ever mentioning margin.",
      "Never asking whether the revenue is costless — the question is designed to reward that question.",
      "Refusing to pick. Say which one and why.",
    ],
  },
  {
    id: "g2", cat: "intuition",
    q: "What are the pros and cons of building and operating an airport as a business?",
    tests: "Whether you can build a structure on the spot and reason about a business you have never analysed.",
    clarify: [
      "Am I building it from scratch or acquiring one that already operates?",
      "Roughly what market — a major hub or a regional airport?",
      "Do I set the fees, or does a regulator cap them?",
    ],
    skeleton: [
      "Revenue: split aeronautical (landing fees, passenger charges, gate leases) from non-aeronautical (retail, food, duty free, parking, advertising, real estate).",
      "Cost: enormous upfront capex, long permitting and build, high fixed operating cost, permanent maintenance capex.",
      "Competitive position: geographic monopoly, scarce slots, regulatory licence, efficient scale.",
      "The catch: monopolies get regulated, so pricing power is often capped.",
      "Customers: a handful of airlines with real bargaining power, and a hub carrier can pull capacity.",
      "Risk: cyclical and shock-prone demand against a fixed cost base; very long payback.",
      "Land the verdict, and separate owning from building.",
    ],
    model:
      "Structurally this is a very good business and usually a bad construction project. Once it exists, an airport is close to a local monopoly — geography, land, slots and regulatory approval make it almost impossible to replicate, and the market only supports one, which is efficient scale. The profit engine is often not aviation at all: landing and passenger fees are frequently regulated, while parking, retail and duty free are unregulated and high margin, so an airport is partly a shopping centre with a runway attached. The problems are on the other side. Capex is enormous and takes years before the first flight, the cost base is heavily fixed so demand shocks like a pandemic or a fuel spike hit profit disproportionately, a few airlines concentrate the buyer power, and the same regulator that grants the monopoly caps what you can charge with it. So I would rather buy an operating airport with proven traffic than build one — unless I had a concession with guaranteed volumes or a partner absorbing construction risk.",
    follows: [
      "Where would you rather sit in the value chain — the airport or the airline?",
      "How would you underwrite the traffic forecast?",
      "What single number would you most want to see before committing capital?",
    ],
    flags: [
      "Listing pros and cons with no structure and no verdict.",
      "Forgetting parking and retail — most people only think about landing fees.",
      "Treating 'monopoly' as the end of the analysis rather than the start of the regulatory question.",
    ],
  },
  {
    id: "g3", cat: "intuition",
    q: "Airports have historically earned strong returns and airlines have not. Same passengers, same industry. Why?",
    tests: "Whether you can apply industry structure rather than recite it.",
    clarify: ["Are we talking about a typical legacy carrier, or including the low-cost operators?"],
    skeleton: [
      "Ask where the scarce asset sits: the airport owns land, slots and a licence; the airline owns planes that anyone can lease.",
      "Barriers to entry: near-absolute for the airport, low for the airline.",
      "Differentiation: a passenger picks a flight on price and time, so the product is a commodity.",
      "Supplier power squeezes airlines from every side — aircraft manufacturers, fuel, labour, and the airport itself.",
      "Cost structure: both are fixed-heavy, but only one has pricing power to match.",
      "Conclude with where the rent accumulates.",
    ],
    model:
      "The two sit on opposite sides of every force. The airport controls a scarce, non-replicable asset — land in the right place, slots, and a regulatory licence — so entry is effectively impossible. An airline's core asset is an aircraft, which can be leased by anyone with credit, so capacity floods in whenever returns improve. On top of that the airline sells a commodity: most passengers choose on price and schedule, so there is no pricing power, while suppliers on every side — Boeing and Airbus, fuel, unionised labour, and the airport itself — hold real bargaining power. Both have heavy fixed costs and perishable inventory, but only the airport has the market position to defend a price. The rent accumulates where scarcity is, and scarcity is in the ground, not in the fleet.",
    follows: [
      "Why have low-cost carriers done better than legacy airlines?",
      "Does consolidation fix the airline problem?",
    ],
    flags: [
      "Saying 'airlines have high costs' — so do airports. Cost level is not the answer; pricing power is.",
    ],
  },
  {
    id: "g4", cat: "intuition",
    q: "Is a gym a good business?",
    tests: "Unit economics and whether you notice the model behind the model.",
    clarify: ["A single independent location, a franchised chain, or a boutique studio?"],
    skeleton: [
      "Revenue: recurring memberships collected in advance, plus personal training and ancillary sales.",
      "The hidden mechanic: usage is far below sign-ups, so you sell many more memberships than the floor could hold.",
      "Working capital: prepaid dues mean customers fund the business — negative working capital.",
      "Cost: rent and equipment are fixed, staffing is semi-fixed, so operating leverage is high.",
      "Moat: weak. Low switching costs, easy entry, local competition, though location and habit create friction.",
      "Verdict with the condition attached.",
    ],
    model:
      "It is a better business than it looks and a more fragile one than it looks. The economics rest on breakage: a large share of members pay every month and rarely come, so a location can sell far more memberships than it could ever physically serve, and dues are collected in advance so customers finance the working capital. Against that, the cost base is almost entirely fixed — rent, equipment, and a staffed floor — so once you clear breakeven the incremental member is nearly pure margin, and below breakeven you bleed. The weakness is competitive: switching costs are near zero, anyone can open across the street, and the product is undifferentiated outside of premium boutique formats. So a well-located gym at scale, ideally franchised so the operator carries the real estate risk, is a genuinely good business; a single leveraged location in a competitive catchment is a bad one.",
    follows: [
      "What happens to this model in a recession?",
      "Would you rather own the gym brand or the buildings?",
    ],
    flags: ["Missing breakage entirely.", "Not distinguishing the franchisor from the operator."],
  },
  {
    id: "g5", cat: "intuition",
    q: "Two companies have the same revenue and the same net income. One trades at 30x earnings, the other at 8x. Give me every reason that could be true.",
    tests: "Breadth and organisation. This is a list question, and they are watching whether your list has a shape.",
    clarify: ["Same industry, or different?"],
    skeleton: [
      "Group your reasons before you start listing. Growth, returns, risk, then the mechanical items.",
      "Growth: expected future growth, and the runway left in the market.",
      "Returns: ROIC and how much capital is needed to fund that growth.",
      "Risk and durability: cyclicality, customer concentration, competitive position, regulation.",
      "Earnings quality: one-time items, accounting choices, cash conversion.",
      "Capital structure: leverage raises equity risk and compresses the multiple.",
      "Market mechanics: index membership, liquidity, float, sentiment, where we are in the cycle.",
    ],
    model:
      "I would split this into three real drivers and then a set of mechanical ones. The real drivers are growth, returns on capital, and risk: the 30x company is probably expected to grow faster, to earn a higher return on the capital it reinvests, and to have more durable earnings, while the 8x company may be cyclical, concentrated, or facing a structural threat. Same net income does not mean same quality of income — one could be flattered by a one-time gain, or converting far less of its earnings into cash. Then the mechanics: leverage makes equity riskier and compresses the multiple, and if the 8x company is at a cyclical peak, its earnings are the ones about to fall, which is exactly when a cheap-looking multiple is a trap. Finally, index inclusion, float, and liquidity can move a multiple for reasons that have nothing to do with the business.",
    follows: [
      "Which one would you rather own, and what would you need to check first?",
      "Give me a case where the 8x company is the better investment.",
    ],
    flags: [
      "Listing reasons in random order as they occur to you.",
      "Only saying 'growth' and stopping.",
    ],
  },
  {
    id: "g6", cat: "intuition",
    q: "A company reports record quarterly revenue and the stock falls 12%. What happened?",
    tests: "Whether you understand that prices move against expectations, not against facts.",
    clarify: ["Do we know whether they also gave guidance?"],
    skeleton: [
      "Lead with the frame: stocks trade on the difference between results and expectations.",
      "Expectations: revenue beat but earnings or margins missed.",
      "Guidance: the next quarter or the full year was cut.",
      "Quality: the revenue came from discounting, a one-time order, or receivables ballooned.",
      "Structure: a dilutive raise, a lost customer disclosed on the call, an executive departure.",
      "Market-wide: rates or sector rotation moved the multiple, not the business.",
    ],
    model:
      "Record revenue is a fact, and prices respond to surprises rather than facts. The likeliest explanation is that revenue beat while something below it missed — margins compressed because the growth was bought with discounting or higher costs, so earnings came in short. The second candidate is guidance: management raised the flag on the next quarter, and the market prices the future rather than the past. Third is the quality of the revenue itself — a one-time bulk order, revenue pulled forward, or receivables growing faster than sales, which suggests it may not convert to cash. And it can be nothing to do with the company at all: a rate move or a sector de-rating can compress the multiple through a good print. I would want the margin line and the guidance before saying which.",
    follows: ["Which would worry you most as an owner?", "How would you check the receivables story?"],
    flags: ["Answering 'the market is irrational.' It is the answer that ends the conversation."],
  },
  {
    id: "g7", cat: "intuition",
    q: "You run a business at a 40% gross margin. Would you rather cut price by 10% or grow volume by 10%?",
    tests: "Whether you will actually do the arithmetic out loud.",
    clarify: ["Am I assuming the price cut drives some volume response, or holding volume flat?"],
    skeleton: [
      "Set up a clean unit: price 100, cost 60, gross profit 40.",
      "Cut price 10%: price 90, cost 60, gross profit 30 — a quarter of the profit gone from a tenth off the price.",
      "Compute the break-even: you need 40 divided by 30, so about 33% more volume just to stand still.",
      "Compare to the volume case: 10% more units at 40 each is 10% more gross profit, and capacity may absorb it at little extra fixed cost.",
      "Name the condition where the price cut still wins: extreme elasticity, share capture with switching costs, or driving a competitor out.",
    ],
    model:
      "Volume, and by a wide margin. Take a unit at 100 with 60 of cost, so 40 of gross profit. A 10% price cut takes price to 90 while cost stays at 60, leaving 30 — you have given up a quarter of your profit for a tenth off the price, and you need roughly a third more volume just to get back to where you started. Ten percent more volume at unchanged price adds ten percent to gross profit directly, and if you have spare capacity most of it falls through to operating profit because the fixed costs are already paid. The lower your gross margin, the more brutal that arithmetic gets. I would only cut price if demand were extremely elastic, or if the share I bought came with switching costs that made it permanent.",
    follows: [
      "Redo it at a 20% gross margin.",
      "What if the competitor matches your price cut the next day?",
    ],
    flags: ["Reasoning qualitatively when the question is begging you to use numbers."],
  },
  {
    id: "g8", cat: "intuition",
    q: "Would you rather have 10% share of a market growing 20% a year, or 50% share of a market shrinking 5% a year?",
    tests: "Whether you can see that a declining business can still be an excellent investment.",
    clarify: ["Am I buying these at the same price, or is one cheaper?"],
    skeleton: [
      "Refuse the framing that growth is automatically better; make it about returns on capital and price.",
      "Growth market: growth attracts entrants and capital, which competes returns away — and you are the small player, so you may be the one who gets squeezed.",
      "Declining market: consolidated, rational, low reinvestment need, so cash comes out rather than going back in.",
      "Ask what the capital does. A melting ice cube that returns all its cash can beat a growing business that consumes it.",
      "Take a position and name the deciding variable.",
    ],
    model:
      "My instinct is the 50% share of the shrinking market, and the reason is where the cash goes. A market growing 20% attracts capital and entrants, and as the number four player at 10% share I am the one most likely to have my margin competed away while funding growth I may not keep. A consolidated leader in a market declining slowly usually has pricing power, little need to reinvest, and can return almost everything it earns — a five percent decline is easy to outrun with a high free cash flow yield and buybacks. What would flip me is price and durability: if the decline is accelerating toward obsolescence rather than drifting, it is a value trap, and if the 10% position sits in a market with real network effects where share consolidates to a winner, then early share is worth far more than it looks.",
    follows: ["Give me a real example of each.", "What would make you call it a value trap?"],
    flags: ["Choosing growth reflexively because growth sounds better."],
  },
  {
    id: "g9", cat: "intuition",
    q: "How would you value the coffee shop on the corner?",
    tests: "Whether valuation concepts survive contact with a business that has no comparables and no analysts.",
    clarify: ["Am I buying the business only, or the building too? Does the owner work there full time?"],
    skeleton: [
      "Start from what you are actually buying: cash flows, a lease, equipment, and a location.",
      "Normalise earnings: strip out the owner's salary, one-time items, and any personal expenses run through the business.",
      "Apply a multiple grounded in what small businesses of this type actually change hands for, and justify why yours is higher or lower.",
      "Cross-check with a simple DCF, and with replacement cost — what it would cost to open one across the street.",
      "Test the fragility: lease term, dependence on one owner, foot traffic, whether a chain can open next door.",
    ],
    model:
      "I would value the cash flow, then check it two other ways. First, normalise: take the profit, add back the owner's compensation and anything personal, and subtract a market wage for whoever has to run it, because I am buying a business and not a job. Then apply a multiple appropriate to a small owner-operated business — low single digits, because the cash flows are fragile and illiquid — and adjust for lease length, since a short lease in a strong location means the landlord captures the value, not me. As a cross-check I would ask what it would cost to build the same shop from scratch, which caps what any rational buyer pays, and I would look at what similar shops in the area sold for. Then the risk work: how much of the traffic is habit versus location, what happens if a chain opens on the same block, and how much of the goodwill walks out the door with the current owner.",
    follows: ["Which of your three methods do you trust most and why?", "What is the single biggest risk?"],
    flags: ["Jumping to 'I would build a DCF' without normalising owner compensation."],
  },
  {
    id: "g10", cat: "intuition",
    q: "Would you rather own a toll bridge or a hotel chain?",
    tests: "Whether you notice the question is ambiguous and resolve the ambiguity yourself.",
    clarify: [
      "By hotel chain, do you mean owning the real estate, or the brand and franchise system?",
      "Is the toll bridge owned outright or held under a concession that expires?",
    ],
    skeleton: [
      "Bridge: monopoly on a route, near-zero variable cost, inflation-linked tolls, minimal reinvestment.",
      "Bridge risks: regulated tolls, a finite concession, one alternative route away from irrelevance.",
      "Hotel as owner: capital-intensive, cyclical, exposed to labour cost and to new supply.",
      "Hotel as franchisor: asset-light, fee income on someone else's capital, brand and loyalty as the moat.",
      "Rank all three and say which variable decided it.",
    ],
    model:
      "It depends on which hotel business you mean, and I would rank all three. The asset-light franchisor is the best of the set — it earns a fee on revenue generated by capital other people put up, its moat is the brand and the loyalty programme, and it barely reinvests. The toll bridge is second: a true monopoly on a route, almost no variable cost, and tolls that usually escalate with inflation, but the returns are typically capped by the concession terms and there is no growth beyond traffic and price. Owning hotel real estate is the worst of the three — cyclical demand, high fixed costs, constant refurbishment capex, and new supply arriving exactly when returns look good. If the bridge were owned outright and unregulated I might flip it to first, because permanence is worth a great deal.",
    follows: ["What would make you take the bridge over the franchisor?", "Where does the risk actually sit in a franchise model?"],
    flags: ["Answering without asking what 'hotel chain' means — that ambiguity is the test."],
  },

  /* ---- Technical ---- */
  {
    id: "g11", cat: "technical",
    q: "Depreciation increases by $10. Walk me through the three statements. Assume a 25% tax rate.",
    tests: "Precision under mild pressure. There is one right answer and they know it.",
    clarify: ["Should I assume a 25% tax rate and that nothing else changes?"],
    skeleton: [
      "Income statement first, top to bottom.",
      "Then cash flow, starting from net income.",
      "Then balance sheet, and explicitly say that it balances.",
      "Stop. Do not add commentary until asked.",
    ],
    model:
      "Income statement: depreciation rises $10, so operating income falls by $10, and after a 25% tax shield net income falls by $7.50. Cash flow statement: start with net income down $7.50, add back the $10 of depreciation because it is non-cash, so cash from operations rises by $2.50 and cash at the bottom is up $2.50. Balance sheet: cash is up $2.50 and net PP&E is down $10, so total assets fall by $7.50; on the other side, retained earnings fall by $7.50 through net income. Both sides fall by $7.50, so it balances. Cash actually went up because the charge itself is non-cash while the tax saving it creates is real.",
    follows: [
      "Why did cash increase if the company earned less?",
      "Now do it with a $10 increase in accounts receivable.",
      "What if the tax rate were zero?",
    ],
    flags: [
      "Getting the sign wrong on the add-back.",
      "Forgetting to state that the balance sheet balances — say it out loud, it is half the point.",
    ],
  },
  {
    id: "g12", cat: "technical",
    q: "What is the difference between enterprise value and equity value, and why do we subtract cash?",
    tests: "Whether you understand the concept or memorised the bridge.",
    clarify: [],
    skeleton: [
      "Define equity value as what the shareholders own.",
      "Define enterprise value as the value of the operating business, independent of financing.",
      "Walk the bridge: add debt, preferred, and minority interest; subtract cash.",
      "Explain the cash subtraction as an effective rebate on the purchase price.",
      "Add the nuance about operating cash before they ask.",
    ],
    model:
      "Equity value is what the shareholders own — diluted shares times price. Enterprise value is what the whole operating business is worth regardless of who financed it, so you start from equity value, add debt, preferred, and minority interest because those are claims on the same assets, and subtract cash. Cash comes out because the day you buy the company you also receive its cash, so it reduces what you effectively paid for the operations. The nuance is that not all cash is truly excess — a business needs some working cash to function, and treating that as a rebate overstates how cheap the company is.",
    follows: [
      "If a company issues $100 of debt to buy $100 of equipment, what happens to enterprise value?",
      "Why compare EV to EBITDA but price to earnings?",
    ],
    flags: ["Reciting the formula with no concept behind it — that is exactly what they are probing for."],
  },
  {
    id: "g13", cat: "technical",
    q: "Explain what a call option is to someone who has never taken a finance class.",
    tests: "Whether you can teach. Clubs care about this because members explain their work to each other constantly.",
    clarify: [],
    skeleton: [
      "Give the shape before the vocabulary: a right, not an obligation.",
      "Use one concrete example with real numbers.",
      "Show the payoff in both directions.",
      "Name the asymmetry explicitly — capped loss, uncapped gain.",
      "Only then attach the terms: strike, premium, expiry.",
    ],
    model:
      "A call option is the right to buy something at a fixed price for a limited time, without any obligation to do so. Say a stock trades at $50 and I pay $3 for the right to buy it at $55 any time in the next three months. If the stock goes to $70 I exercise, buy at $55, and I am up $12 net of the premium. If it never gets above $55 I simply let it expire and my loss is the $3 I paid, no matter how far the stock falls. That asymmetry is the whole point: my downside is fixed and known before I start, my upside is not. The fixed price is the strike, the $3 is the premium, and the deadline is expiry.",
    follows: ["Now explain a put.", "Who sold you that option and why would they?", "What makes the option worth more than $3?"],
    flags: ["Leading with jargon.", "Forgetting to say the loss is capped at the premium — that is the idea, not a detail."],
  },
  {
    id: "g14", cat: "technical",
    q: "What is beta, and what is wrong with using it as a measure of risk?",
    tests: "This is the differentiator question. Stating CAPM is table stakes; critiquing it is the signal.",
    clarify: [],
    skeleton: [
      "Define beta as sensitivity to the market.",
      "Place it inside CAPM and say what CAPM is claiming.",
      "Then turn: beta measures co-movement, not the risk of losing money permanently.",
      "Give the concrete failure case.",
      "Close with where beta is still genuinely useful.",
    ],
    model:
      "Beta measures how much a stock has moved relative to the market — a beta of 1.3 means it has historically moved about 1.3% for every 1% market move. In CAPM it is the only risk that gets priced, on the logic that everything else can be diversified away. The problem is that beta measures co-movement, not the chance of permanent loss. A stable, cash-generative company whose shares happen to swing with the index gets a high beta and therefore a high cost of capital, which says nothing about the durability of the business. And if a stock falls 50% while the fundamentals are unchanged, beta says it just got riskier when an owner would say it just got cheaper. Betas are also backward-looking and unstable across time windows. Where it is still useful is as a rough measure of how a position will behave inside a portfolio, which is a different question from how risky the business is.",
    follows: ["So how would you measure risk?", "Would you ever use CAPM in a real valuation?"],
    flags: ["Only stating the formula.", "Trashing CAPM without being able to explain why anyone uses it."],
  },
  {
    id: "g15", cat: "technical",
    q: "A company is profitable every quarter and is about to run out of cash. How?",
    tests: "Whether accrual accounting is intuition for you or trivia.",
    clarify: ["Is it growing?"],
    skeleton: [
      "Name the root cause: profit is accrual, cash is not.",
      "Working capital — receivables and inventory growing faster than sales.",
      "Capex above depreciation, so real spending exceeds the accounting charge.",
      "Debt principal repayments, which never touch the income statement.",
      "Non-cash gains flattering earnings.",
      "Say which you would check first.",
    ],
    model:
      "Profit is measured on accruals and cash is not, so the two can move in opposite directions for a long time. The most common version is working capital in a growing business: you book the sale, but the customer pays in ninety days while you had to buy inventory and pay staff up front, so every incremental sale consumes cash. Second is capital spending well above depreciation, so the income statement is charged for the asset slowly while the money left immediately. Third is debt: principal repayments do not appear on the income statement at all, only interest does. And earnings can be flattered by non-cash gains. I would go straight to the cash flow statement and compare cash from operations to net income over a few years — if that gap is persistent and widening, the profit is not real in the way that matters.",
    follows: ["Which of these is most dangerous?", "How would you fix it if you ran the company?"],
    flags: ["Only saying 'receivables' and stopping."],
  },
  {
    id: "g16", cat: "technical",
    q: "What is the difference between a future and a forward, and why does the difference matter?",
    tests: "Whether you know the mechanism, which the mentor flagged as the thing that actually gets tested.",
    clarify: [],
    skeleton: [
      "Same economic promise: buy or sell at a set price on a set date.",
      "Difference one: standardised and exchange-traded versus private and customisable.",
      "Difference two: daily mark-to-market and margin versus settlement at maturity.",
      "Say why that matters — credit risk moves from your counterparty to the clearing house.",
      "Name the cost: margin calls create cash demands before the trade is over.",
    ],
    model:
      "Economically they promise the same thing: buy or sell an asset at an agreed price on an agreed date. The differences are institutional. A forward is a private bilateral contract, so it can be tailored to any size and date, but you are exposed to your counterparty for the whole life of the trade. A future is standardised and traded on an exchange, and crucially it is marked to market every day with margin posted to a clearing house. That daily settlement is the real difference: it converts one large credit exposure at maturity into a series of small daily ones, so the clearing house effectively replaces your counterparty. The cost is that gains and losses hit your cash immediately, so a position that is right in the end can still force you to fund margin calls along the way.",
    follows: ["Why would a corporate treasurer still prefer a forward?", "What is basis risk?"],
    flags: ["Saying 'futures are exchange-traded' and stopping — the mark-to-market is the point."],
  },

  /* ---- Markets ---- */
  {
    id: "g17", cat: "markets",
    q: "Pitch me a stock.",
    tests: "Structure and conviction. They are not grading the ticker, they are grading whether you can build and defend a case.",
    clarify: ["Any constraints — size, sector, long or short?"],
    skeleton: [
      "One-sentence recommendation up front. Buy or sell, and the core reason.",
      "What the business actually does, in plain language, in two sentences.",
      "Why it is mispriced: what does the market believe that you think is wrong?",
      "Evidence for your side.",
      "Catalyst: what makes the gap close, and roughly when.",
      "Valuation: what you think it is worth and how you got there.",
      "Risks, and what would prove you wrong.",
    ],
    model:
      "Structure beats the pick. Open with the recommendation and the one-line reason, then explain the business as if to someone outside finance, then get quickly to the only part that matters: what does consensus believe, and why is it wrong. A pitch without a differentiated view is a description. Support your variant view with something concrete — unit economics, a segment the market lumps in with a weaker one, a mispriced contract renewal. Then say what closes the gap and when, put a number on value with the method you used, and end by naming the two or three things that would prove you wrong, plus the level at which you would admit it. Naming your own disconfirming evidence reads as intellectual honesty, and it is the part almost every candidate skips.",
    follows: ["What is the bear case?", "Who is on the other side of this trade and what do they know?", "What would make you sell?"],
    flags: [
      "Pitching a mega-cap everyone knows with no variant view.",
      "Describing the company for four minutes and never saying why it is mispriced.",
      "Having no risks. Every thesis has risks; claiming otherwise reads as inexperience.",
    ],
  },
  {
    id: "g18", cat: "markets",
    q: "What are you watching in markets right now?",
    tests: "Whether you follow markets as a habit or crammed the night before.",
    clarify: [],
    skeleton: [
      "Pick one theme, not five headlines.",
      "State what is happening in one sentence.",
      "State why it matters mechanically — through rates, margins, demand, or supply.",
      "State your view and how confident you are.",
      "State what would change your mind.",
    ],
    model:
      "Prepare one theme properly rather than gesturing at the news. The shape that works: here is what is happening, here is the mechanism by which it reaches company earnings or the discount rate, here is what I think happens next, here is the piece of data I am waiting on that would change my mind. Choose something you can actually defend for four follow-up questions — an industry you know, a company you have read the filings on, a rate or commodity you have watched for months. Depth in one place beats coverage of ten. And keep a second, unrelated theme in reserve for when the interviewer happens to be an expert in your first.",
    follows: ["What is the counterargument?", "How are you positioned for it?", "What data are you waiting on?"],
    flags: [
      "Repeating a headline with no mechanism attached.",
      "Naming five themes to look broad, then being unable to go one layer deeper on any of them.",
    ],
  },
  {
    id: "g19", cat: "markets",
    q: "Rates rise by 100 basis points. Rank the damage: a regulated utility, a bank, or an unprofitable software company.",
    tests: "Whether the rates-to-equity link is mechanical for you rather than a slogan.",
    clarify: ["Is this a parallel shift, or are short rates moving more than long?"],
    skeleton: [
      "State the general mechanism first: higher discount rate hurts long-dated cash flows most.",
      "Software: profits are far in the future, so duration is longest — hit hardest.",
      "Utility: bond-like, heavily levered, regulated returns adjust slowly — hurt, and it competes with bonds for income buyers.",
      "Bank: mixed, and this is where the real answer lives — net interest margin can widen, but credit and deposit costs can offset.",
      "Rank, then name the assumption that would flip it.",
    ],
    model:
      "The general mechanism is that a higher discount rate hurts cash flows in proportion to how far away they are. The unprofitable software company is hit hardest — nearly all its value sits in distant years, so it is the longest-duration equity in the set, and higher rates also raise the cost of the funding it depends on. The utility is next: it is a bond proxy bought for yield, so it re-rates when bonds start paying more, and it is usually heavily levered with regulated returns that reset only slowly. The bank is the interesting one and it can genuinely benefit — a bank earns the spread between what it lends at and what it pays for deposits, and that spread can widen when rates rise. What flips it is the shape of the move and the credit cycle: if short rates rise faster than long the curve flattens and the spread compresses, and if higher rates push borrowers into default, credit losses swamp the margin benefit.",
    follows: ["What if the curve inverts instead?", "Which would you buy after the move?"],
    flags: ["Saying 'everything falls when rates rise' — the whole question is the ranking and the exception."],
  },

  /* ---- Story ---- */
  {
    id: "g20", cat: "story",
    q: "Why this club?",
    tests: "Whether you did any real work, and whether you will still be showing up in November.",
    clarify: [],
    skeleton: [
      "One specific thing about this club, not a generic virtue every club claims.",
      "One thing you have actually done that proves the interest predates the application.",
      "One thing you want to contribute, stated concretely.",
      "One thing you want to learn, stated honestly.",
    ],
    model:
      "Anchor it in specifics only this club can claim: a committee structure, a fund or vertical, a project you read about, a person you spoke to and what they told you. Then evidence that the interest is older than the recruiting cycle — a company you followed, something you built, a book that started it. Then be concrete about contribution: what you would do on the team in your first semester, not 'add value.' Then be honest about what you want out of it, because pretending you already know everything is a worse look at eighteen than saying you want to learn how experienced members break down a business. The failure mode is a paragraph that would survive find-and-replace with any other club's name.",
    follows: ["Which other clubs are you applying to?", "What would you do if you did not get in?"],
    flags: [
      "An answer that works verbatim for three other clubs.",
      "Naming a person you 'spoke to' vaguely — they will ask what you discussed.",
    ],
  },
  {
    id: "g21", cat: "story",
    q: "Tell me about yourself.",
    tests: "Whether you can be interesting in ninety seconds. It is the first question and it sets the tone for the rest.",
    clarify: [],
    skeleton: [
      "Where the interest started — one concrete moment, not a childhood cliche.",
      "What you did about it — the evidence.",
      "What that taught you about how you think.",
      "Why that leads here, ending on the club.",
      "Ninety seconds. Time yourself.",
    ],
    model:
      "Build a line with three points on it and hand the interviewer a hook. Start with the concrete origin — a specific project, a job, a thing you built or traded or ran — not 'I have always been fascinated by markets.' Move to what you actually did and what went wrong in it, because difficulty makes a story credible. Draw the lesson in one sentence about how you think, which is what they are actually assessing. Then close on why the club is the next step. Leave one deliberate loose thread you would be happy to be asked about; a good interviewer will pull it, and now you are having a conversation instead of an interrogation.",
    follows: ["Tell me more about that project.", "What was the hardest part?"],
    flags: ["Reciting your resume in order.", "Running past two minutes.", "No specifics anywhere in it."],
  },
  {
    id: "g22", cat: "story",
    q: "Tell me about a time you were wrong.",
    tests: "Whether you can update. In an investing club, being wrong well is the job.",
    clarify: [],
    skeleton: [
      "Pick something you were genuinely wrong about, with a real cost.",
      "State what you believed and why it was reasonable at the time.",
      "State the evidence that changed your mind, specifically.",
      "State what you did differently afterwards, with proof.",
      "Do not resolve it into a humblebrag.",
    ],
    model:
      "The structure is belief, evidence, update, and change. Pick something with an actual cost — a decision you defended, a position you sized wrongly, a call you made in a team that did not work. Explain why the original belief was reasonable, because a story where you were obviously foolish is not useful to them. Then be precise about what changed your mind, and precise about what you now do differently, ideally with a second example proving the change stuck. The trap is choosing a failure that is secretly a strength. 'I was wrong to work too hard' tells them you would rather manage your image than examine your reasoning, which is the opposite of what an investing club wants.",
    follows: ["How quickly did you change your mind?", "Has it happened again since?"],
    flags: ["A disguised strength.", "A story where someone else was the actual problem."],
  },
  {
    id: "g23", cat: "story",
    q: "They ask you something you have genuinely never heard of.",
    tests: "Composure. Your mentor's advice made this explicit: you are allowed to ask.",
    clarify: [],
    skeleton: [
      "Say plainly that you have not come across it.",
      "Ask them to define it in one line.",
      "Reason out loud from the definition, showing the logic.",
      "Do not apologise more than once, and never bluff.",
    ],
    model:
      "Say the words: I have not come across that one — could you tell me what it means and I will reason through it. Then use the definition. Nearly every finance concept is assembled from parts you do know: a cash flow, a claim, a risk, a right, an obligation. Take the definition and work forward out loud, connecting it to something adjacent you do understand. This is the single highest-return move available to a freshman in a first-round interview, because bluffing is detected instantly and the recovery is far worse than the admission. Interviewers remember composure, and a candidate who reasons cleanly from a definition they were just handed has demonstrated exactly what the interview is trying to measure.",
    follows: ["So what do you think it is used for?", "Where would you go to learn it properly?"],
    flags: ["Bluffing.", "Apologising for four sentences.", "Going silent instead of asking."],
  },
]
