// ==========================================================================
// MCU — pour les nuls — script commun
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
	initDotNav();
	initReveal();
	initAccordions();
});

/* -------------------------------------------------------------------------
   Dot-nav : générée à partir des planches présentes sur la page
   ------------------------------------------------------------------------- */
function initDotNav() {
	const planches = document.querySelectorAll('.planche[id]');
	if (!planches.length) return;

	const nav = document.createElement('nav');
	nav.className = 'dot-nav';
	nav.setAttribute('aria-label', 'Navigation entre les planches');

	planches.forEach((planche) => {
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.setAttribute('aria-label', planche.dataset.navLabel || planche.id);
		btn.addEventListener('click', () => {
			planche.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
		nav.appendChild(btn);
	});

	document.body.appendChild(nav);

	const dots = nav.querySelectorAll('button');
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = Array.from(planches).indexOf(entry.target);
					dots.forEach((d) => d.classList.remove('active'));
					if (dots[index]) dots[index].classList.add('active');
				}
			});
		},
		{ rootMargin: '-45% 0px -45% 0px', threshold: 0 }
	);

	planches.forEach((p) => observer.observe(p));
}

/* -------------------------------------------------------------------------
   Reveal on scroll
   ------------------------------------------------------------------------- */
function initReveal() {
	const targets = document.querySelectorAll('.planche, .reveal');
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12 }
	);
	targets.forEach((t) => observer.observe(t));
}

/* -------------------------------------------------------------------------
   Accordéon — un seul item ouvert à la fois, hauteur via scrollHeight (JS)
   ------------------------------------------------------------------------- */
function initAccordions() {
	document.querySelectorAll('.accordion').forEach((accordion) => {
		const items = accordion.querySelectorAll('.accordion__item');

		items.forEach((item) => {
			const trigger = item.querySelector('.accordion__trigger');
			const panel = item.querySelector('.accordion__panel');
			if (!trigger || !panel) return;

			trigger.setAttribute('aria-expanded', 'false');

			trigger.addEventListener('click', () => {
				const isOpen = item.classList.contains('open');

				// Ferme tous les autres items du même accordéon
				items.forEach((other) => {
					if (other !== item) {
						other.classList.remove('open');
						other.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
						other.querySelector('.accordion__panel').style.height = '0px';
					}
				});

				if (isOpen) {
					item.classList.remove('open');
					trigger.setAttribute('aria-expanded', 'false');
					panel.style.height = '0px';
				} else {
					item.classList.add('open');
					trigger.setAttribute('aria-expanded', 'true');
					panel.style.height = panel.scrollHeight + 'px';
				}
			});
		});

		// Recalcule les hauteurs ouvertes au resize (contenu qui reflow)
		window.addEventListener('resize', () => {
			accordion.querySelectorAll('.accordion__item.open .accordion__panel').forEach((panel) => {
				panel.style.height = panel.scrollHeight + 'px';
			});
		});
	});
}