# you asked

RDBMS で、あるカラムの値に応じて別のカラムに制約を課せる？これは RDBMS の責務じゃなくて、アプリケーションの責務？

---

# gemini response

はい、**RDBMSで実現可能**です。

これは「**CHECK制約（チェック制約）**」という機能を使うのが一般的です。

RDBMSとアプリケーションのどちらの責務かについては、\*\*「両方で行うのが理想だが、最後の砦としてRDBMSが責務を持つべき」\*\*というのが一般的な答えになります。

-----

## 1\. RDBMSで実現する方法

`CHECK`制約を使うと、「この行が満たすべき条件」をデータベース（テーブル）自体に定義できます。

### 📝 具体例：CHECK制約

例えば、「注文（orders）テーブル」があり、「ステータス（`status`）」カラムが '発送済み'（`shipped`） の場合に**のみ**、「発送日（`shipped_date`）」カラムのNULLを許可しない（＝必須にする）という制約を考えます。

この制約は、論理的に言い換えると「**（ステータスが '発送済み' でない）または（発送日が NULL でない）**」という条件が常に成り立つ、ということです。

これをSQLで定義すると以下のようになります。

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    status VARCHAR(20) NOT NULL,
    shipped_date DATE,

    -- ここが制約
    CONSTRAINT chk_shipped_date_if_shipped
    CHECK (status != 'shipped' OR shipped_date IS NOT NULL)
);
```

**この制約の動作：**

  * **`status` = 'processing', `shipped_date` = NULL の場合:**
    `CHECK ( 'processing' != 'shipped' OR NULL IS NOT NULL )`
    `CHECK ( TRUE OR FALSE )` → **TRUE**。
    この行は**許可**されます。

  * **`status` = 'shipped', `shipped_date` = '2025-11-07' の場合:**
    `CHECK ( 'shipped' != 'shipped' OR '2025-11-07' IS NOT NULL )`
    `CHECK ( FALSE OR TRUE )` → **TRUE**。
    この行は**許可**されます。

  * **`status` = 'shipped', `shipped_date` = NULL の場合:**
    `CHECK ( 'shipped' != 'shipped' OR NULL IS NOT NULL )`
    `CHECK ( FALSE OR FALSE )` → **FALSE**。
    この行は**制約違反**となり、INSERTやUPDATEが**拒否**されます。

（※ ほとんどの現代的なRDBMS（PostgreSQL, SQL Server, Oracle, SQLite, 最近のMySQL/MariaDB）でサポートされています。）

-----

## 2\. RDBMS vs アプリケーション：どちらの責務か？

これはデータベース設計における重要な問いですが、結論は「両方」です。ただし、役割が異なります。

### 🥇 RDBMSの責務（データの整合性）

**RDBMSは「データの整合性（Data Integrity）」を守る最後の砦です。**

  * **理由:** アプリケーションは1つとは限りません。Webアプリ、管理画面、バッチ処理、データ分析ツールなど、複数の経路からデータベースにアクセスする可能性があります。
  * もしアプリケーション側だけにロジックを実装すると、別のツールからデータを直接操作されたり、アプリケーションのバグがあったりした場合に、不正なデータ（例：`status`='shipped' なのに `shipped_date`=NULL）が登録されてしまいます。
  * `CHECK`制約をRDBMSに課しておけば、**どの経路からの操作であっても**不正なデータは**絶対に**登録されません。

### 🥈 アプリケーションの責務（UXとバリデーション）

**アプリケーションは「優れたユーザー体験（UX）」を提供する責務があります。**

  * **理由:** ユーザーがフォームを入力し、「登録」ボタンを押した瞬間に、データベースの`CHECK`制約エラー（「`chk_shipped_date_if_shipped`制約に違反しました」といった専門的なエラー）がそのまま表示されたら、ユーザーは何をすべきか分かりません。
  * **役割:** アプリケーションは、データベースにデータを送る**前**に、同じロジックで事前チェック（バリデーション）を行うべきです。「ステータスを '発送済み' にする場合は、発送日も入力してください」という分かりやすいメッセージをユーザーに提示し、入力を促すのがアプリケーションの役割です。

### まとめ

| | RDBMS (データベース) | アプリケーション |
| :--- | :--- | :--- |
| **役割** | **制約 (Constraint)** | **検証 (Validation)** |
| **目的** | データの整合性を**強制的に**守る（最後の砦） | ユーザー体験を向上させ、**事前に**エラーを防ぐ |
| **失敗時**| エラー（処理拒否） | 分かりやすいフィードバックを返す |

したがって、ご質問の制約は\*\*「まずRDBMSの責務としてCHECK制約で定義し、さらにアプリケーションの責務としてUX向上のために事前バリデーションを実装する」\*\*のが最適解となります。

---

# you asked

数値を入力する 2 つのカラムがあるとき、一方のカラムの値が他方のカラムの値を超えないことを保証するcheck 制約は可能？

---

# gemini response

はい、**可能です。**

それこそが`CHECK`制約の典型的な使い方の一つです。

2つのカラム（例：`min_value` と `max_value`）があり、`min_value` が `max_value` を超えないように（`min_value <= max_value`）保証できます。

-----

## 📝 具体例

例えば、「商品価格（products）」テーブルに「最小価格（`min_price`）」と「最大価格（`max_price`）」があり、**最小価格が最大価格を絶対に超えないようにしたい**場合のSQLです。

```sql
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    min_price DECIMAL(10, 2),
    max_price DECIMAL(10, 2),

    -- ここがその制約です
    CONSTRAINT chk_price_order
    CHECK (min_price <= max_price)
);
```

-----

## ⚙️ この制約の動作

このテーブル定義により、RDBMSはデータの挿入（INSERT）や更新（UPDATE）のたびに、この`CHECK`条件を自動的に監視します。

  * **許可されるケース (TRUE)**
    `INSERT INTO products (product_id, min_price, max_price) VALUES (1, 100, 500);`
    → `100 <= 500` は `TRUE` なので、**成功します。**

  * **拒否されるケース (FALSE)**
    `INSERT INTO products (product_id, min_price, max_price) VALUES (2, 1000, 500);`
    → `1000 <= 500` は `FALSE` なので、**データベースがエラーを返し、挿入を拒否します。**

  * **更新時も同様**
    すでに `(1, 100, 500)` というデータがある場合：
    `UPDATE products SET min_price = 600 WHERE product_id = 1;`
    → `600 <= 500` は `FALSE` となるため、**この更新も拒否されます。**

-----

## 💡 補足：NULLの扱い

`CHECK`制約は、条件が `FALSE` になった場合のみエラーを返します。条件が `TRUE` または `UNKNOWN` (不明) の場合は許可されます。

SQLでは、`NULL`（値なし）を含む比較は `UNKNOWN` と評価されます。

  * `CHECK (100 <= NULL)` → `UNKNOWN` (不明)
  * `CHECK (NULL <= 500)` → `UNKNOWN` (不明)
  * `CHECK (NULL <= NULL)` → `UNKNOWN` (不明)

したがって、上記の制約（`CHECK (min_price <= max_price)`）だけでは、**どちらか一方、または両方が `NULL` のデータは許可されます。**

もし `NULL` も許容したくない場合は、`CHECK`制約とは別に、各カラムに`NOT NULL`制約を追加する必要があります。