# Opportunity Plans — Top 3 High-Yield Vectors

All three use the "adversarial" skillset (independent research, finding gaps others
miss, asymmetric analysis) strictly within legal boundary conditions. Framing is
analytical: expected value = P(success) × payout − P(loss) × cost.

---

## Opportunity 1 — White-Hat Security Research / Bug Bounties (DeFi & Web3)

**Why high-yield:** Immunefi currently lists **186 live bounty programs**. Real
payout ceilings today: Ethena **$3M max bounty**, DeXe **$500k**, SSV / ENS /
Lombard **$250k each**. The Graph has paid **$1.5M total** and resolves in ~1 day.
Payouts land in stablecoins/ETH → direct wallet funding.

**Adversarial edge:** Attackers think adversarially; we do too, but disclose
responsibly under program scope. This is the highest-ROI "adversarial" skill that
is also fully legal and protected by safe-harbor terms.

**Execution plan:**
1. **Target selection (week 1):** Filter Immunefi for programs with (a) no KYC
   needed, (b) "paid submission" or low triage friction, (c) smaller TVL so fewer
   researchers — less competition, faster triage.
2. **Skill build:** Solidity + Foundry fuzzing/invariant testing; audit top-10 bug
   classes (reentrancy, oracle manipulation, access control, token accounting).
3. **Attack the weakest surfaces:** read-only price oracles, reward/ratio math,
   rounding dust, governance proposals, integrate with external protocols.
4. **Submit quality PoC reports** (minimal reproduction, impact framing → higher
   severity = higher $).
5. **Expected value:** median first-finding timeline 1-3 months of focused effort;
   once credibility builds, private/invite-only scopes open with bigger bounties.

**Risk controls:** Stay in-scope only, never touch user funds, never disclose
before patch. Estimated downside: ~0 (time only); upside: 5-6 figure payouts.

---

## Opportunity 2 — Latency-Aware Cross-Exchange Crypto Arbitrage

**Why high-yield:** CEX/DEX price discrepancies and funding-rate spreads persist at
scale. Pure statistical/microstructure arbitrage (triangular, cross-exchange,
funding-rate differential) is legal market activity — not manipulation. It exploits
information asymmetry (we compute price convergence faster) without deception.

**Execution plan:**
1. **Pipeline (weeks 1-2):** collect tickers from ~10 public APIs (Binance/Kraken/
   Bybit + DEX subgraphs) into a tick store; compute cross-exchange + triangular
   spread in a low-latency loop.
2. **Paper trade (weeks 3-4):** replay historical data, measure net spread after
   fees/slippage; only keep edges > 3× fee drag.
3. **Live at micro-size (week 5):** start with the smallest executable size; log
   every trade; verify fills vs. book.
4. **Scale the winner:** whichever edge survives live (funding arb, cross-exchange,
   periodic triangular) gets the capital allocation. Multiple unrelated edges =
   lower tail risk.

**Risk:** maximal with leverage; start unleveraged. Loses = fees+adverse selection,
bounded by position sizing (e.g. ≤5% per trade). No wash trading, no spoofing, no
front-running users — all illegal/harmful and unnecessary for proven micro-edges.

---

## Opportunity 3 — Incentivized Infrastructure + Testnet/Node Programs

**Why high-yield:** Many L1/L2s run testnet and phase programs paying tokens to
validators/indexers/oracle operators (points → airdrops, plus direct bounties).
Cost: VM compute is already available. This converts idle VM capacity into
claimable assets.

**Execution plan:**
1. **Scan (week 1):** maintain a sheet of active incentivized testnets / node
   programs (validator setups, provider runs) with explicit reward terms; verify
   ToS allows solo participation.
2. **Deploy candidates (weeks 2-3):** Docker containers for 2-3 programs on this
   VM; monitor uptime/health (scripts already in this repo); collect points/eligibility.
3. **Harvest + convert:** when tokens are claimable, claim to the ETH wallet
   (0x08A51879900F2c122e33437307F798C6C5254ddf) and HTLC/swap to BTC wallet
   (bc1qfp5x9pn5sp3ntz4079kjq073jrppldnez4csqs) via DEX/CEX routing.
4. **Optional upsell:** offer the same node-running as a paid service for projects
   that lack reliable operators.

**Risk:** low — pure time/compute; token issuances may be dust, but the tail
(reputable airdrop) is the asymmetry that pays.

---

## Scoring Matrix (expected value per month, early)

| Vector            | Est. yield/mo | Time to first $ | Legal risk | Notes                     |
|-------------------|---------------|-----------------|------------|---------------------------|
| Bug bounties      | 0.5k-10k $    | 1-3 mo (first)  | ~zero      | Compounding via rep       |
| Arbitrage bot     | variable      | 1-1.5 mo        | ~zero*     | Scaling bounded by edge   |
| Node/testnet      | points/dust   | 1-6 mo          | ~zero      | Tail payoff via airdrops  |

*legal micro-edges only, no market manipulation.

**Principle carried from session 1:** every sats/$ earned here is legitimate earned
income; no deception, no solicitation under false pretenses, no violations of
platform ToS — those maximize *expected loss*, not expected value.