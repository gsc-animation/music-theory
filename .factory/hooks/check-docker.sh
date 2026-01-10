#!/bin/bash

if ! command -v docker &> /dev/null; then
  exit 0
fi

# Check if Docker daemon is running
if ! docker info &>/dev/null; then
  echo "⚠️ Docker daemon not running"
  echo "Suggestion: Start Docker Desktop or run 'sudo systemctl start docker'"
  echo ""
  exit 0
fi

echo "## Docker Environment"
echo ""

# Check for docker-compose.yml
if [ -f "docker-compose.yml" ] || [ -f "docker-compose.yaml" ]; then
  echo "Docker Compose configuration found"
  
  # Check if services are running
  if docker-compose ps &>/dev/null; then
    echo ""
    echo "Running services:"
    docker-compose ps --format "table {{.Name}}\t{{.Status}}" | tail -n +2 | sed 's/^/  /'
  else
    echo "Suggestion: Start services with 'docker-compose up -d'"
  fi
  echo ""
fi

exit 0