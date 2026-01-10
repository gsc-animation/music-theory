#!/bin/bash
set -e

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name')
file_path=$(echo "$input" | jq -r '.tool_input.file_path // ""')

# Only check test files
if ! echo "$file_path" | grep -qE '\.(test|spec)\.(ts|tsx|js|jsx)$'; then
  exit 0
fi

cwd=$(echo "$input" | jq -r '.cwd')
cd "$cwd"

echo "🎲 Checking for test flakiness..."

# Run tests multiple times
RUNS=3
failures=0

for i in $(seq 1 $RUNS); do
  echo "Run $i/$RUNS..."
  
  if ! npm test -- "$file_path" --silent 2>&1; then
    ((failures++))
  fi
done

if [ $failures -gt 0 ] && [ $failures -lt $RUNS ]; then
  echo "" >&2
  echo "⚠️ FLAKY TEST DETECTED" >&2
  echo "Test passed $((RUNS - failures))/$RUNS times" >&2
  echo "" >&2
  echo "This test is unreliable and should be fixed." >&2
  echo "Common causes:" >&2
  echo "  - Race conditions" >&2
  echo "  - Timing dependencies" >&2
  echo "  - Non-deterministic data" >&2
  echo "  - External dependencies" >&2
  
  # Warning only, don't block
  exit 0
elif [ $failures -eq $RUNS ]; then
  echo "❌ Test consistently fails" >&2
  exit 2
else
  echo "✓ Test is stable ($RUNS/$RUNS passed)"
fi

exit 0