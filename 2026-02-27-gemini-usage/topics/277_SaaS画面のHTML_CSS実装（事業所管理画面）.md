> From: https://gemini.google.com/app/c0fa94ae6bd906d5

# you asked

基幹業務 SaaS の画面を、画像に従って HTML で出力して

---

# gemini response

ご提示いただいた3枚のワイヤーフレーム画像をもとに、基幹業務SaaS風のHTML/CSS（一部JavaScript含む）を作成しました。

サイドバーのメニュー（「事業所」「社保情報」「労保情報」）をクリックすることで、画像に描かれているそれぞれの画面（URLパスごとの表示）が切り替わるように実装しています。

以下のコードを `index.html` などのファイル名で保存し、ブラウザで開いて動作をご確認ください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>基幹業務 SaaS プロトタイプ</title>
    <style>
        :root {
            --border-color: #333;
            --bg-color: #f9f9f9;
            --hover-bg: #eee;
        }

        body {
            font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
            color: #333;
            margin: 0;
            padding: 40px;
            background-color: #f0f2f5;
        }

        .url-display {
            font-family: monospace;
            font-size: 16px;
            color: #666;
            margin-bottom: 8px;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
        }

        .container {
            display: flex;
            max-width: 900px;
            margin: 0 auto;
            background-color: #fff;
            border: 1px solid var(--border-color);
            min-height: 400px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        /* サイドバーのスタイル */
        .sidebar {
            width: 200px;
            border-right: 1px solid var(--border-color);
            padding: 20px 0;
            background-color: var(--bg-color);
        }

        .nav-item {
            padding: 12px 20px;
            margin: 0 10px 10px 10px;
            cursor: pointer;
            border: 1px solid transparent;
            font-size: 15px;
        }

        .nav-item:hover {
            background-color: var(--hover-bg);
        }

        .nav-item.active {
            border: 1px solid var(--border-color);
            background-color: #fff;
            font-weight: bold;
        }

        /* メインコンテンツのスタイル */
        .main-content {
            flex: 1;
            padding: 0;
        }

        .page {
            display: none;
            padding: 20px;
        }

        .page.active {
            display: block;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 15px;
            margin-bottom: 20px;
        }

        .page-title {
            margin: 0;
            font-size: 20px;
            font-weight: normal;
        }

        .btn-create {
            background-color: #fff;
            border: 1px solid var(--border-color);
            padding: 6px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }

        .btn-create:hover {
            background-color: var(--hover-bg);
        }

        /* テーブルのスタイル */
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border-bottom: 1px solid var(--border-color);
            padding: 12px 10px;
            text-align: left;
            font-size: 14px;
        }

        th {
            font-weight: normal;
            color: #555;
        }
    </style>
</head>
<body>

    <div class="url-display" id="url-path">/workplaces/locations</div>

    <div class="container">
        <div class="sidebar">
            <div class="nav-item active" onclick="switchTab('locations')">事業所</div>
            <div class="nav-item" onclick="switchTab('social-insurances')">社保情報</div>
            <div class="nav-item" onclick="switchTab('labor-insurances')">労保情報</div>
        </div>

        <div class="main-content">
            
            <div id="locations" class="page active">
                <div class="page-header">
                    <h1 class="page-title">事業所</h1>
                    <button class="btn-create">+ 作成</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>コード</th>
                            <th>名前</th>
                            <th>社保情報</th>
                            <th>労保情報</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>P001</td>
                            <td>本社</td>
                            <td>S001</td>
                            <td>L001</td>
                        </tr>
                        <tr>
                            <td>P002</td>
                            <td>京都</td>
                            <td>S001</td>
                            <td>L002</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="social-insurances" class="page">
                <div class="page-header">
                    <h1 class="page-title">社保情報</h1>
                    <button class="btn-create">+ 作成</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>コード</th>
                            <th>名前</th>
                            <th>適用事業所</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>S001</td>
                            <td>本社一括</td>
                            <td>P001</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="labor-insurances" class="page">
                <div class="page-header">
                    <h1 class="page-title">労保情報</h1>
                    <button class="btn-create">+ 作成</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>コード</th>
                            <th>名前</th>
                            <th>適用事業所</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>L001</td>
                            <td>本社</td>
                            <td>P001</td>
                        </tr>
                        <tr>
                            <td>L002</td>
                            <td>京都</td>
                            <td>P002</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>

    <script>
        // URLパスの表示用マッピング
        const urlPaths = {
            'locations': '/workplaces/locations',
            'social-insurances': '/workplaces/social_insurances',
            'labor-insurances': '/workplaces/labor_insurances'
        };

        function switchTab(tabId) {
            // サイドバーの選択状態を更新
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            event.target.classList.add('active');

            // ページの表示を切り替え
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');

            // 上部のURL表示を更新
            document.getElementById('url-path').textContent = urlPaths[tabId];
        }
    </script>
</body>
</html>
```

デザインやレイアウトの調整（例えば、より具体的なSaaS向けのUIフレームワークであるTailwind CSSやBootstrapなどへの変換）が必要でしたら、遠慮なくお申し付けください。

---

# you asked

普通に全画面で作って。URL は画面内に含めなくて良い

---

# gemini response

全画面表示（ウィンドウ全体を使用するレイアウト）に変更し、画面上部のURL表示を削除しました。

より実際のSaaSらしくなるよう、余白の調整や、サイドバーの選択状態（青いラインなど）、テーブルのヘッダーの背景色など、少しだけモダンなスタイルを追加しています。

以下のコードでお試しください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>基幹業務 SaaS プロトタイプ</title>
    <style>
        :root {
            --border-color: #e0e0e0;
            --sidebar-bg: #f8f9fa;
            --hover-bg: #f1f3f5;
            --active-bg: #e6f2ff;
            --text-color: #333;
            --primary-color: #0066cc;
        }

        body {
            font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
            color: var(--text-color);
            margin: 0;
            padding: 0;
            height: 100vh; /* 画面全体の高さを確保 */
            overflow: hidden; /* ページ全体のスクロールを隠す */
        }

        .container {
            display: flex;
            height: 100%;
            width: 100vw;
        }

        /* サイドバーのスタイル */
        .sidebar {
            width: 240px;
            min-width: 240px;
            border-right: 1px solid var(--border-color);
            background-color: var(--sidebar-bg);
            padding-top: 20px;
            display: flex;
            flex-direction: column;
        }

        .nav-item {
            padding: 14px 24px;
            cursor: pointer;
            font-size: 15px;
            transition: background-color 0.2s;
            border-right: 4px solid transparent;
        }

        .nav-item:hover {
            background-color: var(--hover-bg);
        }

        .nav-item.active {
            background-color: var(--active-bg);
            font-weight: bold;
            color: var(--primary-color);
            border-right: 4px solid var(--primary-color);
        }

        /* メインコンテンツのスタイル */
        .main-content {
            flex: 1;
            background-color: #ffffff;
            padding: 40px;
            overflow-y: auto; /* メインコンテンツが長い場合はここだけスクロール */
        }

        .page {
            display: none;
        }

        .page.active {
            display: block;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid var(--border-color);
            padding-bottom: 16px;
            margin-bottom: 30px;
        }

        .page-title {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }

        .btn-create {
            background-color: #ffffff;
            border: 1px solid #ccc;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.2s;
        }

        .btn-create:hover {
            background-color: var(--hover-bg);
            border-color: #bbb;
        }

        /* テーブルのスタイル */
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border-bottom: 1px solid var(--border-color);
            padding: 16px 12px;
            text-align: left;
            font-size: 15px;
        }

        th {
            font-weight: 600;
            color: #555;
            background-color: #fafafa;
        }

        tr:hover td {
            background-color: #fdfdfd;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="sidebar">
            <div class="nav-item active" onclick="switchTab('locations', this)">事業所</div>
            <div class="nav-item" onclick="switchTab('social-insurances', this)">社保情報</div>
            <div class="nav-item" onclick="switchTab('labor-insurances', this)">労保情報</div>
        </div>

        <div class="main-content">
            
            <div id="locations" class="page active">
                <div class="page-header">
                    <h1 class="page-title">事業所</h1>
                    <button class="btn-create">+ 作成</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>コード</th>
                            <th>名前</th>
                            <th>社保情報</th>
                            <th>労保情報</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>P001</td>
                            <td>本社</td>
                            <td>S001</td>
                            <td>L001</td>
                        </tr>
                        <tr>
                            <td>P002</td>
                            <td>京都</td>
                            <td>S001</td>
                            <td>L002</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="social-insurances" class="page">
                <div class="page-header">
                    <h1 class="page-title">社保情報</h1>
                    <button class="btn-create">+ 作成</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>コード</th>
                            <th>名前</th>
                            <th>適用事業所</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>S001</td>
                            <td>本社一括</td>
                            <td>P001</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="labor-insurances" class="page">
                <div class="page-header">
                    <h1 class="page-title">労保情報</h1>
                    <button class="btn-create">+ 作成</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>コード</th>
                            <th>名前</th>
                            <th>適用事業所</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>L001</td>
                            <td>本社</td>
                            <td>P001</td>
                        </tr>
                        <tr>
                            <td>L002</td>
                            <td>京都</td>
                            <td>P002</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>

    <script>
        function switchTab(tabId, element) {
            // サイドバーの選択状態を更新
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            element.classList.add('active');

            // ページの表示を切り替え
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        }
    </script>
</body>
</html>
```

他にテーブルの列幅を固定したい、または「+作成」ボタンを押したときのモーダル（ポップアップ）画面なども追加したい場合はお知らせください。どのような調整をしましょうか？

---

# you asked

HTML、CSS、JavaScript、データ本体を分割して

---

# gemini response

HTML、CSS、JavaScript、そしてデータをそれぞれ別のファイルとして分割しました。

以下の4つのファイルを作成し、同じフォルダに保存して `index.html` をブラウザで開いてみてください。JavaScriptがデータを読み込んで動的に表を生成する仕組みになっています。

### 1\. データ本体 (`data.js`)

各画面で表示するデータを定義します。

```javascript
const appData = {
    // 事業所データ
    locations: [
        { code: "P001", name: "本社", social: "S001", labor: "L001" },
        { code: "P002", name: "京都", social: "S001", labor: "L002" }
    ],
    // 社保情報データ
    socialInsurances: [
        { code: "S001", name: "本社一括", workplace: "P001" }
    ],
    // 労保情報データ
    laborInsurances: [
        { code: "L001", name: "本社", workplace: "P001" },
        { code: "L002", name: "京都", workplace: "P002" }
    ]
};
```

### 2\. JavaScript (`main.js`)

画面の切り替えと、データを使ったテーブルの描画処理を行います。

```javascript
// 画面のタブ切り替え機能
function switchTab(tabId, element) {
    // サイドバーの選択状態を更新
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    // ページの表示を切り替え
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

// データをテーブルに描画する機能
function renderTables() {
    // 1. 事業所の描画
    const locationsTbody = document.getElementById('tbody-locations');
    appData.locations.forEach(item => {
        locationsTbody.innerHTML += `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.social}</td>
                <td>${item.labor}</td>
            </tr>
        `;
    });

    // 2. 社保情報の描画
    const socialTbody = document.getElementById('tbody-social-insurances');
    appData.socialInsurances.forEach(item => {
        socialTbody.innerHTML += `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.workplace}</td>
            </tr>
        `;
    });

    // 3. 労保情報の描画
    const laborTbody = document.getElementById('tbody-labor-insurances');
    appData.laborInsurances.forEach(item => {
        laborTbody.innerHTML += `
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.workplace}</td>
            </tr>
        `;
    });
}

// 画面読み込み完了時にテーブルを描画
window.onload = renderTables;
```

### 3\. CSS (`style.css`)

見た目のデザイン定義です。

```css
:root {
    --border-color: #e0e0e0;
    --sidebar-bg: #f8f9fa;
    --hover-bg: #f1f3f5;
    --active-bg: #e6f2ff;
    --text-color: #333;
    --primary-color: #0066cc;
}

body {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    color: var(--text-color);
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
}

.container {
    display: flex;
    height: 100%;
    width: 100vw;
}

/* サイドバーのスタイル */
.sidebar {
    width: 240px;
    min-width: 240px;
    border-right: 1px solid var(--border-color);
    background-color: var(--sidebar-bg);
    padding-top: 20px;
    display: flex;
    flex-direction: column;
}

.nav-item {
    padding: 14px 24px;
    cursor: pointer;
    font-size: 15px;
    transition: background-color 0.2s;
    border-right: 4px solid transparent;
}

.nav-item:hover {
    background-color: var(--hover-bg);
}

.nav-item.active {
    background-color: var(--active-bg);
    font-weight: bold;
    color: var(--primary-color);
    border-right: 4px solid var(--primary-color);
}

/* メインコンテンツのスタイル */
.main-content {
    flex: 1;
    background-color: #ffffff;
    padding: 40px;
    overflow-y: auto;
}

.page {
    display: none;
}

.page.active {
    display: block;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 16px;
    margin-bottom: 30px;
}

.page-title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
}

.btn-create {
    background-color: #ffffff;
    border: 1px solid #ccc;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.2s;
}

.btn-create:hover {
    background-color: var(--hover-bg);
    border-color: #bbb;
}

/* テーブルのスタイル */
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border-bottom: 1px solid var(--border-color);
    padding: 16px 12px;
    text-align: left;
    font-size: 15px;
}

th {
    font-weight: 600;
    color: #555;
    background-color: #fafafa;
}

tr:hover td {
    background-color: #fdfdfd;
}
```

### 4\. HTML (`index.html`)

骨組みです。データ部分は空（`<tbody id="..."></tbody>`）にしておき、外部ファイル群を読み込んでいます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>基幹業務 SaaS プロトタイプ</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <div class="sidebar">
            <div class="nav-item active" onclick="switchTab('locations', this)">事業所</div>
            <div class="nav-item" onclick="switchTab('social-insurances', this)">社保情報</div>
            <div class="nav-item" onclick="switchTab('labor-insurances', this)">労保情報</div>
        </div>

        <div class="main-content">
            
            <div id="locations" class="page active">
                <div class="page-header">
                    <h1 class="page-title">事業所</h1>
                    <button class="btn-create">+ 作成</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>コード</th>
                            <th>名前</th>
                            <th>社保情報</th>
                            <th>労保情報</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-locations">
                        </tbody>
                </table>
            </div>

            <div id="social-insurances" class="page">
                <div class="page-header">
                    <h1 class="page-title">社保情報</h1>
                    <button class="btn-create">+ 作成</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>コード</th>
                            <th>名前</th>
                            <th>適用事業所</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-social-insurances">
                        </tbody>
                </table>
            </div>

            <div id="labor-insurances" class="page">
                <div class="page-header">
                    <h1 class="page-title">労保情報</h1>
                    <button class="btn-create">+ 作成</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>コード</th>
                            <th>名前</th>
                            <th>適用事業所</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-labor-insurances">
                        </tbody>
                </table>
            </div>

        </div>
    </div>

    <script src="data.js"></script>
    <script src="main.js"></script>
</body>
</html>
```

これで完全に責務（構造・見た目・動き・データ）が分割されました。

次は、実際にAPIからデータを取得するような非同期処理（`fetch` など）のダミーコードを追加しますか？