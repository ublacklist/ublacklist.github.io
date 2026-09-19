# uBlacklist Website

This repository hosts the website of [uBlacklist](https://github.com/iorate/ublacklist).

## Development

The site is built with [Hugo](https://gohugo.io/) (extended) and the [Hextra](https://imfing.github.io/hextra/) theme, which is included as a git submodule. Clone with `--recurse-submodules` or run `git submodule update --init`.

The scripts require bash >= 4, GNU sed (`gsed` from Homebrew on macOS), and [yq](https://github.com/mikefarah/yq).

```shell
hugo server         # local preview (the dev server needs ".html" in typed URLs)
scripts/build.sh    # production build into public/
scripts/generate.sh # regenerate the files derived from languages.yml
```

## Contribution

For bug reports, questions, or suggestions, please visit [uBlacklist Discussions](https://github.com/iorate/ublacklist/discussions). See the [contribution guidelines](https://github.com/iorate/ublacklist/blob/master/CONTRIBUTING.md) for details.

### New Ruleset

To list your ruleset on the [Community Rulesets](https://ublacklist.github.io/rulesets) page, please open a [Website: New Ruleset](https://github.com/iorate/ublacklist/discussions/new?category=website-new-ruleset) discussion.

> [!NOTE]
> Whether and when a ruleset is listed is entirely at the maintainer's discretion, and listed entries may be edited or removed at any time without notice.

### Translation

Please use [Crowdin](https://crowdin.com/project/ublacklist) for all translations.

To add the website in a new language:

1. If your language is not listed on Crowdin, request it there using the "Request New Language" button.
2. Translate at least 60% of the website strings on Crowdin.
3. Open a [Website](https://github.com/iorate/ublacklist/discussions/new?category=website) discussion to request that the new language be enabled on the website.
