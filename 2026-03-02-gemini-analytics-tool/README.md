# AI チャット利用分析ツール

AI との会話ログを定量分析し、利用パターンを可視化する Claude Code スラッシュコマンド + ダッシュボード。

## 何をするか

AI チャット（Gemini、ChatGPT 等）の会話ログを:

1. **トピックに分割** — 1つのスレッド内の複数の話題を個別に切り出す
2. **2軸で分類** — 「与えた入力」×「期待する出力」で各トピックを分類
3. **可視化** — クロス集計・バブルチャート・スレッド衛生分析をダッシュボードで表示

## 前提

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) がインストールされていること
- このリポジトリをクローンし、リポジトリルートで Claude Code を開くこと

## 使い方

### 1. 会話ログを用意する

AI チャットの会話ログを Markdown ファイルとしてエクスポートする。1ファイル = 1セッション（スレッド）。

Gemini の場合は Google Takeout などでエクスポートした会話を、セッションごとに `.md` ファイルに分割する。形式は以下の通り:

```markdown
# you asked

ユーザーの質問

---

# gemini response

AIの応答

---

# you asked

次の質問...
```

### 2. ログを配置する

```bash
workspace/
├── session-1.md
├── session-2.md
└── ...
```

エクスポートした `.md` ファイルを `workspace/` ディレクトリに配置する。

### 3. トピックを抽出する

Claude Code で以下を実行:

```
/extract-topics workspace
```

各セッションファイルを読み込み、話題の切り替わりを検出してトピック単位に分割する。

出力:
- `workspace/topics/` — トピックごとの `.md` ファイル（`001_トピック名.md`, `002_...`, ...）
- `workspace/stats.json` — セッション・トピック・クエリ数の基本統計

### 4. トピックを分類する

```
/classify-topics workspace
```

各トピックの内容を読み、[フレームワーク](framework.md)に基づいて2軸（与えた入力 × 期待する出力）で分類する。インパクトレベルとスレッド衛生は自動導出される。

出力:
- `workspace/classification.json` — 全トピックの分類結果 + クロス集計 + サマリー

### 5. ダッシュボードを生成する

```
/build-dashboard workspace
```

ダッシュボードのテンプレート HTML をコピーし、分類結果からデータ JS ファイルを生成する。

出力:
- `workspace/dashboard/` — ダッシュボード一式（HTML + CSS + データ JS）

### 6. ダッシュボードを閲覧する

```bash
cd workspace && npx serve .
```

ブラウザで http://localhost:3000/dashboard/definitions.html を開く。

4つのタブ:
- **定義** — 分類の判断基準リファレンス
- **クロス集計** — バブルチャート + インパクトレベル構成
- **スレッド衛生** — セッション規模マップ + パレート図
- **生データ** — 全トピック一覧（クリックで会話内容を表示）

## 分析フレームワーク

詳細は [framework.md](framework.md) を参照。

**軸1: 与えた入力** — AI にどれだけ材料を渡したか

| 値 | 意味 |
|:--|:--|
| 素材あり | コード・設計図・画像など構造化データを渡した |
| 文脈あり | 背景説明や形式指定はあるが構造化素材は無し |
| 質問だけ | 質問文のみ |

**軸2: 期待する出力** — AI からどんな成果を期待したか

| 値 | 意味 |
|:--|:--|
| 成果物 | そのまま使えるコード・仕様書・文書 |
| 理解 | 対話で知識を深める・設計を検討 |
| 事実 | 単発の事実・用語・手順 |

**インパクトレベル** — 2軸から機械的に導出

|  | 成果物 | 理解 | 事実 |
|:--|:--|:--|:--|
| 素材あり | **共創** | **共創** | 検索 |
| 文脈あり | **共創** | 探索 | 検索 |
| 質問だけ | 試行 | 探索 | 検索 |

**スレッド衛生** — 1スレッドに3トピック以上混在 → 汚染（入出力の質とは独立した指標）

## ファイル構成

```
.
├── README.md              ← このファイル
├── framework.md           ← 方法論の定義
├── data-schema.md         ← データ形式の仕様
├── .claude/commands/      ← Claude Code スラッシュコマンド
│   ├── extract-topics.md
│   ├── classify-topics.md
│   └── build-dashboard.md
├── commands/              ← コマンド本体（.claude/commands/ からリンク）
│   ├── extract-topics.md
│   ├── classify-topics.md
│   └── build-dashboard.md
├── dashboard/             ← ダッシュボードテンプレート（HTML + CSS のみ）
│   ├── common.css
│   ├── definitions.html
│   ├── crosstab.html
│   ├── hygiene.html
│   └── rawdata.html
└── workspace/             ← 作業ディレクトリ（ここに会話ログを置く）
    └── .gitkeep
```

## データスキーマ

各コマンドの入出力フォーマットの詳細は [data-schema.md](data-schema.md) を参照。
