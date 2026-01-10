#!/bin/bash
set -e

input=$(cat)
source_type=$(echo "$input" | jq -r '.source')

if [ "$source_type" != "startup" ]; then
  exit 0
fi

cwd=$(echo "$input" | jq -r '.cwd')

# Load project-specific guidelines
if [ -f "$cwd/.factory/AGENTS.md" ]; then
  echo "## Project Guidelines"
  echo ""
  cat "$cwd/.factory/AGENTS.md"
  echo ""
fi

# Load PR templates
if [ -f "$cwd/.github/PULL_REQUEST_TEMPLATE.md" ]; then
  echo "## PR Template Reference"
  echo ""
  head -n 20 "$cwd/.github/PULL_REQUEST_TEMPLATE.md"
  echo ""
fi

exit 0