# AGENTS.md

Hugo site (Hextra theme as a git submodule) for the uBlacklist browser extension. Build with `scripts/build.sh` on Linux (GNU sed, bash >= 4, Hugo extended, `yq`).

## Rules

- Every existing URL must keep working. Do not change page URLs or the output layout (`.html` files, `pt-BR` directory).
- Translations live on Crowdin. Do not add or edit `content/<tag>/` or `i18n/<tag>.yaml` for languages other than English.
