#!/usr/bin/env bash
# Overwrite remote branch with your current local HEAD after verifying it is clean.
#
# Usage:
#   bash scripts/force-push-clean.sh                  # current branch -> origin
#   bash scripts/force-push-clean.sh main           # push local main
#   bash scripts/force-push-clean.sh ig-updates origin
#
set -euo pipefail

BRANCH="${1:-$(git branch --show-current)}"
REMOTE="${2:-origin}"

if [[ -z "$BRANCH" ]]; then
  echo "ERROR: could not detect branch. Pass branch name as first argument." >&2
  exit 1
fi

echo "=== Scanning working tree for malware ==="
if [[ -f scripts/supply-chain-guard.py ]]; then
  python3 scripts/supply-chain-guard.py scan .
else
  echo "WARN: scripts/supply-chain-guard.py not found — skipping scan" >&2
fi

echo ""
echo "=== Files that differ from ${REMOTE}/${BRANCH} ==="
git fetch "$REMOTE" "$BRANCH" 2>/dev/null || true
git log --oneline -3 HEAD
echo ""
git diff --stat "HEAD..${REMOTE}/${BRANCH}" 2>/dev/null || echo "(remote branch may not exist yet)"
echo ""

echo "This will FORCE ${REMOTE}/${BRANCH} to match your LOCAL commit:"
git log -1 --oneline HEAD
echo ""
read -r -p "Type YES to force-push: " confirm
if [[ "$confirm" != "YES" ]]; then
  echo "Aborted."
  exit 1
fi

git push --force-with-lease "$REMOTE" "HEAD:${BRANCH}"
echo "Done. Remote ${REMOTE}/${BRANCH} now matches your local HEAD."
