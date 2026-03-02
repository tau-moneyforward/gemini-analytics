分類結果からダッシュボードを生成する。

## 入力

`$ARGUMENTS` は workspace ディレクトリのパス（`workspace/classification.json`, `workspace/stats.json`, `workspace/topics/` を含む）。

## タスク

### 1. ダッシュボードテンプレートをコピー

`2026-03-02-gemini-analytics-tool/dashboard/` 内の HTML と CSS を `workspace/dashboard/` にコピーする。

### 2. data-v3.js を生成

`workspace/classification.json` と `workspace/stats.json` を読み込み、以下の3つのグローバル変数を含む JS ファイルを生成する。

```js
window.__STATS_16__ = { /* classification.json の内容 + topic_query_counts マッピング */ };
window.__EXAMPLES__ = { /* 各軸の値ごとに代表的なトピック例を最大4件 */ };
window.__HYGIENE__ = { sessions: [ /* セッションごとの topic_count, query_count */ ] };
```

`__STATS_16__` には classification.json の内容をそのまま入れ、加えて `metadata.topic_query_counts` として `{ "1": 1, "2": 1, "3": 2, ... }` のようにトピックID→クエリ数のマッピングを追加する（stats.json から取得）。

`__EXAMPLES__` は各 input_richness / expected_output の値ごとに、該当するトピックから最大4件を `{ id, topic }` の形で抽出する。

`__HYGIENE__` は stats.json の source_file でグルーピングし、各セッションの `{ title, topic_count, query_count }` を配列にする。title は source_file から先頭の `_` と末尾の ` .md` を除去して生成する。

### 3. topics-list.js を生成

stats.json と classification.json をマージし、全トピックの一覧を含む JS ファイルを生成する。

```js
window.__TOPICS_LIST__ = [
  {
    "id": 1,
    "title": "トピック名",           // stats.json の topic
    "session": "セッション名",       // source_file から導出
    "input_richness": "bare",        // classification.json から
    "expected_output": "fact",
    "query_count": 1,                // stats.json から
    "session_topic_count": 1         // 同一 source_file のトピック数
  }
];
```

### 4. topic-filenames.js を生成

トピック ID とファイル名のマッピングを生成する。

```js
window.__TOPIC_FILES__ = {
  "1": "001_挨拶（こんにちは）.md",
  ...
};
```

ファイル名は `workspace/topics/` ディレクトリを実際に読んで取得する。

## 出力

```
workspace/dashboard/
├── common.css              (テンプレートからコピー)
├── definitions.html        (テンプレートからコピー)
├── crosstab.html           (テンプレートからコピー)
├── hygiene.html            (テンプレートからコピー)
├── rawdata.html            (テンプレートからコピー)
├── data-v3.js              (生成)
├── topics-list.js          (生成)
└── topic-filenames.js      (生成)
```

## 確認

生成後、`workspace/dashboard/` を HTTP サーバーで起動してダッシュボードが正常に表示されることを確認する:

```bash
cd workspace && npx serve .
```

ブラウザで `http://localhost:3000/dashboard/definitions.html` を開く。

## 注意事項

- スキーマの詳細は `2026-03-02-gemini-analytics-tool/data-schema.md` を参照
- 参考実装: `../2026-02-27-gemini-usage/dashboard/` 内の data-v3.js, topics-list.js, topic-filenames.js
