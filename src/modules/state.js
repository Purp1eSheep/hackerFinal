// --- 1. Configuration ---
export const Config = {
    DATA_PATH: 'assets/data/all_questions.csv',
    MANIFEST_PATH: 'assets/data/manifest.json',
    SFX_PATH: 'assets/sfx/',
    WEIGHT_DEFAULT: 10,
    WEIGHT_UNATTEMPTED: 100,
    WEIGHT_EASY: 1,
    WEIGHT_LOW_ATTEMPT: 30,
    
    // 客製化參數
    appTitle: '📝 資安與道德駭客測驗',
    appSubtitle: '精選道德駭客、滲透測試、MITRE ATT&CK 及無線安全考題',
    githubRepoUrl: 'https://github.com/Purp1eSheep/hackerFinal',
    aiPromptTemplate: `你是一位專業的講師，擅長釐清學生的觀念誤區。
請針對以下這題考題進行詳細解析：

【題目】
{{question}}

【選項】
{{options}}

【正確答案】
{{correctOptions}}
{{userSelectInfo}}
【解析需求】
1. **正確答案解析**：請詳細說明為什麼「{{correctOptions}}」才是正確的，其背後的理論、技術細節或邏輯依據為何。
2. **錯誤陷阱分析**：{{userSelectTrap}}
3. **觀念釐清**：用一句話總結如何區分正確與錯誤選項的關鍵特徵。

請以繁體中文回答，條列式呈現，語氣專業、精簡且直擊重點。`
};

// --- 2. DOM Cache ---
export const DOM = {
    screens: {
        select: document.getElementById('select-screen'),
        browser: document.getElementById('browser-screen'),
        quiz: document.getElementById('quiz-screen'),
        result: document.getElementById('result-screen')
    },
    topBar: document.getElementById('top-bar'),
    settingsDrop: document.getElementById('settings-dropdown'),
    quizList: document.getElementById('quiz-list'),
    startBtn: document.getElementById('start-btn'),
    // Quiz Elements
    progress: document.getElementById('progress-bar'),
    counter: document.getElementById('q-counter'),
    qText: document.getElementById('question-text'),
    optionsWrap: document.getElementById('options'),
    expWrap: document.getElementById('explanation-container'),
    nextBtn: document.getElementById('next-btn'),
    prevBtn: document.getElementById('prev-btn'),
    // Modals
    aiModal: document.getElementById('ai-modal'),
    aiPromptText: document.getElementById('ai-prompt-text')
};

// --- 2. Application State ---
export const State = {
    OPTION_LABELS: ['A', 'B', 'C', 'D', 'E', 'F'],
    quizSets: [],
    globalQuestions: [],
    activeQuestions: [],
    currentIdx: 0,
    answers: [],
    currentSelection: new Set(),
    isComprehensive: false,
    quizCount: 40,
    audioEnabled: false,
    leftHanded: false,
    audio: {
        correct: new Audio(Config.SFX_PATH + 'right.mp3'),
        wrong: new Audio(Config.SFX_PATH + 'wrong.mp3'),
        cheer: new Audio(Config.SFX_PATH + 'pass.mp3'),
        sad: new Audio(Config.SFX_PATH + 'notPass.mp3')
    },
    charts: { progress: null, risk: null, unit: null },
    redirectTimer: null
};
