> From: https://gemini.google.com/app/ae16c941de7f17d1

# you asked

<table class="table table-hover log-table" style="table-layout: fixed; width: 100%; min-width: 1600px">
   <thead>
      <tr>
         <th scope="col" style="width: 4%">OID</th>
         <th scope="col" style="width: 10%">ログID</th>
         <th scope="col" style="width: 10%">操作者</th>
         <th scope="col" style="width: 7%">日時</th>
         <th scope="col" style="width: 7%">適用開始日</th>
         <th scope="col" style="width: 7%">操作方法</th>
         <th scope="col" style="width: 10%">対象データのキー</th>
         <th scope="col" style="width: 10%">操作したサービス</th>
         <th scope="col" style="width: 10%">IPアドレス</th>
         <th scope="col" style="width: 10%">操作内容・処理内容</th>
         <th scope="col" style="width: 15%">項目名</th>
      </tr>
   </thead>

こういう構造の HTML がある。これを改造するスクリプトを書いてほしい。

(1) [対象データのキー] 列を、[対象データ] と [キー] に分割
(2) 以下の TSV を [対象データ]、[キー]、[操作内容・処理内容]、[項目名] の列に記載。その際、すでに存在している表のコンテンツの上に追記すること

従業員 #002 倒捨 ゆいxxxx-xxxx-xxxx-xxxx変更本人情報 - 基本情報 - 従業員-従業員番号役職 #003-kacho 課長xxxx-xxxx-xxxx-xxxx追加 役職コード従業員 #005 倒捨 ろいxxxx-xxxx-xxxx-xxxx変更 家族情報 #1 倒捨 ろいのい - 社会保険 - 被扶養者になった日従業員 #002 倒捨 ゆいxxxx-xxxx-xxxx-xxxx追加本人情報 - 基本情報 - 所属 #1 人事部 - 組織名組織 #組織 3' 事務事務部xxxx-xxxx-xxxx-xxxx変更組織コード職種 #002-hiring 採用xxxx-xxxx-xxxx-xxxx変更職種名役職 #004-bucho 部長xxxx-xxxx-xxxx-xxxx削除従業員 #006 ◯山 ◯太xxxx-xxxx-xxxx-xxxx削除
カスタムカテゴリ #2 運転免許xxxx-xxxx-xxxx-xxxx削除カスタムカテゴリ #2 運転免許xxxx-xxxx-xxxx-xxxx削除カスタム項目 - #2 普通免許カスタムカテゴリ #2 運転免許xxxx-xxxx-xxxx-xxxx変更カスタム項目 - #2 自動二輪 - 項目名カスタムカテゴリ #3 貸与制服xxxx-xxxx-xxxx-xxxx変更カスタムカテゴリ - カテゴリ名事業所 #office-002 大阪xxxx-xxxx-xxxx-xxxx追加基本情報 - 所在地 - 都道府県

---

# gemini response

ご提示いただいたHTML構造と要件に基づき、JavaScriptを作成しました。

このスクリプトは以下の処理を行います。

1.  テーブルヘッダーの「対象データのキー」を「対象データ」に変更し、その右側に「キー」列を追加します。
2.  既存の行がある場合、レイアウトが崩れないように空のセルを追加します。
3.  ご指定のTSVデータを解析し、指定された列（対象データ、キー、操作内容、項目名）に値をセットして、表の先頭（ヘッダーの直下）に追加します。

### JavaScript スクリプト

以下のコードをブラウザのコンソール（F12キー）で実行するか、HTML内の `<script>` タグに貼り付けて実行してください。

```javascript
/**
 * ログテーブル改造・データ追記スクリプト
 */
(function() {
    // 1. テーブルとヘッダーの取得
    const table = document.querySelector('.log-table');
    if (!table) {
        console.error('テーブルが見つかりません (.log-table)');
        return;
    }
    const theadRow = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody') || table.appendChild(document.createElement('tbody'));

    // --- (1) ヘッダーの改造 ---
    
    // 現在の「対象データのキー」列を取得 (インデックス 6)
    // 構成: OID(0), ログID(1), 操作者(2), 日時(3), 適用開始日(4), 操作方法(5), [対象データのキー(6)], サービス(7)...
    const targetHeader = theadRow.children[6];
    
    if (targetHeader && targetHeader.innerText.includes('対象データのキー')) {
        // ラベル変更
        targetHeader.innerText = '対象データ';
        
        // 新しい「キー」ヘッダーを作成
        const keyHeader = document.createElement('th');
        keyHeader.innerText = 'キー';
        keyHeader.scope = 'col';
        keyHeader.style.width = '10%'; // 元のCSSに合わせて幅を指定
        
        // 「対象データ」の後ろに挿入
        targetHeader.after(keyHeader);
        
        // ※既存のボディ行がある場合、列ズレを防ぐために空セルを挿入
        Array.from(tbody.rows).forEach(row => {
            const newCell = row.insertCell(7);
            newCell.innerText = '-';
        });
    }

    // --- (2) TSVデータの追記 ---

    // データの定義 (タブ区切り文字 \t を使用して整形)
    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 - 基本情報 - 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい - 社会保険 - 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 - 基本情報 - 所属 #1 人事部 - 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 - #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 - #2 自動二輪 - 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ - カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 - 所在地 - 都道府県
`.trim();

    // データを逆順にして1行ずつ処理 (insertBeforeで常に先頭に追加するため)
    const lines = tsvData.split('\n').reverse();

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return; // 空行などをスキップ

        // TSVのカラム割り当て
        // [0]: 対象データ, [1]: キー, [2]: 操作内容, [3]: 項目名
        const [dataTarget, dataKey, dataOp, dataItem] = cols;

        // 行の生成
        const tr = document.createElement('tr');
        
        // 全12列分のセルを作成 (ヘッダー改造後の列数)
        // 0:OID, 1:ログID, 2:操作者, 3:日時, 4:適用日, 5:方法, 
        // 6:対象データ(NEW data), 7:キー(NEW data), 
        // 8:サービス, 9:IP, 
        // 10:操作内容(NEW data), 11:項目名(NEW data)
        
        let html = '';
        for (let i = 0; i < 12; i++) {
            let content = ''; // デフォルトは空

            if (i === 6) content = dataTarget || '';   // 対象データ
            else if (i === 7) content = dataKey || ''; // キー
            else if (i === 10) content = dataOp || ''; // 操作内容
            else if (i === 11) content = dataItem || ''; // 項目名
            // 他の列（日時やOIDなど）はデータがないため空欄またはハイフンとします
            else content = '-'; 

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        
        // 既存のコンテンツの上に追記 (tbodyの先頭に挿入)
        tbody.insertBefore(tr, tbody.firstChild);
    });

    console.log('テーブルの更新が完了しました。');
})();
```

### ポイントと解説

1.  **DOM操作 (`insertBefore`)**:

      * 要件の「すでに存在している表のコンテンツの上に追記」を実現するため、`tbody.appendChild`（末尾追加）ではなく `tbody.insertBefore(tr, tbody.firstChild)` を使用しています。
      * これにより、ループ処理でデータを逆順（`reverse()`）にして投入することで、元のTSVの上から順にテーブルの上部に表示されるようにしています。

2.  **TSVデータの整形**:

      * ご提供いただいたテキストデータには、チャット欄の仕様上タブ文字が含まれていない可能性がありました（スペース等に見える）。
      * そのため、スクリプト内の `const tsvData` 変数にて、明示的に `\t`（タブ）を入れてデータを再定義しています。これで確実に分割処理が動作します。

3.  **列番号の管理**:

      * 改造前は全11列でしたが、「対象データのキー」を分割したことで全12列になります。
      * `[対象データ]` は **インデックス 6**
      * `[キー]` は **インデックス 7**（新設）
      * `[操作内容]` は2つずれて **インデックス 10**
      * `[項目名]` は2つずれて **インデックス 11**
      * これらに合わせてデータをマッピングしています。

-----

このスクリプトをご利用環境に合わせて調整（例えば、他の列にも仮データを入れたいなど）が必要でしたら、お申し付けください。

---

# you asked

列幅の割合をコンテンツとヘッダラベルに合わせて変更して

---

# gemini response

承知いたしました。
前回のスクリプトに、\*\*「列幅（width）の再定義」\*\*を行う処理を追加・調整しました。

ご提示いただいたデータ内容（TSV）に基づき、以下のような方針で幅を最適化しています。

1.  **「対象データ」と「項目名」**: テキストが長くなるため、幅を大きく広げました（15% / 23%）。
2.  **「キー」**: UUID（36文字）が改行されずに収まるよう、十分な幅（10%）を確保しました。
3.  **「操作内容」**: データが「追加/変更/削除」の2文字のみで短いため、幅を大幅に狭めました（4%）。
4.  **その他**: 重要度の低いID列などを少し詰めました。

### 改造・データ追記・幅調整スクリプト

このコードをそのまま実行すれば、列の分割、データの追記、列幅の最適化がすべて反映されます。

```javascript
/**
 * ログテーブル改造・データ追記・列幅最適化スクリプト
 */
(function() {
    // 1. テーブルとヘッダーの取得
    const table = document.querySelector('.log-table');
    if (!table) {
        console.error('テーブルが見つかりません (.log-table)');
        return;
    }
    const theadRow = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody') || table.appendChild(document.createElement('tbody'));

    // --- (1) ヘッダーの改造（分割と追加） ---
    
    // 現在の「対象データのキー」列を取得 (インデックス 6)
    const targetHeader = theadRow.children[6];
    
    // まだ分割されていない場合のみ実行
    if (targetHeader && targetHeader.innerText.includes('対象データのキー')) {
        // ラベル変更
        targetHeader.innerText = '対象データ';
        
        // 新しい「キー」ヘッダーを作成
        const keyHeader = document.createElement('th');
        keyHeader.innerText = 'キー';
        keyHeader.scope = 'col';
        // 幅は後で一括設定するのでここでは適当でOK
        
        // 「対象データ」の後ろに挿入
        targetHeader.after(keyHeader);
        
        // 既存行がある場合、列ズレを防ぐため空セルを挿入
        Array.from(tbody.rows).forEach(row => {
            const newCell = row.insertCell(7);
            newCell.innerText = '-';
        });
    }

    // --- (2) 列幅の最適化 ---
    // コンテンツ量に合わせて % を再配分 (合計 100%)
    const newWidths = [
        "3%",  // 0: OID (数字のみなので最小限)
        "5%",  // 1: ログID (優先度低)
        "7%",  // 2: 操作者
        "7%",  // 3: 日時
        "7%",  // 4: 適用開始日
        "5%",  // 5: 操作方法
        "15%", // 6: 対象データ (★重要: 名前など長いので広げる)
        "10%", // 7: キー (UUIDが入るためある程度の幅が必要)
        "6%",  // 8: 操作したサービス
        "8%",  // 9: IPアドレス
        "4%",  // 10: 操作内容 (★「変更」「追加」の2文字だけなので狭くする)
        "23%"  // 11: 項目名 (★最長: パンくずリストが入るため最大幅をとる)
    ];

    // ヘッダーセルに幅を適用
    const headers = theadRow.children;
    for (let i = 0; i < headers.length; i++) {
        if (newWidths[i]) {
            headers[i].style.width = newWidths[i];
        }
    }

    // --- (3) TSVデータの追記 ---

    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 - 基本情報 - 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい - 社会保険 - 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 - 基本情報 - 所属 #1 人事部 - 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 - #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 - #2 自動二輪 - 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ - カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 - 所在地 - 都道府県
`.trim();

    const lines = tsvData.split('\n').reverse();

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        // [0]:対象データ, [1]:キー, [2]:操作内容, [3]:項目名
        const [dataTarget, dataKey, dataOp, dataItem] = cols;

        const tr = document.createElement('tr');
        
        let html = '';
        // 全12列分のセルを作成
        for (let i = 0; i < 12; i++) {
            let content = '';
            // 列ごとのデータマッピング
            if (i === 6) content = dataTarget || '';
            else if (i === 7) content = dataKey || '';
            else if (i === 10) content = dataOp || '';
            else if (i === 11) content = dataItem || '';
            else content = '-'; 

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.insertBefore(tr, tbody.firstChild);
    });

    console.log('テーブルの更新・列幅調整が完了しました。');
})();
```

### 変更点

コード内の `newWidths` 配列で、列ごとのパーセンテージを定義しています。もし実際の表示を見て微調整したい場合は、この配列の数値を変更してください。

---

# you asked

OID に「101243」、ログ ID にダミーの UUID、操作者に「1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと」、日時に「2026-01-13」の適当な時分、適用開始日に「2026-01-13」、操作方法に「********」、操作したサービスに「人事管理」、IP アドレスに「111.98.254.197」を一律で入れるよう、スクリプトを修正して

---

# gemini response

承知いたしました。
前回のスクリプトをベースに、ご指定いただいた固定値（OID、操作者、IPなど）や、動的に生成する値（ログID、時間）を各列に埋め込むよう修正しました。

### 修正後のスクリプト

以下のコードを実行すると、TSVデータの内容に加え、指定された固定値やダミーデータが全ての行に入力されます。

```javascript
/**
 * ログテーブル改造・データ追記・固定値埋め込みスクリプト
 */
(function() {
    // --- ヘルパー関数: ダミーUUID生成 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // --- ヘルパー関数: ランダムな時刻生成 (日付は2026-01-13固定) ---
    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 1. テーブルとヘッダーの取得
    const table = document.querySelector('.log-table');
    if (!table) {
        console.error('テーブルが見つかりません (.log-table)');
        return;
    }
    const theadRow = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody') || table.appendChild(document.createElement('tbody'));

    // --- (1) ヘッダーの改造 ---
    
    // 現在の「対象データのキー」列を取得 (インデックス 6)
    const targetHeader = theadRow.children[6];
    
    if (targetHeader && targetHeader.innerText.includes('対象データのキー')) {
        targetHeader.innerText = '対象データ';
        
        const keyHeader = document.createElement('th');
        keyHeader.innerText = 'キー';
        keyHeader.scope = 'col';
        targetHeader.after(keyHeader);
        
        // 既存行への空セル挿入
        Array.from(tbody.rows).forEach(row => {
            row.insertCell(7).innerText = '-';
        });
    }

    // --- (2) 列幅の最適化 ---
    const newWidths = [
        "3%",  // 0: OID
        "5%",  // 1: ログID
        "7%",  // 2: 操作者
        "7%",  // 3: 日時
        "7%",  // 4: 適用開始日
        "5%",  // 5: 操作方法
        "15%", // 6: 対象データ
        "10%", // 7: キー
        "6%",  // 8: 操作したサービス
        "8%",  // 9: IPアドレス
        "4%",  // 10: 操作内容
        "23%"  // 11: 項目名
    ];

    const headers = theadRow.children;
    for (let i = 0; i < headers.length; i++) {
        if (newWidths[i]) headers[i].style.width = newWidths[i];
    }

    // --- (3) TSVデータの追記 ---

    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 - 基本情報 - 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい - 社会保険 - 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 - 基本情報 - 所属 #1 人事部 - 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 - #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 - #2 自動二輪 - 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ - カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 - 所在地 - 都道府県
`.trim();

    const lines = tsvData.split('\n').reverse();

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        // TSVからの値
        const [dataTarget, dataKey, dataOp, dataItem] = cols;

        const tr = document.createElement('tr');
        let html = '';

        // 列ごとに値を設定
        for (let i = 0; i < 12; i++) {
            let content = '';

            switch (i) {
                case 0: // OID
                    content = '101243';
                    break;
                case 1: // ログID (ランダムUUID)
                    content = generateUUID();
                    break;
                case 2: // 操作者
                    content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと';
                    break;
                case 3: // 日時 (2026-01-13 + ランダム時間)
                    content = getRandomDateTime();
                    break;
                case 4: // 適用開始日
                    content = '2026-01-13';
                    break;
                case 5: // 操作方法
                    content = '********';
                    break;
                case 6: // 対象データ (TSV)
                    content = dataTarget || '';
                    break;
                case 7: // キー (TSV)
                    content = dataKey || '';
                    break;
                case 8: // 操作したサービス
                    content = '人事管理';
                    break;
                case 9: // IPアドレス
                    content = '111.98.254.197';
                    break;
                case 10: // 操作内容 (TSV)
                    content = dataOp || '';
                    break;
                case 11: // 項目名 (TSV)
                    content = dataItem || '';
                    break;
            }
            
            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.insertBefore(tr, tbody.firstChild);
    });

    console.log('テーブルの更新が完了しました。');
})();
```

### 主な実装内容

  * **0列目 (OID)**: `101243` に固定。
  * **1列目 (ログID)**: `generateUUID()` 関数でランダムなUUIDを生成して挿入。
  * **2列目 (操作者)**: 指定された長い文字列を挿入。
  * **3列目 (日時)**: `2026-01-13` にランダムな時分秒を組み合わせて挿入。
  * **8列目 (サービス)**: `人事管理` に固定。
  * **9列目 (IP)**: `111.98.254.197` に固定。
  * **5列目**: `********` に固定。
  * **4列目**: `2026-01-13` に固定。

これで表全体がリアルなダミーデータで埋まります。

---

# you asked

最初に既存のコンテンツをワイプする処理を追加して

---

# gemini response

既存のテーブル行（`tbody` の中身）をすべて削除してから、新しいデータを追加するようにスクリプトを修正しました。

これにより、実行するたびに表の中身がリセットされ、指定したデータのみが表示されるようになります。

```javascript
/**
 * ログテーブル改造・データ完全置換（ワイプ）スクリプト
 */
(function() {
    // --- ヘルパー関数: ダミーUUID生成 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // --- ヘルパー関数: ランダムな時刻生成 (日付は2026-01-13固定) ---
    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 1. テーブルとヘッダーの取得
    const table = document.querySelector('.log-table');
    if (!table) {
        console.error('テーブルが見つかりません (.log-table)');
        return;
    }
    const theadRow = table.querySelector('thead tr');
    // tbodyを取得（なければ作成）
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }

    // --- (1) 既存コンテンツのワイプ ---
    // ここで既存の行をすべて削除します
    tbody.innerHTML = '';

    // --- (2) ヘッダーの改造 ---
    // 現在の「対象データのキー」列を取得 (インデックス 6)
    const targetHeader = theadRow.children[6];
    
    // まだ分割されていない場合のみ実行（2回目以降の実行対策）
    if (targetHeader && targetHeader.innerText.includes('対象データのキー')) {
        targetHeader.innerText = '対象データ';
        
        const keyHeader = document.createElement('th');
        keyHeader.innerText = 'キー';
        keyHeader.scope = 'col';
        targetHeader.after(keyHeader);
        
        // ※行はワイプ済みなので、既存行への空セル追加処理は不要になりました
    }

    // --- (3) 列幅の最適化 ---
    const newWidths = [
        "3%",  // 0: OID
        "5%",  // 1: ログID
        "7%",  // 2: 操作者
        "7%",  // 3: 日時
        "7%",  // 4: 適用開始日
        "5%",  // 5: 操作方法
        "15%", // 6: 対象データ
        "10%", // 7: キー
        "6%",  // 8: 操作したサービス
        "8%",  // 9: IPアドレス
        "4%",  // 10: 操作内容
        "23%"  // 11: 項目名
    ];

    const headers = theadRow.children;
    for (let i = 0; i < headers.length; i++) {
        if (newWidths[i]) headers[i].style.width = newWidths[i];
    }

    // --- (4) TSVデータの生成と追加 ---

    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 - 基本情報 - 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい - 社会保険 - 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 - 基本情報 - 所属 #1 人事部 - 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 - #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 - #2 自動二輪 - 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ - カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 - 所在地 - 都道府県
`.trim();

    // 既存データを消したので、TSVの上から順に追加していきます (reverse不要)
    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const [dataTarget, dataKey, dataOp, dataItem] = cols;

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 12; i++) {
            let content = '';
            switch (i) {
                case 0: content = '101243'; break;
                case 1: content = generateUUID(); break;
                case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                case 3: content = getRandomDateTime(); break;
                case 4: content = '2026-01-13'; break;
                case 5: content = '********'; break;
                case 6: content = dataTarget || ''; break;
                case 7: content = dataKey || ''; break;
                case 8: content = '人事管理'; break;
                case 9: content = '111.98.254.197'; break;
                case 10: content = dataOp || ''; break;
                case 11: content = dataItem || ''; break;
            }
            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        // tbodyは空になっているので appendChild で順に追加
        tbody.appendChild(tr);
    });

    console.log('テーブルをリセットし、データを再構築しました。');
})();
```

### 主な変更点

1.  **`tbody.innerHTML = '';` を追加**:
      * 処理の初期段階でこれを実行し、テーブルの中身を空っぽにしています。
2.  **`reverse()` と `insertBefore` の廃止**:
      * テーブルが空の状態からスタートするため、データを逆順にする必要がなくなりました。素直に上から順に `appendChild` で行を追加しています。
3.  **冗長な処理の削除**:
      * 既存行に対して列ズレを防ぐための空セル挿入処理（`row.insertCell(7)`）は、既存行を消すため不要になり削除しました。

---

# you asked

一律代入は簡単に OFF にできるようにして。あと「カスタム項目 - #2 自動二輪 - 項目名」「カスタム項目 - #2 普通免許」はそれぞれハイフンを 1 つ取って「カスタム項目 #2 自動二輪 - 項目名」「カスタム項目 #2 普通免許」に修正して

---

# gemini response

ご要望に合わせて、以下の修正を行いました。

1.  **一律代入の ON/OFF 切り替え機能**: スクリプトの冒頭に `USE_FIXED_VALUES` というフラグ変数を設けました。ここを `false` にすると、IDやIPアドレスなどの固定値は代入されず、ハイフン（`-`）になります。
2.  **TSVデータの文字列修正**: ご指定の「カスタム項目」部分の不要なハイフンを除去しました。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造・データ完全置換（ワイプ）スクリプト
 * ・固定値埋め込みのON/OFF切り替え機能付き
 * ・TSVデータ修正済み
 */
(function() {
    // =================================================================
    // ▼ 設定: 固定値（OID, 操作者, IP等）を一律代入するかどうか
    // true = 代入する / false = 代入しない（ハイフンにする）
    const USE_FIXED_VALUES = true;
    // =================================================================

    // --- ヘルパー関数: ダミーUUID生成 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // --- ヘルパー関数: ランダムな時刻生成 (日付は2026-01-13固定) ---
    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 1. テーブルとヘッダーの取得
    const table = document.querySelector('.log-table');
    if (!table) {
        console.error('テーブルが見つかりません (.log-table)');
        return;
    }
    const theadRow = table.querySelector('thead tr');
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }

    // --- (1) 既存コンテンツのワイプ ---
    tbody.innerHTML = '';

    // --- (2) ヘッダーの改造 ---
    const targetHeader = theadRow.children[6];
    
    // まだ分割されていない場合のみ実行
    if (targetHeader && targetHeader.innerText.includes('対象データのキー')) {
        targetHeader.innerText = '対象データ';
        const keyHeader = document.createElement('th');
        keyHeader.innerText = 'キー';
        keyHeader.scope = 'col';
        targetHeader.after(keyHeader);
    }

    // --- (3) 列幅の最適化 ---
    const newWidths = [
        "3%",  // 0: OID
        "5%",  // 1: ログID
        "7%",  // 2: 操作者
        "7%",  // 3: 日時
        "7%",  // 4: 適用開始日
        "5%",  // 5: 操作方法
        "15%", // 6: 対象データ
        "10%", // 7: キー
        "6%",  // 8: 操作したサービス
        "8%",  // 9: IPアドレス
        "4%",  // 10: 操作内容
        "23%"  // 11: 項目名
    ];

    const headers = theadRow.children;
    for (let i = 0; i < headers.length; i++) {
        if (newWidths[i]) headers[i].style.width = newWidths[i];
    }

    // --- (4) TSVデータの生成と追加 ---
    // ※指定通り「カスタム項目」のハイフンを修正済み
    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 - 基本情報 - 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい - 社会保険 - 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 - 基本情報 - 所属 #1 人事部 - 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 - 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ - カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 - 所在地 - 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const [dataTarget, dataKey, dataOp, dataItem] = cols;

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 12; i++) {
            let content = '';

            // 固定値代入がONの場合の値を定義
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 8: content = '人事管理'; break;
                    case 9: content = '111.98.254.197'; break;
                }
            } else {
                // OFFの場合は、TSVデータ以外の列はハイフンにする
                if ([0, 1, 2, 3, 4, 5, 8, 9].includes(i)) {
                    content = '-';
                }
            }

            // TSVデータ由来の列（設定に関わらず常に表示）
            if (i === 6) content = dataTarget || '';
            else if (i === 7) content = dataKey || '';
            else if (i === 10) content = dataOp || '';
            else if (i === 11) content = dataItem || '';

            // もしここまでの処理で content が空なら（OFF設定時のフォールバック用）
            if (content === '') content = '-';

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`テーブル更新完了 (固定値代入: ${USE_FIXED_VALUES ? 'ON' : 'OFF'})`);
})();
```

### 使い方のポイント

  * **固定値の切り替え**: コード最上部の `const USE_FIXED_VALUES = true;` を `false` に書き換えるだけで、OIDやIPアドレスなどが一斉に `-`（ハイフン）に切り替わります。
  * **データの修正**: ご指摘のあった「カスタム項目」のハイフン（`  - #2 ` → `#2`）は、コード内の `tsvData` 変数にて修正済みです。

---

# you asked

キー (xxxx-xxxx-... のやつ) と、# で始まるコード片 (#003-kacho、#office-002、#2 とか) を monospace フォントかつ背景色を付けた装飾できる？

---

# gemini response

可能です。
視認性を高めるため、以下の装飾を行う処理を追加しました。

1.  **スタイル定義**: コードっぽい見た目（背景色グレー、文字色ピンク、等幅フォント）の CSS を定数で用意。
2.  **キー列（列7）**: 値が入っている場合、全体をそのスタイルで囲む。
3.  **テキスト列（列6, 列11）**: 正規表現 `/(#[^\s]+)/g`（\#で始まり空白で終わる文字塊）を使って、該当部分だけを `<span>` タグでラップして置換。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造・データ完全置換・コード装飾付き
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = true; // 固定値代入のON/OFF

    // ▼ 装飾用スタイル (GitHubのコードブロック風)
    const CODE_STYLE = `
        font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
        background-color: #eff1f3;
        color: #d63384;
        padding: 0.1em 0.3em;
        border-radius: 3px;
        font-size: 0.9em;
        display: inline-block;
        border: 1px solid #e1e4e8;
    `.replace(/\s+/g, ' '); // 余分な空白を除去して1行にする
    // =================================================================

    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 文字列中の #xxx を装飾する関数
    function highlightCodes(text) {
        if (!text) return '';
        // #で始まり、空白または行末まで続く文字列を置換
        return text.replace(/(#[^\s]+)/g, `<span style="${CODE_STYLE}">$1</span>`);
    }

    // 1. テーブル操作の準備
    const table = document.querySelector('.log-table');
    if (!table) return console.error('テーブルが見つかりません');
    
    const theadRow = table.querySelector('thead tr');
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }

    // 既存コンテンツのワイプ
    tbody.innerHTML = '';

    // 2. ヘッダー改造
    const targetHeader = theadRow.children[6];
    if (targetHeader && targetHeader.innerText.includes('対象データのキー')) {
        targetHeader.innerText = '対象データ';
        const keyHeader = document.createElement('th');
        keyHeader.innerText = 'キー';
        keyHeader.scope = 'col';
        targetHeader.after(keyHeader);
    }

    // 3. 列幅の設定
    const newWidths = [
        "3%", "5%", "7%", "7%", "7%", "5%", 
        "15%", // 対象データ
        "10%", // キー
        "6%", "8%", "4%", 
        "23%"  // 項目名
    ];
    Array.from(theadRow.children).forEach((th, i) => {
        if (newWidths[i]) th.style.width = newWidths[i];
    });

    // 4. データ生成と挿入
    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 - 基本情報 - 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい - 社会保険 - 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 - 基本情報 - 所属 #1 人事部 - 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 - 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ - カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 - 所在地 - 都道府県
`.trim();

    tsvData.split('\n').forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const [dataTarget, dataKey, dataOp, dataItem] = cols;
        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 12; i++) {
            let content = '';

            // 固定値 or ハイフン
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 8: content = '人事管理'; break;
                    case 9: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 8, 9].includes(i)) content = '-';
            }

            // TSVデータのマッピング
            if (i === 6) content = dataTarget || '';
            else if (i === 7) content = dataKey || '';
            else if (i === 10) content = dataOp || '';
            else if (i === 11) content = dataItem || '';

            if (content === '') content = '-';

            // --- 装飾処理 ---
            
            // 6: 対象データ, 11: 項目名 -> 文中の #コード を装飾
            if (i === 6 || i === 11) {
                content = highlightCodes(content);
            }
            
            // 7: キー -> 値そのものを装飾 (ハイフン以外)
            if (i === 7 && content !== '-') {
                content = `<span style="${CODE_STYLE}">${content}</span>`;
            }

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`装飾付きでテーブル更新完了 (固定値: ${USE_FIXED_VALUES})`);
})();
```

### 変更のポイント

1.  **`highlightCodes` 関数の追加**: 正規表現 `/(#[^\s]+)/g` を使い、文章中の `#` で始まる単語（例: `#002`, `#office-002`）を見つけて、`<span>` で囲みます。
2.  **`CODE_STYLE` 定数**: GitHubやSlackのインラインコード風のスタイル（グレー背景、ピンク文字、等幅フォント）を定義し、該当箇所に適用しています。
3.  **キー列（i=7）の処理**: UUID全体にこのスタイルを適用しています。

---

# you asked

あれ、適用されてないな

---

# gemini response

申し訳ありません。スクリプトが正しく反映されなかった（あるいはエラーになった）可能性がありますね。

原因として、**インラインスタイル（HTMLタグの中に直接 `style="..."` を書く方法）がセキュリティ制限などでブロックされている**か、スクリプトの実行順序によって**要素の取得に失敗している**可能性が考えられます。

より確実な動作にするため、以下の改修を行いました。

1.  **CSSクラス方式に変更**: スタイルを直接タグに埋め込むのではなく、`<style>` ブロックを生成してページに追加するようにしました（より堅牢です）。
2.  **ヘッダー判定の強化**: すでにスクリプトを一度実行していても、正しく動作するように判定ロジックを整理しました。
3.  **TSVデータの修正**: ご指摘の「ハイフン削除」も確実に反映しています。

こちらを再度実行してみてください。

```javascript
/**
 * ログテーブル改造スクリプト（スタイル強化・再実行対応版）
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = true; // 固定値(OID, IP等)を入れるか
    
    // ▼ CSSクラスの定義（GitHub等のコードブロック風デザイン）
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3; /* 薄いグレー */
            color: #d63384; /* ピンク */
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
        }
        /* キー列はセル内で折り返さないようにする */
        .log-key-column {
            white-space: nowrap;
        }
    `;
    // =================================================================

    // 0. スタイルの注入（既存なら一度消して再作成）
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 文中の #コード を装飾する関数
    function highlightCodes(text) {
        if (!text) return '';
        // "#"で始まり、空白文字が来るまでの塊を装飾
        // 例: "#002" → <span>#002</span>
        return text.replace(/(#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }


    // 1. テーブル操作の準備
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    // 既存の tbody を取得、なければ作成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    
    // ★ ここで既存データを完全に消去（ワイプ）
    tbody.innerHTML = '';


    // 2. ヘッダーの改造（再実行時に二重に追加されないようチェック）
    const theadRow = table.querySelector('thead tr');
    // もしすでに12列あるなら、すでに改造済みとみなしてヘッダー追加はスキップ
    // （元の11列 + キー列1 = 12列）
    if (theadRow.children.length < 12) {
        // 「対象データのキー」列を探す
        const targetHeader = theadRow.children[6];
        if (targetHeader && targetHeader.innerText.includes('対象データ')) { // "対象データのキー" または "対象データ"
            targetHeader.innerText = '対象データ';
            
            // まだ「キー」ヘッダーがなければ追加
            if (!theadRow.children[7] || theadRow.children[7].innerText !== 'キー') {
                const keyHeader = document.createElement('th');
                keyHeader.innerText = 'キー';
                keyHeader.scope = 'col';
                targetHeader.after(keyHeader);
            }
        }
    }


    // 3. 列幅の設定 (再配分)
    const newWidths = [
        "3%",  // 0: OID
        "5%",  // 1: ログID
        "7%",  // 2: 操作者
        "7%",  // 3: 日時
        "7%",  // 4: 適用開始日
        "5%",  // 5: 操作方法
        "15%", // 6: 対象データ
        "10%", // 7: キー
        "6%",  // 8: サービス
        "8%",  // 9: IP
        "4%",  // 10: 操作内容
        "23%"  // 11: 項目名
    ];
    // ヘッダーが存在する限り幅を適用
    Array.from(theadRow.children).forEach((th, i) => {
        if (newWidths[i]) th.style.width = newWidths[i];
    });


    // 4. データの生成と挿入
    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 - 基本情報 - 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい - 社会保険 - 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 - 基本情報 - 所属 #1 人事部 - 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 - 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ - カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 - 所在地 - 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const [dataTarget, dataKey, dataOp, dataItem] = cols;

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 12; i++) {
            let content = '';

            // --- A. 固定値 or ハイフンの決定 ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 8: content = '人事管理'; break;
                    case 9: content = '111.98.254.197'; break;
                }
            } else {
                // 固定値OFFならこれらはハイフン
                if ([0, 1, 2, 3, 4, 5, 8, 9].includes(i)) content = '-';
            }

            // --- B. TSVデータのマッピング ---
            if (i === 6) content = dataTarget || '';
            else if (i === 7) content = dataKey || '';
            else if (i === 10) content = dataOp || '';
            else if (i === 11) content = dataItem || '';

            // 空ならハイフン
            if (content === '') content = '-';


            // --- C. 装飾処理 (highlight) ---
            
            // 列6(対象データ) と 列11(項目名): 文中の #コード を装飾
            if (i === 6 || i === 11) {
                content = highlightCodes(content);
            }
            
            // 列7(キー): キー自体を装飾 (ハイフンでなければ)
            if (i === 7 && content !== '-') {
                // キー全体をコード装飾 + 折り返し禁止クラス
                content = `<span class="log-code-highlight log-key-column">${content}</span>`;
            }

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: コード装飾ON / 固定値${USE_FIXED_VALUES ? 'ON' : 'OFF'}`);
})();
```

### 主な修正点

1.  **`<style>` タグの自動注入**:
      * スクリプト内で `CUSTOM_CSS` を定義し、`<head>` に追加するようにしました。これにより、インラインスタイルが効かない環境でもデザインが適用されやすくなります。
2.  **TSVデータの修正**:
      * ご要望通り、カスタム項目の行から余分なハイフンを削除しました（`カスタム項目 #2 ...`）。
3.  **再実行時の安全性**:
      * `if (theadRow.children.length < 12)` というチェックを追加しました。これにより、**「スクリプトを2回実行したらヘッダーがおかしくなる」という問題を防止**しています。すでに列が増えている場合はヘッダー追加処理をスキップし、データの中身だけを入れ替えます。

---

# you asked

項目名のハイフンを > に置き換えて。あと#1 などの番号の前に > を追加で挿入して

---

# gemini response

ご要望（パンくずリスト風の表示）に合わせて、以下の2点を処理するロジックを追加しました。

1.  **ハイフンの置換**: `-` （スペース+ハイフン+スペース）を `>` に変換します。
      * ※単なる `-` をすべて置換すると、コード（`#003-kacho`）やUUIDが壊れるため、「前後にスペースがあるハイフン」を対象にしています。
2.  **`#` の前のセパレータ追加**: `  #数字 ` （スペース+シャープ+数字）のパターンの前に `>` を挿入します。

### 修正版スクリプト

これを実行すると、項目名や対象データが `基本情報 > 所在地 > 都道府県` や `カスタム項目 > #2 普通免許` のように整形されます。

```javascript
/**
 * ログテーブル改造・パンくずリスト整形・コード装飾版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = true; // 固定値(OID, IP等)を入れるか
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
        }
        .log-key-column {
            white-space: nowrap;
        }
        /* パンくずの「>」を目立たなくする */
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // ★ パンくず整形処理 (ハイフン置換 & #前のセパレータ追加)
    function formatBreadcrumbs(text) {
        if (!text) return '';
        let formatted = text;

        // 1. " - " を " > " に置換 (コード内のハイフンは無視するため前後のスペースを条件にする)
        formatted = formatted.replace(/ - /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');

        // 2. " #数字" の前に " > " を挿入
        // 正規表現: (スペース)(#)(数字) -> (スペース)> (スペース)(#)(数字)
        formatted = formatted.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');

        return formatted;
    }

    // コード装飾処理
    function highlightCodes(text) {
        if (!text) return '';
        // "#"で始まり、空白文字が来るまでの塊を装飾
        return text.replace(/(#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }


    // 1. テーブル取得 & ワイプ
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = ''; // 既存行の削除


    // 2. ヘッダー改造
    const theadRow = table.querySelector('thead tr');
    if (theadRow.children.length < 12) {
        const targetHeader = theadRow.children[6];
        if (targetHeader && targetHeader.innerText.includes('対象データ')) {
            targetHeader.innerText = '対象データ';
            if (!theadRow.children[7] || theadRow.children[7].innerText !== 'キー') {
                const keyHeader = document.createElement('th');
                keyHeader.innerText = 'キー';
                keyHeader.scope = 'col';
                targetHeader.after(keyHeader);
            }
        }
    }


    // 3. 列幅の設定
    const newWidths = [
        "3%", "5%", "7%", "7%", "7%", "5%", 
        "15%", // 対象データ
        "10%", // キー
        "6%", "8%", "4%", 
        "23%"  // 項目名
    ];
    Array.from(theadRow.children).forEach((th, i) => {
        if (newWidths[i]) th.style.width = newWidths[i];
    });


    // 4. データ生成と挿入
    // ※「カスタム項目」のハイフンは除去済みのデータを使用
    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 - 基本情報 - 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい - 社会保険 - 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 - 基本情報 - 所属 #1 人事部 - 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 - 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ - カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 - 所在地 - 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const [dataTarget, dataKey, dataOp, dataItem] = cols;
        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 12; i++) {
            let content = '';

            // --- 固定値 ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 8: content = '人事管理'; break;
                    case 9: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 8, 9].includes(i)) content = '-';
            }

            // --- マッピング ---
            if (i === 6) content = dataTarget || '';
            else if (i === 7) content = dataKey || '';
            else if (i === 10) content = dataOp || '';
            else if (i === 11) content = dataItem || '';

            if (content === '') content = '-';


            // --- 整形と装飾 ---
            
            // 列6(対象データ) & 列11(項目名)
            if (i === 6 || i === 11) {
                // 1. パンくず整形 ( - を > に、 #の前に > を)
                content = formatBreadcrumbs(content);
                // 2. コード装飾 (#xxx をハイライト)
                content = highlightCodes(content);
            }
            
            // 列7(キー)
            if (i === 7 && content !== '-') {
                content = `<span class="log-code-highlight log-key-column">${content}</span>`;
            }

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: パンくずリスト整形適用`);
})();
```

### 追加した主なロジック

`formatBreadcrumbs` 関数を追加し、以下の順序でテキストを加工しています。

1.  `text.replace(/ - /g, ...)`:
      * 前後にスペースがあるハイフンのみを `>` に置換します。これにより、`#003-kacho` のようなコード内のハイフンは守られます。
2.  `text.replace(/\s(#\d)/g, ...)`:
      * スペースの後に `#` と数字が続く箇所（例: `  #1 `, `  #002 `）を見つけ、その前に `>` を挿入します。

結果として、以下のような表示になります。

  * `本人情報 > 基本情報 > 所属 > #1 人事部 > 組織名`
  * `カスタム項目 > #2 自動二輪 > 項目名`

---

# you asked

対象データを 3 つの列に分解して。左から [マスタ] [対象データのコード] [対象データの名前] として

---

# gemini response

ご要望の通り、「対象データ」列を\*\*[マスタ]・[対象データのコード]・[対象データの名前]\*\*の3列に分割・展開するスクリプトを作成しました。

これまでの機能（固定値代入、UUID生成、コード装飾、項目名のパンくずリスト化）は維持したまま、列構成を全14列に再構築します。

### 実行結果のイメージ

元の文字列: `従業員 #002 倒捨 ゆい`
↓

  * **マスタ**: `従業員`
  * **対象データのコード**: `#002` (グレー背景で装飾)
  * **対象データの名前**: `倒捨 ゆい`

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: 対象データ3分割・コード装飾・パンくずリスト対応版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = true; // 固定値(OID, IP等)を入れるか
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
            white-space: nowrap;
        }
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        /* テーブル全体のフォントサイズを少し調整 */
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 文字列分解ロジック: "マスタ #コード 名前"
    function parseTargetDataString(text) {
        if (!text) return { master: '-', code: '-', name: '-' };
        
        // 正規表現: (冒頭の文字) (スペース) (#から始まるコード) (スペース) (残りすべて)
        const match = text.match(/^(.+?)\s+(#[^\s]+)(?:\s+(.+))?$/);
        
        if (match) {
            return {
                master: match[1] || '-',
                code: match[2] || '-',
                name: match[3] || '-' // 名前がない場合もあるため
            };
        }
        // マッチしない場合（コードがない場合など）はそのままマスタに入れる
        return { master: text, code: '-', name: '-' };
    }

    // パンくず整形 (項目名用)
    function formatBreadcrumbs(text) {
        if (!text) return '';
        let formatted = text;
        formatted = formatted.replace(/ - /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
        formatted = formatted.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
        return formatted;
    }

    // コード装飾 (#xxx をハイライト)
    function highlightCodes(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }


    // 1. テーブル取得 & ワイプ
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';


    // 2. ヘッダー改造 (対象データ列を3つに分割 + キー列追加)
    const theadRow = table.querySelector('thead tr');
    
    // 現在の列数を確認（再実行対策）
    // 最終的に14列になる想定 (元11 - 1(対象データ) + 3(分解) + 1(キー) = 14)
    if (theadRow.children.length < 14) {
        // 現在の「対象データ」または「対象データのキー」列を取得 (インデックス 6)
        const targetHeader = theadRow.children[6];
        
        if (targetHeader) {
            // インデックス6 を「マスタ」に変更
            targetHeader.innerText = 'マスタ';
            
            // 新しいヘッダーを作成
            const thCode = document.createElement('th');
            thCode.innerText = '対象データのコード';
            thCode.scope = 'col';

            const thName = document.createElement('th');
            thName.innerText = '対象データの名前';
            thName.scope = 'col';

            const thKey = document.createElement('th'); // UUID用
            thKey.innerText = 'キー';
            thKey.scope = 'col';

            // 挿入順序: マスタ(6) -> コード -> 名前 -> キー -> サービス(元7) ...
            targetHeader.after(thCode, thName, thKey);
        }
    }


    // 3. 列幅の設定 (全14列用に再配分)
    const newWidths = [
        "3%",  // 0: OID
        "5%",  // 1: ログID
        "6%",  // 2: 操作者
        "6%",  // 3: 日時
        "6%",  // 4: 適用開始日
        "4%",  // 5: 操作方法
        "6%",  // 6: [新] マスタ
        "7%",  // 7: [新] 対象データのコード
        "9%",  // 8: [新] 対象データの名前
        "7%",  // 9: [新] キー
        "5%",  // 10: サービス
        "7%",  // 11: IP
        "4%",  // 12: 操作内容
        "25%"  // 13: 項目名
    ];
    Array.from(theadRow.children).forEach((th, i) => {
        if (newWidths[i]) th.style.width = newWidths[i];
    });


    // 4. データ生成と挿入
    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 - 基本情報 - 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい - 社会保険 - 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 - 基本情報 - 所属 #1 人事部 - 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 - 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ - カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 - 所在地 - 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        // TSV解析
        const rawTarget = cols[0]; // 分解前
        const rawKey    = cols[1];
        const rawOp     = cols[2];
        const rawItem   = cols[3];

        // 対象データ列を3つに分解
        const { master, code, name } = parseTargetDataString(rawTarget);

        const tr = document.createElement('tr');
        let html = '';

        // 全14列を構築
        for (let i = 0; i < 14; i++) {
            let content = '';

            // --- A. 固定値 or ハイフン ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    // 6,7,8,9 はデータ依存
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                    // 12,13 はデータ依存
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. データマッピング ---
            if (i === 6) content = master;
            else if (i === 7) content = code;
            else if (i === 8) content = name;
            else if (i === 9) content = rawKey || ''; // キー
            else if (i === 12) content = rawOp || ''; // 操作内容
            else if (i === 13) content = rawItem || ''; // 項目名

            if (content === '') content = '-';


            // --- C. 装飾処理 ---
            
            // 列7: 対象データのコード (#xxx を装飾)
            if (i === 7) {
                content = highlightCodes(content);
            }

            // 列9: キー (UUID全体を装飾)
            if (i === 9 && content !== '-') {
                content = `<span class="log-code-highlight">${content}</span>`;
            }

            // 列13: 項目名 (パンくず整形 + コード装飾)
            if (i === 13) {
                content = formatBreadcrumbs(content);
                content = highlightCodes(content);
            }

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`完了: 対象データを3列(マスタ/コード/名前)に分割しました。`);
})();
```

### 変更点

1.  **文字列分解 (`parseTargetDataString`)**:
      * `従業員 #002 倒捨 ゆい` といった文字列を正規表現で解析し、`master`（従業員）、`code`（\#002）、`name`（倒捨 ゆい）の3パーツに分けています。
2.  **列構成の変更 (全14列)**:
      * **列6**: マスタ
      * **列7**: 対象データのコード（`log-code-highlight` クラスで装飾）
      * **列8**: 対象データの名前
      * 以降、列番号をずらして対応しています。
3.  **列幅 (`newWidths`)**:
      * 列が増えたため、項目名の幅などを少し調整して、全体が収まるように再配分しました。

---

# you asked

(1) ヘッダ行に列が 1 つ余分。「キー」が 2 つあるけど、1 つでよい
(2) TSV の元データからそもそもハイフンを > に置き換えて。

---

# gemini response

ご指摘ありがとうございます。
以下の2点を修正したスクリプトを作成しました。

1.  **ヘッダの重複修正**: スクリプトを再実行した際などに「キー」列が残ってしまい、新しく追加された「キー」と重複する問題を解消しました（既存の「キー」列があれば削除してから列追加を行います）。
2.  **TSVデータの修正**: ソースデータ（`tsvData` 変数）の段階で、区切り文字のハイフン（`-`）をあらかじめ `>` に置き換えました。これにより、スクリプト内での置換処理をシンプルにしています。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: 対象データ3分割・重複キー修正・データ定義修正版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = true; // 固定値(OID, IP等)を入れるか
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
            white-space: nowrap;
        }
        /* パンくずの「>」の色調整 */
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 文字列分解ロジック: "マスタ #コード 名前"
    function parseTargetDataString(text) {
        if (!text) return { master: '-', code: '-', name: '-' };
        const match = text.match(/^(.+?)\s+(#[^\s]+)(?:\s+(.+))?$/);
        if (match) {
            return {
                master: match[1] || '-',
                code: match[2] || '-',
                name: match[3] || '-'
            };
        }
        return { master: text, code: '-', name: '-' };
    }

    // コード装飾
    function highlightCodes(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }

    // #数字 の前に > を入れる (TSVですでに > になっているので、#の処理だけ残す)
    function formatHashes(text) {
        if (!text) return '';
        // " #数字" の前に " > " を挿入
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得 & ワイプ
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';


    // 2. ヘッダー改造 (対象データ列を3つに分割 + キー列追加)
    const theadRow = table.querySelector('thead tr');
    
    // 対象データ列 (インデックス6) を取得
    const targetHeader = theadRow.children[6];
    
    // ★修正: 前回のスクリプト実行で追加された「キー」列(インデックス7)が残っていたら削除する
    // これで「キー」が2つになるのを防ぎます
    const nextHeader = theadRow.children[7];
    if (nextHeader && nextHeader.innerText === 'キー') {
        nextHeader.remove();
    }

    // ヘッダー分割処理（まだ分割されていない場合のみ）
    // 通常の11列 + 追加3列 = 14列になっていなければ実行
    if (theadRow.children.length < 14 && targetHeader) {
        targetHeader.innerText = 'マスタ';
        
        const thCode = document.createElement('th');
        thCode.innerText = '対象データのコード';
        thCode.scope = 'col';

        const thName = document.createElement('th');
        thName.innerText = '対象データの名前';
        thName.scope = 'col';

        const thKey = document.createElement('th');
        thKey.innerText = 'キー';
        thKey.scope = 'col';

        targetHeader.after(thCode, thName, thKey);
    }


    // 3. 列幅の設定 (全14列)
    const newWidths = [
        "3%", "5%", "6%", "6%", "6%", "4%", 
        "6%",  // マスタ
        "7%",  // コード
        "9%",  // 名前
        "7%",  // キー
        "5%", "7%", "4%", 
        "25%"  // 項目名
    ];
    Array.from(theadRow.children).forEach((th, i) => {
        if (newWidths[i]) th.style.width = newWidths[i];
    });


    // 4. データ生成と挿入
    // ★修正: TSVデータ内の「 - 」を「 > 」に置き換え済み
    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const rawTarget = cols[0];
        const rawKey    = cols[1];
        const rawOp     = cols[2];
        const rawItem   = cols[3];

        const { master, code, name } = parseTargetDataString(rawTarget);

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';

            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            if (i === 6) content = master;
            else if (i === 7) content = code;
            else if (i === 8) content = name;
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';


            // --- 装飾処理 ---
            
            // 列7: コード
            if (i === 7) content = highlightCodes(content);

            // 列9: キー
            if (i === 9 && content !== '-') content = `<span class="log-code-highlight">${content}</span>`;

            // 列13: 項目名 (TSVの > はそのまま表示しつつ、#の前のセパレータ挿入などは実行)
            if (i === 13) {
                // すでにTSV上で > になっているので、これをspanで装飾する置換
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                // #数字 の前の処理
                content = formatHashes(content);
                // コード装飾
                content = highlightCodes(content);
            }

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: ヘッダ重複修正・TSVデータ修正反映済み`);
})();
```

---

# you asked

(1) が直ってない。元のテーブルの構造がこうだったことを思い出して、コードを修正して

<table class="table table-hover log-table" style="table-layout: fixed; width: 100%; min-width: 1600px">
   <thead>
      <tr>
         <th scope="col" style="width: 4%">OID</th>
         <th scope="col" style="width: 10%">ログID</th>
         <th scope="col" style="width: 10%">操作者</th>
         <th scope="col" style="width: 7%">日時</th>
         <th scope="col" style="width: 7%">適用開始日</th>
         <th scope="col" style="width: 7%">操作方法</th>
         <th scope="col" style="width: 10%">対象データのキー</th>
         <th scope="col" style="width: 10%">操作したサービス</th>
         <th scope="col" style="width: 10%">IPアドレス</th>
         <th scope="col" style="width: 10%">操作内容・処理内容</th>
         <th scope="col" style="width: 15%">項目名</th>
      </tr>
   </thead>

---

# gemini response

大変失礼いたしました。
元のテーブル構造（全11列）において、「対象データのキー」列（インデックス6）がある状態からスタートすることを前提に、**ヘッダー行を完全に作り直す**ことで、「列が重複する」「変な列が残る」という問題を根本から解決します。

このスクリプトは、現在のヘッダーがどんな状態であれ、**強制的に指定の「全14列」の構成に書き換えます**。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: ヘッダー完全再構築・データ3分割・TSV修正版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = true; // 固定値(OID, IP等)を入れるか
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
            white-space: nowrap;
        }
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 文字列分解ロジック
    function parseTargetDataString(text) {
        if (!text) return { master: '-', code: '-', name: '-' };
        const match = text.match(/^(.+?)\s+(#[^\s]+)(?:\s+(.+))?$/);
        if (match) {
            return {
                master: match[1] || '-',
                code: match[2] || '-',
                name: match[3] || '-'
            };
        }
        return { master: text, code: '-', name: '-' };
    }

    // コード装飾
    function highlightCodes(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }

    // #数字 の前に > を入れる
    function formatHashes(text) {
        if (!text) return '';
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    // 2. ヘッダーの完全再構築
    // 以前の状態に依存せず、常に正しい14列のHTMLで上書きします
    const thead = table.querySelector('thead');
    thead.innerHTML = `
      <tr>
         <th scope="col" style="width: 3%">OID</th>
         <th scope="col" style="width: 5%">ログID</th>
         <th scope="col" style="width: 6%">操作者</th>
         <th scope="col" style="width: 6%">日時</th>
         <th scope="col" style="width: 6%">適用開始日</th>
         <th scope="col" style="width: 4%">操作方法</th>
         
         <th scope="col" style="width: 6%">マスタ</th>
         <th scope="col" style="width: 7%">対象データのコード</th>
         <th scope="col" style="width: 9%">対象データの名前</th>
         <th scope="col" style="width: 7%">キー</th>
         
         <th scope="col" style="width: 5%">操作したサービス</th>
         <th scope="col" style="width: 7%">IPアドレス</th>
         <th scope="col" style="width: 4%">操作内容・処理内容</th>
         <th scope="col" style="width: 25%">項目名</th>
      </tr>
    `;


    // 3. データ行のクリアと生成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = ''; // ワイプ

    // ★TSVデータ (区切り文字の " - " を " > " に置換済み)
    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const rawTarget = cols[0];
        const rawKey    = cols[1];
        const rawOp     = cols[2];
        const rawItem   = cols[3];

        const { master, code, name } = parseTargetDataString(rawTarget);

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';

            // --- A. 固定値 or ハイフン ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. データマッピング ---
            if (i === 6) content = master;
            else if (i === 7) content = code;
            else if (i === 8) content = name;
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';


            // --- C. 装飾処理 ---
            
            // 列7: コード (#xxx)
            if (i === 7) content = highlightCodes(content);

            // 列9: キー (UUID)
            if (i === 9 && content !== '-') content = `<span class="log-code-highlight">${content}</span>`;

            // 列13: 項目名
            if (i === 13) {
                // > を装飾
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                // #数字 の前の処理
                content = formatHashes(content);
                // コード装飾
                content = highlightCodes(content);
            }

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: ヘッダ再構築済み (全14列)`);
})();
```

---

# you asked

#組織3' 事務事務部について、#組織3' までがひとつ、事務事務部でひとつなので、修正して

---

# gemini response

承知いたしました。
`#組織 3'` のように、コードの中にスペースが含まれる特殊なケースに対応できるよう、分解ロジック（正規表現）を調整しました。

具体的には、**「`#組織 3'` という並びはひと固まりのコードとして扱う」** というルールを優先的に適用するようにしています。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: ヘッダー再構築・データ3分割・特殊コード対応版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = true; // 固定値(OID, IP等)を入れるか
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
            white-space: nowrap;
        }
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // ★修正: 文字列分解ロジック
    // 「#組織 3'」のようなスペースを含む特殊コードに対応
    function parseTargetDataString(text) {
        if (!text) return { master: '-', code: '-', name: '-' };
        
        // 正規表現の解説:
        // ^(.+?)\s+             -> 先頭からスペース直前までを「マスタ」とする
        // (#組織 3'|#[^\s]+)   -> 【ここを修正】「#組織 3'」または「#空白なし」を「コード」とする
        // (?:\s+(.+))?$         -> 残りがあれば「名前」とする
        const match = text.match(/^(.+?)\s+(#組織 3'|#[^\s]+)(?:\s+(.+))?$/);
        
        if (match) {
            return {
                master: match[1] || '-',
                code: match[2] || '-',
                name: match[3] || '-'
            };
        }
        return { master: text, code: '-', name: '-' };
    }

    // コード装飾 (#で始まる部分をハイライト)
    function highlightCodes(text) {
        if (!text || text === '-') return text;
        // 単純な #xxx だけでなく、今回の #組織 3' もハイライトできるよう対応
        // #から始まり、(スペースを含まない OR 'で終わる) 文字列にマッチ
        return text.replace(/(#組織 3'|#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }

    // #数字 の前に > を入れる
    function formatHashes(text) {
        if (!text) return '';
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    // 2. ヘッダーの完全再構築
    const thead = table.querySelector('thead');
    thead.innerHTML = `
      <tr>
         <th scope="col" style="width: 3%">OID</th>
         <th scope="col" style="width: 5%">ログID</th>
         <th scope="col" style="width: 6%">操作者</th>
         <th scope="col" style="width: 6%">日時</th>
         <th scope="col" style="width: 6%">適用開始日</th>
         <th scope="col" style="width: 4%">操作方法</th>
         
         <th scope="col" style="width: 6%">マスタ</th>
         <th scope="col" style="width: 7%">対象データのコード</th>
         <th scope="col" style="width: 9%">対象データの名前</th>
         <th scope="col" style="width: 7%">キー</th>
         
         <th scope="col" style="width: 5%">操作したサービス</th>
         <th scope="col" style="width: 7%">IPアドレス</th>
         <th scope="col" style="width: 4%">操作内容・処理内容</th>
         <th scope="col" style="width: 25%">項目名</th>
      </tr>
    `;


    // 3. データ行のクリアと生成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';

    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const rawTarget = cols[0];
        const rawKey    = cols[1];
        const rawOp     = cols[2];
        const rawItem   = cols[3];

        // 分解処理
        const { master, code, name } = parseTargetDataString(rawTarget);

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';

            // --- A. 固定値 ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. マッピング ---
            if (i === 6) content = master;
            else if (i === 7) content = code;
            else if (i === 8) content = name;
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';


            // --- C. 装飾 ---
            if (i === 7) content = highlightCodes(content);
            if (i === 9 && content !== '-') content = `<span class="log-code-highlight">${content}</span>`;
            if (i === 13) {
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                content = formatHashes(content);
                content = highlightCodes(content);
            }

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: #組織 3' の分割に対応しました。`);
})();
```

---

# you asked

(3) ヘッダを「キー」ではなく「対象データのキー」にして
(4) USE_FIXED_VALUES のデフォルトを false にして

---

# gemini response

ご指定の2点の変更（ヘッダ名の変更、固定値モードのデフォルトOFF）を反映したスクリプトです。

1.  **ヘッダー名の変更**: UUIDが入る列のヘッダーを「キー」から\*\*「対象データのキー」\*\*に戻しました。
2.  **設定変更**: `USE_FIXED_VALUES` を `false` に変更しました。これにより、デフォルトではOIDやIPアドレスなどがハイフン（`-`）表示になります。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: ヘッダー名修正・デフォルト設定変更版
 */
(function() {
    // =================================================================
    // ▼ 設定
    // false にしたため、デフォルトでは OID, IP, 日時などは「-」になります
    // true にすると、ダミーの固定値やランダムな日時が表示されます
    const USE_FIXED_VALUES = false; 
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
            white-space: nowrap;
        }
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 文字列分解ロジック
    function parseTargetDataString(text) {
        if (!text) return { master: '-', code: '-', name: '-' };
        // #組織 3' 対応
        const match = text.match(/^(.+?)\s+(#組織 3'|#[^\s]+)(?:\s+(.+))?$/);
        if (match) {
            return {
                master: match[1] || '-',
                code: match[2] || '-',
                name: match[3] || '-'
            };
        }
        return { master: text, code: '-', name: '-' };
    }

    // コード装飾
    function highlightCodes(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#組織 3'|#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }

    // #数字 の前に > を入れる
    function formatHashes(text) {
        if (!text) return '';
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    // 2. ヘッダーの完全再構築
    const thead = table.querySelector('thead');
    // ★修正: ヘッダー名を「キー」から「対象データのキー」に変更
    thead.innerHTML = `
      <tr>
         <th scope="col" style="width: 3%">OID</th>
         <th scope="col" style="width: 5%">ログID</th>
         <th scope="col" style="width: 6%">操作者</th>
         <th scope="col" style="width: 6%">日時</th>
         <th scope="col" style="width: 6%">適用開始日</th>
         <th scope="col" style="width: 4%">操作方法</th>
         
         <th scope="col" style="width: 6%">マスタ</th>
         <th scope="col" style="width: 7%">対象データのコード</th>
         <th scope="col" style="width: 9%">対象データの名前</th>
         <th scope="col" style="width: 7%">対象データのキー</th>
         
         <th scope="col" style="width: 5%">操作したサービス</th>
         <th scope="col" style="width: 7%">IPアドレス</th>
         <th scope="col" style="width: 4%">操作内容・処理内容</th>
         <th scope="col" style="width: 25%">項目名</th>
      </tr>
    `;


    // 3. データ行のクリアと生成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';

    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const rawTarget = cols[0];
        const rawKey    = cols[1];
        const rawOp     = cols[2];
        const rawItem   = cols[3];

        const { master, code, name } = parseTargetDataString(rawTarget);

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';

            // --- A. 固定値 or ハイフン ---
            // ★ USE_FIXED_VALUES が false なので、基本ここは else 側が実行されます
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. データマッピング ---
            if (i === 6) content = master;
            else if (i === 7) content = code;
            else if (i === 8) content = name;
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';


            // --- C. 装飾 ---
            if (i === 7) content = highlightCodes(content);
            if (i === 9 && content !== '-') content = `<span class="log-code-highlight">${content}</span>`;
            if (i === 13) {
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                content = formatHashes(content);
                content = highlightCodes(content);
            }

            html += `<td>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: ヘッダー修正 / 固定値OFF`);
})();
```

---

# you asked

列の幅をハードコードせず、動的に最適化するようにして

---

# gemini response

承知いたしました。
これまでは `width: 5%` のように幅を固定していましたが、これを撤廃し、**ブラウザの自動レイアウト（`table-layout: auto`）** に任せるように変更します。

ただし、単純に自動にすると、日付やUUIDなどの「改行してほしくない列」まで潰れてしまうことがあるため、以下の戦略で最適化します。

1.  **`table-layout: fixed` を解除**: コンテンツ量に応じて伸縮するようにします。
2.  **改行禁止クラス (`white-space: nowrap`) の適用**: ID、日時、コード、IPアドレスなどの列に適用し、必要な幅を確保させます。
3.  **改行許可**: 「項目名」や「対象データの名前」など、長くなる列のみ改行を許可し、余ったスペースをそこに割り当てます。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: 列幅動的最適化 (Auto Layout) 版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = false; 
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        /* コード装飾 */
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
        }
        /* パンくずセパレータ */
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        /* テーブル全体の基本調整 */
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
            padding: 8px 10px; /* 余白を少し調整 */
        }
        /* 【重要】改行させない列用のクラス (日付、ID、コード等) */
        .cell-nowrap {
            white-space: nowrap;
            width: 1%; /* コンテンツ幅に合わせるための極小指定トリック */
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 文字列分解ロジック
    function parseTargetDataString(text) {
        if (!text) return { master: '-', code: '-', name: '-' };
        const match = text.match(/^(.+?)\s+(#組織 3'|#[^\s]+)(?:\s+(.+))?$/);
        if (match) {
            return {
                master: match[1] || '-',
                code: match[2] || '-',
                name: match[3] || '-'
            };
        }
        return { master: text, code: '-', name: '-' };
    }

    // コード装飾
    function highlightCodes(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#組織 3'|#[^\s]+)/g, '<span class="log-code-highlight cell-nowrap">$1</span>');
    }

    // #数字 の前に > を入れる
    function formatHashes(text) {
        if (!text) return '';
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得 & スタイルリセット
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    // ★ここで table-layout: fixed を解除し、auto に変更
    table.style.tableLayout = 'auto';
    // 必要に応じて幅指定も解除（コンテンツ依存にするため）
    // table.style.width = 'auto'; // 親要素いっぱいに広げたい場合はコメントアウトのままでOK


    // 2. ヘッダーの完全再構築
    // ★ style="width: xx%" をすべて削除しました
    // ★ 改行したくない列には class="cell-nowrap" を付与
    const thead = table.querySelector('thead');
    thead.innerHTML = `
      <tr>
         <th scope="col" class="cell-nowrap">OID</th>
         <th scope="col" class="cell-nowrap">ログID</th>
         <th scope="col" class="cell-nowrap">操作者</th>
         <th scope="col" class="cell-nowrap">日時</th>
         <th scope="col" class="cell-nowrap">適用開始日</th>
         <th scope="col" class="cell-nowrap">操作方法</th>
         
         <th scope="col" class="cell-nowrap">マスタ</th>
         <th scope="col" class="cell-nowrap">対象データのコード</th>
         <th scope="col">対象データの名前</th> <th scope="col" class="cell-nowrap">対象データのキー</th>
         
         <th scope="col" class="cell-nowrap">操作したサービス</th>
         <th scope="col" class="cell-nowrap">IPアドレス</th>
         <th scope="col" class="cell-nowrap">操作内容・処理内容</th>
         <th scope="col">項目名</th> </tr>
    `;


    // 3. データ行のクリアと生成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';

    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const rawTarget = cols[0];
        const rawKey    = cols[1];
        const rawOp     = cols[2];
        const rawItem   = cols[3];

        const { master, code, name } = parseTargetDataString(rawTarget);

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';
            
            // --- A. 固定値 or ハイフン ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. マッピング ---
            if (i === 6) content = master;
            else if (i === 7) content = code;
            else if (i === 8) content = name;
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';

            // --- C. 装飾とクラス付与 ---
            // 改行させたくない列にクラスを追加
            let cellClass = '';

            // 改行禁止列: 
            // 0:OID, 1:LogID, 3:日時, 4:適用日, 5:方法, 
            // 6:マスタ(短いので), 7:コード, 9:キー, 
            // 10:サービス, 11:IP, 12:操作内容
            if ([0, 1, 3, 4, 5, 6, 7, 9, 10, 11, 12].includes(i)) {
                cellClass = 'class="cell-nowrap"';
            }
            // 操作者(2)、名前(8)、項目名(13) はクラスなし（改行許可）

            
            // コンテンツ装飾
            if (i === 7) content = highlightCodes(content);
            if (i === 9 && content !== '-') content = `<span class="log-code-highlight">${content}</span>`;
            if (i === 13) {
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                content = formatHashes(content);
                content = highlightCodes(content);
            }

            html += `<td ${cellClass}>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: 列幅動的最適化 (Auto Layout)`);
})();
```

### ポイント

  * **`table.style.tableLayout = 'auto'`**: 従来の固定レイアウトを解除しました。
  * **`.cell-nowrap` クラス**: 「OID」「日付」「キー（UUID）」「コード」などの**改行されると困る列**にこのクラスを適用しました。CSSで `white-space: nowrap` を指定しているため、コンテンツの長さに合わせて自動で最小幅が確保されます。
  * **改行許可列**: 「対象データの名前」や「項目名」にはこのクラスをつけていません。そのため、ウィンドウ幅が狭い場合はこれらの列が自動的に折り返され、他の重要な列（UUIDなど）の表示領域を守ります。

---

# you asked

いい感じだけど、コードの強調表示が崩れちゃった。直して

---

# gemini response

ご報告ありがとうございます。画像を確認しました。
コードを強調表示しているグレーのボックスの左端に、意図しない縦線のようなものが表示され、表示が崩れてしまっていますね。

これは、強調表示用の CSS クラス `.log-code-highlight` に指定していた `white-space: nowrap;`（改行禁止）が、親要素のセル設定と競合して描画の不具合を引き起こしている可能性が高いです。

「対象データのコード」列自体はすでに改行禁止の設定になっているため、強調表示のスタイルからはこの指定を削除して、表示を修正します。

### 修正版スクリプト

CSS定義の `.log-code-highlight` から `white-space: nowrap;` を削除しました。

```javascript
/**
 * ログテーブル改造: 表示崩れ修正版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = false; 
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        /* コード装飾 */
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
            /* white-space: nowrap; を削除しました */
        }
        /* パンくずセパレータ */
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        /* テーブル全体の基本調整 */
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
            padding: 8px 10px;
        }
        /* 【重要】改行させない列用のクラス */
        .cell-nowrap {
            white-space: nowrap;
            width: 1%;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // 文字列分解ロジック
    function parseTargetDataString(text) {
        if (!text) return { master: '-', code: '-', name: '-' };
        const match = text.match(/^(.+?)\s+(#組織 3'|#[^\s]+)(?:\s+(.+))?$/);
        if (match) {
            return {
                master: match[1] || '-',
                code: match[2] || '-',
                name: match[3] || '-'
            };
        }
        return { master: text, code: '-', name: '-' };
    }

    // コード装飾
    function highlightCodes(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#組織 3'|#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }

    // #数字 の前に > を入れる
    function formatHashes(text) {
        if (!text) return '';
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得 & スタイルリセット
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    table.style.tableLayout = 'auto';


    // 2. ヘッダーの完全再構築
    const thead = table.querySelector('thead');
    thead.innerHTML = `
      <tr>
         <th scope="col" class="cell-nowrap">OID</th>
         <th scope="col" class="cell-nowrap">ログID</th>
         <th scope="col" class="cell-nowrap">操作者</th>
         <th scope="col" class="cell-nowrap">日時</th>
         <th scope="col" class="cell-nowrap">適用開始日</th>
         <th scope="col" class="cell-nowrap">操作方法</th>
         
         <th scope="col" class="cell-nowrap">マスタ</th>
         <th scope="col" class="cell-nowrap">対象データのコード</th>
         <th scope="col">対象データの名前</th>
         <th scope="col" class="cell-nowrap">対象データのキー</th>
         
         <th scope="col" class="cell-nowrap">操作したサービス</th>
         <th scope="col" class="cell-nowrap">IPアドレス</th>
         <th scope="col" class="cell-nowrap">操作内容・処理内容</th>
         <th scope="col">項目名</th>
      </tr>
    `;


    // 3. データ行のクリアと生成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';

    const tsvData = `
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職 #003-kacho 課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員 #005 倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員 #002 倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織 #組織 3' 事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種 #002-hiring 採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職 #004-bucho 部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員 #006 ◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ #2 運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ #3 貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所 #office-002 大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const rawTarget = cols[0];
        const rawKey    = cols[1];
        const rawOp     = cols[2];
        const rawItem   = cols[3];

        const { master, code, name } = parseTargetDataString(rawTarget);

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';
            
            // --- A. 固定値 or ハイフン ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. マッピング ---
            if (i === 6) content = master;
            else if (i === 7) content = code;
            else if (i === 8) content = name;
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';

            // --- C. 装飾とクラス付与 ---
            let cellClass = '';

            // 改行禁止列
            if ([0, 1, 3, 4, 5, 6, 7, 9, 10, 11, 12].includes(i)) {
                cellClass = 'class="cell-nowrap"';
            }

            // コンテンツ装飾
            if (i === 7) content = highlightCodes(content);
            if (i === 9 && content !== '-') content = `<span class="log-code-highlight">${content}</span>`;
            if (i === 13) {
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                content = formatHashes(content);
                content = highlightCodes(content);
            }

            html += `<td ${cellClass}>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: 表示崩れ修正済み`);
})();
```

---

# you asked

const tsvData = `
従業員\t#002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職\t#003-kacho\t課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員\t#005\t倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員\t#002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織\t#組織 3'\t事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種\t#002-hiring\t採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職\t#004-bucho\t部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員\t#006\t◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t#2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t#2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ\t#2\t運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ\t#3\t貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所\t#office-002\t大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

この TSV を前提にコードを修正して

---

# gemini response

TSV データ自体がすでに「マスタ」「コード」「名前」に分割されている形になったのですね。
それに伴い、スクリプト内の\*\*「文字列分解ロジック（`parseTargetDataString`）」を廃止\*\*し、TSV の列をそのまま各セルに割り当てるように修正しました。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: TSV完全分割版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = false; 
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        /* コード装飾 */
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
            /* 改行禁止はセル側で制御するため削除済み */
        }
        /* パンくずセパレータ */
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        /* テーブル全体の基本調整 */
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
            padding: 8px 10px;
        }
        /* 【重要】改行させない列用のクラス */
        .cell-nowrap {
            white-space: nowrap;
            width: 1%;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // コード装飾
    function highlightCodes(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#組織 3'|#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }

    // #数字 の前に > を入れる
    function formatHashes(text) {
        if (!text) return '';
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得 & スタイルリセット
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    table.style.tableLayout = 'auto';


    // 2. ヘッダーの完全再構築
    const thead = table.querySelector('thead');
    thead.innerHTML = `
      <tr>
         <th scope="col" class="cell-nowrap">OID</th>
         <th scope="col" class="cell-nowrap">ログID</th>
         <th scope="col" class="cell-nowrap">操作者</th>
         <th scope="col" class="cell-nowrap">日時</th>
         <th scope="col" class="cell-nowrap">適用開始日</th>
         <th scope="col" class="cell-nowrap">操作方法</th>
         
         <th scope="col" class="cell-nowrap">マスタ</th>
         <th scope="col" class="cell-nowrap">対象データのコード</th>
         <th scope="col">対象データの名前</th>
         <th scope="col" class="cell-nowrap">対象データのキー</th>
         
         <th scope="col" class="cell-nowrap">操作したサービス</th>
         <th scope="col" class="cell-nowrap">IPアドレス</th>
         <th scope="col" class="cell-nowrap">操作内容・処理内容</th>
         <th scope="col">項目名</th>
      </tr>
    `;


    // 3. データ行のクリアと生成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';

    // ★ 新しい形式のTSVデータ (6列構成)
    const tsvData = `
従業員\t#002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職\t#003-kacho\t課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員\t#005\t倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員\t#002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織\t#組織 3'\t事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種\t#002-hiring\t採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職\t#004-bucho\t部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員\t#006\t◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t#2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t#2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ\t#2\t運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ\t#3\t貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所\t#office-002\t大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        // ★ TSVデータのカラム割り当て変更
        // [0]マスタ, [1]コード, [2]名前, [3]キー, [4]操作, [5]項目名
        const [master, code, name, rawKey, rawOp, rawItem] = cols;

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';
            
            // --- A. 固定値 or ハイフン ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. マッピング (分解ロジック廃止、直接代入) ---
            if (i === 6) content = master || '';
            else if (i === 7) content = code || '';
            else if (i === 8) content = name || '';
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';

            // --- C. 装飾とクラス付与 ---
            let cellClass = '';

            // 改行禁止列
            if ([0, 1, 3, 4, 5, 6, 7, 9, 10, 11, 12].includes(i)) {
                cellClass = 'class="cell-nowrap"';
            }

            // コンテンツ装飾
            if (i === 7) content = highlightCodes(content); // コード
            if (i === 9 && content !== '-') content = `<span class="log-code-highlight">${content}</span>`; // キー
            if (i === 13) { // 項目名
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                content = formatHashes(content);
                content = highlightCodes(content);
            }

            html += `<td ${cellClass}>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: TSV直接マップ版`);
})();
```

---

# you asked

列名もシンプルに「マスタ」「ユーザー定義の ID」「ユーザー定義の名前」に変更で

---

# gemini response

ご要望に合わせて、ヘッダーの項目名を\*\*「マスタ」「ユーザー定義の ID」「ユーザー定義の名前」\*\*に変更しました。

その他の機能（動的列幅、コード装飾、パンくずリスト整形など）はそのまま維持しています。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: ヘッダー名シンプル化版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = false; 
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        /* コード装飾 */
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
        }
        /* パンくずセパレータ */
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        /* テーブル全体の基本調整 */
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
            padding: 8px 10px;
        }
        /* 改行させない列用のクラス */
        .cell-nowrap {
            white-space: nowrap;
            width: 1%;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // コード装飾
    function highlightCodes(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#組織 3'|#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }

    // #数字 の前に > を入れる
    function formatHashes(text) {
        if (!text) return '';
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得 & スタイルリセット
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    table.style.tableLayout = 'auto';


    // 2. ヘッダーの完全再構築
    const thead = table.querySelector('thead');
    // ★ ここでヘッダー名を変更しました
    thead.innerHTML = `
      <tr>
         <th scope="col" class="cell-nowrap">OID</th>
         <th scope="col" class="cell-nowrap">ログID</th>
         <th scope="col" class="cell-nowrap">操作者</th>
         <th scope="col" class="cell-nowrap">日時</th>
         <th scope="col" class="cell-nowrap">適用開始日</th>
         <th scope="col" class="cell-nowrap">操作方法</th>
         
         <th scope="col" class="cell-nowrap">マスタ</th>
         <th scope="col" class="cell-nowrap">ユーザー定義の ID</th>
         <th scope="col">ユーザー定義の名前</th>
         <th scope="col" class="cell-nowrap">対象データのキー</th>
         
         <th scope="col" class="cell-nowrap">操作したサービス</th>
         <th scope="col" class="cell-nowrap">IPアドレス</th>
         <th scope="col" class="cell-nowrap">操作内容・処理内容</th>
         <th scope="col">項目名</th>
      </tr>
    `;


    // 3. データ行のクリアと生成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';

    const tsvData = `
従業員\t#002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職\t#003-kacho\t課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員\t#005\t倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員\t#002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織\t#組織 3'\t事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種\t#002-hiring\t採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職\t#004-bucho\t部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員\t#006\t◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t#2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t#2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ\t#2\t運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ\t#3\t貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所\t#office-002\t大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        // TSVデータのカラム割り当て
        const [master, code, name, rawKey, rawOp, rawItem] = cols;

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';
            
            // --- A. 固定値 or ハイフン ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. マッピング ---
            if (i === 6) content = master || '';
            else if (i === 7) content = code || '';
            else if (i === 8) content = name || '';
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';

            // --- C. 装飾とクラス付与 ---
            let cellClass = '';

            // 改行禁止列
            if ([0, 1, 3, 4, 5, 6, 7, 9, 10, 11, 12].includes(i)) {
                cellClass = 'class="cell-nowrap"';
            }

            // コンテンツ装飾
            if (i === 7) content = highlightCodes(content);
            if (i === 9 && content !== '-') content = `<span class="log-code-highlight">${content}</span>`;
            if (i === 13) {
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                content = formatHashes(content);
                content = highlightCodes(content);
            }

            html += `<td ${cellClass}>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: ヘッダー名変更版`);
})();
```

---

# you asked

ユーザー定義の ID から # を消して。つまり、もとの TSV から削除してしまって

---

# gemini response

TSVデータ（`tsvData`変数）から「ユーザー定義のID」列に含まれる `#` をすべて削除し、それに合わせてスクリプトの装飾ロジックを修正しました。

主な変更点：

1.  **TSVデータの修正**: 2列目のデータから `#` を除去しました（例: `#002` → `002`）。
2.  **装飾ロジックの変更**: これまでは `#` を目印に装飾していましたが、ID列（7列目）に関しては「値があれば無条件で装飾スタイル（グレー背景）」を適用するように変更しました。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: IDの「#」削除＆直接装飾版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = false; 
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        /* コード装飾 */
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
        }
        /* パンくずセパレータ */
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        /* テーブル全体の基本調整 */
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
            padding: 8px 10px;
        }
        /* 改行させない列用のクラス */
        .cell-nowrap {
            white-space: nowrap;
            width: 1%;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // コード装飾 (項目名の中にある #xxx 用)
    function highlightCodesInText(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#組織 3'|#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }

    // #数字 の前に > を入れる
    function formatHashes(text) {
        if (!text) return '';
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得 & スタイルリセット
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    table.style.tableLayout = 'auto';


    // 2. ヘッダーの完全再構築
    const thead = table.querySelector('thead');
    thead.innerHTML = `
      <tr>
         <th scope="col" class="cell-nowrap">OID</th>
         <th scope="col" class="cell-nowrap">ログID</th>
         <th scope="col" class="cell-nowrap">操作者</th>
         <th scope="col" class="cell-nowrap">日時</th>
         <th scope="col" class="cell-nowrap">適用開始日</th>
         <th scope="col" class="cell-nowrap">操作方法</th>
         
         <th scope="col" class="cell-nowrap">マスタ</th>
         <th scope="col" class="cell-nowrap">ユーザー定義の ID</th>
         <th scope="col">ユーザー定義の名前</th>
         <th scope="col" class="cell-nowrap">対象データのキー</th>
         
         <th scope="col" class="cell-nowrap">操作したサービス</th>
         <th scope="col" class="cell-nowrap">IPアドレス</th>
         <th scope="col" class="cell-nowrap">操作内容・処理内容</th>
         <th scope="col">項目名</th>
      </tr>
    `;


    // 3. データ行のクリアと生成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';

    // ★ TSVデータ: 2列目のIDから「#」を削除しました
    const tsvData = `
従業員\t002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職\t003-kacho\t課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員\t005\t倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員\t002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織\t組織 3'\t事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種\t002-hiring\t採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職\t004-bucho\t部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員\t006\t◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ\t2\t運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ\t3\t貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所\toffice-002\t大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        // [0]マスタ, [1]ID(今回#除去済み), [2]名前, [3]キー, [4]操作, [5]項目名
        const [master, code, name, rawKey, rawOp, rawItem] = cols;

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';
            
            // --- A. 固定値 or ハイフン ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. マッピング ---
            if (i === 6) content = master || '';
            else if (i === 7) content = code || '';
            else if (i === 8) content = name || '';
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';

            // --- C. 装飾とクラス付与 ---
            let cellClass = '';

            // 改行禁止列
            if ([0, 1, 3, 4, 5, 6, 7, 9, 10, 11, 12].includes(i)) {
                cellClass = 'class="cell-nowrap"';
            }

            // コンテンツ装飾
            // 7列目(ID): #が無いので、正規表現を使わず直接spanで囲む
            if (i === 7 && content !== '-') {
                content = `<span class="log-code-highlight">${content}</span>`;
            }

            // 9列目(キー): そのまま装飾
            if (i === 9 && content !== '-') {
                content = `<span class="log-code-highlight">${content}</span>`;
            }

            // 13列目(項目名): ここは文章中の #xxx を装飾したいので従来の関数を使う
            if (i === 13) {
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                content = formatHashes(content);
                content = highlightCodesInText(content);
            }

            html += `<td ${cellClass}>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: IDの#削除版`);
})();
```

---

# you asked

ユーザー定義の ID → コード
ユーザー定義の名前 → 名前
対象データのキー → キー

と、それぞれヘッダラベルを変更して

---

# gemini response

ヘッダのラベルをご指定の通りシンプルに変更しました。

  * ユーザー定義の ID → **コード**
  * ユーザー定義の名前 → **名前**
  * 対象データのキー → **キー**

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: ヘッダーラベル変更版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = false; 
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        /* コード装飾 */
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
        }
        /* パンくずセパレータ */
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        /* テーブル全体の基本調整 */
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
            padding: 8px 10px;
        }
        /* 改行させない列用のクラス */
        .cell-nowrap {
            white-space: nowrap;
            width: 1%;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // コード装飾 (項目名の中にある #xxx 用)
    function highlightCodesInText(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#組織 3'|#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }

    // #数字 の前に > を入れる
    function formatHashes(text) {
        if (!text) return '';
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得 & スタイルリセット
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    table.style.tableLayout = 'auto';


    // 2. ヘッダーの完全再構築
    const thead = table.querySelector('thead');
    // ★ ここでヘッダーラベルを変更しました
    thead.innerHTML = `
      <tr>
         <th scope="col" class="cell-nowrap">OID</th>
         <th scope="col" class="cell-nowrap">ログID</th>
         <th scope="col" class="cell-nowrap">操作者</th>
         <th scope="col" class="cell-nowrap">日時</th>
         <th scope="col" class="cell-nowrap">適用開始日</th>
         <th scope="col" class="cell-nowrap">操作方法</th>
         
         <th scope="col" class="cell-nowrap">マスタ</th>
         <th scope="col" class="cell-nowrap">コード</th>
         <th scope="col">名前</th>
         <th scope="col" class="cell-nowrap">キー</th>
         
         <th scope="col" class="cell-nowrap">操作したサービス</th>
         <th scope="col" class="cell-nowrap">IPアドレス</th>
         <th scope="col" class="cell-nowrap">操作内容・処理内容</th>
         <th scope="col">項目名</th>
      </tr>
    `;


    // 3. データ行のクリアと生成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';

    const tsvData = `
従業員\t002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員-従業員番号
役職\t003-kacho\t課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員\t005\t倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員\t002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織\t組織 3'\t事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種\t002-hiring\t採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職\t004-bucho\t部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員\t006\t◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ\t2\t運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ\t3\t貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所\toffice-002\t大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const [master, code, name, rawKey, rawOp, rawItem] = cols;

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';
            
            // --- A. 固定値 or ハイフン ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. マッピング ---
            if (i === 6) content = master || '';
            else if (i === 7) content = code || '';
            else if (i === 8) content = name || '';
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';

            // --- C. 装飾とクラス付与 ---
            let cellClass = '';

            if ([0, 1, 3, 4, 5, 6, 7, 9, 10, 11, 12].includes(i)) {
                cellClass = 'class="cell-nowrap"';
            }

            // 7: コード
            if (i === 7 && content !== '-') {
                content = `<span class="log-code-highlight">${content}</span>`;
            }

            // 9: キー
            if (i === 9 && content !== '-') {
                content = `<span class="log-code-highlight">${content}</span>`;
            }

            // 13: 項目名
            if (i === 13) {
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                content = formatHashes(content);
                content = highlightCodesInText(content);
            }

            html += `<td ${cellClass}>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: ヘッダーラベル変更`);
})();
```

---

# you asked

TSV の 従業員-従業員番号 これは、正しくは 従業員 > 従業員番号 だな。修正して

---

# gemini response

ご指摘ありがとうございます。TSVデータ内の「従業員-従業員番号」を「従業員 \> 従業員番号」に修正しました。

この修正により、スクリプトのパンくずリスト整形ロジック（`>` をセパレータに変換する処理）が適用され、表示上も `従業員 > 従業員番号` と綺麗に区切られるようになります。

### 修正版スクリプト

```javascript
/**
 * ログテーブル改造: TSVデータ修正版
 */
(function() {
    // =================================================================
    // ▼ 設定
    const USE_FIXED_VALUES = false; 
    
    // ▼ CSSクラスの定義
    const STYLE_ID = 'log-table-custom-style';
    const CUSTOM_CSS = `
        /* コード装飾 */
        .log-code-highlight {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: #eff1f3;
            color: #d63384;
            padding: 0.1em 0.3em;
            border-radius: 3px;
            font-size: 0.9em;
            border: 1px solid #e1e4e8;
            display: inline-block;
            line-height: 1.2;
            margin: 0 1px;
        }
        /* パンくずセパレータ */
        .log-breadcrumb-sep {
            color: #999;
            font-weight: bold;
            margin: 0 0.3em;
        }
        /* テーブル全体の基本調整 */
        .log-table td, .log-table th {
            font-size: 13px;
            vertical-align: middle;
            padding: 8px 10px;
        }
        /* 改行させない列用のクラス */
        .cell-nowrap {
            white-space: nowrap;
            width: 1%;
        }
    `;
    
    // 0. スタイルの注入
    let styleTag = document.getElementById(STYLE_ID);
    if (styleTag) styleTag.remove();
    styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    styleTag.textContent = CUSTOM_CSS;
    document.head.appendChild(styleTag);


    // --- ヘルパー関数 ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomDateTime() {
        const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        return `2026-01-13 ${h}:${m}:${s}`;
    }

    // コード装飾 (項目名の中にある #xxx 用)
    function highlightCodesInText(text) {
        if (!text || text === '-') return text;
        return text.replace(/(#組織 3'|#[^\s]+)/g, '<span class="log-code-highlight">$1</span>');
    }

    // #数字 の前に > を入れる
    function formatHashes(text) {
        if (!text) return '';
        return text.replace(/\s(#\d)/g, ' <span class="log-breadcrumb-sep">&gt;</span> $1');
    }


    // 1. テーブル取得 & スタイルリセット
    const table = document.querySelector('.log-table');
    if (!table) return console.error('エラー: .log-table が見つかりません');

    table.style.tableLayout = 'auto';


    // 2. ヘッダーの完全再構築
    const thead = table.querySelector('thead');
    thead.innerHTML = `
      <tr>
         <th scope="col" class="cell-nowrap">OID</th>
         <th scope="col" class="cell-nowrap">ログID</th>
         <th scope="col" class="cell-nowrap">操作者</th>
         <th scope="col" class="cell-nowrap">日時</th>
         <th scope="col" class="cell-nowrap">適用開始日</th>
         <th scope="col" class="cell-nowrap">操作方法</th>
         
         <th scope="col" class="cell-nowrap">マスタ</th>
         <th scope="col" class="cell-nowrap">コード</th>
         <th scope="col">名前</th>
         <th scope="col" class="cell-nowrap">キー</th>
         
         <th scope="col" class="cell-nowrap">操作したサービス</th>
         <th scope="col" class="cell-nowrap">IPアドレス</th>
         <th scope="col" class="cell-nowrap">操作内容・処理内容</th>
         <th scope="col">項目名</th>
      </tr>
    `;


    // 3. データ行のクリアと生成
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    tbody.innerHTML = '';

    // ★ 修正箇所: 1行目の末尾 「従業員-従業員番号」→「従業員 > 従業員番号」
    const tsvData = `
従業員\t002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t変更\t本人情報 > 基本情報 > 従業員 > 従業員番号
役職\t003-kacho\t課長\txxxx-xxxx-xxxx-xxxx\t追加\t役職コード
従業員\t005\t倒捨 ろい\txxxx-xxxx-xxxx-xxxx\t変更\t家族情報 #1 倒捨 ろいのい > 社会保険 > 被扶養者になった日
従業員\t002\t倒捨 ゆい\txxxx-xxxx-xxxx-xxxx\t追加\t本人情報 > 基本情報 > 所属 #1 人事部 > 組織名
組織\t組織 3'\t事務事務部\txxxx-xxxx-xxxx-xxxx\t変更\t組織コード
職種\t002-hiring\t採用\txxxx-xxxx-xxxx-xxxx\t変更\t職種名
役職\t004-bucho\t部長\txxxx-xxxx-xxxx-xxxx\t削除\t
従業員\t006\t◯山 ◯太\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\t
カスタムカテゴリ\t2\t運転免許\txxxx-xxxx-xxxx-xxxx\t削除\tカスタム項目 #2 普通免許
カスタムカテゴリ\t2\t運転免許\txxxx-xxxx-xxxx-xxxx\t変更\tカスタム項目 #2 自動二輪 > 項目名
カスタムカテゴリ\t3\t貸与制服\txxxx-xxxx-xxxx-xxxx\t変更\tカスタムカテゴリ > カテゴリ名
事業所\toffice-002\t大阪\txxxx-xxxx-xxxx-xxxx\t追加\t基本情報 > 所在地 > 都道府県
`.trim();

    const lines = tsvData.split('\n');

    lines.forEach(line => {
        const cols = line.split('\t');
        if (cols.length < 2) return;

        const [master, code, name, rawKey, rawOp, rawItem] = cols;

        const tr = document.createElement('tr');
        let html = '';

        for (let i = 0; i < 14; i++) {
            let content = '';
            
            // --- A. 固定値 or ハイフン ---
            if (USE_FIXED_VALUES) {
                switch (i) {
                    case 0: content = '101243'; break;
                    case 1: content = generateUUID(); break;
                    case 2: content = '1252597 01992c55-dd10-7fc3-a2ad-6c780107e8de 001 倒捨 るうと'; break;
                    case 3: content = getRandomDateTime(); break;
                    case 4: content = '2026-01-13'; break;
                    case 5: content = '********'; break;
                    case 10: content = '人事管理'; break;
                    case 11: content = '111.98.254.197'; break;
                }
            } else {
                if ([0, 1, 2, 3, 4, 5, 10, 11].includes(i)) content = '-';
            }

            // --- B. マッピング ---
            if (i === 6) content = master || '';
            else if (i === 7) content = code || '';
            else if (i === 8) content = name || '';
            else if (i === 9) content = rawKey || '';
            else if (i === 12) content = rawOp || '';
            else if (i === 13) content = rawItem || '';

            if (content === '') content = '-';

            // --- C. 装飾とクラス付与 ---
            let cellClass = '';

            if ([0, 1, 3, 4, 5, 6, 7, 9, 10, 11, 12].includes(i)) {
                cellClass = 'class="cell-nowrap"';
            }

            // 7: コード
            if (i === 7 && content !== '-') {
                content = `<span class="log-code-highlight">${content}</span>`;
            }

            // 9: キー
            if (i === 9 && content !== '-') {
                content = `<span class="log-code-highlight">${content}</span>`;
            }

            // 13: 項目名
            if (i === 13) {
                content = content.replace(/ > /g, ' <span class="log-breadcrumb-sep">&gt;</span> ');
                content = formatHashes(content);
                content = highlightCodesInText(content);
            }

            html += `<td ${cellClass}>${content}</td>`;
        }
        
        tr.innerHTML = html;
        tbody.appendChild(tr);
    });

    console.log(`ログテーブル更新完了: TSVデータ修正版`);
})();
```