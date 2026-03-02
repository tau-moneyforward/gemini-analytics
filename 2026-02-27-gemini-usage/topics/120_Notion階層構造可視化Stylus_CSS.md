> From: https://gemini.google.com/app/c9bb6d8581903760

# you asked

Notion の文書の階層構造を可視化する Stylus CSS を書いて

---

# gemini response

Notionの階層構造（トグルリストやインデントされたブロック）を視覚的に分かりやすくするためのStylus CSSコードを以下に示します。

これは、インデントの深さに応じて**縦のガイドライン**を表示し、構造を把握しやすくするものです。ライトモードとダークモードの両方に対応しています。

-----

## 🚀 Notion階層可視化 Stylus

このコードを [Stylus](https://add0n.com/stylus.html) などのブラウザ拡張機能に設定してください。

**適用対象:** `www.notion.so` (ドメイン)

```stylus
/*
 * Notion Hierarchy Lines (Stylus)
 *
 * 適用対象ドメイン: www.notion.so
 *
 * トグルリストやインデントされたブロックに
 * 階層を示す縦線 (ガイドライン) を追加します。
 * ライトモードとダークモードに自動で対応します。
 */

// --- 変数設定 ---

// Notionの標準インデント幅 (通常 22px)
indentWidth = 22px 
// 線の描画位置 (インデント幅の半分 = 11px)
linePos = (indentWidth / 2)

// ライトモード時の線の色 (NotionのUIに合わせた色)
lineColorLight = rgba(55, 53, 47, 0.15)
// ダークモード時の線の色 (NotionのUIに合わせた色)
lineColorDark = rgba(255, 255, 255, 0.1)

// 対応する最大のネストレベル
maxLevel = 10


// --- 階層線を描画する Mixin (Stylusの関数) ---
drawHierarchyLines(colorVar)
  // インデントされたブロックのラッパー
  .notion-indented
    position relative
    
    // 縦線 (ガイドライン)
    &:before
      content ''
      position absolute
      top 0
      bottom 0
      width 1px
      background-color colorVar
      
      // 1階層目 (デフォルト)
      left linePos
      
    // 2階層目以降 (ループで動的に生成)
    // .notion-indented > .notion-indented ... とネストを辿る
    currentSelector = '& > .notion-indented'
    for i in 1..maxLevel
      // {currentSelector} は動的にセレクタを展開する
      // 例: (i=1) & > .notion-indented
      // 例: (i=2) & > .notion-indented > .notion-indented
      {currentSelector}
        &:before
          // left の位置をインデント幅分ずらす
          left (linePos + indentWidth * i)
      
      // 次の階層のセレクタを準備
      currentSelector = currentSelector + ' > .notion-indented'


// --- スタイルの適用 ---

// Notionのメインフレーム (.notion-frame) を基準にする

// 1. ライトモード (デフォルト)
.notion-frame
  drawHierarchyLines(lineColorLight)

// 2. ダークモード
// Notionはダークモード時に .notion-dark-theme クラスを付与する
.notion-frame.notion-dark-theme
  drawHierarchyLines(lineColorDark)
```

-----

### 🎨 このCSSの仕組み

1.  **`.notion-indented` をターゲット:** Notionはトグルリストなどでインデントされたコンテンツを `.notion-indented` というクラス名の `div` で囲みます。このラッパー要素を基準にしています。
2.  **ネスト構造の利用:** `.notion-indented` は階層が深くなるほどネスト（入れ子）になります。Stylusのネストセレクタ（`& > .notion-indented`）とループを利用して、階層の深さ（2階層目、3階層目...）を判別しています。
3.  **`:before` 擬似要素:** 各 `.notion-indented` ラッパーの左側に `:before` 擬似要素を使って縦線を1本描画します。
4.  **`left` プロパティの調整:**
      * 1階層目（`padding-left: 22px` の領域）には `left: 11px` (22pxの半分) の位置に線を描画します。
      * 2階層目（`padding-left: 44px` の領域）には `left: 33px` (11px + 22px) の位置に線を描画します。
      * 以降、`maxLevel` で指定した階層まで、`22px` ずつ `left` の値を追加していきます。
5.  **Mixin (関数):** `drawHierarchyLines()` というStylusのMixin（関数のようなもの）を定義し、ライトモード用とダークモード用で色の変数 (`lineColorLight`, `lineColorDark`) を切り替えて呼び出すことで、コードの重複を避けています。

このコードを適用すると、Notionのページが以下のようになり、ネスト構造が非常に見やすくなります。

---

# you asked

#1
error11:1Unexpected "/".error11:2Unexpected "/".error11:4Unexpected "---".error11:13Expected "{" but found "---".error49:28Unexpected "は動的にセレクタを展開する".error50:7Unexpected "/".error50:8Unexpected "/".error50:12Expected FUNCTION, IDENT but found " ".error53:9Unexpected "&".error54:11Expected "{" but found "/".

---

# gemini response

ご指摘ありがとうございます。エラーの報告、大変助かります。

エラーの内容（特に日本語のコメント部分での `Unexpected` エラー）から判断すると、お使いのStylus環境（ブラウザ拡張機能など）が、単一行コメント (`//`) 内の日本語や特定の記号 (`---` など) を正しく解釈できていないようです。

これはStylusパーサー（解析エンジン）の文字エンコーディングや仕様の問題である可能性が高いです。

-----

## 🛠️ 修正版コード

この問題を回避するため、**すべてのコメントを `//`（単一行）から `/* ... */`（複数行）形式に変更**しました。こちらのコードをお使いください。

```stylus
/*
 * Notion Hierarchy Lines (Stylus)
 *
 * 適用対象ドメイン: www.notion.so
 *
 * トグルリストやインデントされたブロックに
 * 階層を示す縦線 (ガイドライン) を追加します。
 * ライトモードとダークモードに自動で対応します。
 */

/* --- 変数設定 --- */

/* Notionの標準インデント幅 (通常 22px) */
indentWidth = 22px 
/* 線の描画位置 (インデント幅の半分 = 11px) */
linePos = (indentWidth / 2)

/* ライトモード時の線の色 (NotionのUIに合わせた色) */
lineColorLight = rgba(55, 53, 47, 0.15)
/* ダークモード時の線の色 (NotionのUIに合わせた色) */
lineColorDark = rgba(255, 255, 255, 0.1)

/* 対応する最大のネストレベル */
maxLevel = 10


/* --- 階層線を描画する Mixin (Stylusの関数) --- */
drawHierarchyLines(colorVar)
  /* インデントされたブロックのラッパー */
  .notion-indented
    position relative
    
    /* 縦線 (ガイドライン) */
    &:before
      content ''
      position absolute
      top 0
      bottom 0
      width 1px
      background-color colorVar
      
      /* 1階層目 (デフォルト) */
      left linePos
      
    /* 2階層目以降 (ループで動的に生成) */
    /* .notion-indented > .notion-indented ... とネストを辿る */
    currentSelector = '& > .notion-indented'
    for i in 1..maxLevel
      /* {currentSelector} は動的にセレクタを展開する */
      /* 例: (i=1) & > .notion-indented */
      /* 例: (i=2) & > .notion-indented > .notion-indented */
      {currentSelector}
        &:before
          /* left の位置をインデント幅分ずらす */
          left (linePos + indentWidth * i)
      
      /* 次の階層のセレクタを準備 */
      currentSelector = currentSelector + ' > .notion-indented'


/* --- スタイルの適用 --- */

/* Notionのメインフレーム (.notion-frame) を基準にする */

/* 1. ライトモード (デフォルト) */
.notion-frame
  drawHierarchyLines(lineColorLight)

/* 2. ダークモード */
/* Notionはダークモード時に .notion-dark-theme クラスを付与する */
.notion-frame.notion-dark-theme
  drawHierarchyLines(lineColorDark)

```

### 修正のポイント

  * **コメント形式の変更:**
      * (変更前) `// --- 変数設定 ---`
      * (変更後) `/* --- 変数設定 --- */`
  * **理由:** `/* ... */` 形式のコメントは、`//` 形式よりも多くの環境で（特にマルチバイト文字を含む場合に）安全に解釈されるためです。

お手数ですが、こちらの修正版コードを再度Stylusに貼り付けてお試しいただけますでしょうか。

---

# you asked

#1
error14:13Expected "{" but found "=".error53:9Unexpected "&".error55:16Expected "{" but found "(".error55:42Unexpected ")".error58:23Expected "{" but found "=".

---

# gemini response

エラーのご報告ありがとうございます。

エラーの内容（`Expected "{"`、`Unexpected "&"`、`Unexpected "("`）を拝見しますと、これは**StylusのコードがStylusとして解釈されず、標準のCSSとして解釈されている**場合に典型的に発生するエラーです。

前回のコードはStylusの構文（変数定義の`=`、`{}`の省略、動的セレクタ`{...}`など）としては正しいものです。

-----

## 🧐 原因の可能性と対策

最も可能性が高い原因は、お使いのブラウザ拡張機能がStylusをサポートしていないか、設定が誤っていることです。

### 対策：正しいStylus拡張機能の確認

お使いの拡張機能は、**「Stylus」**（[add0n.com によるもの](https://add0n.com/stylus.html)など）でしょうか？

もし「Stylish」や「Stylebot」といった**他のCSS拡張機能**をお使いの場合、それらはStylusの構文（変数、Mixin、ループ）を理解できず、CSSとして解釈しようとするため、今回報告いただいたエラーが発生します。

**必ず「Stylus」という名前の拡張機能を使用していることを確認してください。**

-----

## 🛠️ 代替コード (標準CSS版)

もし「Stylus」拡張機能の利用が難しい場合、Stylus特有の機能（Mixinやループ）を使わず、\*\*標準のCSSカスタムプロパティ（変数）\*\*で書き直したコードを試してみてください。

**こちらのコードは、標準的なCSSしかサポートしていない拡張機能 (Stylebot, Stylish など) でも動作します。**

ただし、この方法ではStylusの強力な「ループ機能」を使えないため、対応できる階層をあらかじめ手動で書き出す必要があり、コードが長くなります。（ここでは5階層まで対応しています）

```css
/*
 * Notion Hierarchy Lines (標準CSS版)
 *
 * Stylusが使えない環境 (Stylebot, Stylishなど) 用の代替コードです。
 * CSSカスタムプロパティを使用します。
 * 5階層まで対応します。
 */

/* --- 変数定義 (ルート) --- */
:root {
  /* インデント幅 */
  --notion-indent-width: 22px;
  /* 線の位置 (幅の半分) */
  --notion-line-pos: calc(var(--notion-indent-width) / 2);
  
  /* 線の色 (ライトモード) */
  --notion-line-color: rgba(55, 53, 47, 0.15);
}

/* ダークモード時の色上書き */
.notion-dark-theme {
  --notion-line-color: rgba(255, 255, 255, 0.1);
}

/* --- 階層線の描画 --- */
.notion-frame .notion-indented {
  position: relative;
}

.notion-frame .notion-indented:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--notion-line-color);
}

/* 1階層目 */
.notion-frame .notion-indented:before {
  left: var(--notion-line-pos);
}

/* 2階層目 */
.notion-frame .notion-indented > .notion-indented:before {
  left: calc(var(--notion-line-pos) + var(--notion-indent-width));
}

/* 3階層目 */
.notion-frame .notion-indented > .notion-indented > .notion-indented:before {
  left: calc(var(--notion-line-pos) + var(--notion-indent-width) * 2);
}

/* 4階層目 */
.notion-frame .notion-indented > .notion-indented > .notion-indented > .notion-indented:before {
  left: calc(var(--notion-line-pos) + var(--notion-indent-width) * 3);
}

/* 5階層目 */
.notion-frame .notion-indented > .notion-indented > .notion-indented > .notion-indented > .notion-indented:before {
  left: calc(var(--notion-line-pos) + var(--notion-indent-width) * 4);
}
```

### どちらを試すべきか？

1.  **「Stylus」拡張機能を使っている場合:**
    お手数ですが、拡張機能が正しく有効になっているか、ドメイン(`www.notion.so`)が適用対象になっているかを確認し、前回のStylusコード（コメントを `/* */` に修正した版）を再度お試しください。

2.  **「Stylus」以外の拡張機能を使っている場合:**
    上記の「代替コード (標準CSS版)」をお試しください。

まず、お使いの拡張機能が「Stylus」であるかどうかをご確認いただけますでしょうか。