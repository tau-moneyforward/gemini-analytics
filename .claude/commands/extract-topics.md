AI チャットの会話ログからトピックを抽出する。

## 入力

`$ARGUMENTS` は workspace ディレクトリのパス。会話ログ .md ファイルは `$ARGUMENTS/sessions/` に格納されている。

## タスク

1. 指定ディレクトリ内の `sessions/` の全 .md ファイルを読み込む
2. 各ファイルは1つの「セッション（会話スレッド）」に対応する
3. ファイル内の `# you asked` と `# gemini response` の区切りでトピック（独立した話題）を特定する
4. 1ファイル内に複数のトピックが混在している場合は、話題の切り替わりを検出して分割する。判定基準:
   - 前の話題と明らかに無関係な質問が始まった場合 → 新しいトピック
   - 前の回答を受けた追加質問の場合 → 同じトピックの続き
5. 各トピックを `NNN_トピック名.md` として `workspace/topics/` に出力する（NNN は 001 から連番）
6. トピック名はユーザーの最初の発言から要約して決定する（日本語、30文字以内）

## トピックファイルの形式

```markdown
> From: [元のセッションのURL（あれば）]

# you asked

ユーザーの質問テキスト

---

# gemini response

AIの応答テキスト
```

複数ターンある場合は `# you asked` / `---` / `# gemini response` / `---` を繰り返す。

## 出力

### workspace/topics/ ディレクトリ
連番付きのトピック .md ファイル一式。

### workspace/stats.json
以下の形式の JSON:

```json
{
  "metadata": {
    "generated_at": "YYYY-MM-DD",
    "total_source_files": <セッション数>,
    "total_topics": <トピック数>,
    "total_queries": <ユーザー発言の総数>
  },
  "topics": [
    {
      "id": 1,
      "topic": "トピック名",
      "source_file": "元のファイル名.md",
      "query_count": <このトピック内のユーザー発言数>
    }
  ]
}
```

## 注意事項

- 元のファイルは変更しない
- 大量のファイルがある場合はサブエージェントを活用して並列処理する
- 参考実装: `../2026-02-27-gemini-usage/topics/` と `../2026-02-27-gemini-usage/stats.json`
