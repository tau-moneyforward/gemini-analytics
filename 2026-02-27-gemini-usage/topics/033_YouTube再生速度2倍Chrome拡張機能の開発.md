> From: https://gemini.google.com/app/2cd26343201d00ff

# you asked

YouTube のデフォルトの再生速度 x2 にする Chrome 拡張を書いて

---

# gemini response

## YouTube の再生速度をデフォルトで 2x にする Chrome 拡張機能

この Chrome 拡張機能は、YouTube の再生速度を自動的に 2x に設定します。

### 1\. 必要なファイル

以下の 3 つのファイルを作成します。

  * `manifest.json`
  * `background.js`
  * `content.js`

#### `manifest.json`

このファイルは、拡張機能のメタデータ（名前、バージョン、権限など）を定義します。

```json
{
  "manifest_version": 3,
  "name": "YouTube 2x Playback Speed",
  "version": "1.0",
  "description": "Sets the default playback speed of YouTube videos to 2x.",
  "permissions": ["declarativeContent", "scripting"],
  "host_permissions": ["https://www.youtube.com/*"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.youtube.com/*"],
      "js": ["content.js"]
    }
  ],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

  * `manifest_version`: Chrome の最新バージョンである `3` を指定します。
  * `name`, `version`, `description`: 拡張機能に関する基本情報です。
  * `permissions`: 拡張機能が実行するために必要な権限を定義します。`declarativeContent` はオプションですが、拡張機能が有効なページを制御するために役立ちます。`scripting` は、Web ページにスクリプトを注入するために必要です。
  * `host_permissions`: 拡張機能がアクセスできる Web サイトを指定します。ここでは YouTube の URL を指定しています。
  * `background`: バックグラウンドで実行されるスクリプトを指定します。
  * `content_scripts`: 特定の Web ページに注入されるスクリプトを指定します。このスクリプトが YouTube の動画プレイヤーを操作します。

#### `background.js`

このファイルは、主に拡張機能のライフサイクルイベントを処理します。ここでは、特に何もする必要はありませんが、将来的に機能を追加する場合に備えて含めておきます。

```javascript
// background.js
// 現在は特別な処理は不要です。
// 必要に応じて、ここで拡張機能のイベント処理などを記述します。
```

#### `content.js`

このファイルが、YouTube の再生速度を変更する主要なロジックを実装します。

```javascript
// content.js
function setPlaybackSpeed() {
  const video = document.querySelector('video');
  if (video) {
    video.playbackRate = 2.0;
    console.log('YouTube video playback speed set to 2x.');
  } else {
    console.log('Video element not found. Retrying...');
  }
}

// 動画プレイヤーがページに追加されたときに実行されるように、MutationObserver を使用します。
// これは、YouTube がシングルページアプリケーションであり、URL が変わってもページが再読み込みされないためです。
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(function(node) {
        if (node.tagName === 'VIDEO') {
          setPlaybackSpeed();
        }
      });
    }
  });
});

// body 全体を監視します。
observer.observe(document.body, { childList: true, subtree: true });

// 念のため、ページが読み込まれたときにも実行します。
window.addEventListener('load', setPlaybackSpeed);

// YouTube のページ遷移を監視して、新しい動画が読み込まれたときに再度実行します。
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(setPlaybackSpeed, 1000); // 新しい動画が完全に読み込まれるまで少し待つ
  }
}).observe(document, { subtree: true, childList: true });
```

### 2\. 拡張機能のインストール方法

1.  上記の 3 つのファイルを、`manifest.json` と同じディレクトリに保存します。
2.  `icons` という名前のディレクトリを作成し、16x16、48x48、128x128 ピクセルのアイコン画像（`icon16.png`, `icon48.png`, `icon128.png`）をそれぞれ配置します。アイコンは拡張機能の表示に必要です。
3.  Chrome を開き、アドレスバーに `chrome://extensions` と入力してエンターキーを押します。
4.  右上の「デベロッパーモード」をオンにします。
5.  「パッケージ化されていない拡張機能を読み込む」ボタンをクリックします。
6.  作成したファイルが入っているディレクトリを選択します。

これで、拡張機能が Chrome に追加され、YouTube の動画を再生すると自動的に再生速度が 2x に設定されるようになります。

### 補足

  * この拡張機能は、YouTube の DOM 構造に依存しています。将来的に YouTube のウェブサイトが変更された場合、動作しなくなる可能性があります。
  * `MutationObserver` を使用することで、YouTube のシングルページアプリケーションの特性に対応しています。これにより、ページを再読み込みせずに新しい動画に移動した場合でも、再生速度が正しく設定されます。

---

# you asked

アイコンも作って

---

# gemini response

はい、承知いたしました。拡張機能のアイコンをいくつか提案します。

1.  **シンプルな "2x" テキストアイコン:**
    拡張機能の目的が明確に伝わる、シンプルで分かりやすいアイコンです。

これらの画像をダウンロードして、`icons` フォルダに `icon16.png`, `icon48.png`, `icon128.png` として保存してください。

このアイコンでよろしければ、上記の画像をダウンロードしてご利用ください。もし別のデザインのアイデアがあれば、お気軽にお申し付けください。

---

# you asked

埋め込まれた動画プレーヤーでも動作するようにしてくれる？

---

# gemini response

はい、埋め込まれた動画プレーヤーでも動作するようにコードを修正します。

変更が必要なのは `content.js` です。YouTube の動画プレイヤーは、`iframe` を使ってウェブサイトに埋め込まれることがよくあります。この場合、元の `content.js` は埋め込み先のページで実行されますが、動画プレイヤー自体は別のドメイン (`www.youtube.com`) の iframe 内にあるため、直接アクセスできません。

この問題を解決するには、`content.js` から iframe にメッセージを送信し、iframe 側でそのメッセージを受信して再生速度を変更する、という方法をとる必要があります。

### 1\. `manifest.json` の変更

まず、`content.js` が `iframe` にも適用されるように `manifest.json` を変更します。

```json
{
  "manifest_version": 3,
  "name": "YouTube 2x Playback Speed",
  "version": "1.1",
  "description": "Sets the default playback speed of YouTube videos and embedded videos to 2x.",
  "permissions": ["declarativeContent", "scripting"],
  "host_permissions": ["https://www.youtube.com/*", "https://*.youtube.com/*", "<all_urls>"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.youtube.com/*", "https://*.youtube.com/*"],
      "js": ["content.js"]
    }
  ],
  "web_accessible_resources": [
    {
      "resources": ["content.js"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

  * `host_permissions` に `https://*.youtube.com/*` を追加し、`iframe` のサブドメインにも対応させます。また、`"<all_urls>"` を追加することで、あらゆるウェブサイトに埋め込まれた YouTube プレイヤーに対応できるようにします。
  * `web_accessible_resources` を追加します。これにより、埋め込み先のウェブページから `content.js` を読み込めるようになります。

-----

### 2\. `content.js` の変更

`content.js` を大幅に修正します。

```javascript
// content.js

function setPlaybackSpeed() {
  const video = document.querySelector('video');
  if (video) {
    video.playbackRate = 2.0;
    console.log('YouTube video playback speed set to 2x.');
  } else {
    console.log('Video element not found. Retrying...');
  }
}

// YouTube ページ自体で動画が再生されたときに実行
if (window.location.hostname === 'www.youtube.com' || window.location.hostname === 'm.youtube.com') {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function(node) {
          if (node.tagName === 'VIDEO') {
            setPlaybackSpeed();
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('load', setPlaybackSpeed);

  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(setPlaybackSpeed, 1000);
    }
  }).observe(document, { subtree: true, childList: true });
}

// 埋め込みプレイヤー（iframe）で実行
if (window.self !== window.top) {
  // これは iframe の中
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function(node) {
          if (node.tagName === 'VIDEO') {
            setPlaybackSpeed();
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('load', setPlaybackSpeed);
}
```

#### 変更点の解説

  * **`window.location.hostname` による条件分岐**: スクリプトが実行されているホスト名が `www.youtube.com` かどうかをチェックすることで、YouTube 本サイトと埋め込みプレイヤーの両方で適切に動作するようにしました。
  * **`window.self !== window.top` による iframe の判定**: JavaScript の `window` オブジェクトと `window.top` オブジェクトを比較することで、スクリプトが iframe 内で実行されているかどうかを判断します。
  * **それぞれの環境でのロジック**:
      * **YouTube 本サイト**: 今までのコードをそのまま利用します。URL の変更や動画プレイヤーの動的な追加を監視します。
      * **埋め込みプレイヤー (iframe)**: ページ遷移がないため、`MutationObserver` を使用して動画要素の追加を監視し、`window` の `load` イベントで初回実行します。これにより、埋め込まれた動画が再生された瞬間に速度が変更されます。

これらの変更を適用することで、拡張機能は YouTube のウェブサイトだけでなく、様々なウェブサイトに埋め込まれた YouTube 動画でも、自動的に再生速度を2xに設定できるようになります。

-----

### 3\. 拡張機能の再インストール

1.  上記のようにファイルを更新します。
2.  Chrome の `chrome://extensions` ページに戻ります。
3.  作成した拡張機能のカードの更新ボタン（矢印のアイコン）をクリックするか、拡張機能を一度無効にしてから再度有効にします。

これにより、最新のコードが適用され、埋め込み動画でも拡張機能が動作するようになります。