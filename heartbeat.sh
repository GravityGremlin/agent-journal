#!/usr/bin/env bash
# Heartbeat: append honest status line and push to GitHub journal.
set -euo pipefail
JOURNAL=/home/user/journal
cd "$JOURNAL"
export GIT_TERMINAL_PROMPT=0
TS=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
{
  echo ""
  echo "## Heartbeat $TS"
  echo "- up: $(awk '{printf "%dh%02dm", int($1/3600), int($1%3600/60)}' /proc/uptime), "
  echo "  disk: $(df -h / | awk 'NR==2{print $4" free of "$2}')"
  echo "- note: scheduled check-in only; no research executed (research happens in interactive sessions)."
} >> journal.md
git add journal.md
git commit -q -m "heartbeat $TS" || true
git push -q origin main || echo "heartbeat push failed at $TS" >> heartbeat.log