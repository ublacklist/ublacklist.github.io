#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
public="${1:-$root/public}"

sed=sed
if [[ "$(uname -s)" == Darwin ]]; then
  sed=gsed
fi

# Strip ".html" from internal URLs in href/content/src attributes, meta refresh,
# <loc>, and <title> (alias pages). "/dir/index.html" becomes "/dir/", and
# "/foo.html" or "../foo.html" becomes "/foo" or "../foo", keeping any "?query"
# or "#fragment".
find "$public" \( -name '*.html' -o -name '*.xml' \) -type f -print0 | xargs -0 "$sed" -i -E \
  -e 's#((href|content|src)="|content="0; url=|<loc>)(https://ublacklist\.github\.io)?/([^"<>?\#]*/)?index\.html#\1\3/\4#g' \
  -e 's#((href|content|src)="|content="0; url=|<loc>|<title>)(https://ublacklist\.github\.io)?([/.][^"<>?\#]*)\.html([" \#?<])#\1\3\4\5#g'

# Hugo lowercases language tags in paths (pt-BR -> pt-br). Rename the directory
# back and rewrite paths starting with it and the <html lang> attribute.
for tag in $(yq 'keys | .[]' "$root/languages.yml"); do
  lower="${tag,,}"
  if [[ "$lower" != "$tag" ]]; then
    rm -rf "${public:?}/$tag"
    mv "$public/$lower" "$public/$tag"
    find "$public" \( -name '*.html' -o -name '*.xml' \) -type f -print0 | xargs -0 "$sed" -i -E \
      -e "s#([\"=>]|https://ublacklist\\.github\\.io)/$lower/#\\1/$tag/#g" \
      -e "s#lang=\"$lower\"#lang=\"$tag\"#g"
  fi
done
