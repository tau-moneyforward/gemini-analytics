const appData = {
    // 事業所データ
    locations: [
        { code: "W-001", name: "東京本社", social: "S-001", labor: "L-001" },
        { code: "W-002", name: "大阪", social: "S-002", labor: "L-002" },
        { code: "W-003", name: "名古屋", social: "S-001", labor: "L-003" },
        { code: "W-004", name: "仙台", social: "S-001", labor: "L-001" },
        { code: "W-005", name: "福岡", social: "S-002", labor: "L-004" }
    ],
    // 社保情報データ
    socialInsurances: [
        { code: "S-001", name: "本社一括", workplace: "W-001" },
        { code: "S-002", name: "大阪以西", workplace: "W-002" },
    ], 
    // 労保情報データ
    laborInsurances: [
        { code: "L-001", name: "東京本社 (仙台も対応)", workplace: "W-001" },
        { code: "L-002", name: "大阪", workplace: "W-002" },
        { code: "L-003", name: "名古屋", workplace: "W-003" },
        { code: "L-004", name: "福岡", workplace: "W-005" }
    ]
};