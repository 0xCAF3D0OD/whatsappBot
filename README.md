# whatsappBot
Projet de Chatbot WhatsApp pour l'Assistance Scolaire

# Projet de Chatbot WhatsApp pour l'Assistance Scolaire

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
