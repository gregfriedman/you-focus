#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/config.sh"

# Start a VM with Claude in jail that mounts only this project folder
limactl start \
  --name=$VM_NAME \
  --mount-only "$PROJECT_DIR:w" \
  --mount-inotify \
  template:ubuntu-lts

limactl shell $VM_NAME bash -s <<'EOF'
# install Claude using apt so we get:
#   1) GPG signature verification
#   2) builds a week behind latest to avoid zero days
#   3) no auto-update
# (see https://code.claude.com/docs/en/setup#install-with-linux-package-managers)
# Leo is cool
sudo install -d -m 0755 /etc/apt/keyrings
sudo curl -fsSL https://downloads.claude.ai/keys/claude-code.asc \
  -o /etc/apt/keyrings/claude-code.asc

# This is the GPG fingerprint published on the page https://code.claude.com/docs/en/setup#install-with-linux-package-managers
EXPECTED="31DDDE24DDFAB679F42D7BD2BAA929FF1A7ECACE"
# Split lines, return the one line that starts fpr:, then return the value in the 10th column
#  which is the actual fingerprint
ACTUAL=$(gpg --show-keys --with-colons /etc/apt/keyrings/claude-code.asc \
         | awk -F: '/^fpr:/ {print $10; exit}')
# Bail if the fingerprint doesn't match what we downloaded
[ "$ACTUAL" = "$EXPECTED" ] || { echo "Claude key fingerprint mismatch: $ACTUAL" >&2; exit 1; }

# Fingerprint matches so we can continue to follow the steps described in the Anthropic URL
#  to install using apt
echo "deb [signed-by=/etc/apt/keyrings/claude-code.asc] https://downloads.claude.ai/claude-code/apt/stable stable main" \
  | sudo tee /etc/apt/sources.list.d/claude-code.list
sudo apt update
sudo apt install claude-code

# Claude should not be allowed to reconfigure its own permissions so we force only managed permissions
#  in a location that will be inaccessible to Claude after we disable passwordless sudo
sudo mkdir -p /etc/claude-code
sudo tee /etc/claude-code/managed-settings.json <<'EOF_SETTINGS'
{
  "permissions": {
    "allowManagedPermissionRulesOnly": true,
    "allowManagedMcpServersOnly": true
  }
}
EOF_SETTINGS

# delete the file that grants passwordless sudo to the VM user
sudo rm /etc/sudoers.d/90-cloud-init-users
# test to see if passwordless sudo was actually disabled
sudo -n true 2>/dev/null && { echo "FAIL: sudo still works"; exit 1; } || echo "OK: sudo revoked"

# update Claude config to think that onboarding is complete so that it uses the
# oauth token that gets added in the next step
tee "$HOME/.claude.json" <<'EOF_JSON'
{
  "hasCompletedOnboarding": true
}
EOF_JSON
EOF

limactl shell $VM_NAME bash -lc "claude auth login"

# run the script that prints the remote dev configuration
./agent-jail-remote-config.sh