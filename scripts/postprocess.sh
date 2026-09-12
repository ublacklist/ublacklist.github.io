#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
public="${1:-$root/public}"

find "$public" \( -name '*.html' -o -name '*.xml' \) -type f -print0 | xargs -0 sed -i -E \
  -e 's#((href|content|src)="|<loc>)(https://ublacklist\.github\.io)?(/[^"<>?\#]*/)?index\.html#\1\3\4#g' \
  -e 's#((href|content|src)="|<loc>|<title>)(https://ublacklist\.github\.io)?(/[^"<>?\#]*)\.html([" \#?<])#\1\3\4\5#g'

for tag in $(yq 'keys | .[]' "$root/languages.yml"); do
  lower="${tag,,}"
  if [[ "$lower" != "$tag" ]]; then
    rm -rf "${public:?}/$tag"
    mv "$public/$lower" "$public/$tag"
    find "$public" \( -name '*.html' -o -name '*.xml' \) -type f -print0 | xargs -0 sed -i -E \
      -e "s#([\"=>]|https://ublacklist\\.github\\.io)/$lower/#\\1/$tag/#g" \
      -e "s#lang=\"$lower\"#lang=\"$tag\"#g"
  fi
done
