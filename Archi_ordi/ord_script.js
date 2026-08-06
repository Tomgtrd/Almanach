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

	/* ================= HERO — TRACES DE CIRCUIT IMPRIMÉ ================= */
	const heroPaths = document.querySelectorAll('.hero-circuit path.trace');
	const heroPads = document.querySelectorAll('.hero-circuit circle.pad');
	heroPads.forEach(c => { c.style.opacity = 0; c.style.transition = 'opacity .5s ease'; });
	heroPaths.forEach((p, i) => {
		const len = p.getTotalLength();
		p.style.strokeDasharray = len;
		p.style.strokeDashoffset = len;
		p.style.transition = `stroke-dashoffset 1.1s cubic-bezier(.3,.6,.3,1) ${0.35 + i * 0.09}s`;
		requestAnimationFrame(() => requestAnimationFrame(() => { p.style.strokeDashoffset = 0; }));
	});
	setTimeout(() => {
		heroPads.forEach((c, i) => {
			setTimeout(() => { c.style.opacity = 1; c.classList.add('lit'); }, i * 90);
		});
	}, 1300);

	/* ================= PLANCHE I — FRISE HISTORIQUE CLIQUABLE ================= */
	const TIMELINE = [
		{
			id: 'babbage', date: '1834 – 1837', title: 'La machine de Babbage',
			text: "Charles Babbage invente la première machine à calculer programmable, en s'appuyant sur les travaux antérieurs de Blaise Pascal."
		},
		{
			id: 'turing', date: '1936 – 1944', title: 'Turing et Enigma',
			text: "Alan Turing formalise les « machines de Turing », puis contribue à briser le chiffrement Enigma des Allemands pendant la Seconde Guerre mondiale — aux origines de la cybersécurité."
		},
		{
			id: 'eniac', date: '1946', title: "L'ENIAC",
			text: "L'Electronic Numerical Integrator and Computer entre en service&nbsp;: le tout premier ordinateur entièrement électronique."
		},
		{
			id: 'vonneumann', date: '1948', title: 'Architecture Von Neumann',
			text: "Les premières machines construites selon le modèle de Von Neumann voient le jour&nbsp;: une mémoire unique pour les instructions et pour les données."
		},
		{
			id: 'pdp11', date: '~1970', title: 'Le PDP-11 et le langage C',
			text: "La société américaine DEC (Digital Equipment Corporation) développe le PDP-11. C'est sur cette machine qu'est créé le langage de programmation C."
		},
		{
			id: 'micro', date: '~1980', title: 'La micro-informatique familiale',
			text: "L'ordinateur personnel se démocratise et entre pour la première fois dans les foyers."
		},
		{
			id: 'mac', date: '~1990', title: 'Apple et le Macintosh',
			text: "Apple commercialise la ligne Power Macintosh, une étape clé de la micro-informatique grand public."
		},
		{
			id: 'smartphone', date: '~2000', title: 'Le smartphone',
			text: "Le smartphone se démocratise à son tour, plaçant un ordinateur complet dans la poche de tout le monde."
		},
		{
			id: 'quantique', date: '2021', title: 'Ordinateur quantique',
			text: "IBM inaugure son premier ordinateur quantique installé hors des États-Unis."
		},
	];

	const tlWrap = document.getElementById('timelineWrap');
	if (tlWrap) {
		const trackHtml = TIMELINE.map((t, i) => `
      <div class="timeline-node${i === 0 ? ' active' : ''}" data-id="${t.id}">
        <span class="tl-date">${t.date}</span>${t.title}
      </div>`).join('');
		tlWrap.innerHTML = `
      <div class="timeline-track" id="timelineTrack">${trackHtml}</div>
      <div class="timeline-detail" id="timelineDetail"></div>`;

		const detailEl = document.getElementById('timelineDetail');
		function selectTimeline(id) {
			const t = TIMELINE.find(x => x.id === id);
			tlWrap.querySelectorAll('.timeline-node').forEach(el => el.classList.toggle('active', el.dataset.id === id));
			detailEl.innerHTML = `<span class="tl-year-full">${t.date}</span><div class="nm">${t.title}</div><p>${t.text}</p>`;
		}
		tlWrap.querySelectorAll('.timeline-node').forEach(el => {
			el.addEventListener('click', () => selectTimeline(el.dataset.id));
		});
		selectTimeline(TIMELINE[0].id);
	}

	/* ================= PLANCHE II — ANATOMIE D'UN PC ================= */
	const PC_PARTS = [
		{
			id: 'cpu', nm: 'Le processeur (CPU)',
			desc: "Le cœur de la machine. Il exécute les instructions des programmes, une par une, à une cadence de plusieurs milliards de fois par seconde. On y revient en détail dans les planches VIII et IX."
		},
		{
			id: 'ram', nm: 'La RAM',
			desc: "La mémoire vive, où sont stockées temporairement les données que le processeur utilise dans l'instant. Très rapide, mais volatile&nbsp;: tout s'efface à l'extinction (planche V)."
		},
		{
			id: 'gpu', nm: 'La carte graphique',
			desc: "Calcule et affiche les images à l'écran. Indispensable pour les jeux et la 3D, et de plus en plus sollicitée pour l'intelligence artificielle."
		},
		{
			id: 'stockage', nm: 'Le disque dur / SSD',
			desc: "Le stockage permanent&nbsp;: système d'exploitation, logiciels, fichiers. Deux technologies s'affrontent ici — on les compare dans la planche suivante."
		},
		{
			id: 'cartemere', nm: 'La carte mère',
			desc: "La colonne vertébrale du PC. Elle relie tous les composants entre eux via le bus système, dont on détaille les rouages en planche IV."
		},
		{
			id: 'boitier', nm: 'Le boîtier',
			desc: "La structure qui protège et organise l'ensemble des composants, et assure leur ventilation."
		},
		{
			id: 'lecteurs', nm: 'Les lecteurs',
			desc: "Lecteurs et graveurs optiques (CD, DVD, Blu-ray) — de plus en plus rares sur les machines récentes, remplacés par le stockage en ligne et les clés USB."
		},
		{
			id: 'alimentation', nm: "L'alimentation",
			desc: "Convertit le courant du secteur en plusieurs tensions continues (12V, 5V, 3,3V…) utilisables par les composants internes."
		},
	];

	const pcSvgWrap = document.getElementById('pcSvgWrap');
	if (pcSvgWrap) {
		const pcLegend = document.getElementById('pcLegend');
		const pcDetail = document.getElementById('pcDetail');
		pcLegend.innerHTML = PC_PARTS.map(p => `<div class="pc-legend-item" data-id="${p.id}">${p.nm}</div>`).join('');

		function selectPcPart(id) {
			const part = PC_PARTS.find(x => x.id === id);
			pcSvgWrap.querySelectorAll('.pc-part').forEach(el => el.classList.toggle('selected', el.dataset.id === id));
			pcLegend.querySelectorAll('.pc-legend-item').forEach(el => el.classList.toggle('active', el.dataset.id === id));
			pcDetail.innerHTML = `<div class="nm">${part.nm}</div><p>${part.desc}</p>`;
		}
		pcSvgWrap.querySelectorAll('.pc-part').forEach(el => {
			el.addEventListener('click', () => selectPcPart(el.dataset.id));
		});
		pcLegend.querySelectorAll('.pc-legend-item').forEach(el => {
			el.addEventListener('click', () => selectPcPart(el.dataset.id));
		});
		selectPcPart('cpu');
	}

	/* ================= HELPER — GROUPE D'ONGLETS GÉNÉRIQUE ================= */
	function setupTabGroup(tabsEl, panelsEl, panels) {
		if (!tabsEl || !panelsEl) return;
		panelsEl.innerHTML = panels.map((p, i) => `
      <div class="ord-panel ${i === 0 ? 'active' : ''}" data-panel="${p.key}">
        <div class="ord-svg-wrap">${p.svg}</div>
        <div class="ord-panel-text">
          <span class="ord-badge">${p.badge}</span>
          <p>${p.text}</p>
        </div>
      </div>`).join('');
		const btns = Array.from(tabsEl.querySelectorAll('.ord-tab'));
		function activate(key) {
			btns.forEach(b => b.classList.toggle('active', b.dataset.tab === key));
			panelsEl.querySelectorAll('.ord-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === key));
		}
		btns.forEach(b => b.addEventListener('click', () => activate(b.dataset.tab)));
	}

	/* ================= PLANCHE III — HDD VS SSD ================= */
	const STORAGE_TABS = [
		{
			key: 'hdd', badge: 'Mécanique — depuis 50 ans',
			svg: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="54" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="3"/>
        <circle cx="80" cy="80" r="32" fill="none" stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 5"/>
        <circle cx="80" cy="80" r="10" fill="var(--paper-3)" stroke="var(--ink)" stroke-width="2"/>
        <line x1="80" y1="80" x2="128" y2="42" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <circle cx="128" cy="42" r="5" fill="var(--ink)"/>
      </svg>`,
			text: "Un disque dur (HDD) se compose d'un ou plusieurs disques rotatifs, lus par une tête de lecture mobile. Cette technologie existe depuis une cinquantaine d'années&nbsp;: peu chère aujourd'hui, elle équipe encore la majorité des ordinateurs."
		},
		{
			key: 'ssd', badge: 'Mémoire flash',
			svg: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="35" width="116" height="90" rx="8" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="3"/>
        <line x1="44" y1="35" x2="44" y2="125" stroke="var(--ink)" stroke-width="1.5"/>
        <line x1="66" y1="35" x2="66" y2="125" stroke="var(--ink)" stroke-width="1.5"/>
        <line x1="94" y1="35" x2="94" y2="125" stroke="var(--ink)" stroke-width="1.5"/>
        <line x1="116" y1="35" x2="116" y2="125" stroke="var(--ink)" stroke-width="1.5"/>
        <rect x="66" y="60" width="28" height="40" rx="3" fill="var(--paper-3)" stroke="var(--ink)" stroke-width="1.5"/>
      </svg>`,
			text: "Un SSD (Solid State Drive) utilise de la mémoire flash, sans aucune pièce mécanique&nbsp;: meilleure durabilité physique, performances bien supérieures — mais coût plus élevé, et une durée de vie limitée par le nombre d'écritures que peuvent encaisser ses cellules."
		},
	];
	setupTabGroup(document.getElementById('storageTabs'), document.getElementById('storagePanels'), STORAGE_TABS);

	/* ================= PLANCHE IV — LE BUS SYSTÈME ================= */
	const BUS_TABS = [
		{
			key: 'adresse', badge: 'Sens unique',
			svg: `<svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="arrA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,5 L0,10 z" fill="var(--cuivre)"/></marker></defs>
        <rect x="8" y="38" width="52" height="46" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="34" y="66" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700" fill="var(--ink)">CPU</text>
        <rect x="120" y="38" width="52" height="46" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="146" y="66" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="700" fill="var(--ink)">MÉM.</text>
        <line x1="62" y1="61" x2="114" y2="61" stroke="var(--cuivre)" stroke-width="3" marker-end="url(#arrA)"/>
      </svg>`,
			text: "Le bus d'adresse permet au processeur de désigner la case mémoire — ou le périphérique — auquel il veut accéder. Sa taille détermine l'espace adressable, selon la relation M&nbsp;=&nbsp;2<sup>N</sup>. Les tailles les plus courantes aujourd'hui sont 32 et 64 bits."
		},
		{
			key: 'donnees', badge: 'Bidirectionnel',
			svg: `<svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrD1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,5 L0,10 z" fill="var(--cuivre)"/></marker>
          <marker id="arrD2" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="7" markerHeight="7" orient="auto" markerUnits="userSpaceOnUse"><path d="M10,0 L0,5 L10,10 z" fill="var(--cuivre)"/></marker>
        </defs>
        <rect x="8" y="38" width="52" height="46" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="34" y="66" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700" fill="var(--ink)">CPU</text>
        <rect x="120" y="38" width="52" height="46" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="146" y="66" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="700" fill="var(--ink)">MÉM.</text>
        <line x1="62" y1="53" x2="114" y2="53" stroke="var(--cuivre)" stroke-width="3" marker-end="url(#arrD1)"/>
        <line x1="114" y1="70" x2="62" y2="70" stroke="var(--cuivre)" stroke-width="3" marker-end="url(#arrD2)"/>
      </svg>`,
			text: "Le bus de données transporte les données entre le processeur, la mémoire centrale et les contrôleurs de périphériques. Contrairement au bus d'adresse, il est bidirectionnel — sa largeur a varié, historiquement, de 1 à 128 bits selon les architectures."
		},
		{
			key: 'controle', badge: 'Signaux de commande',
			svg: `<svg viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="arrC" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,5 L0,10 z" fill="var(--cuivre)"/></marker></defs>
        <rect x="8" y="38" width="52" height="46" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="34" y="66" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700" fill="var(--ink)">CPU</text>
        <rect x="120" y="38" width="52" height="46" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="146" y="66" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="700" fill="var(--ink)">MÉM.</text>
        <line x1="62" y1="61" x2="114" y2="61" stroke="var(--cuivre)" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#arrC)"/>
        <text x="87" y="45" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" font-weight="700" fill="var(--ink-3)">R/W</text>
      </svg>`,
			text: "Le bus de contrôle véhicule les signaux de commande&nbsp;: le sens des transferts sur le bus de données (lecture ou écriture), ou le signal par lequel la mémoire indique qu'elle est prête à répondre."
		},
	];
	setupTabGroup(document.getElementById('busTabs'), document.getElementById('busPanels'), BUS_TABS);

	/* ================= PLANCHE V — VOLATILITÉ DE LA RAM ================= */
	const ramGrid = document.getElementById('ramGrid');
	const ramBtn = document.getElementById('ramToggleBtn');
	const ramStatus = document.getElementById('ramStatus');
	if (ramGrid && ramBtn) {
		for (let i = 0; i < 24; i++) {
			const cell = document.createElement('div');
			cell.className = 'ram-cell';
			ramGrid.appendChild(cell);
		}
		let powered = false;
		function setPowered(state) {
			powered = state;
			const cells = Array.from(ramGrid.children);
			if (powered) {
				cells.forEach((c, i) => setTimeout(() => c.classList.add('filled'), i * 22));
				ramStatus.textContent = "Sous tension — la RAM retient les données dont le processeur a besoin dans l'instant.";
				ramBtn.textContent = "Couper l'alimentation";
			} else {
				cells.forEach(c => c.classList.remove('filled'));
				ramStatus.textContent = "Coupure de courant — toutes les données de la RAM viennent de s'effacer. C'est ça, la volatilité.";
				ramBtn.textContent = "Rallumer la machine";
			}
		}
		ramBtn.addEventListener('click', () => setPowered(!powered));
		setPowered(true);
	}

	/* ================= PLANCHE VII — VON NEUMANN VS HARVARD ================= */
	const ARCH_TABS = [
		{
			key: 'vn', badge: '1945',
			svg: `<svg viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg">
        <rect x="65" y="10" width="50" height="34" rx="5" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="90" y="31" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="700" fill="var(--ink)">CPU</text>
        <line x1="90" y1="44" x2="90" y2="70" stroke="var(--cuivre)" stroke-width="3"/>
        <rect x="45" y="70" width="90" height="56" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="90" y="94" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" font-weight="700" fill="var(--ink)">MÉMOIRE</text>
        <text x="90" y="112" text-anchor="middle" font-family="Newsreader, serif" font-style="italic" font-size="9.5" fill="var(--ink-3)">instructions + données</text>
      </svg>`,
			text: "Un modèle d'ordinateur qui utilise une structure de stockage unique pour conserver à la fois les instructions et les données. C'est, de loin, l'architecture la plus répandue aujourd'hui."
		},
		{
			key: 'harvard', badge: '1944',
			svg: `<svg viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg">
        <rect x="65" y="52" width="50" height="34" rx="5" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="90" y="73" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="700" fill="var(--ink)">CPU</text>
        <line x1="65" y1="60" x2="20" y2="30" stroke="var(--cuivre)" stroke-width="3"/>
        <line x1="115" y1="60" x2="160" y2="30" stroke="var(--cuivre)" stroke-width="3"/>
        <rect x="2" y="4" width="70" height="34" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="37" y="18" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="var(--ink)">MÉM.</text>
        <text x="37" y="30" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="var(--ink)">PROGRAMME</text>
        <rect x="108" y="4" width="70" height="34" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="143" y="18" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="var(--ink)">MÉM.</text>
        <text x="143" y="30" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="var(--ink)">DONNÉES</text>
      </svg>`,
			text: "Conçue à Harvard, cette architecture sépare physiquement la mémoire de données et la mémoire programme, chacune accessible via son propre bus — ce qui permet, en théorie, d'y accéder simultanément."
		},
	];
	setupTabGroup(document.getElementById('archTabs'), document.getElementById('archPanels'), ARCH_TABS);

	/* ================= PLANCHE VIII — LE CŒUR DU CPU ================= */
	const CPU_PARTS = [
		{
			id: 'ual', nm: 'Unité de traitement (UAL)',
			desc: "Le cœur du microprocesseur. Elle regroupe les circuits qui exécutent les instructions&nbsp;: l'unité arithmétique et logique, l'unité de virgule flottante, et l'unité multimédia."
		},
		{
			id: 'controle', nm: 'Unité de contrôle (séquenceur)',
			desc: "Un circuit logique séquentiel qui génère les signaux pilotant l'ensemble du chemin de données. Les processeurs modernes utilisent des séquenceurs microprogrammés — trop complexes pour un séquenceur simplement câblé."
		},
		{
			id: 'memoire', nm: 'Mémoire (registres)',
			desc: "Sur les processeurs modernes, le contrôleur mémoire est intégré directement au processeur. Les registres, en particulier, sont de petites mémoires internes très rapides — le sujet de la planche suivante."
		},
		{
			id: 'es', nm: 'Entrées / Sorties',
			desc: "L'interface qui permet au processeur de communiquer avec le monde extérieur&nbsp;: clavier, écran, réseau, stockage…"
		},
	];
	const cpuSvgWrap = document.getElementById('cpuSvgWrap');
	if (cpuSvgWrap) {
		const cpuLegend = document.getElementById('cpuLegend');
		const cpuDetail = document.getElementById('cpuDetail');
		cpuLegend.innerHTML = CPU_PARTS.map(p => `<div class="pc-legend-item" data-id="${p.id}">${p.nm}</div>`).join('');
		function selectCpuPart(id) {
			const part = CPU_PARTS.find(x => x.id === id);
			cpuSvgWrap.querySelectorAll('.pc-part').forEach(el => el.classList.toggle('selected', el.dataset.id === id));
			cpuLegend.querySelectorAll('.pc-legend-item').forEach(el => el.classList.toggle('active', el.dataset.id === id));
			cpuDetail.innerHTML = `<div class="nm">${part.nm}</div><p>${part.desc}</p>`;
		}
		cpuSvgWrap.querySelectorAll('.pc-part').forEach(el => el.addEventListener('click', () => selectCpuPart(el.dataset.id)));
		cpuLegend.querySelectorAll('.pc-legend-item').forEach(el => el.addEventListener('click', () => selectCpuPart(el.dataset.id)));
		selectCpuPart('controle');
	}

	/* ================= PLANCHE IX — LES REGISTRES ================= */
	const REGISTERS = [
		{ t: 'Accumulateur', d: "Stocke les données traitées par l'UAL, l'unité arithmétique et logique." },
		{ t: 'Compteur ordinal', d: "Contient l'adresse mémoire de l'instruction en cours d'exécution — ou de la suivante." },
		{ t: 'Pointeur de pile', d: "Stocke l'adresse du sommet de la pile, une structure utilisée pour gérer les appels de sous-programmes." },
		{ t: "Registre d'instruction", d: "Stocke l'instruction actuellement en cours de traitement par le processeur." },
		{ t: "Registre d'état", d: "Composé de plusieurs bits appelés « drapeaux » (flags), il renseigne sur le résultat de la dernière instruction exécutée." },
		{ t: 'Registres généraux', d: "Servent à stocker les données en cours d'utilisation, pour économiser des allers-retours coûteux avec la mémoire." },
	];
	const regGrid = document.getElementById('regGrid');
	if (regGrid) {
		REGISTERS.forEach(r => {
			const c = document.createElement('div');
			c.className = 'lexcard';
			c.innerHTML = `<div class="lexcard-inner">
        <div class="lexface lexfront">${r.t}</div>
        <div class="lexface lexback">${r.d}</div>
      </div>`;
			c.addEventListener('click', () => c.classList.toggle('flipped'));
			regGrid.appendChild(c);
		});
	}

	/* ================= PLANCHE X — PYRAMIDE DES LANGAGES ================= */
	const LAYERS = [
		{
			id: 'haut', nm: 'Langage haut niveau', sub: 'Python, C++, Java…',
			desc: "Un langage qui fait abstraction des caractéristiques techniques du matériel — registres, drapeaux — pour utiliser des mots proches du langage naturel."
		},
		{
			id: 'c', nm: 'Le cas du C', sub: 'à la fois haut et bas niveau',
			desc: "Le langage C a la particularité d'être à la fois haut et bas niveau. Longtemps considéré comme un langage de haut niveau, il s'est progressivement rapproché du bas niveau à mesure que les langages modernes prenaient de la hauteur."
		},
		{
			id: 'asm', nm: 'Langage assembleur', sub: 'une instruction, une ligne',
			desc: "Une traduction, lisible par un humain, des instructions machine — propre à chaque architecture de processeur."
		},
		{
			id: 'machine', nm: 'Langage machine', sub: 'des suites de bits',
			desc: "La suite de bits directement interprétée par le processeur. C'est le seul langage qu'un processeur donné puisse réellement traiter."
		},
		{
			id: 'materiel', nm: 'Matériel (hardware)', sub: 'transistors, tensions',
			desc: "L'exécution physique&nbsp;: transistors, circuits, tensions électriques. Là où tout, finalement, se joue."
		},
	];
	const pyramidWrap = document.getElementById('pyramidWrap');
	if (pyramidWrap) {
		pyramidWrap.innerHTML = LAYERS.map(l => `<div class="pyramid-layer" data-id="${l.id}">${l.nm}</div>`).join('');
		const pyramidDetail = document.getElementById('pyramidDetail');
		function selectLayer(id) {
			const l = LAYERS.find(x => x.id === id);
			pyramidWrap.querySelectorAll('.pyramid-layer').forEach(el => el.classList.toggle('selected', el.dataset.id === id));
			pyramidDetail.innerHTML = `<div class="nm">${l.nm}</div><p>${l.desc}</p>`;
		}
		pyramidWrap.querySelectorAll('.pyramid-layer').forEach(el => el.addEventListener('click', () => selectLayer(el.dataset.id)));
		selectLayer('haut');
	}

	/* ================= PLANCHE XI — ÉTAPES DE LA COMPILATION ================= */
	const COMPILE_STEPS = [
		{ t: 'Prétraitement', d: "Intervient avant toute analyse, pour déterminer comment traiter les informations — inclusions de fichiers d'en-tête, macros…" },
		{ t: 'Analyse lexicale', d: "Découpe le code source en petits morceaux appelés tokens (jetons)&nbsp;: identifiants, symboles, mots-clés. On l'appelle aussi le lexing, ou balayage." },
		{ t: 'Analyse syntaxique', d: "Analyse la séquence de tokens pour reconnaître la structure du programme, et la transforme en arborescence (l'arbre de syntaxe abstraite, ou ASA), selon la grammaire formelle du langage." },
		{ t: 'Analyse sémantique', d: "Complète l'arborescence avec des informations sémantiques et érige la table des symboles. C'est de cette étape que proviennent la plupart des avertissements (warnings) du compilateur." },
		{ t: 'Modification du code source', d: "Le programme est transformé en code « intermédiaire », à mi-chemin entre le code source et le binaire — utilisé pour l'optimisation." },
		{ t: 'Allocation de registres', d: "Choix des registres du processeur où seront stockées les variables pendant l'exécution. Les registres étant limités, le compilateur choisit les variables les plus critiques." },
		{ t: 'Édition des liens', d: "Le linker assemble les différents fichiers objets et bibliothèques pour produire le programme exécutable final." },
	];
	const compileAccordion = document.getElementById('compileAccordion');
	if (compileAccordion) {
		compileAccordion.innerHTML = COMPILE_STEPS.map((s, i) => `
      <div class="ord-acc-row${i === 0 ? ' active' : ''}">
        <div class="ord-acc-head"><span><span class="step-num">${i + 1}.</span>${s.t}</span><span class="chevron">⌄</span></div>
        <div class="ord-acc-body"><p>${s.d}</p></div>
      </div>`).join('');
		const rows = Array.from(compileAccordion.querySelectorAll('.ord-acc-row'));
		function setAccRowOpen(row, open) {
			row.classList.toggle('active', open);
			const body = row.querySelector('.ord-acc-body');
			body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
		}
		rows.forEach(row => {
			const head = row.querySelector('.ord-acc-head');
			head.addEventListener('click', () => {
				const willOpen = !row.classList.contains('active');
				rows.forEach(r => setAccRowOpen(r, false));
				if (willOpen) setAccRowOpen(row, true);
			});
		});
		setAccRowOpen(rows[0], true);
	}

	/* ================= PLANCHE XII — HIÉRARCHIE DU CACHE ================= */
	const CACHE_LAYERS = [
		{
			id: 'ram', nm: 'RAM', rOuter: 138, taille: 'Plusieurs Go à To', vitesse: 'Lente (relativement)', loc: 'Barrettes sur la carte mère',
			desc: "La mémoire vive proprement dite&nbsp;: bien plus grande que le cache, mais nettement plus lente à solliciter."
		},
		{
			id: 'l3', nm: 'Cache L3', rOuter: 106, taille: 'Quelques Mo à quelques dizaines de Mo', vitesse: 'Rapide', loc: 'Processeur — mise en commun entre cœurs',
			desc: "Moins rapide que L1 et L2, mais doté d'une capacité plus élevée. Sur les architectures multicœurs, il est mis en commun entre tous les cœurs, alors que chacun dispose de ses propres L1 et L2."
		},
		{
			id: 'l2', nm: 'Cache L2', rOuter: 76, taille: 'Quelques centaines de Ko à quelques Mo', vitesse: 'Très rapide', loc: 'Processeur, ou carte mère via bus rapide',
			desc: "Une capacité plus importante que L1, intégrée au processeur ou reliée à lui par une liaison haute vitesse."
		},
		{
			id: 'l1', nm: 'Cache L1', rOuter: 48, taille: 'Quelques dizaines de Ko', vitesse: 'Extrêmement rapide', loc: 'Intégré au processeur',
			desc: "Le niveau de cache le plus rapide, directement intégré au processeur — mais aussi le plus petit en capacité."
		},
		{
			id: 'cpu', nm: 'CPU', rOuter: 24, taille: '—', vitesse: 'Référence', loc: 'Cœur du processeur',
			desc: "Le processeur lui-même&nbsp;: c'est lui qui sollicite le cache, puis la RAM, pour obtenir les données et instructions dont il a besoin."
		},
	];
	const cacheSvgWrap = document.getElementById('cacheSvgWrap');
	if (cacheSvgWrap) {
		let cacheSvg = `<svg class="cache-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">`;
		CACHE_LAYERS.forEach((l, i) => {
			const shade = ['var(--paper-3)', 'var(--gris-silicium-lt)', 'var(--gris-silicium)', 'var(--ink-3)', 'var(--ink)'][i];
			cacheSvg += `<circle class="cache-part" data-id="${l.id}" cx="150" cy="150" r="${l.rOuter}" fill="${shade}" stroke="var(--ink)" stroke-width="1.5"/>`;
		});
		cacheSvg += `</svg>`;
		cacheSvgWrap.innerHTML = cacheSvg;
		// wrap each circle in its own clickable group is unnecessary; select by data-id directly
		const cacheLegend = document.getElementById('cacheLegend');
		cacheLegend.innerHTML = CACHE_LAYERS.map((l, i) => {
			const shade = ['var(--paper-3)', 'var(--gris-silicium-lt)', 'var(--gris-silicium)', 'var(--ink-3)', 'var(--ink)'][i];
			return `<div class="cache-legend-item" data-id="${l.id}"><span class="sw" style="background:${shade}"></span>${l.nm}</div>`;
		}).join('');
		const cacheDetail = document.getElementById('cacheDetail');
		function selectCache(id) {
			const l = CACHE_LAYERS.find(x => x.id === id);
			cacheSvgWrap.querySelectorAll('.cache-part').forEach(el => el.classList.toggle('selected', el.dataset.id === id));
			cacheLegend.querySelectorAll('.cache-legend-item').forEach(el => el.classList.toggle('active', el.dataset.id === id));
			cacheDetail.innerHTML = `<div class="nm">${l.nm}</div>
        <div class="stat-row">
          <div><b>${l.taille}</b>taille</div>
          <div><b>${l.vitesse}</b>vitesse</div>
          <div><b>${l.loc}</b>emplacement</div>
        </div>
        <p>${l.desc}</p>`;
		}
		cacheSvgWrap.querySelectorAll('.cache-part').forEach(el => el.addEventListener('click', () => selectCache(el.dataset.id)));
		cacheLegend.querySelectorAll('.cache-legend-item').forEach(el => el.addEventListener('click', () => selectCache(el.dataset.id)));
		selectCache('l1');
	}

	/* ================= PLANCHE XIII — SYSTÈME D'EXPLOITATION ================= */
	const OS_TABS = [
		{
			key: 'noyau', badge: 'Le cœur du système',
			svg: `<svg viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="8" width="100" height="30" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="90" y="27" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" font-weight="700" fill="var(--ink)">APPLICATIONS</text>
        <line x1="90" y1="38" x2="90" y2="52" stroke="var(--cuivre)" stroke-width="3"/>
        <rect x="55" y="52" width="70" height="34" rx="6" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="90" y="73" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" font-weight="700" fill="var(--paper)">NOYAU</text>
        <line x1="90" y1="86" x2="90" y2="100" stroke="var(--cuivre)" stroke-width="3"/>
        <rect x="40" y="100" width="100" height="30" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="90" y="119" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="10" font-weight="700" fill="var(--ink)">MATÉRIEL</text>
      </svg>`,
			text: "Le noyau (kernel) gère les ressources de l'ordinateur et permet aux composants matériels et logiciels de communiquer entre eux&nbsp;: chargement et exécution des processus, gestion de la mémoire, ordonnancement des tâches, communication inter-processus."
		},
		{
			key: 'pilotes', badge: 'Le traducteur du matériel',
			svg: `<svg viewBox="0 0 180 140" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="arrOS" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,5 L0,10 z" fill="var(--cuivre)"/></marker></defs>
        <rect x="4" y="52" width="46" height="36" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="27" y="74" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="9" font-weight="700" fill="var(--ink)">PÉRIPH.</text>
        <line x1="50" y1="70" x2="72" y2="70" stroke="var(--cuivre)" stroke-width="3" marker-end="url(#arrOS)"/>
        <rect x="72" y="52" width="46" height="36" rx="6" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="95" y="74" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="9" font-weight="700" fill="var(--paper)">PILOTE</text>
        <line x1="118" y1="70" x2="140" y2="70" stroke="var(--cuivre)" stroke-width="3" marker-end="url(#arrOS)"/>
        <rect x="140" y="52" width="36" height="36" rx="6" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="2.5"/>
        <text x="158" y="74" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="9" font-weight="700" fill="var(--ink)">OS</text>
      </svg>`,
			text: "Un pilote (driver) assure la liaison entre l'ordinateur et un périphérique&nbsp;: imprimante, webcam, scanner… Certains périphériques doivent être reconnus par le système pour fonctionner correctement — le pilote lui apporte les informations nécessaires."
		},
	];
	setupTabGroup(document.getElementById('osTabs'), document.getElementById('osPanels'), OS_TABS);

});