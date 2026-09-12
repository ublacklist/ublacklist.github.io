# AGENTS.md

Hugo site (Hextra theme as a git submodule) for the uBlacklist browser extension. Requires bash >= 4, GNU sed (`gsed` from Homebrew on macOS), Hugo extended, and `yq`.

```shell
hugo server         # local preview (dev server needs ".html" in typed URLs)
scripts/build.sh    # production build into public/
scripts/generate.sh # regenerate the files derived from languages.yml
```

## Rules

- Every existing URL must keep working. Do not change page URLs or the output layout (`.html` files, `pt-BR` directory).
- Translations live on Crowdin. Do not add or edit `content/<tag>/` or `i18n/<tag>.json` for languages other than English.
