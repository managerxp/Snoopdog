#!/usr/bin/env bash
# Build the site and make it live, or roll back.
#   ./deploy/release.sh             build, copy dist/ to releases/<time>, point "current" at it
#   ./deploy/release.sh rollback    point "current" at the previous release
# Run from the repo root on the VPS. Needs Node 22+. Keeps the last 5 releases.
set -euo pipefail

BASE=/var/www/snoopdog
cd "$BASE/releases" 2>/dev/null || { echo "missing $BASE/releases (see DEPLOY.md step 1)" >&2; exit 1; }

if [ "${1:-}" = "rollback" ]; then
  current=$(basename "$(readlink -f "$BASE/current")")
  prev=$(ls -1 | sort | grep -B1 -x "$current" | head -n1)
  if [ -z "$prev" ] || [ "$prev" = "$current" ]; then echo "no earlier release to roll back to" >&2; exit 1; fi
  ln -sfn "$BASE/releases/$prev" "$BASE/current.new" && mv -T "$BASE/current.new" "$BASE/current"
  echo "rolled back to $prev"
  exit 0
fi

cd - >/dev/null
npm ci
npm run build                       # also writes the sitemap when .env.production sets VITE_SITE_URL
rel="$BASE/releases/$(date +%Y%m%d-%H%M%S)"
mkdir "$rel"
cp -r dist/. "$rel/"
ln -sfn "$rel" "$BASE/current.new" && mv -T "$BASE/current.new" "$BASE/current"   # atomic rename: visitors never see a half-copied site
echo "live: $rel"
(cd "$BASE/releases" && ls -1 | sort | head -n -5 | xargs -r rm -rf)
