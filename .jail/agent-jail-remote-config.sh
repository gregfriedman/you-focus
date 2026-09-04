#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/config.sh"

PORT=$(limactl ls --format '{{.SSHLocalPort}}' $VM_NAME)
USER_NAME=$(whoami)
HOST="127.0.0.1"

echo "Webstorm > File > Remote Development... > SSH > New Project"
echo "Username: $USER_NAME"
echo "Host: $HOST"
echo "Port: $PORT"
echo "Specify private key: ~/.lima/_config/user"
echo "IDE version: <choose latest>"
echo "Project directory: $PROJECT_DIR"
echo "Then open Plugins and install Claude Code on backend"
echo "Then open terminal and run 'claude' and then 'ide'"

# open "jetbrains-gateway://connect#host=127.0.0.1&port=$PORT&user=$USER_NAME&type=ssh&projectPath=$PROJECT_DIR"
