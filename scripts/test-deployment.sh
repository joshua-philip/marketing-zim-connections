#!/usr/bin/env bash
# Exercise deployment failure/release behavior in an unprivileged temporary fixture.
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
test_dir="$(mktemp -d /tmp/zim-deploy-test.XXXXXXXX)"
trap 'rm -rf -- "$test_dir"' EXIT
export SITE_SANDBOX="$test_dir/server"
mkdir -p "$test_dir/repo/scripts" "$test_dir/repo/dist/assets" "$test_dir/bin"
mkdir -p "$SITE_SANDBOX/etc/nginx/sites-available" "$SITE_SANDBOX/etc/nginx/sites-enabled"
cp "$repo_dir/scripts/publish-static.sh" "$repo_dir/scripts/install-nginx.sh" "$test_dir/repo/scripts/"
cp -R "$repo_dir/deploy" "$test_dir/repo/"

# No actual sudo, Nginx configuration or /var/www files are touched by this test.
cat > "$test_dir/bin/sudo" <<'STUB'
#!/usr/bin/env bash
set -euo pipefail
command_name="$1"
shift
args=()
for arg in "$@"; do
  case "$arg" in
    /var/www/zim-squad*|/etc/nginx/sites-available/zim-squad|/etc/nginx/sites-enabled/zim-squad)
      arg="$SITE_SANDBOX$arg" ;;
  esac
  args+=("$arg")
done
case "$command_name" in
  nginx)
    count="$(cat "$SITE_SANDBOX/nginx-count" 2>/dev/null || echo 0)"
    count=$((count + 1))
    echo "$count" > "$SITE_SANDBOX/nginx-count"
    [[ "${FAIL_SECOND_CHECK:-0}" != 1 || "$count" != 2 ]] ;;
  systemctl) echo "${args[*]}" >> "$SITE_SANDBOX/reloads" ;;
  *) exec "$command_name" "${args[@]}" ;;
esac
STUB
chmod +x "$test_dir/bin/sudo"
export PATH="$test_dir/bin:$PATH"
fixture="$test_dir/repo"
site="$SITE_SANDBOX/var/www/zim-squad"

echo first > "$fixture/dist/index.html"
echo old-chunk > "$fixture/dist/assets/first.js"
bash "$fixture/scripts/publish-static.sh"
previous="$(readlink "$site/current")"
echo second > "$fixture/dist/index.html"
rm "$fixture/dist/assets/first.js"
echo new-chunk > "$fixture/dist/assets/second.js"
bash "$fixture/scripts/publish-static.sh"
[[ -L "$site/current" && "$(cat "$site/current/index.html")" == second ]]
[[ "$(readlink "$site/current")" != "$previous" ]]
[[ -s "$site/$previous/index.html" && -s "$site/assets/first.js" && -s "$site/assets/second.js" ]]

rm "$fixture/dist/index.html"
if bash "$fixture/scripts/publish-static.sh"; then
  echo "An incomplete build was incorrectly published." >&2; exit 1
fi
[[ "$(cat "$site/current/index.html")" == second ]]
if bash "$fixture/scripts/install-nginx.sh" 'https://invalid.example/path'; then
  echo "An invalid hostname was accepted." >&2; exit 1
fi

if FAIL_SECOND_CHECK=1 bash "$fixture/scripts/install-nginx.sh" zim.joshuaphilip.com; then
  echo "A failing shared Nginx validation was accepted." >&2; exit 1
fi
[[ ! -e "$SITE_SANDBOX/etc/nginx/sites-available/zim-squad" ]]
[[ ! -L "$SITE_SANDBOX/etc/nginx/sites-enabled/zim-squad" && ! -e "$SITE_SANDBOX/reloads" ]]

bash "$fixture/scripts/install-nginx.sh" zim.joshuaphilip.com
grep -q 'server_name zim.joshuaphilip.com;' "$SITE_SANDBOX/etc/nginx/sites-available/zim-squad"
echo '# existing TLS settings' >> "$SITE_SANDBOX/etc/nginx/sites-available/zim-squad"
if bash "$fixture/scripts/install-nginx.sh" zim.joshuaphilip.com; then
  echo "An existing site was incorrectly overwritten." >&2; exit 1
fi
grep -q '# existing TLS settings' "$SITE_SANDBOX/etc/nginx/sites-available/zim-squad"
[[ "$(wc -l < "$SITE_SANDBOX/reloads")" == 1 ]]
echo "Deployment checks passed: release switch, retained assets, incomplete-build guard, hostname validation, failed Nginx rollback and existing TLS preservation."
