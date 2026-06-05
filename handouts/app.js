// ==========================================================================
// 🛡️ 網路安全與道德駭客 講義網站核心邏輯 (app.js)
// Features: Dynamic Navigation, Custom Markdown Engine, LocalStorage Progress,
//           Interactive Practice Questions, Real-time Search Filter, Multi-Theme.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Global State & DOM Cache ---
    const State = {
        currentTopicIdx: -1,
        completedTopics: JSON.parse(localStorage.getItem('completed_topics') || '[]'),
        theme: localStorage.getItem('handout_theme') || 'twilight',
        searchQuery: '',
    };

    const DOM = {
        navMenu: document.getElementById('nav-menu'),
        handoutArticle: document.getElementById('handout-article'),
        questionsSection: document.getElementById('questions-section'),
        questionsList: document.getElementById('questions-list'),
        articleFooter: document.getElementById('article-footer'),
        prevTopicBtn: document.getElementById('prev-topic-btn'),
        nextTopicBtn: document.getElementById('next-topic-btn'),
        markReadBtn: document.getElementById('mark-read-btn'),
        progressBar: document.getElementById('progress-bar'),
        progressPercent: document.getElementById('progress-percent'),
        progressText: document.getElementById('progress-text'),
        searchInput: document.getElementById('search-input'),
        sidebar: document.getElementById('sidebar'),
        sidebarToggle: document.getElementById('sidebar-toggle'),
        overlay: document.getElementById('overlay'),
        themeToggleMobile: document.getElementById('theme-toggle-mobile'),
        themeToggleDesktop: document.getElementById('theme-toggle-desktop')
    };

    // --- 2. Theme Management ---
    function applyTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('handout_theme', themeName);
        State.theme = themeName;
    }

    function toggleTheme() {
        const themes = ['twilight', 'light', 'cyber'];
        let nextIdx = (themes.indexOf(State.theme) + 1) % themes.length;
        applyTheme(themes[nextIdx]);
    }

    applyTheme(State.theme);
    DOM.themeToggleDesktop.addEventListener('click', toggleTheme);
    DOM.themeToggleMobile.addEventListener('click', toggleTheme);

    // --- 3. Sidebar Responsive Controls ---
    function toggleSidebar() {
        DOM.sidebar.classList.toggle('open');
    }

    DOM.sidebarToggle.addEventListener('click', toggleSidebar);
    DOM.overlay.addEventListener('click', toggleSidebar);

    // --- 4. Navigation & Menu Generation ---
    function initNavigation() {
        if (!window.HANDOUTS_DATA || !window.HANDOUTS_DATA.length) {
            DOM.navMenu.innerHTML = '<div style="color:var(--wrong);">錯誤：無法取得講義數據！</div>';
            return;
        }

        // 整理階層關係 (Subject -> Topics)
        const subjects = {};
        window.HANDOUTS_DATA.forEach((item, idx) => {
            if (!subjects[item.subject]) {
                subjects[item.subject] = [];
            }
            subjects[item.subject].push({ ...item, globalIdx: idx });
        });

        DOM.navMenu.innerHTML = '';
        
        Object.keys(subjects).forEach(subName => {
            const section = document.createElement('div');
            section.className = 'nav-subject-section';
            
            const subHeader = document.createElement('div');
            subHeader.className = 'nav-subject-header';
            subHeader.innerHTML = `
                <span>${subName}</span>
                <span class="nav-subject-count">${subjects[subName].length}</span>
            `;
            section.appendChild(subHeader);

            const ul = document.createElement('ul');
            ul.className = 'nav-topic-list';

            subjects[subName].forEach(topic => {
                const li = document.createElement('li');
                li.className = 'nav-topic-item';
                li.id = `nav-item-${topic.globalIdx}`;
                
                // 標記已讀類別
                if (State.completedTopics.includes(topic.topic)) {
                    li.classList.add('read');
                }

                li.innerHTML = `
                    <span class="nav-topic-title">${topic.topic}</span>
                    <span class="read-dot"></span>
                `;

                li.onclick = () => {
                    loadHandout(topic.globalIdx);
                    if (window.innerWidth <= 1024) {
                        toggleSidebar();
                    }
                };

                ul.appendChild(li);
            });

            section.appendChild(ul);
            DOM.navMenu.appendChild(section);
        });

        updateProgress();
    }

    // --- 5. Progress Tracking ---
    function updateProgress() {
        const total = window.HANDOUTS_DATA.length;
        const readCount = State.completedTopics.length;
        const percent = total > 0 ? Math.round((readCount / total) * 100) : 0;
        
        DOM.progressBar.style.width = `${percent}%`;
        DOM.progressPercent.textContent = `${percent}%`;
        DOM.progressText.textContent = `已讀 ${readCount} / ${total} 單元`;
    }

    function toggleReadStatus() {
        if (State.currentTopicIdx === -1) return;
        const topicName = window.HANDOUTS_DATA[State.currentTopicIdx].topic;
        const itemEl = document.getElementById(`nav-item-${State.currentTopicIdx}`);

        if (State.completedTopics.includes(topicName)) {
            // 取消已讀
            State.completedTopics = State.completedTopics.filter(t => t !== topicName);
            DOM.markReadBtn.classList.remove('completed');
            DOM.markReadBtn.querySelector('.read-btn-text').textContent = '標記為已讀';
            if (itemEl) itemEl.classList.remove('read');
        } else {
            // 設為已讀
            State.completedTopics.push(topicName);
            DOM.markReadBtn.classList.add('completed');
            DOM.markReadBtn.querySelector('.read-btn-text').textContent = '已讀取';
            if (itemEl) itemEl.classList.add('read');
        }

        localStorage.setItem('completed_topics', JSON.stringify(State.completedTopics));
        updateProgress();
    }

    DOM.markReadBtn.addEventListener('click', toggleReadStatus);

    // --- 6. Handout Loader & Content Generator ---
    function loadHandout(globalIdx) {
        if (globalIdx < 0 || globalIdx >= window.HANDOUTS_DATA.length) return;
        State.currentTopicIdx = globalIdx;
        const item = window.HANDOUTS_DATA[globalIdx];

        // 1. 更新選單 Active 狀態
        document.querySelectorAll('.nav-topic-item').forEach(el => el.classList.remove('active'));
        const activeItem = document.getElementById(`nav-item-${globalIdx}`);
        if (activeItem) activeItem.classList.add('active');

        // 2. 渲染講義本文
        const htmlContent = parseMarkdown(item.content);
        DOM.handoutArticle.innerHTML = `
            <div class="handout-header">
                <span class="subject-badge">${item.subject}</span>
                <h2 class="topic-title">${item.topic}</h2>
                <p class="topic-summary">${item.summary}</p>
            </div>
            <div class="handout-body">
                ${htmlContent}
            </div>
        `;
        highlightGlossary(DOM.handoutArticle.querySelector('.handout-body'));
        setupGlossaryEvents();

        // 3. 處理已讀按鈕顯示
        if (State.completedTopics.includes(item.topic)) {
            DOM.markReadBtn.classList.add('completed');
            DOM.markReadBtn.querySelector('.read-btn-text').textContent = '已讀取';
        } else {
            DOM.markReadBtn.classList.remove('completed');
            DOM.markReadBtn.querySelector('.read-btn-text').textContent = '標記為已讀';
        }

        // 4. 載入並渲染關聯考題
        renderQuestions(item.questions || []);

        // 5. 更新上一頁、下一頁按鈕狀態
        DOM.prevTopicBtn.disabled = globalIdx === 0;
        DOM.nextTopicBtn.disabled = globalIdx === window.HANDOUTS_DATA.length - 1;

        DOM.articleFooter.classList.remove('hidden');
        
        // 6. 自動滾動回頂部
        document.querySelector('.main-content').scrollTop = 0;
    }

    // --- 7. Interactive Practice Generator ---
    function renderQuestions(questions) {
        if (!questions.length) {
            DOM.questionsSection.classList.add('hidden');
            DOM.questionsList.innerHTML = '';
            return;
        }

        DOM.questionsSection.classList.remove('hidden');
        DOM.questionsList.innerHTML = '';

        questions.forEach((q, qIdx) => {
            const card = document.createElement('div');
            card.className = 'quiz-card';
            
            const optionLabels = ['A', 'B', 'C', 'D'];
            let optionsHTML = '';
            q.options.forEach((opt, oIdx) => {
                optionsHTML += `
                    <div class="quiz-option" data-oidx="${oIdx}">
                        <span class="quiz-option-key">${optionLabels[oIdx]}</span>
                        <span class="quiz-option-val">${escapeHtml(opt)}</span>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="quiz-q-header">
                    <span class="quiz-id">${q.id}</span>
                    <span class="quiz-question">${escapeHtml(q.question)}</span>
                </div>
                <div class="quiz-options">
                    ${optionsHTML}
                </div>
                <div class="quiz-explanation-box hidden" id="expl-box-${qIdx}">
                    <div class="expl-status"></div>
                    <div class="expl-text">
                        <strong>正確答案解析：</strong> 正確答案為 <strong>${optionLabels[q.answer]}. ${escapeHtml(q.options[q.answer])}</strong>。<br>
                        安全觀念在於理解該安全防禦機制的底層原理，避免拼湊或缺乏安全保護的實體介面。
                    </div>
                </div>
            `;

            // 選擇答案事件綁定
            const optionsEls = card.querySelectorAll('.quiz-option');
            optionsEls.forEach(optEl => {
                optEl.onclick = () => {
                    if (card.classList.contains('answered')) return;
                    card.classList.add('answered');

                    const selectedIdx = parseInt(optEl.dataset.oidx);
                    const isCorrect = selectedIdx === q.answer;
                    
                    // 標記選項樣式
                    optEl.classList.add(isCorrect ? 'correct' : 'wrong');
                    if (!isCorrect) {
                        // 提示正確選項
                        optionsEls[q.answer].classList.add('correct');
                    }

                    // 顯示解析
                    const explBox = card.querySelector('.quiz-explanation-box');
                    const explStatus = card.querySelector('.expl-status');
                    explStatus.className = `expl-status ${isCorrect ? 'is-correct' : 'is-wrong'}`;
                    explStatus.textContent = isCorrect ? '✓ 答對了！恭喜觀念非常清晰！' : '✗ 答錯了！請看下方詳細觀念釐清。';
                    explBox.classList.remove('hidden');
                };
            });

            DOM.questionsList.appendChild(card);
        });
    }

    // --- 8. Next / Prev Navigation ---
    DOM.prevTopicBtn.onclick = () => {
        if (State.currentTopicIdx > 0) {
            loadHandout(State.currentTopicIdx - 1);
        }
    };

    DOM.nextTopicBtn.onclick = () => {
        if (State.currentTopicIdx < window.HANDOUTS_DATA.length - 1) {
            loadHandout(State.currentTopicIdx + 1);
        }
    };

    // --- 9. Real-time Search Engine ---
    DOM.searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase().trim();
        State.searchQuery = query;

        const sections = document.querySelectorAll('.nav-subject-section');
        sections.forEach(sec => {
            const items = sec.querySelectorAll('.nav-topic-item');
            let hasVisibleItem = false;

            items.forEach(item => {
                const topicIdx = parseInt(item.id.replace('nav-item-', ''));
                const topicData = window.HANDOUTS_DATA[topicIdx];
                
                const titleMatch = topicData.topic.toLowerCase().includes(query);
                const summaryMatch = topicData.summary.toLowerCase().includes(query);
                const contentMatch = topicData.content.toLowerCase().includes(query);

                if (titleMatch || summaryMatch || contentMatch) {
                    item.classList.remove('hidden');
                    hasVisibleItem = true;
                } else {
                    item.classList.add('hidden');
                }
            });

            if (hasVisibleItem) {
                sec.classList.remove('hidden');
            } else {
                sec.classList.add('hidden');
            }
        });
    };

    // --- 10. Lightweight Custom Markdown Engine ---
    function parseMarkdown(md) {
        if (!md) return '';
        
        const trimmed = md.trim();
        if (trimmed.startsWith('<')) {
            return md;
        }
        
        const lines = md.split('\n');
        let html = '';
        let inList = false;
        let inNestedList = false;
        let inTable = false;
        let tableHeaders = null;
        let tableRows = [];

        const flushList = () => {
            if (inNestedList) {
                html += '</ul>';
                inNestedList = false;
            }
            if (inList) {
                html += '</ul>';
                inList = false;
            }
        };

        const flushTable = () => {
            if (inTable) {
                html += '<div class="handout-table-wrapper"><table>';
                if (tableHeaders) {
                    html += '<thead><tr>';
                    tableHeaders.forEach(h => {
                        html += `<th>${h}</th>`;
                    });
                    html += '</tr></thead>';
                }
                html += '<tbody>';
                tableRows.forEach(row => {
                    html += '<tr>';
                    row.forEach(cell => {
                        html += `<td>${cell}</td>`;
                    });
                    html += '</tr>';
                });
                html += '</tbody></table></div>';
                inTable = false;
                tableHeaders = null;
                tableRows = [];
            }
        };

        for (let i = 0; i < lines.length; i++) {
            const rawLine = lines[i];
            let line = rawLine.trim();
            
            // 1. Table Matching
            if (line.startsWith('|') && line.endsWith('|')) {
                flushList();
                inTable = true;
                const cells = line.split('|').slice(1, -1).map(c => parseInline(c.trim()));
                if (cells.every(c => c.match(/^:?-+:?$/))) {
                    continue;
                }
                if (!tableHeaders && tableRows.length === 0) {
                    tableHeaders = cells;
                } else {
                    tableRows.push(cells);
                }
                continue;
            } else {
                flushTable();
            }

            // 2. Headings
            if (line.startsWith('#### ')) {
                flushList();
                html += `<h4>${parseInline(line.substring(5))}</h4>`;
            } else if (line.startsWith('### ')) {
                flushList();
                html += `<h3>${parseInline(line.substring(4))}</h3>`;
            } else if (line.startsWith('## ')) {
                flushList();
                html += `<h2>${parseInline(line.substring(3))}</h2>`;
            } else if (line.startsWith('# ')) {
                flushList();
                html += `<h1>${parseInline(line.substring(2))}</h1>`;
            } 
            // 3. Bullet & Numbered Lists
            else if (line.startsWith('* ') || line.startsWith('- ')) {
                const matchIndent = rawLine.match(/^(\s*)/);
                const indentLevel = matchIndent ? matchIndent[1].length : 0;
                
                if (indentLevel >= 2) {
                    // It is a nested list item!
                    if (!inList) {
                        html += '<ul style="margin-left:20px; margin-bottom:16px; list-style-type:disc;">';
                        inList = true;
                    }
                    if (!inNestedList) {
                        html += '<ul style="margin-left:20px; margin-top:4px; margin-bottom:4px; list-style-type:circle;">';
                        inNestedList = true;
                    }
                    html += `<li>${parseInline(line.substring(2))}</li>`;
                } else {
                    // It is a main list item!
                    if (inNestedList) {
                        html += '</ul>';
                        inNestedList = false;
                    }
                    if (!inList) {
                        html += '<ul style="margin-left:20px; margin-bottom:16px; list-style-type:disc;">';
                        inList = true;
                    }
                    html += `<li>${parseInline(line.substring(2))}</li>`;
                }
            }
            else if (line.match(/^\d+\.\s/)) {
                if (inNestedList) {
                    html += '</ul>';
                    inNestedList = false;
                }
                if (!inList) {
                    html += '<ul style="margin-left:20px; margin-bottom:16px; list-style-type:decimal;">';
                    inList = true;
                }
                const cleanText = line.replace(/^\d+\.\s/, '');
                html += `<li>${parseInline(cleanText)}</li>`;
            }
            // 4. Empty and paragraphs
            else if (line === '') {
                flushList();
            } else {
                flushList();
                html += `<p>${parseInline(line)}</p>`;
            }
        }
        
        flushList();
        flushTable();

        return html;
    }

    function parseInline(text) {
        let clean = escapeHtml(text);
        
        // Bold: **text**
        clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Inline code: `code`
        clean = clean.replace(/`(.*?)`/g, '<code>$1</code>');

        return clean;
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    // --- 10.5 Glossary Tooltip System ---
    const GLOSSARY_DATA = {
        "PCI-DSS": "支付卡產業資料安全標準 (Payment Card Industry Data Security Standard)，規定處理信用卡資訊之組織每年至少執行一次滲透測試。",
        "HIPAA": "醫療保險可攜性與責任法案 (Health Insurance Portability and Accountability Act)，旨在保護電子醫療資料的安全性與隱私，要求定期進行風險評估。",
        "MIMO-OFDM": "多輸入多輸出正交分頻多工技術，結合多天線(MIMO)與分頻多工(OFDM)，廣泛應用於現代 4G LTE 與 5G 無線通訊，提升傳輸速率與抗干擾能力。",
        "Rogue AP": "惡意或未授權的無線存取點 (Rogue Access Point)。通常由內部員工私接或攻擊者惡意部署以進行中間人攻擊 (MITM)。",
        "Fake WAP": "假無線存取點 (Fake Wireless Access Point)。攻擊者設置與合法網路同名或極度相似的 SSID (如 Evil Twin)，誘使受害者連接以監聽或篡改網路流量。",
        "SSID": "服務設定識別碼 (Service Set Identifier)，即無線區域網路 (WLAN) 的名稱，用來區分不同的 Wi-Fi 網路。",
        "BSSID": "基本服務設定識別碼 (Basic Service Set Identifier)，通常是無線 AP 網卡的實體 MAC 位址，在二層網路中唯一識別一個無線存取點。",
        "802.11i": "IEEE 針對無線區域網路的安全標準。定義了增強型安全機制 (RSN)，包括 4-Way Handshake 以及對 WPA2/WPA3 的基礎架構支援。",
        "Aircrack-ng": "一套用於審查無線網路安全的完整工具鏈，包含 airodump-ng (抓包)、aireplay-ng (注入)、aircrack-ng (密鑰破解) 等工具。",
        "OWASP Top 10": "開放網路軟體安全計劃公佈的十大最關鍵 Web 應用程式安全風險。2021 年首位為「失效的存取控制」(Broken Access Control)。",
        "SQL 注入": "SQL Injection (SQLi)。因 Web 應用直接將用戶輸入拼接到 SQL 語句中執行，導致攻擊者可控制資料庫查詢，甚至取得系統管理權限。",
        "SQLi": "SQL Injection (SQLi)。因 Web 應用直接將用戶輸入拼接到 SQL 語句中執行，導致攻擊者可控制資料庫查詢，甚至取得系統管理權限。",
        "會話劫持": "Session Hijacking。攻擊者竊取或預測受害者的 Session ID (會話識別碼)，從而繞過身分驗證，以受害者身分在 Web 服務中進行操作。",
        "傳輸層保護不足": "Insufficient Transport Layer Protection。網站未使用 HTTPS 或 SSL/TLS 加密傳輸敏感資料，導致資料在傳輸過程中可被竊聽或篡改。",
        "瀏覽器劫持": "Browser Hijacker，一種惡意軟體，未經用戶同意篡改瀏覽器設定 (如首頁、預設搜尋引擎、甚至導向惡意網頁)。",
        "水坑攻擊": "Watering Hole Attack。攻擊者分析並入侵目標群體經常訪問的特定網站，並在其中植入惡意代碼，使訪問該網站的目標群體受感染。",
        "網路釣魚": "Phishing。攻擊者利用電子郵件、簡訊或假網站偽裝成信譽機構，欺騙受害者輸入帳號密碼、信用卡號等敏感資訊。",
        "憑證填充": "Credential Stuffing。攻擊者利用已外洩的帳密列表 (社工庫)，使用自動化工具在其他網站嘗試登入，盜取重複使用相同密碼的帳戶。",
        "憑證重用": "Credential Reuse。用戶在不同平台使用完全相同的帳號密碼，一旦其中一個平台資料外洩，所有帳戶都面臨被盜風險。",
        "MITRE ATT&CK": "基於真實攻擊案例整理的對抗性戰術、技術和公共知識庫，為企業提供威脅檢測、防禦評估與紅藍對抗的標準框架。",
        "TTP": "戰術、技術與程序 (Tactics, Techniques, and Procedures)。戰術是攻擊者的策略目標，技術是實現目標的手段，程序是具體的執行步驟。",
        "WHOIS": "一種用於查詢網域註冊資訊的數據庫查詢協議。可查出域名所有人、註冊商、DNS 伺服器與 IP 範圍等敏感資訊。",
        "Nmap": "網路對應與掃描工具 (Network Mapper)，用於主機發現、連接埠掃描、服務與作業系統偵測，是滲透測試的基礎掃描工具。",
        "Nessus": "業界廣為使用的自動化漏洞掃描器，可對主機、網絡設備與系統進行 CVE 弱點評估，產出詳細報告與修補建議。",
        "CVE": "常見漏洞與披露 (Common Vulnerabilities and Exposures)，是收錄已知安全漏洞的國際字典，為每個漏洞分配唯一的識別編號 (如 CVE-2023-xxxx)。",
        "SYN 掃描": "SYN Scan (半開放掃描 Semi-open Scan)。僅發送 SYN 封包，若收到 SYN/ACK 則代表埠開放並發送 RST 中斷，不完成 TCP 三向交握，不易被應用層紀錄。",
        "theHarvester": "開源開源情報 (OSINT) 蒐集工具，能從各大搜尋引擎、PGP 金鑰伺服器等蒐集與目標域名關聯的電子郵件、子域名、雇員名稱等。",
        "OSINT": "開源情報 (Open Source Intelligence)，指透過公開的合法渠道 (如搜尋引擎、社交網路、論壇等) 蒐集、分析與產出有價值的情報。",
        "WPA3": "Wi-Fi 網路安全存取第三代協議。引入對稱金鑰建立 (SAE) 取代 WPA2 的四向交握認證，大幅強化抗離線暴力破解與字典攻擊的能力。",
        "Soft AP": "軟體無線存取點 (Software Access Point)。利用普通電腦或手機的無線網卡搭配軟體模擬出無線 AP，常被用於建立 Rogue AP 進行攻擊。",
        "DDoS": "分散式阻斷服務攻擊，利用大量受控主機同時向目標發送大量垃圾流量，使其資源耗盡而無法提供正常服務。",
        "Zero-day": "零日漏洞 (Zero-day Vulnerability)，指尚未被軟體廠商發現或尚未發佈修補程式的安全漏洞，防範難度極高。"
    };

    let tooltipTimeout = null;
    let activeTooltip = null;

    function highlightGlossary(element) {
        if (!element) return;
        const terms = Object.keys(GLOSSARY_DATA).sort((a, b) => b.length - a.length);
        
        function walk(node) {
            if (node.nodeType === 3) { // Text node
                const text = node.nodeValue;
                let matchedTerm = null;
                let matchedIdx = -1;
                
                for (const term of terms) {
                    const idx = text.indexOf(term);
                    if (idx !== -1) {
                        matchedTerm = term;
                        matchedIdx = idx;
                        break;
                    }
                }
                
                if (matchedTerm) {
                    const beforeText = text.substring(0, matchedIdx);
                    const afterText = text.substring(matchedIdx + matchedTerm.length);
                    
                    const span = document.createElement('span');
                    span.className = 'glossary-term';
                    span.setAttribute('data-term', matchedTerm);
                    span.textContent = matchedTerm;
                    
                    const beforeNode = document.createTextNode(beforeText);
                    const afterNode = document.createTextNode(afterText);
                    
                    const parent = node.parentNode;
                    parent.insertBefore(beforeNode, node);
                    parent.insertBefore(span, node);
                    parent.insertBefore(afterNode, node);
                    parent.removeChild(node);
                    
                    walk(afterNode);
                }
            } else if (node.nodeType === 1 && 
                       node.nodeName !== 'SCRIPT' && 
                       node.nodeName !== 'STYLE' && 
                       node.nodeName !== 'CODE' && 
                       node.nodeName !== 'PRE' &&
                       !node.classList.contains('glossary-term')) {
                const children = Array.from(node.childNodes);
                for (const child of children) {
                    walk(child);
                }
            }
        }
        walk(element);
    }

    function setupGlossaryEvents() {
        const termsElements = document.querySelectorAll('.glossary-term');
        termsElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const term = el.getAttribute('data-term');
                const explanation = GLOSSARY_DATA[term];
                if (!explanation) return;
                
                if (tooltipTimeout) clearTimeout(tooltipTimeout);
                
                tooltipTimeout = setTimeout(() => {
                    showTooltip(el, explanation);
                }, 1000);
            });
            
            el.addEventListener('mouseleave', () => {
                if (tooltipTimeout) {
                    clearTimeout(tooltipTimeout);
                    tooltipTimeout = null;
                }
                hideTooltip();
            });
        });
    }

    function showTooltip(targetEl, text) {
        hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'glossary-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-title">${targetEl.textContent}</div>
            <div class="tooltip-body">${text}</div>
        `;
        document.body.appendChild(tooltip);
        
        const rect = targetEl.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        let top = rect.top + scrollTop - tooltip.offsetHeight - 8;
        let left = rect.left + scrollLeft + (rect.width - tooltip.offsetWidth) / 2;
        
        if (rect.top - tooltip.offsetHeight - 8 < 0) {
            top = rect.bottom + scrollTop + 8;
        }
        
        if (left < 8) {
            left = 8;
        } else if (left + tooltip.offsetWidth > window.innerWidth - 8) {
            left = window.innerWidth - tooltip.offsetWidth - 8;
        }
        
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        
        requestAnimationFrame(() => {
            tooltip.classList.add('visible');
        });
        
        activeTooltip = tooltip;
    }

    function hideTooltip() {
        if (activeTooltip) {
            activeTooltip.classList.remove('visible');
            const temp = activeTooltip;
            activeTooltip = null;
            setTimeout(() => {
                if (temp.parentNode) {
                    temp.parentNode.removeChild(temp);
                }
            }, 200);
        }
    }

    // --- 11. Initial Kickoff ---
    initNavigation();
});
