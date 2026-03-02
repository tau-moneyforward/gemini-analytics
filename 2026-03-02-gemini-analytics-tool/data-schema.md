# データスキーマ

各コマンドが入出力するデータの形式を定義する。

---

## 1. stats.json（`/extract-topics` の出力）

トピック抽出の結果。セッション・トピック・クエリの基本情報を格納する。

```jsonc
{
  "metadata": {
    "generated_at": "2026-02-27",        // 生成日
    "total_source_files": 123,           // セッション（会話スレッド）数
    "total_topics": 295,                 // 独立トピック数
    "total_queries": 664                 // ユーザー発言の総数
  },
  "topics": [
    {
      "id": 1,                           // 連番
      "topic": "挨拶（こんにちは）",       // トピック名（最初の発言から要約）
      "source_file": "_元のファイル名.md", // 抽出元のセッションファイル名
      "query_count": 1                   // このトピック内のユーザー発言数
    }
  ]
}
```

---

## 2. classification.json（`/classify-topics` の出力）

2 軸分類の結果。stats.json のトピック ID に対応する分類と、集計済みメタデータを格納する。

```jsonc
{
  "metadata": {
    "axes": {
      "input_richness": {
        "label": "与えた入力",
        "values": {
          "material": "素材あり: ...",
          "contextualized": "文脈あり: ...",
          "bare": "質問だけ: ..."
        }
      },
      "expected_output": {
        "label": "期待する出力",
        "values": {
          "artifact": "成果物: ...",
          "understanding": "理解: ...",
          "fact": "事実: ..."
        }
      },
      "impact": {
        "label": "インパクトレベル",
        "values": {
          "co_creation": "共創: ...",
          "exploration": "探索: ...",
          "lookup": "検索: ...",
          "trial": "試行: ..."
        },
        "matrix": {
          "material|artifact": "co_creation",
          "material|understanding": "co_creation",
          "material|fact": "lookup",
          "contextualized|artifact": "co_creation",
          "contextualized|understanding": "exploration",
          "contextualized|fact": "lookup",
          "bare|artifact": "trial",
          "bare|understanding": "exploration",
          "bare|fact": "lookup"
        }
      }
    },
    "thread_hygiene": {
      "total_sessions": 123,
      "clean_sessions": 104,             // 1-2 トピック/セッション
      "contaminated_sessions": 19,       // 3+ トピック/セッション
      "clean_topic_count": 118,
      "contaminated_topic_count": 177
    },
    "total_topics": 295,
    "summary": {
      "input_richness": { "bare": 142, "contextualized": 78, "material": 75 },
      "expected_output": { "fact": 133, "understanding": 90, "artifact": 72 },
      "impact": { "lookup": 133, "exploration": 63, "co_creation": 85, "trial": 14 }
    },
    "cross_table": {                     // input_richness → expected_output → count
      "material": { "artifact": 41, "understanding": 27, "fact": 7 },
      "contextualized": { "artifact": 17, "understanding": 31, "fact": 30 },
      "bare": { "artifact": 14, "understanding": 32, "fact": 96 }
    },
    "avg_query_count": {                 // input_richness → expected_output → avg
      "material": { "artifact": 3.0, "understanding": 3.9, "fact": 1.7 },
      "contextualized": { "artifact": 2.0, "understanding": 3.2, "fact": 1.5 },
      "bare": { "artifact": 2.1, "understanding": 3.2, "fact": 1.4 }
    }
  },
  "topics": [
    {
      "id": 1,                           // stats.json の id に対応
      "input_richness": "bare",          // material | contextualized | bare
      "expected_output": "fact",         // artifact | understanding | fact
      "impact": "lookup",               // co_creation | exploration | lookup | trial
      "thread_contaminated": false       // true if session has 3+ topics
    }
  ]
}
```

---

## 3. ダッシュボード用 JS ファイル（`/build-dashboard` の出力）

### data-v3.js

`window.__STATS_16__` にclassification.json の全内容を格納。加えて `window.__EXAMPLES__` に具体例、`window.__HYGIENE__` にセッション一覧を格納する。

```js
window.__STATS_16__ = { /* classification.json の内容そのまま */ };

window.__EXAMPLES__ = {
  input_richness: {
    material: [{ id: 5, topic: "CSSでitemContentsの幅を80%に変更" }, ...],
    contextualized: [...],
    bare: [...]
  },
  expected_output: {
    artifact: [...],
    understanding: [...],
    fact: [...]
  }
};

window.__HYGIENE__ = {
  sessions: [
    { title: "セッション名", topic_count: 27, query_count: 57 },
    ...
  ]
};
```

### topics-list.js

`window.__TOPICS_LIST__` に全トピックの一覧を格納。生データ画面で使用。

```js
window.__TOPICS_LIST__ = [
  {
    "id": 1,
    "title": "挨拶（こんにちは）",
    "session": "こんにちは、何かお手伝いしましょうか",  // source_file から導出
    "input_richness": "bare",
    "expected_output": "fact",
    "query_count": 1,
    "session_topic_count": 1                           // 同一セッション内のトピック数
  }
];
```

### topic-filenames.js

`window.__TOPIC_FILES__` にトピック ID → ファイル名のマッピングを格納。会話モーダルで使用。

```js
window.__TOPIC_FILES__ = {
  "1": "001_挨拶（こんにちは）.md",
  "2": "002_CSVにおけるテキストデータの型とダブルクォーテーションの意味.md",
  ...
};
```

---

## 4. トピックファイル（`topics/NNN_トピック名.md`）

各トピックは以下の Markdown 形式:

```markdown
> From: https://gemini.google.com/app/xxxxx

# you asked

ユーザーの質問テキスト

---

# gemini response

AI の応答テキスト

---

# you asked

（複数ターンの場合、繰り返し）

---

# gemini response

...
```
