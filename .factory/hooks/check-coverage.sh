#!/bin/bash
set -e

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name')
file_path=$(echo "$input" | jq -r '.tool_input.file_path // ""')

# Only check code files
if ! echo "$file_path" | grep -qE '\.(ts|tsx|js|jsx|py)$'; then
  exit 0
fi

cwd=$(echo "$input" | jq -r '.cwd')
cd "$cwd"

# Minimum coverage threshold
MIN_COVERAGE="${DROID_MIN_COVERAGE:-80}"

echo "📊 Checking test coverage..."

case "$file_path" in
  *.ts|*.tsx|*.js|*.jsx)
    # Jest coverage
    if command -v npm &> /dev/null && grep -q '"test"' package.json; then
      # Run coverage for specific file
      coverage_output=$(npm test -- --coverage --collectCoverageFrom="$file_path" --silent 2>&1 || true)
      
      # Extract coverage percentage
      if echo "$coverage_output" | grep -qE "All files.*[0-9]+(\.[0-9]+)?%"; then
        coverage=$(echo "$coverage_output" | grep "All files" | grep -oE "[0-9]+(\.[0-9]+)?%" | head -1 | tr -d '%')
        
        if (( $(echo "$coverage < $MIN_COVERAGE" | bc -l) )); then
          echo "❌ Coverage too low: ${coverage}% (minimum: ${MIN_COVERAGE}%)" >&2
          echo "Please add tests to improve coverage." >&2
          exit 2
        fi
        
        echo "✓ Coverage: ${coverage}%"
      fi
    fi
    ;;
    
  *.py)
    # Python coverage
    if command -v pytest &> /dev/null; then
      coverage_output=$(pytest --cov="$file_path" --cov-report=term 2>&1 || true)
      
      if echo "$coverage_output" | grep -qE "TOTAL.*[0-9]+%"; then
        coverage=$(echo "$coverage_output" | grep "TOTAL" | grep -oE "[0-9]+%" | tr -d '%')
        
        if [ "$coverage" -lt "$MIN_COVERAGE" ]; then
          echo "❌ Coverage too low: ${coverage}% (minimum: ${MIN_COVERAGE}%)" >&2
          exit 2
        fi
        
        echo "✓ Coverage: ${coverage}%"
      fi
    fi
    ;;
esac

exit 0