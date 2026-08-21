// ==========================================================================
// MCU — bandeau de navigation centralisé
// Injecte le <nav class="mcu-topbar"> dans #mcu-topbar et calcule tous les
// chemins relatifs à partir de la profondeur du fichier courant sous mcu/.
// ==========================================================================

(function () {
	function computeRoots() {
		const marker = "/mcu/";
		const path = window.location.pathname;
		const idx = path.indexOf(marker);
		const afterMcu = idx === -1 ? path.replace(/^\//, "") : path.slice(idx + marker.length);
		const segments = afterMcu.split("/").filter(Boolean);
		const depth = Math.max(segments.length - 1, 0); // sous-dossiers entre mcu/ et le fichier

		return {
			toMcu: depth === 0 ? "" : "../".repeat(depth),
			toAlmanach: "../".repeat(depth + 1),
		};
	}

	const { toMcu, toAlmanach } = computeRoots();

	const CHRONO = [
		["I", "Comprendre le multivers", "chronologie/mcu_multivers.html"],
		["II", "Avant les héros", "chronologie/mcu_antiquite.html"],
		["III", "Les origines", "chronologie/mcu_origines.html"],
		["IV", "L'expansion", "chronologie/mcu_expansion.html"],
		["V", "La saga du multivers", "chronologie/mcu_multivers-chrono.html"],
		["VI", "L'ère actuelle", "chronologie/mcu_actuel.html"],
		["VII", "L'horizon", "chronologie/mcu_horizon.html"],
	];

	const PERSONNAGES = [
		["Avengers originels", "personnages/avengers-originels/mcu_avengers-originels.html"],
		["Les mystiques", "personnages/mystiques/mcu_mystiques.html"],
		["Les Gardiens de la Galaxie", "personnages/gardiens/mcu_gardiens.html"],
		["Les Quatre Fantastiques", "personnages/fantastic-four/mcu_fantastic-four.html"],
		["Les nouvelles recrues", "personnages/nouvelles-recrues/mcu_nouvelles-recrues.html"],
		["Les grands antagonistes", "personnages/antagonistes/mcu_antagonistes.html"],
	];

	const ARTEFACTS = [
		["Les Pierres d'Infinité", "artefacts/pierres-infinite/mcu_pierres-infinite.html"],
		["Bouclier de Captain America", "artefacts/bouclier-captain-america.html"],
		["Mjolnir", "artefacts/mjolnir.html"],
		["Stormbreaker", "artefacts/stormbreaker.html"],
		["Les Dix Anneaux", "artefacts/dix-anneaux.html"],
		["Le Darkhold", "artefacts/darkhold.html"],
	];

	function chronoLinks() {
		return CHRONO.map(
			([num, label, href]) =>
				`<a href="${toMcu}${href}"><span class="num">${num}</span>${label}</a>`
		).join("");
	}

	function plainLinks(entries) {
		return entries.map(([label, href]) => `<a href="${toMcu}${href}">${label}</a>`).join("");
	}

	function menuGroup(key, word, wordHref, dropdownHtml) {
		return `
<div class="topbar-menu-group" data-menu="${key}">
	<div class="topbar-menu-trigger">
		<a class="topbar-menu-word" href="${wordHref}">${word}</a>
		<button class="topbar-menu-chev" type="button" aria-label="Afficher le sous-menu ${word}" aria-expanded="false">
			<span class="chev">▾</span>
		</button>
	</div>
	<div class="topbar-dropdown">
		<div class="topbar-dropdown-inner">${dropdownHtml}</div>
	</div>
</div>`;
	}

	const html = `
<a class="topbar-almanach" href="${toAlmanach}hub_index.html">← Almanach</a>
<a class="topbar-mcu-home" href="${toMcu}mcu_accueil.html">MCU</a>
<button class="topbar-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false">
	<span></span><span></span><span></span>
</button>
<div class="topbar-groups">
	${menuGroup("chrono", "Chronologie", `${toMcu}mcu_hub.html`, chronoLinks())}
	${menuGroup("perso", "Personnages", `${toMcu}mcu_personnages.html`, plainLinks(PERSONNAGES))}
	${menuGroup("artefacts", "Artefacts", `${toMcu}artefacts/mcu_artefacts.html`, plainLinks(ARTEFACTS))}
</div>`;

	const mount = document.getElementById("mcu-topbar");
	if (!mount) return;
	mount.outerHTML = `<nav class="mcu-topbar">${html}</nav>`;

	initTopbarBehavior();

	function initTopbarBehavior() {
		const nav = document.querySelector(".mcu-topbar");
		if (!nav) return;

		const groups = nav.querySelectorAll(".topbar-menu-group");
		const isTouch = window.matchMedia("(hover: none)").matches;
		const burger = nav.querySelector(".topbar-burger");
		const groupsPanel = nav.querySelector(".topbar-groups");

		function closeAll() {
			groups.forEach((g) => {
				g.classList.remove("open");
				g.querySelector(".topbar-menu-chev").setAttribute("aria-expanded", "false");
			});
		}

		groups.forEach((group) => {
			const chevBtn = group.querySelector(".topbar-menu-chev");

			if (!isTouch) {
				group.addEventListener("mouseenter", () => {
					group.classList.add("open");
					chevBtn.setAttribute("aria-expanded", "true");
				});
				group.addEventListener("mouseleave", () => {
					group.classList.remove("open");
					chevBtn.setAttribute("aria-expanded", "false");
				});
			}

			chevBtn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				const wasOpen = group.classList.contains("open");
				closeAll();
				if (!wasOpen) {
					group.classList.add("open");
					chevBtn.setAttribute("aria-expanded", "true");
				}
			});
		});

		if (burger && groupsPanel) {
			burger.addEventListener("click", (e) => {
				e.stopPropagation();
				const isOpen = groupsPanel.classList.toggle("open");
				burger.setAttribute("aria-expanded", String(isOpen));
				burger.classList.toggle("open", isOpen);
				if (!isOpen) closeAll();
			});
		}

		document.addEventListener("click", (e) => {
			if (!e.target.closest(".topbar-menu-group")) {
				closeAll();
			}
			if (burger && groupsPanel && !e.target.closest(".topbar-groups") && !e.target.closest(".topbar-burger")) {
				groupsPanel.classList.remove("open");
				burger.setAttribute("aria-expanded", "false");
				burger.classList.remove("open");
			}
		});
	}
})();
