document.addEventListener('DOMContentLoaded', () => {

  /* ================= REVEAL ON SCROLL ================= */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(el=>io.observe(el));

  /* ================= DOT NAV ================= */
  const sections = Array.from(document.querySelectorAll('main .plate'));
  const dotnav = document.getElementById('dotnav');
  sections.forEach(sec=>{
    const a = document.createElement('a');
    a.href = '#'+sec.id;
    const tip = document.createElement('span');
    tip.className='tip';
    tip.textContent = sec.dataset.title || sec.id;
    a.appendChild(tip);
    dotnav.appendChild(a);
  });
  const dots = Array.from(dotnav.querySelectorAll('a'));
  const navIO = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      const idx = sections.indexOf(e.target);
      if(e.isIntersecting && dots[idx]){
        dots.forEach(d=>d.classList.remove('active'));
        dots[idx].classList.add('active');
      }
    });
  }, {threshold:0.5});
  sections.forEach(s=>navIO.observe(s));

  /* ================= HERO COSMOS ENTRANCE ================= */
  const rings = document.querySelectorAll('.hero-cosmos .ring');
  rings.forEach(r=>{
    r.style.opacity = 0;
    r.style.transform = 'scale(0.4)';
    r.style.transformOrigin = '200px 200px';
    r.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(.2,.7,.3,1)';
  });
  const bursts = document.querySelectorAll('.hero-cosmos .burst');
  bursts.forEach(p=>{
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
  });
  const core = document.querySelector('.hero-cosmos .core');
  if(core){ core.style.opacity = 0; core.style.transition = 'opacity .6s ease'; }
  const stars = document.querySelectorAll('.hero-cosmos .star');
  stars.forEach(s=>{ s.style.opacity = 0; s.style.transition = 'opacity 1s ease'; });

  setTimeout(()=>{
    if(core) core.style.opacity = 1;
    setTimeout(()=>{
      bursts.forEach((p,i)=>{
        setTimeout(()=>{ p.style.transition = `stroke-dashoffset .9s cubic-bezier(.3,.6,.3,1)`; p.style.strokeDashoffset = 0; }, i*60);
      });
    }, 250);
    setTimeout(()=>{ rings.forEach((r,i)=>{ setTimeout(()=>{ r.style.opacity = .9; r.style.transform = 'scale(1)'; }, i*180); }); }, 500);
    setTimeout(()=>{ stars.forEach((s,i)=>{ setTimeout(()=>{ s.style.opacity = .9; }, i*90); }); }, 1100);
  }, 300);

  /* ================= GÉNÉRIQUE — FLIP CARDS ================= */
  function buildFlipGrid(containerId, items){
    const grid = document.getElementById(containerId);
    if(!grid) return;
    items.forEach(it=>{
      const c = document.createElement('div');
      c.className = 'lexcard';
      c.innerHTML = `<div class="lexcard-inner">
        <div class="lexface lexfront">${it.front}</div>
        <div class="lexface lexback">${it.back}</div>
      </div>`;
      c.addEventListener('click', ()=>c.classList.toggle('flipped'));
      grid.appendChild(c);
    });
  }

  /* ================= GÉNÉRIQUE — ONGLETS (.tabgroup / .tab-panel) ================= */
  document.querySelectorAll('.tabgroup button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const group = btn.closest('.tabgroup');
      const panels = group.nextElementSibling;
      group.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      panels.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      const target = panels.querySelector(`.tab-panel[data-panel="${btn.dataset.tab}"]`);
      if(target) target.classList.add('active');
    });
  });

  /* ============================================================
     PLANCHE II — LES ÉTOILES
     ============================================================ */
  const STAR_TYPES = [
    { id:'rouge', nm:'Naines rouges', color:'var(--star-red)', size:26, sub:'0,1 à 0,5 masse solaire',
      d:"Les plus nombreuses de loin&nbsp;: environ trois étoiles sur quatre dans notre galaxie en sont. Petites, froides et peu lumineuses, elles brûlent leur carburant si lentement qu'aucune, nulle part dans l'univers, n'est encore morte de vieillesse — leur durée de vie se compte en milliers de milliards d'années, bien plus que l'âge actuel de l'univers." },
    { id:'jaune', nm:'Type solaire (naines jaunes)', color:'var(--star-yellow)', size:40, sub:'~1 masse solaire, comme le Soleil',
      d:"Le Soleil en fait partie&nbsp;: une étoile de milieu de gamme, qui fusionne tranquillement de l'hydrogène en hélium depuis 4,6&nbsp;milliards d'années, pour encore environ 5&nbsp;milliards. Une durée de vie totale d'environ 10&nbsp;milliards d'années." },
    { id:'geante', nm:'Géantes rouges', color:'var(--star-orange)', size:92, sub:'stade final d\u2019une étoile solaire',
      d:"Quand une étoile comme le Soleil épuise l'hydrogène de son cœur, elle ne s'éteint pas tout de suite&nbsp;: elle gonfle au contraire de façon spectaculaire. Dans environ 5&nbsp;milliards d'années, le Soleil deviendra assez grand pour engloutir Mercure et Vénus." },
    { id:'super', nm:'Supergéantes bleues', color:'var(--star-blue)', size:142, sub:'plus de 10 masses solaires',
      d:"Les plus massives et les plus chaudes de toutes — mais aussi les plus pressées&nbsp;: leur vie se compte en quelques millions d'années à peine. Elles finissent en supernova, une explosion titanesque qui laisse derrière elle une étoile à neutrons ou, pour les plus massives encore, un trou noir." },
  ];
  const starSizes = document.getElementById('starSizes');
  starSizes.innerHTML = STAR_TYPES.map(s=>`
    <div class="ssitem" data-id="${s.id}">
      <div class="ssdot" style="width:${s.size}px; height:${s.size}px; background:${s.color};"></div>
      <div class="sslabel">${s.nm}</div>
    </div>`).join('');

  const starAccordion = document.getElementById('starAccordion');
  starAccordion.innerHTML = STAR_TYPES.map((s,i)=>`
    <div class="acc-row" data-i="${i}">
      <div class="acc-head">
        <span class="sw" style="background:${s.color};"></span>
        <span style="flex:1;">${s.nm}</span>
        <span class="acc-sub">${s.sub}</span>
      </div>
      <div class="acc-body"><p>${s.d}</p></div>
    </div>`).join('');

  function toggleStarRow(i){
    const rows = Array.from(starAccordion.querySelectorAll('.acc-row'));
    const row = rows[i];
    const isOpen = row.classList.contains('active');
    rows.forEach(r=>{ r.classList.remove('active'); r.querySelector('.acc-body').style.maxHeight = '0px'; });
    if(!isOpen){
      row.classList.add('active');
      row.querySelector('.acc-body').style.maxHeight = row.querySelector('.acc-body').scrollHeight + 'px';
    }
  }
  starAccordion.querySelectorAll('.acc-row').forEach(row=>{
    row.addEventListener('click', ()=>toggleStarRow(+row.dataset.i));
  });
  starSizes.querySelectorAll('.ssitem').forEach((item,i)=>{
    item.style.cursor = 'pointer';
    item.addEventListener('click', ()=>toggleStarRow(i));
  });
  toggleStarRow(0);

  /* ============================================================
     PLANCHE III — LA GRAVITÉ COURBE L'ESPACE-TEMPS
     ============================================================ */
  const GW = 400, GH = 260;
  const gCols = 15, gRows = 10;
  const gStepX = GW/(gCols-1), gStepY = GH/(gRows-1);
  const PRESETS = {
    planete: { nm:'Planète', strength: 650, soft: 24, radius: 9 },
    etoile:  { nm:'Étoile',  strength: 2600, soft: 26, radius: 15 },
    trounoir:{ nm:'Trou noir', strength: 8200, soft: 15, radius: 8 },
  };
  let currentPreset = 'etoile';
  let massPos = { x: GW/2, y: GH/2 };

  const gravityWrap = document.getElementById('gravityWrap');
  gravityWrap.innerHTML = `<svg class="gravity-live-svg" viewBox="0 0 ${GW} ${GH}" xmlns="http://www.w3.org/2000/svg">
    <g id="gridLines"></g>
    <circle id="massPoint" class="masspoint" cx="${massPos.x}" cy="${massPos.y}" r="${PRESETS[currentPreset].radius}"/>
    <text id="massLabel" class="masslabel" x="${massPos.x}" y="${massPos.y - PRESETS[currentPreset].radius - 10}">${PRESETS[currentPreset].nm}</text>
  </svg>`;
  const gridLinesG = gravityWrap.querySelector('#gridLines');
  const massPointEl = gravityWrap.querySelector('#massPoint');
  const massLabelEl = gravityWrap.querySelector('#massLabel');
  const gravitySvgEl = gravityWrap.querySelector('svg');

  function warpPoint(x, y){
    const p = PRESETS[currentPreset];
    const dx = massPos.x - x, dy = massPos.y - y;
    const dist = Math.sqrt(dx*dx + dy*dy) + p.soft;
    const pull = p.strength / (dist*dist);
    return [x + dx*pull, y + dy*pull];
  }

  function renderGrid(){
    const pts = [];
    for(let j=0;j<gRows;j++){
      pts.push([]);
      for(let i=0;i<gCols;i++){ pts[j].push(warpPoint(i*gStepX, j*gStepY)); }
    }
    let html = '';
    for(let j=0;j<gRows;j++){
      html += `<path class="gridline" d="M ${pts[j].map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' L ')}"/>`;
    }
    for(let i=0;i<gCols;i++){
      html += `<path class="gridline" d="M ${pts.map(row=>row[i][0].toFixed(1)+','+row[i][1].toFixed(1)).join(' L ')}"/>`;
    }
    gridLinesG.innerHTML = html;
    massPointEl.setAttribute('cx', massPos.x);
    massPointEl.setAttribute('cy', massPos.y);
    massLabelEl.setAttribute('x', massPos.x);
    massLabelEl.setAttribute('y', massPos.y - PRESETS[currentPreset].radius - 10);
  }

  function applyPreset(key){
    currentPreset = key;
    massPointEl.setAttribute('r', PRESETS[key].radius);
    massLabelEl.textContent = PRESETS[key].nm;
    document.querySelectorAll('#gravityControls button').forEach(b=>b.classList.toggle('active', b.dataset.preset===key));
    renderGrid();
  }

  const gravityControls = document.getElementById('gravityControls');
  gravityControls.innerHTML = Object.keys(PRESETS).map(k=>`<button data-preset="${k}" class="${k===currentPreset?'active':''}">${PRESETS[k].nm}</button>`).join('');
  gravityControls.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>applyPreset(btn.dataset.preset));
  });

  function svgPointFromEvent(evt){
    const pt = gravitySvgEl.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    const ctm = gravitySvgEl.getScreenCTM().inverse();
    const loc = pt.matrixTransform(ctm);
    return { x: Math.max(0, Math.min(GW, loc.x)), y: Math.max(0, Math.min(GH, loc.y)) };
  }
  let dragging = false;
  massPointEl.addEventListener('pointerdown', (e)=>{ dragging = true; massPointEl.setPointerCapture(e.pointerId); });
  gravitySvgEl.addEventListener('pointermove', (e)=>{
    if(!dragging) return;
    massPos = svgPointFromEvent(e);
    renderGrid();
  });
  gravitySvgEl.addEventListener('pointerup', ()=>{ dragging = false; });
  gravitySvgEl.addEventListener('pointerleave', ()=>{ dragging = false; });

  renderGrid();

  /* ============================================================
     PLANCHE IV — LES TROUS NOIRS
     ============================================================ */
  const BH_ZONES = [
    { id:'disque', nm:"Le disque d'accrétion", color:'var(--star-yellow)',
      d:"Gaz et poussière chauffés à des millions de degrés en spiralant vers le trou noir, avant de basculer sous l'horizon. C'est cette matière en train de tomber qui rend un trou noir visible — pas le trou noir lui-même, qui reste par définition invisible." },
    { id:'photonsphere', nm:'La sphère de photons', color:'var(--star-blue)',
      d:"À cette distance précise, la gravité est si forte que la lumière elle-même peut être capturée sur une orbite circulaire. C'est la limite théorique de ce qu'on peut « voir » en s'approchant du bord." },
    { id:'horizon', nm:"L'horizon des événements", color:'var(--ink-2)',
      d:"Le point de non-retour. En dessous, même la lumière ne peut plus s'échapper&nbsp;: c'est ce qui rend un trou noir « noir ». Ce n'est pas une surface physique, juste une frontière mathématique." },
    { id:'singularite', nm:'La singularité', color:'var(--nova)',
      d:"Au centre, toute la masse est comprimée en un point où les équations de la relativité générale n'ont plus de sens. C'est là que la physique s'arrête, tout comme au tout premier instant du Big Bang." },
  ];
  const bhSvg = `<svg class="bh-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" rx="18" fill="var(--ink)"/>
    <ellipse class="zone" data-id="disque" cx="150" cy="150" rx="138" ry="44" fill="var(--star-yellow)" opacity="0.9"/>
    <text x="150" y="98" text-anchor="middle">disque d'accrétion</text>
    <circle class="zone" data-id="photonsphere" cx="150" cy="150" r="82" fill="var(--star-blue)"/>
    <circle class="zone" data-id="horizon" cx="150" cy="150" r="52" fill="var(--ink-2)"/>
    <circle class="hit" data-id="singularite" cx="150" cy="150" r="20" fill="transparent" style="cursor:pointer;"/>
    <circle class="zone" data-id="singularite" cx="150" cy="150" r="6" fill="var(--nova)"/>
    <text x="150" y="176" text-anchor="middle">singularité</text>
  </svg>`;
  document.getElementById('bhSvgWrap').innerHTML = bhSvg;
  document.getElementById('bhLegend').innerHTML = BH_ZONES.map(z=>`
    <div class="bh-legend-item" data-id="${z.id}"><span class="sw" style="background:${z.color}"></span><span class="nm">${z.nm}</span></div>
  `).join('');
  const bhDetail = document.getElementById('bhDetail');
  function selectBH(id){
    const z = BH_ZONES.find(x=>x.id===id);
    document.querySelectorAll('.bh-svg .zone, .bh-svg .hit').forEach(el=>el.classList.toggle('selected', el.dataset.id===id));
    document.querySelectorAll('.bh-legend-item').forEach(el=>el.classList.toggle('active', el.dataset.id===id));
    bhDetail.innerHTML = `<div class="nm">${z.nm}</div><p>${z.d}</p>`;
  }
  document.querySelectorAll('.bh-svg .zone, .bh-svg .hit').forEach(el=>el.addEventListener('click', ()=>selectBH(el.dataset.id)));
  document.querySelectorAll('.bh-legend-item').forEach(el=>el.addEventListener('click', ()=>selectBH(el.dataset.id)));
  selectBH('disque');

  /* ============================================================
     PLANCHE V — L'EXPANSION (loi de Hubble)
     ============================================================ */
  const expandWrap = document.getElementById('expandWrap');
  expandWrap.innerHTML = `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    <circle class="gal marked" cx="50" cy="100" r="7"/>
    <text class="measuretxt" x="50" y="128">nous</text>

    <circle class="gal" cx="150" cy="70" r="5"/>
    <line x1="57" y1="97" x2="143" y2="72" stroke="var(--ink-3)" stroke-width="1" stroke-dasharray="3 3"/>
    <text class="measuretxt" x="145" y="55">d</text>
    <text class="measuretxt" x="145" y="42" style="fill:var(--starlight);">v</text>

    <circle class="gal" cx="260" cy="130" r="5"/>
    <line x1="57" y1="103" x2="253" y2="128" stroke="var(--ink-3)" stroke-width="1" stroke-dasharray="3 3"/>
    <text class="measuretxt" x="255" y="150">2d</text>
    <text class="measuretxt" x="255" y="163" style="fill:var(--starlight);">2v</text>

    <circle class="gal" cx="360" cy="55" r="5"/>
    <line x1="57" y1="95" x2="353" y2="57" stroke="var(--ink-3)" stroke-width="1" stroke-dasharray="3 3"/>
    <text class="measuretxt" x="355" y="38">3d</text>
    <text class="measuretxt" x="355" y="25" style="fill:var(--starlight);">3v</text>
  </svg>`;

  /* ============================================================
     PLANCHE VI — CHRONOLOGIE DE L'UNIVERS
     ============================================================ */
  const deepBar = document.getElementById('deepBar');
  deepBar.innerHTML = `
    <div class="seg" style="flex:6; background:var(--e-planck);" title="Univers primordial (opaque)"></div>
    <div class="seg" style="flex:94; background:var(--e-galaxies);" title="Univers transparent, en expansion"></div>
  `;

  const ERAS = [
    { nm:'Ère de Planck', color:'var(--e-planck)', dark:false, dates:'0 à 10⁻⁴³ seconde',
      d:"La limite de notre savoir actuel. Avant cet instant, la gravité et la mécanique quantique devraient s'appliquer ensemble — et nos meilleures théories se contredisent. Il faudrait une théorie de la gravité quantique que nous n'avons pas encore." },
    { nm:'Inflation cosmique', color:'var(--e-inflation)', dark:true, dates:'de 10⁻³⁶ à 10⁻³² seconde',
      d:"Une expansion exponentielle brutale&nbsp;: l'univers grandit d'un facteur immense en un temps dérisoire. C'est cet épisode qui explique pourquoi l'univers observable nous semble aujourd'hui aussi plat et aussi uniforme dans toutes les directions." },
    { nm:'Nucléosynthèse primordiale', color:'var(--e-nucleo)', dark:false, dates:'les trois premières minutes',
      d:"Les quarks s'assemblent en protons et neutrons, qui fusionnent à leur tour en noyaux légers&nbsp;: environ 75&nbsp;% d'hydrogène et 25&nbsp;% d'hélium, avec une trace de lithium. Rien de plus lourd ne se formera avant les étoiles." },
    { nm:'Recombinaison', color:'var(--e-recomb)', dark:false, dates:'environ 380&nbsp;000 ans',
      d:"Les électrons se rangent enfin autour des noyaux&nbsp;: les premiers atomes complets se forment, et la lumière peut soudain voyager librement dans toutes les directions. Étirée par 13,8&nbsp;milliards d'années d'expansion, elle nous parvient aujourd'hui sous forme de micro-ondes&nbsp;: le fond diffus cosmologique." },
    { nm:'Âges sombres', color:'var(--e-sombre)', dark:true, dates:"jusqu'à ~200 millions d'années",
      d:"L'univers est rempli d'hydrogène neutre, mais aucune étoile n'existe encore pour l'éclairer&nbsp;: un vide obscur et silencieux, entre la lueur du fond diffus cosmologique et l'allumage des premières étoiles." },
    { nm:'Premières étoiles', color:'var(--e-etoiles)', dark:true, dates:"~200 à 400 millions d'années",
      d:"La gravité rassemble enfin le gaz en poches assez denses pour s'enflammer. Ces toutes premières étoiles, très massives et de courte vie, baignent l'univers de lumière ultraviolette et achèvent de réioniser le gaz environnant." },
    { nm:'Formation des galaxies', color:'var(--e-galaxies)', dark:true, dates:'quelques centaines de millions à quelques milliards d\u2019années',
      d:"Étoiles et gaz s'assemblent en galaxies. La nôtre, la Voie lactée, commence à prendre forme il y a environ 13&nbsp;milliards d'années — bien avant que notre Système solaire, lui, n'apparaisse, il y a « seulement » 4,6&nbsp;milliards d'années." },
    { nm:"Aujourd'hui — l'énergie noire domine", color:'var(--e-today)', dark:false, dates:'depuis ~5 milliards d\u2019années',
      d:"Depuis quelques milliards d'années, l'expansion accélère au lieu de ralentir. Ce n'est plus la gravité qui mène la danse à grande échelle, mais l'énergie noire — et c'est très exactement l'époque dans laquelle nous vivons." },
  ];
  const erasTrack = document.getElementById('erasTrack');
  erasTrack.innerHTML = ERAS.map((e,i)=>`
    <div class="era-row" data-i="${i}" style="background:${e.color};">
      <div class="era-head" style="color:${e.dark?'var(--paper)':'var(--ink)'};">
        <span class="sw" style="background:${e.color};"></span>
        <span class="ttl">${e.nm}</span>
        <span class="era-dates" style="color:${e.dark?'var(--paper-3)':'var(--ink-3)'};">${e.dates}</span>
      </div>
      <div class="era-body" style="color:${e.dark?'var(--paper-3)':'var(--ink-3)'};"><p>${e.d}</p></div>
    </div>`).join('');
  erasTrack.querySelectorAll('.era-row').forEach(row=>{
    const body = row.querySelector('.era-body');
    row.querySelector('.era-head').addEventListener('click', ()=>{
      const isOpen = row.classList.contains('active');
      erasTrack.querySelectorAll('.era-row').forEach(r=>{
        r.classList.remove('active');
        r.querySelector('.era-body').style.maxHeight = '0px';
      });
      if(!isOpen){ row.classList.add('active'); body.style.maxHeight = body.scrollHeight + 'px'; }
    });
  });
  erasTrack.querySelector('.era-row').classList.add('active');
  erasTrack.querySelector('.era-body').style.maxHeight = erasTrack.querySelector('.era-body').scrollHeight + 'px';

  /* ============================================================
     PLANCHE VII — MATIÈRE / ÉNERGIE NOIRE (donut cliquable)
     ============================================================ */
  const COMPOSITION = [
    { id:'ordinaire', nm:'Matière ordinaire', pct:5, color:'var(--star-yellow)',
      d:"Tout ce que la physique connaît bien&nbsp;: étoiles, planètes, gaz, poussière — et toi y compris. Une part étonnamment modeste du contenu réel de l'univers." },
    { id:'noire', nm:'Matière noire', pct:27, color:'var(--nebula)',
      d:"Une matière qui n'émet ni n'absorbe aucune lumière, détectée uniquement par son effet gravitationnel&nbsp;: elle fait tourner les galaxies plus vite que ce que la matière visible seule pourrait expliquer. Sa nature reste inconnue." },
    { id:'energie', nm:'Énergie noire', pct:68, color:'var(--ion)',
      d:"La part la plus mystérieuse&nbsp;: une propriété de l'espace lui-même qui pousse l'univers à s'étendre de plus en plus vite. Découverte en 1998 seulement, elle domine aujourd'hui le contenu total de l'univers." },
  ];
  function buildDonut(){
    const r = 80, cx = 110, cy = 110, C = 2*Math.PI*r;
    let offset = 0, arcs = '';
    COMPOSITION.forEach(s=>{
      const len = C * s.pct/100;
      arcs += `<circle class="slice" data-id="${s.id}" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="34" stroke-dasharray="${len.toFixed(1)} ${(C-len).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`;
      offset += len;
    });
    return `<svg class="donut-svg" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      ${arcs}
      <text class="pct" id="donutPct" x="${cx}" y="${cy-2}">68%</text>
      <text class="pctlabel" id="donutPctLabel" x="${cx}" y="${cy+16}">Énergie noire</text>
    </svg>`;
  }
  document.getElementById('donutSvgWrap').innerHTML = buildDonut();
  document.getElementById('donutLegend').innerHTML = COMPOSITION.map(s=>`
    <div class="donut-legend-item" data-id="${s.id}"><span class="sw" style="background:${s.color}"></span><span><span class="nm">${s.nm}</span> <span class="pc">${s.pct}%</span></span></div>
  `).join('');
  const donutDetail = document.getElementById('donutDetail');
  function selectSlice(id){
    const s = COMPOSITION.find(x=>x.id===id);
    document.querySelectorAll('.donut-svg .slice').forEach(el=>el.classList.toggle('dim', el.dataset.id!==id));
    document.querySelectorAll('.donut-legend-item').forEach(el=>el.classList.toggle('active', el.dataset.id===id));
    document.getElementById('donutPct').textContent = s.pct+'%';
    document.getElementById('donutPctLabel').textContent = s.nm;
    donutDetail.innerHTML = `<div class="nm">${s.nm}</div><p>${s.d}</p>`;
  }
  document.querySelectorAll('.donut-svg .slice').forEach(el=>el.addEventListener('click', ()=>selectSlice(el.dataset.id)));
  document.querySelectorAll('.donut-legend-item').forEach(el=>el.addEventListener('click', ()=>selectSlice(el.dataset.id)));
  selectSlice('energie');

  /* ============================================================
     PLANCHE VIII — LE DESTIN DE L'UNIVERS (onglets)
     ============================================================ */
  const svgFreeze = `<svg class="fate-svg" viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="80" r="14"/><circle cx="110" cy="80" r="8" opacity="0.6"/><circle cx="170" cy="80" r="5" opacity="0.35"/><circle cx="220" cy="80" r="2.5" opacity="0.18"/>
    <path d="M55,80 L235,80" stroke="var(--ink-3)" stroke-dasharray="3 5"/>
  </svg>`;
  const svgCrunch = `<svg class="fate-svg" viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="80" r="4" opacity="0.4"/><circle cx="80" cy="80" r="7" opacity="0.6"/><circle cx="150" cy="80" r="11"/><circle cx="150" cy="80" r="16" fill="none" stroke="var(--nova)" stroke-width="2"/>
    <path d="M30,80 L150,80" stroke="var(--ink-3)" stroke-dasharray="3 5"/>
  </svg>`;
  const svgRip = `<svg class="fate-svg" viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="9"/><circle cx="130" cy="80" r="6"/><circle cx="200" cy="50" r="4"/><circle cx="90" cy="120" r="5"/><circle cx="190" cy="120" r="3"/>
    <path d="M60,60 L20,20 M130,80 L165,125 M200,50 L245,15 M90,120 L55,150 M190,120 L235,150" stroke="var(--wine)"/>
  </svg>`;
  const svgUnknown = `<svg class="fate-svg" viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="80" r="7" fill="var(--ink)"/>
    <path d="M47,80 C100,40 160,35 230,30" fill="none" stroke="var(--ink-3)" stroke-width="1.6" stroke-dasharray="4 5"/>
    <path d="M47,80 C110,80 170,80 230,80" fill="none" stroke="var(--ink-3)" stroke-width="1.6" stroke-dasharray="4 5"/>
    <path d="M47,80 C100,120 160,125 230,130" fill="none" stroke="var(--ink-3)" stroke-width="1.6" stroke-dasharray="4 5"/>
    <text x="238" y="34" font-size="20" fill="var(--nova)" text-anchor="middle">?</text>
    <text x="238" y="86" font-size="20" fill="var(--nova)" text-anchor="middle">?</text>
    <text x="238" y="136" font-size="20" fill="var(--nova)" text-anchor="middle">?</text>
  </svg>`;
  const fatePanels = document.getElementById('fatePanels');
  fatePanels.innerHTML = `
    <div class="tab-panel active" data-panel="freeze">
      <div class="tab-svg-wrap">${svgFreeze}</div>
      <div><span class="tab-badge freeze">Le plus probable, à ce jour</span>
        <p>Si l'énergie noire reste constante, l'expansion continue indéfiniment, de plus en plus vite. Les galaxies s'éloignent jusqu'à disparaître de notre vue&nbsp;; les étoiles s'éteignent une à une, faute de nouveau gaz à transformer. Pas d'embrasement&nbsp;: juste un froid qui s'installe pour toujours.</p>
      </div>
    </div>
    <div class="tab-panel" data-panel="crunch">
      <div class="tab-svg-wrap">${svgCrunch}</div>
      <div><span class="tab-badge crunch">Un rebond possible</span>
        <p>Si l'énergie noire s'affaiblissait avec le temps, la gravité pourrait finir par reprendre le dessus&nbsp;: l'expansion s'inverserait, et l'univers se contracterait jusqu'à un état extrêmement dense — un « anti-Big Bang ». Rien dans les observations actuelles ne va dans ce sens, mais l'hypothèse n'est pas totalement exclue.</p>
      </div>
    </div>
    <div class="tab-panel" data-panel="rip">
      <div class="tab-svg-wrap">${svgRip}</div>
      <div><span class="tab-badge rip">Le plus brutal</span>
        <p>Si l'énergie noire se renforçait au contraire avec le temps, l'expansion s'accélérerait jusqu'à dépasser la cohésion de toute structure&nbsp;: galaxies, systèmes solaires, puis atomes eux-mêmes seraient déchirés. Spectaculaire, mais rien à ce jour ne l'appuie sérieusement.</p>
      </div>
    </div>
    <div class="tab-panel" data-panel="inconnu">
      <div class="tab-svg-wrap">${svgUnknown}</div>
      <div><span class="tab-badge inconnu">La réponse la plus honnête</span>
        <p>La nature exacte de l'énergie noire — la variable qui décide entre ces trois scénarios — reste l'une des plus grandes inconnues de la physique actuelle. Des missions comme Euclid ou le télescope Vera&nbsp;C.&nbsp;Rubin affinent la mesure d'année en année. Le meilleur résumé, pour l'instant&nbsp;: on ne sait pas encore, et c'est très bien de le dire.</p>
      </div>
    </div>`;

  /* ============================================================
     PLANCHE IX — POUSSIÈRE D'ÉTOILES
     ============================================================ */
  buildFlipGrid('elementGrid', [
    { front:'<div><div class="elsym">C</div><div class="elname">Carbone</div></div>', back:"Le squelette de toute molécule organique qui te compose, forgé par fusion de trois noyaux d'hélium au cœur des étoiles." },
    { front:'<div><div class="elsym">O</div><div class="elname">Oxygène</div></div>', back:"Le troisième élément le plus abondant de l'univers — dans chaque respiration et chaque molécule d'eau de ton corps." },
    { front:'<div><div class="elsym">N</div><div class="elname">Azote</div></div>', back:"Environ 78&nbsp;% de l'air que tu respires, et un composant essentiel de ton ADN et de tes protéines." },
    { front:'<div><div class="elsym">Ca</div><div class="elname">Calcium</div></div>', back:"Dans tes os et tes dents, produit par fusion nucléaire dans des étoiles mortes bien avant la naissance du Soleil." },
    { front:'<div><div class="elsym">Fe</div><div class="elname">Fer</div></div>', back:"Dans l'hémoglobine de ton sang, forgé au cœur d'étoiles massives juste avant leur explosion en supernova." },
    { front:'<div><div class="elsym">Au</div><div class="elname">Or</div></div>', back:"Forgé uniquement lors de la fusion de deux étoiles à neutrons — un événement plus rare encore que la mort d'une étoile ordinaire, confirmé pour la première fois en 2017." },
  ]);

});