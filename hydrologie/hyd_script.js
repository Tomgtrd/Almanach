document.addEventListener('DOMContentLoaded', () => {

  /* ================= REVEAL ON SCROLL ================= */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ================= DOT NAV ================= */
  const sections = Array.from(document.querySelectorAll('main .plate'));
  const dotnav = document.getElementById('dotnav');
  sections.forEach(sec => {
    const a = document.createElement('a');
    a.href = '#' + sec.id;
    const tip = document.createElement('span');
    tip.className = 'tip';
    tip.textContent = sec.dataset.title || sec.id;
    a.appendChild(tip);
    dotnav.appendChild(a);
  });
  const dots = Array.from(dotnav.querySelectorAll('a'));
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const idx = sections.indexOf(e.target);
      if (e.isIntersecting && dots[idx]) {
        dots.forEach(d => d.classList.remove('active'));
        dots[idx].classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => navIO.observe(s));

  /* ================= HERO — GOUTTE D'EAU ================= */
  const dropOutline = document.getElementById('dropOutline');
  const dropFill = document.getElementById('dropFill');
  const ripples = ['ripple1', 'ripple2', 'ripple3'].map(id => document.getElementById(id));
  if (dropOutline) {
    const len = dropOutline.getTotalLength();
    dropOutline.style.strokeDasharray = len;
    dropOutline.style.strokeDashoffset = len;
    dropOutline.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.3,.6,.3,1)';
    dropFill.style.opacity = 0;
    dropFill.style.transition = 'opacity 1s ease';
    ripples.forEach(r => { r.style.opacity = 0; r.style.transform = 'scale(0.3)'; r.style.transformOrigin = '200px 265px'; });
    setTimeout(() => { dropOutline.style.strokeDashoffset = 0; }, 300);
    setTimeout(() => { dropFill.style.opacity = 0.55; }, 1300);
    setTimeout(() => {
      ripples.forEach((r, i) => {
        setTimeout(() => {
          r.style.transition = 'opacity 1.6s ease, transform 1.6s cubic-bezier(.2,.7,.3,1)';
          r.style.opacity = 0;
          r.style.transform = 'scale(2.2)';
        }, i * 350);
      });
    }, 1500);
  }

  /* ================= GÉNÉRIQUE — FLIP CARDS ================= */
  function buildFlipGrid(containerId, items) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    items.forEach(it => {
      const c = document.createElement('div');
      c.className = 'lexcard';
      c.innerHTML = `<div class="lexcard-inner">
        <div class="lexface lexfront">${it.front}</div>
        <div class="lexface lexback">${it.back}</div>
      </div>`;
      c.addEventListener('click', () => c.classList.toggle('flipped'));
      grid.appendChild(c);
    });
  }

  /* ================= GÉNÉRIQUE — ONGLETS ================= */
  function wireTabs(tabsId, panelsId, tabs) {
    const tabsEl = document.getElementById(tabsId);
    const panelsEl = document.getElementById(panelsId);
    tabsEl.innerHTML = tabs.map((t, i) => `<button class="${i === 0 ? 'active' : ''}" data-tab="${t.key}">${t.label}</button>`).join('');
    panelsEl.innerHTML = tabs.map((t, i) => `
      <div class="tab-panel ${i === 0 ? 'active' : ''}" data-panel="${t.key}">
        <div class="tab-svg-wrap">${t.svg}</div>
        <div><span class="tab-badge ${t.badgeClass}">${t.badge}</span><p>${t.text}</p></div>
      </div>`).join('');
    tabsEl.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        tabsEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panelsEl.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        panelsEl.querySelector(`.tab-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
      });
    });
  }

  /* ============================================================
     PLANCHE I — RÉPARTITION DE L'EAU
     ============================================================ */
  const WATER_SPLIT = [
    { nm: 'Océans (eau salée)', pct: 96.5, color: 'var(--deep)' },
    { nm: 'Glaciers & calottes', pct: 1.74, color: 'var(--foam)' },
    { nm: 'Eaux souterraines', pct: 1.7, color: 'var(--teal)' },
    { nm: 'Lacs, rivières, atmosphère', pct: 0.06, color: 'var(--sand)' },
  ];
  const waterbar = document.getElementById('waterbar');
  waterbar.innerHTML = WATER_SPLIT.map(s => `<div class="seg" style="width:${s.pct}%; background:${s.color};">${s.pct >= 3 ? s.pct + '%' : ''}</div>`).join('');
  document.getElementById('waterbarLegend').innerHTML = WATER_SPLIT.map(s => `<div class="li"><span class="sw" style="background:${s.color};"></span>${s.nm} — ${s.pct}%</div>`).join('');

  /* ============================================================
     PLANCHE II — LE CYCLE DE L'EAU
     ============================================================ */
  const CYCLE = [
    { id: 'evaporation', nm: 'Évaporation', cx: 130, cy: 90,
      d: "Sous l'effet du soleil, l'eau des océans, lacs et rivières se transforme en vapeur et monte dans l'atmosphère. Les océans à eux seuls fournissent environ 86&nbsp;% de toute la vapeur d'eau atmosphérique." },
    { id: 'condensation', nm: 'Condensation', cx: 260, cy: 55,
      d: "En montant, la vapeur d'eau se refroidit et se condense en minuscules gouttelettes autour de particules en suspension&nbsp;: c'est la formation des nuages." },
    { id: 'precipitation', nm: 'Précipitation', cx: 330, cy: 160,
      d: "Quand les gouttelettes grossissent trop pour rester en suspension, elles tombent&nbsp;: pluie, neige ou grêle selon la température de l'air traversé." },
    { id: 'ruissellement', nm: 'Ruissellement', cx: 260, cy: 270,
      d: "Une partie de l'eau tombée coule à la surface du sol vers les cours d'eau, les lacs, puis l'océan — d'autant plus qu'un sol est imperméable ou déjà saturé." },
    { id: 'infiltration', nm: 'Infiltration', cx: 130, cy: 270,
      d: "Une autre partie s'infiltre dans le sol, alimente les réserves souterraines, et peut ressurgir des années — voire des siècles — plus tard dans une source ou un puits." },
  ];
  function buildCycleSvg() {
    const cx = 195, cy = 165, r = 118;
    const NODE_R = 30, GAP = 8;
    function pointAt(from, to, dist) {
      const dx = to.cx - from.cx, dy = to.cy - from.cy;
      const len = Math.sqrt(dx * dx + dy * dy);
      return { x: from.cx + (dx / len) * dist, y: from.cy + (dy / len) * dist };
    }
    let arrows = '', nodes = '';
    CYCLE.forEach((s, i) => {
      const next = CYCLE[(i + 1) % CYCLE.length];
      const p1 = pointAt(s, next, NODE_R + GAP);
      const p2 = pointAt(next, s, NODE_R + GAP + 7); // +7 : laisse la place à la pointe de la flèche
      const mx = (s.cx + next.cx) / 2, my = (s.cy + next.cy) / 2;
      const ctrlX = mx + (cx - mx) * 0.35, ctrlY = my + (cy - my) * 0.35;
      arrows += `<path class="cyc-arrow" d="M${p1.x.toFixed(1)},${p1.y.toFixed(1)} Q${ctrlX.toFixed(1)},${ctrlY.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}" fill="none" stroke="var(--ink-3)" stroke-width="2.5" stroke-dasharray="6 6" marker-end="url(#cycArrow)"/>`;
    });
    CYCLE.forEach(s => {
      nodes += `<g class="zone" data-id="${s.id}">
        <circle class="hit" cx="${s.cx}" cy="${s.cy}" r="${NODE_R}" fill="var(--teal)" opacity="0.9"/>
        <text x="${s.cx}" y="${s.cy + 46}">${s.nm}</text>
      </g>`;
    });
    return `<svg class="cycle-svg" viewBox="0 0 390 340" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="cycArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-3)"/></marker></defs>
      ${arrows}
      <circle cx="${cx}" cy="${cy}" r="34" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="1.5"/>
      <text x="${cx}" y="${cy - 4}" font-weight="700" font-size="12">CYCLE</text>
      <text x="${cx}" y="${cy + 12}" font-weight="700" font-size="12">DE L'EAU</text>
      ${nodes}
    </svg>`;
  }
  document.getElementById('cycleSvgWrap').innerHTML = buildCycleSvg();
  document.getElementById('cycleLegend').innerHTML = CYCLE.map(s => `<div class="cycle-legend-item" data-id="${s.id}"><span class="sw" style="background:var(--teal);"></span><span class="nm">${s.nm}</span></div>`).join('');
  const cycleDetail = document.getElementById('cycleDetail');
  function selectCycle(id) {
    const s = CYCLE.find(x => x.id === id);
    document.querySelectorAll('.cycle-svg .zone').forEach(el => el.classList.toggle('selected', el.dataset.id === id));
    document.querySelectorAll('.cycle-legend-item').forEach(el => el.classList.toggle('active', el.dataset.id === id));
    cycleDetail.innerHTML = `<div class="nm">${s.nm}</div><p>${s.d}</p>`;
  }
  document.querySelectorAll('.cycle-svg .zone').forEach(el => el.addEventListener('click', () => selectCycle(el.dataset.id)));
  document.querySelectorAll('.cycle-legend-item').forEach(el => el.addEventListener('click', () => selectCycle(el.dataset.id)));
  selectCycle('evaporation');

  /* ============================================================
     PLANCHE III — LE BASSIN VERSANT (schéma statique)
     ============================================================ */
  document.getElementById('basinWrap').innerHTML = `
    <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M60,55 C160,140 220,220 400,250 C580,220 640,140 740,55 Z" fill="var(--reed)" opacity="0.16"/>

      <path d="M40,55 C300,28 500,28 760,55" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="2 7"/>
      <text class="basin-label" x="40" y="34" font-weight="700">Ligne de partage des eaux</text>

      <path d="M130,58 C170,120 220,180 375,238" fill="none" stroke="var(--teal)" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M260,50 C280,110 320,170 388,236" fill="none" stroke="var(--teal)" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M400,45 L400,236" fill="none" stroke="var(--teal)" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M540,50 C520,110 480,170 412,236" fill="none" stroke="var(--teal)" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M670,58 C630,120 580,180 425,238" fill="none" stroke="var(--teal)" stroke-width="4.5" stroke-linecap="round"/>
      <text class="basin-label sm" x="95" y="108">affluent</text>

      <path d="M400,236 C420,246 445,250 485,253 C565,259 645,267 730,280" fill="none" stroke="var(--deep)" stroke-width="9" stroke-linecap="round"/>
      <circle cx="730" cy="280" r="8" fill="var(--deep)"/>
      <text class="basin-label" x="730" y="258" text-anchor="middle" font-weight="700">Exutoire</text>

      <g fill="var(--deep-lt)">
        <path d="M180,86 q5,11 0,17 q-5,-6 0,-17 Z"/>
        <path d="M480,80 q5,11 0,17 q-5,-6 0,-17 Z"/>
        <path d="M600,104 q5,11 0,17 q-5,-6 0,-17 Z"/>
      </g>

      <text class="basin-label sm" x="400" y="292" text-anchor="middle">Bassin versant : toute l'eau tombée entre les deux lignes de crête rejoint le même cours d'eau</text>
    </svg>`;

  /* ============================================================
     PLANCHE IV — RIVIÈRES ET COURS D'EAU (onglets)
     ============================================================ */
  const svgProfil = `<svg class="rivsvg" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,30 C60,40 70,90 110,100 C160,112 200,120 270,125" fill="none" stroke="var(--teal-lt)" stroke-width="6" stroke-linecap="round"/>
    <path d="M10,150 C90,150 180,150 270,150" stroke="var(--paper-3)" stroke-width="1" stroke-dasharray="3 5"/>
    <text x="35" y="24" fill="var(--paper-3)" font-family="Space Grotesk" font-size="11">amont — pente forte</text>
    <text x="175" y="140" fill="var(--paper-3)" font-family="Space Grotesk" font-size="11">aval — pente faible</text>
  </svg>`;
  const svgMeandre = `<svg class="rivsvg" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,85 C50,40 90,130 130,85 C170,40 210,130 250,85" fill="none" stroke="var(--teal-lt)" stroke-width="7" stroke-linecap="round"/>
    <text x="140" y="150" fill="var(--paper-3)" font-family="Space Grotesk" font-size="11" text-anchor="middle">méandres — un seul chenal qui serpente</text>
  </svg>`;
  const svgTresses = `<svg class="rivsvg" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,60 C80,50 100,70 150,60 C200,50 220,60 270,55" fill="none" stroke="var(--teal-lt)" stroke-width="4"/>
    <path d="M10,90 C70,100 110,80 160,95 C200,105 230,90 270,95" fill="none" stroke="var(--teal-lt)" stroke-width="4"/>
    <path d="M10,110 C60,120 120,110 170,120 C210,126 240,115 270,118" fill="none" stroke="var(--teal-lt)" stroke-width="4"/>
    <text x="140" y="150" fill="var(--paper-3)" font-family="Space Grotesk" font-size="11" text-anchor="middle">tresses — plusieurs chenaux mobiles</text>
  </svg>`;
  const svgDelta = `<svg class="rivsvg" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,85 L150,85 M150,85 L260,40 M150,85 L270,85 M150,85 L260,130" fill="none" stroke="var(--teal-lt)" stroke-width="6" stroke-linecap="round"/>
    <path d="M170,20 L280,20 L280,150 L170,150 Z" fill="var(--sand)" opacity="0.25"/>
    <text x="140" y="160" fill="var(--paper-3)" font-family="Space Grotesk" font-size="11" text-anchor="middle">delta — le fleuve se divise en bras</text>
  </svg>`;
  const svgEstuaire = `<svg class="rivsvg" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,80 L20,90 L280,140 L280,30 Z" fill="var(--teal-lt)" opacity="0.5"/>
    <path d="M20,80 L20,90 M280,30 L280,140" stroke="var(--teal-lt)" stroke-width="2"/>
    <text x="140" y="160" fill="var(--paper-3)" font-family="Space Grotesk" font-size="11" text-anchor="middle">estuaire — l'embouchure s'élargit, marée mêlée</text>
  </svg>`;
  wireTabs('rivTabs', 'rivPanels', [
    { key: 'profil', label: 'Profil en long', badge: 'De la source à l\u2019aval', badgeClass: 'a', svg: svgProfil,
      text: "Un cours d'eau perd de l'énergie en descendant&nbsp;: pente forte et courant vif en montagne (érosion dominante), pente faible et courant calme en plaine (dépôt dominant)." },
    { key: 'forme', label: 'Méandres / tresses', badge: 'Deux façons de serpenter', badgeClass: 'b', svg: svgMeandre,
      text: "En plaine, un cours d'eau lent forme des <b>méandres</b>, des boucles qui migrent lentement en érodant une rive et en déposant sur l'autre. Un cours d'eau à fort débit de sédiments et pente irrégulière peut au contraire se <b>tresser</b> en plusieurs chenaux instables." },
    { key: 'tresses2', label: '', badge: '', badgeClass: 'b', svg: svgTresses, text: '' },
    { key: 'embouchure', label: 'Delta / estuaire', badge: 'Deux fins de parcours', badgeClass: 'c', svg: svgDelta,
      text: "À son arrivée en mer, un fleuve chargé de sédiments qui se déposent plus vite que la mer ne peut les évacuer forme un <b>delta</b>. Si c'est au contraire la marée qui domine et creuse une embouchure large en entonnoir, c'est un <b>estuaire</b>." },
    { key: 'estuaire2', label: '', badge: '', badgeClass: 'c', svg: svgEstuaire, text: '' },
  ].filter(t => t.label !== ''));
  // Les variantes secondaires (tresses/estuaire) sont affichées en alternance dans le même onglet via un petit toggle interne :
  (function enrichRiverTabs() {
    const meandrePanel = document.querySelector('#rivPanels .tab-panel[data-panel="forme"] .tab-svg-wrap');
    const embouchurePanel = document.querySelector('#rivPanels .tab-panel[data-panel="embouchure"] .tab-svg-wrap');
    let meandreToggle = false, embToggle = false;
    if (meandrePanel) {
      meandrePanel.style.cursor = 'pointer';
      meandrePanel.title = 'Cliquer pour voir la variante en tresses';
      meandrePanel.addEventListener('click', () => { meandreToggle = !meandreToggle; meandrePanel.innerHTML = meandreToggle ? svgTresses : svgMeandre; });
    }
    if (embouchurePanel) {
      embouchurePanel.style.cursor = 'pointer';
      embouchurePanel.title = 'Cliquer pour voir la variante estuaire';
      embouchurePanel.addEventListener('click', () => { embToggle = !embToggle; embouchurePanel.innerHTML = embToggle ? svgEstuaire : svgDelta; });
    }
  })();

  /* ============================================================
     PLANCHE V — DÉBIT ET RÉGIMES HYDROLOGIQUES
     ============================================================ */
  function regimeCurve(points, color) {
    const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ');
    return `<svg class="regimesvg" viewBox="0 0 280 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,110 L260,110" stroke="var(--paper-3)" stroke-width="1"/>
      <text x="20" y="128" fill="var(--paper-3)" font-family="Space Grotesk" font-size="10">J</text>
      <text x="240" y="128" fill="var(--paper-3)" font-family="Space Grotesk" font-size="10">D</text>
      <path d="${path}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
  wireTabs('regimeTabs', 'regimePanels', [
    { key: 'pluvial', label: 'Pluvial', badge: 'Calqué sur les précipitations', badgeClass: 'a',
      svg: regimeCurve([[20, 70], [60, 55], [100, 90], [140, 60], [180, 95], [220, 65], [260, 80]], 'var(--teal-lt)'),
      text: "Le débit suit directement le rythme des pluies&nbsp;: crues en saison humide, étiage (niveau le plus bas) en saison sèche. C'est le régime de la plupart des cours d'eau en climat tempéré ou tropical, comme la Seine." },
    { key: 'nival', label: 'Nival', badge: 'Calqué sur la fonte des neiges', badgeClass: 'b',
      svg: regimeCurve([[20, 100], [60, 102], [100, 95], [140, 25], [180, 40], [220, 90], [260, 100]], 'var(--deep-lt)'),
      text: "Le débit explose au printemps avec la fonte du manteau neigeux, puis chute le reste de l'année. Typique des cours d'eau alimentés par des massifs montagneux enneigés l'hiver." },
    { key: 'glaciaire', label: 'Glaciaire', badge: 'Calqué sur la fonte des glaciers', badgeClass: 'c',
      svg: regimeCurve([[20, 105], [60, 103], [100, 95], [140, 70], [180, 35], [220, 55], [260, 100]], 'var(--sand)'),
      text: "Maximum en plein été, quand la chaleur fait fondre le glacier lui-même — un pic plus tardif et souvent plus marqué que le régime nival. Typique des cours d'eau issus de hauts massifs glaciaires comme les Alpes." },
  ]);

  /* ============================================================
     PLANCHE VI — LACS ET PLANS D'EAU
     ============================================================ */
  document.getElementById('lakeSvgWrap').innerHTML = `<svg class="lake-svg" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="90" cy="70" rx="55" ry="34" fill="var(--teal-lt)"/>
    <path d="M90,36 C130,45 145,70 130,95 C118,113 100,104 90,104" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" marker-end="url(#lakeArrow)"/>
    <text x="90" y="150" text-anchor="middle" font-family="Space Grotesk" font-size="13" font-weight="700" fill="var(--ink)">Exoréique</text>
    <text x="90" y="168" text-anchor="middle" font-family="Space Grotesk" font-size="11" fill="var(--ink-3)">se déverse vers l'aval</text>

    <ellipse cx="230" cy="75" rx="55" ry="34" fill="var(--sand-lt)"/>
    <path d="M225,18 C245,4 262,10 258,28" fill="none" stroke="var(--ink-3)" stroke-width="1.5" stroke-dasharray="3 4"/>
    <text x="262" y="16" text-anchor="end" font-family="Space Grotesk" font-size="10" fill="var(--ink-3)">évaporation</text>
    <text x="230" y="150" text-anchor="middle" font-family="Space Grotesk" font-size="13" font-weight="700" fill="var(--ink)">Endoréique</text>
    <text x="230" y="168" text-anchor="middle" font-family="Space Grotesk" font-size="11" fill="var(--ink-3)">aucune issue, sort par évaporation</text>
    <defs><marker id="lakeArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--ink)"/></marker></defs>
  </svg>`;
  const LAKES = [
    { icon: '💧', nm: 'Lac Baïkal', d: "Le plus profond du monde (1 642&nbsp;m) et le plus grand réservoir d'eau douce liquide non gelée&nbsp;: environ 20&nbsp;% de l'eau douce de surface de la planète." },
    { icon: '🧂', nm: 'Mer Morte', d: "Lac endoréique si salé qu'il ne peut accueillir presque aucune vie&nbsp;: environ 34&nbsp;% de salinité, dix fois plus que l'océan." },
    { icon: '⛰️', nm: 'Lac Titicaca', d: "Le plus haut lac navigable au monde, à 3 812&nbsp;m d'altitude, à cheval entre le Pérou et la Bolivie." },
    { icon: '🌑', nm: 'Crater Lake', d: "Aux États-Unis, un lac formé dans la caldeira d'un volcan effondré, rempli uniquement par la pluie et la neige — sans aucun affluent." },
  ];
  document.getElementById('lakeCards').innerHTML = LAKES.map(l => `<div class="lakecard"><div class="lc-icon">${l.icon}</div><div class="lc-nm">${l.nm}</div><div class="lc-d">${l.d}</div></div>`).join('');

  /* ============================================================
     PLANCHE VII — ZONES HUMIDES (flip cards)
     ============================================================ */
  buildFlipGrid('wetlandGrid', [
    { front: '<div><div class="lexicon">🌾</div>Marais</div>', back: "Zone plate, en eau peu profonde une bonne partie de l'année, colonisée par des roseaux et joncs. Filtre naturellement l'eau et amortit les crues." },
    { front: '<div><div class="lexicon">🍂</div>Tourbière</div>', back: "Zone humide où la matière végétale morte s'accumule plus vite qu'elle ne se décompose, formant de la tourbe. Un des sols les plus riches en carbone stocké au monde." },
    { front: '<div><div class="lexicon">🌴</div>Mangrove</div>', back: "Forêt littorale tropicale à racines aériennes, entre eau douce et eau salée. Protège les côtes de l'érosion et sert de nurserie à de nombreuses espèces marines." },
  ]);

  /* ============================================================
     PLANCHE VIII — AQUIFÈRES (coupes juxtaposées)
     ============================================================ */
  function aquiferSvg(captive) {
    // Repères communs aux deux schémas, pour une comparaison directe.
    const groundY = 20, bedrockY = 190, bottomY = 220;
    const capTop = 70, capBottom = 92; // bande imperméable (captive uniquement)
    const nappeTop = captive ? capBottom : 110;
    const capBand = captive ? `<rect x="10" y="${capTop}" width="260" height="${capBottom - capTop}" fill="var(--l-roche)"/>
      <text x="140" y="${(capTop + capBottom) / 2 + 4}" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="10.5" fill="var(--paper)">couche imperméable</text>` : '';
    const wellTopY = captive ? 6 : groundY;
    const wellDash = captive ? '' : 'stroke-dasharray="3 4"';
    const wellColor = captive ? 'var(--coral)' : 'var(--deep)';
    const noCapNote = !captive ? `<text x="150" y="48" text-anchor="middle" font-family="Space Grotesk" font-size="9.5" fill="var(--ink-3)">(aucune couche imperméable au-dessus)</text>` : '';
    return `<svg viewBox="0 0 300 230" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="${groundY}" width="260" height="${(captive ? capTop : nappeTop) - groundY}" fill="var(--l-sol)" opacity="0.55"/>
      ${capBand}
      <rect x="10" y="${nappeTop}" width="260" height="${bedrockY - nappeTop}" fill="var(--l-nappe)"/>
      <rect x="10" y="${bedrockY}" width="260" height="${bottomY - bedrockY}" fill="var(--l-roche)"/>
      <line x1="10" y1="${groundY}" x2="270" y2="${groundY}" stroke="var(--ink)" stroke-width="2"/>

      <path d="M60,${wellTopY} L60,${nappeTop + 18}" stroke="${wellColor}" stroke-width="3" ${wellDash}/>
      <circle cx="60" cy="${wellTopY}" r="6" fill="${wellColor}"/>
      <text x="75" y="16" font-family="Space Grotesk" font-weight="700" font-size="11" fill="var(--ink)">${captive ? 'Puits artésien' : 'Puits'}</text>
      <text x="75" y="32" font-family="Space Grotesk" font-size="10" fill="var(--ink-3)">${captive ? "l'eau jaillit seule" : 'pompage nécessaire'}</text>
      ${noCapNote}

      <text x="150" y="${(nappeTop + bedrockY) / 2 + 4}" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="12" fill="var(--paper)">NAPPE</text>
    </svg>`;
  }
  document.getElementById('aquiferWrap').innerHTML = `
    <div class="aquifer-card">${aquiferSvg(false)}<h4>Nappe libre</h4><p>La zone saturée n'est couverte par aucune couche imperméable&nbsp;: son niveau varie librement avec les précipitations, et l'eau pompée doit être remontée activement.</p></div>
    <div class="aquifer-card">${aquiferSvg(true)}<h4>Nappe captive</h4><p>Une couche imperméable emprisonne l'eau sous pression. Un puits qui perce cette couche peut voir l'eau jaillir seule, sans pompage&nbsp;: c'est un puits artésien.</p></div>`;

  /* ============================================================
     PLANCHE IX — INTERACTION SURFACE / SOUTERRAIN
     ============================================================ */
  document.getElementById('interactWrap').innerHTML = `<svg viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="800" height="150" fill="var(--paper-2)"/>
    <rect x="0" y="150" width="800" height="110" fill="var(--l-sol)" opacity="0.3"/>
    <rect x="0" y="190" width="380" height="70" fill="var(--l-nappe)" opacity="0.55"/>
    <rect x="420" y="150" width="380" height="110" fill="var(--l-nappe)"/>
    <line x1="0" y1="150" x2="800" y2="150" stroke="var(--ink)" stroke-width="2"/>
    <path d="M40,150 C110,145 140,120 190,122 C240,124 260,150 330,150" fill="none" stroke="var(--deep)" stroke-width="10" stroke-linecap="round"/>
    <path d="M190,152 L190,188" stroke="var(--deep-lt)" stroke-width="2.5" stroke-dasharray="3 4" marker-end="url(#dArrow)"/>
    <path d="M470,150 C540,152 560,140 620,140 C680,140 700,150 760,150" fill="none" stroke="var(--teal)" stroke-width="10" stroke-linecap="round"/>
    <path d="M620,188 L620,152" stroke="var(--teal-lt)" stroke-width="2.5" stroke-dasharray="3 4" marker-end="url(#tArrow)"/>
    <defs>
      <marker id="dArrow" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto"><path d="M0,0 L8,0 L4,8 Z" fill="var(--deep-lt)"/></marker>
      <marker id="tArrow" markerWidth="8" markerHeight="8" refX="4" refY="0" orient="auto"><path d="M0,8 L8,8 L4,0 Z" fill="var(--teal-lt)"/></marker>
    </defs>
    <text x="190" y="60" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="14" fill="var(--ink)">Rivière influente</text>
    <text x="190" y="80" text-anchor="middle" font-family="Space Grotesk" font-size="11.5" fill="var(--ink-3)">perd de l'eau vers la nappe</text>
    <text x="620" y="60" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="14" fill="var(--ink)">Rivière effluente</text>
    <text x="620" y="80" text-anchor="middle" font-family="Space Grotesk" font-size="11.5" fill="var(--ink-3)">alimentée par la nappe</text>
  </svg>`;

  /* ============================================================
     PLANCHE X — PAYSAGES DE L'EAU (grand diagramme cliquable)
     ============================================================ */
  const LANDFORMS = [
    { id: 'source', nm: 'Source', cx: 140, cy: 92,
      d: "Point où l'eau souterraine ressurgit naturellement à l'air libre, souvent au flanc d'une montagne — le tout premier maillon visible d'un cours d'eau." },
    { id: 'torrent', nm: 'Torrent', cx: 210, cy: 178,
      d: "Cours d'eau de montagne à forte pente, au courant vif et irrégulier, qui creuse et transporte des blocs rocheux plutôt que des sédiments fins." },
    { id: 'cascade', nm: 'Cascade', cx: 300, cy: 235,
      d: "Chute verticale de l'eau, formée quand le cours d'eau franchit une rupture brutale de pente — souvent une roche plus dure qui résiste à l'érosion." },
    { id: 'meandre', nm: 'Méandre', cx: 560, cy: 270,
      d: "Boucle prononcée d'un cours d'eau en plaine&nbsp;: l'érosion attaque la rive extérieure, plus rapide, pendant que les sédiments se déposent sur la rive intérieure, plus lente. La boucle migre ainsi lentement au fil des décennies." },
    { id: 'brasmort', nm: 'Bras mort', cx: 500, cy: 348,
      d: "Ancien méandre coupé du cours principal lorsque la rivière a percé un raccourci lors d'une crue. Devient un plan d'eau calme et isolé, aussi appelé lac en croissant (oxbow lake)." },
    { id: 'plaine', nm: "Plaine d'inondation", cx: 470, cy: 222,
      d: "Zone plate qui borde un cours d'eau et qu'il recouvre naturellement lors des crues. Souvent très fertile grâce aux sédiments déposés — mais aussi la première zone exposée en cas d'inondation." },
    { id: 'confluent', nm: 'Confluent', cx: 715, cy: 150,
      d: "Point de jonction où un affluent rejoint un cours d'eau principal, dont le débit augmente en aval de cette jonction." },
    { id: 'zonehumide', nm: 'Zone humide', cx: 800, cy: 300,
      d: "Terrain gorgé d'eau une bonne partie de l'année, en marge du cours d'eau&nbsp;: elle amortit les crues, filtre les polluants et abrite une biodiversité exceptionnelle." },
    { id: 'delta', nm: 'Delta', cx: 900, cy: 150,
      d: "À l'embouchure, quand le fleuve dépose plus de sédiments que la mer ne peut en évacuer, il se divise en plusieurs bras qui avancent sur la mer, formant une plaine triangulaire." },
    { id: 'estuaire', nm: 'Estuaire', cx: 900, cy: 45,
      d: "Embouchure en entonnoir, façonnée par une marée assez forte pour repousser et remanier les sédiments plutôt que de les laisser s'accumuler. L'eau douce et l'eau salée s'y mélangent." },
    { id: 'lagune', nm: 'Lagune', cx: 900, cy: 258,
      d: "Étendue d'eau peu profonde séparée de la mer par un cordon de sable ou de récif, ne communiquant avec elle que par une ou deux ouvertures étroites." },
    { id: 'nappe', nm: 'Nappe phréatique', cx: 560, cy: 400,
      d: "Réserve d'eau souterraine contenue dans les roches poreuses sous la plaine, visible ici en coupe&nbsp;: elle alimente les puits et, souvent, les cours d'eau eux-mêmes en période sèche." },
  ];
  function buildLandformSvg() {
    return `<svg viewBox="0 0 1000 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="lfArrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="var(--paper)"/></marker>
      </defs>
      <!-- fond -->
      <rect x="0" y="0" width="1000" height="300" fill="#cfe8f0"/>
      <rect x="0" y="0" width="1000" height="300" fill="#dfeee0"/>
      <rect x="0" y="0" width="260" height="300" fill="#cfe8f0"/>
      <rect x="945" y="0" width="10" height="460" fill="var(--sand)" opacity="0.9"/>
      <rect x="955" y="0" width="45" height="460" fill="#5f9dbf"/>

      <!-- montagnes -->
      <polygon points="0,300 95,140 190,300" fill="#7a7563" opacity="0.85"/>
      <polygon points="40,300 140,60 240,300" fill="#96907a"/>
      <polygon points="115,90 140,60 165,92 150,98 130,98" fill="#eef3f0"/>

      <!-- coupe de sol souterraine (sous la plaine) -->
      <rect x="260" y="300" width="690" height="60" fill="var(--l-sol)" opacity="0.6"/>
      <rect x="260" y="360" width="690" height="70" fill="var(--l-nappe)"/>
      <rect x="260" y="430" width="690" height="30" fill="var(--l-roche)"/>
      <line x1="260" y1="300" x2="950" y2="300" stroke="var(--ink)" stroke-width="2"/>

      <!-- plaine d'inondation (sous la rivière) -->
      <g class="zone" data-id="plaine">
        <path class="lf-hit" d="M380,205 C440,195 500,195 560,210 C610,220 640,250 650,300 L380,300 C375,270 375,235 380,205 Z" fill="var(--foam)" opacity="0.4" stroke="var(--teal-lt)" stroke-width="1.5" stroke-dasharray="4 4"/>
      </g>

      <!-- rivière principale (décorative, non cliquable) -->
      <path d="M260,290 C300,270 320,250 340,235 C365,218 400,208 440,213 C480,218 470,250 500,270 C530,290 560,300 555,270 C550,235 520,220 545,205 C575,188 620,195 650,205 C685,218 700,235 715,230 C735,224 750,205 780,215 C815,228 835,255 855,240 C880,222 895,190 900,150"
        fill="none" stroke="var(--deep)" stroke-width="13" stroke-linecap="round"/>

      <!-- méandre (segment surligné, cliquable) -->
      <g class="zone" data-id="meandre">
        <path class="lf-hit" d="M440,213 C480,218 470,250 500,270 C530,290 560,300 555,270 C550,235 520,220 545,205"
          fill="none" stroke="var(--teal)" stroke-width="15" stroke-linecap="round" opacity="0.001"/>
      </g>

      <!-- bras mort -->
      <g class="zone" data-id="brasmort">
        <ellipse class="lf-hit" cx="500" cy="345" rx="42" ry="17" fill="var(--teal)" opacity="0.85"/>
      </g>

      <!-- source -->
      <g class="zone" data-id="source">
        <circle class="lf-hit" cx="140" cy="92" r="12" fill="var(--teal)" stroke="var(--ink)" stroke-width="1.5"/>
      </g>

      <!-- torrent (segment initial de la rivière, cliquable, surligné) -->
      <g class="zone" data-id="torrent">
        <path class="lf-hit" d="M260,290 C300,270 320,250 340,235 C365,218 400,208 440,213" fill="none" stroke="var(--teal)" stroke-width="15" stroke-linecap="round" opacity="0.001"/>
      </g>

      <!-- cascade -->
      <g class="zone" data-id="cascade">
        <rect class="lf-hit" x="272" y="215" width="14" height="60" fill="var(--foam)" opacity="0.001"/>
        <path d="M272,220 L272,275 M280,220 L280,275 M288,220 L288,275" stroke="var(--paper)" stroke-width="2.5" opacity="0.85"/>
        <ellipse cx="290" cy="278" rx="24" ry="8" fill="var(--teal)" opacity="0.85"/>
      </g>

      <!-- confluent (affluent qui rejoint) -->
      <g class="zone" data-id="confluent">
        <path class="lf-hit" d="M715,60 C712,100 705,140 715,230" fill="none" stroke="var(--teal)" stroke-width="10" stroke-linecap="round" opacity="0.9"/>
      </g>

      <!-- zone humide -->
      <g class="zone" data-id="zonehumide">
        <ellipse class="lf-hit" cx="800" cy="290" rx="55" ry="30" fill="#8fae7e" opacity="0.55"/>
        <path d="M775,300 L775,270 M790,304 L790,268 M805,300 L805,266 M820,304 L820,272" stroke="var(--reed)" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- delta -->
      <g class="zone" data-id="delta">
        <polygon class="lf-hit" points="900,150 942,115 942,185" fill="var(--sand)" stroke="var(--ink)" stroke-width="1.5" opacity="0.85"/>
        <path d="M900,150 L940,124 M900,150 L940,150 M900,150 L940,176" fill="none" stroke="var(--deep)" stroke-width="4" stroke-linecap="round"/>
      </g>

      <!-- estuaire (à part, en haut à droite) -->
      <g class="zone" data-id="estuaire">
        <path class="lf-hit" d="M820,32 C860,27 900,32 938,48 L938,60 C900,46 860,43 822,46 Z" fill="var(--deep-lt)" stroke="var(--ink)" stroke-width="1.5" opacity="0.75"/>
      </g>

      <!-- lagune (à part, en bas à droite) -->
      <g class="zone" data-id="lagune">
        <ellipse class="lf-hit" cx="895" cy="258" rx="42" ry="23" fill="var(--teal-lt)" stroke="var(--ink)" stroke-width="1.5" opacity="0.85"/>
        <rect x="938" y="238" width="7" height="40" rx="2" fill="var(--sand)" stroke="var(--ink)" stroke-width="1"/>
      </g>

      <!-- nappe phréatique -->
      <g class="zone" data-id="nappe">
        <rect class="lf-hit" x="260" y="360" width="690" height="70" fill="var(--l-nappe)" opacity="0.001"/>
      </g>

      <!-- labels -->
      <text class="lf-label" x="140" y="70">Source</text>
      <text class="lf-label" x="185" y="205">Torrent</text>
      <text class="lf-label" x="300" y="300">Cascade</text>
      <text class="lf-label" x="470" y="195">Plaine d'inondation</text>
      <text class="lf-label" x="590" y="195">Méandre</text>
      <text class="lf-label" x="500" y="378">Bras mort</text>
      <text class="lf-label" x="730" y="115">Confluent</text>
      <text class="lf-label" x="800" y="335">Zone humide</text>
      <text class="lf-label" x="905" y="200">Delta</text>
      <text class="lf-label" x="900" y="20">Estuaire</text>
      <text class="lf-label" x="900" y="298">Lagune</text>
      <text class="lf-label" x="605" y="400" fill="var(--paper)">Nappe phréatique</text>
    </svg>`;
  }
  document.getElementById('landformWrap').innerHTML = buildLandformSvg();
  const landformDetail = document.getElementById('landformDetail');
  function selectLandform(id) {
    const s = LANDFORMS.find(x => x.id === id);
    document.querySelectorAll('.landform-wrap .zone').forEach(el => el.classList.toggle('selected', el.dataset.id === id));
    landformDetail.innerHTML = `<div class="nm">${s.nm}</div><p>${s.d}</p>`;
  }
  document.querySelectorAll('.landform-wrap .zone').forEach(el => el.addEventListener('click', () => selectLandform(el.dataset.id)));

  /* ============================================================
     PLANCHE XI — QUALITÉ DE L'EAU ET POLLUTION
     ============================================================ */
  buildFlipGrid('pollutionGrid', [
    { front: '<div><div class="lexicon">🌫️</div>Turbidité</div>', back: "Trouble de l'eau causé par des particules en suspension. Un bon indicateur visuel rapide de la qualité d'une eau, même sans analyse en laboratoire." },
    { front: '<div><div class="lexicon">🌱</div>Eutrophisation</div>', back: "Excès de nutriments (azote, phosphore) qui provoque une prolifération d'algues, laquelle épuise l'oxygène de l'eau et peut asphyxier la vie aquatique." },
    { front: '<div><div class="lexicon">🎯</div>Pollution ponctuelle</div>', back: "Pollution provenant d'une source unique et identifiable — une usine, une station d'épuration défaillante — plus facile à réglementer et à contrôler." },
    { front: '<div><div class="lexicon">🌐</div>Pollution diffuse</div>', back: "Pollution qui provient de multiples sources dispersées, comme le ruissellement agricole sur tout un bassin versant — bien plus difficile à tracer et à limiter." },
    { front: '<div><div class="lexicon">🗺️</div>Bassin de captage</div>', back: "Zone dont l'eau alimente un point de prélèvement donné (puits, source). Protéger ce périmètre est essentiel pour garantir la qualité de l'eau captée." },
    { front: '<div><div class="lexicon">🧪</div>pH de l\u2019eau</div>', back: "Mesure de l'acidité ou de la basicité de l'eau, sur une échelle de 0 à 14. La plupart des espèces aquatiques tolèrent une plage assez étroite autour de 6,5 à 8,5." },
  ]);

  /* ============================================================
     PLANCHE XII — GESTION ET ENJEUX (accordéon)
     ============================================================ */
  const STAKES = [
    { nm: 'Usages par volume mondial', sub: 'agriculture ~70 %', color: 'var(--reed)',
      d: "L'agriculture (irrigation) consomme à elle seule environ 70&nbsp;% de l'eau douce prélevée dans le monde, loin devant l'industrie (environ 19&nbsp;%) et les usages domestiques (environ 11&nbsp;%)." },
    { nm: 'Stress hydrique', sub: 'quand la demande dépasse l\u2019offre', color: 'var(--coral)',
      d: "Une région est en stress hydrique quand la demande en eau approche ou dépasse la ressource disponible durablement. Plus de deux milliards de personnes vivent aujourd'hui dans des pays en stress hydrique élevé." },
    { nm: 'Changement climatique', sub: 'un cycle de l\u2019eau qui s\u2019intensifie', color: 'var(--deep)',
      d: "Un air plus chaud retient plus de vapeur d'eau&nbsp;: les épisodes de pluie intense se renforcent, tandis que les périodes sèches entre deux s'allongent dans de nombreuses régions — un cycle de l'eau globalement plus extrême, pas seulement plus rare ou plus abondant." },
    { nm: 'Gestion partagée', sub: 'un bassin versant ignore les frontières', color: 'var(--sand)',
      d: "Plus de 60&nbsp;% de l'eau douce mondiale circule dans des bassins versants partagés par plusieurs pays, ce qui rend la coopération transfrontalière indispensable pour une gestion durable." },
  ];
  const stakesAcc = document.getElementById('stakesAccordion');
  stakesAcc.innerHTML = STAKES.map((s, i) => `
    <div class="acc-row" data-i="${i}">
      <div class="acc-head">
        <span class="sw" style="background:${s.color};"></span>
        <span style="flex:1;">${s.nm}</span>
        <span class="acc-sub">${s.sub}</span>
      </div>
      <div class="acc-body"><p>${s.d}</p></div>
    </div>`).join('');
  stakesAcc.querySelectorAll('.acc-row').forEach(row => {
    row.addEventListener('click', () => {
      const body = row.querySelector('.acc-body');
      const isOpen = row.classList.contains('active');
      stakesAcc.querySelectorAll('.acc-row').forEach(r => { r.classList.remove('active'); r.querySelector('.acc-body').style.maxHeight = '0px'; });
      if (!isOpen) { row.classList.add('active'); body.style.maxHeight = body.scrollHeight + 'px'; }
    });
  });
  stakesAcc.querySelector('.acc-row').classList.add('active');
  stakesAcc.querySelector('.acc-body').style.maxHeight = stakesAcc.querySelector('.acc-body').scrollHeight + 'px';

  /* ============================================================
     PLANCHE XIII — LEXIQUE + RESSOURCES
     ============================================================ */
  buildFlipGrid('lexgrid', [
    { front: '<div><div class="lexicon">〰️</div>Débit</div>', back: "Volume d'eau qui traverse une section d'un cours d'eau par unité de temps, mesuré en m³/s." },
    { front: '<div><div class="lexicon">📈</div>Crue</div>', back: "Montée temporaire et significative du débit et du niveau d'un cours d'eau, au-delà de laquelle il peut sortir de son lit." },
    { front: '<div><div class="lexicon">📉</div>Étiage</div>', back: "Période de plus bas niveau d'un cours d'eau au cours de l'année, généralement en fin de saison sèche." },
    { front: '<div><div class="lexicon">🪨</div>Aquifère</div>', back: "Formation géologique poreuse ou fissurée capable de stocker et de laisser circuler une quantité significative d'eau souterraine." },
    { front: '<div><div class="lexicon">🧭</div>Bassin versant</div>', back: "Territoire dont toutes les eaux de ruissellement convergent vers un même exutoire (rivière, lac, mer)." },
    { front: '<div><div class="lexicon">💧</div>Nappe phréatique</div>', back: "Réserve d'eau souterraine la plus proche de la surface, généralement non captive." },
    { front: '<div><div class="lexicon">🌊</div>Estuaire</div>', back: "Embouchure élargie d'un fleuve, façonnée par la marée, où se mélangent eau douce et eau salée." },
    { front: '<div><div class="lexicon">🏞️</div>Zone humide</div>', back: "Milieu où l'eau est présente en surface ou juste sous la surface une bonne partie de l'année, à l'interface terre-eau." },
  ]);

  document.getElementById('resList').innerHTML = `
    <a class="rescard" href="https://www.unesco.org/en/water-security/hydrology" target="_blank" rel="noopener"><span class="rt">UNESCO — Programme hydrologique international</span><span class="rd">Coopération scientifique internationale sur l'eau douce.</span></a>
    <a class="rescard" href="https://www.usgs.gov/mission-areas/water-resources" target="_blank" rel="noopener"><span class="rt">USGS Water Resources</span><span class="rd">Données et cartes hydrologiques américaines.</span></a>
    <a class="rescard" href="https://www.eaufrance.fr" target="_blank" rel="noopener"><span class="rt">Eaufrance</span><span class="rd">Portail public français des données sur l'eau et les agences de l'eau.</span></a>`;

});