抽出済みトピックを「与えた入力」×「期待する出力」の2軸で分類する。

## 入力

`$ARGUMENTS` は workspace ディレクトリのパス（`workspace/topics/` と `workspace/stats.json` を含む）。

## フレームワーク定義

分類に使う定義は `2026-03-02-gemini-analytics-tool/framework.md` を参照すること。必ず読み込んでから分類を開始する。

### 軸1: 与えた入力（`input_richness`）

| 値 | 判定基準 |
|:--|:--|
| `material` | AI が直接処理できる構造化された情報（コード、図、画像、データ）を渡した |
| `contextualized` | 背景説明や形式指定はあるが、構造化された素材は渡していない |
| `bare` | 質問文のみ。背景も素材も形式指定もない |

### 軸2: 期待する出力（`expected_output`）

| 値 | 判定基準 |
|:--|:--|
| `artifact` | そのまま使える成果物（コード、仕様書、文書、画像）を期待した |
| `understanding` | 対話を重ねて知識を深める・設計を検討することを期待した |
| `fact` | 単発の事実・用語・手順を期待した（1-2回で完結） |

**重要**: `expected_output` はユーザーがプロンプトを投げた時点での期待であり、AI が実際にそれを返せたかどうかは問わない。

### インパクトレベル（`impact`）— 機械的に導出

| | 成果物 | 理解 | 事実 |
|:--|:--|:--|:--|
| 素材あり | `co_creation` | `co_creation` | `lookup` |
| 文脈あり | `co_creation` | `exploration` | `lookup` |
| 質問だけ | `trial` | `exploration` | `lookup` |

### スレッド衛生（`thread_contaminated`）

stats.json の `source_file` でグルーピングし、同一セッションに3トピック以上あれば `true`。

## タスク

1. `workspace/stats.json` を読み込む
2. `workspace/topics/` 内の全 .md ファイルを読む
3. 各トピックについて:
   a. ユーザーの発言内容を読む
   b. `input_richness` を判定する
   c. `expected_output` を判定する
   d. `impact` をマトリクスから機械的に導出する
   e. `thread_contaminated` を source_file のグルーピングから導出する
4. 全件の分類が完了したら、集計を計算する（summary, cross_table, avg_query_count）

## 出力

`workspace/classification.json` を出力する。スキーマは `2026-03-02-gemini-analytics-tool/data-schema.md` の §2 を参照。

## 注意事項

- 大量のトピックがある場合はサブエージェントで並列分類する（50件ずつ等）
- 判定に迷う場合は、framework.md の「該当するもの」「該当しないもの」の例を参考にする
