# you asked

% yarn dev
yarn run v1.22.22
$ concurrently 'yarn dev:mfe' 'yarn dev:app' 'yarn dev:mfe:serve' 'yarn graphql:codegen' 'yarn storybook:ci'
/bin/sh: concurrently: command not found
error Command failed with exit code 127.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

---

# gemini response

このエラーメッセージ「`/bin/sh: concurrently: command not found`」は、`yarn dev` スクリプト内で呼び出されている **`concurrently` コマンド**が見つからないために発生しています。

-----

## 🛑 エラーの原因と解決方法

### 1\. 🔍 エラーの原因

プロジェクトの `package.json` には、複数のコマンド（`yarn dev:mfe` や `yarn dev:app` など）を同時に実行するために **`concurrently`** というパッケージが利用されています。

このエラーが出るのは、以下のいずれかが原因です。

1.  **`concurrently` がインストールされていない**: `concurrently` パッケージがプロジェクトの依存関係 (`devDependencies` にあるはずです) に追加されていない。
2.  **依存関係がインストールされていない**: `package.json` には記載されているが、**`yarn install` の実行を忘れている**か、またはインストールが失敗しているため、`node_modules` ディレクトリ内に `concurrently` 実行ファイルが存在しません。

### 2\. ✅ 解決方法

以下の手順を上から順に試して、問題を解決してください。

#### ステップ 1: `concurrently` をインストールする (一般的な解決策)

最も一般的な解決策は、必要なパッケージがローカルにインストールされていないことです。

1.  **プロジェクトの依存関係としてインストールします。**

    ```bash
    yarn add concurrently --dev
    ```

    *通常、`concurrently` は開発時のみに必要なため、`--dev` (devDependencies) として追加します。*

2.  インストールが完了したら、再度 `yarn dev` を実行してみてください。

#### ステップ 2: 依存関係全体を再確認・再インストールする

もし `concurrently` が既に `package.json` に記載されているにもかかわらずエラーが出る場合は、何らかの理由で `node_modules` が破損しているか、インストールが不完全な可能性があります。

```bash
# 依存関係をクリーンな状態から再インストールします
yarn install
```

`yarn install` が完了したら、再度 `yarn dev` を実行してみてください。

#### 💡 ヒント: なぜ `concurrently` が必要か？

このエラーメッセージから、あなたのプロジェクトが **マイクロフロントエンド (MFE)** や複雑なビルドプロセス（`graphql:codegen` や `storybook:ci`）を持っていることが推測されます。

`concurrently` は、これら**複数の異なるスクリプトを単一のターミナルウィンドウで同時に実行し、監視し続ける**ために非常に便利なツールです。

---
