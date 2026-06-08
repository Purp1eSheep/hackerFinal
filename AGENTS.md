# AGENTS.md — hackerFinal

資安與道德駭客期末考複習系統。兩個靜態 SPA（測驗站 + 講義站），純 Vanilla JS/CSS，無建置工具。

## 專案結構

```
index.html                # 測驗站入口（ES module）
src/main.js               # 測驗站主邏輯
src/modules/              # 測驗站模組
  state.js                # Config, DOM cache, State
  storage.js              # LocalStorage wrapper
  ui.js                   # UI facade
  ui-quiz.js / ui-browser.js / ui-dashboard.js / utils.js
handouts/index.html       # 講義站入口（傳統 script）
handouts/app.js           # 講義站邏輯（單一檔案）
handouts/handouts-data.js # 由 Python 自動產生
questions/                # 題庫來源（CSV）
  multiple_choice.csv     # 選擇題
  true_false.csv          # 是非題
assets/data/              # Python 工具輸出（git 追蹤）
  all_questions.csv       # 合併後題庫
  manifest.json           # 科目/主題清單
  handouts.json           # 講義備份
tools/                    # Python 資料管線
```

## 開發指令

```bash
# 合併題庫（JSON + CSV → all_questions.csv + manifest.json）
python3 tools/merge_questions.py

# 重新編號 Q-ID + 自動同步講義
python3 tools/reindex_csv.py

# 手動編譯講義網站資料（handouts-data.js）
python3 tools/generate_handout_site_data.py

# 備份講義原始資料
python3 tools/generate_handouts.py

# 稽核題庫主題分布
python3 tools/audit_handouts.py
```

## 工具執行順序

`merge_questions.py` → 產生 `all_questions.csv` + `manifest.json`
`reindex_csv.py` → 重新編號 + 自動呼叫 `generate_handout_site_data.py`
`generate_handout_site_data.py` → 讀取 `all_questions.csv` + 匯入 `generate_handouts.py` 的 `HANDOUTS` 常數 → 輸出 `handouts/handouts-data.js`

`generate_handouts.py` 是獨立腳本，僅輸出 `assets/data/handouts.json`。

更動題庫後**必須**重新合併與編譯講義（`merge_questions.py` → `generate_handout_site_data.py` 或直接跑 `reindex_csv.py`）。

## 重要約定

- **答案索引**：CSV 中為 1-based（A=1, B=2...），JS 前端 `normalizeIndex` 轉為 0-based。
- **CSV 編碼**：一律使用 `utf-8-sig`（BOM）。
- **題目 ID**：`Q` 開頭流水號（Q0, Q1...），由 `merge_questions.py` 或 `reindex_csv.py` 自動產生。
- **所有資料在 LocalStorage**，無後端。
- **無 package.json、無 npm、無建置步驟**。CDN 依賴：Chart.js、Papa Parse（`index.html`）；Google Fonts（`handouts/index.html`）。
- **無測試框架**。`audit_handouts.py` 僅列印題庫分布供人工核對。
- **無 lint / typecheck / CI**。GitHub Pages 直接 serve 靜態檔。
- **無 `.gitignore`**。

## 設定位置

- 測驗站標題、AI 提示模板：`src/modules/state.js` `Config` 物件
- 主題描述文字：`src/main.js` `themeDescriptions`
- 講義內容：`tools/generate_handouts.py` `HANDOUTS` 常數（編輯後需重新執行 `generate_handout_site_data.py`）

## 前端架構

- **測驗站**（`index.html`）：ES module（`<script type="module" src="src/main.js">`）。`main.js` 初始化 → 載入 manifest + CSV → `ui.js` 代理子模組。
- **講義站**（`handouts/index.html`）：傳統 script 載入順序：`handouts-data.js`（資料） → `app.js`（邏輯）。

## 部署

GitHub Pages：設定為 `/ (root)`，`main` 分支。不需建置步驟。
