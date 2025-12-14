---
title: SERPINFO
sidebar_position: 3
---

:::note

SERPINFO was introduced in v8.11.0 for Chrome and Firefox as an experimental feature and has been enabled by default starting from v9.

:::

SERPINFO is a system for defining and parsing search engine results pages (SERPs) using YAML definition files. It allows for extracting structured information from search results across various search engines.

## File Format {#file-format}

SERPINFO files use YAML format with the following structure:

```yaml
name: SearchEngineName
version: 1.0.0
homepage: https://example.com/
lastModified: 2023-09-01T00:00:00Z

pages:
  - name: PageType
    matches:
      - https://search.example.com/search?*
    results:
      - root: .result-selector
        url: a.link
        props:
          title: .title
    commonProps:
      $site: example
      $category: web
```

## Top-Level Properties {#top-level-properties}

| Required | Property       | Type   | Description                          |
| :------: | -------------- | ------ | ------------------------------------ |
|    ✓     | `name`         | string | Name of the SERPINFO                 |
|    ✓     | `pages`        | array  | Array of page definitions            |
|          | `version`      | string | Version of the SERPINFO              |
|          | `description`  | string | Description of the SERPINFO          |
|          | `homepage`     | string | Homepage URL of the SERPINFO         |
|          | `lastModified` | string | Last modification time in ISO format |

## Page Definition {#page-definition}

Each item in the `pages` array represents a specific type of search result page (Web, Images, News, etc.):

| Required | Property         | Type              | Description                                                               |
| :------: | ---------------- | ----------------- | ------------------------------------------------------------------------- |
|    ✓     | `name`           | string            | Name of the page definition                                               |
|    ✓     | `matches`        | array             | Array of match patterns to include pages                                  |
|    ✓     | `results`        | array             | Array of result definitions                                               |
|          | `excludeMatches` | array             | Array of match patterns to exclude pages                                  |
|          | `includeRegex`   | string            | Regular expression pattern to include pages                               |
|          | `excludeRegex`   | string            | Regular expression pattern to exclude pages                               |
|          | `userAgent`      | string            | Can be "any", "desktop", or "mobile"                                      |
|          | `commonProps`    | object            | Common properties applied to all results on this page                     |
|          | `delay`          | number or boolean | Delay in milliseconds after page load, or boolean to enable/disable delay |

## Result Definition {#result-definition}

Each item in the `results` array defines how to extract data from a single search result:

| Required | Property        | Type            | Description                                                                                   |
| :------: | --------------- | --------------- | --------------------------------------------------------------------------------------------- |
|    ✓     | `root`          | string or array | Root command to locate result elements                                                        |
|    ✓     | `url`           | string or array | Property command to extract the URL from the result                                           |
|          | `name`          | string          | Name of the result definition                                                                 |
|          | `props`         | object          | Key-value pairs where keys are property names and values are property commands for extraction |
|          | `button`        | array           | Button command to add block buttons to results                                                |
|          | `preserveSpace` | boolean         | Determines whether to retain the layout space of blocked results, preventing layout shifts    |

## Commands {#commands}

SERPINFO supports various commands for complex extraction scenarios, organized into three categories:

### Root Commands {#root-commands}

- `<css-selector>` or `[selector, <css-selector>]`: Find elements matching the CSS selector
- `[upward, <level>, <root-command>]`: Navigate up the DOM tree by `<level>` steps from each element found by the root command

### Element Commands {#element-commands}

- `<css-selector>` or `[selector, <css-selector>, <element-command>?]`: Get element by CSS selector
- `[upward, <level>, <element-command>?]`: Navigate up in the DOM tree by `<level>` steps

Note: When `<element-command>` is omitted in any of the above commands, the current root element is implicitly used.

### Property Commands {#property-commands}

- `<css-selector>`: Get element's `textContent` property (default) or `href` attribute (when used in URL extraction) from element matching the CSS selector
- `[attribute, <name>, <element-command>?]`: Get attribute value
- `[property, <name>, <element-command>?]`: Get property value
- `[const, <value>]`: Return a constant string
- `[domainToURL, <property-command>]`: Convert a domain to a URL
- `[regexInclude, <pattern>, <property-command>]`: Include only if matches regex
- `[regexExclude, <pattern>, <property-command>]`: Exclude if matches regex
- `[regexSubstitute, <pattern>, <replacement>, <property-command>]`: Replace with regex
- `[or, [<property-command>*], <element-command>?]`: Try multiple commands in sequence

Note: When `<element-command>` is omitted in any of the above commands, the current root element is implicitly used.

### Button Commands {#button-commands}

- `[inset, <options>?, <element-command>?]`: Add a button to a specific position within the element. Options include:
  - `top`: CSS length or percentage
  - `right`: CSS length or percentage
  - `bottom`: CSS length or percentage
  - `left`: CSS length or percentage
  - `zIndex`: z-index value (default: 1)

Note: When `<element-command>` is omitted, the current root element is used.

## Example {#example}

Here's an example for Bing Image Search:

```yaml
name: Bing
version: 0.1.0
homepage: https://github.com/ublacklist/builtin#readme
license: MIT
lastModified: 2023-04-05T11:11:20Z

pages:
  - name: Images (desktop)
    matches:
      - https://www.bing.com/images/search?*
    userAgent: desktop
    results:
      - root: [upward, 1, ".iuscp"]
        url:
          - regexSubstitute
          - '"purl":"([^"]+)'
          - "\\1"
          - [attribute, "m", ".iusc"]
        props:
          title: [attribute, "title", "li > a"]
        button: [inset, { top: "32px", right: 0 }, ".iuscp"]
    commonProps:
      $site: bing
      $category: images
```

## Subscription {#subscription}

### Publishing Your SERPINFO {#publishing-your-serpinfo}

You can share your SERPINFO definitions with others by hosting your YAML file and providing a subscription link.

1. Create your SERPINFO YAML file following the format described above
2. Host the file at a publicly accessible URL (e.g., GitHub, your own website)
3. Share the subscription link with users using this format:

```
https://ublacklist.github.io/serpinfo/subscribe?url=<url-encoded-url>
```

Where `<url-encoded-url>` is your hosted YAML file's URL encoded with [URL encoding](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).

### Subscribing to SERPINFO {#subscribing-to-serpinfo}

To subscribe to a SERPINFO definition:

1. Click on a subscription link provided by the publisher
2. The extension will open its options page and prompt you to add the subscription
3. Confirm to add the SERPINFO to your extension

:::note

To use subscription links, you need to enable them manually. Go to the extension's options page and turn on "Enable SERPINFO subscription links".

:::
