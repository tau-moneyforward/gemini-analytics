const METHOD_LABELS = {
  iterative: '一緒に考える', direct: '知識を聞く',
  topic_switch: 'ついでに聞く', generation: '作ってもらう',
  contextual: '見てもらう'
};

const CONTEXT_LABELS = {
  zero_shot: '質問文のみ', background: '背景・目的の説明', material: 'コード・資料の添付',
  constraints: '出力形式の指定', persona: '役割の指定'
};

const INTERACTION_LABELS = {
  accepted: '一発承認', deepened: '追加深掘り',
  refined: '修正リファイン', error_found: 'エラー指摘', debated: '反論・議論',
  switched: 'トピック転換', abandoned: '放棄'
};

const INTERACTION_COLORS = {
  accepted: '#60a5fa', deepened: '#34d399',
  refined: '#a78bfa', error_found: '#f472b6', debated: '#fb923c',
  switched: '#fbbf24', abandoned: '#94a3b8'
};

function buildSankeyData() {
  const stats = window.__STATS__;
  const s12 = window.__STATS_12__;
  const s13 = window.__STATS_13__;
  const s14 = window.__STATS_14__;

  const methodMap = Object.fromEntries(s12.topics.map(t => [t.id, t.question_method]));
  const contextMap = Object.fromEntries(s13.topics.map(t => [t.id, t.context_provision]));
  const interactionMap = Object.fromEntries(s14.topics.map(t => [t.id, t.interaction_pattern]));

  const topics = stats.topics.map(t => ({
    method: methodMap[t.id] || 'direct',
    contexts: contextMap[t.id] || ['zero_shot'],
    interaction: interactionMap[t.id] || 'accepted'
  }));

  const nodeNames = [];
  const nodeIndex = {};
  function getNode(name) {
    if (nodeIndex[name] === undefined) {
      nodeIndex[name] = nodeNames.length;
      nodeNames.push(name);
    }
    return nodeIndex[name];
  }

  const methods = ['iterative', 'contextual', 'generation', 'direct', 'topic_switch'];
  const contexts = ['material', 'background', 'constraints', 'persona', 'zero_shot'];
  const interactions = ['accepted', 'deepened', 'refined', 'error_found', 'debated', 'switched', 'abandoned'];

  methods.forEach(m => getNode('m_' + m));
  contexts.forEach(c => getNode('c_' + c));
  interactions.forEach(i => getNode('i_' + i));

  const linkMap = {};
  function addLink(src, tgt, val) {
    const key = src + '>' + tgt;
    if (!linkMap[key]) linkMap[key] = { source: src, target: tgt, value: 0 };
    linkMap[key].value += val;
  }

  topics.forEach(t => {
    const mNode = getNode('m_' + t.method);
    const iNode = getNode('i_' + t.interaction);
    const ctxList = t.contexts.length > 0 ? t.contexts : ['zero_shot'];
    const weight = 1 / ctxList.length;

    ctxList.forEach(ctx => {
      const cNode = getNode('c_' + ctx);
      addLink(mNode, cNode, weight);
      addLink(cNode, iNode, weight);
    });
  });

  const links = Object.values(linkMap).filter(l => l.value > 0.01);

  const nodes = nodeNames.map((name, i) => {
    let label, color;
    if (name.startsWith('m_')) {
      const k = name.slice(2);
      label = METHOD_LABELS[k] || k;
      color = '#93c5fd';
    } else if (name.startsWith('c_')) {
      const k = name.slice(2);
      label = CONTEXT_LABELS[k] || k;
      color = k === 'zero_shot' ? '#fcd34d' : '#6ee7b7';
    } else {
      const k = name.slice(2);
      label = INTERACTION_LABELS[k] || k;
      color = INTERACTION_COLORS[k] || '#94a3b8';
    }
    return { name, label, color };
  });

  return { nodes, links };
}

function renderSankey() {
  const data = buildSankeyData();
  const container = document.getElementById('sankey-chart');
  const width = Math.max(container.clientWidth, 900);
  const height = 720;
  const margin = { top: 10, right: 160, bottom: 10, left: 160 };

  const svg = d3.select('#sankey-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const sankey = d3.sankey()
    .nodeId(d => d.index)
    .nodeWidth(20)
    .nodePadding(14)
    .nodeAlign(d3.sankeyLeft)
    .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]]);

  const graph = sankey({
    nodes: data.nodes.map(d => ({ ...d })),
    links: data.links.map(d => ({ ...d }))
  });

  const tooltip = document.getElementById('tooltip');

  svg.append('g')
    .selectAll('rect')
    .data(graph.nodes)
    .join('rect')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('height', d => Math.max(d.y1 - d.y0, 1))
    .attr('width', d => d.x1 - d.x0)
    .attr('fill', d => d.color)
    .attr('rx', 3);

  svg.append('g')
    .selectAll('text')
    .data(graph.nodes)
    .join('text')
    .attr('x', d => d.x0 < width / 2 ? d.x0 - 8 : d.x1 + 8)
    .attr('y', d => (d.y0 + d.y1) / 2)
    .attr('dy', '0.35em')
    .attr('text-anchor', d => d.x0 < width / 2 ? 'end' : 'start')
    .attr('class', 'node-label')
    .text(d => `${d.label} (${Math.round(d.value)})`);

  const linkG = svg.append('g')
    .attr('fill', 'none')
    .selectAll('g')
    .data(graph.links)
    .join('g');

  linkG.append('path')
    .attr('d', d3.sankeyLinkHorizontal())
    .attr('stroke', d => {
      const tgt = d.target;
      if (tgt.name.startsWith('i_')) {
        return INTERACTION_COLORS[tgt.name.slice(2)] || '#94a3b8';
      }
      return d.source.color;
    })
    .attr('stroke-opacity', 0.35)
    .attr('stroke-width', d => Math.max(1, d.width))
    .on('mouseover', function (event, d) {
      d3.select(this).attr('stroke-opacity', 0.7);
      tooltip.style.display = 'block';
      tooltip.innerHTML = `${d.source.label} → ${d.target.label}<br><strong>${Math.round(d.value)} 件</strong>`;
    })
    .on('mousemove', function (event) {
      tooltip.style.left = (event.pageX + 12) + 'px';
      tooltip.style.top = (event.pageY - 20) + 'px';
    })
    .on('mouseout', function () {
      d3.select(this).attr('stroke-opacity', 0.35);
      tooltip.style.display = 'none';
    });
}

renderSankey();
