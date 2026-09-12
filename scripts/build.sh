#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"

hugo --source "$root" --cleanDestinationDir
"$root/scripts/postprocess.sh"
