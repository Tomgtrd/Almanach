# Almanach

## C'est quoi ?

**Almanach** est une collection de mini-sites autonomes, chacun dédié à un thème — taxonomie, géologie, physique quantique, cosmologie, architecture des ordinateurs, hydrologie, MCU, et d'autres à venir. Chaque fiche est pensée comme une planche à l'ancienne (gravures naturalistes, mnémotechniques, arbres et schémas interactifs) mais entièrement navigable et animée.

Pas de framework, pas d'étape de build : du HTML/CSS/JS servi tel quel, ouvrable directement dans un navigateur.

## Thèmes disponibles

- ✅ **Taxonomie** — RECOFGE, arbre du vivant interactif, cladistique
- ✅ **Géologie** — couches internes de la Terre, strates, ères géologiques, tectonique des plaques
- ✅ **Physique quantique** — dualité onde-corpuscule, superposition, intrication, gravité quantique
- ✅ **Cosmologie** — Big Bang, expansion de l'univers, trous noirs, matière noire, destin du cosmos
- ✅ **Architecture des ordinateurs** — de la machine de Babbage au cache du processeur moderne
- ✅ **Hydrologie** — cycle de l'eau, bassins versants, nappes phréatiques, gestion des ressources en eau
- 🚧 **MCU** — toute la chronologie du Marvel Cinematic Universe, ses personnages regroupés par famille narrative, et le fonctionnement du multivers, de 1260 av. J.-C. à la fin du monde tel qu'on le connaît. Chronologie et personnages terminés ; le groupe "artefacts" (Pierres d'Infinité, bouclier de Cap, Mjolnir…) reste à construire.

## Structure du dépôt

```
Almanach/
├── index.html              # redirection racine → hub_index.html (exigence GitHub Pages)
├── hub_index.html          # page d'accueil du hub, cartes vers chaque thème
├── hub_style.css           # styles du hub
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
├── cosmologie/
│   ├── cos_index.html
│   ├── cos_style.css
│   └── cos_script.js
├── ordinateurs/
│   ├── ord_index.html
│   ├── ord_style.css
│   └── ord_script.js
├── hydrologie/
│   ├── hyd_index.html
│   ├── hyd_style.css
│   └── hyd_script.js
└── mcu/
    ├── mcu_hub.html               # sommaire du thème : chronologie, personnages, artefacts (à venir)
    ├── mcu_personnages.html       # sommaire des personnages, groupés par famille narrative
    ├── mcu_style.css
    ├── mcu_script.js
    ├── chronologie/
    │   ├── mcu_multivers.html        # fiche concept : Sacred Timeline, TVA, glossaire
    │   ├── mcu_antiquite.html        # 1260 av. J.-C. — 1946
    │   ├── mcu_origines.html         # 1964 — 2012
    │   ├── mcu_expansion.html        # 2013 — 2018
    │   ├── mcu_multivers-chrono.html # 2023 — 2024
    │   ├── mcu_actuel.html           # 2024 — 2027
    │   └── mcu_horizon.html          # 2027 — 2029
    └── personnages/
        ├── avengers-originels/    # mini-hub + 6 fiches
        ├── mystiques/             # mini-hub + 2 fiches
        ├── gardiens/              # mini-hub + 7 fiches
        ├── fantastic-four/        # mini-hub + 4 fiches
        ├── nouvelles-recrues/     # mini-hub + 7 fiches
        └── antagonistes/          # mini-hub + 4 fiches
```

Chaque dossier de thème est indépendant et autoporteur — il fonctionne seul (on peut ouvrir son `xxx_index.html` directement) aussi bien que depuis le hub.

**Cas particulier : MCU.** Contrairement aux autres thèmes qui tiennent sur une seule fiche, MCU est un mini-site à plusieurs niveaux (le volume de contenu — près de 90 films et séries, une trentaine de personnages — ne rentrait pas dans une planche unique). Chaque sous-page reste néanmoins autonome et suit la même charte graphique, avec un bandeau de navigation dédié en haut de chaque page pour circuler entre les chapitres. `mcu_hub.html` sert de sommaire d'entrée, avec deux volets : la chronologie (7 chapitres) et les personnages (6 groupes, chacun avec son propre mini-hub). Un troisième volet, les artefacts, est prévu mais pas encore commencé.

## Voir le site

- **En ligne** : [tomgtrd.github.io/Almanach](https://tomgtrd.github.io/Almanach/)
- **En local** : ouvrir `hub_index.html` à la racine (le hub), ou directement le `xxx_index.html` d'un thème (pour MCU : `mcu/mcu_hub.html`).

## Ajouter un nouveau thème

1. Dupliquer un dossier de thème existant comme point de départ (structure + variables CSS communes), en préfixant les 3 fichiers avec un code court propre au thème (ex. `geo_`, `tax_`, `qua_`, `mcu_`).
2. Adapter le contenu et les données au nouveau sujet.
3. Ajouter une carte vers ce dossier dans `hub_index.html`.
4. Si le sujet est trop dense pour une seule fiche (comme MCU), découper en plusieurs sous-pages liées par un bandeau de navigation inter-pages, avec une page sommaire faisant office de point d'entrée.

## Charte graphique commune

- **Typographies** : Fraunces (titres, italique pour l'emphase), Newsreader (texte courant), Space Grotesk (UI, labels, boutons) — via Google Fonts.
- **Palette** : tokens CSS communs (paper / ink + variantes) + 4 à 6 couleurs d'accent propres à chaque thème, jamais les mêmes teintes d'un thème à l'autre :
  - Taxonomie : moss et déclinaisons du vivant
  - Géologie : rust, ochre, slate, copper, wine, magma
  - Physique quantique : indigo, cyan, violet, amber (+ un presque-noir réservé à la planche gravité quantique)
  - Architecture des ordinateurs : graphite, silicium, cuivre, vert PCB, bleu phosphore, ambre LED, rouge signal
  - MCU : rouge/or Avengers désaturé, avec un accent violet-magenta réservé aux sections traitant du multivers
- **Structure** : planches numérotées en chiffres romains (4 à 13 selon le sujet), nav à points générée en JS, reveal-on-scroll, hero animé au chargement.
- **Interactivité** : patterns réutilisés d'un thème à l'autre — flip-cards, onglets à mini-diagrammes SVG, accordéons, arbres/diagrammes cliquables avec panneau d'info. Un seul type d'interaction par planche ; jamais de couleurs arc-en-ciel par nœud (palette sombre uniforme + un seul accent pour l'état actif).
- **Techno** : vanilla JS, zéro dépendance, zéro build.

## Licence

Projet personnel, libre d'usage et de modification.
