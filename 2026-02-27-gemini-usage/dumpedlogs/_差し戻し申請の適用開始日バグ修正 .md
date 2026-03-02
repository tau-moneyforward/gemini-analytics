> From: https://gemini.google.com/app/8951ae79331147dd

# you asked

## 確認
- 差し戻された申請の適用開始日を、申請者が再度入力して指定できるべきか？
- 現状、指定できない。これが問題かどうか

## 背景
- 現状、このような挙動があります
-- (1) 承認者が 2 人いるワークフローを作る。第 1 承認者 A が適用開始日を確定する
-- (2) [適用開始日の候補] を [従業員が入力] とした申請フォームを作る。これに前記のワークフローを当てる
-- (3) 該当の申請を申請者が提出する。申請者は適用開始日を入力する (←これは何でも良い)
-- (4) A に申請が回る。A は申請を承認し、適用開始日を X とする ← (★1)
-- (5) 第 2 承認者 B に申請が回る。B は申請を差し戻す
-- (6) 差し戻された申請を申請者が再提出する。申請者は適用開始日を Y とする ← (★2)
-- (7) A に申請が回る。ここで A が見る適用開始日は X のままになってる (★2 が反映されない)
- これはバグっぽい挙動かもしれない
-- (2) のように、[適用開始日の候補] を [従業員が入力] としているのに、申請者が (★2) で入力した適用開始日の候補が反映されていないので (★3)
-- とはいえ、これで困るケースは限定的で、かつ依然として (7) の段階で A は適用開始日を Y に変更できるので回避策はある
- ちなみに VoC #2093 で起きた事象です

このような事象があった。これをバグとして修正するための Jira Epic を作る。Description を英語で簡潔に書いて

---

# gemini response

Jira EpicのDescriptionとして、開発者が事象を即座に再現・理解できるように、具体的かつ簡潔に英語でまとめました。

---

### Epic Name (Suggestion)
**Fix Effective Date persistence issue upon application re-submission**

### Description

**Summary**
When an application is sent back (remanded) to the applicant and subsequently re-submitted, the system ignores the new "Effective Date" entered by the applicant if an approver had previously set a specific date. The system incorrectly persists the date set by the approver during the first round of the workflow, disregarding the form configuration "[Effective Date Candidate] = [Employee Input]".

**Steps to Reproduce**
1.  **Workflow Setup:** Create a workflow with 2 Approvers (Approver A and Approver B). Configure it so Approver A has the authority to finalize the Effective Date.
2.  **Form Setup:** Create a request form where the "Effective Date Candidate" is set to **"Employee Input"**. Apply the workflow created in Step 1.
3.  **Submission:** The Applicant submits the request.
4.  **1st Approval:** Approver A approves the request and sets the Effective Date to **Date X**.
5.  **Remand:** Approver B receives the request but sends it back (remands) to the Applicant.
6.  **Re-submission:** The Applicant edits the request and changes the Effective Date to **Date Y**, then re-submits.
7.  **Verification:** Approver A receives the request again.

**Actual Behavior**
Approver A sees **Date X** (the value from the previous round). The Applicant's new input (**Date Y**) is ignored and not reflected.

**Expected Behavior**
Since the form is configured to accept "Employee Input," the Effective Date should be updated to **Date Y** (the value entered by the Applicant upon re-submission).

**Impact**
* **Inconsistency:** The behavior contradicts the form setting "[Effective Date Candidate] = [Employee Input]".
* **User Confusion:** Approvers may not notice the date needs to be updated again, leading to incorrect effective dates in the final data.
* **Workaround:** Approver A can manually update the date to Y, but this relies on human memory and intervention.

**References**
* VoC #2093

---

### 次のアクションはいかがですか？

このEpicを開発チームに渡すにあたり、具体的な**Acceptance Criteria（受入基準）**や、より詳細な**User Story**が必要であれば作成することも可能です。いかがなさいますか？