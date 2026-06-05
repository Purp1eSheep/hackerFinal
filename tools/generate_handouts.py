# -*- coding: utf-8 -*-
import json
import os

HANDOUTS = [
    # Subject 1: 道德駭客與偵查技術
    {
        "subject": "道德駭客與偵查技術",
        "topic": "道德駭客基礎與法規",
        "summary": "介紹道德駭客的書面授權要求、安全測試的局限性、生產系統防護原則、委外管理責任以及專業認證。",
        "content": """* **書面核准 (Prior approval in writing)**
  * **致命錯誤**：道德駭客在開始測試前最致命的錯誤是「未取得事前的書面授權」。
  * **同意書要件**：授權書必須包含具體的測試計畫、時程、目標系統，以及雙方簽名同意免除因非故意原因導致損害的免責聲明（agreeing not to hold you liable for unintentional bad things）。
* **安全測試局限性**
  * **100% 安全不可得**：即使擁有龐大預算，100% 牢不可破的安全（100 percent, ironclad security）是無法達到的。
  * **檢測局限性**：系統中存在大量已知與未知漏洞，不可能在安全測試中發現所有漏洞。
  * **定期評估必要性**：安全評估絕非一次性任務，必須「定期重複進行（periodically）」，因為新的威脅會持續浮現。
  * **專業駭客認知**：優秀的道德駭客清楚「自己的局限，並知道去哪裡尋找正確答案（Their limitations and where to get answers）」。
* **操作與風險防禦**
  * **駭客視角 (Hacker's viewpoint)**：必須以真實攻擊者的視角來檢視目標，專注於「對組織最核心且最關鍵的系統與營運流程（Systems and operations that matter most）」。
  * **生產系統防護**：切忌在尖峰時間對生產系統進行猛烈的掃描與測試（pounding production systems），不當時間測試最壞的後果是導致關鍵系統當機（taking down critical systems at the worst moment）。
  * **委外責任歸屬**：企業即使委託第三方進行測試，企業自身仍負有最終責任，且必須在整個測試過程中保持高度參與（stay involved throughout the entire process）。
* **重要法規與認證**
  * **HIPAA 標準**：保護醫療電子資料安全性與隱私，要求組織必須進行「定期審查（periodic reviews）」，而非每十年僅執行一次。
  * **CEH 專業認證**：**CEH（Certified Ethical Hacker，道德駭客認證）**是專門針對滲透測試人員與安全稽核人員設計的國際知名專業認證。
  * **前置 Linux 技能**：在啟動許多安全稽核工具前，測試人員必須熟練掌控 Linux 網路介面。
"""
    },
    {
        "subject": "道德駭客與偵查技術",
        "topic": "滲透測試方法論",
        "summary": "探討滲透測試的定義、內部威脅視角、公開測試與隱密測試的優缺點，以及 PCI-DSS 的合規要求。",
        "content": """* **滲透測試定義**
  * **核心定義**：滲透測試（Penetration Test）被定義為「評估所有安全控制強度（程序、營運與技術控制）的測試（a test evaluating the strengths of all security controls）」。
* **威脅模擬視角**
  * **內部威脅視角**：模擬源自受信任網路環境內部（originating from within the trusted network environment）的威脅視角為「內部/惡意員工（Internal/Malicious Employee）」。
* **測試方式對照**
  * **公開測試 (Overt Testing)**：在 IT 部門知情的情況下進行（Announced）。其主要優點是「測試人員可直接獲得內部架構與組織知識（Access to insider organizational knowledge）」。
  * **隱密測試 (Covert Testing)**：在 IT 部門不知情（Unannounced）的情況下進行，最真實地模擬「真實攻擊者（adversarial attack）」。主要缺點是「耗時且成本極高（Costly and time-consuming）」。
* **合規要求**
  * **PCI-DSS 標準**：要求處理信用卡資訊的組織必須「每年至少執行一次滲透測試（at least once a year）」。
"""
    },
    {
        "subject": "道德駭客與偵查技術",
        "topic": "資訊蒐集與 WHOIS",
        "summary": "學習無接觸的被動與主動偵查技術、網路列舉掃描目的以及 Linux 網路介面控制指令。",
        "content": """* **偵查階段 (Reconnaissance)**
  * **被動偵查目的**：核心目的是「在不與目標網路進行接觸（without network contact）的情況下，儘可能蒐集目標的相關資訊」。
* **網路列舉與掃描 (Network Enumeration and Scanning)**
  * **主動偵查目的**：目的是「發現既存的網路架構（existing networks）、活動主機（live hosts）以及開放的服務與連接埠（services）」。
* **網路介面控制**
  * **網卡啟用指令**：在 Linux 中將指定的網路介面（如 eth0）啟用的指令為 `ifconfig eth0 up`。
"""
    },
    {
        "subject": "道德駭客與偵查技術",
        "topic": "漏洞掃描與評估",
        "summary": "分析弱點掃描目的、Nessus 掃描器、報告階段的資料組織方式、安全防護與風險等級分級。",
        "content": """* **漏洞測試與評估 (Vulnerability Testing)**
  * **核心目的**：主要目的是「檢查主機是否存在已知漏洞並評估其嚴重性（check hosts for known vulnerabilities and assess severity）」。
  * **工具啟動前置**：在啟動許多安全稽核工具前，測試人員必須熟練掌控「Linux 網路介面（Linux network interfaces）」。
* **資訊整理與風險分級**
  * **報告階段資訊整理**：需要將蒐集到的資訊依據「主機（Hosts）」、「服務（Services）」與「已識別的威脅危害（Identified Hazards）」進行分類歸納。
  * **風險評估案例**：在風險評估中，「敏感資訊儲存在未加密的筆電中（Sensitive information stored on an unencrypted laptop）」屬於「高可能性 / 高衝擊（High Likelihood / High Impact）」的風險等級。
* **滲透測試報告原則**
  * **優先排序 (Prioritized)**：報告中的漏洞必須「依嚴重性進行優先排序（Prioritized）」，不可僅按字母順序排列。
  * **防禦性移除**：為防範報告外洩被濫用，應將具體的「密碼破解工具（Password cracking tools）」、「網路分析儀（Network analyzers）」以及實際漏洞利用步驟從最終報告中移除。
  * **傳輸安全**：透過電子郵件寄送報告時，必須「加密所有附件檔（Encrypt all attachments）」。
* **合規要求**
  * **HIPAA 標準**：要求組織必須進行「定期審查（periodic reviews）」，而非每十年僅執行一次。
"""
    },

    # Subject 2: MITRE 與網頁安全攻擊
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "MITRE ATT&CK 框架",
        "summary": "解構戰術、技術與程序的定義，說明初始入侵戰術、有效帳戶偵測數據源，以及企業安全思維與平台覆蓋範圍。",
        "content": """* **TTP 三要素定義**
  * **戰術 (Tactic)**
    * **戰術定義**：代表攻擊者想要達到的「目標或目的（objective / what an attacker wants to achieve）」。
    * **分析價值**：理解戰術有助於分析人員「將收集到的威脅證據與合適的緩解措施（appropriate mitigations）進行連結」。
    * **實務戰術**：「初始入侵（Initial Access）」是一種戰術，且為攻擊者進入網路的「第一個戰術」。
  * **技術 (Technique)**：指攻擊者達成目標所使用的「具體手段（How）」。網路釣魚（Phishing）屬於「技術（Technique）」，而非戰術。
  * **程序 (Procedure)**：指攻擊者在特定真實案例中所執行的「具體操作與步驟細節（what an attacker specifically did in a real-world case）」。
* **框架覆蓋與中間人攻擊**
  * **多平台支援**：MITRE ATT&CK 包含適用於多個作業系統平台的攻擊矩陣，**並非僅限於 Windows 系統**，還包含 Linux、macOS、Cloud 等。
  * **中間人攻擊 (T1557)**：攻擊者把自己定位於通訊雙方之間用以監聽或修改傳輸資料，在 MITRE 中被稱為「Adversary-in-the-Middle (T1557)」。
"""
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "假無線 AP 與中間人攻擊",
        "summary": "說明假無線 AP 攻擊原理、中間人攻擊的定義與目的，以及其常發生的高風險環境。",
        "content": """* **假 AP (Fake WAP) 威脅**
  * **攻擊目的**：主要目的是「發動中間人攻擊（MITM）或竊取使用者憑證（steal credentials）」。
  * **高風險場所**：假 AP 攻擊最常發生於「公共場所，例如機場與咖啡廳（Public places such as airports and coffee shops）」。
* **中間人攻擊定義 (AiTM)**
  * **核心定義**：中間人攻擊（Adversary-in-the-Middle）是指攻擊者把自己定位於「兩個通訊方之間（positioning themselves between two communicating parties）」以攔截或修改流量。
"""
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "社交工程與釣魚",
        "summary": "探討網路釣魚對應代碼、誘騙轉向攻擊運作機制，以及水坑攻擊的安全類別歸屬。",
        "content": """* **網路釣魚 (Phishing)**
  * **識別碼**：在 MITRE ATT&CK 中的技術識別碼為 **T1566**。
* **社交工程手法**
  * **誘騙轉向攻擊 (Bait and Switch)**：攻擊者「先展示一個合法的連結，然後將使用者重新導向至惡意內容（Display a legitimate link first, then redirect users to malicious content）」，這在 MITRE 中對應於使用者執行（User Execution / T1204）技術。
  * **水坑攻擊 (Watering Hole Attack)**：攻擊者攻陷目標群體常造訪的特定網站並植入惡意代碼，此攻擊手法屬於「社交工程（Social Engineering）」類別。
"""
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "憑證重用與防禦",
        "summary": "分析憑證重用與憑證填充的成因，探討多因素驗證與有效帳戶偵測日誌分析。",
        "content": """* **憑證重用 (Credential Reuse)**
  * **成因本質**：攻擊者使用某網站外洩的憑證去嘗試登入其他服務平台。這主要是因為「使用者為了方便而做出的選擇（users choosing convenience）」，而非系統漏洞所致。
  * **最佳防範**：預防憑證重用的最佳建議是「使用密碼管理器並啟用 MFA（Use a password manager and enable MFA）」。
  * **MFA 價值**：多因素驗證（MFA）是抵禦憑證竊取最有效的緩解措施。
* **憑證攻擊偵測與監聽**
  * **有效帳戶 (Valid Accounts) 偵測**：要偵測攻擊者使用合法有效帳戶登入，最有效的資料源是「登入日誌或異常 IP 紀錄（Login logs or anomalous IP records）」。
  * **網路嗅探 (Network Sniffing)**：指攔截或捕獲網路流量以獲取敏感資訊的行為。
"""
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "SQL 注入與防禦",
        "summary": "解析 SQL 注入弱點成因、危害後果以及推薦的參數化防禦對策。",
        "content": """* **SQL 注入漏洞 (SQL Injection)**
  * **弱點成因**：主要是因為系統「未能妥善驗證或過濾輸入資料（Failure to properly validate or sanitize input data）」。
  * **主要危害**：可用於「繞過登入頁面（bypass login pages）」以及「讀取或刪除資料庫中的資料紀錄（read or delete database records）」。
  * **防範對策**：防禦 SQL 注入首選的推薦措施為「使用參數化查詢（Use Parameterized Queries）」。
"""
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "會話劫持與傳輸加密",
        "summary": "解析會話劫持中被竊取的資訊、前置密碼要求、HTTPS 與 HttpOnlyCookie 以及 VPN 預防流量監聽機制。",
        "content": """* **會話劫持 (Session Hijacking)**
  * **被竊資訊**：被竊取的資訊通常是使用者的「Session Cookie 或 Session ID」。
  * **密碼要求**：攻擊者進行會話劫持時，「不需要」知道使用者的帳號密碼。
  * **最佳防護**：最合適的防禦手段是使用「HTTPS 與 HttpOnly Cookies」。
* **傳輸層防護**
  * **HTTPS 加密**：有助於保護「傳輸中的資料（data in transit）」並降低中間人攻擊（MITM）的風險。
  * **VPN 防護**：在公共 Wi-Fi 網路上，「使用 VPN」能有效防止網路流量被截獲與攔截。
"""
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "瀏覽器劫持與惡意擴充",
        "summary": "解析瀏覽器劫持者的感染途徑與常見設定篡改症狀，引導使用者使用官方安全管道安裝擴充套件。",
        "content": """* **瀏覽器劫持者 (Browser Hijacker)**
  * **感染症狀**：最常見的症狀是「預設首頁或預設搜尋引擎被變更為惡意網站」。
  * **感染途徑**：劫持軟體常透過「不安全的瀏覽器擴充功能」進入系統。
  * **安全防範**：不可從來源不明的第三方套件下載擴充，應只從官方商店下載安裝。
"""
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "OWASP 網頁弱點與防禦",
        "summary": "深入探討 OWASP Top 10 排行、參數篡改、XML 外部實體注入與 billion laughs DoS 攻擊、網頁伺服器部署安全防護以及防護設備配置層級。",
        "content": """* **OWASP Top 10 (2021) 弱點**
  * **第一名**：失效的存取控制（Broken Access Control）排名第 **#1**。
  * **失效的身份驗證 (Broken Authentication)**：藉由身份驗證與會話管理漏洞冒充用戶，包含「登出功能（logout）、會話逾時（timeouts）與密碼管理（password management）」的缺陷。
  * **參數篡改 (Parameter Tampering)**：用以修改「客戶端與伺服器（Client and Server）」之間傳遞的應用程式資料。
  * **漏洞元件與權限**：底層組件與框架通常「擁有高權限（often run with full privileges）」，並非以最小權限運行。
  * **不足的記錄與監控**：指偵測軟體「忽略了重要的事件細節（Detection software ignoring important event details）」，攻擊者常會「篡改網頁應用程式日誌」以隱藏真實身份。
  * **敏感資料外洩防範**：建議的防範對策為「在離線狀態下生成與管理加密金鑰（Generate encryption keys offline）」。
  * **XXE (XML 外部實體注入 / A4)**：解析器未限制外部實體載入，危害包含「讀取伺服器內部檔案（透過 file:// URI 處理常式）」、「遠端代碼執行」與「發動 DoS 攻擊」，經典手法如巢狀 XML 實體膨脹的「Billion Laughs 實體膨脹 DoS 攻擊」。
* **網頁伺服器防禦與部署**
  * **IIS 部署位置**：切勿將 IIS 伺服器安裝在「網域控制站（Domain Controller）」上。
  * **磁碟防護部署**：網站檔案必須存放在「獨立的磁碟分割區（separate drive）」，不可直接存放在作業系統 OS 磁碟區上。
  * **HTTPS 強制導向**：所有非 SSL（HTTP）請求應被「重新導向至 SSL（HTTPS）頁面」。
  * **帳戶安全**：建立帳戶時應「停用所有的預設帳戶（disabling all default accounts）」。
* **傳輸層與會話安全**
  * **保護不足特徵**：「傳輸層保護不足（Insufficient transport layer protection）」的漏洞特徵為支援弱加密演算法與過期憑證。在 Ruben 案例中，被檢測到的安全配置錯誤即為此項。
  * **會話傳遞路徑**：Session 識別資料「不應（NOT）」作為 GET 或 POST 的 URL 參數明文傳遞。
* **防禦與防護設備配置**
  * **IPS/IDS 部署**：安全稽核人員常在「第 7 層（Layer 7 - 應用層）」配置入侵偵測系統（IDS）與入侵防禦系統（IPS）。
"""
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "常考 MITRE 技術與資安工具",
        "summary": "彙整期末考必考的 MITRE ATT&CK 技術代碼（T-codes）與常見資安稽核工具之核心原理與應用場景。",
        "content": """<h3>1. MITRE ATT&CK 技術代碼 (T-codes) 總整理</h3>
<p>在對抗性攻擊分析中，MITRE ATT&CK 框架將攻擊者的手段標準化為具體的技術代碼，以下為期末考必考的關鍵代碼：</p>

<div class="handout-table-wrapper">
    <table>
        <thead>
            <tr>
                <th>技術代碼</th>
                <th>技術名稱 (英文/中文)</th>
                <th>核心概念與考試關聯</th>
                <th>實務攻擊案例</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>T1190</strong></td>
                <td><strong>Exploit Public-Facing Application</strong><br>利用面向公眾的應用程式漏洞</td>
                <td>針對公開暴露於網際網路的系統服務進行漏洞利用。</td>
                <td><strong>SQL 注入攻擊 (SQL Injection)</strong></td>
            </tr>
            <tr>
                <td><strong>T1566</strong></td>
                <td><strong>Phishing</strong><br>網路釣魚</td>
                <td>透過傳送惡意附件或連結的偽造訊息，引導受害者執行初始入侵。</td>
                <td><strong>釣魚郵件 (Phishing email)</strong>、水坑攻擊</td>
            </tr>
            <tr>
                <td><strong>T1040</strong></td>
                <td><strong>Network Sniffing</strong><br>網路嗅探</td>
                <td>攔截並讀取傳輸中的網路流量，以獲取敏感資訊。</td>
                <td><strong>假無線 AP (Fake WAP)</strong> 流量監聽</td>
            </tr>
            <tr>
                <td><strong>T1557</strong></td>
                <td><strong>Adversary-in-the-Middle (AiTM)</strong><br>中間人攻擊</td>
                <td>攻擊者將自己定位於通訊雙方之間，進行嗅探或修改資料。</td>
                <td><strong>ARP 欺騙</strong>、<strong>假 AP 中間人攔截</strong></td>
            </tr>
            <tr>
                <td><strong>T1204</strong></td>
                <td><strong>User Execution</strong><br>使用者執行</td>
                <td>攻擊需要受害者的主動交互點擊或運行才能觸發。</td>
                <td><strong>誘騙轉向 (Bait and Switch)</strong></td>
            </tr>
            <tr>
                <td><strong>T1110.004</strong></td>
                <td><strong>Credential Stuffing</strong><br>憑證填充</td>
                <td>利用自動化工具與已外洩的帳密庫，大量嘗試登入其他服務。</td>
                <td><strong>憑證重用 (Credential Reuse)</strong> 攻擊</td>
            </tr>
            <tr>
                <td><strong>T1078</strong></td>
                <td><strong>Valid Accounts</strong><br>有效帳戶</td>
                <td>使用合法的帳號憑證登入系統以規避偵測。</td>
                <td>透過<strong>登入日誌 (Login logs)</strong> 進行異常分析</td>
            </tr>
        </tbody>
    </table>
</div>

<hr style="margin: 24px 0; border: 0; border-top: 1px solid var(--border);">

<h3>2. 核心資安工具與常用指令對照</h3>
<p>以下為本課程涉及的經典資訊安全、滲透測試與無線稽核工具彙整：</p>

<h4>A. 偵查與資訊蒐集 (Reconnaissance)</h4>
<ul style="margin-left: 20px; margin-bottom: 16px; list-style-type: disc;">
    <li><strong><code>whois</code></strong>：被動偵查工具。用於查詢目標網域的註冊人資訊、行政與技術聯絡人、DNS 伺服器及 IP 位址範圍。<br><em>指令</em>：<code>whois &lt;domain&gt;</code> (注意：其目的並非直接利用或攻擊資料庫)。</li>
    <li><strong><code>nmap</code></strong>：主動偵查與連接埠掃描器。經典的 TCP SYN（半開放）掃描不建立完整三向交握，不易被日誌記錄。<br><em>指令</em>：<code>nmap -sS [IP]</code></li>
    <li><strong><code>theHarvester</code></strong>：OSINT（開源情報）蒐集工具，專門搜尋並蒐集與目標網域相關 of <strong>電子郵件地址</strong>、子網域與員工名稱。</li>
</ul>

<h4>B. 弱點評估與 Web 安全 (Vulnerability & Web Security)</h4>
<ul style="margin-left: 20px; margin-bottom: 16px; list-style-type: disc;">
    <li><strong><code>Nessus</code></strong>：業界最常用的<strong>遠端漏洞掃描器 (Remote vulnerability scanner)</strong>，能識別系統中未修補的 CVE 漏洞與配置缺陷。</li>
    <li><strong><code>Burp Suite</code></strong>：Web 應用程式安全測試旗艦工具，支援整個 web 測試流程，包含攔截、修改與重放 HTTP/HTTPS 流量，並提供手動與自動漏洞發現及利用。</li>
    <li><strong><code>Nikto</code> / <code>OWASP ZAP</code> (OWASP Zed Attack Proxy)</strong>：常用於 Web 服務 of 自動化弱點快速掃描。</li>
</ul>

<h4>C. 無線網路與藍牙稽核 (Wireless & Bluetooth Security)</h4>
<ul style="margin-left: 20px; margin-bottom: 16px; list-style-type: disc;">
    <li><strong><code>WiFi-Pumpkin</code></strong>：專門用於建立假無線 AP（Rogue AP）並發動中間人攻擊（AiTM）的整合測試框架。</li>
    <li><strong><code>Aircrack-ng</code> 核心工具鏈與延伸工具</strong>：
        <ul style="margin-left: 20px; list-style-type: circle; margin-top: 8px;">
            <li><strong><code>airmon-ng</code></strong>：啟用或停用無線網卡的監聽模式（Monitor Mode），如 <code>airmon-ng start wlan0</code>。亦為捕捉 WPA/WPA2 握手包的關鍵前置步驟。</li>
            <li><strong><code>airodump-ng</code></strong>：捕獲空氣中的 802.11 無線封包，列出 AP 的 BSSID、ESSID、信號與連線用戶。</li>
            <li><strong><code>aireplay-ng</code></strong>：流量注入工具，最常用於發動<strong>解除驗證攻擊 (Deauthentication Attack)</strong> 以強制客戶端斷線重連，藉此捕獲 WPA2 四向交握包。</li>
            <li><strong><code>aircrack-ng</code></strong>：利用捕獲的握手包進行離線暴力破解或字典攻擊。</li>
            <li><strong><code>airdecap-ng</code></strong>：使用已知金鑰解密捕獲的封包，並<strong>剝除無線標頭 (strip wireless headers)</strong>，輸出以太網 PCAP 檔。</li>
            <li><strong><code>airgraph-ng</code></strong>：將掃描結果繪製為客戶端與 AP 的關係圖。</li>
            <li><strong><code>airbase-ng</code></strong>：專門用於建立軟 AP / 虛擬 AP 的工具，<strong>並非用於修復 SQL 資料庫的工具</strong>。</li>
            <li><strong><code>tkiptun-ng</code></strong>：專門用於向具有 QoS 機制的 WPA TKIP 無線網路注入影格 (inject frames)。</li>
        </ul>
    </li>
    <li><strong><code>RFProtect</code></strong>：專門用於防範無線 DoS 與中間人攻擊的無線侵入防護系統 (Wireless IPS)。</li>
    <li><strong><code>RADIUS</code></strong>：用於 WPA2-Enterprise 集中式身分驗證與授權管理系統。</li>
</ul>
"""
    },

    # Subject 3: 無線網路與藍牙安全
    {
        "subject": "無線網路與藍牙安全",
        "topic": "Wi-Fi 安全與加密協定",
        "summary": "分析 WEP、WPA、WPA2、WPA3 各代加密協定的安全弱點與機制，包含 Dragonfly 手合協定、SSID安全配置管理以及企業無線安全架構。",
        "content": """* **無線加密協定**
  * **WEP 加密漏洞**：使用 24-bit 初始向量（24-bit IV）且極不安全（WEP 並不比 WPA2 安全）。在 WPA 中，替代 WEP 的加密協定為 **TKIP**。
  * **WPA2 CCMP**：採用強健的對稱金鑰加密演算法 **AES**（基於 CCMP 加密模式），並整合 **EAP 或 RADIUS 伺服器**提供企業級集中客戶端身分驗證。
  * **WPA3 安全標準**
    * **認證加密規範**：使用 AES-GCMP 256 加密與 HMAC-SHA-384 身分認證，金鑰管理採用 ECDH/ECDSA。
    * **管理影格保護**：完整性檢查與管理影格保護機制採用的是 **BIP-GMAC-256**。
    * **WPA3-Personal**：使用等值同時驗證 **SAE** 協定來提供密碼型身份驗證，其金鑰交換採用的是 **Dragonfly** 手合協定。
* **SSID 與 BSSID 配置**
  * **SSID 規範**：SSID 的最大字元長度限制為 **32 字元**。廣播 SSID 會招致 SSID 被竊用，無線最佳實踐是使用 SSID 隱藏/遮蔽（SSID cloaking）。
  * **BSSID 定義**：BSSID 代表的是無線基地台（AP）的實體 MAC 位址。
* **無線架構與傳輸層**
  * **EAP 封裝**：PEAP 協定的核心功能是將 EAP 封裝在安全的 TLS 隧道中傳輸。
  * **防火牆部署**：無線防範中，防火牆必須架設在 AP（存取點）與企業內部網路（corporate intranet）之間。
  * **網路停用**：在不使用無線網路時應將其停用/關閉（disabled）以抵禦潛在攻擊。
  * **裝置連線關聯**：無線設備與基地台建連的過程稱為關聯（Association）。
  * **802.11i 標準**：專門規範 802.11 無線網路的安全機制。
  * **軟 AP 威脅**：軟 AP（Soft AP）攻擊可能導致外部裝置在未授權下直接連入企業網路（Enterprise network）。
* **展頻技術與頻段**
  * **ISM 頻段**：專供國際工業、科學與醫療社群使用的頻段。
  * **跳頻展頻 (FHSS)**：將載波在多個頻率通道間進行切換的展頻技術。
"""
    },
    {
        "subject": "無線網路與藍牙安全",
        "topic": "無線網路稽核與工具",
        "summary": "研習 WPA2 四向交握稽核流程、蜜罐 AP SSID 複製攻擊，以及未授權關聯與 MIMO-OFDM 技術應用。",
        "content": """* **無線網路安全稽核**
  * **四向交握漏洞**：客戶端連線時執行四次資料交換以產生會話金鑰。在 Samson 案例中，組織被攻陷的安全漏洞即為 WPA2 四向交握（4-way handshake）過程。
  * **蜜罐 AP (Honeypot AP)**：攻擊者透過複製合法 AP 的 SSID（SSID copying）來偽造基地台，欺騙並引誘使用者連接。
  * **未授權關聯 (Unauthorized association)**：指攻擊者在筆記型電腦上架設一個軟 AP（Soft AP），使其無線網卡（NIC）看起來像是一個合法的 AP，藉此打通與企業內網的連線。
  * **MIMO-OFDM**：此技術在無線網路稽核中，主要被應用於 4G 與 5G 寬頻無線通訊技術（4G and 5G broadband wireless）。
"""
    },
    {
        "subject": "無線網路與藍牙安全",
        "topic": "藍牙安全性與漏洞",
        "summary": "掌握藍牙 Blueprinting 偵查技術，以及 Bluejacking、Bluesnarfing、Bluebugging、Bluesmacking 與 KNOB 攻擊的原理與防禦機制。",
        "content": """* **藍牙防禦習慣**
  * **安全邊界**：藍牙駭客攻擊並不侷限在物理層硬體漏洞的利用。設備的藍牙不應隨時保持在啟用狀態。
  * **裝置管理**：應定期檢查並刪除過去已配對的藍牙裝置紀錄（past paired Bluetooth devices）。
  * **安全模式**：非公開偵測模式（Non-discoverable）並不能保證 100% 免疫藍牙攻擊。不可配對模式（Non-pairable）會拒絕所有的藍牙配對請求。
* **藍牙攻擊分類**
  * **藍牙偵查 (BluePrinting)**：掃描並收集目標藍牙裝置的製造商、硬體型號與韌體資訊（manufacturer and firmware）。
  * **藍牙劫持 (Bluejacking)**：利用藍牙向目標發送未經授權的垃圾/騷擾訊息（unsolicited messages）。
  * **藍牙竊資 (Bluesnarfing)**：未經授權下透過藍牙竊取目標裝置內的資料（theft of information，如聯絡人、簡訊等）。
  * **藍牙控制 (Bluebugging)**：利用安全漏洞遠端控制受害者的手機進行撥號（remotely control a phone to make calls）。
  * **藍牙阻斷 (Bluesmacking)**：向目標發送超大尺寸或隨機垃圾封包以造成緩衝區溢位，導致藍牙裝置當機或崩潰的 DoS 攻擊。
  * **KNOB 攻擊 (金鑰協定漏洞)**：攻擊者強迫通訊雙方調降金鑰協商長度，用以對藍牙共用資料進行監聽與解密（eavesdropping on shared data）。
  * **恐怖主義威脅**：特定的藍牙安全漏洞可能被恐怖份子利用來發送簡訊（Sending SMS messages）以傳播虛假的炸彈威脅。
"""
    },
    {
        "subject": "無線網路與藍牙安全",
        "topic": "頻譜與寬頻無線技術",
        "summary": "介紹直接序列展頻技術（DSSS）、跳頻展頻（FHSS）、IEEE 802.16 標準以及軟AP未授權關聯威脅。",
        "content": """* **展頻技術**
  * **直接序列展頻 (DSSS)**：將原始資料信號乘以偽隨機雜訊碼（PN Code / pseudo-random noise-spreading code），用以將信號散佈於更寬的頻帶（wider frequency band）中以防止干擾。
* **都會區無線標準**
  * **IEEE 802.16**：IEEE 802.16 寬頻無線技術標準在實務上又被通稱為 WiMax。
* **軟 AP 攻擊**
  * **未授權關聯**：攻擊者在筆記型電腦上建立一個軟 AP（soft AP），使筆電的網卡（NIC）看起來像是合法的 AP 以發動攻擊。
"""
    }
]

def main():
    target_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets', 'data')
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    target_file = os.path.join(target_dir, 'handouts.json')
    with open(target_file, 'w', encoding='utf-8') as f:
        json.dump(HANDOUTS, f, indent=4, ensure_ascii=False)

    print(f"成功寫入講義資料到 {target_file}")

if __name__ == '__main__':
    main()
