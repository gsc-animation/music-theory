#!/bin/bash

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name')
file_path=$(echo "$input" | jq -r '.tool_input.file_path // ""')

# Only check Write operations (new files)
if [ "$tool_name" != "Write" ]; then
  exit 0
fi

# Only check code files in src/
if ! echo "$file_path" | grep -qE '^src/.*\.(ts|tsx|js|jsx|py)$'; then
  exit 0
fi

# Skip if it's already a test file
if echo "$file_path" | grep -qE '\.(test|spec)\.(ts|tsx|js|jsx)$'; then
  exit 0
fi

cwd=$(echo "$input" | jq -r '.cwd')

# Determine expected test file location
case "$file_path" in
  *.ts|*.tsx|*.js|*.jsx)
    test_file1=$(echo "$file_path" | sed -E 's/\.(ts|tsx|js|jsx)$/.test.\1/')
    test_file2=$(echo "$file_path" | sed -E 's/\.(ts|tsx|js|jsx)$/.spec.\1/')
    test_file3=$(echo "$file_path" | sed 's|^src/|tests/|; s/\.(ts|tsx|js|jsx)$/.test.\1/')
    ;;
    
  *.py)
    test_file1=$(echo "$file_path" | sed 's|^src/|tests/|; s/\.py$/_test.py/')
    test_file2=$(echo "$file_path" | sed 's|^src/|tests/test_|')
    test_file3=""
    ;;
esac

# Check if any test file exists
found_test=false
for test_file in "$test_file1" "$test_file2" "$test_file3"; do
  if [ -n "$test_file" ] && [ -f "$cwd/$test_file" ]; then
    found_test=true
    break
  fi
done

if [ "$found_test" = false ]; then
  echo "⚠️ No test file found for $file_path" >&2
  echo "" >&2
  echo "Please create a test file at one of:" >&2
  echo "  - $test_file1" >&2
  [ -n "$test_file2" ] && echo "  - $test_file2" >&2
  [ -n "$test_file3" ] && echo "  - $test_file3" >&2
  echo "" >&2
  echo "Or ask me: 'Create tests for $file_path'" >&2
  
  # Warning only, don't block
  # Change to exit 2 to enforce test creation
fi

exit 0