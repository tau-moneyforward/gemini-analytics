> From: https://gemini.google.com/app/b163bbd90893a673

# you asked

Zoom の録画再生中に経過時間を非表示にしないブラウザ拡張を開発して

---

# gemini response

Zoomの録画（クラウドレコーディング）再生時に、コントロールバー（再生バーや経過時間）が自動的に消えてしまうのを防ぎ、**常に表示させたままにするChrome/Edge用拡張機能**の作成方法を解説します。

特別なツールは不要で、テキストエディタ（メモ帳など）があればすぐに作成可能です。

### 拡張機能の作成手順

デスクトップなどに適当なフォルダ（例: `zoom-fix`）を新規作成し、その中に以下の2つのファイルを作成してください。

#### 1\. `manifest.json` （設定ファイル）

拡張機能の基本情報を記述します。

```json
{
  "manifest_version": 3,
  "name": "Zoom Recording Always Visible",
  "version": "1.0",
  "description": "Zoomの録画再生時にコントロールバーを常に表示します。",
  "content_scripts": [
    {
      "matches": ["https://*.zoom.us/rec/*", "https://*.zoom.us/recording/*"],
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ]
}
```

#### 2\. `content.js` （実行スクリプト）

実際にページのデザインを書き換えるコードです。Zoomのプレイヤーに使われているスタイルを強制的に上書きします。

```javascript
// スタイルを定義
const cssFix = `
  /* Zoomのコントロールバーの透過を無効化し、常に表示 */
  .vjs-control-bar,
  .player-footer,
  div[class*="control-bar"],
  div[class*="player-bottom"] {
      opacity: 1 !important;
      visibility: visible !important;
      display: flex !important;
      transition: none !important;
      transform: none !important;
  }

  /* 念のため、コントロールバーが隠れるアニメーションを無効化 */
  .vjs-fade-out,
  .vjs-user-inactive .vjs-control-bar {
      opacity: 1 !important;
      visibility: visible !important;
  }
`;

// スタイルをページに注入する関数
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = cssFix;
    document.head.appendChild(style);
    console.log("Zoom Control Fixer: Styles injected.");
}

// ページ読み込み完了時に実行
injectStyles();

// 動的に要素が生成される場合への対策（念のための監視）
const observer = new MutationObserver(() => {
    // 特定のクラスが追加されて消えそうになったらスタイルを再確認（基本はCSSのみで効きます）
});
observer.observe(document.body, { childList: true, subtree: true });
```

-----

### ブラウザへのインストール方法

作成したフォルダをブラウザに読み込ませます。

1.  Google Chrome（またはEdge）を開きます。
2.  アドレスバーに `chrome://extensions` と入力してエンターキーを押します。
3.  右上の **「デベロッパーモード」** スイッチをオンにします。
4.  左上に現れる **「パッケージ化されていない拡張機能を読み込む」** ボタンをクリックします。
5.  先ほど作成したフォルダ（`zoom-fix`）を選択します。

これでインストールは完了です。

### 使い方

1.  Zoomの録画再生ページを開きます（すでに開いている場合は再読み込みしてください）。
2.  再生を開始してマウスを動かさずに放置しても、下のシークバーや経過時間が消えずに表示され続ければ成功です。

### うまく動かない場合

Zoomは頻繁に仕様（クラス名）を変更するため、もし上記で動かない場合は、対象のCSSクラス名が変わっている可能性があります。その際は以下の手順でクラス名を特定し、`content.js` を修正します。

1.  録画画面でコントロールバーの上で **右クリック \> 検証 (Inspect)** を選びます。
2.  デベロッパーツールで、青くハイライトされている部分（またはその親要素）の `class="..."` の名前を探します（例: `timeline-container` や `controls-wrapper` など）。
3.  そのクラス名を `content.js` のCSS部分（`.vjs-control-bar, ...` の並び）に追加してください。

-----

こちらのコードでまずは試していただけますでしょうか？もしZoomの特定の画面（例えばパスワード付きの共有画面など）で動かない場合は、そのページのURL構造などを教えていただければ調整します。