#!/bin/bash
set -e

input=$(cat)
source_type=$(echo "$input" | jq -r '.source')

# Only load context on startup and resume
if [ "$source_type" != "startup" ] && [ "$source_type" != "resume" ]; then
  exit 0
fi

cwd=$(echo "$input" | jq -r '.cwd')
cd "$cwd"

echo "📋 Loading project context..."
echo ""

# Project overview
if [ -f "README.md" ]; then
  echo "## Project Overview"
  echo ""
  head -n 20 README.md
  echo ""
fi

# Recent git activity
if [ -d ".git" ]; then
  echo "## Recent Changes"
  echo ""
  echo "Latest commits:"
  git log --oneline -5
  echo ""
  
  echo "Current branch: $(git branch --show-current)"
  echo "Uncommitted changes: $(git status --short | wc -l | tr -d ' ') files"
  echo ""
fi

# Project structure
if [ -f "package.json" ]; then
  echo "## Package Info"
  echo ""
  echo "Name: $(jq -r '.name' package.json)"
  echo "Version: $(jq -r '.version' package.json)"
  echo ""
  
  echo "Scripts available:"
  jq -r '.scripts | keys[]' package.json | head -n 10 | sed 's/^/  - /'
  echo ""
fi

# TODO/FIXME comments
echo "## Open TODOs"
echo ""
echo "Found $(grep -r "TODO\|FIXME" src/ 2>/dev/null | wc -l | tr -d ' ') TODO/FIXME comments in src/"
echo ""

exit 0