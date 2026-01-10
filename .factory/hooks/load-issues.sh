#!/bin/bash
set -e

input=$(cat)
source_type=$(echo "$input" | jq -r '.source')

if [ "$source_type" != "startup" ]; then
  exit 0
fi

echo "📋 Loading recent issues..."
echo ""

# Load GitHub issues if gh CLI is available
if command -v gh &> /dev/null; then
  echo "## Recent GitHub Issues"
  echo ""
  
  # Get assigned issues
  gh issue list --assignee @me --limit 5 --json number,title,state | \
    jq -r '.[] | "  - #\(.number): \(.title) [\(.state)]"'
  echo ""
fi

# Load Linear issues if linear CLI is available
if command -v linear &> /dev/null; then
  echo "## Recent Linear Issues"
  echo ""
  
  # Get assigned issues
  linear issue list --assignee @me --limit 5 2>/dev/null | head -n 10
  echo ""
fi

# Check for CHANGELOG or ROADMAP
if [ -f "CHANGELOG.md" ]; then
  echo "## Recent Changelog"
  echo ""
  head -n 15 CHANGELOG.md
  echo ""
fi

exit 0