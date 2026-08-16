#!/usr/bin/env bash
# Autonomous agent check-in: log status + research findings, push to GitHub.
# Runs every 15 minutes via systemd timer (and on boot).
set -uo pipefail

export GIT_TERMINAL_PROMPT=0
JOURNAL=/home/user/journal
cd "$JOURNAL" || exit 1

TS=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
UPTIME=$(awk '{printf "%dh%02dm", int($1/3600), int($1%3600/60)}' /proc/uptime)
DISK=$(df -h / | awk 'NR==2{print $4" free of "$2}')
MEM=$(free -m | awk '/Mem:/{print $3"MB/"$2"MB"}')
LOAD=$(cut -d' ' -f1-3 /proc/loadavg)

# Wallet status (public chain state only; never secrets)
BTC_ORIG=$(curl -s -m 15 "https://blockstream.info/api/address/bc1qfp5x9pn5sp3ntz4079kjq073jrppldnez4csqs" 2>/dev/null | jq -r '.chain_stats.funded_txo_sum // 0')
BTC_ORIG=${BTC_ORIG:-unknown}
ETH_WEI=""
for rpc in "https://ethereum-rpc.publicnode.com" "https://eth.merkle.io" "https://1rpc.io/eth" "https://eth.drpc.org"; do
  ETH_WEI=$(curl -s -m 12 -H "Content-Type: application/json" -X POST "$rpc" \
    -d '{"jsonrpc":"2.0","id":1,"method":"eth_getBalance","params":["0x08A51879900F2c122e33437307F798C6C5254ddf","latest"]}' 2>/dev/null \
    | jq -r '.result // empty' 2>/dev/null)
  [ -n "$ETH_WEI" ] && break
done
if [ -n "$ETH_WEI" ]; then
  ETH_BAL=$(python3 -c "print(int('$ETH_WEI',16)/1e18)" 2>/dev/null)
else
  ETH_BAL=unknown
fi

{
  echo ""
  echo "## Check-in $TS"
  echo "- up: $UPTIME | disk: $DISK | mem: $MEM | load: $LOAD"
  echo "- wallets: BTC(bc1qfp…csqs)=${BTC_ORIG} sat | ETH(0x…4ddf)=${ETH_BAL} wei"
} >> journal.md

# Commit journal + include arb signal if any
if [ -f scripts/arb-scanner.js ]; then
  ARB=$(MIN_EDGE_PCT=0.10 node scripts/arb-scanner.js 2>/dev/null | jq -r '.signals | length' 2>/dev/null)
  ARB=${ARB:-0}
  if [ "$ARB" -gt 0 ]; then
    echo "- arb scanner: $ARB live signal(s) — see state/arb-signals.jsonl" >> journal.md
  fi
fi
git add journal.md
git commit -q -m "checkin $TS" || true
OUT=$(git push -q origin main 2>&1) && echo "pushed $TS" || {
  echo "- push FAILED at $TS: $(echo "$OUT" | tail -1)" >> journal.md
  git add journal.md && git commit -q -m "checkin push-failure note $TS" || true
}