# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

Docusaurus-based website for the uBlacklist browser extension.

## Development Commands

```shell
# Install dependencies (pnpm >= 10 required)
pnpm install

# Run all checks (biome, prettier, typescript)
pnpm check

# Fix linting/formatting issues
pnpm fix

# Start local dev server
pnpm start
```

## Translations

English is the source of truth; other locales are managed via Crowdin — do not edit them directly. This applies to all Markdown/MDX files as well as `i18n/en/**/*.json`. Edit only the English originals.

## Community Rulesets

`community/rulesets.yml` is the source. Run `pnpm generate` to regenerate `community/rulesets.generated.ts` after edits — do not edit the generated file directly.
