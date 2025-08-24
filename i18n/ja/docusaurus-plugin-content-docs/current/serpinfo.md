---
title: SERPINFO
sidebar_position: 3
---

:::note

SERPINFO は Chrome および Firefox 向けに v8.11.0 で実験的機能として導入され、v9 以降デフォルトで有効化されています。

:::

SERPINFO は、検索エンジン結果ページ (SERP) を YAML 定義ファイルを使用して定義および解析するためのシステムです。これにより、さまざまな検索エンジンの検索結果から構造化された情報を抽出できます。

## ファイル形式 {#file-format}

SERPINFO ファイルは以下の構造を持つ YAML 形式を使用します:

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

## トップレベルプロパティ {#top-level-properties}

| 必須 | プロパティ     | 型     | 説明                       |
| :--: | -------------- | ------ | -------------------------- |
|  ✓   | `name`         | string | SERPINFO の名前            |
|  ✓   | `pages`        | array  | ページ定義の配列           |
|      | `version`      | string | SERPINFO のバージョン      |
|      | `description`  | string | SERPINFO の説明            |
|      | `homepage`     | string | SERPINFO のホームページURL |
|      | `lastModified` | string | ISO 形式での最終更新日時   |

## ページ定義 {#page-definition}

`pages` 配列内の各項目は、特定の種類の検索結果ページ (Web、画像、ニュースなど) を表します:

| 必須 | プロパティ       | 型                | 説明                                                            |
| :--: | ---------------- | ----------------- | --------------------------------------------------------------- |
|  ✓   | `name`           | string            | ページ定義の名前                                                |
|  ✓   | `matches`        | array             | ページを含めるためのマッチパターンの配列                        |
|  ✓   | `results`        | array             | 検索結果定義の配列                                              |
|      | `excludeMatches` | array             | ページを除外するためのマッチパターンの配列                      |
|      | `includeRegex`   | string            | ページを含めるための正規表現パターン                            |
|      | `excludeRegex`   | string            | ページを除外するための正規表現パターン                          |
|      | `userAgent`      | string            | "any"、"desktop"、または "mobile" を指定可能                    |
|      | `commonProps`    | object            | このページのすべての結果に適用される共通プロパティ              |
|      | `delay`          | number or boolean | ページ読み込み後の遅延時間 (ミリ秒) または遅延の有効/無効を指定 |

## 検索結果定義 {#result-definition}

`results` 配列内の各項目は、単一の検索結果からデータを抽出する方法を定義します:

| 必須 | プロパティ      | 型              | 説明                                                                         |
| :--: | --------------- | --------------- | ---------------------------------------------------------------------------- |
|  ✓   | `root`          | string or array | 検索結果要素を見つけるためのルートコマンド                                   |
|  ✓   | `url`           | string or array | 検索結果から URL を抽出するためのプロパティコマンド                          |
|      | `name`          | string          | 検索結果定義の名前                                                           |
|      | `props`         | object          | 抽出するプロパティ名とプロパティコマンドのキーと値のペア                     |
|      | `button`        | array           | 検索結果にブロックボタンを追加するためのボタンコマンド                       |
|      | `preserveSpace` | boolean         | ブロックされた検索結果のレイアウトスペースを保持し、レイアウトのシフトを防ぐ |

## コマンド {#commands}

SERPINFO は複雑なシナリオに対応するため、以下の 3 つのカテゴリに分類されたコマンドをサポートします:

### ルートコマンド {#root-commands}

- `<css-selector>` または `[selector, <css-selector>]`: CSS セレクターに一致する要素を検索
- `[upward, <level>, <root-command>]`: ルートコマンドで見つかった各要素から DOM ツリーを `<level>` ステップ上に移動

### 要素コマンド {#element-commands}

- `<css-selector>` または `[selector, <css-selector>, <element-command>?]`: CSS セレクターで要素を取得
- `[upward, <level>, <element-command>?]`: DOM ツリーを `<level>` ステップ上に移動

注意: `<element-command>` が省略された場合、現在のルート要素が暗黙的に使用されます。

### プロパティコマンド {#property-commands}

- `<css-selector>`: CSS セレクターに一致する要素の `textContent` プロパティ (デフォルト) または `href` 属性 (URL 抽出時) を取得
- `[attribute, <name>, <element-command>?]`: 属性値を取得
- `[property, <name>, <element-command>?]`: プロパティ値を取得
- `[const, <value>]`: 定数文字列を返す
- `[domainToURL, <property-command>]`: ドメインを URL に変換
- `[regexInclude, <pattern>, <property-command>]`: 正規表現に一致する場合のみ含める
- `[regexExclude, <pattern>, <property-command>]`: 正規表現に一致する場合は除外
- `[regexSubstitute, <pattern>, <replacement>, <property-command>]`: 正規表現で置換
- `[or, [<property-command>*], <element-command>?]`: 複数のコマンドを順番に試す

注意: `<element-command>` が省略された場合、現在のルート要素が暗黙的に使用されます。

### ボタンコマンド {#button-commands}

- `[inset, <options>?, <element-command>?]`: 要素内の特定の位置にボタンを追加。オプションには以下が含まれます:
  - `top`: CSS の長さまたは割合
  - `right`: CSS の長さまたは割合
  - `bottom`: CSS の長さまたは割合
  - `left`: CSS の長さまたは割合
  - `zIndex`: z-index 値 (デフォルト: 1)

注意: `<element-command>` が省略された場合、現在のルート要素が使用されます。

## 例 {#example}

以下は Bing 画像検索の例です:

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

## 購読 {#subscription}

### SERPINFO の公開 {#publishing-your-serpinfo}

SERPINFO ファイルをホストし、購読リンクを提供することで、SERPINFO を他のユーザーと共有できます。

1. 上記の形式に従って SERPINFO ファイルを作成
2. ファイルを GitHub や自身のウェブサイトなどで公開
3. 以下の形式で購読リンクを共有:

```
https://ublacklist.github.io/serpinfo/subscribe?url=<url-encoded-url>
```

`<url-encoded-url>` は、公開された SERPINFO ファイルの URL を [URLエンコード](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) したものです。

### SERPINFO の購読 {#subscribing-to-serpinfo}

SERPINFO を購読するには:

1. 提供された購読リンクをクリック
2. 拡張機能がオプションページを開き、購読の追加を促します
3. 確認して拡張機能にSERPINFOを追加

:::note

購読リンクを使用するには、手動で有効化する必要があります。拡張機能のオプションページに移動し、「SERPINFO 購読リンクを有効にする」をオンにしてください。

:::

:::note

購読リンクは現在 Safari では動作しません。

:::
