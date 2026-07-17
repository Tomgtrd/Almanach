document.addEventListener("DOMContentLoaded", () => {
	/* ================= REVEAL ON SCROLL ================= */
	const revealEls = document.querySelectorAll(".reveal");
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
	);
	revealEls.forEach((el) => io.observe(el));

	/* ================= DOT NAV ================= */
	const sections = Array.from(document.querySelectorAll("main .plate"));
	const dotnav = document.getElementById("dotnav");
	sections.forEach((sec) => {
		const a = document.createElement("a");
		a.href = "#" + sec.id;
		const tip = document.createElement("span");
		tip.className = "tip";
		tip.textContent = sec.dataset.title || sec.id;
		a.appendChild(tip);
		dotnav.appendChild(a);
	});
	const dots = Array.from(dotnav.querySelectorAll("a"));
	const navIO = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				const idx = sections.indexOf(e.target);
				if (e.isIntersecting && dots[idx]) {
					dots.forEach((d) => d.classList.remove("active"));
					dots[idx].classList.add("active");
				}
			});
		},
		{ threshold: 0.5 },
	);
	sections.forEach((s) => navIO.observe(s));

	/* ================= HERO STRATA ENTRANCE ================= */
	const heroRects = document.querySelectorAll(".hero-strata rect");
	heroRects.forEach((r) => {
		r.style.opacity = 0;
		r.style.transition = "opacity .7s ease, transform .7s ease";
		r.style.transform = "translateY(12px)";
	});
	setTimeout(() => {
		heroRects.forEach((r, i) => {
			setTimeout(() => {
				r.style.opacity = 1;
				r.style.transform = "translateY(0)";
			}, i * 110);
		});
	}, 300);

	/* ================= PLANCHE II — COUCHES INTERNES DE LA TERRE ================= */
	const EARTH_LAYERS = [
		{
			id: "croute",
			nm: "Croûte terrestre",
			color: "var(--l-croute)",
			rOuter: 140,
			epaisseur: "5 à 70 km",
			temp: "0 à 1 000 °C",
			etat: "Solide",
			desc: "La fine peau rocheuse sur laquelle nous vivons. Océanique (basaltique, 5 à 10 km) ou continentale (granitique, jusqu'à 70 km sous les grandes chaînes de montagnes).",
		},
		{
			id: "manteau",
			nm: "Manteau",
			color: "var(--l-manteau)",
			rOuter: 122,
			epaisseur: "~2 900 km",
			temp: "1 000 à 3 700 °C",
			etat: "Solide, mais visqueux",
			desc: "Représente à lui seul environ 84 % du volume de la Terre. Sa partie supérieure, plus molle, permet aux plaques tectoniques de glisser lentement dessus.",
		},
		{
			id: "externe",
			nm: "Noyau externe",
			color: "var(--l-externe)",
			rOuter: 68,
			epaisseur: "~2 260 km",
			temp: "3 700 à 5 000 °C",
			etat: "Liquide (fer et nickel en fusion)",
			desc: "Ses mouvements de convection génèrent le champ magnétique terrestre, qui nous protège en permanence du vent solaire.",
		},
		{
			id: "interne",
			nm: "Noyau interne",
			color: "var(--l-interne)",
			rOuter: 34,
			epaisseur: "~1 220 km de rayon",
			temp: "~5 400 °C",
			etat: "Solide (la pression empêche la fusion malgré la chaleur)",
			desc: "Aussi chaud que la surface du Soleil. Il grossit très lentement, à mesure que le noyau externe se solidifie peu à peu.",
		},
	];
	const earthwrap = document.getElementById("earthwrap");
	let earthSvg = `<svg class="earth-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">`;
	EARTH_LAYERS.forEach((l) => {
		earthSvg += `<circle data-id="${l.id}" cx="150" cy="150" r="${l.rOuter}" fill="${l.color}"/>`;
	});
	earthSvg += `</svg>`;
	const legendHtml = EARTH_LAYERS.map(
		(l) => `
    <div class="earth-legend-item" data-id="${l.id}">
      <span class="sw" style="background:${l.color}"></span>
      <span class="nm">${l.nm}</span>
    </div>`,
	).join("");
	earthwrap.innerHTML = `${earthSvg}<div class="earth-legend">${legendHtml}</div>`;

	const earthDetail = document.getElementById("earthDetail");
	function selectEarthLayer(id) {
		const l = EARTH_LAYERS.find((x) => x.id === id);
		earthwrap
			.querySelectorAll("circle")
			.forEach((c) => c.classList.toggle("selected", c.dataset.id === id));
		earthwrap
			.querySelectorAll(".earth-legend-item")
			.forEach((el) => el.classList.toggle("active", el.dataset.id === id));
		earthDetail.classList.remove("placeholder");
		earthDetail.innerHTML = `<div class="nm">${l.nm}</div>
      <div class="stat-row">
        <div><b>${l.epaisseur}</b>épaisseur</div>
        <div><b>${l.temp}</b>température</div>
        <div><b>${l.etat}</b>état</div>
      </div>
      <p>${l.desc}</p>`;
	}
	earthwrap.querySelectorAll("circle").forEach((c) => {
		c.addEventListener("click", () => selectEarthLayer(c.dataset.id));
	});
	earthwrap.querySelectorAll(".earth-legend-item").forEach((el) => {
		el.addEventListener("click", () => selectEarthLayer(el.dataset.id));
	});
	selectEarthLayer("croute");

	/* ================= PLANCHE III — COLONNE STRATIGRAPHIQUE ================= */
	// Ordre du plus ANCIEN (bas) au plus RÉCENT (haut) — le CSS (column-reverse) inverse l'affichage
	const STRATA = [
		{
			nm: "Socle du Vishnu",
			color: "#4a4550",
			age: "~1 700 Ma — Précambrien",
			rk: "Roche métamorphique",
			desc: "Racines d'anciennes montagnes, formées en profondeur puis mises à nu par l'érosion. Sépare une discordance de 1,2 milliard d'années avec la couche suivante.",
		},
		{
			nm: "Grès de Tapeats",
			color: "#8a7355",
			age: "~525 Ma — Cambrien",
			rk: "Roche sédimentaire (grès)",
			desc: "Dépôt d'un ancien rivage marin peu profond, quand la mer a envahi le continent au Cambrien.",
		},
		{
			nm: "Calcaire de Redwall",
			color: "#9c4a3a",
			age: "~340 Ma — Carbonifère",
			rk: "Roche sédimentaire (calcaire)",
			desc: "Formé dans un océan tropical peu profond, riche en fossiles marins. Sa couleur rouge vient en fait d'oxyde de fer qui a coulé depuis les couches situées au-dessus.",
		},
		{
			nm: "Groupe de Supai",
			color: "#b5602d",
			age: "~315-285 Ma — Pennsylvanien-Permien",
			rk: "Grès et shale",
			desc: "Alternance de dépôts de plaines côtières et de deltas, témoins d'un niveau marin qui monte et descend.",
		},
		{
			nm: "Shale de Hermit",
			color: "#c1573f",
			age: "~280 Ma — Permien",
			rk: "Roche sédimentaire (shale)",
			desc: "Boues rouges déposées sur une vaste plaine inondable, avant l'arrivée du désert qui suivra.",
		},
		{
			nm: "Grès de Coconino",
			color: "#e8d9a0",
			age: "~275 Ma — Permien",
			rk: "Roche sédimentaire (grès éolien)",
			desc: "D'anciennes dunes de désert fossilisées. On y trouve encore aujourd'hui des traces de pas de reptiles, figées depuis 275 millions d'années.",
		},
		{
			nm: "Calcaire de Kaibab",
			color: "#d9c9a3",
			age: "~270 Ma — Permien",
			rk: "Roche sédimentaire (calcaire)",
			desc: "La couche la plus récente, celle qui forme aujourd'hui le sommet du plateau — un ancien océan peu profond, tout comme le Redwall en dessous.",
		},
	];
	const stratStack = document.getElementById("stratStack");
	STRATA.forEach((s, i) => {
		const div = document.createElement("div");
		div.className = "strat-layer";
		div.dataset.i = i;
		div.style.background = s.color;
		div.style.color = i <= 2 ? "#f1ead9" : "#1e2430";
		div.textContent = s.nm;
		stratStack.appendChild(div);
	});
	const stratDetail = document.getElementById("stratDetail");
	function selectStrat(i) {
		const s = STRATA[i];
		stratStack
			.querySelectorAll(".strat-layer")
			.forEach((l) => l.classList.toggle("active", +l.dataset.i === i));
		stratDetail.innerHTML = `<div class="rk">${s.rk}</div><div class="nm">${s.nm}</div><div class="rk" style="color:var(--slate);">${s.age}</div><p style="margin-top:10px;">${s.desc}</p>`;
	}
	stratStack.querySelectorAll(".strat-layer").forEach((l) => {
		l.addEventListener("click", () => selectStrat(+l.dataset.i));
	});
	selectStrat(STRATA.length - 1);

	/* ================= PLANCHE IV — ÈRES GÉOLOGIQUES ================= */
	const deepBar = document.getElementById("deepBar");
	deepBar.innerHTML = `
    <div class="seg" style="flex:88.2; background:var(--e-precambrien);" title="Précambrien"></div>
    <div class="seg" style="flex:11.8; background:var(--e-cambrien);" title="Phanérozoïque"></div>
  `;

	const PERIODS = [
		{
			nm: "Cambrien",
			color: "var(--e-cambrien)",
			dur: 56,
			dates: "−541 à −485 Ma",
			desc: "« L'explosion cambrienne »&nbsp;: en quelques millions d'années, la plupart des grands groupes animaux actuels apparaissent.",
		},
		{
			nm: "Ordovicien",
			color: "var(--e-ordovicien)",
			dur: 41,
			dates: "−485 à −444 Ma",
			desc: "Diversification des invertébrés marins et premiers poissons sans mâchoire.",
			extinction:
				"Extinction de l'Ordovicien-Silurien (~444 Ma) — 2ᵉ plus grave de l'histoire.",
		},
		{
			nm: "Silurien",
			color: "var(--e-silurien)",
			dur: 25,
			dates: "−444 à −419 Ma",
			desc: "Premières plantes vasculaires et premiers animaux à conquérir la terre ferme.",
		},
		{
			nm: "Dévonien",
			color: "var(--e-devonien)",
			dur: 60,
			dates: "−419 à −359 Ma",
			desc: "« L'ère des poissons »&nbsp;: apparition des premiers tétrapodes, ancêtres de tous les vertébrés terrestres.",
			extinction: "Extinction du Dévonien supérieur (~372 Ma).",
		},
		{
			nm: "Carbonifère",
			color: "var(--e-carbonifere)",
			dur: 60,
			dates: "−359 à −299 Ma",
			desc: "Immenses forêts marécageuses qui formeront plus tard le charbon. Insectes géants grâce à un air très riche en oxygène.",
		},
		{
			nm: "Permien",
			color: "var(--e-permien)",
			dur: 47,
			dates: "−299 à −252 Ma",
			desc: "Tous les continents sont réunis en un seul, la Pangée.",
			extinction:
				"« La Grande Extinction » (~252 Ma) — jusqu'à 96 % des espèces marines disparaissent. La plus grave de l'histoire.",
		},
		{
			nm: "Trias",
			color: "var(--e-trias)",
			dur: 51,
			dates: "−252 à −201 Ma",
			desc: "La vie se reconstruit lentement après la Grande Extinction&nbsp;: premiers dinosaures et premiers mammifères.",
			extinction:
				"Extinction Trias-Jurassique (~201 Ma), qui ouvre la voie aux dinosaures.",
		},
		{
			nm: "Jurassique",
			color: "var(--e-jurassique)",
			dur: 56,
			dates: "−201 à −145 Ma",
			desc: "L'âge d'or des dinosaures géants et apparition des premiers oiseaux.",
		},
		{
			nm: "Crétacé",
			color: "var(--e-cretace)",
			dur: 79,
			dates: "−145 à −66 Ma",
			desc: "Apparition des plantes à fleurs. Les dinosaures dominent jusqu'à la fin de la période.",
			extinction:
				"Extinction Crétacé-Paléogène (~66 Ma) — l'astéroïde de Chicxulub met fin au règne des dinosaures non-aviens.",
		},
		{
			nm: "Paléogène",
			color: "var(--e-paleogene)",
			dur: 43,
			dates: "−66 à −23 Ma",
			desc: "Radiation rapide des mammifères, qui occupent les niches laissées vides par les dinosaures.",
		},
		{
			nm: "Néogène",
			color: "var(--e-neogene)",
			dur: 20.4,
			dates: "−23 à −2,6 Ma",
			desc: "Refroidissement global et apparition des premiers hominidés bipèdes en Afrique.",
		},
		{
			nm: "Quaternaire",
			color: "var(--e-quaternaire)",
			dur: 2.6,
			dates: "−2,6 Ma à aujourd'hui",
			desc: "Alternance de glaciations. Apparition puis expansion d'Homo sapiens, il y a environ 300 000 ans.",
		},
	];
	const erasTrack = document.getElementById("erasTrack");
	PERIODS.forEach((p, i) => {
		const seg = document.createElement("div");
		seg.className = "era-seg";
		seg.dataset.i = i;
		seg.style.flex = p.dur;
		seg.style.background = p.color;
		seg.textContent = p.nm;
		erasTrack.appendChild(seg);
	});
	const eraDetail = document.getElementById("eraDetail");
	function selectEra(i) {
		const p = PERIODS[i];
		erasTrack
			.querySelectorAll(".era-seg")
			.forEach((s) => s.classList.toggle("active", +s.dataset.i === i));
		eraDetail.innerHTML = `<div class="rk">Période</div><div class="nm">${p.nm}</div><div class="dates">${p.dates}</div><p>${p.desc}</p>${p.extinction ? `<div class="extinction-tag">✕ ${p.extinction}</div>` : ""}`;
	}
	erasTrack.querySelectorAll(".era-seg").forEach((s) => {
		s.addEventListener("click", () => selectEra(+s.dataset.i));
	});
	selectEra(0);

	/* ================= PLANCHE V — CYCLE DES ROCHES ================= */
	const ROCKS = [
		{
			id: "magmatique",
			nm: "Roche magmatique",
			pos: [150, 55],
			formation:
				"Refroidissement et solidification du magma (en profondeur) ou de la lave (en surface).",
			examples: "Granite, basalte, obsidienne",
			desc: "Selon la vitesse de refroidissement, les cristaux ont plus ou moins de temps pour grandir&nbsp;: refroidissement lent en profondeur (granite, gros cristaux visibles) ou rapide en surface (basalte, cristaux minuscules).",
		},
		{
			id: "sedimentaire",
			nm: "Roche sédimentaire",
			pos: [65, 235],
			formation:
				"Accumulation, compaction puis cimentation de sédiments (débris de roches érodées, restes d'organismes).",
			examples: "Calcaire, grès, argile",
			desc: "Se dépose en couches horizontales successives — ce sont elles qui forment les strates, et qui conservent le plus souvent les fossiles.",
		},
		{
			id: "metamorphique",
			nm: "Roche métamorphique",
			pos: [235, 235],
			formation:
				"Transformation d'une roche existante sous l'effet de la chaleur et/ou de la pression, sans fusion complète.",
			examples: "Marbre (à partir de calcaire), schiste, gneiss",
			desc: "Se forme en profondeur, souvent lors de la formation des chaînes de montagnes, quand deux plaques se compriment l'une contre l'autre.",
		},
	];
	const rockSvgWrap = document.getElementById("rockSvgWrap");
	let rockSvg = `<svg class="rock-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead-geo" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-3)"/>
      </marker>
    </defs>
    <path class="arrow-path" d="M135,70 C90,120 75,160 68,215"/>
    <path class="arrow-path" d="M100,240 C140,255 160,255 200,240"/>
    <path class="arrow-path" d="M232,215 C225,160 210,120 165,70"/>
  `;
	ROCKS.forEach((r) => {
		rockSvg += `<g class="node" data-id="${r.id}">
      <circle cx="${r.pos[0]}" cy="${r.pos[1]}" r="52" fill="var(--paper)"/>
      <text x="${r.pos[0]}" y="${r.pos[1] - 4}" text-anchor="middle">${r.nm.replace("Roche ", "")}</text>
    </g>`;
	});
	rockSvg += `</svg>`;
	rockSvgWrap.innerHTML = rockSvg;

	const rockDetail = document.getElementById("rockDetail");
	function selectRock(id) {
		const r = ROCKS.find((x) => x.id === id);
		rockSvgWrap
			.querySelectorAll(".node")
			.forEach((n) => n.classList.toggle("selected", n.dataset.id === id));
		rockDetail.innerHTML = `<div class="nm">${r.nm}</div><p><b>Formation&nbsp;:</b> ${r.formation}</p><p>${r.desc}</p><div class="ex">Exemples&nbsp;: ${r.examples}</div>`;
	}
	rockSvgWrap.querySelectorAll(".node").forEach((n) => {
		n.addEventListener("click", () => selectRock(n.dataset.id));
	});
	selectRock("magmatique");

	/* ================= PLANCHE VI — TECTONIQUE DES PLAQUES ================= */
	const svgDiv = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <rect x="10" y="70" width="110" height="30" fill="var(--l-croute)"/>
    <rect x="160" y="70" width="110" height="30" fill="var(--l-croute)"/>
    <path d="M140,100 L140,140 L120,160 M140,140 L160,160" fill="none" stroke="var(--wine)" stroke-width="3"/>
    <path d="M100,60 L70,60" stroke="var(--ink)" stroke-width="3" marker-end="url(#arrowhead-geo)"/>
    <path d="M180,60 L210,60" stroke="var(--ink)" stroke-width="3" marker-end="url(#arrowhead-geo)"/>
    <text x="140" y="40" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="700" fill="var(--ink)">magma qui remonte</text>
  </svg>`;
	const svgConv = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <rect x="10" y="80" width="120" height="26" fill="var(--l-croute)"/>
    <path d="M130,106 L200,150 L200,170 L130,140 Z" fill="var(--l-manteau)"/>
    <rect x="180" y="60" width="90" height="26" fill="var(--l-croute)"/>
    <path d="M60,93 L115,93" stroke="var(--ink)" stroke-width="3" marker-end="url(#arrowhead-geo)"/>
	<path d="M245,73 L195,73" stroke="var(--ink)" stroke-width="3" marker-end="url(#arrowhead-geo)"/>
    <text x="140" y="30" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="700" fill="var(--ink)">subduction</text>
  </svg>`;
	const svgTrans = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
    <rect x="10" y="60" width="260" height="26" fill="var(--l-croute)"/>
    <rect x="10" y="94" width="260" height="26" fill="var(--l-manteau)"/>
    <path d="M60,73 L90,73" stroke="var(--ink)" stroke-width="3" marker-end="url(#arrowhead-geo)"/>
    <path d="M220,107 L190,107" stroke="var(--ink)" stroke-width="3" marker-end="url(#arrowhead-geo)"/>
    <text x="140" y="45" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="700" fill="var(--ink)">glissement horizontal</text>
  </svg>`;

	const TECTO = [
		{
			key: "div",
			svg: svgDiv,
			badge: "Dorsale / rift",
			text: "Deux plaques s'écartent, le magma remonte pour combler l'espace et forme une <b>nouvelle croûte océanique</b>.",
			ex: "Dorsale médio-atlantique, rift est-africain.",
		},
		{
			key: "conv",
			svg: svgConv,
			badge: "Subduction / collision",
			text: "Deux plaques se rapprochent&nbsp;: la plus dense <b>plonge sous</b> l'autre (subduction), ou les deux se compriment pour former des montagnes (collision).",
			ex: "Cordillère des Andes, chaîne de l'Himalaya.",
		},
		{
			key: "trans",
			svg: svgTrans,
			badge: "Faille coulissante",
			text: "Deux plaques <b>glissent horizontalement</b> l'une contre l'autre, sans se rapprocher ni s'éloigner — souvent source de forts séismes.",
			ex: "Faille de San Andreas, en Californie.",
		},
	];
	const tectoPanels = document.getElementById("tectoPanels");
	tectoPanels.innerHTML = TECTO.map(
		(t, i) => `
    <div class="tecto-panel ${i === 0 ? "active" : ""}" data-panel="${t.key}">
      <div class="tecto-svg-wrap">${t.svg}</div>
      <div>
        <span class="tecto-verdict">${t.badge}</span>
        <p>${t.text}</p>
        <p style="font-size:13.5px; color:var(--ink-3);"><b>Exemple&nbsp;:</b> ${t.ex}</p>
      </div>
    </div>`,
	).join("");
	document.querySelectorAll(".ttab").forEach((btn) => {
		btn.addEventListener("click", () => {
			document
				.querySelectorAll(".ttab")
				.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");
			document
				.querySelectorAll(".tecto-panel")
				.forEach((p) => p.classList.remove("active"));
			document
				.querySelector(`.tecto-panel[data-panel="${btn.dataset.tab}"]`)
				.classList.add("active");
		});
	});

	/* ================= PLANCHE VII — LEXIQUE ================= */
	const LEX = [
		{
			t: "Strate",
			d: "Couche de roche ou de sédiment, distincte de celles au-dessus et en dessous.",
		},
		{
			t: "Discordance",
			d: "Interruption dans une séquence de strates, signe d'une période d'érosion ou d'absence de dépôt.",
		},
		{
			t: "Principe de superposition",
			d: "Dans une pile de strates non déformée, les couches du bas sont plus anciennes que celles du dessus.",
		},
		{
			t: "Fossile stratigraphique",
			d: "Espèce ayant vécu peu de temps mais très répandue, utile pour dater précisément une couche.",
		},
		{
			t: "Magma",
			d: "Roche en fusion sous la surface. Devient de la lave une fois arrivée en surface.",
		},
		{
			t: "Subduction",
			d: "Plongement d'une plaque tectonique sous une autre, plus légère.",
		},
		{
			t: "Dorsale océanique",
			d: "Chaîne de montagnes sous-marine où se forme continuellement une nouvelle croûte océanique.",
		},
		{
			t: "Craton",
			d: "Partie ancienne et stable d'un continent, qui résiste depuis très longtemps à la déformation.",
		},
		{
			t: "Faille",
			d: "Fracture dans la roche le long de laquelle un déplacement a eu lieu.",
		},
		{
			t: "Ère / Période / Époque",
			d: "Subdivisions emboîtées de l\u2019échelle des temps géologiques, du plus large au plus précis.",
		},
		{
			t: "Sédiment",
			d: "Particules issues de l'érosion ou de restes d'organismes, avant de devenir une roche.",
		},
		{
			t: "Éon",
			d: "La plus grande subdivision de l\u2019échelle des temps géologiques — regroupe plusieurs ères (ex. le Phanérozoïque).",
		},
	];
	const lexgrid = document.getElementById("lexgrid");
	LEX.forEach((l) => {
		const c = document.createElement("div");
		c.className = "lexcard";
		c.innerHTML = `<div class="lexcard-inner">
      <div class="lexface lexfront">${l.t}</div>
      <div class="lexface lexback">${l.d}</div>
    </div>`;
		c.addEventListener("click", () => c.classList.toggle("flipped"));
		lexgrid.appendChild(c);
	});
});
