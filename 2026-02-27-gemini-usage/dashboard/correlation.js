const PATTERNS = ['accepted', 'deepened', 'refined', 'error_found', 'debated', 'switched', 'abandoned'];

const PATTERN_LABELS = {
  accepted: '一発承認', deepened: '追加深掘り',
  refined: '修正リファイン', error_found: 'エラー指摘', debated: '反論・議論',
  switched: 'トピック転換', abandoned: '放棄'
};

const LABELS = {
  iterative: '一緒に考える', direct: '知識を聞く',
  topic_switch: 'ついでに聞く', generation: '作ってもらう',
  contextual: '見てもらう',
  zero_shot: '質問文のみ', background: '背景・目的の説明', material: 'コード・資料の添付',
  constraints: '出力形式の指定', persona: '役割の指定',
  accepted: '一発承認', deepened: '追加深掘り',
  refined: '修正リファイン', error_found: 'エラー指摘', debated: '反論・議論',
  switched: 'トピック転換', abandoned: '放棄',
  A: 'A. プログラミング・技術支援', B: 'B. ドメイン知識',
  C: 'C. ツール操作', D: 'D. 文章作成・翻訳',
  E: 'E. 設計・アーキテクチャ', F: 'F. 情報検索・知識確認',
  G: 'G. 言語相談', H: 'H. 画像生成', I: 'I. その他',
};

const AXIS_KEYS = {
  method: ['iterative', 'contextual', 'generation', 'direct', 'topic_switch'],
  context: ['material', 'background', 'constraints', 'persona', 'zero_shot'],
  interaction: ['accepted', 'deepened', 'refined', 'error_found', 'debated', 'switched', 'abandoned'],
  category: 'ABCDEFGHI'.split('')
};

function mergeTopics() {
  const stats = window.__STATS__;
  const s12 = window.__STATS_12__;
  const s13 = window.__STATS_13__;
  const s14 = window.__STATS_14__;
  const methodMap = Object.fromEntries(s12.topics.map(t => [t.id, t.question_method]));
  const contextMap = Object.fromEntries(s13.topics.map(t => [t.id, t.context_provision]));
  const interactionMap = Object.fromEntries(s14.topics.map(t => [t.id, t.interaction_pattern]));
  return stats.topics.map(t => ({
    ...t,
    question_method: methodMap[t.id] || '',
    context_provision: contextMap[t.id] || [],
    interaction_pattern: interactionMap[t.id] || 'accepted'
  }));
}

function getAxisValues(topic, axis) {
  if (axis === 'method') return [topic.question_method];
  if (axis === 'context') return topic.context_provision.length ? topic.context_provision : ['zero_shot'];
  if (axis === 'interaction') return [topic.interaction_pattern];
  if (axis === 'category') return 'ABCDEFGHI'.split('').filter(c => topic[c]);
  return [];
}

/* ── Stacked bars (kept from previous version) ── */

function countPatterns(topics, groupFn) {
  const groups = {};
  topics.forEach(t => {
    const keys = groupFn(t);
    (Array.isArray(keys) ? keys : [keys]).forEach(key => {
      if (!key) return;
      if (!groups[key]) {
        groups[key] = { total: 0 };
        PATTERNS.forEach(p => groups[key][p] = 0);
      }
      groups[key][t.interaction_pattern]++;
      groups[key].total++;
    });
  });
  return groups;
}

function renderStacked(containerId, groups, order) {
  const container = document.getElementById(containerId);
  const sorted = order || Object.keys(groups).sort((a, b) => {
    const ga = groups[a], gb = groups[b];
    return ((gb.accepted + gb.deepened) / gb.total) - ((ga.accepted + ga.deepened) / ga.total);
  });
  container.innerHTML = sorted.map(key => {
    const g = groups[key];
    if (!g || g.total === 0) return '';
    const segments = PATTERNS.map(p => {
      const pct = g[p] / g.total * 100;
      if (pct < 0.1) return '';
      const showLabel = pct >= 8;
      return `<div class="stacked-segment seg-${p}" style="width:${pct}%" title="${PATTERN_LABELS[p]}: ${g[p]}件 (${Math.round(pct)}%)">${showLabel ? g[p] : ''}</div>`;
    }).join('');
    return `<div class="stacked-row">
      <span class="stacked-label" title="${LABELS[key] || key}">${LABELS[key] || key}</span>
      <div class="stacked-bar-wrap">${segments}</div>
      <div class="stacked-stats">n=${g.total}</div>
    </div>`;
  }).join('');
}

/* ── Heatmap ── */

function buildCrossTable(topics, rowAxis, colAxis) {
  const rowKeys = AXIS_KEYS[rowAxis];
  const colKeys = AXIS_KEYS[colAxis];
  const table = {};
  const rowTotals = {};
  const colTotals = {};
  let grand = 0;

  rowKeys.forEach(r => { table[r] = {}; rowTotals[r] = 0; colKeys.forEach(c => table[r][c] = 0); });
  colKeys.forEach(c => colTotals[c] = 0);

  topics.forEach(t => {
    const rows = getAxisValues(t, rowAxis);
    const cols = getAxisValues(t, colAxis);
    const weight = 1 / (rows.length * cols.length);
    rows.forEach(r => {
      cols.forEach(c => {
        if (table[r] !== undefined && table[r][c] !== undefined) {
          table[r][c] += weight;
          rowTotals[r] += weight;
          colTotals[c] += weight;
          grand += weight;
        }
      });
    });
  });

  return { table, rowKeys, colKeys, rowTotals, colTotals, grand };
}

function renderHeatmap(topics) {
  const rowAxis = document.getElementById('hm-row').value;
  const colAxis = document.getElementById('hm-col').value;
  const container = document.getElementById('heatmap-container');
  const findings  = document.getElementById('pattern-findings');

  if (rowAxis === colAxis) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">行と列に異なる軸を選択してください。</p>';
    findings.innerHTML = '';
    return;
  }

  const { table, rowKeys, colKeys, rowTotals, colTotals, grand } = buildCrossTable(topics, rowAxis, colAxis);
  const maxVal = Math.max(...rowKeys.flatMap(r => colKeys.map(c => table[r][c])));

  const numCols = colKeys.length + 2;
  const grid = document.createElement('div');
  grid.className = 'hm-grid';
  grid.style.gridTemplateColumns = `auto repeat(${colKeys.length}, minmax(48px, 1fr)) auto`;

  grid.appendChild(makeDiv('hm-hdr', ''));

  colKeys.forEach(c => {
    const el = makeDiv('hm-hdr', LABELS[c] || c);
    el.title = LABELS[c] || c;
    grid.appendChild(el);
  });
  grid.appendChild(makeDiv('hm-hdr', '計'));

  rowKeys.forEach(r => {
    grid.appendChild(makeDiv('hm-row-hdr', LABELS[r] || r));

    colKeys.forEach(c => {
      const val = table[r][c];
      const rounded = Math.round(val * 10) / 10;
      const intensity = maxVal > 0 ? val / maxVal : 0;
      const bg = intensity > 0
        ? `rgba(37, 99, 235, ${0.08 + intensity * 0.52})`
        : '#f8fafc';
      const textColor = intensity > 0.45 ? '#fff' : '#1e293b';
      const pct = rowTotals[r] > 0 ? Math.round(val / rowTotals[r] * 100) : 0;
      const display = rounded > 0 ? (rounded % 1 === 0 ? String(Math.round(rounded)) : rounded.toFixed(1)) : '';

      const cell = makeDiv('hm-cell', display);
      cell.style.background = bg;
      cell.style.color = textColor;
      cell.dataset.row = LABELS[r] || r;
      cell.dataset.col = LABELS[c] || c;
      cell.dataset.val = rounded;
      cell.dataset.pct = pct;
      grid.appendChild(cell);
    });

    grid.appendChild(makeDiv('hm-total', String(Math.round(rowTotals[r]))));
  });

  grid.appendChild(makeDiv('hm-row-hdr', '計'));
  colKeys.forEach(c => {
    grid.appendChild(makeDiv('hm-total', String(Math.round(colTotals[c]))));
  });
  const grandEl = makeDiv('hm-total', String(Math.round(grand)));
  grandEl.style.fontWeight = '700';
  grid.appendChild(grandEl);

  container.innerHTML = '';
  container.appendChild(grid);

  const tooltip = document.getElementById('hm-tooltip');
  grid.querySelectorAll('.hm-cell').forEach(cell => {
    cell.addEventListener('mouseenter', e => {
      const t = e.currentTarget;
      tooltip.innerHTML = `<strong>${t.dataset.row}</strong> × <strong>${t.dataset.col}</strong><br>${t.dataset.val} 件（行内 ${t.dataset.pct}%）`;
      tooltip.style.display = 'block';
    });
    cell.addEventListener('mousemove', e => {
      tooltip.style.left = (e.pageX + 12) + 'px';
      tooltip.style.top = (e.pageY - 20) + 'px';
    });
    cell.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
  });

  renderPatternFindings(table, rowKeys, colKeys, rowTotals, colTotals, grand);
}

function makeDiv(cls, text) {
  const d = document.createElement('div');
  d.className = cls;
  d.textContent = text;
  return d;
}

function renderPatternFindings(table, rowKeys, colKeys, rowTotals, colTotals, grand) {
  const findings = [];

  rowKeys.forEach(r => {
    colKeys.forEach(c => {
      const observed = table[r][c];
      if (observed < 1) return;
      const expected = (rowTotals[r] * colTotals[c]) / grand;
      if (expected < 0.5) return;
      const ratio = observed / expected;
      findings.push({
        row: LABELS[r] || r,
        col: LABELS[c] || c,
        observed: Math.round(observed),
        expected: Math.round(expected * 10) / 10,
        ratio
      });
    });
  });

  findings.sort((a, b) => Math.abs(Math.log(b.ratio)) - Math.abs(Math.log(a.ratio)));

  const top = findings.slice(0, 10);
  if (top.length === 0) {
    document.getElementById('pattern-findings').innerHTML = '<p style="color:var(--text-muted)">有意な偏りは見つかりませんでした。</p>';
    return;
  }

  document.getElementById('pattern-findings').innerHTML = top.map(f => {
    const dir = f.ratio > 1 ? '多い' : '少ない';
    const ratioStr = f.ratio > 1
      ? `${f.ratio.toFixed(1)}倍`
      : `${(1 / f.ratio).toFixed(1)}分の1`;
    return `<div class="pattern-item">
      <span class="pattern-ratio">${ratioStr}</span>
      <span>「${f.row}」×「${f.col}」: 実測 ${f.observed} 件 / 期待値 ${f.expected} 件（期待値の${ratioStr}、${dir}）</span>
    </div>`;
  }).join('');
}

/* ── Main ── */

function run() {
  const topics = mergeTopics();

  const methodGroups = countPatterns(topics, t => t.question_method);
  renderStacked('method-outcome', methodGroups,
    ['iterative', 'contextual', 'generation', 'direct', 'topic_switch']);
  document.getElementById('method-insight').innerHTML =
    '「ついでに聞く」ではトピック転換が突出して多い。他の4類型は一発承認・追加深掘りが大半を占め、構成が類似している。';

  const contextGroups = countPatterns(topics, t => t.context_provision);
  renderStacked('context-outcome', contextGroups,
    ['material', 'background', 'constraints', 'persona', 'zero_shot']);
  document.getElementById('context-insight').innerHTML =
    'コード・資料の添付時は一発承認+追加深掘りの割合が高い。質問文のみでもこの2パターンは過半数を占めるが、トピック転換の割合がやや高くなる。';

  const queryBuckets = {};
  const bucketOrder = ['1回', '2回', '3-4回', '5-7回', '8回以上'];
  bucketOrder.forEach(b => {
    queryBuckets[b] = { total: 0 };
    PATTERNS.forEach(p => queryBuckets[b][p] = 0);
  });
  topics.forEach(t => {
    const q = t.query_count;
    let bucket;
    if (q <= 1) bucket = '1回';
    else if (q <= 2) bucket = '2回';
    else if (q <= 4) bucket = '3-4回';
    else if (q <= 7) bucket = '5-7回';
    else bucket = '8回以上';
    queryBuckets[bucket][t.interaction_pattern]++;
    queryBuckets[bucket].total++;
  });
  renderStacked('query-outcome', queryBuckets, bucketOrder);
  document.getElementById('query-insight').innerHTML =
    'クエリ1回では一発承認が大半。回数が増えるにつれ追加深掘りの比率が上がる。トピック転換はクエリ数とは明確な関連を示さない。';

  const catKeys = 'ABCDEFGHI'.split('');
  const catGroups = countPatterns(topics, t => catKeys.filter(c => t[c]));
  renderStacked('category-outcome', catGroups, catKeys);
  document.getElementById('category-insight').innerHTML =
    'ほとんどのジャンルで結末の構成比は類似している。H（画像生成）のみ放棄の比率が目立つが、件数自体が少ない（14件）。';

  renderHeatmap(topics);
  document.getElementById('hm-row').addEventListener('change', () => renderHeatmap(topics));
  document.getElementById('hm-col').addEventListener('change', () => renderHeatmap(topics));
}

run();
