#!/bin/bash
set -e

input=$(cat)
cwd=$(echo "$input" | jq -r '.cwd')
cd "$cwd"

if [ ! -d ".git" ]; then
  exit 0
fi

branch=$(git branch --show-current)

echo "## Current Context: $branch"
echo ""

case "$branch" in
  main|master)
    echo "⚠️ Working on production branch!"
    echo "Extra care needed - changes go to production"
    echo ""
    
    # Show recent production issues
    if command -v gh &> /dev/null; then
      echo "Recent production issues:"
      gh issue list --label production --limit 3 --json number,title | \
        jq -r '.[] | "  - #\(.number): \(.title)"'
      echo ""
    fi
    ;;
    
  dev|develop)
    echo "📦 Working on development branch"
    echo "Standard development workflow applies"
    echo ""
    ;;
    
  feature/*)
    feature_name="${branch#feature/}"
    echo "🔨 Feature branch: $feature_name"
    echo ""
    
    # Try to find related issue
    if [[ $feature_name =~ FAC-[0-9]+ ]]; then
      issue_id="${BASH_REMATCH[0]}"
      echo "Related Linear issue: $issue_id"
      
      # Fetch issue details if linear CLI available
      if command -v linear &> /dev/null; then
        linear issue view "$issue_id" 2>/dev/null || true
        echo ""
      fi
    fi
    
    # Show uncommitted changes
    if [ -n "$(git status --short)" ]; then
      echo "Uncommitted changes:"
      git status --short | head -n 10
      echo ""
    fi
    ;;
    
  hotfix/*)
    echo "🚨 HOTFIX BRANCH"
    echo "Critical bug fix - expedite review and deployment"
    echo ""
    ;;
esac

exit 0