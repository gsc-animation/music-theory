#!/bin/bash

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name')

# Only validate Bash commands that look like git commit
if [ "$tool_name" != "Bash" ]; then
  exit 0
fi

command=$(echo "$input" | jq -r '.tool_input.command')

# Check if this is a git commit command
if ! echo "$command" | grep -qE "^git commit"; then
  exit 0
fi

# Extract commit message from command
if echo "$command" | grep -qE "git commit -m"; then
  # Extract message from -m flag
  commit_msg=$(echo "$command" | sed -E 's/.*git commit.*-m[= ]*["\x27]([^"\x27]+)["\x27].*/\1/')
else
  # Allow commits without -m (will open editor)
  exit 0
fi

# Validate conventional commit format
# Format: type(scope): description
# Example: feat(auth): add login functionality

if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?:.+"; then
  echo "❌ Invalid commit message format" >&2
  echo "" >&2
  echo "Commit message must follow Conventional Commits format:" >&2
  echo "  type(scope): description" >&2
  echo "" >&2
  echo "Valid types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert" >&2
  echo "" >&2
  echo "Examples:" >&2
  echo "  feat(auth): add user login" >&2
  echo "  fix(api): handle null values" >&2
  echo "  docs: update README" >&2
  exit 2
fi

# Check for Linear issue reference
if ! echo "$commit_msg" | grep -qE "FAC-[0-9]+"; then
  echo "⚠️ No Linear issue reference found" >&2
  echo "Consider adding issue reference like: feat(auth): add login FAC-123" >&2
  # Warning only, don't block
fi

exit 0