# ZZ Wars : la galaxie associative

Nouvelle version de mon site de ZZ1, centrée sur mon engagement associatif à l'ISIMA. Elle est publiée sur https://julen.sometgarcia.fr/associatif/ : le déploiement du portfolio récupère ce dossier tel quel.

- Un générique d'ouverture déroulant, puis une carte : la planète BDE et ses lunes (conseil d'administration, week-end d'accueil, refonte du site du BDE), et la planète Drezzing avec sa boutique en ligne.
- Chaque astre ouvre une fiche. Aucun JavaScript : le générique est une animation CSS, et les fiches s'affichent avec `:target` (l'adresse `#fiche-…`).
- Les commentaires `<!-- À enrichir : … -->` dans `index.html` signalent les détails à compléter (années, chiffres, missions).

- Trois langues : `index.html` (français, la référence), `en/index.html` et `es/index.html`. Une modification du texte se reporte à la main dans les trois fichiers ; le style et le script sont communs.

Pour le prévisualiser, il suffit d'ouvrir `index.html` dans un navigateur.

La police décorative Galactic Basic (freeware, ErikStormtrooper.com) est dans `polices/` avec sa notice. La version d'origine du site est à la racine du dépôt ; sa page de connexion (formulaire, `login.php`, `database.php`) a été retirée.
