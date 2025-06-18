# Convertisseur de texte en HTML

## Description

Ce projet est un script écrit en C qui permet de générer des fichiers HTML à partir d'un fichier texte. Les fichiers HTML générés incluent des références à des fichiers CSS et JS pour le style et l'interactivité. Ce programme est idéal pour des applications simples où une conversion rapide de texte en format web est nécessaire, comme dans un contexte éducatif ou pour des prototypes.

## Installation

Pour compiler et utiliser ce programme, vous aurez besoin d'un compilateur C, tel que `gcc`. Suivez les étapes suivantes :

1. Assurez-vous d'avoir un compilateur C installé sur votre système (par exemple, `gcc` sur Linux ou macOS, ou MinGW sur Windows).
2. Ouvrez un terminal ou une invite de commandes dans le répertoire du projet.
3. Compilez le fichier source avec la commande suivante :

```bash
gcc -o main main.c
```

Ou alors, grâce qu Makefile :

```bash
make
```

Cela générera un exécutable nommé `main.c`.

## Utilisation

Pour utiliser le programme, exécutez-le avec les arguments suivants :

```bash
./main
```

Le programme lira le contenu de `text.txt` et générera des fichiers HTML nommés `[numéro_du_chapitre].html` en fonction du numero de la balise `<chapter id="[numero_du_chapitre]"> Titre </chapter>`. Ce fichier HTML contiendra le texte original, formaté avec des balises HTML de base, et inclura des liens vers les fichiers `histoire.css` et `histoire.js` pour le style et l'interactivité.

### Exemple

Si vous avez un fichier `example.txt` contenant :

```
<chapter id="01">Titre</chapter>
<p>Contenu</p>
```

L'exécution de `./text_to_html example.txt output.html` générera un fichier `output.html` avec un contenu similaire à :

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Titre</title>
    <link rel="stylesheet" href="../histoire.css" />
    <script src="../histoire.js" defer></script>
  </head>
  <body>
    <h1>
      <img src="../ASSETS/img/casque.png" />Flamme du Nord
      <img src="../ASSETS/img/casque.png" />
    </h1>
    <div class="background-opacity"></div>
    <h2>Titre</h2>
    <p>Contenu</p>
  </body>
</html>
```

## Fichiers inclus

Le répertoire du projet contient les fichiers suivants :

- `main.c` : Le code source du programme en C.
- `style.css` : Le fichier CSS pour le style des pages HTML générées.
- `script.js` : Le fichier JavaScript pour l'interactivité des pages HTML générées.
- `texte.txt` : Un fichier texte pour tester le programme.

## Prérequis

- Un compilateur C (par exemple, `gcc`).
- Aucun autre logiciel ou bibliothèque externe n'est requis.

## Auteurs

- Nathalie Anaïs FRESLON
- Gabriel ARTHUS
- (aide) Florian BESCHER

## Remarques

- Les fichiers `style.css` et `script.js` doivent être présents dans le répertoire parents que le fichier HTML généré pour que les liens fonctionnent correctement.
