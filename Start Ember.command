#!/bin/bash
# Double-click this file to launch the Ember interview trainer.
cd "$(dirname "$0")" || exit 1

printf '\n  EMBER — IB / PE interview trainer\n\n'

if ! command -v node >/dev/null 2>&1; then
  # Homebrew installs that are not on the double-click shell's PATH
  export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
fi

if ! command -v node >/dev/null 2>&1; then
  echo "  Node.js is not installed. Get it from https://nodejs.org and run this again."
  read -r -p "  Press return to close." _
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "  First run — installing dependencies (about a minute)..."
  npm install --silent || { read -r -p "  Install failed. Press return." _; exit 1; }
fi

# Rebuild only when the source is newer than the last build.
needs_build=0
[ ! -f dist/index.html ] && needs_build=1
if [ "$needs_build" = "0" ]; then
  if [ -n "$(find src index.html vite.config.ts -newer dist/index.html 2>/dev/null | head -1)" ]; then
    needs_build=1
  fi
fi

if [ "$needs_build" = "1" ]; then
  echo "  Building the dashboard..."
  npm run build --silent || { read -r -p "  Build failed. Press return." _; exit 1; }
fi

node serve.mjs
