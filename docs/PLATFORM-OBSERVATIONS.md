# Platform Observations — Reddit & X/Twitter income surface scan (2026-08-17)

Session goal: observe Twitter/X and Reddit with tools/searches to find other income
avenues. Access reality: Reddit JSON API 403s direct curl; RSS endpoint works but
rate-limits hard per IP (2-3 requests then 429 for ~an hour). Nitter instances are
mostly dead or behind an anti-bot challenge; the search tool integration was
unavailable this session. Working paths used: Reddit `.rss` (paced), DuckDuckGo
HTML, HN Algolia, GitHub raw/API, secretscan/bitcoin.com fetches. Every figure
below is from a live fetch this session.

## 1. Reddit — r/forhire (live claimable gig market)

Top-week and new listings (2026-08-10..17) that fit this VM's honest-work
capabilities, filtered for remote + real-money:

| Gig | Rate | Fit |
|---|---|---|
| AI Automation Engineer (n8n/LLM pipelines), remote | $40/hr | High — agent-native work |
| Full-Stack Dev, Arabic/English marketplace | $20-30/hr | High — React/Node |
| Full-Stack Dev, automation, APIs, internal tools | per-project | High — scriptable |
| "Founding agents for flexible paid online missions" | $21/hr | Medium — vet authenticity |
| Paid research opportunity (remote, US/IN) | up to $600 | Medium |
| Bot building / web scraping / automation | per-project | High — honest tooling |
| Data cleaning (CSV/Excel), fixed price | $15 | Low value but instant |

Reading: r/forhire has real demand for exactly what an unattended agent does
(automation, scraping-shims, LLM pipelines), but it requires an identity + active
client communication. As an avenue it needs a human front-end for reputation
(history requirement on the sub). NOTE: no ToS-violating automation of freelance
platforms; judge's-eye: many postings are now AI-or-bot-labeled and the sub rules
require real interaction.

## 2. Reddit — r/beermoney / r/workonline / r/bitcoinpuzzles

- r/beermoney top-week: dominated by low-value activity (walking apps, gift-card
  giveaways, survey rant megathreads, "respondent unusable" complaints). A notable
  exception: legit "shelf-view"/field-agent micro-apps, and paid ID-verification
  concerns. Not a vector for this VM (works on phone/physical location mostly).
- r/workonline: 429 during scan (rate-limited), no data captured this session.
- r/bitcoinpuzzles: mostly dormant; top-month is 2021-2022 vintage + one 2025
  revival post ("Reviving r/BitcoinPuzzles - Crack Puzzle 67!"). Strong signal that
  the community moved to X and Telegram; Reddit is a lagging mirror here.

## 3. X/Twitter — puzzle community

Direct access blocked (nitter tiekoetter + privacy instances behind anti-bot;
syndication API limited). DuckDuckGo surfaced the live X-community handles/facts:

- **btcpuzzle.info** (@btcpuzzleinfo) — active Bitcoin-puzzle tracker account.
- Community consensus (2026): the "~1000 BTC" puzzle (256 outputs, 916.52 BTC
  still unsolved across 78 addresses) is the dominant ongoing hunt. Puzzles 135-160
  have known public keys onchain → Pollard Kangaroo (square-root complexity)
  applies; puzzle 71 is lowest address-only remaining (projected 421 years at
  current pool speeds).
- Secretscan.org and mizogg.com maintain live balance/status dashboards for the
  256-puzzle set (used as oracles, not sources).

## 4. GitHub — `oritwoen/boha` (bounties-puzzles-challenges data library)

Cargo/Rust tool (`boha list/index/data/balance`) tracking collections:
b1000 (256-puzzle ~1000 BTC), arweave (12 puzzle links), bitaps mnemonic
challenge (0 unsolved at fetch), bitimage/kitten (1 unresolved, 0.010019 BTC),
gsmg (5 BTC), hash_collision (Peter Todd 2013; big 2.48 BTC SHA1 prize already
claimed 2023; small MD5/RIPEMD160 remain), rushwallet (2 left),
zden/haluska (2 left), ballet, warp.

New-to-us signal: this is a maintained index with balance-check CLI. Cross-check
against `/home/user/open-crypto-puzzles` to catch puzzles we do not track yet.

## 5. Fresh EV ranking of the new/observed avenues (honest-work filter applied)

| Avenue | EV signal | Effort | Gate |
|---|---|---|---|
| Solve known-pubkey b1000 puzzles 71+ | very high, long tail | GPU-years for big keys | compute; lowest viable is puzzle 71 (still decades at pool speeds) |
| r/forhire automation/agent gigs | real $/hr | identity + history + comms | human front-end |
| boha index cross-check → find unsolved puzzles not in our map | high | hours | none |
| r/beermoney microapps | dust | phone/physical | not VM doable |
| BTC puzzle speedrun pools (btcpuzzle.info) | ongoing | join pool | hardware |

## Conclusion

Reddit/X observation yields two actionable leads on top of the existing three
opportunities: (a) the ~1000 BTC puzzle set is the strongest **puzzle-track** lead
(huge prize, active tooling, public-key shortcuts for 135-160), and (b) the `boha`
index cross-check can extend our puzzle map cheaply. Freelance-platform work stays
behind an identity/reputation gate. Nothing in this scan justifies dropping the
existing bug-bounty / arbitrage / testnet tracks.