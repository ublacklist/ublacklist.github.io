---
title: 高度な使い方
sidebar_position: 2
---

## ルール {#rules}

オプションページや「このサイトをブロックする」ダイアログでルールを編集できます。

![ルールエディター](/img/advanced-features/rules.png)

ルールは[マッチパターン](#match-patterns)または[式](#expressions)を使って記述できます。

### マッチパターン {#match-patterns}

マッチパターンはワイルドカードを含む URL のようなものです。詳細は [MDN web docs](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/Match_patterns) を参照してください。

**有効な**マッチパターンの例:

| パターン                                                                                      | マッチする例                                                    |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `*://example.com/*`<br /><br />(`example.com` 上の URL)                                       | `http://example.com/`<br /><br />`https://example.com/hoge`     |
| `*://*.example.net/*`<br /><br />(`example.net` またはそのサブドメイン上の URL)               | `http://example.net/`<br /><br />`https://foo.example.net/hoge` |
| `*://example.org/hoge/*`<br /><br />(`example.org` 上の URL で、パスが `/hoge/` で始まるもの) | `http://example.org/hoge/fuga.html`                             |

**無効な**マッチパターンの例:

| 無効なパターン         | 理由                             |
| ---------------------- | -------------------------------- |
| `*://www.qinterest.*/` | `*` が先頭以外に置かれています。 |

### 式 {#expressions}

式を使ってルールを書くことができます。

#### 変数 {#variables}

現在、`url` と `title` が使用できます。

```
# URL に "example" を含む検索結果
url *= "example"

# タイトルが "Something" で始まる検索結果
title ^= "Something"
```

URL の一部である `scheme`、`host`、`path` も使用できます。

```
# スキームが HTTP の検索結果
scheme="http"

# ホスト名が ".example.com" で終わる検索結果
host $= ".example.com"

# パスが "blah" を含む検索結果 (大文字小文字を区別しない)
path*="blah"i
```

さらに、検索結果ページ自体のプロパティ `$site` と `$category` が使用できます。

```
# Google 検索で YouTube をブロックする
$site="google" & host="youtube.com"

# 画像検索で Amazon.com をブロックする
$category = "images" & host = "www.amazon.com"
```

#### 文字列マッチ {#string-matchers}

文字列マッチは [CSS の属性セレクター](https://developer.mozilla.org/ja/docs/Web/CSS/Attribute_selectors) に似ています。

```
# タイトルが "Example Domain" と一致
title = "Example Domain"

# タイトルが "Example" で始まる
title ^= "Example"

# タイトルが "Domain" で終わる
title $= "Domain"

# タイトルが "ple Dom" を含む
title *= "ple Dom"
```

大文字小文字を区別しない比較を行うには、`i` を追加します。

```
# タイトルが "domain" で終わる (大文字小文字を区別しない)
title $= "domain" i
```

#### 正規表現 {#regular-expressions}

[正規表現](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions)を使って柔軟に式を書くことができます。

```
# URL に "example.net" または "example.org" を含む
url =~ /example\.(net|org)/

# "=~" は省略可能
url/example\.(net|org)/

# "url" も省略可能
/example\.(net|org)/

# タイトルが "example domain" を含む (大文字小文字を区別しない)
title =~ /example domain/i
```

正規表現は JavaScript の正規表現リテラル (`/example\.(net|org)/`) の形で記述する必要があります。

**有効な**正規表現の例:

| 正規表現                                                                           | マッチする例                                                            |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `/^https:\/\/www\.qinterest\./`<br /><br />(`https://www.qinterest.` で始まる URL) | `https://www.qinterest.com/`<br /><br />`https://www.qinterest.jp/hoge` |
| `/^https?:\/\/([^/.]+\.)*?xn--/`<br /><br />(国際化ドメイン名を含む URL)           | `http://例.テスト/`                                                     |

**無効な**正規表現の例:

| 無効な正規表現               | 理由                                          |
| ---------------------------- | --------------------------------------------- |
| `^https?:\/\/example\.com\/` | `/` で囲まれていません。                      |
| `/^https?://example\.com//`  | 正規表現内の `/` がエスケープされていません。 |

#### 論理演算子 {#logical-operators}

論理否定 (`!`)、論理積 (`&`)、論理和 (`|`) が使用できます。

```
# HTTPS 以外のスキームをブロック
!scheme="https"

# 画像検索で Amazon.com をブロック
$category = "images" & host = "www.amazon.com"

# タイトルが "example" または "domain" を含む (大文字小文字を区別しない)
title *= "example" i | title *= "domain" i
```

### マッチパターンと式の併用 {#use-expressions-with-match-patterns}

マッチパターンの後に `@if(式)` を続けることができます。

```
# 画像検索で Amazon.com をブロックする
*://*.amazon.com/* @if($category="images")
```

### ブロック解除ルール {#unblock-rules}

マッチパターンまたは正規表現の前に `@` をつけると、そのサイトをブロックしないという意味になります。

これは[購読](#subscription)したルールセットによるブロックを解除するのに便利です。例えば、もし `http://example.com/` が購読中のルールセットによりブロックされていれば、ルール `@*://example.com/*` でそれを解除することができます。

### ハイライトルール {#highlighting-rules}

マッチパターンまたは正規表現の前に `@N` (N=1,2,3,...) をつけると、そのサイトをハイライトするという意味になります。

例えば、`@1*://example.com/*` で example.com をハイライトすることができます。

![example.com をハイライトする](/img/advanced-features/highlight.png)

デフォルトでは、`@1` (青) のみが使用できます。色を変更または追加するには、オプションページの「外観」セクションを参照してください。

### コメント {#comments}

コメントは `#` で始まります。ルールとして解釈できない行は全て実質的にコメントですが、 `#` で始まるコメントには 2 つの利点があります。

1. `#` で始まるコメントは、将来新しいシンタックスが追加されても、コメントであることが保証されます。
2. `#` で始まるコメントは、ルールの後に置くことができます。

```
# example.com またはそのサブドメイン上のサイトをブロックする
*://*.example.com/*

/example\.(net|org)/ # example.net または example.org を URL に含むサイトをブロックする
```

## その他の検索エンジン {#other-search-engines}

この拡張機能は Bing、Brave、DuckDuckGo、Ecosia、SearXNG、Startpage.com、Yahoo! JAPAN、Yandex をサポートしています。この機能はデフォルトで無効ですが、オプションページで有効にすることができます。

![SERPINFO オプションを開く](/img/advanced-features/other-search-engines-1.png)

![SERPINFO オプション](/img/advanced-features/other-search-engines-2.png)

## 同期 {#sync}

Google ドライブまたは Dropbox を使用してルールセットをデバイス間で同期できます。

同期を有効にするには、オプションページの「同期を有効にする」ボタンを押し、クラウドを選択します。

![同期を有効にする](/img/advanced-features/sync-1.png)

ダイアログの指示に従って認証してください。

![認証](/img/advanced-features/sync-2.png)

認証が成功すると、ルールセットが定期的に選択したクラウドと同期されるようになります。

### Google ドライブ {#google-drive}

Firefox またはその派生ブラウザでは、`https://www.googleapis.com` へのアクセスを許可する必要があります。

ルールセットは Google ドライブのアプリケーションデータフォルダーに保存されます。このフォルダーを見ることはできませんが、設定ページから削除することは可能です。

### Dropbox {#dropbox}

ルールセットは Dropbox の `/アプリ/uBlacklist/` フォルダーに保存されます。フォルダーの名前は言語によって異なる場合があります。

## 購読 {#subscription}

公開されたルールセットを購読することができます。

購読を追加するには、オプションページの「購読を追加する」ボタンを押して、名前と URL を入力します。その URL へのアクセス許可を求められる場合があります。

![購読を追加する](/img/advanced-features/subscription-1.png)

購読を表示、更新、削除することができます。

![購読の管理](/img/advanced-features/subscription-2.png)

### 購読を公開する {#publish-subscription}

ルールセットを購読として公開するには、UTF-8 でエンコードしたルールセットファイルを適切な HTTP(S) サーバーに配置し、URL を公開します。

ルールセットには YAML frontmatter を書くことができます。`name` 変数を設定することが推奨されます。

```
---
name: あなたのルールセットの名前
---
*://*.example.com/*
```

購読を GitHub で公開するのはよい考えです。**Raw** URL (例えば https://raw.githubusercontent.com/iorate/ublacklist-example-subscription/master/uBlacklist.txt) を公開してください。

![raw url](/img/advanced-features/subscription-3.png)

### 購読リンク {#subscription-links}

:::note

この機能は v8.11.0 以降で利用可能です。ユーザーは拡張機能のオプションページで「ルールセット購読リンクを有効にする」をオンにする必要があります。

:::

:::note

この機能は現在 Safari では動作しません。

:::

購読を簡単に共有するために、以下の形式で購読リンクを作成できます。

```
https://ublacklist.github.io/rulesets/subscribe?url=<url-encoded-url>
```

`<url-encoded-url>` は URL エンコードされたルールセットの URL です。このリンクをクリックすると、拡張機能のオプションページに移動し、購読が事前入力されるため、簡単に購読できます。

例えば、ルールセットが以下にホストされている場合:

```
https://raw.githubusercontent.com/username/repository/master/ublacklist.txt
```

購読リンクは以下のようになります:

```
https://ublacklist.github.io/rulesets/subscribe?url=https%3A%2F%2Fraw.githubusercontent.com%2Fusername%2Frepository%2Fmaster%2Fublacklist.txt
```
