document.addEventListener("DOMContentLoaded", () => {
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

	const heroPaths = document.querySelectorAll(".hero-tree path.draw");
	const heroCircles = document.querySelectorAll(".hero-tree circle");
	heroCircles.forEach((c) => {
		c.style.opacity = 0;
		c.style.transition = "opacity .5s ease";
	});
	heroPaths.forEach((p, i) => {
		const len = p.getTotalLength();
		p.style.strokeDasharray = len;
		p.style.strokeDashoffset = len;
		p.style.transition = `stroke-dashoffset 1.1s cubic-bezier(.3,.6,.3,1) ${0.4 + i * 0.1}s`;
		requestAnimationFrame(() =>
			requestAnimationFrame(() => {
				p.style.strokeDashoffset = 0;
			}),
		);
	});
	setTimeout(() => {
		heroCircles.forEach((c, i) => {
			setTimeout(() => {
				c.style.opacity = 1;
			}, i * 90);
		});
	}, 1400);

	function makeNode(rank, tx, color, isFinal = false, ic = "", desc = "") {
		return { rank, tx, color, isFinal, ic, desc, children: [] };
	}

	const vivant = makeNode(
		"Monde",
		"Le Vivant",
		"var(--ink)",
		false,
		"",
		"L'ensemble des entités biologiques capables de se reproduire et d'évoluer.",
	);

	const bacteria = makeNode(
		"Domaine",
		"Bacteria",
		"var(--r-domaine)",
		false,
		"",
		"Bactéries. Unicellulaires procaryotes, sans noyau.",
	);
	const archaea = makeNode(
		"Domaine",
		"Archaea",
		"var(--r-domaine)",
		false,
		"",
		"Archées. Unicellulaires adaptés aux environnements extrêmes.",
	);
	const eukaryota = makeNode(
		"Domaine",
		"Eukaryota",
		"var(--r-domaine)",
		false,
		"",
		"Eucaryotes. Cellules possédant un noyau véritable.",
	);
	vivant.children = [bacteria, archaea, eukaryota];

	const proteo = makeNode(
		"Embranchement",
		"Proteobacteria",
		"var(--r-embr)",
		false,
		"",
		"Grand groupe de bactéries à Gram négatif.",
	);
	const firmi = makeNode(
		"Embranchement",
		"Firmicutes",
		"var(--r-embr)",
		false,
		"",
		"Bactéries principalement à Gram positif.",
	);
	bacteria.children = [proteo, firmi];

	const ecoli = makeNode(
		"Espèce",
		"Escherichia coli",
		"var(--r-espece)",
		true,
		"🦠",
		"Bactérie intestinale très étudiée en laboratoire.",
	);
	const salmonella = makeNode(
		"Espèce",
		"Salmonella enterica",
		"var(--r-espece)",
		true,
		"🧫",
		"Bactérie pathogène responsable d'infections alimentaires.",
	);
	proteo.children = [ecoli, salmonella];

	const staph = makeNode(
		"Espèce",
		"Staphylococcus aureus",
		"var(--r-espece)",
		true,
		"🧫",
		"Staphylocoque doré, souvent commensal mais parfois pathogène.",
	);
	const bacillus = makeNode(
		"Espèce",
		"Bacillus subtilis",
		"var(--r-espece)",
		true,
		"🦠",
		"Bactérie du sol formant des spores très résistantes.",
	);
	firmi.children = [staph, bacillus];

	const eury = makeNode(
		"Embranchement",
		"Euryarchaeota",
		"var(--r-embr)",
		false,
		"",
		"Archées produisant du méthane ou vivant dans le sel.",
	);
	const cren = makeNode(
		"Embranchement",
		"Crenarchaeota",
		"var(--r-embr)",
		false,
		"",
		"Archées vivant souvent dans des sources chaudes acides.",
	);
	archaea.children = [eury, cren];

	const halo = makeNode(
		"Espèce",
		"Halobacterium salinarum",
		"var(--r-espece)",
		true,
		"🧂",
		"Archée extrêmophile prospérant dans les marais salants.",
	);
	const methano = makeNode(
		"Espèce",
		"Methanobacterium",
		"var(--r-espece)",
		true,
		"🫧",
		"Archée anaérobie productrice de méthane.",
	);
	eury.children = [halo, methano];

	const sulf = makeNode(
		"Espèce",
		"Sulfolobus acidocaldarius",
		"var(--r-espece)",
		true,
		"🌋",
		"Archée vivant dans les sources hydrothermales acides.",
	);
	const thermo = makeNode(
		"Espèce",
		"Thermoproteus tenax",
		"var(--r-espece)",
		true,
		"♨️",
		"Archée thermophile stricte des sources chaudes.",
	);
	cren.children = [sulf, thermo];

	const animalia = makeNode(
		"Règne",
		"Animalia",
		"var(--r-regne)",
		false,
		"",
		"Animaux. Organismes multicellulaires hétérotrophes.",
	);
	const plantae = makeNode(
		"Règne",
		"Plantae",
		"var(--r-regne)",
		false,
		"",
		"Plantes. Organismes multicellulaires photosynthétiques.",
	);
	eukaryota.children = [animalia, plantae];

	const chordata = makeNode(
		"Embranchement",
		"Chordata",
		"var(--r-embr)",
		false,
		"",
		"Possèdent une chorde dorsale.",
	);
	const arthropoda = makeNode(
		"Embranchement",
		"Arthropoda",
		"var(--r-embr)",
		false,
		"",
		"Invertébrés à exosquelette et pattes articulées.",
	);
	animalia.children = [chordata, arthropoda];

	const mammalia = makeNode(
		"Classe",
		"Mammalia",
		"var(--r-classe)",
		false,
		"",
		"Vertébrés avec glandes mammaires et poils.",
	);
	const aves = makeNode(
		"Classe",
		"Aves",
		"var(--r-classe)",
		false,
		"",
		"Vertébrés à plumes (oiseaux).",
	);
	chordata.children = [mammalia, aves];

	const carnivora = makeNode(
		"Ordre",
		"Carnivora",
		"var(--r-ordre)",
		false,
		"",
		"Mammifères dotés de dents carnassières.",
	);
	const primates = makeNode(
		"Ordre",
		"Primates",
		"var(--r-ordre)",
		false,
		"",
		"Cerveau développé et pouce opposable.",
	);
	mammalia.children = [carnivora, primates];

	const canidae = makeNode(
		"Famille",
		"Canidae",
		"var(--r-famille)",
		false,
		"",
		"Carnivores digitigrades au museau allongé.",
	);
	const felidae = makeNode(
		"Famille",
		"Felidae",
		"var(--r-famille)",
		false,
		"",
		"Carnivores stricts aux griffes rétractiles.",
	);
	carnivora.children = [canidae, felidae];

	const loup = makeNode(
		"Espèce",
		"Canis lupus",
		"var(--r-espece)",
		true,
		"🐺",
		"Le loup gris.",
	);
	const renard = makeNode(
		"Espèce",
		"Vulpes vulpes",
		"var(--r-espece)",
		true,
		"🦊",
		"Le renard roux.",
	);
	canidae.children = [loup, renard];

	const tigre = makeNode(
		"Espèce",
		"Panthera tigris",
		"var(--r-espece)",
		true,
		"🐅",
		"Le tigre.",
	);
	const chat = makeNode(
		"Espèce",
		"Felis catus",
		"var(--r-espece)",
		true,
		"🐈",
		"Le chat domestique.",
	);
	felidae.children = [tigre, chat];

	const columba = makeNode(
		"Espèce",
		"Columba livia",
		"var(--r-espece)",
		true,
		"🕊️",
		"Pigeon biset, oiseau urbain commun.",
	);
	const gallus = makeNode(
		"Espèce",
		"Gallus gallus",
		"var(--r-espece)",
		true,
		"🐓",
		"Coq doré, ancêtre de la poule.",
	);
	aves.children = [columba, gallus];

	const homo = makeNode(
		"Espèce",
		"Homo sapiens",
		"var(--r-espece)",
		true,
		"🧠",
		"L'être humain moderne.",
	);
	const pan = makeNode(
		"Espèce",
		"Pan troglodytes",
		"var(--r-espece)",
		true,
		"🐒",
		"Le chimpanzé commun.",
	);
	primates.children = [homo, pan];

	const insecta = makeNode(
		"Classe",
		"Insecta",
		"var(--r-classe)",
		false,
		"",
		"Invertébrés à six pattes.",
	);
	const arachnida = makeNode(
		"Classe",
		"Arachnida",
		"var(--r-classe)",
		false,
		"",
		"Invertébrés à huit pattes.",
	);
	arthropoda.children = [insecta, arachnida];
	insecta.children = [
		makeNode(
			"Espèce",
			"Papilio machaon",
			"var(--r-espece)",
			true,
			"🦋",
			"Le grand porte-queue.",
		),
		makeNode(
			"Espèce",
			"Apis mellifera",
			"var(--r-espece)",
			true,
			"🐝",
			"L'abeille à miel européenne.",
		),
	];
	arachnida.children = [
		makeNode(
			"Espèce",
			"Araneus diadematus",
			"var(--r-espece)",
			true,
			"🕷️",
			"Épeire diadème.",
		),
		makeNode(
			"Espèce",
			"Scorpio maurus",
			"var(--r-espece)",
			true,
			"🦂",
			"Scorpion à larges pinces.",
		),
	];

	const tracheophyta = makeNode(
		"Embranchement",
		"Tracheophyta",
		"var(--r-embr)",
		false,
		"",
		"Plantes vasculaires (xylème et phloème).",
	);
	const bryophyta = makeNode(
		"Embranchement",
		"Bryophyta",
		"var(--r-embr)",
		false,
		"",
		"Mousses et hépatiques, sans vraies racines.",
	);
	plantae.children = [tracheophyta, bryophyta];

	bryophyta.children = [
		makeNode(
			"Espèce",
			"Polytrichum commune",
			"var(--r-espece)",
			true,
			"🌱",
			"Polytric commun, grande mousse forestière.",
		),
		makeNode(
			"Espèce",
			"Sphagnum palustre",
			"var(--r-espece)",
			true,
			"🌿",
			"Sphaigne des marais.",
		),
	];

	const angiospermae = makeNode(
		"Classe",
		"Magnoliopsida",
		"var(--r-classe)",
		false,
		"",
		"Plantes à fleurs.",
	);
	const pinopsida = makeNode(
		"Classe",
		"Pinopsida",
		"var(--r-classe)",
		false,
		"",
		"Conifères (arbres à cônes).",
	);
	tracheophyta.children = [angiospermae, pinopsida];

	pinopsida.children = [
		makeNode(
			"Espèce",
			"Pinus sylvestris",
			"var(--r-espece)",
			true,
			"🌲",
			"Le pin sylvestre.",
		),
		makeNode(
			"Espèce",
			"Picea abies",
			"var(--r-espece)",
			true,
			"🌲",
			"L'épicéa commun.",
		),
	];

	const fagales = makeNode(
		"Ordre",
		"Fagales",
		"var(--r-ordre)",
		false,
		"",
		"Arbres forestiers produisant des chatons.",
	);
	const rosales = makeNode(
		"Ordre",
		"Rosales",
		"var(--r-ordre)",
		false,
		"",
		"Plantes dicotylédones (roses, pommiers).",
	);
	angiospermae.children = [rosales, fagales];

	const chene = makeNode(
		"Espèce",
		"Quercus robur",
		"var(--r-espece)",
		true,
		"🌳",
		"Le chêne pédonculé.",
	);
	const hetre = makeNode(
		"Espèce",
		"Fagus sylvatica",
		"var(--r-espece)",
		true,
		"🍂",
		"Le hêtre commun.",
	);
	fagales.children = [chene, hetre];

	const pommier = makeNode(
		"Espèce",
		"Malus domestica",
		"var(--r-espece)",
		true,
		"🍎",
		"Le pommier domestique.",
	);
	const rosier = makeNode(
		"Espèce",
		"Rosa gallica",
		"var(--r-espece)",
		true,
		"🌹",
		"Le rosier de France.",
	);
	rosales.children = [pommier, rosier];

	let selectedPath = [vivant];
	const megatreeEl = document.getElementById("megatree");

	function selectNode(level, node) {
		selectedPath = selectedPath.slice(0, level);
		selectedPath.push(node);
		renderMegatree();
	}

	function renderMegatree() {
		megatreeEl.innerHTML = "";

		const rootWrap = document.createElement("div");
		rootWrap.className = "mt-level mt-anim show";
		rootWrap.innerHTML = `
        <div class="mt-card root-card">
          <div class="rk">${vivant.rank}</div>
          <div class="tx">${vivant.tx}</div>
          <div class="desc">${vivant.desc}</div>
        </div>
      `;
		rootWrap.onclick = () => {
			selectedPath = [vivant];
			renderMegatree();
		};
		megatreeEl.appendChild(rootWrap);

		let parent = vivant;
		for (let i = 1; i <= selectedPath.length; i++) {
			const choices = parent.children;
			if (!choices || choices.length === 0) break;

			const currentSelection = selectedPath[i];
			const levelWrap = document.createElement("div");
			levelWrap.className = "mt-level mt-anim show";

			let legsHtml = "";
			choices.forEach(() => {
				legsHtml += `<div class="o-line-v"></div>`;
			});

			levelWrap.innerHTML += `
            <div class="mt-ortho">
              <div class="o-line-v"></div>
              <div class="o-line-h"></div>
              <div class="o-legs">${legsHtml}</div>
            </div>
          `;

			const choicesDiv = document.createElement("div");
			choicesDiv.className = "mt-choices";

			choices.forEach((child) => {
				const btn = document.createElement("div");
				let stateClass = "";
				if (currentSelection === child) {
					stateClass = "confirmed";
					btn.style.borderColor = child.color;
				} else if (currentSelection !== undefined) {
					stateClass = "unselected";
				}

				btn.className = `mt-card ${stateClass}`;
				btn.innerHTML = `<div class="rk">${child.rank}</div><div class="tx">${child.tx}</div><div class="desc">${child.desc}</div>`;
				btn.onclick = () => selectNode(i, child);
				choicesDiv.appendChild(btn);
			});

			levelWrap.appendChild(choicesDiv);
			megatreeEl.appendChild(levelWrap);

			if (currentSelection) {
				parent = currentSelection;
			} else {
				break;
			}
		}

		const lastNode = selectedPath[selectedPath.length - 1];
		if (lastNode && lastNode.isFinal) {
			const finalWrap = document.createElement("div");
			finalWrap.className = "mt-anim show";
			finalWrap.innerHTML = `
             <div class="mt-final">
               <div class="ic">${lastNode.ic}</div>
               <div class="tx">${lastNode.tx}</div>
               <p>${lastNode.desc}</p>
             </div>
          `;
			megatreeEl.appendChild(finalWrap);
		}
	}

	document.getElementById("megaReset").addEventListener("click", () => {
		selectedPath = [vivant];
		renderMegatree();
	});
	renderMegatree();

	const PHYLA = [
		{
			ic: "🧽",
			nm: "Porifera",
			fr: "Éponges",
			car: "Pas d'organes",
			ex: "éponges de mer",
			n: "~8 000",
			path: ["e-root-por"],
		},
		{
			ic: "🎐",
			nm: "Cnidaria",
			fr: "Cnidaires",
			car: "Cellules urticantes",
			ex: "méduses, coraux",
			n: "~11 000",
			path: ["e-eum-cni", "e-root-eum"],
		},
		{
			ic: "➰",
			nm: "Nematoda",
			fr: "Vers ronds",
			car: "Corps cylindrique non segmenté",
			ex: "nématodes",
			n: "~25 000",
			path: ["e-ecd-nem", "e-pro-ecd", "e-bil-pro", "e-eum-bil", "e-root-eum"],
		},
		{
			ic: "🦂",
			nm: "Arthropoda",
			fr: "Arthropodes",
			car: "Squelette externe",
			ex: "insectes, crustacés",
			n: ">1 000 000",
			path: [
				"e-pan-art",
				"e-ecd-pan",
				"e-pro-ecd",
				"e-bil-pro",
				"e-eum-bil",
				"e-root-eum",
			],
		},
		{
			ic: "🐻",
			nm: "Tardigrada",
			fr: "Tardigrades",
			car: "Micro-animaux",
			ex: "oursons d'eau",
			n: "~1 300",
			path: [
				"e-pan-tar",
				"e-ecd-pan",
				"e-pro-ecd",
				"e-bil-pro",
				"e-eum-bil",
				"e-root-eum",
			],
		},
		{
			ic: "🐌",
			nm: "Mollusca",
			fr: "Mollusques",
			car: "Corps mou",
			ex: "escargots, pieuvres",
			n: "~85 000",
			path: ["e-lop-mol", "e-pro-lop", "e-bil-pro", "e-eum-bil", "e-root-eum"],
		},
		{
			ic: "🪱",
			nm: "Annelida",
			fr: "Annélides",
			car: "Corps segmenté",
			ex: "vers de terre",
			n: "~22 000",
			path: ["e-lop-ann", "e-pro-lop", "e-bil-pro", "e-eum-bil", "e-root-eum"],
		},
		{
			ic: "🎗️",
			nm: "Platyhelminthes",
			fr: "Vers plats",
			car: "Corps aplati",
			ex: "planaires",
			n: "~20 000",
			path: ["e-lop-pla", "e-pro-lop", "e-bil-pro", "e-eum-bil", "e-root-eum"],
		},
		{
			ic: "⭐",
			nm: "Echinodermata",
			fr: "Échinodermes",
			car: "Squelette calcaire",
			ex: "oursins, étoiles",
			n: "~7 000",
			path: ["e-deu-ech", "e-bil-deu", "e-eum-bil", "e-root-eum"],
		},
		{
			ic: "🐟",
			nm: "Chordata",
			fr: "Chordés",
			car: "Colonne vertébrale",
			ex: "poissons, oiseaux, nous",
			n: "~65 000",
			path: ["e-deu-cho", "e-bil-deu", "e-eum-bil", "e-root-eum"],
		},
	];
	const PHYLA_X = [40, 115, 190, 265, 340, 415, 490, 565, 640, 715];
	const NODES_INFO = {
		root: { x: 180, y: 30, tx: "Animalia", rk: "Règne" },
		eum: { x: 320, y: 80, tx: "Eumetazoa", rk: "Sous-règne" },
		bil: { x: 524, y: 130, tx: "Bilateria", rk: "Clade" },
		pro: { x: 369, y: 180, tx: "Protostomia", rk: "Clade" },
		deu: { x: 678, y: 230, tx: "Deuterostomia", rk: "Clade" },
		ecd: { x: 247, y: 280, tx: "Ecdysozoa", rk: "Super-embr." },
		lop: { x: 490, y: 280, tx: "Lophotrochozoa", rk: "Super-embr." },
		pan: { x: 303, y: 330, tx: "Panarthropoda", rk: "Clade" },
	};
	const TEDGES = [
		{ id: "e-root-eum", d: "M180,30 H320 V80" },
		{ id: "e-root-por", d: "M180,30 H40 V390" },
		{ id: "e-eum-cni", d: "M320,80 H115 V390" },
		{ id: "e-eum-bil", d: "M320,80 H524 V130" },
		{ id: "e-bil-pro", d: "M524,130 H369 V180" },
		{ id: "e-bil-deu", d: "M524,130 H678 V230" },
		{ id: "e-pro-ecd", d: "M369,180 H247 V280" },
		{ id: "e-pro-lop", d: "M369,180 H490 V280" },
		{ id: "e-ecd-nem", d: "M247,280 H190 V390" },
		{ id: "e-ecd-pan", d: "M247,280 H303 V330" },
		{ id: "e-pan-art", d: "M303,330 H265 V390" },
		{ id: "e-pan-tar", d: "M303,330 H340 V390" },
		{ id: "e-lop-mol", d: "M490,280 H415 V390" },
		{ id: "e-lop-ann", d: "M490,280 V390" },
		{ id: "e-lop-pla", d: "M490,280 H565 V390" },
		{ id: "e-deu-ech", d: "M678,230 H640 V390" },
		{ id: "e-deu-cho", d: "M678,230 H715 V390" },
	];

	const treewrap = document.getElementById("treewrap");
	let treeSvg = `<svg class="tree-svg" viewBox="0 0 760 450" xmlns="http://www.w3.org/2000/svg">`;
	TEDGES.forEach((e) => {
		treeSvg += `<path class="branch" id="${e.id}" d="${e.d}"/>`;
	});
	Object.entries(NODES_INFO).forEach(([key, n]) => {
		treeSvg += `<circle class="node-dot" cx="${n.x}" cy="${n.y}" r="4.5"/>`;
		treeSvg += `<g class="node-lbl" id="lbl-${key}" style="opacity:0; transition:opacity .3s ease; pointer-events:none;">
  <rect x="${n.x - 55}" y="${n.y - 30}" width="110" height="27" rx="5" fill="var(--paper)"/>
  <text x="${n.x}" y="${n.y - 16}" font-family="var(--sans-ui)" font-size="11" font-weight="700" fill="var(--ink-3)" text-anchor="middle">${n.tx}</text>
  <text x="${n.x}" y="${n.y - 5}" font-family="var(--sans-ui)" font-size="9" fill="var(--brass)" text-anchor="middle" text-transform="uppercase">${n.rk}</text>
</g>`;
	});

	PHYLA.forEach((p, i) => {
		const x = PHYLA_X[i];
		treeSvg += `<g class="leaf" data-leaf="${i}" tabindex="0"><circle class="lf-ring" cx="${x}" cy="390" r="17"/><text class="lf-icon" x="${x}" y="396" text-anchor="middle">${p.ic}</text><text class="lf-label" x="${x}" y="424" text-anchor="middle">${p.fr}</text></g>`;
	});
	treeSvg += `</svg>`;
	treewrap.innerHTML = treeSvg;

	const phylumDetail = document.getElementById("phylumDetail");
	function selectPhylum(idx) {
		treewrap
			.querySelectorAll(".branch")
			.forEach((b) => b.classList.remove("hl"));
		treewrap
			.querySelectorAll(".leaf")
			.forEach((l) => l.classList.remove("selected", "hl"));
		treewrap
			.querySelectorAll(".node-lbl")
			.forEach((l) => (l.style.opacity = "0"));

		const p = PHYLA[idx];
		const activeNodes = new Set();

		p.path.forEach((id) => {
			const el = treewrap.querySelector("#" + id);
			if (el) el.classList.add("hl");

			const parts = id.split("-");
			if (parts.length === 3) {
				activeNodes.add(parts[1]);
				activeNodes.add(parts[2]);
			}
		});

		activeNodes.forEach((nodeKey) => {
			const lbl = treewrap.querySelector("#lbl-" + nodeKey);
			if (lbl) lbl.style.opacity = "1";
		});

		treewrap
			.querySelector(`.leaf[data-leaf="${idx}"]`)
			.classList.add("selected");
		phylumDetail.classList.remove("placeholder");
		phylumDetail.innerHTML = `<div class="pd-icon">${p.ic}</div><div class="pd-body"><div class="pd-fr">${p.fr}</div><div class="pd-nm">${p.nm}</div><div class="pd-car"><b>${p.car}</b></div><div class="pd-ex">Exemples: ${p.ex}</div><div class="pd-n">${p.n} espèces décrites</div></div>`;
	}
	treewrap.querySelectorAll(".leaf").forEach((g) => {
		const idx = +g.dataset.leaf;
		g.addEventListener("click", () => selectPhylum(idx));
		g.addEventListener("mouseenter", () => selectPhylum(idx));
		g.addEventListener("focus", () => selectPhylum(idx));
	});

	const GENRES = ["Canis", "Panthera", "Homo", "Felis", "Corvus"];
	const ESPECES = [
		"lupus",
		"latrans",
		"aureus",
		"familiaris",
		"leo",
		"tigris",
		"pardus",
		"onca",
		"sapiens",
		"neanderthalensis",
		"erectus",
		"habilis",
		"catus",
		"silvestris",
		"chaus",
		"margarita",
		"corax",
		"cornix",
		"frugilegus",
		"monedula",
	];

	const FACTS = {
		"Canis lupus": "Le loup gris.",
		"Canis latrans": "Le coyote.",
		"Canis aureus": "Le chacal doré.",
		"Canis familiaris": "Le chien domestique.",
		"Panthera leo": "Le lion.",
		"Panthera tigris": "Le tigre.",
		"Panthera pardus": "Le léopard.",
		"Panthera onca": "Le jaguar.",
		"Homo sapiens": "L'humain moderne.",
		"Homo neanderthalensis": "L'homme de Néandertal.",
		"Homo erectus": "Hominidé ancien.",
		"Homo habilis": "L'homme habile.",
		"Felis catus": "Le chat domestique.",
		"Felis silvestris": "Le chat forestier.",
		"Felis chaus": "Le chat des marais.",
		"Felis margarita": "Le chat des sables.",
		"Corvus corax": "Le grand corbeau.",
		"Corvus cornix": "La corneille mantelée.",
		"Corvus frugilegus": "Le corbeau freux.",
		"Corvus monedula": "Le choucas des tours.",
	};

	const genreSel = document.getElementById("genreSel");
	const especeChips = document.getElementById("especeChips");
	GENRES.forEach((g) => {
		const o = document.createElement("option");
		o.value = g;
		o.textContent = g;
		genreSel.appendChild(o);
	});
	genreSel.value = "Canis";
	let currentEspece = "lupus";

	function renderChips() {
		especeChips.innerHTML = "";
		ESPECES.forEach((e) => {
			const isValid = !!FACTS[genreSel.value + " " + e];
			const chip = document.createElement("button");
			chip.className =
				"espece-chip" +
				(isValid ? " valid" : "") +
				(e === currentEspece ? " selected" : "");
			chip.textContent = e;
			chip.addEventListener("click", () => {
				currentEspece = e;
				renderChips();
				updateBinom();
			});
			especeChips.appendChild(chip);
		});
	}
	function updateBinom() {
		const name = genreSel.value + " " + currentEspece;
		document.getElementById("binomPreview").textContent = name;
		document.getElementById("binomFact").textContent =
			FACTS[name] || "Cette combinaison n'existe pas dans la nature.";
	}
	genreSel.addEventListener("change", () => {
		if (!FACTS[genreSel.value + " " + currentEspece]) {
			currentEspece =
				ESPECES.find((e) => FACTS[genreSel.value + " " + e]) || ESPECES[0];
		}
		renderChips();
		updateBinom();
	});
	renderChips();
	updateBinom();

	const treeLinesAndText = `
    <g stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round">
      <line x1="300" y1="430" x2="580" y2="150" />
      <line x1="340" y1="390" x2="100" y2="150" />
      <line x1="380" y1="350" x2="180" y2="150" />
      <line x1="420" y1="310" x2="260" y2="150" />
      <line x1="460" y1="270" x2="340" y2="150" />
      <line x1="500" y1="230" x2="420" y2="150" />
      <line x1="540" y1="190" x2="500" y2="150" />
    </g>
    <g font-family="Space Grotesk, sans-serif" font-size="11" fill="var(--ink)" font-weight="700">
      <text x="350" y="415">Vertebrata</text>
      <text x="390" y="375">Tetrapoda</text>
      <text x="430" y="335">Amniota</text>
      <text x="470" y="295">Sauropsida</text>
      <text x="510" y="255">Diapsida</text>
      <text x="550" y="215">Archosauria</text>
    </g>
    <g font-family="Newsreader, serif" font-size="14" fill="var(--ink)">
      <text x="95" y="140" transform="rotate(-45 95 140)">Teleostei</text>
      <text x="175" y="140" transform="rotate(-45 175 140)">Lissamphibia</text>
      <text x="255" y="140" transform="rotate(-45 255 140)">Mammalia</text>
      <text x="335" y="140" transform="rotate(-45 335 140)">Testudines</text>
      <text x="415" y="140" transform="rotate(-45 415 140)">Lepidosauria</text>
      <text x="495" y="140" transform="rotate(-45 495 140)">Crocodylia</text>
      <text x="575" y="140" transform="rotate(-45 575 140)">Aves</text>
    </g>
  `;

	const svgMono = `<svg viewBox="0 0 650 450" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
    <path d="M 470 300 C 395 300 340 230 305 150 C 300 100 350 72 412 70 C 460 65 480 63 500 62 C 530 60 555 65 572 70 C 600 78 600 78 640 101 C 660 130 660 130 640 210 C 570 300 570 300 470 300 Z" fill="#a6bbed" opacity="0.6"/>
    ${treeLinesAndText}
  </svg>`;

	const svgPara = `<svg viewBox="0 0 650 450" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
    <path d="M 482 336 C 402.6667 347.3333 391.3333 345.6667 362 294 C 321 212 321 211 314 150 C 310 92 310 91 372 79 C 466 71 467 71 531 73 C 599 82 530 120 578 147 C 670 159 616 284 483 336 Z" fill="#8ceda2" opacity="0.6"/>
    ${treeLinesAndText}
  </svg>`;

	const svgPoly = `<svg viewBox="0 0 650 450" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
    <path d="M 420 50 C 600 50 600 40 600 150 C 600 180 550 180 550 150 C 550 80 550 80 420 80 S 290 80 290 150 C 290 180 240 180 240 150 L 240 150 C 240 40 240 50 420 50" fill="#ed8c8c" opacity="0.6"/>
    ${treeLinesAndText}
  </svg>`;

	const PHYLOTABS = [
		{
			key: "mono",
			color: "#a6bbed",
			svg: svgMono,
			badge: "✓ Monophylétique",
			text: "Le groupe <b>Sauropsida</b> réunit un ancêtre commun et absolument tous ses descendants.",
			leg: "Sauropsida",
		},
		{
			key: "poly",
			color: "#ed8c8c",
			svg: svgPoly,
			badge: "✕ Polyphylétique",
			text: "Regrouper <b>mammifères</b> et <b>oiseaux</b> parce qu'ils sont tous deux à sang chaud ignore l'arbre réel.",
			leg: "Sang chaud",
		},
		{
			key: "para",
			color: "#8ceda2",
			svg: svgPara,
			verdict: "no",
			badge: "✕ Paraphylétique",
			text: "Le groupe traditionnel des « reptiles » a le même ancêtre commun… mais il <b>exclut les oiseaux</b>.",
			leg: "« Reptiles »",
		},
	];

	const phyloPanels = document.getElementById("phyloPanels");
	// Ajustement pour intégrer la légende dans le SVG via JS si besoin, ou simplement sous le texte
	phyloPanels.innerHTML = PHYLOTABS.map(
		(p, i) => `
    <div class="phylo-panel ${i === 0 ? "active" : ""}" data-panel="${p.key}">
        <div class="phylo-svg-wrap">${p.svg}</div>
        <div>
            <div class="phylo-verdict">${p.badge}</div>
            <p class="phylo-text">${p.text}</p>
            <div style="margin-top:10px; font-weight:600;">
                <span class="legend-box" style="background:${p.color}"></span> ${p.leg}
            </div>
        </div>
    </div>`,
	).join("");

	document.querySelectorAll(".ptab").forEach((btn) => {
		btn.addEventListener("click", () => {
			document
				.querySelectorAll(".ptab")
				.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");
			document
				.querySelectorAll(".phylo-panel")
				.forEach((p) => p.classList.remove("active"));
			document
				.querySelector(`.phylo-panel[data-panel="${btn.dataset.tab}"]`)
				.classList.add("active");
		});
	});

	const LEX = [
		{ t: "Taxon", d: "Groupe d'êtres vivants reconnu et nommé." },
		{
			t: "Clade",
			d: "Groupe monophylétique : un ancêtre et tous ses descendants.",
		},
		{ t: "Phylogénie", d: "Histoire évolutive et liens de parenté." },
		{ t: "Systématique", d: "Discipline qui étudie la diversité du vivant." },
		{ t: "Cladistique", d: "Méthode de reconstruction des arbres évolutifs." },
		{ t: "Monophylie", d: "Ancêtre + tous ses descendants." },
		{ t: "Paraphylie", d: "Ancêtre commun, mais certains descendants exclus." },
		{ t: "Polyphylie", d: "Groupe artificiel : pas d'ancêtre exclusif." },
		{ t: "Nomenclature binominale", d: "Nom à deux mots : Genre espèce." },
		{ t: "PhyloCode", d: "Code de nomenclature phylogénétique." },
		{ t: "Synapomorphie", d: "Caractère dérivé partagé par un clade." },
		{
			t: "Holotype",
			d: "Spécimen unique de référence pour décrire une espèce.",
		},
	];

	const lexgrid = document.getElementById("lexgrid");
	LEX.forEach((l) => {
		const c = document.createElement("div");
		c.className = "lexcard";
		c.innerHTML = `<div class="lexcard-inner"><div class="lexface lexfront">${l.t}</div><div class="lexface lexback">${l.d}</div></div>`;
		c.addEventListener("click", () => c.classList.toggle("flipped"));
		lexgrid.appendChild(c);
	});
});
