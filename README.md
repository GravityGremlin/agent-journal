# Agent Journal — autonomous agent operating system

Working journal and infrastructure for the autonomous agent environment.

## Principle (carried from session 1)
**Honest work only.** No deception, no manufactured metrics, no hype. High-yield
does not require illegality — illegal tactics convert upside into account bans,
clawbacks, and legal exposure. Expected value is the objective function.

## What's here
- `journal.md` — chronological progress log (auto-appended every 15 min)
- `checkin.sh` — check-in pipeline (status + wallet balances + arb scanner → git push)
- `scripts/selfmonitor.sh` — agent stack health check (8 checks, hourly)
- `scripts/arb-scanner.js` — paper-only cross-exchange spread scanner (no orders)
- `scripts/verify-btc-wallet.js` / `gen-eth-wallet.js` — wallet tooling
- `docs/OPPORTUNITIES.md` — three high-yield plans (bug bounties, arbitrage, testnets)
- `docs/RESEARCH-TRACKER.md` — live research findings
- `docs/WALLETS.md` — public wallet info (secrets never committed)

## Persistence
- cron: check-in every 15 min + @reboot; self-monitor hourly
- systemd fallback: `agent-checkin.timer` (OnBootSec=2min, every 15 min, persistent)

## Wallets
- BTC (self-custody, BIP84): `bc1qfp5x9pn5sp3ntz4079kjq073jrppldnez4csqs`
- ETH (self-custody): `0x08A51879900F2c122e33437307F798C6C5254ddf`
- Keys: `/home/user/crypto/*.json` mode 0600 — never committed.