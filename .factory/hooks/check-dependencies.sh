#!/bin/bash
set -e

input=$(cat)
cwd=$(echo "$input" | jq -r '.cwd')
cd "$cwd"

echo "📦 Checking dependencies..."
echo ""

# Node.js projects
if [ -f "package.json" ]; then
  if [ ! -d "node_modules" ]; then
    echo "⚠️ node_modules not found"
    echo "Suggestion: Run 'npm install' or 'yarn install'"
    echo ""
  else
    # Check if package.json is newer than node_modules
    if [ "package.json" -nt "node_modules" ]; then
      echo "⚠️ package.json modified since last install"
      echo "Suggestion: Run 'npm install' to update dependencies"
      echo ""
    else
      echo "✓ Node dependencies up to date"
      echo ""
    fi
  fi
fi

# Python projects
if [ -f "requirements.txt" ]; then
  if [ ! -d "venv" ]; then
    echo "⚠️ Python virtual environment not found"
    echo "Suggestion: Run 'python -m venv venv && source venv/bin/activate && pip install -r requirements.txt'"
    echo ""
  else
    echo "✓ Python virtual environment exists"
    echo ""
  fi
fi

# Go projects
if [ -f "go.mod" ]; then
  if [ ! -d "vendor" ] && ! command -v go &> /dev/null; then
    echo "⚠️ Go not found in PATH"
    echo "Suggestion: Install Go from https://go.dev"
    echo ""
  else
    echo "✓ Go environment ready"
    echo ""
  fi
fi

# Ruby projects
if [ -f "Gemfile" ]; then
  if ! command -v bundle &> /dev/null; then
    echo "⚠️ Bundler not found"
    echo "Suggestion: gem install bundler"
    echo ""
  else
    if ! bundle check &>/dev/null; then
      echo "⚠️ Ruby gems out of date"
      echo "Suggestion: bundle install"
      echo ""
    else
      echo "✓ Ruby gems up to date"
      echo ""
    fi
  fi
fi

exit 0