// 本檔案由 Python 自動生成。內含講義文字與各主題的精選關聯題目。
const HANDOUTS_DATA = [
    {
        "subject": "道德駭客與偵查技術",
        "topic": "道德駭客基礎與法規",
        "summary": "介紹道德駭客的核心原則、法律遵循要點（如 HIPAA & PCI-DSS）以及執行評估時的專業限制與防護措施。",
        "content": "### 1. 道德駭客的核心定義\n道德駭客（Ethical Hacking）與惡意駭客（Black Hat）之間最根本的界線在於**「事前的書面授權與核准」**。\n在未取得書面授權的情況下發動任何滲透或測試行為，不論動機為何，皆屬違法行為。\n\n### 2. 測試前的致命錯誤\n* **最致命的錯誤**：在未取得客戶書面授權（Prior approval in writing）前就開始進行任何測試或偵查。\n* **書面授權同意書必須包含**：\n  1. 具體的**測試計畫與範圍**（包括測試目標系統、IP 範圍等）。\n  2. 明確的**時程規劃**（什麼時間點能測，什麼時間點不能測）。\n  3. **免責聲明**：雙方簽名同意免除因非故意原因導致損害的賠償責任（agreeing not to hold you liable for unintentional bad things）。\n\n### 3. 安全的本質與原則\n* **不存有「百分之百」的安全**：即使有龐大的預算，100% 牢不可破的安全（100 percent, ironclad security）是無法達到的。系統是不斷變動的，且每天都有新的已知與未知漏洞（Zero-day）被發現。\n* **定期評估的必要性**：安全評估絕非一次性任務，必須**定期重複進行**，以因應持續浮現的新威脅。\n* **專業駭客的認知**：一位優秀的道德駭客並非無所不知，而是**「清楚自己的局限，並知道去哪裡尋找正確答案」**。\n\n### 4. 實務操作規範與風險控制\n* **駭客視角（Hacker Mindset）**：道德駭客必須採用真實攻擊者的視角來檢視目標，專注於**「對組織最核心且最重要的系統與營運流程」**（Systems and operations that matter most）。\n* **生產系統防護**：切忌在尖峰時間對生產系統進行猛烈的掃描或測試（pounding production systems），這可能在最糟的時刻導致關鍵系統當機（DoS）。\n* **委外管理的責任**：企業即使將安全測試委託給第三方專業機構，企業自身仍負有最終責任，且**必須在整個測試過程中保持高度參與**。\n\n### 5. 重要合規標準\n* **HIPAA**（醫療保險可攜性與責任法案）：保護醫療電子資料的安全性與隱私，並非做一次就可以管十年，同樣需要定期審查。\n* **PCI-DSS**（支付卡產業資料安全標準）：要求處理信用卡資訊的組織**每年至少執行一次滲透測試**（Penetration Testing）。\n* **Linux 網路介面掌控**：許多專業的安全稽核工具均運行於 Linux 環境，因此在啟動測試前，必須熟練掌握 Linux 網路介面（如網卡監聽模式、IP 配置等）的控制。\n",
        "questions": [
            {
                "id": "Q0",
                "question": "What is the most critical \"deadly mistake\" an ethical hacker can make before starting a test?",
                "options": [
                    "Not using Linux",
                    "Not getting prior approval in writing",
                    "Using free tools",
                    "Not knowing how to code"
                ],
                "answer": 1
            },
            {
                "id": "Q1",
                "question": "When obtaining documented approval, what must be included?",
                "options": [
                    "A list of all passwords",
                    "The hacker's home address",
                    "The plan, schedule, and systems to test",
                    "A guarantee to find all vulnerabilities"
                ],
                "answer": 2
            },
            {
                "id": "Q2",
                "question": "Is it possible to find all vulnerabilities during a security test?",
                "options": [
                    "Yes, if you use the right tools",
                    "Yes, if you are a certified expert",
                    "No, because so many known and unknown vulnerabilities exist",
                    "No, because clients won't let you see everything"
                ],
                "answer": 2
            },
            {
                "id": "Q3",
                "question": "Regarding security vulnerabilities, which of the following is true?",
                "options": [
                    "100 percent, ironclad security is attainable",
                    "Maintaining 100 percent security is not attainable",
                    "One test is enough to eliminate all risks",
                    "Patching and hardening systems is useless"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "道德駭客與偵查技術",
        "topic": "滲透測試方法論",
        "summary": "探討滲透測試的評估範疇（程序、營運與技術控制）以及公開測試（Overt）與隱密測試（Covert）的差異。",
        "content": "### 1. 滲透測試的範疇與目的\n滲透測試（Penetration Testing）是透過模擬真實駭客的攻擊手法，來評估目標組織整體安全控制強度的過程。它主要評估以下三種安全控制類型：\n* **程序控制（Procedural Controls）**：安全政策、人員教育訓練與作業流程。\n* **營運控制（Operational Controls）**：日常系統維運、備份與日常監控。\n* **技術控制（Technological Controls）**：防火牆、IDS/IPS、加密機制與權限存取控制。\n\n### 2. 威脅模擬視角\n根據攻擊來源的不同，滲透測試會模擬：\n* **外部攻擊者（External Attacker）**：模擬沒有任何內部權限、位於 Internet 的攻擊者。\n* **內部/惡意員工（Internal/Malicious Employee）**：模擬位於內部受信任網路環境（Trusted network environment）的威脅。實務上，來自內部的威脅往往更具殺傷力，因為其天然繞過了邊界防火牆。\n\n### 3. 公開測試與隱密測試對照\n根據目標組織 IT/藍隊（防守方）的知情程度，可分為以下兩種方式：\n\n| 特性 | 公開測試 (Overt / Announced Testing) | 隱密測試 (Covert / Unannounced Testing) |\n| :--- | :--- | :--- |\n| **定義** | 在 IT 部門完全知情、甚至配合的情況下進行。 | IT 與應變部門不知情，僅有少數高層知曉。 |\n| **優點** | 1. 測試人員可直接獲得內部架構資訊。<br>2. 效率高，可快速驗證多個安全機制。 | 最真實地模擬駭客無預警的攻擊，能測試事件應變與藍隊通報機制。 |\n| **缺點** | 無法驗證 IT 部門在面臨真實無預警攻擊時的應變與偵測能力。 | 1. 耗時且成本極高。<br>2. 容易觸發真實的警報甚至導致服務中斷。 |\n",
        "questions": [
            {
                "id": "Q10",
                "question": "Which term is defined as \"\"a test evaluating the strengths of all security controls\"\"?",
                "options": [
                    "Port Scanning",
                    "Social Engineering",
                    "Penetration Test",
                    "Intelligence Gathering"
                ],
                "answer": 2
            },
            {
                "id": "Q11",
                "question": "Which compliance standard requires organizations to perform penetration tests at least once a year?",
                "options": [
                    "HIPAA",
                    "PCI-DSS",
                    "CEH",
                    "GPEN"
                ],
                "answer": 1
            },
            {
                "id": "Q12",
                "question": "Which viewpoint simulates threats originating from within the trusted network environment?",
                "options": [
                    "External Attacker",
                    "Internal/Malicious Employee",
                    "Overt Testing",
                    "Reconnaissance"
                ],
                "answer": 1
            },
            {
                "id": "Q13",
                "question": "What is an advantage of \"\"Overt Penetration Testing\"\"?",
                "options": [
                    "It tests active incident response",
                    "Access to insider organizational knowledge",
                    "It is the most realistic simulation",
                    "It is performed without the IT team's knowledge"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "道德駭客與偵查技術",
        "topic": "資訊蒐集與 WHOIS",
        "summary": "學習無接觸的被動與主動偵查技術，包含 WHOIS 網域查詢、Nmap 連接埠掃描以及 theHarvester 電子郵件蒐集工具。",
        "content": "### 1. 偵查（Reconnaissance）階段\n偵查是滲透測試的第一步。其核心目標是**「在不與目標網路進行直接接觸或觸發警報的情況下，蒐集盡可能多的目標資訊」**。\n\n### 2. WHOIS 查詢\n* **定義**：WHOIS 是一種公開的網域資料庫查詢服務。\n* **用途**：可用於蒐集目標組織的域名註冊人資訊、行政與技術聯絡人、註冊機構、網域名稱伺服器（DNS），以及網域所分配到的 IP 位址範圍。\n* **常用工具**：在 Linux 終端機直接執行 `whois <domain>`。\n\n### 3. 網路列舉與掃描（Network Enumeration and Scanning）\n此步驟藉由發送探測封包，進一步摸清目標網路的實際拓撲：\n* **核心目的**：發現既存的網路架構、活動主機（Live Hosts）以及這些主機上開放的網路服務與連接埠。\n* **Nmap 主動掃描**：\n  * Nmap 是最知名的網路掃描與分析工具。\n  * `nmap -sS [IP]`：執行 **SYN 掃描**（又稱半開放掃描 Semi-open Scan）。它不建立完整的 TCP 三向交握（Three-way handshake），只發送 SYN，若收到 SYN/ACK 則代表埠開啟，隨即發送 RST 斷開，因此不易被傳統應用層日誌記錄。\n\n### 4. theHarvester 工具\n* **定義**：一個用於進行開源情報（OSINT）蒐集的經典 Python 工具。\n* **核心功能**：專門用於搜尋並蒐集與目標域名相關的**電子郵件地址**、子域名、主機名稱、開放埠與雇員名稱，其資料來源包括 Google、Bing、PGP 金鑰伺服器等。\n\n### 5. Linux 網卡控制\n在進行無線與有線網路監聽前，需先將網卡介面啟用：\n* **指令**：`ifconfig eth0 up`（在新型系統中亦可使用 `ip link set eth0 up`）。\n",
        "questions": [
            {
                "id": "Q15",
                "question": "What is the purpose of the \"\"Reconnaissance\"\" phase?",
                "options": [
                    "To exploit vulnerabilities",
                    "To discover as much information about a target as possible without network contact",
                    "To write the final report",
                    "To crash the target's server"
                ],
                "answer": 1
            },
            {
                "id": "Q16",
                "question": "Which tool is used for discovering organization info via WHOIS?",
                "options": [
                    "Nmap",
                    "Nessus",
                    "whois",
                    "Medusa"
                ],
                "answer": 2
            },
            {
                "id": "Q17",
                "question": "What is the purpose of \"\"Network Enumeration and Scanning\"\"?",
                "options": [
                    "To steal credit card data",
                    "To discover existing networks, live hosts, and services",
                    "To encrypt the final report",
                    "To hire a hacker"
                ],
                "answer": 1
            },
            {
                "id": "Q18",
                "question": "Which command is used in Nmap to perform a scan?",
                "options": [
                    "ifconfig -a",
                    "apt-get update",
                    "nmap -sS [IP address]",
                    "whois target_domain"
                ],
                "answer": 2
            }
        ]
    },
    {
        "subject": "道德駭客與偵查技術",
        "topic": "漏洞掃描與評估",
        "summary": "分析漏洞掃描原理，使用 Nessus 進行弱點評估，並學習漏洞報告的風險分級與敏感資訊處理原則。",
        "content": "### 1. 漏洞測試與評估（Vulnerability Testing）\n漏洞掃描的目的是**檢查主機與服務中是否存在已知安全漏洞，評估其嚴重性，並提供修補建議**。這屬於相對自動化與廣泛的普查。\n* **主要掃描器**：**Nessus**。它是一款業界廣為使用的遠端漏洞掃描器（Remote vulnerability scanner），能夠精確識別出作業系統、伺服器軟體中未修補的 CVE 漏洞與配置缺陷。\n* **掃描分析階段**：此階段需要將蒐集到的海量資料依據「主機（Hosts）」、「服務（Services）」與「已識別的威脅危害（Identified Hazards）」進行歸類與關聯。\n\n### 2. 安全風險分級（Risk Assessment）\n實務上，風險的高低取決於**可能性（Likelihood）**與**衝擊影響（Impact）**的結合。\n* **案例分析**：*「敏感資訊儲存在未加密的筆記型電腦中」*\n  * **可能性**：高（筆電極易遺失或被盜）。\n  * **衝擊度**：高（機密資料直接外洩）。\n  * **結論**：此風險應歸類為**「高可能性 / 高衝擊（High Likelihood / High Impact）」**。\n\n### 3. 滲透測試報告撰寫原則\n報告是滲透測試唯一交付的實體產物，必須遵循極高的專業要求：\n* **優先排序（Prioritized）**：漏洞不能只按字母排列，必須依據嚴重性與風險（如 High/Medium/Low）進行優先排序，協助管理階層調配資源。\n* **傳輸安全**：當需要將報告透過電子郵件寄送給客戶時，**必須加密所有附件**，以防報告在傳輸中途被竊聽。\n* **移除敏感細節**：為了防止報告不慎外洩後被惡意攻擊者拿來直接利用，**應將具體的攻擊工具名稱、實際的漏洞利用步驟（Exploitation steps）從報告中移除**，僅保留觀念說明與修補建議。\n",
        "questions": [
            {
                "id": "Q19",
                "question": "Which tool is primarily used for \"\"Remote vulnerability scanning\"\"?",
                "options": [
                    "HTTrack",
                    "Nessus",
                    "Google Search",
                    "theHarvester"
                ],
                "answer": 1
            },
            {
                "id": "Q20",
                "question": "In the reporting phase, vulnerabilities should be:",
                "options": [
                    "Listed alphabetically",
                    "Prioritized",
                    "Hidden from the manager",
                    "Written in highly technical jargon"
                ],
                "answer": 1
            },
            {
                "id": "Q21",
                "question": "When e-mailing the final report, what must you do?",
                "options": [
                    "Use a public cloud link",
                    "Encrypt all attachments",
                    "Send it to the entire company",
                    "Keep it in plain text"
                ],
                "answer": 1
            },
            {
                "id": "Q26",
                "question": "What is the purpose of \"\"Vulnerability Testing and Exploitation\"\"?",
                "options": [
                    "To gather contact emails",
                    "To check hosts for known vulnerabilities and assess severity",
                    "To set up a WHOIS server",
                    "To practice typing"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "MITRE ATT&CK 框架",
        "summary": "解構 MITRE ATT&CK 框架中的戰術（Tactic）、技術（Technique）與程序（Procedure），並探討如何利用日誌偵測有效帳戶的異常使用。",
        "content": "### 1. MITRE ATT&CK 框架簡介\nMITRE ATT&CK 是一個全球通用的對抗戰術、技術和常識知識庫。\n* **核心價值**：將日常雜亂無章的非結構化安全事件，轉化為**結構化的攻擊者行為分析（Structured attack behavior analysis）**，協助藍隊進行威脅狩獵與防禦驗證。\n\n### 2. TTP 三要素定義\n\n| 要素 | 英文名稱 | 中文定義 | 範例與說明 |\n| :--- | :--- | :--- | :--- |\n| **戰術** | **Tactic** | 攻擊者的**目標或目的**（What / Goal）。 | **初始入侵（Initial Access）**、憑證存取（Credential Access）。 |\n| **技術** | **Technique** | 攻擊者達成該目標所使用的**具體手段**（How）。 | **網路釣魚（Phishing - T1566）**、網絡嗅探（Network Sniffing - T1040）。 |\n| **程序** | **Procedure** | 攻擊者在特定真實案例中執行的**具體操作細節**。 | 某 APT 組織使用特定 Python 腳本偽裝成 PDF 並發送至特定信箱的流程。 |\n\n### 3. 初始入侵（Initial Access）\n在 ATT&CK 矩陣中，這是攻擊者進入目標網路所使用的**第一個戰術**。\n\n### 4. 有效帳戶（Valid Accounts）偵測\n攻擊者經常透過合法手段取得有效憑證（Valid Accounts）進行登入，以規避入侵偵測系統。\n* **關鍵偵測數據源**：**登入日誌（Login logs）**與**異常 IP 存取紀錄**。藉由分析登入時間、來源 IP 地理位置以及設備指紋，防守方可以辨識出合法的憑證是否正被非法使用。\n",
        "questions": [
            {
                "id": "Q22",
                "question": "What should be removed from the final report to prevent malicious use by others?",
                "options": [
                    "The dates of testing",
                    "Recommendations for improvement",
                    "Specific tools used and actual testing steps",
                    "The summary of vulnerabilities"
                ],
                "answer": 2
            },
            {
                "id": "Q23",
                "question": "Which certification is specifically mentioned as one for penetration testers?",
                "options": [
                    "Microsoft Word Expert",
                    "Certified Ethical Hacker (CEH)",
                    "Adobe Certified Professional",
                    "PMP"
                ],
                "answer": 1
            },
            {
                "id": "Q24",
                "question": "Which tool is used for \"\"Discovering and Leveraging E-mail Addresses\"\"?",
                "options": [
                    "theHarvester",
                    "Wireshark",
                    "Netcat",
                    "Cain & Abel"
                ],
                "answer": 0
            },
            {
                "id": "Q29",
                "question": "What mindset must organizations employ to survive modern threats?",
                "options": [
                    "A defensive-only mindset",
                    "A hacker mindset",
                    "A bureaucratic mindset",
                    "A profit-only mindset"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "假無線 AP 與中間人攻擊",
        "summary": "說明假無線 AP（Rogue AP）的攻擊原理與危害，並對應到 MITRE ATT&CK 中的中間人攻擊（AiTM）戰術與防禦手段。",
        "content": "### 1. 假無線 AP（Fake WAP / Rogue AP）攻擊原理\n假無線 AP 攻擊是指攻擊者在自己的設備上建立一個「軟體 AP（Soft AP）」，並將其 SSID 命名為與現場合法 Wi-Fi 相同或極度相似的名稱（例如：`Airport_Free_WiFi`）。\n* **機制**：攻擊者的無線網卡會偽裝成合法的基地台，並向周圍發送強信號。由於行動裝置通常會自動連接信號最強或曾經連線過的 SSID，用戶極易在不知情中連上此假 AP。\n\n### 2. 攻擊危害\n一旦使用者連入假 AP，攻擊者即可輕易發動**中間人攻擊（Adversary-in-the-Middle, AiTM）**：\n* 監聽並攔截所有未加密的網路流量。\n* 導向偽造的登入頁面以竊取使用者帳密。\n\n### 3. 工具與對應\n* **常用工具**：**WiFi-Pumpkin**（專門用於建立假 AP 並內建多種中間人攻擊插件的測試框架）。\n* **MITRE ATT&CK 對應**：\n  * **技術**：**網路嗅探（Network Sniffing - T1040）** 與 **中間人攻擊（Adversary-in-the-Middle - T1557）**。\n* **高風險環境**：機場、咖啡廳等缺乏集中管控的**公共場所**。\n",
        "questions": [
            {
                "id": "Q31",
                "question": "What is the primary purpose of a Fake WAP (Fake Wireless Access Point)?",
                "options": [
                    "Increase network bandwidth",
                    "Conduct Man-in-the-Middle (MITM) attacks or steal credentials",
                    "Encrypt user data",
                    "Improve server performance"
                ],
                "answer": 1
            },
            {
                "id": "Q37",
                "question": "Fake WAP attacks are most likely to occur in which environment?",
                "options": [
                    "Private home offices",
                    "Public places such as airports and coffee shops",
                    "Inside data centers",
                    "Offline environments"
                ],
                "answer": 1
            },
            {
                "id": "Q38",
                "question": "Which tool is commonly used to create a Fake WAP for testing or attacks?",
                "options": [
                    "SQLmap",
                    "WiFi-Pumpkin",
                    "Wireshark",
                    "Metasploit"
                ],
                "answer": 1
            },
            {
                "id": "Q131",
                "question": "Fake WAP can be mapped to Network Sniffing (T1040) in MITRE ATT&CK.",
                "options": [
                    "True",
                    "False"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "社交工程與釣魚",
        "summary": "探討網路釣魚（Phishing）與誘騙轉向攻擊（Bait and Switch）等以人為核心的社交工程手法與對應的 MITRE 技術標籤。",
        "content": "### 1. 網路釣魚（Phishing）\n* **MITRE ID**：**T1566**。\n* **定義**：攻擊者發送含有惡意附件或連結的欺騙性訊息（通常是電子郵件），誘導受害者點擊。這是最常見且成功率極高的初始入侵技術。\n\n### 2. 水坑攻擊（Watering Hole Attack）\n* **定義**：這是一種針對特定群體的社交工程攻擊。\n* **原理**：攻擊者不直接攻擊受害者，而是分析受害者經常造訪的網站（如特定行業論壇、新聞網），並將該網站攻陷、植入惡意程式碼。當受害者造訪該站時，便會遭到靜默感染（Drive-by Download）。\n\n### 3. 誘騙轉向攻擊（Bait and Switch）\n* **原理**：攻擊者在網頁或搜尋引擎中展示一個看似完全合法、安全的連結（Bait，誘餌），但當使用者點擊該連結後，網頁會迅速將使用者重新導向（Redirect）至惡意的下載或釣魚頁面（Switch，轉向）。\n* **MITRE ATT&CK 對應**：此手法依賴使用者主動點擊與執行，因此對應於**「使用者執行（User Execution - T1204）」**技術。\n",
        "questions": [
            {
                "id": "Q32",
                "question": "Which MITRE Technique ID corresponds to Phishing?",
                "options": [
                    "T1040",
                    "T1190",
                    "T1566",
                    "T1078"
                ],
                "answer": 2
            },
            {
                "id": "Q39",
                "question": "How does a Bait and Switch attack typically work?",
                "options": [
                    "Directly brute-force passwords",
                    "Display a legitimate link first, then redirect users to malicious content",
                    "Steal session cookies",
                    "Attack a database backend"
                ],
                "answer": 1
            },
            {
                "id": "Q137",
                "question": "Bait and Switch attacks are commonly associated with User Execution (T1204) in MITRE.",
                "options": [
                    "True",
                    "False"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "憑證重用與防禦",
        "summary": "剖析憑證重用（Credential Reuse）與憑證填充（Credential Stuffing）的風險，並說明 MFA 及密碼管理器的關鍵防禦成效。",
        "content": "### 1. 憑證重用（Credential Reuse）\n* **成因**：使用者為了方便記憶，在不同的網站、服務上使用**同一組帳號與密碼**。\n* **本質**：這主要源於使用者的習慣與便利性取捨，而非系統本身的安全漏洞。\n\n### 2. 憑證填充（Credential Stuffing）\n* **MITRE ID**：**T1110.004**。\n* **原理**：攻擊者獲取網路上某個網站洩漏的帳號密碼資料庫（Cred dump）後，利用自動化腳本，將這些帳密大量嘗試登入其他高價值網站（如網路銀行、社群軟體）。\n\n### 3. 核心防禦對策\n* **多因素驗證（MFA）**：這是抵禦憑證竊取與重用最有效的防禦手段。即使攻擊者掌握了正確的密碼，也會因為無法提供第二因子（如手機 App 一次性驗證碼、硬體金鑰）而被阻擋在外。\n* **密碼管理器（Password Manager）**：強迫使用者為每個服務產生獨特且複雜的密碼，徹底根除憑證重用。\n",
        "questions": [
            {
                "id": "Q33",
                "question": "An attacker uses credentials leaked from one website to attempt logins on other platforms. What type of attack is this?",
                "options": [
                    "SQL Injection",
                    "Credential Reuse",
                    "Browser Hijacker",
                    "Bait and Switch"
                ],
                "answer": 1
            },
            {
                "id": "Q44",
                "question": "Which data source is most useful for detecting attackers using Valid Accounts?",
                "options": [
                    "Browser settings",
                    "Login logs or anomalous IP records",
                    "SQL query syntax",
                    "Ad-blocking records"
                ],
                "answer": 1
            },
            {
                "id": "Q45",
                "question": "What is the best recommendation for preventing Credential Reuse?",
                "options": [
                    "Use a VPN",
                    "Use a password manager and enable MFA",
                    "Install antivirus software",
                    "Avoid public Wi-Fi"
                ],
                "answer": 1
            },
            {
                "id": "Q133",
                "question": "Credential Reuse is mainly caused by system vulnerabilities and is unrelated to users choosing convenience.",
                "options": [
                    "True",
                    "False"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "SQL 注入與防禦",
        "summary": "深入 SQL 注入（SQLi）漏洞的發生機制，分類說明頻內、盲注與頻外注入，並推廣參數化查詢（Parameterized Queries）防禦手段。",
        "content": "### 1. SQL 注入（SQL Injection, SQLi）成因\n當 Web 應用程式**未能對使用者輸入的資料進行妥善的驗證、過濾或轉義（Sanitization）**，就直接將其拼接進 SQL 指令中發送給後端資料庫執行，即會產生 SQL 注入漏洞。\n* **MITRE ATT&CK 對應**：**利用面向公眾的應用程式漏洞（Exploit Public-Facing Application - T1190）**。\n\n### 2. SQLi 類型劃分\n\n| 注入類型 | 說明 | 適用情境 |\n| :--- | :--- | :--- |\n| **頻內 SQL 注入 (In-band SQLi)** | 攻擊者使用相同的通道發送攻擊並直接在網頁上獲取結果。 | Error-based（錯誤型）與 Union-based（聯合查詢型）。 |\n| **盲注 (Blind SQLi)** | 網頁不直接回顯資料或錯誤，攻擊者必須透過邏輯判斷（Boolean）或時間延遲（Time）來逐字猜測資料。 | 當其他直接提取技術皆失效時使用。 |\n| **頻外 SQL 注入 (Out-of-band SQLi)** | 透過其他通道（如利用資料庫發起 DNS 請求或 HTTP 請求）將資料導出到攻擊者控制的伺服器。 | 常用於內網隔離但資料庫支援特定外部解析協定時。 |\n\n### 3. 危害\n* 繞過登入驗證（如輸入 `' OR '1'='1` 繞過密碼檢查）。\n* 任意讀取、修改、刪除資料庫中的敏感資料。\n* 在特定資料庫（如 MSSQL 的 `xp_cmdshell`）下，甚至能直接執行作業系統指令，取得伺服器控制權。\n\n### 4. 最佳防禦實踐\n* **參數化查詢（Parameterized Queries / Prepared Statements）**：這是防禦 SQLi 最有效的方法。它將 SQL 指令的「結構」與「資料」分開處理，資料庫僅將使用者輸入視為純字串，絕不當作指令執行。\n* **避免拼接字串**：開發者應嚴格避免直接拼接使用者輸入來構建 SQL 語句。\n",
        "questions": [
            {
                "id": "Q34",
                "question": "SQL Injection primarily exploits which weakness?",
                "options": [
                    "Unstable network connections",
                    "Weak user passwords",
                    "Failure to properly validate or sanitize input data",
                    "Too many browser plugins"
                ],
                "answer": 2
            },
            {
                "id": "Q40",
                "question": "Which is a recommended defense against SQL Injection?",
                "options": [
                    "Use a VPN",
                    "Use Parameterized Queries",
                    "Enable MFA",
                    "Review email logs"
                ],
                "answer": 1
            },
            {
                "id": "Q47",
                "question": "Exploit Public-Facing Application (T1190) is commonly associated with which attack method?",
                "options": [
                    "SQL Injection",
                    "Phishing",
                    "Fake WAP",
                    "Browser Hijacker"
                ],
                "answer": 0
            },
            {
                "id": "Q132",
                "question": "SQL Injection usually occurs because a system fails to properly validate or filter user input.",
                "options": [
                    "True",
                    "False"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "會話劫持與傳輸加密",
        "summary": "解析會話劫持（Session Hijacking）原理，說明安全傳輸與安全 Cookie（Secure & HttpOnly）防護機制的關聯性。",
        "content": "### 1. 會話劫持（Session Hijacking）\n* **定義**：Web 應用程式通常使用 Session ID（儲存於 Cookie 中）來識別已登入的用戶。會話劫持是指攻擊者**通過竊聽、XSS 攻擊或預測等方式取得受害者的 Session Cookie / Session ID**。\n* **特性**：一旦取得 Session ID，攻擊者**不需要知道使用者的帳號密碼**，即可直接在瀏覽器中冒充該使用者進行操作。\n\n### 2. 傳輸層保護不足（Insufficient Transport Layer Protection）\n* **危害**：如果網站沒有強制使用加密傳輸（HTTPS），或者支持了過時的弱加密演算法、使用了過期憑證，攻擊者即可透過網路嗅探輕鬆截獲傳輸中的 Session Cookie 與敏感資料。\n\n### 3. 會話資料的傳遞規範\n* **安全原則**：**Session 識別資料絕對不應作為 GET 或 POST 的 URL 參數明文傳遞**。因為 URL 會被保存在瀏覽器歷史紀錄、代理伺服器日誌以及 HTTP Referer 標頭中，極易洩漏。\n\n### 4. 核心防禦對策\n* **HTTPS 全站加密**：確保所有傳輸數據在通道中皆經過加密，抵禦 Man-in-the-Middle 嗅探。\n* **HttpOnly 屬性**：將 Session Cookie 標記為 `HttpOnly`，瀏覽器內的 JavaScript 將無法存取該 Cookie，能有效防範透過 XSS 漏洞進行的 Session 竊取。\n* **Secure 屬性**：將 Cookie 標記為 `Secure`，確保此 Cookie 僅會在 HTTPS 加密連接中被傳送。\n",
        "questions": [
            {
                "id": "Q35",
                "question": "Which measure is most appropriate for preventing Session Hijacking?",
                "options": [
                    "Use HTTPS and HttpOnly Cookies",
                    "Install an ad blocker",
                    "Download software only from official websites",
                    "Change desktop wallpapers regularly"
                ],
                "answer": 0
            },
            {
                "id": "Q46",
                "question": "During Session Hijacking, what information is typically stolen?",
                "options": [
                    "The user's physical hardware",
                    "Session Cookie or Session ID",
                    "The user's BIOS password",
                    "The router's SSID"
                ],
                "answer": 1
            },
            {
                "id": "Q136",
                "question": "An attacker must know the user's password to perform Session Hijacking.",
                "options": [
                    "True",
                    "False"
                ],
                "answer": 1
            },
            {
                "id": "Q138",
                "question": "Using a VPN can help prevent traffic interception on public Wi-Fi networks.",
                "options": [
                    "True",
                    "False"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "瀏覽器劫持與惡意擴充",
        "summary": "探討瀏覽器劫持者（Browser Hijacker）的行為特徵與入侵管道，並建立下載官方擴充套件的安全觀念。",
        "content": "### 1. 瀏覽器劫持者（Browser Hijacker）\n* **特徵**：這是一種惡意軟體或惡意程式碼。一旦系統受感染，使用者的瀏覽器設定將在未經授權下被強制修改。\n* **常見症狀**：\n  * 瀏覽器首頁被修改為特定的廣告網站。\n  * 預設搜尋引擎被更換為未知的、充滿垃圾廣告的搜尋引擎。\n  * 頻繁跳出不明彈窗或重導向至惡意網頁。\n\n### 2. 入侵管道\n惡意瀏覽器擴充功能（Unsafe browser extensions）是這類劫持軟體進入系統的主要途徑。攻擊者常將劫持程式封裝在看似有用的第三方套件中，誘導使用者下載安裝。\n\n### 3. 安全防禦建議\n* **只信任官方商店**：**僅從官方應用程式商店（例如 Chrome 線上應用程式商店）下載與安裝瀏覽器擴充功能**，切勿安裝來源不明的第三方 `.crx` 套件。\n* **定期審查權限**：檢查已安裝擴充功能所擁有的權限，移除不再使用或權限過大的擴充套件。\n",
        "questions": [
            {
                "id": "Q42",
                "question": "What is a common symptom of a Browser Hijacker?",
                "options": [
                    "The computer shuts down automatically",
                    "The homepage or search engine is changed to a malicious website",
                    "Hard drive data is encrypted",
                    "Screen resolution decreases"
                ],
                "answer": 1
            },
            {
                "id": "Q135",
                "question": "Browser Hijackers may enter a system through unsafe browser extensions.",
                "options": [
                    "True",
                    "False"
                ],
                "answer": 1
            },
            {
                "id": "Q143",
                "question": "One way to prevent Browser Hijackers is to download browser extensions only from third-party software packages.",
                "options": [
                    "True",
                    "False"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "MITRE 與網頁安全攻擊",
        "topic": "OWASP 網頁弱點與防禦",
        "summary": "全面剖析 OWASP Top 10（失效存取控制、失效驗證、XXE 注入、安全配置錯誤等）之風險本質與實務防護。",
        "content": "### 1. OWASP Top 10 (2021) 首要漏洞\n* **第一名**：**失效的存取控制（Broken Access Control）**。這代表應用程式未能正確限制使用者存取其權限範圍外的資源。\n\n### 2. 常見關鍵漏洞解析\n* **失效的身份驗證（Broken Authentication）**：涉及登出功能不全、會話逾時過長、密碼變更管理漏洞等。攻擊者可藉此破解或繞過驗證，假冒用戶。\n* **參數篡改（Parameter Tampering）**：攻擊者直接修改客戶端與伺服器之間傳遞的 HTTP 請求參數（例如隱藏表單欄位、Query String 或 Cookie 值），若伺服器端未重新驗證權限即會中招。\n* **漏洞元件（Vulnerable Components）的危害**：使用有已知漏洞的第三方函式庫或框架非常危險，因為**這些底層組件在伺服器上執行時，通常擁有較高的系統權限**，極易導致遠端代碼執行（RCE）。\n* **XML 外部實體注入（XML External Entity, XXE）**：\n  * **原理**：XML 解析器在處理來自外部的實體宣告時，未加限制地載入外部資源。\n  * **危害**：可能導致讀取伺服器內部檔案（透過 `file://` URI）、發起伺服器端請求偽造（SSRF），或導致 DoS 攻擊。\n  * **經典攻擊**：**Billion Laughs 實體膨脹攻擊**（透過巢狀 XML 實體宣告，使解析器在記憶體中無限展開，導致伺服器當機）。\n\n### 3. 安全配置錯誤（Security Misconfiguration）\n* **常見配置失誤**：\n  1. 未停用、刪除系統預設帳戶與預設密碼。\n  2. **將網站檔案放置在作業系統 OS 磁碟區**（如 `C:` 碟或根目錄），一旦發生路徑穿越，系統檔案將暴露無遺。應放置在獨立且受限的磁碟分割區。\n  3. **不當的錯誤處理（Improper Error Handling）**：在生產環境直接將詳細的偵錯資訊、堆疊軌跡（Stack Trace）回顯給前端使用者（如 Ruben 案例中所遇到的配置錯誤），這為駭客指明了技術細節。\n* **防禦原則**：\n  * 實施**最小權限原則（Minimum privileges）**運行所有服務。\n  * 保護日誌檔（防止攻擊者竄改日誌以湮滅證據）。\n  * 敏感資料外洩防禦：**在離線狀態下生成與管理加密金鑰**，防止金鑰在網路傳輸中外洩。\n\n### 4. 稽核與測試工具\n* **Burp Suite**：網頁安全分析的旗艦工具，支援攔截、修改、重放 HTTP 流量，並提供漏洞掃描與手動漏洞利用。\n* **Nikto / OWASP ZAP**：常用於自動化的網頁弱點快速掃描。\n",
        "questions": [
            {
                "id": "Q48",
                "question": "What is the primary purpose of the MITRE ATT&CK framework?",
                "options": [
                    "Transform unstructured security incidents into structured attack behavior analysis",
                    "Used only for data backup",
                    "Replace all firewalls",
                    "Specifically for software development"
                ],
                "answer": 0
            },
            {
                "id": "Q49",
                "question": "Which attack belongs to the category of Social Engineering?",
                "options": [
                    "MAC Spoofing",
                    "Watering Hole Attack",
                    "ARP Spoofing",
                    "DoS"
                ],
                "answer": 1
            },
            {
                "id": "Q50",
                "question": "Which of the following application security risks occurs when untrusted data is sent to an interpreter as part of a command or query? (OWASP)",
                "options": [
                    "A6 – security misconfiguration",
                    "A3 – Sensitive data exposure",
                    "A1 – injection",
                    "A4 – XML external entity (XXE)"
                ],
                "answer": 2
            },
            {
                "id": "Q51",
                "question": "Which of the following security risks can disclose internal files using the file URI handler remote code execution and DoS attacks such as the billion laughs attack?",
                "options": [
                    "XML external entity (XXE)",
                    "Command injection",
                    "Broken authentication",
                    "Cross-site scripting (XSS)"
                ],
                "answer": 0
            }
        ]
    },
    {
        "subject": "無線網路與藍牙安全",
        "topic": "Wi-Fi 安全與加密協定",
        "summary": "分析 WEP、WPA、WPA2 及 WPA3 各代加密協定的安全弱點與機制，包含 Dragonfly（SAE）防禦字典攻擊的原理。",
        "content": "### 1. SSID 安全管理\n* **SSID 基礎**：SSID 即無線網路名稱，最大長度限制為 **32 字元**。\n* **SSID 廣播與隱藏**：廣播 SSID 易招致 SSID 被盜用或鎖定。雖然隱藏 SSID（SSID Cloaking）無法抵禦主動監聽嗅探，但仍是一項減少被隨機發現的配置手段。\n\n### 2. 無線加密協定演進\n\n| 協定 | 加密演算法 | 安全性與特徵 |\n| :--- | :--- | :--- |\n| **WEP** | RC4 | **極不安全**。使用 **24-bit 初始向量 (IV)**，因長度過短，IV 極易重複，攻擊者僅需蒐集足夠封包即可在數分鐘內破譯密鑰。 |\n| **WPA** | TKIP | 作為 WEP 到 WPA2 之間的過渡方案，以 TKIP 改善金鑰完整性，但仍具安全漏洞。 |\n| **WPA2** | AES-CCMP | 採用強健的 AES 演算法。支援 EAP 或 **RADIUS 伺服器**來提供企業級集中身份驗證與授權（802.1X）。 |\n| **WPA3** | AES-GCMP 256 | 當前最安全標準。引進 **Dragonfly 手合協定 (SAE)** 來取代 WPA2 的 PSK 四向交握，能有效阻擋離線字典攻擊與暴力破解。 |\n\n### 3. WPA3 的運作模式\n* **WPA3-Personal**：使用 **SAE（Simultaneous Authentication of Equals，等值同時驗證，即 Dragonfly 協定）** 提供密碼型認證。\n* **WPA3-Enterprise**：整合更高規格的 AES-GCMP 256 加密與更安全的分組密鑰交換（ECDH/ECDSA）。\n\n### 4. 軟 AP（Soft AP）威脅\n攻擊者在自身網卡上建立軟 AP（Soft AP）以模擬組織內部 AP，一旦內部裝置不慎關聯（Associate）此 Soft AP，攻擊者即可藉此繞過實體邊界，打通直連企業內網（Corporate Intranet）的通道。\n\n### 5. 802.11i 與 BSSID\n* **802.11i**：專門為 802.11 無線網路制定安全機制與加密規範的修正案。\n* **BSSID**：指 Access Point（無線基地台）的**實體 MAC 位址**，用於在多 AP 的環境中唯一識別該基地台。\n",
        "questions": [
            {
                "id": "Q58",
                "question": "Identify the protocol that uses AES-GCMP 256 encryption and ECDH/ECDSA key management.",
                "options": [
                    "WEP",
                    "WPA3",
                    "WPA",
                    "WPA2"
                ],
                "answer": 1
            },
            {
                "id": "Q59",
                "question": "Which mode of operation is responsible for Delivering password-based authentication using the SAE protocol?",
                "options": [
                    "WPA3-Personal",
                    "WPA3-Enterprise",
                    "WPA2-Enterprise",
                    "WPA2-Personal"
                ],
                "answer": 0
            },
            {
                "id": "Q69",
                "question": "What is the BSSID in wireless terminology?",
                "options": [
                    "The name of the network",
                    "The MAC address of an Access Point",
                    "The frequency band",
                    "The connection process"
                ],
                "answer": 1
            },
            {
                "id": "Q70",
                "question": "Which spread spectrum method switches a carrier among many frequency channels?",
                "options": [
                    "DSSS",
                    "OFDM",
                    "FHSS",
                    "MIMO-OFDM"
                ],
                "answer": 2
            }
        ]
    },
    {
        "subject": "無線網路與藍牙安全",
        "topic": "無線網路稽核與工具",
        "summary": "研習 Aircrack-ng 工具鏈實務（airmon, airodump, aireplay, airdecap）與 WPA2 四向交握攔截稽核流程。",
        "content": "### 1. Aircrack-ng 核心工具鏈\n在無線安全評估中，Aircrack-ng 是一套功能強大的完整工具套件：\n* **`airmon-ng`**：用於在網卡上**啟用或停用監聽模式（Monitor Mode）**。例如 `airmon-ng start wlan0` 會建立一個 `wlan0mon` 虛擬介面。\n* **`airodump-ng`**：用於捕獲空氣中的無線 802.11 封包，列出周圍所有 AP 的 BSSID、ESSID、信號強度、加密類型以及已連接的客戶端。\n* **`aireplay-ng`**：用於產生並注入無線流量，最常用於發動**解除驗證攻擊（Deauthentication Attack）**，強制受害者斷線並重連，以捕捉握手包。\n* **`aircrack-ng`**：用於破譯 WEP 與 WPA/WPA2-PSK 的金鑰。\n* **`airdecap-ng`**：用於使用已知密鑰解密已捕獲的 WEP/WPA 封包，並**剝除無線封包標頭（strip wireless headers）**，輸出標準的以太網 PCAP 檔案以供 Wireshark 分析。\n* **`airgraph-ng`**：分析 airodump-ng 的 CSV 日誌，繪製出客戶端與 AP 的關係圖（Client-to-AP relationship graph），輔助分析網路結構。\n\n### 2. WPA2 四向交握（4-way Handshake）稽核\n* **機制**：當客戶端連入 WPA2 加密網路時，AP 與客戶端會執行四次資料交換以生成單次會話金鑰（PTK）。\n* **Samson 案例分析**：如果安全人員成功捕獲此四向交握封包，即可在離線狀態下運行暴力破解或字典攻擊。若密碼強度不足，預共用金鑰（PSK）將被破譯。\n",
        "questions": [
            {
                "id": "Q82",
                "question": "Which Aircrack-ng tool is used to enable monitor mode on wireless interfaces?",
                "options": [
                    "Aircrack-ng",
                    "Airmon-ng",
                    "Airodump-ng",
                    "Aireplay-ng"
                ],
                "answer": 1
            },
            {
                "id": "Q83",
                "question": "Which tool is used to decrypt WEP/WPA packets and strip wireless headers?",
                "options": [
                    "Airtun-ng",
                    "Easside-ng",
                    "Airdecap-ng",
                    "Airgraph-ng"
                ],
                "answer": 2
            },
            {
                "id": "Q89",
                "question": "In the Samson scenario, which vulnerability process was compromised?",
                "options": [
                    "SQL query validation",
                    "WPA2 four-way handshake",
                    "Bluetooth pairing",
                    "Error message handling"
                ],
                "answer": 1
            },
            {
                "id": "Q90",
                "question": "Which Aircrack-ng tool creates a client-to-AP relationship graph?",
                "options": [
                    "Airbase-ng",
                    "Airgraph-ng",
                    "Airtun-ng",
                    "Packetforge-ng"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "無線網路與藍牙安全",
        "topic": "藍牙安全性與漏洞",
        "summary": "掌握藍牙 Blueprinting 偵查技術，以及 Bluejacking、Bluesnarfing、Bluebugging、Bluesmacking 與 KNOB 攻擊的原理與防禦機制。",
        "content": "### 1. 藍牙偵查：BluePrinting\n* **定義**：指通過掃描藍牙發射信號，收集目標藍牙設備的**製造商（Manufacturer）、硬體型號與韌體/軟體版本資訊**的技術，為後續漏洞利用做準備。\n\n### 2. 經典藍牙攻擊類型\n\n| 攻擊名稱 | 攻擊手法與危害 | 區分關鍵字 |\n| :--- | :--- | :--- |\n| **藍牙劫持 (Bluejacking)** | 向目標藍牙設備發送**未經授權的垃圾訊息**（如匿名卡片、文字）。不竊取資料，僅作騷擾。 | **垃圾訊息 (Unsolicited messages)** |\n| **藍牙竊資 (Bluesnarfing)** | 未經授權，直接**存取並竊取**目標設備內的敏感資訊（如通訊錄、行事曆、簡訊）。 | **竊取資料 (Theft of information)** |\n| **藍牙控制 (Bluebugging)** | 攻擊者利用安全漏洞控制受害者的設備，可控制其撥打電話、發送簡訊、竊聽通話。 | **遠端控制 (Remote control)** |\n| **藍牙阻斷 (Bluesmacking)** | 向目標設備發送超大尺寸或隨機垃圾封包，造成接收緩衝區溢位，導致藍牙裝置**當機或重啟**。 | **隨機封包溢位當機 (DoS / Overflow)** |\n\n### 3. KNOB 攻擊（Key Negotiation of Bluetooth）\n* **原理**：利用藍牙在配對建連時的**金鑰長度協商缺陷**。攻擊者作為中間人介入，強迫通訊雙方將加密金鑰長度降低至極限的 **1 Byte (8-bit)**。\n* **危害**：如此一來，攻擊者只需花費數毫秒即可暴力破解該金鑰，進而對藍牙通訊進行竊聽與中間人解密。\n\n### 4. 實務防禦與安全設定\n* **不可偵測模式（Non-discoverable Mode）**：藍牙不使用時應保持在非公開偵測狀態。\n* **不可配對模式（Non-pairable Mode）**：拒絕所有非主動發起的配對請求。\n* **關閉藍牙**：在公共場所且不需要時，將藍牙完全關閉。\n",
        "questions": [
            {
                "id": "Q71",
                "question": "Which IEEE amendment specifies security mechanisms for 802.11 networks?",
                "options": [
                    "802.11i",
                    "802.11b",
                    "802.16",
                    "802.11a"
                ],
                "answer": 0
            },
            {
                "id": "Q72",
                "question": "Which encryption algorithm uses a 24-bit Initialization Vector (IV)?",
                "options": [
                    "WPA2",
                    "AES",
                    "WEP",
                    "TKIP"
                ],
                "answer": 2
            },
            {
                "id": "Q78",
                "question": "What is the goal of \"\"BluePrinting\"\" in Bluetooth attacks?",
                "options": [
                    "Crashing the device",
                    "Collecting information about manufacturer and firmware",
                    "Stealing documents",
                    "Modifying data"
                ],
                "answer": 1
            },
            {
                "id": "Q79",
                "question": "Which Bluetooth attack involves sending unsolicited messages?",
                "options": [
                    "Bluesmacking",
                    "Bluejacking",
                    "Bluesnarfing",
                    "Bluebugging"
                ],
                "answer": 1
            }
        ]
    },
    {
        "subject": "無線網路與藍牙安全",
        "topic": "頻譜與寬頻無線技術",
        "summary": "介紹無線實體層的展頻技術（DSSS & FHSS）、寬頻無線標準（802.16 WiMax）與 MIMO-OFDM 技術應用。",
        "content": "### 1. 展頻技術（Spread Spectrum）\n展頻技術旨在將訊號散佈於寬廣的頻帶中傳輸，具有極強的抗干擾性與抗攔截能力。\n* **直接序列展頻（DSSS - Direct Sequence Spread Spectrum）**：\n  * **原理**：將原始的資料信號乘以一個高晶片速率的**偽隨機雜訊碼（PN Code，Pseudo-random Noise-spreading Code）**，使訊號散佈於較寬的頻帶上。\n  * **效果**：接收端使用相同的 PN 碼即可還原訊號，能有效抵抗干擾與多路徑效應。\n* **跳頻展頻（FHSS - Frequency Hopping Spread Spectrum）**：\n  * **原理**：載波頻率會在多個預先設定好的頻道之間，依循特定的隨機序列**快速且持續地進行切換（Hopping）**。\n\n### 2. IEEE 802.16 標準\n* **通稱**：**WiMax**（全球互通微波存取，Worldwide Interoperability for Microwave Access）。\n* **定位**：一種提供都會網路（MAN）寬頻無線接取的標準，用以取代部分傳統實體線路。\n\n### 3. MIMO-OFDM 技術\n* **定義**：多輸入多輸出（MIMO）與正交分頻多工（OFDM）的結合。\n* **應用**：被廣泛應用於現代 **4G LTE 與 5G 寬頻無線通訊技術**中，能大幅提升頻寬、資料傳輸速率與多裝置抗干擾能力。\n",
        "questions": [
            {
                "id": "Q55",
                "question": "Which of the following terms is a spread spectrum technique that multiplies the original data signal with a pseudo-random noise-spreading code?",
                "options": [
                    "ISM band",
                    "BSSID",
                    "SSID",
                    "DSSS"
                ],
                "answer": 3
            },
            {
                "id": "Q56",
                "question": "Identify the IEEE 802.16 standard.",
                "options": [
                    "Wi-Fi",
                    "WiMax",
                    "ZigBee",
                    "Bluetooth"
                ],
                "answer": 1
            },
            {
                "id": "Q57",
                "question": "In which of the following attacks does an attacker create a soft AP on a laptop to make the laptop’s NIC appear as a legitimate AP?",
                "options": [
                    "Ad-hoc connection",
                    "Honeypot AP",
                    "Unauthorized association",
                    "AP MAC spoofing"
                ],
                "answer": 1
            },
            {
                "id": "Q119",
                "question": "DSSS spreads a signal over a wider frequency band to protect against interference.",
                "options": [
                    "True",
                    "False"
                ],
                "answer": 1
            }
        ]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HANDOUTS_DATA;
} else {
    window.HANDOUTS_DATA = HANDOUTS_DATA;
}