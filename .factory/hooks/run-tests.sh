#!/bin/bash
set -e

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name')
file_path=$(echo "$input" | jq -r '.tool_input.file_path // ""')

# Only run tests after file write/edit
if [ "$tool_name" != "Write" ] && [ "$tool_name" != "Edit" ]; then
  exit 0
fi

# Skip non-code files
if ! echo "$file_path" | grep -qE '\.(ts|tsx|js|jsx|py|go)$'; then
  exit 0
fi

# Skip test files themselves
if echo "$file_path" | grep -qE '\.(test|spec)\.(ts|tsx|js|jsx)$'; then
  exit 0
fi

cwd=$(echo "$input" | jq -r '.cwd')
cd "$cwd"

echo "🧪 Running tests for changed file..."

# Determine test command based on file type
case "$file_path" in
  *.ts|*.tsx|*.js|*.jsx)
    # Find corresponding test file
    test_file=$(echo "$file_path" | sed -E 's/\.(ts|tsx|js|jsx)$/.test.\1/')
    
    if [ ! -f "$test_file" ]; then
      # Try alternate naming
      test_file=$(echo "$file_path" | sed -E 's/\.(ts|tsx|js|jsx)$/.spec.\1/')
    fi
    
    if [ -f "$test_file" ]; then
      # Run specific test file
      if command -v npm &> /dev/null && grep -q '"test"' package.json; then
        npm test -- "$test_file" 2>&1 || {
          echo "❌ Tests failed for $test_file" >&2
          echo "Please fix the failing tests." >&2
          exit 2
        }
        echo "✓ Tests passed for $test_file"
      fi
    else
      echo "⚠️ No test file found for $file_path"
      echo "Consider creating: $test_file"
    fi
    ;;
    
  *.py)
    # Run pytest for Python files
    if command -v pytest &> /dev/null; then
      # Find test file
      test_file=$(echo "$file_path" | sed 's/\.py$//' | sed 's|^src/|tests/test_|')_test.py
      
      if [ -f "$test_file" ]; then
        pytest "$test_file" -v 2>&1 || {
          echo "❌ Tests failed" >&2
          exit 2
        }
        echo "✓ Tests passed"
      else
        echo "⚠️ No test file found at $test_file"
      fi
    fi
    ;;
    
  *.go)
    # Run go test
    if command -v go &> /dev/null; then
      package=$(dirname "$file_path")
      go test "./$package" -v 2>&1 || {
        echo "❌ Tests failed" >&2
        exit 2
      }
      echo "✓ Tests passed"
    fi
    ;;
esac

exit 0