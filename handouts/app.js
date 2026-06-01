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
        
        const lines = md.split('\n');
        let html = '';
        let inList = false;
        let inTable = false;
        let tableHeaders = null;
        let tableRows = [];

        const flushList = () => {
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
            let line = lines[i].trim();
            
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
            if (line.startsWith('### ')) {
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
                if (!inList) {
                    html += '<ul style="margin-left:20px; margin-bottom:16px; list-style-type:disc;">';
                    inList = true;
                }
                html += `<li>${parseInline(line.substring(2))}</li>`;
            }
            else if (line.match(/^\d+\.\s/)) {
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

    // --- 11. Initial Kickoff ---
    initNavigation();
});
