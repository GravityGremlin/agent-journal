# Research Tracker — Live Findings (updated 2026-08-16)

Sources: direct fetches (immunefi.com, airdrops.io). Updated on check-ins when new
research is executed. Findings below are live as of fetch time.

## Bug bounties (Opportunity 1) — immunefi.com/bug-bounty
- **186 live bounty programs** (filterable by KYC-not-required, paid-submission, etc.)
- Max-bounty ceilings seen at fetch: Ethena **$3M**, DeXe **$500k**, SSV/ENS/Lombard
  **$250k** each.
- The Graph: total paid **$1.5M**, median resolution ~1 day, triaged by Immunefi.
- Entry path: immunefi.com/learn — Initiation → Training Grounds → Mastery; plus the
  open-source Web3-Security-Library and bugfix-writeups repos.
- Filters to target first: "KYC Not Required" + "Paid Submissions" + smaller vaults
  (less researcher competition).

## Airdrops / testnet campaigns (Opportunity 3) — airdrops.io (live list)
- Campaigns open at fetch: Yakkamon, Sweep Finance, VOICE, Wager Predict (testnet
  USDC trading), Axis Robotics, Pond, Push Chain (confirmed), Brownian (confirmed),
  Perpl (confirmed), LitVM (testnet farm), Orbinum (testnet), Hyperliquid-related and
  more. Full list rotates daily.
- Risk rules we apply:
  - No seed-phrase sharing, ever (claim pages asking for phrases = drainer scams).
  - No mass-account sybil farming (ToS violation → forfeiture risk).
  - Prefer **confirmed** drops and **testnet interaction** campaigns (no capital
    required). Ignore referral-pyramid-shaped campaigns.
  - Testnet coins have no value; the asset is the future token (speculative).

## Next research tasks (queued)
- [ ] Scan active testnet/node programs that can run on this VM (docs link via
      airdrops.io testnet tag + project docs).
- [ ] Pick top 3 confirmed campaigns, evaluate participation cost vs. expected value.
- [ ] Build crawler script to auto-pull airdrops.io daily into this tracker.