SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_DIR=$(cd "$SCRIPT_DIR/.." && pwd)
PROJECT_NAME=$(basename "$PROJECT_DIR")

# Sanitize directory name to valid lima vm characters
# e.g. /MY.Project-important! => /myproject-important
VM_NAME="agent-jail-$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | tr -cd 'a-z0-9-')"

echo "SCRIPT_DIR=$SCRIPT_DIR"
echo "PROJECT_DIR=$PROJECT_DIR"
echo "PROJECT_NAME=$PROJECT_NAME"
echo "VM_NAME=$VM_NAME"
