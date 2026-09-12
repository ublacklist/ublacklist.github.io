# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

Hugo-based website (Hextra theme) for the uBlacklist browser extension.

## Development Commands

Requirements: Linux with GNU coreutils/sed and bash >= 4 (the scripts are not portable to macOS), Hugo (extended) >= 0.158, `yq`, and the Hextra theme submodule (`git submodule update --init`).

```shell
# Start local dev server (links carry ".html" here; the production build strips them)
hugo server

# Production build into public/ (Hugo followed by scripts/postprocess.sh)
scripts/build.sh

# Regenerate config/_default/languages.yaml, config/_default/module.yaml, and crowdin.yml from languages.yml
scripts/generate.sh
```

## URLs

Every existing URL must keep working without redirects. Pages are emitted as `.html` files (`uglyURLs`) so that GitHub Pages serves extensionless paths, and `scripts/postprocess.sh` strips `.html` from generated links and renames the `pt-BR` directory (Hugo lowercases language keys). Do not change page URLs or the output layout.

## Translations

English is the source of truth: `content/en/**/*.md` and `i18n/en.yaml`. Other locales are downloaded from Crowdin at deploy time into `content/<tag>/` and `i18n/<tag>.yaml`, which are git-ignored — do not add or edit them. Pages missing in a locale fall back to English via the mounts in `config/_default/module.yaml`.

## Languages

`languages.yml` is the source for supported locales. After editing it, run `scripts/generate.sh`; the generated files are committed and checked in CI.

## Community Rulesets

`data/rulesets.yml` is the source. The Community Rulesets page is rendered from it directly by `layouts/_shortcodes/rulesets.html`; category names are translated via `category-<slug>` keys in `i18n/en.yaml`.
