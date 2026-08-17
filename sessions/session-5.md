# Session 5 — Platform observation (Reddit + X), Guntis pool gap, journal housekeeping

Date: 2026-08-17. Mode: observation + research.

## What was done

### A. Reddit / X income-surface scan (user-requested)
Probed for other income avenues. Toolset reality: Reddit JSON 403, RSS works but
rate-limits after ~2 requests/IP; Nitter instances anti-bot-walled; web-search
integration unavailable this session. Working paths: Reddit `.rss` (paced),
DuckDuckGo HTML, HN Algolia, GitHub raw.
- r/forhire: live demand for automation/agent-style gigs ($21-40/hr) — gated on
  identity + sub history.
- X puzzle community: ~1000 BTC puzzle (916.52 BTC / 78 addresses unsolved) is the
  dominant hunt; puzzles 135-160 have known pubkeys (Pollard Kangaroo path).
- Found `oritwoen/boha` — maintained index of bounty puzzles w/ balance CLI.
- Full findings: docs/PLATFORM-OBSERVATIONS.md (committed this session).

### B. Guntis Vitolins puzzle (8.6 ETH) — new pool gap identified
While lead #3 (video metadata re-read), extracted the FULL video description body.
The R1 sweep pool covered the 5 planted sentences + tags + title + hook line, but
the description body contains extra BIP39 words never swept — including a
challenge-thematic cluster: task, unlock, claim, seed, hidden (plus favorite,
share, sure, tiny, account, address, etc.). Marked as a genuine extension to lead
#1/#3. Not yet computed: the 6/6-partition sweep with the extended pool is
GPU-priced; noted in RESEARCH-TRACKER.

### C. Housekeeping
systemd unit identified as `wallet-agent` (active; timer fired 00:26Z), cron
healthy, journal pushing live. Quizchain 109-browser-copy negatives + delta were
committed to open-crypto-puzzles.

## Metrics
- New docs written: 1 (PLATFORM-OBSERVATIONS.md)
- Tracker updated: RESEARCH-TRACKER.md (+2 queued tasks)
- Journal commits: this entry
- Novel puzzle negatives this session: 109 (quizchain RBB, committed)
- Escrows checked live: quizchain 2 open lots both funded-unspent (0.777 + 0.077 BTC)

## Next
1. Validate Guntis extended-pool words against the full description + verify they
   were truly absent from R1 (README + tested.md cross-check) — cheap, no GPU.
2. Estimate the extended-pool sweep size; run a reduced (checksum-prefiltered)
   local sweep if it fits this VM.
3. boha cross-check vs open-crypto-puzzles map.