// --- 1. Configuration ---
export const Config = {
    DATA_PATH: 'assets/data/all_questions.csv',
    MANIFEST_PATH: 'assets/data/manifest.json',
    SFX_PATH: 'assets/sfx/',
    WEIGHT_DEFAULT: 10,
    WEIGHT_UNATTEMPTED: 100,
    WEIGHT_EASY: 1,
    WEIGHT_LOW_ATTEMPT: 30
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
