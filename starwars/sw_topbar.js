// ==========================================================================
// Star Wars — bandeau de navigation centralisé
// Injecte le <nav class="sw-topbar"> dans #sw-topbar et calcule tous les
// chemins relatifs à partir de la profondeur du fichier courant sous starwars/.
// ==========================================================================

(function () {
	const MARKER = '/starwars/';

	function computeRoots() {
		const path = window.location.pathname;
		const idx = path.indexOf(MARKER);
		const after = idx === -1 ? path.replace(/^\//, '') : path.slice(idx + MARKER.length);
		const segments = after.split('/').filter(Boolean);
		const depth = Math.max(segments.length - 1, 0); // sous-dossiers entre starwars/ et le fichier

		return {
			toSw: depth === 0 ? '' : '../'.repeat(depth),
			toAlmanach: '../'.repeat(depth + 1),
			current: segments.join('/'),
		};
	}

	const { toSw, toAlmanach, current } = computeRoots();

	const CHRONO = [
		['I', 'Comprendre la galaxie', 'chronologie/sw_galaxie.html'],
		['II', "L'aube des Jedi et des Sith", 'chronologie/sw_aube.html'],
		['III', 'La Haute République', 'chronologie/sw_haute-republique.html'],
		['IV', 'La chute des Jedi', 'chronologie/sw_chute-jedi.html'],
		['V', "Le règne de l'Empire", 'chronologie/sw_empire.html'],
		['VI', "L'âge de la Rébellion", 'chronologie/sw_age-rebellion.html'],
		['VII', 'La Nouvelle République', 'chronologie/sw_nouvelle-republique.html'],
		['VIII', "Le Premier Ordre et l'horizon", 'chronologie/sw_premier-ordre.html'],
	];

	const PERSONNAGES = [
		['Les Skywalker', 'personnages/skywalker/sw_skywalker.html'],
		['Les Jedi', 'personnages/jedi/sw_jedi.html'],
		['Les Sith', 'personnages/sith/sw_sith.html'],
		['La Rébellion et la Résistance', 'personnages/rebellion/sw_rebellion.html'],
		['Mandaloriens et chasseurs de primes', 'personnages/mandaloriens/sw_mandaloriens.html'],
		["L'Empire et le Premier Ordre", 'personnages/empire/sw_empire.html'],
	];

	const OBJETS = [
		['Les sabres laser', 'objets/sabres-laser.html'],
		['Les cristaux kyber', 'objets/cristaux-kyber.html'],
		['Les holocrons', 'objets/holocrons.html'],
		["L'Étoile de la Mort", 'objets/etoile-de-la-mort.html'],
		['Le Faucon Millenium', 'objets/faucon-millenium.html'],
		['Le beskar', 'objets/beskar.html'],
	];

	function isCurrent(href) {
		return current === href ? ' aria-current="page"' : '';
	}

	function chronoLinks() {
		return CHRONO.map(
			([num, label, href]) =>
				`<a href="${toSw}${href}"${isCurrent(href)}><span class="num">${num}</span>${label}</a>`
		).join('');
	}

	function plainLinks(entries) {
		return entries
			.map(([label, href]) => `<a href="${toSw}${href}"${isCurrent(href)}>${label}</a>`)
			.join('');
	}

	function menuGroup(key, word, wordHref, dropdownHtml) {
		return `
<div class="topbar-menu-group" data-menu="${key}">
	<div class="topbar-menu-trigger">
		<a class="topbar-menu-word" href="${wordHref}">${word}</a>
		<button class="topbar-menu-chev" type="button" aria-label="Afficher le sous-menu ${word}" aria-expanded="false">
			<span class="chev" aria-hidden="true">▾</span>
		</button>
	</div>
	<div class="topbar-dropdown">
		<div class="topbar-dropdown-inner">${dropdownHtml}</div>
	</div>
</div>`;
	}

	const html = `
<a class="topbar-almanach" href="${toAlmanach}hub_index.html">← Almanach</a>
<a class="topbar-home" href="${toSw}sw_accueil.html">Star Wars</a>
<button class="topbar-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false">
	<span></span><span></span><span></span>
</button>
<div class="topbar-groups">
	${menuGroup('chrono', 'Chronologie', `${toSw}sw_hub.html`, chronoLinks())}
	${menuGroup('perso', 'Personnages', `${toSw}sw_personnages.html`, plainLinks(PERSONNAGES))}
	${menuGroup('objets', 'Objets', `${toSw}objets/sw_objets.html`, plainLinks(OBJETS))}
</div>`;

	const mount = document.getElementById('sw-topbar');
	if (!mount) return;
	mount.outerHTML = `<nav class="sw-topbar" aria-label="Navigation Star Wars">${html}</nav>`;

	initTopbarBehavior();

	function initTopbarBehavior() {
		const nav = document.querySelector('.sw-topbar');
		if (!nav) return;

		const groups = nav.querySelectorAll('.topbar-menu-group');
		const isTouch = window.matchMedia('(hover: none)').matches;
		const burger = nav.querySelector('.topbar-burger');
		const groupsPanel = nav.querySelector('.topbar-groups');

		function closeAll() {
			groups.forEach((g) => {
				g.classList.remove('open');
				g.querySelector('.topbar-menu-chev').setAttribute('aria-expanded', 'false');
			});
		}

		groups.forEach((group) => {
			const chevBtn = group.querySelector('.topbar-menu-chev');

			if (!isTouch) {
				group.addEventListener('mouseenter', () => {
					group.classList.add('open');
					chevBtn.setAttribute('aria-expanded', 'true');
				});
				group.addEventListener('mouseleave', () => {
					group.classList.remove('open');
					chevBtn.setAttribute('aria-expanded', 'false');
				});
			}

			chevBtn.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				const wasOpen = group.classList.contains('open');
				closeAll();
				if (!wasOpen) {
					group.classList.add('open');
					chevBtn.setAttribute('aria-expanded', 'true');
				}
			});
		});

		if (burger && groupsPanel) {
			burger.addEventListener('click', (e) => {
				e.stopPropagation();
				const isOpen = groupsPanel.classList.toggle('open');
				burger.setAttribute('aria-expanded', String(isOpen));
				burger.classList.toggle('open', isOpen);
				if (!isOpen) closeAll();
			});
		}

		document.addEventListener('click', (e) => {
			if (!e.target.closest('.topbar-menu-group')) closeAll();
			if (burger && groupsPanel && !e.target.closest('.topbar-groups') && !e.target.closest('.topbar-burger')) {
				groupsPanel.classList.remove('open');
				burger.setAttribute('aria-expanded', 'false');
				burger.classList.remove('open');
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') closeAll();
		});
	}
})();
