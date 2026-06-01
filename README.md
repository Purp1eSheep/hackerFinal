# Quiz-Web-Template

這是一個純粹靠 **Vibe Coding** 噴出來的產物。如果你問我這 code 裡面在寫什麼，我會誠實告訴你：**「老子根本不會任何網站語言。」**

什麼 HTML、CSS、JavaScript？我連標籤都分不清楚。但這重要嗎？不重要。因為我有 AI，我有 Vibe。

> **什麼是 Vibe Coding？**
> 就是我們這種 Gen Z 腦萎縮資工學生，完全不打算學任何程式語言，逼事沒幹，全靠指令、Claude、Gemini 以及 Gemini CLI。當傳統工程師還在苦讀《JavaScript 犀牛書》、還在為了進不了大廠刷題掉頭髮的時候，我只需要坐在螢幕前對著 Claude 說「噴一個測驗網站給我」，然後這堆 code 就自己長出來了。
>
> 我看不懂程式碼，但我看得到成果，這就是 AI 時代對傳統碼農最殘酷的降維打擊。

---

## ✨ 專案特色 (我不知道怎麼做到的，但它動了)

- **📱 響應式設計**：雖然我不知道 `div` 要怎麼置中，但 AI 噴出來的 code 讓這網站比你期末專題做的還漂亮。
- **🎨 多種主題**：我不懂色彩學，我只懂叫 AI 把配色弄得像 Nord 或暮光之城。
- **📊 數據看板**：我也沒聽過 Chart.js，我只跟 AI 說「我要看圖表」，它就跪著幫我畫好了。
- **🤖 AI 閉環**：這題不會？專案會自動生一段 Prompt。這就是「完全不會寫 code 的人，用 AI 噴出的網站，去問另一個 AI 題目答案」。
- **💾 進度保存**：LocalStorage 是啥？我不知道，反正重開網頁進度還在，這就是魔法。

---

## 🚀 快速開始

### 1. 取得檔案
把這堆對我來說是亂碼的檔案下載到你的電腦：
```bash
git clone https://github.com/Purp1eSheep/quiz-web-template.git
```

### 2. 開啟網站
隨便用個東西啟動 `index.html`。
- 如果你有安裝 VS Code，推薦安裝 `Live Server` 擴充套件，然後按右下角的 **Go Live**。
- 如果你連這都不會，建議退學。

---

## 📝 題庫管理：黑科技自動合併系統

這是本專案最 Vibe 的地方。你不需要手寫 CSV，也不需要去改網站原始碼。你只需要會「複製貼上」。

### 第一步：在 `questions/` 資料夾下寫 JSON
你可以在 `questions/` 資料夾下建立多個 `.json` 檔案。
**注意：腳本會自動把「檔名」當作「科目名稱」。** 
例如：`Vibe_入門.json` 會自動變成網站上的「Vibe 入門」科目。

**JSON 格式範例：**
```json
[
    {
        "question": "題目文字寫在這裡",
        "options": ["選項 A", "選項 B", "選項 C", "選項 D"],
        "answer": 2, 
        "topic": "章節名稱 (例如：生存心法)"
    }
]
```
*`answer` 是索引值，`0` 代表第一個選項，`1` 代表第二個，以此類推。*

### 第二步：執行合併腳本
打開你的終端機（Terminal），輸入：
```bash
python3 tools/merge_questions.py
```
**這個動作會自動幫你：**
1. 掃描 `questions/` 所有的 JSON 檔。
2. 自動幫題目編號（Q001, Q002...）。
3. 幫你揉成網站讀得懂的 `assets/data/all_questions.csv`。
4. 自動更新 `manifest.json`，讓網站主畫面出現新科目。

---

## ⚙️ 客製化 (AI 幫我留的後路)

我已經叫 AI 把所有我看得懂的中文開關都放在 `src/config.js` 了。這是我對這個世界最後的溫柔。

### 你可以改什麼：
- **`appTitle`**: 網站的大標題。
- **`appSubtitle`**: 標題下面的那行廢話。
- **`githubRepoUrl`**: 你的 Repo 網址。
- **`labels`**: 所有的按鈕文字（想改成「我要色色」也隨便你）。
- **`aiPromptTemplate`**: 修改 AI 助教的語氣。
- **`themeDescriptions`**: 設定頁面裡面那些裝逼的主題描述。

---

## 🌐 部署 (讓全世界看到你的 Vibe)

如果你想讓別人直接上網玩，最快的方法是 **GitHub Pages**：
1. 把這個專案 Push 到你的 GitHub。
2. 去 Repo 的 **Settings > Pages**。
3. Source 選 **Deploy from a branch**，Branch 選 **main**。
4. 等一分鐘，你就有一個專屬的測驗網站了。

---

## 🛠️ 技術債 (Vibe 供應商)

- **Vanilla JS & CSS**: 因為我懶得架環境，AI 吐這個最快。
- **[Chart.js](https://www.chartjs.org/)** & **[Papa Parse](https://www.papaparse.com/)**

## 📄 授權

MIT License - 你想拿去幹嘛隨便你，反正 Bug 我也修不了，因為我根本不會寫。

## 🙏 特別感謝 (真正的勞工)

- **Claude**: 真正的 Daddy。
- **Gemini Cli**: 負責幫我這雙只會喝可樂的手進行檔案操作，沒有它我連存檔都不會。
- **Gemini**: 負責在 Claude 額度用完時出來當卑微的後補。
- **我**: 負責下指令、喝可樂、以及承受這個「完全不會寫 code 卻能開源專案」的究極優越感。
