#!/usr/bin/env bash
# Agent self-monitoring: verify the full stack is alive and reporting.
# Run manually or via cron; writes status into journal repo and pushes.
set -uo pipefail
JOURNAL=/home/user/journal
cd "$JOURNAL" || exit 1
TS=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

pass=0; fail=0
check() { if eval "$2" >/dev/null 2>&1; then echo "  [OK] $1"; pass=$((pass+1)); else echo "  [FAIL] $1"; fail=$((fail+1)); fi }

echo "== Agent stack self-monitor $TS =="
check "git repo present"          "test -d $JOURNAL/.git"
check "journal file writable"     "test -w $JOURNAL/journal.md"
check "checkin.sh executable"     "test -x $JOURNAL/checkin.sh"
check "cron has checkin entry"    "crontab -l 2>/dev/null | grep -q checkin"
check "systemd timer active"      "systemctl --user is-active agent-checkin.timer || sudo -n systemctl is-active agent-checkin.timer"
check "disk > 2GB"                "[ \$(df -k / | awk 'NR==2{print \$4}') -gt 2097152 ]"
check "network up"                "curl -s -m 10 -o /dev/null -w '%{http_code}' https://api.github.com | grep -q 200"
check "github token valid"        "curl -s -m 10 -H \"Authorization: Bearer $GITHUB_TOKEN\" https://api.github.com/user | grep -q GravityGremlin"

{
  echo ""
  echo "## Self-monitor $TS — pass=$pass fail=$fail"
} >> journal.md

git add journal.md
git commit -q -m "self-monitor $TS (pass=$pass fail=$fail)" || true
git push -q origin main 2>/dev/null && echo "status pushed"
echo "monitor result: pass=$pass fail=$fail"
[ "$fail" -eq 0 ]