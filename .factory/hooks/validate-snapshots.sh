#!/bin/bash
set -e

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name')
file_path=$(echo "$input" | jq -r '.tool_input.file_path // ""')

# Check if snapshot files changed
if ! echo "$file_path" | grep -qE '__snapshots__/.*\.snap$'; then
  exit 0
fi

cwd=$(echo "$input" | jq -r '.cwd')
cd "$cwd"

echo "📸 Snapshot file modified: $file_path"
echo ""

# Run tests in update mode to verify
test_file=$(echo "$file_path" | sed 's|/__snapshots__/.*\.snap$|.test.ts|')

if [ ! -f "$test_file" ]; then
  test_file=$(echo "$file_path" | sed 's|/__snapshots__/.*\.snap$|.spec.ts|')
fi

if [ -f "$test_file" ]; then
  echo "Verifying snapshot update..."
  
  if npm test -- "$test_file" -u 2>&1; then
    echo "✓ Snapshot update verified"
    echo ""
    echo "⚠️ Remember to review snapshot changes before committing:"
    echo "  git diff $file_path"
  else
    echo "❌ Snapshot verification failed" >&2
    exit 2
  fi
else
  echo "⚠️ Could not find test file for snapshot"
fi

exit 0