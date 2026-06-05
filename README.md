# 🛡️ 資安與道德駭客期末考複習系統 (hackerFinal)

這是一個純粹靠 **Vibe Coding** 噴出來的**資安與道德駭客期末考複習平台**。如果你問我這 code 裡面在寫什麼，我會誠實告訴你：**「老子根本不會任何網頁前端。」**

什麼 HTML、CSS、JavaScript？我連標籤都分不清楚，更別提什麼模組化和模組導入了。但這重要嗎？不重要。因為我有 AI，我有 Vibe。

> **什麼是 Vibe Coding？**
> 就是我們這種 Gen Z 腦萎縮資工學生，完全不打算學 any 程式語言，逼事沒幹，全靠下指令、Claude、Gemini 以及 Gemini CLI。當傳統工程師還在苦讀《JavaScript 犀牛書》、還在為了進不了大廠刷 LeetCode 掉頭髮的時候，我只需要坐在螢幕前對著 AI 說「幫我噴一個資安期末考測驗網站，要支援多種主題和數據看板，對了，還要有一個可以跟題庫連動的講義系統」，然後這堆 code 就自己長出來了。
>
> 我看不懂程式碼，但我看得到成果，這就是 AI 時代對傳統碼農最殘酷的降維打擊。

---

## ✨ 專案特色 (我不知道怎麼做到的，但它動了)

- **📱 雙重響應式網頁**：**測驗系統**與**講義系統**都支援手機/電腦版，讓你躺在床上用手機也能刷考古題、背講義。
- **📚 雙向聯動講義系統**：這不是普通的講義！AI 幫我寫了關聯演算法，會自動將期末考必考章節（道德駭客偵查、MITRE 網頁攻擊、與無線藍牙安全）與題庫關聯。你在看講義的同時，底下會直接出現該單元相關的模擬考題，支援即時作答與答案解析！
- **🎨 多種主題**：我不懂色彩學，我只懂叫 AI 把配色弄得像 Nord、Dracula、Twilight 或暮光之城，還可以一鍵切換，兩個網站都適用。
- **📊 數據看板與學習進度**：雷達圖、錯題率統計、講義已讀進度條一應俱全，進度全數自動保存。
- **🤖 AI 助教閉環**：這題不會？測驗內建 AI 助教，點一下就會自動產生一段針對該題目的超詳細 Prompt。這就是「完全不會寫 code 的人，用 AI 噴出的網站，去問另一個 AI 題目答案，實行完美期末考複習閉環」。
- **💾 進度與狀態保存**：LocalStorage 自動保存你做過的題目進度、錯題紀錄與講義已讀狀態，重開網頁也不怕進度不見。

---

## 🚀 快速開始

### 1. 複製專案
下載這套期末考複習神器：
```bash
git clone https://github.com/Purp1eSheep/hackerFinal.git
```

### 2. 開啟期末測驗網站
隨便用個東西啟動 `index.html`。
- 如果你有安裝 VS Code，推薦安裝 `Live Server` 擴充套件，然後按右下角的 **Go Live**。
- 如果你連這都不會，建議直接退考。

### 3. 開啟學習講義手冊
直接雙擊打開 `handouts/index.html`，或者在啟動 Live Server 後導航到 `/handouts/` 即可。

---

## ⚙️ 期末考題與講義管理工具箱 (Python Tools)

這是本專案最 Vibe 的地方。你不需要手寫 CSV，也不需要去改網站原始碼。如果你手上有新的考古題或重點筆記，用這幾個 Python 腳本就能輕鬆更新。

### 1. 考古題庫自動合併
如果你拿到了新的是非題或選擇題，直接丟在 `questions/` 資料夾下：
- **JSON 格式**：建立多個 `.json` 檔案。腳本會自動把「檔名」當作「科目名稱」（例如 `道德駭客_重要觀念.json` 會自動變成網站上的「道德駭客 重要觀念」科目）。
  ```json
  [
      {
          "question": "題目文字寫在這裡",
          "options": ["選項 A", "選項 B", "選項 C", "選項 D"],
          "answer": 2, 
          "topic": "章節名稱 (例如：滲透測試方法論)"
      }
  ]
  ```
  *`answer` 是索引值，`0` 代表第一個選項，`1` 代表第二個，以此類推。*
- **CSV 格式**：直接塞入 `questions/choice.csv`（選擇題）或 `questions/truefalse.csv`（是非題），腳本會自動判定並依題型進行分流！

**執行合併：**
```bash
python3 tools/merge_questions.py
```
**這個動作會自動幫你：**
1. 掃描 `questions/` 下所有的 JSON 與 CSV 檔案。
2. 自動進行科目分類與題目編號（Q000, Q001...）。
3. 幫你揉成網站讀得懂的 `assets/data/all_questions.csv`。
4. 自動更新 `assets/data/manifest.json`，讓網站主畫面出現新科目與精準題數。

---

### 2. 題目 ID 重新編號與講義同步
當你增刪題目導致編號大亂時，執行這個腳本可以一鍵重整：
```bash
python3 tools/reindex_csv.py
```
**這個動作會自動幫你：**
1. 讀取 `assets/data/all_questions.csv`，將所有 `Q` 開頭的題目 ID 重新由零編號（`Q0`, `Q1`, `Q2` ...）。
2. **自動觸發** 講義編譯更新，確保講義底下的精選關聯題目與新的 ID 完美同步。

---

### 3. 講義與題庫關聯編譯
當你想手動重新編譯講義網站的資料，或是更改了 `all_questions.csv` 的題目想同步到講義時，執行：
```bash
python3 tools/generate_handout_site_data.py
```
**這個動作會自動幫你：**
1. 讀取 `assets/data/all_questions.csv` 的題庫。
2. 比對講義中的主題（Topic），自動抓取前 4 題關聯題目揉進講義中。
3. 寫入到 `handouts/handouts-data.js` 供講義網站前端渲染。

---

### 4. 講義原始資料備份
如果你需要重新導出或重設靜態講義的 JSON 結構：
```bash
python3 tools/generate_handouts.py
```
這會將 Python 內置的講義資料導出到 `assets/data/handouts.json`，作為基礎備份。

---

## 📁 專案結構說明

```text
├── index.html                  # 期末測驗網站主入口
├── src/                        # 測驗網站前端核心
│   ├── main.js                 # 主控制邏輯
│   ├── style.css               # 超炫炮主題樣式
│   └── modules/                # 功能模組 (UI、數據看板、儲存、狀態)
├── handouts/                   # 學習講義手冊網頁 (手機/電腦版)
│   ├── index.html              # 講義網站主入口
│   ├── app.js                  # 講義互動邏輯 (搜尋、進度、題庫載入)
│   ├── handouts-data.js        # 由 Python 自動生成的講義與考題關聯數據
│   └── style.css               # 講義網頁專屬樣式
├── questions/                  # 題庫輸入區 (放你的自訂 JSON / CSV)
│   ├── choice.csv              # 選擇題來源
│   └── truefalse.csv           # 是非題來源
├── assets/
│   ├── data/                   # 自動生成的資料區 (all_questions.csv, handouts.json, manifest.json)
│   └── sfx/                    # 音效資源 (答對/答錯裝逼特效音)
└── tools/                      # Python 黑科技自動化工具箱
```

---

## ⚙️ 客製化 (AI 幫我留的後路)

我已經叫 AI 把所有我看得懂的中文設定都抽出來了。這是我對這個世界最後的溫柔。

### 你可以改什麼：
- **核心設定**：放在 `src/modules/state.js` 的 `Config` 物件裡：
  - `appTitle`: 網站的大標題（預設是 `📝 資安與道德駭客測驗`）。
  - `appSubtitle`: 標題下面的那行廢話。
  - `githubRepoUrl`: 你的 Repo 網址。
  - `aiPromptTemplate`: 修改 AI 助教的語氣與解析格式。
- **主題描述**：在 `src/main.js` 裡的 `themeDescriptions`，可以自訂切換不同主題時顯示的裝逼台詞。

---

## 🌐 部署 (讓全世界看到你的 Vibe)

如果你想讓別人直接上網玩，最快的方法是 **GitHub Pages**：
1. 把這個專案 Push 到你的 GitHub。
2. 去 Repo 的 **Settings > Pages**。
3. Source 選 **Deploy from a branch**，Branch 選 **main**。
4. 等一分鐘，你就有一個專屬的測驗與講義網站了。

---

## 🛠️ 技術債 (Vibe 供應商)

- **Vanilla JS & CSS**: 因為我懶得架環境與打包，AI 吐這個最快最直覺。
- **[Chart.js](https://www.chartjs.org/)** - 負責裝逼畫圖表的。
- **[Papa Parse](https://www.papaparse.com/)** - 負責解析 CSV 的。

## 📄 授權

MIT License - 你想拿去幹嘛隨便你，反正 Bug 我也修不了，因為我根本不會寫。

## 🙏 特別感謝 (真正的勞工)

- **Claude**: 真正的 Daddy，我大腦的代行者。
- **Gemini Cli**: 負責幫我這雙只會喝可樂的手進行檔案操作，沒有它我連存檔都不會。
- **Gemini**: 負責在 Claude 額度用完時出來當卑微的後補，但也是本專案的強力後盾。
- **我**: 負責下指令、喝可樂、以及承受這個「完全不會寫 code 卻能開源專案」的究極優越感。
