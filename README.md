# Portfolio Sophie Bluel 🏛️
Site dynamique de présentation des travaux de l’architecte Sophie Bluel (HTML / CSS / JavaScript + API)
 
## ✨ Fonctionnalités
- Galerie de travaux chargée depuis l’API
- Filtres par catégorie générés dynamiquement
- Connexion administrateur (token)
- Mode édition (bannière, bouton « modifier », filtres masqués)
- Modale pour ajouter / supprimer des projets (upload + preview)
- Mise à jour du DOM sans rechargement
 
## 🛠️ Technologies
- HTML5
- CSS3
- JavaScript 
- Fetch API
 
## 🚀 Installation
 
Cloner le repository :
 
```bash
git clone https://github.com/pataupe/Portfolio-architecte-sophie-bluel.git
```

Installer et lancer l’API (dans Backend/) :

```bash
cd Portfolio-architecte-sophie-bluel/Backend
npm install
npm start
```
L’API tourne sur http://localhost:5678 (Swagger : http://localhost:5678/api-docs/).

Ouvrir ensuite FrontEnd/index.html dans un navigateur (et login.html pour la page de connexion).

📂 Structure
```text
Portfolio-architecte-sophie-bluel/
├── Backend/
├── FrontEnd/
│   ├── index.html
│   ├── login.html
│   └── assets/
│       ├── style.css
│       ├── login.js
│       └── js/
│           ├── main.js
│           ├── api.js
│           ├── auth.js
│           ├── gallery.js
│           ├── modal.js
│           └── form.js
└── README.md
```

## 🌐 Routes API
- GET /api/works
- GET /api/categories
- POST /api/users/login
- POST /api/works (auth requise)
- DELETE /api/works/:id (auth requise)
  
## 👤 Auteur
Nathan Degorce (@pataupe) — Projet réalisé dans le cadre de la formation OpenClassrooms

