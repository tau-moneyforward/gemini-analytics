// 事業所コードから事業所名を取得する
function getWorkplaceName(code) {
    const loc = appData.locations.find(l => l.code === code);
    return loc ? loc.name : code;
}

// 社保コードから社保名を取得する
function getSocialInsuranceName(code) {
    const s = appData.socialInsurances.find(x => x.code === code);
    return s ? s.name : code;
}

// 労保コードから労保名を取得する
function getLaborInsuranceName(code) {
    const l = appData.laborInsurances.find(x => x.code === code);
    return l ? l.name : code;
}

// 画面のタブ切り替え機能
function switchTab(tabId, element) {
    // サイドバーの選択状態を更新
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    // ページの表示を切り替え
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

// データをテーブルに描画する機能
function renderTables() {
    // 1. 事業所の描画
    const locationsTbody = document.getElementById('tbody-locations');
    appData.locations.forEach(item => {
        const socialName = getSocialInsuranceName(item.social);
        const laborName = getLaborInsuranceName(item.labor);
        locationsTbody.innerHTML += `
            <tr>
                <td><code>${item.code}</code></td>
                <td>${item.name}</td>
                <td><code>${item.social}</code> <span class="workplace-name">${socialName}</span></td>
                <td><code>${item.labor}</code> <span class="workplace-name">${laborName}</span></td>
            </tr>
        `;
    });

    // 2. 社保情報の描画
    const socialTbody = document.getElementById('tbody-social-insurances');
    appData.socialInsurances.forEach(item => {
        const workplaceName = getWorkplaceName(item.workplace);
        socialTbody.innerHTML += `
            <tr>
                <td><code>${item.code}</code></td>
                <td>${item.name}</td>
                <td><code>${item.workplace}</code> <span class="workplace-name">${workplaceName}</span></td>
            </tr>
        `;
    });

    // 3. 労保情報の描画
    const laborTbody = document.getElementById('tbody-labor-insurances');
    appData.laborInsurances.forEach(item => {
        const workplaceName = getWorkplaceName(item.workplace);
        laborTbody.innerHTML += `
            <tr>
                <td><code>${item.code}</code></td>
                <td>${item.name}</td>
                <td><code>${item.workplace}</code> <span class="workplace-name">${workplaceName}</span></td>
            </tr>
        `;
    });
}

// 画面読み込み完了時にテーブルを描画
window.onload = renderTables;