#!/usr/bin/env bash
# Opt-in-by-usage Stop hook: nudge to run /capture-learnings after plan/PRD work.
# Silent no-op unless .claude/memory/ already exists in the current project (that
# directory's presence IS the per-project opt-in signal — see .claude/rules/memory-wiki.md)
# AND a plan or PRD file was modified in the last 30 minutes. Never writes the wiki itself.
set -euo pipefail

[ -d ".claude/memory" ] || exit 0

for dir in "docs/superpowers/plans" "docs/superpowers/prd"; do
  if [ -d "$dir" ] && find "$dir" -name '*.md' -mmin -30 -print -quit | grep -q .; then
    echo "A plan or PRD under $dir was touched recently. Consider running /capture-learnings to update the memory wiki."
    exit 0
  fi
done

exit 0
