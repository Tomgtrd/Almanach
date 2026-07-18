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

  /* ================= HERO — DESSIN DE L'ONDE + QUANTA ================= */
  const heroPath = document.querySelector('.hero-quanta path.draw');
  const heroDots = document.querySelectorAll('.hero-quanta .quantum-dot');
  heroDots.forEach(c=>{ c.style.opacity = 0; c.style.transition = 'opacity .5s ease'; });
  if(heroPath){
    const len = heroPath.getTotalLength();
    heroPath.style.strokeDasharray = len;
    heroPath.style.strokeDashoffset = len;
    heroPath.style.transition = `stroke-dashoffset 1.4s cubic-bezier(.3,.6,.3,1) .3s`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ heroPath.style.strokeDashoffset = 0; }));
  }
  setTimeout(()=>{ heroDots.forEach((c,i)=>{ setTimeout(()=>{ c.style.opacity = 1; }, i*160); }); }, 1300);

  /* ================= HELPER — GROUPE D'ONGLETS GÉNÉRIQUE ================= */
  function setupTabGroup(tabsEl, panelsEl, panels){
    panelsEl.innerHTML = panels.map((p,i)=>`
      <div class="qm-panel ${i===0?'active':''}" data-panel="${p.key}">
        <div class="qm-svg-wrap">${p.svg}</div>
        <div>
          <span class="qm-badge">${p.badge}</span>
          <p>${p.text}</p>
          ${p.ex ? `<p style="font-size:13.5px; color:var(--ink-3);"><b>Exemple&nbsp;:</b> ${p.ex}</p>` : ''}
        </div>
      </div>`).join('');
    tabsEl.querySelectorAll('.qmtab').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        tabsEl.querySelectorAll('.qmtab').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        panelsEl.querySelectorAll('.qm-panel').forEach(p=>p.classList.remove('active'));
        panelsEl.querySelector(`.qm-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
      });
    });
  }

  /* ================= PLANCHE II — FENTE DE YOUNG ================= */
  const svgClassic = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <rect x="10" y="82" width="12" height="16" rx="3" fill="var(--amber)"/>
    <rect x="120" y="20" width="10" height="37" fill="var(--ink)"/>
    <rect x="120" y="72" width="10" height="36" fill="var(--ink)"/>
    <rect x="120" y="123" width="10" height="37" fill="var(--ink)"/>
    <line x1="16" y1="90" x2="245" y2="36.4" stroke="var(--indigo)" stroke-width="2"/>
    <line x1="16" y1="90" x2="245" y2="143.6" stroke="var(--indigo)" stroke-width="2"/>
    <rect x="240" y="20" width="10" height="140" fill="var(--paper-3)"/>
    <circle cx="245" cy="36.4" r="4" fill="var(--amber)"/>
    <circle cx="245" cy="143.6" r="4" fill="var(--amber)"/>
  </svg>`;
  const svgWave = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <rect x="10" y="82" width="12" height="16" rx="3" fill="var(--amber)"/>
    <path d="M16,70 A20,20 0 0 1 16,110" fill="none" stroke="var(--amber)" stroke-width="1.1" opacity="0.7"/>
    <path d="M16,45 A45,45 0 0 1 16,135" fill="none" stroke="var(--amber)" stroke-width="1.1" opacity="0.48"/>
    <path d="M16,20 A70,70 0 0 1 16,160" fill="none" stroke="var(--amber)" stroke-width="1.1" opacity="0.3"/>
    <path d="M16,2 A88,88 0 0 1 16,178" fill="none" stroke="var(--amber)" stroke-width="1.1" opacity="0.16"/>
    <rect x="120" y="20" width="10" height="37" fill="var(--ink)"/>
    <rect x="120" y="72" width="10" height="36" fill="var(--ink)"/>
    <rect x="120" y="123" width="10" height="37" fill="var(--ink)"/>
    <path d="M130,54.5 A10,10 0 0 1 130,74.5" fill="none" stroke="var(--cyan)" stroke-width="1.1" opacity="0.9"/>
    <path d="M130,42.5 A22,22 0 0 1 130,86.5" fill="none" stroke="var(--cyan)" stroke-width="1.1" opacity="0.72"/>
    <path d="M130,30.5 A34,34 0 0 1 130,98.5" fill="none" stroke="var(--cyan)" stroke-width="1.1" opacity="0.56"/>
    <path d="M130,18.5 A46,46 0 0 1 130,110.5" fill="none" stroke="var(--cyan)" stroke-width="1.1" opacity="0.42"/>
    <path d="M130,6.5 A58,58 0 0 1 130,122.5" fill="none" stroke="var(--cyan)" stroke-width="1.1" opacity="0.28"/>
    <path d="M130,-5.5 A70,70 0 0 1 130,134.5" fill="none" stroke="var(--cyan)" stroke-width="1.1" opacity="0.16"/>
    <path d="M130,105.5 A10,10 0 0 1 130,125.5" fill="none" stroke="var(--violet)" stroke-width="1.1" opacity="0.9"/>
    <path d="M130,93.5 A22,22 0 0 1 130,137.5" fill="none" stroke="var(--violet)" stroke-width="1.1" opacity="0.72"/>
    <path d="M130,81.5 A34,34 0 0 1 130,149.5" fill="none" stroke="var(--violet)" stroke-width="1.1" opacity="0.56"/>
    <path d="M130,69.5 A46,46 0 0 1 130,161.5" fill="none" stroke="var(--violet)" stroke-width="1.1" opacity="0.42"/>
    <path d="M130,57.5 A58,58 0 0 1 130,173.5" fill="none" stroke="var(--violet)" stroke-width="1.1" opacity="0.28"/>
    <path d="M130,45.5 A70,70 0 0 1 130,185.5" fill="none" stroke="var(--violet)" stroke-width="1.1" opacity="0.16"/>
    <rect x="240" y="20" width="10" height="140" fill="var(--paper-3)"/>
    <rect x="243" y="24" width="4" height="10" fill="var(--violet)"/>
    <rect x="243" y="44" width="4" height="4" fill="var(--violet)" opacity="0.3"/>
    <rect x="243" y="60" width="4" height="16" fill="var(--violet)"/>
    <rect x="243" y="84" width="4" height="4" fill="var(--violet)" opacity="0.3"/>
    <rect x="243" y="82" width="4" height="26" fill="var(--violet)"/>
    <rect x="243" y="116" width="4" height="4" fill="var(--violet)" opacity="0.3"/>
    <rect x="243" y="126" width="4" height="16" fill="var(--violet)"/>
    <rect x="243" y="150" width="4" height="4" fill="var(--violet)" opacity="0.3"/>
    <path d="M258,20 C268,35 248,45 258,60 C268,75 248,85 258,100 C268,115 248,125 258,140 C268,155 248,165 258,180" fill="none" stroke="var(--violet)" stroke-width="1.3" opacity="0.55"/>
  </svg>`;
  const svgSingle = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <rect x="10" y="82" width="12" height="16" rx="3" fill="var(--amber)"/>
    <rect x="120" y="20" width="10" height="37" fill="var(--ink)"/>
    <rect x="120" y="72" width="10" height="36" fill="var(--ink)"/>
    <rect x="120" y="123" width="10" height="37" fill="var(--ink)"/>
    <circle cx="75" cy="90" r="4" fill="var(--amber)"/>
    <rect x="240" y="20" width="10" height="140" fill="var(--paper-3)"/>
    <circle cx="245" cy="10" r="1.8" fill="var(--violet)" opacity="0.3"/>
    <circle cx="245" cy="36" r="2.3" fill="var(--violet)" opacity="0.6"/>
    <circle cx="244" cy="63" r="2.4" fill="var(--violet)" opacity="0.75"/>
    <circle cx="247" cy="65" r="2.2" fill="var(--violet)" opacity="0.6"/>
    <circle cx="243" cy="88" r="2.6" fill="var(--violet)"/>
    <circle cx="246" cy="90" r="2.8" fill="var(--violet)"/>
    <circle cx="244" cy="92" r="2.6" fill="var(--violet)"/>
    <circle cx="248" cy="90" r="2.2" fill="var(--violet)" opacity="0.7"/>
    <circle cx="246" cy="116" r="2.3" fill="var(--violet)" opacity="0.75"/>
    <circle cx="243" cy="118" r="2.2" fill="var(--violet)" opacity="0.6"/>
    <circle cx="245" cy="144" r="2.2" fill="var(--violet)" opacity="0.55"/>
    <circle cx="245" cy="170" r="1.8" fill="var(--violet)" opacity="0.3"/>
  </svg>`;
  const YOUNG = [
    {key:'classic', svg:svgClassic, badge:'Comme des billes', text:"Si les électrons étaient de simples billes, on s'attendrait à voir deux bandes nettes sur l'écran, alignées avec les deux fentes.", ex:"C'est ce que prévoit la physique classique."},
    {key:'wave', svg:svgWave, badge:'Motif d\u2019interférence', text:"Le résultat réel est tout autre&nbsp;: une alternance de franges claires et sombres, exactement comme deux vagues qui se superposent. La particule s'est comportée comme une onde passant par les deux fentes à la fois.", ex:"Confirmé pour les photons, puis pour les électrons."},
    {key:'single', svg:svgSingle, badge:'Un photon à la fois', text:"Le plus vertigineux&nbsp;: même en envoyant les particules une par une, le motif d'interférence finit par apparaître, point après point. Chaque particule semble « interférer avec elle-même ».", ex:"Chaque point est un photon détecté ; leur accumulation dessine les franges."},
  ];
  const youngTabsEl = document.querySelector('#p2 .qmtabs');
  setupTabGroup(youngTabsEl, document.getElementById('youngPanels'), YOUNG);

  /* ================= PLANCHE III — FONCTION D'ONDE ================= */
  const waveSvgWrap = document.getElementById('waveSvgWrap');
  const WAVE_BASELINE = 108;
  function waveProb(x){
    const g1 = 58*Math.exp(-Math.pow((x-95)/26,2));
    const g2 = 24*Math.exp(-Math.pow((x-215)/20,2));
    return g1+g2;
  }
  const waveSamples = [];
  for(let x=10; x<=290; x+=4){ waveSamples.push({x, y: WAVE_BASELINE - waveProb(x)}); }
  const waveMaxProb = Math.max(...waveSamples.map(p=>WAVE_BASELINE - p.y));
  function waveCurvePath(){
    return 'M' + waveSamples.map(p=>`${p.x},${p.y.toFixed(1)}`).join(' L');
  }
  function sampleWaveX(){
    for(let i=0;i<300;i++){
      const x = 10 + Math.random()*280;
      const threshold = Math.random()*waveMaxProb;
      if(threshold <= waveProb(x)) return x;
    }
    return 95;
  }
  const waveBaseSvg = `<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <path d="${waveCurvePath()}" fill="none" stroke="var(--cyan)" stroke-width="2.5"/>
    <line x1="10" y1="${WAVE_BASELINE}" x2="290" y2="${WAVE_BASELINE}" stroke="var(--paper-3)" stroke-width="1.5"/>
  </svg>`;
  waveSvgWrap.innerHTML = waveBaseSvg;
  const measureBtn = document.getElementById('measureBtn');
  const waveCaption = document.getElementById('waveCaption');
  let measured = false;
  measureBtn.addEventListener('click', ()=>{
    measured = !measured;
    if(measured){
      const x = sampleWaveX();
      const y = WAVE_BASELINE - waveProb(x);
      waveSvgWrap.innerHTML = `<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
        <path d="${waveCurvePath()}" fill="none" stroke="var(--paper-3)" stroke-width="1.5" opacity="0.4"/>
        <line x1="10" y1="${WAVE_BASELINE}" x2="290" y2="${WAVE_BASELINE}" stroke="var(--paper-3)" stroke-width="1.5"/>
        <line x1="${x.toFixed(1)}" y1="${WAVE_BASELINE}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--violet)" stroke-width="2.5"/>
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="var(--violet)"/>
      </svg>`;
      waveCaption.textContent = "Après la mesure : un seul résultat, tiré au hasard selon les probabilités données par la courbe — la fonction d'onde s'est « effondrée » sur ce point précis.";
      measureBtn.textContent = 'Recommencer';
    } else {
      waveSvgWrap.innerHTML = waveBaseSvg;
      waveCaption.textContent = "Avant la mesure : la particule est « étalée » — présente avec différentes probabilités le long de l'onde.";
      measureBtn.textContent = 'Effectuer une mesure';
    }
  });

  /* ================= PLANCHE IV — SUPERPOSITION (FLIP CARDS) ================= */
  const SUPERPOS = [
    {tag:'Spin électronique', front:'Un électron isolé', back:'Avant mesure : son spin est à la fois « haut » et « bas ». Au moment de la mesure, il se fixe sur l\u2019une des deux valeurs, au hasard.', cls:'after-cyan'},
    {tag:'Polarisation', front:'Un photon', back:'Peut être dans une superposition de polarisations (verticale et horizontale) jusqu\u2019à ce qu\u2019un filtre polarisant force un résultat.', cls:'after-amber'},
    {tag:'Expérience de pensée', front:'Le chat de Schrödinger', back:'Métaphore volontairement absurde : selon la logique quantique appliquée (à tort) à un objet macroscopique, le chat serait « vivant et mort » jusqu\u2019à l\u2019ouverture de la boîte.', cls:'after-violet'},
  ];
  const superposGrid = document.getElementById('superposGrid');
  SUPERPOS.forEach(s=>{
    const c = document.createElement('div');
    c.className = 'flipcard';
    c.innerHTML = `<div class="flipcard-inner">
      <div class="flipface flipfront"><span class="fc-tag">${s.tag}</span>${s.front}</div>
      <div class="flipface flipback ${s.cls}">${s.back}</div>
    </div>`;
    c.addEventListener('click', ()=>c.classList.toggle('flipped'));
    superposGrid.appendChild(c);
  });

  /* ================= PLANCHE V — INCERTITUDE D'HEISENBERG ================= */
  const uncSlider = document.getElementById('uncSlider');
  const uncFillPos = document.getElementById('uncFillPos');
  const uncFillVit = document.getElementById('uncFillVit');
  const uncCaption = document.getElementById('uncCaption');
  function updateUnc(){
    const v = +uncSlider.value;
    uncFillPos.style.width = (100 - v*0.7) + '%';
    uncFillVit.style.width = (30 + v*0.7) + '%';
    if(v < 35){
      uncCaption.textContent = "Position très précise → la vitesse devient presque impossible à connaître.";
    } else if (v > 65){
      uncCaption.textContent = "Vitesse très précise → c'est la position qui devient floue.";
    } else {
      uncCaption.textContent = "Un compromis entre les deux : aucune des deux grandeurs n'est jamais connue parfaitement en même temps.";
    }
  }
  uncSlider.addEventListener('input', updateUnc);
  updateUnc();

  /* ================= PLANCHE VI — DÉCOHÉRENCE (ACCORDÉON) ================= */
  const DECO = [
    {t:"1. Un système isolé reste en superposition", d:"Tant qu'une particule n'interagit avec rien d'autre, ses états superposés coexistent sans se « choisir »."},
    {t:"2. L'environnement s'en mêle", d:"Dès qu'elle interagit avec l'air, la lumière ambiante ou n'importe quelle autre particule, ces interactions emportent une partie de l'information quantique avec elles."},
    {t:"3. La cohérence se dilue", d:"L'information sur la superposition se disperse dans un nombre immense de particules environnantes — elle n'est jamais détruite, mais devient impossible à récupérer en pratique."},
    {t:"4. Le système se comporte « classiquement »", d:"Vu de l'extérieur, l'objet paraît avoir un état bien défini — exactement ce qu'on observe pour tout objet macroscopique, y compris un chat."},
  ];
  const decoAcc = document.getElementById('decoherenceAcc');
  decoAcc.innerHTML = DECO.map((d,i)=>`
    <div class="qm-acc-row" data-i="${i}">
      <div class="qm-acc-head"><span>${d.t}</span></div>
      <div class="qm-acc-body"><p>${d.d}</p></div>
    </div>`).join('');
  decoAcc.querySelectorAll('.qm-acc-row').forEach(row=>{
    const body = row.querySelector('.qm-acc-body');
    row.querySelector('.qm-acc-head').addEventListener('click', ()=>{
      const isOpen = row.classList.contains('active');
      decoAcc.querySelectorAll('.qm-acc-row').forEach(r=>{
        r.classList.remove('active');
        r.querySelector('.qm-acc-body').style.maxHeight = '0px';
      });
      if(!isOpen){
        row.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
  decoAcc.querySelector('.qm-acc-row').classList.add('active');
  decoAcc.querySelector('.qm-acc-body').style.maxHeight = decoAcc.querySelector('.qm-acc-body').scrollHeight + 'px';

  /* ================= PLANCHE VII — INTRICATION (FRISE) ================= */
  const ENTANGLE = [
    {date:'1935', nm:'Le paradoxe EPR', color:'var(--indigo)', desc:"Einstein, Podolsky et Rosen publient une expérience de pensée censée montrer que la mécanique quantique est incomplète&nbsp;: comment une mesure ici pourrait-elle influencer instantanément une particule là-bas&nbsp;? Einstein qualifiera cela d'« action fantomatique à distance »."},
    {date:'1964', nm:'Les inégalités de Bell', color:'var(--cyan)', desc:"John Bell propose un test mathématique permettant de trancher&nbsp;: si la nature suit les lois quantiques, certaines corrélations doivent dépasser ce qu'aucune théorie « locale et réaliste » ne peut expliquer."},
    {date:'1972-2022', nm:'Les confirmations expérimentales', color:'var(--violet)', desc:"Une série d'expériences, de plus en plus rigoureuses, confirme les prédictions quantiques et viole les inégalités de Bell — récompensées par le prix Nobel de physique 2022 (Aspect, Clauser, Zeilinger)."},
    {date:'Aujourd\u2019hui', nm:'Une ressource, pas qu\u2019un mystère', color:'var(--amber)', desc:"L'intrication est désormais un outil concret&nbsp;: cryptographie quantique, téléportation d'états quantiques, et brique de base des futurs ordinateurs quantiques."},
  ];
  const entangleTrack = document.getElementById('entangleTrack');
  entangleTrack.innerHTML = ENTANGLE.map((e,i)=>`
    <div class="entangle-node" data-i="${i}" style="background:${e.color}">
      <span class="en-date">${e.date}</span>${e.nm}
    </div>`).join('');
  const entangleDetail = document.getElementById('entangleDetail');
  function selectEntangle(i){
    const e = ENTANGLE[i];
    entangleTrack.querySelectorAll('.entangle-node').forEach(n=>n.classList.toggle('active', +n.dataset.i===i));
    entangleDetail.innerHTML = `<div class="nm">${e.nm}</div><p>${e.desc}</p>`;
  }
  entangleTrack.querySelectorAll('.entangle-node').forEach(n=>{
    n.addEventListener('click', ()=>selectEntangle(+n.dataset.i));
  });
  selectEntangle(0);

  /* ================= PLANCHE VIII — MODÈLE DE L'ATOME ================= */
  const svgBohr = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <circle cx="140" cy="90" r="10" fill="var(--amber)"/>
    <circle cx="140" cy="90" r="40" fill="none" stroke="var(--indigo)" stroke-width="1.5"/>
    <circle cx="140" cy="90" r="70" fill="none" stroke="var(--indigo)" stroke-width="1.5"/>
    <circle cx="180" cy="90" r="5" fill="var(--cyan)"/>
    <circle cx="70" cy="90" r="5" fill="var(--cyan)"/>
  </svg>`;
  const svgSchro = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <circle cx="140" cy="90" r="10" fill="var(--amber)"/>
    <ellipse cx="140" cy="90" rx="90" ry="34" fill="var(--cyan)" opacity="0.18"/>
    <ellipse cx="140" cy="90" rx="34" ry="70" fill="var(--violet)" opacity="0.18"/>
  </svg>`;
  const svgModern = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <circle cx="140" cy="90" r="10" fill="var(--amber)"/>
    <ellipse cx="140" cy="90" rx="100" ry="30" fill="var(--cyan)" opacity="0.12"/>
    <ellipse cx="140" cy="90" rx="30" ry="76" fill="var(--indigo)" opacity="0.12"/>
    <ellipse cx="140" cy="90" rx="70" ry="70" fill="var(--violet)" opacity="0.08"/>
  </svg>`;
  const ATOM = [
    {key:'bohr', svg:svgBohr, badge:'1913 — Niels Bohr', text:"Les électrons ne peuvent occuper que des orbites précises, à des distances « permises » du noyau — une première quantification qui colle enfin aux observations spectrales, sans encore d'explication profonde du pourquoi."},
    {key:'schrodinger', svg:svgSchro, badge:'1926 — Erwin Schrödinger', text:"Les orbites nettes laissent place à des nuages de probabilité&nbsp;: on ne peut plus dire où est l'électron, seulement où il a le plus de chances de se trouver."},
    {key:'modern', svg:svgModern, badge:'Aujourd\u2019hui', text:"Le modèle des orbitales est affiné et largement utilisé en chimie quantique&nbsp;: chaque forme (s, p, d…) correspond à une région de probabilité différente autour du noyau."},
  ];
  const atomTabsEl = document.querySelector('#p8 .qmtabs');
  setupTabGroup(atomTabsEl, document.getElementById('atomPanels'), ATOM);

  const ORBITALS = [
    {tag:'Orbitale s', front:'Sphérique', back:'Une forme de sphère centrée sur le noyau. Présente dans toutes les couches électroniques, à raison de 2 électrons maximum.', cls:'after-cyan'},
    {tag:'Orbitale p', front:'En double lobe', back:'Une forme en « haltère », orientée selon un des trois axes de l\u2019espace. Trois orbitales p par couche, 6 électrons maximum.', cls:'after-amber'},
    {tag:'Orbitale d', front:'En trèfle', back:'Des formes plus complexes, à quatre ou deux lobes selon l\u2019orientation. Cinq orbitales d par couche, jusqu\u2019à 10 électrons.', cls:'after-violet'},
  ];
  const orbitalGrid = document.getElementById('orbitalGrid');
  ORBITALS.forEach(o=>{
    const c = document.createElement('div');
    c.className = 'flipcard';
    c.innerHTML = `<div class="flipcard-inner">
      <div class="flipface flipfront"><span class="fc-tag">${o.tag}</span>${o.front}</div>
      <div class="flipface flipback ${o.cls}">${o.back}</div>
    </div>`;
    c.addEventListener('click', ()=>c.classList.toggle('flipped'));
    orbitalGrid.appendChild(c);
  });

  /* ================= PLANCHE IX — THÉORIE QUANTIQUE DES CHAMPS ================= */
  const FIELDS = [
    {id:'electro', nm:'Champ électromagnétique', particle:'Photon', color:'var(--cyan)',
      desc:"Ses vibrations sont les photons&nbsp;: la lumière elle-même. C'est le champ le plus anciennement compris, à la base de l'électrodynamique quantique."},
    {id:'electron', nm:'Champ électronique', particle:'Électron', color:'var(--indigo)',
      desc:"Chaque électron de l'univers est une excitation locale de ce même champ, qui existe partout — même là où il n'y a, pour l'instant, aucun électron."},
    {id:'higgs', nm:'Champ de Higgs', particle:'Boson de Higgs', color:'var(--amber)',
      desc:"Un champ qui remplit tout l'espace et donne leur masse aux particules qui interagissent avec lui. Son excitation, le boson de Higgs, a été détectée au CERN en 2012."},
    {id:'gluon', nm:'Champ de gluons', particle:'Gluon', color:'var(--violet)',
      desc:"Porte la force forte, qui maintient les quarks assemblés à l'intérieur des protons et des neutrons."},
  ];
  const fieldWrap = document.getElementById('fieldWrap');
  fieldWrap.innerHTML = FIELDS.map(f=>`
    <div class="field-node" data-id="${f.id}" style="border-color:${f.color}">
      ${f.nm}<span class="fn-particle" style="color:${f.color}">${f.particle}</span>
    </div>`).join('');
  const fieldDetail = document.getElementById('fieldDetail');
  function selectField(id){
    const f = FIELDS.find(x=>x.id===id);
    fieldWrap.querySelectorAll('.field-node').forEach(n=>n.classList.toggle('active', n.dataset.id===id));
    fieldDetail.innerHTML = `<div class="nm">${f.nm}</div><p>${f.desc}</p>`;
  }
  fieldWrap.querySelectorAll('.field-node').forEach(n=>{
    n.addEventListener('click', ()=>selectField(n.dataset.id));
  });
  selectField('electro');

  /* ================= PLANCHE X — APPLICATIONS ================= */
  const svgTransistor = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <rect x="80" y="50" width="120" height="80" fill="none" stroke="var(--ink)" stroke-width="2.5" rx="6"/>
    <line x1="80" y1="70" x2="40" y2="70" stroke="var(--ink)" stroke-width="2.5"/>
    <line x1="80" y1="110" x2="40" y2="110" stroke="var(--ink)" stroke-width="2.5"/>
    <line x1="200" y1="90" x2="240" y2="90" stroke="var(--ink)" stroke-width="2.5"/>
    <rect x="110" y="70" width="60" height="40" fill="var(--indigo)" opacity="0.25"/>
  </svg>`;
  const svgLaser = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <rect x="40" y="75" width="200" height="30" fill="none" stroke="var(--ink)" stroke-width="2.5" rx="6"/>
    <line x1="20" y1="90" x2="260" y2="90" stroke="var(--cyan)" stroke-width="3"/>
    <circle cx="60" cy="90" r="4" fill="var(--amber)"/>
    <circle cx="120" cy="90" r="4" fill="var(--amber)"/>
    <circle cx="180" cy="90" r="4" fill="var(--amber)"/>
  </svg>`;
  const svgIrm = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <circle cx="140" cy="90" r="60" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
    <circle cx="140" cy="90" r="34" fill="none" stroke="var(--violet)" stroke-width="2"/>
    <line x1="140" y1="30" x2="140" y2="150" stroke="var(--indigo)" stroke-width="1.5" stroke-dasharray="4 4"/>
  </svg>`;
  const svgQubit = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <circle cx="140" cy="90" r="55" fill="none" stroke="var(--ink)" stroke-width="2"/>
    <ellipse cx="140" cy="90" rx="55" ry="18" fill="none" stroke="var(--ink-3)" stroke-width="1"/>
    <circle cx="140" cy="35" r="5" fill="var(--cyan)"/>
    <circle cx="140" cy="145" r="5" fill="var(--amber)"/>
    <circle cx="176" cy="65" r="5" fill="var(--violet)"/>
  </svg>`;
  const APPS = [
    {key:'transistor', svg:svgTransistor, badge:'1947', text:"Le transistor repose sur les propriétés quantiques des semi-conducteurs&nbsp;: sans elles, ni ordinateur, ni smartphone.", ex:"Bardeen, Brattain et Shockley, laboratoires Bell."},
    {key:'laser', svg:svgLaser, badge:'1960', text:"Le laser produit une lumière cohérente en exploitant l'émission stimulée de photons, prédite par Einstein dès 1917.", ex:"Lecteurs optiques, chirurgie, télécommunications par fibre optique."},
    {key:'irm', svg:svgIrm, badge:'Imagerie médicale', text:"L'IRM exploite le spin quantique des noyaux d'hydrogène du corps humain, qui réagissent à un champ magnétique puissant.", ex:"Utilisée quotidiennement en imagerie médicale, sans aucune radiation ionisante."},
    {key:'qubit', svg:svgQubit, badge:'Aujourd\u2019hui', text:"Un ordinateur quantique utilise des qubits, capables d'être en superposition de 0 et de 1 à la fois — une piste pour résoudre certains calculs hors de portée des ordinateurs classiques.", ex:"Encore expérimental, mais en progrès rapide."},
  ];
  const appTabsEl = document.querySelector('#p10 .qmtabs');
  setupTabGroup(appTabsEl, document.getElementById('appPanels'), APPS);

  /* ================= PLANCHE XI — GRAVITÉ QUANTIQUE ================= */
  const svgCordes = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <path d="M40,90 C70,50 90,130 120,90 C150,50 170,130 200,90 C220,60 230,70 240,90" fill="none" stroke="var(--violet)" stroke-width="2.5"/>
  </svg>`;
  const svgBoucles = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <circle cx="110" cy="90" r="26" fill="none" stroke="var(--indigo)" stroke-width="2.5"/>
    <circle cx="150" cy="90" r="26" fill="none" stroke="var(--indigo)" stroke-width="2.5"/>
    <circle cx="190" cy="90" r="26" fill="none" stroke="var(--indigo)" stroke-width="2.5"/>
    <circle cx="130" cy="55" r="26" fill="none" stroke="var(--cyan)" stroke-width="2.5"/>
    <circle cx="170" cy="55" r="26" fill="none" stroke="var(--cyan)" stroke-width="2.5"/>
  </svg>`;
  const GRAVITY = [
    {key:'cordes', svg:svgCordes, badge:'Depuis les années 1970', text:"Propose que les particules élémentaires ne soient pas des points, mais de minuscules cordes vibrantes&nbsp;: chaque mode de vibration correspondrait à une particule différente. Nécessite des dimensions supplémentaires de l'espace, repliées à une échelle indétectable."},
    {key:'boucles', svg:svgBoucles, badge:'Depuis les années 1980-90', text:"Propose au contraire de quantifier directement l'espace-temps lui-même&nbsp;: à l'échelle de Planck, l'espace ne serait plus continu mais fait de minuscules « boucles » entrelacées, un tissage discret de la géométrie."},
  ];
  const gravityTabsEl = document.querySelector('#p11 .qmtabs');
  setupTabGroup(gravityTabsEl, document.getElementById('gravityPanels'), GRAVITY);

  /* ================= PLANCHE XII — LEXIQUE ================= */
  const LEX = [
    {t:'Quantum', d:'La plus petite quantité indivisible par laquelle une grandeur physique, comme l\u2019énergie, peut être échangée.'},
    {t:'Fonction d\u2019onde', d:'Outil mathématique qui décrit la probabilité de trouver une particule dans tel ou tel état.'},
    {t:'Superposition', d:'État dans lequel un système quantique existe simultanément dans plusieurs états possibles, avant toute mesure.'},
    {t:'Effondrement', d:'Le passage, au moment de la mesure, d\u2019une superposition de possibilités à un seul résultat observé.'},
    {t:'Décohérence', d:'La perte progressive des effets de superposition dès qu\u2019un système interagit avec son environnement.'},
    {t:'Intrication', d:'Lien quantique entre deux particules, tel que mesurer l\u2019une fixe instantanément le résultat corrélé sur l\u2019autre.'},
    {t:'Principe d\u2019incertitude', d:'Impossibilité fondamentale de connaître parfaitement, en même temps, certaines paires de grandeurs comme position et vitesse.'},
    {t:'Spin', d:'Une propriété quantique intrinsèque des particules, à mi-chemin entre une rotation et une orientation magnétique.'},
    {t:'Photon', d:'Le quantum du champ électromagnétique&nbsp;: le « grain » de lumière.'},
    {t:'Champ quantique', d:'Une entité qui remplit tout l\u2019espace, dont les vibrations localisées sont ce que nous appelons des particules.'},
    {t:'Qubit', d:'L\u2019unité d\u2019information d\u2019un ordinateur quantique, capable d\u2019être en superposition de 0 et de 1.'},
    {t:'Gravité quantique', d:'Le nom donné à la théorie, encore introuvable, qui devrait unifier la mécanique quantique et la relativité générale.'},
  ];
  const lexgrid = document.getElementById('lexgrid');
  LEX.forEach(l=>{
    const c = document.createElement('div');
    c.className = 'lexcard';
    c.innerHTML = `<div class="lexcard-inner">
      <div class="lexface lexfront">${l.t}</div>
      <div class="lexface lexback">${l.d}</div>
    </div>`;
    c.addEventListener('click', ()=>c.classList.toggle('flipped'));
    lexgrid.appendChild(c);
  });

});