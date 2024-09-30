FROM nginx:alpine
LABEL authors="0xCAF3D0OD"

WORKDIR /app/frontend

# Copier les fichiers de dépendances
COPY dockers/requirements-front.txt ./

# Installer Node.js, npm et les dépendances système
RUN apk add --no-cache nodejs npm \
    && apk add --no-cache $(cat requirements-front.txt)

# Installer les dépendances npm
RUN npm init -y && npm install && npm install -g bash

# Copier le reste des fichiers de l'application
COPY ./testRepo/frontend .

# Copier la configuration Nginx
COPY dockers/nginx.conf /etc/nginx/nginx.conf

COPY dockers/launchFront.sh .

RUN chmod +x launchFront.sh

EXPOSE 80

CMD ["/bin/bash", "-c", "launchFront.sh"]

CMD ["nginx", "-g", "daemon off;"]