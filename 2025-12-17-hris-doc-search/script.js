// ==============================
// 定数定義
// ==============================

// コンテキスト（対象）
const CONTEXT = {
    DOCUMENT: 'document',
    FOLDER: 'folder'
};

// 表示モード
const VIEW_MODE = {
    LIST: 'list',      // 一覧表示
    STATUS: 'status'   // ステータスごと表示
};

// タブ/ステータス定義
const TAB = {
    ACTION: { name: '要対応', code: 'action' },
    UNSENT: { name: '未送信', code: 'unsent' },
    WAITING: { name: '相手方確認中', code: 'waiting' },
    COMPLETED: { name: '完了', code: 'completed' }
};

// タブ名の配列（順序保持）
const TAB_ORDER = [TAB.ACTION, TAB.UNSENT, TAB.WAITING, TAB.COMPLETED];

// URLパラメータ名
const URL_PARAM = {
    TARGET: 'target',
    VIEW: 'view',
    TAB: 'tab',
    FILTER: 'filter',
    INCLUDE_ARCHIVED: 'includeArchived',
    EXPAND: 'expand',
    COLS: 'cols',
    PAGE: 'page',
    SIZE: 'size',
    CUSTOMIZE: 'customize',
    SEED: 'seed'
};

// URLのターゲット値
const URL_TARGET = {
    [CONTEXT.DOCUMENT]: 'docs',
    [CONTEXT.FOLDER]: 'folders'
};

// 書類ステータスパターン
const DOC_STATUS = {
    PENDING: { status: '承認待ち', class: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20', tab: TAB.WAITING.name },
    COMPLETED: { status: '完了', class: 'bg-green-50 text-green-700 ring-green-600/20', tab: TAB.COMPLETED.name },
    REJECTED: { status: '差戻し', class: 'bg-red-50 text-red-700 ring-red-600/10', tab: TAB.ACTION.name },
    REVIEWING: { status: '確認中', class: 'bg-blue-50 text-blue-700 ring-blue-600/20', tab: TAB.WAITING.name },
    UNSENT: { status: '未送信', class: 'bg-gray-100 text-gray-700 ring-gray-600/10', tab: TAB.UNSENT.name }
};

// フォルダステータススタイル
const FOLDER_STATUS_STYLE = {
    [TAB.ACTION.name]: 'bg-red-50 text-red-700 ring-red-600/10',
    [TAB.UNSENT.name]: 'bg-gray-100 text-gray-700 ring-gray-600/10',
    [TAB.COMPLETED.name]: 'bg-green-50 text-green-700 ring-green-600/20',
    [TAB.WAITING.name]: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
};

// 列定義
const COLUMNS = {
    [CONTEXT.DOCUMENT]: ['empId', 'name', 'title', 'archive', 'status', 'folder', 'folderArchive', 'created', 'updated'],
    [CONTEXT.FOLDER]: ['name', 'archive', 'status', 'baseDate', 'action', 'unsent', 'waiting', 'completed', 'created', 'updated']
};

// デフォルト設定
const DEFAULTS = {
    PAGE_SIZE: 25,
    SEED: 12345
};

// ==============================
// ダミーデータ生成ユーティリティ
// ==============================

// シード値を使った疑似乱数生成器（Mulberry32）
// デフォルトシード値: 12345（固定）
// URLパラメータ ?seed=数値 で変更可能
const DEFAULT_SEED = DEFAULTS.SEED;
let currentSeed = DEFAULT_SEED;

// URLからシード値を取得（ページロード前に実行）
(function initSeed() {
    const params = new URLSearchParams(globalThis.location?.search || '');
    const seedParam = params.get('seed');
    if (seedParam !== null) {
        const seed = Number.parseInt(seedParam, 10);
        if (!Number.isNaN(seed)) {
            currentSeed = seed;
        }
    }
})();

// Mulberry32 疑似乱数生成器
function mulberry32(seed) {
    return function() {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

// シード値に基づく乱数生成器のインスタンス
let seededRandom = mulberry32(currentSeed);

// 苗字・名前のリスト
const lastNames = ['山田', '鈴木', '佐藤', '田中', '高橋', '渡辺', '伊藤', '中村', '小林', '加藤', '吉田', '山本', '松本', '井上', '斎藤', '木村', '林', '清水', '森', '阿部', '池田', '橋本', '石川', '山崎', '前田', '藤田', '後藤', '岡田', '長谷川', '村上', '近藤', '石井', '坂本', '遠藤', '青木', '藤井', '西村', '福田', '太田', '三浦', '岡本', '松田', '中川', '中島', '原田', '小川', '竹内', '金子', '和田', '中野'];
const firstNames = ['太郎', '花子', '健一', '美咲', '大輔', '由美', '翔太', '直子', '拓也', '恵子', '雄太', '明美', '達也', '久美子', '隆', '智子', '誠', '裕子', '浩', '典子', '修', '洋子', '剛', '真理子', '勝', '幸子', '博', '順子', '進', '京子', '亮', '和子', '聡', '節子', '光', '弘子', '茂', '道子', '昭', '信子', '豊', '良子', '正', '貴子', '実', '文子', '明', '悦子', '秀樹', '優子'];

// 部署リスト（100個のフォルダ用）
const departments = [
    '人事部', '経理部', '総務部', '法務部', '営業第一部', '営業第二部', '営業第三部', '営業企画部', 
    'マーケティング部', '広報部', 'システム開発部', 'インフラ部', '品質管理部', '製造部', '購買部', 
    '物流部', '研究開発部', '企画部', '経営企画部', '財務部', '監査部', '秘書室', '情報システム部',
    'カスタマーサポート部', '海外事業部', '新規事業部', 'デザイン部', '技術部', '生産管理部', '設備管理部',
    '大阪支社_営業部', '大阪支社_総務部', '大阪支社_経理部', '名古屋支社_営業部', '名古屋支社_総務部',
    '福岡支社_営業部', '福岡支社_総務部', '札幌支社_営業部', '仙台支社_営業部', '広島支社_営業部',
    '人材開発部', '労務管理部', 'コンプライアンス部', 'リスク管理部', '内部統制部', '環境安全部',
    '知的財産部', 'IR部', 'CSR推進部', 'DX推進部', 'AI戦略部', 'データ分析部', 'セキュリティ部',
    '国際営業部', 'アジア事業部', '欧州事業部', '北米事業部', '中南米事業部', '中東事業部',
    '第一営業課', '第二営業課', '第三営業課', '法人営業部', '個人営業部', 'リテール営業部',
    'ホールセール部', '金融商品部', '融資審査部', '与信管理部', '債権管理部', '資産運用部',
    '不動産管理部', 'ファシリティ部', '受付部', '社長室', '会長室', '顧問室', '相談役室',
    'プロジェクト推進室', '業務改革室', '働き方改革推進室', 'ダイバーシティ推進室', 'サステナビリティ推進室',
    '商品企画部', 'サービス企画部', 'UX設計部', 'フロントエンド開発部', 'バックエンド開発部',
    'モバイルアプリ開発部', 'QAテスト部', 'DevOps部', 'SRE部', 'クラウド基盤部',
    '原価管理部', '予算管理部', '管理会計部', '税務部', '連結決算部', '出納部',
    'グループ経営管理部', '子会社管理部', 'M&A推進部', 'PMI推進部'
];

// 書類タイトルのパターン
const documentTitles = [
    '入社手続き書類一式', '退職手続き書類一式', '異動届', '昇進・昇格申請書', '給与変更届',
    '住所変更届', '扶養家族変更届', '通勤経路変更届', '年末調整申告書', '源泉徴収票発行依頼',
    '交通費精算書', '出張旅費精算書', '経費精算書', '仮払金申請書', '仮払金精算書',
    '有給休暇申請書', '特別休暇申請書', '育児休業申請書', '介護休業申請書', '休職届',
    '復職届', '時間外勤務申請書', '深夜勤務申請書', '休日出勤申請書', '代休取得申請書',
    '在宅勤務申請書', 'フレックスタイム適用申請書', '勤務地変更申請書', '配置転換願',
    '資格取得報告書', '研修参加報告書', '業務報告書', '月次レポート', '週次レポート',
    '目標設定シート', '人事評価シート', '自己評価シート', '360度評価シート', 'MBO面談記録',
    '契約書（業務委託）', '契約書（売買）', '契約書（賃貸借）', '契約書（秘密保持）', '契約書（ライセンス）',
    '稟議書（設備投資）', '稟議書（システム導入）', '稟議書（人員増強）', '稟議書（予算申請）', '稟議書（外注委託）',
    '見積書', '請求書', '納品書', '発注書', '検収報告書',
    '健康診断結果報告書', 'ストレスチェック報告書', '安全衛生報告書', '災害報告書', 'ヒヤリハット報告書',
    '情報セキュリティ誓約書', '機密保持誓約書', '個人情報取扱同意書', '利用規約同意書', 'プライバシーポリシー同意書',
    'マイナンバー届出書', '銀行口座届出書', '緊急連絡先届出書', '身元保証書', '誓約書',
    '慶弔届', '結婚届', '出産届', '転居届', '改姓届'
];

// 子書類のパターン
const childDocuments = [
    { icon: 'fa-regular fa-file-pdf text-red-400', name: '雇用契約書.pdf', status: '確認済', size: '2.4 MB' },
    { icon: 'fa-regular fa-file-pdf text-red-400', name: '労働条件通知書.pdf', status: '未読', size: '1.8 MB' },
    { icon: 'fa-regular fa-file-word text-blue-400', name: '身元保証書.docx', status: '確認済', size: '1.1 MB' },
    { icon: 'fa-regular fa-file-word text-blue-400', name: '誓約書.docx', status: '未読', size: '890 KB' },
    { icon: 'fa-regular fa-file-excel text-green-500', name: '給与明細.xlsx', status: '完了', size: '450 KB' },
    { icon: 'fa-regular fa-file-excel text-green-500', name: '経費明細.xlsx', status: '確認済', size: '320 KB' },
    { icon: 'fa-regular fa-id-card text-green-400', name: '免許証写し.jpg', status: '確認済', size: '3.5 MB' },
    { icon: 'fa-regular fa-id-card text-green-400', name: 'マイナンバーカード写し.jpg', status: '未読', size: '2.8 MB' },
    { icon: 'fa-regular fa-file-image text-purple-400', name: '証明写真.jpg', status: '確認済', size: '1.2 MB' },
    { icon: 'fa-regular fa-file-pdf text-red-400', name: '健康診断書.pdf', status: '完了', size: '4.2 MB' },
    { icon: 'fa-regular fa-file-pdf text-red-400', name: '卒業証明書.pdf', status: '確認済', size: '980 KB' },
    { icon: 'fa-regular fa-file-pdf text-red-400', name: '資格証明書.pdf', status: '確認済', size: '1.5 MB' },
    { icon: 'fa-regular fa-file-word text-blue-400', name: '履歴書.docx', status: '完了', size: '2.1 MB' },
    { icon: 'fa-regular fa-file-word text-blue-400', name: '職務経歴書.docx', status: '確認済', size: '1.8 MB' },
    { icon: 'fa-regular fa-file-powerpoint text-orange-400', name: 'プレゼン資料.pptx', status: '未読', size: '8.5 MB' }
];

// ステータスパターン（定数から生成）
const statusPatterns = [
    { status: DOC_STATUS.PENDING.status, statusClass: DOC_STATUS.PENDING.class, tabCategory: DOC_STATUS.PENDING.tab },
    { status: DOC_STATUS.COMPLETED.status, statusClass: DOC_STATUS.COMPLETED.class, tabCategory: DOC_STATUS.COMPLETED.tab },
    { status: DOC_STATUS.REJECTED.status, statusClass: DOC_STATUS.REJECTED.class, tabCategory: DOC_STATUS.REJECTED.tab },
    { status: DOC_STATUS.REVIEWING.status, statusClass: DOC_STATUS.REVIEWING.class, tabCategory: DOC_STATUS.REVIEWING.tab },
    { status: DOC_STATUS.UNSENT.status, statusClass: DOC_STATUS.UNSENT.class, tabCategory: DOC_STATUS.UNSENT.tab }
];

// 日付生成ヘルパー（シード値ベース）
function randomDate(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const randomTime = startDate.getTime() + seededRandom() * (endDate.getTime() - startDate.getTime());
    const date = new Date(randomTime);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
}

// ランダム選択ヘルパー（シード値ベース）
function randomChoice(arr) {
    return arr[Math.floor(seededRandom() * arr.length)];
}

function randomInt(min, max) {
    return Math.floor(seededRandom() * (max - min + 1)) + min;
}

// ==============================
// 60個のフォルダデータ生成
// ==============================
const mockFolderData = [];

// 各ステータスパターンに該当するフォルダを生成
// パターン: 要対応(action>0), 未送信のみ(unsent=total), 完了のみ(completed=total), 相手方確認中(その他)

for (let i = 0; i < 60; i++) {
    const deptName = departments[i % departments.length];
    const uniqueName = i >= departments.length ? `${deptName}_${Math.floor(i / departments.length) + 1}` : deptName;
    
    let total, action, unsent, waiting, completed;
    const patternIndex = i % 4; // 4パターンを均等に分配
    
    if (patternIndex === 0) {
        // 要対応パターン (action > 0)
        total = randomInt(5, 30);
        action = randomInt(1, Math.min(5, total));
        unsent = randomInt(0, Math.max(0, total - action - 5));
        waiting = randomInt(0, Math.max(0, total - action - unsent - 3));
        completed = total - action - unsent - waiting;
    } else if (patternIndex === 1) {
        // 未送信のみパターン
        total = randomInt(3, 15);
        action = 0;
        unsent = total;
        waiting = 0;
        completed = 0;
    } else if (patternIndex === 2) {
        // 完了のみパターン
        total = randomInt(5, 25);
        action = 0;
        unsent = 0;
        waiting = 0;
        completed = total;
    } else {
        // 相手方確認中パターン (waiting > 0, action = 0)
        total = randomInt(8, 40);
        action = 0;
        unsent = randomInt(0, Math.floor(total / 4));
        waiting = randomInt(1, Math.floor(total / 2));
        completed = total - unsent - waiting;
    }
    
    const createdDate = randomDate('2022/01/01', '2023/06/30');
    const updatedDate = randomDate('2023/07/01', '2023/12/15');
    const baseDate = randomDate('2023/09/01', '2023/12/15');
    
    // 約15%のフォルダをアーカイブ済みに設定
    const isArchived = seededRandom() < 0.15;
    
    mockFolderData.push({
        id: `FOLDER-${String(i + 1).padStart(5, '0')}`,
        name: uniqueName,
        total,
        action,
        unsent,
        waiting,
        completed,
        created: createdDate,
        updated: updatedDate,
        baseDate,
        isArchived
    });
}

// ==============================
// 200個の書類データ生成
// ==============================

// フォルダごとのステータス分布パターン
// 各パターンは [承認待ち, 完了, 差戻し, 確認中, 未送信] の確率（合計100）
const statusDistributionPatterns = [
    // 偏りパターン: ほとんど完了
    { name: 'mostly-completed', weights: [5, 80, 5, 5, 5] },
    // 偏りパターン: ほとんど未送信
    { name: 'mostly-unsent', weights: [0, 0, 0, 0, 100] },
    // 偏りパターン: ほとんど確認中
    { name: 'mostly-reviewing', weights: [30, 10, 5, 50, 5] },
    // 偏りパターン: 差戻しが多い（問題あり）
    { name: 'problematic', weights: [10, 10, 50, 20, 10] },
    // 分散パターン: 均等分布
    { name: 'balanced', weights: [20, 20, 20, 20, 20] },
    // 分散パターン: やや完了寄り
    { name: 'leaning-completed', weights: [15, 40, 10, 25, 10] },
    // 分散パターン: 進行中（確認中+承認待ち多め）
    { name: 'in-progress', weights: [35, 15, 10, 30, 10] },
    // 分散パターン: 新規（未送信多め、完了少なめ）
    { name: 'new-folder', weights: [10, 5, 5, 20, 60] }
];

// フォルダごとにステータス分布パターンを割り当て
const folderStatusPatterns = {};
mockFolderData.forEach((folder, index) => {
    const patternIndex = index % statusDistributionPatterns.length;
    folderStatusPatterns[folder.id] = statusDistributionPatterns[patternIndex];
});

// 重み付きランダム選択
function weightedRandomChoice(items, weights) {
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let random = seededRandom() * totalWeight;
    for (let i = 0; i < items.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return items[i];
        }
    }
    return items[items.length - 1];
}

const mockDocData = [];

for (let i = 0; i < 200; i++) {
    const empId = `EMP-${String(i + 100).padStart(5, '0')}`;
    const lastName = randomChoice(lastNames);
    const firstName = randomChoice(firstNames);
    const name = `${lastName} ${firstName}`;
    
    // フォルダをランダムに選択（実際のフォルダデータから）
    const folder = mockFolderData[i % mockFolderData.length];
    
    // フォルダのステータス分布パターンに基づいてステータスを選択
    const folderPattern = folderStatusPatterns[folder.id];
    const statusPattern = weightedRandomChoice(statusPatterns, folderPattern.weights);
    
    // 書類タイトルを選択
    const title = documentTitles[i % documentTitles.length];
    
    // 子書類を生成（0〜5個）
    const childCount = randomInt(0, 5);
    const children = [];
    const usedIndexes = new Set();
    for (let j = 0; j < childCount; j++) {
        let idx;
        do {
            idx = randomInt(0, childDocuments.length - 1);
        } while (usedIndexes.has(idx) && usedIndexes.size < childDocuments.length);
        usedIndexes.add(idx);
        children.push({ ...childDocuments[idx] });
    }
    
    const createdDate = randomDate('2023/01/01', '2023/11/30');
    const updatedDate = randomDate('2023/10/01', '2023/12/15');
    
    // 約15%の書類をアーカイブ済みに設定
    const isArchived = seededRandom() < 0.15;
    
    mockDocData.push({
        id: empId,
        name,
        empId,
        title,
        count: childCount,
        status: statusPattern.status,
        statusClass: statusPattern.statusClass,
        tabCategory: statusPattern.tabCategory,
        folder: folder.name, // 実際のフォルダ名を参照
        folderId: folder.id, // フォルダIDも保持
        created: createdDate,
        updated: updatedDate,
        children,
        isArchived // アーカイブ済みかどうか
    });
}

// フォルダの件数を動的に計算する関数
function getFolderCounts(folder, includeArchived) {
    const docsInFolder = mockDocData.filter(doc => {
        if (doc.folderId !== folder.id) return false;
        if (!includeArchived) {
            // アーカイブを含まない場合：書類のアーカイブとフォルダのアーカイブをチェック
            if (doc.isArchived || folder.isArchived) return false;
        }
        return true;
    });
    return {
        total: docsInFolder.length,
        action: docsInFolder.filter(doc => doc.tabCategory === '要対応').length,
        unsent: docsInFolder.filter(doc => doc.tabCategory === '未送信').length,
        waiting: docsInFolder.filter(doc => doc.tabCategory === '相手方確認中').length,
        completed: docsInFolder.filter(doc => doc.tabCategory === '完了').length
    };
}

// フォルダの件数を実際の書類データから再計算（デフォルト値として）
mockFolderData.forEach(folder => {
    const counts = getFolderCounts(folder, false);
    folder.total = counts.total;
    folder.action = counts.action;
    folder.unsent = counts.unsent;
    folder.waiting = counts.waiting;
    folder.completed = counts.completed;
});

function determineFolderStatus(folder) {
    if (folder.action > 0) return TAB.ACTION.name;
    if (folder.total > 0 && folder.unsent === folder.total) return TAB.UNSENT.name;
    if (folder.total > 0 && folder.completed === folder.total) return TAB.COMPLETED.name;
    return TAB.WAITING.name;
}

// ==============================
// アプリケーション状態
// ==============================

// タブ名とURLコードのマッピング（定数から生成）
const tabCodeMap = Object.fromEntries(TAB_ORDER.map(t => [t.name, t.code]));
const tabNameMap = Object.fromEntries(TAB_ORDER.map(t => [t.code, t.name]));

// 初期フィルター状態のテンプレート
const createDocumentFilters = () => ({
    folder: [],      // 複数選択
    employee: [],    // 複数選択
    title: '',
    status: [],      // 複数選択
    createdFrom: '',
    createdTo: '',
    updatedFrom: '',
    updatedTo: ''
});

const createFolderFilters = () => ({
    name: [],        // 複数選択
    status: [],      // 複数選択
    baseFrom: '',
    baseTo: '',
    createdFrom: '',
    createdTo: '',
    updatedFrom: '',
    updatedTo: ''
});

// 列の初期表示状態のテンプレート
const createColumnVisibility = (columns) => 
    Object.fromEntries(columns.map(col => [col, true]));

// アプリケーション状態（統合されたstate管理）
const appState = {
    // 現在のコンテキスト
    context: CONTEXT.FOLDER,
    // 表示モード（一覧 / ステータスごと）
    viewMode: VIEW_MODE.LIST,
    // 表示のカスタマイズ有効（書類・フォルダ共有、デフォルトはON）
    customizeEnabled: true,
    // アーカイブ済みを表示（フォルダ・書類で共通）
    includeArchived: false,
    
    // 書類関連の状態
    document: {
        currentTab: TAB.ACTION.name,
        filters: createDocumentFilters(),
        pagination: { currentPage: 1, pageSize: DEFAULTS.PAGE_SIZE },
        columnVisibility: createColumnVisibility(COLUMNS[CONTEXT.DOCUMENT]),
        alwaysExpand: false
    },
    
    // フォルダ関連の状態
    folder: {
        currentTab: TAB.ACTION.name,
        filters: createFolderFilters(),
        pagination: { currentPage: 1, pageSize: DEFAULTS.PAGE_SIZE },
        columnVisibility: createColumnVisibility(COLUMNS[CONTEXT.FOLDER])
    }
};

// 後方互換性のための参照（既存コードとの互換性維持）
// TODO: 段階的に appState への直接アクセスに移行
let currentContext = appState.context;
let currentViewMode = appState.viewMode === VIEW_MODE.LIST ? 'table' : 'tabs';
let currentDocTab = appState.document.currentTab;
let currentFolderTab = appState.folder.currentTab;
let customizeEnabled = appState.customizeEnabled;
let documentFilters = appState.document.filters;
let folderFilters = appState.folder.filters;
const docColumnVisibility = appState.document.columnVisibility;
const folderColumnVisibility = appState.folder.columnVisibility;
let docAlwaysExpand = appState.document.alwaysExpand;
let includeArchived = appState.includeArchived;
const pagination = {
    document: appState.document.pagination,
    folder: appState.folder.pagination
};

// マルチセレクトの選択状態
const multiSelectState = {
    'filter-doc-folder': [],
    'filter-doc-employee': [],
    'filter-doc-status': [],
    'filter-folder-name': [],
    'filter-folder-status': []
};

// マルチセレクトの選択肢データ
const multiSelectOptions = {
    'filter-doc-folder': () => [...new Set(mockFolderData.map(f => f.name))].sort(),
    'filter-doc-employee': () => [...new Set(mockDocData.map(d => d.name))].sort(),
    'filter-doc-status': () => Object.values(DOC_STATUS).map(s => s.status),
    'filter-folder-name': () => [...new Set(mockFolderData.map(f => f.name))].sort(),
    'filter-folder-status': () => TAB_ORDER.map(t => t.name)
};

// フォルダIDからフォルダのアーカイブ状態を取得
function isFolderArchived(folderId) {
    const folder = mockFolderData.find(f => f.id === folderId);
    return folder ? folder.isArchived : false;
}

// フィルター済みデータ（デフォルトでアーカイブ済みを除外）
// 書類: 書類自体がアーカイブされていない AND フォルダもアーカイブされていない場合のみ表示
let filteredDocData = mockDocData.filter(doc => {
    const folderArchived = isFolderArchived(doc.folderId);
    return !doc.isArchived && !folderArchived;
});
let filteredFolderData = mockFolderData.filter(folder => !folder.isArchived);

// 列の順序定義（ビットマスク用）- 定数から参照
const DOC_COLUMNS = COLUMNS[CONTEXT.DOCUMENT];
const FOLDER_COLUMNS = COLUMNS[CONTEXT.FOLDER];

// ==============================
// カスタマイズ無効時の表示オーバーライド
// ==============================

// カスタマイズ無効時の強制表示設定を適用
function applyDisplayOverrides() {
    // カスタマイズが有効なら何もしない
    if (customizeEnabled) return;
    
    if (currentContext === CONTEXT.DOCUMENT) {
        applyDocumentDisplayOverrides();
    } else {
        applyFolderDisplayOverrides();
    }
}

// 書類画面の表示オーバーライド
function applyDocumentDisplayOverrides() {
    const isSingleFolderSelected = documentFilters.folder.length === 1;
    // 他のフィルター条件がないかチェック
    const hasOtherFilters = documentFilters.employee.length > 0 ||
                           documentFilters.title !== '' ||
                           documentFilters.status.length > 0 ||
                           documentFilters.createdFrom !== '' ||
                           documentFilters.createdTo !== '' ||
                           documentFilters.updatedFrom !== '' ||
                           documentFilters.updatedTo !== '';
    
    if (isSingleFolderSelected && !hasOtherFilters) {
        // フォルダを1つのみ選択している場合
        // 列: 従業員番号, 従業員名, 書類セット名, 作成日
        // + アーカイブ表示時: 書類のアーカイブ、フォルダのアーカイブ
        setDocColumnVisibility({
            empId: true,
            name: true,
            title: true,
            archive: includeArchived,
            status: false,
            folder: false,
            folderArchive: includeArchived,
            created: true,
            updated: false
        });
        // 形式: ステータスごと
        currentViewMode = 'tabs';
        // 書類セット名を常に開く
        docAlwaysExpand = true;
    } else {
        // それ以外の場合
        // 列: 従業員番号, 従業員名, 書類セット名, ステータス, フォルダ, 作成日, 更新日
        // + アーカイブ表示時: 書類のアーカイブ、フォルダのアーカイブ
        setDocColumnVisibility({
            empId: true,
            name: true,
            title: true,
            archive: includeArchived,
            status: true,
            folder: true,
            folderArchive: includeArchived,
            created: true,
            updated: true
        });
        // 形式: 一覧
        currentViewMode = 'table';
        // 書類セット名を常に開く
        docAlwaysExpand = true;
    }
    
    // UIのトグルを同期
    syncColumnToggles(docColumnVisibility, 'doc');
    const alwaysExpandToggle = document.getElementById('toggle-doc-always-expand');
    if (alwaysExpandToggle) alwaysExpandToggle.checked = docAlwaysExpand;
}

// フォルダ画面の表示オーバーライド
function applyFolderDisplayOverrides() {
    const isStatusFiltered = folderFilters.status.length > 0;
    
    if (isStatusFiltered) {
        // ステータスを指定している場合
        // 列: フォルダ名, ステータス, 基準日, 要対応, 完了, 作成日, 更新日
        // + アーカイブ表示時: アーカイブ
        setFolderColumnVisibility({
            name: true,
            archive: includeArchived,
            status: true,
            baseDate: true,
            action: true,
            unsent: false,
            waiting: false,
            completed: true,
            created: true,
            updated: true
        });
    } else {
        // ステータスを指定していない場合
        // 列: フォルダ名, 基準日, 要対応, 完了, 作成日, 更新日
        // + アーカイブ表示時: アーカイブ
        setFolderColumnVisibility({
            name: true,
            archive: includeArchived,
            status: false,
            baseDate: true,
            action: true,
            unsent: false,
            waiting: false,
            completed: true,
            created: true,
            updated: true
        });
    }
    // 形式: 一覧
    currentViewMode = 'table';
    
    // UIのトグルを同期
    syncColumnToggles(folderColumnVisibility, 'folder');
}

// 書類列の表示状態を一括設定
function setDocColumnVisibility(settings) {
    Object.keys(settings).forEach(col => {
        docColumnVisibility[col] = settings[col];
    });
}

// フォルダ列の表示状態を一括設定
function setFolderColumnVisibility(settings) {
    Object.keys(settings).forEach(col => {
        folderColumnVisibility[col] = settings[col];
    });
}

// ==============================
// 列表示エンコード/デコード
// ==============================

// 列の表示状態をビットマスクにエンコード（例: 全表示=511, 全非表示=0）
function encodeColumnVisibility(visibility, columns) {
    let mask = 0;
    columns.forEach((col, i) => {
        if (visibility[col]) {
            mask |= (1 << i);
        }
    });
    return mask;
}

// ビットマスクを列の表示状態にデコード
function decodeColumnVisibility(mask, columns, visibility) {
    columns.forEach((col, i) => {
        visibility[col] = (mask & (1 << i)) !== 0;
    });
}

// ==============================
// URLパラメータ処理
// ==============================

// URLパラメータを解析して状態に適用
function applyUrlParams() {
    const params = new URLSearchParams(globalThis.location.search);
    
    // 1. target: 対象（document / folder）- 最初に設定
    const target = params.get(URL_PARAM.TARGET);
    if (target === 'folder' || target === URL_TARGET[CONTEXT.FOLDER]) {
        currentContext = CONTEXT.FOLDER;
    } else if (target === 'document' || target === URL_TARGET[CONTEXT.DOCUMENT]) {
        currentContext = CONTEXT.DOCUMENT;
    }
    
    // UIのセレクトボックスを同期
    const contextSelector = document.getElementById('context-selector');
    if (contextSelector) {
        contextSelector.value = currentContext;
    }
    
    // 1.5. customize: 表示のカスタマイズ状態（パラメータなしまたは1=ON、0=OFF、フォルダ・書類で共有）
    const customizeParam = params.get(URL_PARAM.CUSTOMIZE);
    if (customizeParam === '0' || customizeParam === 'false') {
        // customize=0 の場合のみOFF
        customizeEnabled = false;
        // 両方のトグルとセクションを更新
        const docToggle = document.getElementById('toggle-doc-customize');
        const docSection = document.getElementById('doc-customize-section');
        const folderToggle = document.getElementById('toggle-folder-customize');
        const folderSection = document.getElementById('folder-customize-section');
        if (docToggle) docToggle.checked = false;
        if (docSection) docSection.classList.add('hidden');
        if (folderToggle) folderToggle.checked = false;
        if (folderSection) folderSection.classList.add('hidden');
    } else {
        // パラメータなしまたはcustomize=1の場合はON（デフォルト）
        customizeEnabled = true;
        // 両方のトグルとセクションを更新
        const docToggle = document.getElementById('toggle-doc-customize');
        const docSection = document.getElementById('doc-customize-section');
        const folderToggle = document.getElementById('toggle-folder-customize');
        const folderSection = document.getElementById('folder-customize-section');
        if (docToggle) docToggle.checked = true;
        if (docSection) docSection.classList.remove('hidden');
        if (folderToggle) folderToggle.checked = true;
        if (folderSection) folderSection.classList.remove('hidden');
    }
    
    // 2. view: 表示モード（table / tab / tabs / list / status）
    const view = params.get(URL_PARAM.VIEW);
    if (view === 'tab' || view === 'tabs' || view === VIEW_MODE.STATUS) {
        currentViewMode = 'tabs';
    } else if (view === 'table' || view === VIEW_MODE.LIST) {
        currentViewMode = 'table';
    }
    
    // 3. includeArchived: アーカイブを含むかどうか（フォルダ・書類で共通、フィルタ前に設定）
    const includeArchivedParam = params.get(URL_PARAM.INCLUDE_ARCHIVED);
    if (includeArchivedParam === 'true' || includeArchivedParam === '1') {
        includeArchived = true;
        appState.includeArchived = true;
        // 両方のトグルを更新
        const docToggle = document.getElementById('toggle-doc-include-archived');
        const folderToggle = document.getElementById('toggle-folder-include-archived');
        if (docToggle) docToggle.checked = true;
        if (folderToggle) folderToggle.checked = true;
    } else {
        includeArchived = false;
        appState.includeArchived = false;
    }
    
    // 4. expand: 書類セットを常に開く（フィルタ前に設定）
    const expandParam = params.get(URL_PARAM.EXPAND);
    if (expandParam === 'true' || expandParam === '1') {
        docAlwaysExpand = true;
        const toggle = document.getElementById('toggle-doc-always-expand');
        if (toggle) toggle.checked = true;
    }
    
    // 5. cols: 列の表示状態（フィルタ前に設定）
    const colsParam = params.get(URL_PARAM.COLS);
    if (colsParam !== null) {
        const colsMask = Number.parseInt(colsParam, 10);
        if (!Number.isNaN(colsMask)) {
            if (currentContext === CONTEXT.DOCUMENT) {
                decodeColumnVisibility(colsMask, DOC_COLUMNS, docColumnVisibility);
                syncColumnToggles(docColumnVisibility, 'doc');
            } else {
                decodeColumnVisibility(colsMask, FOLDER_COLUMNS, folderColumnVisibility);
                syncColumnToggles(folderColumnVisibility, 'folder');
            }
        }
    }
    
    // 6. tab: タブコード（ASCIIコードから日本語タブ名に変換）
    const tabCode = params.get(URL_PARAM.TAB);
    if (tabCode) {
        const tabName = tabNameMap[tabCode] || TAB.ACTION.name;
        if (currentContext === CONTEXT.DOCUMENT) {
            currentDocTab = tabName;
        } else {
            currentFolderTab = tabName;
        }
    }
    
    // 7. page: 現在のページ番号
    const pageParam = params.get(URL_PARAM.PAGE);
    if (pageParam !== null) {
        const page = Number.parseInt(pageParam, 10);
        if (!Number.isNaN(page) && page >= 1) {
            pagination[currentContext].currentPage = page;
        }
    }
    
    // 8. size: ページサイズ
    const sizeParam = params.get(URL_PARAM.SIZE);
    if (sizeParam !== null) {
        const size = Number.parseInt(sizeParam, 10);
        if (!Number.isNaN(size) && size > 0) {
            pagination[currentContext].pageSize = size;
            const pageSizeSelect = document.getElementById('page-size-select');
            if (pageSizeSelect) pageSizeSelect.value = size.toString();
        }
    }
    
    // 9. filter: フィルター条件（最後に適用 - renderCurrentViewを呼ぶため）
    const filterParam = params.get(URL_PARAM.FILTER);
    if (filterParam) {
        try {
            const filterObj = JSON.parse(decodeURIComponent(filterParam));
            applyFilterFromParams(filterObj);
        } catch (e) {
            console.warn('Invalid filter parameter:', e);
        }
    }
}

// トグルスイッチの状態を同期
function syncColumnToggles(visibility, prefix) {
    Object.keys(visibility).forEach(col => {
        const toggle = document.getElementById(`toggle-${prefix}-${col}`);
        if (toggle) {
            toggle.checked = visibility[col];
        }
        // ヘッダーセルの表示/非表示も同期
        const cells = document.querySelectorAll(`.${prefix}-col-${col}`);
        cells.forEach(cell => {
            if (visibility[col]) {
                cell.classList.remove('hidden');
            } else {
                cell.classList.add('hidden');
            }
        });
    });
}

// フィルターパラメータを適用
function applyFilterFromParams(filterObj) {
    if (currentContext === CONTEXT.DOCUMENT) {
        // フォルダ名でフィルター（IDまたは名前）
        if (filterObj.folder) {
            const folderValue = filterObj.folder;
            let folderNames = [];
            if (typeof folderValue === 'number' || !Number.isNaN(Number(folderValue))) {
                // IDの場合、名前に変換
                const folder = mockFolderData.find(f => f.id === Number(folderValue));
                if (folder) folderNames = [folder.name];
            } else if (Array.isArray(folderValue)) {
                folderNames = folderValue;
            } else {
                folderNames = [folderValue];
            }
            documentFilters.folder = folderNames;
            multiSelectState['filter-doc-folder'] = [...folderNames];
            renderMultiSelectTags('filter-doc-folder');
        }
        
        // 従業員でフィルター
        if (filterObj.employee) {
            const empValue = filterObj.employee;
            let empNames = [];
            if (typeof empValue === 'number' || !Number.isNaN(Number(empValue))) {
                // IDの場合、名前に変換
                const doc = mockDocData.find(d => d.empId === `EMP${String(empValue).padStart(5, '0')}`);
                if (doc) empNames = [doc.name];
            } else if (Array.isArray(empValue)) {
                empNames = empValue;
            } else {
                empNames = [empValue];
            }
            documentFilters.employee = empNames;
            multiSelectState['filter-doc-employee'] = [...empNames];
            renderMultiSelectTags('filter-doc-employee');
        }
        
        // ステータスでフィルター
        if (filterObj.status) {
            const statusValue = Array.isArray(filterObj.status) ? filterObj.status : [filterObj.status];
            documentFilters.status = statusValue;
            multiSelectState['filter-doc-status'] = [...statusValue];
            renderMultiSelectTags('filter-doc-status');
        }
        
        // アーカイブ済みを含むか（フォルダ・書類で共通）
        if (filterObj.isArchived === true || filterObj.isArchived === 'true') {
            includeArchived = true;
            appState.includeArchived = true;
            const docToggle = document.getElementById('toggle-doc-include-archived');
            const folderToggle = document.getElementById('toggle-folder-include-archived');
            if (docToggle) docToggle.checked = true;
            if (folderToggle) folderToggle.checked = true;
        }
        
        // フィルター適用
        applyDocumentFiltersWithoutClose();
    } else {
        // フォルダ名でフィルター
        if (filterObj.name) {
            const nameValue = filterObj.name;
            let folderNames = [];
            if (Array.isArray(nameValue)) {
                folderNames = nameValue;
            } else {
                folderNames = [nameValue];
            }
            folderFilters.name = folderNames;
            multiSelectState['filter-folder-name'] = [...folderNames];
            renderMultiSelectTags('filter-folder-name');
        }
        
        // ステータスでフィルター
        if (filterObj.status) {
            const statusValue = Array.isArray(filterObj.status) ? filterObj.status : [filterObj.status];
            folderFilters.status = statusValue;
            multiSelectState['filter-folder-status'] = [...statusValue];
            renderMultiSelectTags('filter-folder-status');
        }
        
        // アーカイブ済みを含むか（フォルダ・書類で共通）
        if (filterObj.isArchived === true || filterObj.isArchived === 'true') {
            includeArchived = true;
            appState.includeArchived = true;
            const docToggle = document.getElementById('toggle-doc-include-archived');
            const folderToggle = document.getElementById('toggle-folder-include-archived');
            if (docToggle) docToggle.checked = true;
            if (folderToggle) folderToggle.checked = true;
        }
        
        // フィルター適用
        applyFolderFiltersWithoutClose();
    }
}

// 現在の状態をURLに反映（ブラウザ履歴を更新）
function updateUrlParams() {
    const params = new URLSearchParams();
    
    // target
    params.set(URL_PARAM.TARGET, URL_TARGET[currentContext]);
    
    // customize（OFFの場合は0、ONの場合はパラメータなし）
    if (!customizeEnabled) {
        params.set(URL_PARAM.CUSTOMIZE, '0');
    }
    
    // view
    params.set(URL_PARAM.VIEW, currentViewMode === 'tabs' ? VIEW_MODE.STATUS : VIEW_MODE.LIST);
    
    // tab（タブ表示モードの場合のみ、ASCIIコードで保存）
    if (currentViewMode === 'tabs') {
        const currentTab = currentContext === CONTEXT.DOCUMENT ? currentDocTab : currentFolderTab;
        const tabCode = tabCodeMap[currentTab] || TAB.ACTION.code;
        params.set(URL_PARAM.TAB, tabCode);
    }
    
    // filter
    const filterObj = buildFilterObject();
    if (Object.keys(filterObj).length > 0) {
        params.set(URL_PARAM.FILTER, encodeURIComponent(JSON.stringify(filterObj)));
    }
    
    // includeArchived（フォルダ・書類で共通）
    if (includeArchived) {
        params.set(URL_PARAM.INCLUDE_ARCHIVED, 'true');
    }
    
    // expand: 書類セットを常に開く（書類のみ）
    if (currentContext === CONTEXT.DOCUMENT && docAlwaysExpand) {
        params.set(URL_PARAM.EXPAND, 'true');
    }
    
    // cols: 列の表示状態（ビットマスク）
    // 全列表示の場合はパラメータを省略（デフォルト）
    const colsMask = currentContext === CONTEXT.DOCUMENT
        ? encodeColumnVisibility(docColumnVisibility, DOC_COLUMNS)
        : encodeColumnVisibility(folderColumnVisibility, FOLDER_COLUMNS);
    const fullMask = currentContext === CONTEXT.DOCUMENT
        ? (1 << DOC_COLUMNS.length) - 1    // 511 (9列)
        : (1 << FOLDER_COLUMNS.length) - 1; // 1023 (10列)
    
    if (colsMask !== fullMask) {
        params.set(URL_PARAM.COLS, colsMask.toString());
    }
    
    // page: 現在のページ番号（1以外の場合のみ）
    const currentPage = pagination[currentContext].currentPage;
    if (currentPage > 1) {
        params.set(URL_PARAM.PAGE, currentPage.toString());
    }
    
    // size: ページサイズ（デフォルト以外の場合のみ）
    const pageSize = pagination[currentContext].pageSize;
    if (pageSize !== DEFAULTS.PAGE_SIZE) {
        params.set(URL_PARAM.SIZE, pageSize.toString());
    }
    
    // URLを更新（履歴に追加せず置換）
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
}

// 現在のフィルター状態からオブジェクトを構築
function buildFilterObject() {
    const filterObj = {};
    
    if (currentContext === CONTEXT.DOCUMENT) {
        if (documentFilters.folder.length > 0) {
            filterObj.folder = documentFilters.folder.length === 1 
                ? documentFilters.folder[0] 
                : documentFilters.folder;
        }
        if (documentFilters.employee.length > 0) {
            filterObj.employee = documentFilters.employee.length === 1 
                ? documentFilters.employee[0] 
                : documentFilters.employee;
        }
        if (documentFilters.status.length > 0) {
            filterObj.status = documentFilters.status.length === 1 
                ? documentFilters.status[0] 
                : documentFilters.status;
        }
        if (documentFilters.title) {
            filterObj.title = documentFilters.title;
        }
    } else {
        if (folderFilters.name.length > 0) {
            filterObj.name = folderFilters.name.length === 1 
                ? folderFilters.name[0] 
                : folderFilters.name;
        }
        if (folderFilters.status.length > 0) {
            filterObj.status = folderFilters.status.length === 1 
                ? folderFilters.status[0] 
                : folderFilters.status;
        }
    }
    
    return filterObj;
}

// 現在のURLをクリップボードにコピー
function copyCurrentUrl() {
    updateUrlParams();
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('URLをコピーしました');
    }).catch(err => {
        console.error('URLのコピーに失敗しました:', err);
    });
}

// ==============================
// 操作メニュー
// ==============================

let actionMenuOpen = false;

function toggleActionMenu() {
    // 表示設定メニューを閉じる
    const settingsMenu = document.getElementById('display-settings-menu');
    if (settingsMenu) settingsMenu.classList.add('hidden');
    
    actionMenuOpen = !actionMenuOpen;
    updateActionMenuVisibility();
}

function closeActionMenu() {
    actionMenuOpen = false;
    updateActionMenuVisibility();
}

function updateActionMenuVisibility() {
    const docMenu = document.getElementById('action-menu-document');
    const folderMenu = document.getElementById('action-menu-folder');
    const icon = document.getElementById('action-menu-icon');
    
    // 両方のメニューを一旦非表示
    docMenu.classList.add('hidden');
    folderMenu.classList.add('hidden');
    
    if (actionMenuOpen) {
        // 現在のコンテキストに応じたメニューを表示
        if (currentContext === CONTEXT.DOCUMENT) {
            docMenu.classList.remove('hidden');
            // 「アーカイブ前に戻す」の表示制御
            const unarchiveBtn = document.getElementById('action-doc-unarchive');
            if (unarchiveBtn) {
                unarchiveBtn.classList.toggle('hidden', !includeArchived);
            }
        } else {
            folderMenu.classList.remove('hidden');
            // 「アーカイブ前に戻す」の表示制御
            const unarchiveBtn = document.getElementById('action-folder-unarchive');
            if (unarchiveBtn) {
                unarchiveBtn.classList.toggle('hidden', !includeArchived);
            }
        }
        icon.classList.add('rotate-180');
    } else {
        icon.classList.remove('rotate-180');
    }
}

function handleAction(action) {
    // メニューを閉じる
    closeActionMenu();
    
    // アクション名を日本語に変換
    const actionNames = {
        // 書類用
        'send': '未送信の書類を送信',
        'resend': '相手方確認中の書類を再送信',
        'recreate': '要対応・未送信の書類を再作成',
        'download': '未送信・完了の書類をダウンロード',
        'withdraw': '相手方確認中の書類を取り下げ',
        'archive': '要対応の書類をアーカイブ',
        'unarchive': '書類をアーカイブ前に戻す',
        'delete': '未送信の書類を削除',
        // フォルダ用
        'create-folder': 'フォルダを作成',
        'add-employee': 'フォルダに従業員を追加',
        'rename-folder': 'フォルダ名を変更',
        'archive-folder': 'フォルダをアーカイブ',
        'unarchive-folder': 'フォルダをアーカイブ前に戻す',
        'delete-folder': 'フォルダを削除'
    };
    
    // 処理はなし（デモ用にコンソールに出力）
    console.log(`アクション実行: ${actionNames[action] || action}`);
}

// 外側クリックでメニューを閉じる
document.addEventListener('click', (e) => {
    const menuBtn = document.getElementById('action-menu-btn');
    const docMenu = document.getElementById('action-menu-document');
    const folderMenu = document.getElementById('action-menu-folder');
    
    if (menuBtn && docMenu && folderMenu) {
        if (!menuBtn.contains(e.target) && !docMenu.contains(e.target) && !folderMenu.contains(e.target)) {
            closeActionMenu();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setupContextSwitcher();
    setupSettingsMenu();
    setupViewSwitcher();
    setupColumnToggles();
    setupPagination();
    setupSelectAllCheckboxes();
    setupMultiSelects();
    
    // URLパラメータから初期状態を復元
    applyUrlParams();
    
    // 初期レンダリング（ページネーション適用）
    renderCurrentView();
    
    // タブの初期選択（URLで指定がなければデフォルト）
    if (!new URLSearchParams(window.location.search).get(URL_PARAM.TAB)) {
        switchDocumentTab(TAB.ACTION.name);
        switchFolderTab(TAB.ACTION.name);
    }

    updateUIState();
    updateActiveFiltersDisplay();
});

// UI状態とラジオボタンの同期
function updateUIState() {
    const docCtx = document.getElementById('context-document');
    const folderCtx = document.getElementById('context-folder');
    const docSettings = document.getElementById('settings-group-document');
    const folderSettings = document.getElementById('settings-group-folder');
    const filterPanelDoc = document.getElementById('filter-panel-document');
    const filterPanelFolder = document.getElementById('filter-panel-folder');

    if (currentContext === CONTEXT.DOCUMENT) {
        // コンテキスト切り替え
        docCtx.classList.remove('hidden');
        folderCtx.classList.add('hidden');
        docSettings.classList.remove('hidden');
        folderSettings.classList.add('hidden');
        
        // フィルターパネル切り替え (アコーディオンが開いている場合のみ)
        if (!filterPanelDoc.classList.contains('hidden') || !filterPanelFolder.classList.contains('hidden')) {
            filterPanelFolder.classList.add('hidden');
            filterPanelDoc.classList.remove('hidden');
        }
    } else {
        // コンテキスト切り替え
        docCtx.classList.add('hidden');
        folderCtx.classList.remove('hidden');
        docSettings.classList.add('hidden');
        folderSettings.classList.remove('hidden');

        // フィルターパネル切り替え (アコーディオンが開いている場合のみ)
        if (!filterPanelDoc.classList.contains('hidden') || !filterPanelFolder.classList.contains('hidden')) {
            filterPanelDoc.classList.add('hidden');
            filterPanelFolder.classList.remove('hidden');
        }
    }
    
    // ビュー切り替えとレンダリング（表示オーバーライド含む）
    renderCurrentView();
    
    // 適用中のフィルター表示を更新
    updateActiveFiltersDisplay();
}

function setupContextSwitcher() {
    const selector = document.getElementById('context-selector');
    selector.addEventListener('change', (e) => {
        currentContext = e.target.value;
        updateUIState();
        updateUrlParams();
    });
}

function setupViewSwitcher() {
    // 書類用のラジオボタン監視
    const docRadios = document.getElementsByName('view-type-doc');
    docRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentViewMode = e.target.value;
            updateUIState();
            updateUrlParams();
        });
    });

    // フォルダ用のラジオボタン監視
    const folderRadios = document.getElementsByName('view-type-folder');
    folderRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentViewMode = e.target.value;
            updateUIState();
            updateUrlParams();
        });
    });
}

function renderDocTable(tbodyId, data) {
    const tbody = document.getElementById(tbodyId);
    tbody.innerHTML = '';
    resetSelectAllCheckbox(tbodyId);
    if (!data || data.length === 0) return;

    // 「書類セット名を常に開く」の状態に応じてクラスを決定
    const detailRowHiddenClass = docAlwaysExpand ? '' : 'hidden';
    const iconRotateClass = docAlwaysExpand ? 'rotate-90-deg' : '';

    data.forEach((row, index) => {
        const rowId = `doc-row-${tbodyId}-${index}`;
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors bg-white";
        
        const hiddenClass = (col) => docColumnVisibility[col] ? '' : 'hidden';
        
        // アーカイブ状態の表示
        const archiveLabel = row.isArchived ? 'アーカイブ済み' : 'いいえ';
        const archiveClass = row.isArchived 
            ? 'bg-red-50 text-red-700 ring-red-600/10' 
            : 'bg-gray-100 text-gray-500 ring-gray-500/10';
        
        // フォルダのアーカイブ状態を取得
        const folderArchived = isFolderArchived(row.folderId);
        const folderArchiveLabel = folderArchived ? 'アーカイブ済み' : 'いいえ';
        const folderArchiveClass = folderArchived 
            ? 'bg-red-50 text-red-700 ring-red-600/10' 
            : 'bg-gray-100 text-gray-500 ring-gray-500/10';
        
        tr.innerHTML = `
            <td class="whitespace-nowrap px-6 py-4 text-center"><input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"></td>
            <td class="whitespace-nowrap px-6 py-4 font-mono text-gray-500 doc-col-empId ${hiddenClass('empId')}">${row.empId}</td>
            <td class="whitespace-nowrap px-6 py-4 font-bold text-gray-700 doc-col-name ${hiddenClass('name')}"><a href="#" class="text-indigo-600 hover:text-indigo-800 hover:underline" onclick="event.preventDefault(); event.stopPropagation(); navigateToDocumentsWithEmployee('${row.name.replaceAll("'", "\\'")}');">${row.name}</a></td>
            <td class="px-6 py-4 doc-col-title ${hiddenClass('title')}">
                <div class="flex items-center cursor-pointer group" onclick="toggleRow('${rowId}', this)">
                    <i class="fa-solid fa-play text-xs text-gray-400 mr-2 rotate-icon ${iconRotateClass} group-hover:text-indigo-500"></i>
                    <span class="font-medium group-hover:text-indigo-600">${row.title}</span>
                    ${row.count > 0 ? `<span class="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-500 border border-gray-200">${row.count}件</span>` : ''}
                </div>
            </td>
            <td class="whitespace-nowrap px-6 py-4 doc-col-archive ${hiddenClass('archive')}"><span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${archiveClass}">${archiveLabel}</span></td>
            <td class="whitespace-nowrap px-6 py-4 doc-col-status ${hiddenClass('status')}"><span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${row.statusClass}">${row.status}</span></td>
            <td class="whitespace-nowrap px-6 py-4 doc-col-folder ${hiddenClass('folder')}"><i class="fa-regular fa-folder mr-1 text-gray-400"></i><a href="#" class="text-indigo-600 hover:text-indigo-800 hover:underline" onclick="event.preventDefault(); event.stopPropagation(); filterByFolder('${row.folder.replaceAll("'", "\\'")}');">${row.folder}</a></td>
            <td class="whitespace-nowrap px-6 py-4 doc-col-folderArchive ${hiddenClass('folderArchive')}"><span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${folderArchiveClass}">${folderArchiveLabel}</span></td>
            <td class="whitespace-nowrap px-6 py-4 text-gray-500 doc-col-created ${hiddenClass('created')}">${row.created}</td>
            <td class="whitespace-nowrap px-6 py-4 text-gray-500 doc-col-updated ${hiddenClass('updated')}">${row.updated}</td>
        `;
        tbody.appendChild(tr);

        // 子書類の行を追加
        if (row.children.length > 0) {
            row.children.forEach((child) => {
                const trChild = document.createElement('tr');
                trChild.className = `${detailRowHiddenClass} bg-gray-50/50 doc-detail-row border-t-0 hover:bg-gray-100 transition-colors cursor-pointer`;
                trChild.dataset.parentRowId = rowId;
                
                trChild.innerHTML = `
                    <td class="px-6 py-2"></td>
                    <td class="px-6 py-2 doc-col-empId ${hiddenClass('empId')}"></td>
                    <td class="px-6 py-2 doc-col-name ${hiddenClass('name')}"></td>
                    <td class="px-6 py-2 doc-col-title ${hiddenClass('title')}">
                        <div class="flex items-center pl-6 text-sm text-gray-600">
                            <i class="${child.icon} mr-2"></i>
                            <span>${child.name}</span>
                            <span class="ml-3 text-xs text-gray-400">${child.size}</span>
                        </div>
                    </td>
                    <td class="px-6 py-2 doc-col-archive ${hiddenClass('archive')}"></td>
                    <td class="px-6 py-2 doc-col-status ${hiddenClass('status')}"></td>
                    <td class="px-6 py-2 doc-col-folder ${hiddenClass('folder')}"></td>
                    <td class="px-6 py-2 doc-col-folderArchive ${hiddenClass('folderArchive')}"></td>
                    <td class="px-6 py-2 doc-col-created ${hiddenClass('created')}"></td>
                    <td class="px-6 py-2 doc-col-updated ${hiddenClass('updated')}"></td>
                `;
                tbody.appendChild(trChild);
            });
        } else {
            // 子書類がない場合
            const trChild = document.createElement('tr');
            trChild.className = `${detailRowHiddenClass} bg-gray-50/50 doc-detail-row border-t-0 hover:bg-gray-100 transition-colors`;
            trChild.dataset.parentRowId = rowId;
            
            trChild.innerHTML = `
                <td class="px-6 py-2"></td>
                <td class="px-6 py-2 doc-col-empId ${hiddenClass('empId')}"></td>
                <td class="px-6 py-2 doc-col-name ${hiddenClass('name')}"></td>
                <td class="px-6 py-2 doc-col-title ${hiddenClass('title')}">
                    <div class="pl-6 text-xs text-gray-400">詳細なし</div>
                </td>
                <td class="px-6 py-2 doc-col-archive ${hiddenClass('archive')}"></td>
                <td class="px-6 py-2 doc-col-status ${hiddenClass('status')}"></td>
                <td class="px-6 py-2 doc-col-folder ${hiddenClass('folder')}"></td>
                <td class="px-6 py-2 doc-col-folderArchive ${hiddenClass('folderArchive')}"></td>
                <td class="px-6 py-2 doc-col-created ${hiddenClass('created')}"></td>
                <td class="px-6 py-2 doc-col-updated ${hiddenClass('updated')}"></td>
            `;
            tbody.appendChild(trChild);
        }
    });
}

function renderFolderTable(tbodyId, data) {
    const tbody = document.getElementById(tbodyId);
    tbody.innerHTML = '';
    resetSelectAllCheckbox(tbodyId);
    if (!data || data.length === 0) return;

    // ステータスに応じたクラス定義（定数から参照）
    const statusStyles = FOLDER_STATUS_STYLE;

    const hiddenClass = (col) => folderColumnVisibility[col] ? '' : 'hidden';

    data.forEach((row) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition-colors bg-white cursor-pointer";
        tr.dataset.folderName = row.name;
        
        // アーカイブ設定に応じて動的に件数を計算
        const counts = getFolderCounts(row, includeArchived);
        const fraction = (num, total) => `<span class="${num > 0 ? 'font-bold text-gray-900' : 'text-gray-400'}">${num}</span> <span class="text-gray-400">/</span> <span class="text-gray-500">${total}</span>`;
        
        // ステータスとスタイルを決定（動的な件数を使用）
        const folderForStatus = { ...row, ...counts };
        const status = determineFolderStatus(folderForStatus);
        const statusClass = statusStyles[status] || 'bg-gray-50 text-gray-600 ring-gray-500/10';

        // 基準日が存在しない場合のフォールバック
        const baseDate = row.baseDate || '-';

        // アーカイブ状態の表示
        const archiveLabel = row.isArchived ? 'アーカイブ済み' : 'いいえ';
        const archiveClass = row.isArchived 
            ? 'bg-red-50 text-red-700 ring-red-600/10' 
            : 'bg-gray-100 text-gray-500 ring-gray-500/10';

        tr.innerHTML = `
            <td class="whitespace-nowrap px-6 py-4 text-center" onclick="event.stopPropagation()"><input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"></td>
            <td class="whitespace-nowrap px-6 py-4 font-bold text-gray-700 folder-col-name ${hiddenClass('name')}"><i class="fa-regular fa-folder text-yellow-400 mr-2"></i>${row.name}</td>
            <td class="whitespace-nowrap px-6 py-4 folder-col-archive ${hiddenClass('archive')}"><span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${archiveClass}">${archiveLabel}</span></td>
            <td class="whitespace-nowrap px-6 py-4 folder-col-status ${hiddenClass('status')}"><span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusClass}">${status}</span></td>
            <td class="whitespace-nowrap px-6 py-4 text-gray-500 text-sm folder-col-baseDate ${hiddenClass('baseDate')}">${baseDate}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm folder-col-action ${hiddenClass('action')}">${fraction(counts.action, counts.total)}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm folder-col-unsent ${hiddenClass('unsent')}">${fraction(counts.unsent, counts.total)}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm folder-col-waiting ${hiddenClass('waiting')}">${fraction(counts.waiting, counts.total)}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm folder-col-completed ${hiddenClass('completed')}">${fraction(counts.completed, counts.total)}</td>
            <td class="whitespace-nowrap px-6 py-4 text-gray-500 text-xs folder-col-created ${hiddenClass('created')}">${row.created}</td>
            <td class="whitespace-nowrap px-6 py-4 text-gray-500 text-xs folder-col-updated ${hiddenClass('updated')}">${row.updated}</td>
        `;
        
        // 行クリックで書類画面へ遷移
        tr.addEventListener('click', () => {
            navigateToDocumentsWithFolder(row.name);
        });
        
        tbody.appendChild(tr);
    });
}

// フォルダをフィルタ条件にして書類画面へ遷移（フォルダ画面から）
function navigateToDocumentsWithFolder(folderName) {
    const params = new URLSearchParams();
    params.set(URL_PARAM.TARGET, URL_TARGET[CONTEXT.DOCUMENT]);
    // 表示のカスタマイズ状態を引き継ぐ（OFFの場合のみ明示）
    if (!customizeEnabled) {
        params.set(URL_PARAM.CUSTOMIZE, '0');
    }
    // アーカイブ済みを表示の状態を引き継ぐ
    if (includeArchived) {
        params.set(URL_PARAM.INCLUDE_ARCHIVED, 'true');
    }
    // 現在の表示モードを引き継ぐ
    params.set(URL_PARAM.VIEW, currentViewMode === 'tabs' ? VIEW_MODE.STATUS : VIEW_MODE.LIST);
    params.set(URL_PARAM.EXPAND, '1');
    // フィルタ: フォルダ名を指定
    const filter = { folder: [folderName] };
    params.set(URL_PARAM.FILTER, JSON.stringify(filter));
    
    globalThis.location.href = `${globalThis.location.pathname}?${params.toString()}`;
}

// 従業員をフィルタ条件にして書類画面へ遷移
function navigateToDocumentsWithEmployee(employeeName) {
    const params = new URLSearchParams();
    params.set(URL_PARAM.TARGET, URL_TARGET[CONTEXT.DOCUMENT]);
    // 表示のカスタマイズ状態を引き継ぐ（OFFの場合のみ明示）
    if (!customizeEnabled) {
        params.set(URL_PARAM.CUSTOMIZE, '0');
    }
    // アーカイブ済みを表示の状態を引き継ぐ
    if (includeArchived) {
        params.set(URL_PARAM.INCLUDE_ARCHIVED, 'true');
    }
    // 現在の表示モードを引き継ぐ
    params.set(URL_PARAM.VIEW, currentViewMode === 'tabs' ? VIEW_MODE.STATUS : VIEW_MODE.LIST);
    params.set(URL_PARAM.EXPAND, '1');
    // フィルタ: 従業員名を指定
    const filter = { employee: [employeeName] };
    params.set(URL_PARAM.FILTER, JSON.stringify(filter));
    
    globalThis.location.href = `${globalThis.location.pathname}?${params.toString()}`;
}

// 書類画面内でフォルダをフィルタ条件にセット（既存のフィルター条件をクリアしてフォルダ名のみをセット）
function filterByFolder(folderName) {
    // 既存のフィルター条件をクリア
    // マルチセレクトをクリア
    clearMultiSelectState('filter-doc-folder');
    clearMultiSelectState('filter-doc-employee');
    clearMultiSelectState('filter-doc-status');
    // テキスト入力をクリア
    document.getElementById('filter-doc-title').value = '';
    document.getElementById('filter-doc-created-from').value = '';
    document.getElementById('filter-doc-created-to').value = '';
    document.getElementById('filter-doc-updated-from').value = '';
    document.getElementById('filter-doc-updated-to').value = '';
    
    // フィルター条件をリセットしてフォルダ名のみをセット
    documentFilters = {
        folder: [folderName],
        employee: [],
        title: '',
        status: [],
        createdFrom: '',
        createdTo: '',
        updatedFrom: '',
        updatedTo: ''
    };
    multiSelectState['filter-doc-folder'] = [folderName];
    renderMultiSelectTags('filter-doc-folder');
    
    // フィルタを適用して画面更新
    applyDocumentFiltersWithoutClose();
    updateActiveFiltersDisplay();
    updateUrlParams();
}

function switchDocumentTab(tabName, pagedData = null) {
    currentDocTab = tabName;
    updateTabStyles('tab-doc-btn', tabName);
    
    // pagedDataが渡されない場合は全データからフィルタ（互換性のため）
    const dataToFilter = pagedData || filteredDocData;
    const filtered = dataToFilter.filter(d => d.tabCategory === tabName);
    
    const emptyState = document.getElementById('document-empty-state');
    const tableEl = document.getElementById('document-tab-table-body').parentElement;

    if (filtered.length > 0) {
        renderDocTable('document-tab-table-body', filtered);
        emptyState.classList.add('hidden');
        tableEl.classList.remove('hidden');
    } else {
        document.getElementById('document-tab-table-body').innerHTML = '';
        emptyState.classList.remove('hidden');
        tableEl.classList.add('hidden');
    }
    updateUrlParams();
}

function switchFolderTab(tabName, pagedData = null) {
    currentFolderTab = tabName;
    updateTabStyles('tab-folder-btn', tabName);
    
    // pagedDataが渡されない場合は全データからフィルタ（互換性のため）
    const dataToFilter = pagedData || filteredFolderData;
    const filtered = dataToFilter.filter(d => {
        const status = determineFolderStatus(d);
        return status === tabName;
    });

    const emptyState = document.getElementById('folder-empty-state');
    const tableEl = document.getElementById('folder-tab-table-body').parentElement;

    if (filtered.length > 0) {
        renderFolderTable('folder-tab-table-body', filtered);
        emptyState.classList.add('hidden');
        tableEl.classList.remove('hidden');
    } else {
        document.getElementById('folder-tab-table-body').innerHTML = '';
        emptyState.classList.remove('hidden');
        tableEl.classList.add('hidden');
    }
    updateUrlParams();
}

function updateTabStyles(btnClass, activeTabName) {
    document.querySelectorAll('.' + btnClass).forEach(btn => {
        if (btn.dataset.tab === activeTabName) {
            btn.classList.add('tab-active');
            btn.classList.remove('tab-inactive');
        } else {
            btn.classList.add('tab-inactive');
            btn.classList.remove('tab-active');
        }
    });
}

// タブに件数を表示（現在のページ内の件数）
function updateTabCounts() {
    // タブ名の配列（定数から生成）
    const tabs = TAB_ORDER.map(t => t.name);
    
    // 書類タブの件数を更新
    const docPag = pagination[CONTEXT.DOCUMENT];
    const pagedDocData = getPagedData(filteredDocData, docPag.currentPage, docPag.pageSize);
    tabs.forEach(tabName => {
        const count = pagedDocData.filter(d => d.tabCategory === tabName).length;
        const btn = document.querySelector(`.tab-doc-btn[data-tab="${tabName}"]`);
        if (btn) {
            btn.textContent = `${tabName} (${count})`;
        }
    });
    
    // フォルダタブの件数を更新
    const folderPag = pagination[CONTEXT.FOLDER];
    const pagedFolderData = getPagedData(filteredFolderData, folderPag.currentPage, folderPag.pageSize);
    tabs.forEach(tabName => {
        const count = pagedFolderData.filter(d => determineFolderStatus(d) === tabName).length;
        const btn = document.querySelector(`.tab-folder-btn[data-tab="${tabName}"]`);
        if (btn) {
            btn.textContent = `${tabName} (${count})`;
        }
    });
}

function toggleRow(rowId, headerElement) {
    // data-parent-row-id属性で関連付けられた子行を取得
    const targetRows = document.querySelectorAll(`tr[data-parent-row-id="${rowId}"]`);
    const icon = headerElement.querySelector('.rotate-icon');
    
    if (targetRows.length === 0) return;
    
    // 最初の行の状態で判定
    const isHidden = targetRows[0].classList.contains('hidden');
    
    targetRows.forEach(row => {
        if (isHidden) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });
    
    if (isHidden) {
        icon.classList.add('rotate-90-deg');
    } else {
        icon.classList.remove('rotate-90-deg');
    }
}

function toggleFilterPanel() {
    const panelDoc = document.getElementById('filter-panel-document');
    const panelFolder = document.getElementById('filter-panel-folder');
    const icon = document.getElementById('filter-icon');
    const toggleText = document.getElementById('filter-toggle-text');
    
    const isOpen = !panelDoc.classList.contains('hidden') || !panelFolder.classList.contains('hidden');
    
    if (isOpen) {
        // 閉じる
        panelDoc.classList.add('hidden');
        panelFolder.classList.add('hidden');
        icon.classList.remove('open');
        toggleText.textContent = 'フィルターを表示する';
    } else {
        // 開く（現在のコンテキストに応じて）
        if (currentContext === CONTEXT.DOCUMENT) {
            panelDoc.classList.remove('hidden');
            panelFolder.classList.add('hidden');
        } else {
            panelDoc.classList.add('hidden');
            panelFolder.classList.remove('hidden');
        }
        icon.classList.add('open');
        toggleText.textContent = 'フィルターを非表示にする';
    }
}

function closeFilterPanel() {
    const panelDoc = document.getElementById('filter-panel-document');
    const panelFolder = document.getElementById('filter-panel-folder');
    const icon = document.getElementById('filter-icon');
    const toggleText = document.getElementById('filter-toggle-text');
    
    panelDoc.classList.add('hidden');
    panelFolder.classList.add('hidden');
    icon.classList.remove('open');
    toggleText.textContent = 'フィルターを表示する';
}

function setupSettingsMenu() {
    const gearBtn = document.getElementById('gear-btn');
    const menu = document.getElementById('display-settings-menu');
    if(!gearBtn || !menu) return;
    gearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // 操作メニューを閉じる
        closeActionMenu();
        
        if (menu.classList.contains('hidden')) {
            const rect = gearBtn.getBoundingClientRect();
            menu.style.top = `${rect.bottom + window.scrollY + 8}px`;
            menu.style.right = `${document.body.clientWidth - rect.right}px`;
            menu.style.left = 'auto';
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    });
    menu.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('click', () => menu.classList.add('hidden'));
}

// ==============================
// 列表示トグル関連関数
// ==============================

function setupColumnToggles() {
    // 書類用の列トグル
    const docColumns = ['empId', 'name', 'title', 'archive', 'status', 'folder', 'folderArchive', 'created', 'updated'];
    docColumns.forEach(col => {
        const toggle = document.getElementById(`toggle-doc-${col}`);
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                docColumnVisibility[col] = e.target.checked;
                updateDocColumnVisibility(col, e.target.checked);
                updateUrlParams();
            });
        }
    });

    // フォルダ用の列トグル
    const folderColumns = ['name', 'archive', 'status', 'baseDate', 'action', 'unsent', 'waiting', 'completed', 'created', 'updated'];
    folderColumns.forEach(col => {
        const toggle = document.getElementById(`toggle-folder-${col}`);
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                folderColumnVisibility[col] = e.target.checked;
                updateFolderColumnVisibility(col, e.target.checked);
                updateUrlParams();
            });
        }
    });

    // 書類セット名を常に開くトグル
    const alwaysExpandToggle = document.getElementById('toggle-doc-always-expand');
    if (alwaysExpandToggle) {
        alwaysExpandToggle.addEventListener('change', (e) => {
            docAlwaysExpand = e.target.checked;
            // テーブルを再レンダリングして展開状態を適用
            renderCurrentView();
            updateUrlParams();
        });
    }

    // アーカイブを含むトグル（フォルダ・書類で共通・連動）
    const docIncludeArchivedToggle = document.getElementById('toggle-doc-include-archived');
    const folderIncludeArchivedToggle = document.getElementById('toggle-folder-include-archived');
    
    const syncIncludeArchivedToggles = (checked) => {
        includeArchived = checked;
        appState.includeArchived = checked;
        // 両方のトグルを同期
        if (docIncludeArchivedToggle) docIncludeArchivedToggle.checked = checked;
        if (folderIncludeArchivedToggle) folderIncludeArchivedToggle.checked = checked;
        // フィルターを再適用してテーブルを更新
        if (currentContext === CONTEXT.DOCUMENT) {
            applyDocumentFiltersWithoutClose();
        } else {
            applyFolderFiltersWithoutClose();
        }
        updateUrlParams();
    };
    
    if (docIncludeArchivedToggle) {
        docIncludeArchivedToggle.addEventListener('change', (e) => {
            syncIncludeArchivedToggles(e.target.checked);
        });
    }
    
    if (folderIncludeArchivedToggle) {
        folderIncludeArchivedToggle.addEventListener('change', (e) => {
            syncIncludeArchivedToggles(e.target.checked);
        });
    }

    // 「表示のカスタマイズ」トグル（フォルダ・書類で共有・連動）
    const docCustomizeToggle = document.getElementById('toggle-doc-customize');
    const folderCustomizeToggle = document.getElementById('toggle-folder-customize');
    const docSection = document.getElementById('doc-customize-section');
    const folderSection = document.getElementById('folder-customize-section');

    const syncCustomizeToggles = (checked) => {
        customizeEnabled = checked;
        // 両方のトグルとセクションを同期
        if (docCustomizeToggle) docCustomizeToggle.checked = checked;
        if (folderCustomizeToggle) folderCustomizeToggle.checked = checked;
        if (docSection) docSection.classList.toggle('hidden', !checked);
        if (folderSection) folderSection.classList.toggle('hidden', !checked);
        // 表示オーバーライドを適用して再レンダリング
        renderCurrentView();
        updateUrlParams();
    };

    if (docCustomizeToggle) {
        docCustomizeToggle.addEventListener('change', (e) => {
            syncCustomizeToggles(e.target.checked);
        });
    }

    if (folderCustomizeToggle) {
        folderCustomizeToggle.addEventListener('change', (e) => {
            syncCustomizeToggles(e.target.checked);
        });
    }
}

function updateDocColumnVisibility(col, isVisible) {
    // ヘッダーとセルの表示/非表示を切り替え
    const cells = document.querySelectorAll(`.doc-col-${col}`);
    cells.forEach(cell => {
        if (isVisible) {
            cell.classList.remove('hidden');
        } else {
            cell.classList.add('hidden');
        }
    });
}

function updateFolderColumnVisibility(col, isVisible) {
    // ヘッダーとセルの表示/非表示を切り替え
    const cells = document.querySelectorAll(`.folder-col-${col}`);
    cells.forEach(cell => {
        if (isVisible) {
            cell.classList.remove('hidden');
        } else {
            cell.classList.add('hidden');
        }
    });
}

// ==============================
// フィルター関連関数
// ==============================

// 日付文字列を比較可能な形式に変換 (YYYY/MM/DD -> YYYYMMDD)
function normalizeDate(dateStr) {
    if (!dateStr) return '';
    return dateStr.replaceAll('/', '');
}

// input[type="date"]の値をYYYY/MM/DD形式に変換
function formatInputDate(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${y}/${m}/${d}`;
}

// 日付範囲フィルター
function isInDateRange(dateStr, fromStr, toStr) {
    if (!fromStr && !toStr) return true;
    const date = normalizeDate(dateStr);
    const from = normalizeDate(fromStr);
    const to = normalizeDate(toStr);
    
    if (from && to) {
        return date >= from && date <= to;
    } else if (from) {
        return date >= from;
    } else if (to) {
        return date <= to;
    }
    return true;
}

// 書類フィルター適用（コア処理）
function executeDocumentFilter() {
    filteredDocData = mockDocData.filter(doc => {
        // アーカイブフィルター
        // 書類自体がアーカイブされていない AND フォルダもアーカイブされていない場合のみ表示
        // どちらかがアーカイブされていれば、その書類セットはアーカイブされたものと見なす
        if (!includeArchived) {
            const folderArchived = isFolderArchived(doc.folderId);
            if (doc.isArchived || folderArchived) return false;
        }
        // フォルダ名フィルター（複数選択：いずれかに一致）
        if (documentFilters.folder.length > 0 && !documentFilters.folder.includes(doc.folder)) return false;
        // 従業員フィルター（複数選択：いずれかに一致）
        if (documentFilters.employee.length > 0 && !documentFilters.employee.includes(doc.name)) return false;
        // 書類セット名フィルター
        if (documentFilters.title && !doc.title.includes(documentFilters.title)) return false;
        // ステータスフィルター（複数選択：いずれかに一致）
        if (documentFilters.status.length > 0 && !documentFilters.status.includes(doc.status)) return false;
        // 作成日フィルター
        if (!isInDateRange(doc.created, documentFilters.createdFrom, documentFilters.createdTo)) return false;
        // 更新日フィルター
        if (!isInDateRange(doc.updated, documentFilters.updatedFrom, documentFilters.updatedTo)) return false;
        return true;
    });
    
    // ページを1に戻す
    pagination[CONTEXT.DOCUMENT].currentPage = 1;
    
    // 表示を更新
    renderCurrentView();
    updateActiveFiltersDisplay();
}

// 書類フィルター適用（UIから呼び出し）
function applyDocumentFilters() {
    // マルチセレクトから値を取得
    documentFilters.folder = [...multiSelectState['filter-doc-folder']];
    documentFilters.employee = [...multiSelectState['filter-doc-employee']];
    documentFilters.status = [...multiSelectState['filter-doc-status']];
    // テキスト入力から値を取得
    documentFilters.title = document.getElementById('filter-doc-title').value.trim();
    documentFilters.createdFrom = formatInputDate(document.getElementById('filter-doc-created-from').value);
    documentFilters.createdTo = formatInputDate(document.getElementById('filter-doc-created-to').value);
    documentFilters.updatedFrom = formatInputDate(document.getElementById('filter-doc-updated-from').value);
    documentFilters.updatedTo = formatInputDate(document.getElementById('filter-doc-updated-to').value);
    
    // フィルタリング実行
    executeDocumentFilter();
    
    // フィルターパネルを閉じる
    closeFilterPanel();
    
    // URLを更新
    updateUrlParams();
}

// 書類フィルタークリア
function clearDocumentFilters() {
    // マルチセレクトをクリア
    clearMultiSelectState('filter-doc-folder');
    clearMultiSelectState('filter-doc-employee');
    clearMultiSelectState('filter-doc-status');
    // テキスト入力をクリア
    document.getElementById('filter-doc-title').value = '';
    document.getElementById('filter-doc-created-from').value = '';
    document.getElementById('filter-doc-created-to').value = '';
    document.getElementById('filter-doc-updated-from').value = '';
    document.getElementById('filter-doc-updated-to').value = '';
    
    documentFilters = {
        folder: [],
        employee: [],
        title: '',
        status: [],
        createdFrom: '',
        createdTo: '',
        updatedFrom: '',
        updatedTo: ''
    };
    
    // アーカイブフィルターを考慮
    // 書類自体がアーカイブされていない AND フォルダもアーカイブされていない場合のみ表示
    if (includeArchived) {
        filteredDocData = [...mockDocData];
    } else {
        filteredDocData = mockDocData.filter(doc => {
            const folderArchived = isFolderArchived(doc.folderId);
            return !doc.isArchived && !folderArchived;
        });
    }
    
    // ページを1に戻す
    pagination.document.currentPage = 1;
    renderCurrentView();
    updateActiveFiltersDisplay();
    updateUrlParams();
}

// フォルダフィルター適用（コア処理）
function executeFolderFilter() {
    filteredFolderData = mockFolderData.filter(folder => {
        // アーカイブフィルター
        if (!includeArchived && folder.isArchived) return false;
        // フォルダ名フィルター（複数選択：いずれかに一致）
        if (folderFilters.name.length > 0 && !folderFilters.name.includes(folder.name)) return false;
        // ステータスフィルター（複数選択：いずれかに一致）
        if (folderFilters.status.length > 0) {
            const status = determineFolderStatus(folder);
            if (!folderFilters.status.includes(status)) return false;
        }
        // 基準日フィルター
        if (!isInDateRange(folder.baseDate, folderFilters.baseFrom, folderFilters.baseTo)) return false;
        // 作成日フィルター
        if (!isInDateRange(folder.created, folderFilters.createdFrom, folderFilters.createdTo)) return false;
        // 更新日フィルター
        if (!isInDateRange(folder.updated, folderFilters.updatedFrom, folderFilters.updatedTo)) return false;
        return true;
    });
    
    // ページを1に戻す
    pagination[CONTEXT.FOLDER].currentPage = 1;
    
    // 表示を更新
    renderCurrentView();
    updateActiveFiltersDisplay();
}

// フォルダフィルター適用（UIから呼び出し）
function applyFolderFilters() {
    // マルチセレクトから値を取得
    folderFilters.name = [...multiSelectState['filter-folder-name']];
    folderFilters.status = [...multiSelectState['filter-folder-status']];
    folderFilters.baseFrom = formatInputDate(document.getElementById('filter-folder-base-from').value);
    folderFilters.baseTo = formatInputDate(document.getElementById('filter-folder-base-to').value);
    folderFilters.createdFrom = formatInputDate(document.getElementById('filter-folder-created-from').value);
    folderFilters.createdTo = formatInputDate(document.getElementById('filter-folder-created-to').value);
    folderFilters.updatedFrom = formatInputDate(document.getElementById('filter-folder-updated-from').value);
    folderFilters.updatedTo = formatInputDate(document.getElementById('filter-folder-updated-to').value);
    
    // フィルタリング実行
    executeFolderFilter();
    
    // フィルターパネルを閉じる
    closeFilterPanel();
    
    // URLを更新
    updateUrlParams();
}

// フォルダフィルタークリア
function clearFolderFilters() {
    // マルチセレクトをクリア
    clearMultiSelectState('filter-folder-name');
    clearMultiSelectState('filter-folder-status');
    document.getElementById('filter-folder-base-from').value = '';
    document.getElementById('filter-folder-base-to').value = '';
    document.getElementById('filter-folder-created-from').value = '';
    document.getElementById('filter-folder-created-to').value = '';
    document.getElementById('filter-folder-updated-from').value = '';
    document.getElementById('filter-folder-updated-to').value = '';
    
    folderFilters = {
        name: [],
        status: [],
        baseFrom: '',
        baseTo: '',
        createdFrom: '',
        createdTo: '',
        updatedFrom: '',
        updatedTo: ''
    };
    
    // アーカイブフィルターを考慮
    filteredFolderData = includeArchived 
        ? [...mockFolderData] 
        : mockFolderData.filter(folder => !folder.isArchived);
    
    // ページを1に戻す
    pagination.folder.currentPage = 1;
    renderCurrentView();
    updateActiveFiltersDisplay();
    updateUrlParams();
}

// 適用中のフィルター表示を更新
function updateActiveFiltersDisplay() {
    const container = document.getElementById('active-filters-container');
    const filterGroups = [];
    
    // 書類ステータスに応じた色（表と統一）
    const docStatusColors = {
        '承認待ち': { colorClass: 'bg-yellow-50 text-yellow-800 border-yellow-200', btnClass: 'text-yellow-600 hover:text-yellow-800' },
        '確認中': { colorClass: 'bg-blue-50 text-blue-700 border-blue-200', btnClass: 'text-blue-400 hover:text-blue-600' },
        '完了': { colorClass: 'bg-green-50 text-green-700 border-green-200', btnClass: 'text-green-400 hover:text-green-600' },
        '差戻し': { colorClass: 'bg-red-50 text-red-700 border-red-200', btnClass: 'text-red-400 hover:text-red-600' },
        '未送信': { colorClass: 'bg-gray-100 text-gray-700 border-gray-300', btnClass: 'text-gray-400 hover:text-gray-600' }
    };
    
    // フォルダステータスに応じた色（表と統一）
    const folderStatusColors = {
        '要対応': { colorClass: 'bg-red-50 text-red-700 border-red-200', btnClass: 'text-red-400 hover:text-red-600' },
        '未送信': { colorClass: 'bg-gray-100 text-gray-700 border-gray-300', btnClass: 'text-gray-400 hover:text-gray-600' },
        '相手方確認中': { colorClass: 'bg-yellow-50 text-yellow-800 border-yellow-200', btnClass: 'text-yellow-600 hover:text-yellow-800' },
        '完了': { colorClass: 'bg-green-50 text-green-700 border-green-200', btnClass: 'text-green-400 hover:text-green-600' }
    };
    
    // 日付ラベルを生成するヘルパー関数
    const getDateRangeLabel = (prefix, from, to) => {
        if (from && to) return `${prefix}: ${from} - ${to}`;
        if (from) return `${prefix}: ${from} 以降`;
        return `${prefix}: ${to} 以前`;
    };
    
    if (currentContext === CONTEXT.DOCUMENT) {
        // 書類フィルター
        // フォルダ（複数選択 - グループ化）
        if (documentFilters.folder.length > 0) {
            filterGroups.push({
                icon: 'fa-regular fa-folder',
                type: 'doc-folder',
                tags: documentFilters.folder.map((folder, index) => ({
                    label: folder,
                    colorClass: 'bg-blue-50 text-blue-700 border-blue-100',
                    btnClass: 'text-blue-400 hover:text-blue-600',
                    index: index
                }))
            });
        }
        // 従業員（複数選択 - グループ化）
        if (documentFilters.employee.length > 0) {
            filterGroups.push({
                icon: 'fa-regular fa-user',
                type: 'doc-employee',
                tags: documentFilters.employee.map((employee, index) => ({
                    label: employee,
                    colorClass: 'bg-green-50 text-green-700 border-green-100',
                    btnClass: 'text-green-400 hover:text-green-600',
                    index: index
                }))
            });
        }
        // 書類セット名（単一）
        if (documentFilters.title) {
            filterGroups.push({
                icon: 'fa-regular fa-file-lines',
                type: 'doc-title',
                tags: [{
                    label: documentFilters.title,
                    colorClass: 'bg-purple-50 text-purple-700 border-purple-100',
                    btnClass: 'text-purple-400 hover:text-purple-600'
                }]
            });
        }
        // ステータス（複数選択 - グループ化）
        if (documentFilters.status.length > 0) {
            filterGroups.push({
                icon: 'fa-regular fa-circle',
                type: 'doc-status',
                tags: documentFilters.status.map((status, index) => {
                    const statusColor = docStatusColors[status] || { colorClass: 'bg-gray-50 text-gray-600 border-gray-200', btnClass: 'text-gray-400 hover:text-gray-600' };
                    return {
                        label: status,
                        colorClass: statusColor.colorClass,
                        btnClass: statusColor.btnClass,
                        index: index
                    };
                })
            });
        }
        // 作成日（単一）
        if (documentFilters.createdFrom || documentFilters.createdTo) {
            filterGroups.push({
                icon: 'fa-regular fa-clock',
                type: 'doc-created',
                tags: [{
                    label: getDateRangeLabel('作成', documentFilters.createdFrom, documentFilters.createdTo),
                    colorClass: 'bg-gray-50 text-gray-600 border-gray-200',
                    btnClass: 'text-gray-400 hover:text-gray-600'
                }]
            });
        }
        // 更新日（単一）
        if (documentFilters.updatedFrom || documentFilters.updatedTo) {
            filterGroups.push({
                icon: 'fa-solid fa-clock-rotate-left',
                type: 'doc-updated',
                tags: [{
                    label: getDateRangeLabel('更新', documentFilters.updatedFrom, documentFilters.updatedTo),
                    colorClass: 'bg-gray-50 text-gray-600 border-gray-200',
                    btnClass: 'text-gray-400 hover:text-gray-600'
                }]
            });
        }
    } else {
        // フォルダフィルター
        // フォルダ名（複数選択 - グループ化）
        if (folderFilters.name.length > 0) {
            filterGroups.push({
                icon: 'fa-regular fa-folder',
                type: 'folder-name',
                tags: folderFilters.name.map((name, index) => ({
                    label: name,
                    colorClass: 'bg-blue-50 text-blue-700 border-blue-100',
                    btnClass: 'text-blue-400 hover:text-blue-600',
                    index: index
                }))
            });
        }
        // ステータス（複数選択 - グループ化）
        if (folderFilters.status.length > 0) {
            filterGroups.push({
                icon: 'fa-regular fa-circle',
                type: 'folder-status',
                tags: folderFilters.status.map((status, index) => {
                    const statusColor = folderStatusColors[status] || { colorClass: 'bg-gray-50 text-gray-600 border-gray-200', btnClass: 'text-gray-400 hover:text-gray-600' };
                    return {
                        label: status,
                        colorClass: statusColor.colorClass,
                        btnClass: statusColor.btnClass,
                        index: index
                    };
                })
            });
        }
        // 基準日（単一）
        if (folderFilters.baseFrom || folderFilters.baseTo) {
            filterGroups.push({
                icon: 'fa-regular fa-calendar',
                type: 'folder-base',
                tags: [{
                    label: getDateRangeLabel('基準日', folderFilters.baseFrom, folderFilters.baseTo),
                    colorClass: 'bg-purple-50 text-purple-600 border-purple-200',
                    btnClass: 'text-purple-400 hover:text-purple-600'
                }]
            });
        }
        // 作成日（単一）
        if (folderFilters.createdFrom || folderFilters.createdTo) {
            filterGroups.push({
                icon: 'fa-regular fa-clock',
                type: 'folder-created',
                tags: [{
                    label: getDateRangeLabel('作成', folderFilters.createdFrom, folderFilters.createdTo),
                    colorClass: 'bg-gray-50 text-gray-600 border-gray-200',
                    btnClass: 'text-gray-400 hover:text-gray-600'
                }]
            });
        }
        // 更新日（単一）
        if (folderFilters.updatedFrom || folderFilters.updatedTo) {
            filterGroups.push({
                icon: 'fa-solid fa-clock-rotate-left',
                type: 'folder-updated',
                tags: [{
                    label: getDateRangeLabel('更新', folderFilters.updatedFrom, folderFilters.updatedTo),
                    colorClass: 'bg-gray-50 text-gray-600 border-gray-200',
                    btnClass: 'text-gray-400 hover:text-gray-600'
                }]
            });
        }
    }
    
    if (filterGroups.length === 0) {
        container.innerHTML = '<span class="text-sm text-gray-400">フィルターなし</span>';
    } else {
        container.innerHTML = filterGroups.map(group => {
            const tagsHtml = group.tags.map(tag => {
                const indexArg = tag.index !== undefined ? `, ${tag.index}` : '';
                return `
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tag.colorClass} border">
                        ${tag.label}
                        <button type="button" onclick="removeFilter('${group.type}'${indexArg})" class="ml-1.5 ${tag.btnClass}">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </span>
                `;
            }).join('');
            return `
            <div class="flex items-center gap-2">
                <i class="${group.icon} text-gray-400 text-lg"></i>
                <div class="flex flex-wrap gap-1">
                    ${tagsHtml}
                </div>
            </div>
        `;
        }).join('');
    }
}

// 個別フィルター削除
function removeFilter(type, index = null) {
    if (type.startsWith('doc-')) {
        switch(type) {
            case 'doc-folder':
                if (index !== null && documentFilters.folder.length > 0) {
                    documentFilters.folder.splice(index, 1);
                    multiSelectState['filter-doc-folder'].splice(index, 1);
                    renderMultiSelectTags('filter-doc-folder');
                }
                break;
            case 'doc-employee':
                if (index !== null && documentFilters.employee.length > 0) {
                    documentFilters.employee.splice(index, 1);
                    multiSelectState['filter-doc-employee'].splice(index, 1);
                    renderMultiSelectTags('filter-doc-employee');
                }
                break;
            case 'doc-title':
                documentFilters.title = '';
                document.getElementById('filter-doc-title').value = '';
                break;
            case 'doc-status':
                if (index !== null && documentFilters.status.length > 0) {
                    documentFilters.status.splice(index, 1);
                    multiSelectState['filter-doc-status'].splice(index, 1);
                    renderMultiSelectTags('filter-doc-status');
                }
                break;
            case 'doc-created':
                documentFilters.createdFrom = '';
                documentFilters.createdTo = '';
                document.getElementById('filter-doc-created-from').value = '';
                document.getElementById('filter-doc-created-to').value = '';
                break;
            case 'doc-updated':
                documentFilters.updatedFrom = '';
                documentFilters.updatedTo = '';
                document.getElementById('filter-doc-updated-from').value = '';
                document.getElementById('filter-doc-updated-to').value = '';
                break;
        }
        // 再フィルタリング
        applyDocumentFiltersWithoutClose();
    } else if (type.startsWith('folder-')) {
        switch(type) {
            case 'folder-name':
                if (index !== null && folderFilters.name.length > 0) {
                    folderFilters.name.splice(index, 1);
                    multiSelectState['filter-folder-name'].splice(index, 1);
                    renderMultiSelectTags('filter-folder-name');
                }
                break;
            case 'folder-status':
                if (index !== null && folderFilters.status.length > 0) {
                    folderFilters.status.splice(index, 1);
                    multiSelectState['filter-folder-status'].splice(index, 1);
                    renderMultiSelectTags('filter-folder-status');
                }
                break;
            case 'folder-base':
                folderFilters.baseFrom = '';
                folderFilters.baseTo = '';
                document.getElementById('filter-folder-base-from').value = '';
                document.getElementById('filter-folder-base-to').value = '';
                break;
            case 'folder-created':
                folderFilters.createdFrom = '';
                folderFilters.createdTo = '';
                document.getElementById('filter-folder-created-from').value = '';
                document.getElementById('filter-folder-created-to').value = '';
                break;
            case 'folder-updated':
                folderFilters.updatedFrom = '';
                folderFilters.updatedTo = '';
                document.getElementById('filter-folder-updated-from').value = '';
                document.getElementById('filter-folder-updated-to').value = '';
                break;
        }
        // 再フィルタリング
        applyFolderFiltersWithoutClose();
    }
}

// パネルを閉じずにフィルター適用（個別削除用）
function applyDocumentFiltersWithoutClose() {
    executeDocumentFilter();
}

function applyFolderFiltersWithoutClose() {
    executeFolderFilter();
}

// ==============================
// ページネーション関連関数
// ==============================

function setupPagination() {
    const pageSizeSelect = document.getElementById('page-size-select');
    if (pageSizeSelect) {
        pageSizeSelect.addEventListener('change', (e) => {
            const newSize = Number.parseInt(e.target.value, 10);
            pagination[currentContext].pageSize = newSize;
            pagination[currentContext].currentPage = 1; // ページサイズ変更時は1ページ目に戻る
            renderCurrentView();
            updateUrlParams();
        });
    }
}

function getPagedData(data, page, pageSize) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
}

function getTotalPages(totalItems, pageSize) {
    return Math.ceil(totalItems / pageSize);
}

function goToPage(page) {
    const pag = pagination[currentContext];
    const data = currentContext === CONTEXT.DOCUMENT ? filteredDocData : filteredFolderData;
    const totalPages = getTotalPages(data.length, pag.pageSize);
    
    if (page < 1 || page > totalPages) return;
    
    pag.currentPage = page;
    renderCurrentView();
    updateUrlParams();
}

function renderCurrentView() {
    // カスタマイズ無効時の表示オーバーライドを適用
    applyDisplayOverrides();
    
    if (currentContext === CONTEXT.DOCUMENT) {
        const pag = pagination.document;
        const pagedData = getPagedData(filteredDocData, pag.currentPage, pag.pageSize);
        
        // ビューの表示/非表示を切り替え
        const docTable = document.getElementById('view-document-table');
        const docTabs = document.getElementById('view-document-tabs');
        if (currentViewMode === 'table') {
            docTable.classList.remove('hidden');
            docTabs.classList.add('hidden');
            renderDocTable('document-table-body', pagedData);
        } else {
            docTable.classList.add('hidden');
            docTabs.classList.remove('hidden');
            switchDocumentTab(currentDocTab, pagedData);
        }
        
        // ラジオボタンを同期
        const tableRadio = document.getElementById('view-radio-table-doc');
        const tabsRadio = document.getElementById('view-radio-tabs-doc');
        if (tableRadio) tableRadio.checked = (currentViewMode === 'table');
        if (tabsRadio) tabsRadio.checked = (currentViewMode === 'tabs');
    } else {
        const pag = pagination.folder;
        const pagedData = getPagedData(filteredFolderData, pag.currentPage, pag.pageSize);
        
        // ビューの表示/非表示を切り替え
        const folderTable = document.getElementById('view-folder-table');
        const folderTabs = document.getElementById('view-folder-tabs');
        if (currentViewMode === 'table') {
            folderTable.classList.remove('hidden');
            folderTabs.classList.add('hidden');
            renderFolderTable('folder-table-body', pagedData);
        } else {
            folderTable.classList.add('hidden');
            folderTabs.classList.remove('hidden');
            switchFolderTab(currentFolderTab, pagedData);
        }
        
        // ラジオボタンを同期
        const tableRadio = document.getElementById('view-radio-table-folder');
        const tabsRadio = document.getElementById('view-radio-tabs-folder');
        if (tableRadio) tableRadio.checked = (currentViewMode === 'table');
        if (tabsRadio) tabsRadio.checked = (currentViewMode === 'tabs');
    }
    updatePaginationUI();
    updateTabCounts();
}

function updatePaginationUI() {
    const nav = document.getElementById('pagination-nav');
    const info = document.getElementById('pagination-info');
    const pageSizeSelect = document.getElementById('page-size-select');
    
    if (!nav) return;
    
    const pag = pagination[currentContext];
    const data = currentContext === CONTEXT.DOCUMENT ? filteredDocData : filteredFolderData;
    const totalItems = data.length;
    const totalPages = getTotalPages(totalItems, pag.pageSize);
    const currentPage = pag.currentPage;
    
    // ページサイズセレクトを同期
    if (pageSizeSelect) {
        pageSizeSelect.value = pag.pageSize.toString();
    }
    
    // 情報テキストを更新
    if (info) {
        const start = totalItems === 0 ? 0 : (currentPage - 1) * pag.pageSize + 1;
        const end = Math.min(currentPage * pag.pageSize, totalItems);
        info.textContent = `${start}-${end} / ${totalItems}件`;
    }
    
    // ページネーションナビを生成
    let html = '';
    
    // 前へボタン
    const prevDisabled = currentPage <= 1;
    html += `<button onclick="goToPage(${currentPage - 1})" ${prevDisabled ? 'disabled' : ''} 
        class="relative inline-flex items-center rounded-l-md px-2 py-2 ${prevDisabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-50'} ring-1 ring-inset ring-gray-300">
        <i class="fa-solid fa-chevron-left text-xs"></i>
    </button>`;
    
    // ページ番号ボタン（最大5ページ表示）
    const pageButtons = generatePageNumbers(currentPage, totalPages);
    pageButtons.forEach(p => {
        if (p === '...') {
            html += `<span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>`;
        } else if (p === currentPage) {
            html += `<button class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">${p}</button>`;
        } else {
            html += `<button onclick="goToPage(${p})" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">${p}</button>`;
        }
    });
    
    // 次へボタン
    const nextDisabled = currentPage >= totalPages;
    html += `<button onclick="goToPage(${currentPage + 1})" ${nextDisabled ? 'disabled' : ''} 
        class="relative inline-flex items-center rounded-r-md px-2 py-2 ${nextDisabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-50'} ring-1 ring-inset ring-gray-300">
        <i class="fa-solid fa-chevron-right text-xs"></i>
    </button>`;
    
    nav.innerHTML = html;
}

function generatePageNumbers(currentPage, totalPages) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 4) {
        // 最初の方のページ
        const firstPages = Array.from({ length: 5 }, (_, i) => i + 1);
        return [...firstPages, '...', totalPages];
    }
    
    if (currentPage >= totalPages - 3) {
        // 最後の方のページ
        const lastPages = Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
        return [1, '...', ...lastPages];
    }
    
    // 中間のページ
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

// ==============================
// 全選択チェックボックス関連関数
// ==============================

function setupSelectAllCheckboxes() {
    // 書類テーブル（通常表示）
    const docTableSelectAll = document.getElementById('doc-table-select-all');
    if (docTableSelectAll) {
        docTableSelectAll.addEventListener('change', (e) => {
            toggleAllCheckboxes('document-table-body', e.target.checked);
        });
    }
    
    // 書類テーブル（タブ表示）
    const docTabSelectAll = document.getElementById('doc-tab-select-all');
    if (docTabSelectAll) {
        docTabSelectAll.addEventListener('change', (e) => {
            toggleAllCheckboxes('document-tab-table-body', e.target.checked);
        });
    }
    
    // フォルダテーブル（通常表示）
    const folderTableSelectAll = document.getElementById('folder-table-select-all');
    if (folderTableSelectAll) {
        folderTableSelectAll.addEventListener('change', (e) => {
            toggleAllCheckboxes('folder-table-body', e.target.checked);
        });
    }
    
    // フォルダテーブル（タブ表示）
    const folderTabSelectAll = document.getElementById('folder-tab-select-all');
    if (folderTabSelectAll) {
        folderTabSelectAll.addEventListener('change', (e) => {
            toggleAllCheckboxes('folder-tab-table-body', e.target.checked);
        });
    }
}

function toggleAllCheckboxes(tbodyId, checked) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    
    // tbody内の全てのチェックボックスを取得（子行のチェックボックスは除外）
    const checkboxes = tbody.querySelectorAll('tr:not(.doc-detail-row) input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = checked;
    });
}

function resetSelectAllCheckbox(tbodyId) {
    // テーブルが再レンダリングされた時にヘッダーのチェックボックスをリセット
    const selectAllIds = {
        'document-table-body': 'doc-table-select-all',
        'document-tab-table-body': 'doc-tab-select-all',
        'folder-table-body': 'folder-table-select-all',
        'folder-tab-table-body': 'folder-tab-select-all'
    };
    
    const selectAllId = selectAllIds[tbodyId];
    if (selectAllId) {
        const selectAllCheckbox = document.getElementById(selectAllId);
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = false;
        }
    }
}

// ===== マルチセレクトコンポーネント =====

function setupMultiSelects() {
    // 各マルチセレクトコンテナを初期化
    document.querySelectorAll('.multi-select-container').forEach(container => {
        const selectId = container.dataset.id;
        const input = container.querySelector('.multi-select-input');
        const dropdown = container.querySelector('.multi-select-dropdown');
        const selectElement = container.querySelector('.multi-select');
        
        // 入力フィールドにフォーカスが入ったらドロップダウンを表示
        input.addEventListener('focus', (e) => {
            e.stopPropagation();
            // 他のマルチセレクトを閉じる
            closeAllMultiSelects();
            // このマルチセレクトを開く
            dropdown.classList.remove('hidden');
            selectElement.classList.add('active');
            renderMultiSelectOptions(selectId, input.value);
        });
        
        // 入力フィールドのキーイベント
        input.addEventListener('input', (e) => {
            e.stopPropagation();
            renderMultiSelectOptions(selectId, e.target.value);
        });
        
        input.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMultiSelect(container);
            }
        });
        
        // ドロップダウンのクリックイベント（閉じないように）
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // 初期オプションをレンダリング
        renderMultiSelectOptions(selectId, '');
    });
    
    // 外側クリックで閉じる
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.multi-select-container')) {
            closeAllMultiSelects();
        }
    });
}

function toggleMultiSelect(selectElement) {
    const container = selectElement.closest('.multi-select-container');
    const dropdown = container.querySelector('.multi-select-dropdown');
    const input = container.querySelector('.multi-select-input');
    const selectId = container.dataset.id;
    
    const isOpen = !dropdown.classList.contains('hidden');
    
    // 他のマルチセレクトを閉じる
    closeAllMultiSelects();
    
    if (!isOpen) {
        dropdown.classList.remove('hidden');
        selectElement.classList.add('active');
        input.focus();
        renderMultiSelectOptions(selectId, input.value);
    }
}

function closeMultiSelect(container) {
    const dropdown = container.querySelector('.multi-select-dropdown');
    const selectElement = container.querySelector('.multi-select');
    dropdown.classList.add('hidden');
    selectElement.classList.remove('active');
}

function closeAllMultiSelects() {
    document.querySelectorAll('.multi-select-container').forEach(container => {
        closeMultiSelect(container);
    });
}

function renderMultiSelectOptions(selectId, searchText) {
    const container = document.querySelector(`.multi-select-container[data-id="${selectId}"]`);
    const dropdown = container.querySelector('.multi-select-dropdown');
    const optionsGetter = multiSelectOptions[selectId];
    
    if (!optionsGetter) return;
    
    let options = optionsGetter();
    
    // 検索テキストでフィルタリング
    if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        options = options.filter(opt => opt.toLowerCase().includes(lowerSearch));
    }
    
    if (options.length === 0) {
        dropdown.innerHTML = '<div class="multi-select-no-results">該当する項目がありません</div>';
        return;
    }
    
    const selectedValues = multiSelectState[selectId] || [];
    
    dropdown.innerHTML = options.map(opt => {
        const isSelected = selectedValues.includes(opt);
        const escapedOpt = opt.replaceAll("'", "\\'");
        return `
            <div class="multi-select-option ${isSelected ? 'selected' : ''}" 
                 onclick="selectMultiSelectOption('${selectId}', '${escapedOpt}')">
                <input type="checkbox" ${isSelected ? 'checked' : ''} tabindex="-1">
                <span>${opt}</span>
            </div>
        `;
    }).join('');
}

function selectMultiSelectOption(selectId, value) {
    const selectedValues = multiSelectState[selectId];
    const index = selectedValues.indexOf(value);
    
    if (index === -1) {
        selectedValues.push(value);
    } else {
        selectedValues.splice(index, 1);
    }
    
    // タグを更新
    renderMultiSelectTags(selectId);
    
    // オプションリストを更新
    const container = document.querySelector(`.multi-select-container[data-id="${selectId}"]`);
    const input = container.querySelector('.multi-select-input');
    renderMultiSelectOptions(selectId, input.value);
}

function renderMultiSelectTags(selectId) {
    const container = document.querySelector(`.multi-select-container[data-id="${selectId}"]`);
    const tagsContainer = container.querySelector('.multi-select-tags');
    const input = container.querySelector('.multi-select-input');
    const selectedValues = multiSelectState[selectId] || [];
    
    if (selectedValues.length === 0) {
        tagsContainer.innerHTML = '';
        input.placeholder = getMultiSelectPlaceholder(selectId);
        return;
    }
    
    tagsContainer.innerHTML = selectedValues.map(value => {
        const escapedValue = value.replaceAll("'", "\\'");
        return `
        <span class="multi-select-tag">
            ${value}
            <i class="fa-solid fa-xmark multi-select-tag-remove" onclick="removeMultiSelectTag(event, '${selectId}', '${escapedValue}')"></i>
        </span>
    `;
    }).join('');
    
    input.placeholder = '';
}

function removeMultiSelectTag(event, selectId, value) {
    event.stopPropagation();
    const selectedValues = multiSelectState[selectId];
    const index = selectedValues.indexOf(value);
    
    if (index !== -1) {
        selectedValues.splice(index, 1);
    }
    
    renderMultiSelectTags(selectId);
    
    // ドロップダウンが開いている場合はオプションリストも更新
    const container = document.querySelector(`.multi-select-container[data-id="${selectId}"]`);
    const dropdown = container.querySelector('.multi-select-dropdown');
    if (!dropdown.classList.contains('hidden')) {
        const input = container.querySelector('.multi-select-input');
        renderMultiSelectOptions(selectId, input.value);
    }
}

function getMultiSelectPlaceholder(selectId) {
    const placeholders = {
        'filter-doc-folder': 'フォルダを選択',
        'filter-doc-employee': '従業員を選択',
        'filter-doc-status': 'ステータスを選択',
        'filter-folder-name': 'フォルダ名を選択',
        'filter-folder-status': 'ステータスを選択'
    };
    return placeholders[selectId] || '選択してください';
}

function clearMultiSelectState(selectId) {
    multiSelectState[selectId] = [];
    renderMultiSelectTags(selectId);
    
    const container = document.querySelector(`.multi-select-container[data-id="${selectId}"]`);
    if (container) {
        const input = container.querySelector('.multi-select-input');
        if (input) input.value = '';
    }
}

function handleMultiSelectKeydown(event, selectElement) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMultiSelect(selectElement);
    } else if (event.key === 'Escape') {
        const container = selectElement.closest('.multi-select-container');
        closeMultiSelect(container);
    }
}