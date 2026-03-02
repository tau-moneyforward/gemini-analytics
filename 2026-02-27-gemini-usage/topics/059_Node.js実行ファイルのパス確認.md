# you asked

Sonarlint: Path To Node Executable
Path to a Node.js executable (versions above 18.20.0, 20.12.0, or 22.11.0) used to analyze JavaScript and TypeScript code.

Mac の node.js 実行ファイルはどこにある？

---

# gemini response

Mac で Node.js の実行ファイルを探す場合、インストール方法によって場所が異なります。一般的なインストール方法ごとに場所を説明します。

-----

### Homebrew でインストールした場合

Homebrew を使って Node.js をインストールした場合は、以下のパスにあります。

  - Intel Mac: `/usr/local/bin/node`
  - Apple Silicon Mac: `/opt/homebrew/bin/node`

どちらのアーキテクチャか分からない場合は、ターミナルで `arch` と入力して確認できます。

### Node.js 公式サイトからインストールした場合

公式インストーラーを使ってインストールした場合、通常は以下のパスにあります。

  - `/usr/local/bin/node`

-----

### 現在のパスを確認する方法

現在使用している Node.js の実行ファイルのパスを確実に見つけるには、ターミナルで次のコマンドを実行するのが最も簡単です。

```bash
which node
```

このコマンドは、システムが現在使用している `node` コマンドのフルパスを返します。この結果を SonarLint の設定に貼り付ければ間違いありません。

もし複数の Node.js バージョンを管理している場合は、**`nvm`** (Node Version Manager) や **`volta`** といったツールを使っているかもしれません。その場合、`which node` で返されるパスはこれらのツールが管理するパスになります。Sonarlint の設定では、特定のバージョンへの**直接のパス**を指定する必要があるかもしれません。

---
