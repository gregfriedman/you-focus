#!/usr/bin/env bash

source "$(dirname "${BASH_SOURCE[0]}")/config.sh"

limactl stop $VM_NAME
limactl remove $VM_NAME