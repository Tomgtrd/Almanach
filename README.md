# Almanach

> Des fiches illustrées et interactives pour (re)découvrir un sujet en une demi-heure.

## C'est quoi ?

**Almanach** est une collection de mini-sites autonomes, chacun dédié à un thème — taxonomie, géologie, physique quantique, et d'autres à venir. Chaque fiche est pensée comme une planche à l'ancienne (gravures naturalistes, mnémotechniques, arbres et schémas interactifs) mais entièrement navigable et animée.

Pas de framework, pas d'étape de build : du HTML/CSS/JS servi tel quel, ouvrable directement dans un navigateur.

## Thèmes disponibles

- ✅ Taxonomie — RECOFGE, arbre du vivant interactif, cladistique
- ✅ Géologie
- ✅ Physique quantique

## Structure du dépôt

```
almanach/
├── index.html            # page d'accueil du hub, cartes vers chaque thème
├── style.css              # styles du hub
├── taxonomie/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── geologie/
│   └── ...
└── ...
```

Chaque dossier de thème est indépendant et autoporteur — il fonctionne seul (on peut ouvrir son `index.html` directement) aussi bien que depuis le hub.

## Voir le site

- **En ligne** : [tomgtrd.github.io/Almanach](https://tomgtrd.github.io/Almanach/) (une fois GitHub Pages activé sur la branche `main`)
- **En local** : ouvrir `index.html` à la racine (le hub), ou directement le `index.html` d'un thème.

## Ajouter un nouveau thème

1. Dupliquer un dossier de thème existant comme point de départ (structure + variables CSS communes).
2. Adapter le contenu et les données au nouveau sujet.
3. Ajouter une carte vers ce dossier dans le `index.html` du hub.

## Charte graphique commune

- **Typographies** : Fraunces (titres), Newsreader (texte courant), Space Grotesk (UI, labels, boutons) — via Google Fonts.
- **Palette** : fond papier, encre foncée, accents brass / moss / teal / plum / wine, une couleur par rang ou catégorie selon le thème.
- **Techno** : vanilla JS, zéro dépendance, zéro build.

## Licence

Projet personnel, libre d'usage et de modification.
