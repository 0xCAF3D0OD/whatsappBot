FROM node:latest
LABEL authors="0xCAF3D0OD"

WORKDIR /app/frontend

# Copier les fichiers de dépendances
COPY dockers/requirements-front.txt ./

# Installer Node.js, npm et les dépendances système
RUN apt-get -y update && apt-get install -y \
   $(cat requirements-front.txt) && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Installer les dépendances npm
RUN npm init -y && npm install && npm install -g bash

# Copier le reste des fichiers de l'application
COPY srcs/frontend .

COPY dockers/launchFront.sh /

RUN chmod +x /launchFront.sh

CMD ["/bin/bash", "-c", "/launchFront.sh"]
