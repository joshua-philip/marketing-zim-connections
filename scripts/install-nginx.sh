#!/usr/bin/env bash
# Install one new named vhost. Never overwrite a deployed config or its TLS setup.
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
domain="${1:-}"
domain="${domain,,}"
destination="/etc/nginx/sites-available/zim-squad"
enabled="/etc/nginx/sites-enabled/zim-squad"

if [[ ${#domain} -gt 253 || ! "$domain" =~ ^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]([a-z0-9-]{0,61}[a-z0-9])?$ ]]; then
  echo "Usage: pnpm deploy:nginx your.hostname.example (hostname only, no URL or path)" >&2
  exit 1
fi
for target in "$destination" "$enabled"; do
  if sudo test -e "$target" || sudo test -L "$target"; then
    echo "$target already exists. Content updates only need pnpm deploy:static." >&2
    echo "Review server configuration changes manually to preserve existing TLS settings." >&2
    exit 1
  fi
done
if ! sudo test -s /var/www/zim-squad/current/index.html; then
  echo "Publish the production build with pnpm deploy:static before installing the vhost." >&2
  exit 1
fi

# Check the shared configuration before introducing this site.
sudo nginx -t
generated="$(mktemp)"
trap 'rm -f "$generated"' EXIT
sed "s/__DOMAIN__/$domain/g" "$repo_dir/deploy/nginx-zim-squad.conf.template" > "$generated"
sudo install -m 0644 "$generated" "$destination"
sudo ln -s "$destination" "$enabled"
if ! sudo nginx -t; then
  sudo rm -f "$enabled" "$destination"
  echo "Nginx validation failed; the newly installed site was removed. Nginx was not reloaded." >&2
  exit 1
fi
sudo systemctl reload nginx
echo "HTTP site installed for $domain. Configure DNS, then add HTTPS with Certbot."
