> From: https://gemini.google.com/app/2eaa20d1425ef714

# you asked

Notion の H1 と H2 と H3 を少しずつインデントする Stylus CSS を書いて

---

# gemini response

Notionのページ本文内にある見出し（H1, H2, H3）の階層構造を視覚的にわかりやすくするために、少しずつインデント（字下げ）するCSSを作成しました。

Stylus拡張機能に以下のコードをコピー＆ペーストして適用してください。

### Notion用 Stylus CSS

```css
/* =========================================
   Notion Headers Indentation
   ========================================= */

/* H1: 見出し1 (通常は左端のまま、または少しだけ空ける) */
.notion-header-block {
    padding-left: 0px !important; 
}

/* H2: 見出し2 (少しインデント) */
.notion-sub_header-block {
    padding-left: 24px !important;
}

/* H3: 見出し3 (さらにインデント) */
.notion-sub_sub_header-block {
    padding-left: 48px !important;
}

/* 補足: トグル見出しを使用している場合、
   矢印の位置がズレないように調整が必要な場合がありますが、
   基本的には上記のクラスでブロックごと移動します。
*/
```

-----

### 調整のポイント

  * **インデント幅の変更:**
    `24px` や `48px` の数値を変更することで、インデントの深さを調整できます。`1.5em` や `3em` のような単位を使うと、文字サイズに追従するのでより自然になる場合もあります。
  * **適用範囲:**
    このCSSはNotionの全ページに適用されます。特定のページだけに適用したい場合は、Stylusの設定で「ドメイン上のURL」を `notion.so` に限定するか、正規表現で細かく指定してください。

### おまけ：階層をより明確にするデザイン

インデントだけだとスカスカして見にくい場合、左側に薄い線を入れると階層構造がよりはっきりします。お好みで使ってみてください。

```css
/* H2に左線を追加 */
.notion-sub_header-block {
    padding-left: 20px !important;
    border-left: 3px solid rgba(128, 128, 128, 0.2); /* 薄いグレーの線 */
}

/* H3に左線を追加 */
.notion-sub_sub_header-block {
    padding-left: 40px !important;
    border-left: 3px solid rgba(128, 128, 128, 0.2);
}
```

ご希望の見た目になるよう、数値は自由に調整してみてください。

---

# you asked

/* =========================================
   Notion Headers Indentation
   ========================================= */

/* H1: 見出し1 (通常は左端のまま、または少しだけ空ける) */
.notion-header-block {
    padding-left: 0px !important; 
}

.notion-sub_header-block {
    padding-left: 12px !important;
}

/* H3に左線を追加 */
.notion-sub_sub_header-block {
    padding-left: 24px !important;
}

/* 補足: トグル見出しを使用している場合、
   矢印の位置がズレないように調整が必要な場合がありますが、
   基本的には上記のクラスでブロックごと移動します。
*/

これを前提に。H2 や H3 以下のすべての要素がインデントするようにしてほしい

---

# gemini response

**結論から申し上げますと、「CSSだけで『H2の下にあるテキスト』と『H3の下にあるテキスト』を区別してインデントする」ことは、NotionのHTML構造上、非常に困難（ほぼ不可能）です。**

Notionでは、見出しとその下のテキストは「親子関係（入れ子）」ではなく「兄弟関係（並列）」にあるため、CSSは「このテキストがどの見出しに属しているか」を判断できないからです。

### 解決策：逆転の発想（見出しを左に突き出す）

本文（テキスト）を動かすのではなく、\*\*「本文を基準位置として、見出しの方を左側に突き出す（アウトデントする）」\*\*という方法であれば、ご希望の見た目を再現できます。

以下のコードをStylusに上書きしてください。

```css
/* =========================================
   Notion Hierarchy Formatting (Outdent Style)
   ========================================= */

/* 【仕組みの解説】
   CSSでは「見出しの下の本文」を特定できないため、
   本文の位置(デフォルト)を「一番深いインデント」と見なし、
   見出しの方をマイナスマージンで左側に引っ張り出しています。
*/

/* ページ全体の余白を少し増やして、左に突き出すスペースを確保 */
.notion-page-content {
    padding-left: 60px !important; /* 好みで調整: 30px ~ 80px */
}

/* --- H1: 一番左に突き出す --- */
.notion-header-block {
    margin-left: -60px !important; /* padding-leftと同じ値のマイナス */
    width: calc(100% + 60px) !important; /* 幅を補正 */
    
    /* デザイン調整 */
    padding-left: 0px !important;
}

/* --- H2: 少し左に突き出す --- */
.notion-sub_header-block {
    margin-left: -40px !important;
    width: calc(100% + 40px) !important;
    
    /* デザイン調整（左線など） */
    padding-left: 12px !important;
    border-left: 3px solid rgba(128, 128, 128, 0.3); /* 前回の設定を継承 */
}

/* --- H3: さらに本文に近い位置 --- */
.notion-sub_sub_header-block {
    margin-left: -20px !important;
    width: calc(100% + 20px) !important;

    /* デザイン調整 */
    padding-left: 12px !important;
    border-left: 3px solid rgba(128, 128, 128, 0.3);
}

/* --- 本文（テキストブロックなど） --- */
/* 何も指定しません。デフォルトで「0位置」にあるため、
   H1(-60px) > H2(-40px) > H3(-20px) > 本文(0px)
   という階段状の見た目になります。 */
```

### このコードで実現されること

  * **H1**: 左端（本来のページの端）に配置されます。
  * **H2**: H1より少し右、でも本文よりは左に配置されます。
  * **H3**: H2より少し右、でも本文よりは左に配置されます。
  * **本文**: 一番右（インデントされた状態）に見えます。

### 注意点

  * **ページ全体の余白:** `.notion-page-content` に `padding-left` を追加しているため、ページ全体が少し右に寄ります。
  * **カラムレイアウト:** Notionで「2列・3列」のカラム機能を使っている箇所では、レイアウトが少し崩れて見える可能性があります。その場合は、上記の `.notion-page-content` の部分を削除し、見出しのマージン調整だけで試してみてください（ただし左端が見切れる可能性があります）。