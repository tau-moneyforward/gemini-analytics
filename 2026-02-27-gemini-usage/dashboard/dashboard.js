const COLORS = {
  A: '#3b82f6', B: '#10b981', C: '#14b8a6', D: '#f59e0b',
  E: '#6366f1', F: '#34d399', G: '#f59e0b', H: '#ec4899', I: '#9ca3af'
};

const METHOD_COLORS = {
  iterative:    '#3b82f6',
  contextual:   '#6366f1',
  generation:   '#8b5cf6',
  direct:       '#9ca3af',
  topic_switch: '#f59e0b',
};

const CONTEXT_COLORS = {
  material:    '#10b981',
  background:  '#3b82f6',
  constraints: '#6366f1',
  persona:     '#8b5cf6',
  zero_shot:   '#f59e0b',
};

const INTERACTION_COLORS = {
  accepted:    '#60a5fa',
  deepened:    '#34d399',
  refined:     '#a78bfa',
  error_found: '#f472b6',
  debated:     '#fb923c',
  switched:    '#fbbf24',
  abandoned:   '#94a3b8',
};

const LABELS = {
  A: 'プログラミング・技術支援', B: 'ドメイン知識（社保・人事労務）',
  C: 'ツール操作・トラブルシュート', D: '文章作成・リライト・翻訳',
  E: '設計・アーキテクチャ相談', F: '情報検索・知識確認',
  G: '日本語・英語の言語相談', H: '画像生成・編集', I: 'その他',
  iterative: '一緒に考える', direct: '知識を聞く',
  topic_switch: 'ついでに聞く', generation: '作ってもらう',
  contextual: '見てもらう',
  zero_shot: '質問文のみ', background: '背景・目的の説明', material: 'コード・資料の添付',
  constraints: '出力形式の指定', persona: '役割の指定',
  accepted: '一発承認', deepened: '追加深掘り', switched: 'トピック転換',
  refined: '修正リファイン', error_found: 'エラー指摘',
  abandoned: '放棄', debated: '反論・議論'
};

let allData = {};

function loadData() {
  const stats = window.__STATS__;
  const s12 = window.__STATS_12__;
  const s13 = window.__STATS_13__;
  const s14 = window.__STATS_14__;

  const methodMap = Object.fromEntries(s12.topics.map(t => [t.id, t.question_method]));
  const contextMap = Object.fromEntries(s13.topics.map(t => [t.id, t.context_provision]));
  const interactionMap = Object.fromEntries(s14.topics.map(t => [t.id, t.interaction_pattern]));

  const merged = stats.topics.map(t => ({
    ...t,
    question_method: methodMap[t.id] || '',
    context_provision: contextMap[t.id] || [],
    interaction_pattern: interactionMap[t.id] || ''
  }));

  allData = {
    stats, s12, s13, s14,
    topics: merged,
    categories: stats.metadata.categories,
    categorySummary: stats.metadata.category_summary
  };

  renderAll();
}

function renderAll() {
  renderPurposeChart('purpose-topics', 'topic_count');
  renderPurposeChart('purpose-queries', 'query_count');
  renderSummaryChart('question-method', allData.s12.metadata.summary, METHOD_COLORS);
  renderSummaryChart('context-provision', allData.s13.metadata.summary, CONTEXT_COLORS);
  renderSummaryChart('interaction-pattern', allData.s14.metadata.summary, INTERACTION_COLORS);
  renderCrossAnalysis();
  renderQueryDistribution();
  setupFilters();
  renderTable();
  setupTabs();
}

function renderPurposeChart(containerId, field) {
  const container = document.getElementById(containerId);
  const summary = allData.categorySummary;
  const entries = Object.entries(summary)
    .map(([key, val]) => ({ key, label: `${key}. ${allData.categories[key]}`, value: val[field], color: COLORS[key] }))
    .sort((a, b) => b.value - a.value);
  const max = Math.max(...entries.map(e => e.value));
  container.innerHTML = entries.map(e => barRow(e.label, e.value, max, e.color, `${e.value}件`)).join('');
}

function renderSummaryChart(containerId, summary, colors) {
  const container = document.getElementById(containerId);
  const entries = Object.entries(summary)
    .map(([key, val]) => ({ key, label: LABELS[key] || key, value: val.count, pct: val.pct, color: colors[key] || '#3b82f6' }))
    .sort((a, b) => b.value - a.value);
  const max = Math.max(...entries.map(e => e.value));
  container.innerHTML = entries.map(e => barRow(e.label, e.value, max, e.color, `${e.value}件 (${e.pct}%)`)).join('');
}

function barRow(label, value, max, color, displayText) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return `<div class="bar-row">
    <span class="bar-label" title="${label}">${label}</span>
    <div class="bar-track">
      <div class="bar-fill" style="width:${pct}%;background:${color}">
        ${pct > 25 ? `<span>${displayText}</span>` : ''}
      </div>
    </div>
    ${pct <= 25 ? `<span class="bar-value">${displayText}</span>` : '<span class="bar-value"></span>'}
  </div>`;
}

function renderCrossAnalysis() {
  const container = document.getElementById('cross-analysis');
  const methods = ['iterative', 'direct', 'topic_switch', 'generation', 'contextual'];
  const interactions = ['accepted', 'deepened', 'switched', 'refined', 'error_found', 'abandoned', 'debated'];

  const matrix = {};
  methods.forEach(m => { matrix[m] = {}; interactions.forEach(i => { matrix[m][i] = 0; }); });
  allData.topics.forEach(t => {
    if (matrix[t.question_method]?.[t.interaction_pattern] !== undefined) {
      matrix[t.question_method][t.interaction_pattern]++;
    }
  });

  const maxVal = Math.max(...Object.values(matrix).flatMap(row => Object.values(row)));

  const thCells = interactions.map(i => `<th title="${LABELS[i]}">${LABELS[i]}</th>`).join('');
  const rows = methods.map(m => {
    const cells = interactions.map(i => {
      const v = matrix[m][i];
      const intensity = maxVal > 0 ? v / maxVal : 0;
      const bg = intensity > 0
        ? `rgba(37, 99, 235, ${0.08 + intensity * 0.55})`
        : 'transparent';
      const textColor = intensity > 0.45 ? '#fff' : 'var(--text)';
      return `<td><span class="heatmap-cell" style="background:${bg};color:${textColor}" title="${LABELS[m]} × ${LABELS[i]}: ${v}件">${v || ''}</span></td>`;
    }).join('');
    return `<tr><td title="${LABELS[m]}">${LABELS[m]}</td>${cells}</tr>`;
  }).join('');

  container.innerHTML = `<table class="heatmap-table">
    <thead><tr><th></th>${thCells}</tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function renderQueryDistribution() {
  const container = document.getElementById('query-distribution');
  const buckets = [
    { label: '1回', min: 1, max: 1, count: 0, color: '#60a5fa' },
    { label: '2回', min: 2, max: 2, count: 0, color: '#3b82f6' },
    { label: '3-4回', min: 3, max: 4, count: 0, color: '#6366f1' },
    { label: '5-7回', min: 5, max: 7, count: 0, color: '#8b5cf6' },
    { label: '8回以上', min: 8, max: Infinity, count: 0, color: '#a78bfa' },
  ];

  allData.topics.forEach(t => {
    for (const b of buckets) {
      if (t.query_count >= b.min && t.query_count <= b.max) { b.count++; break; }
    }
  });

  const max = Math.max(...buckets.map(b => b.count));
  container.innerHTML = buckets.map(b =>
    barRow(b.label, b.count, max, b.color, `${b.count}件 (${(b.count / allData.topics.length * 100).toFixed(1)}%)`)
  ).join('');
}

function setupFilters() {
  const catFilter = document.getElementById('category-filter');
  Object.entries(allData.categories).forEach(([k, v]) => {
    const opt = document.createElement('option');
    opt.value = k;
    opt.textContent = `${k}. ${v}`;
    catFilter.appendChild(opt);
  });

  const methFilter = document.getElementById('method-filter');
  Object.keys(allData.s12.metadata.summary).forEach(k => {
    const opt = document.createElement('option');
    opt.value = k;
    opt.textContent = LABELS[k] || k;
    methFilter.appendChild(opt);
  });

  const intFilter = document.getElementById('interaction-filter');
  Object.keys(allData.s14.metadata.summary).forEach(k => {
    const opt = document.createElement('option');
    opt.value = k;
    opt.textContent = LABELS[k] || k;
    intFilter.appendChild(opt);
  });

  document.getElementById('topic-search').addEventListener('input', renderTable);
  catFilter.addEventListener('change', renderTable);
  methFilter.addEventListener('change', renderTable);
  intFilter.addEventListener('change', renderTable);
}

function renderTable() {
  const search = document.getElementById('topic-search').value.toLowerCase();
  const catVal = document.getElementById('category-filter').value;
  const methVal = document.getElementById('method-filter').value;
  const intVal = document.getElementById('interaction-filter').value;

  const filtered = allData.topics.filter(t => {
    if (search && !t.topic.toLowerCase().includes(search) && !t.source_file.toLowerCase().includes(search)) return false;
    if (catVal && !t[catVal]) return false;
    if (methVal && t.question_method !== methVal) return false;
    if (intVal && t.interaction_pattern !== intVal) return false;
    return true;
  });

  const tbody = document.querySelector('#topics-table tbody');
  tbody.innerHTML = filtered.map(t => {
    const cats = 'ABCDEFGHI'.split('');
    const catTags = cats.filter(c => t[c]).map(c =>
      `<span class="tag tag-${c}">${c}</span>`
    ).join('');

    const ctxTags = (t.context_provision || []).map(c =>
      `<span class="tag tag-ctx-${c}">${LABELS[c] || c}</span>`
    ).join('');

    const methodClass = `tag-method-${t.question_method}`;
    const intClass = `tag-int-${t.interaction_pattern}`;

    const sourceDisplay = (t.source_file || '').replace(/^_/, '').replace(/\s*\.md$/, '');

    return `<tr>
      <td>${t.id}</td>
      <td>${escapeHtml(t.topic)}</td>
      <td class="source-file" title="${escapeHtml(t.source_file || '')}">${escapeHtml(sourceDisplay)}</td>
      <td>${t.query_count}</td>
      <td>${catTags}</td>
      <td><span class="tag ${methodClass}">${LABELS[t.question_method] || t.question_method || '-'}</span></td>
      <td>${ctxTags || '-'}</td>
      <td><span class="tag ${intClass}">${LABELS[t.interaction_pattern] || t.interaction_pattern || '-'}</span></td>
    </tr>`;
  }).join('');

  document.getElementById('table-info').textContent =
    `${filtered.length} / ${allData.topics.length} トピックを表示`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function setupTabs() {
  document.querySelectorAll('.chart-tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const parent = tabGroup.parentElement;
        parent.querySelectorAll('.chart-container').forEach(c => c.classList.add('hidden'));
        document.getElementById(tab.dataset.target).classList.remove('hidden');
      });
    });
  });
}

loadData();
