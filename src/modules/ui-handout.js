import { DOM, Config } from './state.js';

export const UIHandout = {
    handoutsData: [],
    subjects: {},

    init: async function() {
        const select = document.getElementById('handout-subject-select');
        const menu = document.getElementById('handout-topics-menu');
        const content = document.getElementById('handout-content-area');
        
        if (!select || !menu || !content) return;

        // 綁定事件
        select.addEventListener('change', () => this.handleSubjectChange());
        
        // 載入講義資料
        try {
            const res = await fetch(Config.HANDOUTS_PATH);
            if (!res.ok) throw new Error('無法載入講義資料');
            this.handoutsData = await res.json();
            
            // 組織科目與主題
            this.subjects = {};
            this.handoutsData.forEach(item => {
                if (!this.subjects[item.subject]) {
                    this.subjects[item.subject] = [];
                }
                this.subjects[item.subject].push(item);
            });

            // 渲染科目下拉選單
            select.innerHTML = '<option value="">請選擇科目...</option>';
            Object.keys(this.subjects).forEach(sub => {
                const opt = document.createElement('option');
                opt.value = sub;
                opt.textContent = sub;
                select.appendChild(opt);
            });
        } catch (err) {
            console.error('初始化講義失敗:', err);
            content.innerHTML = `
                <div style="color:var(--wrong); text-align:center; padding:100px 0;">
                    <h3>🚫 講義載入失敗</h3>
                    <p style="margin-top:8px; font-size:0.85rem;">${err.message || '未知錯誤'}</p>
                </div>
            `;
        }
    },

    handleSubjectChange: function() {
        const select = document.getElementById('handout-subject-select');
        const menu = document.getElementById('handout-topics-menu');
        const content = document.getElementById('handout-content-area');
        
        if (!select || !menu || !content) return;

        const sub = select.value;
        if (!sub) {
            menu.innerHTML = '<div style="color: var(--muted); font-size: 0.85rem; text-align: center; padding: 20px 0;">請先選擇科目</div>';
            content.innerHTML = `
                <div style="color: var(--muted); text-align: center; padding: 120px 0;">
                    <h3 style="margin-bottom:8px; color: var(--text);">請選擇主題開始閱讀</h3>
                    <p style="font-size: 0.85rem;">透過講義深入理解每個章節的核心觀念與考題解析</p>
                </div>
            `;
            return;
        }

        const topics = this.subjects[sub] || [];
        menu.innerHTML = '';
        
        topics.forEach(item => {
            const card = document.createElement('div');
            card.className = 'quiz-card';
            card.style.padding = '10px 14px';
            card.style.marginBottom = '6px';
            card.innerHTML = `
                <div class="name" style="font-size:0.9rem;">${item.topic}</div>
                <div class="meta" style="font-size:0.75rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.summary}</div>
            `;
            card.onclick = () => {
                // 取消其他張卡的選取狀態
                menu.querySelectorAll('.quiz-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.displayHandout(item);
            };
            menu.appendChild(card);
        });

        content.innerHTML = `
            <div style="color: var(--muted); text-align: center; padding: 120px 0;">
                <h3 style="margin-bottom:8px; color: var(--text);">請從左側選擇主題</h3>
                <p style="font-size: 0.85rem;">目前科目：${sub}，共 ${topics.length} 個單元</p>
            </div>
        `;
    },

    displayHandout: function(item) {
        const content = document.getElementById('handout-content-area');
        if (!content) return;

        // 使用 Markdown 解析器渲染講義
        const htmlContent = this.parseMarkdown(item.content);
        
        content.innerHTML = `
            <div style="margin-bottom:20px; border-bottom:2px solid var(--border); padding-bottom:12px;">
                <span class="badge badge-primary" style="margin-bottom:8px;">${item.subject}</span>
                <h1 style="margin: 4px 0 8px; color: var(--text); font-size:1.5rem;">${item.topic}</h1>
                <p style="color:var(--muted); font-size:0.88rem;">${item.summary}</p>
            </div>
            <div class="handout-body" style="color:var(--text); line-height:1.7;">
                ${htmlContent}
            </div>
        `;
    },

    parseMarkdown: function(md) {
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
                html += '<div style="overflow-x:auto; margin: 16px 0;"><table style="width:100%; border-collapse:collapse; margin-bottom:16px;">';
                if (tableHeaders) {
                    html += '<thead><tr style="border-bottom:2px solid var(--border); background:var(--surface);">';
                    tableHeaders.forEach(h => {
                        html += `<th style="padding:10px; text-align:left; font-weight:700; border:1px solid var(--border);">${h}</th>`;
                    });
                    html += '</tr></thead>';
                }
                html += '<tbody>';
                tableRows.forEach(row => {
                    html += '<tr style="border-bottom:1px solid var(--border);">';
                    row.forEach(cell => {
                        html += `<td style="padding:10px; border:1px solid var(--border);">${cell}</td>`;
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
            
            // 解析表格
            if (line.startsWith('|') && line.endsWith('|')) {
                flushList();
                inTable = true;
                const cells = line.split('|').slice(1, -1).map(c => this.parseInline(c.trim()));
                // 檢查是否為分隔線 (e.g. | :--- | :--- |)
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

            // 解析標題
            if (line.startsWith('### ')) {
                flushList();
                html += `<h3 style="margin-top:20px; margin-bottom:10px; color:var(--accent); font-size:1.15rem; border-left:3px solid var(--accent); padding-left:8px;">${this.parseInline(line.substring(4))}</h3>`;
            } else if (line.startsWith('## ')) {
                flushList();
                html += `<h2 style="margin-top:24px; margin-bottom:12px; color:var(--text); font-size:1.3rem; border-bottom:1px solid var(--border); padding-bottom:6px;">${this.parseInline(line.substring(3))}</h2>`;
            } else if (line.startsWith('# ')) {
                flushList();
                html += `<h1 style="margin-top:28px; margin-bottom:16px; color:var(--text); font-size:1.6rem;">${this.parseInline(line.substring(2))}</h1>`;
            } 
            // 解析清單
            else if (line.startsWith('* ') || line.startsWith('- ')) {
                if (!inList) {
                    html += '<ul style="margin-left:20px; margin-bottom:16px; list-style-type:disc; display:flex; flex-direction:column; gap:6px;">';
                    inList = true;
                }
                html += `<li>${this.parseInline(line.substring(2))}</li>`;
            }
            else if (line.match(/^\d+\.\s/)) {
                if (!inList) {
                    html += '<ul style="margin-left:20px; margin-bottom:16px; list-style-type:decimal; display:flex; flex-direction:column; gap:6px;">';
                    inList = true;
                }
                const cleanText = line.replace(/^\d+\.\s/, '');
                html += `<li>${this.parseInline(cleanText)}</li>`;
            }
            // 空行
            else if (line === '') {
                flushList();
            } else {
                flushList();
                html += `<p style="margin-bottom:12px; color:var(--text);">${this.parseInline(line)}</p>`;
            }
        }
        
        flushList();
        flushTable();

        return html;
    },

    parseInline: function(text) {
        let clean = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // 粗體 **text**
        clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--accent); font-weight:700;">$1</strong>');
        
        // 行內代碼 `code`
        clean = clean.replace(/`(.*?)`/g, '<code style="background:var(--surface); border:1px solid var(--border); padding:2px 6px; border-radius:4px; font-family:var(--font); font-size:0.88em; color:var(--accent);">$1</code>');

        return clean;
    }
};
