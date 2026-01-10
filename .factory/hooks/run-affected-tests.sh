#!/bin/bash
set -e

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name')
file_path=$(echo "$input" | jq -r '.tool_input.file_path // ""')

if [ "$tool_name" != "Write" ] && [ "$tool_name" != "Edit" ]; then
  exit 0
fi

cwd=$(echo "$input" | jq -r '.cwd')
cd "$cwd"

# Find tests that import this file
echo "🔍 Finding affected tests..."

case "$file_path" in
  *.ts|*.tsx|*.js|*.jsx)
    # Find test files that import this file
    filename=$(basename "$file_path" | sed -E 's/\.(ts|tsx|js|jsx)$//')
    module_name=$(echo "$file_path" | sed 's|^src/||; s/\.(ts|tsx|js|jsx)$//')
    
    # Search for imports
    affected_tests=$(grep -rl "from.*['\"].*$module_name['\"]" . \
      --include="*.test.ts" \
      --include="*.test.tsx" \
      --include="*.test.js" \
      --include="*.test.jsx" \
      --include="*.spec.ts" \
      --include="*.spec.tsx" \
      2>/dev/null || true)
    
    if [ -n "$affected_tests" ]; then
      echo "Running affected tests:"
      echo "$affected_tests" | sed 's/^/  - /'
      echo ""
      
      # Run tests
      echo "$affected_tests" | while read -r test_file; do
        npm test -- "$test_file" 2>&1 || {
          echo "❌ Test failed: $test_file" >&2
          exit 2
        }
      done
      
      echo "✓ All affected tests passed"
    else
      echo "No affected tests found"
    fi
    ;;
esac

exit 0