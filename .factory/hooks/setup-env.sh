#!/bin/bash
set -e

input=$(cat)
cwd=$(echo "$input" | jq -r '.cwd')
cd "$cwd"

echo "🔧 Setting up development environment..."

# Detect and setup Node.js version
if [ -f ".nvmrc" ] && command -v nvm &> /dev/null; then
  NODE_VERSION=$(cat .nvmrc)
  echo "📦 Switching to Node.js $NODE_VERSION"
  
  # Persist environment changes using DROID_ENV_FILE
  if [ -n "$DROID_ENV_FILE" ]; then
    # Capture environment before nvm
    ENV_BEFORE=$(export -p | sort)
    
    # Source nvm and switch version
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm use
    
    # Capture changes and persist them
    ENV_AFTER=$(export -p | sort)
    comm -13 <(echo "$ENV_BEFORE") <(echo "$ENV_AFTER") >> "$DROID_ENV_FILE"
    
    echo "✓ Node.js environment configured"
  fi
fi

# Setup Python virtual environment
if [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
  if [ ! -d "venv" ]; then
    echo "⚠️ Virtual environment not found. Consider creating one:"
    echo "   python -m venv venv"
  else
    echo "🐍 Python virtual environment detected"
    
    if [ -n "$DROID_ENV_FILE" ]; then
      # Activate venv for session
      echo "source \"$cwd/venv/bin/activate\"" >> "$DROID_ENV_FILE"
      echo "✓ Virtual environment will be activated for Bash commands"
    fi
  fi
fi

# Add project binaries to PATH
if [ -d "node_modules/.bin" ] && [ -n "$DROID_ENV_FILE" ]; then
  echo "export PATH=\"\$PATH:$cwd/node_modules/.bin\"" >> "$DROID_ENV_FILE"
  echo "✓ Added node_modules/.bin to PATH"
fi

# Setup Go workspace
if [ -f "go.mod" ]; then
  echo "🔷 Go module detected"
  if [ -n "$DROID_ENV_FILE" ]; then
    echo "export GO111MODULE=on" >> "$DROID_ENV_FILE"
    echo "export GOPATH=$HOME/go" >> "$DROID_ENV_FILE"
  fi
fi

echo ""
echo "✓ Environment setup complete"

exit 0