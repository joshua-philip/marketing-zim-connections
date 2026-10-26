#!/usr/bin/env bash
# Publish only built public files; keep the previous release available for rollback.
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
site_dir="/var/www/zim-squad"
build_dir="$repo_dir/dist"

if [[ ! -s "$build_dir/index.html" || ! -d "$build_dir/assets" ]]; then
  echo "No production build found. Run pnpm build first." >&2
  exit 1
fi
if [[ -n "$(find "$build_dir" -type l -print -quit)" ]]; then
  echo "Refusing a build containing symlinks." >&2
  exit 1
fi
if sudo test -e "$site_dir/current" && ! sudo test -L "$site_dir/current"; then
  echo "$site_dir/current must be a release symlink, not a file or directory." >&2
  exit 1
fi

release_id="$(date -u +%Y%m%dT%H%M%SZ)-$$"
release_dir="$site_dir/releases/$release_id"
sudo install -d -m 0755 "$site_dir" "$site_dir/releases" "$site_dir/assets" "$release_dir"
sudo cp -R "$build_dir/." "$release_dir/"
sudo chmod -R a+rX "$release_dir"

# Copy assets before switching the entry point; preserve chunks used by open tabs.
sudo cp -R "$release_dir/assets/." "$site_dir/assets/"
sudo chmod -R a+rX "$site_dir/assets"
sudo ln -s "releases/$release_id" "$site_dir/.current-$release_id"
sudo mv -Tf "$site_dir/.current-$release_id" "$site_dir/current"

echo "Published $release_dir"
echo "Active release: $site_dir/current"
echo "Nginx config and other hosted apps were not changed."
