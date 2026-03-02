> From: https://gemini.google.com/app/5e27a425d088f85e

# you asked

openapi: 3.0.0
info:
  title: クラウドマイナンバー Internal API
  description: マネーフォワード クラウド社会保険/給与/年末調整からマイナンバーを照会するAPI
  version: 1.0.0

servers:
  - url: https://my.moneyforward.com/internal_api/v1
    description: Production server

paths:
  /offices/{office_id}/employees/{employee_number}/employee_my_number_inquiry:
    post:
      summary: 従業員のマイナンバー照会
      description: |
        クラウド給与/社会保険/年末調整から従業員のマイナンバーを取得する。
        取得時に操作履歴が記録される。
      operationId: createEmployeeMyNumberInquiry
      tags:
        - Employee My Number
      parameters:
        - name: office_id
          in: path
          required: true
          description: 事業所ID
          schema:
            type: integer
            example: 12345
        - name: employee_number
          in: path
          required: true
          description: |
            従業員番号
            - referred_event指定時: 暗号化されていない従業員番号
            - referred_event未指定時: Mf::ID.encrypt_id()で暗号化された従業員番号
          schema:
            type: string
            example: "EMP001"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - referrer_id
                - purpose_of_uses
              properties:
                referrer_id:
                  type: integer
                  description: マイナンバー参照者のoffice_member ID（マイナンバー管理者権限が必要）
                  example: 67890
                referred_event:
                  type: string
                  description: |
                    参照元サービス識別子（省略時は'payroll'）
                    - 'payroll': クラウド給与
                    - 'social_insurance': クラウド社会保険
                    - 'tax_adjustment': クラウド年末調整
                  enum:
                    - payroll
                    - social_insurance
                    - tax_adjustment
                  example: "social_insurance"
                purpose_of_uses:
                  type: array
                  description: マイナンバー利用目的の配列（必須）
                  items:
                    type: string
                    enum:
                      - for_withholding_slips
                      - for_unemployment_insurances
                      - for_health_insurances
                      - for_compensation_insurances
                      - for_no3_insured_person
                      - for_property_forming_servings
                      - for_employee_stocks_society
                  minItems: 1
                  example:
                    - "for_health_insurances"
                    - "for_unemployment_insurances"
            examples:
              社会保険資格取得届:
                value:
                  referrer_id: 67890
                  referred_event: "social_insurance"
                  purpose_of_uses:
                    - "for_health_insurances"
                    - "for_unemployment_insurances"
              雇用保険資格取得届:
                value:
                  referrer_id: 67890
                  referred_event: "social_insurance"
                  purpose_of_uses:
                    - "for_unemployment_insurances"
              給与計算:
                value:
                  referrer_id: 67890
                  referred_event: "payroll"
                  purpose_of_uses:
                    - "for_withholding_slips"
      responses:
        '200':
          description: マイナンバー取得成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  my_number:
                    type: string
                    description: マイナンバー（12桁または13桁）
                    pattern: '^\d{12,13}$'
                    example: "123456789012"
                  error_id:
                    type: string
                    nullable: true
                    example: null
                  error_message:
                    type: string
                    nullable: true
                    example: null
        '400':
          description: リクエストエラー
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              examples:
                マイナンバー管理者が見つからない:
                  value:
                    my_number: null
                    error_id: "warden_not_found"
                    error_message: "マイナンバー管理者が見つかりませんでした。"
                マイナンバー未提供:
                  value:
                    my_number: null
                    error_id: "my_number_not_provided"
                    error_message: "マイナンバーが提供されていません。"
                マイナンバー未承認:
                  value:
                    my_number: null
                    error_id: "my_number_not_approved"
                    error_message: "提供済みマイナンバーが承認されていません。"
                利用目的不一致:
                  value:
                    my_number: null
                    error_id: "purpose_of_uses_not_matched"
                    error_message: "指定された利用目的は、提供済みマイナンバーの利用目的に合致していません。"
                従業員が見つからない:
                  value:
                    my_number: null
                    error_id: "employee_not_found"
                    error_message: "従業員が見つかりませんでした。"
        '500':
          description: サーバー内部エラー
          content:
            application/json:
              schema:
                type: object
                properties:
                  my_number:
                    type: string
                    nullable: true
                    example: null
                  error_id:
                    type: string
                    example: "internal_server_error"
                  error_message:
                    type: string
                    example: "マイナンバーの取得に失敗しました。"

  /offices/{office_id}/employees/{employee_number}/employee_dependent_my_number_inquiry:
    post:
      summary: 扶養家族のマイナンバー照会
      description: |
        クラウド給与/社会保険/年末調整から扶養家族のマイナンバーを取得する。
        取得時に操作履歴が記録される。
      operationId: createEmployeeDependentMyNumberInquiry
      tags:
        - Employee Dependent My Number
      parameters:
        - name: office_id
          in: path
          required: true
          description: 事業所ID
          schema:
            type: integer
            example: 12345
        - name: employee_number
          in: path
          required: true
          description: |
            従業員番号
            - referred_event指定時: 暗号化されていない従業員番号
            - referred_event未指定時: Mf::ID.encrypt_id()で暗号化された従業員番号
          schema:
            type: string
            example: "EMP001"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - referrer_id
                - purpose_of_uses
                - employee_dependent
              properties:
                referrer_id:
                  type: integer
                  description: マイナンバー参照者のoffice_member ID（マイナンバー管理者権限が必要）
                  example: 67890
                referred_event:
                  type: string
                  description: |
                    参照元サービス識別子（省略時は'payroll'）
                    - 'payroll': クラウド給与
                    - 'social_insurance': クラウド社会保険
                    - 'tax_adjustment': クラウド年末調整
                  enum:
                    - payroll
                    - social_insurance
                    - tax_adjustment
                  example: "social_insurance"
                purpose_of_uses:
                  type: array
                  description: マイナンバー利用目的の配列（必須）
                  items:
                    type: string
                    enum:
                      - for_withholding_slips
                      - for_unemployment_insurances
                      - for_health_insurances
                      - for_compensation_insurances
                      - for_no3_insured_person
                      - for_property_forming_servings
                      - for_employee_stocks_society
                  minItems: 1
                  example:
                    - "for_health_insurances"
                    - "for_no3_insured_person"
                employee_dependent:
                  type: object
                  description: 扶養家族の識別情報
                  required:
                    - last_name
                    - first_name
                  properties:
                    last_name:
                      type: string
                      description: 扶養家族の姓
                      example: "山田"
                    first_name:
                      type: string
                      description: 扶養家族の名
                      example: "花子"
                    last_name_kana:
                      type: string
                      description: 扶養家族の姓（カナ）
                      example: "ヤマダ"
                    first_name_kana:
                      type: string
                      description: 扶養家族の名（カナ）
                      example: "ハナコ"
            examples:
              健康保険被扶養者届:
                value:
                  referrer_id: 67890
                  referred_event: "social_insurance"
                  purpose_of_uses:
                    - "for_health_insurances"
                    - "for_no3_insured_person"
                  employee_dependent:
                    last_name: "山田"
                    first_name: "花子"
                    last_name_kana: "ヤマダ"
                    first_name_kana: "ハナコ"
              年末調整:
                value:
                  referrer_id: 67890
                  referred_event: "tax_adjustment"
                  purpose_of_uses:
                    - "for_withholding_slips"
                  employee_dependent:
                    last_name: "山田"
                    first_name: "花子"
      responses:
        '200':
          description: マイナンバー取得成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  my_number:
                    type: string
                    description: マイナンバー（12桁）
                    pattern: '^\d{12}$'
                    example: "123456789026"
                  error_id:
                    type: string
                    nullable: true
                    example: null
                  error_message:
                    type: string
                    nullable: true
                    example: null
        '400':
          description: リクエストエラー
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              examples:
                扶養家族が見つからない:
                  value:
                    my_number: null
                    error_id: "employee_dependent_not_found"
                    error_message: "扶養家族が見つかりませんでした。"
                マイナンバー未提供:
                  value:
                    my_number: null
                    error_id: "my_number_not_provided"
                    error_message: "マイナンバーが提供されていません。"
        '500':
          description: サーバー内部エラー
          content:
            application/json:
              schema:
                type: object
                properties:
                  my_number:
                    type: string
                    nullable: true
                    example: null
                  error_id:
                    type: string
                    example: "internal_server_error"
                  error_message:
                    type: string
                    example: "マイナンバーの取得に失敗しました。"

components:
  schemas:
    ErrorResponse:
      type: object
      properties:
        my_number:
          type: string
          nullable: true
          example: null
        error_id:
          type: string
          description: エラー識別子
          enum:
            - warden_not_found
            - my_number_not_provided
            - my_number_not_approved
            - purpose_of_uses_not_matched
            - employee_not_found
            - employee_dependent_not_found
            - office_not_found
            - office_member_not_found
            - internal_server_error
        error_message:
          type: string
          description: エラーメッセージ（日本語）

  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic
      description: Internal API用のBasic認証

security:
  - BasicAuth: []

これのビューワを作って

---

# gemini response

ご提示いただいたOpenAPI定義書（Swagger）に基づき、APIドキュメントが見られるビューワを作成しました。

以下の2つの形式で提供します。

1.  **簡易ドキュメント（Markdown版）**: 今すぐここで概要を確認するためのもの
2.  **Swagger UI（HTML版）**: ブラウザで綺麗に表示し、動作確認（Try it out）も可能な単一のHTMLファイル

-----

### 1\. 簡易ドキュメント（Markdown版）

**API名**: クラウドマイナンバー Internal API (`v1.0.0`)
**Base URL**: `https://my.moneyforward.com/internal_api/v1`

#### ① 従業員のマイナンバー照会

**`POST`** `/offices/{office_id}/employees/{employee_number}/employee_my_number_inquiry`

クラウド給与/社会保険/年末調整から従業員のマイナンバーを取得します。

**パラメータ (Path)**
| 名前 | 必須 | 説明 |
| :--- | :--- | :--- |
| `office_id` | Yes | 事業所ID (Integer) |
| `employee_number` | Yes | 従業員番号 (String) <br>※referred\_event未指定時は暗号化が必要 |

**リクエストボディ (JSON)**
| 名前 | 必須 | 型 | 説明 |
| :--- | :--- | :--- | :--- |
| `referrer_id` | Yes | Integer | 参照者のoffice\_member ID |
| `referred_event` | No | String | 参照元サービス (`payroll`, `social_insurance`, `tax_adjustment`) |
| `purpose_of_uses` | Yes | Array | 利用目的 (`for_health_insurances` など) |

**レスポンス**

  * **200 OK**: `my_number` (12-13桁), `error_id` (null)
  * **400 Bad Request**: エラー詳細 (`warden_not_found`, `my_number_not_provided` 等)

-----

#### ② 扶養家族のマイナンバー照会

**`POST`** `/offices/{office_id}/employees/{employee_number}/employee_dependent_my_number_inquiry`

扶養家族のマイナンバーを取得します。

**パラメータ (Path)**

  * ①と同様 (`office_id`, `employee_number`)

**リクエストボディ (JSON)**
| 名前 | 必須 | 型 | 説明 |
| :--- | :--- | :--- | :--- |
| `referrer_id` | Yes | Integer | 参照者のoffice\_member ID |
| `referred_event` | No | String | 参照元サービス |
| `purpose_of_uses` | Yes | Array | 利用目的 |
| `employee_dependent`| Yes | Object | 扶養家族情報 (`last_name`, `first_name` 必須) |

**レスポンス**

  * **200 OK**: `my_number` (12桁)
  * **400 Bad Request**: `employee_dependent_not_found` 等

-----

### 2\. Swagger UI ビューワ（HTMLファイル）

以下のコードをコピーして、**`api_doc.html`** という名前で保存し、ブラウザ（Chromeなど）で開いてください。
インターネット接続があれば、綺麗なSwagger UIとして表示されます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>クラウドマイナンバー Internal API Docs</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>
    body { margin: 0; padding: 0; background: #fafafa; }
    #swagger-ui { max-width: 1200px; margin: 0 auto; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>

  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" crossorigin></script>
  <script src="https://unpkg.com/js-yaml@4.1.0/dist/js-yaml.min.js"></script>

  <script>
    // ユーザーから提供されたYAML定義
    const specYaml = `
openapi: 3.0.0
info:
  title: クラウドマイナンバー Internal API
  description: マネーフォワード クラウド社会保険/給与/年末調整からマイナンバーを照会するAPI
  version: 1.0.0

servers:
  - url: https://my.moneyforward.com/internal_api/v1
    description: Production server

paths:
  /offices/{office_id}/employees/{employee_number}/employee_my_number_inquiry:
    post:
      summary: 従業員のマイナンバー照会
      description: |
        クラウド給与/社会保険/年末調整から従業員のマイナンバーを取得する。
        取得時に操作履歴が記録される。
      operationId: createEmployeeMyNumberInquiry
      tags:
        - Employee My Number
      parameters:
        - name: office_id
          in: path
          required: true
          description: 事業所ID
          schema:
            type: integer
            example: 12345
        - name: employee_number
          in: path
          required: true
          description: |
            従業員番号
            - referred_event指定時: 暗号化されていない従業員番号
            - referred_event未指定時: Mf::ID.encrypt_id()で暗号化された従業員番号
          schema:
            type: string
            example: "EMP001"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - referrer_id
                - purpose_of_uses
              properties:
                referrer_id:
                  type: integer
                  description: マイナンバー参照者のoffice_member ID（マイナンバー管理者権限が必要）
                  example: 67890
                referred_event:
                  type: string
                  description: |
                    参照元サービス識別子（省略時は'payroll'）
                    - 'payroll': クラウド給与
                    - 'social_insurance': クラウド社会保険
                    - 'tax_adjustment': クラウド年末調整
                  enum:
                    - payroll
                    - social_insurance
                    - tax_adjustment
                  example: "social_insurance"
                purpose_of_uses:
                  type: array
                  description: マイナンバー利用目的の配列（必須）
                  items:
                    type: string
                    enum:
                      - for_withholding_slips
                      - for_unemployment_insurances
                      - for_health_insurances
                      - for_compensation_insurances
                      - for_no3_insured_person
                      - for_property_forming_servings
                      - for_employee_stocks_society
                  minItems: 1
                  example:
                    - "for_health_insurances"
                    - "for_unemployment_insurances"
            examples:
              社会保険資格取得届:
                value:
                  referrer_id: 67890
                  referred_event: "social_insurance"
                  purpose_of_uses:
                    - "for_health_insurances"
                    - "for_unemployment_insurances"
              雇用保険資格取得届:
                value:
                  referrer_id: 67890
                  referred_event: "social_insurance"
                  purpose_of_uses:
                    - "for_unemployment_insurances"
              給与計算:
                value:
                  referrer_id: 67890
                  referred_event: "payroll"
                  purpose_of_uses:
                    - "for_withholding_slips"
      responses:
        '200':
          description: マイナンバー取得成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  my_number:
                    type: string
                    description: マイナンバー（12桁または13桁）
                    pattern: '^\\d{12,13}$'
                    example: "123456789012"
                  error_id:
                    type: string
                    nullable: true
                    example: null
                  error_message:
                    type: string
                    nullable: true
                    example: null
        '400':
          description: リクエストエラー
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              examples:
                マイナンバー管理者が見つからない:
                  value:
                    my_number: null
                    error_id: "warden_not_found"
                    error_message: "マイナンバー管理者が見つかりませんでした。"
                マイナンバー未提供:
                  value:
                    my_number: null
                    error_id: "my_number_not_provided"
                    error_message: "マイナンバーが提供されていません。"
                マイナンバー未承認:
                  value:
                    my_number: null
                    error_id: "my_number_not_approved"
                    error_message: "提供済みマイナンバーが承認されていません。"
                利用目的不一致:
                  value:
                    my_number: null
                    error_id: "purpose_of_uses_not_matched"
                    error_message: "指定された利用目的は、提供済みマイナンバーの利用目的に合致していません。"
                従業員が見つからない:
                  value:
                    my_number: null
                    error_id: "employee_not_found"
                    error_message: "従業員が見つかりませんでした。"
        '500':
          description: サーバー内部エラー
          content:
            application/json:
              schema:
                type: object
                properties:
                  my_number:
                    type: string
                    nullable: true
                    example: null
                  error_id:
                    type: string
                    example: "internal_server_error"
                  error_message:
                    type: string
                    example: "マイナンバーの取得に失敗しました。"

  /offices/{office_id}/employees/{employee_number}/employee_dependent_my_number_inquiry:
    post:
      summary: 扶養家族のマイナンバー照会
      description: |
        クラウド給与/社会保険/年末調整から扶養家族のマイナンバーを取得する。
        取得時に操作履歴が記録される。
      operationId: createEmployeeDependentMyNumberInquiry
      tags:
        - Employee Dependent My Number
      parameters:
        - name: office_id
          in: path
          required: true
          description: 事業所ID
          schema:
            type: integer
            example: 12345
        - name: employee_number
          in: path
          required: true
          description: |
            従業員番号
            - referred_event指定時: 暗号化されていない従業員番号
            - referred_event未指定時: Mf::ID.encrypt_id()で暗号化された従業員番号
          schema:
            type: string
            example: "EMP001"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - referrer_id
                - purpose_of_uses
                - employee_dependent
              properties:
                referrer_id:
                  type: integer
                  description: マイナンバー参照者のoffice_member ID（マイナンバー管理者権限が必要）
                  example: 67890
                referred_event:
                  type: string
                  description: |
                    参照元サービス識別子（省略時は'payroll'）
                    - 'payroll': クラウド給与
                    - 'social_insurance': クラウド社会保険
                    - 'tax_adjustment': クラウド年末調整
                  enum:
                    - payroll
                    - social_insurance
                    - tax_adjustment
                  example: "social_insurance"
                purpose_of_uses:
                  type: array
                  description: マイナンバー利用目的の配列（必須）
                  items:
                    type: string
                    enum:
                      - for_withholding_slips
                      - for_unemployment_insurances
                      - for_health_insurances
                      - for_compensation_insurances
                      - for_no3_insured_person
                      - for_property_forming_servings
                      - for_employee_stocks_society
                  minItems: 1
                  example:
                    - "for_health_insurances"
                    - "for_no3_insured_person"
                employee_dependent:
                  type: object
                  description: 扶養家族の識別情報
                  required:
                    - last_name
                    - first_name
                  properties:
                    last_name:
                      type: string
                      description: 扶養家族の姓
                      example: "山田"
                    first_name:
                      type: string
                      description: 扶養家族の名
                      example: "花子"
                    last_name_kana:
                      type: string
                      description: 扶養家族の姓（カナ）
                      example: "ヤマダ"
                    first_name_kana:
                      type: string
                      description: 扶養家族の名（カナ）
                      example: "ハナコ"
            examples:
              健康保険被扶養者届:
                value:
                  referrer_id: 67890
                  referred_event: "social_insurance"
                  purpose_of_uses:
                    - "for_health_insurances"
                    - "for_no3_insured_person"
                  employee_dependent:
                    last_name: "山田"
                    first_name: "花子"
                    last_name_kana: "ヤマダ"
                    first_name_kana: "ハナコ"
              年末調整:
                value:
                  referrer_id: 67890
                  referred_event: "tax_adjustment"
                  purpose_of_uses:
                    - "for_withholding_slips"
                  employee_dependent:
                    last_name: "山田"
                    first_name: "花子"
      responses:
        '200':
          description: マイナンバー取得成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  my_number:
                    type: string
                    description: マイナンバー（12桁）
                    pattern: '^\\d{12}$'
                    example: "123456789026"
                  error_id:
                    type: string
                    nullable: true
                    example: null
                  error_message:
                    type: string
                    nullable: true
                    example: null
        '400':
          description: リクエストエラー
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              examples:
                扶養家族が見つからない:
                  value:
                    my_number: null
                    error_id: "employee_dependent_not_found"
                    error_message: "扶養家族が見つかりませんでした。"
                マイナンバー未提供:
                  value:
                    my_number: null
                    error_id: "my_number_not_provided"
                    error_message: "マイナンバーが提供されていません。"
        '500':
          description: サーバー内部エラー
          content:
            application/json:
              schema:
                type: object
                properties:
                  my_number:
                    type: string
                    nullable: true
                    example: null
                  error_id:
                    type: string
                    example: "internal_server_error"
                  error_message:
                    type: string
                    example: "マイナンバーの取得に失敗しました。"

components:
  schemas:
    ErrorResponse:
      type: object
      properties:
        my_number:
          type: string
          nullable: true
          example: null
        error_id:
          type: string
          description: エラー識別子
          enum:
            - warden_not_found
            - my_number_not_provided
            - my_number_not_approved
            - purpose_of_uses_not_matched
            - employee_not_found
            - employee_dependent_not_found
            - office_not_found
            - office_member_not_found
            - internal_server_error
        error_message:
          type: string
          description: エラーメッセージ（日本語）

  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic
      description: Internal API用のBasic認証

security:
  - BasicAuth: []
`;

    // Swagger UIの初期化
    window.onload = () => {
      // js-yamlを使ってYAML文字列をJSONオブジェクトに変換
      const spec = jsyaml.load(specYaml);
      
      window.ui = SwaggerUIBundle({
        spec: spec,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout",
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'] // Try it outを有効化
      });
    };
  </script>
</body>
</html>
```

さらに、このAPIに対するクライアントコード（TypeScriptなど）や、モックサーバーのコードが必要であれば作成できますが、いかがいたしますか？

---
