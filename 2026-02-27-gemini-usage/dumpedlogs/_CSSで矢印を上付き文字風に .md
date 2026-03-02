> From: https://gemini.google.com/app/1075285c46532503

# you asked

.notion-link-token {
    color:#337EA9!important;
    font-weight: bold;
}

.notion-link-token::after {
  content: " .notion-link-token {
    color:#337EA9!important;
    font-weight: bold;
}

.notion-link-token::after {
  content: " ↗︎";
}";
}

この  ↗︎ を super (文字の右肩に小さく書く) にして

---

# gemini response

はい、承知いたしました。`::after` 疑似要素に `vertical-align: super;` と `font-size` を追加することで、矢印を右肩に小さく表示（上付き文字風に）できます。

以下が修正後のCSSです。

```css
.notion-link-token {
    color: #337EA9 !important;
    font-weight: bold;
}

.notion-link-token::after {
    content: " ↗︎";
    vertical-align: super; /* 要素を上付き文字の位置に配置 */
    font-size: smaller;     /* フォントサイズを少し小さくする (例: 0.75em などでも調整可能) */
}
```

### \---

### 変更点のポイント

  * `vertical-align: super;`: これが、`content` で指定した矢印「↗︎」を親要素のベースラインより上に（super = 上付き文字の）位置に移動させるプロパティです。
  * `font-size: smaller;`: 上付き文字は通常、本文より小さいため、`smaller`（または `0.75em` や `80%` など具体的な値）を指定してサイズを調整ときれいに見えます。

---

# you asked

super の位置は高すぎる。align top とかあったっけ？

---

# gemini response

はい、`vertical-align: top;` は存在します。

`super` が高すぎると感じる場合、`top` や `text-top` を試すのは良い方法です。

  * `vertical-align: top;`: 要素の**上端**を、行ボックス（line-box）の**上端**に揃えます。
  * `vertical-align: text-top;`: 要素の**上端**を、親要素の**フォントの上端**（アセンダーの上）に揃えます。

ただ、このケースでおそらく一番細かく調整できるのは、`position: relative;` を使って位置を微調整する方法です。

### 1\. `vertical-align: text-top;` を使う方法

`super` よりは低くなる可能性が高いです。

```css
.notion-link-token::after {
    content: " ↗︎";
    vertical-align: text-top; /* 'top' も試してみてください */
    font-size: smaller;
}
```

### 2\. `position: relative;` で微調整する方法 (おすすめ)

この方法が一番「ちょうどいい高さ」を狙いやすいです。

`vertical-align` を使わず、`position: relative;` で現在の位置からどれだけ動かすか（`top` または `bottom`）を指定します。

```css
.notion-link-token::after {
    content: " ↗︎";
    font-size: smaller;
    position: relative; /* これを追加 */
    top: -0.2em;      /* この値で高さを微調整します (マイナスが上) */
                      /* 例: -2px, -0.1em など */
}
```

**ポイント:**

  * `position: relative;` を指定します。
  * `top: -0.2em;` のように指定します。`top` プロパティは「基準位置からどれだけ**下**にずらすか」なので、**マイナスの値**を指定すると**上**に移動します。
  * `em` 単位で指定すると、`font-size` に応じて位置が変わるので便利です。`px` で固定することもできます。

`top: -0.2em;` の `-0.2` の部分を `-0.1` や `-0.3`、または `-2px` のように変更して、一番しっくりくる位置を探してみてください。

---

# you asked

.notion-link-token {
    color: #337EA9 !important;
    font-weight: bold;
}

.notion-link-token::after {
    content: "↗︎";
    vertical-align: top; /* 'top' も試してみてください */
    font-size: smaller;
}

リンクの色を Web 標準のリンクの色に変えて

---

# gemini response

はい、承知いたしました。
Webの標準的な（未訪問の）リンク色は `#0000EE`（青）です。

以下のように `color` プロパティを変更します。

```css
.notion-link-token {
    color: #0000EE !important; /* Web標準のリンク色 (青) に変更 */
    font-weight: bold;
}

.notion-link-token::after {
    content: " ↗︎";
    vertical-align: top;
    font-size: smaller;
}
```

（補足）
ちなみに、標準の「訪問済み」リンク色は `#551A8B`（紫）です。もし訪問済みの色も変えたい場合は、Notion側でそれが可能か（例: `:visited` セレクタが使えるか）を確認する必要があります。