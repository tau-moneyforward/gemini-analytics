#!/bin/bash
# Gemini Analytics Tool — セットアップ
# .claude/commands/ にスラッシュコマンドのシンボリックリンクを作成する

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
COMMANDS_SRC="$SCRIPT_DIR/commands"
COMMANDS_DST="$REPO_ROOT/.claude/commands"

mkdir -p "$COMMANDS_DST"

for cmd in "$COMMANDS_SRC"/*.md; do
  name="$(basename "$cmd")"
  target="$COMMANDS_DST/$name"
  if [ -e "$target" ]; then
    echo "skip: $name (already exists)"
  else
    ln -s "../../2026-03-02-gemini-analytics-tool/commands/$name" "$target"
    echo "link: $name"
  fi
done

echo ""
echo "Done. Available commands:"
for cmd in "$COMMANDS_SRC"/*.md; do
  echo "  /$(basename "$cmd" .md)"
done
