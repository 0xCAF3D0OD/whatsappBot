# whatsappBot
Projet de Chatbot WhatsApp pour l'Assistance Scolaire

Ce projet propose deux implémentations distinctes d'un chatbot WhatsApp pour l'assistance scolaire :
- **Version Twilio** : Utilise l'API Twilio pour la communication avec WhatsApp
- **Version Puppeteer** : Utilise Puppeteer pour automatiser WhatsApp Web

## Description

Ce projet implémente un chatbot WhatsApp utilisant l'API Twilio pour fournir une assistance automatisée aux élèves. Le chatbot est conçu pour répondre aux questions relatives aux mathématiques pour les classes de 7ème, 8ème et 9ème année.

## Fonctionnalités

- Intégration avec l'API Twilio pour la gestion des messages WhatsApp
- Analyse des messages entrants pour détecter les requêtes liées aux mathématiques
- Réponses automatisées basées sur le contenu du message et le niveau scolaire
- Logging des interactions et des erreurs

## Configuration

Le projet utilise un fichier `.env` pour stocker les informations sensibles :

- `TWILIO_ACCOUNT_SID` : SID du compte Twilio
- `TWILIO_AUTH_TOKEN` : Token d'authentification Twilio
- `TWILIO_NUMBER` : Numéro WhatsApp Twilio utilisé pour l'envoi des messages
- `NGROK_AUTH_TOKEN` : Token d'authentification pour ngrok

## Dépendances principales

- FastAPI : Framework web pour créer l'API
- Twilio : Pour l'intégration avec WhatsApp
- python-dotenv : Pour la gestion des variables d'environnement
- Docker : Pour la containerisation de l'application

## Fonctionnement

1. Le script écoute les requêtes POST sur l'endpoint racine "/".
2. Lorsqu'un message est reçu, il est analysé pour détecter :
   - Les salutations
   - Les mentions de mathématiques
   - Le niveau scolaire (7ème, 8ème ou 9ème année)
3. Une réponse appropriée est générée et envoyée via l'API Twilio.

## Docker

### Dockerfile

Le projet inclut un `Dockerfile` qui permet de containeriser l'application :

- **Base Image** : Utilise l'image `python:3.9`.
- **Auteur** : Spécifié par le label `authors="dino"`.
- **Répertoire de travail** : Défini sur `/app/srcs`.
- **Installation des dépendances** : Copie `requirements.txt` et installe les packages Python requis.
- **Ngrok** : Installe et configure ngrok pour l'exposition du serveur local.
- **Commande de démarrage** : Utilise `uvicorn` pour lancer l'application FastAPI.

### docker-compose.yml

Le fichier `docker-compose.yml` est utilisé pour orchestrer le service :

- **Service `app`** :
  - **Image** : `whatsapp-bot-twilio`
  - **Build** : Construit l'image à partir du contexte actuel, en passant le `NGROK_AUTH_TOKEN` comme argument de build.
  - **Environnement** : Charge les variables d'environnement depuis le fichier `.env`.
  - **Volumes** : Monte le répertoire local dans le conteneur pour un développement facile.
  - **Ports** : Mappe le port `8080` du conteneur au port `8080` de l'hôte.

## Fonctions principales

- `math_var()` : Génère des variations du mot "mathématiques" pour la détection.
- `exctract_discipline_school()` : Extrait la discipline et le niveau scolaire du message.
- `analyze_and_respond()` : Analyse le message et génère une réponse.
- `send_message()` : Envoie un message via l'API Twilio.

## Endpoint API

- POST "/" : Reçoit les messages WhatsApp, les traite et envoie une réponse.

## Logging

Le projet utilise le module `logging` de Python pour enregistrer les informations importantes et les erreurs.

## Note

Le code inclut des commentaires pour une intégration future avec un modèle de langage (LLM) utilisant la bibliothèque `langchain`, actuellement commenté.

---

# Version Puppeteer

## Description

La version Puppeteer utilise l'automatisation de navigateur pour interagir directement avec WhatsApp Web, offrant une approche alternative qui ne nécessite pas d'API externe payante.

## Architecture

### Structure Multi-conteneurs

L'application utilise une architecture microservices avec Docker Compose :

- **Backend** : Serveur Node.js/Express avec Puppeteer
- **Frontend** : Interface utilisateur avec Vite + Alpine.js + TailwindCSS  
- **Nginx** : Reverse proxy et serveur web

### Technologies utilisées

#### Backend
- **Node.js** avec Express.js
- **Puppeteer** pour l'automatisation de Chrome/Chromium
- **Jade** comme moteur de templates
- **Chrome/Chromium** en mode headless

#### Frontend
- **Vite** comme bundler et serveur de développement
- **Alpine.js** pour la réactivité côté client
- **TailwindCSS** pour le styling
- **TypeScript** pour le typage statique

## Fonctionnalités

### Automatisation WhatsApp Web
- Connexion automatique à WhatsApp Web
- Génération et affichage de QR Code pour l'authentification
- Capture d'écran pour le monitoring
- Gestion de l'état du navigateur et des sessions

### Interface Web
- Page d'accueil pour la configuration
- Affichage du QR Code d'authentification
- Interface de contrôle de la session WhatsApp
- Routing côté client avec Alpine.js

### Gestion des Sessions
- Persistance de l'état du navigateur
- Gestion des cookies et de l'authentification
- Monitoring de la connexion WhatsApp

## Configuration Docker

### Services

#### Backend (Port 3000)
```yaml
backend:
  build: backend.Dockerfile
  volumes: ./srcs/backend/:/app/backend
  ports: "3000:3000"
```

#### Frontend 
```yaml
frontend:
  build: frontend.Dockerfile
  volumes: ./srcs/frontend:/app/frontend/
  depends_on: backend
```

#### Nginx (Port 8080)
```yaml
nginx:
  build: nginx.Dockerfile
  ports: "8080:80"
  depends_on: frontend
```

### Dockerfiles

#### Backend
- **Base** : `node:slim`
- **Chrome** : Installation complète de Google Chrome
- **Dépendances** : Express, Nodemon, CORS
- **Scripts** : Vérification automatique de l'existence du bot

#### Frontend  
- **Base** : `node:latest`
- **Build** : Configuration Vite pour le développement
- **Dépendances** : Alpine.js, TailwindCSS, TypeScript

## Structure des Fichiers

```
Puppeteer_version/
├── docker-compose.yml
├── backend.Dockerfile
├── frontend.Dockerfile  
├── nginx.Dockerfile
├── dockers/
│   ├── requirements-back.txt
│   ├── requirements-front.txt
│   ├── isBotExisting.sh
│   ├── launchFront.sh
│   └── nginx.conf
└── srcs/
    ├── backend/
    │   └── whatsapp-bot/
    │       ├── app.js
    │       ├── controller/
    │       │   ├── initializeBrowser.js
    │       │   ├── browserState.js
    │       │   ├── QRCodeSession.js
    │       │   └── botPageUtils.js
    │       └── routes/
    │           ├── root.js
    │           └── session.js
    └── frontend/
        ├── index.html
        ├── package.json
        ├── vite.config.js
        └── src/
            └── main.jsx
```

## API Endpoints

### Backend Routes
- `GET /whatsappLoginPage` : Page de connexion WhatsApp
- `GET /whatsappSession` : Gestion de la session active
- `GET /` : Route principale

### Contrôleurs Principaux
- **initializeBrowser.js** : Initialisation et configuration de Puppeteer
- **browserState.js** : Gestion de l'état global du navigateur
- **QRCodeSession.js** : Gestion du QR Code d'authentification
- **botPageUtils.js** : Utilitaires pour la manipulation de page

## Démarrage Rapide

### Prérequis
- Docker et Docker Compose installés
- Port 8080 disponible sur l'hôte

### Lancement
```bash
cd repos/Puppeteer_version
docker-compose up --build
```

### Accès
- **Interface Web** : http://localhost:8080
- **Backend API** : http://localhost:3000

## Avantages de la Version Puppeteer

1. **Pas de coûts API** : Utilise WhatsApp Web gratuitement
2. **Contrôle complet** : Accès à toutes les fonctionnalités de WhatsApp Web
3. **Interface utilisateur** : Frontend dédié pour la gestion
4. **Flexibilité** : Possibilité d'automatiser n'importe quelle action sur WhatsApp Web
5. **Debugging** : Captures d'écran et monitoring en temps réel

## Limitations

1. **Dépendance au navigateur** : Nécessite Chrome/Chromium
2. **Stabilité** : Sensible aux changements de WhatsApp Web
3. **Ressources** : Plus consommateur en CPU/RAM qu'une API
4. **Authentification** : Nécessite un scan QR Code périodique
