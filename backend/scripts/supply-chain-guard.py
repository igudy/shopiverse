#!/usr/bin/env python3
"""
Detect and remove Lazarus/PolinRider JS config injection markers in build configs.

Usage:
  python3 scripts/supply-chain-guard.py scan [root]
  python3 scripts/supply-chain-guard.py clean [root]
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

# Primary IOC markers — built dynamically so this file is not flagged by text scans
def _malware_markers() -> tuple[str, ...]:
    g = "global["
    return (
        g + "'!']",
        g + '"!"]',
        g + "'_V']",
        g + '"_V"]',
        "_$_1e42",
        "rmcej%otb%",
        "Cot%3t=shtP",
    )


MALWARE_MARKERS = _malware_markers()

# Known attack artifact filenames (safe to delete when present)
ARTIFACT_NAMES = frozenset(
    {
        "temp_auto_push.bat",
        "temp_interactive_push.bat",
        "config.bat",
        "branch_structure.json",
    }
)

SKIP_DIR_NAMES = frozenset(
    {
        ".git",
        "node_modules",
        "dist",
        "build",
        ".next",
        "coverage",
        "vendor",
        ".pnpm-store",
    }
)

GITIGNORE_ARTIFACT_LINES = frozenset(
    {
        "branch_structure.json",
        "temp_auto_push.bat",
        "temp_interactive_push.bat",
        "config.bat",
    }
)


def should_skip_dir(path: Path) -> bool:
    return path.name in SKIP_DIR_NAMES


def find_marker_index(text: str) -> int:
    indices = [text.find(m) for m in MALWARE_MARKERS if m in text]
    return min(indices) if indices else -1


def iter_scan_files(root: Path) -> list[Path]:
    files: list[Path] = []
    target_names = {
        "tailwind.config.js",
        "tailwind.config.ts",
        "tailwind.config.cjs",
        "tailwind.config.mjs",
        "postcss.config.js",
        "postcss.config.mjs",
        "postcss.config.cjs",
        "vite.config.js",
        "vite.config.ts",
        "vite.config.mjs",
        "next.config.js",
        "next.config.mjs",
        "next.config.ts",
        "eslint.config.js",
        "eslint.config.mjs",
        "babel.config.js",
        "webpack.config.js",
        "rollup.config.js",
        "nuxt.config.js",
        "nuxt.config.ts",
    }
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIR_NAMES]
        for name in filenames:
            if name in target_names:
                files.append(Path(dirpath) / name)
    return sorted(files)


def scan_file(path: Path) -> bool:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError as err:
        print(f"WARN: could not read {path}: {err}", file=sys.stderr)
        return False
    return find_marker_index(text) >= 0


def clean_file(path: Path, dry_run: bool) -> bool:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError as err:
        print(f"WARN: could not read {path}: {err}", file=sys.stderr)
        return False

    idx = find_marker_index(text)
    if idx < 0:
        return False

    cleaned = text[:idx].rstrip()
    if not cleaned.endswith("\n"):
        cleaned += "\n"

    if dry_run:
        print(f"WOULD CLEAN: {path}")
    else:
        path.write_text(cleaned, encoding="utf-8")
        print(f"CLEANED: {path}")

    return True


def find_artifacts(root: Path) -> list[Path]:
    found: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIR_NAMES]
        for name in filenames:
            if name in ARTIFACT_NAMES:
                found.append(Path(dirpath) / name)
    return sorted(found)


def clean_gitignore(root: Path, dry_run: bool) -> list[Path]:
    changed: list[Path] = []
    for gitignore in root.rglob(".gitignore"):
        if any(p in SKIP_DIR_NAMES for p in gitignore.parts):
            continue
        try:
            lines = gitignore.read_text(encoding="utf-8", errors="replace").splitlines()
        except OSError:
            continue

        new_lines = [line for line in lines if line.strip() not in GITIGNORE_ARTIFACT_LINES]
        if new_lines == lines:
            continue

        if dry_run:
            print(f"WOULD FIX .gitignore: {gitignore}")
        else:
            gitignore.write_text(
                "\n".join(new_lines) + ("\n" if new_lines else ""),
                encoding="utf-8",
            )
            print(f"FIXED .gitignore: {gitignore}")
        changed.append(gitignore)

    return changed


def cmd_scan(root: Path) -> int:
    infected: list[Path] = []
    for path in iter_scan_files(root):
        if scan_file(path):
            infected.append(path)
            print(f"INFECTED: {path}")

    for artifact in find_artifacts(root):
        print(f"ARTIFACT: {artifact}")
        infected.append(artifact)

    if infected:
        print(f"\nFound {len(infected)} issue(s). Run: python3 scripts/supply-chain-guard.py clean")
        return 1

    print("OK: no malware markers or attack artifacts found.")
    return 0


def cmd_clean(root: Path, dry_run: bool) -> int:
    cleaned_any = False

    for path in iter_scan_files(root):
        if clean_file(path, dry_run):
            cleaned_any = True

    for artifact in find_artifacts(root):
        if dry_run:
            print(f"WOULD DELETE: {artifact}")
        else:
            artifact.unlink(missing_ok=True)
            print(f"DELETED: {artifact}")
        cleaned_any = True

    if clean_gitignore(root, dry_run):
        cleaned_any = True

    if cleaned_any:
        print("\nDone. Re-scan with: python3 scripts/supply-chain-guard.py scan")
        return 0

    print("Nothing to clean.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Scan/clean Lazarus config-file injection")
    parser.add_argument(
        "command",
        choices=("scan", "clean"),
        help="scan = detect only; clean = truncate infected files and remove artifacts",
    )
    parser.add_argument(
        "root",
        nargs="?",
        default=".",
        help="Repository root (default: current directory)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="With clean: show what would change without writing",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.is_dir():
        print(f"ERROR: not a directory: {root}", file=sys.stderr)
        return 2

    if args.command == "scan":
        return cmd_scan(root)
    return cmd_clean(root, args.dry_run)


if __name__ == "__main__":
    sys.exit(main())
