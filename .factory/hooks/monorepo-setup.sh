#!/bin/bash
set -e

input=$(cat)
cwd=$(echo "$input" | jq -r '.cwd')

# Check if this is a monorepo
if [ ! -f "$cwd/package.json" ] || ! grep -q '"workspaces"' "$cwd/package.json"; then
  exit 0
fi

echo "## Monorepo Structure"
echo ""

# List workspaces
if command -v npm &> /dev/null; then
  echo "Available workspaces:"
  npm ls --workspaces --depth=0 2>/dev/null | grep -E "^[├└]" | sed 's/^[├└]── /  - /'
  echo ""
fi

# Show recent changes by workspace
if [ -d ".git" ]; then
  echo "Recently modified workspaces:"
  git diff --name-only HEAD~5..HEAD | \
    grep -E "^(packages|apps)/" | \
    cut -d/ -f1-2 | \
    sort -u | \
    head -n 5 | \
    sed 's/^/  - /'
  echo ""
fi

exit 0