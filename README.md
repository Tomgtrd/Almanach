# Almanach

> Des fiches illustrées et interactives pour (re)découvrir un sujet en une demi-heure.

## C'est quoi ?

**Almanach** est une collection de mini-sites autonomes, chacun dédié à un thème — taxonomie, géologie, physique quantique, et d'autres à venir. Chaque fiche est pensée comme une planche à l'ancienne (gravures naturalistes, mnémotechniques, arbres et schémas interactifs) mais entièrement navigable et animée.

Pas de framework, pas d'étape de build : du HTML/CSS/JS servi tel quel, ouvrable directement dans un navigateur.

## Thèmes disponibles

- ✅ **Taxonomie** — RECOFGE, arbre du vivant interactif, cladistique
- ✅ **Géologie** — couches internes de la Terre, strates, ères géologiques, tectonique des plaques
- ✅ **Physique quantique** — dualité onde-corpuscule, superposition, intrication, gravité quantique
- 🔜 **L'espace / cosmologie** — Big Bang, expansion de l'univers, trous noirs

## Structure du dépôt

```
Almanach/
├── hub_index.html         # page d'accueil du hub, cartes vers chaque thème
├── hub_style.css          # styles du hub
├── Taxonomie/
│   ├── tax_index.html
│   ├── tax_style.css
│   └── tax_script.js
├── geologie/
│   ├── geo_index.html
│   ├── geo_style.css
│   └── geo_script.js
├── quantique/
│   ├── qua_index.html
│   ├── qua_style.css
│   └── qua_script.js
└── ...
```

Chaque dossier de thème est indépendant et autoporteur — il fonctionne seul (on peut ouvrir son `xxx_index.html` directement) aussi bien que depuis le hub.

## Voir le site

- **En ligne** : [tomgtrd.github.io/Almanach](https://tomgtrd.github.io/Almanach/) (une fois GitHub Pages activé sur la branche `main`)
- **En local** : ouvrir `hub_index.html` à la racine (le hub), ou directement le `xxx_index.html` d'un thème.

## Ajouter un nouveau thème

1. Dupliquer un dossier de thème existant comme point de départ (structure + variables CSS communes), en préfixant les 3 fichiers avec un code court propre au thème (ex. `geo_`, `tax_`, `qua_`).
2. Adapter le contenu et les données au nouveau sujet.
3. Ajouter une carte vers ce dossier dans `hub_index.html`.

## Charte graphique commune

- **Typographies** : Fraunces (titres, italique pour l'emphase), Newsreader (texte courant), Space Grotesk (UI, labels, boutons) — via Google Fonts.
- **Palette** : tokens CSS communs (paper / ink + variantes) + 4 à 6 couleurs d'accent propres à chaque thème, jamais les mêmes teintes d'un thème à l'autre :
  - Taxonomie : moss et déclinaisons du vivant
  - Géologie : rust, ochre, slate, copper, wine, magma
  - Physique quantique : indigo, cyan, violet, amber (+ un presque-noir réservé à la planche gravité quantique)
- **Structure** : planches numérotées en chiffres romains (7 à 12 selon le sujet), nav à points générée en JS, reveal-on-scroll, hero animé au chargement.
- **Interactivité** : patterns réutilisés d'un thème à l'autre — flip-cards, onglets à mini-diagrammes SVG, accordéons, arbres/diagrammes cliquables avec panneau d'info.
- **Techno** : vanilla JS, zéro dépendance, zéro build.

## Licence

Projet personnel, libre d'usage et de modification.
