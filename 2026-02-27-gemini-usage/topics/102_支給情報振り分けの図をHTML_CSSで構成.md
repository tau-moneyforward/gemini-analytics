# you asked

この図を HTML/CSS のみで構成して

---

# gemini response

はい、承知いたしました。
ご提示の図をHTMLとCSSのみで再現したコードは以下の通りです。

Flexboxを使用して要素を柔軟に配置し、`rem`単位で見やすいスタイリングを行っています。このコードをコピーして`.html`ファイルとして保存すれば、ブラウザで表示できます。

-----

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>支給情報の振り分け</title>
    <style>
        /* 基本設定 */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Original Yu Gothic", "Yu Gothic", sans-serif;
            background-color: #ffffff;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 2rem;
            box-sizing: border-box;
        }

        /* 全体を囲むコンテナ */
        .payment-container {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap; /* 画面が狭い場合は折り返す */
            justify-content: center;
        }

        /* 各カードのスタイル */
        .payment-card {
            background-color: #f9fafb; /* 背景色 */
            border-radius: 0.75rem; /* 角丸 */
            padding: 2rem;
            width: 420px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 影 */
            text-align: center;
        }

        .payment-card h2 {
            font-size: 1.25rem;
            margin-top: 0;
            margin-bottom: 2rem;
        }

        /* グラフ表示エリア */
        .visual-area {
            display: flex;
            justify-content: center;
            align-items: flex-end; /* 下揃え */
            height: 280px;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        /* グラフのバー */
        .bar {
            display: flex;
            flex-direction: column; /* 中の要素を縦に積む */
            width: 140px;
            height: 100%;
        }
        
        /* バーを構成する各セグメント */
        .segment {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid rgba(0, 0, 0, 0.1);
            font-size: 0.9rem;
            padding: 0.5rem;
            box-sizing: border-box;
        }

        .segment span {
            font-size: 0.8rem;
            color: #555;
        }

        /* 色の定義 */
        .segment.blue { background-color: #dbeafe; }
        .segment.grey { background-color: #e5e7eb; }
        .segment.orange { background-color: #fee6b3; }
        
        /* 高さの定義 */
        .segment.full { flex-grow: 1; } /* 全額: 残り全部 */
        .segment.fixed { flex-basis: 70px; flex-shrink: 0; } /* 固定額 */
        .segment.remainder { flex-grow: 1; } /* 残額: 残り全部 */

        /* 「または」のテキスト */
        .or-divider {
            align-self: center; /* 中央揃え */
            color: #6b7280;
        }

        /* 下部の説明文 */
        .description {
            font-size: 0.9rem;
            color: #4b5563;
        }

    </style>
</head>
<body>

    <div class="payment-container">
        <div class="payment-card">
            <h2>支給区分が「全額」の場合</h2>
            <div class="visual-area">
                <div class="bar">
                    <div class="segment blue full">
                        振り分け1
                        <span>(全額)</span>
                    </div>
                </div>
            </div>
            <p class="description">全額が、指定した支給方法で支給されます。</p>
        </div>

        <div class="payment-card">
            <h2>支給区分が「固定額」の場合</h2>
            <div class="visual-area">
                <div class="bar">
                    <div class="segment grey fixed">
                        振り分け1
                        <span>(固定額)</span>
                    </div>
                    <div class="segment blue remainder">
                        振り分け2
                        <span>(残額)</span>
                    </div>
                </div>

                <div class="or-divider">または</div>

                <div class="bar">
                    <div class="segment grey fixed">
                        振り分け1
                        <span>(固定額)</span>
                    </div>
                    <div class="segment orange fixed">
                        振り分け2
                        <span>(固定額)</span>
                    </div>
                    <div class="segment blue remainder">
                        振り分け3
                        <span>(残額)</span>
                    </div>
                </div>
            </div>
            <p class="description">固定額で指定した金額を差し引いた分が「残額」に振り分けられます。</p>
        </div>
    </div>

</body>
</html>
```

---
