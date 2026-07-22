#!/usr/bin/env bash
set -euo pipefail
PUBKEY_FILE="${1:?pubkey file required}"
BASE_DOMAIN="${2:-9expert.online}"
user=trainer
docroot=/var/www/trainer
pubkey="$(tr -d '\r' < "${PUBKEY_FILE}" | sed '/^$/d' | head -n1)"

if ! id -u "${user}" >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash "${user}"
fi

install -d -m 700 -o "${user}" -g "${user}" "/home/${user}/.ssh"
printf '%s\n' "${pubkey}" > "/home/${user}/.ssh/authorized_keys"
chown "${user}:${user}" "/home/${user}/.ssh/authorized_keys"
chmod 600 "/home/${user}/.ssh/authorized_keys"

mkdir -p "${docroot}"
chown -R "${user}:${user}" "${docroot}"
chmod 755 "${docroot}"

cat > /etc/nginx/sites-available/trainer.conf <<NGX
server {
    listen 80;
    listen [::]:80;
    server_name ${user}.${BASE_DOMAIN};
    root ${docroot};
    index index.html;

    location = / {
        return 302 /frontend/;
    }

    location / {
        try_files \$uri \$uri/ =404;
    }
}
NGX

ln -sfn /etc/nginx/sites-available/trainer.conf /etc/nginx/sites-enabled/trainer.conf
nginx -t
systemctl reload nginx
echo TRAINER_OK
echo "URL: http://${user}.${BASE_DOMAIN}/ (redirects to /frontend/)"
