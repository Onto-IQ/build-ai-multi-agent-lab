#!/usr/bin/env bash
# Provision learner01–learner07 on Hostinger classroom VPS (run as root AFTER SSH works).
# Usage:
#   ./hostinger-provision-learners.sh [BASE_DOMAIN] [PUBKEYS_DIR]
# Defaults:
#   BASE_DOMAIN=9expert.online
#   PUBKEYS_DIR=./pubkeys   (expects learner01.pub … learner07.pub)

set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "ERROR: run as root on the VPS (after SSH works). Do not run on learner laptops." >&2
  exit 1
fi

BASE_DOMAIN="${1:-9expert.online}"
PUBKEYS_DIR="${2:-./pubkeys}"
WWW_ROOT="/var/www"
NGINX_AVAIL="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"

if [[ ! -d "${PUBKEYS_DIR}" ]]; then
  echo "ERROR: pubkeys dir not found: ${PUBKEYS_DIR}" >&2
  echo "Create ${PUBKEYS_DIR}/learner01.pub … learner07.pub (one public key line each)." >&2
  exit 1
fi

if ! command -v nginx >/dev/null 2>&1; then
  echo "ERROR: nginx not found. Install nginx on this VPS before provisioning." >&2
  exit 1
fi

mkdir -p "${NGINX_AVAIL}" "${NGINX_ENABLED}"

for i in 01 02 03 04 05 06 07; do
  user="learner${i}"
  pubfile="${PUBKEYS_DIR}/${user}.pub"
  docroot="${WWW_ROOT}/${user}"
  site_name="${user}.${BASE_DOMAIN}"
  conf_path="${NGINX_AVAIL}/${user}.conf"

  if [[ ! -f "${pubfile}" ]]; then
    echo "ERROR: missing ${pubfile}" >&2
    exit 1
  fi

  if ! id -u "${user}" >/dev/null 2>&1; then
    useradd --create-home --shell /bin/bash "${user}"
    echo "created user ${user}"
  else
    echo "user ${user} already exists — updating keys/docroot/nginx"
  fi

  install -d -m 700 -o "${user}" -g "${user}" "/home/${user}/.ssh"
  # Public keys only — never write private keys here
  install -m 600 -o "${user}" -g "${user}" /dev/null "/home/${user}/.ssh/authorized_keys"
  # Strip CR and blank lines from Windows-copied .pub files
  tr -d '\r' < "${pubfile}" | sed '/^$/d' > "/home/${user}/.ssh/authorized_keys"
  chown "${user}:${user}" "/home/${user}/.ssh/authorized_keys"
  chmod 600 "/home/${user}/.ssh/authorized_keys"

  mkdir -p "${docroot}"
  chown -R "${user}:${user}" "${docroot}"
  chmod 755 "${docroot}"

  cat > "${conf_path}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${site_name};

    root ${docroot};
    index index.html;

    location = / {
        return 302 /frontend/;
    }

    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF

  ln -sfn "${conf_path}" "${NGINX_ENABLED}/${user}.conf"
  echo "configured ${site_name} -> ${docroot}"
done

nginx -t
systemctl reload nginx

echo
echo "Provision complete."
echo "BASE_DOMAIN=${BASE_DOMAIN}"
echo "Example URL: http://learner01.${BASE_DOMAIN}/ (redirects to /frontend/)"
echo "Learners SSH: ssh learner01@${BASE_DOMAIN}"
echo "Do NOT share root with learners."
