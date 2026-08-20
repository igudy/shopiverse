#!/usr/bin/env bash
# CI gate: scan tracked config files for Lazarus/PolinRider injection (via supply-chain-guard).
set -euo pipefail

ROOT="${1:-.}"
cd "$ROOT"

if [[ ! -f scripts/supply-chain-guard.py ]]; then
  echo "::error::scripts/supply-chain-guard.py is missing" >&2
  exit 1
fi

python3 scripts/supply-chain-guard.py scan "$ROOT"
